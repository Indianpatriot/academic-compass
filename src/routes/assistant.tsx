import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUp,
  BookOpen,
  ChevronRight,
  FileText,
  Library,
  Quote,
  Sparkles,
  StickyNote,
  Paperclip,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Research Assistant — Research Scholar Agent" },
      { name: "description", content: "Ask scholarly research questions and synthesize evidence with cited sources." },
    ],
  }),
  component: AssistantPage,
});

const prompts = [
  "Summarize recent advancements in reinforcement learning from human feedback",
  "Compare transformer architectures: encoder-only vs decoder-only vs encoder-decoder",
  "Generate a literature review for climate change adaptation in coastal megacities",
  "Critique methodological limitations of mechanistic interpretability studies",
];

const messages = [
  {
    role: "user",
    text: "Provide a synthesis of recent work on sparse mixture-of-experts routing and discuss open problems in load balancing.",
  },
  {
    role: "agent",
    text:
      "Recent literature on Sparse Mixture-of-Experts (MoE) routing converges around three open challenges. First, **load imbalance** persists despite auxiliary losses (Shazeer et al., 2017¹; Fedus et al., 2022²). Second, **expert collapse** under low-data regimes remains poorly characterized (Zoph et al., 2022³). Third, **router calibration** for distribution shift is largely unaddressed.\n\nA promising direction is *expert-choice routing* (Zhou et al., 2022⁴), which inverts the assignment problem to guarantee balanced utilization. However, it complicates causal autoregressive training. Empirical results on the Switch Transformer suite suggest a 1.7× compute-equivalent gain when combined with stochastic auxiliary noise.",
  },
];

const sources = [
  { n: 1, title: "Outrageously Large Neural Networks: Sparsely-Gated MoE", a: "Shazeer et al.", y: 2017 },
  { n: 2, title: "Switch Transformers: Scaling to Trillion Parameter Models", a: "Fedus et al.", y: 2022 },
  { n: 3, title: "ST-MoE: Designing Stable and Transferable Sparse Models", a: "Zoph et al.", y: 2022 },
  { n: 4, title: "Mixture-of-Experts with Expert Choice Routing", a: "Zhou et al.", y: 2022 },
];

const notes = [
  "Cross-reference §3.2 with Lepikhin GShard scaling analysis.",
  "Add Riquelme V-MoE to vision comparison table.",
  "Open question: does expert-choice break with KV-cache sharing?",
];

export default function AssistantPage() {
  const [input, setInput] = useState("");
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Research Workspace"
        title="Research Assistant"
        description="An AI scholar that reads, reasons, and cites. Every answer is grounded in retrievable academic sources."
        actions={
          <Badge variant="outline" className="gap-1.5 border-teal/40 text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            Agent online · Claude-Sonnet · Scholar mode
          </Badge>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        {/* Chat column */}
        <div className="flex min-h-[70vh] flex-col rounded-lg border border-border/70 bg-card/60">
          <ScrollArea className="flex-1 px-6 py-6">
            <div className="mx-auto max-w-3xl space-y-8">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm border border-border bg-parchment px-4 py-3 text-sm leading-relaxed">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-serif text-sm font-semibold">Research Agent</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          synthesized from 14 sources
                        </span>
                      </div>
                      <div className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground">
                        {m.text.split("\n\n").map((p, j) => (
                          <p key={j} className="mb-3 last:mb-0">{p}</p>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[1, 2, 3, 4].map((n) => (
                          <Badge key={n} variant="outline" className="cursor-pointer gap-1 hover:bg-accent">
                            <Quote className="h-3 w-3" /> Source {n}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              )}

              <div className="border-t border-dashed border-border pt-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Suggested academic prompts
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {prompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => setInput(p)}
                      className="group flex items-start gap-2 rounded-md border border-border/70 bg-background/60 p-3 text-left text-xs leading-relaxed text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
                    >
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Composer */}
          <div className="border-t border-border bg-background/80 p-4">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-xl border border-input bg-card p-3 shadow-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={2}
                  placeholder="Pose a research question, request a synthesis, or paste an abstract for analysis…"
                  className="w-full resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
                      <Paperclip className="h-3.5 w-3.5" /> Attach paper
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
                      <Library className="h-3.5 w-3.5" /> Knowledge base
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
                      <Quote className="h-3.5 w-3.5" /> Cite mode: APA
                    </Button>
                  </div>
                  <Button size="sm" className="h-8 gap-1.5 bg-primary hover:bg-primary/90">
                    Synthesize <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right context panel */}
        <div className="flex flex-col gap-4">
          <Card className="border-border/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-serif text-sm font-semibold">
                <BookOpen className="h-4 w-4 text-primary" /> Sources
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground">14 cited</span>
            </div>
            <ul className="space-y-3">
              {sources.map((s) => (
                <li key={s.n} className="group flex gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border font-mono text-[10px]">
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-xs font-medium leading-snug">{s.title}</p>
                    <p className="mt-0.5 text-[11px] italic text-muted-foreground">{s.a} · {s.y}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2 w-full justify-between text-xs">
              View bibliography <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Card>

          <Card className="border-border/70 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold">
              <StickyNote className="h-4 w-4 text-gold" /> Research Notes
            </h3>
            <ul className="space-y-2.5">
              {notes.map((n, i) => (
                <li key={i} className="border-l-2 border-gold/40 pl-3 text-xs leading-relaxed text-muted-foreground">
                  {n}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-border/70 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold">
              <FileText className="h-4 w-4 text-teal" /> Related Papers
            </h3>
            <div className="space-y-2.5">
              {["GShard: Scaling Giant Models with Conditional Computation", "BASE Layers: Simplifying Training of Sparse Experts", "Mixtral 8x7B Technical Report"].map((p) => (
                <div key={p} className="rounded-md bg-muted/40 p-2.5 text-xs leading-snug hover:bg-muted">
                  {p}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
