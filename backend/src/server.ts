import Express from "express";
import { auth } from "express-openid-connect";
import config from "./config/config";
import authRouter from "./routes/auth";
import requestLogger from "./middlewares/logger";
import morgan from 'morgan';

const server = Express();

server.use(Express.json());
server.use(auth(config.auth0));
//apache style logging
server.use(morgan("combined"));
server.use('/auth', authRouter);



export default server; 