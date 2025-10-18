
// DOM : DOCUMENT OBJECT MODEL 

//liên kết (DOM) | móc 1 biến vào 1 đối tượng trong dom
// nếu muốn DOM 1 đối tượng thì có 2 cách 

let inputNode = document.getElementById("name"); //truyền vào value id
inputNode = document.querySelector("#name"); //truyền vào selector css

// inputNode = document.querySelector(".card"); 
// khi dùng querySelector với class thì chỉ control được card đầu tiên thôi 

console.log(inputNode);
// nếu mà querySelector với class thì nó sẽ chỉ lấy ra thằng đầu tiên mà thôi

// nếu như muốn lấy 1 list các objetc thỏa thì sao?
let cardList = document.getElementsByClassName("card");
// return HTMLCollection , nó hao hao giống mảng nhưng nó ko hỗ trợ các hàm như list
// nó k có forEach 

//HTMLCollection: giống mảng , nhưng ko có các method thông dụng
// cách dùng được forEach là dùng cấu trúc phân rã ra lấy phần tử trong nó thôi

// cardList = [...document.getElementsByClassName(".card")];
// cardList.array.forEach(element => {
//     console.log(element);
    
// });
// nhưng ko ai làm vậy cả nha !!!!!!

cardList = document.querySelectorAll("card"); // return Nodelist 
console.log(cardList);

//  Nodelist: cực kì giống mảng , có thẻ chạy forEach bình thường
// có những method hỗ trợ như mảng
//===============================================================
let firstCard = document.querySelector(".card");
console.log(firstCard);

console.log("heheheh");
//childNodes : cung cấp và đếm các phần tử bên trong của Node return Nodelist
// h4 text h3 text , text là dấu xuống hàng 

console.log(firstCard.childNodes); //NodeList(5) [text, h2, text, p, text]

console.log(firstCard.children); //HTMLCollection(2) [h2, p]
// muốn biết có bao nhiêu phần tử thôi thì dùng children thôi vì nó trả thẳng con | HTML Collection

//classList : danh sách class của card đó đang sở hữu // mảng
//className : giống như trả ra //chuỗi
console.log(firstCard.classList);//DOMTokenList(3) ['card', 'p-2', 'mb-2']...
console.log(firstCard.className);//card p-2 mb-2
console.log('Parent Element nha !!!');
console.log(firstCard.parentElement.parentElement); ///sẽ được card bự bọc nó
console.log(firstCard.nextElementSibling); // tìm và trả về  thằng giống nó nhưng ở dưới truy cập vào thằng phần tử cùng cấp bên dưới
console.log(firstCard.firstChild); // return the first childrend của ChildNode // ko nên xài
console.log(firstCard.firstElementChild);

//=============================================
//Tạo 1 phần tử mới luôn

let newCard = document.createElement("div");
// newCard.classList.add("card", "p-2", "mb-3");
newCard.className = "card p-2 mb-2";
//thêm nội dung bên trong 
// cung cấp hết nội dung bên trong card đó 
// newCard.innerHTML
// là truy cập hết 1 thẻ div đó
// newCard.outerHTML
let lname = "Tôi được tạo bằng js";
newCard.innerHTML = `
    <h2>${lname}</h2>
    <p>Tôi là một node fake</p>
`;      //templete string


let cardGroup = document.querySelector(".card-group");
// cardGroup.appendChild(newCard); // nhét vào cuối

// thay thế thằng số 2
cardGroup.replaceChild(newCard, cardGroup.children[1]); 
// hạn chế DOM kiểu này vì nó là node fake
// nhược điểm lớn của node do mk tạo rất nhìu
// DOM này này DOM ảo nên khó để móc vô và điều khiển 
// ===============================================
//trên mỗi card nên sở hữu 1 id để mk lưu in4
firstCard.setAttribute("data-id", "1");
console.log(firstCard.getAttribute("data-id"));
firstCard.removeAttribute("data-id");

