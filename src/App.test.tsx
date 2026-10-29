import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import type { ProductsResponse } from './types/product'

const mockResponse: ProductsResponse = {
  success: true,
  products: [
    {
      productName: 'IPHONE 13 MINI 1',
      descriptionShort: 'Descrição curta do iPhone 13 mini',
      photo: 'https://example.com/iphone.png',
      price: 149990,
    },
    {
      productName: 'Iphone 11 PRO MAX BRANCO 1',
      descriptionShort: 'Descrição curta do iPhone 11',
      photo: 'https://example.com/iphone.png',
      price: 15000,
    },
  ],
}

function mockFetch(response: Partial<Response>) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
}

beforeEach(() => {
  Element.prototype.scrollBy = vi.fn()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('exibe os produtos vindos da API na vitrine', async () => {
    mockFetch({ ok: true, json: () => Promise.resolve(mockResponse) })
    render(<App />)

    const showcase = (await screen.findAllByRole('list', { name: 'Produtos relacionados' }))[0]
    expect(within(showcase).getByRole('heading', { name: 'IPHONE 13 MINI 1' })).toBeInTheDocument()
    expect(within(showcase).getByText('R$ 1.499,90')).toBeInTheDocument()
    expect(within(showcase).getByText('ou 2x de R$ 749,95 sem juros')).toBeInTheDocument()
  })

  it('abre o modal com as informações do produto clicado e fecha com Esc', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: true, json: () => Promise.resolve(mockResponse) })
    render(<App />)

    const [detailsButton] = await screen.findAllByRole('button', {
      name: 'Ver detalhes de Iphone 11 PRO MAX BRANCO 1',
    })
    await user.click(detailsButton)

    const dialog = screen.getByRole('dialog', { name: 'Iphone 11 PRO MAX BRANCO 1' })
    expect(within(dialog).getByText('R$ 150,00')).toBeInTheDocument()
    expect(within(dialog).getByText('Descrição curta do iPhone 11')).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Fechar' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('controla a quantidade dentro do modal', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: true, json: () => Promise.resolve(mockResponse) })
    render(<App />)

    const [buyButton] = await screen.findAllByRole('button', { name: /Comprar IPHONE 13 MINI 1/ })
    await user.click(buyButton)

    const dialog = screen.getByRole('dialog')
    const decrease = within(dialog).getByRole('button', { name: 'Diminuir quantidade' })
    const increase = within(dialog).getByRole('button', { name: 'Aumentar quantidade' })

    expect(decrease).toBeDisabled()
    await user.click(increase)
    await user.click(increase)
    expect(within(dialog).getByText('03')).toBeInTheDocument()
  })

  it('mostra uma mensagem de erro e permite tentar novamente', async () => {
    const user = userEvent.setup()
    mockFetch({ ok: false, status: 500 })
    render(<App />)

    const [alert] = await screen.findAllByRole('alert')
    expect(alert).toHaveTextContent('HTTP 500')

    mockFetch({ ok: true, json: () => Promise.resolve(mockResponse) })
    await user.click(within(alert).getByRole('button', { name: 'Tentar novamente' }))

    expect((await screen.findAllByText('IPHONE 13 MINI 1')).length).toBeGreaterThan(0)
  })
})
