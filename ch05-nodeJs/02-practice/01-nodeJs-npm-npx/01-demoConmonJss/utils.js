//utils
// có các cách để kết nối 2 file :
// 1 dùng html
//
const sum = (a, b) => a + b;

//mỗi file trong js gọi là module
//2 cach ket noi module : commonjs |esm

// commonjs thay required va exports la dau hieu nha
exports.sum = sum;
//tương đương với lệnh public , công khai vơi công chúng
//nếu ko có lệnh này thì lệnh kết nối cũng ko bị lỗi

//npm quản lý dự án , tải lưu trữ , các file trong package đó

//chạy file node

//nvm check version

//sau khi npm init -y nó sẽ tạo ra 1 file package.json
//file này lưu thông tin dựu án