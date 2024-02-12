const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const jw = express();
jw.set("port", process.env.PORT || 3009);

app.use(morgan("dev"));

jw.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./main.html"));
});
jw.get("/jw-1", (req, res) => {
  res.sendFile(path.join(__dirname, "./jw-1.html"));
});
jw.get("/jw-2", (req, res) => {
  res.sendFile(path.join(__dirname, "/jw-2.html"));
});

jw.listen(3009, () => {
  console.log("준우서버3009번 시작");
});

jw.listen(3009, () => {
  console.log("준우서버 ㄱㄱ");
});
