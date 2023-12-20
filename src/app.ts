import express from "express";
import { config } from "./config";
import postRouter from "./router/posts";
import { sequelize } from "./db/database";

const app = express();
const port = config.host.port;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/posts", postRouter);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
