import { StatusCodes } from "../constants/constants";
import {
  changePasswordHandler,
  createAdminHandler,
  updateAdminHandler,
  verifyAdminHandler,
} from "../middleware/auth";
import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { adminId, phone, password } = req.body;
  try {
    const { success } = await verifyAdminHandler({ adminId, phone, password });
    if (!success) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        status: StatusCodes.UNAUTHORIZED,
        message: "Invalid phone number or password",
      });
    }
    return res.status(StatusCodes.OK).send({
      status: StatusCodes.OK,
      message: "Logged in Successfully!",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.SERVER_ERROR).send({
      status: StatusCodes.SERVER_ERROR,
      message: "Internal server error!",
    });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const { phone, password, fullName, email } = req.body;
  if (!phone || !password || !fullName) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: StatusCodes.BAD_REQUEST,
      message: "Please provide required information!",
    });
  }
  try {
    const { adminId, success } = await createAdminHandler({
      phone,
      password,
      fullName,
      email,
    });
    if (!success) {
      return res.status(StatusCodes.CONFLICT).send({
        status: StatusCodes.CONFLICT,
        message: "Admin user already exists",
      });
    }
    return res.status(StatusCodes.OK).send({
      status: StatusCodes.OK,
      message: "Admin user created successfully!",
      adminId,
    });
  } catch (error) {
    return res.status(StatusCodes.SERVER_ERROR).send({
      status: StatusCodes.SERVER_ERROR,
      message: "Internal server error!",
    });
  }
});

router.put("/update", async (req: Request, res: Response) => {
  const { adminId, email, phone, fullName } = req.body;
  console.log(" req.body", req.body);
  try {
    const { success } = await updateAdminHandler({
      adminId,
      email,
      phone,
      fullName,
    });
    if (success) {
      return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        message: "Admin details updated successfully!",
        adminId,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.SERVER_ERROR).send({
      status: StatusCodes.SERVER_ERROR,
      message: "Internal server error!",
    });
  }
});

router.put("/change-password", async (req: Request, res: Response) => {
  const { adminId, phone, currPassword, updatedPassword } = req.body;
  try {
    const { success, message, code } = await changePasswordHandler({
      adminId,
      phone,
      currPassword,
      updatedPassword,
    });
    if (success) {
      return res.status(StatusCodes.OK).send({
        status: StatusCodes.OK,
        message,
        adminId,
      });
    }
    return res.status(code).send({
      status: code,
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
