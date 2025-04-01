import express from "express";

import logs from "./logs";
import router from "./routes";
import databases from "./databases";
import setupEnvironment from "./setup";
import middlewares from "./middlewares";
import { port } from "./config/env.config";

// Setup Environment
setupEnvironment();

const app = express();

// Server Middlewares
middlewares(app);

// Logging
logs(app);

// Routes
app.use(router);

// Connect to Database and Start Server
databases()
  .then(async () => {
    app.listen(port, () =>
      console.log("\x1b[36m%s\x1b[0m", `Server started on port ${port}`)
    );
  })
  .catch((err) => console.log(err));
