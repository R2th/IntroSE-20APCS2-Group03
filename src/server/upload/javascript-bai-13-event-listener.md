Trong bài viết này, chúng ta sẽ quay lại với chủ đề về các sự kiện `event` được tạo ra bởi thao tác của người dùng trong môi trường trình duyệt web. Lần trước, sau khi thảo luận xong về object `document`, chúng ta đã biết tới các object `event` và đã biết cách gắn một hàm xử lý sự kiện vào một phần tử HTML thông qua các thuộc tính sự kiện của phần tử đó. Tuy nhiên do thời lượng cần ưu tiên cho object `document` nên vẫn còn rất nhiều điều mà chúng ta chưa thể tìm hiểu hết về các sự kiện `event` trong môi trường trình duyệt web. Hãy cùng tìm hiểu thêm. :D

## Các đối tượng tham gia một chu trình xử lý sự kiện trong môi trường trình duyệt web

Trong một chu trình xử lý sự kiện của trình duyệt web, chúng ta có 3 đối tượng chính cần quan tâm:

- Object mô tả sự kiện [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) - được tạo ra bởi trình duyệt web khi người dùng thực hiện thao tác nào đó.
- Object mục tiêu [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) - mục tiêu mà trình duyệt web sẽ gửi sự kiện `Event` tới.
- Object nằm vùng nghe ngóng hóng theo sự kiện [EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) - được gắn vào `EventTarget` và khi có sự kiện `Event` gửi tới bởi trình duyệt web thì sẽ thực hiện xử lý.

Bây giờ thì chúng ta đã biết về khả năng mở rộng `extends` của các `class` sau khi tìm hiểu thêm về `object` ở bài trước. Điều này có nghĩa là các object có thể được sử dụng như `Event`, `EventTarget`, và `EventListener`, không nhất thiết phải là các object được tạo ra trực tiếp từ các `class` này. Cụ thể là chúng ta có các object `Element` mô tả các phần tử HTML cũng chính là các object `EventTarget`; Có thể nhận sự kiện `Event` do trình duyệt web phát động; Và có thể được gắn các các hàm xử lý sự kiện `EventListerner`.

## Một sự kiện Event được trình duyệt web phát động và gửi tới EventTarget như thế nào?

