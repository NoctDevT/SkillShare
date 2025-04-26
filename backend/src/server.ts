import Express from "express";
import { auth } from "express-openid-connect";
import config from "./config/config";
import authRouter from "./routes/auth";
import { logger } from './util/loggerUtils';
import morgan from 'morgan';
import userRouter from "./routes/user";


const server = Express();
server.use(Express.json());
server.use(auth(config.auth0));
//apache style logging
server.use(morgan("combined"
    , {
    stream: {
        write: (log) => logger.http(log.trim())
    }
}
));
server.use('/auth', authRouter);

server.use('/user', userRouter);


export default server; 