import { Logo } from '../Logo/Logo'
import './Brands.scss'

const brands = ['marca-1', 'marca-2', 'marca-3', 'marca-4', 'marca-5']

export function Brands() {
  return (
    <section className="brands" aria-labelledby="brands-title">
      <h2 id="brands-title" className="brands__title">
        Navegue por marcas
      </h2>
      <ul className="brands__list">
        {brands.map((brand) => (
          <li key={brand}>
            <a href="#" className="brands__item" aria-label="Ver produtos da marca Econverse">
              <Logo className="brands__logo" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
