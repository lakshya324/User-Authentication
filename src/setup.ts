import fs from "fs";
import { nodeEnv } from "./config/env.config";
import { notifyServerRestart } from "./emails/mail/server.notify.email";

const setupEnvironment = () => {
  // Notify server restart in production
  if (nodeEnv === "production") notifyServerRestart();

  // Create necessary directories if they don't exist
  if (!fs.existsSync("logs")) fs.mkdirSync("logs");
};

export default setupEnvironment;