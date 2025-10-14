import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authRouter from "./routes/userAuth.js";

const port = 3000;
const app = express();

app.get('/api/ping', (_req, res) => res.json({ ok: true }));
app.use((req, _res, next) => {
  console.log("REQ", req.method, req.path);
  next();
});


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/api/user", (req, res) => {
  res.json({ me: req.user });
})

app.get("/", (_req, res) => res.send("API OK"));

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}).catch(err => {
  console.error(`DB connect failed: ${err}`);
  process.exit(1);
});
