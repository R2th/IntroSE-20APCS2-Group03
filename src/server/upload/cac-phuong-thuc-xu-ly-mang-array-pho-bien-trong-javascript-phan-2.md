Hi, xin chào các bạn, ở bài  trước mình đã giới thiệu được tới các bạn 10 method hữu ích khi làm việc với array, hôm nay chúng ta sẽ  tiếp tục vọc vạch thêm những method rất hay ho của nó nữa, bắt đầu nhé

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 11. push()

`push()` giúp ta thêm **một hoặc nhiều phần tử vào cuối mảng**
* `push()` **CÓ làm thay đổi mảng ban đầu**
* `push()` **trả về ĐỘ DÀI MỚI của mảng (arr.length)** sau khi thêm phần tử

```javascript
var animals = ['pigs', 'goats', 'sheep'];
var count = animals.push('chickens', 'cats', 'dogs');

console.log(count);   // > 6
console.log(animals); // > Array ["pigs", "goats", "sheep", "chickens", "cats", "dogs"]
```

**Cú pháp**
```javascript
arr.push(element1[, ...[, elementN]])

// elementN: Các phần tử sẽ thêm vào cuối mảng
```

### 12. unshift()

Phương thức này ngược lại so với `push()`

`unshift()` giúp ta thêm **một hoặc nhiều phần tử vào đầu mảng**
* `unshift()` **CÓ làm thay đổi mảng ban đầu**
* `unshift()` **trả về ĐỘ DÀI MỚI của mảng (arr.length)** sau khi thêm phần tử

```javascript
var animals = ['pigs', 'goats', 'sheep'];
var count = animals.unshift('chickens', 'cats', 'dogs');

console.log(count);   // > 6
console.log(animals); // > Array ["chickens", "cats", "dogs", "pigs", "goats", "sheep"]
```

**Cú pháp**
```javascript
arr.unshift(element1[, ...[, elementN]])

// elementN: Các phần tử được thêm vào đầu mảng
```

### 13. reduce()

Đây là 1 method mà mấy bạn newbie mới học kiểu gì cũng bị xoắn :sweat_smile:

`reduce()` dùng để **thực thi một hàm lên từng phần tử** của mảng (từ trái sang phải) **với một biến tích lũy để thu về một giá trị duy nhất**
* `reduce()` **KHÔNG làm thay đổi mảng ban đầu**
* `reduce()` **trả về giá trị sau khi rút gọn**

```javascript
var array = [1, 2, 3, 4];

var a = array.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue
});
//=> 1 + 2 + 3 + 4

var b = array.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue
}, 5);
//=> 5 + 1 + 2 + 3 + 4

console.log(a);     // > 10
console.log(b);     // > 15
console.log(array); // > Array [1, 2, 3, 4]
```

**Cú pháp**
```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

// callback: Hàm dùng để thực thi với từng phần tử của mảng,
// hàm này nhận vào 4 tham số:

  /* accumulator: Biến tích lũy, truyền giá trị trả về của mỗi lần gọi callback,
  nó là giá trị tích lũy được trả về trong lần gọi callback trước,
  hoặc giá trị của tham số initialValue, nếu được cung cấp */
  
  /* currentValue: Phần tử trong mảng hiện tại đang được xử lý */
  
  /* index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  Bắt đầu tại 0 nếu giá trị initialValue được cung cấp,
  Bắt đầu tại 1 nếu không có initialValue */
  
  /* array (không bắt buộc): Mảng đang được gọi với reduce() */
  
  /* initialValue (không bắt buộc nhưng NÊN khai báo nó):
  Giá trị cho tham số thứ nhất (accumulator) của hàm callback trong LẦN GỌI ĐẦU TIÊN. 
  Nếu giá trị ban đầu này không được cung cấp, phần tử đầu tiên của mảng sẽ được dùng.
  Do đó, gọi reduce() trên một mảng rỗng và không có giá trị ban đầu sẽ gây ra lỗi */
```

### 14. reverse() 

`reverse()` dùng để đảo ngược mảng, phần tử đầu thành phần tử cuối và ngược lại

* `reverse()` **CÓ làm thay đổi mảng ban đầu**
* `reverse()` **trả về mảng** sau khi đảo ngược

```javascript
var array = ['one', 'two', 'three'];
var reversed = array.reverse();

console.log(reversed); // > Array ["three", "two", "one"]
console.log(array);    // > Array ["three", "two", "one"]
```

**Cú pháp**
```javascript
arr.reverse()
```

### 15. some()

`some()` kiểm tra xem **có ít nhất một phần tử của mảng** thoả mãn điều kiện ở hàm được truyền vào hay không

* `some()` **KHÔNG làm thay đổi mảng ban đầu**
* `some()` trả về kiểu **Boolean**: `true` nếu có ít nhất một phần tử thoả mãn và `false` nếu không thoả mãn
* `some()` sẽ trả về `false` nếu mảng rỗng

```javascript
var array = [1, 2, 3, 4, 5];
var even = array.some(function(element) {
  return element % 2 === 0
});

console.log(even);  // > true
console.log(array); // > Array [1, 2, 3, 4, 5]
```

**Cú pháp**
```javascript
arr.some(callback(element[, index[, array]])[, thisArg])

/* callback: Hàm dùng để kiểm tra từng phần tử,
  hàm này nhận vào 3 tham số: */
  
 // element: Phần tử đang được kiểm tra
 // index (không bắt buộc): Chỉ mục của phần tử đang được kiểm tra
 // array (không bắt buộc): Mảng đang được gọi với some()

/* thisArg (không bắt buộc): Được sử dụng làm giá trị this
  khi thực thi hàm callback */
```

### 15. sort()

`sort()` sẽ sắp xếp các phần tử trong một mảng, các phần tử có thể được sắp xếp theo bảng chữ cái hoặc theo chữ số theo thứ tự tăng dần hoặc giảm dần.

Mặc định các phần tử sẽ được sắp xếp theo bảng chữ cái với thứ tự tăng dần. Điều này khiến `sort()` sẽ **sắp xếp các chuỗi** rất chính xác, tuy nhiên khi sắp xếp các số sẽ không được chính xác (ví dụ 20 và 100 thì 20 sẽ lớn hơn 100 vì 2 > 1) ta thể khắc phục điều này bằng việc truyền tham số là một mảng so sánh

* `sort()` **CÓ làm thay đổi mảng ban đầu**
* `sort()` **trả về mảng** sau khi được sắp xếp

```javascript
var months = ['March', 'Jan', 'Feb', 'Dec'];
var array = [1, 30, 4, 21, 100000];
months.sort();
array.sort();

console.log(months); // > Array ["Dec", "Feb", "Jan", "March"]
console.log(array);  // > Array [1, 100000, 21, 30, 4]
```

**Cú pháp**
```javascript
arr.sort([compareFunction])

/* compareFunction (không bắt buộc): Hàm dùng để xác định thứ tự sắp xếp.
  Nếu bỏ qua, mảng sẽ được sắp xếp dựa vào giá trị Unicode code point
  của từng ký tự của chuỗi được chuyển đổi từ giá trị của phần tử. */
```

## Tạm kết

Cũng khá dài rồi, mình tạm dừng part 2 tại đây nhé.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !

Hẹn gặp lại ở part 3 !