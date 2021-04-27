import { CreateReferenceModel } from '../../../domain/usecases/create-reference'
import { Maker } from '../../protocols/maker'
import { DbCreateReference } from './db-create-reference'

interface SutTypes {
  sut: DbCreateReference
  makerStub: Maker
}

const makeMaker = (): Maker => {
  class MakerStub implements Maker {
    async make (data: CreateReferenceModel): Promise<string> {
      return await new Promise(resolve => resolve('reference'))
    }
  }
  return new MakerStub()
}

const makeSut = (): SutTypes => {
  const makerStub = makeMaker()
  const sut = new DbCreateReference(makerStub)

  return {
    sut,
    makerStub
  }
}

describe('DbCreateReference', () => {
  test('Should call Maker with correct values', async () => {
    const { sut, makerStub } = makeSut()
    const makeSpy = jest.spyOn(makerStub, 'make')
    const referenceData = {
      author: 'Marcos Emanuel',
      title: 'Title',
      subtitle: 'Subtitle',
      edition: '1',
      place: 'Place',
      company: 'Company',
      date: '26/04/2021'
    }
    await sut.add(referenceData)
    expect(makeSpy).toHaveBeenCalledWith(referenceData)
  })
})
