import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, RotateCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/ai")({
  component: AIGeneratorPage,
});

interface Result {
  caption: string;
  hashtags: string[];
  alternatives: string[];
}

function generate(idea: string): Result {
  const base = idea.trim() || "your brand";
  return {
    caption: `✨ ${base.charAt(0).toUpperCase() + base.slice(1)} — but make it unforgettable. Tap in for the full vibe and let us know what you think 👇`,
    hashtags: ["#brandstory", "#contentcreator", "#instagrowth", "#dailyinspo", "#aestheticfeed", "#smallbusiness", "#nexa", "#socialmedia"],
    alternatives: [
      `New drop, who dis? Here's everything you need to know about ${base}.`,
      `We've been working on something special. ${base} is finally here — and it's worth the wait.`,
      `POV: you just discovered ${base}. Save this for later — you'll thank us.`,
    ],
  };
}

function AIGeneratorPage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!idea.trim()) {
      toast.error("Describe your post idea first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult(generate(idea));
      setLoading(false);
      toast.success("Caption generated");
    }, 700);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Generator</h1>
        <p className="text-muted-foreground mt-1">Turn an idea into a ready-to-post caption + hashtags.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-5">
          <div>
            <Label className="text-xs text-muted-foreground">Your idea</Label>
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your post idea… e.g. 'launching a new lavender oat latte at our cafe'"
              rows={6}
              className="mt-2 bg-card/40 border-border resize-none"
            />
          </div>

          <Button variant="hero" size="lg" className="w-full" onClick={handleGenerate} disabled={loading}>
            {loading ? <><RotateCw className="animate-spin" /> Generating…</> : <><Sparkles /> Generate</>}
          </Button>

          <div className="text-xs text-muted-foreground">
            Tip: include tone (playful, premium), audience, and call-to-action for best results.
          </div>
        </div>

        <div className="lg:col-span-3 space-y-5">
          {!result ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">Your generated caption appears here</h3>
              <p className="text-sm text-muted-foreground mt-1">Describe an idea on the left to get started.</p>
            </div>
          ) : (
            <>
              <ResultCard title="Caption" onCopy={() => copy(result.caption)}>
                <p className="text-sm leading-relaxed">{result.caption}</p>
              </ResultCard>

              <ResultCard title="Hashtags" onCopy={() => copy(result.hashtags.join(" "))}>
                <div className="flex flex-wrap gap-2">
                  {result.hashtags.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/30">
                      {h}
                    </span>
                  ))}
                </div>
              </ResultCard>

              <ResultCard title="Alternative versions">
                <div className="space-y-3">
                  {result.alternatives.map((a, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card/40 p-3 flex items-start gap-3">
                      <div className="text-xs font-mono text-muted-foreground mt-0.5">v{i + 1}</div>
                      <p className="text-sm flex-1">{a}</p>
                      <Button variant="ghost" size="icon" onClick={() => copy(a)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ResultCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, children, onCopy }: { title: string; children: React.ReactNode; onCopy?: () => void }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        {onCopy && (
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
