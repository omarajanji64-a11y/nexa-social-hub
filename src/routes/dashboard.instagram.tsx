import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Instagram, Calendar, CheckCircle2, Plus, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/dashboard/instagram")({
  component: InstagramDashboard,
});

function InstagramDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Instagram className="h-8 w-8 text-pink-500" />
            Instagram Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your Instagram accounts and posts.</p>
        </div>
        <Button variant="hero">
          <Plus /> New Instagram Post
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Connected Accounts</span>
            <div className="h-9 w-9 rounded-lg bg-pink-500/15 grid place-items-center">
              <Instagram className="h-4 w-4 text-pink-500" />
            </div>
          </div>
          <div className="mt-4 text-4xl font-bold">3</div>
          <div className="mt-1 text-xs text-muted-foreground">Active Instagram accounts</div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Scheduled Posts</span>
            <div className="h-9 w-9 rounded-lg bg-blue-500/15 grid place-items-center">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 text-4xl font-bold">12</div>
          <div className="mt-1 text-xs text-muted-foreground">Ready to post</div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Posts This Week</span>
            <div className="h-9 w-9 rounded-lg bg-green-500/15 grid place-items-center">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="mt-4 text-4xl font-bold">8</div>
          <div className="mt-1 text-xs text-muted-foreground">Successfully posted</div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Instagram Activity</h3>
        <p className="text-muted-foreground">Instagram-specific features and posts would be displayed here.</p>
      </div>
    </div>
  );
}