Chào các bạn , hôm nay mình lại quay lại đây, hôm nay mình sẽ chia sẻ cho các bạn về cách tối ưu code JS của mình. Mình mới khi đi làm lúc nào cũng có tư tưởng là code để nó chạy là ngon rồi , cần gì phải tối ưu rách việc tốn time, time đấy để làm task khác cho nhanh, nhưng khi làm lâu rồi , rồi làm với team nhiều người mới biết tối ưu code của mình nó quan trọng như nào. Nhiều hôm ngồi đọc lại những đoạn code của mình ngày xưa xong bảo ngồi debug lại xem luồng nó chạy thế nào cũng toát cả mồ hôi, =)) 

Tối ưu code không những giúp ứng dụng của bạn chạy nhanh, tạo cảm giác mượt mà khi maintain mình làm việc cũng nhanh hơn, sau đây là những mẹo để tối ưu code

#  Reduce library dependencies
Điều đầu tiên chúng ta đề cập tới đó là giảm những thư viện không cần thiết, thời gian tải một website phụ thuộc rất nhiều của thư viện, do đó khuyên bạn nên sử dụng chúng càng ít càng tốt hoặc tốt nhất là không dùng tới nó. Một cách tuyệt vời để giải quyết vấn đề này đó là các bạn nên tận dụng những kỹ thuật hay các thư viện thích hợp sẵn của browser.
#  Minify JavaScript
Điều này chắc không một ai trong số developer js đều không biết đến kỹ thuật này. Một kỹ thuật đơn giản nhưng mang lại hiểu quả rất cao. Xóa dữ liệu dư thừa và không cần thiết khỏi code của bạn mà không ảnh hưởng đến cách browser xử lý tài nguyên đó chính là minification. Ví dụ, loại bỏ code không sử dụng, rút ngắn chức năng và tên biến, nhận xét mã và định dạng. Một tool có thể giúp bạn rất phổ biến đó là Google Closure Compiler. Điều này cũng giúp webiste của bạn được google ưu tiên hơn những trang khác vì có sự khác biệt về tốc độ tải.
#  Minimize scope chain Immediate
scope chain, các đối số của hàm và bất kỳ biến được khai báo cục bộ nào sẽ được khởi tạo khi bất kỳ hàm nào được thực thi trong JavaScript. Vì vậy, để truy cập vào một biến được khai báo toàn cầu, cần có thời gian để leo lên scope chain. Sử dụng keyword "this" khóa này và giảm call stack’s Dept sẽ tăng tốc độ thực thi. Các bạn nên tìm hiểu thêm scope chain là gì?
> Scope chain thiết lập cho mỗi scope một function nhất định. Mỗi function lại định nghĩa nested scope riêng như ta đã biết, và mỗi function được định nghĩa trong một function khác đều là local scope được liên kết với function bên ngoài – sự kết nối ấy được gọi là chain. Khi giải quyết một biến, JS bắt đầu với scope bên trong, sau đó tìm kiếm dần mở rộng ra bên ngoài cácbiến/object/function cho đến khi chúng được tìm thấy.
> 
# Using ‘this’ keyword
this keyword hoạt động như local chain và  nó làm giảm sự phụ thuộc vào các biến toàn cục cũng như closures trong các chuỗi phạm vi cao hơn. Ngược lại, khuyên bạn nên tránh with keyword. Bởi vì nó có thể sửa đổi scope chain, xem ví dụ này:
```js
var Car = Object.create({
    init: function(brand) {
        this.brand = brand;
    },
    do: function(callback) {
        callback.apply(this);
    }
});

var audi = new Car('audi');
audi.do(function() {
    alert(this.brand); // 'audi' is alerted because 'this' was rewired
});
```
#  Use Async and Defer
Nó rất quan trọng trong việc tải hay load một page với nhiều thư viện. Synchronous loading cần đợi cho đến khi asset trước kết thúc load nhưng tải không đồng bộ có thể asynchronous loading. 
Vì vậy, để tận dụng tải asynchronous loading, hãy sử dụng các thuộc tính async. Ví dụ:

```js
<script src="/example.js" async></script>
//load example.js without interrupting webpage rendering
```
# Cache as much as possible
Đương nhiên rồi với một mẹo cache các bạn đã giúp hiệu năng tăng lên một cách đáng kể, thay vì các bạn biết một object có thể lạp lại nhiều lần, vậy thì hà cớ gì các bạn lại lục lõi vào database để lấy kết quả mà bạn đã biết trước. Tahy vì điều đó các bạn hãy tận dụng cache của browser, nó sẽ giúp bạn rất nhiều trong việc thực thi data.
#  Taking advantage of native functions
ECMAScript là một thư mục rất lớn của các cấu trúc native. Còn chờ đợi gì nưã sử dụng các hàm và native functions sẽ tối ưu hóa hiệu suất JavaScript hơn là viết các thuật toán riêng hoặc dựa vào các đối tượng máy chủ. Trong blog anonystick có rất nhiều bài nói về ECMAScript các bạn nên tìm đọc. 
# Trim HTML
Thời gian tải của một truy vấn và các đối tượng DOM được sửa đổi chủ yếu phụ thuộc vào trang web HTML HTML. Giảm một nữa HTML của một ứng dụng có thể tăng gấp đôi tốc độ DOM. Nó khó khăn nhưng loại bỏ không cần thiết và các thẻ sẽ là một khởi đầu tuyệt vời cho website của bạn.

# Kết luận
Đây là những mẹo mà mình đã từng áp dụng hoặc cũng từng tìm hiểu qua mong với chút kiến thức chia sẻ cho mn có thể giúp mn code 1 cách tốt hơn

Tham khảo: https://askbootstrap.com/web-tips-and-tricks/top-10-javascript-optimisation-tips-to-sharpen-your-professional-skill/