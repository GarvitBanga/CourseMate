const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
 

});
 
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});