// Postman là gì ?
/*https://69057f57ee3d0d14c132c712.mockapi.io/users 

    Khi nhận được 1 đường dẫn , ta không biết trong đó có gì , nên buộc ta phải dùng 
    fetch để mở kiện hàng ra kiểm tra
    và xử lý thì mình mới lấy được dữ liệu 
    Nhưng đôi khi đường dẫn bị sai, nó rất khó để kiểm soát
    hoặc có quá nhiều đường dẫn để kiểm tra 
    
    API là bộ các đường dẫn do backend làm ra 
    Fe dùng API để giao tiếp với BE và lấy đc data
    mà để giao tiếp đc vs API Fe phải dùng đến 3 công nghê:
    + XML HttpRequest
    + fetch API
    + Axios

    Nhưng mình ko nên cần bộ API của be và code luôn vì mình không biết nó có thiệt sự \
    hoạt động tốt hay không
    Nên giải pháp đó là có 1 thằng là "Postman"
    Thay vì viết code Axios để xem được dữ liệu vì mình có thể dùng Postman để xem được dữi liệu 1 cách nhanh nhất

    postman ko thay thế fetch .. đâu vì nó chỉ có thể dùng để
    test nhanh các url xem nó có hoạt động tốt hay không

    khi be vừa code ra bộ API thì nó sẽ cần dùng postman
    để kiểm tra 

    còn fe dùng postman để kiểm tra bộ API có gì trc khi viết code

    và bài này mk sẽ là role fe kiểm tra api có gì trc khi viết code

    binance : cho API để thuẹc hành
    spotify

*/

// dùng promise + fetchAPI + class
// API : Application Programming Interface
/*  Mọi ứng dụng đều có API để cho dev đc quyền sử dụng nhưungx tính năng của ứng 
    dụng đó,vì các ứng dụng code khác ngôn ngữ nên
    các ứng dụng giao tiếp vs nhau bằng API 
    

 */
const baseUrl = "https:provinces.open-api.vn/api"

// class Http{
//     //send:
//     //bài này ko body vì api của thằng này chỉ có get

//     //get
//     //chỉ lấy đc 200 vì url chỉ cung cấp 200 và 422
//     get(url){
//         fetch(url).then(response => {
//             if(response.ok){
//                 return response.json();
//             }else{
//                 throw new Error(response.statusText)
//             }
//         })
//     }
// }
// viết như vầy cũng ko ngon lắm vì khi ng dùng nhận đưuojc 
// người ta sẽ không .then tiếp được nữa , nên cách khác đó là raturn ngay fetch luôn
class Http{
    get(url){
        return fetch(url).then(response => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error(response.statusText)
            }
        })
    }
}

// Http đóng vai trò do những hàm giúp mình giao tiếp với server
// mình vẫn phải chia ứng dụng ra 2 phần là store và renderUi

// class store
class Store{
    constructor(){
        this.http = new Http(); 
    }
    //getProvinces
    //vừa lấy ds thành phố và lấy 1 tp duy nhất theo code
    // .then .catch để xử lý luôn
    getProvinces(code = ""){
        return this.http
        .get(`${baseUrl}/p/${code}`)
        .then(provinces=>{
            return provinces;
            
        })
        .catch(err=>{
            console.log(err);
        });
    }

    //getDistrictByProvinceCode : lấy danh sách các quận dựua vào ProvinceCode
    getDistrictByProvinceCode(provinceCode){
        return this.http
        .get(`${baseUrl}/p/${provinceCode}/?depth=2`)
        .then(province => {
            return province.districts;
            //nó ko hiển thị đâu tại mk phải đọc thuộc tính của api nó
        })
        .catch(err=>{
            console.log(err);
        });
    }

    //getWard : lấy danh sách các huyện phường dựa vào district code

    getWardByDistrictCode(districtCode){
        return this.http
        .get(`${baseUrl}/d/${districtCode}/?depth=2`)
        .then(district => {
            return district.wards;
            //nó ko hiển thị đâu tại mk phải đọc thuộc tính của api nó
        })
        .catch(err=>{
            console.log(err);
        });
    }
}


