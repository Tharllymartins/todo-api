import express from "express";
import routes from "./routes";
import uploadConfig from "./config/upload";

const app = express();
app.use(express.json());
app.use(routes)
app.use('/files', express.static(uploadConfig.directory))


export default app;