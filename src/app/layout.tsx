import "./globals.css";
import {ThemeProvider} from "components/modules/ThemeProvider/ThemeProvider.tsx";
import AppProvider from "components/providers/AppProvider/AppProivder.tsx";
import type {Metadata} from "next";
import type {NextFont} from "next/dist/compiled/@next/font";
import {Inter} from "next/font/google";
import type React from "react";

const inter: NextFont = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Dev GridBoard",
    description: "Personal developer panel"
};

const AuthLayout = ({
                        children
                    }: {
    children: React.ReactNode;
}) => {
    return (
        <html
            lang="ru"
            className={inter.className}
            suppressHydrationWarning
        >
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AppProvider>{children}</AppProvider>
        </ThemeProvider>
        </body>
        </html>
    );
};

export default AuthLayout;
