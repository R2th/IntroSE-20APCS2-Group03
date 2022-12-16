Trong quá trình tìm hiểu và làm việc, mình đã lập một danh sách một số thủ thuật tiết kiệm thời gian mà mình tìm thấy ở những thành viên, mã trên các trang web và bất kỳ nơi nào khác mà giờ mình đang sử dụng. Trong bài viết này, mình xin được phép chia sẻ một số mẹo thủ công giúp đã và đang giúp mình đặc biệt thông minh hoặc hữu ích. Bài đăng này được dự định sẽ hữu ích cho người mới bắt đầu, nhưng mình hy vọng ngay cả những người đã làm việc lâu năm rồi cũng sẽ tìm thấy một cái gì đó mới trong danh sách này.

Không theo thứ tự cụ thể nào cả, dưới đây là một số cách gọn gàng để viết mã ngắn gọn và hiệu quả hơn.

# 1. Lọc các giá trị duy nhất
Kiểu đối tượng Set đã được giới thiệu trong ES6 và cùng với …, toán tử  "lây lan", chúng ta có thể sử dụng nó để tạo một mảng mới chỉ với các giá trị duy nhất.
```js
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray = [...new Set(array)];console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

Trước ES6, việc cô lập các giá trị duy nhất sẽ liên quan đến nhiều mã hơn thế! Thủ thuật này hoạt động đối với các mảng chứa các kiểu nguyên thủy: không xác định, null, boolean, chuỗi và số. Nếu bạn có một mảng chứa các đối tượng, hàm hoặc các mảng bổ sung, bạn sẽ cần một cách tiếp cận khác! Dùng filter chẳng hạn.
```js
array.filter((item, index) => array.indexOf(item) === index)
```

Dưới đây, sẽ là một số cách để bạ lọc, lấy ra các giá trị duy nhất.
![](https://images.viblo.asia/c366213a-4121-431a-8296-252f4b679310.png)

# 2. Đánh giá ngắn mạch
Toán tử ternary là một cách nhanh chóng để viết các câu điều kiện đơn giản (và đôi khi không đơn giản), như sau:

```js
x > 100 ? 'Above 100' : 'Below 100';
x > 100 ? (x > 200 ? 'Above 200' : 'Between 100-200') : 'Below 100';
```

**Làm thế nào nó hoạt động với Javascript**

Hãy nói rằng chúng tôi muốn trả lại chỉ một trong hai hoặc nhiều lựa chọn. Sử dụng && sẽ trả về giá trị false đầu tiên. Nếu mọi toán hạng ước lượng là true, biểu thức được đánh giá cuối cùng sẽ được trả về.

```js
let one = 1, two = 2, three = 3;
console.log(one && two && three); // Result: 3
console.log(0 && null); // Result: 0
```

Sử dụng | | sẽ trả về giá trị thật đầu tiên hoặc true . Nếu mọi toán hạng ước lượng thành false, biểu thức được đánh giá cuối cùng sẽ được trả về.

```js
let one = 1, two = 2, three = 3;
console.log(one || two || three); // Result: 1
console.log(0 || null); // Result: null
```

**Ví dụ 1**
Giả dụ, chúng ta muốn trả về độ dài của một biến, nhưng chúng tôi không biết loại biến. Chúng ta có thể sử dụng câu lệnh if / else để kiểm tra xem foo có phải là loại có thể chấp nhận được không, nhưng điều này có thể trở nên khá dài. Đánh giá ngắn mạch cho phép chúng tôi làm điều này thay vào đó:

```js
return (foo || []).length;
```

Nếu biến foo là có, nó sẽ được trả về. Nếu không, độ dài của mảng trống sẽ được trả về: 0.

**Ví dụ 2**
Bạn đã bao giờ có vấn đề truy cập một thuộc tính đối tượng lồng nhau? Bạn có thể không biết liệu đối tượng hoặc một trong các thuộc tính phụ có tồn tại hay không và điều này có thể gây ra các lỗi gây khó chịu.

Và giờ chúng ta muốn truy cập vào một thuộc tính được gọi là dữ liệu trong this.state, nhưng dữ liệu không được xác định cho đến khi chương trình của chúng tôi trả về yêu cầu tìm nạp thành công.
Tùy thuộc vào nơi chúng tôi sử dụng nó, việc gọi this.state.data có thể ngăn ứng dụng của chúng tôi chạy. Để giải quyết vấn đề này, chúng ta có thể gói nó trong một điều kiện:

```js
if (this.state.data) {
    return this.state.data;
} else {
    return 'Fetching Data';
}
```

Nhưng điều đó có vẻ khá lặp đi lặp lại. Toán tử hoặc cung cấp một giải pháp ngắn gọn hơn:

```js
return (this.state.data || 'Fetching Data');
```

**Một tính năng mới được đề xuất: Chuỗi tùy chọn**

Hiện tại có một đề xuất cho phép **chuỗi tùy chọn** khi cố gắng trả lại một tài sản nằm sâu trong cấu trúc giống như cây. Theo đề nghị, biểu tượng dấu hỏi **?** chỉ có thể được sử dụng để trích xuất một thuộc tính nếu nó không phải là null.

Ví dụ: Chúng ta có thể cấu trúc lại ví dụ của mình ở trên thành this.state.data ?. (), Do đó chỉ trả về dữ liệu nếu nó không phải là null. Hoặc, nếu chúng ta chủ yếu quan tâm đến việc liệu trạng thái có được xác định hay không, chúng ta có thể trả về this.state? .Data

Đề xuất hiện đang ở Giai đoạn 1, như là một tính năng thử nghiệm. Bạn có thể đọc về nó ở đây và bây giờ bạn có thể sử dụng JavaScript của mình thông qua Babel, bằng cách thêm @ babel / plugin-đề xuất-tùy chọn-chuỗi vào tệp .babelrc của bạn.
# 3. Chuyển đổi sang Boolean
Bên cạnh các giá trị boolean thông thường là đúng và sai, JavaScript cũng coi tất cả các giá trị khác là truey hoặc hoặc falsy khảo.

Trừ khi được định nghĩa khác, tất cả các giá trị trong JavaScript là ’truey, ngoại trừ 0,"", null, không xác định, NaN và tất nhiên là sai, đó là fals falsy.

Chúng ta có thể dễ dàng chuyển đổi giữa đúng và sai bằng cách sử dụng toán tử phủ định! , cũng sẽ chuyển đổi loại thành "boolean".

```js
const isTrue  = !0;
const isFalse = !1;
const alsoFalse = !!0;console.log(isTrue); // Result: true
console.log(typeof true); // Result: "boolean"
```

Kiểu chuyển đổi loại này có thể có ích trong các câu lệnh có điều kiện, mặc dù lý do duy nhất bạn chọn để định nghĩa sai là! 1 là nếu bạn đang chơi code!
# 4. Chuyển đổi thành Chuỗi
Để nhanh chóng chuyển đổi một số thành một chuỗi, chúng ta có thể sử dụng toán tử nối + theo sau là một bộ dấu ngoặc kép trống "".

```js
const val = 1 + "";
console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```
# 5. Chuyển đổi sang số
Điều ngược lại có thể nhanh chóng đạt được bằng cách sử dụng toán tử cộng +.

```js
let int = "15";
int = +int;
console.log(int); // Result: 15
console.log(typeof int); Result: "number"
```

Điều này cũng có thể được sử dụng để chuyển đổi booleans thành số, như sau:

```js
console.log(+true); // Return: 1
console.log(+false); // Return: 0
```

Có thể có các bối cảnh trong đó dấu + sẽ được hiểu là toán tử ghép thay vì toán tử cộng. Khi điều đó xảy ra (và bạn muốn trả về một số nguyên, không phải là số float), thay vào đó bạn có thể sử dụng hai dấu ngã: ~ ~.
Dấu ngã, được gọi là toán tử bitwise NOT, là toán tử tương đương với-n – 1. Vì vậy, ví dụ, ~ 15 bằng -16.
Sử dụng hai dấu ngã liên tiếp sẽ loại bỏ hiệu quả thao tác, bởi vì – (- n – 1) – 1 = n + 1 – 1 = n. Nói cách khác, ~ – 16 bằng 15.

```js
const int = ~~"15"
console.log(int); // Result: 15
console.log(typeof int); Result: "number"
```

Mặc dù tôi có thể nghĩ về nhiều trường hợp sử dụng, toán tử bitwise NOT cũng có thể được sử dụng trên booleans: ~ true = -2 và ~ false = -1.
# 6. Quyền hạn nhanh
Kể từ ES7, có thể sử dụng toán tử lũy thừa ** như một cách viết tắt cho các quyền hạn, nhanh hơn so với viết Math.pow (2, 3). Đây là công cụ đơn giản, nhưng nó làm cho danh sách vì không có nhiều hướng dẫn đã được cập nhật để bao gồm toán tử này!

```js
console.log(2 ** 3); // Result: 8
```

Điều này không nên nhầm lẫn với biểu tượng ^, thường được sử dụng để biểu thị số mũ, nhưng trong JavaScript là toán tử XOR bitwise.

Trước ES7, tốc ký chỉ tồn tại đối với các quyền hạn với cơ sở 2, sử dụng toán tử dịch chuyển trái bit bit <<:
Các biểu thức sau là tương đương:

```js
// The following expressions are equivalent:Math.pow(2, n);
2 << (n - 1);
2**n;
```

2 << 3 = 16 tương đương với 2 ** 4 = 16.
# 7. Nổi nhanh đến số nguyên
Nếu bạn muốn chuyển đổi một số float thành một số nguyên, bạn có thể sử dụng Math.floor (), Math.ceil () hoặc Math.round (). Nhưng cũng có một cách nhanh hơn để cắt một số float thành một số nguyên bằng cách sử dụng |, toán tử bitwise OR.

```js
console.log(23.9 | 0); // Result: 23
console.log(-23.9 | 0); // Result: -23
```

Hành vi của | khác nhau tùy thuộc vào việc bạn có xử lý các số dương hay âm hay không, do đó, tốt nhất chỉ nên sử dụng phím tắt này nếu bạn chắc chắn.

Nếu n dương, n | 0 vòng hiệu quả xuống. Nếu n âm, nó làm tròn hiệu quả. Nói một cách chính xác hơn, thao tác này sẽ loại bỏ bất cứ thứ gì có sau dấu thập phân, cắt bớt một số float thành một số nguyên.

Bạn có thể có được hiệu ứng làm tròn tương tự bằng cách sử dụng ~ ~, như trên và trên thực tế, bất kỳ toán tử bitwise nào cũng sẽ buộc một số float đến một số nguyên. Lý do các hoạt động cụ thể này hoạt động là – một khi bị ép buộc vào một số nguyên – giá trị được giữ nguyên.

**Xóa các chữ số cuối cùng**

Toán tử bitwise OR cũng có thể được sử dụng để loại bỏ bất kỳ số lượng chữ số nào từ cuối số nguyên. Điều này có nghĩa là chúng tôi không phải sử dụng mã như thế này để chuyển đổi giữa các loại:

```js
let str = “1553”;
Number(str.substring(0, str.length – 1));
```

Thay vào đó, toán tử bitwise OR cho phép chúng ta viết:

```js
console.log(1553 / 10 | 0) // Result: 155
console.log(1553 / 100 | 0) // Result: 15
console.log(1553 / 1000 | 0) // Result: 1
```
# 8. Đóng sách tự động trong các lớp học
Chúng ta có thể sử dụng ký hiệu mũi tên ES6 trong các phương thức lớp và bằng cách đó, ràng buộc được ngụ ý. Điều này thường sẽ lưu một vài dòng mã trong trình xây dựng lớp của chúng tôi và chúng tôi có thể vui vẻ nói lời tạm biệt với các biểu thức lặp đi lặp lại như this.myMethod = this.myMethod.bind(this)

```js
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
# 9. Cắt một mảng
Nếu bạn muốn loại bỏ các giá trị từ cuối một mảng một cách triệt để, thì có những lựa chọn thay thế nhanh hơn so với sử dụng splice ().

