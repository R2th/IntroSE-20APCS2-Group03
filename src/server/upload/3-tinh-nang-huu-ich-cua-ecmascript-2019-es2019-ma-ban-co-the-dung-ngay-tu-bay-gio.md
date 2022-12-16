Cách đây không lâu, ECMAScript 2019 (hay ES2019) đã được phát hành tới công chúng. Trong đó các anh em dev cũng đang rất hóng xem nó có gì mới và vượt trội hơn các phiên bản cũ, cũng như bao giờ thì các tính năng này mới dùng được trên các trình duyệt. Trong bài viết này, mình xin liệt kê ra 3 tính năng đã được hỗ trợ trên phiên bản mới nhất của Firefox và Chrome. Điều đó đồng nghĩa với việc các anh em dev có thể dùng các tính năng này ngay từ bây giờ.

## 1. Object.fromEntries()
Việc chuyển đổi từ Object sang Array là tương đối dễ dàng, do đối tượng Object mặc định của Javascript đã cung cấp cho chúng ta một phương thức `entries()` hay `Object.entries()`. Ví dụ:

```javascript
const obj = {one: 1, two: 2, three: 3};
console.log(Object.entries(obj));

// => [["one", 1], ["two", 2], ["three", 3]]
```

Nhưng nếu chúng ta muốn chuyển đổi từ Array về lại Object (hay nói cách khác là ngược lại) thì sao? Có một vài thư viện Javascript cũng đã hỗ trợ cho chúng ta trong việc này như phương thức `_.fromPairs()` của [Lodash](https://lodash.com/docs/4.17.15#fromPairs). Tuy nhiên, việc tải về một thư viện lớn chỉ để dùng một tính năng chưa bao giờ là ý hay cả. Nắm bắt được vấn đề này, phiên bản mới nhất của Javascript (ES2019) đã bổ sung thêm một phương thức mới giúp chúng ta có thể chuyển đổi từ Array sang Object đó là `Object.fromEntries()`:

```javascript
const myArray = [['one', 1], ['two', 2], ['three', 3]];
console.log(Object.fromEntries(myArray));

// => {one: 1, two: 2, three: 3}
```

## 2. trimStart() và trimEnd()
Javascript cung cấp cho chúng ta một phương thức tên là `trim()`, nó cho phép ta xóa khoảng trắng ở đầu và cuối của một chuỗi:

```javascript
const str = "   Hello World!   ";
console.log(str);

// => "Hello World!"
```

Tuy nhiên, đôi lúc chúng ta chỉ muốn xóa khoảng trẳng ở đầu (hoặc ở cuối) của chuỗi đó. Lúc này, ta có thể dùng `trimStart()` và `trimEnd()` với `trimStart()` là xóa khoảng trẳng ở đầu còn `trimEnd()` là xóa khoảng trắng ở cuối của chuỗi. Ví dụ:

```javascript
const str = "   Hello World!   ";
console.log(str.trimStart());    // => "Hello World!   "
console.log(str.trimEnd());      // => "   Hello World!"
```

## 3. flat() và flatMap()
Phương thức `flat()` cho phép chúng ta giảm số cấp của một mảng đa chiều (một mảng chứa các mảng khác). Nó nhận tham số đầu vào là số cấp tối đa mà chúng ta muốn giảm tính từ gốc, mặc định tham số này là 1. Tức `flat()` sẽ giảm số cấp của mảng xuống 1 cấp còn  `flat(2)` sẽ giảm số cấp của mảng xuống 2 cấp tính từ gốc.
 
```javascript
const arr = [10, [20, [30]]];

console.log(arr.flat());     // => [10, 20, [30]]
console.log(arr.flat(1));    // => [10, 20, [30]]
console.log(arr.flat(2));    // => [10, 20, 30]
```

Bên cạnh đó, `flat()` cũng giúp ta bỏ đi các phần tử rỗng trong mảng:

```javascript
const arr = ['a', , , 'b', ['c', 'd']];
const flattened = arr.flat();
console.log(flattened);

// => ["a", "b", "c", "d"]
```

Ngoài ra, chúng ta còn có phương thức `flatMap()`, một sự kết hợp giữa `map()` và `flat()`. Đầu tiên, `flatMap()` tạo ra một mảng mới với các giá trị lấy từ một mảng cho trước, rồi sau đó nó mới giảm số cấp của mảng đó. Ví dụ:

```javascript
const arr = [[7], [8], [9], [10], [11]];
const flattened = arr.flatMap(value => {
  if (value < 10) {
    return value;
  } else {
    return [];
  }
});
console.log(flattened);

// => [7, 8, 9]
```

-----
**Tài liệu tham khảo:** https://blog.logrocket.com/5-es2019-features-you-can-use-today/