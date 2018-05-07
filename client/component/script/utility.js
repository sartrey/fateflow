import moment from 'moment'

function joinQuery(query) {
  if (! query) return ''
  return Object.keys(query)
    .filter(k => query[k] != null)
    .map(k => `${k}=${encodeURIComponent(query[k])}`)
    .join('&')
}

function parseDuration(input) {
  const duration = moment.duration()
  input
    .replace(/[a-zA-Z]+/g, token => ':' + token + '-')
    .split('-')
    .filter(Boolean)
    .forEach(part => {
      const tokens = part.split(':')
      duration.add(Number(tokens[0]), tokens[1])
    })
  return duration
}

function humanDuration(input) {
  const duration = moment.duration(input, 'm')
  return duration.humanize()
}

export {
  joinQuery,
  parseDuration,
  humanDuration
}