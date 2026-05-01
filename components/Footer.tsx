import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(to bottom, #00000000 0px, #1a1a1a 40px)',
      margin: 'auto 0 -8px -8px',
      width: 'calc(100% + 16px)',
    }} className="px-6 pt-16 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="title-manga text-5xl" style={{color: '#ffffff', fontSize: '25px', margin: '55px 0 15px 0'}}>
            漫画リレー
          </div>
        </div>

        {/* リンク */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { href: '/', label: 'トップ' },
            { href: '/recruiting', label: '募集中' },
            { href: '/completed', label: '完成作品' },
            { href: '/create', label: '新規作成' },
            { href: '/history', label: '投稿履歴' },
            { href: '/privacy', label: 'プライバシーポリシー' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="footer-link" style={{color: '#ffffffa0', margin: '0 4px 0 4px'}}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* コピーライト */}
        <p className="text-center text-xs font-bold" style={{ color: '#ffffffa0', marginTop: '5px' }}>
          © {new Date().getFullYear()} 漫画リレー. All rights reserved.
        </p>
      </div>
    </footer>
  )
}