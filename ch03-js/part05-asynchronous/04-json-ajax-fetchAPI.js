//04-json-ajax-fetchAPI

// JSON : js object notaion

// là 1 chuỗi được viết dưới dạng obejct của js
// dùng để lưu trữ | trao đổi dữ liệu giữa các hệ thống
//        (không quan trọng ngôn ngữ)

// ***json dùng để lưu 
//      string , number, boolean , array , object , nulll

//      undefine | hàm và method không lưu được 
// có 2 thao tác chính .parse | .stringify


//ví dụ obejct
const obj1 = {
    name: "Điệp",
    age: 30,
    status : "Single",
    sayHi(){
        console.log("Xin chào mọi người");
        
    }
}
// 1 prop undefine thì nó cũng ko lưu status : undegine
let myJson = JSON.stringify(obj1); // chỉ lưu prop và ko lưu đc method sayHi nha
console.log(myJson);
// tránh lặp đi lặp lại 1 công thức giống nhau và  nhiều obejtc có cùng 1 method => ko nên lưu 
// tại sao nó ko lưu đc hàm vì lưu sẽ bị lộ logic xử lý if else for do while
// tránh bất đồng cú pháp giữa các ngôn ngữ khác nhau 

// '{"name":"Điệp","age":30,"status":"Single"}'
// cú pháp
// - với object thì data là cặp key: value
// -data được ngăn bởi dấu ,
// - {} dùng để mô tả object
// = [] dùng để mô tả array
// - dùng "" để phân biệt với '' ở ngoài cùng
// - key trong object là string => phải trong ""
// đoán đáp án chuyển đổi 
let arr = ["cam", "chuối", "ổi"]; //'["cam", "chuối", "ổi"]'
//
let a = 22; //'22'
//
let str = "ahihi"; //'"ahihi"'
//
let isTrue = true; //'true'
//

// AJAX : Asynchronous javascript and XML
// AJAX : không phải ngôn ngữ lập trình
// ajax là tổ hợp công nghệ:

//Kỹ thuật AJAX được cấu thành từ ba bước logic chính này để 
// cập nhật nội dung trang mà không cần tải lại:


// -XMLHttpRequest(xhr): gửi | nhận request(yêu cầu) lên server | ko có trong be , giúp fe 
//                     chỉ có trong web brower giúp fe gửi và nhận yêu cầu 
// -js : xử lý logic
// -HTML DOM : giao diện giúp hiển thị



//thay thế XMLHttpRequest bằng fetch
// FetchAPI : cung cấp cho mình khả năng gửi | nhận request thông qua 
// trình duyệt dựa trên nền tảng là xhr
// sử dụng công nghệ Promise

//mockapi

// Faker ren dữ liệu ảo 

// Frontend: yêu cầu server cung cấp dữ liệu của table users
// be đã làm rồi nhiệm vụ của mk là keiemr chứng
// fetch là yêu cầu server cung cấp

// đây là lời hứa của server

// fetch("https://69057f57ee3d0d14c132c712.mockapi.io/users", {
//     method: "GET",
// })
//     .then((response) => {
//         //coi kiện hàng xem nó đóng gói như nào trước
//         // log(response);
//         //riêng fetch có khả năng ok xem trc 
//         if(response.ok){
//             return response.json(); //khui kiện hàng lấy data
//         }else{
//             throw new Error(response.statusText);
//         }
//     })
//     .then((data) => {
//         console.log("dữ liệu nè");        
//         console.log(data);
//     })
//     .catch((error)=>{
//         console.log("Lỗi server mất kết nối " + error);
//     });



// khi mã tốt thì mới khui kiện hàng
// statusText khi status != tốt => có teher dùng để in 

// then đầu xem nó ok ko , then sau mới tới bước xử lý 

//============================================


//tìm hiểu về request
/* Request
    method: GET POST PUT DELETE
    headers: lưu thông tin nhạy cảm mà người khác gửi mình, và tài nguyên
    paramString: chỉ lưu thông tin bth, lưu cái cần tìm(url)
    queryString: chỉ lưu thông tin bth, lưu cái cần tìm(url)
    body(POST, PUT): lưu mọi thứ, lưu thông tin nhạy cảm do mình cung cấp

*/

//lưu 1 user mới lên table users
// khai báo headers: {"Content-Type": "application/json"}, với hệ thống 
fetch("https://69057f57ee3d0d14c132c712.mockapi.io/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name: "Tuấn" , yob: 2005}),
    })
    .then((response) => {
        if(response.ok){
            return response.json(); //khui kiện hàng lấy data
        }else{
            throw new Error(response.statusText);
        }
    })
    .then((data) => {
        console.log("dữ liệu nè");        
        console.log(data);
    })
    .catch((error)=>{
        console.log("Lỗi server mất kết nối " + error);
    });