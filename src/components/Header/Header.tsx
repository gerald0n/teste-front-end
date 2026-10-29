import { Icon, type IconName } from '../Icon/Icon'
import { Logo } from '../Logo/Logo'
import './Header.scss'

const benefits: { icon: IconName; highlight: string; text: string }[] = [
  { icon: 'shield', highlight: 'Compra', text: '100% segura' },
  { icon: 'truck', highlight: 'Frete grátis', text: 'acima de R$ 200' },
  { icon: 'card', highlight: 'Parcele', text: 'suas compras' },
]

const actions: { icon: IconName; label: string }[] = [
  { icon: 'orders', label: 'Meus pedidos' },
  { icon: 'heart', label: 'Favoritos' },
  { icon: 'user', label: 'Minha conta' },
  { icon: 'cart', label: 'Carrinho' },
]

const menu = [
  'Todas categorias',
  'Supermercado',
  'Livros',
  'Moda',
  'Lançamentos',
  'Ofertas do dia',
]

export function Header() {
  return (
    <header className="header">
      <div className="header__benefits">
        <ul className="header__benefits-list">
          {benefits.map(({ icon, highlight, text }, index) => (
            <li key={icon} className="header__benefit">
              <Icon name={icon} size={16} />
              <span>
                {index === 0 ? (
                  <>
                    {highlight} <strong>{text}</strong>
                  </>
                ) : (
                  <>
                    <strong>{highlight}</strong> {text}
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="header__main">
        <a href="/" className="header__logo" aria-label="Econverse, página inicial">
          <Logo />
        </a>

        <form className="header__search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="visually-hidden">
            Buscar produtos
          </label>
          <input
            id="search"
            type="search"
            name="q"
            placeholder="O que você está buscando?"
            autoComplete="off"
          />
          <button type="submit" aria-label="Buscar">
            <Icon name="search" size={22} />
          </button>
        </form>

        <nav aria-label="Atalhos da conta">
          <ul className="header__actions">
            {actions.map(({ icon, label }) => (
              <li key={icon}>
                <a href="#" className="header__action" aria-label={label} title={label}>
                  <Icon name={icon} size={24} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <nav className="header__nav" aria-label="Categorias">
        <ul className="header__menu">
          {menu.map((item) => (
            <li key={item}>
              <a
                href="#"
                className={`header__menu-link${item === 'Ofertas do dia' ? ' is-highlight' : ''}`}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="header__menu-link header__menu-link--icon">
              <Icon name="crown" size={18} />
              Assinatura
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
