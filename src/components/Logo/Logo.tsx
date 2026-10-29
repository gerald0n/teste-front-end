import './Logo.scss'

interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`logo ${className}`.trim()}>
      <span className="logo__badge" aria-hidden="true">
        ec
      </span>
      <span className="logo__text" aria-hidden="true">
        onverse
      </span>
      <span className="visually-hidden">Econverse</span>
    </span>
  )
}
