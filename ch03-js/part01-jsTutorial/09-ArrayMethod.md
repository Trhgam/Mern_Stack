# 11-ArrayMeyhod-objectMethod

Mảng ở js vô cùng đặc  biệt vì  nó không nhất thiết cùng kiểu nó mới có thể lưu vô cùng mảng

```javascript
let arr1 = [1, 2, "a", { lname: "Huệ", age: 10 }, [3, 5]];
```
Không nhưng thế trong 1 mảng đó có thể có nhiều mảng khác

```javascript
// truy cập vvoo phần tử thứ 4 lấy element đầu tiên
console.log(arr1[4][0]); //3
```
---
# Các phương thức , property
## I. JavaScript Array Methods

### 1.length is property

property returns the length (size) of an array:

```javascript
const fruits = ["Banana", "Orange", "Apple", "Mango"];

let size = fruits.length; //4
```
Thuộc tính này lengthcũng có thể được sử dụng để thiết lập độ dài của một mảng:

```javascript
const fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.length = 2; 
console.log(fruits); //["Banana", "Orange"])
```
---
ES2022 đưa ra phương pháp mảng at():
```javascript
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let fruit = fruits.at(2);
```
Phương pháp này tương đương vưới việc bạn bàng [ ]

---
### 2.instanceof Array : kiểm tra 1 object có phải là bản thể của array không ?

```javascript
let arr1 = [1, 2, "a", { lname: "Huệ", age: 10 }, [3, 5]];
console.log(arr1 instanceof Array); //true
console.log(arr1 instanceof Object); //true
console.log(null instanceof Array); //false
console.log(typeof Array); //object
```
### 3. toString() : biến mảng thành chuỗi kèm dấu ,
```javascript
console.log(arr1.toString());
//1, 2, a , {object object}, [3,5]]
```
---
### 4.split | join
---
#### 4.1 split() Từ Chuỗi sang Mảng
```javascript
let chuoiMonAn = "Phở,Bún,Bánh Mì"; 
let mangMonAn = chuoiMonAn.split(","); 
console.log(mangMonAn); // Output: ["Phở", "Bún", "Bánh Mì"]
```
```javascript
let chuoiTu = "Lập trình viên"; 
let mangKyTu = chuoiTu.split(""); 
console.log(mangKyTu); // Output: ["L", "ậ", "p", " ", "t", "r", "ì", "n", "h", " ", "v", "i", "ê", "n"]
```
---

#### 4.2 join() Từ Mảng sang Chuỗi
```javascript
let mangMonAn = ["Phở", "Bún", "Bánh Mì"]; 
let chuoiMonAn = mangMonAn.join("-"); 
console.log(chuoiMonAn); // Output: "Phở-Bún-Bánh Mì"
```
---

## II. Các Method Trả về Mảng Mới (Immutable)
chèn mảng // array là mutable : hầu hết các thao tác với mảng đều sẽ làm thay đổi object mảng

***method nào mà nhận vào callback_function => luôn trả ra mảng mới***

ví dụ : filter | map

"Mutable" (có thể thay đổi) có nghĩa là bạn có thể thay đổi nội dung (giá trị, số lượng phần tử, thứ tự) của một mảng ngay tại chỗ mà không cần tạo ra một mảng mới.Đó là dùng các method sau đây:

###  1. push(): Nhét item vào cuối mảng => return ra độ dài mới

```javascript
let workerList = ["Huệ", "Lan", "Trà"];
let result = workerList.push("Cúc");
console.log(workerList, result);  //[ 'Huệ', 'Lan', 'Trà', 'Cúc' ] 4
```
---

### 2. pop(): Xóa item ở cuối mảng => return ra item đã xóa
```javascript
let workerList = ["Huệ", "Lan", "Trà"];
result = workerList.pop();
console.log(workerList, result); //[ 'Huệ', 'Lan' ] Trà
```
---
### 3.unshitf(): Nhét item vào đầu mảng => return ra độ dài mới
```javascript
let workerList = ["Huệ", "Lan", "Trà"];
result = workerList.unshift("Cúc");
console.log(workerList, result); //[ 'Cúc', 'Huệ', 'Lan', 'Trà' ] 4
```
---
###  4. shift(): Xóa item ở đầu mảng => return ra item đã xóa
```javascript
let workerList = ["Huệ", "Lan", "Trà"];
result = workerList.shift();
console.log(workerList, result); //[ 'Huệ', 'Lan', 'Trà' ] Cúc

```
---

### 5. delete Array[index] : xóa p[hần tử ở vị trí index]
   nhưng thằng này sẽ để lại 1 lỗ thủng empty nên chỉ dùng cho object
   
