import Mailgun from 'mailgun-js';
import config from '../config';

const mailGunClient = new Mailgun({
  apiKey: config.MAILGUN.APIKEY,
  domain: config.MAILGUN.DOMAIN,
});

const sendEmail = (to: string, subject: string, html: string) => {
  const emailData = {
    from: 'c3dream@naver.com',
    to,
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (
  to: string,
  fullName: string,
  key: string
) => {
  const emailSubject = `Hello! ${fullName}, please verify your email!`;
  const emailBody = `Verify your email by clicking <a href="http://uber.facke.com/verification/${key}/">here</a>`;
  return sendEmail(to, emailSubject, emailBody);
};
