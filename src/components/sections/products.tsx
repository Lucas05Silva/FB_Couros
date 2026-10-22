"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Noise } from "@/components/ui/noise";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fadeIn, scrollReveal } from "@/lib/animations";
import {
  PRODUCT_CATEGORIES,
  PRODUCTS_DATA,
  PRODUCTS_SECTION,
  type ProductCategoryId,
} from "@/lib/constants";
import { cn, whatsappLink } from "@/lib/utils";

const VIEWPORT = { once: true, amount: 0.2 };

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  ...scrollReveal,
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
};

const tabId = (id: ProductCategoryId) => `products-tab-${id}`;
const PANEL_ID = "products-panel";

export function Products() {
  const [active, setActive] = useState<ProductCategoryId>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number) {
    setActive(PRODUCT_CATEGORIES[index].id);
    // keep the chosen tab fully visible in the horizontally scrolling row (mobile)
    tabRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  const visible = PRODUCTS_DATA.filter((p) => active === "all" || p.category === active);

  // WAI-ARIA tabs: arrows / Home / End move focus and select (automatic activation)
  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = PRODUCT_CATEGORIES.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      id="produtos"
      aria-labelledby="products-title"
      className="relative overflow-hidden bg-charcoal py-20 lg:py-32"
    >
      <Noise />
      <Container className="relative">
        <motion.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={scrollReveal}>
          <SectionHeader
            id="products-title"
            title={PRODUCTS_SECTION.headline}
            subtitle={PRODUCTS_SECTION.subtitle}
            tone="dark"
          />
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeIn}
          transition={{ delay: 0.3 }}
        >
          <div
            role="tablist"
            aria-label="Filtrar produtos por categoria"
            className="flex w-max gap-2 md:w-auto md:flex-wrap md:justify-center"
          >
            {PRODUCT_CATEGORIES.map((cat, i) => {
              const selected = cat.id === active;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={tabId(cat.id)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={PANEL_ID}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "shrink-0 cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-glow",
                    selected
                      ? "border-transparent bg-gradient-to-r from-amber to-amber-glow font-semibold text-deep shadow-[var(--shadow-amber)]"
                      : "border-line-dark text-ivory-muted hover:border-amber/40 hover:bg-elevated hover:text-ivory",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Product grid ── */}
        <motion.div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          className="relative mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-4 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={gridVariants}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.article
                key={product.id}
                layout
                variants={cardVariants}
                exit="exit"
                aria-label={product.title}
              >
                <a
                  href={whatsappLink(product.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${product.title}: saiba mais pelo WhatsApp`}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-xl border border-line-dark bg-elevated shadow-[var(--shadow-dark-sm)]",
                    "transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    "hover:-translate-y-1 hover:border-amber/30 hover:bg-subtle hover:shadow-[var(--shadow-amber)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-glow",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1200px) 368px, (min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <span className="rounded-full bg-ivory px-4 py-2 text-sm font-medium text-deep transition-colors duration-200 hover:bg-amber">
                        Saiba Mais
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4 md:p-[18px] lg:p-5">
                    <h3 className="text-[15px] leading-snug font-semibold text-ivory lg:text-base">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-normal text-ivory-muted lg:text-sm">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <p className="text-[13px] font-semibold text-amber-glow lg:text-sm">
                        <span className="block text-xs font-normal text-ivory-muted md:inline md:text-[inherit] md:font-semibold md:text-amber-glow">
                          A partir de{" "}
                        </span>
                        <span className="whitespace-nowrap">{product.price}</span>
                      </p>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-amber transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={scrollReveal}
        >
          <WhatsAppButton
            href={PRODUCTS_SECTION.ctaHref}
            ariaLabel={PRODUCTS_SECTION.ctaAriaLabel}
            className="w-full px-10 md:w-auto"
          >
            {PRODUCTS_SECTION.ctaText}
          </WhatsAppButton>
        </motion.div>
      </Container>
    </section>
  );
}
