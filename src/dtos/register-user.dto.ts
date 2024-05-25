import { IsEnum, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { USER_ROLE } from "../enums/user-role.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserDto:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - role
 *         - password
 *       properties:
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
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         name: test
 *         phone: '+201209999999'
 *         role: CLIENT
 *         password: test
 */
export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  //! add length limit check
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  //! add length limit check
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum([USER_ROLE.AGENT, USER_ROLE.CLIENT])
  role: [USER_ROLE.AGENT, USER_ROLE.CLIENT];

  @IsString()
  @IsNotEmpty()
  //! add length limit check
  password: string;

  constructor(
    name: string,
    phone: string,
    role: [USER_ROLE.AGENT, USER_ROLE.CLIENT],
    password: string
  ) {
    this.name = name;
    this.phone = phone;
    this.role = role;
    this.password = password;
  }
}
