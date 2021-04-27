export interface CreateReferenceModel {
  author: string
  title: string
  subtitle: string
  edition: string
  place: string
  company: string
  date: string
}

export interface CreateReference {
  add: (account: CreateReferenceModel) => string
}
