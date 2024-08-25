import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "./_trpc/provider";
import Sidebar from "@/components/sideBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KnowLedge Hub",
  description: "Knowledge Hub",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider  
        attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
              <SessionProvider>
        <Provider>{children}</Provider>
        </SessionProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
