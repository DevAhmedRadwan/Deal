import { Router } from "express";
import adController from "../controllers/ad.controller";
import passport from "passport";
import authorizeRoles from "../middleware/authorize-roles.middleware";
import { USER_ROLE } from "../enums/user-role.enum";

const adRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Ad
 */

/**
 * @swagger
 * /api/ad:
 *   get:
 *     summary: get ad pagenated
 *     tags: [Ad]
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
 *               $ref: '#/components/schemas/IAd'
 */
adRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.AGENT),
  adController.findAll
);

/**
 * @swagger
 * /api/ad/{adId}:
 *   get:
 *     summary: get a ad by id
 *     tags: [Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the ad to get
 *     responses:
 *       200:
 *         description: the ad with this id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAd'
 */
adRouter.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.AGENT),
  adController.findById
);

/**
 * @swagger
 * /api/ad:
 *   post:
 *     summary: Create an ad
 *     tags: [Ad]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdDto'
 *     responses:
 *       201:
 *         description: The created new ad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAd'
 */
adRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.AGENT),
  adController.create
);

/**
 * @swagger
 * /api/ad/{adId}:
 *   put:
 *     summary: Update the ad with this id
 *     tags: [Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the ad to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdDto'
 *     responses:
 *       200:
 *         description: the updated preoperty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAd'
 */
adRouter.put(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.AGENT),
  adController.updateById
);

/**
 * @swagger
 * /api/ad/{adId}:
 *   delete:
 *     summary: deletes a ad with this id
 *     tags: [Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the ad to get
 *     responses:
 *       200:
 *         description: deleteing the ad was successful
 */
adRouter.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.AGENT),
  adController.deleteById
);

/**
 * @swagger
 * /api/ad/{adId}/match:
 *   get:
 *     summary: get matched request with this ad
 *     tags: [Ad]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: adId
 *         schema:
 *           type: string
 *         required: true
 *         description: the id of the ad to get
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
 *         description: the matched request with this ad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IRequest'
 */
adRouter.get(
  "/:_id/match",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles(USER_ROLE.AGENT),
  adController.match
);

export default adRouter;
