**1. Number object**

Đối tượng Number được xây dựng có các thuộc tính cho các hằng số, chẳng hạn như giá trị maximum, not-a-number và infinity. Bạn không thể thay đổi các giá trị của các thuộc tính này và bạn sử dụng chúng như sau:

```
var biggestNum = Number.MAX_VALUE;
var smallestNum = Number.MIN_VALUE;
var infiniteNum = Number.POSITIVE_INFINITY;
var negInfiniteNum = Number.NEGATIVE_INFINITY;
var notANum = Number.NaN;
```
Bạn luôn tham chiếu một thuộc tính của đối tượng Number được xác định trước như được hiển thị ở trên, chứ không phải là thuộc tính của một đối tượng Number mà bạn tự tạo ra.

Bảng dưới đây tóm tắt thuộc tính của đối tượng Number:

| Property | Description |
| -------- | -------- | 
| `Number.MAX_VALUE`     | Số biểu diễn lớn nhất  | 
| `Number.MIN_VALUE` | Số biểu diễn nhỏ nhất |
| `Number.NaN` | giá trị "not a number" đặc biệt |
| `Number.NEGATIVE_INFINITY` | giá trị negative infinite đặc biệt, trả về  overflow |
| `Number.POSITIVE_INFINITY` | Special positive infinite value; returned on overflow |
| `Number.EPSILON` | Sự khác biệt giữa giá trị 1 và giá trị nhỏ nhất lớn hơn một giá trị có thể được biểu diễn dưới dạng Số. |
| `Number.MIN_SAFE_INTEGER` | Minimum safe integer in JavaScript |
| `Number.MAX_SAFE_INTEGER` | Maximum safe integer in JavaScript |

Các method của Number:

| Method | Description |
| -------- | -------- | 
| `Number.parseFloat()`     | Phân tích một đối số chuỗi và trả về một số floating point. Giống như hàm parseFloat() | 
| `Number.parseInt()` | Phân tích một đối số chuỗi và trả về một số interger. Giống như hàm parseInt()  |
| `Number.isFinite()` | Xác định xem giá trị được truyền có là một số hữu hạn. |
| `Number.isInteger()` | Xác định xem giá trị được truyền có phải là số nguyên hay không. |
| `Number.isNaN()` | Xác định xem giá trị được truyền là NaN hay không |
| `Number.isSafeInteger()` | Xác định xem giá trị được cung cấp có phải là số nguyên là số nguyên an toàn. |

Nguyên mẫu số cung cấp các phương pháp để lấy thông tin từ các đối tượng `Number` trong các định dạng khác nhau. Bảng dưới đây tóm tắt các phương thức của `Number.prototype`.

| Method | Description |
| -------- | -------- | 
| `toExponential()` | Trả về một chuỗi đại diện cho số trong exponential notation. |
| `toFixed()` | Trả về một chuỗi đại diện cho số trong fixed-point notation. |
| `toPrecision()` | Trả về một chuỗi đại diện cho số đến một độ chính xác xác định trong fixed-point notation. |

**2. Math object**

Đối tượng Math được xây dựng có các thuộc tính và phương thức cho các hằng số và hàm toán học. Ví dụ, thuộc tính PI của đối tượng Math có giá trị pi (3.141 ...), mà bạn sẽ sử dụng trong một ứng dụng như:

> Math.PI

Tương tự, các hàm toán học tiêu chuẩn là các phương thức của toán học. Các hàm này bao gồm các hàm lượng giác, hàm lôgic, hàm mũ, và các hàm khác. Ví dụ, nếu bạn muốn sử dụng hàm lượng giác sin, bạn sẽ viết:

> Math.sin(1.56)

Lưu ý rằng tất cả các phương thức lượng giác của Toán lấy các đối số theo radian.

Bảng dưới đây tóm tắt các phương thức của đối tượng Math.

