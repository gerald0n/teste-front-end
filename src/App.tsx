import { useState } from 'react'
import { Brands } from './components/Brands/Brands'
import { Categories } from './components/Categories/Categories'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Newsletter } from './components/Newsletter/Newsletter'
import { Partners } from './components/Partners/Partners'
import { ProductModal } from './components/ProductModal/ProductModal'
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase'
import { useProducts } from './hooks/useProducts'
import type { Product } from './types/product'

const SHOWCASE_TITLE = 'Produtos relacionados'

export default function App() {
  const { products, status, error, retry } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const showcaseProps = {
    title: SHOWCASE_TITLE,
    products,
    status,
    error,
    onRetry: retry,
    onSelect: setSelectedProduct,
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Categories />
        <ProductShowcase {...showcaseProps} withTabs id="produtos" />
        <Partners />
        <ProductShowcase {...showcaseProps} />
        <Partners />
        <Brands />
        <ProductShowcase {...showcaseProps} />
        <Newsletter />
      </main>

      <Footer />

      <ProductModal
        key={selectedProduct?.productName ?? 'fechado'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
