import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *       properties:
 *         phone:
 *           type: string
 *           description: The user phone
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         phone: '+201209999999'
 *         password: test
 */
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  //! add length limit check
  phone: string;

  @IsString()
  @IsNotEmpty()
  //! add length limit check
  password: string;

  constructor(phone: string, password: string) {
    this.phone = phone;
    this.password = password;
  }
}
