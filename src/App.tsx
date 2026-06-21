import { useState, useMemo } from 'react'

interface PriceVariant {
  label: string
  price: string
}

interface MenuItem {
  name: string
  desc?: string
  variants: PriceVariant[]
}

interface Category {
  id: string
  title: string
  tagline: string
  items: MenuItem[]
}

const TRAGOS_PRICE = '15.00'
const TRAGOS = [
  'Mojito',
  'Piña Colada',
  'Pisco Sour',
  'Laguna Azul',
  'Machu Picchu',
  'Cuba Libre',
  'Pantera',
  'Algarrobina',
  'Durazno',
  'Mango',
]

const MENU: Category[] = [
  {
    id: 'tragos',
    title: 'Tragos',
    tagline: 'Cócteles de la casa · todos S/ 15.00',
    items: TRAGOS.map((name) => ({
      name,
      variants: [{ label: '', price: TRAGOS_PRICE }],
    })),
  },
  {
    id: 'cervezas',
    title: 'Cervezas',
    tagline: 'Bien heladas · promos por cantidad',
    items: [
      {
        name: 'Cerveza',
        desc: 'Botella personal. Promo por cantidad.',
        variants: [
          { label: '1 unid.', price: '15.00' },
          { label: '3 unid.', price: '40.00' },
          { label: '5 unid.', price: '65.00' },
        ],
      },
      {
        name: 'Cerveza 3 Cruces',
        desc: 'Promo por cantidad.',
        variants: [
          { label: '1 unid.', price: '8.00' },
          { label: '2 unid.', price: '15.00' },
        ],
      },
    ],
  },
  {
    id: 'sin-alcohol',
    title: 'Bebidas sin Alcohol',
    tagline: 'Gaseosas y aguas',
    items: [
      {
        name: 'Gaseosa',
        variants: [
          { label: '500 mL', price: '5.00' },
          { label: '1.5 L', price: '14.00' },
        ],
      },
      {
        name: 'Agua Cielo',
        variants: [{ label: '625 mL', price: '3.00' }],
      },
      {
        name: 'San Mateo',
        desc: 'Agua mineral con gas',
        variants: [{ label: '625 mL', price: '3.50' }],
      },
      {
        name: 'San Luis',
        variants: [{ label: '625 mL', price: '3.50' }],
      },
    ],
  },
  {
    id: 'otros',
    title: 'Otros',
    tagline: 'Cigarrillos',
    items: [
      {
        name: 'Cigarro Lucky',
        variants: [
          { label: '1 unid.', price: '2.50' },
          { label: '1 caja', price: '32.00' },
        ],
      },
    ],
  },
]

const RESTO = {
  name: 'GS',
  subtitle: 'Resto · Bar',
  address: 'Av. El Sol 527 - Urb. Canto Grande',
  hours: 'Lun a Dom · 5:00 p. m. – 1:00 a. m.',
  showWhatsapp: false,
  whatsapp: '51999999999',
}

function Price({ value }: { value: string }) {
  return (
    <span className="whitespace-nowrap font-semibold text-gold-400">
      <span className="text-[0.7em] align-top mr-0.5 text-gold-500">S/</span>
      {value}
    </span>
  )
}

export default function App() {
  const [active, setActive] = useState(MENU[0].id)

  const waLink = useMemo(
    () =>
      `https://wa.me/${RESTO.whatsapp}?text=${encodeURIComponent(
        'Hola! Quisiera hacer un pedido 🍻',
      )}`,
    [],
  )

  const scrollTo = (id: string) => {
    setActive(id)
    const el = document.getElementById(`cat-${id}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-gold-500/30">
      {/* Glow de fondo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-gold-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative">
        <div className="mx-auto max-w-3xl px-6 pt-14 pb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold-500">
            {RESTO.subtitle}
          </p>
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-50 sm:text-6xl">
            {RESTO.name}
          </h1>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/60" />
            <span className="text-sm tracking-wide text-neutral-400">
              Licor &amp; Piqueos
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/60" />
          </div>
        </div>
      </header>

      {/* Nav de categorías (sticky) */}
      <nav className="sticky top-0 z-40 border-y border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {MENU.map((c) => (
            <button
              key={c.id}
              onClick={() => scrollTo(c.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === c.id
                  ? 'border-gold-500/70 bg-gold-500/15 text-gold-300'
                  : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Menú */}
      <main className="relative mx-auto max-w-3xl px-6 pb-32 pt-10">
        {MENU.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-14 scroll-mt-32">
            <div className="mb-6">
              <h2 className="font-display text-3xl font-medium text-neutral-50">
                {cat.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">{cat.tagline}</p>
            </div>

            <ul className="divide-y divide-neutral-800/70">
              {cat.items.map((item) => (
                <li key={item.name} className="py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium text-neutral-100">
                      {item.name}
                    </h3>
                    {item.variants.length === 1 && (
                      <div className="flex-1 mx-3 border-b border-dotted border-neutral-700/60" />
                    )}
                    {item.variants.length === 1 && (
                      <Price value={item.variants[0].price} />
                    )}
                  </div>

                  {item.desc && (
                    <p className="mt-1 max-w-md text-sm text-neutral-500">
                      {item.desc}
                    </p>
                  )}

                  {item.variants.length > 1 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.variants.map((v) => (
                        <span
                          key={v.label}
                          className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-sm"
                        >
                          <span className="text-neutral-400">{v.label}</span>
                          <Price value={v.price} />
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Footer */}
        <footer className="mt-10 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-8 text-center">
          <h3 className="font-display text-2xl text-neutral-50">{RESTO.name}</h3>
          <div className="mx-auto mt-4 max-w-sm space-y-2 text-sm text-neutral-400">
            <p>📍 {RESTO.address}</p>
            <p>🕔 {RESTO.hours}</p>
          </div>
          <p className="mt-6 text-xs text-neutral-600">
            Precios en soles (S/). Disponibilidad sujeta a stock.
          </p>
          <p className="mt-1 text-xs text-neutral-700">
            Venta de bebidas alcohólicas solo para mayores de 18 años.
          </p>
        </footer>
      </main>

      {/* CTA WhatsApp flotante */}
      {RESTO.showWhatsapp && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-gold-600/30 transition-transform hover:scale-105 active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm5.8 14.13c-.25.69-1.45 1.32-1.99 1.4-.53.08-1.18.11-1.9-.12-.44-.14-1-.32-1.72-.64-3.03-1.31-5.01-4.36-5.16-4.56-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.24 1.07-2.54.28-.31.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.6.86 2.08.93 2.23.08.15.13.32.02.52-.1.2-.16.32-.31.5-.15.18-.32.4-.46.53-.15.15-.31.32-.13.62.18.3.79 1.3 1.69 2.11 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.41-.25.69-.15.28.1 1.77.84 2.07.99.3.15.5.22.58.35.07.12.07.71-.18 1.4z" />
          </svg>
          Pedir por WhatsApp
        </a>
      )}
    </div>
  )
}
