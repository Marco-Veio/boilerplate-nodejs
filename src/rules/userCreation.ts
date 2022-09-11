import { IDatabaseError } from "../interfaces/database";
import User, { Attributes } from "../models/Users";

export default async (data: Attributes) => {
  const user = await User.create(data).catch(error => error);
  if (user instanceof Error) {
    switch (user.name) {
      case "SequelizeUniqueConstraintError":
        return { code: 409, message: "This user already exists" } as IDatabaseError;
      case "SequelizeValidationError":
        return { code: 400, message: "Missing data" } as IDatabaseError;
      default:
        console.error(user.name);
        return { code: 500, message: "Internal server error" } as IDatabaseError;
    }
  }
  return user as User;
};
