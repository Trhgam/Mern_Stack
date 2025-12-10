// Lưu những mô tả request chức năng có liên quan đến đối tượng User
// mô tả -> interface
export interface RegisterReqBody{
    email : string,
    name : string,
    password : string,
    confirm_password : string,
    date_of_birth : string, // chuoi co cau truc ISO8601 ,lưu chuỗi-xử lý date ISO
}
//file này rất quan trọng, nó có thể biến thánh doc để ép ng dùng làm
