// cách 2 : fetch           await await class 
// cách 3 : XMLHttpRequest callback prototype

class Http{
    async send(method, url , body){
        let response = await fetch(url, {
            method: method,
            headers: {'Content-type': 'application/json'},
            body: body ? JSON.stringify(body) : null,
        });
        if(response.ok){
            return response.json()
        }else{
            throw new Error(response.status);
        }
        
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

(async () => {
  try {
    let data = await http.get(`${BASE_URL}/users`);
    console.log("Hiển thị");
    console.log(data);
  } catch (err) {
    console.log("Lỗi nè: " + err);
  }
})();
//tự làm put sau nha má 
(async () => {
  try {
    let data = await http.put(`${BASE_URL}/users/3`, {
      name: "Lê Tuấn",
      yob: 2005,
    });
    console.log("Hiển thị");
    console.log(data);
  } catch (err) {
    console.log("Lỗi nè: " + err);
  }
})();
