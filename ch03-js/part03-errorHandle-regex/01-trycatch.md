  # Part 03 - BÀI 1: ERROR STRUCTOR 


## 1. Định nghĩa về ERROR
### 1.1 Mình sẽ có 3 loại lỗi chính:

- __runtimeError__: Lỗi phát sinh trong quá trình vận hành | do người dùng 

- __syntaxError__: lỗi do sai cú pháp | do người code 

- __logicError__: lỗi sai về mặt tư duy lỗi không bắt được và khó nhận ra và khó sửa nhất 

---
### 1.2 Trong js, tryCatch: dùng để xử lý dạng lỗi runtimeError

__trycatch chỉ hoạt động trong môi trường đồng bộ__ mà thôi 
    
---

### 1.3.  Cấu tạo của Error
#### Tìm hiểu về cấu trúc của Error trông như thế nào ?

Error khi tra ra màn hình có cấu trúc gồm 3 phần:


1. __name:__ Name sẽ hiện ra tên lỗi  |  kiểu lỗi (Loại lỗi là gì rất nguy hiểm khi để người khác biết ) => phải GIẤU

2. __message:__ Chỉ trả ra 1 thông diệp mà bản thân mình sẽ tự cấu hình và quy ước đẻ tự hiểu lỗi của nó mà ngkh nhìn vào ko biết đó là lỗi gì

3. __stack:__ Stack sẽ làm hiện ra cấu trúc thư mục lỗi của mình (Lỗi ở dòng bao nhiêu) => Bắt buộc phải GIẤU (Thuộc tính Phi chuẩn/Mở rộng)

---

Vì tính bảo mật và an toàn cho project , bản thân dev phải chủ động trong việc che dấu cấu trúc error và tạo message cho error

Một trong những kỹ thuật phổ biến đó là dùng omit ( lodash | TypeScript)

- lodash -> Thư viện trong backend của js chứa all hàm giúp xử lý tất cả các tác vụ trong js

- omit là một hàm trong TS -> Dùng để loại bỏ object và nhận đầu và là obj cần loại bỏ

- Dựa trên obj cũ loại bỏ 1 prop -> Tạo ra 1 KDL(object) mới
unikey <type, keys> -> Refactor (độ lại thư viện cũ để phù hợp với nhu cầu)
        
---
__Vì sao trên thực tế thì backend cần có bộ xử lý lỗi ?__

=> Vì sau này số lượng file nhiều thì bên cạnh lỗi là gì thì mình biết lỗi ở đâu và hỗ trợ gom lỗi về một chỗ

---
### 1.4  4. Kỹ thuật che dấu

Stack là prop của error mà mình không muốn người dùng nhìn thấy . Mình có thể tự điều hướng về catch thông qua lệnh throw. MÌnh chueyern từ lỗi về xử lý exception.

---
1. Flow 1: Dùng obmit stack
 Error : Error
- name  : name
- message: => message
 - stack : mất

---
2. Flow 2: Dùng custom Error (Anh dùng ở backend)

- Error : ErrorWithStatus (Status: Là HTTP Status response) extend Error
- name  : name
- message: => message
- stack : mất

---

```javascript
  let money = 999999999999999; //15 số

try{
  if(money > 999999999999999) throw new RangeError("Biến không chứa nổi");
  console.log(money); // 
  
}catch(error){
  console.log(error);

  
}
```

---
### 1.5 Bộ lỗi có sẵn


__EvalError():__     tạo 1 instance đại diện cho một lỗi xảy ra liên quan đến hàm toàn cục Eval()

__InternalError():__ tạo 1 instance đại diện cho một lỗi xảy ra khi 1 lỗi bên trong jsEngine
                          được ném. vd: quá nhiều đệ quy

__RangeError()__   : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến số hoặc tham chiếu
                          nằm ngoài phạm vi hợp lệ của nó

__ReferenceError__ : tạo 1 instance đại diện cho một lỗi xảy ra khi hủy tham chiếu của 1 tham chiếu
                          không hợp lệ

__SyntaxError__    : tạo 1 instance đại diện cho một lỗi xảy ra trong khi phân tích cú pháp
                                                                                  mã trong Eval()

__TypeError__      : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến hoặc 1 tham số
                          có kiểu không hợp lệ | Lỗi nằm ở TS

__URIError__       : tạo 1 instance đại diện cho một lỗi xảy ra khi encodeURI() hoặc decodeURI()
                          truyền các tham số không hợp lệ | giải mã chuẩn dữ liệu sai
        


Thay vì mình dùng đồ có sẵn thì mình tự tạo (bộ lỗi riêng) để dùng sẽ phù hợp hơn với nhu cầu của mình

---
### 1.6. Việc tự tạo bộ lỗi riêng => CUSTOM ERROR


```javascript

//  Tạo ra một dạng lỗi mới

// Tạo class gì đó theo quy chuẩn tên của bản thân và chỉ cần cho nó extends Error

// Thì nó sẽ trở thành lỗi để bắt exception

class ErrorWithStatus extends Error{
  constructor({status, message}){
    super(message);
    this.status = status;
  }
}

try{
  toibihack;
}catch(error){
  let response = new ErrorWithStatus({
    status: 400,
    message: "Muốn hack hả??? ",
  });
  console.log(response);
}
```

---
# BÀI 2: REGEX

## 2.1 - Regex là gì ?


Regex | Regular Expression | Pattern | Biểu thức chính quy

