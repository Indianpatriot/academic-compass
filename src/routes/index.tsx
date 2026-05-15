import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Quote,
  Sparkles,
  TrendingUp,
  Bookmark,
  Activity,
  Brain,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Research Scholar Agent" },
      { name: "description", content: "Continue your research. Track papers analyzed, citations, and AI insights." },
    ],
  }),
  component: Dashboard,
});

const trend = [
  { m: "Jan", papers: 12, citations: 34 },
  { m: "Feb", papers: 18, citations: 52 },
  { m: "Mar", papers: 24, citations: 68 },
  { m: "Apr", papers: 31, citations: 89 },
  { m: "May", papers: 28, citations: 102 },
  { m: "Jun", papers: 42, citations: 134 },
  { m: "Jul", papers: 39, citations: 156 },
  { m: "Aug", papers: 51, citations: 178 },
];

const fields = [
  { f: "NLP", n: 38 },
  { f: "Vision", n: 24 },
  { f: "RL", n: 18 },
  { f: "Theory", n: 14 },
  { f: "Bio", n: 9 },
];

const stats = [
  { label: "Papers Analyzed", value: "1,284", delta: "+18%", icon: FileText, accent: "primary" },
  { label: "Citations Generated", value: "3,762", delta: "+24%", icon: Quote, accent: "gold" },
  { label: "Research Sessions", value: "184", delta: "+6%", icon: Activity, accent: "teal" },
  { label: "Saved Reports", value: "47", delta: "+3", icon: Bookmark, accent: "muted" },
];

const activity = [
  { t: "10:42", title: "Generated literature review for ‘Sparse MoE Routing’", tag: "Review", color: "teal" },
  { t: "09:15", title: "Summarized 14 papers on diffusion model alignment", tag: "Summary", color: "gold" },
  { t: "Yesterday", title: "Cited 23 sources in IEEE format for chapter 3", tag: "Citations", color: "primary" },
  { t: "Yesterday", title: "Imported 8 new arXiv preprints into Knowledge Base", tag: "Import", color: "muted" },
  { t: "2d ago", title: "Created research collection — ‘Climate Tipping Points’", tag: "Collection", color: "teal" },
];

const trending = [
  { t: "Mechanistic interpretability of LLMs", delta: "+312%" },
  { t: "Diffusion-based protein folding", delta: "+187%" },
  { t: "Sparse autoencoders for circuit discovery", delta: "+154%" },
  { t: "Climate adaptation finance", delta: "+98%" },
];

const collections = [
  { name: "Doctoral Thesis · Ch. 3", count: 42 },
  { name: "Survey: Transformer variants", count: 67 },
  { name: "Reading group · Q3", count: 18 },
];

const suggestions = [
  { kind: "Paper", title: "Scaling Laws for Reward Modeling", src: "Anthropic · arXiv 2024" },
  { kind: "Topic", title: "Emerging: Constitutional AI for Sciences", src: "Trending in your field" },
  { kind: "Author", title: "Follow Yejin Choi — 4 new preprints", src: "Allen Institute" },
];

export default function Dashboard() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Doctoral Workspace"
        title="Continue your research, Dr. Marston."
        description="A focused academic command center for literature, citations, and AI-assisted scholarship. Last session resumed 2 hours ago."
        actions={
          <>
            <Button variant="outline" className="gap-2">
              <Layers className="h-4 w-4" />
              New Project
            </Button>
            <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
              <Link to="/assistant">
                <Sparkles className="h-4 w-4" />
                Ask Research Agent
              </Link>
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="group relative overflow-hidden border-border/70 bg-card/80 transition-all hover:border-foreground/20 hover:shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </span>
                <s.icon
                  className={
                    s.accent === "gold" ? "h-4 w-4 text-gold" :
                    s.accent === "teal" ? "h-4 w-4 text-teal" :
                    s.accent === "primary" ? "h-4 w-4 text-primary" :
                    "h-4 w-4 text-muted-foreground"
                  }
                />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-semibold tracking-tight">{s.value}</span>
                <span className="text-xs font-medium text-teal">{s.delta}</span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">vs. previous semester</div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/70">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="font-serif text-lg">Research Throughput</CardTitle>
              <p className="text-xs text-muted-foreground">Papers analyzed and citations generated · last 8 months</p>
            </div>
            <Badge variant="outline" className="gap-1 border-teal/40 text-teal">
              <TrendingUp className="h-3 w-3" />
              +34% YoY
            </Badge>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <RTooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="papers" stroke="var(--color-primary)" strokeWidth={2} fill="url(#g1)" />
                  <Area type="monotone" dataKey="citations" stroke="var(--color-gold)" strokeWidth={2} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg">By Discipline</CardTitle>
            <p className="text-xs text-muted-foreground">Papers per field this term</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fields} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="f" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <RTooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="n" fill="var(--color-teal)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity + Trending + Suggestions */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/70">
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-lg">Recent Research Activity</CardTitle>
            <p className="text-xs text-muted-foreground">A chronological log of your scholarly work</p>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-l border-border pl-5">
              {activity.map((a, i) => (
                <li key={i} className="relative">
                  <span
                    className={
                      "absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-background " +
                      (a.color === "gold" ? "bg-gold"
                        : a.color === "teal" ? "bg-teal"
                        : a.color === "primary" ? "bg-primary"
                        : "bg-muted-foreground/40")
                    }
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {a.t} · {a.tag}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground">
                      Open <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-serif text-lg">
                <TrendingUp className="h-4 w-4 text-gold" /> Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trending.map((t, i) => (
                <div key={t.t} className="group flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <div className="flex gap-3">
                    <span className="font-serif text-base text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-snug text-foreground">{t.t}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-teal">{t.delta}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-gradient-to-br from-card to-parchment">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-serif text-lg">
                <Brain className="h-4 w-4 text-primary" /> AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {suggestions.map((s) => (
                <div key={s.title} className="rounded-md border border-border/60 bg-background/60 p-3 transition-colors hover:border-foreground/20">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-gold/30 bg-gold/10 px-1.5 py-0 text-[10px] text-gold-foreground">
                      {s.kind}
                    </Badge>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug">{s.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{s.src}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Saved collections */}
      <div className="mt-6">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-xl">Saved Collections</h2>
            <p className="text-xs text-muted-foreground">Curated reading lists across your projects</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">View all</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Card key={c.name} className="group border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/5 ring-1 ring-primary/15">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-base font-medium">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground">{c.count} papers · updated today</p>
                  </div>
                </div>
                <div className="mt-4 flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-7 w-5 rounded-sm border border-border bg-parchment shadow-sm" style={{ transform: `rotate(${(i - 1) * 2}deg)` }} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
