// cách 1 : fetch               promise class 
// cách 2 : fetch           async await class 
// cách 3 : XMLHttpRequest callback prototype

class Http{
    send(method, url , body){
        return fetch(url, {
            method: method,
            headers: {'Content-type': 'application/json'},
            body: body ? JSON.stringify(body) : null,
        }).then((response) => {
            if(response.ok){
                return response.json()
            }else{
                throw new Error(response.status);
            }
        });
    }
    get(url){
        return this.send('GET', url, null);
    }
    post(url, body){
        return this.send('POST', url, body);
    }
    put(url, body){
        return this.send('PUT', url, body);
    }
    delete(url){
        return this.send('DELETE', url, null);
    }
}

const BASE_URL = "https://69057f57ee3d0d14c132c712.mockapi.io";

let http = new Http();
http.get(`${BASE_URL}/users`)
    .then((data) => {
        console.log("Hiển thị");
        console.log(data);
    })
    .catch((error) => {
        console.log("Lỗi nè "+error);
    });

//
http.post(`${BASE_URL}/users`, { name: "Tú", yob: 2005 })
    .then((data) => {
        console.log("Hiển thị");
        console.log(data);
    })
    .catch((error) => {
        console.log("Lỗi nè " +error);
    });

    http.put(`${BASE_URL}/users/3`, { name: "Tú Tú", yob: 2005 }) //truyên id
    .then((data) => {
        console.log("Hiển thị");
        console.log(data);
    })
    .catch((error) => {
        console.log("Lỗi nè " + error);
    });
