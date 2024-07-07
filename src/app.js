if (process.env.USER) require("dotenv").config();
const errorHandler = require("./errors/errorHandler");
const cors = require('cors'); 

const app = express();
app.use(cors());

const express = require("express");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(errorHandler);


module.exports = app;
