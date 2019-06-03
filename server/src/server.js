import fastify

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const request = require("request");
const { LOGGER, API_HOST, PORT } = require("./config/index");
const helmet = require("helmet");

const app = express();

app.use(helmet());

app.use(morgan(LOGGER));

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  next();
});

app.use(
  "/service-worker.js",
  express.static(path.join(__dirname, "build/service-worker.js"), { maxAge: 0 })
);
app.use(express.static(path.join(__dirname, "build")));

const apiCall = (req, res) => {
  const config = {
    method: req.method,
    url: `${API_HOST}${req.url}`,
    headers: req.headers,
    timeout: req.timeout,
    rejectUnauthorized: false
  };
  return request(config, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }
    res.removeHeader("X-Powered-By");
    res.status(response.statusCode).send(body);
  });
};

app.use("/api", (req, res) => {
  req.pipe(apiCall(req, res));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

const port = PORT || 5000;
app.listen(port, () => console.log(`Proxy listening on ${port}`));
