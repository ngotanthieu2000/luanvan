import axios from 'axios';
const instance = axios.create({
  baseURL: `http://localhost:5000/api`,
  // timeout: 1000 * 30,
  headers:{
    'Content-Type':'application/json'
  }
})
export default instance;
export async function getCategories() {
  return await instance
    .get("/categories/get")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProducts() {
  return await instance
    .get("/product/get/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getReviews(data) {
  return await instance
    .get("/review/getbyproduct",{ params: data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}