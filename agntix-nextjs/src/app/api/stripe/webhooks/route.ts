import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import Stripe from 'stripe';

// This is important for webhooks to work with raw body
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Payment successful!', session);

        // TODO: Fulfill the order
        // - Save order to database
        // - Send confirmation email
        // - Update inventory
        await handleCheckoutSessionCompleted(session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent was successful!', paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment);
        // TODO: Handle failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Error handling webhook event:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Extract order details
  const {
    id,
    amount_total,
    currency,
    customer_email,
    customer_details,
    metadata,
    payment_status,
  } = session;

  console.log('Order Details:', {
    sessionId: id,
    amountTotal: amount_total,
    currency,
    customerEmail: customer_email,
    customerDetails,
    billingDetails: metadata?.billingDetails,
    paymentStatus: payment_status,
  });

  // TODO: Implement your business logic here:
  // 1. Save order to your database
  // 2. Send confirmation email to customer
  // 3. Update product inventory
  // 4. Trigger order fulfillment process

  // Example: Save to database (you'll need to implement this)
  // await db.orders.create({
  //   stripeSessionId: id,
  //   amount: amount_total,
  //   currency,
  //   customerEmail: customer_email,
  //   status: 'paid',
  //   metadata: metadata,
  // });

  return true;
}
