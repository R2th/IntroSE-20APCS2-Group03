![](https://images.viblo.asia/d60e30ae-d15c-4671-b771-947d99e085d4.jpg)
- jQuery là một thư viện phía máy khách phổ biến nhất, trên thực tế hầu như mọi trang web đều sử dụng nó. Nó phổ biến vì dễ học, giúp phát triển nhanh, cung cấp mã sạch và giúp thực hiện chức năng phức tạp một cách dễ dàng. Nhưng nó cũng có nhược điểm làm giảm hiệu suất của trang web nếu không sử dụng đúng cách.
- Để đảm bảo hiệu suất tốt nhất của mã jQuery, người ta phải biết và làm theo các thực hành tốt nhất. Trong bài viết này, tôi sẽ liệt kê một số lời khuyên quan trọng nhất để tối ưu hóa hiệu suất của mã jQuery.

## 1. Load jQuery from CDN
- Mạng phân phối nội dung (CDN) là một hệ thống các máy chủ phân tán cung cấp các trang web và nội dung web khác cho người dùng dựa trên vị trí địa lý của họ, nguồn gốc của trang web và máy chủ phân phối nội dung. 
- Tải jQuery từ CDN là một lựa chọn tốt, vì nó giảm thiểu thời gian tải trang web và nó cũng làm giảm việc tải trên máy chủ của bạn. Caching là một lợi thế khác với CDN. Nếu bất kỳ trang web nào khác mà người dùng truy cập trước đây đang sử dụng jQuery từ CDN thì version được lưu trong bộ nhớ cache sẽ được sử dụng lại, nó sẽ không phải tải xuống lần nữa. Google CDN là CDN ưa thích cho jQuery:
```
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
```
- Bạn cũng có thể sử dụng jQuery CDN:
```
<script src="//code.jquery.com/jquery-3.1.1.min.js "></script>
```
- Lưu ý, không có giao thức nào được chỉ định trong khi tham chiếu đến thư viện jQuery. **Protocol-less** URL là cách tốt nhất để tham chiếu nội dung của bên thứ 3 mà có sẵn thông qua cả HTTP và HTTPS. Khi giao thức bị bỏ qua, browser sẽ sử dụng giao thức của tài liệu cơ bản thay thế. Nếu không, bạn sẽ nhận được cảnh báo nội dung hỗn hợp.

## 2. Loading jQuery locally in case of CDN unavailability
- Tải jQuery từ CDN là lựa chọn ưu tiên, nhưng việc sử dụng phương pháp này đồng nghĩa với việc mã jQuery sẽ ngừng hoạt động nếu CDN không hoạt động. Đây là một sự cố hiếm khi xảy ra nhưng đôi khi nó xảy ra và trong trường hợp này thư viện jQuery sẽ không được tải. Chương trình sau đó yêu cầu quay lại phiên bản cục bộ của jQuery khi thư viện jQuery không được tải từ CDN. Đoạn mã dưới đây sẽ kiểm tra xem jQuery có được tải từ CDN không. Nếu không, nó sẽ tải các thư viện jQuery từ thư mục Script của trang web.
```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
if (typeof jQuery == 'undefined')
{
    document.write(unescape("%3Cscript src='Scripts/jquery.3.1.1.min.js' type='text/javascript'%3E%3C/script%3E"));
}
</script>
```

## 3. Don't wait for $(document).ready()
- $(document).ready() là một lựa chọn phổ biến nhất để lưu trữ tất cả các mã jQuery của bạn. Tuy nhiên, trong trường hợp của một trang web lớn hoặc nặng với rất nhiều scripts và images, sự kiện document ready có thể bị delay khi sử dụng phương pháp này. Hầu hết các mã jQuery không cần phải chờ một trong hai điều này.
- $(document).ready() quan trọng nhất khi code tương tác với các DOM element được insert ngay sau khi tập lệnh được thực thi. Nếu code không yêu cầu tương tác với DOM, nó có thể bị xóa khỏi $(document).ready(). Hãy xem ví dụ sau:
```
$(document).on('click', '#btnClick', function() {
    console.log('Click event!!!');
});
$(document).ready(function() {});
```
- Ở đây, sự kiện click được gắn vào button thông qua ủy quyền sự kiện, ngay cả trước khi "document ready" được gọi. Thực hành này có thể làm tăng hiệu suất trang web của bạn. Bạn có thể đọc thêm ở bài viết này: [tham khảo](https://jack.ofspades.com/speed-up-your-website-load-time-by-not-waiting-for-document-ready/)

## 4. Cache your jQuery selector
- Sử dụng Caching có thể cải thiện hiệu năng của jQuery một cách đáng kể. Xem ví dụ dưới đây:
```
$("#elm").css("color", "red");
$("#elm").css("font-family", "Tahoma");
$("#elm").text("blah blah!");
```
- Vấn đề với mã jQuery ở trên là nó phải duyệt qua DOM 3 lần, mỗi lần cho 1 yếu tố riêng biệt (color, font và text). Quá trình duyệt DOM là một hoạt động rất tốn kém. Một cách để giảm số lượng duyệt là sử dụng Caching selector:
```
var $elm = $("#elm1").css("color", "red");
$elm.css("font-family", "Tahoma");
$elm.text("blah blah!");
```
- Ở đây, dòng lệnh đầu tiên lưu trữ jQuery selector và sau đó 2 dòng lệnh tiếp theo có thể sử dụng biến được lưu trữ. Theo cách này, jQuery  chỉ cần duyệt qua DOM một lần. Điều này rất hữu ích trong trường hợp các function dài trong đó cần liên tục tham chiếu các phần tử giống nhau. Đoạn code ở trên vẫn có thể tối ưu hóa thông qua **chaining** đó là cách tiếp tiếp theo tôi muốn nói đến.

## 5. Use jQuery Chaining
- Chaining là một trong những tính năng mạnh mẽ nhất của jQuery. Chaining có nghĩa là kết nối các selector hoặc các function một cách lần lượt. Ví dụ:
```
$("#elm").css({ "color": "red", "font-family": "Tahoma"}).text("example text");
```
- Trong trường hợp này cũng vậy, jQuery sẽ chỉ duyệt qua DOM 1 lần. Chaining cũng có thể được sử dụng cho method hoặc function:
```
$("#btnDoSomething").click(function(e) {
    console.log("click!");
}).mouseover(function(e) {
    console.log("mouse over!")
}).mouseout(function(e) {
    console.log("mouse out!")
});
```
- Đoạn code trên gắn các sự kiện click, mouseover và mouseout vào button thông qua việc chaining chúng. Chaining làm cho code trông ngắn gọn, sạch sẽ và nó cũng mang lại hiệu suất tốt.

## 6. Optimize your jQuery selector
- Sau đây là một số cách để cải thiện hiệu suất jQuery trong khi sử dụng **selector**:

***1. Use ID as your selector***
- Nếu có thể, luôn sử dụng element ID làm selector thay vì HTML tag hoặc CSS Class. Đối với ID selector, jQuery thực hiện gọi phương thức getElementById() của tập lệnh Java, ánh xạ trực tiếp đến phần tử.
```
$(document).ready(function(){
	$("#elm").css("color", "red");
});
```
***2. Do not use CSS class selector exclusively*** 
- CSS class selector được sử dụng để chọn các element với một CSS class cụ thể. Có những tình huống khi bạn muốn tương tác với nhiều thành phần DOM và trong những trường hợp đó ID selector không thể sử dụng. Hiệu suất với CSS class selector có thể được sử dụng bằng cách giảm thời gian duyệt DOM. Như ví dụ sau, mã jQuery sau đây chọn tất cả DOM element với CSS class tên "dummy" và thay đổi background color:
```
$(document).ready(function() {
    $(".dummy").css("background-color", "yellow");
});
```
- Mã jQuery ở trên có thể giảm thời gian duyệt DOM bằng cách sử dụng HTML tag cùng với CSS class:
```
$(document).ready(function() {
    $("p.dummy").css("background-color", "yellow");
});
```

***3. Know how selectors are executed:***
- Trước khi tối ưu hóa bất kỳ đoạn code nào, điều quan trọng là phải biết đoạn code được thực thi như thế nào. Tương tự, nó cũng rất quan trọng để biết cách các jQuery selector được thực thi. jQuery selector được gọi là [Sizzle](https://github.com/jquery/sizzle/wiki) phân tích selector từ phải sang trái. Điều đó có nghĩa là, các selector cuối cùng luôn được thực hiện đầu tiên trong trường hợp có nhiều selector trong một câu lệnh. Hãy rất cẩn thận trong khi chỉ định selector bên phải.
```
$('div.container .border')
```
- jQuery selector ở trên có thể được tối ưu hóa bằng cách tăng tính đặc hiệu cho selector ở bên phải:
```
$('.container div.border')
```
## Kết luận
- Tất cả các tip được đề cập ở trên có thể cải thiện hiệu suất jQuery của bạn, đáng chú ý nhất là cách giảm thời gian duyệt DOM để thực thi mã jQuery. Quá trình duyệt DOM là quá trình tốn kém nhất và các jQuery selector đóng một vai trò lớn trong đó. jQuery là tuyệt vời nhưng nếu không tối ưu nó có thể dẫn đến hiệu suất ứng dụng kém, vì vậy hãy đảm bảo bạn thực hiện các tip này!
- Tham khảo: [How to Optimize jQuery Code for Better Performance](https://jqueryhouse.com/how-to-optimize-jquery-code-for-better-performance/)