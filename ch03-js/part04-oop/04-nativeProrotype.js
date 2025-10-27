
// Thuộc  tính prototype sử dụng rộng rãi trong js
//mọi contructor function có sẵn trong js đều dùng prototype

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


//cảnh giác với this trong class
class Button{
    constructor(value){
        this.value = value;
    }
    click(){
        console.log("Giá trị là " + this.value);
        
    }
}

let btn = new Button("Ahihi");
// btn{
//   value: "Ahihi",
//   [[Prototype]] == class Button == Button.prototype{
//     constructor
//       prototype == class Button
//     click(){}
//   }
// }


//====================nên sử dụng cách này cho đúng từ đầu
//c2
// btn.click();
// this trong call back
// setTimeout(()=>{
//     btn.click();
// },1000);


//c3 sai
// setTimeout(btn.click,1000); 


//======================================= định nghĩa this.click
// class Button1{
//     constructor(value){
//         this.value = value;
//         this.click = this.click.bind(this);
//     }
//     click(){
//         console.log("Giá trị là " + this.value);
        
//     }
// }

// let btn1 = new Button1("Ahihi");
// setTimeout(btn1.click,1000); 



//================Dùng Arrow function====================
class Button2{
    constructor(value){
        this.value = value; 
    }
    click = () => {
        console.log("Giá trị là " + this.value);
    }
}

let btn2 = new Button2("Ahihi");
// setTimeout(btn2.click,1000); 




//======================CLASS Inheritance : kế thừa thông qua class

class Animal{
    constructor(name){
        this.name = name;
        this.speed = 0;
    }
    run(speed){
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
        
    }
    stop(){
        this.speed = 0;
        console.log(this.name + "sands still");
    }
}

let ani = new Animal("My Animal");
ani.run(5);

//ani.hide();
/*  ani.hide{
    name: "My Animal" ,
    speed : 5
    [[Prototype]] == class Animal == Animal.prototype{
        constructor    
        run(speed)
    }
}

*/
class Rabbit extends Animal {
    constructor(name) {
    super(name); //new Animal(name)
    }
    hide() {
    console.log(this.name + "hide!!!");
    }
    stop(){
        setTimeout(()=>{
            super.stop();
        }, 1000);
    }
}

let rb = new Rabbit("yellowRb");
rb.run(10);
rb.hide();
// rb.stop();
/*
rb{
    name:"yellowRb",
    speed : 10,
    [[Prototype]] : class Rabbit{
        construcor
        hide()
        [[Prototype]] : class Animal{
            construcor
            run()
        }
    }
}
*/
console.log(rb);

// rb.__proto__ == class Rabbit == Rabbit.prototype
// class Rabbit.__proto__ == class Animal == Animal.prototype
// class Animal.__proto__ == class Object == Object.prototype
// class Object.__proto__ == null

//=================================CLASS FIELD(JS)============================================

// class field(js)
class Animal2 {
  name = "isAnimal2"; //class field
  // constructor(name) {
  //   this.name = name;
  // }
}

class Rabbit2 extends Animal2 {
  name = "isRabbit2";
}

let ani2 = new Animal2();
let rb2 = new Rabbit2();
// console.log(rb2.__proto__.name);// undefine

// console.log(rb2.name == Animal2.name);


//=======================static=================
//static
class User3 {
  name = "Diep"; //class field
  static name2 = "Lan";
}

let obj1 = new User3();
//static(java): prop thuộc về class và object được xài chung
//class field: prop thuộc về class và object được xài chung
//static prop: prop thuộc về class và chỉ có class được xài

//static trong java và class field trong js là giống nhau
//static tron java và static trong js là khác nhau
console.log(obj1.name); //Diep
console.log(obj1.name2); //undefine
console.log(User3.name2); //Lan

//ví dụ về static method
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}
//tạo ra danh sách các bài báo
let articArr = [
    new Article("Tuyển dụng sang cam"), new Date(2022, 2, 4),
    new Article("Nữ đa cấp ở Đồng Nai"), new Date(2022, 2, 6),
    new Article("Siêu trộm Annabell lấy chồng"), new Date(2022, 6, 3),

];
articArr.sort(Article.compare);
console.log(articArr);



//================================================================================

// 09 - private - property - method.js;
//Access modifier : đây là đại diện của tính đóng gói trong OOP ở js

//trong js chỉ chia ra 2 là Internal và External interface
// Internal interface - /private - phương thức và thuộc tính chỉ có thể được truy cập bên trong các phương thức trong class, không phải từ bên ngoài.
// External interface - /public- phương thức và thuộc tính có thể truy cập được từ ngoài và trong class.
// Trong Javascript, có 2 loại thuộc tính và phương thức:

// Public: có thể truy cập từ bất kỳ đâu. Nghĩa là external interface. Cho đến bây giờ thì chúng ta chỉ sử dụng thuộc tính public
// Private: có thể truy cập bên trong class. Nghĩa là internal interface
// Trong nhiều ngôn ngữ khác thì còn tồn tại trường "protected": chỉ có thể truy cập bên trong class và những class kế thừa.

// Trường Protected không được quy định trong Javascript ở cấp độ ngôn ngữ, những trong thực tế để cho tiện lợi thì chúng ta có thể giả lập để quy ước với nhau.

//ReadOnly
//nếu khai báo get mà k có set, thì nó sẽ thành readOnly, không đổi giá trị đc
//nếu không có set/get thì nó tự tạo , sẽ gán bt
//các dev quy ước tên _ ở trước là private chỉ dùng trong class, nên truy cập bằng get/set
//không nên . tới
//việc quy ước này không đảm bảo được ngôn ngữ, chỉ là quy ước

class CoffeeMachine{
    constructor(power){
        this._power = power;
    }

    get power(){
        return this._power;
    }
}

// let cmf = new CoffeeMachine(200);
// cmf.power(200);
// console.log(cmf.power); // 200
// cmf.power(50);
// console.log(cmf.power); // 200
// cmf._power = 50;
// console.log(cmf.power); // 50

class CoffeeMachine1 {
    #waterLimit = 200;
    setWaterAmount(){
        this.#waterLimit = 10;
    }
}

let cfm1 = new CoffeeMachine1();
cfm1.setWaterAmount();