<p align="center">Cũng dạo ấy mưa dầm dề trút nước,</p>
<p align="center">Tay trong tay xuôi ngược mọi nẻo đường</p>
<p align="center">Từ Đà thành ra phố cổ thân thương,</p>
<p align="center">Thật hạnh phúc, dường như quên cả lạnh.</p>

Những đêm cuối tháng tư, hoà mình trong không khí Đất Nước kỉ niệm ngày giải phóng, tiết trời vẫn mang hơi thở lạnh cùng những ánh đèn mờ mờ trong sương giá.
![](https://images.viblo.asia/eb9c7ff2-682a-4de2-96e3-32adb1f19934.png)

Chẳng phải tự nhiên mà người ta nói Hội An về đêm thật đẹp. Cái đẹp không phải của ánh nắng sớm mai hay của chiều hoàng hôn đỏ rực, mà là cái đẹp của ánh đèn vàng nơi đường vắng, của ngọn lửa lênh đênh của những dải hoa đăng mang theo bao tâm tư chảy dài đến nơi chùa Cầu. Là nét đẹp của lao động, của những con người vất vả mưu sinh, chất phác trong hình ảnh cụ ông đội chiếc nón lá xuôi mái chèo để đưa du khách tham quan nơi quê hương thơ mộng của mình.

Người ta nói, ở Hội An nhất định phải đi đêm một lần cho biết. Đi để thả mình vào một Hội An không ồn ào, không nhộn nhịp bởi vẻ đẹp trầm lắng, quyến rũ, lưu luyến của biết bao kẻ dừng chân.

Hôm nay cũng đã hết một kỳ nghỉ lễ, để quay trở lại một tuần làm việc đầy năng lượng, mình sẽ tiếp nối [bài trước](https://viblo.asia/p/mot-vai-thu-thuat-frontend-cho-cuoc-song-nhe-nhang-hon-tap-1-gGJ59rMpKX2) với những tricks thú vị sau.

### 1. Short-Circuit Evaluation
Đôi khi fix bugs nhiều quá làm chúng ta hoa mắt, phải cẩn thận nhiều hơn. Tuy nhiên, khi bình tĩnh lại mình sẽ mạnh dạn apply những thứ ngắn gọn nhất. Ví dụ đây là lúc viết conditionals khi đang hoang mang
```js
if (this.result.data) {
  return this.result.data;
} else {
  return 'Fetching Data...';
}
```

Còn đây là lúc đang hoàn toàn tỉnh táo hoặc có người đứng phía sau xem mình múa

```js
return (this.result.data || 'Fetching Data...');
```
Toán tử ***ternary*** là một cách nhanh chóng để viết các câu điều kiện đơn giản ***và đôi khi không đơn giản*** như sau:

```js
x > 100 ? 'Above 100' : 'Below 100';

x > 100 ? (x > 200 ? 'Above 200' : 'Between 100-200') : 'Below 100';
```
Nhưng đôi khi các bạn lại bối rối trước ternary thì dưới đây cũng là một dạng so sánh giúp bạn dễ hình dung hơn.

```js
let one = 1;
let two = 2;
let three = 3;

console.log(one && two && three); // Result: 3

console.log(0 && null); // Result: 0
```
- Sử dụng `&&` sẽ trả về giá trị sai hoặc ***falsy value*** đầu tiên. Nếu mọi toán hạng ước lượng là `true`, biểu thức được đánh giá cuối cùng sẽ được trả về.

- Sử dụng `||` sẽ trả về giá trị `true` đầu tiên hoặc ***truthy value***. Nếu mọi toán hạng ước lượng thành `false`, biểu thức được đánh giá cuối cùng sẽ được trả về.

```js
let one = 1, two = 2, three = 3;

console.log(one || two || three); // Result: 1

console.log(0 || null); // Result: null
```

### 2. Filter các giá trị trùng lặp
Kiểu đối tượng Set đã được giới thiệu trong ES6 và cùng với ***spread operator***, chúng ta có thể sử dụng nó để tạo một mảng mới chỉ với các giá trị duy nhất.

```js
const list = [1, 1, 2, 3, 3, 5, 1]

const uniqueList = [...new Set(list)];

console.log(uniqueList); // Result: [1, 2, 3, 5]
```


### 3. Get the Last Item(s) in an Array
Phương thức trong array là `slice()` có thể lấy các số nguyên âm và nếu được cung cấp, nó sẽ lấy các giá trị từ cuối mảng thay vì bắt đầu.
```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(array.slice(-1)); // Result: [9]

console.log(array.slice(-2)); // Result: [8, 9]

console.log(array.slice(-3)); // Result: [7, 8, 9]
```

### 4. Format JSON Code
Anh em có thể đã sử dụng `JSON.stringify` trước đây, nhưng bạn có nhận ra rằng nó cũng có thể giúp bạn một format đẹp hơn khi output ra không? Phương thức `stringify()` có hai tham số tùy chọn: 

`replacer` function, bạn có thể sử dụng để lọc JSON được hiển thị và giá trị không gian.

`space` giúp bạn lấy một số nguyên cho số lượng khoảng trắng bạn muốn hoặc một chuỗi (chẳng hạn như '\ t' để chèn các tab) và nó có thể giúp đọc dữ liệu JSON được tìm nạp dễ dàng hơn rất nhiều.
```js
console.log(JSON.stringify({ ID: '001', event: 'Viblo May Fest 2022', author: 'KhuyenNH'}, null, '\t'));

// Result:
// '{
//   "ID": "001",
//   "event": "Viblo May Fest 2022",
//   "author": "KhuyenNH"
// }'
```

### 5. Truncate an Array - Cắt gọn một array
Có một điều này nếu bạn muốn loại bỏ các giá trị từ cuối một mảng một cách triệt để, thì không cần phải sử dụng slice () hoặc splice (). Chỉ cần:

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

array.length = 4;

console.log(array); // Result: [0, 1, 2, 3]
```
Tuy nhiên thủ thuật này chỉ hoạt động cho `array.length` chứ không phải cho các loại khác có length property (chẳng hạn như String hoặc Function)

### 6. Quick Rounding - Làm tròn số
Trước đây Nếu bạn muốn chuyển đổi một số float thành một số nguyên, bạn có thể sử dụng `Math.floor()`, `Math.ceil()` hoặc `Math.round()`. Nhưng cũng có một cách nhanh hơn bằng cách sử dụng `|`, toán tử ***bitwise*** hoặc ***bit***.

```js
console.log(22.9 | 0);  // Result: 23

console.log(-22.9 | 0); // Result: -23
```
Hành vi của `|` khác nhau tùy thuộc vào việc bạn có xử lý các số dương hay âm hay không, do đó, tốt nhất chỉ nên sử dụng phím tắt này nếu bạn chắc chắn. Remove số cuối thì sao? Thông thường chúng ta sẽ thực hiện điều này như code dưới.

```js
let str = "1553"; 

Number(str.substring(0, str.length - 1)); // output 155
```
Thay vào đó, toán tử bitwise hoặc bit cho phép chúng ta viết:

```js
console.log(1553 / 10   | 0)  // Result: 155

console.log(1553 / 100  | 0)  // Result: 15

console.log(1553 / 1000 | 0)  // Result: 1
```

### Tổng kết
Hi vọng với những thủ thuật trên sẽ giúp anh em có thêm những đoạn code clear hơn. Ngoài những tricks mình chia sẻ nếu bạn có cách tối ưu hơn hãy chia sẻ bên dưới nhé. Hãy tiếp tục đón xem phần sau, mình sẽ cùng mọi người chia sẻ thêm một vài thủ thuật thú vị khác nữa.