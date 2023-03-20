import express from "express";

import cors from "cors";
// import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 3000;

import mongoose from "mongoose";
import Product from "./productSchema.js";
const dbUrl =
  "mongodb+srv://dhoper777:apollo777@ecommerce-website.v7ymhpd.mongodb.net/?retryWrites=true&w=majority" ||
  "mongodb://127.0.0.1:27017/ecommerce-website";

async function main() {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
main()
  .then((solved) => console.log(solved, "success!!!"))
  .catch((err) => console.log("777", err));

  app.use(cors({
    origin: 'http://localhost:5173', // 允許跨來源的網域
    optionsSuccessStatus: 200, // 將所有請求的 HTTP 狀態碼設定為 200
    credentials: true // 允許搭配驗證資訊 (例如 Cookie) 傳送
  }));

///////////////API/////////////////

app.get("/api/products/:category", async (req, res) => {
  const searcher = req.params.category;
  try {
    const products = await Product.find({ category: searcher });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  const searcher = req.params.id;
  try {
    const product = await Product.find({ _id: searcher });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/product', async (req, res) => {
  try {
    const newItem = await Product.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.put('/api/product/:id', async (req, res) => {
  try {
    const updatedItem = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); 
    if (!updatedItem) {
      return res.status(404).send('Data not found');
    }
    res.json(updatedItem); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });
    res.send({ message: '刪除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '伺服器錯誤' });
  }
});



app.listen(port, () => console.log(`Server running on port ${port}`));
