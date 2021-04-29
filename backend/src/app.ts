import express from "express";
import morgan from "morgan";
import cors from "cors";

import PublicRouter from "./routes/Public.routes";

//init
const app = express();

//config
app.set('port', process.env.PORT || 5000);
app.set('trust proxy', true);


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


//routes
app.use(PublicRouter);

export default app;