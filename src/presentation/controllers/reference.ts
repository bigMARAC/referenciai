import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { NameValidator } from '../protocols/name-validator'

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
      const isValid = this.nameValidator.isValid(httpRequest.body.author)
      if (!isValid) {
        return badRequest(new InvalidParamError('author'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
