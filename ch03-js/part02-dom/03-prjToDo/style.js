document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // chặn reset trang
  let name = document.querySelector("#name").value;
  let item = {
    // Nhớ có dấu () => Không sẽ bị lỗi nhé
    id: new Date().toISOString(),
    name,
    // kỹ thuật viết tắt trong JS
  };
  // Lưu item vào LS
  addItemtoLS(item);
  // Lưu item lên giao diện
  addItemToUI(item);
});

// JSON -> Javascript Object Notion
// JSON.parse => Chuyển chuỗi giống mảng -> mảng

// getList(): Lên localstorage tìm list
const getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

// addItemtoLS(item): Hàm nhận vào item và lưu item vào localstorage
const addItemtoLS = (item) => {
  let list = getList();
  list.push(item);
  localStorage.setItem("list", JSON.stringify(list));
};

// addItemToUI(item): hàm nhận vào và thêm item lên giao diện
const addItemToUI = ({ id, name }) => {
  // Nhận đầu vào là 1 kỹ thuật destructour
  let newCard = document.createElement("div");
  newCard.className =
    "card d-flex flex-row justify-content-between align-items-center p-2 mb-3";
  newCard.innerHTML = `<span>${name}</span>
          <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">Remove</button>`;
  document.querySelector("#list").appendChild(newCard);
};

const init = () => {
  let list = getList();
  list.forEach((item) => {
    addItemToUI(item);
  });
};

init();

// Xóa
document.querySelector("#list").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    let itemId = event.target.dataset.id;
    let name = event.target.previousElementSibling.innerHTML;
    let isConfirmed = confirm(`Ban co chac là se khong ${name} nua chu?`);
    if (isConfirmed) {
      // Xoa trong UI
      event.target.parentElement.remove();
      // Xoa trong Ls
      removeItemFormLS(itemId);
    }
  }
});

const removeItemFormLS = (itemId) => {
  let list = getList();
  let indexItem = list.findIndex((item) => item.id == itemId);
  list.splice(indexItem, 1);
  localStorage.setItem("list", JSON.stringify(list));
};

//removeAll
document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
    localStorage.removeItem("list");
    document.querySelector("#list").innerHTML = "";
});

//filter
document.querySelector("#filter").addEventListener("keyup", (event)=> {
    let valueFilter = event.target.value;
    let list = getList();
    list = list.filter((item) => item.name.includes(valueFilter));
    document.querySelector("#list").innerHTML = "";
    list.forEach((item)=> {
        addItemToUI(item);
    });
});