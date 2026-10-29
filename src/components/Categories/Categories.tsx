import { useState } from 'react'
import { Icon, type IconName } from '../Icon/Icon'
import './Categories.scss'

const categories: { icon: IconName; label: string }[] = [
  { icon: 'technology', label: 'Tecnologia' },
  { icon: 'supermarket', label: 'Supermercado' },
  { icon: 'drinks', label: 'Bebidas' },
  { icon: 'tools', label: 'Ferramentas' },
  { icon: 'health', label: 'Saúde' },
  { icon: 'sports', label: 'Esportes e Fitness' },
  { icon: 'fashion', label: 'Moda' },
]

export function Categories() {
  const [active, setActive] = useState(categories[0].label)

  return (
    <section className="categories" aria-label="Departamentos">
      <ul className="categories__list">
        {categories.map(({ icon, label }) => {
          const isActive = active === label
          return (
            <li key={label}>
              <button
                type="button"
                className={`categories__item${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setActive(label)}
              >
                <span className="categories__icon">
                  <Icon name={icon} size={40} strokeWidth={1.3} />
                </span>
                <span className="categories__label">{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
