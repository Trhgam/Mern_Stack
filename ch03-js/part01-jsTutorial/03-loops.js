console.log("Bài 5: Vòng lặp -loop");

// reuse: dùng lại  - repeat: lặp lại
// reuse  -> function
// repeat -> loop
// while | for | do while

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

//Iterable : tính khả lập
//Iterator : người khả duyệt

// các vòng for cải tiến thì luôn duyệt từ đầu đến hết
// vì nó duyệt iterable : tính khả duyệt

// HẦU HẾT CÁC OBJECT ĐỀU KO CÓ TÍNH KHẢ DUYỆT
//===================================================================
// for-in : duyệt key trong object
/*
Vòng lặp này được thiết kế để lặp qua các thuộc tính (properties) của một đối tượng (object).
Nó sẽ trả về tên của các thuộc tính dưới dạng chuỗi.

Mục đích chính: Lặp qua các thuộc tính có thể liệt kê được của một đối tượng.
 */
student1 = { name: "Điệp", point: 10, major: "SE" };
for (const x in student1) {
  console.log(x); // in ra name point major
  // console.log(student1[x]); //in ra Điệp 10 SE
  // console.log(student1.x); // ko in ra Điệp 10 SE mà in ra defined
}

/*   console.log(x); // in ra name point major
Vòng lặp for...in được thiết kế để lặp qua các tên thuộc tính (keys) 
của một đối tượng. Trong mỗi lần lặp, biến x sẽ nhận giá trị là một chuỗi, 
chính là tên của thuộc tính đó.

Lần lặp 1: x là chuỗi "name".

Lần lặp 2: x là chuỗi "point".

Lần lặp 3: x là chuỗi "major".
*/

/*     // console.log(student1[x]); //in ra Điệp 10 SE
Ở đây, bạn sử dụng cú pháp ngoặc vuông [] để truy cập giá trị của thuộc tính.
Cú pháp này cho phép bạn dùng một biến để truy cập thuộc tính của đối tượng.

Lần lặp 1: x là "name". Dòng code trở thành console.log(student1["name"]), và kết quả là "Điệp".

Lần lặp 2: x là "point". Dòng code trở thành console.log(student1["point"]), và kết quả là 10.

Lần lặp 3: x là "major". Dòng code trở thành console.log(student1["major"]), và kết quả là "SE".
*/

/*không nên dùng để lặp qua mảng, vì nó có thể lặp cả các thuộc tính
  không phải là chỉ số của mảng, hoặc theo một thứ tự không mong muốn.
*/

//=============================================================
// set là tập hợp loại bỏ trùng
let demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);
//demoSet ["Điệp", "Huệ" , "Lan"]
//khi mà mình nhét data vào set thì set sẽ loại bớt những thằng bị trùng
//gây ra xáo trộn vị trí
// => mình ko thể get => vì ko có key

for (const x in demoSet) {
  console.log(x);
  //k có gì được in ra luôn demoSet k có key
}

//====================================================================
// for-of: duyệt value với các iterable
/*Vòng lặp này được  được dùng để lặp qua các giá trị (values)
của các đối tượng có thể lặp lại (iterable objects) như mảng, chuỗi (strings), Map, Set.
 */
let workerList = ["Điệp", "Huệ", "Lan", "Huệ"];
for (const x of workerList) {
  console.log(x);

  // chỉ dùng cho các mảng hoặc hay các thằng đc cài tính khả lập
  // object bthg ko có iterable
  // dùng để duyệt key nhưng chỉ duyệt thằng có iterable
  // các object thì thường ko có iterator => kp iterable nên ko dùng for-of đc
}
for (const x of demoSet) {
  console.log(x);
  // demoSet bản chất là mảng , có iterable => duyệt được , vì chỉ duyệt value
}
//=====================================================================================

//for-each : không phải hàm như các ngôn ngữ khác mà là method của iterable
//for-each là 1 callback : là hàm nhận hàm khác làm đối số
// bản chất callback là abstract class
//forech sẽ sẽ đi qua từng thằng và xử lý theo logic hàm bạn mong muốn
// ko được bỏ value .chỉ xài value thì có thể bỏ key , chỉ xài key nhưng vẫn phải giữ value và key theo đúng thứ tự
//mnos chỉ chơi với iterable thooi nhe
["Hùng", "Tùng", "Toàn"].forEach((value, key) => {
  console.log(value + 1, key);
});
