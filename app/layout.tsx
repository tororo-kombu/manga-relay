import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata = {
  title: '漫画リレー',
  description: 'みんなで繋ぐ、4コマ漫画。',
  verification: {
    google: 'YwdHxIYnKwheY2EPSQ2XH7u_wHdURqqL7cVOS9--zgw',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}