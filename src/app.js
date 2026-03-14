const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const authRoutes = require('./routes/auth.routes');
const auditRoutes = require('./routes/audit.routes');
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/audit', auditRoutes);

app.use(errorHandler);

module.exports = app;