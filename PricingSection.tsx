import { useState } from "react";
import { PricingPlan, BillingPeriod } from "@/types/pricing";
import { PricingCard } from "./PricingCard";
import { BillingToggle } from "./BillingToggle";

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
  onCheckout: (planId: string, stripePriceId: string) => void;
}

export const PricingSection = ({
  plans,
  title = "Scegli il piano perfetto per te",
  subtitle = "Inizia gratis e scala quando sei pronto. Nessuna carta di credito richiesta.",
  onCheckout,
}: PricingSectionProps) => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
          
          {/* Billing Toggle */}
          <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingPeriod={billingPeriod}
              onCheckout={onCheckout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
