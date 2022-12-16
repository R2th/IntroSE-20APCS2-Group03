### 1. Lọc các giá trị duy nhất
Loại đối tượng Set đã được giới thiệu trong ES6 và cùng với ..., toán tử ‘spread’, chúng ta có thể sử dụng nó để tạo một mảng mới chỉ với các giá trị duy nhất.

```
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];

console.log(uniqueArray); // Result: [1, 2, 3, 5]
```
Trước ES6, việc lọc các giá trị duy nhất sẽ cần nhiều dòng code hơn thế!

Thủ thuật này hoạt động đối với các mảng chứa các kiểu nguyên thủy: : undefined, null, boolean, string and number. (Nếu bạn có một mảng chứa các đối tượng, hàm..., bạn sẽ cần một cách tiếp cận khác!)

### 2. Every và some
Function every và some là function mà không phải tất cả các dev đều quen thuộc. Tuy nhiên, chúng có thể rất hữu ích trong một số tình huống. Hãy bắt đầu với function every. Bạn có thể sử dụng hàm này nếu bạn muốn biết liệu tất cả các phần tử của một mảng có vượt qua điều kiện nhất định hay không. Về cơ bản những gì nó đang làm là đi qua từng phần tử của mảng và kiểm tra xem chúng có đúng không.

Điều này có vẻ hơi trừu tượng với bạ, vì vậy hãy xem ví dụ sau đây. 

```
const random_numbers = [ 13, 2, 37, 18, 5 ]
const more_random_numbers = [ 0, -1, 30, 22 ]

const isPositive = (number) => {
  return number > 0
}

random_numbers.every(isPositive); // returns true
more_random_numbers.every(isPositive); // returns false
```
Các hàm every trả về một boolean. Nếu tất cả các phần tử trong mảng đều thoả mãn điều kiện, hàm trả về giá trị true. Nếu một trong các phần tử trong mảng là sai, hàm sẽ trả về là false.

Bạn cũng có thể sử dụng anonymous function để kiểm tra function nếu bạn muốn:

```
random_numbers.every((number) => {
    return number > 0
})
```
Function some gần như hoạt động chính xác như function every. Chỉ có một sự khác biệt chính: Function some kiểm tra xem có ít nhất một phần tử trong mảng thoả mãn điều kiện hay không.

Nếu chúng ta xem ví dụ trước và sử dụng function some thay vì  function every, cả hai mảng sẽ trả về _true_, vì cả hai mảng đều chứa một số dương.

```
const random_numbers = [ 13, 2, 37, 18, 5 ]
const more_random_numbers = [ 0, -1, 30, 22 ]

const isPositive = (number) => {
  return number > 0
}

random_numbers.some(isPositive); // returns true
more_random_numbers.some(isPositive); // returns true
```

### 3.  Short-Circuit Evaluation
Toán tử ternary là một cách đơn giản để viết các câu điều kiện đơn giản (và đôi khi không đơn giản), như sau:

```
x > 100 ? 'Above 100' : 'Below 100';
x > 100 ? (x > 200 ? 'Above 200' : 'Between 100-200') : 'Below 100';
```
Nhưng đôi khi ngay cả toán tử ternary cũng phức tạp hơn mức cần thiết. Thay vào đó, chúng ta có thể sử dụng các toán tử logic ‘and’ && và ‘or’ ||để đánh giá các biểu thức nhất định theo cách ngắn gọn hơn. Điều này thường được gọi là  ‘short-circuiting’ hoặc ‘short-circuit evaluation’.

Làm thế nào nó hoạt động
Giả sử chúng tôi muốn trả lại chỉ một trong hai hoặc nhiều tùy chọn.

Sử dụng && sẽ trả về giá trị false đầu tiên hoặc giá trị 'falsy'. Nếu mọi biểu thức là true, biểu thức được đánh giá cuối cùng sẽ được trả về.

```
let one = 1, two = 2, three = 3;
console.log(one && two && three); // Result: 3

console.log(0 && null); // Result: 0
```
Sử dụng || sẽ trả về giá trị true đầu tiên hoặc giá trị 'truthyc'. Nếu mọi biểu thức là false, biểu thức được đánh giá cuối cùng sẽ được trả về.

