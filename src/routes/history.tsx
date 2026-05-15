import { createFileRoute } from "@tanstack/react-router";
import { History, ArrowUpRight, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Research History — Research Scholar Agent" },
      { name: "description", content: "Chronological log of every research session, query, and synthesis." },
    ],
  }),
  component: HistoryPage,
});

const sessions = [
  { d: "Today · 10:42", q: "Synthesize sparse MoE routing literature with focus on load balancing", n: 14, type: "Synthesis" },
  { d: "Today · 09:15", q: "Compare diffusion model alignment techniques across labs", n: 22, type: "Comparison" },
  { d: "Yesterday · 17:22", q: "Generate IEEE bibliography for chapter 3 references", n: 23, type: "Citations" },
  { d: "Yesterday · 14:08", q: "Critique Hallegatte 2023 on coastal megacity adaptation", n: 1, type: "Critique" },
  { d: "Mar 12 · 11:30", q: "Build literature map of mechanistic interpretability research lineage", n: 47, type: "Map" },
  { d: "Mar 11 · 09:00", q: "Summarize all 2024 NeurIPS papers tagged 'reasoning'", n: 38, type: "Summary" },
];

const grouped = [
  { day: "Today", items: sessions.slice(0, 2) },
  { day: "Yesterday", items: sessions.slice(2, 4) },
  { day: "Earlier this week", items: sessions.slice(4) },
];

export default function HistoryPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Activity Log"
        title="Research History"
        description="Every query, every session, every synthesis — preserved for reproducibility."
      />

      <div className="mt-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search sessions, queries, dates…" className="bg-card pl-9" />
        </div>
        <Button variant="outline" size="sm">Export log</Button>
      </div>

      <div className="mt-6 space-y-8">
        {grouped.map((g) => (
          <section key={g.day}>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{g.day}</p>
            <Card className="border-border/70 divide-y divide-border/70">
              {g.items.map((s, i) => (
                <div key={i} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/30">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/5 ring-1 ring-primary/15">
                    <History className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base text-foreground">{s.q}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {s.d} · {s.n} sources reviewed
                    </p>
                  </div>
                  <Badge variant="outline" className="border-teal/40 text-teal">{s.type}</Badge>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                    Resume <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </Card>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
