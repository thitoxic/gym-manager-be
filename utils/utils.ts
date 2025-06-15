import Admin from "../models/admin";
import Member from "../models/member";

const generateAdminId = async (gymName: string) => {
  const initials = gymName
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  const latestAdmin = await Admin.findOne().sort({ createdAt: -1 }).exec();

  let increment = 1;
  if (latestAdmin && latestAdmin.adminId.startsWith(initials)) {
    const currentNumber = parseInt(
      latestAdmin.adminId.slice(initials.length),
      10
    );
    increment = currentNumber + 1;
  }

  return `${initials}${increment}`;
};

const generateMemberId = async (memberName: string) => {
  const initials = memberName
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  const allMembers = await Member.find({
    memberId: { $regex: /[A-Z]+\d+$/ },
  }).exec();

  let maxNumber = 0;
  allMembers.forEach((member) => {
    const match = member?.memberId?.match(/\d+$/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!isNaN(num) && num > maxNumber) {
        maxNumber = num;
      }
    }
  });

  const increment = maxNumber + 1;
  return `${initials}${increment}`;
};
export { generateAdminId, generateMemberId };

const compareFaces = async (photoBuffer: Buffer, passportPhoto: Buffer) => {
  return true;
};

export { compareFaces };