```
let one = 1, two = 2, three = 3;
console.log(one || two || three); // Result: 1

console.log(0 || null); // Result: null
```

### 4. Chuyển đổi sang Boolean
Bên cạnh các giá trị boolean thông thường true và false, JavaScript cũng xử lý tất cả các giá trị khác là ‘truthy' hoặc hoặc 'falsy'.
Trừ khi được định nghĩa khác, tất cả các giá trị trong JavaScript là ‘truthy'. ngoại trừ  0, "", null, undefined, NaN và false 
Chúng ta có thể dễ dàng chuyển đổi giữa đúng và sai bằng cách sử dụng toán tử phủ định ! , cũng sẽ chuyển đổi loại thành "boolean".

```
const isTrue  = !0;
const isFalse = !1;
const alsoFalse = !!0;

console.log(isTrue); // Result: true
console.log(typeof true); // Result: "boolean"
```
Kiểu chuyển đổi loại này có thể có ích trong các câu lệnh có điều kiện, mặc dù lý do duy nhất bạn chọn để định nghĩa sai là ! 

### 5. Đặt điều kiện một biến
Điều kiện thiết lập một biến vừa dễ dàng vừa làm cho mã của bạn trông thanh lịch hơn. Ở đó, bạn không cần phải viết if-statement khi áp dụng thủ thuật này.

Vì vậy, làm thế nào bạn có thể có điều kiện thiết lập một biến?

```const timezone = user.preferred_timezone || 'America/New_York'```
Trong ví dụ trên, ta kiểm tra xem người dùng có múi giờ ưa thích hay không. Nếu người dùng có múi giờ ưa thích thì sẽ sử dụng múi giờ đó. Nếu người dùng không có múi giờ ưa thích thì sẽ sử dụng múi giờ mặc định, đó là ‘America / New_York.

Mã này trông clean hơn nhiều so với khi sử dụng câu lệnh if.

```
let timezone = 'America/New_York'

if (user.preferred_timezone) {
    timezone = user.preferred_timezone
}
```

### 6. Chuyển đổi thành Chuỗi
Để nhanh chóng chuyển đổi một số thành một chuỗi, chúng ta có thể sử dụng toán tử nối + theo sau là một bộ dấu ngoặc kép trống "".
```

const val = 1 + "";

console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```

### 7. Chuyển đổi sang số
Ngược lại có thể nhanh chóng chuyển đổi được bằng cách sử dụng toán tử cộng +.

```
let int = "15";
int = +int;

console.log(int); // Result: 15
console.log(typeof int); Result: "number"
```
Điều này cũng có thể được sử dụng để chuyển đổi booleans thành số, như sau:

```
console.log(+true);  // Return: 1
console.log(+false); // Return: 0
```
Có thể có các bối cảnh trong đó dấu + sẽ được hiểu là toán tử ghép thay vì toán tử cộng. Khi điều đó xảy ra (và bạn muốn trả về một số nguyên, không phải là số float), thay vào đó bạn có thể sử dụng hai dấu ngã: ~ ~.

Dấu ngã, được gọi là toán tử ‘bitwise NOT operator’, là toán tử tương đương với -n - 1. Vì vậy, ví dụ, ~ 15 bằng -16.

Sử dụng hai dấu ngã liên tiếp sẽ loại bỏ hoạt động một cách hiệu quả, bởi vì - (- n - 1) - 1 = n + 1 - 1 = n. Nói cách khác, ~ - 16 bằng 15.

```
const int = ~ ~ "15"

console.log (int); // Kết quả: 15
console.log (typeof int); Kết quả: "số"
```

### 8. Casting giá trị trong Mảng
Đôi khi bạn muốn truyền tất cả các giá trị trong một mảng. Một trong những lần xuất hiện đó có thể là khi bạn đang sử dụng toán tử === để kiểm tra xem một số nhất định có tồn tại trong một mảng không, chẳng hạn.
Giải pháp đẹp nhất là chuyển tất cả các giá trị trong mảng thành một số nguyên. 

