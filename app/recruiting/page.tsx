import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function RecruitingPage() {
  const { data: mangas , count} = await supabase
    .from('mangas')
    .select('*, panels(panel_order, image_url)')
    .eq('status', 'recruiting')
    .order('created_at', { ascending: false })

  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '100px auto 0 auto'}}>

      <div className="flex items-center gap-4 mb-6">
        <h1 className="title-manga text-5xl">コマを募集中の漫画</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {mangas?.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-black text-xl mb-4">まだ作品がありません</p>
            <Link href="/create">
              <button className="btn-manga">最初の1コマを投稿する</button>
            </Link>
          </div>
        )}

        <div className="flex flex-col">
          {mangas?.map((manga: any) => {
            const panels = manga.panels.sort((a: any, b: any) => a.panel_order - b.panel_order)
            const remaining = 4 - panels.length
            const firstPanel = panels[0]

            return (
              <Link key={manga.id} href={`/manga/${manga.id}`} style={{textDecoration:'none'}}>
                <div className="relative cursor-pointer hover:bg-gray-50 transition-colors">
                  {/* タイトル */}
                  <div className="px-4 py-2">
                    <span className="font-black text-base" style={{fontSize:'25px',color:'#000'}}>{manga.title}</span>
                  </div>
                  {/* メインコマ画像（1コマ目） */}
                  <div className="panel-frame" style={{borderWidth: '3px', aspectRatio: '16/9' }}>
                    {firstPanel ? (
                      <img src={firstPanel.image_url} alt={`${manga.title} 1コマ目`} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-300 font-black text-4xl">?</span>
                      </div>
                    )}
                  </div>
                  {/* 残りコマ数バッジ */}
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    background: '#0a0a0a', color: '#fff',
                    fontWeight: 900, fontSize: '0.95rem',
                    padding: '6px 16px',
                    letterSpacing: '0.05em'
                  }}>
                    残り{remaining}コマ
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <div style={{height:'100px'}}></div>
    </div>
  )
}