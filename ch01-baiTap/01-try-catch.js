/*  
    ================== BÀI 1: ERROR STRUCTOR ====================
    
    1. Mình sẽ có loại lỗi chính:
        - runtimeError: Lỗi phát sinh trong quá trình vận hành | do người dùng
        - syntaxError: lỗi do sai cú pháp | do người code
        - logicError: lỗi sai về mặt tư duy lỗi không bắt được khá sửa nhất 

    2. Trong tryCatch: dùng ddeeer xử lý dạng lỗi runtimeError
        trycatch chỉ hoạt động trong môi trường đồng bộ mà thôi 
    
    3. Cấu tạo của Error
        Tìm hiểu về cấu trúc của Error trông như thế nào ?
          Error khi tra ra màn hình có cấu trúc gồm 3 phần:
            1. name: Name sẽ hiện ra tên lỗi | kiểu lỗi (Loại lỗi là gì rất nguyn hiểm khi để người khác biết) => DẤU
            2. message: Chỉ trả ra 1 thông diệp mà bản thân mình sẽ tự cấu hình và quy ước đẻ tự hiểu lỗi của nó 
            3. stack: Stack sẽ làm hiện ra cấu trúc thư mục lỗi của mình (Lỗi ở dòng bao nhiêu) => DẤU

          Vì tính bảo mật và an toàn cho project bản thân dev phải chủ động trong việc che dấu cấu trúc error và tạo message cho error
          một trong những kỹ thuật phổ biến đó là dùng omit (lodash | TypeScript)
              - lodash -> Thư viện trong backend của js chứa all hàm giúp xử lý tất cả các tác vụ trong js
              - omit là một hàm trong TS -> Dùng để loại bỏ object và nhận đầu và là obj cần loại bỏ
              - Dựa trên obj cũ loại bỏ 1 prop -> Tạo ra 1 KDL(object) mới
                unikey <type, keys> -> Refactor (độ lại thư viện cũ để phù hợp với nhu cầu)
        
        Vì sao trên thực tế thì backend cần có bộ xử lý lỗi ?
        => Vì sau này số lượng file nhiều thì bên cạnh lỗi là gì thì mình biết lỗi ở đâu và hỗ trợ gom lỗi về một chỗ


    4. Kỹ thuật che dấu
      - stack là prop của error mà mình không muốn người dùng nhìn thấy 
      - Mình có thể tự điều hướng về catch thông qua lệnh throw
      1. Flow 1: Dùng obmit stack
          - Error : Error
          - name  : name
          - message: => message
          - stack : mất

      2. Flow 2: Dùng custom Error (Anh dùng ở backend)
          - Error : ErrorWithStatus (Status: Là HTTP Status response) extend Error
          - name  : name
          - message: => message
          - stack : mất

  
    5. Bộ lỗi có sẵn
        EvalError():     tạo 1 instance đại diện cho một lỗi xảy ra liên quan đến hàm toàn cục Eval()
        InternalError(): tạo 1 instance đại diện cho một lỗi xảy ra khi 1 lỗi bên trong jsEngine
                          được ném. vd: quá nhiều đệ quy
        RangeError()   : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến số hoặc tham chiếu
                          nằm ngoài phạm vi hợp lệ của nó
        ReferenceError : tạo 1 instance đại diện cho một lỗi xảy ra khi hủy tham chiếu của 1 tham chiếu
                          không hợp lệ
        SyntaxError    : tạo 1 instance đại diện cho một lỗi xảy ra trong khi phân tích cú pháp
                                                                                  mã trong Eval()
        TypeError      : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến hoặc 1 tham số
                          có kiểu không hợp lệ | Lỗi nằm ở TS
        URIError       : tạo 1 instance đại diện cho một lỗi xảy ra khi encodeURI() hoặc decodeURI()
                          truyền các tham số không hợp lệ | giải mã chuẩn dữ liệu sai
        
        Thay vì mình dùng đồ có sẵn thì mình tự tạo (bộ lỗi riêng) để dùng sẽ phù hợp hơn với nhu cầu của mình


    6. Việc tự tạo bộ lỗi riêng => CUSTOM ERROR

    
    ================== BÀI 2: REGEX ====================
    
    I - Regex là gì ?
      Regex | Regular Expression | Pattern | Biểu thức chính quy
      Mẫu định dạng các chuỗi - Giống like trong SQL
      Regex là String => Object
      JS thì dùng .test() | thay cho .matches() như java

    II - Regex metcharacter symbols: phần này nên test ở trang regexr.com
      bắt đầu chuỗi ^asda
      kết thúc chuỗi asda$
      trong chuỗi chỉ có ^asda$

      . : 1 ký tự bất kỳ (ngoại trừ enter)

      * lập lại từ 0 -> n
      + lập lại từ 1 -> n
      ? lập lại từ 0 -> 1
      {start, end}: từ start đến end lần

      [] hoặc \ để thoát chuỗi escape character

    III. Regex Character sets vả Quantifiers
      character set [...]
      except character set [^...]
      set digit [0-9]
      set alpha [A-Z] [a-z] [a-zA-Z]
      gom nhóm () và hoặc |


    IV. Short Hand

      muốn chữ và số \w      \W
      muốn số        \d      \D
      muốn space     \s      \S
      a(?=n) tìm a mà kế bên là n
      a(?!n) tìm a mà kế bên k là n

      Ký tự biên \b
      ký tự biên là gì, và nằm ở đâu trong câu
      ký tự biên nằm giữa cấu trúc
            ký tự từ + ký tự biên + không phải ký tự từ
            không phải ký tự từ + ký tự biên + không phải ký tự từ
            ký tự từ không bao gồm: ''
            ký tự từ có cả vách ngăn nữa nhé
      
      VD:

        \bword\b
          new word
          words in my letter
          sword in my hand
          the 'word' is shiet
        tìm từ word và chỉ từ word

          bootstrap form
          HOF: callback currying  closure
          method xử lý mảng

*/

