import { Router } from "express";
import passport from "passport";
import adminController from "../controllers/admin.controller";
import { RegisterAdminDto } from "../dtos/register-admin.dto";
import { USER_ROLE } from "../enums/user-role.enum";
import authorizeRoles from "../middleware/authorize-roles.middleware";
import { validateBodyDto } from "../middleware/validation.middleware";

const adminRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register an Admin user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterAdminDto'
 *     responses:
 *       201:
 *         description: The created new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUser'
 */
adminRouter.post(
  "/register",
  validateBodyDto(RegisterAdminDto),
  adminController.register
);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: return the user stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of items to skip before starting to collect the result set
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *     responses:
 *       200:
 *         description: A list of matching requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66520d9e418343a80e991902"
 *                       name:
 *                         type: string
 *                         example: "test"
 *                       phone:
 *                         type: string
 *                         example: "+201209999999"
 *                       role:
 *                         type: string
 *                         example: "CLIENT"
 *                       status:
 *                         type: string
 *                         example: "ACTIVE"
 *                       requestsCount:
 *                         type: integer
 *                         example: 4
 *                       totalRequestsCount:
 *                         type: integer
 *                         example: 4
 *                       adsCount:
 *                         type: integer
 *                         example: 0
 *                       totalAdsCount:
 *                         type: integer
 *                         example: 4
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 hasNextPage:
 *                   type: boolean
 *                   example: false
 *                 hasPreviousPage:
 *                   type: boolean
 *                   example: true
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Bad request, invalid parameters
 *       500:
 *         description: Internal server error
 */
adminRouter.get(
  "/stats",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.ADMIN),
  adminController.stats
);

export default adminRouter;
