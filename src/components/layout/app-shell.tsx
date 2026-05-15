import { Bell, Moon, Search, Sparkles, Sun } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background paper-texture">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/80 bg-background/85 px-4 backdrop-blur-md md:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="hidden h-6 w-px bg-border md:block" />

            <div className="hidden flex-1 items-center md:flex">
              <div className="group relative flex h-10 w-full max-w-2xl items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search papers, authors, DOIs, or ask a research question…"
                  className="h-full w-full rounded-md border border-input bg-card pl-9 pr-32 text-sm placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  <Badge variant="outline" className="h-6 gap-1 border-gold/40 bg-gold/10 px-1.5 font-mono text-[10px] font-medium text-gold-foreground">
                    <Sparkles className="h-3 w-3" />
                    Ask Agent
                  </Badge>
                  <kbd className="hidden h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground lg:inline-flex">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
              </Button>
              <div className="ml-1 hidden h-6 w-px bg-border md:block" />
              <Avatar className="h-8 w-8 ring-1 ring-border">
                <AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">
                  EM
                </AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
