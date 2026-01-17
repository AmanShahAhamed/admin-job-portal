"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, ChevronDown, CircleUserRound } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith("/login")) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <div className="flex items-center justify-between p-4 w-full border-b border-slate-200">
          <SidebarTrigger />

          <div className="flex gap-3 items-center mr-2.5 cursor-pointer">
            <Bell size={20} color="#1A1D1F" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-2.5 items-center">
                  <CircleUserRound size={20} color="#1A1D1F" />
                  <ChevronDown size={18} color="#1A1D1F" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="-ml-5 mr-5">
                <DropdownMenuLabel
                  className="flex gap-2 cursor-pointer"
                  onClick={() => {
                    Cookies.remove("token", { path: "/" });
                    router.replace("/login");
                  }}
                >
                  <img src="/dashboard/logout.svg" alt="Logout" />
                  Log Out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
