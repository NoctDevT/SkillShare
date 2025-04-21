import CONFIG  from "./config/config";
import server from "./server";


server.listen(CONFIG.PORT, () => {
    console.log(`Server listening from port ${CONFIG.PORT}`)
})

