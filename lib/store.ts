import fs from 'fs'
import path from 'path'
import { unstable_noStore as noStore } from 'next/cache'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  categorySlug: string
  description: string
  details: string[]
  sizes: string[]
  colors: string[]
  gradient: string
  image?: string
  images?: string[]
  badge?: string
  isNew?: boolean
  isBestseller?: boolean
}

export interface Category {
  name: string
  slug: string
  description: string
  gradient: string
  image?: string
  count: number
}

export interface BannerSettings {
  anasayfa_hero: string
  anasayfa_banner: string
  hakkimizda_hero: string
  hakkimizda_hikaye: string
  hakkimizda_cta: string
}

interface Store {
  products: Product[]
  categories: Category[]
  banners: BannerSettings
}

const DEFAULT_BANNERS: BannerSettings = {
  anasayfa_hero: '',
  anasayfa_banner: '',
  hakkimizda_hero: '',
  hakkimizda_hikaye: '',
  hakkimizda_cta: '',
}

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json')

const DEFAULT_DATA: Store = {
  banners: DEFAULT_BANNERS,
  categories: [
    { name: 'Setler', slug: 'setler', description: 'Uyumlu sutyen ve külot kombinasyonları', gradient: 'category-gradient-1', count: 24 },
    { name: 'Gecelikler', slug: 'gecelikler', description: 'İpeksi dokunuşlu gece kıyafetleri', gradient: 'category-gradient-2', count: 18 },
    { name: 'Babydoll', slug: 'babydoll', description: 'Şeffaf ve romantik babydoll modelleri', gradient: 'category-gradient-3', count: 15 },
    { name: 'Kostümler', slug: 'kostumler', description: 'Fantezi kostüm ve rol yapma setleri', gradient: 'category-gradient-4', count: 20 },
    { name: 'Korse & Bustier', slug: 'korse', description: 'Figür vurgulayan korse ve bustier modelleri', gradient: 'category-gradient-5', count: 12 },
    { name: 'Jartiyer & Çoraplar', slug: 'jartiyer', description: 'Seksi jartiyer kemeri ve file çorap setleri', gradient: 'category-gradient-6', count: 16 },
  ],
  products: [
    {
      id: '1', name: 'Rouge Dantel Set', price: 649, originalPrice: 899,
      category: 'Setler', categorySlug: 'setler',
      description: 'El yapımı Fransız danteli ile üretilmiş bu lüks set, zarif tasarımı ve mükemmel uyumuyla kendinizi özel hissettiriyor.',
      details: ['%80 Naylon, %20 Elastan', 'El yıkama önerilir', 'Fransız dantel işçiliği', 'Sabit köpüklü sutyen', 'Yüksek bel külot'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Kırmızı', 'Siyah', 'Bordo'],
      gradient: 'product-gradient-2', badge: 'İndirim', isBestseller: true,
    },
    {
      id: '2', name: 'Velours Gecelik', price: 489,
      category: 'Gecelikler', categorySlug: 'gecelikler',
      description: 'Ultra yumuşak kadife kumaştan üretilen bu gecelik, tüm gece boyunca konfor ve şıklık sunar.',
      details: ['%95 Polyester Kadife, %5 Elastan', 'Makine yıkama 30°C', 'Midi boy', 'İnce askı', 'V yaka'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], colors: ['Gece Mavisi', 'Şampanya', 'Mürdüm'],
      gradient: 'product-gradient-6', isNew: true,
    },
    {
      id: '3', name: 'Aura Babydoll', price: 379,
      category: 'Babydoll', categorySlug: 'babydoll',
      description: 'Şeffaf şifon ve dantel detaylı bu babydoll, feminen hatlarınızı zarif biçimde vurgular.',
      details: ['%100 Şifon ve Dantel', 'El yıkama önerilir', 'Arka bağcıklı', 'Külot dahil', 'Mini boy'],
      sizes: ['XS/S', 'M/L', 'XL/XXL'], colors: ['Pembe', 'Siyah', 'Kırmızı'],
      gradient: 'product-gradient-5', isNew: true,
    },
    {
      id: '4', name: 'Noir Korse', price: 829, originalPrice: 1099,
      category: 'Korse & Bustier', categorySlug: 'korse',
      description: 'Balinalı saten korse figürünüzü mükemmel biçimde destekler.',
      details: ['%70 Saten, %20 Naylon, %10 Elastan', 'Kuru temizleme önerilir', '8 balina desteği', 'Gizli fermuar', 'Ayarlanabilir askı'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Siyah', 'Kırmızı', 'Krem'],
      gradient: 'product-gradient-1', badge: 'İndirim', isBestseller: true,
    },
    {
      id: '5', name: 'Schoolgirl Kostüm', price: 559,
      category: 'Kostümler', categorySlug: 'kostumler',
      description: 'Ekose etek, beyaz bluz ve kravat detaylı bu set ile fantezilerinize hayat verin.',
      details: ['Bluz, Etek, Kravat dahil', '%100 Polyester', 'El yıkama önerilir', 'Mini boy etek', 'Aksesuarlar dahil'],
      sizes: ['S/M', 'L/XL'], colors: ['Mavi/Beyaz', 'Kırmızı/Beyaz'],
      gradient: 'product-gradient-3', isBestseller: true,
    },
    {
      id: '6', name: 'Jartiyer Set', price: 299,
      category: 'Jartiyer & Çoraplar', categorySlug: 'jartiyer',
      description: 'Dantel jartiyer kemeri ve file çorap kombinasyonu. Zamansız bir şıklık.',
      details: ['Jartiyer Kemeri + 2 Çift Çorap', 'Ayarlanabilir askı', 'File desen çorap', 'Dantel detay', 'Standart beden'],
      sizes: ['S/M', 'L/XL'], colors: ['Siyah', 'Kırmızı', 'Beyaz'],
      gradient: 'product-gradient-7', isNew: true,
    },
    {
      id: '7', name: 'Silk Touch Gecelik', price: 699, originalPrice: 899,
      category: 'Gecelikler', categorySlug: 'gecelikler',
      description: 'Saten ipek dokunuşlu bu gecelik, tüm gece boyunca yumuşaklık ve zarafetle sarıyor.',
      details: ['%100 Saten', 'El yıkama 30°C', 'Maxi boy', 'İp askılı', 'Yan yırtmaçlı'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Şampanya', 'Pembe', 'Siyah'],
      gradient: 'product-gradient-4', badge: 'İndirim',
    },
    {
      id: '8', name: 'Fantasy Nurse Kostüm', price: 479,
      category: 'Kostümler', categorySlug: 'kostumler',
      description: 'Hemşire temalı bu set, mini elbise ve kep aksesuarıyla eksiksiz bir fantezi deneyimi sunar.',
      details: ['Elbise + Kep dahil', 'Kapalı ön bölüm', '%100 Polyester', 'El yıkama önerilir', 'Mini boy'],
      sizes: ['S/M', 'L/XL'], colors: ['Beyaz/Kırmızı'],
      gradient: 'product-gradient-8',
    },
  ],
}

function readStore(): Store {
  try { noStore() } catch { /* build-time context, ignore */ }
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2))
      return DEFAULT_DATA
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    if (!data.banners) data.banners = DEFAULT_BANNERS
    return data
  } catch {
    return DEFAULT_DATA
  }
}

