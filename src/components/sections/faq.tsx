"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown, Clock, MessageCircle } from "lucide-react";
import { AmberDivider } from "@/components/ui/amber-divider";
import { Container } from "@/components/ui/container";
import { Noise } from "@/components/ui/noise";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { scrollReveal, slideInRight } from "@/lib/animations";
import { FAQ_CTA, FAQ_DATA, FAQ_SECTION } from "@/lib/constants";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, amount: 0.2 };

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function HelpBox({ className }: { className?: string }) {
  return (
    <aside
      aria-labelledby="faq-help-title"
      className={cn("rounded-2xl border border-amber/20 bg-elevated p-6 text-center shadow-[var(--shadow-dark-md)] md:p-8", className)}
    >
      <MessageCircle aria-hidden="true" className="mx-auto mb-4 size-10 text-amber" strokeWidth={1.5} />
      <h3 id="faq-help-title" className="text-xl font-semibold text-ivory">
        {FAQ_CTA.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ivory-muted">{FAQ_CTA.subtitle}</p>
      <WhatsAppButton href={FAQ_CTA.href} ariaLabel={FAQ_CTA.ariaLabel} className="mt-5 w-full py-3">
        {FAQ_CTA.buttonText}
      </WhatsAppButton>
      <div className="mt-5 rounded-lg border border-line-dark bg-subtle p-4">
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-ivory">
          <Clock aria-hidden="true" className="size-4 text-amber" />
          {FAQ_CTA.hoursTitle}
        </p>
        <ul className="mt-2 space-y-1 text-sm text-ivory-muted">
          {FAQ_CTA.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function Faq() {
  // one item open at a time; first one open so the pattern is obvious
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-x-clip bg-charcoal py-20 lg:py-32">
      <Noise />
      {/* same background as Testimonials above and dark CTA below → amber hairlines instead of a cut */}
      <AmberDivider />
      <AmberDivider className="top-auto bottom-0" />
      <Container className="relative">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={scrollReveal}>
          <SectionHeader id="faq-title" title={FAQ_SECTION.headline} highlight={FAQ_SECTION.highlightWord} tone="dark" />
        </motion.div>

        <div className="mt-12 flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_340px] lg:items-start lg:gap-12">
          <motion.div
            className="flex flex-col gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={listVariants}
          >
            {FAQ_DATA.map((item, i) => {
              const isOpen = open === i;
              const buttonId = `faq-q-${i}`;
              const panelId = `faq-a-${i}`;
              return (
                <motion.div
                  key={item.question}
                  variants={scrollReveal}
                  className={cn(
                    "overflow-hidden rounded-xl border bg-elevated transition-[border-color,box-shadow] duration-300",
                    isOpen ? "border-amber/30 shadow-[0_4px_24px_rgba(200,148,42,0.08)]" : "border-line-dark",
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-subtle focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-amber-glow md:px-6"
                    >
                      <span className="text-[15px] font-semibold text-ivory md:text-base">{item.question}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-5 shrink-0 text-amber transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="mx-5 border-t border-line-dark pt-4 pb-5 text-[15px] leading-[1.7] text-ivory-muted md:mx-6">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="lg:sticky lg:top-[100px]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideInRight}
          >
            <HelpBox />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
