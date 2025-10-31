# 03-async-await

ngày xưa người ta dùng callback để xử lý bất đồng bộ làm cho nó ko đợi nhau

ES6 : promise

ES7 : async + await dùng để kết hợp với promise chứ ko thay thế cho 
promise 

---------------------------------------------------------
promise sẽ làm :
    
+ xử lý bất đồng bộ 

+ xử lý lỗi

async chỉ : 
+ xử lý bất đồng bộ
+ ko thể tự xử lý lỗi mà phải dùng try catch
---
Tức là promise có catch , nó dùng catch khi bị rejected để bắt lỗi .

---

Còn async thì sẽ dùng await ném lỗi từ Promise khi bị Rejected nên phải bọc nó vô 1 try-catch để xử lý nó như 1 lỗi đồng bộ thông thường.

Hay có thể xem await giống như 1 người theo dõi , nó làm hệ thống của các luông lệnh phải chờ hàm nào đó mà bạn muốn promise hoạt động xong thì nó sẽ xét đến  thành công hay thất bại , nếu reject thì nó sẽ ném throw còn thành công nó sẽ làm gì tiếp các giá trị.

---
 __Async function : là 1 hàm luôn return về promise  ! quan trọng__

```javascript
function handle() {
    return new Promise((resolve, reject) => {
        resolve("Ahihi");
    });
}

async function handle() {
  return "ahihi"; 
  //máy tự hiểu
  //lệnh return trên sẽ tương đương với Promise.resolve("Ahihi"); 
}
```

---
Tính chất về await :

- await : giúp đợi  promise vượt qua pending vì promise cần time để thực hiện.

- await chỉ được dùng trong async

- await chỉ được dùng trong async (người theo dõi của async)

---

demo await

```javascript
let getProfile = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve({ fname: "Điệp", age: 22 });
        }, 3000);
    });

let getArticle = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(["Báo chí", "Tiểu thuyết"]);
        }, 2000);
    });
```
---

xử lý khi muốn nó chạy độc lập total 5s
```javascript
async function getData() {
    let profile = await getProfile();
    let article = await getArticle();
    console.log(profile, article);
}

getData();
```
---

xử lý khi muốn nó chạy nhiều cùng lúc total 3s
```javascript
async function getData() {
    let [profile, article] = await Promise.all([getProfile(), getArticle()]);
    console.log(profile, article);
}

getData();
```
---
Tính chất quan tọng : Tuyệt đối không dùng try catch đối với các hàm dùng setTimeOut . Vì 

```javascript

let getDemo = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
        reject(["Báo chí", "Tiểu thuyết"]);
        }, 2000);
    });

async function getData() {
    try {
        let data = await getDemo(); 
    } catch (error) {
        console.log("error la" + error);
    }
}

getData(); //có bắt được lỗi
```
---

setTimeout là một hàm bất đồng bộ (asynchronous). 
Hàm callback bên trong setTimeout sẽ chạy sau (khi try...catch đã kết thúc).

Do đó, nếu bạn đặt try...catch ở ngoài bao bọc setTimeout, và lỗi xảy ra bên trong callback của setTimeout, try...catch đó sẽ không bắt được lỗi.

__await không chờ setTimeout, mà nó chỉ chờ Promise hoàn thành(chờ Promise có trạng thái onFulfilled hoặc onRejected).__

---
Tính chất quan trọng :
 __Không nên dùng toán tử đồng bộ với async (+= + - * / ) __

```javascript
let x = 0;
let handle4 = () =>
    new Promise((resolve, reject) => {
        x++; //1
        console.log(x); //1
        resolve(5); //5
    });

let handle5 = async () => {
    let tmp = await handle4(); //5
    x += tmp;
    console.log(x); //6
};

handle5();

```

Nếu bạn chỉ gọi handle5() một lần, code sẽ hoạt động. Nhưng nếu gọi nhiều lần, kết quả của x sẽ bị hỗn loạn.

---