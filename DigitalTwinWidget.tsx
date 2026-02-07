import { Flame, Footprints, Sparkles, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { fetchUserStats, fetchMotivationalQuote, sendToTelegram } from "@/lib/api";

interface DigitalTwinData {
  calories: {
    consumed: number;
    burned: number;
    net: number;
  };
  steps: {
    current: number;
    goal: number;
  };
  motivation: {
    quote: string;
    category: string;
  };
}

interface DigitalTwinWidgetProps {
  initialData?: DigitalTwinData;
  onFeedback?: (type: "positive" | "negative", widgetId: string) => void;
}

const DigitalTwinWidget = ({ initialData, onFeedback }: DigitalTwinWidgetProps) => {
  const [data, setData] = useState<DigitalTwinData>(
    initialData || {
      calories: { consumed: 1850, burned: 420, net: 1430 },
      steps: { current: 7842, goal: 10000 },
      motivation: { quote: "La costanza trasforma l'ordinario in straordinario", category: "Motivazione" },
    }
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<Record<string, "positive" | "negative" | null>>({});

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const [statsData, quoteData] = await Promise.all([
        fetchUserStats(),
        fetchMotivationalQuote(),
      ]);
      
      setData({
        calories: {
          consumed: statsData.caloriesConsumed,
          burned: statsData.caloriesBurned,
          net: statsData.caloriesConsumed - statsData.caloriesBurned,
        },
        steps: {
          current: statsData.steps,
          goal: statsData.stepsGoal,
        },
        motivation: quoteData,
      });
      
      toast.success("Digital Twin aggiornato", {
        description: "Dati sincronizzati da Baserow",
      });
    } catch (error) {
      toast.error("Errore sincronizzazione", {
        description: "Impossibile aggiornare i dati",
      });
    }
    setIsRefreshing(false);
  };

  const handleFeedback = async (widgetId: string, type: "positive" | "negative") => {
    setFeedbackSent((prev) => ({ ...prev, [widgetId]: type }));
    
    // Send feedback to n8n webhook
    await sendToTelegram("text", {
      feedbackType: type,
      widgetId,
      timestamp: new Date().toISOString(),
      data: data[widgetId as keyof DigitalTwinData],
    });
    
    toast.success(type === "positive" ? "👍 Feedback positivo" : "👎 Feedback negativo", {
      description: "Inviato a n8n webhook",
    });
    
    onFeedback?.(type, widgetId);
  };

  const stepsPercentage = Math.min((data.steps.current / data.steps.goal) * 100, 100);
  const caloriesPercentage = Math.min((data.calories.consumed / 2200) * 100, 100);

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Digital Twin</h3>
            <p className="text-xs text-muted-foreground">Sincronizzato con Baserow</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Widgets Grid */}
      <div className="space-y-4">
        {/* Calories Widget */}
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Calorie</span>
            </div>
            <FeedbackButtons
              widgetId="calories"
              currentFeedback={feedbackSent.calories}
              onFeedback={handleFeedback}
            />
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-foreground">{data.calories.net}</span>
            <span className="text-xs text-muted-foreground">kcal nette</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-nexus rounded-full transition-all duration-500"
              style={{ width: `${caloriesPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Consumate: {data.calories.consumed}</span>
            <span>Bruciate: {data.calories.burned}</span>
          </div>
        </div>

        {/* Steps Widget */}
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Passi</span>
            </div>
            <FeedbackButtons
              widgetId="steps"
              currentFeedback={feedbackSent.steps}
              onFeedback={handleFeedback}
            />
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-foreground">{data.steps.current.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">/ {data.steps.goal.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-nexus rounded-full transition-all duration-500 glow-primary"
              style={{ width: `${stepsPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {stepsPercentage >= 100
              ? "🎉 Obiettivo raggiunto!"
              : `${(data.steps.goal - data.steps.current).toLocaleString()} passi rimanenti`}
          </p>
        </div>

        {/* Motivation Widget */}
        <div className="bg-secondary/50 rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Motivazione</span>
            </div>
            <FeedbackButtons
              widgetId="motivation"
              currentFeedback={feedbackSent.motivation}
              onFeedback={handleFeedback}
            />
          </div>
          <blockquote className="text-sm text-foreground italic border-l-2 border-primary pl-3">
            "{data.motivation.quote}"
          </blockquote>
          <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {data.motivation.category}
          </span>
        </div>
      </div>
    </div>
  );
};

// Feedback Buttons Component
interface FeedbackButtonsProps {
  widgetId: string;
  currentFeedback: "positive" | "negative" | null | undefined;
  onFeedback: (widgetId: string, type: "positive" | "negative") => void;
}

const FeedbackButtons = ({ widgetId, currentFeedback, onFeedback }: FeedbackButtonsProps) => {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onFeedback(widgetId, "positive")}
        disabled={currentFeedback !== null && currentFeedback !== undefined}
        className={`p-1.5 rounded-lg transition-all ${
          currentFeedback === "positive"
            ? "bg-primary/20 text-primary"
            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
        } disabled:cursor-not-allowed`}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => onFeedback(widgetId, "negative")}
        disabled={currentFeedback !== null && currentFeedback !== undefined}
        className={`p-1.5 rounded-lg transition-all ${
          currentFeedback === "negative"
            ? "bg-destructive/20 text-destructive"
            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
        } disabled:cursor-not-allowed`}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default DigitalTwinWidget;
