import "dotenv/config";
import app from "./app.js";
import connectDB from "./src/config/db.config.js";

//MongoDB DNS Lookup fix, now set to OpenDNS from default windows
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", ["8.8.8.8"]]);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at PORT:${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server", error);
    process.exit(1);
  }
};

startServer();
