import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class ReferenceController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const { title, author } = httpRequest.body
    if (!title) {
      return badRequest(new MissingParamError('title'))
    }
    if (!author) {
      return badRequest(new MissingParamError('author'))
    }
  }
}
