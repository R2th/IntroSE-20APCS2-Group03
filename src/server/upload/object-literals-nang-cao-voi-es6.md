Trong bài viết này chúng ta xem xét những gì có thể xảy ra với các Object Literals trong JavaScript, đặc biệt là theo các bản cập nhật ECMAScript gần đây. Khả năng tạo các đối tượng JavaScript sử dụng ký hiệu chữ rất mạnh mẽ. Các tính năng mới được giới thiệu từ ES2015 (ES6) giúp xử lý đối tượng dễ dàng hơn trong tất cả các trình duyệt hiện đại (không phải IE) và Node.js.

Việc tạo các đối tượng trong một số ngôn ngữ có thể tốn kém về thời gian phát triển và sức mạnh xử lý khi một class phải được khai báo trước khi có thể đạt được bất cứ điều gì. Trong JavaScript, thật dễ dàng để tạo các đối tượng một cách nhanh chóng. Ví dụ:

```
// ES5-compatible code
var myObject = {
  prop1: 'hello',
  prop2: 'world',
  output: function() {
    console.log(this.prop1 + ' ' + this.prop2);
  }
};

myObject.output(); // hello world
```

Đối tượng tạo một lần được sử dụng rộng rãi. Ví dụ bao gồm cài đặt cấu hình, định nghĩa mô-đun, tham số phương thức, giá trị trả về từ các hàm, v.v. ES2015 (ES6) đã thêm một loạt tính năng để nâng cao object literals.

## Khai báo đối tượng từ các biến
Thuộc tính của đối tượng thường được tạo từ các biến có cùng tên. Ví dụ:

```
// ES5 code
var
  a = 1, b = 2, c = 3;
  obj = {
    a: a,
    b: b,
    c: c
  };

// obj.a = 1, obj.b = 2, obj.c = 3
```

Không cần lặp lại khó chịu trong ES6!…

```
// ES6 code
const
  a = 1, b = 2, c = 3;
  obj = {
    a
    b
    c
  };

// obj.a = 1, obj.b = 2, obj.c = 3
```

Điều này có thể hữu ích cho các đối tượng được trả về khi sử dụng **revealing module pattern** để tránh sung đột tên, ví dụ:

```
// ES6 code
const lib = (() => {

  function sum(a, b)  { return a + b; }
  function mult(a, b) { return a * b; }

  return {
    sum,
    mult
  };

}());

console.log( lib.sum(2, 3) );  // 5
console.log( lib.mult(2, 3) ); // 6
```

Bạn có thể đã thấy nó được sử dụng trong các mô-đun ES6:
```
// lib.js
function sum(a, b)  { return a + b; }
function mult(a, b) { return a * b; }

export { sum, mult };
```
## Định nghĩ phương thức của đối tượng nhanh hơn
Các phương thức đối tượng trong ES5 yêu cầu câu lệnh `function`. Ví dụ:
```
// ES5 code
var lib = {
  sum:  function(a, b) { return a + b; },
  mult: function(a, b) { return a * b; }
};

console.log( lib.sum(2, 3) );  // 5
console.log( lib.mult(2, 3) ); // 6
```

Điều này không còn cần thiết trong ES6; nó cho phép cú pháp viết tắt sau:

```
// ES6 code
const lib = {
  sum(a, b)  { return a + b; },
  mult(a, b) { return a * b; }
};

console.log( lib.sum(2, 3) );  // 5
console.log( lib.mult(2, 3) ); // 6
```

Bạn có thể sử dụng các arrow function nếu bạn đặt tên trực tiếp cho từng phương thức (như ES5). Ví dụ:

```
// ES6 code
const lib = {
  sum:  (a, b) => a + b,
  mult: (a, b) => a * b
};

console.log( lib.sum(2, 3) );  // 5
console.log( lib.mult(2, 3) ); // 6
```

## Keys thuộc tính động
Trong ES5, không thể sử dụng một biến cho tên key, mặc dù nó có thể được thêm sau khi đối tượng đã được tạo. Ví dụ:
```
// ES5 code
var
  key1 = 'one',
  obj = {
    two: 2,
    three: 3
  };

obj[key1] = 1;

// obj.one = 1, obj.two = 2, obj.three = 3
```
Các khóa đối tượng có thể được gán động trong ES6 bằng cách đặt một biểu thức trong dấu ngoặc vuông. Ví dụ:
```
// ES6 code
const
  key1 = 'one',
  obj = {
    [key1]: 1,
    two: 2,
    three: 3
  };

// obj.one = 1, obj.two = 2, obj.three = 3
```
Bất kỳ biểu thức nào cũng có thể được sử dụng để tạo khóa. Ví dụ:
```
// ES6 code
const
  i = 1,
  obj = {
    ['i' + i]: i
  };

console.log(obj.i1); // 1
```
Một key động có thể được sử dụng cho các phương thức cũng như thuộc tính. Ví dụ:
```
// ES6 code
const
  i = 2,
  obj = {
    ['mult' + i]: x => x * i
  };

console.log( obj.mult2(5) ); // 10
```
## Destructuring (Biến từ thuộc tính của đối tượng)
Thông thường, cần trích xuất một giá trị thuộc tính từ một đối tượng vào một biến khác. Điều này phải được khai báo rõ ràng trong ES5. Ví dụ:
```
// ES5 code
var myObject = {
  one:   'a',
  two:   'b',
  three: 'c'
};

var
  one   = myObject.one, // 'a'
  two   = myObject.two, // 'b'
  three = myObject.three; // 'c'
```
ES6 hỗ trợ destructuring: bạn có thể tạo một biến có cùng tên với thuộc tính đối tượng tương đương. Ví dụ:
```
// ES6 code
const myObject = {
  one:   'a',
  two:   'b',
  three: 'c'
};

const { one, two, three } = myObject;
// one = 'a', two = 'b', three = 'c'
```
Cũng có thể gán thuộc tính cho các biến với bất kỳ tên nào bằng cách sử dụng ký hiệu `{ propertyName: newVariable }`. Ví dụ:

