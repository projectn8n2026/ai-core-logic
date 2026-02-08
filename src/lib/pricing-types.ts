import { LucideIcon } from "lucide-react";

export type BillingPeriod = "monthly" | "annual";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  credits: number;
  icon: LucideIcon;
  features: PricingFeature[];
  isRecommended?: boolean;
  ctaText?: string;
  stripePriceId: {
    monthly: string;
    annual: string;
  };
}
