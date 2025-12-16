// app/layout.tsx

import type { Metadata } from "next";
import { Lato, Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Kenzari Jewellers",
  description: "Kenzari is a platform for buying and selling gold",
  icons: {
    icon: "/images/kenzari_favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
