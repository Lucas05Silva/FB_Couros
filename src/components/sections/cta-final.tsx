"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";
import { GoldLine } from "@/components/ui/gold-line";
import { withHighlight } from "@/components/ui/gradient-text";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { EASE_OUT_QUAD } from "@/lib/animations";
import { CTA_FINAL_DATA as DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, amount: 0.4 };

const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function CtaFinal() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number): Transition =>
    reduceMotion ? { duration: 0 } : { delay, duration: 0.7, ease: EASE_OUT_QUAD };

  return (
    <section
      id="contato"
      aria-labelledby="cta-final-title"
      className="relative isolate overflow-hidden bg-dark py-20 text-center text-on-dark md:py-28 lg:py-40"
    >
      {/* Leather-like texture + breathing gold glow */}
      <div aria-hidden="true" className="leather-texture pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="cta-breathe pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,105,20,0.35)_0%,transparent_65%)]"
      />

      <Container className="flex flex-col items-center">
        <motion.div
          className="origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={enter(0.2)}
        >
          <GoldLine className="h-[3px] w-12 md:w-14 lg:w-16" />
        </motion.div>

        <motion.h2
          id="cta-final-title"
          className="mt-6 font-heading text-[32px] leading-[1.1] font-bold text-balance md:text-[44px] lg:text-[56px]"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={slideUp}
          transition={enter(0.4)}
        >
          {withHighlight(DATA.headline, DATA.highlightWord)}
        </motion.h2>

        <motion.p
          className="mt-6 max-w-[640px] text-base leading-[1.7] text-on-dark-muted md:text-[17px] lg:text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={slideUp}
          transition={enter(0.6)}
        >
          {DATA.subtitle}
        </motion.p>

        <div className="mt-10 flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideUp}
            transition={enter(0.8)}
          >
            <WhatsAppButton
              href={DATA.ctaPrimary.href}
              ariaLabel={DATA.ctaPrimary.ariaLabel}
              className="cta-pulse w-full px-10 py-5 text-lg md:w-auto lg:text-lg"
            >
              {DATA.ctaPrimary.text}
            </WhatsAppButton>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideUp}
            transition={enter(0.95)}
          >
            <a
              href={DATA.ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={DATA.ctaSecondary.ariaLabel}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full md:w-auto",
                "border-[1.5px] border-brand-primary px-8 py-4 leading-none font-medium text-brand-accent",
                "transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/10",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent",
              )}
            >
              <InstagramIcon />
              {DATA.ctaSecondary.text}
            </a>
          </motion.div>
        </div>

        <motion.a
          href={DATA.phoneHref}
          className="mt-6 text-sm text-ink-subtle transition-colors hover:text-brand-accent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={enter(1.1)}
        >
          {DATA.phone}
        </motion.a>
      </Container>
    </section>
  );
}
