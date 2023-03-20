import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import ProductList from "./pages/ProductList.vue";
import Product from "./pages/Product.vue";
import BackEnd from "./pages/BackEnd.vue";
let port = "https://1fab-2001-b011-9820-3bc6-c0a0-8079-3278-d3a1.jp.ngrok.io";
// let port = "http://localhost:3000";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", 
    component: Home, 
    name: "Home" },
    {
      path: "/productList/:category",
      component: ProductList,
      name: "ProductList",
      props: true,
    },
    {
      path: "/product/:id",
      component: Product,
      name: "Product",
      props: true,
    },
    {
      path: "/backEnd",
      component: BackEnd,
      name: "BackEnd",
    },
  ],
});
export default router;

import axios from "axios";

export function getProducts(category) {
  return axios.get(`${port}/api/products/${category}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
export function getProduct(id) {
  return axios.get(`${port}/api/product/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function getAllProduct() {
  return axios.get(`${port}/api/products`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function deleteProduct(id) {
  return axios.delete(`${port}/api/product/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

