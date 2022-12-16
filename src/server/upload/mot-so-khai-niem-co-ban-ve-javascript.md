## Giới thiệu
Hiện nay javascript ngày càng trở nên phổ biến chỉ với javascript bạn có thể làm được rất nhiều các công việc khác nhau. Như lập trình phía client, lập trình server side, mobile app,... Hôm nay mình sẽ chia sẻ một số khái niệm bên trong javascript mà mọi người nên biết khi bắt đầu học Javascript.
## 1. Value vs. Reference Variable
Ví dụ 1: Block scope
```
let var1 = 'My string';
let var2 = var1;
var2 = 'My new string';
console.log(var1);
// 'My string'
console.log(var2);
// 'My new string'
```
 Ở ví dụ 1 thật ra var1 là kiểu nguyên thủy (Chuỗi), var2 được đặt bằng với giá trị Chuỗi của var1. Theo đó, việc gán lại var2 không ảnh hưởng đến var1. 
 
 Ví dụ 2:  viết lại object assignment
```
let var1 = { name: 'Jim' }
let var2 = var1;
var2.name = 'John';
console.log(var1);
// { name: 'John' }
console.log(var2);
// { name: 'John' }
```

## 2. Closure
Closure là một chức năng có quyền truy cập vào phạm vi cha, ngay cả sau khi scope đã đóng.

Ví dụ 1: Without closure
```
function getValue(){
  var a = 1
  var b = 2
  return a + b
}

var val = getValue()
console.log(val)
// Output: 3
```

Ví dụ 2: With closure
```
function newCounter(){
  var count = 0

  return function(){
    count += 1
    return count
  }
}

var counter = newCounter()

console.log(counter())
// Output: 1

console.log(counter())
// Output: 2

console.log(counter())
// Output: 3
```

Không ai có thể truy cập được count ngoài function newCounter(). Nhưng funcuton được trả về bởi newCounter vẫn có quyền truy cập count nếu chúng ta tiếp tục khai báo thêm những lần nữa. 

Điều đó có nghĩa là các biến thay đổi giá trị.

## 3. Destructuring 
Destructuring là một cú pháp cho phép bạn gán các thuộc tính của một Object hoặc một Array. Điều này có thể làm giảm đáng kể các dòng mã cần thiết để thao tác dữ liệu trong các cấu trúc này. Có hai loại Destructuring: Destructuring Objects
và Destructuring Arrays.

Ví dụ 1: Destructuring Objects
```
const obj = {
  name: 'Joe',
  food: 'cake'
}
const { name, food } = obj;
console.log(name, food);
// 'Joe' 'cake'
```
hoặc có thể mở rộng ra Nếu bạn biết React:
```
const person = {
  name: 'Eddie',
  age: 24
}
function introduce({ name, age }) {
  console.log(`I'm ${name} and I'm ${age} years old!`);
}
console.log(introduce(person));
// "I'm Eddie and I'm 24 years old!"
```

VÍ dụ 2: Destructuring Arrays
```
var a, b;
[a, b] = [1, 2]
console.log(a, b); //1 2

//or 

const [a, b] = [1, 2]
console.log(a, b); //1 2
```
## 4. Spread Operator
Đây là một trong những tính năng mới thú vị của ECMA6 của Javascript (...) là một trong những chức năng Javascript mới này. 
Điều này rất hữu ích khi chúng ta muốn copy properties của một object sang một object khác nhưng với một chút sửa đổi về giá trị của một số properties

Ví dụ 1: spread operator
```
const arr = [4, 6, -1, 3, 10, 4];
const max = Math.max(...arr);
console.log(max);
// 10
```
Ví dụ 1: rest operator
```
function myFunc(...args) {
  console.log(args[0] + args[1]);
}
myFunc(1, 2, 3, 4);
// 3
```

