export class ReferenceController {
  handle (httpRequest: any): any {
    const { title, author } = httpRequest.body
    if (!title) {
      return {
        statusCode: 400,
        body: new Error('Missing param: title')
      }
    }
    if (!author) {
      return {
        statusCode: 400,
        body: new Error('Missing param: author')
      }
    }
  }
}
