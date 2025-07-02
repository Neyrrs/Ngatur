import { ThemeProvider } from "@/components/ui/theme-provider";
import "../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ngatur",
  description: "User tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="h-screen w-screen pt-15">{children}</div>
    </ThemeProvider>
  );
}
