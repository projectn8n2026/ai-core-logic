import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DigitalTwinWidget, TimelineWidget } from "@/components/integrated";
import { fetchUserStats } from "@/lib/api";

const DigitalTwin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    consistencyLevel: 3,
    maxLevel: 5,
    caloriesConsumed: 1850,
    caloriesBurned: 420,
    caloriesGoal: 2200,
    steps: 7842,
    stepsGoal: 10000,
    heartRate: 72,
    isHealthConnected: true,
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchUserStats();
      setStats(data);
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid pb-24">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="glass sticky top-0 z-50 px-6 py-4">
          <div className="max-w-[2560px] mx-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center glow-primary">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Digital Twin</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Stats Overview */}
          <section className="mb-8">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-1">
              Panoramica Biometrica
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Calorie Consumate</p>
                <p className="text-2xl font-bold text-foreground">{stats.caloriesConsumed}</p>
                <p className="text-xs text-primary">/ {stats.caloriesGoal} kcal</p>
              </div>
              <div className="glass rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Calorie Bruciate</p>
                <p className="text-2xl font-bold text-foreground">{stats.caloriesBurned}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
              <div className="glass rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Passi</p>
                <p className="text-2xl font-bold text-foreground">{stats.steps.toLocaleString()}</p>
                <p className="text-xs text-primary">/ {stats.stepsGoal.toLocaleString()}</p>
              </div>
              <div className="glass rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Battito Cardiaco</p>
                <p className="text-2xl font-bold text-foreground">{stats.heartRate}</p>
                <p className="text-xs text-muted-foreground">bpm</p>
              </div>
            </div>
          </section>

          {/* Digital Twin & Timeline */}
          <section>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-1">
              Digital Twin & Attività
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <DigitalTwinWidget />
              <TimelineWidget maxItems={10} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DigitalTwin;
