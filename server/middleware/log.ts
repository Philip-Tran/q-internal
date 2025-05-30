export default defineEventHandler((event) => {
  console.log('New request: ' + getRequestURL(event) + "\n")
  console.log("Method: ", event.method)
})

