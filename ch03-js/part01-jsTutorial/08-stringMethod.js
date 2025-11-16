console.log("Bài 10 - Chuỗi method");
//Chuổi trong js được d/n bằng ' ""

//method trong String

//1.length : là prop của string trả ra độ dài ko phải method
let str = "ahihi";
console.log(str.length); //5 ko có ngoặc nha

//2.indexOf(val) tìm chuỗi val xuất hiện đầu tiên ở đâu
console.log(str.indexOf("h")); //1
console.log(str.indexOf("ih")); //2
console.log(str.indexOf("s")); //-1

//3.tách chuỗi
//3.1 splice(start,end): return chuỗi con từ stART ĐẾN END
let x = "Xin chào PiedTeam, mình là Điệp";
//cắt theo chiều xuôi
let result = x.slice(9, 17); //đến 17-1 nha
console.log(result); //PiedTeam, mình là Điệp

//cắt theo chiều ngược
result = x.slice(-22, -14);
console.log(result); //PiedTeam
//cắt bằng 1 parameter
result = x.slice(9); //PiedTeam, mình là Điệp
//cắt ngược 1 parametter
result = x.slice(-12); //mình là Điệp






//3.2 .subString(start, end) cũng giống như splice nhưng không cắt ngược
//3.3.substr(start, length) return chuỗi con từ start có độ dài length
//              ### ko được dùng nữa

//II- các method phổ biến
//1,replace: thay thế chuỗi
let str1 = "PiedTeamxcos nhiều bạn rất nhiều tiền";
str1 = str1.replace("nhiều", "ít");
console.log(str1);

//2.replaceAll : thay thế chuỗi
str1 = "PiedTeamx có nhiều bạn rất nhiều tiền";
str1 = str1.replaceAll("nhiều", "ít");
console.log(str1); //PiedTeam có ít bạn rất ít tiền

//3.replace thay thế chuỗi + regex
str1 = "PiedTeamx có nhiều bạn rất nhiều tiền";
str1 = str1.replace(/nhiều/g, "ít");
console.log(str1);

//xóa khoảng cách thừa
str1 = "PiedTeamx     có      nhiều bạn rất nhiều tiền";
str1 = str1.replaceAll(/\s+/g, " ").trim();
console.log(str1);

//4.Chuyển đổi hoa thường toUpperCase | .toLowerCase

//5.concat(...str) nối chuỗi ==> rest parameter
str1 = "Xin chào";
str2 = "PiedTeam";
str3 = str1.concat(" ", "mừng bạn đến với", " ", str2);
str3 = str1 + " " + "mừng bạn đến với" + " " + str2;
str3 = `${str1} mừng bạn đến với ${str2}`;

//5. so sánh chuỗi  == | ===
//=== so sánh kiểu về pool hay new

//6.split(token): băm chuỗi ra thành mảng theo token | từ
// join(token) : nối các pt trong mảng thành chuỗi theo token
str1 = " xin     chào    các    bạn";
//xin-chào-các-bạn
str1 = str1
  .split(" ")
  .filter((item) => {
    return item != "";
  })
  .join("-");
console.log(str1);

//7.chartAt(index): return char ở vị trí index
x = "Điệp đẹp trai";
console.log(x.charAt(2)); //ệ
console.log(x.charAt(22)); //""
x[2] = "e"; // ko lỗi , ko chạy được
//string là immutable: là objetc bất biến ,
// nên không thể thao tác trên string
