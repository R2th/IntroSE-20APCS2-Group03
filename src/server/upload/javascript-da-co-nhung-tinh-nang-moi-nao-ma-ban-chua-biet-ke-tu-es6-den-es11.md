Xin chào các bạn,

Có thể bạn đã biết, sau 6 năm tưởng chừng như tạm ngừng hoạt động từ bản ES5 ra đời năm 2009, thì vào tháng 6/2015, đã có một bản cập nhật quan trọng của JavaScript mang lại rất nhiều tính năng mới. Kể từ thời điểm đó, mỗi năm chúng ta đều đón nhận một version mới với một loạt các tính năng mới được cho là đem lại rất nhiều lợi ích, hiệu quả trong công việc của developer.  TÍnh đến thời điểm hiện tại, ES12 hay ES2021 chuẩn bị sắp phát hành, cùng với đó là ES11 đã được coi là một phiên bản cũ. Từng đó cũng đủ cho chúng ta cảm thấy những phương thức, cách hoạt động thay đổi và nâng cấp một cách chóng mặt. Vậy bạn đã sử dụng hết tất thẩy những tính năng đó chưa? Thì trong bài viết này, chúng ta sẽ lần lượt điểm qua những tính năng trước khi kết thúc năm 2020 nhé! Let's go :muscle::muscle:

## ES6 (ECMAScript 2015)
### 1. Arrow functions (=>)
```
// traditional function expression
var numbers = [2, 6, 40];
var twiceNum = numbers.map(function(number) { return number*2 })
// arrow functional
var numbers = [2, 6, 40];
var twiceNum = numbers.map((number) => number*2);
// lexical this
var greenBtn = document.getElementById(‘greenBtn’);
greenButton.addEventListener(‘click’, function() {
 this.style.backgroundColor = “red”; // no more binding
})
```
### 2. Classes
```
// Class
class Person {
 constructor(firstName, lastName, age) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.age = age;
 }
sayHi() {
   return ‘Hi, my name is ${firstName}. Nice to meet you.’;
 }
}
```
### 3. Template strings
```
var name = ‘Peter’, city = ‘London’;
// Before ES6
var greeting = "Hello, my name is " + name + ". I am from " + city + ".";
// After ES6 
var greeting = ‘Hello, my name is ${name}. I’m from ${city}.‘
```
### 4. Let and Const
```
// Let — variable is available only in the block of code
function calculate(x) {
 var y = 0;
 if (x > 10) { 
// let y is only available in this block of code
   let y = 30;
   return y;
 }
 return y;
}
```
### 5. Promises
```
const checkResult = () => new Promise(resolve, reject) => {
setTimeout(resolve, 500)} 
checkResult()
 .then((result) => { console.log(result); }) 
 .catch((error) => { console.log(error); })
```
## ES7 (ECMAScript 2016)
### 1. Array.prototype.includes
```
var fruits = ['banana', 'apple', 'grape', 'nut', 'orange'];
var favoriteFruit = 'banana';

// Before ES7
function isFruit(fruit) {
 if (fruits.indexOf(fruit) !== -1) {
   return true;
 } else {
   return false;
 }
}
isFruit(favoriteFruit); // returns true

// After ES7
fruits.includes(favoriteFruit); // returns true
```
### 2. Exponentiation Operator
```
// Before ES7 (loop case) 
function calculate(num, exponent) { 
   var res = 1; 
   for (var i = 0; i < exponent; i++) { 
     res *= num; 
   } 
   return res;
}

// After ES7
const calculate = (num, exponent) => num ** exponent;
```

## ES8 (ECMAScript 2017)
### 1. Object.values() and Object.entries()
```
var person = {
 name: ‘Jenny’,
 age: 24,
 country: ‘UK’,
 city: ‘London’,
}

// Object.values()
var arrJenny = Object.values(person); // returns [‘Jenny’, 24, ‘UK’, ‘London’];

// Object.entries()
var arrJennyEntries = Object.entries(person); // returns 
```

### 2. String.prototype.padEnd() and String.prototype.padStart()
```
var string = ‘Alice’; 
// padStart() — we assume our string needs to have 10 characters 
string.padStart(10, ‘o’); // returns ‘oooooAlice’

// padEnd() 
string.padEnd(10, ‘o’); // returns ‘Aliceooooo’;
```

### 3. Async function (async/await)
```
function delayResult() {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(‘Done’);
   }, 5000)
 })
}

async function getResult() {
 var result = await delayResult();
 return result;
}
getResult();
```

## ES9 (ECMAScript 2018)
### 1. Asynchronous iteration
```
for await (let book of books) { 
 console.log(book) 
};
```

### 2. Rest operator
```
const fruits = { orange: 1, apple: 10, banana: 4, } 
const { orange, …rest } = fruits; 
console.log(rest); // { apple: 10, banana: 4 };

// in the function
function getFruits(apple, …rest) { 
 return rest.banana;
}
```

