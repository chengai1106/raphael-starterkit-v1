import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionStatusCard } from "@/components/dashboard/subscription-status-card";
import { CreditsBalanceCard } from "@/components/dashboard/credits-balance-card";
import { QuickActionsCard } from "@/components/dashboard/quick-actions-card";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Query all customers for this user to handle multiple subscriptions
  const { data: allCustomers, error: customersError } = await supabase
    .from("customers")
    .select(
      `
      *,
      subscriptions (
        status,
        current_period_end,
        creem_product_id,
        current_period_start,
        canceled_at
      ),
      credits_history (
        amount,
        type,
        created_at
      )
    `
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (customersError) {
    console.error("❌ Error fetching customers:", customersError);
  }

  // Aggregate data: combine credits and find active subscription
  let totalCredits = 0;
  let allCreditsHistory: any[] = [];
  let activeSubscription = null;

  if (allCustomers && allCustomers.length > 0) {
    // Calculate total credits
    totalCredits = allCustomers.reduce((sum, customer) => sum + (customer.credits || 0), 0);
    
    // Merge credits history
    allCustomers.forEach(customer => {
      if (customer.credits_history) {
        allCreditsHistory.push(...customer.credits_history);
      }
    });

    // Find active subscription (priority: active > trialing > others)
    const allSubscriptions = allCustomers.flatMap(customer => customer.subscriptions || []);

    const sortedSubscriptions = allSubscriptions.sort((a, b) => {
      const statusPriority = { 'active': 1, 'trialing': 2, 'canceled': 3, 'expired': 4 };
      const aPriority = statusPriority[a.status as keyof typeof statusPriority] || 5;
      const bPriority = statusPriority[b.status as keyof typeof statusPriority] || 5;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // If same status, choose the newest
      return new Date(b.current_period_end || 0).getTime() - new Date(a.current_period_end || 0).getTime();
    });

    activeSubscription = sortedSubscriptions[0] || null;
  }

  // Sort credits history
  const recentCreditsHistory = allCreditsHistory
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 2);

  return (
    <div className="flex-1 w-full flex flex-col gap-6 sm:gap-8 px-4 sm:px-8 container">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-lg p-6 sm:p-8 mt-6 sm:mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
          Welcome back,{" "}
          <span className="block sm:inline mt-1 sm:mt-0">{user.email}</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your subscription and credits from your personal dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SubscriptionStatusCard subscription={activeSubscription} />
        <CreditsBalanceCard
          credits={totalCredits}
          recentHistory={recentCreditsHistory}
        />
        <QuickActionsCard />
      </div>

      {/* User Details Section */}
      <div className="rounded-xl border bg-card p-4 sm:p-6 mb-6">
        <h2 className="font-bold text-lg sm:text-xl mb-4">Account Details</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">User ID</p>
              <p className="font-medium break-all">{user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
