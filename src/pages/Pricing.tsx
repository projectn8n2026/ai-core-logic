import { Zap, Rocket, Crown } from "lucide-react";
import { PricingSection } from "@/components/pricing/PricingSection";
import { PricingPlan } from "@/types/pricing";
import { toast } from "sonner";

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfetto per iniziare il tuo percorso",
    monthlyPrice: 9,
    credits: 100,
    icon: Zap,
    features: [
      { text: "100 crediti AI al mese", included: true },
      { text: "Analisi base dati biometrici", included: true },
      { text: "Supporto email", included: true },
      { text: "Integrazione Apple Health", included: true },
      { text: "Coaching AI avanzato", included: false },
      { text: "Report personalizzati", included: false },
    ],
    stripePriceId: {
      monthly: "price_starter_monthly",
      annual: "price_starter_annual",
    },
    ctaText: "Inizia Ora",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Per chi vuole il massimo risultato",
    monthlyPrice: 29,
    credits: 500,
    icon: Rocket,
    isRecommended: true,
    features: [
      { text: "500 crediti AI al mese", included: true },
      { text: "Analisi avanzata biometrici", included: true },
      { text: "Supporto prioritario", included: true },
      { text: "Integrazione Apple Health + Google Fit", included: true },
      { text: "Coaching AI avanzato", included: true },
      { text: "Report personalizzati", included: true },
    ],
    stripePriceId: {
      monthly: "price_pro_monthly",
      annual: "price_pro_annual",
    },
    ctaText: "Scegli Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Soluzione completa per team",
    monthlyPrice: 99,
    credits: 2000,
    icon: Crown,
    features: [
      { text: "2000 crediti AI al mese", included: true },
      { text: "Analisi enterprise", included: true },
      { text: "Supporto dedicato 24/7", included: true },
      { text: "Tutte le integrazioni", included: true },
      { text: "Coaching AI premium", included: true },
      { text: "API access", included: true },
    ],
    stripePriceId: {
      monthly: "price_enterprise_monthly",
      annual: "price_enterprise_annual",
    },
    ctaText: "Contattaci",
  },
];

const Pricing = () => {
  const handleCheckout = (planId: string, stripePriceId: string) => {
    // TODO: Integrate with Stripe checkout
    console.log("Checkout:", { planId, stripePriceId });
    toast.info(`Checkout per piano ${planId} - Stripe integration coming soon!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <PricingSection plans={pricingPlans} onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default Pricing;
