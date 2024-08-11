import express from "express";
import swagger from "swagger-ui-express";
import docsFile from "./swagger.json";
import cors from "cors";
import { corsUrl } from "./config";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use("/api", routes);

app.use("/docs", swagger.serve, swagger.setup(docsFile));

export default app;