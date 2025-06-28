import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SSID,
  process.env.TWILIO_AUTH_TOKEN
);

type SmsResponse = {
  success: boolean;
  message: any;
};

export const sendSms = async (
  phone: string,
  textMsg: string
): Promise<SmsResponse> => {
  if (!phone || !textMsg) {
    return {
      success: false,
      message: "required details not found!",
    };
  }
  try {
    const text = await client.messages.create({
      body: textMsg,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    return {
      success: true,
      message: "SMS sent successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
