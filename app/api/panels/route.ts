import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { manga_id, panel_order, image_url, user_id } = await req.json()

  if (!user_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 漫画の状態確認
  const { data: manga } = await supabase
    .from('mangas')
    .select('status')
    .eq('id', manga_id)
    .single()

  if (!manga || manga.status === 'completed') {
    return NextResponse.json({ error: '既に完成した作品です' }, { status: 400 })
  }

  // 同一作品への投稿済みチェック
  const { data: existing } = await supabase
    .from('user_panel_history')
    .select('id')
    .eq('user_id', user_id)
    .eq('manga_id', manga_id)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'この作品にはすでにコマを投稿済みです' }, { status: 400 })
  }

  // コマを追加
  const { error } = await supabase.from('panels').insert({
    manga_id, panel_order, image_url, created_by: user_id
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // 履歴を保存
  await supabase.from('user_panel_history').insert({
    user_id, manga_id, panel_order
  })

  // 4コマ揃ったら完成に
  const { count } = await supabase
    .from('panels')
    .select('*', { count: 'exact', head: true })
    .eq('manga_id', manga_id)

  if (count === 4) {
    await supabase.from('mangas').update({ status: 'completed' }).eq('id', manga_id)
    return NextResponse.json({ success: true, completed: true })
  }

  return NextResponse.json({ success: true, completed: false })
}