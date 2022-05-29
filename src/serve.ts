import dotenv from "dotenv";
import "reflect-metadata";
import app from "./app";
import "./database"

dotenv.config()

app.listen(3333, () => {
    console.log("Server is running")
})
