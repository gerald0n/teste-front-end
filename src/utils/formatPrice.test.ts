import { formatPrice, getInstallmentValue } from './formatPrice'

describe('formatPrice', () => {
  it('converte centavos para reais no formato brasileiro', () => {
    expect(formatPrice(149990)).toBe('R$ 1.499,90')
    expect(formatPrice(520)).toBe('R$ 5,20')
    expect(formatPrice(0)).toBe('R$ 0,00')
  })
})

describe('getInstallmentValue', () => {
  it('divide o valor pelo número de parcelas', () => {
    expect(getInstallmentValue(15000, 2)).toBe(7500)
  })

  it('arredonda o valor da parcela para baixo', () => {
    expect(getInstallmentValue(14990, 3)).toBe(4996)
  })

  it('retorna o valor cheio quando o número de parcelas é inválido', () => {
    expect(getInstallmentValue(15000, 0)).toBe(15000)
  })
})
