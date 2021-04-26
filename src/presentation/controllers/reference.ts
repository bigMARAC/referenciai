import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class ReferenceController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const required = ['title', 'author']
    for (const field of required) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
