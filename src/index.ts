import express from "express";
import taskRoute from "./routes/task.route";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/v1/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Task Management API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
