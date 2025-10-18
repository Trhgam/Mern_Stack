let btnList = document.querySelectorAll(".navtab-btn");
let contentList = document.querySelectorAll(".tab-content-item");

btnList.forEach((btn) => {
    btn.addEventListener("click", (event) => {
    //1.Duyệt danh sách các nút và xóa hết các nút actived
    btnList.forEach((_btn)=> {
        _btn.classList.remove("actived");
    });
    //2.Cài actived vào nút vừa nhấn(event.target)
    event.target.classList.add("actived");
    //3.Lây id thằng vừa nhấn
    let id = event.target.id;
    //4 Duyệt danh sách content và xóa actived sau đó cài
    // actived vào content có id tương ứng
    contentList.forEach((content)=>{
        content.classList.remove("actived");
    });
    //
    document.querySelector(`.tab-content-item[data-id='${id}']`).classList.add("actived");

    });
});
