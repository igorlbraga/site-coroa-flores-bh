import type { Metadata } from "next";
import { LocationsHero } from "@/components/locations-hero";
import { LocationsGrid } from "@/components/locations-grid";
import { LocationsCta } from "@/components/locations-cta";
import { city } from "@/lib/city";

export const metadata: Metadata = {
  title: "Locais de Entrega",
  description: city.config.copy.locationsMetadataDescription,
  alternates: {
    canonical: "/locais",
  },
  openGraph: {
    title: "Locais de Entrega | Coroa de Flores",
    description: city.config.copy.locationsMetadataOgDescription,
    url: "/locais",
    siteName: "Coroa de Flores",
    locale: "pt_BR",
    type: "website",
  },
};

export default function LocationsPage() {
  return (
    <main>
      <LocationsHero />
      <LocationsGrid />
      <LocationsCta />
    </main>
  );
}
