import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  CreditCard,
  Megaphone,
  Gift,
  Users2,
  ChevronsUpDown,
  ChevronDown,
  LayoutList,
  Percent,
  CalendarCheck,
  Layers2,
} from "lucide-react";

// Menu items.
const items = [
  {
    title:"Dashboard",
    url: "/dashboard",
    icon: Home,
  },

   {
    title: "Job categories",
    icon: GraduationCap,
    children: [
      { title: "Education wise", url: "/job-categories/education-wise" },
      { title: "State wise", url: "/job-categories/state-wise" },
    ],
  },
  {
    title: "Announcement",
    url: "/announcement",
    icon: CalendarDays,
  },
   {
    title: "Admit Card ",
    url: "/admit-card",
    icon: LayoutList,
  },
  {
    title: "Answer Keys",
    url: "/answer-keys",
    icon: CalendarCheck,
  },
   {
    title: "Result",
    url: "/result",
    icon: Percent,
  },
  {
    title: "Board Result",
    url: "/board-result",
    icon: Megaphone,
  },
  {
    title: "Certificate",
    url: "/Certificate",
    icon: Gift,
  },
  {
    title: "Yojana",
    url: "/yojana",
    icon: Layers2,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}