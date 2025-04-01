import express from "express";
import * as controller from "../controllers/admin";
import * as validationSchema from "../validation/admin.schema";

const router = express.Router();

//* Fetch All Users [GET /admin/users]
router.get("/all", controller.getUsers);

//* Fetch User By ID [GET /admin/user/:id]
router.get("/:id", controller.getUserById);

//* Create User [POST /admin/user]
router.post("/", validationSchema.user, controller.createUser);

//* Update User [PUT /admin/user/:id]
router.put("/:id", validationSchema.user, controller.updateUser);

//* Delete User [DELETE /admin/user/:id]
router.delete("/:id", controller.deleteUser);

export default router;
