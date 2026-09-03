import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Catalog } from "@/components/catalog"
import { Faq } from "@/components/faq"
import { LocationPageHero } from "@/components/location-page-hero"
import { LocationContent } from "@/components/location-content"
import { LocationSiblings } from "@/components/location-siblings"
import {
  getAllSlugs,
  getLocationBySlug,
  getSiblingLocations,
} from "@/lib/location-helpers"
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildFaqSchema,
} from "@/lib/structured-data"
import { locationDeliveryMessage } from "@/lib/whatsapp-messages"
import { city } from "@/lib/city"

const faqItems = city.faq

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return {}

  const title = `${location.title} | Coroa de Flores`
  const description =
    location.introduction.length > 155
      ? location.introduction.slice(0, 152) + "..."
      : location.introduction

  return {
    title,
    description,
    alternates: {
      canonical: `/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/${location.slug}`,
      siteName: "Coroa de Flores",
      locale: "pt_BR",
      type: "website",
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) notFound()

  const siblings = getSiblingLocations(location)

  const jsonLd = [
    buildLocalBusinessSchema(location),
    buildBreadcrumbSchema(location),
    buildServiceSchema(location),
    buildFaqSchema(faqItems),
  ]

  return (
    <main className="[&_h2]:text-[26px] [&_h2]:md:text-[30px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Locais de Entrega", href: "/locais" },
          { label: location.name },
        ]}
      />

      <LocationPageHero location={location} />

      <Catalog
        title="Atendimento 24h, faixa personalizada e flores frescas"
        subtitle={null}
        showOrnament={false}
        footerWhatsappMessage={locationDeliveryMessage(location.name)}
        footerWhatsappLabel={`Pedir para ${location.name}`}
        footerNote={null}
      />

      <LocationContent location={location} />

      <Faq />

      <LocationSiblings siblings={siblings} city={location.city} />
    </main>
  )
}
