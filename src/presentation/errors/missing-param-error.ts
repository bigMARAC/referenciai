export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missgin param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
