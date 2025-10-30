//02-promise.js

// Promise: Lời hứa diễn ra trong tương lai
// 1 lời hứa sẽ có 3 trạng thái 
// lần tới anh khảo bài em sẽ học hành đầy đủ , nếu không học thì em nghỉ luôn 
// nếu có học bài mong anh xóa sẹo cho em

// pending: là giai đoạn chờ xử lý cho đến khi có [kết quả] , tính từ bây giừo đến lần khảO bài tiếp theo 

// on fulfilled : đã có kết quả và lời hứa này (thành công) - resolve("anh xóa sẹo")
//                 resolve là điều mình mong muốn chứ ko chắc chắn là điều anh làm 
// on rejected : đã có kết quả (thất bại) - reject("nghỉ học")

// ko có promise nào vừa ful\lfilled vừa rejected đc nha

//cú pháp Promise : ko nhận vào resolve, reject mà nhận vào 1 callback nha
new Promise(function (resolve, reject){});
new Promise( (resolve, reject)=>{});

//===========================================
//*** mô tả một lời hứa dưới dạng code
/*
Anh người yêu hứa vưới cô gái rằng "cuối tháng này anh sẽ mang 5000 về 
cho em , nếu không thì em cứ gọi anh là "jack con" nhưng nếu được anh mong 1 nụ hôn
*/


// let wallet = prompt("Nhập tiền vào ví: "); //sếp , tác nhân thứ 3 tác động đến lời hứa

// //anh người yêu hứa
// let p1 = new Promise((resolve, reject) => {
//     if(wallet >= 5000) resolve("1 nụ hôn");
//     else reject("jack con");
// });

// //cô gái kiểm chứng
// p1.then((value)=>{
//     console.log("em cho anh " + value);
// }).catch((error)=>{
//     console.log("Mày chỉ là thằng "+ error);
// });
// //then(tương đương với resolve), value là những gì có trong resolve
// //catch(tương đương với reject), error là những gì có trong reject


//=====================================================
// mô phỏng server hoạt động: hiểu đc vai trò của promise
// fe và be giao tiếp với nhau = lời hứa
//frontend: yêu cầu backend cung cấp dữ liệu (fetchAPI ,AXios)
//backend: tiếp nhận yêu cầu, tui sẽ xử lý cho anh ngay

// let p2 = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve({
//             status : 200, //oke
//             data : {fname : "Điệp" , age:"30"},
//         })
//     },2000); 
// });


// // Tìm hiểu response(kiện hàng) từ server
// // 1.server chỉ reject khi mất mạng
// // 2.nếu em đủ điều kiện nhận data
// // resolve({
// //      status: 2xx,
// //      data: dữ liệu
// // })
// // 3.nếu em k đủ điều kiện nhận data
// // resolve({
// //      status: 4xx,
// //      message: câu chữi
// // })

// //frontend : kiểm chứng lười hứa
// p2.then((response)=>{
//     if (response.status >= 200 && response.status < 300) {
//     console.log("Đã có dữ liệu rồi nè");
//     console.log(response.data);
//     } else if (response.status >= 400 && response.status <= 500) {
//     console.log(response.message);
//     }
// }
// ).catch((error)=>{
//     console.log("Server cúp điện");
    
// });

//mở cmt 2 lần ms bt đc nha
//================================================================
//Promises are eager not lazy 
let a = 1;

// let p3 = new Promise((resolve, reject) => {
//     a++;//2
// });
//khi có lệnh new Promise thì lời hứa đã được tính rồi chứ ko phải chờ gọi ra thì nó mới chạy đâu nha

console.log(a);
p3.then().catch();
// Do tính chất của Promise là như vậy nên nếu hệ thống có 10000000 request thì cũn có tương ứng 100000
// promise xử lý then catch , 
// mà khi tạo ra quá nhiều promise như vậy , nó sẽ chạy liên tục 100000 promise mà khi ng dùng chỉ 
// gọi 1 red , ==> nó bị phí á
// nên ta cần xử lý theo cách khác để nó ko bị phí phạm nha
// cách xử lý khi có quÁ nhiều lời hứa là nên cất nó vô , khi nào cần sẽ gọi 
//cách 1: 
// function handle(){
//     return new Promise((resolve, reject) => {
//         a++;
//     });
// }
// handle();

// // cách 2
// let p3 = () => {
//     new Promise((resolve, reject) => {
//         a++;
//     });
// }
// console.log(a);


//1 promise thì sẽ chỉ có thể rơi vào 1 trong 3 trạng thái 
//pending | on fulfilled | on rejected
//        | resolve      | reject
//        | then         | catch

// resolve trả giá trị cho then
// reject trả giá trị cho catch

//***resolve và reject giống return nhưng không chia luồng và ko dừng lại

// let p4 = new Promise((resolve, reject)=> {
//     return resolve("ahihi");
//     reject("Lỗi nè");
//     console.log("Xin chào");
// });
// //kiểm chứng
// p4.then((value)=>{
//     console.log("Giá trị nè "+ value);
// }).catch((error)=>{
//     console.log( "Lỗi nè : " + error);
// });
//-------------------------------------------------------
//new Promise((resolve, reject)=> {
//     return resolve("ahihi");         tui cmt riêng
//     reject("Lỗi nè");
//     console.log("Xin chào");
// }); nó sẽ rớt vô then hay catch , khi nó vô then rồi thì nó sẽ phớt lờ reject đi vì nó có trạng thái rồi
//-----------------------------------------------------------------------------
//==================================================================
// //ví dụ về then return throw
// let p4 = new Promise((resolve, reject)=> {
//     return resolve("ahihi");
//     reject("Lỗi nè");
//     console.log("Xin chào");
// });
// //kiểm chứng
// p4.then((value)=>{
//     console.log("Giá trị nè "+ value);
// })
//     .catch((error)=>{
//         console.log( "Lỗi nè : " + error);
//         throw "Lê Hồ Điệp";// return Promise.resolve("Lê Hồ Điệp")
//     })
//     .then((value)=>{
//     console.log();
//     })
//     .catch();

    //return trong then | catch sẽ đưa Promise về on filfulled
    //throw trong then |catch sẽ đưa Promise về on rejected


//===================================================
//Mô phỏng xử lý luồng => ứng dụng return throw nè
//frontend : yêu cầu server cung câp data của profile(3s) và article(2s)
//backend : tiếp nhận yêu cầu , tạo lười hứa
let getProfile = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve({ fname: "Điệp", age: 30 });
        }, 3000);
    });

    let getArticle = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(["Báo chí", "Tiểu thuyết"]);
        }, 2000);
    });

//frontend kiểm chứng
//1.độc lập khi nó ko dính níu gì tới nhau
getProfile().then((value) => {
    console.log(value);
});

getArticle().then((value) => {
    console.log(value);
});

//2 hệ quả / 2 req có quan hệ nguyên nhân kết quả
//2.Hệ quả
// //2.1 lồng vô bên trong nhưng cách này gây ra promise hell
// getProfile().then((value) => {
//     console.log(value);
//     getArticle().then((value) => {
//         console.log(value);
//     });
// });

// //2.2 nên sửa = cách dùng return để qua nhiều tầng nha
// getProfile()
//     .then((value) => {
//         console.log(value);
//         return getArticle();
//     })
//     .then((value) => {
//         console.log(value);
//     });


