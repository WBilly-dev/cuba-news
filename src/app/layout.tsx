import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuba News - Noticias de Cuba desde el exterior",
  description:
    "Últimas noticias de Cuba聚合来自多个独立的古巴RSS来源，提供现代、以内容为中心的界面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <nav className="bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--border-color)] sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <span className="text-xl font-serif font-semibold text-[var(--accent-navy)] tracking-tight">
              🇨🇺 Cuba News
            </span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}