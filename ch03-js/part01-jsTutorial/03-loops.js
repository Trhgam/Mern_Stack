console.log("Bài 5: Vòng lặp -loop");
// reuse: dùng lại  - repeat: lặp lại
// reuse  -> function
// repeat -> loop
//while | for | do while

//
let student1 = { name: "Điệp", point: 10, major: "SE" };
//              property | entry
//              entry = key : value

//Array là một objec
let array1 = [12, 17, 19]; //{0:12, 1:17, 2:19}
console.log(student1.name); //Điệp
console.log(student1["name"]); //Điệp
console.log(array1[0]); //12

//vòng for cơ bản thì duyệt từ start đến end

//Iterable : tính kahr lập
//Iterator : người kahr duyệt

// các vòng for cải tiến thì luôn duyệt từ đầu đến hết
// vì nó duyệt iterable : tính khả duyệt
// hầu hết các object đều ko có tính khả duyệt

// for-in : duyệt key trong object
student1 = { name: "Điệp", point: 10, major: "SE" };
for (const x in student1) {
  console.log(x); // in ra name point major
  // console.log(student1[x]); //in ra Điệp 10 SE
  // console.log(student1.x); // ko in ra Điệp 10 SE mà in ra defined
}

//set là tập hợp loại trùng
let demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);
//demoSet ["Điệp", "Huệ" , "Huệ"]
//khi mà mình nhét data vào set thì set sẽ loại bớt những thằng bị trùng
//gây ra xáo trộn vị trí
// => mình ko thể get => vì ko có key
for (const x in demoSet) {
  console.log(x);
  //k có gì được in ra luôn demoSet k có key
}

// for-of: duyệt value với các iterable
let workerList = ["Điệp", "Huệ", "Lan", "Huệ"];
for (const x of workerList) {
  console.log(x);
  // chỉ dùng cho các mảng hoặc hay các thằng đc cài tính khả lập
  // object bthg ko có iterable
  // dùng để duyệt key nhưng chỉ duyệt thằng có iterable
  //các object thì thường ko có iterator => kp iterable nên ko dùng for-of đc
}
for (const x of demoSet) {
  console.log(x);
  // demoSet bản chất là mảng , có iterable => duyệt được , vì chỉ duyệt value
}

//for-each : không phải hàm như các ngôn ngữ khác mà là method của iterable
//for-each là 1 callback : là hàm nhận hàm khác làm đối số
// banr chaats callback là abstract class
//forech sẽ sẽ đi qua từng thằng và xử lý theo logic hàm bạn mong muốn
// ko được bỏ value .chỉ xài value thì có thể bỏ key , chỉ xài key nhưng vẫn phải giữ value và key theo đúng thứ tự
//mnos chỉ chơi với iterable thooi nhe
["Hùng", "Tùng", "Toàn"].forEach((value, key) => {
  console.log(value + 1, key);
});
