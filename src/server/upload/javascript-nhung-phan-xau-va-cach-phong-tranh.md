## Types
Các biến trong javascript không được chỉ định kiểu. Nó có thể là Object, Symbol, String, Number, Boolean, Null và Undefined. Kể khả khi bạn kiểm tra biến của bạn có phải là một Object không, bạn phải làm như sau:

```
if (typeof myObject === "object" && myObject !== null)
```

Bởi vì một object có thể là kiểu Object và vẫn có thể null. Điều này tệ vì nó làm cho code trở nên tối nghĩa.

Cách khắc phục: Đó là khi mọi người bắt đầu sử dụng  TypeScript và FlowType.
## Number

Thật khủng khiếp khi những con số trong javascript là **double-precision floating points**. Nó có nghĩa là bạn không có kiểu integer. Có vấn đề gì với điều này? Hãy xem xét thử:

![](https://images.viblo.asia/a8052ad3-2a06-44a0-9eee-4e688f8b0dd8.png)

0.1 + 0.2 bằng 0.300…4. Điều này thật tồi tệ khi bạn muốn kiểm tra `0.1 + 0.2 === 0.3`.

Một lần nữa, để giải thích điều này, ta sẽ phải nói rất nhiều về cách các số float được thể hiện trong máy tính, vì vậy bây giờ chỉ cần biết đây là loại icerberg.

Cách khắc phục: Đây không phải là mội lỗi mà là một thiết kế. Bạn có thể giải quyết nó bằng cách sử dụng một thư viện khác, chẳng hạn như binary.js.
## Coercion
Coercion là gì? Khi bạn gõ `typeof myVar === "number"`, bạn thực sự đang tìm hiểu xem loại giá trị mà myVar đang trỏ đến có phải là một số không. Sẽ rất quan trọng để hiểu điều này.
```
let myVar = 10; // typeof myVar === "number"
myVar = "Hello World!"; // typeof myVar === "string
```

Bây giờ, điều gì xảy ra khi bạn muốn thực hiện một thao tác với hai biến, có giá trị là các kiểu khác nhau?
```
let a = 10;
let b = "10";
let c = a + b; // ???
```

Số thập phân 10 được biểu thị khác với chuỗi 10. Ví dụ, số 10 có thể được biểu thị bằng 8 bit là 00001010. Chuỗi 10, được mã hóa bằng hai ký tự ASCII * : 00110000 (48) và 00110001 (49).

Để thực hiện tính toán chính xác, Javascript Engine phải đảm bảo cả hai toán hạng đều cùng loại. Và JS cố gắng làm điều tốt nhất cho bạn, vì vậy trong trường hợp này, nó sẽ cho rằng bạn chỉ muốn nối một số thập phân 10 với một chuỗi '10' và trả về một giá trị chuỗi '1010'.

Bởi vì hầu hết các lựa chọn triển khai được thực hiện cho bạn trong thế giới JS, bạn phải rất cẩn thận. Và bạn biết ở đâu điều này có thể làm tổn thương bạn nhất?
### User Inputs

Hãy tưởng tượng một người dùng nhập một số tiền mà anh ta muốn đầu tư. Và bạn muốn anh ta mất một khoản phí cho việc này. Và bạn làm như sau:
```
let totalCost = 1 + moneyInvested
```

Vào buổi chiều, bạn nhận được một cuộc gọi tin nhắn về việc bạn là một thằng khốn do anh ta muốn đầu tư 100 € nhưng bạn thực sự đã lấy 1100 €.

Cách khắc phục: để tránh để JS thực hiện công việc cưỡng chế cho bạn, bạn phải tự chuyển đổi các loại.
* Để chuyển đổi Chuỗi thành số: parseInt
* Để chuyển đổi một chuỗi thành một float: parseFloat
* Để chuyển đổi số thành chuỗi, sử dụng hàm .toString()
* Để chuyển đổi String thành Boolean `var myBoolean = myString === "true";`

Hãy cẩn thận về sự ép buộc khi có điều kiện và các vòng lặp. [Đọc bài viết này để biết thêm chi tiết về nó](https://hackernoon.com/understanding-js-coercion-ff5684475bfc)
## Callback hell
![](https://images.viblo.asia/1289be51-3f54-4b73-aa66-6b0942de653d.jpeg)

Hình ảnh này nói lên tất cả về Callback hell là gì và tại sao nó lại được đặt tên như vậy.

Cách khắc phục: may mắn thay, có rất nhiều giải pháp cho điều này:
* Promises
* Async / Await 
* Generators

## Global Variables
Các biến trong Javascript là toàn cục bất cứ khi nào chúng có thể. Bạn có thể sử dụng một biến mà bạn chưa từng định nghĩa, và nó trở thành biến toàn cục:
```
function foo() {
    x = 10; // Whoops
}
foo();
console.log(x); // 10
```

Nếu bạn đang mở trình duyệt, bạn có thể gọi nó từ window object: `window.x`

Tại sao các biến toàn cục không tốt?
* Vì một số không gian được phân bổ mà bạn sẽ không bao giờ lấy lại được cho đến khi bạn vô hiệu hóa chúng một cách rõ ràng bằng cách gọi `window.x = null`
* Nó gây ra các hiệu ứng phụ trong các hàm của bạn sử dụng nó, điều này làm cho cách hiểu mã trở nên phức tạp hơn
* Những người khác cũng có thể đã sử dụng biến này cho một thư viện hoặc một cái gì đó. Tệ hơn thế, người ta có thể tiêm mã độc vào biến toàn cục sẽ khiến mã của bạn bị sập hoặc tệ nhất là thông tin rò rỉ.
* Rất khó để kiểm tra các biến toàn cục, vì chúng là toàn cục và việc sử dụng chúng rất khó xác định.

Cách khắc phục: Đừng bao giờ sử dụng chúng. Có rất nhiều cách để không phải sử dụng biến toàn cục. Luôn sử dụng let và const khi bạn khai báo một biến. Và nếu bạn không chắc chắn, hãy sử dụng **strict**.
## Tham khảo
[https://medium.com/@Rewieer/javascript-the-bad-parts-and-how-to-avoid-them-1a7c9bc5a0dd](https://medium.com/@Rewieer/javascript-the-bad-parts-and-how-to-avoid-them-1a7c9bc5a0dd)