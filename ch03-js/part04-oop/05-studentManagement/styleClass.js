//quản lý sinh viên theo OOP
//nhưng mình dùng functiond để code OOP
//tạo ra sinh viên
class Student{
    constructor(name, birthday) {
    this.name = name;
    this.birthday = birthday;
    this.id = new Date().toISOString(); // dòng này hay sai, code cẩn thận
    }
}

//----Store chuyên quản lý các chức năng Store
class Store {
    constructor() {}
    //láy danh sách students từ ls
    getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
    };
    //hàm này thêm student vào kho
    add(student) {
    let students = this.getStudents();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    };

    //================================
    //Buoi 2
    //tìm kiếm sinh viên theo id
    getStudent(id) {
    let students = this.getStudents();
    let student = students.find((student) => student.id === id);
    return student; 
    // return students.find((student) => student.id === id);
    };
    //
    //xóa sinh viên dựa trên id 
    remove(id){
    let students = this.getStudents();//lấy dánh sách xuống
    //tìm vị trí cần xóa
    let studentIndex = students.findIndex((student) => student.id === id);
    //xóa | từ vị trí đó lấy đc stydent bị xóa
    let student = students.splice(studentIndex, 1)[0];
    //cập nhật danh sách lên lại LocalStore
    localStorage.setItem("students", JSON.stringify(students));
    //return student đã xóa nếu cần (undo)
    return student;

    }
}
//============================================

//----RenderUI: chuyển quản lý các chức năng RenderUI
class RenderUI{
constructor() {}

    //thêm sinh viên vào giao diện
    add ({ name, birthday, id }) {
    //biến đổi thông tin sinh viên thành tr
    let students = new Store().getStudents();
    let newTr = document.createElement("tr");
    newTr.innerHTML = `
                <td>${students.length}</td>
                <td>${name}</td>
                <td>${birthday}</td>
                <td>
                <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">
                    Xóa
                </button>
                </td>
    `;
    document.querySelector("tbody").appendChild(newTr);
    //xóa giá trị input cho đẹp
    document.querySelector("#name").value = "";
    document.querySelector("#birthday").value = "";
    };

    //thông báo
    alert (msg, type = "success") {
    let divAlert = document.createElement("div");
    divAlert.className = `alert alert-${type}`;
    divAlert.innerHTML = msg;
    document.querySelector("#notification").appendChild(divAlert);
    setTimeout(() => {
        divAlert.remove();
    }, 3000);
    };

    //======================================================
    // buoi 2 bai nay 

    //hiển thị tất cả danh sách
    renderAll () {
    //lấy toàn bộ danh sách sinh viên đang có từ store
    let students = new Store().getStudents();
    //đi qua từng sinh viên và biến thành thẻ tr
    let count = 1;
    let content = students.reduce((total, student) => {
        const { name, birthday, id } = student;
        return (
        total + 
        `   
        <tr>
        <td>${count++}</td>
                <td>${name}</td>
                <td>${birthday}</td>
                <td>
                <button class="btn btn-danger btn-sm btn-remove" data-id="${id}">
                    Xóa
                </button>
                </td>
                </tr>`
        );
    }, "");
    document.querySelector("tbody").innerHTML = content;
    };

}


//----Event: sự kiện diễn ra trong app
// sự kiện chính: form được submit
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // chặn sự kiện reset trang của action
  let store = new Store();
  let renderUI = new RenderUI();
  //lấy giá trị từ input name, birthday
  let name = document.querySelector("#name").value;
  let birthday = document.querySelector("#birthday").value;
  //tạo Student
  let newStudent = new Student(name, birthday);
  //lưu student vào store
  store.add(newStudent);
  //hiển thị student lên ui
  renderUI.add(newStudent);
  //hiển thị thông báo thành công lên ui
  renderUI.alert("thêm thành công", "success");
});

//su kien mo trang 
document.addEventListener("DOMContentLoaded", (event)=> {
  let renderUI = new RenderUI();
  renderUI.renderAll();
})
//==================================================================

//su kien xoa student
document.querySelector("tbody").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remove")) {
    let id = event.target.dataset.id;
    //dùng id để tìm thằng đó 
    let store = new Store();
    let renderUI = new RenderUI();
    let student = store.getStudent(id);
    let isConfirmed = confirm(`Bạn có chắc chắn muốn xóa ${student.name} ?`);
    if(isConfirmed){
      //dùng id để xóa nó khỏi danh sách
      store.remove(id);
      //xóa khỏi giao diện
      //event.target.parentElement.parentElement.remove();
      renderUI.renderAll();
      //hiển thị thông báo đã xóa 
      renderUI.alert("Xóa thành công", "danger");
    }
    
    
  
    
  }
})


