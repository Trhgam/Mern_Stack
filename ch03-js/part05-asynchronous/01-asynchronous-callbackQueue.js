
//  01-asynchronous-callbackQueue.js
//  C là ngôn ngữ đơn luồng (sigle thread - pipe - async)

//  async: đồng bộ (phải đợi)
//  đồng bộ ko phải cùng diễn ra mà là đợi để làm giống 

//  code có nhiều task vụ thì nó sẽ đi từng nhịp và đợi
//  java là ngôn ngữ đa luồng (mul thread - asynchronous)
//  asynchronous : bất đồng bộ , ko có sự đợi chờ , thực thi nhiều luồng 1 lúc 

//  js là ngôn ngữ đơn luồng
//  js chạy trên wed(WED_APIs) là đa luồng

//Nodejs(là môi trường thực thi js mà js đơn luồng nên Node js ) đơn luồng 
// nhưng khi lắp thêm module thì nó là đa luồng 

//anh có 2 tác vụ sau : L1(5p) và L2(2p)

/*
        đơn luồng     đa luồng
L1(5p)    7p            5p
L2(2p)

***L1 và L2 có mối quan hệ nguyên nhân kết quả
L1: lên server lấy data về(3s)
L2: hiển thị data lên giao diện(1s)

xử lý bất đồng bộ

*/
/*
call satck : dữ liệu thực thi lệnh dạng ngăn xếp
stack
//LIFO : vào sau ra trước


*/
function a(x) {
  console.log(x);
}

function b(y) {
  a(y + 2);
}

function c(z) {
  b(z + 1);
}

c(5);

//tônngr quan về vùng nhớ trong js
/*
js(call stack , memory heap)
wedAPIs(DOM, AJAX(XmlHttpRequest, Timeout))
    AJAX(XmlHttpRequest) : giao tiếp với server khác lấy thông tin, lấy dữ liệu
    timeout (settimeout setinterval)
event loop => luôn chạy vd: addEventListener
event loop + callback queue(onClick onLoad onDone) (window sẽ gọi)
*/
//loupe wed miêu tả code thực thi đơn luồng |> copy code cho lên đó run


function handle(){

}
