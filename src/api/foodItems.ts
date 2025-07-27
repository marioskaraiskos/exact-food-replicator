import { supabase } from '../supabaseClient'

export async function addFoodItem(
  name: string,
  description: string,
  userId: string
) {
  const { data, error } = await supabase.from('exact_food_items').insert([
    {
      name,
      description,
      user_id: userId,
    },
  ])
  if (error) throw error
  return data
}
