import type { Location } from "@/types/location"
import { city, getStateNameByUf } from "@/lib/city"
import { getBaseUrl } from "@/lib/base-url"

type FaqItem = {
  question: string
  answer: string
}

type ProductItem = {
  id: string
  name: string
  image: string
  sizes: Record<string, { price: number; height: number; width: number } | undefined>
}

export function buildLocalBusinessSchema(location: Location) {
  const BASE_URL = getBaseUrl()
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Coroa de Flores — ${location.name}`,
    description: location.introduction.slice(0, 200),
    url: `${BASE_URL}/${location.slug}`,
    telephone: city.contact.phoneFormatted,
    email: city.contact.email,
    areaServed: {
      "@type": "City",
      name: location.city,
      containedInPlace: {
        "@type": "State",
        name: getStateNameByUf(location.uf),
      },
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "R$315 - R$3.500",
  }
}

export function buildBreadcrumbSchema(location: Location) {
  const BASE_URL = getBaseUrl()
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locais de Entrega",
        item: `${BASE_URL}/locais`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `${BASE_URL}/${location.slug}`,
      },
    ],
  }
}

export function buildServiceSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Entrega de Coroa de Flores",
    provider: {
      "@type": "LocalBusiness",
      name: "Coroa de Flores",
      telephone: city.contact.phoneFormatted,
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    description: `Entrega de coroa de flores em ${location.name}, ${location.city} em até 1 hora.`,
  }
}

export function buildFaqSchema(items: ReadonlyArray<FaqItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildProductListSchema(products: ReadonlyArray<ProductItem>) {
  const BASE_URL = getBaseUrl()
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products
      .filter((product) => product.sizes.default !== undefined)
      .map((product, index) => ({
        "@type": "ListItem" as const,
        position: index + 1,
        item: {
          "@type": "Product" as const,
          name: product.name,
          image: product.image,
          url: `${BASE_URL}/catalogo`,
          offers: {
            "@type": "Offer" as const,
            price: product.sizes.default!.price,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        },
      })),
  }
}
