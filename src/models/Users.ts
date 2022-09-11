import { DataTypes, Model } from "sequelize";

import sequelize from "./index";

export interface Attributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

class Users extends Model<Attributes> {
  declare id?: number;

  declare name: string;

  declare email: string;

  declare password: string;

  declare readonly createdAt?: Date;

  declare readonly updatedAt?: Date;

  declare readonly deletedAt?: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
  },
);

export default Users;
