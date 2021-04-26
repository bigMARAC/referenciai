import { HttpResponse, HttpRequest, Controller, NameValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class ReferenceController implements Controller {
  private readonly nameValidator: NameValidator
  constructor (nameValidator: NameValidator) {
    this.nameValidator = nameValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const required = ['title', 'author']
      for (const field of required) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { author } = httpRequest.body
      const isValid = this.nameValidator.isValid(author)
      if (!isValid) {
        return badRequest(new InvalidParamError('author'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
