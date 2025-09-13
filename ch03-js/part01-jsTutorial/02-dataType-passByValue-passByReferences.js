console.log("Bài 2: kiểu dữ llieeju truyền tham trị , truyền tham chiếu");
// I.1 primitive datatype : kiểu dữ liệu nguyên thủy
//          number  : số
//          string  : chuỗi
//          boolean
//          null    : giá trị rỗng  | biết kiểu nhưng không biết giá trị
//          undefines: giá trị rỗng | không biết kiểu , không biết giá trị
//          symbol(ES6) tạo ra chuỗi được mã hóa và thay đối mỗi khi vặn hành
//                      ,thường dùng để đặt tên cho biến để tránh hacker vô src tìm biến và abcxyz

//          null và undefined khác nhau như thế nào?
//----------------------------------------------------
// prototype chain Js quy định vạn vật đều là null
console.log(typeof null);
// tại sao null ko là object ?
// phân định dữ liệu theo học thuyết nên null khi typeof sẽ in ra object
// vì null ở đầu phả hệ và là cha của object nên theo quy tắc bất hiếu nó chỉ được nhỏ hơn và bằng , chỉ nhỏ hơn
// tại sao null ko nằm trong object datatype:
// ==> vì null là gốc ( nguyên thủy - primitive ) k thể tách nhỏ xuống nữa

console.log(typeof undefined); //undefined

console.log(null == undefined); // true rỗng và rỗng
console.log(null === undefined); // false
//==: là so sánh giá trị
//===: là so sánh giá trij và kiểu dữ liệu

console.log(2 == "2"); // true
console.log(2 === "2"); // false

// hoisting trong thuộc tính của object
let khoa = { name: "Ngô Khoa", height: 180 };
console.log(khoa.NguoiYeu); //undefined

//có 6 loại hàm
//undefined trong function

function handle1(a, b) {
  return b;
}
let c = handle1(2);
console.log(c); //undefined
// có thể thiếu tham số truyền vào

// function mà không có lệnh return là nó return undefined [void cũng undefined]

let str = ""; // chuỗi rỗng
str = null; // object rỗng => primitive datatype

//null và undefined k có thuộc tính nên ko thể '.' được
// let object1 = null;
// console.log(object1.ahihi);
// // ko đọc được thuộc tính vì ko có thuộc tính để chấm ,cả undefined cũn v

//II. Object datatype : kiểu dữ liệu dạng object
//  không phải là primitive thì đều là object
//  Plain object : Object siêu phẳng

// Array : là cách khai báo nhiều biến , cùng lúc , [ không cùng kiểu dữ liệu , ko liền kề ]
// đều là mảng xịn ,lưu ở heap
var hoa = ["cúc", "lan", "Trà", 10];
//hoa: (string | number)[] mô tả

//Array là 1 object

//Regular Expression : Regex là object

//Function là object
console.log(typeof handle1); //Function mà function là object nên object

console.log(10 / "d"); //NaN [not of Number | NAN là giá trị của number còn number là kiểu dữ liệu ]
console.log(typeof NaN); //Number

// Wrapper class
var str1 = "ahihi";
str1 = new String("ahihi");
console.log(str1 === "ahihi"); //false vì str cùng giá trị nhưng ko cùng kiểu vì 1 cái khởi tạo bằng pool còn cái kia thì ko

console.log(str1.valueOf() === "ahihi");
console.log(str1 == "ahihi");

// dùng Wrapper
let year = String(1999);

//bàn riêng về ép kiểu của boolean
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

//Falsy: null, undefined , 0 , -0 , "" ,false, NaN
//Truthy: ngược lại Falsy
//          chuỗi khác rỗng , số khác 0, object đều là true

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
console.log(point); //4

// Pass By References: truyền tham chiếu
let boyFriends1 = { GirlFriend: "Huệ", size: "H Cub" };
let boyFriends2 = boyFriends1;
boyFriends1.size = "E Cub";
console.log(boyFriends1);

// OPERATOR Toán tử
//trong js có 10 loại toán tử
/*
1  Assignment            gán
2  Comparison            so sánh ==  ===
3  Arithmetic            toán hạng
4  bitwase               bitwase
5  logical               logic && ||
6  String                chuỗi
7  Conditional(ternary)  ba ngôi
8  Comma                 phẩy
9  Unary                 một ngôi
10 Relational            Quan hệ

*/

//
// Arithmetic Operator toán tử toán hạng
//  + | - | * | ** | / | % | variable++ | variable-- | ++variable | --variable |
//  không được n++ ++n --n n-- với n là số bất kỳ

// Assignment Operator toán tử gán
//  = | += | -= | *= | **= | /= | %= |
//

// Comparison Operator toán tử so sánh
//  == bằng giá trị là được (không quan tâm kiểu)

console.log(2 == "2"); //true vừa đúng kiểu vừa đúng giấ trị
console.log(2 !== "2"); // true
console.log(2 != "2"); //false

//toán tử 3 ngôi
let diep = "Đẹp trai";
let isDepTrai = diep == "Đẹp trai" ? true : false;

//logical && ||

console.log(0 && 1); //0
console.log(0 || 0 || 4); //4
console.log(0 | 2 | 4); //6

console.log(0); //0
console.log(!0); //true
console.log(""); //""
console.log(!""); //true
console.log("b" + "a" + +"a" + "a"); //baNaNa

//

let response; //await callServer()
if (!response) {
  console.log("Mất kết nối với server");
}
//c2
!response && console.log("Mất kết nối với server");
