import { About } from "@/components/sections/about";
import { CtaFinal } from "@/components/sections/cta-final";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Personalization } from "@/components/sections/personalization";
import { Process } from "@/components/sections/process";
import { Products } from "@/components/sections/products";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Products />
        <Personalization />
        <Process />
        <Testimonials />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
