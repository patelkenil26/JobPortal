import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import scheduleMeetingRouter from "./routes/scheduleMeetingRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";

const app = express();
config({path:"./config/config.env"});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/schedule",scheduleMeetingRouter);

dbConnection();

app.use(errorMiddleware);
export default app;