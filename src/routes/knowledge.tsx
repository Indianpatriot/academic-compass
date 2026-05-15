import { createFileRoute } from "@tanstack/react-router";
import { Folder, Hash, Search, Sparkles, FileText, Network } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Base — Research Scholar Agent" },
      { name: "description", content: "Your scholarly library: saved papers, folders, tags, and semantic search." },
    ],
  }),
  component: KnowledgePage,
});

const folders = [
  { n: "Doctoral Thesis", c: 142 },
  { n: "Survey Papers", c: 88 },
  { n: "Reading Group", c: 47 },
  { n: "Reference Texts", c: 26 },
];

const tags = ["transformer", "diffusion", "interpretability", "scaling-laws", "RLHF", "MoE", "vision", "climate", "epistemology"];

const papers = [
  { t: "Sparse Autoencoders Find Highly Interpretable Features", a: "Bricken et al.", y: 2023, tag: "interpretability" },
  { t: "Constitutional AI: Harmlessness from AI Feedback", a: "Bai et al.", y: 2022, tag: "RLHF" },
  { t: "GShard: Scaling Giant Models with Conditional Computation", a: "Lepikhin et al.", y: 2021, tag: "MoE" },
  { t: "Stable Diffusion: High-Resolution Image Synthesis with Latent Diffusion", a: "Rombach et al.", y: 2022, tag: "diffusion" },
  { t: "Chinchilla: Training Compute-Optimal Large Language Models", a: "Hoffmann et al.", y: 2022, tag: "scaling-laws" },
  { t: "Anthropic: Mechanistic Interpretability of Toy Models", a: "Elhage et al.", y: 2022, tag: "interpretability" },
];

// Citation graph nodes (simple svg viz)
const nodes = [
  { id: "A", x: 200, y: 120, r: 22, label: "Transformer" },
  { id: "B", x: 90, y: 220, r: 16, label: "BERT" },
  { id: "C", x: 320, y: 220, r: 18, label: "GPT" },
  { id: "D", x: 200, y: 300, r: 14, label: "MoE" },
  { id: "E", x: 50, y: 320, r: 12, label: "ELMo" },
  { id: "F", x: 360, y: 80, r: 12, label: "Attn" },
  { id: "G", x: 380, y: 320, r: 14, label: "RLHF" },
];
const edges = [
  ["A", "B"], ["A", "C"], ["A", "D"], ["A", "F"], ["B", "E"], ["C", "G"], ["C", "D"], ["D", "G"],
];
const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function KnowledgePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Personal Library"
        title="Knowledge Base"
        description="Semantic search across every paper, note, and annotation in your archive."
        actions={
          <Button className="gap-2 bg-primary"><Sparkles className="h-4 w-4" />Semantic search</Button>
        }
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search archive…" className="bg-card pl-9" />
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Folder className="h-3 w-3" /> Folders
            </p>
            <ul className="space-y-1">
              {folders.map((f) => (
                <li key={f.n} className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent">
                  <span className="flex items-center gap-2">
                    <Folder className="h-3.5 w-3.5 text-gold" />
                    {f.n}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{f.c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Hash className="h-3 w-3" /> Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Badge key={t} variant="outline" className="cursor-pointer rounded-sm font-normal hover:bg-accent">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {/* Citation graph */}
          <Card className="border-border/70 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-serif text-base">
                <Network className="h-4 w-4 text-teal" /> Citation Network
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">263 papers · 1,442 edges</span>
            </div>
            <div className="rounded-md border border-border/70 bg-parchment/60 p-3">
              <svg viewBox="0 0 440 380" className="h-72 w-full">
                {edges.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={nodeMap[a].x} y1={nodeMap[a].y}
                    x2={nodeMap[b].x} y2={nodeMap[b].y}
                    stroke="var(--color-border)"
                    strokeWidth={1}
                  />
                ))}
                {nodes.map((n) => (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={n.r} fill="var(--color-card)" stroke="var(--color-primary)" strokeWidth={1.2} />
                    <circle cx={n.x} cy={n.y} r={n.r * 0.55} fill="var(--color-primary)" opacity={0.18} />
                    <text x={n.x} y={n.y + n.r + 12} textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="var(--color-muted-foreground)">
                      {n.label}
                    </text>
                  </g>
                ))}
                <circle cx={nodeMap.A.x} cy={nodeMap.A.y} r={nodeMap.A.r + 4} fill="none" stroke="var(--color-gold)" strokeDasharray="3 3" />
              </svg>
            </div>
          </Card>

          {/* Papers grid */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Saved papers · 263</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {papers.map((p) => (
                <Card key={p.t} className="group border-border/70 p-4 transition-all hover:border-foreground/20 hover:shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-7 items-center justify-center rounded-sm border border-border bg-parchment">
                      <FileText className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif text-sm leading-snug group-hover:text-primary">{p.t}</h4>
                      <p className="mt-0.5 text-[11px] italic text-muted-foreground">{p.a} · {p.y}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="rounded-sm font-normal text-[10px]">#{p.tag}</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
