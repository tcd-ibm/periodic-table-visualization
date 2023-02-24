const nodemailer = require("nodemailer");
require("dotenv").config();
const userEmail = process.env.EMAIL;
const password = process.env.PASSWORD;

//transport has the sender information for authentication
const transport = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  service: "hotmail",
  auth: {
    user: userEmail,
    pass: password,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail(
    {
      from: userEmail,
      to: email,
      subject: "Please confirm your account",
      html: `<div>
    <h1>Email Confirmation</h1>
    <h2> Hello ${name} </h2>
    <p>Thank you for registering. Please confirm your email by clicking on the following link:</p>
    <a href=http://localhost:8080//?#/verify/${confirmationCode}>Click here</a>
    <p>This link will be active for <b>7 days</b>. You will need to register again if you have not verified your email by that time</p>
    </div>`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info);
    }
  );
};
module.exports = {
  sendConfirmationEmail,
};
