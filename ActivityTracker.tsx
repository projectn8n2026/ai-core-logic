import { Footprints, Heart, Activity } from "lucide-react";

interface ActivityTrackerProps {
  steps: number;
  stepsGoal: number;
  heartRate?: number;
  isConnected: boolean;
}

const ActivityTracker = ({ steps, stepsGoal, heartRate, isConnected }: ActivityTrackerProps) => {
  const progressPercentage = Math.min((steps / stepsGoal) * 100, 100);

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Attività
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-pulse-dot' : 'bg-muted-foreground'}`} />
          <Activity className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Steps Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              {steps.toLocaleString()}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            / {stepsGoal.toLocaleString()}
          </span>
        </div>

        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-nexus rounded-full transition-all duration-1000 ease-out glow-primary"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {progressPercentage >= 100 
            ? "🎉 Obiettivo raggiunto!" 
            : `${(stepsGoal - steps).toLocaleString()} passi rimanenti`
          }
        </p>
      </div>

      {/* Heart Rate */}
      {heartRate && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive animate-pulse" />
              <span className="text-sm text-muted-foreground">Frequenza</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              {heartRate} <span className="text-xs text-muted-foreground">bpm</span>
            </span>
          </div>
        </div>
      )}

      {/* Health App Icons */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
            <Heart className="w-3 h-3 text-white" />
          </div>
          <span>Health</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
            <Activity className="w-3 h-3 text-white" />
          </div>
          <span>Fit</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;
