import { Icon, type IconName } from '../Icon/Icon'
import { Logo } from '../Logo/Logo'
import './Footer.scss'

const socials: { icon: IconName; label: string }[] = [
  { icon: 'instagram', label: 'Instagram' },
  { icon: 'facebook', label: 'Facebook' },
  { icon: 'linkedin', label: 'LinkedIn' },
]

const CURRENT_YEAR = new Date().getFullYear()

const columns = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  { title: 'Termos', links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'] },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="footer__about">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ul className="footer__socials">
            {socials.map(({ icon, label }) => (
              <li key={icon}>
                <a href="#" aria-label={`Econverse no ${label}`}>
                  <Icon name={icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__nav" aria-label="Rodapé">
          {columns.map(({ title, links }) => (
            <div key={title} className="footer__column">
              <h2 className="footer__title">{title}</h2>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p className="footer__copyright">
        © {CURRENT_YEAR} Econverse. Todos os direitos reservados.
      </p>
    </footer>
  )
}
