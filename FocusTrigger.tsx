import { Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";

interface FocusTriggerProps {
  quote: string;
  category: string;
  onRefresh?: () => void;
}

const FocusTrigger = ({ quote, category, onRefresh }: FocusTriggerProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in relative overflow-hidden" style={{ animationDelay: "0.3s" }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Focus del Giorno
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Refresh quote"
            >
              <RefreshCw className={`w-4 h-4 text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
        </div>

        <blockquote className="text-lg font-medium text-foreground leading-relaxed mb-3">
          "{quote}"
        </blockquote>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">
            da Baserow
          </span>
        </div>
      </div>
    </div>
  );
};

export default FocusTrigger;
