console.log("07-objectMethod-this-function");
// Object : đối tượng
// đối tượng là những gì sờ được và đếm được
// các object được mô tả bằng prop và method
// method: hàm được sở hữu bởi class hoặc object

let promotionBoy1 = {
  nickName: "Lê Mười Điệp", //properties
  age: 24, //properties
  //method : phương thức - hành động
  //fd
  sayHi() {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
  //fd: accessor properties
  sayHi: function () {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
  //fa
  sayHi: () => {
    console.log("Ahihi quẹo lựa quẹo lựa");
  },
};

// cách tạo method bằng fd | fe về mặt kết quả là giống nhau
// nhưng có sự khác biệt trong oop vì fd là method
// còn fe là prop có giá trị hàm
// mà nếu là prop thì sẽ có accessor properties

//  ta có thể tạo thêm prop sau khi đã khởi tạo object
//  frozen object : chặn việc tạo thêm thuộc tính trong object
promotionBoy1.money = 1000;
console.log(promotionBoy1);
//ta có thể tạo method sau khi khởi tạo object không ? không nha
// nó chỉ khởi tạo được thêm thuộc tính chứa hàm thôi fe
promotionBoy1.chuiKhach = function () {
  console.log("Ahihi Đồ chó");
};

const promotionBoy2 = {
  nickName: "Lê Mười Điệp", //properties
  age: 24,
  //method : phương thức - hành động
  //fd
  showName() {
    console.log("Nickname nè : " + this.nickName); //this là undefine
  },
  //fe
  showName1: function () {
    console.log("Nickname nè : " + this.nickName); //this là  undefine
  },
  //fa
  showName2: () => {
    console.log("Nickname nè : " + this.nickName); //this là undefine
  },
};

// this có giá trị khi mình runtime | khi mình lấy giá trị thì this mới được
// có giá trị , còn lại khi mới khởi tạo mà chưa dùng thì là undefine

promotionBoy2.showName(); //fd
// fd giam this => this được xác định bằng object gọi hàm
// this là promotionBoy2 => promotionBoy2.nickname => Lê Mười Điệp
// nếu như trong trường hợp có người gọi hàm thì k cần xét mode
// khi dùng fe | fd mà ko có người gọi thì xét mode
// normal => windowObject | use strict => undefine

promotionBoy2.showName2(); // fa
// fa không giam this , ra ngoài tìm cha , fa không quan tâm người gọi nó
// fa thằng bọc nó sẽ có nó chứ ko phải lúc nào cũng là window nha
//this là window => window.nickname => undefined

// ==========================================================
// tại sao lại cần có this

let promotionBoy3 = {
  nickName: "Lê Mười Điệp", //   properties
  age: 24,
  //method : phương thức - hành động
  //fd
  showName() {
    console.log("Nickname nè : " + promotionBoy3.nickName);
  },
};

let promotionBoy4 = promotionBoy3;
promotionBoy3 = null;
// promotionBoy4.showName();    => lỗi : cannot red prop of null
//vì lúc này promitionBoy3 đg null nên ko thể trỏ nickname nên phải dùng this

// nâng cao thêm 1 tý
// this trong cấu trúc lồng
let promotionBoy5 = {
  nickName: "Lê Mười Điệp", //   properties
  age: 24,
  //method : phương thức - hành động
  //fd>fa>this
  showName() {
    let arrow = () => {
      console.log("Nickname nè : " + this.nickName);
    };
    arrow();
  },
  //fd>fe>this
  showName1() {
    let expression = function () {
      console.log("Nickname nè : " + this.nickName);
    };
    expression();
  },
};

//
promotionBoy5.showName(); //fd>fa>this
// fa thả this ra ngoài tìm cha
// this bị bắt bởi showName(fd)
// fd giam this và chờ người gọi => promotionBoy5
//this.nickName => promotionBoy5.nickName ==> Lê Mười Điệp

//
// promotionBoy5.showName1(); //fd>fe>this      // test đi
// fe giam this (fe đang không có người gọi)
// xét về mode
// normal                 |      use strict
//  this window.Object    |   this là undefined
//  windowObject.nickName |   cannot read prop of undefined
//            undefined   |
// có thể thử đặt use strict để thử
//----------------------------------------------------------------

//  Nâng cao 1 tý
//  this trong callback

let promotionBoy6 = {
  nickName: "Lê Mười Điệp", //   properties
  age: 24,
  //method : phương thức - hành động
  //fd>fa>this
  showName() {
    setTimeout(function () {
      console.log("Nickname nè : " + this.nickName);
    }, 2000);
  },
  //fd>fe>this
  showName1() {
    setTimeout(() => {
      console.log("Nickname nè : " + this.nickName);
    }, 2000);
  },
};
promotionBoy6.showName();
// khi này showName đã chạy xong nhưng setTimeOut còn chờ để log ra màn hình
// và khi nó log ra được thì mọi hàm đã chạy xong nên khi nó muốn log
// thì nó phải có người gọi nó
//  ,thì lúc này sẽ là window gọi(chú bảo vệ) kể cả mode nào đi nữa
// mà ...

promotionBoy6.showName1();
//giải phóng this nên nó mặc định việc bạn viết trong arrow giống như bạn viết bên ngoài arrow
// vậy nên this sẽ là hàm bọc nó luôn
//fe>fd>fe>fd>this không nên
//fd/fe>fa>fa>fa > this nên , nó phụ thuộc vào thằng ngoài
//tại sao phải lồng nhiều hàm vậy ==> liên quan đến người học react
// ==============================================================

//Nâng cao: HOF
//Higher order function : kỹ thuật viết hàm theo tầng ,có 3 kỹ thuật chính

// 1.callBack : là hàm nhận vòa 1 hàm khác làm đối số
// 2.Closure : hàm return ra 1 hàm khác
// 3.Currying : kỹ thuật tách đối số thành nhiều lượt

//=================================================
// ví dụ HOF:
// Viết hàm nhận vào 2 số , trả ra tổng 2 số đó
let sumDemo = function (a, b) {
  return a + b;
};
sumDemo(2, 6);
sumDemo = function (a) {
  return function (b) {
    return a + b;
  };
};
sumDemo = (a) => (b) => a + b;
sumDemo(2)(6);
// khi đổi thằng 6 thì nó vẫn giữ lại thằng 2  còn ở hàm trên buộc nó phải chạy lại hết \

/*
nếu truyền 1 tham số 
sumDemo(2)= function (b) {
    return a + b;
};
*/
// mounting là render - rerender react
// tách tầng ra để giao diện phía trước ko bị thay đổi , chỉ thay đổi hay reset lại phần phía dưới
// phần mới truyền vô á

//HOF thật : có 3 khái niệm
// 1.Call back : hàm nhận vào 1 hàm khác làm đối số
const array1 = [1, 2, 3, 4, 5];
array1.forEach((item) => {
  console.log(item);
});
// foreach sẽ đi qua từng phần tử trong mảng , với từng phần tử đi qua sẽ bỏ nó vô hàm foreach
// việc của mk là cung cấp hàm cho nó thực thi
// và nó sẽ lấy từng phần tử làm theo hàm đã viết
//==========================================================================================
//  2.Closure
//  2.1 lexical scoping : hàm con dùng biến của hàm cha
//  2.2 closure : 1 hàm return ra 1 hàm khác

//ứng dụng : tạo ra hàm mà mỗi lần gọi sẽ cung cấp 1 số mới
// ko trùng với số cũ để làm id
//
const initIdentity = () => {
  let newId = 0;
  return () => ++newId;
};

// sài sai vì khi gọi vậy nó chạy lại cả hàm cha
// bọc nó nên biến newwId bị reset lại rồi
console.log(initIdentity()); //() => ++ newId; || newId = 0  được sở hữu id luôn
console.log(initIdentity()());
console.log(initIdentity()());

// xài đúng vì chỉ gọi lại phần nhỏ bên trong , phía
// sau return á , nên nó ko reset giá trị
let demoClosure = initIdentity(); //() => ++ newId; || newId = 0
console.log(demoClosure()); //1
console.log(demoClosure()); //2
console.log(demoClosure()); //3

//===================================================================
// Viết 1 hàm xử lý được cả 3 bài toán
// tìm các số từ 0 đến 10 là số lẻ
// tìm các số từ 0 đến 10 là số chẵn
// tìm các số từ 0 đến 30 là số chia 3 dư 2

function handle3(end, checkNum) {
  let result = [];
  for (let number = 0; number <= end; number++) {
    if (checkNum(number)) result.push(number);
  }
  return result;
}

console.log(handle3(10, (number) => number % 2 == 1));
console.log(handle3(20, (number) => number % 2 == 0));
console.log(handle3(30, (number) => number % 3 == 2));

//==========================================================
//  Call Apply Bind
// hiệu chỉnh this trong trường hợp bất khả kháng

const people = {
  print(age, location) {
    console.log(this.fullName + " " + age + " " + location);
  },
};

people.print(10, "TP HCM"); // undefined 10 TP HCM
//this là gì ? => people
const diep = { fullName: "Lê Mười Điệp" };
//1....call(obj ...parametter)
people.print.call(diep, 10, "TP HCM");

//2....apply(obj ...[parametter])
people.print.apply(diep, [10, "TP HCM"]);

//3....bind(obj)()...parametter)
people.print.bind(diep)(10, "TP HCM");
people.print.bind(diep, 10, "TP HCM")();

///
let promotionBoy7 = {
  nickName: "Lê Mười Điệp", //   properties
  age: 24,
  //method : phương thức - hành động
  //fd>fa>this
  showName() {
    setTimeout(
      function () {
        console.log("Nickname nè : " + this.nickName);
      }.bind(this),
      2000
    );
  },
  //fd>fe>this
  showName1() {
    setTimeout(() => {
      console.log("Nickname nè : " + this.nickName);
    }, 2000);
  },
};
promotionBoy7.showName(); //nickname nè Lê Mười Điệp

//=========================================================================================
// datetime
// thời gian trong js là object | dựa trên milisecond giây
// được tính bằng 1/1/1970 theo chuẩn utc
// có 4 cách để khởi tạo
let a = new Date(); // ngày giờ Đông Dương indo china
let b = new Date(1758117308947);
a = new Date("2025-9-17");
a = new Date("2025-8-17"); // Mĩ tháng bắt đầu là 0
console.log(a);
//y/m-1/d/h/m/s/ms

// getDate()        : lấy ngày trong tháng //16
// getDay()         : lấy ngày trong tuần (0: chủ nhật - 6:thứ 7);
// getFullYear()    : lấy năm
// getHours()       : lấy giờ 0-23
// getMilliseconds(): lấy mili giây (0-999)
// getMinutes()     : lấy về phút (0-59)
// getMonth()       : lấy về tháng (0 -11)
// getSeconds()     : lấy về giây (0-59)
// toISOString()    : lấy định dạng thời gian chuẩn
// dùng để bỏ vào DBI/ vì các ngôn ngữ trình duyệt khác
// đểu có thể chuyển từ ISO này về dạng bth được
console.log(a.toISOString()); //2022-08-17T14:10:32.100Z // chuẩn lưu trữu trên database
// ISO8601 TIÊU CHUẨN LƯU TRỮ THỜI GIAN


///===================================

//call(thisArg, arg1, arg2, ...)
// Phương thức call() dùng để gọi hàm ngay lập tức, với một ngữ cảnh this cụ thể 
// và nhận các đối số truyền vào dưới dạng danh sách riêng lẻ.
// const person = { name: "Alice" };

// function greet(city, country) {
//   console.log(`Hello, my name is ${this.name} from ${city}, ${country}.`);
// }

// // Gọi hàm, đặt 'this' là 'person' và truyền đối số riêng lẻ
// greet.call(person, "Hanoi", "Vietnam"); 
// // Output: Hello, my name is Alice from Hanoi, Vietnam.



//apply(thisArg, [argsArray])
// Phương thức apply() cũng dùng để gọi hàm ngay lập tức và thiết lập ngữ cảnh this, 
// nhưng nó nhận các đối số truyền vào dưới dạng một mảng.
// const person = { name: "Bob" };

// function greet(city, country) {
//   console.log(`Hello, my name is ${this.name} from ${city}, ${country}.`);
// }

// // Gọi hàm, đặt 'this' là 'person' và truyền đối số dưới dạng mảng
// const args = ["Tokyo", "Japan"];
// greet.apply(person, args); 
// // Output: Hello, my name is Bob from Tokyo, Japan.


// bind(thisArg, arg1, arg2, ...)
// Phương thức bind() khác với call và apply ở chỗ nó không gọi hàm ngay lập tức. Thay vào đó, nó tạo ra một phiên bản mới củ
// hàm gốc với ngữ cảnh this đã được gắn (bound) vĩnh viễn.
// const user = { 
//     name: "Charlie",
//     sayName: function() {
//         console.log(`My name is ${this.name}`);
//     }
// };

// // 1. Tạo hàm mới, cố định 'this' là 'user'
// const boundSayName = user.sayName.bind(user); 

// // 2. Gọi hàm mới sau đó (không bị mất ngữ cảnh 'this')
// boundSayName(); 
// // Output: My name is Charlie