export const revalidate = 0
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const metadata = {
    title: '漫画リレー | 完成作品の一覧',
  };

const PAGE_SIZE = 20

export default async function CompletedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = parseInt(page ?? '1')
  const from = 0
  const to = currentPage * PAGE_SIZE - 1

  const { data: mangas, count } = await supabase
    .from('mangas')
    .select('id, title, panels(panel_order, image_url)', { count: 'exact' })
    .eq('status', 'completed')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .range(from, to)

  const hasMore = count ? to + 1 < count : false

  return (
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '100px auto 0 auto'}}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="title-manga text-5xl">完成作品の一覧</h1>
          <span className="badge-manga text-lg" style={{position: 'relative',left: '10px'}}>{count ?? 0}作品</span>
        </div>


        <div className="grid grid-cols-2 gap-4" style={{display:'block'}}>
          {mangas?.map((manga: any) => {
            const firstPanel = manga.panels
              .sort((a: any, b: any) => a.panel_order - b.panel_order)[0]

            return (
              <Link key={manga.id} href={`/manga/${manga.id}`}>
                <div className="card-manga cursor-pointer overflow-hidden">
                  <div className="px-3 py-2" style={{margin:'10px 0 0 0', fontSize:'25px',textDecoration:'none'}}>
                    <span className="font-black text-sm truncate">{manga.title}</span>
                  </div>
                  <div className="panel-frame" style={{ border: '3px solid #0a0a0a' }}>
                    {firstPanel ? (
                      <img src={firstPanel.image_url} alt={manga.title} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-300 font-black text-4xl">?</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Link href={`/completed?page=${currentPage + 1}`}>
              <button className="btn-manga px-8">続きを表示</button>
            </Link>
          </div>
        )}
      </div>
      <div style={{height:'100px'}}></div>
    </div>
  )
}