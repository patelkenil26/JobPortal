import mongoose from "mongoose";
import nodemailer from "nodemailer"

const scheduleMeetingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
  },
  jobSeekerEmail:{
    type:String,
    require:true,
  },
  date: {
    type: String,
    required: true,
  },
  applicationId: {
    type: String,
    required: true,
  },
});

scheduleMeetingSchema.post("save", async function (doc) {
  try {
    console.log("DOC",doc)

    let transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      }
    })

    // send mail
    let info =await transporter.sendMail({
      from:`JobZee`,
      to:doc.jobSeekerEmail,
      subject:"Schedule Meeting With recruiter",
      html:`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333;
            text-align: center;
            font-size: 24px;
            margin-bottom: 40px; /* Adds more space between heading and content */
          }
          p {
            color: #555;
            font-size: 16px;
            line-height: 1.6;
          }
          .schedule-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
          .schedule-details p {
            margin: 0;
            padding: 5px 0;
          }
          /* Custom styles for Date/Time and Application ID */
          .schedule-details .date-time, .schedule-details .app-id {
            background-color: #e0f7fa; /* Light blue background for these details */
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 10px;
            color: #00796b; /* Dark teal text color */
            font-weight: bold;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #aaa;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Your Meeting is Scheduled!</h2>
          <p>Dear ${doc.name},</p>
          <p>We are pleased to inform you that your meeting with the recruiter has been scheduled. Below are the details of the meeting:</p>
          
          <div class="schedule-details">
            <p class="date-time"><strong>Meeting Date & Time:</strong> ${doc.date}</p>
            <p class="app-id"><strong>Application ID:</strong> ${doc.applicationId}</p>
          </div>
          
          <p>We wish you the best of luck! If you have any questions or need to reschedule, feel free to reach out.</p>
          
          <p>Best regards,<br/>The JobZee Team</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} JobZee. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>`
  })

  console.log("info",info)
  } catch (error) {
    console.log(error);
    
  }
});

export const ScheduleMeeting = mongoose.model(
  "ScheduleMeeting",
  scheduleMeetingSchema
);
