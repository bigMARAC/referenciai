import { ReferenceController } from './reference'
import { MissingParamError } from '../errors/missing-param-error'

describe('Reference Controller', () => {
  test('Should return 400 if no title is provided ', () => {
    const sut = new ReferenceController()
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
  test('Should return 400 if no author is provided ', () => {
    const sut = new ReferenceController()
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
})
