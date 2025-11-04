// axious http client hỗ trợ gửi | nhận request
// cho browser và server-side(node js)

//đc build bằng http , sơ khai hơn xml nên nó chạy đc cả 2 nền tảng

//tự mở kiện hàng mà ko cần dùng .json
// axios({
//     url: "https://69057f57ee3d0d14c132c712.mockapi.io/users",
//     method: "get",
// })
//     .then((response)=>{
//         // console.log(response);
//         if(response.status >= 200 && response.status < 300){
//             //xử lý data
//             return response.data;
//         }else{
//             throw new Error(response.statusText);
//         }
//     })
//     .then((data)=>{
//         console.log("Dữ liệu nè!!!");
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log("Server mất kế nối vì"+error);
//     })


// demo method post
axios({
    url: "https://69057f57ee3d0d14c132c712.mockapi.io/users",
    method: "post",
    data: {
        name:"Tuấn",
        yob:"2005",
    },
})
    .then((response)=>{
        // console.log(response);
        if(response.status >= 200 && response.status < 300){
            //xử lý data
            return response.data;
        }else{
            throw new Error(response.statusText);
        }
    })
    .then((data)=>{
        console.log("Dữ liệu nè!!!");
        console.log(data);
    })
    .catch((error) => {
        console.log("Server mất kế nối vì"+error);
    })


    //viết tắt

    axios
    .post("https://69057f57ee3d0d14c132c712.mockapi.io/users",{
        name:"Tuấn",
        yob:"2005",
    })
    .then((response)=>{
        // console.log(response);
        if(response.status >= 200 && response.status < 300){
            //xử lý data
            return response.data;
        }else{
            throw new Error(response.statusText);
        }
    })
    .then((data)=>{
        console.log("Dữ liệu nè!!!");
        console.log(data);
    })
    .catch((error) => {
        console.log("Server mất kế nối vì"+error);
    })

//instance
let instance = axios.create({
    baseURL: "https://69057f57ee3d0d14c132c712.mockapi.io",
    timeout: 10000, //sau 10s thì tự thoát
    haeders:{ "Content-Type": "application/json"},
});

instance.get("users"); //lấy table users
instance.get("users").then(); //lấy table users)\


// nên học Request Config , Interception, handing error
