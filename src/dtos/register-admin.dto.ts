import { IsEnum, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { USER_ROLE } from "../enums/user-role.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterAdminDto:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user name
 *         phone:
 *           type: string
 *           description: The user phone
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         name: test
 *         phone: '+201209999999'
 *         password: test
 */
export class RegisterAdminDto {
  @IsString()
  @IsNotEmpty()
  //! add length limit check
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  //! add length limit check
  phone: string;

  role: USER_ROLE.ADMIN = USER_ROLE.ADMIN;

  @IsString()
  @IsNotEmpty()
  //! add length limit check
  password: string;

  constructor(name: string, phone: string, password: string) {
    this.name = name;
    this.phone = phone;
    this.password = password;
  }
}
