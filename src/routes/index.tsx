import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AiInput } from "@/components/ui/ai-input";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ClientOnly } from "@/components/ui/client-only";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { PlatformCanvas } from "@/components/ui/platform-canvas";
import { Sparkles, Calendar, Users, BarChart3, Check, Instagram, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXA Social — Automate Instagram for Your Clients" },
      { name: "description", content: "Schedule posts, generate AI captions, and manage multiple Instagram accounts in one beautiful dashboard." },
    ],
  }),
  component: Landing,
});

function Landing() {

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-[#D2D2D7] backdrop-blur-xl bg-white">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#0066CC] grid place-items-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#1D1D1F" }}>NEXA<span style={{ color: "#0066CC" }}>Social</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#6E6E73" }}>
            <a href="#features" className="hover:" style={{ color: "#1D1D1F" }}>Features</a>
            <a href="#pricing" className="hover:" style={{ color: "#1D1D1F" }}>Pricing</a>
            <Link to="/dashboard" style={{ color: "#1D1D1F" }}>Dashboard</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex" style={{ color: "#1D1D1F" }}>
              <Link to="/dashboard">Sign in</Link>
            </Button>
            <Button asChild size="sm" style={{ backgroundColor: "#0066CC", color: "white" }}>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <CinematicHero />

      {/* Platform Canvas with Dashboard Popup */}
      <PlatformCanvas />

      {/* Pricing */}
      <section id="pricing" className="w-full" style={{ backgroundColor: "#FFFFFF", paddingTop: "120px", paddingBottom: "96px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "#1D1D1F" }}>Simple, transparent pricing</h2>
            <p className="mt-4" style={{ color: "#6E6E73" }}>Start free. Upgrade when you grow.</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "$0", desc: "For solo creators getting started.", features: ["1 Instagram account", "10 scheduled posts/mo", "Basic AI captions"], cta: "Start free", featured: false },
              { name: "Pro", price: "$19", desc: "For freelancers managing a few clients.", features: ["5 Instagram accounts", "Unlimited scheduling", "Advanced AI captions", "Priority support"], cta: "Start Pro", featured: true },
              { name: "Agency", price: "$79", desc: "For agencies running many brands.", features: ["Unlimited accounts", "Team collaboration", "Custom AI tones", "Dedicated manager"], cta: "Start Agency", featured: false },
            ].map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-8 border`}
                style={{
                  backgroundColor: p.featured ? "#FFFFFF" : "#FFFFFF",
                  borderColor: p.featured ? "#0066CC" : "#D2D2D7"
                }}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "#0066CC", color: "white" }}>
                    Most popular
                  </div>
                )}
                <div className="text-sm" style={{ color: "#6E6E73" }}>{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-5xl font-bold" style={{ color: "#1D1D1F" }}>{p.price}</span>
                  <span style={{ color: "#6E6E73" }} className="text-sm">/mo</span>
                </div>
                <p className="mt-3 text-sm" style={{ color: "#6E6E73" }}>{p.desc}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2" style={{ color: "#1D1D1F" }}>
                      <Check className="h-4 w-4" style={{ color: "#0066CC" }} /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-full mt-8" style={{ backgroundColor: "#0066CC", color: "white" }}>
                  <Link to="/dashboard">{p.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full" style={{ backgroundColor: "#FFFFFF", padding: "96px 24px" }}>
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{ backgroundColor: "#F5F5F7", border: "1px solid #D2D2D7" }}>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold" style={{ color: "#1D1D1F" }}>Ready to ship content faster?</h3>
              <p className="mt-3" style={{ color: "#6E6E73" }}>Join agencies automating their Instagram workflow with NEXA.</p>
              <Button asChild size="xl" className="mt-8" style={{ backgroundColor: "#0066CC", color: "white" }}>
                <Link to="/dashboard">Open the Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #D2D2D7", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#6E6E73" }}>
          <div>© 2026 NEXA Social. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" style={{ color: "#6E6E73" }}>Privacy</a>
            <a href="#" style={{ color: "#6E6E73" }}>Terms</a>
            <a href="#" style={{ color: "#6E6E73" }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NexaAgentScrollPreview() {
  const queue = [
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df0852?auto=format&fit=crop&w=600&q=80",
      brand: "Northwind Cafe",
      task: "Brunch reel caption",
      status: "Ready",
    },
    {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      brand: "Luma Studio",
      task: "Launch carousel",
      status: "Queued",
    },
    {
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
      brand: "Verde Fitness",
      task: "Mobility post",
      status: "Review",
    },
  ];

  return (
    <ClientOnly>
      <ContainerScroll
      className="-mt-4"
      titleComponent={
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            NEXA Agent workspace
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Watch NEXA Agent turn a prompt into a content plan.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            The agent drafts captions, queues client posts, and keeps your Instagram calendar moving from one command.
          </p>
        </div>
      }
    >
      <div className="flex h-full flex-col bg-background text-left">
        <div className="flex h-14 items-center justify-between border-b border-border bg-card/60 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">NEXA Agent</div>
              <div className="text-xs text-muted-foreground">Autopilot content desk</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success md:flex">
            Live queue
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 p-4 md:grid-cols-[1.25fr_0.75fr] md:p-6">
          <div className="min-h-0 rounded-xl border border-border bg-card/60 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Today</div>
                <h3 className="mt-2 text-2xl font-bold">12 posts prepared</h3>
              </div>
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <Calendar className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {queue.map((item) => (
                <div key={item.brand} className="overflow-hidden rounded-lg border border-border bg-background/60">
                  <img src={item.image} alt={`${item.brand} content preview`} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <div className="text-xs text-muted-foreground">{item.brand}</div>
                    <div className="mt-1 text-sm font-medium">{item.task}</div>
                    <div className="mt-3 inline-flex rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4 text-warning" />
                Agent action
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                “Create next week’s posts for the agency accounts, reuse the winning tone from April, and leave anything risky for review.”
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { label: "Connected accounts", value: "16", icon: Instagram },
              { label: "Client approvals", value: "8", icon: Users },
              { label: "Projected lift", value: "+24%", icon: BarChart3 },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                  <metric.icon className="h-4 w-4 text-accent" />
                </div>
                <div className="mt-3 text-3xl font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </ContainerScroll>
    </ClientOnly>
  );
}
