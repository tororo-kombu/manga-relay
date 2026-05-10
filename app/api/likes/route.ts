import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { manga_id } = await req.json()

  const { data, error } = await supabase.rpc('increment_likes', { manga_id })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ likes: data })
}