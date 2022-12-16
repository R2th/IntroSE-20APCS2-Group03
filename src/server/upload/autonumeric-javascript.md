## 1. Giới thiệu autoNumeric?

**autoNumeric** là một thư viện Javascript độc lập cung cấp định dạng trực tiếp cho các số và đơn vị tiền tệ quốc tế.

Hiện tại phiên bản ổn định mới nhất là bản 4.2.* (nhánh master), nếu muốn thử tính năng mới bạn có thể xem trong các nhánh tiếp theo nhé.

### 1. Điểm nổi bật

* ***Dễ sử dụng và dễ cấu hình***

```js
// Initialization
new AutoNumeric('.myInput', { currencySymbol : '$' });
```
* ***Khả năng cấu hình cao (hơn 40 tùy chọn có sẵn)***
```js
// The options are...optional :)
const autoNumericOptionsEuro = {
    digitGroupSeparator        : '.',
    decimalCharacter           : ',',
    decimalCharacterAlternative: '.',
    currencySymbol             : '\u202f€',
    currencySymbolPlacement    : AutoNumeric.options.currencySymbolPlacement.suffix,
    roundingMethod             : AutoNumeric.options.roundingMethod.halfUpSymmetric,
};
 
// Initialization
new AutoNumeric(domElement, autoNumericOptionsEuro);
```
* ***Định hướng trải nghiệm người dùng; sử dụng autoNumeric vừa phải và tự nhiên, đặc biệt với tính năng chuỗi chức năng***
```js
anElement.french()
         .set(42)
         .update({ options })
         .formSubmitJsonNumericString(callback)
         .clear();
 ```
* ***Hỗ trợ hầu hết các định dạng số và tiền tệ quốc tế***

* ***Hỗ trợ một phần cho trình duyệt Chrome dành cho thiết bị di động***

Và ngoài ra:

* ***Mọi định dạng khác nhau có thể được sử dụng cùng lúc trên cùng một trang.***

* ***Mỗi đầu vào có thể được định cấu hình bằng cách đặt các tùy chọn làm thuộc tính dữ liệu HTML5 hoặc chuyển trực tiếp dưới dạng đối số trong mã Javascript***
* ***Có thể dễ dàng thay đổi cài đặt bất kỳ lúc nào bằng phương pháp `update` hoặc thông qua `callback`***
* ***autoNumeric hỗ trợ các `input` cũng như hầu hết các phần tử văn bản với thuộc tính có thể thay đổi nội dung, cho phép bạn đặt các số và đơn vị tiền tệ được định dạng trên bất kỳ phần nào trên trang của bạn***
* ***Các phần tử AutoNumeric có thể được liên kết với nhau cho phép bạn thực hiện một hành động trên nhiều phần tử cùng một lúc***
* 8 tùy chọn tiền tệ được xác định trước cũng như 33 tùy chọn phổ biến cho phép bạn sử dụng trực tiếp AutoNumeric bằng cách bỏ qua bước cấu hình tùy chọn
* 26 phương thức tích hợp cung cấp cho bạn sự linh hoạt cần thiết để sử dụng AutoNumeric hết tiềm năng của nó
* 22 phương pháp toàn cục cho phép kiểm soát các tập hợp phần tử được quản lý bằng Số tự động cùng một lúc
* 21 phương pháp bổ sung chuyên dụng để quản lý việc quản lý và gửi biểu mẫu
* Chế độ công thức cho phép nhanh chóng nhập và đánh giá các biểu thức toán học bên trong phần tử
* 17 hàm tĩnh được cung cấp bởi lớp AutoNumeric
* Và hơn 40 tùy chọn cho phép bạn tùy chỉnh chính xác định dạng và hành vi tiền tệ của mình
 
 ### 2. Cài đặt
 Bạn có thể cài đặt AutoNumeric với trình quản lý phụ thuộc ưa thích của mình:
 ```js
 # with `yarn` : 
yarn add autonumeric
# or with `npm` : 
npm install autonumeric --save
```

### 3. Cách sử dụng

#### 3.1 Trên trình duyệt
Chỉ cần include `autoNumeric` trong thẻ <header> của trang html. Không cần phụ thuộc vào tệp hay thư viện khác.
```html
<script src="autoNumeric.min.js" type="text/javascript"></script>
<!-- ...or, you may also directly use a CDN :-->
<script src="https://cdn.jsdelivr.net/npm/autonumeric@4.5.4"></script>
<!-- ...or -->
<script src="https://unpkg.com/autonumeric"></script>
```
    
