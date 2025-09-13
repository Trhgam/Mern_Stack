console.log("Bài 06 - Hàm(cơ bản) - các method xử lý number");
// Hàm trong js được chia làm 2 loại chính
// chia theo chức năng của nó
// Function declaration | Function Expression

//              1.Function declararion (khai báo hàm) : nó hosting
// thấy function là Function declaration vì nó như đang khai báo method cho window nên đặt đâu cũng dùng được
handle1();
function handle1() {
  console.log("Tui là hàm làm bằng funtion declaration");
}
handle1();

//              2.Function Expression : biểu thức hàm

// handle2();

// k khai báo            handle2 is not defined
// khai báo bằng var     handle2 is not function
// khai báo bằng let     cannot access 'handle2' before initialization

let handle2 = function () {
  console.log("Tui là hàm làm bằng Function Expression");
};
handle2();

//              3.IIFE(Immediately invokkable 'function expression')
// hàm chạy ngay lập tức
//k cần đặt tên , chạy ngay sau khi tạo liền , k tái sử dụng được luôn

(function handle3() {
  let a = 10;
  let b = 20;
  console.log(a + b);
})();

// tại sao lại có hàm đi ngược với định nghĩa hàm như này ?

//nên có ;

//callback : gọi lại |hàm nhận 1 hàm làm đối số

//function1(function2)
//function1 là callback
//function2 là callback function

// refresh  : thuật toán
// intern   : kiến trúc | luồng xử lý như nào

// giới thiệu 1 call back tên là settimeout của wed api
// settimeout(functHandle, milisecond)
//          sau milisecond sẽ gọi functHandle()
function handle3() {
  console.log("Ahyhy 1");
}
// setTimeout(handle3,3000) // ko có mở ngoặc nha vì mở ngạoc là nó sẽ chạy luôn
// // setInterval(handle3,3000)

// setTimeout(function handle4(){
//     console.log("Ahyhy 2");
// },3000 );

// setTimeout(() => {
//     console.log("Ahyhy 4");
// },3000 );

//Phân biệt 'this' trong các loại hàm
//fd
function handle4() {
  console.log(this); //this là undefined vì build chứu chưa chạy
}

//fe
let handle5 = function () {
  console.log(this); //this là undefined
};

//fa
let handle6 = () => {
  console.log(this); //this là undefined
};

//chạy này ko có người gọi  //normal (châm trước) | use strict ko gọi là ko ai gọi luôn
handle4(); //fd              window object         | undefine
handle5(); //fe              window object         | undefine
handle6(); //fa              window object         | window object
//vì ko có người gọi nên nó quy ước window

let person1 = {
  fullname: "Điệp đẹp trai",
  //method
  getNameByFd() {
    console.log(this.fullname); // this is undefine
  },
  //property
  getNameByFe: function () {
    console.log(this.fullname); // this is undefine
  },
  getNameByFa: () => {
    console.log(this.fullname); // this is undefine
  },
  // this is undefine vì đây mới là build , khai báo thôi chứ chưa chạy
};
//chay                            //normal
person1.getNameByFd(); //this person1.fullname = "Điệp đẹp trai"
person1.getNameByFe(); //this person1.fullname = "Điệp đẹp trai"
person1.getNameByFa(); //this person1.fullname = undefine
//  trong trg hợp này vì có người gọi nên normal và usestrict giống nhau
// parameter(tham số)  | agrument (đối số cho ng khác đối chiếu)

//  trong mỗi thuộc tính sẽ có 1 cặp accessor property,

function handle7(a, b = 10) {
  console.log(a + b);
}
// b = 10 dèault parameter
handle7(2); //12
handle7(2, 5); //12

// tham số đợi | tham số nghỉ | tham số còn lại | resr parameter
function handle8(a, b, ...c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
//....c rest parametter  : chỉ nằm ở tham số thì mới là rest parametter
handle8(2, 3); //a = 2 , b = 3 c là mảng rỗng []
handle8(2, 3, 4, 5, 6); //

//... spread operator : destructuring: kỹ thuật phân rã cấu trúc [C# Js có]

//... ứng dụng rest parametter
// viết hàm nhận vào 1 đống giá trị , tính tổng đống giá trị đó

function summAll(...numberList) {
  let sum = 0;
  for (const value of numberList) {
    sum += value;
  }
  return sum;
}

let result = summAll(12, 123, 321, 77, 88, 978);
console.log(result);

//ngng khác : this là class

//Bài 9 : Number - method
//không ai dùng js để làm app ngân hàng
// số trong js có dạng là number
// và đối với số nguyên , chỉ đúng khi dưới 15 chữ số
let x = 999999999999999; //15 số
x = 9999999999999999; // 16 số
// số thực là 17 số
x = 0.2 + 0.1; // ko được 0.3
x = (0.2 * 10 + 0.1 * 10) / 10;
x = Number((0.2 + 0.1).toFixed(1)); //toFix trả về chuỗi nên ép kiểu
console.log(x);

// cộng ưu tiên chuỗi | trừ ưu tiên số
console.log(2 + 2); //4
console.log(2 + "2"); // '22'
console.log("2" + 2); // '22'
console.log(2 - "2"); // 0
console.log(2 - "d"); //NaN
console.log(2 - "d"); //2d
console.log(2 / "d"); //NaN
console.log(2 / 0); //infinity
console.log(-2 / 0); //-infinity
x = 0o7; //octal
x = 0x7; //hexa
// JS : this đại diện cho ng gọi nó ,ko ai gọi thì this là undefined
// fd và fe sẽ giam this(điều đó là tốt ) cho tới khi xác định được người gọi
// ví dụ gửi con vô nhà trẻ ,bảo mẫu giam con và cho tới khi cha mẹ tới
// ... FA là thả this ra ngoài tìm cha ,nếu ko tìm đc là undefine
