import { NameValidator } from '../presentation/protocols/name-validator'

export class NameValidatorAdapter implements NameValidator {
  isValid (name: string): boolean {
    const validator = /^[A-Z][a-z\u00C0-\u00FF']+(\s[A-Z][a-z\u00C0-\u00FF']+)+$/
    return validator.test(name)
  }
}
