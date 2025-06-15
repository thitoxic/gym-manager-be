import { StatusCodes } from "../constants/constants";
import express from "express";
import { Request, Response } from "express";
import { createMemberHandler, updateMemberHandler } from "../middleware/member";
import { memberRequiredFields } from "../types/member";
import Member from "../models/member";

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

router.patch(
  "/member/update/:memberId",
  async (req: Request, res: Response) => {
    const updateFields = req.body;
    try {
      const result = await updateMemberHandler(
        req?.params?.memberId,
        updateFields
      );

      if (!result) {
        throw new Error("Failed to update member");
      }

      const { success, message, memberId } = result;
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
    } catch (err) {
      console.log("err", err);
      return res
        .status(StatusCodes.SERVER_ERROR)
        .json({ message: "Error updating member" });
    }
  }
);

export default router;
