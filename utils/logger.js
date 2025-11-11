import bunyan from "bunyan";
import { LogModel } from "../models/LogModel.js";

class DBStream {
  write(log) {
    try {
      const logObj = JSON.parse(log);
      LogModel.create(logObj);
    } catch (error) {
      console.error("Failed to insert log:", error);
    }
  }
}

const logger = bunyan.createLogger({
  name: "ShopSmart_Backend",
  streams: [{ stream: process.stdout }, { stream: new DBStream() }],
});

export const log = (user, route, statusCode, message, error) => {
  return logger.info({ extra: { user, route, statusCode, error } }, message);
};
