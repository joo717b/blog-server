import express from "express";
import { config } from "./config";

const app = express();
const port = config.host.port;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
