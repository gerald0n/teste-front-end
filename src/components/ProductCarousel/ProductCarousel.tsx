import { useCallback, useEffect, useRef, useState } from 'react'
import type { Product } from '../../types/product'
import { Icon } from '../Icon/Icon'
import { ProductCard } from '../ProductCard/ProductCard'
import './ProductCarousel.scss'

interface ProductCarouselProps {
  products: Product[]
  onSelect: (product: Product) => void
  label: string
}

export function ProductCarousel({ products, onSelect, label }: ProductCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateArrows()
    track.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)

    return () => {
      track.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [products, updateArrows])

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-label="Produtos anteriores"
      >
        <Icon name="chevronLeft" size={28} strokeWidth={2} />
      </button>

      <ul ref={trackRef} className="carousel__track" aria-label={label}>
        {products.map((product, index) => (
          <li key={`${product.productName}-${index}`} className="carousel__slide">
            <ProductCard product={product} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-label="Próximos produtos"
      >
        <Icon name="chevronRight" size={28} strokeWidth={2} />
      </button>
    </div>
  )
}
