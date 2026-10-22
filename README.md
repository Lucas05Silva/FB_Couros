# FB Couros — Landing Page

Landing page de conversão da **FB Couros** (artigos em couro e sintético, Londrina/PR) — B2C e personalização B2B com logo. Todos os CTAs levam ao WhatsApp com mensagem pré-preenchida.

**Stack:** Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Framer Motion · TypeScript

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Deploy (Vercel)

Importe o repositório na Vercel — nenhuma configuração extra é necessária:

- Framework preset: **Next.js** (detectado automaticamente)
- Build command: `next build` · Output: padrão
- Sem variáveis de ambiente

## Estrutura

```
src/
  app/            layout (fontes, metadata), page (ordem das seções), globals.css (tokens)
  components/
    sections/     hero, about, products, personalization, process, testimonials, faq, cta-final, footer
    ui/           container, section-header, whatsapp-button, count-up, …
  lib/
    constants.ts  TODO o conteúdo da página (textos, preços, links, depoimentos)
    animations.ts variants do Framer Motion
public/
  images/         imagens (placeholders)
  videos/         vídeo do hero (loop sem emenda, versão desktop + mobile)
```

## Pendências do cliente (marcadas com `TODO` em `src/lib/constants.ts`)

- Fotos reais: produtos (`public/images/products/`), sobre, mockup B2B
- Logo oficial (`public/images/logo-fb-couros.svg`)
- Preços, depoimentos (texto, nome e foto), estatísticas e "100+ empresas"
- Horário de atendimento
- Link da FlowSys LT no rodapé
- Imagem de compartilhamento (OG, 1200×630) — descomentar em `src/app/layout.tsx`

Desenvolvido por FlowSys LT.
