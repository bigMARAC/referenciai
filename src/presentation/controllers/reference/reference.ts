import { HttpResponse, HttpRequest, Controller, NameValidator, CreateReference } from './reference-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'

export class ReferenceController implements Controller {
  private readonly nameValidator: NameValidator
  private readonly createReference: CreateReference

  constructor (nameValidator: NameValidator, createReference: CreateReference) {
    this.nameValidator = nameValidator
    this.createReference = createReference
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const required = ['title', 'author']
      for (const field of required) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { author, title, subtitle, edition, place, company, date } = httpRequest.body
      const isValid = this.nameValidator.isValid(author)
      if (!isValid) {
        return badRequest(new InvalidParamError('author'))
      }
      const reference = this.createReference.add({
        author,
        title,
        subtitle,
        edition,
        place,
        company,
        date
      })
      return {
        statusCode: 200,
        body: reference
      }
    } catch (error) {
      return serverError()
    }
  }
}
