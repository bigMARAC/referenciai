import { DbCreateReference } from './db-create-reference'
import { CreateReferenceModel, Maker, CreateReferenceRepository } from './db-create-reference-protocols'

const makeMaker = (): Maker => {
  class MakerStub implements Maker {
    async make (data: CreateReferenceModel): Promise<string> {
      return await new Promise(resolve => resolve('reference'))
    }
  }
  return new MakerStub()
}

const makeCreateReferenceReporsitory = (): CreateReferenceRepository => {
  class CreateReferenceRepositoryStub implements CreateReferenceRepository {
    async add (referenceData: CreateReferenceModel): Promise<string> {
      const fakeReference = {
        author: 'Marcos Emanuel',
        title: 'Title',
        subtitle: 'Subtitle',
        edition: '1',
        place: 'Place',
        company: 'Company',
        date: '26/04/2021',
        reference: 'reference'
      }
      return await new Promise(resolve => resolve(fakeReference.reference))
    }
  }
  return new CreateReferenceRepositoryStub()
}

interface SutTypes {
  sut: DbCreateReference
  makerStub: Maker
  createReferenceReporitoryStub: CreateReferenceRepository
}

const makeSut = (): SutTypes => {
  const makerStub = makeMaker()
  const createReferenceReporitoryStub = makeCreateReferenceReporsitory()
  const sut = new DbCreateReference(makerStub, createReferenceReporitoryStub)

  return {
    sut,
    makerStub,
    createReferenceReporitoryStub
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
  test('Should throw if Maker throws', async () => {
    const { sut, makerStub } = makeSut()
    jest.spyOn(makerStub, 'make').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const referenceData = {
      author: 'Marcos Emanuel',
      title: 'Title',
      subtitle: 'Subtitle',
      edition: '1',
      place: 'Place',
      company: 'Company',
      date: '26/04/2021'
    }
    const promise = sut.add(referenceData)
    await expect(promise).rejects.toThrow()
  })
  test('Should call CreateReferenceRepository with correct values', async () => {
    const { sut, createReferenceReporitoryStub } = makeSut()
    const addSpy = jest.spyOn(createReferenceReporitoryStub, 'add')
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
    expect(addSpy).toHaveBeenCalledWith({
      author: 'Marcos Emanuel',
      title: 'Title',
      subtitle: 'Subtitle',
      edition: '1',
      place: 'Place',
      company: 'Company',
      date: '26/04/2021',
      reference: 'reference'
    })
  })
  test('Should throw if CreateReferenceRepository throws', async () => {
    const { sut, createReferenceReporitoryStub } = makeSut()
    jest.spyOn(createReferenceReporitoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const referenceData = {
      author: 'Marcos Emanuel',
      title: 'Title',
      subtitle: 'Subtitle',
      edition: '1',
      place: 'Place',
      company: 'Company',
      date: '26/04/2021'
    }
    const promise = sut.add(referenceData)
    await expect(promise).rejects.toThrow()
  })
  test('Should return a reference on success', async () => {
    const { sut } = makeSut()
    const referenceData = {
      author: 'Marcos Emanuel',
      title: 'Title',
      subtitle: 'Subtitle',
      edition: '1',
      place: 'Place',
      company: 'Company',
      date: '26/04/2021'
    }
    const reference = await sut.add(referenceData)
    expect(reference).toBe('reference')
  })
})
