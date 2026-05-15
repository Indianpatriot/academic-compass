import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Calendar, Filter, Quote, Sparkles, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/literature")({
  head: () => ({
    meta: [
      { title: "Literature Review — Research Scholar Agent" },
      { name: "description", content: "Systematic literature review with timeline view, filters, and AI summaries." },
    ],
  }),
  component: LiteraturePage,
});

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani, Shazeer, Parmar, et al.",
    year: 2017,
    venue: "NeurIPS",
    cites: 142031,
    abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely…",
    field: "NLP",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Devlin, Chang, Lee, Toutanova",
    year: 2019,
    venue: "NAACL",
    cites: 98215,
    abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers…",
    field: "NLP",
  },
  {
    title: "Denoising Diffusion Probabilistic Models",
    authors: "Ho, Jain, Abbeel",
    year: 2020,
    venue: "NeurIPS",
    cites: 18742,
    abstract: "We present high quality image synthesis results using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics…",
    field: "Vision",
  },
  {
    title: "Mastering the game of Go with deep neural networks and tree search",
    authors: "Silver et al.",
    year: 2016,
    venue: "Nature",
    cites: 21498,
    abstract: "The game of Go has long been viewed as the most challenging of classic games for artificial intelligence owing to its enormous search space…",
    field: "RL",
  },
  {
    title: "A Mathematical Framework for Transformer Circuits",
    authors: "Elhage, Nanda, Olsson, et al.",
    year: 2021,
    venue: "Anthropic",
    cites: 612,
    abstract: "We present a mathematical framework for reverse engineering small transformer language models, with the goal of identifying interpretable circuits…",
    field: "Theory",
  },
  {
    title: "Climate adaptation strategies for coastal megacities under sea-level rise",
    authors: "Hallegatte et al.",
    year: 2023,
    venue: "Nature Climate Change",
    cites: 412,
    abstract: "Coastal megacities face compounding hazards from sea-level rise, storm surge, and subsidence. We propose a portfolio of adaptive policy levers…",
    field: "Climate",
  },
];

const facets = [
  { label: "Field", values: ["NLP", "Vision", "RL", "Theory", "Climate", "Bio"] },
  { label: "Year", values: ["2024", "2023", "2022", "2021", "2020", "Earlier"] },
  { label: "Venue", values: ["NeurIPS", "ICML", "Nature", "Science", "ACL", "CVPR"] },
];

export default function LiteraturePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Bibliographic Survey"
        title="Literature Review"
        description="Discover, filter, and synthesize scholarly publications across disciplines."
        actions={
          <>
            <Button variant="outline" className="gap-2"><SortDesc className="h-4 w-4" />Sort: Relevance</Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90"><Sparkles className="h-4 w-4" />AI Synthesis</Button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-5">
          <div>
            <Input placeholder="Search title, author, DOI…" className="bg-card" />
          </div>
          {facets.map((f) => (
            <div key={f.label}>
              <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <Filter className="h-3 w-3" /> {f.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {f.values.map((v) => (
                  <Badge key={v} variant="outline" className="cursor-pointer rounded-sm border-border/80 bg-card font-normal hover:bg-accent">
                    {v}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Calendar className="h-3 w-3" /> Timeline
            </p>
            <div className="space-y-1.5 rounded-md border border-border/70 bg-card p-3">
              {["2024", "2023", "2022", "2021", "2020"].map((y, i) => (
                <div key={y} className="flex items-center justify-between text-xs">
                  <span className="font-mono text-muted-foreground">{y}</span>
                  <div className="mx-3 h-1 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary/70" style={{ width: `${[88, 72, 60, 44, 30][i]}%` }} />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{[412, 318, 264, 192, 130][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Showing 6 of 1,316 results · sorted by relevance
          </p>
          <div className="space-y-3">
            {papers.map((p) => (
              <Card key={p.title} className="group border-border/70 p-5 transition-all hover:border-foreground/20 hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="border-teal/40 bg-teal/5 text-[10px] text-teal">
                        {p.field}
                      </Badge>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {p.venue} · {p.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg leading-snug text-foreground transition-colors group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs italic text-muted-foreground">{p.authors}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.abstract}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs">
                        <Sparkles className="h-3.5 w-3.5 text-gold" /> Quick summarize
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs">
                        <Quote className="h-3.5 w-3.5" /> Cite
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 gap-1.5 text-xs">
                        <Bookmark className="h-3.5 w-3.5" /> Save
                      </Button>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                        {p.cites.toLocaleString()} citations
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
