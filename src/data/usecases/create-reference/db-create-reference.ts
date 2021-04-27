import { CreateReference, CreateReferenceModel } from '../../../domain/usecases/create-reference'
import { Maker } from '../../protocols/maker'

export class DbCreateReference implements CreateReference {
  private readonly maker: Maker
  constructor (maker: Maker) {
    this.maker = maker
  }

  async add (data: CreateReferenceModel): Promise<string> {
    await this.maker.make(data)
    return await new Promise(resolve => resolve(''))
  }
}
