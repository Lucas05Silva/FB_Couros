"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GoldLine } from "@/components/ui/gold-line";
import { GradientText } from "@/components/ui/gradient-text";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { EASE_OUT_QUAD } from "@/lib/animations";
import { BRAND, HERO_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Entrance timeline (seconds)
const DELAY = {
  logo: 0.3,
  line: 0.5,
  headline: 0.7,
  wordStagger: 0.08,
  subtitle: 0.9,
  ctas: 1.1,
  ctaStagger: 0.15,
  scroll: 1.8,
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // React doesn't always serialize `muted` into the SSR markup, which can block
  // autoplay on iOS — force it and kick off playback once mounted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (reduceMotion) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      // autoplay refused (e.g. data saver) — the poster stays visible
    });
  }, [reduceMotion]);

  // With reduced motion every element still mounts "hidden" (keeps SSR markup stable)
  // but jumps straight to its final state at once.
  const enter = (delay: number, duration = 0.7): Transition =>
    reduceMotion ? { duration: 0 } : { delay, duration, ease: EASE_OUT_QUAD };

  const words = HERO_DATA.headline.split(" ");

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="hero-height relative isolate flex items-center justify-center overflow-hidden bg-dark text-on-dark"
    >
      {/* ── Background: poster (LCP + reduced-motion fallback) under the looping video ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={HERO_DATA.posterSrc}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={85}
          className="object-cover"
        />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={HERO_DATA.posterSrc}
          className="absolute inset-0 size-full object-cover motion-reduce:hidden"
        >
          <source src={HERO_DATA.videoSrcMobile} type="video/mp4" media="(max-width: 768px)" />
          <source src={HERO_DATA.videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-dark" />
        {/* extra darkening behind the text block — keeps contrast when the light sweeps through center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(0,0,0,0.5)_0%,transparent_100%)]" />
      </div>

      {/* ── Content ── */}
      <Container className="flex flex-col items-center py-20 text-center md:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.9 } }}
          transition={enter(DELAY.logo, 0.8)}
        >
          <Image
            src={BRAND.logo}
            alt={BRAND.name}
            width={240}
            height={96}
            preload
            className="h-auto w-[72px] md:w-[100px] lg:w-[120px]"
          />
        </motion.div>

        <motion.div
          className="mt-5 mb-4 origin-center md:mt-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={enter(DELAY.line, 0.6)}
        >
          <GoldLine className="h-[3px] w-9 md:w-12" />
        </motion.div>

        <h1
          id="hero-title"
          className="max-w-[800px] font-heading text-[32px] leading-[1.08] font-bold tracking-[0.01em] text-balance md:text-5xl md:leading-[1.06] md:tracking-normal lg:text-[64px] lg:leading-[1.05]"
        >
          {words.map((word, i) => (
            <span key={i}>
              <motion.span
                // blur is costly on phone GPUs: plain fade + rise below md
                className="inline-block max-md:filter-none!"
                initial="hidden"
                animate="visible"
                variants={wordReveal}
                transition={enter(DELAY.headline + i * DELAY.wordStagger, 0.5)}
              >
                {word === HERO_DATA.highlightWord ? <GradientText>{word}</GradientText> : word}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-5 max-w-[300px] text-[15px] leading-[1.7] text-on-dark-muted md:mt-6 md:max-w-[600px] md:text-[17px] lg:text-lg"
          initial="hidden"
          animate="visible"
          variants={slideUp}
          transition={enter(DELAY.subtitle)}
        >
          {HERO_DATA.subtitle}
        </motion.p>

        <div className="mt-8 flex w-full flex-col gap-3 md:mt-10 md:w-auto md:flex-row md:gap-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={enter(DELAY.ctas)}
          >
            <WhatsAppButton
              href={HERO_DATA.ctaPrimary.href}
              ariaLabel={HERO_DATA.ctaPrimary.ariaLabel}
              className="w-full md:w-auto"
            >
              {HERO_DATA.ctaPrimary.text}
            </WhatsAppButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={enter(DELAY.ctas + DELAY.ctaStagger)}
          >
            <a
              href={HERO_DATA.ctaSecondary.href}
              aria-label={HERO_DATA.ctaSecondary.ariaLabel}
              className={cn(
                "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full md:w-auto",
                "border-[1.5px] border-brand-primary px-6 py-4 md:px-8 text-[15px] leading-none font-semibold text-brand-accent lg:text-base",
                "transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/10 active:scale-[0.97]",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent",
              )}
            >
              {HERO_DATA.ctaSecondary.text}
              <ChevronsDown aria-hidden="true" className="size-5" />
            </a>
          </motion.div>
        </div>
      </Container>

      {/* ── Scroll indicator ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.6 } }}
        transition={enter(DELAY.scroll, 0.8)}
      >
        <motion.div
          initial={{ y: 0 }}
          animate={reduceMotion ? { y: 0 } : { y: [0, 8, 0] }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronsDown className="size-7 text-brand-accent" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
