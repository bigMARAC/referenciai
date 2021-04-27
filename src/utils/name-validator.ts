import { NameValidator } from '../presentation/protocols/name-validator'

export class NameValidatorAdapter implements NameValidator {
  isValid (name: string): boolean {
    return false
  }
}
