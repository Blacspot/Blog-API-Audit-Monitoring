const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/analytics", analyticsRoutes);

module.exports = app;