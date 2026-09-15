import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started at PORT:${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server", error);
    process.exit(1);
  }
};

startServer();
