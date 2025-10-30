// 03-async-await
//ngày xưa người ta dùng callback để xử lý bất đồng bộ để nó ko đợi nhau
//ES6 : promise
//ES7 : async + await dùng để kết hợp với promise chứ ko thay thế cho promise 
//---------------------------------------------------------
//promise sẽ làm xử lý bất đồng bộ 
//               xử lý lỗi
//async chỉ xử lý bất đồng bộ
//           ko thể tự xử lý lỗi mà phải dùng try catch
//---------------------------------------------------------

//Async function : là 1 hàm luôn return về promise ! quan trọng
function handle() {
    return new Promise((resolve, reject) => {
        resolve("Ahihi");
    });
}

async function handle() {
  return "ahihi"; //Promise.resolve("Ahihi"); // tương đương với cái này nha tại máy tự hiểu
}
//  await : giúp đợi  promise vượt qua pending vì promise cần time
//          await chỉ được dùng trong async

///============================================demo await

//      await chỉ được dùng khi mà trong async

// let getProfile = () =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//         resolve({ fname: "Điệp", age: 22 });
//         }, 3000);
//     });

// let getArticle = () =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//         resolve(["Báo chí", "Tiểu thuyết"]);
//         }, 2000);
//     });

// //xử lý khi nó chạy độc lập total 5s
// // async function getData() {
// //     let profile = await getProfile();
// //     let article = await getArticle();
// //     console.log(profile, article);
// // }

// //xử lý khi muốn nó chạy nhiều cùng lúc total 3s
// async function getData() {
//     let [profile, article] = await Promise.all([getProfile(), getArticle()]);
//     console.log(profile, article);
// }

// getData();

//=======================================
//nhớ là ko try catch đối với settimeout
// demo
// let getDemo = () =>
//     new Promise((resolve, reject) => {
//         setTimeout(() => {
//         reject(["Báo chí", "Tiểu thuyết"]);
//         }, 2000);
//     });

// async function getData() {
//     try {
//         let data = await getDemo();
//     } catch (error) {
//         console.log("error la" + error);
//     }
// }

// getData();


// Không nên sùng toán tử đồng bộ với async += 
let x = 0;
let handle4 = () =>
    new Promise((resolve, reject) => {
        x++;
        console.log(x);
        resolve(5);
    });

let handle5 = async () => {
    let tmp = await handle4();
    x += tmp;
    console.log(x);
};

handle5();