Theo như những gì mình đã dịch trong phần trên thì chắc là chúng ta sẽ có thể sử dụng được các phương thức trong tài liệu về `EventTarget` cho các object `Element`. Mình vừa tìm thấy trong [tài liệu của `EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) có phương thức `dispatchEvent` - được cho biết là phương thức dành cho code ở đâu đó có thể sử dụng để gửi một `Event` tới. Phải thử ngay mới được. :D

```event.html
<button id="the-button"> Emit Event </button>
```

```event.js
   /* Gắn hàm xử lý sự kiện cho nút nhấn `#the-button` */

var theButton = document.getElementById('the-button');

theButton.onclick = function(event) {
   console.log('Nghe ngóng hóng thấy một click chuột.');
};

   /* Tạo ra một `Event` và gửi tới mục tiêu `theButton` */

var click = new Event('click');

theButton.dispatchEvent(click);
// 'Nghe ngóng hóng thấy một click chuột.'
```

Ồ... vậy đó có thể cũng chính là cách mà trình duyệt web phát động các sự kiện và gửi tới các `object` mô tả phần tử HTML. Và bây giờ thì chúng ta cũng đã biết rằng, các sự kiện cũng có thể được tạo ra từ việc vận hành code chứ không chỉ từ thao tác của người dùng. Nếu vậy thì chúng ta sẽ có rất nhiều kiểu sự kiện khác nữa. Điều này còn mở ra một khả năng khác để chúng ta có thể chuyển tải các ý tưởng vào phần mềm linh động hơn.

Giả sử chúng ta đang có một thanh điều hướng phụ `sidebar` với một ô nhập từ khóa để lọc nhanh một danh sách liên kết kéo dài và ẩn đi những liên kết không liên quan tới từ khóa.

Cách xử lý thông thường là chúng ta sẽ viết hàm xử lý sự kiện gắn với ô nhập liệu và khi người dùng nhấn một phím nào đó thì chúng ta kiểm tra từ khóa và thực hiện truy xuất tới các liên kết để sàng lọc và ẩn bớt đi. Tức là code xử lý sự kiện đặt tại ô nhập liệu đang tác động lên những thành phần khác giống như một hành động của chủ thể là ô nhập liệu.

Thế nhưng bây giờ chúng ta cũng có thể tạo ra và gửi đi các sự kiện theo ý muốn. Nếu như chúng ta viết hàm xử lý sự kiện chung chung và gắn cho các liên kết, sau đó khi có sự kiện xảy ra ở ô nhập liệu thì chúng ta gửi sự kiện đó tới các liên kết và mỗi liên kết sẽ tự thực hiện xử lý sự kiện nhận được. Đây cũng là một cách triển khai code có logic phải không? :D

## Một cách thức khác để gắn hàm xử lý sự kiện cho các phần tử HTML

Trong tài liệu về `EventTarget` của MDN mình còn ngó thấy 2 phương thức `addEventListener` và `removeEventListener` để gắn hàm xử lý sự kiện hoặc gỡ bỏ. Thêm nữa là trong tài liệu về `addEventListener` thì dường như có nói là `EventTarget` có thể có nhiều hơn 1 `EventListener`. Chúng ta hãy thử thay thao tác gắn hàm vào thuộc tính `onclick` bằng phương thức `addEventListner` xem có gì khác không.

```event.js
   /* Gắn hàm xử lý sự kiện cho nút nhấn `#the-button` */

var theButton = document.getElementById('the-button');

theButton.addEventListener('click', function(event) {
   console.log('Nghe ngóng hóng thấy một click chuột.');
});

theButton.addEventListener('click', function(event) {
   console.log('Ở đây cũng hóng thấy một click chuột.');
});

   /* Tạo ra một `Event` và gửi tới mục tiêu `theButton` */

var click = new Event('click');

theButton.dispatchEvent(click);
// 'Nghe ngóng hóng thấy một click chuột.'
// 'Ở đây cũng hóng thấy một click chuột.'
```

Đúng là như vậy rồi. Với phương thức `addEventListener`, chúng ta sẽ có thể gắn nhiều hàm xử lý sự kiện vào một `object Element` thay vì gắn 1 hàm chủ đạo - rồi gọi tới các hàm xử lý sự kiện khác giống như trong code `dropdown` mà chúng ta đã thực hiện trước đó. :D

## Xây dựng một thanh điều hướng phụ với bộ lọc giúp tạm ẩn các liên kết không phù hợp

Như kế hoạch đã dự kiến từ bài viết trước, chúng ta sẽ cùng xây dựng một thanh điều hướng phụ `sidenav` dạng cột dọc giống như các trang tài liệu của các web hướng dẫn tự học lập trình mà chúng ta thường sử dụng W3schools, MDN, Bootstrap, jQuery, NodeJS, Tutorialspoint, v.v...

Và như thường lệ thì để duy trì nội dung của bài viết tập trung xoay quanh tiêu đề chính, chúng ta sẽ di chuyển phần này sang một bài viết riêng. :D

[[HTML + CSS + JS] Xây Dựng Thanh Điều Hướng Phụ Đơn Giản Với Tính Năng Lọc Nhanh Danh Sách Liên Kết](https://viblo.asia/p/3Q75wAkeZWb)

Trong bài viết tiếp theo, chúng ta sẽ quay lại chủ đề về `Boolean & Switching`, thảo luận thêm về thao tác chuyển đổi kiểu dữ liệu, các phép so sánh, và các cấu trúc điều kiện. Bây giờ thì chúng ta hãy nghỉ giải lao một chút đã. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[[JavaScript] Bài 14 - Boolean & Switching](https://viblo.asia/p/bJzKmA7kK9N)