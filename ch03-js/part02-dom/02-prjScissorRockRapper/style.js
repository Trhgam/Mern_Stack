//

let VALUE = [
  { id: "scissors", value: "✌️" },
  { id: "rock", value: "✊" },
  { id: "paper", value: "🖐" },
];

let compare = (idPlayer, idComputer) => {
  let indexPlayer = VALUE.findIndex((item) => item.id == idPlayer);
  let indexComputer = VALUE.findIndex((item) => item.id == idComputer);
  let check = indexPlayer - indexComputer;
  if (check == -2 || check == 1) return 1; //Thắng
  else if (check == 0) return 0; //Hòa
  else return -1; //Thua
};

// Làm chuyển động của máy
let i = 0;
let handleChange = () => {
  let computer = document.querySelector("#computer");
  computer.innerHTML = VALUE[i].value;
  computer.dataset.id = VALUE[i].id;
  i++;
  if (i == 3) {
    i = 0;
  }
};

let interval = setInterval(handleChange, 100);

// Làm bộ nút cho người dùng
let playerItems = document.querySelectorAll(".user");

playerItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    // 1. Dừng máy lại
    clearInterval(interval);
    // 2. Thêm actived cho nút vừa bấm, lấy id của user - computer
    playerItems.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    event.target.classList.add("actived");
    // 3. So sánh và hiển thị kết quả
    let idPlayer = event.target.id;
    let idComputer = computer.dataset.id;
    let result = compare(idPlayer, idComputer);
    let msg, color;
    let alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    if (result == 1) {
      msg = "Bạn chỉ thắng được máy thôi";
      color = "success";
    } else if (result == 0) {
      msg = "Bạn chỉ bằng được máy thôi";
      color = "warning";
    } else {
      msg = "Bạn còn thua cả máy nữa";
      color = "danger";
    }
    alertDiv.innerHTML = msg;
    alertDiv.classList.add(`alert-${color}`);
    document.querySelector(".notification").appendChild(alertDiv);
    // 4. Hiển thị nút chơi lại
    document.querySelector("#play-again").classList.remove("d-none");
  });
});


//làm sự kiện click cho nút chơi lại 
document.querySelector(".btn-play-again").addEventListener("click",() =>{
    //1.cho máy chạy lại
    interval = setInterval(handleChange, 1000);
    //2.xóa actived
    playerItems.forEach((_item)=>{
        _item.classList.remove("actived");
        _item.style.pointerEvents  = "";

    });
    
    //3 Xóa thông báo
    document.querySelector(".notification").innerHTML = "";
    document.querySelector("#play-again").classList.add("d-none");
});