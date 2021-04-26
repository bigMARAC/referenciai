import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class ReferenceController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { title, author } = httpRequest.body
    if (!title) {
      return {
        statusCode: 400,
        body: new MissingParamError('title')
      }
    }
    if (!author) {
      return {
        statusCode: 400,
        body: new MissingParamError('author')
      }
    }
  }
}
