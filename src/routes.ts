import { Router } from "express";

import Users from "./controllers/user";

const routes = Router();

routes.get("/", (_request, response) => response.json({ message: "Hello World" }));

routes.post("/users", Users.create);

export default routes;
