import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuba News - Noticias de Cuba desde el exterior",
  description:
    "Últimas noticias de Cuba desde Martí Noticias, Radio Martí y otras fuentes internacionales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <span className="text-lg font-semibold text-gray-800">
              🇨🇺 Cuba News
            </span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
