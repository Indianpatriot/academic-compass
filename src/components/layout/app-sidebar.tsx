import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  FileText,
  Quote,
  FileSearch,
  Library,
  History,
  BookMarked,
  Settings,
  GraduationCap,
  ChevronsUpDown,
  Folder,
  Bookmark,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const primary = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Research Assistant", url: "/assistant", icon: Sparkles },
  { title: "Literature Review", url: "/literature", icon: BookOpen },
  { title: "Paper Summarizer", url: "/summarizer", icon: FileText },
  { title: "Citation Generator", url: "/citations", icon: Quote },
  { title: "PDF Analyzer", url: "/pdf-analyzer", icon: FileSearch },
];

const library = [
  { title: "Knowledge Base", url: "/knowledge", icon: Library },
  { title: "Research History", url: "/history", icon: History },
  { title: "Saved Reports", url: "/reports", icon: BookMarked },
];

const recentProjects = [
  "Transformer Architectures Review",
  "Climate Adaptation Strategies",
  "Quantum Error Correction",
];

const savedPapers = [
  "Attention Is All You Need (2017)",
  "BERT: Pre-training Deep Bidirectional…",
  "Sparse Mixture-of-Experts at Scale",
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (u: string) => (u === "/" ? pathname === "/" : pathname.startsWith(u));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-serif text-[15px] font-semibold tracking-tight text-sidebar-foreground">
              Research Scholar
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Agent · v2.4
            </span>
          </div>
        </div>
        <button className="mx-2 mb-2 flex items-center justify-between rounded-md border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-1.5 text-xs hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            <span className="font-medium text-sidebar-foreground">Doctoral Workspace</span>
          </span>
          <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em]">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="gap-2.5">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em]">
            Library
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {library.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="gap-2.5">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em]">
            Recent Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentProjects.map((p) => (
                <SidebarMenuItem key={p}>
                  <SidebarMenuButton className="gap-2 text-xs text-muted-foreground hover:text-foreground">
                    <Folder className="h-3.5 w-3.5" />
                    <span className="truncate">{p}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em]">
            Saved Papers
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedPapers.map((p) => (
                <SidebarMenuItem key={p}>
                  <SidebarMenuButton className="gap-2 text-xs text-muted-foreground hover:text-foreground">
                    <Bookmark className="h-3.5 w-3.5" />
                    <span className="truncate">{p}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link to="/settings" className="gap-2.5">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 gap-2.5">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">
                  EM
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col leading-tight">
                <span className="text-xs font-medium">Dr. Elena Marston</span>
                <span className="text-[10px] text-muted-foreground">Stanford · Linguistics</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
