import express from "express";
import cors from 'cors'
const app = express();
app.listen(8080, () => {
  console.log("server started");
});

app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.get("/greet", (req, res) => {
  res.send("Greetings");
});
app.get("/name", (req, res) => {
  res.send("Umadevi");
});
app.get("/weather", (req, res) => {
  res.send("35 degrees");
});
app.get("/products", (req, res) => {
  const products = [
    { name: "Product 1", price: 34 },
    { name: "Product 2", price: 64 },
    { name: "Product 3", price: 45 },
  ];
  res.json(products);
  
});

