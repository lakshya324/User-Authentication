import express from "express";
import * as controller from "../controllers/admin";
import * as validationSchema from "../validation/admin.schema";

const router = express.Router();

//* Fetch All Users [GET /admin/users]
router.get("/users", controller.getUsers);

//* Fetch User By ID [GET /admin/user/:id]
router.get("/user/:id", controller.getUserById);

//* Create User [POST /admin/user]
router.post("/user", validationSchema.createUser, controller.createUser);

//* Update User [PUT /admin/user/:id]
router.put("/user/:id", validationSchema.updateUser, controller.updateUser);

//* Delete User [DELETE /admin/user/:id]
router.delete("/user/:id", controller.deleteUser);

export default router;
