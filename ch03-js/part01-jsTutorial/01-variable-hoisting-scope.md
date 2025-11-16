# 01 - Giới Thiệu về Javascript 

Javascript là ngôn ngữ hướng kịch bản | hàm | thủ tục nếu đi 1 mình , ngôn ngữ đơn luồng 
</br>
Javascript khi kết hợp với WedAPIs sẽ là ngôn ngữ đa luồng

Quy tắc đặt tên
- conversion name
- không bắt đầu bằng số
- nguyên tắc CammelCase (biến)
- nguyên tắc underScore (schema diagram | database)
- PascalCase-UpperCammelCase( Class )
- được phép dùng _ và $ ở đầu _private $protected ở một số ngôn ngữ

Javascript có cơ chế hosting với var (hoisting : móc ngược lên) và function
</br>
Khi xài 1 biến trước khi nó được khai báo ( ! nhớ là phải có khai báo )
</br> vì nó dùng xử lý các kịch bản để ko có lỗi [ ví dụ 2 cái nút  ]


### 1.Cách khai báo biến trong Javascrip  </br>
     - let </br>
     - var => ! có cơ chế hoisting</br>
     - const </br>

---

#### Đoạn code A
```javascript
// Log msg khi chưa khai báo biến msg
console.log(msg); // Output: undefined

// Khai báo biến msg
var msg = "Thông báo";

// Log msg khi đã khai báo
console.log(msg); // Output: Thông báo
```
---
#### Đoạn code B

```javascript
var msg;  // Khai báo biến msg
console.log(msg);  //undefine
var msg = "Thông báo";
console.log(msg);  //Thông báo
```
#### Nhờ có cơ chế hoisting nên Đoạn A với Đoạn B là tương đương nhau
---

### 1a.Khai báo bằng var
- var KHÔNG BỊ CAN THIỆP bởi Block Scope. Nó chỉ có Global Scope hoặc Function Scope.

- Nếu khai báo bằng var trong một khối lệnh ( if , for ), nó vẫn được coi là biến toàn cục (Global Scope) hoặc nằm trong phạm vi của hàm chứa nó.

- Window là object khổng lồ/cửa sổ trình duyệt, việc code trong file js là đg code trong object window, mỗi lần dùng var bản chất là đg khởi tạo property cho window nên nó ko có value , nói cách khác là undefined giống java vậy đó !!!

```javascript
var son = "Toàn";
if (true) {
  var son = "Toàn"; // Đây vẫn là biến 'son' duy nhất, gán lại giá trị
}
console.log(son); // Kết quả: "Toàn" (Dù nằm trong if, nó vẫn là biến toàn cục)
```

```javascript
var son = "Toàn"; // Biến toàn cục
if (true) {
  let son = "Hùng"; // Biến 'son' mới, chỉ tồn tại trong khối 'if' (Block Scope)
}
console.log(son); // Output: "Toàn" (Biến toàn cục 'son' không bị thay đổi)
```

### 1.1 Khai báo biến bằng let và const
- let và const được giới thiệu trong ES6 để khắc phục nhược điểm của var.

- __KHÔNG HOISTING__: let và const không có cơ chế Hoisting giống như var. Nếu bạn truy cập chúng trước khi khai báo, bạn sẽ gặp lỗi **ReferenceError**. 

### 1.2 Các hiểu lầm về const và let thường gặp:

```javascript
const profile = { name: "Toàn", height: 160 };
profile.height = 170; //được phép

const profile = {name: "Toàn", height : 190 } // lỗi

// nói cách khác biến name dù cùng value Toàn nhưng nó khác địa chỉ lưu rồi

// => vì nó đang thay địa chỉ của 1 biến bằng 1 địa chỉ khác chứ ko đươn giản là thay đổi mỗi giá trị nữa
// hằng số này lưu dãy số  dẫn tới vùng nhớ chứa object,nên dù thay đổi giá trị trong vùng nhớ, nó vẫn ko thay đổi địa chỉ
```
---
```javascript
const array1 = [1, 2, 3, 5];
array1.push(6);
// array1 = [1, 2, 3, 5 , 6]; ==> lỗi bắt array1 trỏ tới 1 mảng khác vì hiện tại array1 ko có element "6"

```
---
### 2. Scope
Có 3 loại scope:
- __Global Scope__	: Phạm vi toàn cục. Biến có thể được truy cập từ bất cứ đâu trong mã nguồn.
- __Function Scope__:Phạm vi nội hàm. Biến chỉ có thể được truy cập bên trong hàm mà nó được khai báo.
- __Block Scope__	Phạm vi cục bộ (trong khối {} như if, for, while, v.v.). Biến chỉ có thể được truy cập bên trong khối đó.
---
### 3. Chế độ trong Javascript
Javascript có 2 chế độ chính là Normal Mode(Sloppy Mode) và Strict Mode 
</br>
 #### 3.1 . Chế độ Mặc định (Normal Mode) : chế độ lỏng lẻo
- Cho phép sử dụng biến mà không cần khai báo (var, let, const); biến sẽ tự động thành toàn cục (Global).
- Châm chước, cho phép một số lỗi ngầm (silent errors) và cú pháp không tốt.

#### 3.2 . Chế độ Strict Mode : chế độ nghiêm ngặt
- __BẮT BUỘC__ phải khai báo biến. Nếu không, sẽ báo lỗi ReferenceError.
- Nghiêm khắc, chuyển các lỗi ngầm thành lỗi rõ ràng, giúp viết code an toàn và dễ bảo trì hơn.
#### 3.3 Ảnh hưởng của var trong scope
- var sẽ không bị can thiệp bởi bất cứ scope nào hết nếu tạo biến bằng var thì mình sẽ global scope nó có thể tham gia vô bất kì hàm nào
```javascript
var son = "Toàn";
if (true) {
  var son = "Toàn";
}
console.log(son); //Toàn vì son ở đâu cũng là son bản mới nhất
```
- let | const không hoisting , có block scope

- var có hoisting và out block scope
```javascript
var son = "Toàn";
if (true) {
  let son = "Hùng";
}
console.log(son); // Toàn
```
---