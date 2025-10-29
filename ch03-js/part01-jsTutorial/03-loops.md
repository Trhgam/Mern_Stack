# Bài 5: Vòng lặp -loop

Trước khi bắt đầu bài học này ta cần hiểu rõ các khác niệm sau 

- reuse  -> function

- repeat -> loop

Các vòng lặp  while | for | do while

---
Một property của Object sẽ bao gồm 2 phần :
key và value (key:value hay còn gọi là entry)

Ngoài ra sẽ gồm 1 bộ cờ Property Descriptors (value, wriable , enumerable , configurable)

| Khái niệm | Định nghĩa |
| :--- | :--- |
| **property** | Tên gọi chung cho mỗi cặp dữ liệu (name: "Điệp", point: 10, v.v.) |
| **entry** | Tương đương với property, là một cặp key : value hoàn chỉnh. |

---

```javascript
let student1 = { name: "Điệp", point: 10, major: "SE" };
//              property | entry
//              entry = key : value

//Array là một objec
let array1 = [12, 17, 19]; //{0:12, 1:17, 2:19}
console.log(student1.name); //Điệp
console.log(student1["name"]); //Điệp
console.log(array1[0]); //12
```

1 vòng for cơ bản thì duyệt từ start đến end nhưng các vòng for cải tiến thì luôn duyệt từ đầu đến hết vì nó duyệt iterable : tính khả duyệt

//Iterable : tính khả lập
//Iterator : người khả duyệt

Vòng lặp Duyệt (Ví dụ: for...of)

---





## 1. Vòng lặp for in

#### HẦU HẾT CÁC OBJECT ĐỀU KHÔNG CÓ TÍNH KHẢ DUYỆT

Vì thế vòng lặp __for in__ được thiết kế để duyệt các thuộc tính của Object.
Mục đích duy nhất: Lặp qua các Keys (tên thuộc tính) của một Object.

Vòng lặp for...in lặp lại các thuộc tính có thể liệt kê của một đối tượng.

Vòng lặp for...in chủ yếu được sử dụng để các đối tượng truy cập vào tên thuộc tính (khóa) của chúng.

Duyệt Thuộc tính Kế thừa: Theo mặc định, for...in cũng duyệt qua các thuộc tính có thể liệt kê (__enumerable__ = true ) được kế thừa từ chuỗi nguyên mẫu (prototype chain).

#### Cú Pháp
```javascript
for (key in object) {
  // code block to be executed
}
```
 - key

    Một biến giữ tên (khóa) của mỗi thuộc tính trong các lần lặp lại
 -  object

    object có các thuộc tính đang được lặp lại

---
```javascript
const person = {fname:"John", lname:"Doe", age:25};

let text = "";
for (let x in person) {
  text += person[x];
}

//text{"JohnDoe25"}$$
```

Lưu ý : 
cái này biết rồi tự hiểu đi nha
```javascript
student1 = { name: "Điệp", point: 10, major: "SE" };
for (const x in student1) {
  console.log(x); // in ra name point major
  console.log(student1[x]); //in ra Điệp 10 SE
  console.log(student1.x); // ko in ra Điệp 10 SE mà in ra undefined
}
```

mô tả code : 
### console.log(x); 

in ra name point major
Vòng lặp for...in được thiết kế để lặp qua các tên thuộc tính (keys) 
của một đối tượng. Trong mỗi lần lặp, biến x sẽ nhận giá trị là một chuỗi, 
chính là tên của thuộc tính đó.

Lần lặp 1: x là chuỗi "name".

Lần lặp 2: x là chuỗi "point".

Lần lặp 3: x là chuỗi "major".

### console.log(student1[x]); //in ra Điệp 10 SE
Ở đây, bạn sử dụng cú pháp ngoặc vuông [] để truy cập giá trị của thuộc tính.
Cú pháp này cho phép bạn dùng một biến để truy cập thuộc tính của đối tượng.

Lần lặp 1: x là "name". Dòng code trở thành console.log(student1["name"]), và kết quả là "Điệp".

Lần lặp 2: x là "point". Dòng code trở thành console.log(student1["point"]), và kết quả là 10.

Lần lặp 3: x là "major". Dòng code trở thành console.log(student1["major"]), và kết quả là "SE".

