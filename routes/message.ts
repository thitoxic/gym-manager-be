import { StatusCodes } from "../constants/constants";
import express from "express";
import { Request, Response } from "express";
import { sendSms } from "../middleware/message";

const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { phone, text } = req.body;
  try {
    const { success, message } = await sendSms(phone, text);
    if (success) {
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: message });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: true, message: message });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
});
