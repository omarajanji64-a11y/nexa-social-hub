import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Calendar, Sparkles, Settings, Bell, Search, Sparkles as Logo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/accounts", label: "Accounts", icon: Users },
  { to: "/dashboard/scheduler", label: "Scheduler", icon: Calendar },
  { to: "/dashboard/ai", label: "AI Generator", icon: Sparkles },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Logo className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight">NEXA<span className="text-gradient">Social</span></span>
        </Link>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-glow font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="glass rounded-xl p-4">
            <div className="text-xs text-muted-foreground">Plan</div>
            <div className="mt-1 font-semibold">Pro Trial</div>
            <div className="text-xs text-muted-foreground mt-1">12 days left</div>
            <Button variant="hero" size="sm" className="w-full mt-3">Upgrade</Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/40 backdrop-blur-xl flex items-center gap-4 px-6 sticky top-0 z-30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts, accounts…" className="pl-9 bg-card/40 border-border" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-sm font-semibold text-primary-foreground shadow-glow">
              N
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
