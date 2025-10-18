let btnAdd = document.querySelector('#btn-add');

btnAdd.addEventListener("click",(event)=>{
    // //return ra element vừa phát sinh sự kiện 
    // thực hiện hóa ước mơ
    let inputNode = document.querySelector("#name");
    //tạo thẻ
    let newItem = document.createElement("li");
    newItem.className = "card mb-3 p-2";
    //đổ nội dung vào thẻ
    newItem.innerHTML = `<p>${inputNode.value}</p>`;
    //bỏ thẻ vô ul
    let listNode = document.querySelector("#list");
    listNode.appendChild(newItem);
    inputNode.value = ""; //để làm sach value | gặp null thì ko làm 


    //nó chưa được lưu trữ


})
// đợi 1 sự kiện diễn ra đó là sự kiện click
// event là 1 object mô tả sự kiện đó 
// khi bấm click nó sẽ phát sinh ra 1 sự kiện click
// click lưu trữ các in4 của sự kiện đó xảy ra , và nó 1 ebject luôn 
// event clientX clientY trục tọa độ viewpoint
// offsetX offSetY tọa độ tính từu phần tử phát ra sự kiện  00 theo element

// target là nơi phát sinh sự kiện | dùng để điều kiển các DOM fake

// click , mouseover , mouseoout ~ hover html
// dblclick


//keyboardEvent
//keydown  nhận all| keypress(không nhận alt , esc , shift , strl)
//keyup ko bị trì (không nhận alt , esc , shift , strl)

//input : nhập là có , nhận all
//change thoát khỏi khung nó mới nhận event


// let inputNode = document.querySelector("#name");

// inputNode.addEventListener("change", (event)=>{
//     console.log(inputNode.value);
    
// })

//trì 1 nhịp


//========================================
//  cookie và localStorage
//  cho phép lưu trữ thông tin người dùng wed vào máy tính 
//  ko cho ng dùng lưu trữ , server sẽ thuê 1 bên thứ 3 lưu trữu cho nó 
const data = new Date(2025, 11,28).toString();
document.cookie = `username:diep, expires=${data}; path=/;`;
console.log(document.cookie); // chỉ coi được ở liverserver

// khi ngta thao tác với cookie thì người ta dùng thư viện js.cookie

//localStorage : lưu trữ ở local và có hiệu lực vĩnh viễn
localStorage.setItem("name", "Điệp 10");

//localStorage hay cookie chỉ lưu chuỗi ko chơi được với object | hạoqwc json String
const profile = {
    name : "Điệp đẹp trai",
    age : 24,
}
console.log(profile.toString); // ko được nha má

// biến object thành chuỗi JSON
let str = JSON.stringify(profile);
console.log(str);
//cấu trúc json nháy đôi
localStorage.setItem("profile", str); // lưu trên LoaclStorage

// lấy về 
let data1 = localStorage.getItem("profile");
data1 = JSON.parse(data1);// chuyển nó về thành object để xìa

console.log(data1);

