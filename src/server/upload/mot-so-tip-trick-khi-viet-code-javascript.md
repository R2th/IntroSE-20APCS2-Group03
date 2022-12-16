# 1. Tạo mảng số nằm trong một khoảng
```js
let start = 1900,
    end = 2000;
[...new Array(end + 1).keys()].slice(start);
// [ 1900, 1901, ..., 2000]

Array.from({ length: end - start + 1 }, (_, i) => start + i);
```
# 2. Sử dụng mảng các giá trị là đối số cho function
Có những trường hợp mà bạn cần lấy các giá trị của mảng, rồi truyền chúng như đối số của function. Với ES6, bạn có thể sử dụng `spread operator (...) `và trích xuất mảng từ ` [arg1, arg2]` thành `(arg1, arg2)`
```js
const parts = {
  first: [0, 2],
  second: [1, 3],
};

["Hello", "World", "JS", "Tricks"].slice(...parts.second);
// ["World", "JS", "Tricks"]
```
Bạn có thể sử dụng nó với bất cứ function nào.
# 3. Sử dụng đối số của các phương thức Math với nhiều giá trị
Khi chúng ta cần tìm Math.max hoặc Math.min của các số trong mảng, chúng ta thực hiện như dưới đây:
```js
// Tìm phần tử có vị trí y lớn nhất
const elementsHeight =  [...document.body.children].map(
  el => el.getBoundingClientRect().y
);
Math.max(...elementsHeight);
// 474

const numbers = [100, 100, -1000, 2000, -3000, 40000];
Math.min(...numbers);
// -3000
```
# 4. Hợp nhất / làm phẳng mảng trong mảng

Phương thức để làm phẳng cho Array là `Array.flat`, tuy nhiên, đối số của nó là độ sâu mà bạn cần làm phẳng (mặc định: 1). Nhưng nếu bạn không biết độ sâu  bằng bao nhiêu thì sao ? Vậy lúc này, hãy đặt `Infinity` làm đối số. 
```js
const arrays = [[10], 50, [100, [2000, 3000, [40000]]]];
arrays.flat(Infinity);
// [ 10, 50, 100, 2000, 3000, 40000 ]
```
# 5. Ngăn chặn code bị crash
Việc có những hành vi không dự đoán được trong code (ví dụ như biến có thể bị null, hoặc khác với kiểu mà bạn viết trong code) là điều không tốt, nhưng nếu điều đó xảy ra, bạn cần xử lý nó. 

Ví dụ: 
Một lỗi phổ biến như TypeError, khi bạn cố gắng lấy property của undefined/null.

**Note**: Sử dụng như ví dụ dưới nếu dự án của bạn chưa support optional chaining. Bạn có thể tìm hiểu thêm về optional chaining ở [đây](https://viblo.asia/p/toan-tu-optional-chaining-trong-javascript-1VgZv8Wr5Aw)

```js
const found = [{ name: "Alex" }].find(i => i.name === 'Jim');
console.log(found.name);
// TypeError: Cannot read property 'name' of undefined
```
Bạn có thể tránh lỗi này bằng cách
```js
const found = [{ name: "Alex" }].find(i => i.name === 'Jim') || {};
console.log(found.name);
// undefined
```

# 6. Truyền đối số là template literals 
Ví dụ tốt nhất sử dụng tính năng này là `styled-components`, ở ES6 bạn có thể truyền template literals như là đối số của function mà không cần dấu ngoặc.

```js
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
`
```

```js
const makeList = (raw) =>
  raw
    .join()
    .trim()
    .split("\n")
    .map((s, i) => `${i + 1}. ${s}`)
    .join("\n");

makeList`
Hello, World
Hello, World
`;
// 1. Hello
// 2. World
```
# 7. Hoán đổi biến
Với cú pháp Destructuring assignment bạn có thể dễ dàng tráo đổi các biến 
```js
let a = "hello";
let b = "world";

// Wrong
a = b
b = a
// { a: 'world', b: 'world' }

// Correct
[a, b] = [b, a];
// { a: 'world', b: 'hello' }
```
Giải pháp này sẽ bị sai trong trường hợp thêm biến thứ 3 :(

# 8. Sắp xếp theo thứ tự alphabetical
Gỉa sử bạn cần sắp xếp một chuỗi theo bảng chữ cái của ngôn ngữ đó. Nhưng bạn lại không rành về ngôn ngữ đó. Lúc này, hãy
sử dụng đúng phương thức để đảm bảo rằng nó được sắp xếp đúng thứ tự

Ví dụ. Bảng chữ cái Deutsche

```js
// Wrong
["a", "z", "ä"].sort((a, b) => a - b);
// ['a', 'z', 'ä']

// Correct
["a", "z", "ä"].sort((a, b) => a.localeCompare(b));
// [ 'a', 'ä', 'z' ]
```

# 9. Loại trừ các giá trị falsy trong mảng
```js
const collection = [obj1, obj2, undefined, obj3, undefined];
const cleanCollection = collection.filter(Boolean);
// [obj1, obj2, obj3]
```

`Boolean() ` sẽ trả về true cho những giá trị truthy và false cho những giá trị falsy (`null`, `undefined`, `0`, `'',` `false`).

**Note:** `[] `và `{}`  không phải là các giá trị falsy
```js
const collection = [obj1, obj2, {}, obj3, undefined];
const cleanCollection = collection.filter(Boolean);
// [obj1, obj2, {}, obj3]
```
# 10. Che giấu chuỗi
Mẹo cuối cùng là về việc che các chuỗi.
Chúng ta cần giấu đi tất cả các ký tự trừ 3 ký tự cuối cùng của chuỗi. Lúc này, chũng ta sẽ chỉ lấy 3 ký tự từ cuối của nó `substr (-3)`,  và điền độ dài còn lại bằng bất kỳ ký hiệu nào (ví dụ *)
```
const password = "hackme";
password.substr(-3).padStart(password.length, "*");
// ***kme
```


Bài viết đến đây là hết. Cảm ơn các bạn đã theo dõi, hy vọng bài viết sẽ giúp ích cho các bạn trong công việc 🎉

Nguồn: https://dev.to/gigantz/9-javascript-tips-tricks-to-code-like-a-wizard-559i