```
// ES6 code
const myObject = {
  one:   'a',
  two:   'b',
  three: 'c'
};

const { one: first, two: second, three: third } = myObject;
// first = 'a', second = 'b', third = 'c'
```

Các đối tượng phức tạp hơn với các mảng và đối tượng con lồng nhau cũng có thể được tham chiếu trong các phép gán cấu trúc. Ví dụ:

```
// ES6 code
const meta = {
  title: 'Enhanced Object Literals',
  pageinfo: {
    url: 'https://www.sitepoint.com/',
    description: 'How to use object literals in ES2015 (ES6).',
    keywords: 'javascript, object, literal'
  }
};

const {
  title   : doc,
  pageinfo: { keywords: topic }
} = meta;

/*
  doc   = 'Enhanced Object Literals'
  topic = 'javascript, object, literal'
*/
```
## Tham số function mặc định
Việc chuyển một đối tượng cho một hàm thường dễ dàng hơn là sử dụng một danh sách dài các đối số. Ví dụ:
```
prettyPrint( {
  title: 'Enhanced Object Literals',
  publisher: {
    name: 'SitePoint',
    url: 'https://www.sitepoint.com/'
  }
} );
```
Trong ES5, cần phải phân tích cú pháp đối tượng để đảm bảo đặt các giá trị mặc định thích hợp. Ví dụ:
```
// ES5 assign defaults
function prettyPrint(param) {

  param = param || {};
  var
    pubTitle = param.title || 'No title',
    pubName = (param.publisher && param.publisher.name) || 'No publisher';

  return pubTitle + ', ' + pubName;

}
```
Trong ES6, chúng ta có thể gán giá trị mặc định cho bất kỳ tham số nào. Ví dụ:

```
// ES6 default value
function prettyPrint(param = {}) { ... }
```
Sau đó, chúng tôi có thể sử dụng cấu trúc destructuring để trích xuất các giá trị và gán giá trị mặc định khi cần thiết:
```
// ES6 destructured default value
function prettyPrint(
  {
    title: pubTitle = 'No title',
    publisher: { name: pubName = 'No publisher' }
  } = {}
) {

  return `${pubTitle}, ${pubName}`;

}
```
## Phân tích cú pháp các đối tượng bị trả lại

Các hàm chỉ có thể trả về một giá trị, nhưng đó có thể là một đối tượng với hàng trăm thuộc tính và / hoặc phương thức. Trong ES5, cần lấy đối tượng trả về, sau đó trích xuất các giá trị tương ứng. Ví dụ:

```
// ES5 code
var
  obj = getObject(),
  one = obj.one,
  two = obj.two,
  three = obj.three;
```
ES6 destructuring làm cho quá trình này đơn giản hơn và không cần phải giữ lại đối tượng dưới dạng một biến:
```
// ES6 code
const { one, two, three } = getObject();
```
Bạn có thể đã thấy các cú pháp tương tự trong Node.js. Ví dụ: nếu bạn chỉ yêu cầu các phương thức `readFile` và `writeFile` của File System (**fs**), bạn có thể tham chiếu chúng trực tiếp. Ví dụ:
```
// ES6 Node.js
const { readFile, writeFile } = require('fs');

readFile('file.txt', (err, data) => {
  console.log(err || data);
});

writeFile('new.txt', 'new content', err => {
  console.log(err || 'file written');
});
```
## ES2018 (ES9) Thuộc tính Rest/Spread
Trong ES2015, tham số Rest và toán tử spread ký hiệu ba chấm (...) chỉ áp dụng cho mảng. ES2018 cho phép chức năng rest/spread tương tự cho các đối tượng. Một ví dụ cơ bản:
```
const myObject = {
  a: 1,
  b: 2,
  c: 3
};

const { a, ...x } = myObject;
// a = 1
// x = { b: 2, c: 3 }
```
Bạn có thể sử dụng kỹ thuật để chuyển các giá trị cho một hàm:
```
restParam({
  a: 1,
  b: 2,
  c: 3
});

function restParam({ a, ...x }) {
  // a = 1
  // x = { b: 2, c: 3 }
}
```
Toán tử spread có thể được sử dụng trong các đối tượng khác. Ví dụ:
```
const
  obj1 = { a: 1, b: 2, c: 3 },
  obj2 = { ...obj1, z: 26 };

// obj2 is { a: 1, b: 2, c: 3, z: 26 }
```
Bạn có thể sử dụng toán tử spread để sao chép các đối tượng (`obj2 = { ...obj1 };`), nhưng lưu ý rằng bạn chỉ nhận được các bản sao nông. Nếu một thuộc tính giữ một đối tượng khác, bản sao sẽ tham chiếu đến cùng một đối tượng.

Hỗ trợ thuộc tính rest/spread của ES2018 (ES9) là một bản vá, nhưng nó có sẵn trong Chrome, Firefox và Node.js 8.6+.

Các Object literals luôn hữu ích. Các tính năng mới được giới thiệu từ ES2015 về cơ bản không thay đổi cách thức hoạt động của JavaScript, nhưng chúng giúp tiết kiệm công sức nhập và dẫn đến mã rõ ràng, ngắn gọn hơn.