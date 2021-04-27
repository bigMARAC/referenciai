import { ReferenceController } from './reference'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { NameValidator, CreateReference, CreateReferenceModel } from './reference-protocols'

const makeNameValidator = (): NameValidator => {
  class NameValidatorStub implements NameValidator {
    isValid (name: string): boolean {
      return true
    }
  }
  return new NameValidatorStub()
}

const makeCreateReference = (): CreateReference => {
  class CreateReferenceStub implements CreateReference {
    async add (account: CreateReferenceModel): Promise<string> {
      const fakeReference = 'EMANUEL, Marcos. Title: Subtitle. 1. Place: Company, 26/04/2021'
      return await new Promise(resolve => resolve(fakeReference))
    }
  }
  return new CreateReferenceStub()
}

interface SutTypes {
  sut: ReferenceController
  nameValidatorStub: NameValidator
  createReferenceStub: CreateReference
}

const makeSut = (): SutTypes => {
  const nameValidatorStub = makeNameValidator()
  const createReferenceStub = makeCreateReference()
  const sut = new ReferenceController(nameValidatorStub, createReferenceStub)
  return {
    sut,
    nameValidatorStub,
    createReferenceStub
  }
}

describe('Reference Controller', () => {
  test('Should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        author: 'Marcos Emanuel',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        date: '26/04/2021'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })
  test('Should return 400 if no author is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        title: 'Any Title',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        date: '26/04/2021'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('author'))
  })
  test('Should return 400 if an invalid name is provided', async () => {
    const { sut, nameValidatorStub } = makeSut()
    jest.spyOn(nameValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        author: 'Invalid-Name',
        title: 'Any Title',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        date: '26/04/2021'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('author'))
  })
  test('Should call NameValidator with correct name', async () => {
    const { sut, nameValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(nameValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        author: 'Marcos Emanuel',
        title: 'Any Title',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        date: '26/04/2021'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('Marcos Emanuel')
  })
  test('Should return 500 if NameValidator throws', async () => {
    const { sut, nameValidatorStub } = makeSut()
    jest.spyOn(nameValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        author: 'Marcos Emanuel',
        title: 'Any Title',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        date: '26/04/2021'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should call CreateReference with correct values', async () => {
    const { sut, createReferenceStub } = makeSut()
    const addSpy = jest.spyOn(createReferenceStub, 'add')
    const httpRequest = {
      body: {
        author: 'Marcos Emanuel',
        title: 'Any Title',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        company: 'Any Company',
        date: '26/04/2021'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      author: 'Marcos Emanuel',
      title: 'Any Title',
      subtitle: 'Any Subtitle',
      edition: '1',
      place: 'Any Place',
      company: 'Any Company',
      date: '26/04/2021'
    })
  })
  test('Should return 500 if CreateReference throws', async () => {
    const { sut, createReferenceStub } = makeSut()
    jest.spyOn(createReferenceStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        author: 'Marcos Emanuel',
        title: 'Any Title',
        subtitle: 'Any Subtitle',
        edition: '1',
        place: 'Any Place',
        date: '26/04/2021'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        author: 'Marcos Emanuel',
        title: 'Title',
        subtitle: 'Subtitle',
        edition: '1',
        place: 'Place',
        company: 'Company',
        date: '26/04/2021'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('EMANUEL, Marcos. Title: Subtitle. 1. Place: Company, 26/04/2021')
  })
})