---
__Tuyệt đối không nên dùng for...in để duyệt Mảng,__

không nên dùng để lặp qua mảng, vì nó có thể lặp cả các thuộc tính không phải là chỉ số của mảng, hoặc theo một thứ tự không mong muốn.


```javascript
const colors = ["red", "green", "blue"];
// Thêm một thuộc tính không phải là chỉ số số vào mảng
colors.description = "Basic colors"; 

console.log("--- Vòng lặp for...in trên Mảng ---");
for (const key in colors) {
    // Key sẽ là chuỗi, không phải số.
    console.log(`Key: ${key}, Value: ${colors[key]}`);
}
```
```javascript
Key: 0, Value: red
Key: 1, Value: green
Key: 2, Value: blue
Key: description, Value: Basic colors ⬅️ Vấn đề!
```

1. Mảng (Array)

    Bản chất Key: Mảng sử dụng các chỉ mục số ($0, 1, 2, ...$) làm Key để truy cập các phần tử.

    Vòng lặp for...in: Khi bạn dùng for...in trên mảng, nó sẽ duyệt qua các Key (chỉ mục) của mảng, nhưng các Key này được xử lý như chuỗi ("0", "1", "2", v.v.).
    
    Vấn đề: Vì for...in duyệt mọi Key có thể liệt kê, nó còn duyệt cả những thuộc tính là chuỗi mà không phải chỉ mục số, gây ra sự không an toàn.

2. Object (Đối tượng thông thường)

    Bản chất Key: Object sử dụng các tên thuộc tính (thường là chuỗi) làm Key để truy cập các giá trị.

    Vòng lặp for...in: Đây là môi trường chính của nó. Nó được thiết kế để duyệt qua tên thuộc tính (Key) của Object một cách tự nhiên.

---

## 2 Vòng lặp for of

Cấu trúc :
```javascript
for (variable of iterable) {
  // code block to be executed
}
```

Tìm hiểu về set chút nhé :

    set là tập hợp loại bỏ trùng

```javascript
let demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);
//demoSet ["Điệp", "Huệ" , "Lan"]

//  khi mà mình nhét data vào set thì set sẽ loại bớt những thằng bị trùng
//  gây ra xáo trộn vị trí
// => mình ko thể get => vì ko có key nên ko dùng for bình thường VÀ for in được
```

```javascript
for (const x in demoSet) {
  console.log(x);
  //k có gì được in ra luôn demoSet k có key
}
```
Khi bạn tạo một Set (ví dụ: new Set(['a', 'b'])), các giá trị 'a' và 'b' không được lưu trữ dưới dạng các cặp Key : Value công khai (0: 'a', 1: 'b') như trong Mảng, 

---
##  for-of: duyệt value với các iterable

Vòng lặp này được dùng để lặp qua các giá trị (values)
của các đối tượng có thể lặp lại (iterable objects) như __mảng, chuỗi (strings), Map, Set.__

Khác với for truyền thống (duyệt chỉ mục) hay for...in (duyệt key), for...of trực tiếp trả về giá trị của phần tử trong mỗi lần lặp.

```javascript
let workerList = ["Điệp", "Huệ", "Lan", "Huệ"];
for (const x of workerList) {
  console.log(x);

  // chỉ dùng cho các mảng hoặc hay các thằng đc cài tính khả lập
  // object bthg ko có iterable
  // dùng để duyệt key nhưng chỉ duyệt thằng có iterable
  // các object thì thường ko có iterator => kp iterable nên ko dùng for-of đc
}
```

```javascript
for (const x of demoSet) {
  console.log(x);
  // demoSet bản chất là mảng , có iterable => duyệt được , vì chỉ duyệt value
}
```

Một Object thông thường (được tạo bằng cú pháp {}) không có tính Iterable (khả duyệt) và do đó cũng không có khả năng tạo ra một Iterator theo mặc định.

Nhưng nếu vẫn muốn duyệt object bằng for of thì vẫn có cách vì Javascript cung cấp cho obejct phương thức sau 
- Object.keys(obj)
- Object.values(obj)
- Object.entries(obj) 

---
## for-each 

for-each : không phải hàm như các ngôn ngữ khác mà ở trong javascript nó là method của iterable

