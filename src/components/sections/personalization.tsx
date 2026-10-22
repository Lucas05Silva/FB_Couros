"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Building2, CircleCheck } from "lucide-react";
import { AmberDivider } from "@/components/ui/amber-divider";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Noise } from "@/components/ui/noise";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { EASE_OUT_QUAD, scrollReveal, slideInLeft, staggerContainer } from "@/lib/animations";
import { PERSONALIZATION_DATA as DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, amount: 0.3 };

const imageReveal: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT_QUAD },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function StatBadge({ className }: { className?: string }) {
  return (
    <motion.div
      variants={scrollReveal}
      className={cn(
        "relative mx-auto w-max items-center gap-3 rounded-lg border bg-elevated px-4 py-3 shadow-[var(--shadow-dark-lg)]",
        className,
      )}
    >
      <Building2 aria-hidden="true" className="size-6 text-amber" strokeWidth={1.5} />
      <p className="flex items-baseline gap-2">
        <span className="font-heading text-[28px] leading-none font-bold text-amber-glow md:text-[32px]">
          <CountUp value={DATA.stat.value} suffix={DATA.stat.suffix} />
        </span>
        <span className="text-[13px] text-ivory-muted">{DATA.stat.label}</span>
      </p>
    </motion.div>
  );
}

export function Personalization() {
  return (
    <section
      id="personalizacao"
      aria-labelledby="personalization-title"
      className="relative overflow-hidden bg-deep pt-16 pb-12 text-ivory md:pt-20 lg:pt-32 lg:pb-16"
    >
      <Noise />
      <AmberDivider />
      <Container className="relative">
        {/* Mobile: intro → mockup → benefits → stat → CTA. md+: text left, mockup (+ stat) spanning the right column. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:gap-x-16">
          <motion.div
            className="self-end md:col-start-1 md:row-start-1"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            <motion.p
              variants={slideInLeft}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-deep bg-amber/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-amber-glow uppercase"
            >
              <Building2 aria-hidden="true" className="size-3.5" />
              {DATA.badge}
            </motion.p>
            <motion.div variants={slideInLeft}>
              <SectionHeader
                id="personalization-title"
                title={DATA.headline}
                highlight={DATA.highlightWords}
                tone="dark"
                align="left"
              />
            </motion.div>
            <motion.p
              variants={slideInLeft}
              className="mt-6 max-w-[520px] text-[15px] leading-[1.7] text-ivory-muted md:text-base"
            >
              {DATA.paragraph}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative self-center md:col-start-2 md:row-span-2 md:row-start-1"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={imageReveal}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-0 bg-[radial-gradient(circle_at_center,rgba(200,148,42,0.2)_0%,transparent_65%)] md:-inset-10"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-[1.5px] border-line-dark-strong md:rounded-2xl shadow-[0_0_40px_rgba(200,148,42,0.15)] md:aspect-square">
              <Image
                src={DATA.image.src}
                alt={DATA.image.alt}
                fill
                sizes="(min-width: 1200px) 568px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* overlaps the mockup on md+; on mobile it sits right before the CTA instead */}
            <StatBadge className="-mt-8 hidden border-line-dark md:flex" />
          </motion.div>

          <div className="self-start md:col-start-1 md:row-start-2">
            <motion.ul
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={listVariants}
            >
              {DATA.benefits.map((benefit) => (
                <motion.li key={benefit} variants={scrollReveal} className="flex items-start gap-3">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-glow" />
                  <span className="text-[15px] leading-normal text-ivory">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 md:hidden"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <StatBadge className="flex border-amber/30" />
            </motion.div>

            <motion.div
              className="mt-8 md:mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={scrollReveal}
            >
              <WhatsAppButton href={DATA.cta.href} ariaLabel={DATA.cta.ariaLabel} className="w-full md:w-auto">
                {DATA.cta.text}
              </WhatsAppButton>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* ── Segments marquee (decorative; the list is repeated for screen readers below) ── */}
      <div className="relative mt-16 border-y border-line-dark py-5 lg:mt-24">
        <p className="sr-only">
          {DATA.segmentsLabel}: {DATA.segments.join(", ")}.
        </p>
        <div
          aria-hidden="true"
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {DATA.segments.map((segment) => (
                  <li
                    key={segment}
                    className="flex items-center text-sm tracking-wider whitespace-nowrap text-ivory-faint uppercase"
                  >
                    <span className="px-6">{segment}</span>
                    <span className="size-1.5 rounded-full bg-amber" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
