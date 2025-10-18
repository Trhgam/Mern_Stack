// 03-protoType.js
//Trong js ngta thích dùng function hơn là class để tạo object
//Bên java nếu muốn tạo 1 objetc (đối tượng)
//                  thì mình cần class(cái khuôn) + constructer(cái phễu)
//Trong js chỉ cần cái phẫu thôi

function Car(name, price){
    this.name = name;
    this.price = price;
}

let audi = new Car("audiR8" ,"2 tỷ");
console.log(audi);

let factory = {
    date: 2025,
};
Car.prototype = factory;
let rollroyce = new Car("ror","8 tỷ");
/*
rollroyce{
    name: "ror",
    price: "8 tỷ",
    [[Prototype]] : factory{
        date : 2025
    }
}
 */

// ôn lại
function Animal(name){
    this.name = name;
    /*
    prototype = class Animal{
    constructer = function Animal(name){
                    this.name = name;
                    protoType = class Animal{
                    ...
                    }    
                }
    }
    */
}
console.log(Animal.prototype); //class Animal
console.log(Animal.prototype.constructor == Animal); //class Animal


//trick
let congido = new Animal("Hehe");

/*
congido{
    name:"Gấm",
    [[Prototype]] : class Animal{
                    constructor: f Animal(name){
                    this.name = name,
                    prototype : class Animal{
                                ...
                        }
                    }
            }
}

*/
console.log(congido.__proto__.constructor == Animal); //true 
console.log(congido.constructor == Animal); //true , khác tầng nhưng nó vẫn cố đào ra để lấy lại

//
let pet = new congido.constructor("Khoa");


