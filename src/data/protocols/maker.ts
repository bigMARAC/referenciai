import { CreateReferenceModel } from '../../domain/usecases/create-reference'

export interface Maker {
  make: (data: CreateReferenceModel) => Promise<string>
}
