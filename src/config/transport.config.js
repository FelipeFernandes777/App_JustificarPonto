import nodemailer from "nodemailer";

function transporter(data) {
   console.log(data);

   try {
      return nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: data.email || process.env.EMAIL_USER,
            pass: data.passApp || process.env.EMAIL_PASSWORD,
         },
      });
   } catch (error) {
      throw error;
   }
}

export default transporter;
