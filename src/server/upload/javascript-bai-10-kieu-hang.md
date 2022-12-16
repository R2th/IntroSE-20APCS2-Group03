Giống với lộ trình học CSS mà chúng ta đã đi qua trước đó, ở đây chúng ta lại bắt đầu một chu kỳ mới trong vòng xoáy đệ quy mang tên `học JavaScript`.

Trích đoạn bài viết [[CSS] Bài 9 - Kết Hợp Các Bộ Chọn](https://viblo.asia/p/WAyK8rxWlxX):
> *Trong mọi khía cạnh của cuộc sống, cách tự nhiên nhất mà chúng ta học bất kỳ thứ gì, chắc chắn không bao giờ là một lộ trình học tập thẳng tắp. Chặng đường mà chúng ta phải đi qua luôn luôn là các đường xoáy đệ quy liền mạch và tiếp diễn không ngừng.*  
>  
> `Một đường xoáy đệ quy`  
> ![](https://images.viblo.asia/56f47327-f338-4bd0-b016-e7b4c8a859d7.jpg)  
>
> *Chúng ta khởi đầu bằng việc học một vài thứ cơ bản và rồi bắt đầu tạo ra thứ gì đó; Sau đó chúng ta lại quay trở lại với những kiến thức trọng tâm để học nhiều thêm một chút nữa, và tạo ra những thứ mới tốt đẹp hơn một chút; Và cứ như vậy.... Và bây giờ thì chúng ta đang bắt đầu một chu kỳ mới bằng việc học thêm về các bộ chọn CSS. 😄*

Trong bài viết này, chúng ta sẽ quay lại với chủ đề về `Kiểu` đã được giới thiệu trong [**bài JavaScript số 2**](https://viblo.asia/p/bWrZnAvQKxw). Tuy nhiên thì thay vì gặp lại `Biến` ở phần sau, chúng ta sẽ được gặp gỡ một khái niệm mới có tên gọi là `Hằng`. Trông tên gọi khác nhau vậy thôi chứ `Biến` và `Hằng` có nhiều điểm giống nhau lắm. :D

## Các kiểu dữ liệu trong JavaScript & Chuyển kiểu dữ liệu

Từ góc nhìn tổng quan nhất về các Kiểu dữ liệu mà chúng ta đã đi qua thì về cơ bản JavaScript có 2 nhóm dữ liệu chính là các giá trị đơn nguyên `primitive` và các đối tượng `object`.

Các giá trị `primitive` là các giá trị `không thay đổi`, được biểu thị ở cấp độ lưu trữ dữ liệu bậc thấp nhất của ngôn ngữ, và được JavaScript phân bổ thành 7 kiểu dữ liệu với tên gọi lần lượt là:

- `number` - biểu thị các giá trị số học, được chia thành 2 nhóm `Number` và `BigInt`. Trong đó `BigInt` được sử dụng để biểu thị các giá trị số học rất rất lớn.
- `string` - biểu thị các dữ liệu văn bản, là một dãy các ký tự được biểu thị trong bộ nhớ của máy tính ở dạng các giá trị số nguyên dương.
- `boolean` - biểu thị 2 trạng thái của 1 đồng xu xoay lật. Kiểu này chỉ có 2 giá trị: `true` và `false`.
- `null` - kiểu dữ liệu đại diện cho trạng thái dữ liệu được lưu trữ là vô nghĩa; Có 1 giá trị duy nhất là `null`.
- `undefined` - một biến chưa được gán giá trị nào thì sẽ có giá trị mặc định là `undefined` và thuộc kiểu `undefined`.
- `symbol` - một biểu tượng `symbol` là một giá trị không trùng lặp ở bất kỳ đâu khác, và thường được sử dụng làm thành phần định danh cho một `object`, giống như `id` trong HTML, hoặc số CMND của bạn. :D Chúng ta vẫn chưa có bài viết nào về `symbol` vì chưa có tình huống ứng dụng, tuy nhiên sẽ sớm thôi. :D

Nhóm dữ liệu thứ 2 là các `object` thì chúng ta không thể liệt kê phân loại được, bởi vì về cơ bản là không có giới hạn. Mỗi một `class` có thể được xem là một kiểu dữ liệu và chúng ta có thể thực hiện phép kiểm tra một `object` bất kỳ có thuộc `class` đó hay không. Tuy nhiên, chúng hãy cùng nói một nút về các `class` đại diện cho các kiểu `primitive`.

Với mỗi một kiểu `primitive` được liệt kê ở trên (ngoại từ `null` và `undefined`), thì JavaScript có định nghĩa sẵn một `class` tương ứng để biểu thị và cung cấp các công cụ để làm việc với kiểu dữ liệu đó:

- [Tài liệu về class `Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Tài liệu về class `BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [Tài liệu về class `String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Tài liệu về class `Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- [Tài liệu về class `Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

Ví dụ như đối với kiểu `number` thì chúng ta có class `Number` và `BigInt` cung cấp các công cụ để làm việc với các giá trị số học. Chúng ta cũng có thể sử dụng các `class` này để tạo ra các `object` bao quanh một giá trị số học `primitive`.

```number.js
var primitiveTen = 10;
var objectTen = new Number(primitiveTen);
var binaryTen = objectTen.toString(2);
console.log(binaryTen);
// kết quả: '1010'
```

Khi chúng ta gọi một hàm được đóng gói từ một giá trị `primitive` với giả định là đang làm việc với một `object`, các môi trường chạy JavaScript đều xử lý bằng cách tạo ra một `object` vỏ bọc tạm thời để dòng lệnh có thể được thực thi, và sau đó `object tạm` sẽ được xóa đi.

```number.js
// `objectTen` sẽ được tạo ra tạm thời
// để thay vào vị trí của `10`
var binaryTen = 10.toString(2);
console.log(binaryTen);
// kết quả: '1010'
```

Object cơ sở `Number` thực chất là một hàm `function` và có thể được sử dụng để chuyển đổi một giá trị từ một kiểu dữ liệu khác thành một giá trị `number` ở dạng `primitive`. Tính năng này được JavaScript triển khai tương tự ở các `class` tương ứng với các kiểu `primitive` khác.

```number.js
var stringTen = '10';
var numberTen = Number(stringTen);
console.log(numberTen);
// kết quả: 10
```

Và khi một phép toán được thực hiện giữa các giá trị khác kiểu, thì các môi trường chạy JavaScript sẽ tự động `tạm thời` quy đổi các giá trị sang cùng kiểu để thực hiện tính toán. Về quy tắc chuyển đổi thì 1 phần sẽ phụ thuộc vào `mong muốn` của chúng ta khi thực hiện thao tác giữa 2 giá trị, và 1 phần là phụ thuộc vào quy ước định trước của ngôn ngữ.

Ví dụ như phép `+` giữa 1 `string` và 1 `number`, từ góc nhìn của nhiều người có thể sẽ là muốn tự động chuyển `string` thành một giá trị `number` và thực hiện phép cộng số học. Tuy nhiên quy ước định trước của JavaScript đã được đồng thuận và sử dụng từ khi ngôn ngữ này xuất hiện, đó là dấu `+` ở đây biểu thị cho một phép nối chuỗi.

Vì vậy nên nếu như chúng ta muốn viết ra những đoạn code để bất kỳ ai cũng có thể đọc hiểu được (kể cả người chưa từng lập trình), thì JavaScript có cung cấp các hàm để thể biểu thị thao tác mà chúng ta muốn thực hiện rõ nghĩa hơn.

```string.js
var template = 'Ý nghĩa của vũ trụ: ';
var message = template.concat(42);
console.log(message);
// kết quả: 'Ý nghĩa của vũ trụ: 42'
```

Để xem kiểu dữ liệu của một giá trị mà một biến nhận được trong thời gian chương trình vận hành, chúng ta có thể sử dụng phép kiểm tra `typeof`. Thao tác này sẽ trả về kết quả là một chuỗi mô tả tên Kiểu.

```primitive.js
var something = 1001;
console.log(typeof something);
// kết quả: 'number'
```

Để xem tên `class` cơ sở của một `object` bất kỳ, chúng ta truy xuất biến tham chiếu tới  hàm khởi tạo `constructor`, rồi tìm tới biến `name`.

```object.js
var tenObject = new Number(10);
var theClass = tenObject.constructor.name;
console.log(theClass);
// kết quả: 'Number'
```

## Sử dụng Hằng trong JavaScript

Một Hằng hay `constant` cũng là một chiếc hộp để lưu trữ giá trị giống như một Biến `variable` mà chúng ta đã biết trước đó. Điểm khác biệt cơ bản nhất là chúng ta sẽ không thể bỏ giá trị đang được lưu trữ ra - để thay một giá trị mới vào trong hộp. Lấy ra để xem thì được, nhưng thay thế thì không! :D

```constant.js
const infinity = 10.01;
infinity = 10;
// console hiện thông báo lỗi
```

Tuy nhiên để nói rõ hơn về tính bất biến của `const`, chúng ta sẽ xem xét một trường hợp ví dụ khác dưới đây.

```const.js
var firstObject = { value: 1 };
var secondObject = { value: 2 };

const reference = firstObject;

reference.value = 1001;
console.log(firstObject);   // { value: 1001 }

reference = secondObject;
// TypeError: không thể gán giá trị vào một hằng
```

Ở đây chúng ta có 2 object khác nhau được lưu địa chỉ tham chiếu vào 2 biến `firstObject` và `secondObject`. Sau đó chúng ta tạo ra một hằng `reference` lưu địa chỉ tham chiếu sao chép từ biến `firstObject`. Sau đó chúng ta sử dụng hằng `reference` để truy xuất địa chỉ tham chiếu và thao tác thay đổi giá trị của `object` đầu tiên. Thao tác này hoàn toàn hợp lệ bởi vì thứ mà hằng `reference` đang lưu trữ là `địa chỉ tham chiếu` của `object` đầu tiên. Và từ khóa `const` sẽ đảm bảo rằng chúng ta sẽ không thể thay thế một `địa chỉ tham chiếu` mới vào trong chiếc hộp `reference`. Còn nội dung bên trong `object` đầu tiên thì chúng ta vẫn có thể thay đổi tùy ý.

Bản chất của ví dụ đầu tiên cũng như vậy. Hằng `infinity` sau khi được tạo ra sẽ lưu `địa chỉ tham chiếu` tới một vùng bộ nhớ của máy tính đang mô tả giá trị số học `10.01` dạng `primitive`. Ở câu lệnh tiếp theo, giá trị số học `10` sẽ được lưu ở một vùng bộ nhớ khác và có một địa chỉ tham chiếu khác. Chúng ta không thể thay đổi `địa chỉ tham chiếu` mà hằng `infinity` đang lưu trữ bởi từ khóa `const`.

Một đặc tính khác của hằng - đó là hằng còn giúp chúng ta tránh được trường hợp khai báo lặp khi chúng ta có nhiều hàm trong một tệp JavaScript được viết khá dài.

```library.js
const doubleIt = function(num) { return num * 2 };
   // --- 1001 hàm khác ở đoạn giữa tệp
const doubleIt = function(str) { return str.concat(str) };
// console hiện thông báo lỗi
```

Nếu chúng ta sử dụng cú pháp khai báo hàm `function doSomeThing()`, hoặc gán một hàm không tên vào biến `var doSomeThing`,  thì khi trình chạy JavaScript đi tới đoạn khai báo lặp sẽ ngầm hiểu là chúng ta muốn ghi đè đoạn code đã viết trước đó. Điều này có thể sẽ dẫn tới tình huống code sẽ vận hành khác với dự kiến của chúng ta và việc tìm/sửa lỗi cũng khó thực hiện hơn.

## Đâu đó xen giữa Biến và Hằng

Chúng ta cũng có thể tạo ra những chiếc hộp lưu trữ dữ liệu bằng từ khóa `let` (hãy để).

```let.js
let itBe = 'Connie Talbot';
```

Về cơ bản thì những chiếc hộp `let` giống với những chiếc hộp `var` ở chỗ là chúng ta có thể thay thế giá trị đang lưu trữ bằng một giá trị khác; Và giống với những chiếc hộp `const` ở chỗ là chúng ta không thể tạo ra những chiếc hộp mới trùng tên với những chiếc đã tồn tại.

```let.js
let itBe = 'Connie Talbot';
let itBe = 1001;
// console hiện thông báo lỗi
```

Thực ra giữa 2 nhóm hộp mới và những chiếc hộp `var` cũng còn một chút sự khác biệt nữa, tuy nhiên chúng ta sẽ để dành cho bài viết tiếp theo về `Hàm & Vùng`.

## Các phép gán giá trị có cách viết thu gọn

Khi nói tới `let` mình mới chợt nhớ ra rằng chúng ta thường phải thực hiện thao tác gán giá trị cho các Biến. Trong những trường hợp nhất định, chúng ta có thể sẽ không muốn tạo ra một biến mới để lưu giá trị nhận được sau mỗi thao tác xử lý tính toán. Ví dụ như các biến đóng vai trò làm bộ đếm số học.

```counter.js
var counter = 0;
counter = counter + 1;
```

Ở vị trí của dòng lệnh thứ 2, chúng ta có thể viết ngắn gọn hơn một chút và vẫn duy trì được khả năng mô tả của code khá tốt với các phép gán thu gọn.

```counter.js
var counter = 0;
counter += 1;
```

Bên cạnh đó thì chúng ta cũng còn những phép gán thu gọn cho các phép tính số học khác nữa.

```assign.js
var n = 0;
n += 1;    // 1
n -= -1;   // 2
n /= 2;    // 1
n *= 3;    // 3
n %= 2;    // 1
```

Bài viết về chủ đề `Kiểu & Hằng` của chúng ta đến đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ quay lại với chủ để về `Hàm & Vùng` đã được giới thiệu trong `bài JavaScript số 3`.
Bây giờ thì chúng ta hãy nghỉ giải lao một chút trước khi tiếp tục. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[Let It Be - Connie Talbot](https://www.youtube.com/watch?v=alQEpSCCAKM)

[[JavaScript] Bài 11 - Hàm & Vùng](https://viblo.asia/p/63vKjAaR52R)