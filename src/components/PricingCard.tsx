import { Check, X, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingPlan, BillingPeriod } from "@/types/pricing";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: PricingPlan;
  billingPeriod: BillingPeriod;
  onCheckout: (planId: string, stripePriceId: string) => void;
}

const ANNUAL_DISCOUNT = 0.20; // 20% discount

export const PricingCard = ({ plan, billingPeriod, onCheckout }: PricingCardProps) => {
  const Icon = plan.icon;
  
  // Calculate prices dynamically
  const monthlyPrice = plan.monthlyPrice;
  const annualPrice = Math.round(plan.monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT));
  
  const displayPrice = billingPeriod === "monthly" ? monthlyPrice : annualPrice;
  const period = billingPeriod === "monthly" ? "/mese" : "/anno";
  const stripePriceId = billingPeriod === "monthly" 
    ? plan.stripePriceId.monthly 
    : plan.stripePriceId.annual;
  
  const savingsPercentage = Math.round(ANNUAL_DISCOUNT * 100);

  const handleClick = () => {
    onCheckout(plan.id, stripePriceId);
  };

  return (
    <Card 
      className={cn(
        "relative flex flex-col transition-all duration-300 hover:shadow-lg",
        plan.isRecommended 
          ? "border-primary border-2 shadow-md scale-[1.02]" 
          : "border-border hover:border-primary/50"
      )}
    >
      {plan.isRecommended && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
          Consigliato
        </Badge>
      )}
      
      <CardHeader className="text-center pb-2">
        <div className={cn(
          "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl",
          plan.isRecommended 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-7 w-7" />
        </div>
        
        <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {plan.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 text-center">
        <div className="mb-6">
          <span className="text-4xl font-bold text-foreground">
            €{displayPrice}
          </span>
          <span className="text-muted-foreground">{period}</span>
          
          {billingPeriod === "annual" && (
            <div className="mt-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Risparmia {savingsPercentage}%
              </Badge>
            </div>
          )}
          
          {/* Credits display */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Include {plan.credits} crediti AI</span>
          </div>
        </div>
        
        <ul className="space-y-3 text-left">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />
              )}
              <span className={cn(
                "text-sm",
                feature.included ? "text-foreground" : "text-muted-foreground/50"
              )}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button
          onClick={handleClick}
          className="w-full"
          variant={plan.isRecommended ? "default" : "outline"}
          size="lg"
        >
          {plan.ctaText || "Scegli Piano"}
        </Button>
      </CardFooter>
    </Card>
  );
};
