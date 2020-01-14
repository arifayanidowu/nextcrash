require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { parse } = require("url");
const next = require("next");
const mongoose = require("mongoose");
const path = require("path");
const graphServer = require("./schema");

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`[MongoDB]: Connected to database successfully`))
  .catch(err => console.error(`Failed to connect to database: ${err}`));

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));

    server.get("/_next/*", (req, res) => {
      handle(req, res);
    });

    server.get("/public/*", (req, res) => {
      handle(req, res);
    });
    graphServer.applyMiddleware({ app: server });

    server.get("*", (req, res) => {
      handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    process.exit(1);
  });
