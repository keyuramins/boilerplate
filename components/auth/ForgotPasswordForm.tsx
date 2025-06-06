"use client";
import { useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = supabaseBrowserClient;

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    if (!supabase) {
      setError("Supabase client not initialized");
      setLoading(false);
      return;
    }
    // Check provider first
    try {
      const res = await fetch("/api/check-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setError("No account found with that email.");
        setLoading(false);
        return;
      }
      const { provider } = await res.json();
      if (provider !== "email") {
        setError("This account uses Google login. Please use 'Login with Google' to sign in.");
        setLoading(false);
        return;
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
      return;
    }
    // If provider is email, proceed with reset
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent! Please check your inbox.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleForgotPassword} className="w-full max-w-md p-8 rounded-xl shadow bg-card border border-border">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Forgot Password</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-foreground font-medium">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        {message && <div className="mb-4 text-green-600 text-sm">{message}</div>}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </Button>
      </form>
    </div>
  );
} 