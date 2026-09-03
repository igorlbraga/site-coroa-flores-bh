import type { Metadata } from "next";
import { ContactHero } from "@/components/contact-hero";
import { ContactChannels } from "@/components/contact-channels";
import { ContactCta } from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Coroa de Flores pelo WhatsApp ou telefone. Atendimento humano 24 horas, todos os dias, inclusive feriados.",
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato | Coroa de Flores",
    description:
      "Fale com a Coroa de Flores pelo WhatsApp ou telefone. Atendimento humano 24 horas, todos os dias.",
    url: "/contato",
    siteName: "Coroa de Flores",
    locale: "pt_BR",
    type: "website",
  },
};

export default function ContatoPage() {
  return (
    <main>
      <ContactHero />
      <ContactChannels />
      <ContactCta />
    </main>
  );
}
