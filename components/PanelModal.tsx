'use client'
import { useState } from 'react'
import AddPanelForm from './AddPanelForm'

export default function PanelModal({ mangaId, panelOrder }: { mangaId: string; panelOrder: number }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="btn-manga w-full py-3 text-lg" onClick={() => setOpen(true)} style={{position: 'sticky', bottom: '15px', zIndex: 10}}>
        {panelOrder}コマ目を投稿する
      </button>

      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backdropFilter: 'blur(3px)brightness(0.9) saturate(1.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              boxShadow: '0 4px 15px #00000034',
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: 480,
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '15px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div style={{padding: '10px 0 3px 0',}}
              className="px-6 py-4 flex items-center justify-between">
              <span className="title-manga text-2xl text-white" style={{fontSize: '24px'}}> {panelOrder}コマ目を投稿</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white font-black text-2xl leading-none"
                style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px'}}
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* ルール */}
              <div style={{}} className="p-4">
                <p className="font-black text-sm tracking-widest mb-3">📋 投稿ルール</p>
                <ul className="flex flex-col gap-2" style={{margin: '-10px 0 20px -20px'}}>
                    <li className="text-sm font-bold flex gap-2">・1作品につき1コマのみ投稿できます</li>
                    <li className="text-sm font-bold flex gap-2">・画像は16:9の比率で表示されます</li>
                    <li className="text-sm font-bold flex gap-2">・不適切(他人を明らかに不快にさせるなど)なコンテンツの投稿は禁止です</li>
                    <li className="text-sm font-bold flex gap-2">・投稿した画像は原則で削除出来ません</li>
                </ul>
              </div>

              {/* フォーム */}
              <AddPanelForm mangaId={mangaId} panelOrder={panelOrder} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}