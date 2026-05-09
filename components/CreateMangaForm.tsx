'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { resizeImage } from '@/lib/resizeImage'

export default function CreateMangaForm() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    if (f) setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('ログインが必要です'); setLoading(false); return }

    const resized = await resizeImage(file)
    const path = `${user.id}/${Date.now()}.jpg`
    const { error: uploadError } = await supabase.storage.from('panels').upload(path, resized, {
      contentType: 'image/jpeg'
    })
    if (uploadError) { alert('アップロード失敗'); setLoading(false); return }

    const { data: { publicUrl } } = supabase.storage.from('panels').getPublicUrl(path)

    const { data: manga, error } = await supabase
      .from('mangas')
      .insert({ title, created_by: user.id })
      .select()
      .single()
    if (error || !manga) { alert('作成失敗'); setLoading(false); return }

    const res = await fetch('/api/panels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manga_id: manga.id, panel_order: 1, image_url: publicUrl, user_id: user.id })
    })

    if (res.ok) {
      router.push('/recruiting')
    } else {
      const { error } = await res.json()
      alert(error)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto p-6" style={{width: '100%', maxWidth: '600px', margin: '120px auto 0px'}}>
      <h1 className="title-manga text-5xl mb-6">新しい漫画を作成</h1>
        <div className="p-6 flex flex-col gap-6">
        {/* ルール */}
        <div style={{marginTop: '-15px'}} className="p-4">
          <p className="font-black text-sm tracking-widest mb-3">📋 投稿ルール</p>
          <ul className="flex flex-col gap-2" style={{margin: '-10px 0 20px -20px'}}>
            <li className="text-sm font-bold flex gap-2">・1作品につき1コマのみ投稿できます</li>
            <li className="text-sm font-bold flex gap-2">・画像は16:9の比率で表示されます</li>
            <li className="text-sm font-bold flex gap-2">・不適切(他人を明らかに不快にさせるなど)なコンテンツの投稿は禁止です</li>
            <li className="text-sm font-bold flex gap-2">・投稿した画像は原則で削除出来ません</li>
          </ul>
        </div>
      </div>
      <div className="card-manga p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-black text-sm tracking-widest block mb-1">タイトル</label>
            <input
              type="text"
              placeholder="タイトルを入力..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-manga"
              required
            />
          </div>
          <div>
            <label className="font-black text-sm tracking-widest block mb-1">1コマ目の画像</label>
            {preview && (
              <div className="panel-frame mb-2">
                <img src={preview} alt="プレビュー" />
              </div>
            )}
            <label className="btn-manga-outline block text-center cursor-pointer">
              {file ? `📁 ${file.name}` : '画像を選択'}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" required />
            </label>
          </div>
          <div style={{height:'10px'}}></div>
          <button type="submit" disabled={loading || !title || !file} className="btn-manga">
            {loading ? '投稿中...' : '1コマ目を投稿する'}
          </button>
        </form>
      </div>
      <div style={{height:'100px'}}></div>
    </div>
  )
}