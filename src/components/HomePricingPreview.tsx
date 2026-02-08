 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { Zap, Rocket, Crown, ArrowRight } from "lucide-react";
 import { PricingPlan, BillingPeriod } from "@/types/pricing";
 import { PricingCard } from "./PricingCard";
 import { BillingToggle } from "./BillingToggle";
 import { Button } from "@/components/ui/button";
 
 const homePlans: PricingPlan[] = [
   {
     id: "starter",
     name: "Starter",
     description: "Perfetto per iniziare",
     monthlyPrice: 9,
     credits: 100,
     icon: Zap,
     features: [
       { text: "100 crediti AI al mese", included: true },
       { text: "Analisi base biometrici", included: true },
       { text: "Supporto email", included: true },
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
     description: "Per risultati massimi",
     monthlyPrice: 29,
     credits: 500,
     icon: Rocket,
     isRecommended: true,
     features: [
       { text: "500 crediti AI al mese", included: true },
       { text: "Analisi avanzata", included: true },
       { text: "Coaching AI avanzato", included: true },
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
     description: "Soluzione per team",
     monthlyPrice: 99,
     credits: 2000,
     icon: Crown,
     features: [
       { text: "2000 crediti AI al mese", included: true },
       { text: "Supporto dedicato 24/7", included: true },
       { text: "API access", included: true },
     ],
     stripePriceId: {
       monthly: "price_enterprise_monthly",
       annual: "price_enterprise_annual",
     },
     ctaText: "Contattaci",
   },
 ];
 
 export const HomePricingPreview = () => {
   const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
 
   const handleCheckout = (planId: string, stripePriceId: string) => {
     console.log("Checkout:", { planId, stripePriceId });
   };
 
   return (
     <section className="py-16 px-4">
       <div className="container mx-auto max-w-6xl">
         {/* Header */}
         <div className="text-center mb-10">
           <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
             Piani Suggeriti
           </h2>
           <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
             Scegli il piano perfetto per te
           </h3>
           <p className="text-muted-foreground max-w-xl mx-auto mb-6">
             Inizia gratis e scala quando sei pronto
           </p>
           
           {/* Billing Toggle */}
           <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
         </div>
 
         {/* Pricing Cards Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {homePlans.map((plan) => (
             <PricingCard
               key={plan.id}
               plan={plan}
               billingPeriod={billingPeriod}
               onCheckout={handleCheckout}
             />
           ))}
         </div>
 
         {/* CTA to full pricing page */}
         <div className="text-center">
           <Button asChild variant="outline" size="lg" className="gap-2">
             <Link to="/pricing">
               Confronta tutti i dettagli e le funzionalità
               <ArrowRight className="h-4 w-4" />
             </Link>
           </Button>
         </div>
       </div>
     </section>
   );
 };
