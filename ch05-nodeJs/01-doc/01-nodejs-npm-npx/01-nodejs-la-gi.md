# Node.js là gì? Tại sao phải học Node.js?

## Node.js là gì?

Javascript là ngôn ngữ lập trình, muốn chạy thì cần phải có môi trường

Môi trường phổ biến là: Trình duyệt, Node.Js, Deno, Bun,...

- Node.js là môi trường chạy Javascript ngoài trình duyệt, vì thế nó có thể làm server backend.

- Node.js thì free, open source, chạy đc trên linux, mac, windows

- Chrome V8 JavaScript engine là nhân chạy Javascript của Node.Js, và cái nhân này cũng là nhân của Chrome, Edge, Opera, Electron. Chrome V8 JavaScript engine nó được viết bằng C++

- Ngoài Chrome V8 JavaScript engine ra thì còn vài thứ khác đảm nhiệm các vị trí khác trong nodejs như: libuv, c-ares,...

### Lịch sử Node.js

k quan tâm

## Tại sao chọn Node.js viết Backend mà không phải là PHP, Go, Java, .Net

- Node.Js viết bằng C++ , một lập trình viên FE cũng có thể dễ dàng học và viết được BE. Từ đó tiết kiệm chi phí nhân sự 
- C++ ko liên quan gì tới Js nha!!

- Node.js nhanh hơn PHP

