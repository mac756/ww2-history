import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "WW2 History - World War II Educational Resource",
  description: "Comprehensive educational resource covering all aspects of World War II (1939-1945) including timeline, causes, theaters of war, technology, and major figures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ww2-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid rgba(184, 134, 20, 0.3)',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginTop: '4rem'
          }}>
            <p style={{ fontSize: '0.9rem' }}>
              © 2024 WW2 History Educational Resource. For educational purposes only.
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
              Sources include Antony Beevor, William L. Shirer, US National Archives, and academic historians.
            </p>
            <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              CHRIST IS LORD
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
