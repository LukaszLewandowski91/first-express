const exp = require("constants");
const express = require("express");
const path = require("path");

const app = express();
const isUser = () => {
  return false;
};
app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.show("index.html");
});

app.get("/home", (req, res) => {
  res.show("index.html");
});

app.get("/about", (req, res) => {
  res.show("about.html");
});

app.use("/user/", (req, res, next) => {
  if (isUser()) next();
  else res.show("login.html");
});

app.use((req, res) => {
  res.status(404).show("error.html");
});

app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});
