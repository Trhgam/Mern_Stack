// Javascript// 1. Tính tổng các số trong mảng
// function sumArray(arr) {
//   return arr.reduce((sum, num) => sum + num, 0);
// }
// console.log(sumArray([1, 2, 3, 4])); // Kết quả: 10
// console.log(sumArray([10, -5, 7]));  // Kết quả: 12

// // 2. Kiểm tra số nguyên tố
// function isPrime(num) {
//   if (num <= 1) return false;
//   for (let i = 2; i <= Math.sqrt(num); i++) {
//     if (num % i === 0) return false;
//   }
//   return true;
// }
// console.log(isPrime(7));  // Kết quả: true
// console.log(isPrime(10)); // Kết quả: false

// // 3. Đảo ngược chuỗi
// function reverseString(str) {
//   return str.split('').reverse().join('');
// }
// console.log(reverseString("hello")); // Kết quả: "olleh"
// console.log(reverseString("JavaScript")); // Kết quả: "tpircSavaJ"

// // 4. Tìm số lớn nhất trong mảng
// function findMax(arr) {
//   return Math.max(...arr);
// }
// console.log(findMax([1, 5, 3, 9, 2])); // Kết quả: 9
// console.log(findMax([-10, -3, -5]));   // Kết quả: -3

// // 5. Tính giai thừa
// function factorial(n) {
//   if (n === 0) return 1;
//   return n * factorial(n - 1);
// }
// console.log(factorial(5)); // Kết quả: 120
// console.log(factorial(0)); // Kết quả: 1

// // 6. Kiểm tra chuỗi Palindrome
// function isPalindrome(str) {
//   const reversed = str.split('').reverse().join('');
//   return str === reversed;
// }
// console.log(isPalindrome("madam")); // Kết quả: true
// console.log(isPalindrome("hello")); // Kết quả: false

// // 7. Tính Fibonacci
// function fibonacci(n) {
//   if (n <= 1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }
// console.log(fibonacci(0)); // Kết quả: 0
// console.log(fibonacci(1)); // Kết quả: 1
// console.log(fibonacci(5)); // Kết quả: 5

// // 8. Đếm số lần xuất hiện của ký tự
// function countChar(str, char) {
//   return str.split('').filter(c => c === char).length;
// }
// console.log(countChar("hello world", "o")); // Kết quả: 2
// console.log(countChar("javascript", "a")); // Kết quả: 2


const people = {
  print(age, location) {
    console.log(this.fullName + " " + age + " " + location);
  },
};
people.print(10, "TP HCM"); // undefined 10 TP HCM
//this là gì ? => people
const diep = { fullName: "Lê Mười Điệp" };
//1....call(obj ...parametter)
people.print.call(diep, 10, "TP HCM");

//2....apply(obj ...[parametter])
people.print.apply(diep, [10, "TP HCM"]);

//3....bind(obj)()...parametter)
people.print.bind(diep)(10, "TP HCM");
people.print.bind(diep, 10, "TP HCM")();