import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, FileType2, Library, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/citations")({
  head: () => ({
    meta: [
      { title: "Citation Generator — Research Scholar Agent" },
      { name: "description", content: "Generate citations in APA, MLA, IEEE, Chicago, and Harvard styles." },
    ],
  }),
  component: CitationsPage,
});

const styles = {
  APA: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30, 5998–6008.",
  MLA: "Vaswani, Ashish, et al. “Attention Is All You Need.” Advances in Neural Information Processing Systems, vol. 30, 2017, pp. 5998–6008.",
  IEEE: "[1] A. Vaswani et al., \"Attention is all you need,\" in Advances in Neural Information Processing Systems, vol. 30, 2017, pp. 5998–6008.",
  Chicago: "Vaswani, Ashish, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin. “Attention Is All You Need.” Advances in Neural Information Processing Systems 30 (2017): 5998–6008.",
  Harvard: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, Ł. and Polosukhin, I. (2017) ‘Attention is all you need’, Advances in Neural Information Processing Systems, 30, pp. 5998–6008.",
};

const recent = [
  { t: "BERT: Pre-training of Deep Bidirectional Transformers", style: "APA" },
  { t: "Denoising Diffusion Probabilistic Models", style: "IEEE" },
  { t: "A Mathematical Framework for Transformer Circuits", style: "Chicago" },
];

export default function CitationsPage() {
  const [active, setActive] = useState<keyof typeof styles>("APA");
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Bibliographic Tools"
        title="Citation Generator"
        description="Format any reference across APA, MLA, IEEE, Chicago, and Harvard with one click."
        actions={<Button variant="outline" className="gap-2"><Library className="h-4 w-4" />Bibliography</Button>}
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Card className="border-border/70 p-5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Source</p>
            <Input defaultValue="https://arxiv.org/abs/1706.03762" className="bg-background" />
            <p className="mt-2 text-[11px] text-muted-foreground">DOI, arXiv ID, ISBN, PubMed ID, or paste a URL.</p>
          </Card>

          <Card className="border-border/70 p-5">
            <Tabs value={active} onValueChange={(v) => setActive(v as keyof typeof styles)}>
              <TabsList className="bg-muted/40">
                {Object.keys(styles).map((s) => (
                  <TabsTrigger key={s} value={s} className="data-[state=active]:bg-card data-[state=active]:shadow-none">
                    {s}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(styles).map(([k, v]) => (
                <TabsContent key={k} value={k} className="mt-4">
                  <div className="rounded-md border border-border/70 bg-parchment p-5">
                    <Badge variant="outline" className="mb-3 border-gold/40 text-gold-foreground">{k} · 7th edition</Badge>
                    <p className="font-serif text-[15px] leading-relaxed text-ink">{v}</p>
                    <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3">
                      <Button size="sm" variant="outline" className="gap-1.5"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                      <Button size="sm" variant="outline" className="gap-1.5"><Download className="h-3.5 w-3.5" /> BibTeX</Button>
                      <Button size="sm" variant="outline" className="gap-1.5"><FileType2 className="h-3.5 w-3.5" /> RIS</Button>
                      <Button size="sm" variant="ghost" className="ml-auto gap-1.5"><Quote className="h-3.5 w-3.5" /> In-text</Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">In-text citation</p>
                    <p className="rounded-md bg-muted/40 p-3 font-serif text-sm text-foreground">
                      {k === "IEEE" ? "[1]" : k === "MLA" ? "(Vaswani et al. 5998)" : "(Vaswani et al., 2017)"}
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        <Card className="h-fit border-border/70 p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Recent citations</p>
          <ul className="space-y-3">
            {recent.map((r) => (
              <li key={r.t} className="border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <p className="text-xs font-medium leading-snug">{r.t}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{r.style}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageContainer>
  );
}