function writeStore(data: Store): void {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

export function getProducts(): Product[] {
  return readStore().products
}

export function getCategories(): Category[] {
  return readStore().categories
}

export function getProductById(id: string): Product | undefined {
  return readStore().products.find((p) => p.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return readStore().categories.find((c) => c.slug === slug)
}

export function getProductsByCategory(slug: string): Product[] {
  return readStore().products.filter((p) => p.categorySlug === slug)
}

export function createProduct(product: Product): Product {
  const store = readStore()
  store.products.push(product)
  writeStore(store)
  return product
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const store = readStore()
  const i = store.products.findIndex((p) => p.id === id)
  if (i === -1) return null
  store.products[i] = { ...store.products[i], ...updates }
  writeStore(store)
  return store.products[i]
}

export function deleteProduct(id: string): boolean {
  const store = readStore()
  const i = store.products.findIndex((p) => p.id === id)
  if (i === -1) return false
  store.products.splice(i, 1)
  writeStore(store)
  return true
}

export function createCategory(category: Category): Category {
  const store = readStore()
  store.categories.push(category)
  writeStore(store)
  return category
}

export function updateCategory(slug: string, updates: Partial<Category>): Category | null {
  const store = readStore()
  const i = store.categories.findIndex((c) => c.slug === slug)
  if (i === -1) return null
  store.categories[i] = { ...store.categories[i], ...updates }
  writeStore(store)
  return store.categories[i]
}

export function deleteCategory(slug: string): boolean {
  const store = readStore()
  const i = store.categories.findIndex((c) => c.slug === slug)
  if (i === -1) return false
  store.categories.splice(i, 1)
  writeStore(store)
  return true
}

export function getBanners(): BannerSettings {
  return readStore().banners
}

export function updateBanners(updates: Partial<BannerSettings>): BannerSettings {
  const store = readStore()
  store.banners = { ...store.banners, ...updates }
  writeStore(store)
  return store.banners
}
