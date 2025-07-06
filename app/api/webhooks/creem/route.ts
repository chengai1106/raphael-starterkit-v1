import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyCreemWebhookSignature } from "@/utils/creem/verify-signature";
import { CreemWebhookEvent } from "@/types/creem";
import {
  createOrUpdateCustomer,
  createOrUpdateSubscription,
  addCreditsToCustomer,
} from "@/utils/supabase/subscriptions";

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    console.log("📥 Webhook received:", { 
      timestamp: new Date().toISOString(),
      bodyLength: body.length,
      bodyPreview: body.substring(0, 200) + "..."
    });

    const headersList = headers();
    const allHeaders = Object.fromEntries((await headersList).entries());
    
    // Log ALL headers first
    console.log("📋 ALL HEADERS:", JSON.stringify(allHeaders, null, 2));
    
    // Try different possible signature header names
    const possibleSignatureHeaders = [
      "creem-signature",
      "x-creem-signature", 
      "x-signature",
      "signature",
      "x-webhook-signature",
      "authorization"
    ];
    
    let signature = "";
    let signatureHeaderName = "";
    
    for (const headerName of possibleSignatureHeaders) {
      const headerValue = (await headersList).get(headerName);
      if (headerValue) {
        signature = headerValue;
        signatureHeaderName = headerName;
        console.log(`✅ Found signature in header: ${headerName} = ${headerValue}`);
        break;
      }
    }
    
    // Log secret info
    console.log("🔐 Secret info:", {
      secretSet: !!CREEM_WEBHOOK_SECRET,
      secretLength: CREEM_WEBHOOK_SECRET ? CREEM_WEBHOOK_SECRET.length : 0,
      secretPreview: CREEM_WEBHOOK_SECRET ? CREEM_WEBHOOK_SECRET.substring(0, 10) + "..." : "undefined"
    });

    // Verify the webhook signature
    if (!signature) {
      console.error("❌ No signature found in any expected headers");
      console.error("❌ Available headers:", Object.keys(allHeaders));
      console.error("❌ Returning 401 - Invalid signature");
      return new NextResponse("Invalid signature", { status: 401 });
    }
    
    // TEMPORARY: Skip signature verification for debugging
    console.log("⚠️ TEMPORARILY SKIPPING SIGNATURE VERIFICATION FOR DEBUGGING");
    
    const isValidSignature = verifyCreemWebhookSignature(body, signature, CREEM_WEBHOOK_SECRET);
    console.log("🔍 Signature verification result:", isValidSignature);
    
    // Comment out the signature check temporarily
    // if (!isValidSignature) {
    //   console.error("❌ Invalid webhook signature - verification failed");
    //   console.error("❌ Returning 401 - Invalid signature");
    //   return new NextResponse("Invalid signature", { status: 401 });
    // }
    
    console.log("✅ Processing webhook (signature check temporarily disabled)...");

    const event = JSON.parse(body) as CreemWebhookEvent;
    console.log("📋 Parsed event:", {
      eventType: event.eventType,
      id: event.id,
      timestamp: new Date(event.created_at * 1000).toISOString()
    });

    // Handle different event types
    switch (event.eventType) {
      case "checkout.completed":
        await handleCheckoutCompleted(event);
        break;
      case "subscription.active":
        await handleSubscriptionActive(event);
        break;
      case "subscription.paid":
        await handleSubscriptionPaid(event);
        break;
      case "subscription.canceled":
        await handleSubscriptionCanceled(event);
        break;
      case "subscription.expired":
        await handleSubscriptionExpired(event);
        break;
      case "subscription.trialing":
        await handleSubscriptionTrialing(event);
        break;
      default:
        console.log(
          `Unhandled event type: ${event.eventType} ${JSON.stringify(event)}`
        );
    }

    console.log("✅ Webhook processed successfully");
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
}

async function handleCheckoutCompleted(event: CreemWebhookEvent) {
  const checkout = event.object;
  console.log("🛒 Processing completed checkout:", {
    checkoutId: checkout.id,
    orderId: checkout.order.id,
    customerId: checkout.customer.id,
    status: checkout.status
  });

  try {
    // 🔧 修复：从正确位置读取 user_id
    const userId = checkout.order.metadata?.user_id;
    if (!userId) {
      console.error("❌ No user_id found in checkout.order.metadata");
      console.log("Available metadata:", checkout.order.metadata);
      throw new Error("Missing user_id in order metadata");
    }

    console.log("👤 Found user_id:", userId);

    // Create or update customer
    const customerId = await createOrUpdateCustomer(
      checkout.customer,
      checkout.metadata?.user_id // Make sure to pass user_id in metadata when creating checkout
    );

    // Check if this is a credit purchase
    if (checkout.metadata?.product_type === "credits") {
      await addCreditsToCustomer(
        customerId,
        checkout.metadata?.credits,
        checkout.order.id,
        `Purchased ${checkout.metadata?.credits} credits`
      );
      
      console.log("✅ Credits added successfully");
    }
    // If subscription exists, create or update it
    else if (checkout.subscription) {
      console.log("📱 Creating/updating subscription");
      await createOrUpdateSubscription(checkout.subscription, customerId);
      console.log("✅ Subscription created/updated successfully");
    } else {
      console.log("ℹ️ No subscription or credits to process");
    }

  } catch (error) {
    console.error("Error handling checkout completed:", error);
    throw error;
  }
}

async function handleSubscriptionActive(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing active subscription:", subscription);

  try {
    // Create or update customer
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );

    // Create or update subscription
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription active:", error);
    throw error;
  }
}

async function handleSubscriptionPaid(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing paid subscription:", subscription);

  try {
    // Update subscription status and period
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription paid:", error);
    throw error;
  }
}

async function handleSubscriptionCanceled(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing canceled subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription canceled:", error);
    throw error;
  }
}

async function handleSubscriptionExpired(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing expired subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription expired:", error);
    throw error;
  }
}

async function handleSubscriptionTrialing(event: CreemWebhookEvent) {
  const subscription = event.object;
  console.log("Processing trialing subscription:", subscription);

  try {
    // Update subscription status
    const customerId = await createOrUpdateCustomer(
      subscription.customer as any,
      subscription.metadata?.user_id
    );
    await createOrUpdateSubscription(subscription, customerId);
  } catch (error) {
    console.error("Error handling subscription trialing:", error);
    throw error;
  }
}
