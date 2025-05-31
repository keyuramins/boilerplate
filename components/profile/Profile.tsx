/**
 * @file components/profile/Profile.tsx
 * @description User profile management component.
 * @author [Your Name]
 * @date 2024-07-31
 */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import { User } from '@supabase/supabase-js';

interface ProfileProps {
  initialUser: User | null;
}

export default function Profile({ initialUser }: ProfileProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [displayName, setDisplayName] = useState(initialUser?.user_metadata?.displayName || initialUser?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(initialUser?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    if (!supabaseBrowserClient) {
      setError("Supabase client not available.");
      setSaving(false);
      return;
    }
    if (!user) {
      setError("User not found.");
      setSaving(false);
      return;
    }
    if (!displayName.trim()) {
      setError("Display name cannot be blank.");
      setSaving(false);
      return;
    }
    if (displayName.trim().length < 3) {
      setError("Display name must be at least 3 characters.");
      setSaving(false);
      return;
    }
    const { error } = await supabaseBrowserClient.auth.updateUser({ data: { displayName } });
    if (error) setError("Failed to update display name");
    else setSuccess("Display name updated");
    setSaving(false);
  }

  async function handleChangePassword() {
    setPasswordError("");
    setPasswordSuccess("");
    if (!supabaseBrowserClient) {
      setPasswordError("Supabase client not available.");
      return;
    }
    if (!user) {
      setPasswordError("User not found.");
      return;
    }
    if (!newPassword || newPassword.length < 12) {
      setPasswordError("Password must be at least 12 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    const { error } = await supabaseBrowserClient.auth.updateUser({ password: newPassword });
    if (error) setPasswordError(error.message || "Failed to update password");
    else setPasswordSuccess("Password updated successfully.");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handleDeleteAccount() {
    setError("");
    setSuccess("");
    if (!user) {
      setError("User not found");
      return;
    }
    setShowDelete(false);
    // Call the API route
    const res = await fetch("/api/account/delete", { method: "POST" });
    const data = await res.json();
    if (data.status === "scheduled") {
      setSuccess("Account deletion scheduled after your subscription ends.");
      window.location.reload();
    } else if (data.status === "deleted") {
      setSuccess("Account deleted successfully. You will be logged out.");
      setTimeout(() => {
        if (supabaseBrowserClient) {
          supabaseBrowserClient.auth.signOut();
        }
        router.push("/");
      }, 2000);
    } else {
      setError(data.error || "Failed to delete account");
    }
  }

  async function handleCancelDelete() {
    setError("");
    setSuccess("");
    if (!user) {
      setError("User not found");
      return;
    }
    // Call API route to clear scheduled_account_deletion
    const res = await fetch("/api/account/delete/cancel-delete", { method: "POST" });
    const data = await res.json();
    if (data.status === "cancelled") {
      setSuccess("Account deletion cancelled.");
      // Optionally, refresh user data
      window.location.reload();
    } else {
      setError(data.error || "Failed to cancel account deletion");
    }
  }

  const hasActiveSubscription = !!user?.user_metadata?.subscription;
  const scheduledDeletion = user?.user_metadata?.scheduled_account_deletion;
  const subscriptionCancelAt = user?.user_metadata?.subscription_cancel_at;
  const deleteDisabled = !!scheduledDeletion;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="mb-4">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        <div className="mb-4 border border-border rounded p-4">
          <Label htmlFor="displayName" className="text-xl font-semibold">Display Name</Label>
          <Input
            id="displayName"
            className="mt-1"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            disabled={saving}
          />
          <Button className="mt-2" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
        <div className="mb-4 border border-border rounded p-4">
          <Label htmlFor="email" className="text-xl font-semibold">Email</Label>
          <Input
            id="email"
            className="mt-1"
            value={email}
            disabled
          />
        </div>
        <div className="mb-4 border border-border rounded p-4">
          {user?.app_metadata?.provider === 'google' ? (
            <div className="text-muted-foreground text-sm">You signed up with Google. Password change is not available for Google login accounts.</div>
          ) : user?.app_metadata?.provider === 'email' && (
            <div className="border border-border rounded p-4">
              <div className="text-xl font-semibold mb-2">Change Password</div>
              <p className="text-muted-foreground text-sm mb-3">Must be at least 12 characters long.</p>
              <div className="mb-2">
                <Label htmlFor="newPassword" className="text-lg font-semibold">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="mt-2"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <Label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="mt-2"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button className="mt-2" onClick={handleChangePassword} disabled={saving}>
                Change Password
              </Button>
              {passwordError && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}
              {passwordSuccess && (
                <Alert variant="default" className="mt-2">
                  <AlertDescription>{passwordSuccess}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
          {user && !user.app_metadata?.provider && user?.app_metadata?.provider !== 'email' && (
            <div className="text-muted-foreground text-sm">Password change is not available for social login accounts.</div>
          )}
        </div>
        <div className="mb-4">
          <Dialog open={showDelete} onOpenChange={setShowDelete}>
            <DialogTrigger asChild>
              <Button variant="destructive" disabled={deleteDisabled}>
                Delete Account
              </Button>
            </DialogTrigger>
            {scheduledDeletion && (
              <div className="mt-2 text-yellow-700 font-medium">
                Account is scheduled for deletion at {subscriptionCancelAt ? format(new Date(subscriptionCancelAt), 'PPP p') : 'unknown date'}
                <Button className="ml-4" variant="outline" onClick={handleCancelDelete}>
                  Cancel Delete
                </Button>
              </div>
            )}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  {hasActiveSubscription ? (
                    scheduledDeletion && subscriptionCancelAt ? (
                      <span className="text-red-700 font-semibold">
                        Your account is already scheduled for deletion on {format(new Date(subscriptionCancelAt), 'PPP p')} (after your subscription ends).
                      </span>
                    ) : scheduledDeletion ? (
                      <span className="text-red-700 font-semibold">
                        Your account is already scheduled for deletion on unknown date (after your subscription ends).
                      </span>
                    ) : (
                    <span className="text-red-700 font-semibold">
                        You have an active subscription. Deleting your account will schedule it for deletion after your subscription ends{subscriptionCancelAt ? ` on ${format(new Date(subscriptionCancelAt), 'PPP p')}` : ''}.
                    </span>
                    )
                  ) : (
                    <span className="text-red-700 font-semibold">
                      Warning: This action is irreversible. Your account and all data will be deleted.
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                {hasActiveSubscription && !scheduledDeletion && !subscriptionCancelAt ? (
                  <>
                    <Button asChild variant="outline">
                      <Link href="/subscription">Manage Subscription</Link>
                    </Button>
                    <Button variant="outline" onClick={() => setShowDelete(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Confirm Delete
                    </Button>
                    <Button variant="outline" onClick={() => setShowDelete(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
} 