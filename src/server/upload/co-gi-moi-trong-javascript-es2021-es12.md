## Giới thiệu
Mỗi năm, bản cập nhật Javascript bổ sung thêm các tính năng mới. ES2021 (còn được gọi là ES12) dự kiến sẽ được phát hành vào tháng 6 năm nay. Các tính năng mới được thêm vào mỗi năm trải qua một quá trình bốn giai đoạn. Tất cả các tính năng được liệt kê dưới đây, tại thời điểm viết bài đã đi đến giai đoạn cuối và rất sẵn sàng cho việc phát hành.

### String.prototype.replaceAll

Trong Javascript, phương thức `replace()` chỉ thay thế lần xuất hiện đầu tiên của một mẫu trong một chuỗi. Nếu chúng ta muốn thay thế tất cả các kết quả phù hợp của một mẫu trong một chuỗi, cách duy nhất để đạt được điều đó là chúng ta cung cấp mẫu dưới dạng `regular expression`

```javascript
const str = "macOS is way better than windows. I love macOS.";
const newStr = str.replace("macOS", "Linux");
console.log(newStr);
// Linux is way better than windows. I love macOS.

const newStr2 = str.replace(/macOS/g,"Linux");
console.log(newStr2);
// Linux is way better than windows. I love Linux.
```

Phương thức đề xuất `replaceAll()` trả về một chuỗi mới với tất cả các kết quả phù hợp của một mẫu được thay thế bằng một chuỗi thay thế.

```javascript
const str = "macOS is way better than windows. I love macOS.";
const newStr = str.replaceAll("macOS", "Linux");
console.log(newStr);
// Linux is way better than windows. I love Linux.
```

### Logical Assignment Operator
Với các toán tử gán logic mới được đề xuất `&&=` ,  `||=`,  `??=` - chúng ta có thể gán một giá trị cho một biến dựa trên một phép toán logic. Nó kết hợp phép toán logic với biểu thức gán.

#### Phép gán logic AND (`&&=`)
Toán tử gán logic `AND` chỉ thực hiện phép gán khi toán hạng bên trái là `truthy`. Ngược lại, nếu toán hạng bên trái là `falsy` (`false`, `0`, `-0`, `0n`, `“”`, `null`, `undefined` và `NaN`), phép gán không được thực hiện.

```javascript
let x = 10;
let y = 15;

x &&= y;
// Equivalent: x && (x = y)

console.log(x);
// 15

x = 0;
x &&= y;
console.log(x);
// 0
```

Có thể hiểu đơn giản như là `if(x) { x = y; }`
#### Phép gán logic OR (`||=`)

Toán tử gán logic `OR ` chỉ thực hiện phép gán khi toán hạng bên trái là `falsy` (`false`, `0`, `-0`, `0n`, `“”`, `null`, `undefined` và `NaN`). Ngược lại, nếu toán hạng bên trái là `truthy`, phép gán sẽ không được thực hiện.

```javascript
let x = null;
let y = 15;

x ||= y;
// Equivalent: x || (x = y)

console.log(x);
// 15

x = 10;
x ||= y;
console.log(x);
// 10

```

Giống như là `if(!x) { x = y; }`

#### Phép gán logic Nullish (`??=`)
Toán tử gán Logic Nullish chỉ thực hiện phép gán khi toán hạng bên trái là rỗng (`undefined` hoặc `null`). Nếu không sẽ không thực hiện.
```javascript
let x = null;
let y = 15;

x ??= y;
// Equivalent: x ?? (x = y)

console.log(x);
// 15

x = 10;
x ??= y;
console.log(x);
// 10
```
Có thể hiểu như này  ```
if(x == null || x == undefined) { x = y; }.```
### Numeric Separators
Các ký tự số lớn rất khó để mắt người phân tích cú pháp nhanh chóng. Ví dụ, hãy xem xét số 1019436871.42. Chúng ta phải chú ý kỹ để thấy được, và cũng không tránh khỏi những nhầm lẫn. 

Để cải thiện khả năng đọc, bổ sung mới này cho ngôn ngữ Javascript cho phép gạch dưới làm dấu phân cách trong các ký tự số. Chúng ta có thể viết lại số tương tự là 1_019_436_871.42. Và nó hoạt động cho tất cả các loại chữ số:
```javascript
// A decimal integer literal with its digits grouped per thousand:
1_000_000_000_000
// A decimal literal with its digits grouped per thousand:
1_000_000.220_720
// A binary integer literal with its bits grouped per octet:
0b01010110_00111000
// A binary integer literal with its bits grouped per nibble:
0b0101_0110_0011_1000
// A hexadecimal integer literal with its digits grouped by byte:
0x40_76_38_6A_73
// A BigInt literal with its digits grouped per thousand:
4_642_473_943_484_686_707n
```
Lưu ý: nó không ảnh hưởng đến kết quả, chỉ cải thiện khả năng đọc.
### Intl.ListFormat

Đối tượng Intl.ListFormat cho phép định dạng danh sách `language-sensitive`. Đối tượng ListFormat nhận hai tham số, cả hai đều là tùy chọn. Tham số đầu tiên là `language (locale)` và tham số thứ hai là một `options` object có hai thuộc tính - `style` và `type`

Intl.ListFormat có một phương thức được gọi là `format()`, phương thức này nhận một mảng làm đối số và định dạng nó theo các cách khác nhau phụ thuộc vào ngôn ngữ.
```javascript
const list = ['Motorcycle', 'Bus', 'Car'];

// English
 console.log(new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(list));
//  Motorcycle, Bus and Car

 console.log(new Intl.ListFormat('en', { style: 'short', type: 'disjunction' }).format(list));
//  Motorcycle, Bus or Car

// Dutch
 console.log(new Intl.ListFormat('nl', { style: 'long', type: 'conjunction' }).format(list));
//  Motorcycle, Bus en Car

// German
console.log(new Intl.ListFormat('de', { style: 'long', type: 'conjunction' }).format(list));
// Motorcycle, Bus und Car
```
### Promise.any
ES2021 sẽ giới thiệu method `Promise.any()` làm `short-circuits` và trả về một giá trị, ngay sau khi `Promise`   `resolved` đầu tiên từ danh sách / mảng các `Promise`. Nếu tất cả các `Promise` bị `rejected` thì nó sẽ ném ra `AggregateError`, một SubClass riêng lẽ nhóm lại với nhau.

Không giống như method `Promise.race()` tập trung vào `Promise` `rejected` điều đầu tiên, phương thức `Promise.any()` tập trung vào `Promise` `resolved` đầu tiên.
```javascript
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));
// quick
```

```javascript
const promise1 = Promise.reject(0);
const promise2 = Promise.reject(0);
const promise3 = Promise.reject(0);

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));
// AggregateError: All promises were rejected
```

## Tổng kết 
Là dev, điều quan trọng là phải luôn cập nhật các tính năng mới của 1 ngôn ngữ.
 Tôi hi vọng rằng tối đã có thể giới thiệu cho bạn một số tính năng mới của Javascript với ES2021. Cảm ơn các bạn đã đọc
 
 Nguồn: [tại đây](https://devdojo.com/piyushsinha24/modern-javascript-iii)