"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { Noise } from "@/components/ui/noise";
import { SectionHeader } from "@/components/ui/section-header";
import { EASE_OUT_QUAD, scrollReveal } from "@/lib/animations";
import {
  STATS_DATA,
  TESTIMONIALS_DATA,
  TESTIMONIALS_SECTION,
  type Testimonial,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, amount: 0.2 };
const AUTOPLAY_MS = 5000;
const TOTAL = TESTIMONIALS_DATA.length;

const trackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT_QUAD } },
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`Avaliação: ${rating} de 5 estrelas`} className="mt-4 flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn("size-4", i < rating ? "fill-amber-glow text-amber-glow" : "fill-line-dark-strong text-line-dark-strong")}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item, position }: { item: Testimonial; position: number }) {
  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`Depoimento ${position} de ${TOTAL}`}
      variants={cardVariants}
      className="relative flex shrink-0 basis-[85%] snap-start flex-col rounded-2xl border border-line-dark bg-elevated p-5 shadow-[var(--shadow-dark-sm)] transition-[border-color,box-shadow] duration-500 hover:border-amber/30 hover:shadow-[0_4px_24px_rgba(200,148,42,0.08)] sm:basis-[70%] md:basis-[calc((100%-1.25rem)/2)] md:p-6 lg:basis-[calc((100%-3rem)/3)] lg:p-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 left-5 font-accent text-[80px] leading-none text-amber/10 select-none"
      >
        &ldquo;
      </span>
      <blockquote className="relative pt-5 text-[15px] leading-[1.7] text-ivory-muted italic">
        {item.text}
      </blockquote>
      <Stars rating={item.rating} />
      <div className="mt-auto flex items-center gap-3 pt-4">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-amber to-amber-glow text-sm font-semibold text-deep"
          >
            {initials(item.author)}
          </span>
        )}
        <div>
          <p className="text-[15px] font-semibold text-ivory">{item.author}</p>
          <p className="text-[13px] text-ivory-muted">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ArrowButton({ direction, onClick, disabled }: { direction: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Depoimento anterior" : "Próximo depoimento"}
      className="hidden size-11 cursor-pointer items-center justify-center rounded-full border border-line-dark bg-elevated text-amber shadow-[var(--shadow-dark-sm)] transition-colors duration-200 hover:border-transparent hover:bg-amber hover:text-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-glow disabled:cursor-default disabled:opacity-40 disabled:hover:border-line-dark disabled:hover:bg-elevated disabled:hover:text-amber md:flex"
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}

export function Testimonials() {
  const regionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(regionRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(TOTAL - 1);
  const [paused, setPaused] = useState(false);

  // distance between the starts of two consecutive cards
  const stepSize = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 1;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = Math.max(0, Math.min(i, maxIndex));
      track.scrollTo({ left: target * stepSize(), behavior: reduceMotion ? "auto" : "smooth" });
    },
    [maxIndex, reduceMotion, stepSize],
  );

  // cards per view changes with the breakpoint → recompute last reachable position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const perView = Math.max(1, Math.round((track.clientWidth + 1) / stepSize()));
      setMaxIndex(Math.max(0, TOTAL - perView));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [stepSize]);

  // autoplay: only while visible, not hovered/focused, without reduced motion — and not on
  // phones, where it would fight the user's own swiping
  useEffect(() => {
    if (paused || reduceMotion || !inView || maxIndex === 0) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const timer = setTimeout(() => goTo(index >= maxIndex ? 0 : index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, maxIndex, paused, reduceMotion, inView, goTo]);

  function onScroll() {
    const track = trackRef.current;
    if (track) setIndex(Math.min(maxIndex, Math.round(track.scrollLeft / stepSize())));
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") goTo(index + 1);
    else if (e.key === "ArrowLeft") goTo(index - 1);
    else return;
    e.preventDefault();
  }

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-charcoal py-16 md:py-20 lg:py-32"
    >
      <Noise />
      <Container className="relative">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={scrollReveal}>
          <SectionHeader
            id="testimonials-title"
            title={TESTIMONIALS_SECTION.headline}
            highlight={TESTIMONIALS_SECTION.highlightWord}
            tone="dark"
          />
        </motion.div>

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Depoimentos de clientes"
          className="mt-10 md:mt-12"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
          onKeyDown={onKeyDown}
        >
          <motion.div
            ref={trackRef}
            onScroll={onScroll}
            className="no-scrollbar -mx-5 -my-3 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 py-3 md:mx-0 md:scroll-px-0 md:gap-5 md:px-0 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={trackVariants}
          >
            {TESTIMONIALS_DATA.map((item, i) => (
              <TestimonialCard key={item.id} item={item} position={i + 1} />
            ))}
          </motion.div>

          <motion.p
            aria-hidden="true"
            className="mt-4 text-center text-xs text-ivory-faint md:hidden"
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            ← Arraste para ver mais →
          </motion.p>

          <div className="mt-4 flex items-center justify-center gap-6 md:mt-8">
            <ArrowButton direction="prev" onClick={() => goTo(index - 1)} disabled={index === 0} />
            <div className="flex items-center">
              {Array.from({ length: maxIndex + 1 }, (_, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ir para o depoimento ${i + 1}`}
                    aria-current={active ? "true" : undefined}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber-glow"
                  >
                    <motion.span
                      animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className={cn(
                        "block rounded-full transition-all duration-300",
                        active ? "size-2.5 bg-amber" : "size-2 bg-line-dark-strong",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <ArrowButton direction="next" onClick={() => goTo(index + 1)} disabled={index >= maxIndex} />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.dl
          className="mt-10 grid grid-cols-2 gap-y-6 rounded-2xl border border-line-dark bg-elevated px-4 py-6 shadow-[var(--shadow-dark-md)] md:mt-12 md:grid-cols-4 md:divide-x md:divide-line-dark md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={scrollReveal}
        >
          {STATS_DATA.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-1 px-2 text-center">
              <dt className="text-[13px] leading-snug text-ivory-muted md:text-sm">{stat.label}</dt>
              <dd className="font-heading text-[28px] leading-none font-bold text-ivory md:text-[32px] lg:text-4xl">
                <CountUp value={stat.number} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
