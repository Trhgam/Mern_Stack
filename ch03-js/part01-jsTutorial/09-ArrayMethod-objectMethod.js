console.log("11-ArrayMeyhod-objectMethod");

//mảng không nhất thiết cùng kiểu

let arr1 = [1, 2, "a", { lname: "Huệ", age: 10 }, [3, 5]];
//.length
console.log(arr1.length); //
console.log(arr1[4][0]); //3

//3.instanceof Array : kiểm tra 1 object có phải lacf bản thể
//của array không
console.log(arr1 instanceof Array); //true
console.log(arr1 instanceof Object); //true
console.log(null instanceof Array); //false
console.log(typeof Array); //object

//4 . toString() : biến mảng thành chuỗi kèm dấu ,
console.log(arr1.toString());
//1, 2, a , {object object}, [3,5]]


//5.split | join

//chèn mảng // array là mutable : hầu hết các thao tác với mảng đều sẽ làm thay đổi
//object mảng
//*** method nào mà nhận vào cf => trả ra mảng mới
// filter | map
// 1. push(): Nhét item vào cuối mảng => return ra độ dài mới
let workerList = ["Huệ", "Lan", "Trà"];
let result = workerList.push("Cúc");
console.log(workerList, result);

// 2. pop(): Xóa item ở cuối mảng => return ra item đã xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.pop();
console.log(workerList, result);

// 3.unshitf(): Nhét item vào đầu mảng => return ra độ dài mới
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.unshift("Cúc");
console.log(workerList, result);

// 4. shift(): Xóa item ở đầu mảng => return ra item đã xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.shift();
console.log(workerList, result);

//10 delete Array[index] : xóa p[hần tử ở vị trí index]
//              nhưng thằng này sẽ để lại 1 lỗ thủng empty
// dùng cho objetc

let arr2 = [1, 3, "a", 30];
delete arr2[2];
console.log(arr2); //[1, 3, empty, 30]

//11.splice(start, sl cần xóa, ....pt cần thêm)
splice(1, 0, 3, 2, 2);
//trả ra mảng các phần tử bị xóa hay mảng rỗng trong
//  trường hợp ko có ai bị xóa[quan trọng]
//thêm ko xóa
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 0, "Điệp", "Cường");
console.log(workerList, result);

//xóa ko thêm

workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1);
console.log(workerList, result); //["Huệ", "Trà"]; ["Lan"]

//xóa vừa thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1, "Điệp", "Cường");
console.log(workerList, result); //["Huệ", "Trà" ,"Điệp" , "Cường"]; ["Lan"]

//12.slide(start, end):

//13.concat():
workerGirl = ["Huệ", "Lan", "Tân"];
workerBoy = ["Điệp", "Cường", "Hùng"];
workerList = workerGirl.concat(workerBoy, "Hồng", ["Trúc", "Tâm"]); //9 phần tử
workerList = workerGirl.concat(workerBoy, "Hồng", [["Trúc", "Tâm"]]); //8 phần tử
console.log(workerList);
console.log(workerGirl); //ko đổi => tốt

//14.spread operator: ...destructuring  | cấu trúc phân rã
workerList = [...workerGirl, ...workerBoy];
// lấy vỏ lấy phần tử rồi nhét vô vỏ mới rồi nhét vô mảng mới rồi đóng vỏ lại

//15.forEach(cf) : lập mảng
//cf: (value , key , array)=>{}
arr1 = ["HUệ", "Cúc", "Hồng"];
arr1.forEach((item, key, array) => {
  //array tương đương với this  hay là cái mảng đó
  console.log(item, key, array);
});

//16. map(cf) callback function
//cf : (value , key ,array)
//map là gì ? : là duyệt và biến đổi các item theo 1 công thức

//hàm nhận vào mảng sẽ trả giá trị
//hàm nhận cf trả giá trị
arr1 = [2, 6, 9];

