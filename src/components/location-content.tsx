import { MapPin } from "lucide-react"
import type { Location, LocationSection } from "@/types/location"

const defaultTributeSections: LocationSection[] = [
  {
    title: "Coroas Tradicionais",
    paragraphs: [
      "As coroas tradicionais são compostas por flores naturais como crisântemos, lírios e rosas brancas. São uma forma clássica e respeitosa de prestar homenagem, transmitindo sentimentos de carinho e saudade.",
      "Disponíveis em diferentes tamanhos, são indicadas para velórios, sepultamentos e celebrações de despedida.",
    ],
  },
  {
    title: "Coroas Ouro e Diamante",
    paragraphs: [
      "Para quem deseja uma homenagem mais elaborada, as coroas das categorias Ouro e Diamante contam com arranjos maiores e flores nobres como orquídeas, antúrios e rosas importadas.",
      "Essas opções são ideais para expressar um sentimento de grande admiração e respeito pela pessoa homenageada.",
    ],
  },
  {
    title: "Entrega com cuidado e pontualidade",
    paragraphs: [
      "A Coroa de Flores garante a entrega no local e horário combinados. Antes da entrega, enviamos uma foto da coroa pronta para sua aprovação, assegurando que tudo esteja perfeito para a homenagem.",
      "Nosso atendimento funciona 24 horas, incluindo feriados e finais de semana, para que você possa contar conosco sempre que precisar.",
    ],
  },
]

function ContentSections({ sections }: { sections: LocationSection[] }) {
  return (
    <div className="mt-10 space-y-8">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-[18px] font-bold text-[#1A1A1A] md:text-[20px]">
            {section.title}
          </h3>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-relaxed text-[#444444]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MapEmbed({ name, cityName, uf }: { name: string; cityName: string; uf: string }) {
  const query = encodeURIComponent(`${name} ${cityName} ${uf}`)
  const src = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2.5">
        <MapPin className="size-5 text-[#2D5A3D]" />
        <h3 className="text-[18px] font-bold text-[#1A1A1A] md:text-[20px]">
          Localização de {name}
        </h3>
      </div>

      <p className="mt-3 text-[15px] text-[#6B6B6B]">
        Veja no mapa onde fica {name} em {cityName}, {uf}.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-[#E8E4DE]">
        <iframe
          title={`Mapa de ${name} em ${cityName}`}
          src={src}
          className="aspect-video w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export function LocationContent({ location }: { location: Location }) {
  const tributeSections =
    location.tributeSections.length > 0
      ? location.tributeSections
      : defaultTributeSections

  const allSections = [...location.infoSections, ...tributeSections]

  if (allSections.length === 0) return null

  const [mainSection, ...otherInfoSections] = location.infoSections
  const hasMainInfo = mainSection !== undefined

  return (
    <section className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-[800px]">
        {location.introduction && (
          <p className="mb-8 text-[16px] leading-relaxed text-[#555555] md:text-[17px]">
            {location.introduction}
          </p>
        )}

        {hasMainInfo && (
          <>
            <h2 className="font-serif text-[22px] font-bold text-[#1A1A1A] md:text-[30px]">
              {mainSection.title}
            </h2>

            {mainSection.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-[16px] leading-relaxed text-[#444444]"
              >
                {p}
              </p>
            ))}

            {otherInfoSections.length > 0 && (
              <ContentSections sections={otherInfoSections} />
            )}
          </>
        )}

        {!hasMainInfo && tributeSections.length > 0 && (
          <>
            <h2 className="font-serif text-[22px] font-bold text-[#1A1A1A] md:text-[30px]">
              Como Escolher a Coroa de Flores Ideal para {location.name}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#444444]">
              Escolher a coroa de flores certa é uma forma significativa de
              prestar sua homenagem. Conheça as opções disponíveis para entrega
              em {location.name}, {location.city}.
            </p>
          </>
        )}

        <MapEmbed name={location.name} cityName={location.city} uf={location.uf} />

        <ContentSections sections={tributeSections} />
      </div>
    </section>
  )
}
