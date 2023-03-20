<script step></script>
<template>
  <div class="addBlock" @click="showForm = true">新增產品</div>
  <template v-if="showForm">
    <div class="blurBackground">
    </div>
    <div class="productForm">
      <div class="form-header">
        <h2>新增商品</h2>
        <button class="close-button" @click="showForm = false">關閉</button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">產品名稱:</label>
          <input type="text" id="name" name="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="introduction">產品介紹:</label>
          <input type="text" id="introduction" name="introduction" v-model="form.introduction" required>
        </div>
        <div class="form-group">
          <label for="features">產品特徵:</label>
          <textarea id="features" name="features" v-model="form.features" required></textarea>
        </div>
        <div class="form-group">
          <label for="price">價格:</label>
          <input type="number" id="price" name="price" v-model="form.price" required>
        </div>
        <div class="form-group">
          <label for="contents">產品內容物:</label>
          <input type="text" id="contents" name="contents" v-model="form.contents" required>
        </div>
        <div class="formBottom">
          <div class="form-group">
            <label for="image">產品圖片:</label>
            <input type="file" id="image" name="image" @change="onFileChange" required>
          </div>
          <div class="form-group">
            <label for="category">產品分類:</label>
            <select id="category" name="category" v-model="form.category" required>
              <option value="">請選擇產品分類</option>
              <option value="耳罩式耳機">耳罩式耳機</option>
              <option value="耳塞式耳機">耳塞式耳機</option>
              <option value="音響">音響</option>
            </select>
          </div>

        </div>
        <div class="form-actions">
          <button type="submit">提交</button>
        </div>
      </form>
    </div>
  </template>
  <div class="products-list">
    <h2>產品列表</h2>
    <div class="product" v-for="(product, index) in products" :key="index">
      <img :src="product.image" alt="" />
      <h3>{{ product.name }}</h3>
      <button><router-link :to="`/product/${product._id}`" class="linkButton">查看</router-link></button>
      <button @click="editProduct(product)">修改</button>
      <button @click="deleteProduct(product._id)">刪除</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

let port = "https://mean-hands-drum-36-234-78-1.loca.lt";
// let port = "http://localhost:3000";

export default {
  data() {
    return {
      products: Array,
      showForm: false,
      form: {
        name: "",
        introduction: "",
        features: "",
        price: null,
        contents: "",
        category: "",
        image: null,
      },
      imageUrl: null,
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await axios.get(`${port}/api/products`);
        this.products = res.data.reverse();
        console.log(this.products);
        return this.products;
      } catch (err) {
        throw err;
      }
    },
    editProduct(product) {},
    async deleteProduct(id) {
      try {
        await axios.delete(`${port}/api/product/${id}`);
        console.log('刪除成功');
        this.getProducts()
      } catch (error) {
        console.error(error);
        console.log('axios錯誤');
      }
    },
    submitForm() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("introduction", this.form.introduction);
      formData.append("features", this.form.features);
      formData.append("price", this.form.price);
      formData.append("contents", this.form.contents);
      formData.append("category", this.form.category);
      formData.append("image", this.form.image);

      axios
        .post("/api/products", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFileSelected(event) {
      this.form.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.form.image);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.addBlock {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  background-color: #1f9151;
  color: #fff;
  font-size: 2.5rem;
  letter-spacing: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.8;

  &:hover {
    background-color: #2fad66;
    opacity: 1;
  }
}

.blurBackground {
  background-color: rgba(146, 145, 144, 0.824);
  filter: blur(2px);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 0;
}


.productForm {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 2.5px solid #D87D4A;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(247, 245, 245);
  z-index: 2;

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }

    .close-button {
      background-color: #ccc;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      background-color: rgb(188, 16, 16);
      opacity: .8;

      &:hover {
        background-color: rgb(188, 16, 16);
        opacity: 1;
      }
    }
  }

  form {
    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }

      input[type="text"],
      input[type="number"],
      textarea {
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        transition: all 0.2s ease-in-out;

        &:focus {
          border-color: #555;
        }
      }

      input[type="file"] {
        display: block;
        margin-top: 10px;
      }
    }

    .formBottom {
      display: flex;
      align-items: center;
      gap: 3rem;

      &>.form-group {
        width: 50%;
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button[type="submit"] {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #0062cc;
        }
      }
    }
  }
}

.products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;

  h2 {
    font-weight: 700;
    font-size: 2.5rem;
    text-align: center;
    width: 100%;
    padding: 1rem;
    letter-spacing: 0.75rem;
  }

  .product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: calc((100% - 7rem) / 8);
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
      object-fit: cover;
      height: 100px;
    }

    h3 {
      margin: 0;
      padding: 0.5rem 0;
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: center;
      max-height: 4.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      height: 3.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }


    button {
      display: block;
      width: 100%;
      padding: 0.5rem;
      margin-top: 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;

      .linkButton {
        width: 100%;
        height: 100%;
        display: block;
      }

      &:nth-child(5) {
        background-color: rgb(166, 41, 41);
        color: #fff;
      }

      &:nth-child(4) {
        background-color: #5f87ff;
        color: #fff;
      }

      &:nth-child(3) {
        background-color: #66cc66;
        color: #fff;
      }
    }
  }
}


@media (max-width: 768px) {
  .products-list {
    .product {
      width: calc((100% - 5rem) / 4);
    }
  }
}

@media (max-width: 576px) {
  .products-list {
    .product {
      width: calc((100% - 3rem) / 2);
    }
  }
}
</style>