`selected_values = selected_values.map(Number) // [ 1, 5, 8 ]`
Hoặc thay vì truyền tất cả các giá trị thành một số nguyên, bạn cũng có thể truyền tất cả các giá trị trong mảng thành boolean bằng cách thay đổi đối số của hàm map.

`selected_values = selected_values.map(Boolean)`

### 9. Quick Powers
Kể từ ES7, có thể sử dụng toán tử lũy thừa như một cách viết tắt cho các quyền hạn, nhanh hơn so với viết Math.pow(2, 3). Đây là công cụ đơn giản, nhưng nó làm cho danh sách vì không có nhiều hướng dẫn đã được cập nhật để bao gồm toán tử này!

`console.log(2 ** 3); // Result: 8`

Điều này không nên nhầm lẫn với ^biểu tượng, thường được sử dụng để biểu thị số mũ, nhưng trong JavaScript là toán tử XOR bitwise.

Trước ES7, shorthand chỉ tồn tại đối với các quyền hạn với cơ sở 2, sử dụng toán tử dịch chuyển trái bitwise  <<:

```

Math.pow(2, n);
2 << (n - 1);
2n;
Ví dụ, 2 << 3 = 16tương đương với 2  4 = 16.
```

### 10. Chuyển đổi nhanh Float sang Integer
Nếu bạn muốn chuyển đổi một số thực sang một số nguyên, bạn có thể sử dụng Math.floor(), Math.ceil()hoặc Math.round(). Nhưng cũng có một cách nhanh hơn để chuyển đổi một số thực thành một số nguyên bằng cách sử dụng |toán tử OR bitwise.

```
console.log(23.9 | 0);  // Result: 23
console.log(-23.9 | 0); // Result: -23
```
Hành vi |thay đổi tùy thuộc vào việc bạn đang xử lý các số dương hay âm, vì vậy tốt nhất chỉ nên sử dụng lệnh này nếu bạn chắc chắn.

Nếu n là số dương, n | 0 làm tròn xuống. Nếu n là số âm, nó sẽ làm tròn lên. Nói một cách chính xác hơn, thao tác này sẽ loại bỏ bất cứ thứ gì có sau dấu thập phân, cắt bớt một dấu phẩy thành một số nguyên.

Bạn có thể có được hiệu ứng làm tròn tương tự bằng cách sử dụng~~ , như trên, và trên thực tế, bất kỳ toán tử bitwise nào cũng sẽ buộc một số thực thành một số nguyên. Lý do các hoạt động cụ thể này hoạt động là vì - một khi bị ép buộc vào một số nguyên - giá trị được giữ nguyên.~~

Xóa các chữ số cuối cùng
Toán tử bitwise OR cũng có thể được sử dụng để loại bỏ bất kỳ số lượng chữ số nào từ cuối số nguyên. Điều này có nghĩa là chúng ta không phải sử dụng mã như thế này để chuyển đổi giữa các loại:

```
let str = "1553"; 
Number(str.substring(0, str.length - 1));
```
Thay vào đó, toán tử bitwise OR cho phép chúng ta viết:

```
console.log(1553 / 10   | 0)  // Result: 155
console.log(1553 / 100  | 0)  // Result: 15
console.log(1553 / 1000 | 0)  // Result: 1
```

### 11. Object destructuring

Object destructuring là một biểu thức JavaScript cho phép bạn trích xuất dữ liệu từ mảng, đối tượng, bản đồ và chuyển thành biến của riêng chúng. Nó cho phép bạn trích xuất các thuộc tính từ một đối tượng hoặc các mục từ một mảng, nhiều lần tại một thời điểm.

Chúng ta hãy xem ví dụ sau đây nơi chúng ta có một đối tượng người dùng. Nếu bạn muốn lưu trữ tên người dùng trong một biến, bạn phải gán tên đó cho một biến trên một dòng mới. Và nếu bạn muốn lưu trữ giới tính theo một biến, bạn sẽ phải làm lại như vậy.

```
const user = {
    name: 'Frank',
    age: 23,
    gender: 'M',
    member: false
}

const name = user.name
const gender = user.gender
```
Với Object destructuring, bạn có thể trực tiếp lấy các biến cho các thuộc tính của đối tượng bằng cú pháp sau:

