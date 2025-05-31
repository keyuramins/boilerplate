"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";

export default function RefreshSessionOnCheckout() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function refreshAndCheck() {
      try {
        const userResponse = await supabaseBrowserClient?.auth.getUser();
        const userData = userResponse?.data;
        const userError = userResponse?.error;
        if (userError || !userData?.user) {
          setIsAuthenticated(false);
          setPlan(null);
          return;
        }
        setIsAuthenticated(true);
        if (searchParams.get("checkout") === "success") {
          await supabaseBrowserClient?.auth.getSession();
        }
        if (userData.user.user_metadata?.subscription) {
          setPlan("Premium");
        } else {
          setPlan("Free");
        }
      } catch (err) {
        setIsAuthenticated(false);
        setPlan(null);
      }
    }
    refreshAndCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (isAuthenticated === false || plan === null) return null;
  return (
    <div className="mb-4 text-right text-sm text-muted-foreground">
      <span className="font-semibold">Current Plan:</span> {plan}
    </div>
  );
} 