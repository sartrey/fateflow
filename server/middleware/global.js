module.exports = async function (ctx, next) {
  console.log(`<${ctx.method}>`, ctx.url)
  await next()
}