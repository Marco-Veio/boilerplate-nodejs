require("dotenv").config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  storage: process.env.DB_PATH,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  paranoid: true,
  define: {
    timestamps: true,
  },
};
