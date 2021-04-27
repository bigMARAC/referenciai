import { NameValidatorAdapter } from './name-validator'

describe('NameValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new NameValidatorAdapter()
    const isValid = sut.isValid('Invalid-name')
    expect(isValid).toBe(false)
  })
})
