import { headers } from 'next/headers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getCategories } from '@/lib/data'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  headers()
  const categories = getCategories()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar categories={categories} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
