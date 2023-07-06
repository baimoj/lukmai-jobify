import express from "express";
const router = express.Router();

import {
  getAllJobs,
  createJob,
  updateJob,
  showStats,
} from "../controllers/jobsRequestController.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").patch(updateJob);
router.route("/stats").get(showStats);
export default router;
