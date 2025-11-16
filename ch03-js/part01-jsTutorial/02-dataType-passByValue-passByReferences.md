# Bài 2: kiểu dữ liệu - truyền tham trị , truyền tham chiếu
 ## 1.Primitive datatype : kiểu dữ liệu nguyên thủy
- number  : số
- string  : chuỗi
- boolean
- null    : giá trị rỗng  | biết kiểu nhưng , không biết giá trị
- undefined: giá trị rỗng | không biết kiểu , không biết giá trị

- symbol(ES6) tạo ra chuỗi được mã hóa và thay đối mỗi khi vặn hành thường dùng để đặt tên cho biến để tránh hacker vô src tìm biến và abcxyz
---
 ***null và undefined khác nhau như thế nào?***

| Kiểu dữ liệu | Null | Undefine |
| :--- | :---: | ---: |
| Giá trị | rỗng | rỗng |
| Kiểu dữ liệu | Biết kiểu,  Object | Không biết kiểu , Undefine |

---
```javascript
console.log(typeof null); //object

console.log(typeof undefined); //undefined

console.log(null == undefined); // true rỗng và rỗng [về giá trị thì rỗng giống nhau]

console.log(null === undefined); // false | so sanh về kiểu dữ liệu thì khác nahu hoàn toàn
```

 Prototype chain Js quy định vạn vật đều là null
