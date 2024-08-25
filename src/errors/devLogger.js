import winston from "winston";
import config from "../../config.js";
import { __dirname } from "../utils/utils.js"
import { join } from 'path'

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const logger = winston.createLogger({
  levels: levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
    )
  ),
  transports: [],
});

if (config.NODE_ENV === "dev") {
  logger.add(new winston.transports.Console({ level: "debug" }));
} else if (config.NODE_ENV === "prod") {
  logger.add(new winston.transports.Console({ level: "info" }));
  logger.add(
    new winston.transports.File({
      filename: join(__dirname, "../errors/logs/errors.log"),
      level: "error",
    })
  );
}

export default logger;