#### 3.2 Trong tập lệnh khác
Nếu bạn muốn sử dụng AutoNumeric trong mã của mình, bạn có thể nhập tệp src / AutoNumeric.js dưới dạng mô-đun ES6 bằng cách sử dụng:
```js
import AutoNumeric from 'autonumeric';
```
Sau đó, bạn có thể khởi tạo AutoNumeric có hoặc không có tùy chọn
```js
// autoNumeric with the defaults options
anElement = new AutoNumeric(domElement);
 
// autoNumeric with specific options being passed
anElement = new AutoNumeric(domElement, { options });
 
// autoNumeric with a css selector and a pre-defined language options
anElement = new AutoNumeric('.myCssClass > input').french();
```
    
#### 3.3 Trong Web Workers
```js
import AutoNumeric from '../node_modules/autonumeric/src/main';
```
### 4. autoNumeric được sử dụng dựa trên yếu tố ?
* với trình xử lý sự kiện khi được sử dụng trên các phần tử `<input>` hoặc trên các phần tử hỗ trợ nội dung có thể làm cho chúng trở nên phản ứng (ở chế độ đọc /ghi) hoặc
* không có trình xử lý sự kiện khi được sử dụng trên các phần tử DOM không có thuộc tính contenteditable được đặt thành true, về cơ bản hoạt động như một chế độ chỉ đọc định dạng một lần và quên.

### 5. Trong phần tử `<input>`
Khi được sử dụng trên phần tử `<input>`, bạn sẽ có thể tương tác với giá trị của nó và nhận giá trị đầu vào được định dạng theo kiểu bạn nhập, sử dụng toàn bộ tính năng của `autoNumeric`.

Xin lưu ý rằng do các hạn chế của trình duyệt, chỉ các loại `<input>` được hỗ trợ sau được hỗ trợ:

* `text`,
* `tel`,
* `hidden`, hoặc
* Không có loại nào được chỉ định
```html
<input type='text' value="1234.56">
<input type='tel' value="1234.56">
<input type='hidden' value="1234.56">
<input value="1234.56">
```
Chú ý : kiểu số không được hỗ trợ đơn giản vì `AutoNumeric` định dạng số dưới dạng chuỗi (tức là. '123.456.789,00 & # 8364;') mà kiểu nhập này không cho phép.

### 5. Thay đổi nội dung trên các phần tử được áp dụng

Bất kỳ phần tử nào trong Danh sách được phép sau đây hỗ trợ thuộc tính có thể thay đổi nội dung đều có thể được khởi tạo bằng `autoNumeric`. Điều này có nghĩa là bất kỳ nơi nào trên một trang, trên bất kỳ phần tử `DOM` nào, bạn đều có thể khai thác sức mạnh của `autoNumeric` sẽ cho phép bạn che dấu đầu vào của người dùng.

Cho mã html sau ...:
```html
<p id="editableDom" contenteditable="true">12345678.9012</p>
 ```
bạn có thể khởi tạo phần tử <p> này bằng autoNumeric:
```js
new AutoNumeric('#editableDom').french();
 ```
... và nó sẽ hoạt động chính xác như một phần tử `<input>` được điều khiển bởi autoNumeric.
    
**On other DOM elements**
    
Bạn có thể sử dụng `AutoNumeric` để định dạng giá trị phần tử `DOM` khi load.
Điều này có nghĩa là nó sẽ không phản ứng với bất kỳ tương tác nào của người dùng.

Các yếu tố sau được chấp nhận:
    
```js
const allowedTagList = [
    'b', 'caption', 'cite', 'code', 'const', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3',
    'h4', 'h5', 'h6', 'ins', 'kdb', 'label', 'li', 'option', 'output', 'p', 'q', 's', 'sample',
    'span', 'strong', 'td', 'th', 'u'
]
```
Tips nè:

* *Vì loại số không được hỗ trợ, nếu bạn muốn hiển thị bàn phím số khi chọn phần tử được quản lý bằng Số tự động trong trình duyệt trên điện thoại di động, bạn có thể sử dụng loại số điện thoại đầu vào.*
* *Trong tương lai, bạn sẽ có thể thêm thuộc tính Html inputmode = "numeric" để đạt được hiệu quả tương tự.*

Còn các option tùy chọn mình sẽ viết tiếp trong bài sau nhé.
    
Source:
https://www.npmjs.com/package/autonumeric