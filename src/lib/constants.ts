import { whatsappLink } from "@/lib/utils";

export const BRAND = {
  name: "FB Couros",
  instagram: "@fbcou_ro",
  instagramUrl: "https://www.instagram.com/fbcou_ro/",
  whatsappDisplay: "(43) 99125-1651",
  logo: "/images/logo-fb-couros.svg", // TODO: trocar pelo logo oficial (PNG/SVG)
} as const;

/* ── 1. Hero ── */
export const HERO_DATA = {
  headline: "Artesanato em Couro que Conta a Sua História",
  highlightWord: "História",
  subtitle:
    "Bolsas, carteiras e acessórios feitos à mão com couro premium. Personalização exclusiva para você e para sua empresa.",
  // Loop sem emenda (crossfade de 1,5s) gerado a partir do vídeo de IA da raiz do projeto
  videoSrc: "/videos/hero-leather.mp4", // 1280x720
  videoSrcMobile: "/videos/hero-leather-mobile.mp4", // recorte central 3:4, 540x720
  posterSrc: "/images/hero-poster.jpg", // primeiro frame do loop
  ctaPrimary: {
    text: "Fale Conosco",
    ariaLabel: "Fale conosco pelo WhatsApp",
    href: whatsappLink(
      "Olá! Vim pelo site e gostaria de saber mais sobre os produtos da FB Couros.",
    ),
  },
  ctaSecondary: {
    text: "Ver Catálogo",
    ariaLabel: "Ver nosso catálogo de produtos",
    href: "#produtos",
  },
} as const;


/* ── 2. Sobre / Diferenciais ── */
export const ABOUT_DATA = {
  headline: "Tradição e Modernidade em Cada Detalhe",
  highlightWord: "Detalhe",
  paragraph:
    "Na FB Couros, cada peça é criada com dedicação artesanal e materiais selecionados. Trabalhamos com couro e sintético de alta qualidade para entregar produtos que unem elegância, durabilidade e personalidade. De Londrina para toda a região, levamos sofisticação ao seu estilo — com preços que cabem no seu bolso e entrega que respeita o seu tempo.",
  image: {
    src: "/images/about-leather.jpg", // TODO: substituir por imagem real
    alt: "Bolsa artesanal em couro marrom sobre superfície neutra",
  },
  differentials: [
    {
      icon: "DollarSign",
      title: "Preço Acessível",
      description: "Qualidade premium com valores justos, muito abaixo dos concorrentes da região.",
    },
    {
      icon: "Zap",
      title: "Entrega Rápida",
      description: "Prazos curtos porque valorizamos o seu tempo. Agilidade sem perder a qualidade.",
    },
    {
      icon: "Award",
      title: "Qualidade Superior",
      description: "Materiais selecionados e acabamento impecável em cada peça que sai das nossas mãos.",
    },
    {
      icon: "Users",
      title: "Personalização Exclusiva",
      description: "Produtos sob medida para você ou sua empresa, com gravação de logo e detalhes únicos.",
    },
  ],
} as const;

/* ── 3. Produtos / Catálogo ── */
export const PRODUCTS_SECTION = {
  headline: "Nossos Produtos",
  subtitle: "Cada peça, uma obra de arte",
  ctaText: "Solicite seu Orçamento",
  ctaAriaLabel: "Solicitar orçamento pelo WhatsApp",
  ctaHref: whatsappLink("Olá! Vim pelo site e gostaria de solicitar um orçamento na FB Couros."),
} as const;

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "bolsas", label: "Bolsas" },
  { id: "carteiras", label: "Carteiras" },
  { id: "acessorios", label: "Acessórios" },
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

