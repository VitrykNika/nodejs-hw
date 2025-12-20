import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

if (process.env.NODE_ENV !== "production") {
  transporter.verify((err, success) => {
    if (err) console.error("SMTP VERIFY ERROR:", err);
    else console.log("SMTP VERIFY OK:", success);
  });
}

export const sendEmail = (options) => transporter.sendMail(options);
