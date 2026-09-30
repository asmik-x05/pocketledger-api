import nodemailer from "nodemailer";
import config from "../config/config.js";
import { resetPasswordTemplate } from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

export const sendResetEmail = async (
  to: string,
  name: string,
  resetLink: string,
) => {
  await transporter.sendMail({
    from: `"PocketLedger" <${config.user}>`,
    to,
    subject: "Reset your PocketLedger password",
    html: resetPasswordTemplate(name, resetLink),
  });
};
