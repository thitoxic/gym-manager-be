import Member from "../models/member";
import { generateMemberId } from "../utils/utils";
import { MemberRequiredFieldsObject } from "../types/member";
import { StatusCodes } from "../constants/constants";

export const createMemberHandler = async (data: MemberRequiredFieldsObject) => {
  const member = await Member.findOne({ phone: data.phone }).exec();
  if (member) {
    return {
      success: false,
      message: "Member already exists",
    };
  }
  const memberId = await generateMemberId(data?.fullName);
  const newMember = new Member({
    ...data,
    memberId,
  });
  try {
    await newMember.save();
    return { memberId, success: true, message: "Member created successfully" };
  } catch (err: any) {
    console.log("err", err);
    return { success: false, message: "Error creating member" };
  }
};

export const updateMemberHandler = async (memberId: string, data: any) => {
  const updatedMember = await Member.updateOne(
    { memberId },
    { $set: data },
    { new: true }
  );
  if (updatedMember?.modifiedCount === 0) return;
  if (!updatedMember) {
    return {
      success: false,
      message: "Member not found",
    };
  }
  return {
    success: true,
    message: "Member updated",
    memberId: memberId,
  };
};

export const getMemberHandler = async (memberId: string) => {
  const member = await Member.findOne({ memberId }).exec();
  if (!member) {
    return { success: false, message: "Member not found" };
  }
  return { success: true, member };
};

export const getAllMembersHandler = async () => {
  const members = await Member.find().exec();
  return { success: true, members };
};

export const deleteMemberHandler = async (memberId: string) => {
  const deletedMember = await Member.deleteOne({ memberId }).exec();
  if (deletedMember?.deletedCount === 0) return;
};
