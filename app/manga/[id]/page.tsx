export const revalidate = 0
import { supabase } from '@/lib/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AddPanelForm from '@/components/AddPanelForm'
import PanelModal from '@/components/PanelModal'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: manga } = await supabase
    .from('mangas')
    .select('title, is_deleted')
    .eq('id', id)
    .single()

  return {
    title: '漫画リレー | 作品 : ' + (manga?.title ?? '作品が見つかりません'),
    ...(manga?.is_deleted && {
      robots: {
        index: false,
      }
    })
  }
}

export default async function MangaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const cookieStore = await cookies()
  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )
  const { data: { user } } = await supabaseServer.auth.getUser()

  const { data: manga } = await supabase
    .from('mangas')
    .select('*, panels(*)')
    .eq('id', id)
    .single()

  if (!manga) return (
    <div className="max-w-2xl mx-auto p-6 text-center" style={{margin: '100px'}}>
      <p className="title-manga text-4xl mb-4">NOT FOUND</p>
      <Link href="/recruiting"><button className="btn-manga">一覧に戻る</button></Link>
    </div>
  )

  // 投稿済みチェック
  let alreadyPosted = false
  if (user) {
    const { data: history } = await supabase
      .from('user_panel_history')
      .select('id')
      .eq('user_id', user.id)
      .eq('manga_id', id)
      .single()
    alreadyPosted = !!history
  }

  const panels = manga.panels.sort((a: any, b: any) => a.panel_order - b.panel_order)
  const nextOrder = panels.length + 1
  const isCompleted = manga.status === 'completed'

  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '100px auto 0 auto'}}>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6" style={{display:'block', textAlign:'center'}}>
          <h1 className="title-manga text-4xl">{manga.title}</h1>
        </div>

        <div className="card-manga p-4 mb-6">
          <div className="grid grid-cols-1 gap-2">
            {[1, 2, 3, 4].map((n) => {
              const panel = panels.find((p: any) => p.panel_order === n)
              return (
                <div key={n} className="relative" style={{marginBottom:'5px'}}>
                  <div className="panel-frame">
                    {panel ? (
                      <img src={panel.image_url} alt={`コマ${n}`} />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                        <span className="title-manga text-6xl text-gray-200">{n}</span>
                        <span className="text-xs text-gray-400 font-bold tracking-widest">EMPTY</span>
                      </div>
                    )}
                  </div>
                  <span className="badge-manga absolute top-2 left-2 z-10">{n}</span>
                </div>
              )
            })}
          </div>
        </div>

        {isCompleted && (
          <div style={{position:'sticky', bottom:'10px', zIndex:10, width:'100%',display:'flex', gap: '5px',}}>
            <div className='btn-manga' style={{width:'100%',backgroundColor: '#0a0a0a', cursor: 'auto',fontSize: '13px',textAlign: 'center',opacity: '0.5',}}>この作品は完成済みです</div>
            <LikeButton mangaId={manga.id} initialLikes={manga.likes} />
          </div>
        )}

        {isCompleted ? (
          <div className="card-manga p-6 text-center">
            <p className="title-manga text-3xl mb-2">COMPLETE!</p>
            <p className="text-sm font-bold text-gray-600 mb-4">この作品は完成しました</p>
            <Link href="/recruiting"><button className="btn-manga">募集中の作品を見る</button></Link>
          </div>
          
        ) : (
          <div style={{position:'sticky', bottom:'10px', zIndex:10, display:'flex', gap:'5px',}}>
            <PanelModal mangaId={manga.id} panelOrder={nextOrder} />
            <LikeButton mangaId={manga.id} initialLikes={manga.likes} />
          </div>
        )}
      </div>

      <div id='bottom' style={{height:'80px'}}></div>
    </div>
  )
}