Bun.serve({
    async fetch(request: Request) {
        if (request.url.endsWith("/update")) {
            const update = await Bun.file("./html/update.html").text();
            return new Response(
                update,
                {
                    headers: {"Content-Type": "text/html"}
                }
            )
        }

        const index = await Bun.file("./html/index.html").text();
        return new Response(
            index,
            {
                headers: {"Content-Type": "text/html"}
            });
    }
})