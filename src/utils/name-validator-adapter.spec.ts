import { NameValidatorAdapter } from './name-validator-adapter'

interface SutTypes {
  sut: NameValidatorAdapter
  validator: RegExp
}

const makeSut = (): SutTypes => {
  const validator = /^[A-Z][a-z\u00C0-\u00FF']+(\s[A-Z][a-z\u00C0-\u00FF']+)+$/
  const sut = new NameValidatorAdapter(validator)
  return {
    sut,
    validator
  }
}

describe('NameValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('Invalid-name')
    expect(isValid).toBe(false)
  })
  test('Should return false if validator returns false', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('Valid Name')
    expect(isValid).toBe(true)
  })
  test('Should call validator with correct name', () => {
    const { sut, validator } = makeSut()
    const testSpy = jest.spyOn(validator, 'test')
    sut.isValid('Valid Name')
    expect(testSpy).toHaveBeenCalledWith('Valid Name')
  })
})
