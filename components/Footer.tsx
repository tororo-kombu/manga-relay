import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#00000000',
      width: '100%',
    }} className="px-6 pt-16 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="title-manga text-5xl" style={{color: '#00000075', fontSize: '25px', margin: '0 0 15px 0'}}>
            漫画リレー
          </div>
        </div>

        {/* リンク */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { href: '/', label: 'トップ' },
            { href: '/login', label: 'ログイン' },
            { href: '/rule', label: '利用ルール' },
            { href: '/privacy', label: 'プライバシーポリシー' },
            { href: 'https://x.com/tororo___kombu', label: '開発者のX' },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="footer-link" style={{color: '#00000075', margin: '0 4px 0 4px'}}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* コピーライト */}
        <p className="text-center text-xs font-bold" style={{ color: '#00000075', marginTop: '5px' ,fontSize: '14px'}}>
          © {new Date().getFullYear()} 漫画リレー. All rights reserved.
        </p>
      </div>
    </footer>
  )
}