```javascript
let danhSach = ["A", "B", "C", "D"];
delete danhSach[2]; // Xóa "C"

console.log(danhSach); // [ 'A', 'B', <empty>, 'D' ]
console.log(danhSach.length); // 4 (Độ dài giữ nguyên)
```

```javascript
let arr2 = [1, 3, "a", 30];
delete arr2[2];
console.log(arr2); //[1, 3, empty, 30]
```
---
### 6..splice(start, sl cần xóa, ....pt cần thêm)
```javascript
splice(1, 0, 3, 2, 2);
```
    Nó trả ra mảng các phần tử bị xóa hay mảng rỗng trong

```javascript
//thêm ko xóa
let workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 0, "Điệp", "Cường");
//trường hợp ko có ai bị xóa[quan trọng]
console.log(workerList, result);

//xóa ko thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1);
console.log(workerList, result); //["Huệ", "Trà"]; ["Lan"]

//xóa vừa thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1, "Điệp", "Cường");
console.log(workerList, result); //["Huệ", "Trà" ,"Điệp" , "Cường"]; ["Lan"]
```

---
### 7.slide(start, end):
Phương pháp này slice()cắt một phần của mảng thành một mảng mới

Phương pháp này slice()tạo ra một mảng mới.

Phương pháp này slice()không xóa bất kỳ phần tử nào khỏi mảng nguồn.
```javascript
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits.slice(1); //Orange,Lemon,Apple,Mango
```

Phương pháp này slice()có thể sử dụng hai đối số như slice(1, 3).
```javascript
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus = fruits.slice(1, 3);//[ "Orange", "Lemon", "Apple"]
```

---

### 8.concat():
Phương pháp này concat()tạo ra một mảng mới bằng cách hợp nhất (nối) các mảng hiện có:
```javascript
let workerGirl = ["Huệ", "Lan", "Tân"];
let workerBoy = ["Điệp", "Cường", "Hùng"];
workerList = workerGirl.concat(workerBoy, "Hồng", ["Trúc", "Tâm"]); //9 phần tử

workerList = workerGirl.concat(workerBoy, "Hồng", [["Trúc", "Tâm"]]); //8 phần tử
console.log(workerList);
console.log(workerGirl); //["Huệ", "Lan", "Tân"]; ko đổi => tốt
```

Phương pháp này concat()cũng có thể lấy chuỗi làm đối số:

```javascript
const arr1 = ["Emil", "Tobias", "Linus"];
const myChildren = arr1.concat("Peter"); 
```
---
### 9..spread operator: ...destructuring  | cấu trúc phân rã
```javascript
let workerGirl = ["Huệ", "Lan", "Tân"];
let workerBoy = ["Điệp", "Cường", "Hùng"];

let workerList = [...workerGirl, ...workerBoy];
// lấy vỏ lấy phần tử rồi nhét vô vỏ mới rồi nhét vô mảng mới rồi đóng vỏ lại
```

```javascript
let goc = [1, 2, 3];
let saoChep = [...goc, 4]; // Tạo mảng mới [1, 2, 3, 4]

// Mảng gốc 'goc' vẫn là [1, 2, 3] (Immutable)
```
Phương thức concat() là phương thức của Mảng (Array) và Chuỗi (String).

và khi 
```javascript
let user1 = { ten: "An" };
let user2 = { tuoi: 30 };
// user1.concat(user2) // ❌ LỖI: Không dùng được cho Object
```
nhưng có thể dùng spread operator: để gộp nó vô 1 mảng 
```javascript
let userMoi = { ...user1, ...user2 }; 
console.log(userMoi); // Output: { ten: 'An', tuoi: 30 }
```

nếu cả user1 và user2 đều có thuộc tính trùng lặp là tuoi, thì Spread Operator (...) sẽ lấy giá trị tuoi của đối tượng đi sau cùng (tức là user2) để gộp vào userMoi.

__JavaScript xử lý các đối tượng từ trái sang phải.__

---

### 10.forEach(cf) : lập mảng
là 1 cb function nhận vô 3 gái trị sau 

forEach() trong JavaScript được dùng để lặp (duyệt) qua tất cả các phần tử của một mảng (Array) và thực thi một hàm (callback function) cho từng phần tử đó.

cf: (value , key , array)=>{}

```javascript
arr1 = ["HUệ", "Cúc", "Hồng"];
arr1.forEach((item, key, array) => {
  //array tương đương với this  hay là cái mảng đó
  console.log(item, key, array);
});
```
Phương thức forEach() gọi một hàm (function) cho mỗi phần tử trong một mảng.

