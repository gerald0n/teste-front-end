import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { Icon } from '../Icon/Icon'
import './ProductModal.scss'

const MIN_QUANTITY = 1
const MAX_QUANTITY = 99
const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [quantity, setQuantity] = useState(MIN_QUANTITY)

  useEffect(() => {
    if (!product) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.classList.add('is-locked')
    closeButtonRef.current?.focus()

    return () => {
      document.body.classList.remove('is-locked')
      previouslyFocused?.focus()
    }
  }, [product])

  if (!product) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }

    if (event.key !== 'Tab' || !dialogRef.current) return

    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const changeQuantity = (delta: number) =>
    setQuantity((current) => Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, current + delta)))

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
        onKeyDown={handleKeyDown}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <Icon name="close" size={22} strokeWidth={2} />
        </button>

        <figure className="modal__media">
          <img src={product.photo} alt={product.productName} width={240} height={240} />
        </figure>

        <div className="modal__info">
          <h2 id="product-modal-title" className="modal__title">
            {product.productName}
          </h2>
          <p className="modal__price">{formatPrice(product.price)}</p>
          <p id="product-modal-description" className="modal__description">
            {product.descriptionShort}
          </p>
          <button type="button" className="modal__more">
            Veja mais detalhes do produto &gt;
          </button>

          <div className="modal__actions">
            <div className="modal__quantity" role="group" aria-label="Quantidade">
              <button
                type="button"
                onClick={() => changeQuantity(-1)}
                disabled={quantity <= MIN_QUANTITY}
                aria-label="Diminuir quantidade"
              >
                <Icon name="minus" size={18} strokeWidth={2} />
              </button>
              <output aria-live="polite" aria-label="Quantidade selecionada">
                {quantity}
              </output>
              <button
                type="button"
                onClick={() => changeQuantity(1)}
                disabled={quantity >= MAX_QUANTITY}
                aria-label="Aumentar quantidade"
              >
                <Icon name="plus" size={18} strokeWidth={2} />
              </button>
            </div>

            <button type="button" className="modal__buy">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
