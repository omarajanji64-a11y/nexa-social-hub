import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { accounts, posts } from "@/lib/mock-data";
import { Calendar, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "./dashboard.index";

export const Route = createFileRoute("/dashboard/scheduler")({
  component: SchedulerPage,
});

function SchedulerPage() {
  const [account, setAccount] = useState<string>(accounts[0].username);
  const [caption, setCaption] = useState("");
  const [datetime, setDatetime] = useState("");

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption || !datetime) {
      toast.error("Please add a caption and date.");
      return;
    }
    toast.success("Post scheduled successfully", {
      description: `${account} · ${new Date(datetime).toLocaleString()}`,
    });
    setCaption("");
    setDatetime("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scheduler</h1>
        <p className="text-muted-foreground mt-1">Plan, schedule, and review upcoming posts.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* New post */}
        <form onSubmit={handleSchedule} className="lg:col-span-2 glass rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-lg">Create scheduled post</h2>

          <div>
            <Label className="text-xs text-muted-foreground">Media</Label>
            <label className="mt-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/40 py-10 cursor-pointer hover:border-primary/50 transition">
              <div className="h-10 w-10 rounded-lg bg-primary/15 grid place-items-center">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm">Drop image or video</div>
              <div className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 50MB</div>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={() => toast.success("Media added")} />
            </label>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Caption</Label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption…"
              rows={4}
              className="mt-2 bg-card/40 border-border resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Account</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger className="mt-2 bg-card/40 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((a) => (
                    <SelectItem key={a.id} value={a.username}>{a.username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Date & time</Label>
              <Input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="mt-2 bg-card/40 border-border"
              />
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            <Upload /> Schedule Post
          </Button>
        </form>

        {/* Queue */}
        <div className="lg:col-span-3 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" /> Upcoming & recent
            </h2>
            <span className="text-xs text-muted-foreground">{posts.length} posts</span>
          </div>

          <div className="mt-4 divide-y divide-border">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center gap-4 py-4">
                <div className="h-12 w-12 rounded-lg bg-card border border-border grid place-items-center text-xl">{p.thumb}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.caption}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {p.account} · {new Date(p.date).toLocaleString()}
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
