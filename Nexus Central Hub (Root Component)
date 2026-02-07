import { useState, useEffect } from "react";
import Header from "@/components/Header";
import EnergyBalance from "@/components/EnergyBalance";
import ActivityTracker from "@/components/ActivityTracker";
import FocusTrigger from "@/components/FocusTrigger";
import HandsFreeControl from "@/components/HandsFreeControl";
import DigitalBrainFeed from "@/components/DigitalBrainFeed";
import ActionBar from "@/components/ActionBar";
import { HomePricingPreview } from "@/components/pricing/HomePricingPreview";
import { DigitalTwinWidget, TimelineWidget } from "@/components/integrated";
import { fetchMotivationalQuote, fetchBrainNotes, fetchUserStats } from "@/lib/api";

const Index = () => {
  const [quote, setQuote] = useState({ quote: "La costanza trasforma l'ordinario in straordinario", category: "Motivazione" });
  const [notes, setNotes] = useState<any[]>([]);
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
    // Load initial data
    const loadData = async () => {
      const [quoteData, notesData, statsData] = await Promise.all([
        fetchMotivationalQuote(),
        fetchBrainNotes(),
        fetchUserStats(),
      ]);
      setQuote(quoteData);
      setNotes(notesData);
      setStats(statsData);
    };
    loadData();
  }, []);

  const handleRefreshQuote = async () => {
    const newQuote = await fetchMotivationalQuote();
    setQuote(newQuote);
  };

  return (
    <div className="min-h-screen bg-background bg-grid pb-24">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header 
          consistencyLevel={stats.consistencyLevel} 
          maxLevel={stats.maxLevel} 
        />

        <main className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Biometric Dashboard Grid */}
          <section className="mb-8">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-1">
              Dashboard Biometrica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              <EnergyBalance
                consumed={stats.caloriesConsumed}
                burned={stats.caloriesBurned}
                goal={stats.caloriesGoal}
              />
              <ActivityTracker
                steps={stats.steps}
                stepsGoal={stats.stepsGoal}
                heartRate={stats.heartRate}
                isConnected={stats.isHealthConnected}
              />
              <FocusTrigger
                quote={quote.quote}
                category={quote.category}
                onRefresh={handleRefreshQuote}
              />
            </div>
          </section>

          {/* Hands-Free Control & Digital Brain */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <section>
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-1">
                Controllo Hands-Free
              </h2>
              <HandsFreeControl />
            </section>

            <section>
              <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-1">
                Feed Cervello Digitale
              </h2>
              <DigitalBrainFeed
                notes={notes}
                consistencyLevel={stats.consistencyLevel}
                requiredLevel={4}
              />
            </section>
          </div>

          {/* Integrated Digital Twin & Timeline Section */}
          <section className="mt-8">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4 px-1">
              Digital Twin & Timeline
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <DigitalTwinWidget />
              <TimelineWidget maxItems={5} />
            </div>
          </section>

          {/* Pricing Preview Section */}
          <HomePricingPreview />
        </main>

        <ActionBar />
      </div>
    </div>
  );
};

export default Index;
