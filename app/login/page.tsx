'use client'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `https://manga-relay-git-main-gon-maros-projects.vercel.app/auth/callback`,
      },
    })
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6">
      <h1 className="title-manga text-5xl mb-6 text-center">LOGIN</h1>
      <div className="card-manga p-6 flex flex-col gap-4">
        <p className="text-sm font-bold text-center text-gray-600">
          Googleアカウントでログイン
        </p>
        <button onClick={handleGoogleLogin} className="btn-manga flex items-center justify-center gap-3">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#fff" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 37 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-7.7 19.7-20 0-1.3-.1-2.7-.2-3z"/>
          </svg>
          Googleでログイン
        </button>
      </div>
    </div>
  )
}