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
      className="bg-darker pt-12 pb-8 text-sm text-on-dark-muted md:pt-16 lg:pt-20 lg:pb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <Container>
        <div className="flex flex-col gap-10 text-center md:grid md:grid-cols-3 md:gap-8 md:text-left lg:gap-12">
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

          <nav aria-label="Links do rodapé">
            <h2 className={headingClass}>Links Rápidos</h2>
            <ul className="space-y-2.5">
              {DATA.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${linkClass} inline-block hover:translate-x-1 motion-reduce:hover:translate-x-0`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Contato</h2>
            <ul className="flex flex-col items-center gap-3 md:items-start">
              <li>
                <a href={DATA.contact.phone.href} className={`${linkClass} inline-flex items-center gap-2`}>
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
                  className={`${linkClass} inline-flex items-center gap-2`}
                >
                  <InstagramIcon className="size-4 text-brand-primary" />
                  {DATA.contact.instagram.display}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-brand-primary" />
                {DATA.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-dark-card pt-6 text-center text-[13px] text-ink-subtle md:mt-12 md:flex-row md:justify-between md:text-left">
          <p>{DATA.copyright}</p>
          <p>
            {DATA.credit.text}{" "}
            <a href={DATA.credit.href} className={`${linkClass} font-medium text-on-dark-muted`}>
              {DATA.credit.company}
            </a>
          </p>
        </div>
      </Container>
    </motion.footer>
  );
}
