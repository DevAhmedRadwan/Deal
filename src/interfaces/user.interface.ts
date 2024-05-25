import mongoose, { Document } from "mongoose";
import { USER_ROLE } from "../enums/user-role.enum";
import { USER_STATUS } from "../enums/user-status.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     IUser:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - role
 *         - status
 *       requests:
 *         name:
 *           type: string
 *           description: The user name
 *         phone:
 *           type: string
 *           description: The user phone
 *         role:
 *           type: string
 *           enum: [CLIENT, AGENT]
 *           description: The user role
 *         status:
 *           type: string
 *           enum: [ACTIVE, DELETED]
 *           description: The user password
 *       example:
 *         name: test
 *         phone: '+201209999999'
 *         role: CLIENT
 *         status: ACTIVE
 */
interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  phone: string;
  role: USER_ROLE;
  status: USER_STATUS;
  password: string;
  requests: [mongoose.Schema.Types.ObjectId];
  ads: [mongoose.Schema.Types.ObjectId];

  isPasswordMatch(password: string): boolean;
}

export default IUser;
