//index.js
//trong file nayf minhf sẽ dựng serrver bằng express
const express = require("express");

//chọn cổng 
const PORT = 4444;

//mỏe server
const server = express(); //tương đương http createServer

//mô phỏng kịch bản
server.get("/",(req,res)=>{
    res.send("Ahihi Đồ chó");  
});

server.get("/users",(req,res)=>{
    //vào db query xử lý
    res.send("danh sách các sinh viên nè ... ko có");  
});

server.get("/users/:id",(req,res)=>{
    let id = req.params.id;
    res.send("thông tin sinh viên có mã" + id);  
});

//mở server
server.listen(PORT,()=>{
    console.log("Server đang mở ở cổng " + PORT);
});
