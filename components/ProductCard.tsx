import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye } from 'lucide-react'
import { Product } from '@/lib/data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group card overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className={`w-full h-full ${product.gradient} transition-transform duration-700 group-hover:scale-105`} />
        )}

        {/* Badge */}
        {(product.badge || product.isNew || product.isBestseller) && (
          <div className="product-badge">
            {product.badge ?? (product.isNew ? 'Yeni' : 'Çok Satan')}
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="w-9 h-9 bg-[var(--bg)] rounded-full flex items-center justify-center shadow-md hover:bg-accent hover:text-white transition-all duration-200"
            aria-label="Favorilere ekle"
          >
            <Heart size={15} />
          </button>
          <Link
            href={`/urunler/${product.id}`}
            className="w-9 h-9 bg-[var(--bg)] rounded-full flex items-center justify-center shadow-md hover:bg-accent hover:text-white transition-all duration-200"
            aria-label="Hızlı görüntüle"
          >
            <Eye size={15} />
          </Link>
        </div>

        {/* Quick Add overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg)] py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link href={`/urunler/${product.id}`} className="btn-primary w-full text-xs">
            İncele
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted tracking-widest uppercase mb-1">{product.category}</p>
        <Link href={`/urunler/${product.id}`}>
          <h3 className="font-serif text-base font-medium text-primary-color hover:text-accent transition-colors duration-200 mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-medium text-primary-color">{product.price.toLocaleString('tr-TR')}₺</span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">{product.originalPrice.toLocaleString('tr-TR')}₺</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="text-[10px] text-muted border border-[var(--border)] px-2 py-0.5 rounded-full"
            >
              {color}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
