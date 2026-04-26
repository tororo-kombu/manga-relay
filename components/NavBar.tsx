'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function NavBar() {
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push('/login')
  }

  const tabs = [
    { href: '/recruiting', label: '募集中' },
    { href: '/completed', label: '完成作品' },
    { href: '/create', label: '新規漫画' },
  ]

  return (
    <>
      <div style={{position: 'fixed', top: '0', left: '0', zIndex: '100', width: '100%'}}>

        {/* ヘッダー */}
        <header style={{ borderBottom: '3px solid #0a0a0a', background: '#efece7', height: '50px'}}
          className="px-4 py-3 flex items-center justify-between">
          <h2 style={{margin: 'auto', position: 'relative', left: '18px' }}>
            漫画リレー
          </h2>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 w-10 h-10"
            aria-label="メニュー"
            style={{height: '40px',margin: '0 5px 0 0',background: 'none',border: 'none',cursor: 'pointer'}}
          >
            <span style={{display: 'block', width: 24, height: 3, background: '#0a0a0a',position: 'relative',top: '-4px',transition: 'transform 0.2s, opacity 0.2s',transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none'}} />
            <span style={{display: 'block', width: 24, height: 3, background: '#0a0a0a',transition: 'opacity 0.2s',opacity: menuOpen ? 0 : 1}} />
            <span style={{display: 'block', width: 24, height: 3, background: '#0a0a0a',position: 'relative',top: '4px',transition: 'transform 0.2s, opacity 0.2s',transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'}} />
          </button>
        </header>

        {/* タブナビゲーション */}
        <nav style={{ borderBottom: '3px solid #0a0a0a', background: '#00000000'}}
          className="flex">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link key={tab.href} href={tab.href} className="flex-1 text-center py-3 font-bold text-sm tracking-widest transition-colors"
                style={{
                  background: isActive ? '#0a0a0a' : '#efece7',
                  color: isActive ? '#fff' : '#0a0a0a',
                  textDecoration: 'none'
                }}>
                {tab.label}
              </Link>
            )
          })}
        </nav>

      </div>

      {/* ハンバーガーメニュー */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50,
          background: '#7a6a5038',
          backdropFilter: 'blur(3px)',
        }} onClick={() => setMenuOpen(false)}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: 260,
            height: '100%', background: '#efece7',
            borderLeft: '3px solid #0a0a0a',
            padding: '80px 24px 24px'
          }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMenuOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, fontSize: 24, fontWeight: 900, lineHeight: 1 }}>
              ✕
            </button>
            <div className="flex flex-col gap-4">
                {user ? (
                  <>
                    <div style={{height: '10px'}}></div>
                    <p className="text-xs text-gray-500 font-bold break-all">{user.email}</p>
                    <Link href="/history" onClick={() => setMenuOpen(false)}>
                      <button className="btn-manga-outline w-full">投稿履歴</button>
                    </Link>
                    <div style={{height: '10px'}}></div>
                    <button onClick={handleLogout} className="btn-manga w-full">
                      ログアウト
                    </button>
                  </>
                ) : (
                <>
                  <p className="text-sm font-bold text-gray-600">ログインすると投稿できます</p>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button className="btn-manga w-full">ログイン</button>
                  </Link>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button className="btn-manga-outline w-full">新規登録</button>
                  </Link>
                </>
              )}
            </div>
            <div className="menuBttomLink" style={{position: 'absolute', bottom: '20px', fontSize: '16px',lineHeight: '35px'}}>
              <a href="https://github.com/tororo-kombu/manga-relay/blob/main/README.md#%E6%BC%AB%E7%94%BB%E3%83%AA%E3%83%AC%E3%83%BC-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">漫画リレーについて</a><br/>
              <a href="https://github.com/tororo-kombu/manga-relay/blob/main/README.md#%EF%B8%8F%E5%88%A9%E7%94%A8%E4%B8%8A%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%AB">利用ルール</a><br/>
              <a href="">公式X</a><br/>
              <a href="https://github.com/tororo-kombu/manga-relay/tree/main">GitHub</a><br/>
              <a href="">プライバシーポリシー</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}