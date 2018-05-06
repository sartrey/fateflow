function joinQuery(query) {
  if (! query) return ''
  return Object.keys(query)
    .filter(k => query[k] != null)
    .map(k => `${k}=${encodeURIComponent(query[k])}`)
    .join('&')
}

export {
  joinQuery
}