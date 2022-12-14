import axios from 'axios';
const instance = axios.create({
  baseURL: `http://localhost:5000/api`,
  // timeout: 1000 * 30,
  headers:{
    'Content-Type':'application/json'
  }
})
export default instance;
export async function register(data) {
  return await instance
    .post("/user/register", data)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });
}
export async function checkAdmin(data) {
  return await instance
    .get("/user/check_admin", {params:data})
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });
}
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
// brand
export async function getBrands() {
  return await instance
    .get("/brand/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getBrandsByCategories(data) {
  return await instance
    .get("/brand/by/categories",{params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
// products
export async function getAllProducts() {
  return await instance
    .get("/product/get/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProducts() {
  return await instance
    .get("/product/get")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getListProductFeatured() {
  return await instance
    .get("/product/get/by/featured")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductsByName(data) {
  return await instance
    .get("/product/get/by/name",{params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductsByType(data) {
  return await instance
    .get("/product/get/by/type",{params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductsByRating() {
  return await instance
    .get("/product/get/by/rating")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductsBySold() {
  return await instance
    .get("/product/get/by/sold")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductsByCategoriesAndType(data) {
  return await instance
    .get("/product/get/by/categories/type", {params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductById(data) {
  return await instance
    .get("/product/get/id",{params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getProductFilterBrand(data) {
  return await instance
    .get("/product/get/filter/brand",{params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getInventory(data) {
  return await instance
    .get("/product/get/inventory",{params:data})
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
export async function checkAuthReview(data) {
  return await instance
    .post("/review/check/auth",data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function getRetrievePaymentIntent(data) {
  return await instance
    .get("/stripe/retrieve-payment-intent",{ params: data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function updateBehavioursByView(data) {
  return await instance
    .put("/behaviours/update/by/view",data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}



