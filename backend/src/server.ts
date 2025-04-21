import Express from "express";
import { auth } from "express-openid-connect";
import config from "./config/config";
const server = Express();

server.use(Express.json());

server.use(auth(config.auth0));

export default server; 