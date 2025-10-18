console.log("Bài 1: variable - hoisting - scope");
//var : xuất hiện từ ES đầu tiên
var name1 = "Điệp đẹp trai";
console.log(name1);
name1 = "Điệp 10 điểm";
console.log(name1);

// Js là ngôn ngữ hướng kịch bản | hàm | thủ tục

// khai báo biến nhưng không gán giá trị
var age;
console.log(age); //undefined
console.log(typeof age); //undefined

// Quy tắc đặt tên
// conversion name
// không bắt đầu bằng số
// nguyên tắc CammelCase (biến)
// nguyên tắc underScore (schema diagram | database)
// PascalCase-UpperCammelCase( Class )
// được pháp dùng _ và $ ở đầu _private $protected ở một số ngôn ngữ



// hosting với var (hoisting : móc ngược lên)
// khi xài 1 biến trước khi nó được khai báo ( ! nhớ là phải có khai báo )
// xử lý các kịch bản để ko có lỗi [ ví dụ 2 cái nút  ]

console.log(msg); //undefine
var msg = "Thông báo";
console.log(msg); //Thong bao

//var msg;
// console.log(msg); //undefine
// var msg = "Thông báo";
// console.log(msg); //Thong bao

//Normal Mode(châm trước) | Use Strict(nghiêm khắc)
message = "Thông báo";
console.log(message);
//châm trước vì sử dụng biến sau khi gán giá trị

// ở phiên bản ES6(2015) : phiên bản đại trùng tu
// let | const(hằng số )   dùng để thay thế var khi tạo biến
// đặc biệt là 2 thằng này k hoisting

// window là object khổng lồ/cửa sổ trình duyệt,
// việc code trong file js là đg code trong object window
// mỗi lần dùng var bản chất là đg khởi tạo property cho window nên nó ko có value ,
// nói cách khác là undefined giống java vậy đó !!!
//
//các hiểu lầm về const thường gặp
const profile = { name: "Toàn", height: 160 };
profile.height = 170;
// const profile = {name: "Toàn", height : 190 } lỗi
// => vì nó đang thay địa chỉ rồi chứ ko  thay đổi mỗi giá trị nữa
// hằng số này lưu dãy số  dẫn tới vùng nhớ chứa object,
// nên dù thay đổi giá trị trong vùng nhớ, nó vẫn ko thay đổi địa chỉ

const array1 = [1, 2, 3, 5];
array1.push(6);

// array1 = [1, 2, 3, 5 , 6]; ==> lỗi bắt array1 trỏ tới 1 mảng khác

// scope : trong js có 3 loại scope
// Global scope : toàn cục
// funct scope : nội hàm
// block scope : cục bộ

// Var sẽ không bị can thiệp bởi bất cứ scope nào hết
// nếu tạo biến bằng var thì mình sẽ global scope
// nó có thể tham gia vô bất kì hàm nào
var son = "Toàn";
if (true) {
  var son = "Toàn";
}
console.log(son); //Toàn vì son ở đâu cũng là son bản mới nhất

//let | const không hoisting , có block scope

// var có hoisting và out block scope

var son = "Toàn";
if (true) {
  let son = "Hùng";
}
console.log(son); // Toàn
