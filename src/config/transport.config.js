import nodemailer from "nodemailer";

function transporter() {
   try {
      return nodemailer.createTransport({
         service: "gmail",
         // port: 587,
         // secure: false,
         auth: {
            user: process.env.EMAIL_USER || "felipe524.fernandes@gmail.com",
            pass: process.env.EMAIL_PASSWORD || "vbct wfzx dbmp zsue",
         },
      });
   } catch (error) {
      throw error;
   }
}

export default transporter;
