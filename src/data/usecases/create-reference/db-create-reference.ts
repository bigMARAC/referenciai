import { CreateReference, CreateReferenceModel } from '../../../domain/usecases/create-reference'
import { Maker, CreateReferenceRepository } from './db-create-reference-protocols'

export class DbCreateReference implements CreateReference {
  private readonly maker: Maker
  private readonly createReferenceRepository: CreateReferenceRepository
  constructor (maker: Maker, createReferenceRepository: CreateReferenceRepository) {
    this.maker = maker
    this.createReferenceRepository = createReferenceRepository
  }

  async add (referenceData: CreateReferenceModel): Promise<string> {
    const reference = await this.maker.make(referenceData)
    await this.createReferenceRepository.add(Object.assign({}, referenceData, { reference }))
    return await new Promise(resolve => resolve(reference))
  }
}
