import type { Metadata } from "next";
import "./globals.css";

const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(host),
  title: { default: "RESCENE TOP5 PICK", template: "%s | RESCENE TOP5 PICK" },
  description: "리센느의 노래 30곡으로 나만의 TOP5를 만들어 보세요.",
  openGraph: { type: "website", siteName: "RESCENE TOP5 PICK", title: "RESCENE TOP5 PICK", description: "리센느의 노래 30곡으로 나만의 TOP5를 만들어 보세요." },
  twitter: { card: "summary_large_image", title: "RESCENE TOP5 PICK", description: "리센느의 노래 30곡으로 나만의 TOP5를 만들어 보세요." }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
