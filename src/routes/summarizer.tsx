import { createFileRoute } from "@tanstack/react-router";
import { FileText, Sparkles, Wand2, ListTree, Highlighter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Paper Summarizer — Research Scholar Agent" },
      { name: "description", content: "Generate structured academic summaries of research papers." },
    ],
  }),
  component: SummarizerPage,
});

const sections = [
  { h: "Problem Statement", b: "The paper investigates load imbalance in sparse mixture-of-experts routing under autoregressive language modeling at trillion-parameter scale." },
  { h: "Methodology", b: "Authors introduce expert-choice routing combined with auxiliary noise injection, evaluated on Switch-C and Mixtral-class architectures across 14 downstream benchmarks." },
  { h: "Key Findings", b: "1.7× compute-equivalent gain over top-k routing; expert utilization variance reduced by 62%; downstream MMLU accuracy improves 2.4 points without parameter increase." },
  { h: "Limitations", b: "Expert-choice routing complicates causal autoregressive training and does not naturally extend to KV-cache sharing across experts." },
  { h: "Implications", b: "Suggests routing should be treated as an assignment problem rather than per-token classification, opening a new research thread for cross-expert coordination." },
];

export default function SummarizerPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="AI Synthesis"
        title="Paper Summarizer"
        description="Convert dense academic prose into structured, citable summaries with key findings extracted."
        actions={<Button className="gap-2 bg-primary"><Wand2 className="h-4 w-4" />Re-summarize</Button>}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <Card className="border-border/70 p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Paper</p>
            </div>
            <h3 className="mt-2 font-serif text-base leading-snug">Mixture-of-Experts with Expert Choice Routing</h3>
            <p className="mt-1 text-xs italic text-muted-foreground">Zhou et al. · NeurIPS 2022</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-md bg-muted/50 p-2">
                <p className="font-mono text-muted-foreground">Pages</p>
                <p className="font-serif text-base">14</p>
              </div>
              <div className="rounded-md bg-muted/50 p-2">
                <p className="font-mono text-muted-foreground">References</p>
                <p className="font-serif text-base">62</p>
              </div>
              <div className="rounded-md bg-muted/50 p-2">
                <p className="font-mono text-muted-foreground">Read time</p>
                <p className="font-serif text-base">38 min</p>
              </div>
              <div className="rounded-md bg-muted/50 p-2">
                <p className="font-mono text-muted-foreground">Difficulty</p>
                <p className="font-serif text-base">Advanced</p>
              </div>
            </div>
          </Card>

          <Card className="border-border/70 p-4">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <ListTree className="h-3 w-3" /> Summary depth
            </p>
            <div className="flex flex-col gap-1.5">
              {["Abstract", "Executive", "Detailed", "Verbatim quotes"].map((s, i) => (
                <button key={s} className={`rounded-md border px-3 py-2 text-left text-xs transition-colors ${i === 1 ? "border-primary/30 bg-primary/5 text-foreground" : "border-border/60 hover:bg-accent"}`}>
                  {s}
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-border/70 p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {["mixture-of-experts", "routing", "scaling", "load balancing", "transformer"].map((k) => (
                <Badge key={k} variant="outline" className="border-border/70 font-normal">{k}</Badge>
              ))}
            </div>
          </Card>
        </aside>

        <Card className="border-border/70 p-8">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="outline" className="gap-1 border-gold/40 bg-gold/10 text-gold-foreground">
              <Sparkles className="h-3 w-3" /> AI synthesis · executive summary
            </Badge>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Highlighter className="h-3.5 w-3.5" />Highlight mode</Button>
          </div>

          <article className="prose prose-sm max-w-none">
            <h2 className="mb-1 font-serif text-2xl">Mixture-of-Experts with Expert Choice Routing</h2>
            <p className="mb-6 text-xs italic text-muted-foreground">A structured synthesis · 1,240 → 312 words</p>

            {sections.map((s, i) => (
              <section key={s.h} className="mb-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">§ {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-lg">{s.h}</h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground">{s.b}</p>
              </section>
            ))}

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Suggested follow-up reading</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between border-b border-border/60 pb-2"><span>Switch Transformers — Fedus et al.</span><span className="text-xs text-muted-foreground">2022</span></li>
                <li className="flex justify-between border-b border-border/60 pb-2"><span>BASE Layers — Lewis et al.</span><span className="text-xs text-muted-foreground">2021</span></li>
                <li className="flex justify-between"><span>Hash Layers for Large Sparse Models — Roller et al.</span><span className="text-xs text-muted-foreground">2021</span></li>
              </ul>
            </div>
          </article>
        </Card>
      </div>
    </PageContainer>
  );
}
