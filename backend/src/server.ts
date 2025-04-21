import Express from "express";
import { auth } from "express-openid-connect";
import config from "./config/config";
import authRouter from "./routes/auth";
const server = Express();

server.use(Express.json());

server.use(auth(config.auth0));


// routes

server.use('/auth', authRouter);



export default server; 