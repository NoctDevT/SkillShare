import CONFIG  from "./config/config";
import server from "./server";

server.listen(CONFIG.PORT, () => {
    console.log(`Server listening from port ${CONFIG.PORT}`)
})

const shutdown = async (signal: string) => {
    console.log(`[${new Date().toISOString()}] Received ${signal}. Gracefully shutting down...`);
    process.exit(0); 
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', async (error) => {
    console.error(` [${new Date().toISOString()}] Exception:`, error);
    process.exit(1);
});

process.on('unhandledRejection', async (reason) => {
    console.error(`[${new Date().toISOString()}] Rejection:`, reason);
    process.exit(1); 
});
