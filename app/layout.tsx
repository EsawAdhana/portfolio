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
  title: "Esaw Adhana",
  description: "Portfolio website of Esaw Adhana",
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
