"use client";

import * as React from "react";
import { Command, Inbox } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { getdata } from "@/lib/supabase-action";

// Sample data for navMain and docs
const data = {
  navMain: [
    {
      title: "upload file",
      url: "/dashboard",
      icon: Inbox,
      isActive: true,
    },
  ],
  docs: [
    { id: 1, title: "this is 1st doc", url: "#" },
    { id: 2, title: "this is 2nd doc", url: "#" },
    { id: 3, title: "this is 3rd doc", url: "#" },
    { id: 4, title: "this is 4th doc", url: "#" },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isSignedIn, user, isLoaded } = useUser();

  // Set default active item and docs
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();
  const [all_data, setall_data] = React.useState<{ id: string }[]>([]);

  React.useEffect(() => {
    if (user) {
      getdata(user.id).then((data) => {
        return setall_data(data ?? []);
      });
    }
  }, [user]);

  // Prepare dynamic user data to pass to NavUser
  const userData =
    isLoaded && isSignedIn
      ? {
          name: user.fullName || "Anonymous",
          email: user.primaryEmailAddress?.emailAddress || "No email",
          avatar: user.imageUrl || "/default-avatar.jpg", // Set a default avatar if imageUrl is unavailable
        }
      : {
          name: "Guest",
          email: "guest@example.com",
          avatar: "/default-avatar.jpg",
        };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* First Sidebar */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Interface -Lab
                    </span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          setOpen(true);
                        }}
                        isActive={activeItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
      </Sidebar>

      {/* Second Sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {Array.isArray(all_data) && all_data.length > 0 && isSignedIn ? (
                all_data.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/dashboard/${doc.id}`}
                    passHref
                    className="block p-4 border-b border-gray-700 hover:bg-gray-800 rounded-md"
                  >
                    <div className="text-lg font-semibold text-white">
                      {doc.id.slice(0, 4)}...
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500">
                  No data available.
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
