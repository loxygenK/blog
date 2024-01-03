import type { Metadata } from "next";
import { ReactNode } from "react";
import { BodyLayout } from "~/feat/ui/BodyLayout";
import { Header } from "~/feat/ui/Header";

export const metadata: Metadata = {
  title: "Flisan's Blog",
  description:
    "私が学んだことや感じたこと、思ったことで、インターネットの人々に見せたいものが入っています。",
  openGraph: {
    title: "Flisan's Blog",
    description:
      "私が学んだことや感じたこと、思ったことで、インターネットの人々に見せたいものが入っています。",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
