import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { getSiteConfig } from "@/lib/itunes";

export const metadata: Metadata = {
  title: {
    default: "App Portfolio",
    template: "%s | App Portfolio",
  },
  description: "iOSアプリのポートフォリオサイト",
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
            <Link href="/app" className="site-logo">
              {config.developer.name}
            </Link>
            <nav className="site-nav">
              <Link href="/app">Apps</Link>
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
              <Link href="/app">アプリ一覧</Link>
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
