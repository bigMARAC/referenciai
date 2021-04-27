import { HttpResponse, HttpRequest, Controller, NameValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { CreateReference } from '../../domain/usecases/create-reference'

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
      this.createReference.add({
        author,
        title,
        subtitle,
        edition,
        place,
        company,
        date
      })
    } catch (error) {
      return serverError()
    }
  }
}
