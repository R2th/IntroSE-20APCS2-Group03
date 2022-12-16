![](https://images.viblo.asia/26544d83-e48a-4cc4-bfa0-8f64452c5e63.png)

Trong bài viết này được dự định sẽ hữu ích cho những người mới bắt đầu về 11 cách ngắn gọn để viết code JavaScript ngắn gọn và hiệu quả hơn. Nào cùng bắt đầu tìm hiểu 11 cách viết đó nhé!

### Filter Unique Values

-----

> *ARRAYS*

Kiểu đối tượng `Set` đã được giới thiệu trong ES6 và cùng với ..., toán tử  `spread`, chúng ta có thể sử dụng nó để tạo một mảng mới chỉ với các giá trị duy nhất.

Thủ thuật này hoạt động đối với các mảng chứa các kiểu nguyên thủy: `undefined`, `null`, `boolean`, `string` và `number`. (Nếu bạn có một mảng chứa các đối tượng, hàm hoặc các mảng bổ sung, bạn sẽ cần một cách tiếp cận khác!).

```js
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

### Short-Circuit Evaluation

-----

> *CONDITIONALS*

Toán tử `ternary` là một cách nhanh chóng để viết các câu điều kiện đơn giản (và đôi khi không đơn giản), như sau:

```js
x > 100 ? 'Above 100' : 'Below 100';
x > 100 ? (x > 200 ? 'Above 200' : 'Between 100-200') : 'Below 100';
```

Nhưng đôi khi ngay cả toán tử `ternary` cũng phức tạp hơn mức cần thiết. Thay vào đó, chúng ta có thể sử dụng `&&`,  và  `||` toán tử logic để đánh giá các biểu thức nhất định theo cách thậm chí ngắn gọn hơn. Điều này thường được gọi là `short-circuiting` hoặc `short-circuit evaluation`.

**How It Works**

Bây giờ bạn muốn trả lại chỉ một trong hai hoặc nhiều lựa chọn.

Sử dụng `&&` sẽ trả về giá trị `false` hoặc `falsy` đầu tiên. Nếu mọi toán hạng ước lượng là `true`, biểu thức được đánh giá cuối cùng sẽ được trả về.

```js
let one = 1, two = 2, three = 3;
console.log(one && two && three); // Result: 3
console.log(0 && null); // Result: 0
```

Sử dụng `||` sẽ trả về giá trị `true`  hoặc `truthy` đầu tiên. Nếu mọi toán hạng ước lượng thành `false`, biểu thức được đánh giá cuối cùng sẽ được trả về.

```js
let one = 1, two = 2, three = 3;
console.log(one || two || three); // Result: 1
console.log(0 || null); // Result: null
```

**Example 1**

Tiếp theo bạn muốn trả về `độ dài` của một biến, nhưng bạn không biết loại biến.

Chúng ta có thể sử dụng câu lệnh `if/else` để kiểm tra xem `foo` có phải là loại có thể chấp nhận được không, nhưng điều này có thể trở nên khá dài. `Short circuit evaluation` cho phép bạn làm điều này thay vào đó:

```js
return (foo || []).length;
```

Nếu biến `foo` là truthy, nó sẽ được trả về. Nếu không, độ dài của mảng trống sẽ được trả về là `0`.

**Example 2**

Bạn đã bao giờ có vấn đề truy cập một thuộc tính đối tượng lồng nhau? Bạn có thể không biết liệu đối tượng hoặc một trong các thuộc tính phụ có tồn tại hay không và điều này có thể gây ra các lỗi gây khó chịu.

Giờ bạn muốn truy cập vào một thuộc tính được gọi là `data` trong `this.state`, nhưng dữ liệu không được xác định cho đến khi chương trình của bạn trả về yêu cầu lấy thành công.

Tùy thuộc vào nơi bạn sử dụng nó, việc gọi `this.state.data` có thể ngăn ứng dụng của bạn chạy. Để giải quyết vấn đề này, chúng ta có thể gói nó trong một điều kiện:

```js
if (this.state.data) {
  return this.state.data;
} else {
  return 'Fetching Data';
}
```

Nhưng điều đó có vẻ khá lặp đi lặp lại. Toán tử `||` cung cấp một giải pháp ngắn gọn hơn:

```js
return (this.state.data || 'Fetching Data');
```

Bạn có thể tái cấu trúc code ở trên để sử dụng `&&`. Câu lệnh `Fetching Data && this.state.data` sẽ trả về `this.state.data` cho dù nó `undefined` hay không. Điều này là do `Fetching Data` là truthy, và vì vậy `&&` sẽ luôn vượt qua nó khi được liệt kê đầu tiên.

### Convert to Boolean

-----

> *TYPE CONVERSION*

Bên cạnh các giá trị boolean thông thường là `true` và `false`, JavaScript cũng coi tất cả các giá trị khác là `truthy` hoặc `falsy`.

Trừ khi được định nghĩa khác, tất cả các giá trị trong JavaScript là `truthy` ngoại trừ `0`,`""`, `null`, `undefined`, `NaN` và tất nhiên `false`, đó là  `falsy`.

Chúng ta có thể dễ dàng chuyển đổi giữa true và false bằng cách sử dụng toán tử phủ định `!` , cũng sẽ chuyển đổi loại thành `"boolean"`.

```js
const isTrue  = !0;
const isFalse = !1;
const alsoFalse = !!0;
console.log(isTrue); // Result: true
console.log(typeof true); // Result: "boolean"
```

Kiểu chuyển đổi loại này có thể có ích trong các câu lệnh có điều kiện.

### Convert to String

-----

> *TYPE CONVERSION*

Để nhanh chóng chuyển đổi một số thành một chuỗi, chúng ta có thể sử dụng toán tử nối `+` theo sau là một bộ dấu ngoặc kép trống `""`.

```js
const val = 1 + "";
console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```

### Convert to Number

-----

> *TYPE CONVERSION*

Điều ngược lại có thể nhanh chóng đạt được bằng cách sử dụng toán tử cộng `+`.

```js
let int = "15";
int = +int;
console.log(int); // Result: 15
console.log(typeof int); Result: "number"
```

Điều này cũng có thể được sử dụng để chuyển đổi `booleans` thành `số`, như sau:

```js
console.log(+true);  // Return: 1
console.log(+false); // Return: 0
```

Có thể có các bối cảnh trong đó dấu `+` sẽ được hiểu là toán tử ghép thay vì toán tử cộng. Khi điều đó xảy ra (và bạn muốn trả về một số nguyên, không phải là số float), thay vào đó bạn có thể sử dụng hai dấu ngã: `~~`.

Dấu ngã, được gọi là `bitwise NOT operator`, là toán tử tương đương với `-n-1`. Vì vậy, ví dụ: `~15` bằng `-16`.

Sử dụng hai dấu ngã liên tiếp sẽ loại bỏ hoạt động một cách hiệu quả, bởi vì `-(-n - 1) - 1 = n + 1 - 1 = n`. Nói cách khác, `~-16` bằng `15`.

```js
const int = ~~"15"
console.log(int); // Result: 15
console.log(typeof int); Result: "number"
```

Toán tử bitwise NOT cũng có thể được sử dụng trên booleans: `~true = -2` và `~false = -1`.

### Quick Powers

-----

> *OPERATIONS*

Kể từ ES7, có thể sử dụng toán tử lũy thừa `**`, nhanh hơn so với viết `Math.pow (2, 3)`. Đây là công cụ đơn giản, nhưng nó không có nhiều hướng dẫn đã được cập nhật để bao gồm toán tử này!

```js
console.log(2 ** 3); // Result: 8
```

Điều này bạn không nên nhầm lẫn với biểu tượng `^`, thường được sử dụng để biểu thị số mũ, nhưng trong JavaScript là toán tử XOR bitwise.

Trước ES7, khi làm việc với số mũ sẽ sử dụng toán tử dịch chuyển trái bit `<<`:

```js
// The following expressions are equivalent:

Math.pow(2, n);
2 << (n - 1);
2**n;
```

Ví dụ `2 << 3 = 16` sẽ tương đương `2 ** 4 = 16`.

### Quick Float to Integer

-----

> *OPERATIONS / TYPE CONVERSION*

Nếu bạn muốn chuyển đổi một số `float` thành một số nguyên, bạn có thể sử dụng `Math.floor()`, `Math.ceil()` hoặc `Math.round()`. Nhưng đó cũng là một cách nhanh hơn để cắt xén một số `float` thành một số nguyên sử dụng `|`, các toán tử Bitwise OR.

```js
console.log(23.9 | 0);  // Result: 23
console.log(-23.9 | 0); // Result: -23
```

Sử dụng `|` sẽ thực hiện khác nhau tùy thuộc vào việc bạn đang làm việc với những con số dương hay số âm, do đó nó chỉ tốt nhất để sử dụng phím tắt này nếu bạn thấy chắc chắn.

Nếu `n` dương, `n | 0` sẽ làm tròn kết quả xuống. Nếu `n` âm, nó làm tròn kết quả lên. Nói một cách chính xác hơn, thao tác này sẽ loại bỏ bất cứ thứ gì có sau dấu thập phân, cắt bớt một số float thành một số nguyên.

Bạn có thể có được hiệu ứng làm tròn tương tự bằng cách sử dụng `~~`, như trên và trên thực tế, bất kỳ toán tử bitwise nào cũng sẽ buộc một số float đến một số nguyên. Lý do các hoạt động cụ thể này hoạt động là: Một khi bị ép buộc vào một số nguyên - Giá trị sẽ được giữ nguyên.

**Xóa các chữ số cuối cùng**

Toán tử bitwise OR cũng có thể được sử dụng để loại bỏ bất kỳ số lượng chữ số nào từ cuối số nguyên. Điều này có nghĩa là bạn không phải sử dụng như thế này để chuyển đổi giữa các loại:

```js
let str = "1553"; 
Number(str.substring(0, str.length - 1));
```

Thay vào đó, toán tử bitwise OR cho phép chúng ta viết:

```js
console.log(1553 / 10   | 0)  // Result: 155
console.log(1553 / 100  | 0)  // Result: 15
console.log(1553 / 1000 | 0)  // Result: 1
```

### Automatic Binding in Classes

-----

> *CLASSES*

Chúng ta có thể sử dụng ký hiệu mũi tên ES6 trong các phương thức Class và bằng cách đó các ràng buộc được ngụ ý. Điều này thường sẽ lưu một vài dòng mã trong hàm tạo của Class và chúng ta có thể vui vẻ nói lời tạm biệt với các biểu thức lặp đi lặp lại như `this.myMethod = this.myMethod.bind(this)`!

```js
import React, { Component } from React;

export default class App extends Compononent {
  constructor(props) {
  super(props);
  this.state = {};
  }
  
myMethod = () => {
    // This method is bound implicitly!
  }

render() {
    return (
      <>
        <div>
          {this.myMethod()}
        </div>
      </>
    )
  }
};
```

### Truncate an Array

-----

> *ARRAYS*

Nếu bạn muốn loại bỏ các giá trị từ cuối một mảng một cách triệt để, thì có những lựa chọn thay thế nhanh hơn so với sử dụng `splice()`.

Ví dụ: Nếu bạn biết kích thước của mảng ban đầu, bạn có thể xác định lại thuộc tính độ dài của nó, như vậy:

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.length = 4;
console.log(array); // Result: [0, 1, 2, 3]
```

Đây là một giải pháp đặc biệt súc tích. Tuy nhiên thời gian chạy của phương thức `slice()` thậm chí còn nhanh hơn. Nếu tốc độ là mục tiêu chính của bạn, hãy xem xét sử dụng một cái gì đó như thế này:

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array = array.slice(0, 4);
console.log(array); // Result: [0, 1, 2, 3]
```

### Get the Last Item(s) in an Array

-----

> *ARRAYS*

Phương thức `slice()` có thể lấy các số nguyên âm và nếu được cung cấp, nó sẽ lấy các giá trị từ cuối mảng thay vì bắt đầu.

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]
```

### Format JSON Code

-----

> *JSON*

Cuối cùng, bạn có thể đã sử dụng `JSON.opesify()` trước đây, nhưng bạn có nhận ra rằng nó cũng có thể giúp thụt lề JSON cho bạn không?

Phương thức `stringify()` có hai tham số tùy chọn: hàm thay thế, bạn có thể sử dụng để lọc JSON được hiển thị và giá trị không gian.

Giá trị không gian lấy một số nguyên cho số lượng khoảng trắng bạn muốn hoặc một chuỗi (chẳng hạn như `'\ t'` để chèn các tab) và nó có thể giúp đọc dữ liệu JSON dễ dàng hơn rất nhiều.

```js
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
// Result:
// '{
//     "alpha": A,
//     "beta": B
// }'
```

### Kết luận

-----

Hi vọng qua bài viết này sẽ giúp ích được cho bạn ở đâu đó khi làm việc với JavaScript, cảm ơn bạn đã đọc bài viết :grinning: 

Bài viết được tham khảo từ https://medium.com/@bretcameron/12-javascript-tricks-you-wont-find-in-most-tutorials-a9c9331f169d