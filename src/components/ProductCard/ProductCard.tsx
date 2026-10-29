import type { Product } from '../../types/product'
import { formatPrice, getInstallmentValue } from '../../utils/formatPrice'
import './ProductCard.scss'

export const INSTALLMENTS = 2

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const installment = getInstallmentValue(product.price, INSTALLMENTS)

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__details"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${product.productName}`}
      >
        <figure className="product-card__media">
          <img
            src={product.photo}
            alt=""
            width={180}
            height={180}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </button>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.productName}</h3>

        <p className="product-card__price">
          <span className="visually-hidden">Preço: </span>
          {formatPrice(product.price)}
        </p>
        <p className="product-card__installments">
          ou {INSTALLMENTS}x de {formatPrice(installment)} sem juros
        </p>
        <p className="product-card__shipping">Frete grátis</p>

        <button
          type="button"
          className="product-card__buy"
          onClick={() => onSelect(product)}
          aria-label={`Comprar ${product.productName}`}
        >
          Comprar
        </button>
      </div>
    </article>
  )
}
