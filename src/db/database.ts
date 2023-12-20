import { config } from "../config";
import SQ from "sequelize";

let { host, user, database, password } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
});
