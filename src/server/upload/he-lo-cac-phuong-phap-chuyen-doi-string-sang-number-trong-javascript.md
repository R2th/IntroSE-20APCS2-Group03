Ok xin chào mọi người! Chém gió vậy thôi chứ các phương pháp có từ rất lâu và mình muốn gửi tới những bạn chưa có cơ hội được biết đến :D Bài trước mình có chia sẻ 1 chút về các cách kiểm tra [String tồn tại Substring trong Javascript
](https://viblo.asia/p/vo-van-cach-de-kiem-tra-string-ton-tai-substring-trong-javascript-1VgZv16rKAw). Ở bài viết lần này, mình xin giới thiệu cho các bạn các cách để chuyển đổi (convert) String sang Number, và tất nhiên vẫn là trong Javascipt. Cùng theo dõi nội dung bên dưới nhé.

![](https://images.viblo.asia/7d90983e-bf70-4e8e-b5e3-48c118101ea3.jpg)
# 1. Sử dụng Number() function
Theo mình, cách tốt nhất chính là sử dụng hàm `Number()` 

```js
const x = new Number("6699");
console.log(x); // => Number {6699}

const y = Number("6699");
console.log(y); // => 6699
```

- Xem thêm 1 vài ví dụ khác:
```js
const x = Number('66,99');
console.log(x); // => NaN

const y = Number('66.99');
console.log(y); // => 66.66

const z = Number('6699');
console.log(z); // => 6699
```
- Qua ví dụ trên, bạn thấy rằng: nếu String truyền vào không phải Number thì kết quả thu được là NaN, nếu tham số truyền vào không phải số nguyên thì kết quả không bị làm tròn.
- **Lưu ý rằng:** Không sử dụng `Number() constructor` vì Number() constructor (sử dụng với **từ khoá new** ở ví dụ đầu tiên) sẽ tạo mới một Number Object với rất nhiều thứ kèm theo. Còn Number() function sẽ tạo ra một số thông thường (primitive).

# 2. Sử dụng parseInt()
Phương thức parseInt() là một giải pháp thường hay được sử dụng. Phương thức này sẽ parse String tuỳ theo hệ cơ số xác định. Vì vậy, mình đã thường xuyên sử dụng cách này để convert String sang Number trong JavaScript.

```js
const x = parseInt('1000.12', 10);
console.log(x); // => 1000

const y = parseInt('1000', 16);
console.log(y); // => 4096

const z = parseInt('1000', 8);
console.log(z); // => 512

const t = parseInt('1000', 2);
console.log(t); // => 8 
```

Với giá trị của hệ cơ số hợp lệ là từ 2 đến 36. Trong trường hợp bạn không truyền giá trị của hệ cơ số vào thì JavaScript sẽ tự parse theo nguyên tắc:
- String bắt đầu bằng "0x" hoặc "0X" => hệ cơ số 16 (hexadecimal)
- String bắt đầu bằng "0" => hệ cơ số 8 (octal) hoặc 10 (decimal) tuỳ thuộc vào trình duyệt
- String bắt đầu bằng các số khác thì => hệ cơ số 10 (decimal)
- String bắt đầu không phải là số => NaN

```js
const x = parseInt('1000.12');
console.log(x); // => 1000

const y = parseInt('0x1000');
console.log(y); // => 4096

const z = parseInt('01000');
console.log(z); // => 1000

const t = parseInt('b1000');
console.log(t); // => NaN
```
Hơi khó tưởng tượng, tốt nhất là luôn truyền vào giá trị của hệ cơ số muốn parse để luôn thu được giá trị như mong muốn. :D

# 3. Phương thức parseFloat()
Tương tự và nếu như phương thức parseInt() luôn trả về kết quả là một số nguyên thì phương thức parseFloat() sẽ trả về kết quả là một số float.

```js
const x = parseFloat('1000,12', 10);
console.log(x); // => 1000

const y = parseFloat('1000.12', 10);
console.log(y); // => 1000.12

const z = parseFloat('1000.120', 10);
console.log(z); // => 1000.12

const t = parseFloat('1000', 10);
console.log(t); // => 1000
```
# 4. Sử dụng toán tử +
Một "trick" nữa cho các bạn đó là sử dụng `toán tử +` phía trước string, có thể coi đây là 1 cách **hack** nhẹ :D
```js
const x = +'1000,12';
console.log(x); // => NaN

const y = +'1000.12';
console.log(y); // => 1000.12

const z = +'1000.120';
console.log(z); // => 1000.12

const t = +'1000';
console.log(t); // => 1000
```
- Và cũng như cách sử dụng Number(), nếu string ko phải Number thì sẽ return về NaN

# 5. Sử dụng toán tử *
Nói chung, đây là một trong những các có hiệu năng nhanh nhất, hoạt động như toán tử + , do đó, nó không thực hiện convert thành số nguyên nếu số đó là số float.
```js
const x = '1000,12' * 1;
console.log(x); // => NaN

const y = '1000.12' * 1;
console.log(y); // => 1000.12

const z = '1000.120' * 1;
console.log(z); // => 1000.12

const t = '1000' * 1;
console.log(t); // => 1000
```
- Còn 2 toán tử **-** và **/** nữa và cách sử dụng tương tự 2 toán tử ở trên.

# 6. Sử dụng Math.floor()
Phương thức Math.floor() khá giống với phương thức parseInt() phía trên. Xem ví dụ nhé:
```js
const x = Math.floor('1000.12');
console.log(x); // => 1000

const y = Math.floor('0x1000');
console.log(y); // => 4096

const z = Math.floor('01000');
console.log(z); // => 1000

const t = Math.floor('b1000');
console.log(t); // => NaN
```
- Cho dù String của bạn là số thập phân, hàm vẫn return về số nguyên.

# 7. Tổng kết
- Trên đây là một số cách để convert String sang Number trong JavaScript. Để so sánh tốc độ giữa các cách này, bạn có thể tham khảo và viết thêm testcase để so sánh  [ở đây](https://jsperf.com/). Cám ơn các bạn đã theo dõi, hẹn gặp lại.
- Tham khảo: [flaviocopes.com](https://flaviocopes.com/how-to-convert-string-to-number-javascript/)
![](https://images.viblo.asia/3f2fafbc-34e7-4ad7-9c79-3e3824db4892.png)