# Brainstorming Checkout Flow

## ✅ UPDATED: Direct redirect to /brainstorm after payment (no intermediate page!)

## Complete User Journey

### Step 1: Fill Brainstorming Brief
- User navigates to `/brainstorm` or clicks "Get In Touch" menu
- Fills out the brainstorming form with:
  - Brand/Product
  - Core Challenge
  - Target Audience
  - Brand Tone
  - Market Context
  - Agency Type

### Step 2: Payment
- User clicks **"Ignite Ideas"** button
- Form data is saved to localStorage:
  - `brainstorm_brief`: Contains the form data
  - `brainstorm_pending`: Set to `'true'`
- User is redirected to `/checkout` page
- User completes payment via Stripe

### Step 3: Payment Success & Auto-Generate Ideas
- After successful payment, Stripe **directly redirects** to `/brainstorm` (no intermediate page!)
- Upon landing on `/brainstorm`:
  - Page detects `brainstorm_pending` flag
  - Loads saved brief from localStorage
  - Automatically submits the brief to AI
  - Clears localStorage flags
  - Shows loading animation
  - Generates creative triggers using Gemini AI
  - User can then:
    - Swipe through triggers (save/dismiss)
    - Start workshop mode
    - Export ideas as CSV

## Technical Implementation

### Files Modified:
1. **BriefForm.tsx** - Stores data & redirects to checkout
2. **create-checkout-session/route.ts** - Stripe success URL points directly to `/brainstorm`
3. **brainstorm/page.tsx** - Auto-loads & processes saved brief, clears cart after payment

### localStorage Keys Used:
- `brainstorm_brief`: JSON string of the brief data
- `brainstorm_pending`: Flag indicating payment pending ('true')

## Testing the Flow

1. Start the app: `npm run dev`
2. Go to http://localhost:3000/brainstorm
3. Fill out the form
4. Click "Ignite Ideas" → Redirects to `/checkout`
5. Complete checkout (use Stripe test card: `4242 4242 4242 4242`)
6. After payment success → **Instantly redirects to `/brainstorm`** (no intermediate page!)
7. Ideas generate automatically with AI

## Notes
- All data is temporarily stored in localStorage
- Data is cleared after successful processing
- Cart is automatically cleared after payment
- Payment query parameters are removed from URL automatically
- If user doesn't complete checkout, data remains for next visit
- Works seamlessly with existing Stripe integration
- **No intermediate success page** - goes directly to brainstorming after payment!
