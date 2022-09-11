import http from "http";
import https from "https";
import fs from "fs";

import app from "./app";

const server =
  process.env.HTTPS === "true"
    ? https.createServer(
        {
          key: fs.readFileSync(process.env.HTTPS_KEY!, "utf8"),
          cert: fs.readFileSync(process.env.HTTPS_CRT!, "utf8"),
          ca: fs.readFileSync(process.env.HTTPS_CA!, "utf8"),
        },
        app,
      )
    : http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.info(`Listening on port ${process.env.PORT || 3000}`);
});
