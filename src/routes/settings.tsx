import { createFileRoute } from "@tanstack/react-router";
import { Bell, Globe, Quote, ShieldCheck, User, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Research Scholar Agent" },
      { name: "description", content: "Account, citation defaults, and AI preferences." },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "preferences", icon: Sparkles, label: "AI Preferences" },
  { id: "citations", icon: Quote, label: "Citations" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "privacy", icon: ShieldCheck, label: "Privacy" },
  { id: "language", icon: Globe, label: "Language & Region" },
];

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Configuration" title="Settings" description="Tune your scholarly workspace, agent behavior, and citation defaults." />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <aside>
          <ul className="space-y-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${i === 0 ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}>
                  <s.icon className="h-4 w-4" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-6">
          <Card id="profile" className="border-border/70 p-6">
            <h2 className="font-serif text-xl">Profile</h2>
            <p className="text-xs text-muted-foreground">Public scholarly identity displayed on exports and citations.</p>
            <Separator className="my-5" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div><Label className="mb-1.5 block text-xs">Full name</Label><Input defaultValue="Dr. Elena Marston" /></div>
              <div><Label className="mb-1.5 block text-xs">Affiliation</Label><Input defaultValue="Stanford University" /></div>
              <div><Label className="mb-1.5 block text-xs">Department</Label><Input defaultValue="Linguistics & Computer Science" /></div>
              <div><Label className="mb-1.5 block text-xs">ORCID</Label><Input defaultValue="0000-0002-1825-0097" /></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button className="bg-primary">Save changes</Button>
            </div>
          </Card>

          <Card id="preferences" className="border-border/70 p-6">
            <h2 className="font-serif text-xl">AI Preferences</h2>
            <Separator className="my-5" />
            <div className="space-y-4">
              {[
                { l: "Always cite sources inline", d: "Insert numeric citations alongside synthesized claims.", on: true },
                { l: "Prefer peer-reviewed venues", d: "De-prioritize preprints unless explicitly requested.", on: true },
                { l: "Show confidence intervals", d: "Annotate every claim with the agent’s certainty.", on: false },
                { l: "Scholar mode", d: "Restrained academic prose; no marketing language.", on: true },
              ].map((p) => (
                <div key={p.l} className="flex items-center justify-between border-b border-border/60 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{p.l}</p>
                    <p className="text-xs text-muted-foreground">{p.d}</p>
                  </div>
                  <Switch defaultChecked={p.on} />
                </div>
              ))}
            </div>
          </Card>

          <Card id="citations" className="border-border/70 p-6">
            <h2 className="font-serif text-xl">Citation Defaults</h2>
            <Separator className="my-5" />
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {["APA", "MLA", "IEEE", "Chicago", "Harvard"].map((s, i) => (
                <button key={s} className={`rounded-md border px-3 py-2 text-sm transition-colors ${i === 0 ? "border-primary/40 bg-primary/5 text-foreground" : "border-border hover:bg-accent"}`}>
                  {s}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
