export class ErrorFileNotFound extends Error {
  constructor() {
    super()
    this.name = 'FileNotFound'
  }
}
