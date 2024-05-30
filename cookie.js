const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');  
// 配置CORS中间件
// 注意：这里使用了一个函数来动态设置origin，您需要根据实际情况调整
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin,'1=-1=1=1=');
    // 这里检查origin是否为预期的源，比如 'http://127.0.0.1:5500'
    // 这里为了示例简单，我们直接允许所有带有localhost的请求
    if (
      origin.startsWith("http://localhost:") ||
      origin === "http://127.0.0.1:5500" ||
      origin === 'http://192.168.1.42:5500'
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // origin: "http://localhost:5500", // 允许所有源
  credentials: true, // 允许发送Cookie
};

app.use(cors(corsOptions));
app.use(cookieParser());
// 其他的路由和中间件...
app.get("/api/cookie", (req, res) => {
  // Access-Control-Allow-Credentials

  // 这里可以根据实际情况设置Access-Control-Allow-Credentials
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("SameSite", "None")
  res.setHeader("Set-Cookie", "token=123456; Max-Age=900");
  // 这里可以根据实际情况设置Cookie，比如设置一个名为token的Cookie
  // httpOnly: true 
  // res.cookie("token", "123456", { maxAge: 900, });
  res.send("Cookie set successfully");
});
app.get("/api/test", (req, res) => {
  // 这里可以根据实际情况读取Cookie，比如读取名为token的Cookie
  const token = req?.cookies?.token || "No token found";

  if(token){
    // res.setHeader("Access-Control-Allow-Credentials", true);
    // res.setHeader("SameSite", "None")
    // res.setHeader("Set-Cookie", "token=123456; Max-Age=3000");
    // res.cookie("token", "123456", { maxAge: 900, });
  }
  // console.log(req?.cookies,'1=1=1==2-1=-2=1-2=1-2=1-2=1-2=1-2=1-',token);
  res.send(`Token: ${token}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
