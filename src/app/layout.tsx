import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// viewport-fit=cover lets the page use the full screen on notched iPhones; safe-area insets are padded in globals.css
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a1714",
};

export const metadata: Metadata = {
  title: "FB Couros | Artigos em Couro Premium — Londrina, PR",
  description:
    "Bolsas, carteiras, cintos e acessórios em couro premium. Personalização com logo para empresas. Preço acessível, entrega rápida e qualidade superior. Londrina e região.",
  keywords: [
    "couro",
    "bolsas",
    "carteiras",
    "cintos",
    "personalização",
    "brindes corporativos",
    "londrina",
    "artesanal",
  ],
  openGraph: {
    title: "FB Couros | Artigos em Couro Premium",
    description:
      "Bolsas, carteiras e acessórios feitos à mão com couro premium. Personalização para empresas.",
    // TODO: adicionar /images/og-image.jpg (1200x630) e descomentar
    // images: ["/images/og-image.jpg"],
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
