import { StatusCodes } from "../constants/constants";
import express from "express";
import { Request, Response } from "express";
import { createMemberHandler } from "../middleware/member";
import { memberRequiredFields } from "../types/member";

const router = express.Router();

router.post("/member/register", async (req: Request, res: Response) => {
  try {
    const missingFields = memberRequiredFields.filter(
      (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: StatusCodes.BAD_REQUEST,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const { memberId, success, message } = await createMemberHandler(req?.body);
    if (success) {
      return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        message,
        memberId,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message,
    });
  } catch (error) {
    return res.status(StatusCodes.SERVER_ERROR).send({
      status: StatusCodes.SERVER_ERROR,
      message: "Internal server error!",
    });
  }
});

export default router;
