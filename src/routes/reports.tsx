import { createFileRoute } from "@tanstack/react-router";
import { BookMarked, FileDown, FileText, Plus, Quote, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Saved Reports — Research Scholar Agent" },
      { name: "description", content: "Build and export structured research reports with citations." },
    ],
  }),
  component: ReportsPage,
});

const outline = [
  { n: "1", t: "Abstract", s: "Drafted" },
  { n: "2", t: "Introduction", s: "Drafted" },
  { n: "3", t: "Related Work", s: "In review" },
  { n: "3.1", t: "Sparse routing approaches", s: "In review", sub: true },
  { n: "3.2", t: "Load balancing analysis", s: "Drafted", sub: true },
  { n: "4", t: "Methodology", s: "Outline" },
  { n: "5", t: "Experiments & Results", s: "Outline" },
  { n: "6", t: "Discussion", s: "Pending" },
  { n: "7", t: "Conclusion", s: "Pending" },
];

const reports = [
  { t: "A Survey of Sparse Mixture-of-Experts Routing", date: "Mar 14", words: 8420, cites: 47 },
  { t: "Mechanistic Interpretability: A Critical Review", date: "Mar 02", words: 12380, cites: 92 },
  { t: "Climate Adaptation Finance — Working Paper", date: "Feb 21", words: 6200, cites: 34 },
];

export default function ReportsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Manuscript Workspace"
        title="Saved Reports"
        description="Compose, structure, and export publication-ready research reports."
        actions={
          <>
            <Button variant="outline" className="gap-2"><FileDown className="h-4 w-4" />Export</Button>
            <Button className="gap-2 bg-primary"><Plus className="h-4 w-4" />New Report</Button>
          </>
        }
      />

      {/* Saved reports */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.t} className="group border-border/70 p-4 transition-all hover:border-foreground/20 hover:shadow-sm">
            <div className="flex items-start gap-3">
              <BookMarked className="mt-0.5 h-5 w-5 text-gold" />
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-sm leading-snug text-foreground group-hover:text-primary">{r.t}</h4>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {r.date} · {r.words.toLocaleString()} words · {r.cites} cites
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Editor mock */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr_280px]">
        {/* Outline */}
        <Card className="h-fit border-border/70 p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Outline</p>
          <ul className="space-y-1">
            {outline.map((o) => (
              <li
                key={o.n}
                className={`flex items-center justify-between rounded px-2 py-1.5 text-xs transition-colors hover:bg-accent ${o.sub ? "ml-4 text-muted-foreground" : "text-foreground"}`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{o.n}</span>
                  <span className={o.sub ? "" : "font-medium"}>{o.t}</span>
                </span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-wider ${
                    o.s === "Drafted" ? "text-teal"
                      : o.s === "In review" ? "text-gold"
                      : "text-muted-foreground"
                  }`}
                >
                  {o.s}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Editor */}
        <Card className="border-border/70 p-8 paper-texture">
          <div className="mx-auto max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Working draft · auto-saved 2m ago</p>
            <h2 className="mt-2 font-serif text-3xl">A Survey of Sparse Mixture-of-Experts Routing</h2>
            <p className="mt-1 font-serif italic text-muted-foreground">Elena Marston · Stanford University</p>

            <div className="my-6 h-px scholarly-divider" />

            <h3 className="font-serif text-xl">3. Related Work</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              Sparse Mixture-of-Experts (MoE) architectures have been examined in three principal lines of inquiry.
              The earliest, exemplified by Shazeer et al.{" "}
              <span className="rounded-sm bg-gold/30 px-0.5 font-mono text-[11px]">[1]</span>, established the
              top-k gating formulation that underpins virtually all subsequent work. A second line, advanced by
              Fedus et al.{" "}
              <span className="rounded-sm bg-gold/30 px-0.5 font-mono text-[11px]">[2]</span>, demonstrated
              trillion-parameter scaling using simplified routing. A third, more recent line interrogates the
              assignment problem itself, inverting the routing direction
              <span className="rounded-sm bg-gold/30 px-0.5 font-mono text-[11px]">[4]</span>.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              The present survey unifies these three perspectives under a common analytic frame, with particular
              attention to the under-examined question of <em>router calibration under distribution shift</em>.
            </p>
          </div>
        </Card>

        {/* Sources */}
        <div className="space-y-4">
          <Card className="border-border/70 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold">
              <Quote className="h-4 w-4 text-primary" /> Sources
            </h3>
            <ul className="space-y-2.5">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex gap-2 border-b border-border/60 pb-2.5 text-xs last:border-0 last:pb-0">
                  <span className="font-mono text-muted-foreground">[{n}]</span>
                  <span className="font-serif">Reference entry abbreviated…</span>
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2 w-full justify-between text-xs">
              All references <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Card>

          <Card className="border-border/70 p-4">
            <h3 className="mb-3 font-serif text-sm font-semibold">Export</h3>
            <div className="space-y-2">
              {[
                { l: "PDF · with cover", i: FileText },
                { l: "DOCX · Word", i: FileText },
                { l: "LaTeX · IEEE", i: FileText },
              ].map((e) => (
                <Button key={e.l} variant="outline" className="w-full justify-start gap-2">
                  <e.i className="h-3.5 w-3.5 text-primary" /> {e.l}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
