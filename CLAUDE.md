# Coroa de Flores

Site institucional e catálogo de coroas de flores para velórios e homenagens fúnebres. Atende Belo Horizonte e região metropolitana de Minas Gerais. Pedidos são feitos via WhatsApp com atendentes humanos (sem checkout automatizado).

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript (strict: true)
- Tailwind CSS v4
- shadcn/ui + Embla Carousel

## Estrutura de Diretórios
- `src/app/` — Rotas do App Router (/, /catalogo, /contato, /locais, /locais/[slug])
- `src/components/ui/` — Componentes shadcn/ui
- `src/components/` — Componentes de página (hero, catalog, CTA, etc.)
- `src/lib/` — Utilitários (WhatsApp, produtos, locais, SEO, URLs, city)
- `src/types/` — Definições de tipos (incluindo `CityConfig` em `city.ts`)
- `src/data/` — Dados compartilhados entre cidades (`products.json`, `stats.json`)
- `src/data/cities/{bh,sp,rj}/` — Dados específicos por cidade: `config.ts`, `contact.json`, `locations.json`, `regions.json`, `testimonials.json`, `faq.json`

## Comandos
- `npm run dev` — Servidor de desenvolvimento
- `npm run build` — Build de produção
- `npm run lint` — Verificação ESLint

## Regras de Código
- Server Components por padrão; só usar "use client" quando necessário
- Usar componentes shadcn/ui para elementos de UI (botões, cards, dialogs, forms)
- Estilizar apenas com Tailwind utility classes — sem CSS-in-JS, sem CSS modules
- TypeScript strict: sem tipo `any`
- Preferir `type` sobre `interface`
- Named exports, não default exports
- Nomes de funções/componentes/variáveis sempre em inglês, português apenas para conteúdos do site

## Dados e Conteúdo
- Dados compartilhados entre cidades em `src/data/` (`products.json`, `stats.json`)
- Dados específicos da cidade ativa acessados via `import { city } from "@/lib/city"` — nunca importar diretamente de `src/data/cities/*`
- `city.config` traz `slug`, `name`, `nameShort`, `capitalCityName`, `logoPath`, e `copy` (todos os textos parametrizados)
- `city.contact`, `city.locations`, `city.regions`, `city.testimonials`, `city.faq` retornam os dados da cidade ativa
- `city.deliveryCities` é DERIVADO automaticamente das cidades únicas em `locations.json` — não há JSON separado
- `state` (nome completo do UF) derivado via helper `getStateNameByUf(uf)` exportado de `@/lib/city`. Cada `Location` carrega seu próprio `uf`, então não há hardcode de estado em components/lib
- Mapping subregion-slug → city-name derivado automaticamente em `resolveSubregionCity()`: se o slug da subregion bate com slug de uma cidade dos locations, mapeia pra ela; senão, mapeia pra `capitalCityName` da cidade ativa
- Produtos têm até 2 tamanhos (default/big) com preços individuais
- Locais (~100+) geram páginas estáticas via `generateStaticParams()`
- Utilitários de consulta em `src/lib/location-helpers.ts` e `src/lib/product-utils.ts`

## Multi-Cidade
- Cidade ativa selecionada via `NEXT_PUBLIC_CITY` (`bh`, `sp`, `rj`). Default: `bh`
- Resolução de `@/active-city/*` configurada em `next.config.ts > turbopack.resolveAlias` (build-time, baseado na env var)
- TypeScript resolve `@/active-city/*` para `src/data/cities/bh/*` (referência estática para type-checking; todas as cidades compartilham `CityConfig`)
- **Adicionar uma nova cidade:**
  1. Adicionar slug em `SUPPORTED_CITIES` em `next.config.ts`
  2. Criar `src/data/cities/{slug}/` com `config.ts`, `contact.json`, `locations.json`, `regions.json`, `testimonials.json`, `faq.json`
  3. Se o UF não estiver mapeado em `UF_TO_STATE` em `src/lib/city.ts`, adicionar
  4. Adicionar logo em `public/logos/{slug}.webp` (e `.png` opcional)
  5. Adicionar hostname novo em `next.config.ts > images.remotePatterns` se for usar S3/domínio próprio
  6. Criar projeto Vercel apontando para o repo com `NEXT_PUBLIC_CITY={slug}`

## WhatsApp
- Toda ação de pedido/contato redireciona para WhatsApp via `src/lib/whatsapp.ts`
- Templates de mensagem em `src/lib/whatsapp-messages.ts`
- Botão flutuante global em `floating-whatsapp.tsx`

## SEO
- JSON-LD (LocalBusiness, Breadcrumb, Service, FAQ, ProductList) via `src/lib/structured-data.ts`
- Sitemap dinâmico em `src/app/sitemap.ts`
- Metadata por página + `generateMetadata()` nas rotas dinâmicas
- Imagens otimizadas com Next.js Image (AVIF, WebP)

## Tailwind CSS
- Versão v4: configuração vai no `globals.css` com @theme, NÃO criar tailwind.config.ts
- Usar design tokens semânticos (bg-primary, text-muted-foreground)
- Cores em OKLch
- Animações customizadas definidas em `globals.css` (hero-fade-up, scroll-hint, bounce-soft, scroll-reveal)

## Imagens
- Hospedadas em domínios remotos configurados em `next.config.ts > images.remotePatterns`
- Logo da cidade ativa em `public/logos/{slug}.webp`, lido via `city.config.logoPath`

## Variáveis de Ambiente
- `NEXT_PUBLIC_CITY` — obrigatório por deploy (`bh`, `sp`, `rj`). Default: `bh`
- `NEXT_PUBLIC_SITE_URL` — URL canônica do deploy. Em Vercel é resolvida automaticamente via `VERCEL_PROJECT_PRODUCTION_URL` se não definida
- `NEXT_PUBLIC_GTM_ID` — ID do Google Tag Manager. Opcional; se ausente o script não é injetado
- Ver `.env.example` para o formato

## Off-Limits
- Nenhum código fora de `src/`
- Sem console.log em código commitado
- Sem dependências CSS além do Tailwind
