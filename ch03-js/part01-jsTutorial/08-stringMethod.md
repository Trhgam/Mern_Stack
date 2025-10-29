# Bài 10 - Chuỗi method

Chuỗi trong js được d/n bằng '' hoặc bằng ""

Trích dẫn bên trong trích dẫn 

```javascript
let answer1 = "It's alright";
let answer2 = "He is called 'Johnny'";
let answer3 = 'He is called "Johnny"';
```

---

## Chuỗi mẫu

Các mẫu được giới thiệu cùng với ES6 (JavaScript 2016).

Mẫu là những chuỗi được đặt trong dấu ngoặc kép 
    
    (`Đây là chuỗi mẫu`).

Mẫu cho phép sử dụng dấu ngoặc đơn và dấu ngoặc kép bên trong chuỗi:


```javascript
let text = `He's often called "Johnny"`;
```
---

## Chiều dài chuỗi

Để tìm độ dài của một chuỗi, hãy sử dụng thuộc lengthtính tích hợp:

```javascript
let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;
```

---

## Nhân vật thoát hiểm

Vì chuỗi phải được viết trong dấu ngoặc kép nên JavaScript sẽ hiểu sai chuỗi này:

```javascript
let text = "We are the so-called "Vikings" from the north.";
```

Để giải quyết vấn đề này, bạn có thể sử dụng ký tự thoát dấu gạch chéo ngược .

Ký tự thoát dấu gạch chéo ngược ( \) chuyển các ký tự đặc biệt thành 

ký tự chuỗi:

\\" chèn dấu ngoặc kép vào chuỗi:

```javascript
let text= 'It\'s alright.';
```
---
<div id="string-object">
    <h2> ## Chuỗi JavaScript dưới dạng Đối tượng </h2>
</div>

Thông thường, chuỗi JavaScript là các giá trị nguyên thủy, được tạo từ các giá trị theo nghĩa đen:

```javascript
let x = "John";
```

Nhưng chuỗi cũng có thể được định nghĩa là đối tượng với từ khóa new:

```javascript
let y = new String("John");
```

ví dụ

```javascript
let x = "John";
let y = new String("John");
console.log(x == y); // true
console.log(x === y); //false

```

```javascript
let x = new String("John"); // x là một đối tượng (object)
let y = new String("John"); // y là một đối tượng (object) khác

console.log(x == y);  // false
console.log(x === y); // false
```
vì nó không có cơ chế auto Unboxing

---

Boxing (Đóng hộp) là gì ?

    Boxing là khi bạn lấy một giá trị nguyên thủy (như 123 hoặc "hello") và bọc nó vào trong một đối tượng.

```javascript
let y = new String("John"); // Đây là Boxing. Bạn đã "đóng hộp" giá trị nguyên thủy "John" vào trong một đối tượng y.
```
---


Unboxing(Mở hộp) là gì ?

    Unboxing là quá trình tự động chuyển đổi một kiểu đối tượng (object type) về lại kiểu giá trị nguyên thủy (primitive value) tương ứng của nó.


```javascript
let x = "John";

console.log(x == y); // Unboxing xảy ra ở đây!
```
---
## Interpolation (nội suy)

    syntax
    ${...}
---

```javascript
let firstName = "John";
let lastName = "Doe";

let text = `Welcome ${firstName}, ${lastName}!`;
```
---

```javascript
let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;
```
    ^                                           ^
    |                                           |

    toFixed(2): Số $12.5$ sẽ được làm tròn và định dạng để có hai (2) chữ số thập

---

## Method trong String

### 1. length

    Thuộc tính này length trả về độ dài của một chuỗi:

```javascript
//method .length
let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;
```

#### Trích xuất ký tự chuỗi

Có 4 phương pháp để trích xuất các ký tự chuỗi:

    Phương pháp at(position)
    Phương pháp charAt(position)
    Phương pháp charCodeAt(position)
    Sử dụng quyền truy cập thuộc tính [] như trong mảng

### 2. charAt()

Phương pháp này charAt()trả về ký tự ở vị trí chỉ định (vị trí) trong chuỗi:

```javascript
let text = "HELLO WORLD";
let char = text.charAt(0); //H


