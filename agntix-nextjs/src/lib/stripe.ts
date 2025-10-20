// This file re-exports Stripe utilities for convenience
// For server-side use, import from './stripe-server'
// For client-side use, import from './stripe-client'

// Client-side exports (safe for browser)
export { getStripe, type CartItem } from './stripe-client';

// Note: Server-side exports (stripe instance, formatAmountForStripe, etc.)
// should be imported directly from './stripe-server' in API routes only
