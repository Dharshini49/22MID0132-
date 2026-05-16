import axios from "axios";

const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

export async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log("Frontend Log Success:", response.data);
  } catch (error) {
    console.log(
      "Frontend Log Failed:",
      error.response?.data || error.message
    );
  }
}