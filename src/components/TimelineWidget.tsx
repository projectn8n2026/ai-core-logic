import { Clock, Brain, Flame, Footprints, Moon, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchBrainNotes } from "@/lib/api";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  category: "nutrition" | "activity" | "sleep" | "insight" | "wellness";
  icon?: React.ReactNode;
}

interface TimelineWidgetProps {
  events?: TimelineEvent[];
  maxItems?: number;
}

const categoryConfig = {
  nutrition: {
    icon: <Flame className="w-4 h-4" />,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  activity: {
    icon: <Footprints className="w-4 h-4" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  sleep: {
    icon: <Moon className="w-4 h-4" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  insight: {
    icon: <Brain className="w-4 h-4" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  wellness: {
    icon: <Zap className="w-4 h-4" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
};

const TimelineWidget = ({ events: initialEvents, maxItems = 5 }: TimelineWidgetProps) => {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents || []);
  const [isLoading, setIsLoading] = useState(!initialEvents);

  useEffect(() => {
    if (!initialEvents) {
      loadEventsFromBaserow();
    }
  }, [initialEvents]);

  const loadEventsFromBaserow = async () => {
    setIsLoading(true);
    try {
      const notes = await fetchBrainNotes();
      
      // Transform brain notes to timeline events
      const transformedEvents: TimelineEvent[] = notes.slice(0, maxItems).map((note) => ({
        id: note.id,
        time: note.timestamp,
        title: note.title,
        description: note.content,
        category: mapCategoryToTimeline(note.category),
      }));
      
      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error loading timeline events:", error);
    }
    setIsLoading(false);
  };

  const mapCategoryToTimeline = (category: string): TimelineEvent["category"] => {
    const mapping: Record<string, TimelineEvent["category"]> = {
      "Produttività": "insight",
      "Nutrizione": "nutrition",
      "Wellness": "wellness",
      "Fitness": "activity",
      "Mindset": "insight",
    };
    return mapping[category] || "insight";
  };

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center glow-primary">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Timeline</h3>
            <p className="text-xs text-muted-foreground">Caricamento...</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center glow-primary">
            <Clock className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Timeline</h3>
            <p className="text-xs text-muted-foreground">Attività recenti da Baserow</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors group">
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

        <div className="space-y-4">
          {events.map((event, index) => {
            const config = categoryConfig[event.category];
            return (
              <div
                key={event.id}
                className="relative pl-10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 w-8 h-8 rounded-lg ${config.bgColor} ${config.borderColor} border flex items-center justify-center`}
                >
                  <span className={config.color}>{config.icon}</span>
                </div>

                {/* Content */}
                <div className="bg-secondary/30 rounded-xl p-4 border border-border hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {events.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Nessun evento nella timeline</p>
        </div>
      )}
    </div>
  );
};

export default TimelineWidget;
