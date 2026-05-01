import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Instagram, Calendar, CheckCircle2, Plus, Sparkles, Upload, ArrowUpRight } from "lucide-react";
import { accounts, posts } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const connected = accounts.filter((a) => a.status === "connected").length;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const postedThisWeek = posts.filter((p) => p.status === "posted").length;

  const stats = [
    { label: "Connected accounts", value: connected, icon: Instagram, hint: `${accounts.length - connected} disconnected` },
    { label: "Scheduled posts", value: scheduledCount, icon: Calendar, hint: "Across all clients" },
    { label: "Posted this week", value: postedThisWeek, icon: CheckCircle2, hint: "+18% vs last week" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening across your clients today.</p>
        </div>
        <Button variant="hero" onClick={() => toast.success("Quick action ready")}>
          <Plus /> New Post
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-6 hover:shadow-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className="h-9 w-9 rounded-lg bg-primary/15 grid place-items-center">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-4xl font-bold">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Recent activity</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard/scheduler">View all <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="mt-4 divide-y divide-border">
            {posts.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-4 py-3">
                <div className="h-10 w-10 rounded-lg bg-card border border-border grid place-items-center text-lg">{p.thumb}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.caption}</div>
                  <div className="text-xs text-muted-foreground">{p.account} · {new Date(p.date).toLocaleString()}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <ActionBtn icon={Instagram} label="Connect Instagram" sub="Link a new client account" onClick={() => toast.success("Opening Instagram OAuth…")} />
            <ActionBtn icon={Upload} label="Create New Post" sub="Schedule for any account" onClick={() => toast.success("New post draft created")} />
            <ActionBtn icon={Sparkles} label="Generate AI Caption" sub="From a single idea" onClick={() => toast.success("Opening AI Generator…")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, sub, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card/40 p-3 hover:bg-card/70 hover:border-primary/40 transition-all"
    >
      <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </button>
  );
}

export function StatusBadge({ status }: { status: "scheduled" | "posted" | "failed" }) {
  const map = {
    scheduled: "bg-accent/15 text-accent border-accent/30",
    posted: "bg-success/15 text-success border-success/30",
    failed: "bg-destructive/15 text-destructive border-destructive/30",
  } as const;
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${map[status]}`}>
      {status}
    </span>
  );
}
