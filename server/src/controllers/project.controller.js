/**
 * @file controllers/project.controller.js
 * @description Request handlers for project data endpoints.
 *
 * SPEC RESPONSE FORMAT (all routes):
 *   { success: boolean, data: object|array|null, error: { code, message }|null }
 *
 * Routes handled:
 *   GET /api/projects          → getAllProjects
 *   GET /api/projects/:projectId → getProjectById
 *
 * Data source: src/data/projectsData.js (spec-driven, never hardcoded in UI)
 */

"use strict";

const projects = require("../data/projectsData");

// ---------------------------------------------------------------------------
// GET /api/projects — return full project array
// ---------------------------------------------------------------------------
const getAllProjects = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: projects,
      error: null,
    });
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      layer: "CONTROLLER",
      module: "project.controller.js",
      error_message: err.message,
      stack_trace: err.stack,
    }));

    return res.status(500).json({
      success: false,
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve projects.",
      },
    });
  }
};

// ---------------------------------------------------------------------------
// GET /api/projects/:projectId — find a single project by its string ID
// ---------------------------------------------------------------------------
const getProjectById = (req, res) => {
  try {
    const { projectId } = req.params;
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        data: null,
        error: {
          code: "PROJECT_NOT_FOUND",
          message: `No project found with id: '${projectId}'.`,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
      error: null,
    });
  } catch (err) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      layer: "CONTROLLER",
      module: "project.controller.js",
      error_message: err.message,
      stack_trace: err.stack,
    }));

    return res.status(500).json({
      success: false,
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve project.",
      },
    });
  }
};

module.exports = { getAllProjects, getProjectById };