export const PRODUCTS_DATA = [
  {
    id: "bolsas",
    category: "bolsas",
    title: "Bolsas",
    description: "Bolsas femininas e masculinas em couro legítimo e sintético premium.",
    price: "R$ 89,90", // TODO: confirmar preços reais
    image: "/images/products/bolsas.jpg", // TODO: imagem real
    alt: "Bolsa de couro marrom com alça de ombro",
    whatsappMessage: "Olá! Gostaria de ver as opções de bolsas da FB Couros.",
  },
  {
    id: "carteiras",
    category: "carteiras",
    title: "Carteiras",
    description: "Carteiras compactas e elegantes, com espaço para tudo que você precisa.",
    price: "R$ 49,90", // TODO
    image: "/images/products/carteiras.jpg", // TODO
    alt: "Carteira de couro dobrável com costura aparente",
    whatsappMessage: "Olá! Gostaria de ver as opções de carteiras da FB Couros.",
  },
  {
    id: "porta-cartoes",
    category: "acessorios",
    title: "Porta-Cartões",
    description: "Praticidade e estilo para o dia a dia profissional.",
    price: "R$ 29,90", // TODO
    image: "/images/products/porta-cartoes.jpg", // TODO
    alt: "Porta-cartões slim em couro caramelo",
    whatsappMessage: "Olá! Gostaria de ver os porta-cartões da FB Couros.",
  },
  {
    id: "cintos",
    category: "acessorios",
    title: "Cintos",
    description: "Cintos masculinos e femininos com fivelas exclusivas.",
    price: "R$ 39,90", // TODO
    image: "/images/products/cintos.jpg", // TODO
    alt: "Cinto de couro enrolado com fivela metálica",
    whatsappMessage: "Olá! Gostaria de ver as opções de cintos da FB Couros.",
  },
  {
    id: "capas-biblia",
    category: "acessorios",
    title: "Capas de Bíblia",
    description: "Proteção e elegância para o seu livro sagrado.",
    price: "R$ 59,90", // TODO
    image: "/images/products/capas-biblia.jpg", // TODO
    alt: "Capa de Bíblia em couro com zíper e alça",
    whatsappMessage: "Olá! Gostaria de ver as capas de Bíblia da FB Couros.",
  },
  {
    id: "agendas",
    category: "acessorios",
    title: "Agendas Executivas",
    description: "Agendas em couro para profissionais que valorizam organização com estilo.",
    price: "R$ 69,90", // TODO
    image: "/images/products/agendas.jpg", // TODO
    alt: "Agenda executiva com capa de couro e marcador",
    whatsappMessage: "Olá! Gostaria de ver as agendas executivas da FB Couros.",
  },
] as const;

/* ── 4. Personalização B2B ── */
export const PERSONALIZATION_DATA = {
  badge: "Para Empresas",
  headline: "Sua Marca Gravada em Couro Premium",
  highlightWords: "Couro Premium",
  paragraph:
    "Transforme seus brindes corporativos em peças memoráveis. Gravamos o logo da sua empresa em carteiras, agendas, bolsas e muito mais — com a qualidade artesanal que seus clientes e colaboradores merecem.",
  image: {
    src: "/images/personalization-mockup.jpg", // TODO: imagem real
    alt: "Carteira personalizada com logo empresarial gravado em dourado",
  },
  benefits: [
    "Gravação de logo em alto relevo ou hot stamping",
    "Pedidos a partir de 10 unidades",
    "Brindes corporativos para eventos e datas especiais",
    "Agendas executivas personalizadas",
    "Atacado com desconto progressivo",
  ],
  stat: {
    value: 100, // TODO: confirmar número real
    suffix: "+",
    label: "empresas atendidas",
  },
  segmentsLabel: "Atendemos",
  segments: [
    "Escritórios de Advocacia",
    "Clínicas e Consultórios",
    "Igrejas e Comunidades",
    "Imobiliárias",
    "Contabilidades",
    "Eventos Corporativos",
    "Startups e Tecnologia",
  ],
  cta: {
    text: "Solicitar Orçamento Empresarial",
    ariaLabel: "Solicitar orçamento empresarial pelo WhatsApp",
    href: whatsappLink(
      "Olá! Sou de uma empresa e gostaria de um orçamento para produtos personalizados com nossa logo.",
    ),
  },
} as const;

