export const memberRequiredFields = [
  "fullName",
  "phone",
  "email",
  "gender",
  "dob",
  "address",
  "admissionDate",
  "membershipType",
  "membershipExpiry",
  "height",
  "weight",
  "bmi",
  "medicalConditions",
] as const;

export type MemberRequiredField = (typeof memberRequiredFields)[number];

export type MemberRequiredFieldsObject = {
  [K in MemberRequiredField]: any;
};