```
const { name, age, gender, member } = user;

console.log(name)   // Frank
console.log(age)    // 23
console.log(gender) // M
console.log(member) // false
```

### 12. Automatic Binding trong Classes
Chúng ta có thể sử dụng ký hiệu mũi tên ES6 trong các phương thức lớp và bằng cách thực hiện binding ràng buộc đó. Điều này thường sẽ lưu một vài dòng mã trong trình xây dựng class của chúng tôi và chúng tôi có thể vui vẻ nói lời tạm biệt với các biểu thức lặp đi lặp lại như this.myMethod = this.myMethod.bind(_this_)!

```
import React, { Component } from React;export default class App extends Compononent {
  constructor(props) {
  super(props);
  this.state = {};
  }myMethod = () => {
    // This method is bound implicitly!
  }render() {
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

### 13. Gỡ lỗi tốt hơn bằng cách sử dụng deverloper debugging
Một trong những điều mà bạn sẽ làm rất nhiều khi deverloper debugging. Tuy nhiên, debugging không chỉ đơn thuần là in ra một loạt các thông điệp tường trình trong bảng điều khiển của bạn bằng console.log .

Bạn có biết rằng đối tượng giao diện điều khiển có một cách tuyệt vời để phân tích hiệu suất của các đoạn mã của bạn không? Tuy nhiên, hầu hết các deverloper chỉ biết về cách debugging tiêu chuẩn là dùng console.log .

Đối tượng giao diện điều khiển có nhiều chức năng hữu ích hơn. Nó có một thời gian và timeEnd chức năng có thể giúp bạn phân tích hiệu suất. Nó hoạt động thực sự đơn giản.

Trước mã mà bạn muốn kiểm tra, bạn gọi hàm console.time . Hàm này có một đối số, lấy một chuỗi mô tả những gì bạn muốn phân tích. Khi kết thúc mã mà bạn muốn kiểm tra, bạn gọi hàm console.timeEnd . Bạn cung cấp cho hàm này cùng chuỗi với tham số đầu tiên. Sau đó, bạn sẽ thấy thời gian cần thiết để chạy mã trong bảng điều khiển của mình.
```

console.time('loop')  

for (let i = 0; i < 10000; i++) {   
    // Do stuff here 
}  console.timeEnd('loop')
```

### 14. Cắt bớt một mảng

Nếu bạn muốn loại bỏ các giá trị từ cuối một mảng một cách triệt để, có những lựa chọn thay thế nhanh hơn so với sử dụng splice().

Ví dụ: nếu bạn biết kích thước của mảng ban đầu, bạn có thể xác định lại thuộc tính độ dài của nó, như vậy:
```

let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.length = 4;

console.log(array); // Result: [0, 1, 2, 3]
```
hoặc sử dụng slide()
```

let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array = array.slice(0, 4);

console.log(array); // Result: [0, 1, 2, 3]
```

### 15. Lấy phần tử cuối cùng trong một mảng

Phương thức slice() cho mảng có thể lấy các số nguyên âm và nếu được cung cấp, nó sẽ lấy các giá trị từ cuối mảng thay vì bắt đầu.

```
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]
```

### 16. Định dạng mã JSON

Cuối cùng, bạn có thể đã sử dụng JSON.stringify trước đó, nhưng bạn có nhận ra nó cũng có thể giúp thụt lề JSON cho bạn không?

Phương thức stringify () có hai tham số tùy chọn: hàm thay thế, bạn có thể sử dụng để lọc JSON được hiển thị và giá trị không gian.

Giá trị không gian lấy một số nguyên cho số lượng khoảng trắng bạn muốn hoặc một chuỗi (chẳng hạn như '\ t' để chèn các tab) và nó có thể giúp đọc dữ liệu JSON được tìm nạp dễ dàng hơn rất nhiều.

```
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
```

// Result:
// '{
//     "alpha": A,
//     "beta": B
// }'

Tham khảo: [tại đây](https://morioh.com/p/2a323b4a7909)