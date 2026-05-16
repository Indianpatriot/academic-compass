import { createFileRoute } from "@tanstack/react-router";
import { FileSearch, FileUp, Highlighter, Quote, Sparkles, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageContainer, PageHeader } from "@/components/layout/page-header";

export const Route = createFileRoute("/pdf-analyzer")({
  head: () => ({
    meta: [
      { title: "PDF Analyzer — Research Scholar Agent" },
      { name: "description", content: "Upload research papers and extract insights, summaries, and citations." },
    ],
  }),
  component: PdfAnalyzerPage,
});

export default function PdfAnalyzerPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Document Intelligence"
        title="PDF Analyzer"
        description="Upload a research paper. The agent will read, annotate, extract findings, and surface citations."
        actions={<Button className="gap-2 bg-primary"><FileUp className="h-4 w-4" />Upload PDF</Button>}
      />

      {/* Dropzone */}
      <div className="mt-6 rounded-xl border-2 border-dashed border-border bg-card/40 p-10 text-center transition-colors hover:border-foreground/30 hover:bg-card/60">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 ring-1 ring-primary/20">
          <FileSearch className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-4 font-serif text-xl">Drop a research paper to analyze</h3>
        <p className="mt-1 text-sm text-muted-foreground">PDF, DOCX, or LaTeX · up to 80 MB · OCR enabled for scanned documents</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">Browse files</Button>
          <span className="text-xs text-muted-foreground">or paste a DOI / arXiv link</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        {/* Preview + insights */}
        <div className="space-y-4">
          <Card className="border-border/70">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-7 items-center justify-center rounded-sm border border-border bg-parchment">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">No document loaded</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Upload a paper to begin analysis</p>
                </div>
              </div>
              <Badge variant="outline" className="border-border text-muted-foreground">Awaiting upload</Badge>
            </div>

            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <div className="border-b border-border md:border-b-0 md:border-r">
                <div className="m-5 flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-parchment/50 text-center">
                  <p className="text-xs text-muted-foreground">Paper preview will appear here</p>
                </div>
              </div>

              <div className="p-5">
                <p className="mb-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-gold" /> Key insights
                </p>
                <p className="text-xs text-muted-foreground">Extracted insights from your document will appear here.</p>
              </div>
            </div>
          </Card>

          <Card className="border-border/70 p-5">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-base">
              <Highlighter className="h-4 w-4 text-gold" /> Highlighted findings
            </h3>
            <p className="text-xs text-muted-foreground">No findings yet. Upload a PDF to surface annotated highlights.</p>
          </Card>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <Card className="border-border/70 p-4">
            <h3 className="mb-3 font-serif text-sm font-semibold">Analysis confidence</h3>
            <p className="text-xs text-muted-foreground">Confidence metrics will populate after ingestion.</p>
          </Card>

          <Card className="border-border/70 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-serif text-sm font-semibold">
              <Quote className="h-4 w-4 text-primary" /> Extracted citations
            </h3>
            <p className="text-xs text-muted-foreground">Citations parsed from the document will list here.</p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
