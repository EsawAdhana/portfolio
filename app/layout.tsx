import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeScript from "./components/ThemeScript";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esawadhana.com"),
  title: "Esaw Adhana",
  description:
    "Stanford CS. Former SWE intern at Google and Uber. Full-stack projects including Stanford Root—course discovery, data pipelines, and product UX.",
  icons: {
    icon: [
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "64x64" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${dmSans.variable} antialiased`}>
        <ThemeScript />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
