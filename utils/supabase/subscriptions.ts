import { createServiceRoleClient } from "./service-role";
import { CreemCustomer, CreemSubscription } from "@/types/creem";

export async function createOrUpdateCustomer(
  creemCustomer: CreemCustomer,
  userId: string
) {
  console.log("👥 Creating/updating customer:", creemCustomer?.id, "for user:", userId);

  const supabase = createServiceRoleClient();

  try {
    const { data: existingCustomer, error: fetchError } = await supabase
      .from("customers")
      .select()
      .eq("creem_customer_id", creemCustomer.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ Database fetch error:", fetchError);
      throw fetchError;
    }

    if (existingCustomer) {
      console.log("✅ Updating existing customer:", existingCustomer.id);
      
      const updateData = {
        email: creemCustomer.email,
        name: creemCustomer.name,
        country: creemCustomer.country,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from("customers")
        .update(updateData)
        .eq("id", existingCustomer.id);

      if (error) {
        console.error("❌ Customer update error:", error);
        throw error;
      }
      
      console.log("✅ Customer updated successfully");
      return existingCustomer.id;
    }

    console.log("➕ Creating new customer");
    const insertData = {
      user_id: userId,
      creem_customer_id: creemCustomer.id,
      email: creemCustomer.email,
      name: creemCustomer.name,
      country: creemCustomer.country,
      updated_at: new Date().toISOString(),
    };

    const { data: newCustomer, error } = await supabase
      .from("customers")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("❌ Customer insert error:", error);
      throw error;
    }
    
    console.log("✅ New customer created:", newCustomer.id);
    return newCustomer.id;
    
  } catch (error) {
    console.error("❌ Error in createOrUpdateCustomer:", error);
    throw error;
  }
}

export async function createOrUpdateSubscription(
  creemSubscription: CreemSubscription,
  customerId: string
) {
  console.log("📱 Creating/updating subscription:", creemSubscription?.id, "for customer:", customerId);

  const supabase = createServiceRoleClient();

  try {
    const { data: existingSubscription, error: fetchError } = await supabase
      .from("subscriptions")
      .select()
      .eq("creem_subscription_id", creemSubscription.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("❌ Database fetch error:", fetchError);
      throw fetchError;
    }

    const subscriptionData = {
      customer_id: customerId,
      creem_product_id:
        typeof creemSubscription?.product === "string"
          ? creemSubscription?.product
          : creemSubscription?.product?.id,
      status: creemSubscription?.status,
      current_period_start: creemSubscription?.current_period_start_date,
      current_period_end: creemSubscription?.current_period_end_date,
      canceled_at: creemSubscription?.canceled_at,
      metadata: creemSubscription?.metadata,
      updated_at: new Date().toISOString(),
    };

    if (existingSubscription) {
      console.log("✅ Updating existing subscription:", existingSubscription.id);
      
      const { error } = await supabase
        .from("subscriptions")
        .update(subscriptionData)
        .eq("id", existingSubscription.id);

      if (error) {
        console.error("❌ Subscription update error:", error);
        throw error;
      }

      console.log("✅ Subscription updated successfully");
      return existingSubscription.id;
    }

    console.log("➕ Creating new subscription");
    const insertData = {
      ...subscriptionData,
      creem_subscription_id: creemSubscription.id,
    };

    const { data: newSubscription, error } = await supabase
      .from("subscriptions")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("❌ Subscription insert error:", error);
      throw error;
    }

    console.log("✅ New subscription created:", newSubscription.id);
    return newSubscription.id;
    
  } catch (error) {
    console.error("❌ Error in createOrUpdateSubscription:", error);
    throw error;
  }
}

export async function getUserSubscription(userId: string) {
  const supabase = createServiceRoleClient();

  // First get the customer for this user
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (customerError || !customer) {
    return null;
  }

  // Then get their active subscription
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("customer_id", customer.id)
    .eq("status", "active")
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}

export async function addCreditsToCustomer(
  customerId: string,
  credits: number,
  creemOrderId?: string,
  description?: string
) {
  console.log("💳 Adding credits:", credits, "to customer:", customerId);

  const supabase = createServiceRoleClient();
  
  try {
    const { data: client, error: clientError } = await supabase
      .from("customers")
      .select("credits")
      .eq("id", customerId)
      .single();
      
    if (clientError) {
      console.error("❌ Error fetching customer:", clientError);
      throw clientError;
    }
    
    if (!client) {
      console.error("❌ Customer not found:", customerId);
      throw new Error("Customer not found");
    }
    
    const currentCredits = client.credits || 0;
    const newCredits = currentCredits + credits;
    
    console.log("🧮 Credits update:", currentCredits, "→", newCredits);

    // Update customer credits
    const { error: updateError } = await supabase
      .from("customers")
      .update({ 
        credits: newCredits, 
        updated_at: new Date().toISOString() 
      })
      .eq("id", customerId);

    if (updateError) {
      console.error("❌ Error updating customer credits:", updateError);
      throw updateError;
    }
    
    console.log("✅ Customer credits updated");

    // Record the transaction in credits_history
    const historyData = {
      customer_id: customerId,
      amount: credits,
      type: "add",
      description: description || "Credits purchase",
      creem_order_id: creemOrderId,
    };
    
    const { error: historyError } = await supabase
      .from("credits_history")
      .insert(historyData);

    if (historyError) {
      console.error("❌ Error recording credits history:", historyError);
      throw historyError;
    }
    
    console.log("✅ Credits history recorded");
    return newCredits;
    
  } catch (error) {
    console.error("❌ Error in addCreditsToCustomer:", error);
    throw error;
  }
}

export async function useCredits(
  customerId: string,
  credits: number,
  description: string
) {
  const supabase = createServiceRoleClient();

  // Start a transaction
  const { data: client } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();
  if (!client) throw new Error("Customer not found");
  if ((client.credits || 0) < credits) throw new Error("Insufficient credits");

  const newCredits = client.credits - credits;

  // Update customer credits
  const { error: updateError } = await supabase
    .from("customers")
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq("id", customerId);

  if (updateError) throw updateError;

  // Record the transaction in credits_history
  const { error: historyError } = await supabase
    .from("credits_history")
    .insert({
      customer_id: customerId,
      amount: credits,
      type: "subtract",
      description,
    });

  if (historyError) throw historyError;

  return newCredits;
}

export async function getCustomerCredits(customerId: string) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("customers")
    .select("credits")
    .eq("id", customerId)
    .single();

  if (error) throw error;
  return data?.credits || 0;
}

export async function getCreditsHistory(customerId: string) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("credits_history")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
