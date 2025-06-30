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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="h-fit w-fit mt-15">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
