import {
  registerRequest,
  loginRequest,
  updateRequest,
  changePasswordRequest,
  ChangePasswordResponse,
} from "../types/auth";
import Admin from "../models/admin";
import CryptoJS from "crypto-js";
import { generateAdminId } from "../utils/utils";

export const verifyAdminHandler = async (data: loginRequest) => {
  const { adminId, phone, password } = data;
  const admin = await Admin.findOne({
    $or: [{ adminId }, { phone }],
  }).exec();
  if (!admin) return { success: false };
  const bytes = CryptoJS.AES.decrypt(admin?.password, "admin-gm");
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8).trim();
  if (password !== originalPassword) {
    return { success: false };
  }
  return { adminId: admin?.adminId, success: true };
};

export const createAdminHandler = async (data: registerRequest) => {
  const { phone, password, fullName, email } = data;
  const admin = await Admin.findOne({ phone }).exec();
  if (admin) return { adminId: admin.adminId, success: false };
  const adminId = await generateAdminId("Muscle Build");
  const newAdmin = new Admin({
    adminId,
    phone,
    fullName,
    email,
    password: CryptoJS.AES.encrypt(password, "admin-gm").toString(),
  });
  try {
    await newAdmin.save();
    return { adminId, success: true };
  } catch (err: any) {
    console.log("err", err);
    return err;
  }
};

export const updateAdminHandler = async (data: updateRequest) => {
  const { adminId, email, phone, fullName } = data;
  try {
    const updatedAdmin = await Admin.updateOne(
      { adminId },
      { $set: { email, phone, fullName } }
    );
    if (updatedAdmin?.modifiedCount === 0) return;
    return { adminId, success: true };
  } catch (err: any) {
    console.log("err", err);
    return err;
  }
};

export const changePasswordHandler = async (
  data: changePasswordRequest
): Promise<ChangePasswordResponse> => {
  const { adminId, phone, currPassword, updatedPassword } = data;
  try {
    const admin = await Admin.findOne({
      $or: [{ adminId }, { phone }],
    }).exec();
    if (admin) {
      const bytes = CryptoJS.AES.decrypt(admin?.password, "admin-gm");
      const passwordFromDb = bytes.toString(CryptoJS.enc.Utf8).trim();
      if (currPassword !== passwordFromDb) {
        return {
          success: false,
          message: "Current password is incorrect",
          code: 401,
        };
      }
      if (currPassword === passwordFromDb) {
        let newPassword = CryptoJS.AES.encrypt(
          updatedPassword,
          "admin-gm"
        ).toString();
        console.log("newPassword", newPassword);
        const updatedAdmin = await Admin.updateOne(
          {
            adminId: admin?.adminId,
          },
          {
            $set: {
              password: newPassword,
            },
          }
        );
        console.log("updatedAdmin", updatedAdmin);
        if (updatedAdmin?.modifiedCount === 0)
          return {
            success: false,
            message: "Password update failed",
            code: 500,
          };
        return {
          success: true,
          message: "Password updated Successfuly!",
        };
      }
    }
    return { success: false, message: "Admin not found!", code: 404 };
  } catch (err) {
    console.log("err", err);
    return { success: false, message: "Internal server error", code: 500 };
  }
};
