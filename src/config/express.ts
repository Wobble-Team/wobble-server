import express from 'express';
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

if (process.env.NODE_ENV === 'dev'){
    console.log("Running Local. Importing .env file");
    require("dotenv").config();
  }

import * as middlewares from "./middleware/middlewares";
import auth from "../app/routes/auth";
import testRoutes from '../app/routes/test';
import profileRoutes from '../app/routes/profile';


const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

//load routes to app
app.use('/profile', profileRoutes)
app.use('/api/test', testRoutes);
app.use('/auth', auth);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

    
export default app;

