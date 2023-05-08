import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { databaseConfig } from "./src/config/config";

export const sequelize = new Sequelize({
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: "postgres",
  storage: ":memory:",
} as unknown as SequelizeOptions);
