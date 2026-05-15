import Link from 'next/link'
import { endianness } from 'os'

export const metadata = {
    title: '漫画リレー | 4コマ漫画をリレー形式で作ろう･リレー漫画',
    description: '4コマ漫画をリレー形式で作るためのサービス「漫画リレー」の公式サイトです。1コマ目を投稿して、他のユーザーと一緒に物語を完成させましょう！',
  };

export default function Home() {
  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '120px auto 0 auto'}}>
      {/* ヒーローセクション */}
      <section style={{}}
        className="px-6 py-20 text-center">
        <h1 className="title-manga text-7xl md:text-9xl text-white mb-4">
          漫画リレー <span style={{ fontSize: '15px', color: '#000000a6' }}>(仮)</span>
        </h1>
        <p className="text-white font-black text-lg md:text-2xl tracking-widest mb-8">
          4コマ漫画をみんなで作るぞ！
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
              <p className="text-gray-600 font-bold leading-relaxed" style={{fontSize:'15px'}}>
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
              <p className="text-gray-600 font-bold leading-relaxed" style={{fontSize:'15px'}}>
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
              <p className="text-gray-600 font-bold leading-relaxed" style={{fontSize:'15px'}}>
                4人のユーザーによって4コマが揃うと作品が完成。完成作品ページに掲載され、誰でも閲覧できるようになります。
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ルール */}
      <section style={{ border: '3px solid #0a0a0a', background: '#f9f9f9', padding: '0 20px 20px 20px', marginTop:'30px', position: 'relative' }}
        className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="title-manga text-4xl text-center mb-8">RULES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🎨', text: '1人につき1作品に1コマのみ投稿できます' },
              { icon: '📐', text: '画像は16:9の比率で表示されます' },
              { icon: '🚫', text: '非常識なコンテンツの投稿は禁止です' },
              { icon: '🔓', text: '投稿した画像は全ユーザーに公開されます' },
            ].map((rule, i) => (
              <div key={i} className="card-manga p-4 flex gap-3 items-center">
                <span className="text-2xl">{rule.icon}</span>
                <p className="font-bold text-sm">{rule.text}</p>
              </div>
            ))}
          </div>
          <br />
          <a href="/rule" style={{position:'absolute',right:'15px',bottom:'15px'}} rel="noopener noreferrer" className="text-blue-500 hover:underline">
            詳細な利用ルールはこちら＞
          </a>
        </div>
      </section>

      <div style={{}}>
        <h2 className="title-manga text-4xl mb-8" style={{color:'#0a0a0a',fontSize:'25px',margin: '40px 0 5px 0'}}>一人Q&A</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { question: '絵が下手でもいいですか', answer: 'もちろんOKです。' },
            { question: 'AI生成による画像を投稿してもいいですか', answer: 'ルールを守っていればOKです。' },
            { question: '漫画形式の画像でなくても良いですか', answer: '良いと思います。' },
          ].map((qa, i) => (
            <div key={i} className="card-manga p-4">
              <h3 className="font-black text-lg mb-2">Q | {qa.question}</h3>
              <p className="text-gray-600 font-bold text-sm" style={{margin: '-5px 0 10px 20px'}}>{qa.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{height:'80px'}}></div>
    </div>
  )
}