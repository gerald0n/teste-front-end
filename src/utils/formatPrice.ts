const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatPrice(cents: number): string {
  return currencyFormatter.format(cents / 100).replace(/ /g, ' ')
}

export function getInstallmentValue(cents: number, installments: number): number {
  if (installments <= 0) return cents
  return Math.floor(cents / installments)
}
