/**
 * @file routes/project.routes.js
 * @description Express router for project data endpoints.
 *
 * Mounted at: /api/projects (registered in app.js)
 *
 * GET /           → getAllProjects  (GET /api/projects)
 * GET /:projectId → getProjectById (GET /api/projects/:projectId)
 */

"use strict";

const { Router } = require("express");
const { getAllProjects, getProjectById } = require("../controllers/project.controller");

const router = Router();

router.get("/", getAllProjects);
router.get("/:projectId", getProjectById);

module.exports = router;
