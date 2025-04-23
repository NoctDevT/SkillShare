import { Request } from "express";
import {logger} from "./logger";

export const logHttpRequest = (req: Request, message = 'HTTP request') => {
    logger.http(message, {
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
  };
  