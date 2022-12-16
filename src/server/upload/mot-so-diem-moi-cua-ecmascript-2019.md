**ECMAScript  (ES)** là ngôn ngữ kịch bản được tạo ra nhằm chuẩn hóa ngôn ngữ **Javascript** và được phát triển hàng năm với các tính năng mới, hẳn chúng ta đều khá quen thuộc với phiên bản **ES6** - phiên bản nổi tiếng với hàng loạt các thuộc tính như **arrow function, Promise...** trong bài viết này mình sẽ giới thiệu một số tính năng sẽ được thêm vào trong phiên bản **ECMA Script 2019**.  
#### Array.flat()
**Array.flat()** sẽ trả về giá trị là một mảng mới với bất kỳ các **array** con được **"làm phẳng"**, hiểu đơn giản là nếu ta có **array** chứa **array**, **Array.flat()** sẽ làm phẳng cấu trúc trên thành một **array**, ví dụ:  
```js
let arr = [1, 2, 3, [4, 5, 6]];
arr.flat(); // [1, 2, 3, 4, 5, 6]
```
nếu có nhiều hơn 2 lớp **array**
```js
let arr = [1, 2, [3, 4, [5, 6]]]
arr.flat(); // [1, 2, 3, 4, Array(2)]
arr.flat().flat(); // [1, 2, 3, 4, 5, 6]
arr.flat(2); // [1, 2, 3, 4, 5, 6]
```
đối với trường hợp cần "làm phẳng" toàn bộ **array** có nhiều lớp **Array.flat()**, ta có thể thêm vào tham số đặc biệt như sau:  
```js
let arr = [1, 2, [3, 4, [5, 6, [7, 8]]]]
arr.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8]
````
#### Array.flatMap()
**flatMap()** khá tương tự với thuộc tính **map** của phiên bản **ES6**, đầu tiên sẽ **loop** mỗi phần tử của **array** sau đó "làm phẳng" kết quả nhận được thành một **array** duy nhất, có thể hiểu **flatMap()** là một kết hợp của **map** vào **flatMap()**.  Dưới đây là ví dụ
```js
let arr = [1, 2, 3];

arr.map(n => [n, n * n]);
// [Array(2), Array(2), Array(2)]
// 0: (2)[1, 1]
// 1: (2)[2, 4]
// 2: (2)[3, 9]

arr.flatMap(n => [n, n * n]);
// [1, 1, 2, 4, 3, 9]
```
#### String.trimStart(), String.trimEnd()  
**String.trimStart()** và **String.trimEnd()** cho phép ta sử dụng hàm quen thuộc **trim** với thêm lựa chọn chỉ ở một phía mà thôi.  
```js
let str = '   string   '
console.log(str.trimStart())
// 'string   '
```
```js
let str = '   string   '
console.log(str.trimEnd())
// '   string'
```
#### Optional Catch Binding
Đây là thuộc tính cho phép chúng ta sử dụng **try/catch** mà không cần có tham số **error** trong khối **catch**.  
**try/catch**  hiện tại  
```js
try {
  // code
}
catch (err) {
  // handle error
}
```
**try/catch** phiên bản **ES2019**
```js
try {
  // code
}
catch {
  // handle error
}
```
#### Object.fromEntries()
thuộc tính này sẽ tạo ra một **object** hoặc biến đổi các cặp **key-value** thành một **object**, và chỉ cho phép kiểu dữ liệu mang tính **lặp đi lặp lại**  
```js
let entries = new Map([["firstName", "Minh"], ["age", 30]]);

console.log(Object.fromEntries(entries));
// { firstName: 'Minh', age: 30 }
```
#### Symbol.description
đây là một thuộc tính theo dạng **read-only** trả về một **string** mô tả đối tượng **Symbol**.  
ví dụ
```js
let newSymbol = 'A Symbol'
let symbolObject = Symbol(newSymbol)
console.log(symbolObject) // Symbol(newSymbol)

console.log(symbolObject.description); // "A Symbol"
```

#### tham khảo
[JavaScript: What’s new in ECMAScript 2019 (ES2019)/ES10?](https://medium.com/@selvaganesh93/javascript-whats-new-in-ecmascript-2019-es2019-es10-35210c6e7f4b)