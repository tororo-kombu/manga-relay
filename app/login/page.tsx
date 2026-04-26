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
    <div className="main" style={{ width: '100%', maxWidth: '600px', margin: '100px auto 0 auto'}}>
      <div className="max-w-sm mx-auto mt-20 p-6">
        <div className="card-manga p-6 flex flex-col gap-4">
          <h1 className="title-manga text-5xl">
            新規登録･ログイン
          </h1>
          <button onClick={handleGoogleLogin} className="btn-manga flex items-center justify-center gap-3" style={{fontSize:'18px',height:'50px',marginTop:'10px'}}>
            Googleでログイン
          </button>
        </div>
      </div>
    </div>
  )
}