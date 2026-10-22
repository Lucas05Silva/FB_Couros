"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { fadeIn } from "@/lib/animations";
import { BRAND, FOOTER_DATA as DATA } from "@/lib/constants";

const linkClass =
  "rounded-sm transition-colors duration-200 hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

const headingClass = "mb-4 text-sm font-semibold tracking-wider text-on-dark uppercase";

export function Footer() {
  return (
    <motion.footer
      className="bg-darker pt-12 pb-[max(2rem,env(safe-area-inset-bottom))] text-sm text-on-dark-muted md:pt-16 lg:pt-20 lg:pb-[max(2.5rem,env(safe-area-inset-bottom))]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <Container>
        <div className="flex flex-col gap-8 text-center md:grid md:grid-cols-3 md:gap-8 md:text-left lg:gap-12">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={BRAND.logo}
              alt={DATA.logoAlt}
              width={240}
              height={96}
              className="h-auto w-[100px] opacity-90"
            />
            <p className="mt-4 max-w-[260px] font-accent text-[17px] leading-snug italic">{DATA.tagline}</p>
          </div>

          <nav aria-label="Links do rodapé" className="max-md:border-t max-md:border-dark-card max-md:pt-8">
            <h2 className={headingClass}>Links Rápidos</h2>
            {/* mobile: one centered, wrapping line with "·" separators; md+: vertical list */}
            <ul className="flex flex-wrap items-center justify-center md:block md:space-y-2.5">
              {DATA.quickLinks.map((link, i) => (
                <li key={link.href} className="inline-flex items-center">
                  <a
                    href={link.href}
                    className={`${linkClass} inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:translate-x-1 motion-reduce:hover:translate-x-0 md:min-h-0 md:min-w-0 md:justify-start md:px-0`}
                  >
                    {link.label}
                  </a>
                  {i < DATA.quickLinks.length - 1 && (
                    <span aria-hidden="true" className="text-ink-subtle md:hidden">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-md:border-t max-md:border-dark-card max-md:pt-8">
            <h2 className={headingClass}>Contato</h2>
            <ul className="flex flex-col items-center gap-1 md:items-start md:gap-3">
              <li>
                <a href={DATA.contact.phone.href} className={`${linkClass} inline-flex min-h-11 items-center gap-2 md:min-h-0`}>
                  <Phone aria-hidden="true" className="size-4 text-brand-primary" />
                  {DATA.contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={DATA.contact.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${DATA.contact.instagram.display}`}
                  className={`${linkClass} inline-flex min-h-11 items-center gap-2 md:min-h-0`}
                >
                  <InstagramIcon className="size-4 text-brand-primary" />
                  {DATA.contact.instagram.display}
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center gap-2 md:min-h-0">
                <MapPin aria-hidden="true" className="size-4 text-brand-primary" />
                {DATA.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-dark-card pt-6 text-center text-xs text-ink-subtle md:mt-12 md:text-[13px] md:flex-row md:justify-between md:text-left">
          <p>{DATA.copyright}</p>
          <p>
            {DATA.credit.text}{" "}
            <a href={DATA.credit.href} className={`${linkClass} inline-flex min-h-11 items-center font-medium text-on-dark-muted md:min-h-0`}>
              {DATA.credit.company}
            </a>
          </p>
        </div>
      </Container>
    </motion.footer>
  );
}
