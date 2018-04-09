import { createError } from 'apollo-errors'

const GenericError = createError('GenericError', {
  message: 'An error has occurred.'
})

const InvalidDateError = createError('InvalidDateError', {
  message: 'The provided date is invalid.'
})

const InvalidIdError = createError('InvalidIdError', {
  message: 'The provided id is invalid.'
})

const InvalidSourceFileError = createError('InvalidSourceFileError', {
  message: 'The provided source file is invalid.'
})

export {
  GenericError,
  InvalidDateError,
  InvalidIdError,
  InvalidSourceFileError
}