</br>

 ![Ảnh Prototype chain trong Js](https://i.sstatic.net/d4bDt.png)

__Tại sao null ko là object ?__

Phân định dữ liệu theo học thuyết nên null khi typeof sẽ in ra object:
- vì null ở đầu phả hệ và là cha của object nên theo  nó chỉ được nhỏ hơn và bằng,hay chỉ được nhỏ hơn theo [quy tắc bất hiếu](#quy-tac-bat-hieu) .

__Tại sao null ko nằm trong object datatype:__
- vì null là gốc ( nguyên thủy - primitive ) k thể tách nhỏ xuống nữa

---
### <a id="quy-tac-bat-hieu"></a>Quy tắc bất hiếu

- Khi một object extends 1 object khác , thì nó sẽ thừa hương tất cả các property và method của cha nó , nó cũng có những prop và method riêng nhưng cha của nó không thể có được

```javascript
class Animal {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }
}

class Cat extends Animal {
  constructor(name, weight, color) {
    super(name, weight);
    this.color = color;
  }
}

let a = new Animal("Lion", 200);
let b = new Cat("Mimi", 5, "white");

console.log(a); // Output: Animal { name: 'Lion', weight: 200 }
console.log(b); // Output: Cat { name: 'Mimi', weight: 5, color: 'white' }

console.log(b.color); // white
console.log(a.color); // undefine
```
---
### Toán tử so sánh trong js == | ===

- == : là so sánh giá trị
- === : là so sánh giá tri và kiểu dữ liệu

```javascript
console.log(2 == "2"); // true
console.log(2 === "2"); // false

// hoisting trong thuộc tính của object
let khoa = { name: "Ngô Khoa", height: 180 };
console.log(khoa.NguoiYeu); //undefined
```
<hr>

## 2. Function

### Trong javascript có 6 loại hàm :
-   Hàm thông thường (Function Declarations)
-   Hàm biểu thức (Function Expressions)
-   Hàm mũi tên (Arrow Functions)
-   Hàm ẩn danh (Anonymous Functions)
-   Hàm tự gọi (Immediately Invoked Function Expressions - IIFE)
-   Hàm khởi tạo (Constructor Functions)
---
### 2.1 UNDEFINED TRONG FUNCTION
Theo quy tắc của JavaScript, khi một tham số của hàm không được truyền giá trị, nó sẽ tự động được gán giá trị mặc định là undefined :

```javascript
function handle1(a, b) {
  return b;
}
let c = handle1(2);
console.log(c); // undefined
// vì chưa có tham số b truyền vào 

```
Ngoài ra hàm trong Js có thể __thiếu__ tham số truyền vào nha !!!!

__Function mà không có lệnh return là nó return undefined [void cũng undefined]__



```javascript
function handleHehe(a, b) {
  return a;
}
let hehe = handleHehe(2);
console.log(c); // in ra 2
```
```javascript
let str = ""; // chuỗi rỗng
str = null; // object rỗng => primitive datatype
```


null và undefined k có thuộc tính nên ko thể '.' được
</br>

```javascript
let object1 = null;
console.log(object1.ahihi);
//ko đọc được thuộc tính vì ko có thuộc tính để chấm ,cả undefined cũn v
```
---
##  2.2 OBJECT DATATYPE : KIỂU DỮ LIỆU DẠNG OBJECT

- Nếu không phải là primitive thì đều là object

- Plain object : Object siêu phẳng

- Array : là cách khai báo nhiều biến , cùng lúc , [ không cùng kiểu dữ liệu , ko liền kề ] đều là mảng xịn ,lưu ở heap


```javascript
var hoa = ["cúc", "lan", "Trà", 10];
//  hoa: (string | number)[] mô tả

```


<div>

    Array là 1 object

    Regular Expression : Regex là object

    Function là object

</div>

---
```javascript
function handle1(a, b) {
  return b;
}
console.log(typeof handle1); //Function mà function là object nên output là object


console.log(  10 / "d"); // NaN [not of Number | NAN là giá trị của number còn number là kiểu dữ liệu ]

console.log(typeof NaN); //Number

```
NaN [not of Number | NAN là giá trị của number còn number là kiểu dữ liệu ] : tức là khi chia cho mẫu là 1 cái gì đó bất hợp lệ.

---


```javascript
// Wrapper class
var str1 = "ahihi";
str1 = new String("ahihi");
console.log(str1 === "ahihi"); // false vì str cùng giá trị nhưng ko cùng kiểu vì 1 cái khởi tạo bằng pool còn cái kia thì ko

console.log(str1.valueOf() === "ahihi");
console.log(str1 == "ahihi");

// dùng Wrapper
let year = String(1999);
```
---
#### bàn riêng về ép kiểu của boolean

```javascript


let value = Boolean(1999);
console.log(value); //true

value = Boolean(0);
console.log(value); //false

value = Boolean(-0);
console.log(value); //false

value = Boolean(-1);
console.log(value); //true

value = Boolean("0");
console.log(value); //true

value = Boolean("");
console.log(value); //false

value = Boolean(" ");
console.log(value); //true

value = Boolean({});
console.log(value); //true

value = Boolean([]);
console.log(value); //true

value = Boolean(null);
console.log(value); //false om /0

value = Boolean(10 / "d");
console.log(value); //false

value = Boolean(false);
console.log(value); //false

value = Boolean(undefined);
console.log(value); //false
```

Tóm lại : 
- Falsy: null, undefined , 0 , -0 , "" , false, NaN

- Truthy: ngược lại Falsy : chuỗi khác rỗng , số khác 0, object đều là true

---

```javascript
//Pass By Value : truyền tham trị - truyền giá trị để tham khảo
let a = 1;
b = a;
b = 2;
console.log(a, b); //1 2

//vd2
let point = 4;
function updatePoint(currPoint) {
  currPoint = 10;
}
updatePoint(point);
```
```javascript
// Pass By References: truyền tham chiếu
let boyFriends1 = { GirlFriend: "Huệ", size: "M" };
let boyFriends2 = boyFriends1;
boyFriends1.size = "L";
console.log(boyFriends1);
```
---
## 2.3 Toán tử toán hạng trong Javascript
__OPERATOR Toán tử__

Trong js có 10 loại toán tử


- 1  Assignment            gán

- 2  Comparison            so sánh ==  ===

- 3  Arithmetic            toán hạng

- 4  bitwase               bitwase

- 5  logical               logic && ||

- 6  String                chuỗi

- 7  Conditional(ternary)  ba ngôi

- 8  Comma                 phẩy

- 9  Unary                 một ngôi

- 10 Relational            Quan hệ



Arithmetic Operator toán tử toán hạng : giống như các ngôn ngữ lập trình khác :


    + | - | * | ** | / | % | variable++ | variable-- | ++variable | --variable |

 __không được n++ | ++n | --n | n-- với n là số bất kỳ__

 ---

Assignment Operator toán tử gán

     = | += | -= | *= | **= | /= | %= |

---
Comparison Operator toán tử so sánh

    == bằng giá trị là được (không quan tâm kiểu), ví dụ:

```javascript
console.log(2 == "2"); // true vừa đúng kiểu vừa đúng giá trị
console.log(2 !== "2"); // true
console.log(2 != "2"); // false
```
---
Ternary Operator : toán tử ba ngôi

```javascript
//toán tử 3 ngôi
let diep = "Handsome";
let isDepTrai = diep == "Handsome" ? true : false;
```

---
Logical Operator toán tử logic :

```javascript
console.log(0 && 1); //0
console.log(0 || 0 || 4); //4
console.log(0 | 2 | 4); //6

console.log(0); //0
console.log(!0); //true
console.log(""); //""
console.log(!""); //true
console.log("b" + "a" + +"a" + "a"); //baNaNa
```
hoàn toàn giống các ngôn ngữ lập trình khác nhưu C , C++ , Java , Python,...

Nhờ toán tử so sánh ta có thể viết hàm như sau :

```javascript
//cách 1
let response; //await callServer()
if (!response) {
  console.log("Mất kết nối với server");
}

//cách 2
!response && console.log("Mất kết nối với server");
```
---