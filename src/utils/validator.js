import moment from 'moment'

/**
 * Validates a provided input as a date.
 *
 * @param date {string}
 *    The provided date.
 *
 * @return {string|boolean}
 *    The validated date or false if the provided date is invalid.
 */
export const dateValidator = (date) => {
  if (date.length !== 8) return false

  const d = moment(date, 'MMDDYYYY')
  if (d.isValid()) {
    return d.format('M/D/YYYY')
  }
  return false
}

/**
 * Validates a provided input as an id.
 *
 * @param id {mixed}
 *    The provided id.
 *
 * @return {int|boolean}
 *    The validated date or false if the provided date is invalid.
 */
export const idValidator = (id) => {
  const i = parseInt(id)
  if (isNaN(i)) return false
  if (i == id) return i // eslint-disable-line
  return false
}
