import { NextResponse } from "next/server";
import { CreemWebhookEvent } from "@/types/creem";
import {
  createOrUpdateCustomer,
  createOrUpdateSubscription,
  addCreditsToCustomer,
} from "@/utils/supabase/subscriptions";

const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  console.log("🚨 WEBHOOK RECEIVED:", new Date().toISOString());
  
  // Read the body and headers here, before creating the async handler
  const body = await request.text();
  const headers = Object.fromEntries(request.headers.entries());
  
  // Immediate 200 response
  setTimeout(() => processWebhookAsync(body, headers), 0);
  
  return new Response(JSON.stringify({ received: true, timestamp: new Date().toISOString() }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function processWebhookAsync(body: string, headers: Record<string, string>) {
  try {
    console.log("🔄 Processing webhook, body length:", body.length);
    
    // Parse JSON
    let event: CreemWebhookEvent;
    try {
      event = JSON.parse(body) as CreemWebhookEvent;
      console.log("✅ Processing event:", event.eventType, "ID:", event.id);
    } catch (parseError) {
      console.error("❌ JSON parsing failed:", parseError);
      throw new Error(`JSON parsing failed: ${(parseError as Error).message || String(parseError)}`);
    }
    
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
        console.log(`⚠️ Unhandled event type: ${event.eventType}`);
    }
    
    console.log("✅ Webhook processed successfully");
    
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    console.error("📋 Error message:", (error as Error).message || String(error));
  }
}

async function handleCheckoutCompleted(event: CreemWebhookEvent) {
  console.log("🛒 Processing checkout completed:", event.object.id);
  
  try {
    const checkout = event.object;
    
    // Extract user_id (try both locations)
    const userId = checkout.order?.metadata?.user_id || checkout.metadata?.user_id;
    
    if (!userId) {
      console.error("❌ No user_id found in checkout metadata");
      throw new Error("Missing user_id in checkout metadata");
    }

    console.log("👤 Found user_id:", userId);

    // Create or update customer
    const customerId = await createOrUpdateCustomer(checkout.customer, userId);
    console.log("✅ Customer updated, ID:", customerId);

    // Handle product type
    const productType = checkout.metadata?.product_type || checkout.order?.metadata?.product_type;
    
    if (productType === "credits") {
      const creditsAmount = checkout.metadata?.credits || checkout.order?.metadata?.credits;
      if (creditsAmount) {
        await addCreditsToCustomer(customerId, creditsAmount, checkout.order.id, `Purchased ${creditsAmount} credits`);
        console.log("✅ Credits added:", creditsAmount);
      }
    } else if (checkout.subscription) {
      await createOrUpdateSubscription(checkout.subscription, customerId);
      console.log("✅ Subscription updated");
    }

    console.log("✅ Checkout completed successfully");

  } catch (error) {
    console.error("❌ Error in handleCheckoutCompleted:", error);
    throw error;
  }
}

async function handleSubscriptionActive(event: CreemWebhookEvent) {
  console.log("📱 Processing subscription active:", event.object.id);
  
  try {
    const subscription = event.object;
    const userId = subscription.metadata?.user_id;
    
    if (!userId) {
      throw new Error("Missing user_id in subscription metadata");
    }

    const customerId = await createOrUpdateCustomer(subscription.customer as any, userId);
    await createOrUpdateSubscription(subscription, customerId);
    
    console.log("✅ Subscription activated successfully");
    
  } catch (error) {
    console.error("❌ Error in handleSubscriptionActive:", error);
    throw error;
  }
}

async function handleSubscriptionPaid(event: CreemWebhookEvent) {
  console.log("💰 Processing subscription paid:", event.object.id);
  
  try {
    const subscription = event.object;
    const userId = subscription.metadata?.user_id;
    
    if (!userId) {
      throw new Error("Missing user_id in subscription metadata");
    }

    const customerId = await createOrUpdateCustomer(subscription.customer as any, userId);
    await createOrUpdateSubscription(subscription, customerId);
    
    console.log("✅ Subscription payment processed successfully");
    
  } catch (error) {
    console.error("❌ Error in handleSubscriptionPaid:", error);
    throw error;
  }
}

async function handleSubscriptionCanceled(event: CreemWebhookEvent) {
  console.log("❌ Processing subscription canceled:", event.object.id);
  
  try {
    const subscription = event.object;
    const userId = subscription.metadata?.user_id;
    
    if (!userId) {
      throw new Error("Missing user_id in subscription metadata");
    }

    const customerId = await createOrUpdateCustomer(subscription.customer as any, userId);
    await createOrUpdateSubscription(subscription, customerId);
    
    console.log("✅ Subscription cancellation processed successfully");
    
  } catch (error) {
    console.error("❌ Error in handleSubscriptionCanceled:", error);
    throw error;
  }
}

async function handleSubscriptionExpired(event: CreemWebhookEvent) {
  console.log("⏰ Processing subscription expired:", event.object.id);
  
  try {
    const subscription = event.object;
    const userId = subscription.metadata?.user_id;
    
    if (!userId) {
      throw new Error("Missing user_id in subscription metadata");
    }

    const customerId = await createOrUpdateCustomer(subscription.customer as any, userId);
    await createOrUpdateSubscription(subscription, customerId);
    
    console.log("✅ Subscription expiration processed successfully");
    
  } catch (error) {
    console.error("❌ Error in handleSubscriptionExpired:", error);
    throw error;
  }
}

async function handleSubscriptionTrialing(event: CreemWebhookEvent) {
  console.log("🆓 Processing subscription trialing:", event.object.id);
  
  try {
    const subscription = event.object;
    const userId = subscription.metadata?.user_id;
    
    if (!userId) {
      throw new Error("Missing user_id in subscription metadata");
    }

    const customerId = await createOrUpdateCustomer(subscription.customer as any, userId);
    await createOrUpdateSubscription(subscription, customerId);
    
    console.log("✅ Subscription trial processed successfully");
    
  } catch (error) {
    console.error("❌ Error in handleSubscriptionTrialing:", error);
    throw error;
  }
}
