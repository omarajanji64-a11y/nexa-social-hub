import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your workspace and preferences.</p>
      </div>

      <section className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-lg">Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Workspace name" defaultValue="NEXA Agency" />
          <Field label="Email" defaultValue="hello@nexa.social" />
          <Field label="Timezone" defaultValue="UTC+1" />
          <Field label="Default post time" defaultValue="09:00" />
        </div>
        <Button variant="hero" onClick={() => toast.success("Profile saved")}>Save changes</Button>
      </section>

      <section className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Notifications</h2>
        <Toggle label="Email when posts are published" defaultChecked />
        <Toggle label="Email when posts fail" defaultChecked />
        <Toggle label="Weekly performance summary" />
      </section>

      <section className="glass rounded-2xl p-6 space-y-4 border-destructive/30">
        <h2 className="font-semibold text-lg text-destructive">Danger zone</h2>
        <p className="text-sm text-muted-foreground">Deleting your workspace is permanent and cannot be undone.</p>
        <Button variant="destructive" onClick={() => toast.error("This is a demo")}>Delete workspace</Button>
      </section>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input defaultValue={defaultValue} className="mt-2 bg-card/40 border-border" />
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card/40 px-4 py-3">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
