# 04-json-ajax-fetchAPI

JSON : js object notaion

là 1 chuỗi được viết dưới dạng obejct của js

dùng để lưu trữ | trao đổi dữ liệu giữa các hệ thống
       (không quan trọng ngôn ngữ nào)=> tức ngôn ngữ nào cùn dùng JSON được.

---

***json dùng để lưu 

     string , number, boolean , array , object , nulll
---
nhưng nó không lưu được 

     undefine | hàm và method không lưu được 

    các prop chưa đc define thì nó cũng không lưu được vì là undefine prop
    
---
JSON có 2 thao tác chính là : .parse | .stringify
```javascript
//ví dụ obejct
const obj1 = {
    name: "Điệp",
    age: 30,
    status : "Single",
    sayHi(){
        console.log("Xin chào mọi người");
        
    }
}

let myJson = JSON.stringify(obj1); 
console.log(myJson);

// '{"name":"Điệp","age":30,"status":"Single"}'
// chỉ lưu prop và ko lưu đc method sayHi nha

```

1 prop undefine thì nó cũng ko lưu status : undefine

## Tại sao JSON không lưu lại phương thức :
- tránh lặp đi lặp lại 1 công thức giống nhau và  nhiều obejtc có cùng 1 method => ko nên lưu vì sao thì ở java đã biết rồi ha.
- tại khi lưu hàm sẽ bị lộ logic xử lý if else for do while cho hacker biết cách thức hoạt đông của hệ thống.
- tránh bất đồng cú pháp giữa các ngôn ngữ khác nhau. 

---
## Cú pháp :
- với object thì data là cặp key: value-data được ngăn bởi dấu , .
- {} dùng để mô tả object
- [] dùng để mô tả array
- dùng dấu "" để phân biệt với dấu '' ở ngoài cùng
- key trong object là string => phải trong ""
đoán đáp án chuyển đổi .

```javascript
let arr = ["cam", "chuối", "ổi"]; //'["cam", "chuối", "ổi"]'

let a = 22; //'22'

let str = "ahihi"; //'"ahihi"'

let isTrue = true; //'true'

```
---
# AJAX : Asynchronous javascript and XML

AJAX : là viết tắt của Asynchronous javascript and XML

AJAX : không phải ngôn ngữ lập trình
ajax là tổ hợp công nghệ:

- XMLHttpRequest(xhr): 
    - Giúp gửi | nhận request(yêu cầu) lên server | ko có trong be , giúp fe.
    - AJAX chỉ có trong web brower giúp fe gửi và nhận yêu cầu. 

- js : xử lý logic
- HTML DOM : giao diện giúp hiển thị

---
thay thế XMLHttpRequest bằng fetch

FetchAPI : cung cấp cho mình khả năng gửi | nhận request thông qua 

trình duyệt dựa trên nền tảng là xhr
sử dụng công nghệ Promise

Điểm khác nhau của xhr và fetchAPI
---
| XHR | FetchAPI |
| :--- | :---: |
| dựa trên callback | dựa trên Promise|

### mockapi 
https://mockapi.io/projects/69057f57ee3d0d14c132c713

# Faker ren dữ liệu ảo 

__Frontend:__ yêu cầu server cung cấp dữ liệu của table users
be đã làm rồi nhiệm vụ của mk là keiemr chứng
fetch là yêu cầu server cung cấp

đây là lời hứa của server

```javascript
fetch("https://69057f57ee3d0d14c132c712.mockapi.io/users", {
    method: "GET",
})
    .then((response) => {
        //coi kiện hàng xem nó đóng gói như nào trước
        // log(response);
        //riêng fetch có khả năng ok xem trc 
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

```

khi mã tốt thì mới khui kiện hàng

statusText khi status != tốt => có thể dùng để in ra màn hình

then đầu xem nó ok ko , then sau mới tới bước xử lý 

---
### tìm hiểu về request

    Có 4 loại request :  GET POST PUT DELETE
//---

    Một HttpRequest có 4 phần :

    - method: GET POST PUT DELETE

    - URL (Uniform Resource Locator):
        + paramString: chỉ lưu thông tin bth, lưu cái cần tìm(url)

        + queryString: chỉ lưu thông tin bth, lưu cái cần tìm(url)

    - headers: lưu thông tin nhạy cảm mà người khác gửi mình, và tài nguyên(Host/Accept: Định dạng tài nguyên bạn muốn nhận về)

    - body(POST, PUT): lưu mọi thứ, lưu thông tin nhạy cảm do mình cung cấp

---
Ví dụ về Path Parameter và Query String

---

Đây là link bình thường

    https://69057f5cee3d0d14c132c76a.mockapi.io/

---
Đây là query String

    https://api.example.com/users?page=2&role=admin

Vì nó chứa các tham số ?role=admin...
query string là có value truyền đi sau dấu chấm hỏi giá trị và biến phân cách bởi dấu "="

---
Đây là Path Parameter

    https://api.example.com/users/12345

Path param thường nó là phần bắt buộc của đường dẫn

Nhưng với query KHÔNG DÙNG CHO THÔNG TIN NHẠY CẢM vì nó hiển thị rõ trên URL. 

Đối với query thường dùng cho search , lọc dữ liệu nên có thể để lộ prop trên đường dẫn 

Nhưng đối với xóa , update , login phải che giấu prop nên đối với POST và PUT nó sẽ có thêm body để lưu prop.

---
## Một lời gọi fetch cơ bản có dạng:
```javascript
fetch(url, options) //luôn trả về một Promise.
  .then(response => {
    // 1. Xử lý phản hồi từ server (ví dụ: kiểm tra lỗi HTTP status)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 2. Chuyển đổi phản hồi sang định dạng mong muốn (thường là JSON)
    return response.json(); // hoặc response.text(), response.blob(), v.v.
  })
  .then(data => {
    // 3. Xử lý dữ liệu cuối cùng đã được phân tích cú pháp
    console.log('Dữ liệu nhận được:', data);
  })
  .catch(error => {
    // 4. Bắt và xử lý bất kỳ lỗi nào xảy ra trong quá trình fetch
    console.error('Có lỗi xảy ra trong quá trình fetch:', error);
  });
```

---

### CODE áp dụng dùng POST
```javascript
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
```
---
### CODE áp dụng GET

```javascript
fetch("https://69057f57ee3d0d14c132c712.mockapi.io/users", {
    method: "GET",
})
.then((response) => {
    if(response.ok){
        return response.json();
    }else{
        throw new Error(response.statusText);
    }
})
.then((data) => {
    console.log("Dữ liệu nhận được từ GET request:");
    console.log(data);
})
.catch((error)=>{
    console.error("Lỗi khi fetch dữ liệu: " + error);
});
```


