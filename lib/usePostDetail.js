import { useState, useEffect } from 'react'
import { useI18n } from './i18nContext'

export const usePostDetail = (postId) => {
  const { locale } = useI18n()
  const [postDetail, setPostDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPostDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        // Try to load content in current locale
        let response = await fetch(`/locales/${locale}/posts-detail.json`)
        
        if (!response.ok) {
          // Fallback to Spanish if current locale fails
          response = await fetch('/locales/es/posts-detail.json')
        }

        if (!response.ok) {
          throw new Error(`Failed to load posts content: ${response.status}`)
        }

        const data = await response.json()
        const post = data[postId]

        if (!post) {
          throw new Error(`Post ${postId} not found`)
        }

        setPostDetail(post)
      } catch (err) {
        console.error('Error loading post detail:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      loadPostDetail()
    }
  }, [postId, locale])

  return { postDetail, loading, error }
}