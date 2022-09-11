import { Sequelize, Options } from "sequelize";

const config: Options = require("../../config/db");

export default new Sequelize(config);
