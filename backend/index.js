import express from 'express'
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { serverConnection } from './Config/server/mongodB.js';
import userRoutes from './Routes/userRoutes.js';


const app = express()

// middleware 
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//  routes
app.use('/', userRoutes)
app.use('/admin', userRoutes)

serverConnection().then(() => app.listen(8000, () => console.log('server start')))