// new Store().getProvinces().then(provinces=>{
//     console.log(provinces);
// });


//ko nên in ra hãy return nó ra rồi mới log


// class renderUI
class RenderUI{
    constructor(){
    }
    //renderProvinces: nhận vào danh sách các provinces và render lên giao diện
    renderProvinces(provinces){
        let htmlContent = "";
        provinces.forEach(province => {
            const{code,name} = province; //destructuring
            htmlContent += `
            <option value="${code}">${name}</option>
            `
        });

        //nhét vào select#province
        document.querySelector("#province").innerHTML = htmlContent;

    }

    //renderDistricts : nhận vào danh sách các district và render lên giao diện
    renderDistricts(districts){
        let htmlContent = "";
        districts.forEach(district => {
            const{code,name} = district; //destructuring
            htmlContent += `
            <option value="${code}">${name}</option>
            `
        });
        //nhét vào select#district
        document.querySelector("#district").innerHTML = htmlContent;
        
    }
    //renderWards : nhận vào danh sách các ward và render lên giao diện
    renderWards(wards){     
        let htmlContent = "";
        wards.forEach(ward => {
            const{code,name} = ward; //destructuring
            htmlContent += `
            <option value="${code}">${name}</option>
            `
        });
        //nhét vào select#ward
        document.querySelector("#ward").innerHTML = htmlContent;
    }


    renderInformation(information){
        const {address,ward,district,province} = information;
        let htmlContent = `${address}, ${ward}, ${district}, ${province}`;
        document.querySelector("#information").innerHTML = htmlContent;
    }
}


//khi wed vừa load xong phải có danh sách liền
//sự kiện khi load trang 

document.addEventListener("DOMContentLoaded",event =>{
    let store = new Store();
    let ui = new RenderUI();

    store.getProvinces().then(provinces=>{
        //có danh sấch thành phó rồi thì render lên ui
        ui.renderProvinces(provinces);

        //lấy value trực tiếp từ ng dùng chọn và render qua ô tiếp
        //lấy Provinces code hiện tại ở thẻ đó .value
        let provinceCode = document.querySelector("#province").value;
        // dùng provinceCode getDistrict ==> sai lầm
        
        
        // store.getDistrictByProvinceCode(provinceCode).then(districts=>{
        //     ui.renderDistricts(districts);
        // });//cũng được nhưng ko tốt vì sẽ bị Promise hell

        return store.getDistrictByProvinceCode(provinceCode);

    }).then(districts=>{
        //nhận đc list quận thì render nó ra ui
        ui.renderDistricts(districts);
        //lấy districCode hiện tại và 
        let districtCode = document.querySelector("#district").value;
        
        return store.getWardByDistrictCode(districtCode);
    }).then(wards=>{
        //render wards vừa thu đuọc lên ui
        ui.renderWards(wards);
    })
})

//phải bắt thêm sự kiện sau khi chọn lần 1 phải fl theo lần 2  lần 3 nữa 
//sự kiện thay đổi province

document.querySelector("#province").addEventListener("change",event =>{
    let store = new Store();
    let ui = new RenderUI();

    //lấy mã province code mới
    let provinceCode = document.querySelector("#province").value;
    //lấy các quận từ provinceCode hiện tại
    store
    .getDistrictByProvinceCode(provinceCode)

    .then(districts=>{
        //nhận đc list quận thì render nó ra ui
        ui.renderDistricts(districts);
        //lấy districCode hiện tại và render huyện xã 
        let districtCode = document.querySelector("#district").value;
        
        return store.getWardByDistrictCode(districtCode);
    }).then(wards=>{
        //render wards vừa thu đuọc lên ui
        ui.renderWards(wards);
    })

})

// nhưng có 1 vấn đề là khi nhấn vô thay đỏo
// huyện thì xã phường chưa thay đổi , nên cần làm cho nó nữa

