import { ReferenceController } from './reference'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { NameValidator } from '../protocols/name-validator'

interface SutTypes {
  sut: ReferenceController
  nameValidatorStub: NameValidator
}

const makeSut = (): SutTypes => {
  class NameValidatorStub implements NameValidator {
    isValid (name: string): boolean {
      return true
    }
  }
  const nameValidatorStub = new NameValidatorStub()
  const sut = new ReferenceController(nameValidatorStub)
  return {
    sut,
    nameValidatorStub
  }
}

describe('Reference Controller', () => {
  test('Should return 400 if no title is provided', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })
  test('Should return 400 if no author is provided', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('author'))
  })
  test('Should return 400 if an invalid name is provided', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('author'))
  })
})
