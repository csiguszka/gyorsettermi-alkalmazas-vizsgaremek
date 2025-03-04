import type { Metadata } from "next";
import { Geist, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientWrapper from "@/components/ClientWrapper";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/QueryProvider"; // Ezt importáljuk

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunitosans = Nunito_Sans({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Gyorséttermi alkalmazás",
  description: "Created by 'power by Jedlik team'",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${nunitosans.variable} antialiased`}
      >
        <QueryProvider>
          {" "}
          {/* Az új QueryProvider */}
          <ClientWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </ClientWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