```
```javascript
x = "Điệp đẹp trai";
console.log(x.charAt(2)); //ệ
console.log(x.charAt(22)); //""
x[2] = "e"; // ko lỗi , ko chạy được
//string là immutable: là objetc bất biến ,
// nên không thể thao tác trên string
```
    Đọc (Read): Bạn có thể dùng x.charAt(2) hoặc x[2].

    Ghi/Sửa (Write): Bạn không thể dùng x[2] = "e".
Vì string trong js là bất biến hay Immutable , nó chỉ cho phép bạn đọc kí tự chứ ko được dùng lệnh đó để set lại kí tự 

---
Tính chất Bất biến (Immutable):

    Khi một chuỗi được tạo ra (ví dụ: x = "Điệp hehe"), nội dung của nó được cố định trong bộ nhớ.

    Bạn không thể thay đổi bất kỳ ký tự nào của chuỗi đó sau khi nó đã được tạo.

### 3. charCodeAt()
Phương pháp này charCodeAt()trả về mã của ký tự tại vị trí chỉ định trong chuỗi:

Phương pháp này trả về mã UTF-16 (một số nguyên từ 0 đến 65535).


```javascript
let text = "HELLO WORLD";
let char = text.charCodeAt(0); //72
```

### 4. at()

Phương pháp này at()trả về ký tự ở vị trí chỉ định (vị trí) trong chuỗi:


### 5.indexOf(val) 

indexOf(val) tìm chuỗi val xuất hiện đầu tiên ở đâu

```javascript
let str = "ahihi";

console.log(str.indexOf("h")); //1
console.log(str.indexOf("ih")); //2
console.log(str.indexOf("s")); //-1
```

### 6.splice

    splice(start,end): return chuỗi con từ START ĐẾN END

```javascript
let x = "Xin chào PiedTeam, mình là Điệp";
//cắt theo chiều xuôi
let result = x.slice(9, 17); //đến 17-1 nha
console.log(result); //PiedTeam, mình là Điệp

//cắt theo chiều ngược
result = x.slice(-22, -14);
console.log(result); //PiedTeam
//cắt bằng 1 parameter
result = x.slice(9); //PiedTeam, mình là Điệp
//cắt ngược 1 parametter
result = x.slice(-12); //mình là Điệp
```
Phương thức slice() là một công cụ tiện lợi để lấy ra một phần chuỗi mà không ảnh hưởng đến chuỗi ban đầu.

Phương thức slice() trích xuất một phần của chuỗi.

Phương thức slice() trả về phần được trích xuất dưới dạng một chuỗi mới.

Phương thức slice() không làm thay đổi chuỗi gốc.

---
### 7. subString(start, end)
cũng giống như splice nhưng không cắt ngược được 

```javascript
let chuoiGoc = "Xin chao the gioi!";
// Vị trí:   012345678901234567
```
---

Sử dụng Tham số Bắt đầu và Kết thúc thông thường

```javascript
let ketQua1 = chuoiGoc.substring(9, 13);
console.log(ketQua1);
// Kết quả: "the " (kết thúc tại vị trí 13, trước ký tự 'g')
```

---

Khi bạn bỏ qua Tham số Kết thúc hay bạn chỉ cung cấp 
 tham số bắt đầu, substring() sẽ trích xuất từ vị trí đó cho đến hết chuỗi.

```javascript
let ketQua2 = chuoiGoc.substring(9);
console.log(ketQua2);
// Kết quả: "the gioi!"
```

---
Tự động Hoán đổi Tham số

Đây là điểm đặc trưng của substring(): nếu tham số start lớn hơn tham số end, substring() sẽ tự động hoán đổi chúng để phép cắt luôn hợp lệ.

```javascript
// Ta cố tình đặt vị trí BẮT ĐẦU (13) lớn hơn vị trí KẾT THÚC (9)
let ketQua3 = chuoiGoc.substring(13, 9);
console.log(ketQua3);
// Kết quả: " the" (Giống như gọi substring(9, 13))
```

---
Xử lý Tham số Âm hoặc Tham số Lớn hơn Chiều dài

substring() luôn coi các giá trị âm hoặc giá trị không hợp lệ (lớn hơn chiều dài chuỗi) là 0

```javascript
// Tham số âm sẽ bị coi là 0
let ketQua4 = chuoiGoc.substring(-5, 3);
console.log(ketQua4);
// Kết quả: "Xin" (Giống như gọi substring(0, 3))

