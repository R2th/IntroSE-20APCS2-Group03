# Giới thiệu
Nếu bạn có một mảng các đối tượng cần sắp xếp theo một thứ tự nhất định, rất có thể bạn tìm đến một thư viện JavaScript. Tuy nhiên, trước khi thực hiện, hãy nhớ rằng bạn có thể thực hiện 1 số cách sắp xếp khá đơn giản với hàm Array.sort.

Để làm theo bài viết này, bạn sẽ cần có kiến thức cơ bản về JavaScript, chẳng hạn như khai báo biến, viết hàm và các câu điều kiện. 
# Sắp xếp mảng đơn giản
Theo mặc định, hàm JavaScript Array.sort sẽ convert từng phần tử trong mảng thành một chuỗi và so sánh chúng theo [Unicode code point](https://en.wikipedia.org/wiki/Code_point).
```javascript
var baz = [8, 3, 6, 'boo', 'toru', 'chen'];
baz.sort(); // returns [3, 6, 8, 'boo', 'chen', 'toru']

var bar = [3, 12, 21, function(){}, {key: 'value'}];
bar.sort(); // returns [ 12, 21, 3, { key: 'value' }, [Function] ]
```
Bạn có thể đặt ra câu hỏi tại sao 21 lại xếp trước 3. Nó xảy ra là vì mỗi phần tử của mảng sẽ được convert thành string trước, và `"21"` sẽ đứng trước `"3"` trong bảng Unicode.
Điều đáng lưu ý là không giống như nhiều hàm JavaScript array khác, Array.sort thực sự làm thay đổi mảng mà nó đã sắp xếp.
```javascript
var baz = ['hello world', 32, 8, 24, 15];
baz.sort(); // mảng baz đã được thay đổi
console.log(baz); // shows [15, 24, 32, 8, "hello world"]
```

Để tránh trường hợp này, bạn có thể tạo một thực thể của mảng được sắp xếp và sửa đổi để thay thế mảng.
```javascript
var baz = ['hello world', 32, 8, 24, 15];
var newBaz = [...baz].sort(); // Một thực thể mới của mảng baz được tạo và được sắp xếp
console.log(baz); // "hello world", 32, 8, 24, 15]
console.log(newBaz); // [15, 24, 32, 8, "hello world"]
```

Chỉ sử dụng Array.sort sẽ không hữu ích cho việc sắp xếp một mảng các đối tượng. Rất may, hàm lấy tham số tùy chọn `compareFunction` làm cho các phần tử mảng được sắp xếp theo giá trị trả về của hàm so sánh.
# Sử dụng function compare để sắp xếp
Gọi `a` và `b` là 2 phần tử được so sánh bằng hàm so sánh.  Nếu giá trị trả về của hàm so sánh là:
- Nhỏ hơn 0 - `a` sẽ đứng trước `b`
- Lớn hơn 0 - `b` sẽ đứng trước `a`
- Bằng 0 - `a` và `b` sẽ không thay đổi vị trí đối với nhau.

Hãy xem ví dụ đơn giản với 1 mảng số:
```javascript
var baz = [1, 2, 30, 4];

function compare(a, b){
  if (a &gt; b) return 1;
  if (b &gt; a) return -1;

  return 0;
}

baz.sort(compare);
// =&gt; 1, 2, 4, 30
```

Bạn cũng có thể sửa code trên bằng cách lấy hiệu của `a` và `b`:
```javascript
function compare(a, b){
  return a - b;
}
```

Nó sẽ là lựa chọn tốt nếu bạn sử dụng arrow function:
```javascript
baz.sort((a, b) =&gt; a - b);
```
Bạn có thể tìm hiểu thêm về arrow function của ES6 [ở đây](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/).
# Sắp xếp mảng đối tượng trong JavaScript
Ví dụ mình có 1 mảng các đối tượng như sau:
```javascript
var book = [
  { type: 'Van hoc', name: 'Khong gia dinh', quantity: 2},
  { type: 'Tieu thuyet', name: 'Yourname', quantity: 3},
  { type: 'Ki nang song', name: 'Tony buoi sang', quantity: 1}
];
```

Bạn có thể sử dụng hàm `compare` để sắp xếp mảng đối tượng theo `genre`:
```javascript
function compare(a, b) {
  // Sử dụng toUpperCase() để chuyển các kí tự về cùng viết hoa
  var typeA = a.type.toUpperCase();
  var typeB = b.genre.toUpperCase();

  let comparison = 0;
  if (typeA &gt; typeB) {
    comparison = 1;
  } else if (typeA &lt; typeB) {
    comparison = -1;
  }
  return comparison;
}

bands.sort(compare);

/* returns [
{ type: 'Ki nang song', name: 'Tony buoi sang', quantity: 1},
{ type: 'Tieu thuyet', name: 'Yourname', quantity: 3},
{ type: 'Van hoc', name: 'Khong gia dinh', quantity: 2}
] */
```

Để đảo ngược thứ tự sắp xếp, bạn chỉ cần đảo ngược giá trị trả về của hàm `compare`:
```javascript
function compare(a, b) {
  ...

  //đảo ngược giá trị bằng cách nhân với -1
  return comparison * -1;
}
```
# Tạo function Dynamic sorting
Giờ thì mình có thể tạo 1 hàm dynamic để việc sorting trở nên linh hoạt hơn. Bạn có thể sử dụng để sắp xếp một mảng các đối tượng, có giá trị là chuỗi hoặc số. Hàm này có 2 tham số - `key` và `order` để  biết là sắp xếp bằng key nào và order theo thứ tự gì.
```javascript
var book = [
  { type: 'Van hoc', name: 'Khong gia dinh', quantity: 2},
  { type: 'Tieu thuyet', name: 'Your name', quantity: 3},
  { type: 'Ki nang song', name: 'Tony buoi sang', quantity: 1}
];

// hàm sắp xếp động
function compareValues(key, order = 'asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // nếu không tồn tại
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA &gt; varB) {
      comparison = 1;
    } else if (varA &lt; varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}
```
Và bạn chỉ việc sử dụng nó như sau:
```javascript
// Sắp xếp theo name, mặc định là tăng dần
book.sort(compareValues('name'));
```
```javascript
// Sắp xếp theo name và giảm dần
book.sort(compareValues('name', 'desc'));
```
```javascript
// Sắp xếp theo quantity
book.sort(compareValues('quantity', 'desc'));
```
# String.prototype.localeCompare()
Trong ví dụ ở trên, mình muốn sắp xếp mảng của đối tượng với giá trị là các chuỗi hoặc số. Tuy nhiên, nếu bạn chỉ xử lí các đối tượng có giá trị là chuỗi, bạn có thể sử dụng phương thức `localeCompare` của JavaScript.

Phương thức `string.localeCompare(param)` trả về 1 number, nó cho biết 1 chuỗi đứng trước, sau hay giống như chuỗi đã cho trong thứ tự sắp xếp.
Trả về giá trị: 

- 0 − Nếu chuỗi giống 100%.

- 1 − Không giống nhau, và giá trị tham số ở trước giá trị đối tượng string trong thứ tự sắp xếp.

- -1 − Không giống nhau, và giá trị tham số ở sau giá trị đối tượng string trong thứ tự sắp xếp.

Nó không phân biệt chữ hoa chữ thường trong 1 mảng:
```javascript
["motorhead", "Motorhead", "Mötorhead"].sort();
// ["Motorhead", "Mötorhead", "motorhead"]

["motorhead", "Motorhead", "Mötorhead"].sort((a, b) =&gt; a.localeCompare(b));
//  ["motorhead", "Motorhead", "Mötorhead"]
```

Nếu bạn viết hàm `compareValues` thì nó sẽ như sau:
```javascript
function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    let comparison = a[key].localeCompare(b[key]);

    return (
      (order == 'desc') ? (comparison * -1) : comparison
    );
  };
}
```

Bạn có thể tìm hiểu thêm về `localeCompare` [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).
# Kết luận

Mặc dù có rất nhiều thư viện JavaScript cung cấp sắp xếp mảng đối tượng này như: Underscore.js, Lodash and Sugar... nhưng đây cũng là cách sắp xếp ngắn và dễ hiểu dành cho bạn. 

Cảm ơn các bạn đã đón đọc!
> Tham khảo:
> https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/