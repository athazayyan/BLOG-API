import express from "express";
import http from "http";
import bodyparser from "body-parser";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import postRoutes from "./router/postRoutes";


const app = express();


app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyparser.json());
app.use(compression());
app.use(cookieParser());


const server = http.createServer(app);

app.use('/api/posts', postRoutes);


const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://athirasulbar121:WcVPFYkFoVSwqpN8@blog.fwpsxq5.mongodb.net/?retryWrites=true&w=majority&appName=Blog";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});


server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});