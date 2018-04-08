import { createError } from 'apollo-errors'

const InvalidDateError = createError('InvalidDateError', {
  message: 'The provided date is invalid.'
})

const InvalidIdError = createError('InvalidIdError', {
  message: 'The provided id is invalid.'
})

export {
  InvalidDateError,
  InvalidIdError
}