/* ── 5. Processo de Trabalho ── */
export const PROCESS_SECTION = {
  headline: "Como Funciona",
  highlightWord: "Funciona",
  subtitle: "Do contato à entrega, simples assim.",
} as const;

export const PROCESS_STEPS = [
  {
    number: 1,
    icon: "MessageCircle",
    title: "Contato",
    description:
      "Fale conosco pelo WhatsApp e conte o que você precisa. Atendimento rápido e personalizado.",
  },
  {
    number: 2,
    icon: "Palette",
    title: "Escolha",
    description:
      "Escolha o modelo, material e personalização desejada. Enviamos fotos e orçamento na hora.",
  },
  {
    number: 3,
    icon: "Scissors",
    title: "Produção",
    description: "Produzimos sua peça com cuidado artesanal e materiais de primeira qualidade.",
  },
  {
    number: 4,
    icon: "Package",
    title: "Entrega",
    description:
      "Receba seu produto com agilidade. Entregamos em Londrina e região com rapidez.",
  },
] as const;

export const PROCESS_CTA = {
  text: "Comece Agora",
  ariaLabel: "Começar meu pedido pelo WhatsApp",
  href: whatsappLink("Olá! Gostaria de fazer um pedido na FB Couros."),
} as const;

/* ── 6. Depoimentos ── */
export type Testimonial = {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar?: string; // ex.: "/images/testimonials/avatar-1.jpg" — sem foto, mostra as iniciais
  rating: number;
};

export const TESTIMONIALS_SECTION = {
  headline: "O Que Nossos Clientes Dizem",
  highlightWord: "Clientes",
} as const;

// TODO: substituir todos por depoimentos reais (texto, nome, contexto e foto)
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    text: "A qualidade da bolsa superou todas as minhas expectativas. O acabamento é impecável e o preço foi muito justo. Recomendo demais!",
    author: "Maria Silva",
    role: "Cliente desde 2023",
    rating: 5,
  },
  {
    id: 2,
    text: "Encomendei carteiras personalizadas para presentear minha equipe e todos amaram. Entrega super rápida e qualidade excelente.",
    author: "Carlos Oliveira",
    role: "Empresário",
    rating: 5,
  },
  {
    id: 3,
    text: "Já comprei cinto, carteira e bolsa. Tudo perfeito! A FB Couros tem o melhor custo-benefício da região, sem dúvidas.",
    author: "Ana Santos",
    role: "Cliente fiel",
    rating: 5,
  },
  {
    id: 4,
    text: "As capas de Bíblia ficaram lindas! Minha igreja encomendou 50 unidades personalizadas e ficou tudo perfeito.",
    author: "Pastor Roberto",
    role: "Igreja Nova Aliança",
    rating: 5,
  },
  {
    id: 5,
    text: "A agenda executiva que encomendei com o logo da minha empresa ficou sofisticadíssima. Meus clientes elogiam sempre!",
    author: "Fernanda Lima",
    role: "Advogada",
    rating: 5,
  },
];

export const STATS_DATA = [
  { number: 500, suffix: "+", label: "Clientes Atendidos" }, // TODO: números reais
  { number: 1000, suffix: "+", label: "Produtos Entregues" }, // TODO
  { number: 5, suffix: "+", label: "Anos de Experiência" }, // TODO
  { number: 4.9, suffix: "/5", label: "Avaliação Média" }, // TODO
] as const;

/* ── 7. FAQ ── */
export const FAQ_SECTION = {
  headline: "Perguntas Frequentes",
  highlightWord: "Frequentes",
} as const;

