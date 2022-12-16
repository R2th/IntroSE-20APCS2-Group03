![](https://images.viblo.asia/dcf5fa17-11cf-4437-a93f-a7eb8c97e7d9.png)
ES10 hiện tại vẫn chỉ là một bản nháp nhưng hầu hết các tính năng của ES10 đã được triển khai trên trình duyện Chrome ngoại trừ Object.fromEntries. Và trong bài viết tháng này thì mình sẽ tìm hiểu về ES10/ES2019. Thú thực thì ES10 là cuộc cải cách không có nhiều sự bứt phá như ES6 nhưng nó cũng có những điều thú vị riêng của nó. Cùng khám phá nhé!
### BigInt — Arbitrary precision integers
`BigInt` là một kiểu dữ liệu nguyên thủy mới được sử dụng để biểu diễn các số nguyên có giá trị lớn hơn 2^53 và đây là số Javascrip lớn nhất có thể biểu diễn.
```Javascrip
const x = Number.MAX_SAFE_INTEGER;
// ↪ 9007199254740991, this is 1 less than 2^53

const y = x + 1;
// ↪ 9007199254740992, ok, checks out

const z = x + 2
// ↪ 9007199254740992, wait, that’s the same as above!
```
Một số `BigInt` được tạo bằng cách thêm `n` vào cuối chữ số hoặc có thể gọi hàm tạo như ví dụ dưới đây:
```
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n

const hugeButString = BigInt('9007199254740991');
// ↪ 9007199254740991n
```
Đây là một  kiểu dữ liệu nguyên thủy mới:
```
typeof 123;
// ↪ 'number'
typeof 123n;
// ↪ 'bigint'
```
Kiểu `Number` và `BigInt` vẫn được so sánh như bình thường:
```
42n === BigInt(42);
// ↪ true
42n == 42;
// ↪ true
```
Nhưng các phép toán phải cùng kiểu dữ liệu:
```
20000000000000n / 20n
// ↪ 1000000000000n

20000000000000n / 20
// ↪ Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
```
### string.prototype.matchAll()
`matchAll()` là hàm được xây dựng để trả về tất cả những kết quả phù hợp. Phương thức này hoạt động giống `match()` với global flag `/g` để xác định vị trí của kết quả được trả về trong chuỗi.
Cùng so sánh qua các ví dụ bên dưới:
```
const searchString = 'olololo';

// it returns the first occurrence with additional information about it
searchString.match(/o/);
// ↪ ["o", index: 0, input: "olololo", groups: undefined]

// it returns an array of all occurrences without additional information
searchString.match(/o/g);
// ↪ ["o", "o", "o", "o"]

// it returns an iterator
searchString.matchAll(/o/);
// ↪ {_r: /o/g, _s: "olololo"}

// The iterator returns each subsequent occurrence with detailed information,
// as if we were using .match without a global flag.
for (const item of searchString.matchAll(/o/)) {
  console.log(item);
}
// ↪ ["o", index: 0, input: "olololo", groups: undefined]
// ↪ ["o", index: 2, input: "olololo", groups: undefined]
// ↪ ["o", index: 4, input: "olololo", groups: undefined]
// ↪ ["o", index: 6, input: "olololo", groups: undefined]
```
Đối số của `matchAll()` phải là một biểu thức chính quy, nếu không sẽ raise exception.
```
'olololo'.matchAll('o');
// ↪ Uncaught TypeError: o is not a regexp!
```
### Array.flat() & Array.flatMap()
Như tên gọi của phương thức `.(flat)`, mảng được trả về là mảng ban đầu sau khi được làm phẳng. Nếu không có đối số thì mặc định `depth` là 1. Theo dõi ví dụ để tường minh hơn nhé!
```
const animals = [['🐕', '🐶'], ['😺', '🐈']];

const flatAnimals = animals.flat();
// same as: const flatAnimals = animals.flat(1);

console.log(flatAnimals);

// ['🐕', '🐶', '😺', '🐈']
```
Chúng ta có thể làm phẳng một mảng có `depth` tùy ý với `Infinity`:
```
const animals = [['🐕', '🐶'], ['😺', '🐈', ['😿',['🦁'], '😻']]];

const flatAnimals = animals.flat(Infinity);

console.log(flatAnimals);
// ['🐕', '🐶', '😺', '🐈', '😿', '🦁', '😻']
```
Còn với `.flatMap()` thì sao? Đó là sự kết hợp của 2 phương thức `map()` và `flat()` với `depth` bằng 1. Hay nói cách khác là mỗi giá trị của mảng sẽ được `map`sang một mảng mới và `flat` với `depth` bằng 1.
```
const animals = ['🐕', '🐈', '🐑', '🐮'];
const noises = ['woof', 'meow', 'baa', 'mooo'];

const mappedOnly = animals.map((animal, index) => [animal, noises[index]]);
const mappedAndFlatten = animals.flatMap((animal, index) => [animal, noises[index]]);

console.log(mappedOnly);
// [['🐕', 'woof'], ['🐈', 'meow'], ['🐑', 'baa'], ['🐮', 'mooo']

console.log(mappedAndFlatten);
// ['🐕', 'woof', '🐈', 'meow', '🐑', 'baa', '🐮', 'mooo']
```
### String.trimStart() & String.trimEnd()
`.trimStart()` loại bỏ space ở đầu chuỗi và `.trimEnd()` thì ngược lại xóa space ở cuối chuỗi .
```
let greeting = "     Space around     ";
greeting.trimEnd();   // "     Space around";
greeting.trimStart(); // "Space around     ";
```
### Object.fromEntries()
`.fromEntries()` là phương thức reverse lại `.entries()`. Phương thức này cho phép nhận một cặp key-value thành một object.
```
let obj = { apple : 10, orange : 20, banana : 30 };
let entries = Object.entries(obj);
entries;
(3) [Array(2), Array(2), Array(2)]
 0: (2) ["apple", 10]
 1: (2) ["orange", 20]
 2: (2) ["banana", 30]
let fromEntries = Object.fromEntries(entries);
{ apple: 10, orange: 20, banana: 30 }
```
### JSON.stringify()
Nếu nhưng trước đây khi sử dụng `JSON.stringifly()` hay trả về ill-formed Unicode thì nay nó đã được loại bỏ.`JSON.stringify()` có thể trả về các chuỗi không có trong bộ mã `UTF-8` 
```
// Non-BMP characters still serialize to surrogate pairs.
JSON.stringify('𝌆')
// ↪ '"𝌆"'
JSON.stringify('\uD834\uDF06')
// ↪ '"𝌆"'

// Unpaired surrogate code units will serialize to escape sequences.
JSON.stringify('\uDF06\uD834')
// ↪ '"\\udf06\\ud834"'
JSON.stringify('\uDEAD')
// ↪ '"\\udead"'
```
Vì vậy, chuỗi `\uDF06\uD834` sau khi xử lý với `JSON.stringify()` biến thành `\\udf06\\ud834`. Tuy nhiên, việc trả về các chuỗi Unicode không hợp lệ như vậy là không cần thiết, bởi vì các chuỗi JSON có thể bao gồm các chuỗi thoát Unicode.
### Function.toString()
Phuơng thức này sẽ chuyển đổi tất cả mã nguồn của hàm về dạng string.
```
// User-defined function
function () { console.log('My Function!'); }.toString();
// ↪ function () { console.log('My Function!'); }

// Embedded object method
Number.parseInt.toString();
// ↪ function parseInt() { [native code] }

// Function with context binding
function () { }.bind(0).toString();
// ↪ function () { [native code] }

```

### catch
Từ ES10 chúng ta đã có thể không cần xác định exception trong catch nữa.
```
function isValidJSON(text) {
  try {
    JSON.parse(text);
    return true;
  } catch { // has no argument
    return false;
  }
}
```
### globalThis
```
var getGlobal = function () { 
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 

var globals = getGlobal(); 

if (typeof globals.setTimeout !== 'function') { 
  // no setTimeout in this environment! 
}
```
Trước ES10 thì bạn sẽ phải viết method như bên trên để có được một globalObject. Nhưng ES10 đã cung cấp phương thức `globalThis` để có thể truy cập các globalObject trên các platform khác nhau. Không giống như `self` hay `window`, bạn có thể truy cập globalObject một cách nhất quán mà không cần phải biết mã nào đang được chạy trong môi trường nào.

```Ejs
// Access global array constructor
globalThis.Array(0, 1, 2);
⇨ [0, 1, 2]
// Similar to window.v = { flag: true } in <= ES5
globalThis.v = { flag: true };
console.log(globalThis.v);
⇨ { flag: true }
```
<br><br>
### Kết
Còn nhiều điều thú vị khác của ES10 mà mình chưa tìm hiểu hết. Mong rằng qua bài viết này cũng giúp các bạn nhìn thấy vài điều khác bọt trong ES10. Thân ái!
<br><br>
Tài liệu tham khảo:
1. [blog.larapulse.com](https://blog.larapulse.com/es-2015/ecmascript-10)
2. [developer.mozilla.org](https://developer.mozilla.org)
3. [medium.freecodecamp.org](https://medium.freecodecamp.org/the-complete-guide-to-es10-features-5fd0feb9513a)