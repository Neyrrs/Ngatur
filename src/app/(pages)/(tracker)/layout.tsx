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
  return <div className="h-screen w-screen pt-15">{children}</div>;
}
