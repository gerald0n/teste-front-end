import './Partners.scss'

const partners = [
  { id: 'parceiro-1', title: 'Parceiros', text: 'Lorem ipsum dolor sit amet, consectetur' },
  { id: 'parceiro-2', title: 'Parceiros', text: 'Lorem ipsum dolor sit amet, consectetur' },
]

export function Partners() {
  return (
    <section className="partners" aria-label="Parceiros">
      {partners.map(({ id, title, text }) => (
        <article key={id} className="partners__card">
          <div className="partners__content">
            <h2 className="partners__title">{title}</h2>
            <p className="partners__text">{text}</p>
            <a href="#" className="partners__cta">
              Confira
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}
