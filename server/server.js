import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

/** import connection file */
import connect from "./database/conn.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

/** app middlewares */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
config();

/** appliation port */
const port = process.env.PORT || 8080;

/** routes */
app.use("/api", router); /** apis */

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/", (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

/** start server only when we have valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });
