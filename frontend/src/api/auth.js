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
      console.log("Khong can verify ne!")
      console.log("Data truoc khi xuong server::::", config);
      return config;
    }

    const now = new Date().getTime()
    const timeExpired = localStorage.getItem("timeExpired")
    if(timeExpired < now){
      try {
        console.log(`Now (${now}) --- timeExpired(${timeExpired}) ::: Token Expired.`);
        const {status} = await refreshToken();
        if(status === 'Success'){
          console.log("Data truoc khi xuong server::::", config);
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
    console.log("Data sau khi response tu server::::", response);
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;

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
export async function createProduct(data) {
  return await instance
    .post("/product/create", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
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
export async function updateInventory(data) {
  return await instance
    .put("/product/update/inventory", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
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