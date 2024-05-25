import { Router } from "express";
import { validateBodyDto } from "../middleware/validation.middleware";
import requestController from "../controllers/request.controller";
import passport from "passport";
import { USER_ROLE } from "../enums/user-role.enum";
import authorizeRoles from "../middleware/authorize-roles.middleware";
import RequestDto from "../dtos/request.dto";

const requestRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Request
 */

/**
 * @swagger
 * /api/request:
 *   get:
 *     summary: get request pagenated
 *     tags: [Request]
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
 *         description: pagenated requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IRequest'
 */
requestRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.CLIENT),
  requestController.findAll
);

/**
 * @swagger
 * /api/request/{requestId}:
 *   get:
 *     summary: get a request by id
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the request to get
 *     responses:
 *       200:
 *         description: the request with this id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IRequest'
 */
requestRouter.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.CLIENT),
  requestController.findById
);

/**
 * @swagger
 * /api/request:
 *   post:
 *     summary: Create a request
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestDto'
 *     responses:
 *       201:
 *         description: The created new request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IRequest'
 *       400:
 *         description: Bad request, invalid parameters
 *       500:
 *         description: Internal server error
 */
requestRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.CLIENT),
  validateBodyDto(RequestDto),
  requestController.create
);

/**
 * @swagger
 * /api/request/{requestId}:
 *   put:
 *     summary: Update the request with this id
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the request to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestDto'
 *     responses:
 *       200:
 *         description: the updated preoperty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IRequest'
 */
requestRouter.put(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.CLIENT),
  validateBodyDto(RequestDto),
  requestController.updateById
);

/**
 * @swagger
 * /api/request/{requestId}:
 *   delete:
 *     summary: deletes a request with this id
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the request to get
 *     responses:
 *       200:
 *         description: deleteing the request was successful
 */
requestRouter.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.CLIENT),
  requestController.deleteById
);

export default requestRouter;
