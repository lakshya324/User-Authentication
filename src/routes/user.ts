import express from 'express';
import * as controller from '../controllers/user';
import * as validationSchema from '../validation/user.schema';

const router = express.Router();

//* Fetch User Details [GET /user/]
router.get('/', controller.getUser);

//* Update User Details [PUT /user/]
router.put('/', validationSchema.updateUser, controller.updateUser);

//* Delete User [DELETE /user/]
router.delete('/', controller.deleteUser);

export default router;