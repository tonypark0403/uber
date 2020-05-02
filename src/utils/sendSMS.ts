import Twilio from 'twilio';
import config from '../config';

const twilioClient = Twilio(
  config.TWILIO.TWILIO_SID,
  config.TWILIO.TWILIO_TOKEN
);

const sendSMS = (to: string, body: string): Promise<any> => {
  return twilioClient.messages.create({
    body,
    to,
    from: config.TWILIO.TWILIO_PHONE,
  });
};

export const sendVerificationSMS = async (
  to: string,
  key: string
): Promise<void> => await sendSMS(to, `Your verification key is: ${key}`);
