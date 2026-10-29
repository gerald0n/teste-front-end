import { useState, type FormEvent } from 'react'
import './Newsletter.scss'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    if (!name || !EMAIL_PATTERN.test(email) || !data.get('terms')) {
      setFeedback({
        type: 'error',
        message: 'Preencha nome, um e-mail válido e aceite os termos para se inscrever.',
      })
      return
    }

    setFeedback({ type: 'success', message: `Obrigado, ${name}! Inscrição realizada.` })
    form.reset()
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner">
        <div className="newsletter__intro">
          <h2 id="newsletter-title" className="newsletter__title">
            Inscreva-se na nossa newsletter
          </h2>
          <p className="newsletter__text">
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter__fields">
            <label className="visually-hidden" htmlFor="newsletter-name">
              Nome
            </label>
            <input id="newsletter-name" name="name" type="text" placeholder="Digite seu nome" autoComplete="name" />

            <label className="visually-hidden" htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
            />

            <button type="submit" className="newsletter__submit">
              Inscrever
            </button>
          </div>

          <label className="newsletter__terms">
            <input type="checkbox" name="terms" />
            Aceito os termos e condições
          </label>

          {feedback && (
            <p className={`newsletter__feedback is-${feedback.type}`} role="status">
              {feedback.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
