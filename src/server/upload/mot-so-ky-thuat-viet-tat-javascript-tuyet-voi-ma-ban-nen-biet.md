## Lời mở đầu
Các kỹ thuật viết tắt trong bất cứ ngôn ngữ nào đều giúp code của chúng ta được gọn gàng, tối ưu và ngắn gọn hơn. Và vì ngắn gọn nên nó cũng sẽ tiết kiệm thời gian cho chúng ta. Hôm nay tôi sẽ giới thiệu tới các bạn một số cách viết tắt trong **JavaScript**, bắt đầu nhé :D. 


### 1. Toán tử ba ngôi
Nếu bạn chỉ muốn gán giá trị cho một biến dựa trên một điều kiện thì đây là một lựa chọn thay thế tuyệt vời.

```js
const age = 15;

// Longhand
let message;
if (age > 18) {
  message = "The person is an adult";
} else {
  message = "The person is not an adult";
}

// Longhand
const message =
  age > 18 ? "The person is an adult" : "The person is not an adult";
```

Với câu điều kiện kết hợp `else if` thì sao ?

``` js
const age = 15;

// Longhand
if (age > 18) {
  message = "The person is an adult";
} else if (age > 12) {
  message = "The person is a teenager";
} else {
  message = "The person is not an adult";
}

// Shorthand
const age = 15;
const message =
  age > 18
    ? "The person is an adult"
    : age > 12
    ? "The person is a teenager"
    : "The person is a child";
```

Đây là câu trả lời.

### 2. Gán giá trị mặc định với null hoặc underfined

Nếu bạn muốn gán giá trị mặc định cho một biến khi nó `null` hoặc `underfined`, bạn có thế sử dụng nullish coalescing toán tử `??` như sau
```js 
const message;

// Longhand
if (message === null || message === undefined) {
  message = "Hello";
}
console.log(message + "there");

// Shorthand
console.log((message ?? "Hello") + "there");
```

### 3. Short-Circuit Evaluation với toán tử `??`

Hiểu một cách đơn giản là hãy để những gì là `null` hoặc `undefined` ở bên trái của toán tử  `??`.

```js
functionOne = () => {
  // something here
  console.log("functionOne called!");
  return undefined;
};

functionTwo = () => {
  // something here
  console.log("functionTwo called!");
  return false;
};

functionThree = () => {
  // something here
  console.log("functionThree called!");
  return "hello!";
};

Longhand
if (functionOne() == undefined) { // functionOne called!, functionThree called!, hello!
  console.log(functionThree());
}

if (functionTwo() == undefined) { // functionTwo called!
  console.log(functionThree());
}

// Shorthand
console.log(functionOne() ?? functionThree()); // functionOne called!, functionThree called!, hello!

console.log(functionTwo() ?? functionThree());
// functionTwo called!
```

### 4. Giá trị mặc định với `??=`

Cùng giống như toán tử `??` nhưng `??=` sẽ gán luôn một giá trị cho biến nếu nó `null` hoặc `undefined`

```js
// Longhand
greetings = (partOne, partTwo) => {
  if (partTwo === null || partTwo === undefined) {
    partTwo = "!";
  }
  return partOne + partTwo;
};

console.log(greetings("Hello")); // Hello!

// Shorthand
greetings = (partOne, partTwo) => {
  partTwo ??= "!";
  return partOne + partTwo;
};

console.log(greetings("Hello")); // Hello!
```


### 5. Gián nhiều giá trị
Bạn có thể gián nhiều giá trị cùng một lúc bằng cách dùng hàm destructuring.

```js
let one, two;

// // Longhand
one = 1;
two = 2;

// // Shorthand
[one, two] = [1, 2];

// object example
person = {
  name: "John",
  age: 25,
};

// // Longhand
let name = person.name;
let age = person.age;

// // Shorthand
let { name, age } = person;
```

### 6. Gộp mảng và thêm nhiều phần tử vào mảng.

Bạn có thể gộp 2 mảng khác nhau và cũng có thể thêm các phần tử mới vào một mảng đã tồn tại.

```js
// Merging arrays
const one = [1, 2, 3];
const two = [4, 5, 6];

// Longhand
const newArray = one.concat(two);

// Shorthand
const newArray = [...one, ...two];

// Adding multiple elements
let numbers = [1, 2, 3];

// Longhand
numbers.push(4);
numbers.push(5);

// Shorthand
numbers = [...numbers, 4, 5];
```

### 7. Cú pháp Spread với Destructuring

Bạn cũng có thể sử dụng cú pháp Spread với Destructuring để gán các phần tử của một mạng cho một biến mới một cách nhanh chóng như sau.
```js
// Arrays
const numbers = [1, 2, 3, 4, 5];

// Longhand
const one = numbers[0];
const two = numbers[1];

let others = [];
others.push(numbers[2]);
others.push(numbers[3]);
others.push(numbers[4]);

// Shorthand
const [one, two, ...others] = numbers;

// Objects
person = {
  name: "John",
  age: 25,
  city: "LA",
  state: "California",
};

// Longhand
const name = person.name;
const age = person.age;
const address = { city: person.city, state: person.state };

// Shorthand
const { name, age, ...address } = person;
```

