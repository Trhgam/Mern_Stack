document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    perPage: 5,
    rewind: true,
    perMove: 1,
    type: "loop",
    // drag : "free",
    // snap: true,
    wheel: true,
    breakpoints: {
      1004: {
        perPage: 4,
      },
      804: {
        perPage: 3,
      },
      604: {
        perPage: 2,
      },
      404: {
        perPage: 1,
      },
    },
  });
  splide.mount();
});
//   Drag Free focus
// Splidejs.com

//   khi document chạy xong nội dung thì kết nối thàng có class slide và hiển thị
//   mount là kết nối -  hiển thị - đã hiển thị
// học vòng đời life cycle
