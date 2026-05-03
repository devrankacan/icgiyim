import { headers } from 'next/headers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PopupBanner from '@/components/PopupBanner'
import { getCategories, getPopup } from '@/lib/data'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  headers()
  const categories = getCategories().filter((c) => c.showInNav !== false)
  const popup = getPopup()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar categories={categories} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {popup.enabled && popup.image && (
        <PopupBanner image={popup.image} imageMobile={popup.imageMobile} delay={popup.delay} />
      )}
    </div>
  )
}
