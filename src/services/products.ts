import type { Product, ProductsResponse } from '../types/product'

export const PRODUCTS_SOURCE_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'

export const PRODUCTS_PROXY_URL = '/api/produtos'

export const PRODUCTS_FALLBACK_URL = '/produtos.json'

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  return (
    typeof item.productName === 'string' &&
    typeof item.descriptionShort === 'string' &&
    typeof item.photo === 'string' &&
    typeof item.price === 'number'
  )
}

async function requestProducts(url: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`Não foi possível carregar os produtos (HTTP ${response.status}).`)
  }

  const data = (await response.json()) as Partial<ProductsResponse>

  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('A resposta da API de produtos veio em um formato inesperado.')
  }

  return data.products.filter(isProduct)
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    return await requestProducts(PRODUCTS_PROXY_URL, signal)
  } catch (error) {
    if (signal?.aborted) throw error
    return requestProducts(PRODUCTS_FALLBACK_URL, signal)
  }
}
