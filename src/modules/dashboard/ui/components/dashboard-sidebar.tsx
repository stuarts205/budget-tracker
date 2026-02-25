'use client'
import React from "react";
import {
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  PiggyBankIcon,
  BanknoteArrowDown,
  BadgeCentIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    label: "Dashboard",
    href: "/home",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: PiggyBankIcon,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: BadgeCentIcon,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: BanknoteArrowDown,
  },
];

const secondSection = [
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
  {
    label: "Users",
    href: "/users",
    icon: UsersIcon,
  },
];

export const DashboardSidebar = () => {
    const pathName = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <Link className="flex items-center gap-2 px-2 pt-2" href="/home">
          <Image src="/logo.svg" alt="Budget App Logo" width={36} height={36} />
          <p className="text-2xl font-semibold text-blue-950">Budget Tracker</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#f1630d]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild 
                    className={cn(
                        'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#f1630d]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                        pathName === item.href && 'bg-linear-to-r/oklch border-[#f1630d]/10' 
                    )}
                    isActive={pathName === item.href}>
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#f1630d]" />
      </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild 
                    className={cn(
                        'h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#f1630d]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                        pathName === item.href && 'bg-linear-to-r/oklch border-[#f1630d]/10' 
                    )}
                    isActive={pathName === item.href}>
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-blue-950">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
