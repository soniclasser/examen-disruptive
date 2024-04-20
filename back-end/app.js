const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const connectToMongoDB = require('./db/db-connection');

const categoriesRouter = require('./src/routes/categories');
const topicsRouter = require('./src/routes/topics');
const authRoutes = require('./src/routes/auth');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  mdethods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/category', categoriesRouter);
app.use('/v1/api/topic', topicsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});