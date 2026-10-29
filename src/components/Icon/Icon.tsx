import type { SVGProps } from 'react'

const paths = {
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3v3h-7" />
      <circle cx="6.5" cy="17" r="1.6" />
      <circle cx="16.5" cy="17" r="1.6" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 9.5h19M6 15h4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </>
  ),
  orders: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M10 9.5v3l2-1 2 1v-3" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.6 18.3c1.2-2 3.1-3 5.4-3s4.2 1 5.4 3" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 4h2.6l2.4 11h10.8l2.2-7.5H6.3" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  crown: <path d="m3.5 8 4.5 4 4-6 4 6 4.5-4-1.8 10H5.3L3.5 8Z" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r=".6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5Z" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V16M8 7.8v.2M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
    </>
  ),
  technology: (
    <>
      <rect x="3" y="4.5" width="14" height="10" rx="1" />
      <path d="M7 18.5h6M10 14.5v4" />
      <rect x="15" y="9" width="6" height="10.5" rx="1" />
      <path d="M17.5 17.5h1" />
    </>
  ),
  supermarket: (
    <>
      <path d="M3 9.5h18l-1.5-5h-15L3 9.5Z" />
      <path d="M3 9.5c0 1.4 1.1 2.5 2.5 2.5S8 10.9 8 9.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0 1.4 1.1 2.5 2.5 2.5" />
      <path d="M4.5 12v8h15v-8M9.5 20v-5h5v5" />
    </>
  ),
  drinks: (
    <>
      <path d="M8 2.5h3v4l1.5 2.5V21H6.5V9L8 6.5v-4Z" />
      <path d="M6.5 12.5h6M6.5 17h6" />
      <path d="M15 13h5v4.5a2.5 2.5 0 0 1-5 0V13Z" />
      <path d="M17.5 20v1.5" />
    </>
  ),
  tools: (
    <>
      <path d="m4 20 7.5-7.5" />
      <path d="M14.5 3.5a4 4 0 0 0-4 5.2L3.6 15.6a1.5 1.5 0 0 0 2.1 2.1l6.9-6.9a4 4 0 0 0 5.2-4l-2.3 2.3-2.4-.6-.6-2.4 2.3-2.3c-.1 0-.2-.3-.3-.3Z" />
      <path d="m13 15 5.5 5.5a1.6 1.6 0 0 0 2.2-2.2L15.2 12.8M4 4l3 1 4 4-2 2-4-4-1-3Z" />
    </>
  ),
  health: (
    <>
      <path d="M12 11.5s-4-2.4-4-5.4a2.2 2.2 0 0 1 4-1.3 2.2 2.2 0 0 1 4 1.3c0 3-4 5.4-4 5.4Z" />
      <path d="M2.5 14.5 6 13l4.5 1.5H14a1.5 1.5 0 0 1 0 3h-3.5" />
      <path d="m13.5 17.5 5.5-2.5a1.5 1.5 0 0 1 1.2 2.7L13 21.5H7l-4.5-2" />
    </>
  ),
  sports: (
    <>
      <circle cx="13.5" cy="4" r="1.7" />
      <path d="m10 9.5 3-2.5 2.5 3 2.5 1M13 7l-1 5 3 2.5-1 4.5M12 12l-3 3H6" />
      <path d="M3 20.5h16l2-6.5" />
    </>
  ),
  fashion: (
    <>
      <path d="M9 2.5v3L6.5 10 9 12 5 21.5h14L15 12l2.5-2L15 5.5v-3" />
      <path d="M9 5.5c1 1 5 1 6 0M9 12h6" />
    </>
  ),
} as const

export type IconName = keyof typeof paths

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  title?: string
}

export function Icon({ name, size = 24, title, strokeWidth = 1.6, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  )
}
