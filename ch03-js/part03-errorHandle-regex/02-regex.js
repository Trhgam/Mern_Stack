//I -Regex là gì ?
//Regex hay Regular epression | pattern | biểu thức chính quy 
// mẫu định dạng cho các chuỗi 

//hơi giống like trong sql
//regex là string =. OBJECT
//JS THÌ DÙNG .test thay cho .matches() như java

let regex1 = /name/i        //phân biệt hoa thưởng thêm i viết tắt của ignore
console.log(regex1.test("Điệp is my name")); //true
console.log(regex1.test("Điệp is my Name")); //false
console.log(regex1.exec("Điệp is my name")); //object kì lạ
console.log("Điệp is mu Name".match(regex1));
console.log("Điệp is mu Name".search(regex1));
//có exec có tên rời ở vị trí nào 
//matches 
//search ra vị trí tìm đc
//replace 


//II - Regex metcharacter symbols: phần này nên test ở trang regexr.com
// bắt đầu chuỗi ^asda
// kết thúc chuỗi asda$
// trong chuỗi chỉ có ^asda$

// . : 1 ký tự bất kỳ (ngoại trừ enter)

// * lập lại từ 0 -> n
// + lập lại từ 1 -> n
// ? lập lại từ 0 -> 1
// {start, end}: từ start đến end lần

// [] hoặc \ để thoát chuỗi escape character

//III. Regex Character sets vả Quantifiers
// character set [...]
// except character set [^...]
// set digit [0-9]
// set alpha [A-Z] [a-z] [a-zA-Z]
// gom nhóm () và hoặc |

//Short Hand
//muốn chữ và số \w      \W
//muốn số        \d      \D
//muốn space     \s      \S
//a(?=n) tìm a mà kế bên là n
//a(?!n) tìm a mà kế bên k là n
//ký  tự biên 
//Ký tự biên \b
//ký tự biên là gì, và nằm ở đâu trong câu
// ký tự biên nằm giữa cấu trúc
//      ký tự từ + ký tự biên + không phải ký tự từ
//      không phải ký tự từ + ký tự biên + không phải ký tự từ

//vd
/*
\bword\b

new word
words in my letter
sword in my hand
the 'word' is shiet

*/

//tìm từ word và chỉ từ word

// bootstrap form
// HOF: callback currying  closure
// method xử lý mảng

//