forEach() không phải là một vòng lặp độc lập như for hay for...of, mà là một phương thức (method) được định nghĩa trên các đối tượng Iterable (chủ yếu là Mảng).

for-each là __1 callback__ : là hàm nhận hàm khác làm đối số
bản chất callback là __abstract class__

foreach sẽ sẽ đi qua từng thằng và xử lý theo logic hàm bạn mong muốn

__ko được bỏ value__ .chỉ xài value thì có thể bỏ key , chỉ xài key nhưng vẫn 
phải giữ value và key theo đúng thứ tự

và nó chỉ chơi với iterable thôi nhe

```javascript
["Hùng", "Tùng", "Toàn"].forEach((value, key) => {
  console.log(value + 1, key);
});
```
### Quy tắc về Đối số (Parameters) khi truyền vào for each
ví dụ
```javascript
const numbers = [10, 20, 30];
```
1. Chỉ sử dụng value (Giá trị)
```javascript
// Chỉ nhận đối số thứ 1 (value)
numbers.forEach((value) => {
    console.log(`Giá trị: ${value}`);
});
// Output:
// Giá trị: 10
// Giá trị: 20
// Giá trị: 30
```

---
2. Sử dụng value và index (Chỉ mục)

```javascript
// Nhận đối số thứ 1 (value) và thứ 2 (index)
numbers.forEach((value, index) => {
    console.log(`Chỉ mục ${index}: ${value}`);
});
// Output:
// Chỉ mục 0: 10
// Chỉ mục 1: 20
// Chỉ mục 2: 30
```

---
3. Sử dụng cả 3 đối số: value, index, và array

```javascript
// Nhận cả 3 đối số: value, index, và toàn bộ array
numbers.forEach((value, index, arr) => {
    // arr chính là [10, 20, 30]
    console.log(`Phần tử ${value} thuộc mảng có độ dài ${arr.length}`);
});
// Output:
// Phần tử 10 thuộc mảng có độ dài 3
// Phần tử 20 thuộc mảng có độ dài 3
// Phần tử 30 thuộc mảng có độ dài 3
```




__Hạn chế:__ forEach không thể dừng giữa chừng bằng lệnh break hoặc continue. Nó luôn duyệt hết toàn bộ Mảng.

---
| # | Tên Đối số | Ý nghĩa | Quy tắc Bắt buộc |
| :-: | :--- | :--- | :--- |
| 1 | **`value`** | **Giá trị** của phần tử mảng hiện tại đang được xử lý. | **Bắt buộc phải nhận**. Luôn ở vị trí đầu tiên. |
| 2 | **`index`** | **Chỉ mục** (vị trí) của phần tử hiện tại. | Tùy chọn. Chỉ dùng khi bạn cần chỉ mục. |
| 3 | **`array`** | **Toàn bộ mảng gốc** đang được lặp. | Tùy chọn. |

---

---
---

# Tóm tắt về filter foreach map


| Phương thức | Mục đích Chính | Giá trị Trả về của Hàm Callback | Kết quả Trả về của Phương thức |
| :--- | :--- | :--- | :--- |
| **`forEach()`** | Thực hiện một **tác vụ phụ** (side effect) trên mọi phần tử (ví dụ: in ra console, gọi API). | Không quan trọng (luôn bị bỏ qua). | **`undefined`** (Không tạo ra mảng mới). |
| **`map()`** | **Biến đổi** (Transform) từng phần tử từ giá trị cũ sang giá trị mới. | **Bắt buộc** phải trả về **giá trị mới** của phần tử. | Một **mảng mới** chứa các giá trị đã biến đổi. |
| **`filter()`** | **Lọc** (Select) các phần tử theo một điều kiện. | **Bắt buộc** phải trả về một **giá trị Boolean** (`true` để giữ, `false` để loại bỏ). | Một **mảng mới** chứa các phần tử đã qua bộ lọc. |

---

* **`forEach`**: Dùng để **làm gì đó** với từng phần tử.
* **`map`**: Dùng để **thay đổi** hình dạng của mảng (từ $N$ phần tử $\rightarrow$ $N$ phần tử mới).
* **`filter`**: Dùng để **giảm** số lượng phần tử trong mảng.