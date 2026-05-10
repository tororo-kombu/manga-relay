'use client'
import { useState, useEffect } from 'react'

export default function LikeButton({ mangaId, initialLikes }: { mangaId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('liked_mangas') ?? '[]')
    setLiked(likedItems.includes(mangaId))
  }, [mangaId])

  const handleLike = async () => {
    if (liked || loading) return
    setLoading(true)

    const res = await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manga_id: mangaId })
    })

    if (res.ok) {
      const { likes: newLikes } = await res.json()
      setLikes(newLikes)
      setLiked(true)
      const likedItems = JSON.parse(localStorage.getItem('liked_mangas') ?? '[]')
      localStorage.setItem('liked_mangas', JSON.stringify([...likedItems, mangaId]))
    }
    setLoading(false)
  }

  return (
    <div className="card-manga p-6 flex justify-between">
        
      <button
        onClick={handleLike}
        className="btn-manga"
        style={liked ? { background: '#ff4775', cursor: 'not-allowed', minWidth: '150px' } : {background: '#efece7',color: '#0a0a0a',minWidth: '150px'}}
      >
        <span style={{ fontSize: '1.2rem' }}>{liked ? '♥' : <span style={{ fontSize: '14px' }}>♡</span>}</span>
        いいね
        <span className="">　{likes}件</span>
      </button>
    </div>
  )
}