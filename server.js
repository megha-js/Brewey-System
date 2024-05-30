import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import breweryRouter from "./routes/breweryRoute.js";
import authRouter from "./routes/authRoute.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
// Load environment variables from .env file
dotenv.config();

const app = express();

// Use morgan middleware in development environment for logging requests and responses
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Use cors middleware to allow cross-origin requests
app.use(cors());

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount auth routes at /api/v1/auth
app.use("/api/v1/auth", authRouter);

// Mount breweries routes at /api/v1/breweries
// Authenticate breweries before accessing breweries routes
app.use("/api/v1/breweries", authenticateUser, breweryRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Mount middleware for handling 404 not found errors
app.use(notFoundMiddleware);

// Mount middleware for handling all other errors
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

// Connect to database and start the server
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server is running on ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();