const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    console.log("Log created:", response.data);
  } catch (error) {
    console.log(
      "Logging failed:",
      error.response?.data || error.message
    );
  }
}

app.get("/", async (req, res) => {
  await Log(
    "backend",
    "info",
    "route",
    "Root route accessed successfully"
  );

  res.send("Backend working successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});