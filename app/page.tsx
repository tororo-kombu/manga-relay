import Link from 'next/link'

export default function Home() {
  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '120px auto 0 auto'}}>
      {/* ヒーローセクション */}
      <section style={{}}
        className="px-6 py-20 text-center">
        <h1 className="title-manga text-7xl md:text-9xl text-white mb-4">
          漫画リレー
        </h1>
        <p className="text-white font-black text-lg md:text-2xl tracking-widest mb-8">
          みんなで繋ぐ、4コマ漫画。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/recruiting">
            <button className="btn-manga px-8 py-3 text-lg"
              style={{ background: '#000000', color: '#ffffff',width:'300px'}}>
              作品を見にいく
            </button>
          </Link>
          <Link href="/login">
            <button className="btn-manga px-8 py-3 text-lg"
              style={{ background: '#ffffff', color: '#000000',width:'300px',marginTop:'5px' }}>
              Googleでログイン
            </button>
          </Link>
        </div>
      </section>

      {/* サービス説明 */}
      <section className="max-w-3xl mx-auto px-6 py-16" style={{marginTop:'30px'}}>
        <div className="flex flex-col gap-6">

          {/* ステップ1 */}
          <div className="card-manga p-6 flex gap-6 items-start">
            <div style={{ background: '#0a0a0a', color: '#ffffff', minWidth: 56, height: 56, border: '3px solid #0a0a0a',margin: '0 15px 0 0' }}
              className="title-manga text-3xl flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="font-black text-xl mb-2" style={{margin:"14px 0 -5px 0"}}>1コマ目を投稿する</h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                あなたのアイデアで物語をスタート。タイトルをつけて1コマ目の画像を投稿すると、あなたの作品が募集中の一覧に表示されます。
              </p>
            </div>
          </div>

          {/* ステップ2 */}
          <div className="card-manga p-6 flex gap-6 items-start">
            <div style={{ background: '#0a0a0a', color: '#ffffff', minWidth: 56, height: 56, border: '3px solid #0a0a0a',margin: '0 15px 0 0' }}
              className="title-manga text-3xl flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="font-black text-xl mb-2" style={{margin:"14px 0 -5px 0"}}>続きを他のユーザーが描く</h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                募集中の作品に、他のユーザーが2・3コマ目を投稿していきます。1人1作品につき1コマまで投稿できます。どんな展開になるかはお楽しみ！
              </p>
            </div>
          </div>

          {/* ステップ3 */}
          <div className="card-manga p-6 flex gap-6 items-start">
            <div style={{ background: '#0a0a0a', color: '#ffffff', minWidth: 56, height: 56, border: '3px solid #0a0a0a',margin: '0 15px 0 0' }}
              className="title-manga text-3xl flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="font-black text-xl mb-2" style={{margin:"14px 0 -5px 0"}}>4コマ揃ったら完成！</h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                4人のユーザーによって4コマが揃うと作品が完成。完成作品ページに掲載され、誰でも閲覧できるようになります。
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ルール */}
      <section style={{ border: '3px solid #0a0a0a', background: '#f9f9f9', padding: '0 20px 20px 20px', marginTop:'30px' }}
        className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="title-manga text-4xl text-center mb-8">RULES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🎨', text: '1人につき1作品に1コマのみ投稿できます' },
              { icon: '📐', text: '画像は16:9の比率で表示されます' },
              { icon: '🚫', text: '不適切なコンテンツの投稿は禁止です' },
              { icon: '🔓', text: '投稿した画像は全ユーザーに公開されます' },
            ].map((rule, i) => (
              <div key={i} className="card-manga p-4 flex gap-3 items-center">
                <span className="text-2xl">{rule.icon}</span>
                <p className="font-bold text-sm">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{height:'80px'}}></div>
    </div>
  )
}