'use client'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function NavBar() {
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 30) {
        setScrolled(true)   // 下スクロール → headerを隠す
      } else {
        setScrolled(false)  // 上スクロール → 全表示
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      <div style={{
        position: 'fixed',
        top: '8px',
        left: '8px',
        right: '8px',
        zIndex: 100,
        height:  scrolled && !menuOpen ? '30px' : '80px',
        overflow: 'hidden',
        transition: '0.3s ease',
        borderRadius: '15px',
        boxShadow: '0 4px 15px #00000034',
        backgroundColor: '#ffffff83',
        backdropFilter: 'blur(5px) contrast(0.4) brightness(1.4) saturate(2.0)',
        fontFamily: "Noto Sans JP",
      }}>

        {/* ヘッダー */}
        <header style={{
          height: '50px',
          position: 'relative',
          top:  scrolled && !menuOpen ? '-50px' : '0',
          transition: '0.3s ease',
        }} className="px-4 py-3 flex items-center justify-between">
          <a href="../../../">
            <h2 style={{margin: '0 0 0 10px', fontFamily: "Noto Sans JP", fontWeight:800}}>
              漫画リレー <span style={{ fontSize: '15px', color: '#000000a6' }}>(仮)</span>
            </h2>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 w-10 h-10"
            aria-label="メニュー"
            style={{ height: '40px', margin: '0 10px 0 0', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ display: 'block', width: 24, height: 3, borderRadius: '9px', background: '#0a0a0a', position: 'relative', top: '-4px', transition: 'transform 0.2s, opacity 0.2s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 3, borderRadius: '9px', background: '#0a0a0a', transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 3, borderRadius: '9px', background: '#0a0a0a', position: 'relative', top: '4px', transition: 'transform 0.2s, opacity 0.2s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </header>

        {/* タブナビゲーション */}
        <nav style={{position: 'relative', top:  scrolled && !menuOpen ? '-50px' : '0',transition: '0.3s ease'}}
          className="flex">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link key={tab.href} href={tab.href} className="flex-1 text-center py-3 font-bold text-sm tracking-widest transition-colors"
                style={{
                  textDecoration: 'none',
                  borderBottom: isActive ? '3px solid #0a0a0a' : '3px solid transparent',
                  paddingTop: '3px',
                  fontWeight: "500"
                }}>
                {tab.label}
              </Link>
            )
          })}
        </nav>

      </div>

      {/* ハンバーガーメニュー */}
      <div style={{
        position: 'fixed', top: 90, right: 0, bottom: 0, zIndex: 110, width: menuOpen ? '100vw' : '0',fontFamily: "Noto Sans JP",fontWeight: "500"
      }} onClick={() => setMenuOpen(false)}>
        <div style={{
          transform: menuOpen ? 'translateX(0px)' : 'translateX(280px)',
          transition: '0.4s cubic-bezier(0.48, 0.12, 0.09, 1)',
          position: 'fixed', bottom: '12px', right: '8px', width: 260,
          height: 'calc(100% - 108px)',
          borderRadius: '15px',
          boxShadow: '0 4px 15px #00000034',
          backgroundColor: '#ffffff83',
          backdropFilter: 'blur(5px) contrast(0.4) brightness(1.4) saturate(2.0)',
          padding: '20px 24px 24px',
        }} onClick={(e) => e.stopPropagation()}>

          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <div style={{ height: '10px' }}></div>
                <p className="text-xs text-gray-500 font-bold break-all">{user.email}</p>
                <Link href="/history" onClick={() => setMenuOpen(false)}>
                  <button className="btn-manga-outline w-full">投稿履歴</button>
                </Link>
                <div style={{ height: '10px' }}></div>
                <button onClick={handleLogout} className="btn-manga w-full">
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-600">ログインすると投稿できます</p>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="btn-manga w-full">ログイン･サインイン</button>
                </Link>
              </>
            )}
          </div>
          <div className="menuBttomLink" style={{ position: 'absolute', bottom: '20px', fontSize: '16px', lineHeight: '35px' }}>
            {[
              { href:'/rule', label:'利用ルール', target:''},
              { href:'/privacy', label:'プライバシーポリシー', target:''},
              { href:'https://x.com/tororo___kombu', label:'開発者のX', target:'_brank'},
              { href:'https://github.com/tororo-kombu/manga-relay', label:'Github', target:'_brank'},
            ].map((qa, i) => (
              <div key={i}>
                <a href={qa.href} target={qa.target}>{qa.label}</a><br/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}