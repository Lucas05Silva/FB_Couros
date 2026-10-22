"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, DollarSign, Users, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EdgeFade } from "@/components/ui/edge-fade";
import { SectionHeader } from "@/components/ui/section-header";
import { scrollReveal, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import { ABOUT_DATA } from "@/lib/constants";

const ICONS = { DollarSign, Zap, Award, Users };

const VIEWPORT = { once: true, amount: 0.3 };

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-light py-28 lg:py-40"
    >
      {/* light "respiro" #1: fade in from the hero's dark bottom, fade out into Products (base) */}
      <EdgeFade edge="top" className="from-dark to-light" />
      <EdgeFade edge="bottom" className="from-light to-charcoal" />

      <Container className="relative">
        {/* Mobile: text → image → cards. md+: image spans the left column, text + cards on the right. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:gap-x-16">
          <motion.div
            className="self-end md:col-start-2 md:row-start-1"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideInRight}
          >
            <SectionHeader
              id="about-title"
              title={ABOUT_DATA.headline}
              highlight={ABOUT_DATA.highlightWord}
              tone="light"
              align="left"
            />
            <p className="mt-6 max-w-[540px] text-base leading-[1.7] text-on-light-muted">
              {ABOUT_DATA.paragraph}
            </p>
          </motion.div>

          <motion.div
            className="relative self-center md:col-start-1 md:row-span-2 md:row-start-1"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideInLeft}
          >
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 hidden size-full rounded-xl border-[1.5px] border-amber md:block"
            />
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-[var(--shadow-light-lg)] md:aspect-[4/5]">
              <Image
                src={ABOUT_DATA.image.src}
                alt={ABOUT_DATA.image.alt}
                fill
                sizes="(min-width: 1200px) 568px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 self-start md:col-start-2 md:row-start-2 lg:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            {ABOUT_DATA.differentials.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.article
                  key={item.title}
                  variants={scrollReveal}
                  className="group rounded-xl border border-line-light bg-white p-4 shadow-[var(--shadow-light-sm)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber/60 hover:shadow-[var(--shadow-light-md)] md:p-[18px] lg:p-5"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-amber/10 text-amber transition-colors duration-300 group-hover:bg-amber/15 lg:size-14">
                    <Icon aria-hidden="true" className="size-6 lg:size-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-3 text-[15px] leading-snug font-semibold text-on-light lg:mt-4 lg:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-normal text-on-light-muted lg:text-sm">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
