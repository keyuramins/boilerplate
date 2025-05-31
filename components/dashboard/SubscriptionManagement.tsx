"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import SubscribeButton from "@/components/SubscribeButton";
import { format } from 'date-fns';

export default function SubscriptionManagement({ upgradePriceId }: { upgradePriceId: string }) {
  if (!supabaseBrowserClient) return null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscription, setSubscription] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelAt, setCancelAt] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSub() {
      setLoading(true);
      setError("");
      const { data, error } = await supabaseBrowserClient!.auth.getUser();
      if (error) {
        setError("Failed to load user");
        setLoading(false);
        return;
      }
      setSubscription(data.user?.user_metadata?.subscription || null);
      setCancelAt(data.user?.user_metadata?.subscription_cancel_at || null);
      setLoading(false);
    }
    fetchSub();
  }, []);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      if (!res.ok) throw new Error("Failed to get billing portal link");
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError("Failed to open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-card rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Manage Subscription</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="font-semibold my-5">Current Plan:&nbsp;
        <span className="text-xl font-semibold">{subscription ? "Premium" : "Free"}</span>
      </div>
      {subscription && cancelAt && (
        <div className="mb-4 text-yellow-700 font-medium">
          Subscription will end on: {format(new Date(cancelAt), 'PPP p')}
        </div>
      )}
      {!subscription ? (
        <SubscribeButton priceId={upgradePriceId} label="Upgrade Now" />
      ) : (
        <>
          <Button disabled className="w-full mb-3">You are already Premium</Button>
          <Button
            onClick={handleManageBilling}
            className="w-full"
            variant="outline"
            disabled={portalLoading}
            aria-label={cancelAt ? 'Stop Cancellation' : 'Manage Billing (Cancel/Update)'}
            title={cancelAt ? 'Stop your subscription from being cancelled at the end of the period' : 'Manage or cancel your subscription'}
          >
            {portalLoading ? "Loading..." : cancelAt ? "Stop Cancellation" : "Manage Billing (Cancel/Update)"}
          </Button>
        </>
      )}
    </div>
  );
} 