const arrDemo = arr1.map((item) => {
  if (item % 2 == 1) return item + 2;
});
console.log(arrDemo); //[undefine, undefine , 11] |  concat toString map

//17.filter(cf) nhận 1 . cf có xu hướng trả ra chứ ko biến dạng

//Filter là duyệt các item và lọc ra các item thỏa
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.filter((item) => {
  return item % 2;
});2
//cf: (val, key , array) => {}

arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.filter((item) => {
  return item % 2; // Toán tử % 2 (phần dư khi chia cho 2)
});
console.log(arr1); // [1, 3, 5]

//18.find(cf) tìm ra item đầu tiên thỏa
//cf: (val, key , array)
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.find((item) => {
  return item % 2;
});

console.log(arr1); //1 số 1 chứ kp mảng

//19.findIndex(cf) tìm ra vị trí của item đầu tiên thỏa
//cf: (val, key , array)
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.findIndex((item) => {
  return item % 2;
}); //0

// 20. indexOf(value): tìm ra vị trí của value
// cf: (val, key, array) => {}
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.indexOf(2);
console.log(arr1); //1

// 21. every: tương đương ALL trong DBI
//     Tất cả thỏa -> thì true
//     1 không thỏa -> thì false
// cf: (val, key, array) => {}
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.every((item) => item > 1);
console.log(arr1); //false

// 22. some: 
//     Tất cả ko thỏa -> thì true
//     1 cái thỏa -> thì false
// cf: (val, key, array) => {}
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.some((item) => item > 1);
console.log(arr1); //true

// 23. includes(val): Kiểm trả value có tồn tại trong mảng không
// cf: (val, key, array) => {}
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.includes(3);
console.log(arr1); 

// 24. reverse: Đảo ngược
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.reverse();
console.log(arr1); 

//25.sort(cf?) : sáp xếp
arr1 = ["Điệp", "An", "Bảo"];
arr1 = arr1.sort();
console.log(arr1); // [ "An", "Bảo","Điệp"];

arr1 = [1, 3, 12, 4, 5];
arr1 = arr1.sort((a, b) => {
  return a - b; //[1,3,5,12]
});

//25.reduce(cf, initialVal)
//cf: (total, currentVal, currentIndex, array)=>{}
//map là dùng để biến đổi các item theo công thức
//reduce dồn các item thành 1 value

arr1 = [1, 3, 20, 100];
let sum = arr1.reduce((total, currentItem) => {
  return total + currentItem;
}, 0);
console.log(sum); //124

console.log("Bài 12: Object - method ");
//Object-method
//Entry của object là key: value
//Key(index) thì luôn là string | Number
//Value : gì cũng được

//25.thêm , xóa . các thuộc tính của object

let worker1 = {
  lname: "Điệp đẹp trai",
  age: 24,
  showInfor() {
    console.log(this.lname + " " + this.age);
  },
};

worker1.showInfor(); // "Điệp đẹp trai 24"
worker1.point = 10;
worker1["point"] = 10;
worker1.lname = "Điệp PiedTeam";
delete worker1.age; //ko để lại lỗ

//25.Object.assign(): merge object , kết hợp
let person1 = {
  lname: "Điệp",
  age: 24,
  job: ["Yangho", "Coder"],
};

let person2 = {
  lname: "Lan",
  age: 24,
  company: "PiedTeam",
};
//tìm hiểu thêm
// person3 = Object.assign(person1, person2);
// console.log(person3);
// console.log(person1);
// console.log(person1 == person3);//true
// //shallow copy:

//spread là cấu trúc tách vỏ lấy khối

person3 = { ...person1, ...person2 };
console.log(person1);
console.log(person3);
console.log(person1 == person3);
//shallow
person3.job = [...person3.job]; //deep copy

//25.Object.keys()
console.log(Object.keys(person3));

//26.a Object.values()
console.log(Object.values(person3));
