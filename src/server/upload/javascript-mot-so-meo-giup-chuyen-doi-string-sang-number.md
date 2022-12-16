![](https://images.viblo.asia/7261dda6-6ac0-4df4-95b0-88b0a0bcd1f8.png)
Làm việc với javascript chắc hẳn không ít lần chúng ta cần chuyển đổi kiểu dữ liệu từ String sang Number. Trong bài viết này mình sẽ giới thiệu một số cách hữu hiệu mà mình thường hay dùng.

# parserInt()
Đây là function thường hay được sử dụng dùng để parse string sang number tùy theo hệ cơ số và giá trị trả về luôn là một số nguyên.  Ví dụ
```
var x = parseInt('100.1', 10);
x; //=> 100
```

với hệ cơ số xác định từ 2 -> 36, trong trường hợp không truyền hệ cơ số thì javascript sẽ tự parse theo nguyên tắc sau
* String bắt đầu bằng "0x" hoặc "0X" => hệ cơ số 16 (hexadecimal)
* String bắt đầu bằng "0" => hệ cơ số 8 (octal) hoặc 10 (decimal) tuỳ thuộc vào trình duyệt
* String bắt đầu bằng các số khác thì => hệ cơ số 10 (decimal)
* String bắt đầu không phải là số => NaN

# parseFloat()
Khác với parseInt thì parseFloat sẽ trả về kết quả là một số float. Ví dụ
```
var x = parseFloat('100.1');
x; //=> 100.1
```

# Math.floor()
Phương thức này cũng tương tự với parseInt sẽ trả về một số nguyên.
```
var x = Math.floor('100');
x; //=> 100
```

# Toán tử +
Đây là cách mình thường hay dùng nhất vì nó ngắn gọn và hữu hiệu khi có các giá trị lẫn lộn vừa string vừa number. Ví dụ
```
var x = +'100';
x; //=> 100

var y = +'100.1';
y; //=> 100.1
```

Tương tự như + thì các toán tử (-, *, /) cũng tương tự.
```
var x = '100' * 1;
x; //=> 100

var y = '100' / 1;
y; //=> 100

var z = '100' - 0;
z; //=> 100
```

# Number() function
Lưu ý đây là function chứ không phải constructor. Function này sẽ tạo ra 1 số thông thường chứ không phải 1 object number.
```
var x = new Number("6666");
console.log(x); // => Number {6666}

var y = Number("6666");
console.log(y); // => 6666
```

# Toán tử dịch bit
```
var x = '100' >>> 0;
x; //=> 100
```

# Format number
Với việc hiển thị một số lớn thì rất khó để quan sát nên cần format chúng để có thể dễ quan sát hơn (100000 => 100,000)
Với các số nhỏ thì chúng ta có thể sử dụng phương thức `toLocaleString()`
```
var x = 1000000;
x.toLocaleString(); //=> "1.000.000"
```
Nhưng một vấn đề xẩy ra là nếu như số quá lớn với độ dài lớn hơn 16 kí tự thì việc format bằng phương thức này sẽ dẫn đến sai số.
```
var x = 111111111111111111;
x.toLocaleString(); //=> "111,111,111,111,111,100"
```

Muốn có thể format được các số lớn như vậy thì chúng ta cần phải define một method để làm việc này
```
const addCommas = value => {
  const stringFormat = `${value}`;
  const x = stringFormat.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const regex = /(\d+)(\d{3})/;
  while (regex.test(x1)) {
    x1 = x1.replace(regex, '$1,$2');
  }
  return x1 + x2;
};
var x = '111111111111111111';
addCommas(x); //=> "111,111,111,111,111,111"

```
Vì kiểu số trong javascript chỉ có giá trị -(2^53 - 1) đến (2^53 - 1) nên đễ lưu trữ được số lớn chỉ có thể lưu ở dạng string.

# Tạm Kết
Trên đây là một số cách hữu hiệu để chuyển đổi từ String sang Number tùy vào từng trường hợp mà bạn có thể sử dụng chúng.