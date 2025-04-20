import { config } from "process";
import server from "./server";
// 

server.listen(3000, () => {
    console.log(`Server listening from port ${3000}`)
})

