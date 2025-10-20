import Stripe from 'stripe';

// Initialize Stripe on the server side
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Helper function to format price for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format price for display
export const formatAmountForDisplay = (amount: number): string => {
  return (amount / 100).toFixed(2);
};

// Re-export CartItem type for convenience
export type { CartItem } from './stripe-client';
