export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: {
    id: string;
    unit_amount: number;
    currency: string;
    interval?: string;
  }[];
}

export interface UserPlan {
  planId: string;
  priceId: string;
  status: string;
  currentPeriodEnd: number;
}
