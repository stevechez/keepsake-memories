import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadPetPhoto(file: File, petName: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${petName}-${Math.random()}.${fileExt}`
  const filePath = `pet-memories/${fileName}`

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file)

  if (error) throw error
  
  // Get the public URL to send to Gemini
  const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(filePath)
  return publicUrl
}
