import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { accounts } from "@/lib/mock-data";
import { Plus, Instagram, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage all connected Instagram accounts in one place.</p>
        </div>
        <Button variant="hero" onClick={() => toast.success("Connecting Instagram account…")}>
          <Plus /> Add Account
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((a) => (
          <div key={a.id} className="glass rounded-2xl p-6 hover:shadow-glow transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <Instagram className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{a.username}</div>
                  <div className="text-xs text-muted-foreground">{a.client}</div>
                </div>
              </div>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat label="Followers" value={a.followers} />
              <Stat label="Scheduled" value={a.scheduled.toString()} />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${
                a.status === "connected"
                  ? "bg-success/15 text-success border-success/30"
                  : "bg-muted text-muted-foreground border-border"
              }`}>
                {a.status === "connected" ? "● Connected" : "○ Disconnected"}
              </span>
              <Button
                variant={a.status === "connected" ? "glass" : "hero"}
                size="sm"
                onClick={() => toast.success(a.status === "connected" ? "Account managed" : "Reconnecting…")}
              >
                {a.status === "connected" ? "Manage" : "Reconnect"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card/40 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
