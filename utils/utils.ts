import Admin from "../models/admin";

const generateAdminId = async (gymName) => {
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
export { generateAdminId };
