import { Request, Response } from "express";

import User from "../models/Users";

import createUser from "../rules/userCreation";

export default {
  create: async (request: Request, response: Response) => {
    const user = await createUser(request.body);
    if (user instanceof User) {
      return response.send(user);
    }
    return response.status(user.code).send({ error: user.message });
  },
};