- Mặc dù tốc độ thua Java (khi đơn luồng), .Net, Go (nodejs thua gấp đôi) nhưng thực tế chúng ta không cần nhiều tốc độ đến thế. [Stack Exchange chỉ thực thi 300 req/s](https://stackexchange.com/performance), Fastify của Node.js có thể cho ra **45659 req/s**, và express là **9888 req/sec** (tất nhiên tùy vào bài test nhưng nó đủ đáp ứng nhu cầu chúng ta)

- express | Fastify | nextJs chỉ là công nghệ
- Hầu hết các nút thắc cổ chai ở server nằm ở database chứ ít khi nằm ở ngôn ngữ chúng ta chọn

> Nếu cảm thấy Node.js chậm, không xử lý được hàng nghìn giao dịch mỗi giây của bạn, chỉ cần nâng cấp server! Easy!

- Nhu cầu việc làm của Node.js cao tương đương PHP, Java, .Net

## Hiểu lầm về Node.js và JavaScript

Ai cũng biết JavaScript là ngôn ngữ đơn luồng, nhưng môi trường chạy của nó là đa luồng (mình đã học qua)

Ví dụ trình duyệt, đây là môi trường đa luồng, các WebAPI như setTimeout đều chạy ở luồng khác

Node.js cũng thế, nó có thể chạy đa luồng => có thể tận dụng được hết sức mạnh CPU ngày nay

# Cài đặt NodeJS

Có thể download nodejs ở trang chủ [https://nodejs.org/en](https://nodejs.org/en) nhưng không nên, vì sau này rất khó để chuyển đổi giữa các version khác nhau

Cách cài thông minh hơn là dùng NVM, thích version nào thì chuyển sang version đó, rất tiện
- NPM là NodeJs Version Management : giúp lưu trữ ,cài đặt chuyển đổi các phiên bản bằng 1 lệnh duy nhất.

- Mac & Linux: [https://github.com/nvm-sh/nvm#install--update-script](https://github.com/nvm-sh/nvm#install--update-script)
- Window: [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

Để biết cài NVM thành công chưa thì dùng

```bash
nvm list
```

Cài Node version mới nhất

```bash
nvm install node
```

Cài Node version chỉ định

```bash
nvm install 14.7.0
```

Muốn set default phiên bản node nào đó, ví dụ `14.7.0`

```bash
nvm alias default 14.7.0
```
---
# Lộ trình học

https://roadmap.sh/nodejs ta sẽ theo đường dẫn này
module là 1 thành phần nhỏ trong code thay vì code tất cả 1 file thì họ chia ra nhiều module để dể dàng quản trị

giới thiệu về commonjs và esm là 2 format module
commonjs là module mặc định, esm là sau này mới có

## thực hành

### tạo folder test-module có 2 file để test **_commonjs_**

--utils.js

```js
const sum = (a, b) => a + b;
exports.sum = sum;
```

main.js

```js
const utitls = require("./utils.js");
console.log("main.js nè");
console.log(utitls.sum(1, 5));
```

chạy thử bằng node

```bash
node main.js
main.js nè
6
```

### tạo folder es-module để demo esm

để dùng esm ta phải có package.json hoặc file phải có đuôi là mjs,
ở đây mình sẽ dùng pakage.json nên ta sẽ gõ

```bash
npm init -y để tạo gói package.json sẵn
```

ta vào file package.json config lại type cho module

```json
"type": "module"
```

sau đó ta tạo 2 file để demo module
helper.js

```js
const logName = () => {
  console.log("xin chào mọi người");
};
export const sum = (a, b) => a + b;
export default logName;
```

index.js

```js
import logName, { sum } from "./helper.js";

logName();

console.log(sum(1, 5));
```

chạy thử để xem kết quả

dù là common hay es thì cái nào không export thì sẽ k được sử dụng ở file khác

---

# Npm là gì ?

là 1 trình quản lý thư viện của nodejs, thay vì ta phải mò lên các trang web để tải src về không chính thống, thì ta có thể thông qua npm để tại trực tiếp bằng lệnh, nhanh chóng, an toàn, và dể dàng

## tạo folder npmDemo

package.json là file quản lý những công nghệ mình đang dùng

```bash
npm init --giúp tạo package.json
```

giờ cài thử thư viện lodash thử

```bash
npm i lodash
npm i axios
```

xem package để xem thay đổi
node_modules là nơi chứa các file cài đặt
package-lock.json chứa thông tin đầu đủ của package.json

giả xử ta muốn xóa bớt thư viện

```bash
  npm uninstall axios
```

# option cài đặt global -g hay local

global là cài đặt trong máy tính, sử dụng ở đâu trong máy cũng đc
cài thử nodemon global

```bash
npm i nodemon -g
```

nodemon là 1 thư viện theo dõi những thay đổi trong dự án và chạy lại các câu lệnh ta yêu cầu nếu có thay đổi

demo
tạo file index.js

```bash
const sum = (a, b) => a + b;

console.log(sum(1, 2));
```

mỗi lần mình thay đổi , mình phải chạy lại cái node index.js để xem kết quả rất mệt
nên giờ ta sẽ gõ là nodemon index.js để nó theo dõi thay đổi của index.js và khi thay đổi , nó sẽ chạy lại

nhưng trên thực tế thì anh thích cài local hơn, tránh ảnh hưởng máy người khác
local có 2 kiểu cài

1. dependence: cài các thứ liên quan đến sản phẩm

```bash
npm i nodemon
```

2. devdependence: cài tool, thư viện mà nó k nằm trong quá trình production
   --vd: nodemon là 1 tool hỗ trợ chạy code khi refesh

```bash
npm i nodemon -D
```

xóa nodemon khỏi global

```bash
npm uninstall nodemon -g
```

giờ ta cài đặt nodemon vào local rồi, nên muốn xài phải thông qua package
ta vào package thêm script

```json
"start": "nodemon index.js"
```

và chạy bằng cách gọi lên "start"

```bash
npm run start
```

# các cập nhật package trong dự án

## học cách đánh version

version có cấu trúc **"Major.minor.patch"**
tương ứng như **"breakchange.newfeature.fixed"**

ta sẽ gặp tiền tố **"^Major.minor.patch"** hoặc **"~Major.minor.patch"**

**"^Major.minor.patch"** cho phép cài lệch minor và patch ví dụ **0.13.1** thì có thể cài thành **0.13.2** hoặc **0.14.0**

**"~Major.minor.patch"** cho phép cài lệch patch, ví dụ **0.13.1** thì có thể cài **0.13.2**, không thể cài **0.14.1** được

hiểu rõ được cách đánh version thì ta mới tiến hành cập nhật

## demo

xóa thử nodemon và cài 1 ver cũ cho no

```bash
npm uninstall nodemon
npm i nodemon@2.0.2 -D
```

cập nhật nè

kiểm tra paskage đã lỗi thời

```bash
npm outdated
Package  Current  Wanted  Latest  Location              Depended by
nodemon    2.0.2  2.0.22  2.0.22  node_modules/nodemon  npmDemo
```

cập nhật

```bash
npm update --cập nhật nè
npm outdated --test lại xem còn outdated k nè
```

dù đã cập nhật nhưng package k cập nhật package-lock thì có cập nhật
ta không cần quan tâm sự tương thích này, vì ta chỉ cần quan trọng package-lock thôi

nếu ta muốn cập nhật trong package.json ta có thể fix bằng tay
hoặc dùng npm-check-updates

```bash
npm i -g npm-check-updates
```

sau khi cài xong ta chỉ cần gõ mcu để xem như outdate
lúc này ta sẽ thấy
và ta cập nhật bằng ncu -u

**_cập nhật cẩn thận, nhiều khi cập nhật lên breaking change là nó lỗi ngu người_**

```bash
npm install
```

cài lại cho chắc

### giới thiệu về ignore và npm i khi đã xóa node_module

--phần này dể demo

# NPX là gì?

NPX là 1 commandline mới được cài vào sau npm
NPX giúp cài 1 gói package nhanh, đỡ phải cài từng thằng

ta sẽ demo thử môi trường code cho react
tạo thử folder tên NpxDemo

```bash
npm init -y
npm i create-react-app
npx create-react-app
```

nếu ta vào tìm file node_module/bin/create-react-app và thêm console.log
thì ta sẽ thấy npx chạy log đó

npx hoạt động bằng cách nếu như package.json k có thì nó vẫn sẽ tự mò lên npm thư viện để tìm và cài đặt create-react-app -> **_npx k phụ thuộc vào package.json_**

nếu giờ bạn xóa hết tất cả trong npxDemo và gõ

```bash
npx create-react-app my-app
```

thì nó sẽ tự động lên npm tại về dù chẳng có package.json nào cả

ngoài npx còn có yarn, pnpm (bọn này giống npm nhưng mà nó hiệu năng cài đa luồng, nhanh hơn)
