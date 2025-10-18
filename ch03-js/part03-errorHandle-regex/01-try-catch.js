// runtimeErroe: lỗi phát sinh trong quá trình vận hành | do người dùng
// syntaxError: lỗi do sai cú pháp | do người code
// logicError: lỗi sai về mặt tư duy lỗi không bắt được khó sửa nhất

// tryCatch : dùng dể xử lý dạng lỗi runtimeError
//***tryCatch chỉ hoạt động trong môi trường đồng bộ mà thôi */

// đồng bộ
// try {
//   diepPiedTeam;
//   console.log("hello");
// } catch (error) {
//   console.log(error);
// }
// console.log("xin chào");

//bất đồng bộ
// try {
//   setTimeout(() => {
//     diepPiedTeam; // lỗi
//   }, 1000);
//   console.log("hello");
// } catch (error) {
//   console.log(error);
// }

// Bất đồng bộ
// setTimeout(() => {
//   try {
//     diepPiedTeam; // lỗi
//     console.log("hello");
//   } catch (error) {
//     console.log(error);
//   }
//   console.log("Xin chao");
// }, 1000);
//đồng bộ đan xen bất đồng bộ ko được
//nên bọc cái bất đồng bộ ra ngoài


//Cấu trúc 1 ERROR trông như thế nào
//vì trên thực tế BE cần có bộ xử lý lỗi 

try {
  diepPiedTeam;
  console.log("hello");
} catch (error) {
  console.log(error);
  console.log(error.name);
  console.log(error.message);
  console.log(error.satck); // không nên để lọo ra bên ngoài 



  
  
}
console.log("xin chào");
//omit (lodash | TS )
//lodash là thư viện trong BE trong JS chưa tất cả gì mà mk cần trong js hay TS 
// nó có hàm omit phaỈ CÀI  MỚI XÀI ĐƯỢC
//senior ==> bị hỏi Utility Types

  //flow:
  //stack là prop mà mình không muốn người dùng nhìn thấy
  //1.flow1 : omit stack
  //ERROR :     error
  //name        name
  //message     => mesage
  //stach

//flow2: custom Error (anh dùng ở backend)
  //ERROR :    ErrorWithStatus extends Error
  //name      
  //message     
  //stack

  //phải học bỗ mã lỗi để xử lý lỗi 
  //mình có thể tự đièu hướng lệnh về catch thông qua lệnh throw
  let money = 999999999999999; //15 số

try{
  if(money > 999999999999999) throw new RangeError("Biến không chứa nổi");
  console.log(money);
  
}catch(error){
  console.log(error);
  
}
//  RangeError mã lỗi có sẵn , ko nên dùng mà nên tự định nghĩa 
//  mà dựa theo bộ lỗi mình tựu đặt ra 

//đây là bộ lỗi có sẵn nha 
// EvalError():     tạo 1 instance đại diện cho một lỗi xảy ra liên quan đến hàm toàn cục Eval()
// InternalError(): tạo 1 instance đại diện cho một lỗi xảy ra khi 1 lỗi bên trong jsEngine
//                  được ném. vd: quá nhiều đệ quy
// RangeError()   : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến số hoặc tham chiếu
//                  nằm ngoài phạm vi hợp lệ của nó
// ReferenceError : tạo 1 instance đại diện cho một lỗi xảy ra khi hủy tham chiếu của 1 tham chiếu
//                  không hợp lệ
// SyntaxError    : tạo 1 instance đại diện cho một lỗi xảy ra trong khi phân tích cú pháp
//                                                                          mã trong Eval()
// TypeError      : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến hoặc 1 tham số
//                  có kiểu không hợp lệ   // nằm ở TS
// URIError       : tạo 1 instance đại diện cho một lỗi xảy ra khi encodeURI() hoặc decodeURI()
//                  truyền các tham số không hợp lệ // lỗi do decode giải mã


// Finally

//  Tạo ra một dạng lỗi mới
class ErrorWithStatus extends Error{
  constructor({status, message}){
    super(message);
    this.status = status;
  }
}

try{
  toibihack;
}catch(error){
  let response = new ErrorWithStatus({
    status: 400,
    message: "Đụ má mày ",
  });
  console.log(response);
}