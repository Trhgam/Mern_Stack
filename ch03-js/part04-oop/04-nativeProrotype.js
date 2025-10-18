
// Thuoojc tinhs prototype suwr dujnng roojng raix trong js
//mọi contructor function có sẵn trong js đều dung prototype

//Tổng kết cái khái niệm nhưu sau
//[[Prototype]] là thuộc tính ẩn trong object (function).
// đại diện cho prototype thực tế
// __proto__ là accessor ko chính thống của [[Prototype]]

//Prototype chain : cây phả hệ 

let obj = {}; //obj rỗng
obj = new Object();

console.log(obj.__proto__.__proto__);
console.log(obj.__proto__ == Object.prototype); //true

let mang1 = [1, 2, 3];
console.log(mang1.__proto__ == Array.prototype); 
console.log(mang1.__proto__.__proto__); //clas object
console.log(mang1.__proto__.__proto__.__proto__ == Array.prototype.__proto__); //true 


// ============================================================
//05- prototyMethod - Object Without Proto

//sau ES6 mọi người thay đổi cách dung __proto__
//sang sử dụng Object.getPrototypeOf() |  Object.setPrototypeOf() 
//Object.create(proto , [descriptor])

let animal = {
    eats:true,
};

console.log(animal.__proto__ == Object.prototype);
console.log(Object.getPrototypeOf(animal) == Object.prototype);

//let rabbitYellow = {};
// rabbitYellow.__proto__ = animal;
let rabbitYellow = Object.create(animal);
//tạo ra {} /obj rỗng có [[Prototype]] là animal

console.log(rabbitYellow.__proto__ == animal);
console.log(Object.getPrototypeOf(rabbitYellow) == animal);

//tạo tắt  rabbitYellow
rabbitYellow = Object.create(animal, {
    jumps : {value: true, enumberale : true, configurable: true },
});
//wriable : false

//clone
//..spread : k clone bộ cờ , ko clone prop có enumberable : false
let objClone = {...rabbitYellow};
console.log(objClone);
console.log(Object.getOwnPropertyDescriptors(objClone));

//Object.defineProperties() : clone đc prop , ko lấy được [[Prototype]]
objClone = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(rabbitYellow)
);
console.log(objClone);
console.log(Object.getOwnPropertyDescriptors(objClone));

//Object.crete(proto , [Descriptor])
objClone = Object.create(
    Object.getPrototypeOf(rabbitYellow),
    Object.getOwnPropertyDescriptors(rabbitYellow)
);
console.log(objClone);
console.log(Object.getOwnPropertyDescriptors(objClone));
/*
Như đã thấy thì chúng ta có nhiều cách để quản lý [[Prototype]]. Nhiều cách để làm cùng 1 thứ. Tại sao? Sau đây là nguyên nhân lịch sử

Thuộc tính prototype của constructor function đã có từ xa xưa
Sau đó, vào năm 2012, Object.create xuất hiện trong JS tiêu chuẩn. 
Nó cung cấp khả năng tạo một object với một prototype được cung cấp, nhưng không cung cấp khả năng get/set nó.
Vì thế các trình duyệt thêm một thuộc tính "không thuộc JS tiêu chuẩn" là proto để cho phép người dùng có thể get/set một prototype bất cứ lúc nào.
Sau đó, vào năm 2015, Object.setPrototypeOf và Object.getProtypeOf được thêm vào JS tiêu chuẩn, để thực hiện chức năng tương tự như__proto__.
Tại sao proto bị thay thế bởi các hàm getPrototypeOf/setPrototypeOf? 
Đây là một câu hỏi thú vị, đòi hỏi chúng ta phải hiểu tại sao proto khá tệ.
Đọc thêm để biết câu trả lời. "very plain Object" để hiểu rỏ tại sao nó tệ

Đừng thay đổi [[Prototype]] trên các object đang tồn tại nếu quan tâm đến vấn đề tốc độ Về mặt kỹ thuật,
chúng ta có thể get/set [[Prototype]] bất kỳ lúc nào. Nhưng thường thì chúng ta chỉ set một lần khi object khởi tạo và không thay đổi nó nữa: rabbit kế thừa từ animal, và nó sẽ không thay đổi.

Và các Javascript engine được tối ưu hóa cao cho việc này.
Thay đổi một prototype "đang hoạt động" với Object.setPrototypeOf hoặc obj.__proto__= là một phép tất rất chậm bởi vì nó phá vỡ sự tối ưu hóa nội bộ cho các hoạt động truy cập đến thuộc tính object.
Vì thế tránh sử dụng nó nếu bạn không biết nó làm gì, hoặc tốc độ Javasript không phải là vấn đề bạn quan tâm.
*/


//very plain object - object siêu phẳng
// obj = {};
// obj.__proto__ = null;
// let key = prompt("Nhận vào key");
// obj[key] = "giá trị bất kì";
// console.log(obj);


//[[Prototype]] thì bth nó chỉ set class , object , null
obj = Object.create(null);
// obj= {}
console.log(obj.__proto__);
obj.__proto__= "agduegd";
console.log(obj.__proto__); 
console.log(obj);

//========================================================================
//06-class-classInheritance
class User {
    constructor(fullname){
        [this.fname, this.lname] = fullname.split(" ");
    }
    show(){
        console.log(`firstname của tui là ${this.fname} và lastname của tui là ${this.lname}`);
        
    }
}

let diep = new User("Lê Điệp");

console.log(diep.__proto__ == User); //false
console.log(diep.__proto__ == User.prototype); //true

console.log(typeof User); //function
console.log(User.prototype); // class User
console.log(User == User.prototype.construcor); //true


//chuyển đổi class sang hàm

function Student(fullname) {
  [this.fname, this.lname] = fullname.split(" ");
}
Student.prototype.show = function () {
  console.log(
    `firstName của tui là ${this.fname} và lastName của tui là ${this.lname}`
  );
};

diep = new User("Lê Điệp"); //class
let diepf = Student("Lê Điệp"); //function thì có new hay k đều được


//class expression
let User1 = class Ahihi{
     constructor(fullname){
        [this.fname, this.lname] = fullname.split(" ");
    }
    show(){
        console.log(`firstname của tui là ${this.fname} và lastname của tui là ${this.lname}`);
        
    }
};
let dieppp = new User1("Trà Long");

//Biếu diễn
// hàm tạo class : singleton pattern : xương sườn dùng để giấu cấu trúc 


function makeClass() {
    class Ahihi {
        constructor(fullname) {
        [this.fname, this.lname] = fullname.split(" ");
        }
        show() {
        console.log(
            `firstName của tui là ${this.fname} và lastName của tui là ${this.lname}`
        );
        }
    }
    return Ahihi;
}

let User2 = makeClass();
let diepppp = new User2("Trà Long");


//computed name
let prop1 = Symbol();
let prop2 = Symbol();


class User4{
    fname = "Nguyen";
    
    [prop1](){
        console.log("hello");
        
    }
}

let hue = new User4();
hue[prop1]();
console.log(hue);