export const FAQ_DATA = [
  {
    question: "Quais materiais vocês utilizam?",
    answer:
      "Trabalhamos com couro legítimo de alta qualidade e sintético premium. Ambos os materiais passam por rigoroso controle de qualidade para garantir durabilidade e acabamento impecável.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "Nosso prazo médio é de 3 a 7 dias úteis para Londrina e região. Para pedidos personalizados ou em maior quantidade, o prazo pode variar — sempre informamos antes de confirmar o pedido.",
  },
  {
    question: "Vocês fazem personalização com logo de empresa?",
    answer:
      "Sim! Realizamos gravação de logo em alto relevo, hot stamping e serigrafia. Ideal para brindes corporativos, presentes empresariais e itens institucionais. Pedido mínimo de 10 unidades.",
  },
  {
    question: "Qual o pedido mínimo para empresas?",
    answer:
      "O pedido mínimo para personalização empresarial é de 10 unidades. Oferecemos desconto progressivo: quanto maior o pedido, melhor o preço unitário.",
  },
  {
    question: "Como faço para encomendar?",
    answer:
      "É simples! Basta entrar em contato pelo nosso WhatsApp (43) 99125-1651. Você escolhe o produto, enviamos fotos e orçamento, e após a confirmação iniciamos a produção.",
  },
  {
    question: "Vocês entregam para fora de Londrina?",
    answer:
      "Atendemos toda a região de Londrina e cidades próximas. Para outras localidades, consulte-nos pelo WhatsApp que verificamos a viabilidade e o custo de envio.",
  },
  {
    question: "Os produtos têm garantia?",
    answer:
      "Sim! Todos os nossos produtos possuem garantia contra defeitos de fabricação. Trabalhamos com materiais de qualidade e acabamento artesanal para garantir a durabilidade de cada peça.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos Pix, transferência bancária, dinheiro e cartão. Para pedidos empresariais, também trabalhamos com faturamento mediante consulta.",
  },
] as const;

export const FAQ_CTA = {
  title: "Ainda tem dúvidas?",
  subtitle: "Fale diretamente conosco pelo WhatsApp. Respondemos rápido!",
  buttonText: "Fale Conosco",
  ariaLabel: "Tirar dúvidas pelo WhatsApp",
  href: whatsappLink("Olá! Tenho uma dúvida sobre os produtos da FB Couros."),
  hoursTitle: "Horário de atendimento",
  hours: ["Seg–Sex: 8h – 18h", "Sáb: 8h – 12h"], // TODO: confirmar horários
} as const;

/* ── 8. CTA Final ── */
export const CTA_FINAL_DATA = {
  headline: "Pronto para Ter o Seu?",
  highlightWord: "Seu",
  subtitle:
    "Fale conosco agora e transforme seu estilo com peças exclusivas em couro premium. Atendimento personalizado para você e para sua empresa.",
  ctaPrimary: {
    text: "Chamar no WhatsApp",
    ariaLabel: "Chamar a FB Couros no WhatsApp",
    href: whatsappLink("Olá! Vim pelo site e quero encomendar um produto da FB Couros!"),
  },
  ctaSecondary: {
    text: "Siga no Instagram",
    ariaLabel: "Seguir a FB Couros no Instagram",
    href: BRAND.instagramUrl,
  },
  phone: BRAND.whatsappDisplay,
  phoneHref: "tel:+5543991251651",
} as const;

/* ── 9. Footer ── */
export const FOOTER_DATA = {
  tagline: "Artesanato em couro premium de Londrina para o mundo.",
  logoAlt: "FB Couros — Artigos em Couro",
  quickLinks: [
    { label: "Início", href: "#inicio" },
    { label: "Produtos", href: "#produtos" },
    { label: "Empresas", href: "#personalizacao" },
    { label: "Como Funciona", href: "#processo" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    phone: { display: BRAND.whatsappDisplay, href: "tel:+5543991251651" },
    instagram: { display: BRAND.instagram, href: BRAND.instagramUrl },
    location: "Londrina, PR",
  },
  copyright: "© 2026 FB Couros. Todos os direitos reservados.",
  credit: {
    text: "Desenvolvido por",
    company: "FlowSys LT",
    href: "#", // TODO: link da FlowSys LT
  },
} as const;
