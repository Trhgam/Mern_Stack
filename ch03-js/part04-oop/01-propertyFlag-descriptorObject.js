//PropertyFlag: Bộ cờ của thuộc tính

// value: già trị của property 
// writable : true có thể thay đổi value , false không cho phép thay đổi value
// enumberable : true liệt kê trong vòng aljwp | false không thể được liệt kê 
// configurable : true có thể chỉnh sửa tất cả bộ cờ 
//              | false khóa cứng enumberable ,  configurable
//                  đổi với writable thì chỉ từ true về false
const profile = {
    fname : "Điệp", //prop | entry
    age : 25,
};
// entry | prop là gồm key : value

// trong object mỗi property đều có bộ cờ gọi là descriptorProperty

//1. lấy bộ cờ của một thuộc tính trong object
console.log(Object.getOwnPropertyDescriptor(profile , "fname"));

//2. định nghĩa , hiệu chỉnh lại bộ cờ của 1 property
Object.defineProperty(profile , "fname",{
    writable : false,
});

//3.tạo mới prop và bộ cờ của nó (những thằng ko đề cặp thì false)
Object.defineProperty(profile, "job" , {
    value: "Yangho",
    writable : true,
}); //enumberable : false | configurable : false

console.log(Object.getOwnPropertyDescriptor(profile, "job"));
profile.fname = "Toàn";
console.log(profile);

for (const key in profile) {
    console.log(key);
}

//4.lấy tất cả bộ cờ của 1 objetc 

/*
    key : {bộ hiệu chỉnh desc}
    key : {bộ hiệu chỉnh desc}
    key : {bộ hiệu chỉnh desc}

*/
//5.định nghĩa nhiều prop kèm bộ cờ 
Object.defineProperties(profile , {
    point : { value : 9 , writable : true},
    st_id: { value: "SE111", writable: true },
});

//Clone
let objClone = {... profile}; // destructuring | clone prop bth, k clone bộ cờ 
console.log(objClone);

objClone = Object.defineProperties(
    {},
    Object.getOwnPropertyDescriptors(profile) 
);
console.log(Object.getOwnPropertyDescriptors(profile));
console.log(Object.getOwnPropertyDescriptors(objClone));

//Sealing an object globally - niêm phong toàn bộ 1 object
//      những thằng này rất ít dùng trong dự án nhưng cũng rất là nhanh tiện
// Object.preventExtensions(obj)
//      Ngăn cấm thêm thuộc tính mới vào object
//      muốn biết 1 object có đang preventExtensions không  ta dùng Object.isExtensible(object)

// Object.seal(obj)
//      Ngăn cấm thêm mới/xóa thuộc tính object
//      set configurable : false cho tất cả các pro
//      muốn biết 1 object có đang seal không  ta dùng Object.isSealed(object)

// Object.freeze(obj)
//      Ngăn cấm thêm mới/xóa/thay đổi thuộc tính object
//      set configurable : false và writable: false cho tất cả các pro
//      muốn biết 1 object có đang freeze không  ta dùng Object.isFrozen(object)

//Value property và accessor property
let student = {
    lname: "Điệp", // value property
    fname: "Lê", //value property
     //accessor property
    get fullname(){
        return this.lname + " " + this.fname;
    },
     //accessor property
    set fullname(newName){
    [this.fname, this.lname] = newName.split(" "); //destructuring
    },
};

let user = {
    isUser : true,
    __proto__ : student, // cho nó nuốt cha 
};

console.log(user.fullname); //Lê Điệp

user.fullname =  "Trà Long";
console.log(use); //Lê Điệp
//lúc này nó sẽ có 2 fnam có 2 lname vì nó sẽ tự tạo ra 1 fullname 
// (trong này sẽ tự tạo ra fname và lname) nên sẽ tổng có 2 fullname 
/*
lưu ý với __proto__
Trước Es6(2015) không có cách chính thống nào có thể truy cập vào [[Prototype]] cả
hầu hết các tringh duyệt đều thêm vào accessor property tên là __proto__
để giúp lập trình viên truy cập và [[Prototype]]

JS đến 2025 vẫn đang loại bỏ __proto__ ra khỏi hệ thống 

trong tương lai  __proto__ đc thay bằng Object.getProtoTypeOF() | Object.setProtoTypeOF() //ngta ko dùng cái này
*/



 //accessor property : khi cần truy cập thì mới có giá trị , nó chỉ chứa bộ xử lý chứ ko chứa giá trị

console.log(student.lname);
console.log(student.fname);
console.log(student.fullname);
student.fullname= "He he";
console.log(student);
console.log(Object.getOwnPropertyDescriptor(student , "fullname"));

//value property: {value, writable, enumberable, configurable}
//accessor property : {get , set, enumberable, configurable}







