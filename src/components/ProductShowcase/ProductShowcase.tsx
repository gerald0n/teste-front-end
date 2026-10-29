import { useId, useState, type KeyboardEvent } from 'react'
import type { Product } from '../../types/product'
import { ProductCarousel } from '../ProductCarousel/ProductCarousel'
import './ProductShowcase.scss'

const TABS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos'] as const
type Tab = (typeof TABS)[number]

const TABS_WITH_PRODUCTS: Tab[] = ['Celular', 'Ver todos']

interface ProductShowcaseProps {
  title: string
  products: Product[]
  status: 'loading' | 'success' | 'error'
  error?: string | null
  onRetry?: () => void
  onSelect: (product: Product) => void
  withTabs?: boolean
  id?: string
}

export function ProductShowcase({
  title,
  products,
  status,
  error,
  onRetry,
  onSelect,
  withTabs = false,
  id,
}: ProductShowcaseProps) {
  const baseId = useId()
  const titleId = `${baseId}-title`
  const [activeTab, setActiveTab] = useState<Tab>('Celular')

  const visibleProducts = !withTabs || TABS_WITH_PRODUCTS.includes(activeTab) ? products : []

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % TABS.length,
      ArrowLeft: (index - 1 + TABS.length) % TABS.length,
      Home: 0,
      End: TABS.length - 1,
    }
    const next = keys[event.key]
    if (next === undefined) return

    event.preventDefault()
    setActiveTab(TABS[next])
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  const panelProps = withTabs
    ? {
        role: 'tabpanel',
        id: `${baseId}-panel`,
        'aria-labelledby': `${baseId}-tab-${TABS.indexOf(activeTab)}`,
      }
    : {}

  return (
    <section className="showcase" aria-labelledby={titleId} id={id}>
      <header className="showcase__header">
        <h2 id={titleId} className="showcase__title">
          {title}
        </h2>

        {withTabs ? (
          <div className="showcase__tabs" role="tablist" aria-label="Categorias de produtos">
            {TABS.map((tab, index) => {
              const selected = tab === activeTab
              return (
                <button
                  key={tab}
                  id={`${baseId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  className={`showcase__tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        ) : (
          <a href="#" className="showcase__see-all">
            Ver todos
          </a>
        )}
      </header>

      <div className="showcase__content" {...panelProps}>
        {status === 'loading' && (
          <ul className="showcase__skeleton" aria-busy="true" aria-label="Carregando produtos">
            {Array.from({ length: 4 }, (_, index) => (
              <li key={index} className="showcase__skeleton-card" />
            ))}
          </ul>
        )}

        {status === 'error' && (
          <div className="showcase__feedback" role="alert">
            <p>{error ?? 'Não foi possível carregar os produtos.'}</p>
            {onRetry && (
              <button type="button" className="showcase__retry" onClick={onRetry}>
                Tentar novamente
              </button>
            )}
          </div>
        )}

        {status === 'success' &&
          (visibleProducts.length > 0 ? (
            <ProductCarousel products={visibleProducts} onSelect={onSelect} label={title} />
          ) : (
            <p className="showcase__feedback">Nenhum produto nesta categoria no momento.</p>
          ))}
      </div>
    </section>
  )
}
