import { CreateReferenceModel } from '../../domain/usecases/create-reference'

export interface CreateReferenceRepository {
  add: (referenceData: CreateReferenceModel) => Promise<string>
}
