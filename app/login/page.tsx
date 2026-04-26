'use client'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
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
          </svg>
          Googleでログイン
        </button>
      </div>
    </div>
  )
}