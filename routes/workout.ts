import { StatusCodes } from "../constants/constants";
import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/list", (req: Request, res: Response) => {});

router.post("/createWorkout", (req: Request, res: Response) => {});

router.post("/createPlan", (req: Request, res: Response) => {});
