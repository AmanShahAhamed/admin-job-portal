"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  GraduationCap,
  CalendarDays,
  LayoutList,
  CalendarCheck,
  Percent,
  Megaphone,
  Gift,
  Layers2,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

// Type definitions
interface MenuItemChild {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  children?: MenuItemChild[];
}

// Menu items with proper typing
const items: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Job categories",
    icon: GraduationCap,
    children: [
      { title: "Education", url: "/job-categories/education" },
      { title: "State", url: "/job-categories/state" },
      { title: "Designation", url: "/job-categories/designation" },
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
];

export function AppSidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isDropdown = item.children && item.children.length > 0;

                if (isDropdown) {
                  const isActiveDropdown = item.children?.some((child) =>
                    pathname.includes(child.url),
                  );
                  const isOpen = openDropdown === item.title;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <div
                        className={clsx(
                          "rounded-md px-2 py-2 transition-colors flex items-center justify-between gap-2 cursor-pointer",
                          {
                            "bg-[#F1F5F9]": isActiveDropdown || isOpen,
                          },
                        )}
                        onClick={() => toggleDropdown(item.title)}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={clsx("h-4 w-4 transition-transform", {
                            "rotate-180": isOpen,
                          })}
                        />
                      </div>
                      {isOpen && (
                        <div className="pl-6 pt-2">
                          {item.children?.map((child) => {
                            const isActive = pathname === child.url;
                            return (
                              <Link key={child.title} href={child.url}>
                                <div
                                  className={clsx(
                                    "text-sm py-1 px-2 rounded hover:bg-slate-100",
                                    {
                                      "bg-[#F1F5F9] font-medium": isActive,
                                    },
                                  )}
                                >
                                  {child.title}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                }

                const isActive = item.url ? pathname.includes(item.url) : false;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={clsx(
                        "rounded-md px-2 py-2 transition-colors flex items-center gap-2",
                        {
                          "bg-[#F1F5F9]": isActive,
                        },
                      )}
                    >
                      {item.url ? (
                        <Link href={item.url} className="w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 w-full">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
