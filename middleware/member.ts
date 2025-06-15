import Member from "../models/member";
import { generateMemberId } from "../utils/utils";
import { MemberRequiredFieldsObject } from "../types/member";

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
