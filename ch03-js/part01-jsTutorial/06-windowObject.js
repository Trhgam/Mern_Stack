console.log("Bài 14: Window Object ");
//windowObject(wo) là đại diện cho cửa sổ trình duyệt
// tất cả các object function biến mà tạo bằng var
// đều là prop và method của WindowObject

//ngay cả DOM(Document Object Model) cúng là thuộc tính của WO

//I-Prop và method
//1.1 window.innerHeight

console.log(window.innerHeight);
console.log(window.innerWidth);

//open(url , target , resize)

setTimeout(() => {
  window.open("http://www.jwt.io/", "_blank", "width = 500, height = 500");
}, 3000);
console.log(window.location);
console.log(window.navigator);
console.log(window.history);
//trong front end cung cấp 3 loại pop up
alert("Anh Điệp đẹp trai");
confirm("Anh Điệp phải không ?"); //xác nhận yes | no
prompt("Anh Điệp hả ? ");
