import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AiInput } from "@/components/ui/ai-input";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ClientOnly } from "@/components/ui/client-only";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import MacOSDock from "@/components/ui/mac-os-dock";
import { Sparkles, Calendar, Users, BarChart3, Check, Instagram, Zap, ArrowRight } from "lucide-react";

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
  const socialApps = [
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' 
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' 
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg' 
    },
  ];

  const handleAppClick = (appId: string) => {
    console.log('App clicked:', appId);
    // For demo, perhaps open links or something
    if (appId === 'instagram') window.open('https://instagram.com', '_blank');
    if (appId === 'youtube') window.open('https://youtube.com', '_blank');
    if (appId === 'tiktok') window.open('https://tiktok.com', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-xl bg-background/60">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary shadow-glow grid place-items-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">NEXA<span className="text-gradient">Social</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <Link to="/dashboard" className="hover:text-foreground transition">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/dashboard">Sign in</Link>
            </Button>
            <Button asChild variant="hero" size="sm">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <CinematicHero />

      {/* Social Media Dock */}
      <div className="flex justify-center py-16 bg-[#F8F8F8]">
        <MacOSDock
          apps={socialApps}
          onAppClick={handleAppClick}
          openApps={[]}
        />
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need to <span className="text-gradient">scale content</span>
          </h2>
          <p className="mt-4 text-muted-foreground">A complete toolkit for modern social media teams.</p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: "AI Content Generation", desc: "Generate captions and hashtags tuned to your brand voice in seconds." },
            { icon: Calendar, title: "Instagram Scheduling", desc: "Plan weeks of content with a beautiful calendar and queue." },
            { icon: Users, title: "Multi-Account Management", desc: "Switch between clients without ever logging out." },
            { icon: BarChart3, title: "Basic Analytics", desc: "Track posted, scheduled, and failed content at a glance." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 hover:shadow-glow transition-all hover:-translate-y-1">
              <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you grow.</p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { name: "Free", price: "$0", desc: "For solo creators getting started.", features: ["1 Instagram account", "10 scheduled posts/mo", "Basic AI captions"], cta: "Start free", featured: false },
            { name: "Pro", price: "$19", desc: "For freelancers managing a few clients.", features: ["5 Instagram accounts", "Unlimited scheduling", "Advanced AI captions", "Priority support"], cta: "Start Pro", featured: true },
            { name: "Agency", price: "$79", desc: "For agencies running many brands.", features: ["Unlimited accounts", "Team collaboration", "Custom AI tones", "Dedicated manager"], cta: "Start Agency", featured: false },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 border ${
                p.featured
                  ? "bg-gradient-primary/10 border-primary/40 shadow-glow"
                  : "glass"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                  Most popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-5xl font-bold">{p.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.featured ? "hero" : "glass"} size="lg" className="w-full mt-8">
                <Link to="/dashboard">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="glass rounded-3xl p-12 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-bold">Ready to ship content faster?</h3>
            <p className="mt-3 text-muted-foreground">Join agencies automating their Instagram workflow with NEXA.</p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <Link to="/dashboard">Open the Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2026 NEXA Social. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
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
