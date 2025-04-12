export default defineEventHandler(async (event) => {
    if(event.method === "POST") {
        const query = getQuery(event)

        // const work = await prisma.work.findUnique({
        //     where: {
        //         // id
        //     }
        // })
        return query
    } else {
        return "hellooo"
    }
})