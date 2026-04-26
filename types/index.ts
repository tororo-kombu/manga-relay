export type MangaStatus = 'recruiting' | 'completed'

export interface Manga {
  id: string
  title: string
  created_by: string
  status: MangaStatus
  created_at: string
  panels?: Panel[]
}

export interface Panel {
  id: string
  manga_id: string
  panel_order: number
  image_url: string
  created_by: string
  created_at: string
}