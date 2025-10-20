import { loadStripe, Stripe } from '@stripe/stripe-js';

// Initialize Stripe on the client side
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }
  return stripePromise;
};

// Types for our cart items
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
