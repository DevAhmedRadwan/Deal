import { Router } from "express";
import authController from "../controllers/auth.controller";
import { LoginDto } from "../dtos/login.dto";
import { validateBodyDto } from "../middleware/validation.middleware";
import { RegisterUserDto } from "../dtos/register-user.dto";

const authRouter = Router();

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a client or and agent user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserDto'
 *     responses:
 *       201:
 *         description: The created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUser'
 */
authRouter.post(
  "/register",
  validateBodyDto(RegisterUserDto),
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login end point for any user type
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: The created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUser'
 */
authRouter.post("/login", validateBodyDto(LoginDto), authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout end point for any user type
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: The created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUser'
 */
authRouter.post("/logout", authController.logout);

/**
 * @swagger
 * /api/auth/refresh-tokens:
 *   post:
 *     summary: refresh tokens end point for any user type
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: The created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUser'
 */
authRouter.post("/refresh-tokens", authController.refreshTokens);

export default authRouter;
