"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, Package, Palette, Scissors } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EdgeFade } from "@/components/ui/edge-fade";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { EASE_OUT_QUAD, scrollReveal } from "@/lib/animations";
import { PROCESS_CTA, PROCESS_SECTION, PROCESS_STEPS } from "@/lib/constants";

const ICONS = { MessageCircle, Palette, Scissors, Package };

const VIEWPORT = { once: true, amount: 0.3 };

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const numberPulse: Variants = {
  hidden: { scale: 1 },
  visible: { scale: [1, 1.1, 1], transition: { duration: 0.6, delay: 0.3 } },
};

const iconSpin: Variants = {
  hidden: { rotate: 0 },
  visible: { rotate: 360, transition: { duration: 0.8, ease: EASE_OUT_QUAD } },
};

// Desktop connector: draws left → right behind the number circles
const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.4, delay: 0.3, ease: "easeInOut" } },
};

// Mobile connector segment under each number
const segmentDraw: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.5, delay: 0.4, ease: "easeOut" } },
};

export function Process() {
  return (
    <section
      id="processo"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-light py-24 md:py-28 lg:py-40"
    >
      {/* light "respiro" #2: fade in from B2B (deep), fade out into Testimonials (base) */}
      <EdgeFade edge="top" className="from-deep to-light" />
      <EdgeFade edge="bottom" className="from-light to-charcoal" />

      <Container className="relative">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={scrollReveal}>
          <SectionHeader
            id="process-title"
            title={PROCESS_SECTION.headline}
            highlight={PROCESS_SECTION.highlightWord}
            subtitle={PROCESS_SECTION.subtitle}
            tone="light"
          />
        </motion.div>

        <motion.ol
          className="relative mt-10 flex flex-col md:mt-16 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={listVariants}
        >
          <motion.span
            aria-hidden="true"
            variants={lineDraw}
            className="absolute top-6 hidden origin-left border-t-2 border-dashed border-line-light lg:block"
            style={{ left: "calc((100% - 6rem) / 8)", right: "calc((100% - 6rem) / 8)" }}
          />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const isLast = i === PROCESS_STEPS.length - 1;
            return (
              <motion.li
                key={step.number}
                variants={scrollReveal}
                className="group relative flex gap-4 pb-8 last:pb-0 md:flex-col md:items-center md:gap-0 md:pb-0 md:text-center"
              >
                {!isLast && (
                  <motion.span
                    aria-hidden="true"
                    variants={segmentDraw}
                    className="absolute top-12 bottom-2 left-5 origin-top -translate-x-1/2 border-l-2 border-dashed border-amber/30 md:hidden"
                  />
                )}

                <motion.span
                  aria-hidden="true"
                  variants={numberPulse}
                  className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-deep shadow-[0_0_0_6px_rgba(200,148,42,0.1)] ring-4 ring-light md:mb-4 md:size-11 md:text-[17px] lg:size-12 lg:text-lg"
                >
                  {step.number}
                </motion.span>

                {/* mobile timeline: number → text (icon only from md, where there is room) */}
                <div className="flex flex-col pt-1.5 md:items-center md:pt-0">
                  <div className="mb-3 hidden size-12 items-center justify-center rounded-full bg-amber/10 text-amber-deep transition-colors duration-300 group-hover:bg-amber group-hover:text-deep md:mb-4 md:flex md:size-14 lg:size-16">
                    <motion.span variants={iconSpin} className="flex">
                      <Icon aria-hidden="true" className="size-6 md:size-7 lg:size-8" strokeWidth={1.75} />
                    </motion.span>
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-on-light md:mb-2">
                    <span className="sr-only">Passo {step.number}: </span>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-on-light-muted md:max-w-[220px] md:leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

        <motion.div
          className="mt-12 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={scrollReveal}
          custom={2}
        >
          <WhatsAppButton
            href={PROCESS_CTA.href}
            ariaLabel={PROCESS_CTA.ariaLabel}
            icon={<MessageCircle aria-hidden="true" className="size-5" />}
            className="w-full md:w-auto"
          >
            {PROCESS_CTA.text}
          </WhatsAppButton>
        </motion.div>
      </Container>
    </section>
  );
}