### 3. Promise.prototype.finally
```
const checkResult = () => new Promise(resolve, reject) => {setTimeout(resolve, 500)}
checkResult() 
 .then((result) => { console.log(result); }) 
 .catch((error) => { console.log(error); }) 
 .finally(() => { console.log(‘Promise finished!’) })
```

## ES10 (ECMAScript 2019)
### 1. Optional Catch Binding
```
// Before ES10
try {
  doSomethingThatMightThrow();
} catch (exception) {
  //     ^^^^^^^^^
  // We must name the binding, even if we don’t use it!
  handleException();
}

// After ES10
try {
  doSomethingThatMightThrow();
} catch { // → No binding!
  handleException();
}
```

### 2. Object.fromEntries()
```
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }
```

### 3. Array.flat()
```
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 4. Array.flatMap()
```
let arr1 = ["it's Sunny in", "", "California"];

arr1.map(x => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in", "", "California"]
```

### 5-6. String.trimStart() & String.trimEnd()
#### String.trimStart()
```
var greeting = '   Hello world!   ';

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trimStart());
// expected output: "Hello world!   ";
```

#### String.trimEnd()
```
var greeting = '   Hello world!   ';

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trimEnd());
// expected output: "   Hello world!";
```
### 7. globalThis Object
```
const global = Function('return this')();

const getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
}

const global = getGlobal(); // will return window object in the browser

// array usage example
const numbers = new global.Array(1, 2, 3);
console.log(numbers); // outputs [1, 2, 3];
```

##  ES11 (ECMAScript 2020)
### 1. Nullish coalescing
Đầu tiên phải nhắc đến nullish coalescing hay toán tử `??`. 
Theo định nghĩa của MDN, `??` là một toán tử logic sẽ trả về vế phải nếu vế trái là null hoặc undefined. Do đó bạn có thể dùng nó để short-circuit như thế này.
```
function a() {
  return null
}
function b() {
  return 1
}
function c() {
  return 2
}

console.log(a() ?? c()) // 2
console.log(b() ?? c()) // 1
```

### 1. Optional Chaining `?`
Trước đây việc truy cập vào các key của object sẽ bị lỗi nếu key đó không tồn tại, hoặc cách tốt hơn là trước khi truy cập phải kiểm tra key đó có tồn tại hay không. Nhưng với ES11 thì bạn có thể xử lý đơn giản bằng toán tử `?` .

```
const player = {
    details: {
        name: {
            firstName: "Quang",
            lastName: "Hai",
	    age: 20
       }
    },
    jobs: [
        "dev js",
        "dev php"
    ]
}

const playerFirstName = player?.details?.name?.firstName;
```

### 2. Private fields #
 Bằng cách thêm `#` vào trước tên thuộc tính hay phương thức, chúng sẽ chỉ có thể được truy cập từ bên trong class đó mà thôi.
 
```
class Foo {
  #b = 15;
  a = 10;
  get() {
    return this.#b;
  }

  increment() {
    ++this.#b;
  }
}
const obj = new Foo();

obj['#b']; // undefined
obj.a = 10;
obj.hasOwnProperty('#b'); // false
```

### 3. BigInt
 BigInt là một đối tượng built-in object mới được ra mắt trong ES11, dùng để biểu diễn các số nguyên lớn hơn 2 ^ (53) –1. Trong Javascript có đối tượng Number rồi, nhưng nó bị giới hạn trong phạm vi quá hẹp, vì vậy BigInt ra đời nhằm giải quyết vấn đề này.

Hãy xem giới hạn giá trị của Number:
```
console.log(Number.MAX_SAFE_INTEGER);
//9007199254740991
const max = Number.MAX_SAFE_INTEGER;
console.log(max +1);
//9007199254740992  -> Correct value!
console.log(max +10);
//9007199254741000  -> Incorrect value! (1001)
```
Ở ví dụ thứ 3 dữ liệu quá lớn, vì vậy ta có thể giải quyết bằng cách sử dụng BigInt để thay thế.
```
const myBigNumber = 9007199254740991n;
console.log(myBigNumber +1n);
//9007199254740992n  -> Correct value!
console.log(myBigNumber +10n);
//9007199254741001n  -> Correct value!
//Note:
console.log(myBigNumber +10);
//Error: you cannot mix BigInt and other types, use explicit //conversions.
//Correct way: You have to add the letter 'n' on the end of the //number
```
## Kết Luận
Tadaa, đã đến kết bài rồi. Tuy là kết luận nhưng vẫn còn một số tính năng nữa của ES6 đến ES11 mình chưa liệt kê hết ở đây, các bạn hãy tìm hiểu thêm nhé. Kể từ ES7 trở đi thì những cập nhật chỉ mang tính bổ sung nhỏ, khác hoàn toàn với ES6 nên rất dễ dàng trong việc nâng cấp kiến thức. Hãy đón nhận những bài viết tiếp theo của mình nhé.

Xin cảm ơn !