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
