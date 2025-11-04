# axious 

Axious http client hỗ trợ gửi | nhận request cho browser và server-side(node js)

Được build bằng http , sơ khai hơn xml nên nó chạy đc cả 2 nền tảng client-sided và server-sided

Axios có khả năng tự mở kiện hàng mà ko cần dùng .json.

Axios cũng trả về một Promise!

---
## Demo axios với method get

```javascript
axios({
    url: "https://69057f57ee3d0d14c132c712.mockapi.io/users",
    method: "get",
})
    .then((response) => {
        // console.log(response);
        // do nó ko có prop ok nên phải check thủ công như này 
        if(response.status >= 200 && response.status < 300){
            //xử lý data nên để trong then tránh Promise hell
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
```

---
## Demo axios với method post

```javascript
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
```

---
### Cách viết tắt 
```javascript
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
```
---
### instance
axios.create() để tạo một Axios Instance là để thiết lập các cấu hình mặc định (default configurations)
```javascript

let instance = axios.create({
    baseURL: "https://69057f57ee3d0d14c132c712.mockapi.io",
    timeout: 10000, //sau 10s thì tự thoát
    headers:{ "Content-Type": "application/json"},
});

instance.get("users"); //lấy table users
instance.get("users").then(); //lấy table users)\


```
 timeout: 10000 => Đây là thời gian chờ (tính bằng mili giây) trước khi yêu cầu tự động bị hủy nếu chưa nhận được phản hồi từ server.

Lợi ích: Ngăn chặn ứng dụng của bạn "treo" vô thời hạn nếu server không phản hồi, cải thiện trải nghiệm người dùng.

---
Nên tự tìm hiểu và học Request Config , Interception, handing error nếu muốn thành Senior

---
Sự khác nhau giữa dùng Axious với dùng Fetch

__Cách 1 : Dùng Axious__

Đây là đoạn code bạn muốn so sánh. Axios tự động parse JSON và tự động reject Promise nếu có lỗi HTTP status (4xx/5xx).

```javascript
console.log("--- Bắt đầu Axios Request ---");
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => { // Promise được resolved khi request thành công (2xx)
    console.log("Axios: Dữ liệu nhận được (đã tự động parse JSON):");
    console.log(response.data); // Dữ liệu đã là JS Object/Array
  })
  .catch(error => { // Promise bị rejected nếu có lỗi mạng HOẶC lỗi HTTP status (4xx, 5xx)
    console.error("Axios: Lỗi xảy ra:", error.message);
    if (error.response) {
      console.error("Axios: Chi tiết lỗi server:", error.response.status, error.response.data);
    }
  });
```

---

__Cách 2 Dùng fetchAPI với Promise__

Với Fetch, bạn cần tự kiểm tra response.ok và tự gọi .json() để parse dữ liệu.
```javascript
// --- FETCH API (.then().catch()) ---
console.log("--- Bắt đầu Fetch API Request ---");
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // 1. Khác biệt với Axios: Fetch KHÔNG tự động reject Promise cho lỗi HTTP status (4xx, 5xx).
    // Phải kiểm tra thủ công.
    if (!response.ok) {
      // Nếu có lỗi HTTP status, chúng ta phải tự ném lỗi để nó đi vào khối .catch()
      throw new Error(`Fetch: HTTP error! Status: ${response.status}`);
    }
    // 2. Khác biệt với Axios: Fetch KHÔNG tự động parse JSON.
    // Cần gọi .json() để parse và .json() này cũng trả về một Promise mới.
    return response.json();
  })
  .then(data => {
    // Khi Promise từ .json() được giải quyết, 'data' đã là JS Object/Array
    console.log("Fetch: Dữ liệu nhận được (đã tự parse bằng .json()):");
    console.log(data);
  })
  .catch(error => {
    // Promise bị rejected nếu có lỗi mạng HOẶC lỗi HTTP status mà chúng ta tự throw ở trên
    console.error("Fetch: Lỗi xảy ra:", error.message);
  });
```

---

### FETCH API (async/await)
```javascript
async function fetchPostWithAsyncAwait() { 
  
  try { // 2. Sử dụng try...catch để xử lý lỗi (thay cho .catch())
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); // 3. Dùng 'await' để đợi Promise từ fetch()

    // 4. Vẫn cần kiểm tra response.ok như Fetch API thông thường
    if (!response.ok) {
      // Nếu có lỗi HTTP status, throw Error để nó được bắt bởi khối catch
      throw new Error(`Fetch: HTTP error! Status: ${response.status}`);
    }

    // 5. Vẫn cần gọi .json() và dùng 'await' để đợi Promise từ response.json()
    const data = await response.json(); // Dùng 'await' để đợi Promise từ .json()

    // Khi cả hai await đều hoàn thành, 'data' đã là JS Object/Array
    console.log("Fetch: Dữ liệu nhận được (async/await, đã parse bằng .json()):");
    console.log(data);

  } catch (error) { // 6. Khối catch sẽ bắt lỗi từ throw Error hoặc lỗi mạng
    console.error("Fetch: Lỗi xảy ra (Async/Await):", error.message);
  }
}
```