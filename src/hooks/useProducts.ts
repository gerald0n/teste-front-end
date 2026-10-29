import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'

type Status = 'loading' | 'success' | 'error'

interface UseProductsResult {
  products: Product[]
  status: Status
  error: string | null
  retry: () => void
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(controller.signal)
      .then((data) => {
        setProducts(data)
        setStatus('success')
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Erro ao carregar os produtos.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [attempt])

  const retry = () => {
    setStatus('loading')
    setError(null)
    setAttempt((n) => n + 1)
  }

  return { products, status, error, retry }
}
