// rule validate(những tiêu chuẩn để công nhận 1 field đạt validate)
// email: isRequired, isEmail(@...)
// name: isRequired, isName (tiếng việt, tiếng anh, max 50)
// gender: isRequired
// country: isRequired
// password: isRequired
// confirmedPassword: isRequired, min 8, max 30, isSame(password)
//agreed: isRequired


const REG_EMAIL =
    /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
    /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;


// bộ hàm kiểm tra nhận vào value, oke thì return "", k oke thì return "chửi"
const isRequired = (value) => (value != "" ? "" : "That field is required");
const isEmail = (value) => REG_EMAIL.test(value) ? "" : "Email is not validate";
const isName = (value) => REG_NAME.test(value) ? "" : "Name is not validate";
const min = (num) => (value) => value.length >= num ? "" : `Min is ${num}`;
const max = (num) => (value) => value.length <= num ? "" : `Max is ${num}`;

const isSame = (paramValue , fieldName1, fieldName2) => (value) => 
    paramValue == value ? "" : `${fieldName1} không khớp với ${fieldName2}`;


// kỹ thuật mô tả node
/* từ node => paramObject {
    value: giá trị của controlNode cần kiểm tra,
    funcs: mảng các hàm mà value cần phải bị kiểm tra,
    parentNode: tìm đc cha của controlNode để nhét câu chữi,
    controlNodes: mảng các controlNode liên quan
}
*/
// mô tả nameNode
// paramObject = {
//   value: document.querySelector("#name").value,
//   funcs: [isRequired, isName],
//   parentNode: document.querySelector("#name").parentElement,
//   controlNodes: [document.querySelector("#name")],
// };

//làm hàm kiểm tra
const isValid = (paramObject) => {
    const {value , funcs , parntNode , controlNodes} = paramObject;
    //hàm chạy funcs để kiểm
    for (const funcCheck of funcs) {
        let msg = funcCheck(value);
        if(msg){
            createMsg(parntNode , controlNodes, msg); // hiển thị ra màn hình
            return msg;
        }
    }
    return "";
};

//tạo msg
const createMsg = ( parentNode, controlNodes , msg) =>{
    let divMsg = document.createElement("div");
    divMsg.className = "invalid-feedback";
    divMsg.innerHTML = msg;
    parentNode.appendChild(divMsg);

    controlNodes.forEach((itemInput) => {
        itemInput.classList.add("is-invalid");
    });
};

//xóa msg
const cleanMsg = () => {
    document.querySelectorAll(".invalid-feedback").forEach((item) => {
        item.remove();
    });
    document.querySelectorAll(".is-invalid").forEach((itemInput) => {
        itemInput.classList.remove(".is-invalid");
    });
};

//sự kiện chính 
document.querySelector("form").addEventListener("submit", (event) =>{
    event.preventDefault();
    cleanMsg();
    let emailNode = document.querySelector("#email");
    let nameNode = document.querySelector("#name");
    let genderNode = document.querySelector("#gender");
    let passwordNode = document.querySelector("password");
    let confirmedPasswordNode = document.querySelector("#confirmedPassword");
    //country
    let countryNode = document.querySelector("input[name='country']:checked"); //null
    //agree
    let agreeNode = document.querySelector("input#agree:checked"); //null

    //xử lý chính
const msgList = [
        //email
        isValid({
            value : emailNode.value,
            funcs: [isRequired, isEmail],
            parentNode: emailNode.parentElement,
            controlNodes : [emailNode],
        }),
        //name
        isValid({
            value : nameNode.value,
            funcs: [isRequired, isName],
            parentNode: nameNode.parentElement,
            controlNodes : [nameNode],
        }),
    //password
        isValid({
      // genner
            value: genderNode.value,
            funcs: [isRequired],
            parentNode: genderNode.parentElement,
            controlNodes: [genderNode],
        }),

        isValid({
            // pasword
            value: passwordNode.value,
            funcs: [isRequired],
            parentNode: passwordNode.parentElement,
            controlNodes: [passwordNode],
        }),

        isValid({
        // paswordcỏnimred
            value: confirmedPasswordNode.value,
            funcs: [
                isRequired,
                min(8),
                max(30),
                isSame(passwordNode.value, "Mật Khẩu", "Nhập lại mật khẩu"),
            ],
            parentNode: confirmedPasswordNode.parentElement,
            controlNodes: [confirmedPasswordNode],
        }),
        //country
        isValid({
            value: countryNode ? countryNode.value : "",
            funcs: [isRequired],
            parentNode: document.querySelector(".form-check-country").parentElement,
            controlNodes: document.querySelectorAll("input[name='country']"),
        }),
        //agree
        isValid({
            value: agreeNode ? agreeNode.value : "",
            funcs: [isRequired],
            parentNode: document.querySelector("input#agree").parentElement,
            controlNodes: [document.querySelector("input#agree")],
        }),
    ];

    let isValidForm = msgList.every((item) => item == "");
    if(isValidForm){
        cleanMsg();
        alert("form is validate");
    }
});