## 5. Identity Operator (===) vs. Equality Operator (==)
Trong một so sánh sử dụng toán tử ==, kết quả sẽ trả về true nếu hai điều được so sánh bằng nhau. 

Nhưng có một nhược điểm quan trọng: Nếu việc so sánh được thực hiện là giữa hai loại giá trị khác nhau, các loại giá trị, thì sự ép buộc kiểu sẽ xảy ra. Mỗi giá trị JavaScript thuộc về một type cụ thể. Các loại này là: Numbers, strings, Booleans, functions, và objects. Vì vậy, nếu bạn thử so sánh (xem ví dụ) một chuỗi với một số, trình duyệt sẽ cố gắng chuyển đổi chuỗi thành một số trước khi thực hiện so sánh. Tương tự, nếu bạn so sánh true hoặc false với một số, giá trị true hoặc false sẽ được chuyển đổi thành 1 hoặc 0, tương ứng. 

Ví dụ để thấy dùng == thì khó có thể đoán trước điều gì đang chờ đợi chúng ta
```
console.log(99 == "99"); // true
console.log(0 == false); // true

console.log(' \n\n\n' == 0); // true
console.log(' ' == 0); // true
```
Chính vì lẽ đó, trước điều này, hầu hết các chuyên gia JavaScript khuyên bạn luôn luôn sử dụng toán tử (===) và không bao giờ sử dụng (==). Tôi biết hiện tại hầu hết các devjs cũng đã sử dụng toán tử === để so sánh bởi vì nó không bao giờ thực hiện kiểu ép buộc, vì vậy khi so sánh thì thực hiện chính xác với các giá trị thực tế. 

Điều này có nghĩa là, bằng cách sử dụng ===, tất cả các ví dụ từ trên sẽ tạo ra kết quả chính xác:
```
console.log(99 === "99"); // false
console.log(0 === false); // false
console.log(' \n\n\n' === 0); // false
console.log(' ' === 0); // false
```

## 6. Object Comparison 
Một lỗi tôi thấy là những người mới sử dụng JavaScript so sánh trực tiếp các đối tượng. Các biến đề cập đến các objects, không phải chính các objects. Một cách để so sánh chúng thực sự là chuyển đổi các objects thành các chuỗi JSON.
```
const joe1 = { name: 'Joe' };
const joe2 = joe1;
console.log(joe1 === joe2);
// true
```
Nhưng
```
const joe1 = { name: 'Joe' };
const joe2 = { name: 'Joe' };
console.log(joe1 === joe2);
// false
```
## 7. Callback hell
Cho dù ES8 đã phát hành nhưng dấu ấn để lại vẫn thua ES7 vì có async/await Thật ra thì tóm lược lại lịch sử thì nó đi từ callback -> promise -> async/await. 

ví dụ callback
```
function myFunc(text, callback) {
  setTimeout(function() {
    callback(text);
  }, 2000);
}
myFunc('Hello world!', console.log);
// 'Hello world
```

Ví dụ về promise
```
const myPromise = new Promise(function(res, rej) {
  setTimeout(function(){
    if (Math.random() < 0.9) {
      return res('Hooray!');
    }
    return rej('Oh no!');
  }, 1000);
});
myPromise
  .then(function(data) {
    console.log('Success: ' + data);
   })
   .catch(function(err) {
    console.log('Error: ' + err);
   });
   
// If Math.random() returns less than 0.9 the following is logged:
// "Success: Hooray!"
// If Math.random() returns 0.9 or greater the following is logged:
// "Error: On no!"
```
Ví dụ Async/ await
```
const greeter = new Promise((res, rej) => {
  setTimeout(() => res('Hello world!'), 2000);
})
async function myFunc() {
  const greeting = await greeter;
  console.log(greeting);
}
myFunc();
// 'Hello world!'
```
## 8. Kết luận
Đây là những khái niệm cơ bản mà bạn cần phải biết và hiểu rõ chúng.

Tài liệu tham khảo: https://javascript.info/