import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "components/ui/sidebar.tsx";
import { ALL_PAGES } from "lib/constants.ts";
import Link from "next/link";
import React from "react";
import type { LinkProps, SideBarLinksProps } from "types";

const SideBarLinks: SideBarLinksProps = ALL_PAGES.filter(
  (page) => page.inSidebar
);

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarHeader>Меню</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarLinks.map((link: LinkProps) => (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton asChild>
                    <Link href={link.src}>
                      {link.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
