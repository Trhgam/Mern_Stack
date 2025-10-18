//  kế thừa nguyên mẫu 02-prototypal-inheritance.js
// prototypal - inheritance : kế thừa nguyên mẫu (kế thừa giữa 2 object)

//[[Prototype]] | __proto__ | protoType
//trong object luôn có 1 thuọc tính ẩn tên là [[Prototype]]
//có rất nhiều cách để sử dụng nó 
// một trong những cách phổ biến nhất là thông qua bộ setter getter
// (accessor propeerty) tên là __proto__

let longEar = {
    ear: "Long",
};

let rabbitPink = {
    jumps: true,
};

let congido = {
    eat : true,
    walk(){
        console.log("Đang đi bộ nè");
        
    },
};

congido.__proto__ = rabbitPink;  // cho congido nuốt con thỏ thì nó sẽ kế thừa 
congido.__proto__ .__proto__= longEar;

//Overiding sẽ sẽ tự có khi mình tự gấn đến 1 prop mà cha nó có 
// copngido > rabbitPink > longEar
console.log(congido);
console.log(rabbitPink.ear); //long
console.log(rabbitPink.eat); // ko được | quy tắc bất hiếu cha ko thể lấy từ con nha !!!
console.log(congido.ear); // cố gắng xuống 2 thằng nữa đê lấy được ear: long
congido.ear = "short"; // overide | tạo luôn ở tầng congido 1 ear mới
console.log(congido);
congido.__proto__ .__proto__.ear = "short"; // ko cho overide | đến tận thăng cha nó để sửa vì nó kế thừa 2 lần 

// 





