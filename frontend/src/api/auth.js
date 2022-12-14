import axios from "axios";


const instance = axios.create({
  baseURL: `http://localhost:5000/api`,
  // timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true
});

 // xu ly data truoc khi xuong server
 instance.interceptors.request.use(
  async (config) => {
    
    if(config.url.indexOf('/user/login') >= 0 || config.url.indexOf('/user/refreshtoken') >= 0 || config.url.indexOf('/user/register') >= 0){
      // console.log("Khong can verify ne!")
      // console.log("Data truoc khi xuong server::::", config);
      return config;
    }

    const now = new Date().getTime()
    const timeExpired = localStorage.getItem("timeExpired")
    if(timeExpired < now){
      try {
        // console.log(`Now (${now}) --- timeExpired(${timeExpired}) ::: Token Expired.`);
        const {status} = await refreshToken();
        if(status === 'Success'){
          // console.log("Data truoc khi xuong server::::", config);
          return config;
        }
      } catch (error) {
        return  Promise.reject(error)
      }
    }
    else{
      return config;
    }
    // console.log("Data truoc khi xuong server::::", config);
  },
  (err) => {
    return Promise.reject(err);
  }
);

// xu ly data khi response tu server
instance.interceptors.response.use(
  (response) => {
    // console.log("Data sau khi response tu server::::", response);
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
// user
export async function login(data) {
  return await instance
    .post("/user/login", data)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });
}
export async function getAllUser() {
  return await instance
    .get("/user/get/all")
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });
}

export async function verify() {
  return await instance
    .get("/user/verify",)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function refreshToken() {
  return await instance
    .get("/user/refreshtoken",)
    .then((res) => {
      localStorage.setItem('timeExpired',res.data.timeExpired);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function changeAvatar(data) {
  return await instance
    .post("/user/change-avatar", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function updateUser(data) {
  return await instance
    .put("/user/update", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function disableUser(data) {
  return await instance
    .put("/user/disable", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function activeUser(data) {
  return await instance
    .put("/user/active", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function validAdmin(data) {
  return await instance
    .post("/user/valid/admin", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function createProduct(data) {
  return await instance
    .post("/product/create", data)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err.response?.data;
    });
}export async function updateProduct(data) {
  return await instance
    .put("/product/update/product", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
//categories
export async function createCategories(data) {
  return await instance
    .post("/categories/create", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function updateCategories(data) {
  return await instance
    .put("/categories/update", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
// brand
export async function createBrand(data) {
  return await instance
    .post("/brand/create", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
// inventory
export async function updateInventory(data) {
  return await instance
    .put("/product/update/inventory", data)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      return err?.response?.data;
    });
}
//Review
export async function createReview(data) {
  return await instance
    .post("/review/create", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
// cart
export async function createCart(data) {
  return await instance
    .post("/cart/create", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getCart(data) {
  return await instance
    .get("/cart/products", {params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function postAddToCart(data) {
  return await instance
    .post("/cart/add/product", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function postUpdateCartClone(data) {
  return await instance
    .post("/cart/add/clone", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function removeItemCart(data) {
  return await instance
    .delete("/cart/item/product", { data: data })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
//  Product
export async function disableProduct(data) {
  return await instance
    .put("/product/disable", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}export async function activeProduct(data) {
  return await instance
    .put("/product/active", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
//stripe
export async function checkOutStripe(data) {
  return await instance
    .post("/stripe/create-checkout-session", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function retrieveSessionCheckOut(data) {
  return await instance
    .post("/stripe/retrieve-checkout-session", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
//order
export async function createOrder(data) {
  return await instance
    .post("/order/create", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getAllOderByUser(data) {
  return await instance
    .get("/order/all/by/user", {params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getAllOrder() {
  return await instance
    .get("/order/all")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getOrderById(data) {
  return await instance
    .get("/order/by/id", {params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function getOrderByPaymentIntent(data) {
  return await instance
    .get("/order/get/by/payment-intent", {params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function approveOrder(data) {
  return await instance
    .put("/order/approve", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function rejectOrder(data) {
  return await instance
    .put("/order/reject", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
// recommenders
export async function getRecommenders(data) {
  return await instance
    .get("/user/get/recommenders", {params:data})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function trainingRecommender() {
  return await instance
    .post("/recommender/setdata")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}