Trong nhiều dự án cần loại bỏ các bản sao khỏi một mảng trong JavaScript là trường hợp khá phổ biến. Dưới đây mình sẽ chỉ ra 7 cách để lọc ra các bản sao từ một mảng và chỉ trả lại các giá trị duy nhất.

## Dùng phương thức filter
```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

function removeDuplicates(data) {
  return data.filter((value, index) => data.indexOf(value) === index);
}

console.log(removeDuplicates(arr));

// [ 'banana', 'apple', 'orange', 'lemon' ]
```
Phương thức `filter` tạo ra một mảng mới với các phần tử pass điều kiện mà mình cung cấp. Và bất kỳ phần tử nào bị lỗi hoặc trả về false, nó sẽ không nằm trong mảng được filter.

Và chúng ta cũng có thể sử dụng phương thức `filter` để truy xuất các giá trị trùng lặp từ mảng bằng cách điều chỉnh điều kiện của mình.

```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

function removeDuplicates(data) {
  return data.filter((value, index) => data.indexOf(value) !== index);
}

console.log(removeDuplicates(arr));

// [ 'apple', 'lemon' ]
```
## Dùng Set

Set là một kiêủ object mới với ES6 (ES2015) cho phép bạn tạo tập hơp các giá trị duy nhất.
```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

function removeDuplicates(data) {
  return [...new Set(data)]
}

console.log(removeDuplicates(arr));

// [ 'banana', 'apple', 'orange', 'lemon' ]
```
## Dùng phương thức forEach
Bằng cách sử dụng `forEach`, chúng ta có thể lặp lại các phần tử trong mảng và chúng ta sẽ đẩy vào mảng mới nếu nó không tồn tại trong mảng.

```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

function removeDuplicates(data) {
  let unique = [];
  data.forEach(element => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}

console.log(removeDuplicates(arr));

// [ 'banana', 'apple', 'orange', 'lemon' ]
```
## Dùng phương thức reduce
`Reduce` hơi khó hiểu hơn một chút. được sử dụng để reduce các phần tử của mảng và kết hợp chúng thành một mảng cuối cùng dựa trên một số hàm reducer mà bạn truyền vào

```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

function removeDuplicates(data) {
  let unique = data.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);
  return unique;
}

console.log(removeDuplicates(arr));

// [ 'banana', 'apple', 'orange', 'lemon' ]
```
Phương pháp `reduce` tương tự với một cách tiếp cận khác
```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

function removeDuplicates(data) {
  return data.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []);
}

console.log(removeDuplicates(arr));

// [ 'banana', 'apple', 'orange', 'lemon' ]
```
## Thêm phương thức unique vào Array Prototype
Trong Javascript, hàm tạo Prototype của mảng cho phép bạn thêm các thuộc tính và phương thức mới vào đối tượng Mảng.
```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

Array.prototype.unique = function () {
  var unique = [];
  for (i = 0; i < this.length; i++) {
    var current = this[i];
    if (unique.indexOf(current) < 0) unique.push(current);
  }
  return unique;
}
console.log(arr.unique());

// [ 'banana', 'apple', 'orange', 'lemon' ]
```
`Set` sẽ hoạt động nhanh hơn nhiều khi bạn so sánh với cách tiếp cận thông thường
```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

Array.prototype.unique = function () {
  return Array.from(new Set(this));
}
console.log(arr.unique());

// [ 'banana', 'apple', 'orange', 'lemon' ]
```

## Bằng cách sử dụng Underscore JS
`_.uniq` là phương thức tạo ra một phiên bản không trùng lặp của mảng.
```
var arr = ['banana', 'apple', 'orange', 'lemon', 'apple', 'lemon'];

console.log(_.uniq(arr, false));

// [ 'banana', 'apple', 'orange', 'lemon' ]
```

## Loại bỏ các đối tượng trùng lặp khỏi một mảng
```
var users = [
  { name: 'jayanth', age: 25, address: 'Ad' },
  { name: 'sandy', age: 27, address: 'Ad' },
  { name: 'shiva', age: 26, address: 'Ad' },
  { name: 'jayanth', age: 28, address: 'Ad' },
  { name: 'sandy', age: 25, address: 'Ad' },
]

function uniqByKeepLast(data, key) {
  return [
    ...new Map(
      data.map(x => [key(x), x])
    ).values()
  ]
}

console.log(JSON.stringify(uniqByKeepLast(users, it => it.name)));

// [
//   {"name":"jayanth","age":28,"address":"Ad"},
//   {"name":"sandy","age":25,"address":"Ad"},
//   {"name":"shiva","age":26,"address":"Ad"}
// ]
```
Mình hy vọng bài viết này có thể hữu ích để xóa các bản sao khỏi một mảng. Cảm ơn bạn đã đọc.