// Tham số vượt quá chiều dài chuỗi sẽ bị coi là chiều dài chuỗi
let ketQua5 = chuoiGoc.substring(4, 100);
console.log(ketQua5);
// Kết quả: "chao the gioi!" (Giống như gọi substring(4, 18))
```

==> giờ ko đc dùng nó nữa


---

# II- các method phổ biến

### 1,replace: thay thế chuỗi

```javascript
let str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
str1 = str1.replace("nhiều", "ít");
console.log(str1); //PiedTeam có ít bạn rất nhiều tiền
```
### 2.replaceAll : thay thế chuỗi
```javascript
let str1 = "PiedTeamx có nhiều bạn rất nhiều tiền";
str1 = str1.replaceAll("nhiều", "ít");
console.log(str1); //PiedTeam có ít bạn rất ít tiền
```
### 3.replace thay thế chuỗi + regex
```javascript
let str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
str1 = str1.replace(/nhiều/g, "ít");
console.log(str1); //PiedTeamx có ít bạn rất ít tiền
```
---

### 4.trim()

```javascript
let str1 = "PiedTeamx     có      nhiều bạn rất nhiều tiền";
str1 = str1.replaceAll(/\s+/g, " ").trim();
console.log(str1);
```

__replaceAll()__ đã xử lý khoảng trắng bên trong chuỗi

 __.trim()__ được gọi để xử lý khoảng trắng còn sót lại ở hai đầu chuỗi.
 ---
 
### 5.Chuyển đổi hoa thường toUpperCase() | .toLowerCase();

---

### 6.concat(...str) nối chuỗi ==> rest parameter 
```javascript
let str1 = "Xin chào";
let str2 = "PiedTeam";
let str3 = str1.concat(" ", "mừng bạn đến với", " ", str2);
str3 = str1 + " " + "mừng bạn đến với" + " " + str2;
str3 = `${str1} mừng bạn đến với ${str2}`;

```

---
### 7. so sánh chuỗi  == | ===
//=== so sánh kiểu về pool hay new

đọc lại chỗ [unboxing](#string-object)

---

### 8.split(token): băm chuỗi ra thành mảng theo token | từ
đứng trên string và trả ra mảng

```javascript
let chuoiTen = "Alice,Bob,Charlie,David";

// Tách chuỗi bằng dấu phẩy (",")
let mangTen = chuoiTen.split(",");

console.log(mangTen); 
// Output: ["Alice", "Bob", "Charlie", "David"] (Đây là một MẢNG)
```
```javascript
text.split("")
//  trả về 1 mảng kí tự đơn
```

### 9.join(token) : nối các pt trong mảng thành chuỗi theo token

__join() (Gộp mảng thành chuỗi)__ , nó nên nói ở bên mảng
```javascript
let mangMau = ["Đỏ", "Xanh", "Vàng"];

// Gộp các phần tử mảng bằng dấu gạch ngang ("-")
let chuoiGop1 = mangMau.join("-");
console.log(chuoiGop1);
// Output: Đỏ-Xanh-Vàng
```

----
code hơi nâng cao cho tà thần
```javascript
str1 = " xin     chào    các    bạn";
//xin-chào-các-bạn
str1 = str1
  .split(" ")
  .filter((item) => {
    return item != "";
  })
  .join("-");
console.log(str1);
```
