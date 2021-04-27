import { CreateReferenceModel } from '../../../domain/usecases/create-reference'
import { DbCreateReference } from './db-create-reference'

describe('DbCreateReference', () => {
  test('Should call Maker with correct values', async () => {
    class MakerStub {
      async make (data: CreateReferenceModel): Promise<string> {
        return await new Promise(resolve => resolve('reference'))
      }
    }
    const makerStub = new MakerStub()
    const sut = new DbCreateReference(makerStub)
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
