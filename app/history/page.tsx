import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { relative } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function HistoryPage() {
  const cookieStore = await cookies()
  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )
  const { data: { user } } = await supabaseServer.auth.getUser()
  if (!user) redirect('/login')

  const { data: history } = await supabase
    .from('user_panel_history')
    .select('*, mangas(id, title, status, is_deleted, panels(panel_order, image_url))')
    .eq('user_id', user.id)
    .eq('mangas.is_deleted', false)
    .order('created_at', { ascending: false })

  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '120px auto 0 auto'}}>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="title-manga text-5xl">コマの投稿履歴</h1>

        {(!history || history.length === 0) && (
          <div className="card-manga p-12 text-center">
            <p className="font-black text-xl mb-2">投稿履歴がありません</p>
            <Link href="/recruiting"><button className="btn-manga mt-4">作品を探す</button></Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {history?.filter((h: any) => h.mangas !== null).map((h: any) => {
            const manga = h.mangas
            const panels = manga.panels.sort((a: any, b: any) => a.panel_order - b.panel_order)
            const myPanel = panels.find((p: any) => p.panel_order === h.panel_order)

            return (
              <Link key={h.id} href={`/manga/${manga.id}`}>
                <div className="card-manga p-4 cursor-pointer" style={{position:'relative',marginTop:'20px'}}>
                  <div className="flex items-center justify-between mb-3" style={{display:'block'}}>
                    <h2 className="font-black text-lg" style={{margin:'0'}}>{manga.title}</h2>
                    <p className="text-xs text-gray-400 font-bold mt-2" style={{margin:'0'}}>
                      {new Date(h.created_at).toLocaleDateString('ja-JP')}
                    </p>
                    <div className="flex gap-2">
                      <span className="badge-manga" style={{position:'absolute',top:'60px',left:'0',zIndex:'20'}}>{h.panel_order}コマ目を投稿</span>
                      {manga.status === 'completed' && (
                        <span className="badge-manga" style={{ background: '#555' }}>完成</span>
                      )}
                    </div>
                  </div>
                  {myPanel && (
                    <div className="panel-frame">
                      <img src={myPanel.image_url} alt={`${h.panel_order}コマ目`} />
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}