export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const header  = getRequestHeaders(event)


  console.log(header)
});
