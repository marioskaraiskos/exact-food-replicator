import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

interface FoodItem {
  id: number
  name: string
  description: string
  user_id: string
  created_at: string
}

export function useFoodItems(userId: string | null) {
  const [items, setItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setItems([])
      setLoading(false)
      return
    }

    async function fetchItems() {
      setLoading(true)
      const { data, error } = await supabase
        .from('exact_food_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        setItems([])
      } else {
        setItems(data ?? [])
      }
      setLoading(false)
    }

    fetchItems()
  }, [userId])

  return { items, loading }
}
