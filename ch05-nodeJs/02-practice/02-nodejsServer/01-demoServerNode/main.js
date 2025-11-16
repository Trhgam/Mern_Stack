//main.js
//tập dựng server bằng http(Module có sẵn của js)
//đây là cách cổ xưa nhất để dựng server

const http = require("http");
//chọn cổng trên module để mở server
//cổng đó gọi là port , ko đc sửa
//fe 8000 be 4000 ng ta thích thi đặt nên mình đặt gì cũng được 
const PORT = 6789;

//tạo server : lời hứa(kịch bản)
const server = http.createServer((req,resp)=>{
    resp.setHeader("Content-Type","application/json"),
    resp.end("Xin chào bạn !!");
})

//mở server ở port đã nhắm tới
server.listen(PORT,()=>{
    console.log("Server đang mở ở cổng " + PORT);
});


