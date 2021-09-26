const { join } = require("path");

const entityPath =
  process.env["NODE_ENV"] === "development"
    ? join("src/database/entity")
    : join("build/database/entity");

const filter = process.env["NODE_ENV"] === "development" ? "ts" : "js";

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "ComeInMain",
  entities: [`${entityPath}/**/*.${filter}`],
  cli: {
    entitiesDir: `${entityPath}`,
  },
  synchronize: true,
};
