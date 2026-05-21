"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import products from "@/data/products.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { ProductImageLightbox } from "@/components/product-image-lightbox";
import { SectionOrnament } from "@/components/section-ornament";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { quickOrderMessage } from "@/lib/whatsapp-messages";
import {
  type Product,
  type SizeKey,
  SIZE_LABELS,
  formatPrice,
  getAvailableSizes,
  getSizeData,
  getDefaultSize,
} from "@/lib/product-utils";

const CATEGORY_ORDER = [
  "tradicionais",
  "ouro",
  "platina",
  "diamante",
  "especiais",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  tradicionais: "Tradicionais",
  ouro: "Ouro",
  diamante: "Diamante",
  platina: "Platina",
  especiais: "Especiais",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  tradicionais:
    "Para você que está procurando coroas de flores para velório com pronta entrega e ótimo custo-benefício, compre Coroas Tradicionais.",
  ouro:
    "Mais que um gesto, as Coroas de Flores Ouro representam admiração e reverência. Com flores nobres e montagem sofisticada.",
  diamante:
    "As Coroas Diamante foram criadas para quem busca uma homenagem única e marcante. Com design imponente, elas expressam admiração e profundo respeito de forma elegante.",
  platina:
    "Com um acabamento imponente e visual refinado, as Coroas de Flores Platina oferecem uma homenagem memorável.",
};

function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<SizeKey>(getDefaultSize(product));
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const availableSizes = getAvailableSizes(product);
  const currentSize = getSizeData(product, size) ?? getSizeData(product, availableSizes[0])!;

  const orderWhatsappUrl = buildWhatsappUrl(
    quickOrderMessage({
      productName: product.name,
      sizeLabel: SIZE_LABELS[size],
      formattedPrice: formatPrice(currentSize.price),
    }),
  );

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-gray-50"
        aria-label={`Ampliar imagem de ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.bestSeller && (
          <span className="bg-secondary text-secondary-foreground absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase shadow-md">
            Mais vendido
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="line-clamp-2 min-h-[2lh] text-lg font-semibold text-[#1C1C1C]">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-3 text-[14px] leading-snug text-[#6B6B6B]">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="mb-2">
            <span className="text-[12px] font-medium text-[#1C1C1C]">
              Tamanhos
            </span>
            <div className="mt-1 flex flex-col gap-1.5">
              {availableSizes.map((s) => {
                const sizeData = getSizeData(product, s)!;
                const height = (sizeData.height / 100).toFixed(2);
                const width = (sizeData.width / 100).toFixed(2);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    aria-label={`${height}m x ${width}m, ${SIZE_LABELS[s]}`}
                    className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[12px] font-medium whitespace-nowrap transition-colors sm:text-[13px] ${
                      size === s
                        ? "bg-[#2D5A3D] text-white"
                        : "bg-[#F5F5F5] text-[#1C1C1C] hover:bg-[#E8E8E8]"
                    }`}
                  >
                    <span>
                      {height} × {width} m
                    </span>
                    <span>
                      {sizeData.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <a
            href={orderWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pedir ${product.name} pelo WhatsApp`}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2D5A3D] px-2 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-3.5" />
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>

      <ProductImageLightbox
        imageSrc={product.image}
        imageAlt={product.name}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}

function CategoryCarousel({
  category,
  categoryProducts,
}: {
  category: string;
  categoryProducts: Product[];
}) {
  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-[#1C1C1C] md:text-[28px]">
          {CATEGORY_LABELS[category]}
        </h3>
        {CATEGORY_DESCRIPTIONS[category] && (
          <p className="mt-1 text-[13px] text-[#6B6B6B] md:mt-2 md:text-[15px]">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categoryProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:-left-5 md:flex" />
        <CarouselNext className="hidden md:-right-5 md:flex" />
        <CarouselDots className="mt-5 md:hidden" />
      </Carousel>
    </div>
  );
}

type CatalogProps = {
  title?: string
  subtitle?: string | null
  showOrnament?: boolean
  footerWhatsappMessage?: string
  footerWhatsappLabel?: string
  footerNote?: string | null
}

export function Catalog({
  title,
  subtitle,
  showOrnament = true,
  footerWhatsappMessage,
  footerWhatsappLabel = "Pedir pelo WhatsApp",
  footerNote,
}: CatalogProps = {}) {
  const productsByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    products: (products as Product[]).filter((p) => p.category === category),
  })).filter(({ products: prods }) => prods.length > 0);

  return (
    <section id="catalogo" className="relative overflow-hidden px-4 pt-6 pb-8 md:pt-8 md:pb-10">
      {/* Decorative background patterns */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -top-20 -left-20 size-[400px] opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
        <svg className="absolute -right-16 bottom-1/4 size-[300px] opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="55" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-[1100px] text-center">
        <h2 className="font-serif text-[22px] font-bold text-[#1C1C1C] md:text-[32px] lg:text-[40px]">
          {title ?? "Conheça nossas coroas de flores"}
        </h2>
        {showOrnament && <SectionOrnament className="mt-2 md:mt-3" />}
        {subtitle !== null && (
          <p className="mt-2 text-[15px] text-[#6B6B6B] md:mt-3 md:text-[17px]">
            {subtitle ?? "Montadas com flores frescas e entregues em até 1 hora. Escolha a que faz sentido pra você."}
          </p>
        )}
      </div>

      {/* Category Carousels */}
      <div className="mx-auto mt-4 max-w-[1100px] space-y-10 px-8 md:space-y-12 md:px-12">
        {productsByCategory.map(({ category, products: prods }) => (
          <CategoryCarousel
            key={category}
            category={category}
            categoryProducts={prods}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mx-auto mt-14 max-w-[1100px] text-center">
        {footerWhatsappMessage ? (
          <a
            href={buildWhatsappUrl(footerWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2D5A3D] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" />
            {footerWhatsappLabel}
          </a>
        ) : (
          <Link
            href="/catalogo"
            className="inline-flex items-center rounded-full bg-[#2D5A3D] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver catálogo completo
          </Link>
        )}
        {footerNote !== null && (
          <p className="mt-3 text-sm text-[#6B6B6B]">
            {footerNote ?? "Mais de 20 opções em 5 categorias, de R$ 350 a R$ 1.500."}
          </p>
        )}
      </div>
    </section>
  );
}