Phương thức forEach() không được thực thi đối với các phần tử rỗng (empty elements).

---
### 11. map(cf) callback function
là một phương thức của Array dùng để tạo ra một Mảng Mới bằng cách áp dụng một hàm xử lý (callback function) cho từng phần tử trong mảng gốc.

cf : (value , key ,array)
//map là gì ? : là duyệt và biến đổi các item theo 1 công thức

    hàm nhận vào mảng  sẽ trả giá trị
    hàm nhận cf trả giá trị
```javascript
arr1 = [2, 6, 9];

const arrDemo = arr1.map((item) => {
  if (item % 2 == 1) return item + 2;
});
console.log(arrDemo); //[undefine, undefine , 11] |  concat toString map
```
__map(): Mục đích là biến đổi và trả về một Mảng Mới với cùng độ dài.__


```javascript
let giaGoc = [100, 200, 350];

// Áp dụng hàm callback để tính 90% giá trị gốc
let giaSauGiam = giaGoc.map(gia => {
    return gia * 0.9;
});

console.log(giaSauGiam); // Output: [90, 180, 315] (Mảng MỚI)
console.log(giaGoc);     // Output: [100, 200, 350] (Mảng gốc vẫn giữ nguyên)
```
---

### 12.filter(cf) nhận 1 . cf có xu hướng trả ra chứ ko biến dạng

filter() là phương thức của Array dùng để tạo ra một Mảng Mới chỉ bao gồm các phần tử của mảng gốc thỏa mãn một điều kiện kiểm tra được xác định bởi hàm callback.

    nhận vào call back
    trả ra mảng mới thỏa điểu kiện callabck

```javascript
//cf: (val, key , array) => {}

arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.filter((item) => {
  return item % 2; // Toán tử % 2 (phần dư khi chia cho 2)
});
console.log(arr1); // [1, 3, 5]
```
---

__Tóm tắt :__ 

    map(): Dùng để biến đổi các phần tử mảng và trả về một MẢNG MỚI có cùng độ dài.

    filter(): Dùng để lọc các phần tử mảng theo điều kiện và trả về một MẢNG MỚI (chứa tập hợp con).

    forEach(): Dùng để duyệt qua các phần tử và thực hiện hành động phụ (side effect) như in ra console hoặc cập nhật dữ liệu; KHÔNG trả về giá trị (trả về undefined).

---
### 13 .find(cf) tìm ra item đầu tiên thỏa
Là cf: (val, key , array)
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.find((item) => {
  return item % 2;
});

console.log(arr1); //1 số 1 chứ kp mảng
```
find() nhận vào một hàm callback (cf) và thực thi hàm này cho từng phần tử trong mảng.

---
Mục đích:

    Tìm kiếm phần tử đầu tiên thỏa mãn điều kiện kiểm tra trong hàm callback.

Giá trị Trả về:

    Nếu tìm thấy, nó trả về CHÍNH PHẦN TỬ đó.

    Nếu không tìm thấy phần tử nào thỏa mãn, nó trả về undefined.

---

### 14..findIndex(cf) tìm ra __vị trí__ của item đầu tiên thỏa
//cf: (val, key , array)
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.findIndex((item) => {
  return item % 2;
}); //0
```

---
Mục đích:

    Tìm kiếm vị trí của phần tử đầu tiên thỏa mãn điều kiện kiểm tra trong hàm callback.

Giá trị Trả về:

    Nếu tìm thấy, nó trả về CHÍNH VỊ TRÍ CỦA PHẦN TỬ đó.

    Nếu không tìm thấy phần tử nào thỏa mãn, nó trả về undefined.

---

### 15.indexOf(value): tìm ra vị trí của value

// cf: (val, key, array) => {}
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.indexOf(2);
console.log(arr1); //1
```
Mục đích:

    Tìm kiếm vị trí của giá trị muốn tìm đầu tiên thỏa mãn điều kiện kiểm tra trong hàm callback.

Giá trị Trả về:

    Nếu tìm thấy, nó trả về CHÍNH VỊ TRÍ CỦA PHẦN TỬ đó.

    Nếu không tìm thấy phần tử nào thỏa mãn, nó trả về undefined.
----

### 16.every: tương đương ALL trong DBI
    Tất cả thỏa -> thì true
    1 không thỏa -> thì false
// cf: (val, key, array) => {}
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.every((item) => item > 1);
console.log(arr1); //false

```
Mục đích:

    Dò xem mảng đó có thỏa điệu kiện nào đó không
Giá trị Trả về:

    Nếu thỏa trả về true.

    Nếu không thỏa trả về false.

---

### 17. some: 
    Tất cả ko thỏa -> thì true
     1 cái thỏa -> thì false
