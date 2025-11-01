import AppSidebar from "components/modules/AppSidebar/AppSidebar.tsx";
import AuthProtectRoute from "components/modules/AuthProtectRoute/AuthProtectRoute.tsx";
import Header from "components/modules/Header/Header.tsx";
import {SidebarProvider} from "components/ui/sidebar.tsx";
import {userData} from "mock/user.ts";
import type React from "react";

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("root-layout");
    return (
        <AuthProtectRoute>
            <SidebarProvider>
                <AppSidebar/>
                <div className={"w-full"}>
                    <Header
                        username={userData.username}
                        avatarLink={userData.avatarLink}
                    />
                    <main
                        className="m-auto h-[calc(100vh-var(--header-height))] lg:h-[calc(100vh-var(--header-height-lg))]">
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </AuthProtectRoute>
    );
}