Mẫu định dạng các chuỗi - Giống like trong SQL

Regex là String => Object

JS thì dùng __.test()__  |  thay cho __.matches()__ như java

---

```javascript
let regex1 = /name/i;
// có i là không phân biệt hoa thường

console.log(regex1.test("Nghĩa is my name")); // true
// Thu được true -> Trong string này có chữ name (Có phân biệt hoa thường)
console.log(regex1.test("Nghĩa is my Name")); // flase
console.log(regex1.exec("Nghĩa is my Name")); // object
console.log("Nghĩa is my Name".match(regex1)); // true
console.log("Nghĩa is my Name".search(regex1)); // flase

//có exec có tên rời ở vị trí nào 
//matches 
//search ra vị trí tìm đc
//replace 


```
---

### 2.1.1 - Regex metcharacter symbols: phần này nên test ở trang regex.com

bắt đầu chuỗi ^asda

kết thúc chuỗi asda$

trong chuỗi chỉ có ^asda$

. :  1 ký tự bất kỳ (ngoại trừ enter)

[ * lập lại từ 0 -> n]

[ + lập lại từ 1 -> n ]

[ ? lập lại từ 0 -> 1 ]

{start, end}: từ start đến end lần

[] hoặc \ để thoát chuỗi escape character

---

### 2.3. Regex Character sets vả Quantifiers

- character set [...]
- except character set [^...]
- set digit [0-9]
- set alpha [A-Z] [a-z] [a-zA-Z]
- gom nhóm () và hoặc |

---

### 2.4 Short Hand

- muốn chữ và số \w      \W
- muốn số        \d      \D
- muốn space     \s      \S
- a(?=n) tìm a mà kế bên là n
- a(?!n) tìm a mà kế bên k là n

- Ký tự biên \b
- ký tự biên là gì, và nằm ở đâu trong câu
- ký tự biên nằm giữa cấu trúc
            
    - ký tự từ + ký tự biên + không phải ký tự từ
            
    - không phải ký tự từ + ký tự biên + không phải ký tự từ
            
    - ký tự từ không bao gồm: ''
            
    - ký tự từ có cả vách ngăn nữa nhé
      
VD:

\bword\b

new word

words in my letter

sword in my hand

the 'word' is shiet

tìm từ word và chỉ từ word

          bootstrap form
          HOF: callback currying  closure
          method xử lý mảng
---
### HOF (Higher-Order Function)là gì ?
HOF là viết tắt của Higher-Order Function (Hàm bậc cao).

HOF là bất kỳ hàm nào thỏa mãn một hoặc cả hai điều kiện sau:

- Nó nhận một hoặc nhiều hàm khác làm đối số đầu vào (gọi là callback).

- Nó trả về một hàm mới như kết quả đầu ra.

Các method xử lý mảng như __map, filter, reduce__ là đều là ví dụ về HOF.

---

- Callback: Là hàm được truyền làm đối số cho một hàm khác (HOF) và được gọi lại (call back) bên trong hàm đó.__Chuyển logic vào hàm__

- Currying: Là kỹ thuật biến đổi một hàm nhận nhiều đối số thành một chuỗi các hàm, mỗi hàm chỉ nhận một đối số.Hay nó __biến đổi hàm để tái sử dụng__ Giúp tạo ra các phiên bản hàm chuyên biệt hơn bằng cách "cố định" một số đối số, làm tăng khả năng tái sử dụng.

- Closure: Là khả năng một hàm (thường là hàm bên trong) ghi nhớ và truy cập các biến từ phạm vi (scope) mà nó được khai báo, ngay cả sau khi phạm vi đó đã kết thúc.__Bảo vệ và ghi nhớ dữ liệu.__

---
Ví dụ Code: Sử dụng Callback trong HOF
```javascript
// Callback: Hàm kiểm tra điều kiện (tách logic)
const laSoChan = (so) => so % 2 === 0;

// HOF: filter() nhận laSoChan làm callback
const soChan = [1, 2, 3, 4, 5, 6].filter(laSoChan); 

console.log(soChan); // [2, 4, 6]
```

---
Ví dụ 2 :  Currying (Kỹ thuật tạo HOF)

```javascript
// Currying: Hàm nhận một đối số (thueSuat) và trả về một hàm
const tinhThue = (thueSuat) => (luong) => {
  return luong * thueSuat;
};

// Hàm chuyên biệt (được tạo ra bởi HOF)
const thueTieuChuan = tinhThue(0.1); 
const thueCao = tinhThue(0.3);

console.log(thueTieuChuan(500)); // 50 (10% của 500)
console.log(thueCao(500));        // 150 (30% của 500)
```

---
Ví dụ 3 :  Closure (Cơ chế nền tảng)

```javascript
function taoBoDem() {
  let dem = 0; // Biến này sẽ được Closure ghi nhớ

  // HOF trả về hàm mới
  return function tangVaLay() {
    dem = dem + 1; // Hàm được trả về truy cập biến 'dem'
    return dem;
  }; 
}

// taoBoDem là HOF. boDemA và boDemB là hàm được trả về
const boDemA = taoBoDem(); 
const boDemB = taoBoDem();

// Mỗi boDem giữ một bản sao 'dem' riêng biệt nhờ Closure
console.log(boDemA()); // 1
console.log(boDemA()); // 2 
console.log(boDemB()); // 1 (Khởi tạo lại)
```

---