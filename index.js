const express = require("express");
const fs = require("node:fs");

const productsLists = require("./products.json");
const arr = null;
const app = express();

const apiKey = "zsd02-asdf3-f3243";

const writeFile = (logString) =>
  fs.appendFileSync("access.log", logString + "\n");


app.use((req, res, next) => {
 
  console.log(`Request URL : ${req.url}, Time : ${new Date()}, IP : ${req.ip}`,"name : sakshi");

  next(); 
});



app.get("/product-list/:id", (req, res, next) => {
 
  console.log("(3) ROUTE LOGIC");
  const product = productsLists.find((product) => product.id == req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with Id ${req.params.id} not found`,
    });
  }
  ;
  res.json({
    success: true,
    results: product,
  });
});





app.use((err, req, res, next) => {
  console.log("(4) ERROR HANDLER");
  res.status(500).json({
    success: false,
    message: "Something went wrong, please try again after some time",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(5000, () => {
  console.log("Server is up and running at port 5000");
});