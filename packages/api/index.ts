import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "db/connectDb";
import { createSeeds } from "db/seeds/createSeeds";
import getHotelsRoute from "./routes/hotels/getHotelsRoute";

const PORT = process.env.PORT || 3005;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", getHotelsRoute);

app.listen(PORT, async () => {
  try {
    await connectDb();
    await createSeeds();
    console.log(`API Server Started at ${PORT}`);
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
});

export default app;