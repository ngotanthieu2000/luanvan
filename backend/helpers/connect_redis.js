const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "redis-16679.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 16679,
  },
  password: "XyZwVQzFOGCBWAh5qBJbtuRXUNdT5UTi",
});

client.on("error", (err) => {
  if(err) return console.log(err);
});

client.on("ready", (err) => {
    if(err) return console.log(err);
    console.log("Redis to ready");
});

client.on("connect", (err) => {
    if(err) return console.log(err);
    console.log("Connect success")
});
const runApplication = async () => {
    await client.connect();

//     await client.set('key', c'value123');
    // const value = await client.get('key');
    // console.log('value::: ' + value);
};

runApplication();

module.exports = client;