//sự kiện thay đổi dicstrict

document.querySelector("#district").addEventListener("change",event =>{
    let store = new Store();
    let ui = new RenderUI();

    //lấy mã province code mới
    let districtCode = document.querySelector("#district").value;
    //lấy các quận từ provinceCode hiện tại
    store.getWardByDistrictCode(districtCode)
    .then(wards=>{
        //render wards vừa thu đuọc lên ui
        ui.renderWards(wards);
    })

})

//vô thẳng district lấy wart chứ ko cần qua 

//sự kiện hiện địa chỉa sau khi submit
//lấy full thông tin kèm địa chỉ nối thành đường dài
//để bỏ vô google map kiểm tra xem có hợp lệ hay không 
//để giao hàng


//khi submit 

document.querySelector("#form").addEventListener("submit",event =>{
    event.preventDefault();
    //khi đụng vô form nó hay reset trang và để tránh reset trang thì ta 
    //cần chặn reload
    //muốn lấy nội dung option bị chọn tức là innerhtml

    let province = document.querySelector("#province option:checked").innerHTML;
    //vô và lấy content của đứa đang được chọn và 

    let district = document.querySelector("#district option:checked").innerHTML;

    let ward = document.querySelector("#ward option:checked").innerHTML;
    //address là thẻ text ko phải thẻ option chỉ cần .value thôi
    let address = document.querySelector("#address").value;

    //từ những thuộc tính này sẽ viết hàm renderInformation
    //hàm này do nó viết sau nên ko nên truyền tất cả thông tin vào
    //vì user sẽ truyền sai thứ tự
    //khuyên là nên tạo 1 object từ input ng dùng nhập 
    let information = {
        address,
        ward,
        district,
        province
    };
    //sau đó dùng cấu trúc phân rã 
    // chứ đừng gà mà đi truyền từng param vô nha ...
    // mà ui này chưa có nên viết lun  nhe
    let ui = new RenderUI();

    ui.renderInformation(information);

})







/*
1. Sự kiện Chuột (Mouse Events)
    click: Xảy ra khi nhấn và thả nút chuột (ví dụ: như onClick).

    dblclick: Xảy ra khi nhấp đúp chuột.

    mousedown / mouseup: Xảy ra khi nút chuột được nhấn xuống / thả ra.

    mousemove: Xảy ra khi con trỏ chuột di chuyển trên một phần tử.

    mouseover / mouseout: Xảy ra khi con trỏ chuột đi vào / đi ra khỏi một phần tử

2. Sự kiện Bàn phím (Keyboard Events)
    keydown: Xảy ra khi một phím được nhấn xuống.

    keyup: Xảy ra khi một phím được thả ra.

    keypress (ít dùng hơn): Xảy ra khi một phím tạo ra ký tự được nhấn xuống (không dùng cho các phím chức năng như Shift, Alt).

3. Sự kiện Biểu mẫu (Form Events)
    submit: Xảy ra khi người dùng cố gắng gửi biểu mẫu.

    change: Xảy ra khi giá trị của phần tử nhập liệu (input, select, textarea) bị thay đổi và người dùng thoát khỏi nó (ví dụ: sau khi gõ xong).

    focus / blur: Xảy ra khi một phần tử nhận được / mất đi sự tập trung (focus).

4. Sự kiện Tải trang/Tài liệu (Document/Window Events)
    DOMContentLoaded (như bạn đã đề cập): Tài liệu HTML đã được tải và phân tích cú pháp.

    load: Toàn bộ trang, bao gồm tất cả hình ảnh và tài nguyên khác, đã được tải xong.

    resize: Kích thước cửa sổ trình duyệt bị thay đổi.

    scroll: Người dùng cuộn trang.

Các Sự kiện Khác
    transitionend: Khi một chuyển đổi CSS (CSS transition) kết thúc.

    error: Xảy ra khi có lỗi tải tài nguyên (ví dụ: hình ảnh không tìm thấy).
*/