import type { Metadata } from "next";
import { CatalogHero } from "@/components/catalog-hero";
import { CategoryNav } from "@/components/category-nav";
import { ProductGrid } from "@/components/product-grid";
import { CatalogCta } from "@/components/catalog-cta";
import { buildProductListSchema } from "@/lib/structured-data";
import { city } from "@/lib/city";
import products from "@/data/products.json";

export const metadata: Metadata = {
  title: "Catálogo de Coroas de Flores",
  description: city.config.copy.catalogMetadataDescription,
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    title: "Catálogo de Coroas de Flores | Coroa de Flores",
    description: city.config.copy.catalogMetadataDescription,
    url: "/catalogo",
    siteName: "Coroa de Flores",
    locale: "pt_BR",
    type: "website",
  },
};

export default function CatalogoPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductListSchema(products)),
        }}
      />
      <CatalogHero />
      <CategoryNav />
      <ProductGrid />
      <CatalogCta />
    </main>
  );
}