// cf: (val, key, array) => {}
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.some((item) => item > 1);
console.log(arr1); //true
```
Mục đích:

    Dò xem mảng đó có phần tử nào thỏa điều kiện nào đó không   
Giá trị Trả về:

    Nếu thỏa trả về true.

    Nếu không thỏa trả về false.
    
---
### 18 includes(val): Kiểm trả value có tồn tại trong mảng không
// cf: (val, key, array) => {}
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.includes(3);
console.log(arr1); 
```

---
### 19.reverse: Đảo ngược
```javascript
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.reverse();
console.log(arr1); 

```
---
### 20.sort(cf?) : sắp xếp

```javascript
//nếu hông truyền vô cb để nó xử lý thì nó sắp xếp theo abc
arr1 = ["Điệp", "An", "Bảo"];
arr1 = arr1.sort();
console.log(arr1); // [ "An", "Bảo","Điệp"];



arr1 = [1, 3, 12, 4, 5];
arr1 = arr1.sort((a, b) => {
  return a - b; //[1,3,5,12]
});

```

### 21.reduce(cf, initialVal)
//cf: (total, currentVal, currentIndex, array)=>{}

    Nếu map là dùng để biến đổi các item theo công thức,
    filter dùng để lọc các item
    thì reduce dồn các item thành 1 value , hay objetc mới.

```javascript
arr1 = [1, 3, 20, 100];
let sum = arr1.reduce((total, currentItem) => {
  return total + currentItem;
}, 0);
console.log(sum); //124
```

---
# Bài 12: Object - method

    Object-method
    Entry của object là key: value
    Key(index) thì luôn là string | Number
    Value : gì cũng được

## 1.thêm , xóa . các thuộc tính của object
```javascript
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

```

---
## 2.Object.assign(): merge object , kết hợp
```javascript
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

person3 = Object.assign(person1, person2);
console.log(person3);
console.log(person1);
console.log(person1 == person3);//true
```
---
Shallow copy là gì ? Copy nông , ko làm việc trên bộ nhứo của object bị copy

Shadow Copy là việc tạo ra một bản sao mới của đối tượng gốc

Nếu thuộc tính là kiểu nguyên thủy (Primitive values): Giá trị sẽ 
được sao chép hoàn toàn độc lập (ví dụ: số, chuỗi, boolean).

----
__Hậu quả__ : 2 chàng trỏ 1 nàng , nếu nó thay đổi thì cả 2 đều thay đổi vì đang trỏ chung 1 địa chỉ.

---
Spread Operator là một công cụ để thực hiện Shallow Copy.
---

Khi bạn dùng Spread Operator để sao chép:

Thuộc tính cấp 1 (Primitive): Các giá trị nguyên thủy (số, chuỗi, boolean) được sao chép theo giá trị, hoàn toàn độc lập với bản gốc.

Thuộc tính lồng nhau (Reference): Các đối tượng/mảng lồng nhau được sao chép theo tham chiếu.
```javascript
let goc = { 
    name: "An", 
    data: { id: 10 } // Đối tượng lồng nhau
};

// Spread Operator tạo Shallow Copy
let banSao = { ...goc }; 

// Kiểm tra tham chiếu của đối tượng lồng nhau:
console.log(goc.data === banSao.data); // Output: true (Trỏ chung một địa chỉ)

// Thay đổi trong bản sao làm ảnh hưởng bản gốc:
banSao.data.id = 20; 

console.log(goc.data.id); // Output: 20 (Gốc bị thay đổi!)
```


```javascript
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

let person3 = { ...person1, ...person2 };
console.log(person1);
console.log(person3);
console.log(person1 == person3);
//shallow

person3.job = [...person3.job]; //deep copy for  1 property
```

cách copy một đối tượng mà không gây ra tình trạng "2 chàng trỏ 1 nàng" (tức là không sao chép tham chiếu đối với các đối tượng lồng nhau) được gọi là Deep Copy (Sao chép Sâu).


---

### 3.Object.keys()
```javascript
let person3 = { 
    lname: "Lan", 
    age: 24, 
    job: ["Yangho", "Coder"], 
    company: "PiedTeam" 
};

console.log(Object.keys(person3)); 
// Output: [ 'lname', 'age', 'job', 'company' ]
```
---

### 4.Object.values()

```javascript
let person3 = { 
    lname: "Lan", 
    age: 24, 
    job: ["Yangho", "Coder"], 
    company: "PiedTeam" 
};

console.log(Object.values(person3)); 
// Output: [ 'Lan', 24, [ 'Yangho', 'Coder' ], 'PiedTeam' ]
```
