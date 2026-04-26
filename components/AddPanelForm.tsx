'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { resizeImage } from '@/lib/resizeImage'

export default function AddPanelForm({ mangaId, panelOrder }: { mangaId: string; panelOrder: number }) {
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
    if (!file) return
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

    const res = await fetch('/api/panels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manga_id: mangaId, panel_order: panelOrder, image_url: publicUrl, user_id: user.id })
    })

    const result = await res.json()
    if (res.ok) {
      router.push(result.completed ? '/completed' : `/manga/${mangaId}`)
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="card-manga p-6">
      <h2 className="title-manga text-2xl mb-4">{panelOrder}コマ目を投稿</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {preview && (
          <div className="panel-frame" style={{borderWidth: '3px 3px 0 3px'}}>
            <img src={preview} alt="プレビュー" />
          </div>
        )}
        <label className="btn-manga-outline text-center cursor-pointer">
          {file ? `📁 ${file.name}` : '画像を選択'}
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" required />
        </label>
        <button type="submit" disabled={loading || !file} className="btn-manga" style={{marginTop: '10px'}}>
          {loading ? '投稿中...' : `${panelOrder}コマ目を投稿する`}
        </button>
      </form>
    </div>
  )
}