### 8. So sánh Short-Circuit với &&
Khi bạn muốn thực hiện một function kết hợp với một hoặc nhiều điều kiện cho trước(điều kiện là các điều kiện này trả về giá trị là truthy) bạn có thể dùng cách này.
```js
/ Example one
// Longhand
if (isAuthorized) {
  loadHomePage();
}

// Shorthand
isAuthorized && loadHomePage();

// Example two
// Longhand
if (x == 1 || x == 5 || x == 7) {
  functionOne();
}
// Shorthand
[1, 5, 7].includes(x) && functionOne();
```

Lưu ý nhé: Trong javascript các giá trị sau: null, undefined, '',false, 0 là falsy, còn lại tất cả các giá trị khác là truthy

### 9. Template Literals
Nếu bạn muốn nối các biến với nội dung chuỗi tính các bạn sẽ sử dụng toán tử "+". Tuy nhiên có 1 cách khác như sau.
```js
// Longhand
const message = "Welcome " + name + ".";
const url = "http://" + host + ":" + port + "/" + path;

// Shorthand
const message = `Welcome ${name}.`;
const url = `http://${host}:${port}/${path}`;
```

Bạn cũng có thể sử dụng cho các chuỗi nằm trên nhiều dòng.

```js
// Longhand
const sample =
  "Lorem ipsum dolor sit amet, consectetur\n\t" +
  "adipisicing elit, sed do eiusmod tempor incididunt\n\t" +
  "ut labore et dolore magna aliqua.";

// Shorthand
const sample = `Lorem ipsum dolor sit amet, consectetur
  adipisicing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua.`;
```

### 10. Switch Case viết tắt thì sẽ như thế nào ?
Bạn có thể dùng một object có tên hàm được liên kết với một key để thay thế cho câu lạnh switch.
```js

const something = 2;

// Longhand
switch (something) {
  case 1:
    doSomething();
    break;
  case 2:
    doSomethingElse();
    break;
  case 3:
    doSomethingElseAndOver();
    break;
}

// Shorthand
var cases = {
  1: doSomething,
  2: doSomethingElse,
  3: doSomethingElseAndOver,
};

cases[2]();
```

### 11. Arrow Functions
Việc sử dụng các hàm lồng nhau có thể gây ra việc khó hiểu khi đọc code, vậy nên chúng ta có thể sử dùng  Arrow Functions để giải quyết vấn đề này:
```js
// Longhand
function greeting(fullname) {
  console.log("Hi ", fullname);
}

setTimeout(function () {
  console.log("Load successful!");
}, 4000);

// Shorthand
greeting = (fullname) => console.log("Hi ", fullname);

setTimeout(() => console.log("Load successful!"), 4000);
```

### 12. Đối với các vòng lặp
Thay vì sử dụng vòng lặp truyền thống để lặp qua các phần tử của mảng chúng ta có thể sử dụng forEach().
```js

const languages = ["C", "C++", "Java", "C#", "JavaScript"];

// Longhand
for (let i = 0; i < languages.length; i++) {
  console.log(languages[i]); // C, C++, Java, C#, JavaScript
}

// Shorthand
languages.forEach((language) => {
  console.log(language); // C, C++, Java, C#, JavaScript
});
```

Nếu chỉ muốn lấy ra các key của mảng hoặc đối tượng các bạn có thể dùng for...in

```js
// Arrays
const languages = ["C", "C++", "Java", "C#", "JavaScript"];

for (let k in languages) {
  console.log(k); // 0, 1, 2, 3, 4
}

// Objects
const person = { name: "John", country: "USA", city: "LA" };

for (let key in person) {
  console.log(key); // name, country, city
}
```


### 13. Khai báo biến
Thay vì khai báo từng biến riêng biệt, bạn có thể làm theo cách sau để tiết kiệm thời gian và số dòng code.

```js    
// Longhand
let name;
let age;
let place = "LA";

// Shorthand
let name,
  age,
  place = "LA";
```

### 14. Lấy giá trị của đối tượng vào mảng
```js
const credits = { name: "John", city: "LA", age: 25 };

// Longhand
let arrOne = [];
for (let key in credits) {
  arrOne.push(credits[key]);
}

// Shorthand
const arrTwo = Object.values(credits);
```

### 15. Chuyển đổi từ string sang number
Bạn có thể chuyển đổi từ string sang number bằng cách sử dụng toán tử + như sau
```js
// Longhand
const one = parseInt("10");
const two = parseFloat("10.25");

// Shorthand
const three = +"10"; // converts to int data type
const four = +"10.25"; // converts to float data type
```

## Lời kết.
Trên đây là một số các ký thuật để code nhanh hơn trong Javacript mà tôi thấy rất hữu ích. Hy vọng các kỹ thuật trên cũng hữu ích khi được sử dụng trong dự án của các bạn. Cảm ơn vì đã đọc, chúc các bạn một ngày vui vẻ!

## Nguồn tham khảo
https://javascript.plainenglish.io/30-awesome-javascript-shorthand-techniques-that-are-good-to-know-6590545ced3d