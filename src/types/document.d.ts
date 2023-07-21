export type Document<T> = T & {
  _id: string
  created_at: Date
  updated_at: Date
}
