# Stripe Payment - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your Stripe Keys

1. Go to https://stripe.com and create an account (or login)
2. Navigate to **Developers > API Keys**
3. Copy your **Publishable Key** (starts with `pk_test_`)
4. Copy your **Secret Key** (starts with `sk_test_`)

### Step 2: Configure Environment Variables

1. Open the file: `.env.local`
2. Replace the placeholder values:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
```

### Step 3: Run the Application

```bash
npm run dev
```

### Step 4: Test Payment

1. Navigate to: http://localhost:3000/checkout
2. Fill in billing details (use any test data)
3. Select **"Credit/Debit Card (Stripe)"** payment method
4. Click **"Place Order"**
5. You'll be redirected to Stripe Checkout
6. Use test card: `4242 4242 4242 4242`
7. Enter any future date for expiry (e.g., `12/34`)
8. Enter any 3-digit CVC (e.g., `123`)
9. Enter any ZIP code (e.g., `12345`)
10. Click **Pay**
11. You'll be redirected to the success page!

---

## 📝 Test Cards

| Scenario | Card Number | Result |
|----------|-------------|--------|
| Success | 4242 4242 4242 4242 | Payment succeeds |
| Decline | 4000 0000 0000 0002 | Payment declined |
| 3D Secure | 4000 0025 0000 3155 | Requires authentication |

**Always use:**
- Any future expiry date
- Any 3-digit CVC
- Any ZIP code

---

## 🔧 Webhook Setup (Optional for Local Testing)

### Install Stripe CLI

**Windows:**
```bash
scoop install stripe
```

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

### Login and Forward Webhooks

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

Copy the webhook secret that appears and add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

---

## ✅ Verification Checklist

- [ ] Stripe account created
- [ ] API keys copied to `.env.local`
- [ ] Development server running (`npm run dev`)
- [ ] Can access checkout page
- [ ] Stripe payment option appears
- [ ] Test payment completes successfully
- [ ] Redirected to success page

---

## 🆘 Common Issues

### Issue: "Invalid API key"

**Solution:**
- Make sure you've replaced the placeholder keys in `.env.local`
- Restart the dev server after changing environment variables

### Issue: Can't redirect to Stripe

**Solution:**
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly (note the `NEXT_PUBLIC_` prefix)

### Issue: Webhook not working locally

**Solution:**
- Install Stripe CLI
- Run `stripe listen --forward-to localhost:3000/api/stripe/webhooks`
- Copy the webhook secret to `.env.local`

---

## 📚 Need More Help?

- **Full Documentation:** See `STRIPE_INTEGRATION_GUIDE.md`
- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing

---

## 🎯 Next Steps

After testing locally:

1. **Set up webhooks in Stripe Dashboard:**
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhooks`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`

2. **Deploy to production:**
   - Switch to live API keys
   - Update `NEXT_PUBLIC_APP_URL` to your domain
   - Configure production webhooks

3. **Add features:**
   - Database integration for orders
   - Email confirmations
   - Inventory management
   - Customer dashboard

---

Happy coding! 🎉