// ===================================================================
// ====================== ĐỒNG BỘ | BẤT ĐỒNG BỘ ======================
// ===================================================================
// Đồng bộ
try {
  diepPiedTeam;
  console.log("hello");
} catch (error) {
  console.log(error);
}
console.log("xin chào");

// Bâts đồng bộ
try {
  setTimeout(() => {
    diepPiedTeam;
    // lỗi
  }, 1000);
  console.log("hello");
} catch (error) {
  console.log(error);
}

// Bất đồng bộ
setTimeout(() => {
  try {
    diepPiedTeam;
    // lỗi
    console.log("hello");
  } catch (error) {
    console.log(error);
  }
  console.log("Xin chào");
}, 1000);
//đồng bộ đan xen bất đồng bộ ko được
//nên bọc cái bất đồng bộ ra ngoài

// ================================================================
// ====================== CẤU TRÚC CỦA ERROR ======================
// ================================================================
// Tìm hiểu về cấu trúc của Error trông như thế nào ?
// Vì sao trên thực tế thì backend cần có bộ xử lý lỗi ?
try {
  diepPiedTeam;
  console.log("hello");
} catch (error) {
  console.log(error);
  console.log(error.name);
  // Không nên dùng vì in ra lỗi mình bị -> hacker sẽ lợi dụng
  console.log(error.message);
  // Chỉ nên dùng mesage thôi nhé nếu in ra tên lỗi -> ngta sẽ biết mình bị lỗi gì
  console.log(error.stack);
  // stack là biết cây thư mục trông như thế nào
}

// =============================================================================
// ====================== KỸ THUẬT CHE DẤU | CUSTOM ERROR ======================
// =============================================================================

// ===================== KỸ THUẬT OMIT  =====================
let money = 9999999999999999;
// 15 số

try {
  if (money > 999999999999999) {
    throw new RangeError("Biến chứa không nổi");
  }
  console.log(money);
} catch (error) {
  console.log(error);
}

// ================== KỸ THUẬT CUSTOMERROR ====================
class ErrorWithStatus extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }
}

try {
  toibihack;
} catch (error) {
  let response = new ErrorWithStatus({
    status: 400,
    message: "Đụ má mày",
  });
  console.log(response);
}

// ====================================================
// ================== BÀI 2: REGEX ====================
// ====================================================

let regex1 = /name/i;
// có i là không phân biệt hoa thường

console.log(regex1.test("Nghĩa is my name")); // true
// Thu được true -> Trong string này có chữ name (Có phân biệt hoa thường)
console.log(regex1.test("Nghĩa is my Name")); // flase
console.log(regex1.exec("Nghĩa is my Name")); // object
console.log("Nghĩa is my Name".match(regex1)); // true
console.log("Nghĩa is my Name".search(regex1)); // flase
