import axios from 'axios';


const instance = axios.create({
  baseURL: `https://v3-api.fpt.ai/api/v3`,
  // timeout: 1000 * 30,
  headers:{
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${process.env.REACT_APP_URL_FPT_AI_TOKEN}`
  },
  withCredentials: true
})
export default instance;
export async function createIntent(data) {
  return await instance
    .post("/intent", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
