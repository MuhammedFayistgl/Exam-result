import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { serverConnection } from "./Config/server/mongodB.js";
import userRoutes from "./Routes/userRoutes.js";
import AdminRoute from "./Routes/adminRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin:"http://localhost:5173", credentials: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });
  
//  routes
app.use("/user", userRoutes);
app.use("/admin", AdminRoute);

serverConnection().then(() => app.listen(8000, () => console.log("server start")));
