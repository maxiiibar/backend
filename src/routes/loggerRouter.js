import { Router } from "express";
import logger from "../errors/devLogger.js";

const router = Router();

router.get("/", (req, res) => {
  logger.debug("Este es un mensaje de depuración");
  logger.http("Este es un mensaje HTTP");
  logger.info("Este es un mensaje informativo");
  logger.warning("Este es un mensaje de advertencia");
  logger.error("Este es un mensaje de error");
  logger.fatal("Este es un mensaje fatal");

  res.send("Logs generados en consola y archivo");
});

export default router;
