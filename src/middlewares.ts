import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
// import csurf from "csurf";
import enforce from "express-sslify";
import bodyParser from "body-parser";
import compression from "compression";
import express, { Request } from "express";
import rateLimit from "express-rate-limit";

import { ipExpireTime, ipRateLimit, nodeEnv } from "./config/env.config";

const middlewares = (app: express.Application) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));

  if (nodeEnv === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }

  app.set("trust proxy", true);

  app.use(
    rateLimit({
      windowMs: ipExpireTime * 60 * 1000,
      max: ipRateLimit,
      statusCode: 429,
      message: `Too many requests from this IP, please try again after ${ipExpireTime} minutes`,
      keyGenerator: (req: Request) => req.ip || "unknown",
    })
  );
};

export default middlewares;