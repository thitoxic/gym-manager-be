import { StatusCodes } from "../constants/constants";
import express from "express";
import { Request, Response } from "express";
import {
  createMemberHandler,
  faceAuthHandler,
  getAllMembersHandler,
  updateMemberHandler,
} from "../middleware/member";
import { memberRequiredFields } from "../types/member";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.post(
  "/member/register",
  upload.single("passportPhoto"),
  async (req: Request, res: Response) => {
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

      const memberData = { ...req.body };
      if (req.file) {
        memberData.passportPhoto = req.file.buffer;
      }

      const { memberId, success, message } = await createMemberHandler(
        memberData
      );
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
  }
);

router.patch(
  "/member/update/:memberId",
  upload.single("passportPhoto"),
  async (req: Request, res: Response) => {
    const memberData = { ...req.body };
    if (req.file) {
      memberData.passportPhoto = req.file.buffer;
    }
    try {
      const result = await updateMemberHandler(
        req?.params?.memberId,
        memberData
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

router.get("/members/list", async (res: Response) => {
  try {
    const { success, members } = await getAllMembersHandler();
    if (success) {
      return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        members,
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Failed to get members",
    });
  } catch (error) {
    return res.status(StatusCodes.SERVER_ERROR).send({
      status: StatusCodes.SERVER_ERROR,
      message: "Internal server error!",
    });
  }
});

router.post(
  "/member/face-auth",
  upload.single("passportPhoto"),
  async (req: Request, res: Response) => {
    try {
      const { memberId, authType } = req.body;
      const photoBuffer = req.file?.buffer;

      if (!memberId || !photoBuffer) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: "Missing memberId or photo" });
      }
      const { success, message } = await faceAuthHandler({
        memberId,
        photoBuffer,
        authType,
      });
      return res.json({ success, message });
    } catch (error) {
      return res
        .status(StatusCodes.SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  }
);