| Method | Description | 
| -------- | -------- | 
| abs()     | Giá trị tuyệt đối  | 
| sin(), cos(), tan()    | Các hàm lượng giác chuẩn; với các đối số trong radian.  | 
| asin(), acos(), atan(), atan2()  | Hàm lượng giác nghịch đảo; giá trị trả về theo radian.  | 
| sinh(), cosh(), tanh()     | Hàm hyperbol; đối số trong góc hyperbol.  | 
| asinh(), acosh(), atanh()    | Hàm hyperbol đảo ngược; trả lại các giá trị trong góc hyperbol.  | 
| pow(), exp(), expm1(), log10(), log1p(), log2()  | Hàm mũ và logarithmic.  | 
| floor(), ceil()   | Trả về số nguyên lớn nhất / nhỏ nhất ít hơn hoặc bằng đối số. | 
|   min(), max()   | Trả về giá trị nhỏ nhất hoặc lớn nhất (tương ứng) của một danh sách các số được phân cách bằng dấu phẩy làm đối số. | 
|   random()   | Trả về một số ngẫu nhiên giữa 0 và 1. | 
| round(), fround(), trunc(),     | Các hàm làm tròn và cắt xén. | 
| sqrt(), cbrt(), hypot()     | căn bậc hai, căn bậc ba, căn bậc hai của tổng các đối số vuông. | 
|  sign()   | Dấu của một số, cho biết số đó là dương, âm hay không. | 
|  clz32(), imul() | Số lượng các bit không bằng 0 hàng đầu trong biểu diễn nhị phân 32 bit. Kết quả của nhân giống như C-32 bit của hai đối số. | 

Không giống như nhiều đối tượng khác, bạn không bao giờ tạo ra một đối tượng Math của riêng bạn. Bạn luôn luôn sử dụng được xây dựng trong đối tượng Math.

**3. Date object**

JavaScript không có loại dữ liệu ngày tháng. Tuy nhiên, bạn có thể sử dụng đối tượng Date và các phương thức của nó để làm việc với ngày tháng và thời gian trong các ứng dụng của bạn. Đối tượng Date có một số lượng lớn các phương thức để thiết lập, nhận và thao tác ngày tháng. Nó không có bất kỳ thuộc tính nào.

JavaScript xử lý ngày tương tự như Java. Hai ngôn ngữ có nhiều phương thức date giống nhau, và cả hai ngôn ngữ lưu trữ ngày như Unix Timestamp là số mili giây kể từ ngày 1 tháng 1 năm 1970, 00:00:00.

Phạm vi đối tượng Date là -100.000.000 ngày đến 100.000.000 ngày liên quan đến ngày 01 tháng 1 năm 1970 UTC.

Để tạo một đối tượng Date:

> var dateObjectName = new Date([parameters]);

ở đây `dateObjectName` là tên của đối tượng Date đã được tạo. nó có thể là một đối tượng mới hoặc thuộc tính của đối tượng đang tồn tại.

Gọi `Date` thông qua từ khóa `new` trả về một string tương ứng với thời gian hiện tại.

`parameters` có thể có cú pháp như sau:

- Tạo thời gian của hôm nay: **today = new Date();**
- string tương ứng với một ngày có dạng: "Month day, year hours:minutes:seconds."  tương ứng với cú pháp: **var Xmas95 = new Date("December 25, 1995 13:30:00")** nếu bạn bỏ qua giá trị nào thì cho tương ứng giá trị 0 vào vị trí đó.
- một bộ giá trị interger cho năm, tháng, ngày: **var Xmas95 = new Date(1995, 11, 25)**
- một bộ giá trị interger cho năm, tháng, ngày, giờ, phút và giây: **var Xmas95 = new Date(1995, 11, 25, 9, 30, 0);**

**Các method của đối tượng Date**

- phương thức "set", để thiết lập ngày và thời gian giá trị trong các đối tượng Date.
- phương thức "get", để nhận được ngày và thời gian giá trị từ các đối tượng Date.
- phương thức "to", để trả về giá trị chuỗi từ đối tượng Date.
- phương thức parse và UTC để phân tích cú pháp chuỗi Date.

Với phương thức "get" và "set" bạn có thể lấy và thiết lập giây, phút, giờ và ngày của tháng, ngày của tuần, tháng và năm. Đó là phương thức "getDay" trả về ngày của tuần, nhưng không tương ứng với phương thức "setDay" bởi vì ngày của tuần được thiết lập tự động. 

- giây và phút: từ 0 đến 59
- giờ: từ 0 đến 23
- thứ: từ 0 (Sunday) đến 6 (Saturday)
- ngày: từ 1 đến 31 (day of the month)
- tháng: từ 0 (January) đến 11 (December)
- năm: years since 1900

ví dụ:

>var Xmas95 = new Date('December 25, 1995');

ví dụ:

```
var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
endYear.setFullYear(today.getFullYear()); // Set year to this year
var msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft); //returns days left in the year
```

Trên đây là một số kiến thức cơ bản về một số object. cảm ơn các bạn đã theo dõi bài viết.

Tham khảo:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates