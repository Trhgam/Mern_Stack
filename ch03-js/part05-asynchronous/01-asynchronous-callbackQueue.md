# Bài 01 -asynchronous-callbackQueue

C là ngôn ngữ đơn luồng (sigle thread - pipe - async)

- async: đồng bộ (phải đợi)

    đồng bộ ko phải cùng diễn ra mà là __đợi__ để làm giống , code có nhiều task vụ thì nó sẽ đi từng nhịp và đợi

java là ngôn ngữ đa luồng (mul thread - asynchronous)
- asynchronous : bất đồng bộ , ko có sự đợi chờ , thực thi nhiều luồng 1 lúc 

javascript là ngôn ngữ đơn luồng
- js chạy trên wed(WED_APIs) là đa luồng

- Nodejs(là môi trường thực thi js mà js đơn luồng nên Node js ) đơn luồng - nhưng khi lắp thêm module thì nó là đa luồng 
---
## Đơn luồng (Single-threaded) là gì ?

Bạn có 3 nhiệm vụ (rửa bát, lau nhà, giặt đồ). Nếu bạn là người đơn luồng, bạn sẽ : 

rửa bát xong $\rightarrow$ lau nhà xong $\rightarrow$ giặt đồ xong.

__Đặc điểm__: Dễ quản lý, không có xung đột giữa các nhiệm vụ, nhưng chậm khi có nhiều việc cần làm.

---
## Đa luồng (Multi-threaded) là gì ?

Bạn có 3 nhiệm vụ (rửa bát, lau nhà, giặt đồ).Và bạn sẽ phân nó cho 3 người và tất cả __làm cùng lúc.__

---
## Đồng bộ (Synchronous) là gì ?

__Nghĩa là:__ Phải đợi.

__Ví dụ:__ Người công nhân bắt đầu nhiệm vụ A (ví dụ: gọi điện thoại). Anh ta phải đứng đó chờ cho đến khi cuộc gọi A kết thúc (có phản hồi) thì mới bắt đầu sang nhiệm vụ B.

__Đặc điểm:__ Code chạy theo trình tự, tuần tự. Dễ đọc, dễ debug.

---
## Bất đồng bộ (Asynchronous) là gì ?
__Nghĩa là:__ Không đợi, làm việc khác trong lúc chờ.

__Ví dụ:__ Người công nhân bắt đầu nhiệm vụ A (gọi điện thoại), nhưng thay vì chờ, anh ta giao nó cho người khác hoặc một hệ thống khác xử lý, sau đó anh ta chuyển sang làm nhiệm vụ B (ví dụ: quét nhà). Khi nhiệm vụ A hoàn thành, hệ thống sẽ thông báo cho anh ta.

__Đặc điểm:__ Tối ưu thời gian chờ, không bị "đóng băng" (block) chương trình. Giúp tăng hiệu suất, đặc biệt trong các tác vụ I/O.

---
Đơn luồng & Bất đồng bộ - 1 người (ví dụ: JavaScript) - Bắt đầu A $\rightarrow$ Giao A cho hệ thống $\rightarrow$ Làm B $\rightarrow$ Hệ thống báo A xong.

---
 Có 2 tác vụ sau : L1(5p) và L2(2p)

| | **(Single-threaded)** | **(Multi-threaded)** |
| :--- | :--- | :--- |
| **L1 (5p)** | 5p | <5p (cả 2 tiến trình)|
| **L2 (2p)**| 2p| |



***L1 và L2 có mối quan hệ nguyên nhân kết quả
L1: lên server lấy data về(3s)
L2: hiển thị data lên giao diện(1s)

-->cần xử lý bất đồng bộ
vì thời gian L1 chờ server phản hồi ví dụ 3s, thì luồng chính ngay lập tức chuyển sang xử lý các tác vụ khác (như phản hồi input của người dùng, làm animation,...), giúp giao diện mượt mà và không bị đơ. Nếu ko xử lý vậy thì luồng sẽ đứng yên chờ khi nào xong nó mới đi tiếp 

Nên xử lý bất đồng bộ thường xảy ra ở ngôn ngữ đơn luồng

---
Các tình huống cần xử lý bất đồng bộ là :

- Lấy dữ liệu từ Server (ví dụ: API call).

- Đọc/Ghi File lớn.

- Truy vấn Database phức tạp, Hẹn giờ (setTimeout).
---
Js có 2 memory chính : 

- call satck : dữ liệu thực thi lệnh dạng ngăn xếp
stack (LIFO)
- memory heap
---
```javascript
function a(x) {
  console.log(x);
}

function b(y) {
  a(y + 2);
}

function c(z) {
  b(z + 1);
}

c(5); // 8
```
---
### Tổng quan về vùng nhớ trong js

- js(call stack , memory heap)

- wedAPIs(DOM, AJAX(XmlHttpRequest, Timeout))
    - AJAX(XmlHttpRequest) : giao tiếp với server khác lấy thông tin, lấy dữ liệu
    timeout (settimeout setinterval)
    

- event loop (addEventListener) + callback Queue(onClick | onLoad | onDone) (window sẽ gọi)

---

 event loop => luôn chạy vd: addEventListener

---

__Call Stack:__ Nơi thực thi các hàm theo cơ chế LIFO (Last-In, First-Out). Đây là nơi chạy code đồng bộ của JS.

__Memory Heap:__ Nơi lưu trữ các biến và đối tượng được tạo ra.


__Web APIs (Môi trường bên ngoài):__


- DOM
- AJAX (XMLHttpRequest)
- Timeout (setTimeout, setInterval) 

__Event Loop + Callback Queue:__

- __Callback Queue (Hàng đợi tác vụ):__ Nơi chứa các hàm callback (ví dụ: onClick, onLoad, hàm sau setTimeout) đã hoàn thành việc chờ đợi từ Web APIs và đang __chờ được đưa vào Call Stack.__


- __Event Loop:__ Cơ chế liên tục __kiểm tra__ xem Call Stack có trống không. Nếu trống, nó sẽ __chuyển tác vụ__ từ __Callback Queue sang Call Stack__ để thực thi.
---
Để tường minh hơn về đường đi của code bạn có thể copy đoạn code trên và đem lên __loupe__ wed miêu tả code thực thi đơn luồng |> copy code cho lên đó run thử nhe