Ví dụ: nếu bạn biết kích thước của mảng ban đầu, bạn có thể xác định lại thuộc tính độ dài của nó, như vậy:

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.length = 4;
console.log(array); // Result: [0, 1, 2, 3]
```

Đây là một giải pháp đặc biệt súc tích. Tuy nhiên, tôi đã tìm thấy thời gian chạy của phương thức lát () thậm chí còn nhanh hơn. Nếu tốc độ là mục tiêu chính của bạn, hãy xem xét sử dụng một cái gì đó như thế này:

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array = array.slice(0, 4);
console.log(array); // Result: [0, 1, 2, 3]
```
# 10. Nhận (các) mục cuối cùng trong một mảng
Phương thức mảng () có thể lấy các số nguyên âm và nếu được cung cấp, nó sẽ lấy các giá trị từ cuối mảng thay vì bắt đầu.

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]
```
# 11. Định dạng mã JSON
Cuối cùng, bạn có thể đã sử dụng JSON.opesify trước đây, nhưng bạn có nhận ra rằng nó cũng có thể giúp thụt lề JSON cho bạn không?

Phương thức stringify () có hai tham số tùy chọn: hàm thay thế, bạn có thể sử dụng để lọc JSON được hiển thị và giá trị không gian.

Giá trị không gian lấy một số nguyên cho số lượng khoảng trắng bạn muốn hoặc một chuỗi (chẳng hạn như ‘\ t’ để chèn các tab) và nó có thể giúp đọc dữ liệu JSON được tìm nạp dễ dàng hơn rất nhiều.

```js
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
// Result:
// '{
//     "alpha": A,
//     "beta": B
// }'
```

Nhìn chung, mình hy vọng bạn thấy những lời khuyên này hữu ích như mình đã làm khi mình lần đầu tiên phát hiện ra chúng.

Bai viết của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.