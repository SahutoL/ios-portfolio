import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { getSiteConfig } from "@/lib/itunes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ios-portfolio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "qursor - iOS App Portfolio",
    template: "%s | qursor",
  },
  description: "qursorが開発・公開しているiOSアプリのポートフォリオサイト。プライバシーポリシー・利用規約・特定商取引法に基づく表示を掲載。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "qursor",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSiteConfig();
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="ja">
      <body>
        {/* Header */}
        <header className="site-header">
          <div className="container">
            <Link href="/" className="site-logo">
              {config.developer.name}
            </Link>
            <nav className="site-nav">
              <Link href="/">Apps</Link>
              <Link href="/tokushoho">特定商取引法</Link>
            </nav>
          </div>
        </header>
        
        {/* Main Content */}
        <main>
          {children}
        </main>
        
        {/* Footer */}
        <footer className="site-footer">
          <div className="container">
            <div className="footer-links">
              <Link href="/">アプリ一覧</Link>
              <Link href="/tokushoho">特定商取引法に基づく表示</Link>
            </div>
            <p className="footer-copyright">
              © {currentYear} {config.developer.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
