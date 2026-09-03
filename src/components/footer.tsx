import Link from "next/link";
import { MessageCircle, Lock } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { city } from "@/lib/city";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.generalHelp);

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Locais de Entrega", href: "/locais" },
  { label: "Contato", href: "/contato" },
] as const;

export function Footer() {
  return (
    <footer className="bg-zinc-950 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Coluna 1 — Identidade */}
        <div className="space-y-1">
          <p className="font-serif text-lg font-semibold text-white">
            Coroa de Flores
          </p>
          <p className="text-sm text-gray-400">CNPJ: 51.633.347/0001-02</p>
          <p className="text-sm text-gray-400">{city.contact.email}</p>
          <p className="text-sm text-gray-400">
            Atendemos 24 horas, todos os dias
          </p>
        </div>

        {/* Coluna 2 — Navegação */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
            Navegação
          </p>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
            Contato
          </p>
          <div className="space-y-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar pelo WhatsApp - Contato"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
            </a>
            <p className="text-sm text-gray-400">{city.contact.phoneFormatted}</p>
          </div>
        </div>

        {/* Coluna 4 — Formas de pagamento */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
            Formas de pagamento
          </p>
          <p className="text-sm text-gray-400">
            Pix · Visa · Mastercard
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
            <Lock className="size-3.5" />
            Conexão segura SSL
          </div>
        </div>
      </div>

      {/* Divisória + Copyright */}
      <hr className="mx-auto my-8 max-w-6xl border-white/10" />
      <p className="text-center text-[13px] text-gray-400">
        © 2026 Coroa de Flores. Todos os direitos reservados.
      </p>
    </footer>
  );
}
