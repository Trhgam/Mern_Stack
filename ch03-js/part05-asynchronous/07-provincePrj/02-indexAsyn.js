
const baseUrl = "https:provinces.open-api.vn/api"

class Http{
    async get(url){
        const response = await fetch(url)
        if(response.ok){
            return response.json();
            //ko ảnh hưởng vì return trong asyn = promise
        }else{
            throw new Error(response.statusText)
        }
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

async getProvinces(code = ""){
    try{
        const provinces= await  this.http
        .get(`${baseUrl}/p/${code}`)
            return provinces;
    }catch(err){
        console.log(err);
    }
}

    

    //getDistrictByProvinceCode : lấy danh sách các quận dựua vào ProvinceCode
    async getDistrictByProvinceCode(provinceCode){
        try{
        const province = await  this.http
        .get(`${baseUrl}/p/${provinceCode}/?depth=2`);
            
        return province.districts;
            //nó ko hiển thị đâu tại mk phải đọc thuộc tính của api nó
        }catch(err ){
            console.log(err);
        }
    }

    //getWard : lấy danh sách các huyện phường dựa vào district code

    async getWardByDistrictCode(districtCode){
        try{
        const district = await this.http
        .get(`${baseUrl}/d/${districtCode}/?depth=2`);
            return district.wards;
            //nó ko hiển thị đâu tại mk phải đọc thuộc tính của api nó
        }catch(err){
            console.log(err);
        }
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

document.addEventListener("DOMContentLoaded",async(event) =>{
    let store = new Store();
    let ui = new RenderUI();

    const provinces = await store.getProvinces()
    
        //có danh sấch thành phó rồi thì render lên ui
        ui.renderProvinces(provinces);

        let provinceCode = document.querySelector("#province").value;


        const districts = await store.getDistrictByProvinceCode(provinceCode);


        //nhận đc list quận thì render nó ra ui
        ui.renderDistricts(districts);
        //lấy districCode hiện tại và 
        let districtCode = document.querySelector("#district").value;
        
        const wards = await  store.getWardByDistrictCode(districtCode);
    
        //render wards vừa thu đuọc lên ui
        ui.renderWards(wards);
    
})

//phải bắt thêm sự kiện sau khi chọn lần 1 phải fl theo lần 2  lần 3 nữa 
//sự kiện thay đổi province

document.querySelector("#province").addEventListener("change",async (event) =>{
    let store = new Store();
    let ui = new RenderUI();

        let provinceCode = document.querySelector("#province").value;

        const districts = await store.getDistrictByProvinceCode(provinceCode);

        //nhận đc list quận thì render nó ra ui
        ui.renderDistricts(districts);
        //lấy districCode hiện tại và 
        let districtCode = document.querySelector("#district").value;
        
        const wards = await  store.getWardByDistrictCode(districtCode);
    
        //render wards vừa thu đuọc lên ui
        ui.renderWards(wards);

})

// nhưng có 1 vấn đề là khi nhấn vô thay đỏo
// huyện thì xã phường chưa thay đổi , nên cần làm cho nó nữa

//sự kiện thay đổi dicstrict

document.querySelector("#district").addEventListener("change",async(event) =>{
    let store = new Store();
    let ui = new RenderUI();

    //lấy mã province code mới
    let districtCode = document.querySelector("#district").value;
    //lấy các quận từ provinceCode hiện tại
    const wards = await  store.getWardByDistrictCode(districtCode);
    
        //render wards vừa thu đuọc lên ui
    ui.renderWards(wards);

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


