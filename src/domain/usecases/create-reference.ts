export interface CreateReferenceModel {
  author: string
  title: string
  subtitle: string
  edition: string
  place: string
  company: string
  date: string
  reference?: string
}

export interface CreateReference {
  add: (data: CreateReferenceModel) => Promise<string>
}
