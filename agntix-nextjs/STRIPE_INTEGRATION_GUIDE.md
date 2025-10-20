# Stripe Payment Integration - Complete Implementation Guide

This document provides a comprehensive overview of the Stripe payment integration implemented in this Next.js application.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Project Structure](#project-structure)
5. [Implementation Details](#implementation-details)
6. [Configuration](#configuration)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This integration implements Stripe Checkout for secure payment processing in a Next.js 15 application. The implementation follows best practices for security, user experience, and maintainability.

**Key Features:**
- Stripe Checkout integration (hosted payment page)
- Secure payment processing with PCI compliance
- Webhook handling for real-time payment updates
- Success and cancel page flows
- Multiple payment method support
- Cart state management
- TypeScript support

**Technologies Used:**
- Next.js 15.2.0
- React 19.0.0
- TypeScript 5
- Stripe API (2024-12-18.acacia)
- @stripe/stripe-js

---

## Prerequisites

Before implementing Stripe, ensure you have:

1. **Stripe Account**
   - Sign up at https://stripe.com
   - Get API keys from Dashboard > Developers > API keys

2. **Node.js Environment**
   - Node.js 18+ installed
   - npm or yarn package manager

3. **Next.js Application**
   - Next.js 15+ with App Router
   - TypeScript configuration

---

## Installation Steps

### Step 1: Install Dependencies

```bash
cd agntix-nextjs
npm install stripe @stripe/stripe-js
```

**Packages Installed:**
- `stripe`: Server-side Stripe SDK (v17+)
- `@stripe/stripe-js`: Client-side Stripe library

**Installation Time:** ~6 minutes
**Package Count:** 3 new packages added

---

### Step 2: Environment Configuration

**Files Created:**
- `.env.local` - Active environment variables
- `.env.local.example` - Template for team members

**Environment Variables:**

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Security Notes:**
- Never commit `.env.local` to version control
- Keep secret keys server-side only
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Rotate keys periodically in production

---

### Step 3: Create Stripe Utility Library

**File:** `src/lib/stripe.ts`

**Purpose:** Centralized Stripe initialization and helper functions

**Key Functions:**
1. `stripe` - Server-side Stripe instance
2. `getStripe()` - Client-side Stripe instance (cached)
3. `formatAmountForStripe()` - Convert dollars to cents
4. `formatAmountForDisplay()` - Convert cents to dollars

**Type Definitions:**
```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
```

---

### Step 4: API Routes Implementation

#### 4.1 Checkout Session Creation

**File:** `src/app/api/stripe/create-checkout-session/route.ts`

**Endpoint:** `POST /api/stripe/create-checkout-session`

**Request Body:**
```json
{
  "cartItems": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "quantity": 1,
      "image": "https://..."
    }
  ],
  "billingDetails": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

**Key Features:**
- Validates cart items
- Creates line items for Stripe
- Sets success/cancel URLs
- Collects billing and shipping addresses
- Stores metadata for order fulfillment

**Security Measures:**
- Server-side validation
- Amount calculation on server
- Cart data verification
- Error handling

---

#### 4.2 Webhook Handler

**File:** `src/app/api/stripe/webhooks/route.ts`

**Endpoint:** `POST /api/stripe/webhooks`

**Purpose:** Handle real-time payment events from Stripe

**Events Handled:**
1. `checkout.session.completed` - Payment successful
2. `payment_intent.succeeded` - Payment processed
3. `payment_intent.payment_failed` - Payment failed

**Webhook Flow:**
1. Receive webhook from Stripe
2. Verify signature for security
3. Process event based on type
4. Update order status
5. Trigger fulfillment (TODO)

**Security:**
- Signature verification required
- Raw body parsing for verification
- Error handling for invalid requests

**TODO Items:**
- Save order to database
- Send confirmation email
- Update inventory
- Trigger fulfillment process

---

### Step 5: Success and Cancel Pages

#### 5.1 Success Page

**File:** `src/app/(shops)/checkout/success/page.tsx`

**URL:** `/checkout/success?session_id=cs_test_...`

**Features:**
- Displays success message
- Shows order reference (session ID)
- Clears cart from localStorage
- Links to continue shopping
- Links to view orders

**User Experience:**
- Loading state while processing
- Success icon (SVG checkmark)
- Confirmation message
- Clear call-to-actions

---

#### 5.2 Cancel Page

**File:** `src/app/(shops)/checkout/cancel/page.tsx`

**URL:** `/checkout/cancel`

**Features:**
- Displays cancellation message
- Explains no charges were made
- Option to try again
- Option to continue shopping

**User Experience:**
- Warning icon (SVG)
- Clear messaging
- Helpful call-to-actions

---

### Step 6: Cart Context

**File:** `src/contexts/CartContext.tsx`

**Purpose:** Global cart state management

**Features:**
- Add items to cart
- Remove items from cart
- Update item quantities
- Clear entire cart
- Calculate cart total
- Get cart item count
- Persist to localStorage

**Usage Example:**
```typescript
const { cartItems, addToCart, getCartTotal } = useCart();
```

**Storage:**
- localStorage for persistence
- Syncs across tabs
- Survives page refreshes

---

### Step 7: Payment Component Update

**File:** `src/components/forms/CheckoutPayment.tsx`

**Changes Made:**
1. Added props interface:
   - `selectedPayment: string`
   - `onPaymentChange: (method: string) => void`

2. Added Stripe payment option:
   - Positioned as first (recommended) option
   - Badge showing "Recommended"
   - Secure payment description

3. Made radio buttons controlled:
   - Linked to state
   - Dynamic descriptions
   - Proper accessibility

**Payment Methods Available:**
- ✅ Stripe (Credit/Debit Card) - **NEW**
- Direct Bank Transfer
- Cheque Payment
- Cash on Delivery
- PayPal

---

### Step 8: Checkout Page Integration

**File:** `src/pages/shops/checkout/CheckoutMain.tsx`

**New State Variables:**
```typescript
const [selectedPayment, setSelectedPayment] = useState('stripe');
const [isProcessing, setIsProcessing] = useState(false);
const [billingDetails, setBillingDetails] = useState({...});
```

**New Functions:**

#### handlePlaceOrder()
```typescript
async function handlePlaceOrder(e: React.FormEvent)
```

**Flow:**
1. Prevent default form submission
2. Validate payment method selection
3. For Stripe payments:
   - Prepare cart items
   - Call checkout session API
   - Redirect to Stripe Checkout
4. For other methods:
   - Show placeholder alert

**Error Handling:**
- Try-catch for API calls
- User-friendly error messages
- Loading state management
- Cleanup in finally block

**Updated UI:**
- Changed Link to button
- Added loading spinner
- Disabled state during processing
- Visual feedback (opacity)

---

## Project Structure

```
agntix-nextjs/
├── .env.local                          ✅ Environment variables
├── .env.local.example                  ✅ Template
├── STRIPE_INTEGRATION_GUIDE.md         ✅ This file
│
├── src/
│   ├── lib/
│   │   └── stripe.ts                   ✅ Stripe utilities
│   │
│   ├── contexts/
│   │   └── CartContext.tsx             ✅ Cart state management
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── stripe/
│   │   │       ├── create-checkout-session/
│   │   │       │   └── route.ts        ✅ Create payment
│   │   │       └── webhooks/
│   │   │           └── route.ts        ✅ Handle events
│   │   │
│   │   └── (shops)/
│   │       └── checkout/
│   │           ├── page.tsx            ✅ Modified
│   │           ├── success/
│   │           │   └── page.tsx        ✅ Success page
│   │           └── cancel/
│   │               └── page.tsx        ✅ Cancel page
│   │
│   ├── pages/
│   │   └── shops/
│   │       └── checkout/
│   │           └── CheckoutMain.tsx    ✅ Modified
│   │
│   └── components/
│       └── forms/
│           └── CheckoutPayment.tsx     ✅ Modified
│
└── package.json                        ✅ Updated dependencies
```

**Legend:**
- ✅ New or modified file
- 📁 Folder

---

## Configuration

### Stripe Dashboard Setup

1. **Get API Keys:**
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy "Publishable key" (pk_test_...)
   - Copy "Secret key" (sk_test_...)
   - Add to `.env.local`

2. **Configure Webhooks:**
   - Go to https://dashboard.stripe.com/test/webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/stripe/webhooks`
   - Events to listen for:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copy webhook signing secret
   - Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

3. **Payment Methods:**
   - Enable/disable payment methods in dashboard
   - Configure supported currencies
   - Set up tax collection (optional)

---

## Testing

### Test Cards

Stripe provides test cards for various scenarios:

**Success:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Decline:**
```
Card Number: 4000 0000 0000 0002
```

**3D Secure Required:**
```
Card Number: 4000 0025 0000 3155
```

**Insufficient Funds:**
```
Card Number: 4000 0000 0000 9995
```

**Full list:** https://stripe.com/docs/testing

---

### Local Webhook Testing

Install Stripe CLI:
```bash
# Windows (via Scoop)
scoop install stripe

# macOS
brew install stripe/stripe-cli/stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

Login to Stripe:
```bash
stripe login
```

Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

This command will output a webhook signing secret:
```
> Ready! Your webhook signing secret is whsec_...
```

Copy this secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`

Test webhook:
```bash
stripe trigger checkout.session.completed
```

---

### Testing Checklist

- [ ] Environment variables configured
- [ ] Stripe test mode enabled
- [ ] Can navigate to checkout page
- [ ] Payment method selection works
- [ ] Stripe option is selected by default
- [ ] "Place Order" button is clickable
- [ ] Redirects to Stripe Checkout
- [ ] Test card payment succeeds
- [ ] Redirected to success page
- [ ] Success page shows session ID
- [ ] Webhook receives event
- [ ] Console logs show order details
- [ ] Test card decline works
- [ ] Cancel payment works
- [ ] Redirected to cancel page
- [ ] Can return to checkout

---

## Deployment

### Environment Variables

Add to production environment (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Important:**
- Use **live mode** keys for production
- Never expose secret keys client-side
- Store securely in hosting platform

---

### Webhook Configuration

1. **Production Webhook:**
   - URL: `https://yourdomain.com/api/stripe/webhooks`
   - Add in Stripe Dashboard (live mode)
   - Get signing secret
   - Add to production environment

2. **Verify SSL:**
   - Stripe requires HTTPS
   - Ensure SSL certificate is valid

---

### Security Best Practices

1. **API Keys:**
   - Rotate keys periodically
   - Never commit to version control
   - Use different keys per environment
   - Restrict key permissions if possible

2. **Webhook Security:**
   - Always verify signatures
   - Use HTTPS only
   - Implement rate limiting
   - Log suspicious activity

3. **Amount Validation:**
   - Calculate totals server-side
   - Never trust client-side amounts
   - Validate cart items exist
   - Check inventory availability

4. **User Data:**
   - Encrypt sensitive information
   - Comply with GDPR/privacy laws
   - Don't store card details
   - Use Stripe's secure vault

---

## Troubleshooting

### Common Issues

#### 1. "Missing stripe-signature header"

**Cause:** Webhook signature verification failed

**Solution:**
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Check webhook endpoint URL matches Stripe dashboard
- Use Stripe CLI for local testing

---

#### 2. "Invalid API key"

**Cause:** Wrong or expired API keys

**Solution:**
- Verify keys in `.env.local`
- Check test mode vs live mode
- Regenerate keys if needed
- Restart Next.js dev server after changing env vars

---

#### 3. "No such checkout session"

**Cause:** Session ID invalid or expired

**Solution:**
- Sessions expire after 24 hours
- Create new session for each checkout
- Don't cache or reuse session IDs

---

#### 4. Webhook not receiving events

**Cause:** Webhook not configured or unreachable

**Solution:**
- For local: Use Stripe CLI forwarding
- For production: Check webhook URL in dashboard
- Verify endpoint returns 200 status
- Check server logs for errors

---

#### 5. "Redirect failed" or "Session not found"

**Cause:** Client-side Stripe.js not loaded

**Solution:**
- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Ensure `@stripe/stripe-js` is installed
- Check browser console for errors
- Verify network requests succeed

---

### Debug Mode

Enable detailed logging:

```typescript
// In src/lib/stripe.ts
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
  maxNetworkRetries: 2,
  timeout: 30000,
  telemetry: false, // Disable for debugging
});
```

---

### Logs to Check

**Browser Console:**
- Network tab for API calls
- Console errors
- Stripe.js warnings

**Server Logs:**
- API route responses
- Webhook events
- Error stack traces

**Stripe Dashboard:**
- Logs section for all events
- Payment attempts
- Webhook deliveries

---

## Additional Features to Implement

### 1. Database Integration

Store orders in database:

```typescript
// In webhook handler
await db.orders.create({
  stripeSessionId: session.id,
  amount: session.amount_total,
  currency: session.currency,
  customerEmail: session.customer_email,
  status: 'paid',
  items: JSON.parse(session.metadata.cartItems),
  createdAt: new Date(),
});
```

---

### 2. Email Confirmations

Send order confirmation emails:

```typescript
// Using a service like SendGrid, Resend, etc.
await sendEmail({
  to: session.customer_email,
  subject: 'Order Confirmation',
  template: 'order-confirmation',
  data: {
    orderId: session.id,
    items: cartItems,
    total: session.amount_total,
  },
});
```

---

### 3. Inventory Management

Update product inventory:

```typescript
for (const item of cartItems) {
  await db.products.update({
    where: { id: item.id },
    data: {
      stock: { decrement: item.quantity },
    },
  });
}
```

---

### 4. Subscription Support

For recurring payments:

```typescript
const session = await stripe.checkout.sessions.create({
  mode: 'subscription', // Changed from 'payment'
  line_items: [{
    price: 'price_...', // Stripe price ID
    quantity: 1,
  }],
  // ... other options
});
```

---

### 5. Customer Portal

Let customers manage subscriptions:

```typescript
const portalSession = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: 'https://yourdomain.com/account',
});
```

---

### 6. Saved Payment Methods

Allow customers to save cards:

```typescript
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  customer: customerId, // Existing customer ID
  payment_intent_data: {
    setup_future_usage: 'on_session',
  },
  // ... other options
});
```

---

## Resources

### Documentation

- **Stripe Docs:** https://stripe.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Stripe API Reference:** https://stripe.com/docs/api
- **Stripe Testing:** https://stripe.com/docs/testing

### Stripe Resources

- **Dashboard:** https://dashboard.stripe.com
- **API Keys:** https://dashboard.stripe.com/apikeys
- **Webhooks:** https://dashboard.stripe.com/webhooks
- **Logs:** https://dashboard.stripe.com/logs
- **Test Cards:** https://stripe.com/docs/testing#cards

### Community

- **Stripe GitHub:** https://github.com/stripe
- **Stack Overflow:** Tag `stripe-payments`
- **Stripe Support:** https://support.stripe.com

---

## Implementation Timeline

Total implementation time: **8-10 hours**

| Step | Task | Time |
|------|------|------|
| 1 | Install dependencies | 10 min |
| 2 | Environment setup | 15 min |
| 3 | Stripe utility library | 20 min |
| 4 | Checkout session API | 45 min |
| 5 | Webhook handler API | 60 min |
| 6 | Success/cancel pages | 45 min |
| 7 | Cart context | 60 min |
| 8 | Payment component update | 30 min |
| 9 | Checkout page integration | 90 min |
| 10 | Testing | 120 min |
| 11 | Documentation | 60 min |

---

## Maintenance

### Regular Tasks

- [ ] Monitor webhook delivery success rate
- [ ] Check for failed payments
- [ ] Review Stripe logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate API keys quarterly
- [ ] Review and test payment flow monthly

### Updates

When updating Stripe API version:

1. Check changelog: https://stripe.com/docs/upgrades
2. Test in test mode first
3. Update API version in `src/lib/stripe.ts`
4. Run full test suite
5. Deploy to production

---

## Support

For issues with this implementation:

1. Check this documentation
2. Review Stripe Dashboard logs
3. Check browser console errors
4. Review server logs
5. Consult Stripe documentation
6. Contact Stripe support if needed

---

## License

This implementation follows Stripe's Terms of Service:
https://stripe.com/legal

---

## Changelog

### Version 1.0.0 (2025-10-20)

**Initial Implementation:**
- ✅ Stripe Checkout integration
- ✅ Webhook handling
- ✅ Success/cancel pages
- ✅ Cart context
- ✅ Payment component
- ✅ Checkout page integration
- ✅ Environment configuration
- ✅ TypeScript support
- ✅ Error handling
- ✅ Loading states

**Next Version TODO:**
- Database integration
- Email confirmations
- Inventory management
- Admin dashboard
- Analytics tracking

---

**Document End**

For questions or improvements to this guide, please contact the development team.
