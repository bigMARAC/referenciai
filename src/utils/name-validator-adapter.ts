import { NameValidator } from '../presentation/protocols/name-validator'

export class NameValidatorAdapter implements NameValidator {
  private readonly validator: RegExp
  constructor (validator: RegExp) {
    this.validator = validator
  }

  isValid (name: string): boolean {
    return this.validator.test(name)
  }
}
