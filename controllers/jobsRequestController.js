import JobRequest from "../models/JobRequest.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import padWithLeadingZeros from "../utils/zeroLead.js";
import moment from "moment";
import mongoose from "mongoose";

const getAllJobs = async (req, res) => {
  let result = JobRequest.find();

  let sort = "latest";
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  const jobsRequest = await result;
  const totalJobsRequest = await JobRequest.countDocuments();
  res.status(StatusCodes.OK).json({ jobsRequest, totalJobsRequest });
};

const createJob = async (req, res) => {
  const { jobCompanyName, requestBy, arrayDetails } = req.body;
  console.log(req.body);

  if (!jobCompanyName || !requestBy) {
    throw new BadRequestError("Please provide all values");
  }
  let totalJobs = await JobRequest.countDocuments();
  totalJobs = totalJobs + 1;
  const date = moment().format("YYYYMM");
  const leading = padWithLeadingZeros(totalJobs, 4);
  req.body.jobRequestNo = `RD${date}${leading}`;
  req.body.createdBy = req.user.userId;
  req.body.details = arrayDetails;

  const jobRequest = await JobRequest.create(req.body);

  console.log(leading);
  //   res.send("Get JobRequestNo");
  res.status(StatusCodes.CREATED).json({ jobRequest });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new BadRequestError("Please provide all values");
  }
  const jobRequest = await JobRequest.findOne({ _id: jobId });
  console.log(jobRequest);
  if (!jobRequest) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }

  const updatedJob = await JobRequest.findOneAndUpdate(
    { _id: jobId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json(updatedJob);
};

const showStats = async (req, res) => {
  //console.log(req.user);
  let stats = await JobRequest.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    success: stats.success || 0,
    totals: stats.pending + stats.success || 0,
  };

  // let monthlyApplications = await Job.aggregate([
  //   { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
  //   {
  //     $group: {
  //       _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
  //       count: { $sum: 1 },
  //     },
  //   },
  //   { $sort: { "_id.year": -1, "_id.month": -1 } },
  //   { $limit: 6 },
  // ]);
  // monthlyApplications = monthlyApplications
  //   .map((item) => {
  //     const {
  //       _id: { year, month },
  //       count,
  //     } = item;
  //     const date = moment()
  //       .month(month - 1)
  //       .year(year)
  //       .format("MMM Y");
  //     return { date, count };
  //   })
  //   .reverse();

  res.status(StatusCodes.OK).json({ defaultStats });
};

export { getAllJobs, createJob, updateJob, showStats };
