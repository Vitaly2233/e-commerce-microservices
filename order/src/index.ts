import express from "express";
import cors from "cors";
import { CONFIG } from "./common/config";
import bodyParser from "body-parser";
import { errorHandlerMiddleware } from "./common/middleware/error-handler.middleware";
import { setupRoutes } from "./router";

const app = express();
const port = CONFIG.SERVER_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

setupRoutes(app);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
