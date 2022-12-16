Trong bài viết này, chúng ta sẽ gặp gỡ mội khái niệm mới có tên gọi là `session` - được sử dụng trong lập trình ứng dụng giao tiếp qua mạng máy tính nói chung. Và một công cụ tiện ích có tên gọi là `cookie` - giúp phần mềm `server` mà chúng ta đang lập trình có thể tạm thời ghi nhớ thiết bị của người dùng.

## Session là cái gì?

Khái niệm `session` - tạm dịch là phiên đối thoại - cũng được xuất phát từ cuộc sống thường nhật hàng ngày của chúng ta giống như những khái niệm khác mà chúng ta đã được gặp trong hành trình tự học lập trình web. Ví dụ như khi bạn gặp trực tiếp và nói chuyện với một đối tác về một chủ đề nào đó trong công việc, quãng thời gian tính từ khi bạn và đối tác bắt đầu cuộc thảo luận cho đến khi cả hai tạm dừng nói chuyện - được gọi là một `session` - hay một phiên đối thoại. 

Và khái niệm `session` trong giao tiếp giữa các phần mềm máy tính cũng không có gì khác biệt. Ví dụ như khi một người dùng mở trình duyệt và truy cập tới một địa chỉ web, sau đó di chuyển qua lại giữa các trang đơn trong website này; Các yêu cầu `request` được gửi tới `server` và các lượt phản hồi `response` cũng giống như các câu nói trao đổi qua lại trong một phiên đối thoại. Trong trường hợp này một `session` thường được tính kể từ thời điểm yêu cầu đầu tiên được gửi tới `server` cho đến khi người dùng đóng tab web hiện tại. 

Một `session` như trên được gọi là `page session` - có nghĩa là phiên đối thoại được tính bằng thời gian tồn tại của một trang web trong không gian của trình duyệt. Và các phiên đối thoại `page session` được trình duyệt web sử dụng để làm phương thức xác định khoảng thời gian hiệu dụng cho một số tính năng liên quan. Ví dụ như code JavaScript ở phía `client-side` sẽ có thể lưu trữ thông tin trong bộ nhớ đệm `window.sessionStorage` để sử dụng trong suốt thời gian tồn tại của một `page session`. Những thông tin được lưu trữ trong `sessionStorage` sẽ tự động được xóa ngay sau khi người dùng đóng tab web.

## Session tự quản lý

Giống với cách mà các trình duyệt web định nghĩa `page session` và sử dụng để quản lý tính năng lưu trữ dữ liệu tạm thời `window.sessionStorage`; Ở phía `server-side`, chúng ta cũng có thể tự định nghĩa những kiểu `session` khác nhằm mục đích quản lý những tính năng nhất định của phần mềm `server` mà chúng ta đang xây dựng.

Ví dụ điển hình là những tính năng như thêm mới, chỉnh sửa, và xóa bài viết trên một trang blog cần được giới hạn quyền sử dụng và chỉ được cho phép thực hiện trong các `session` đối thoại với người quản trị blog `admin`. Những yêu cầu tương tự khi được gửi tới `server` ở ngoài khung thời gian hiệu dụng của `admin session` sẽ không có hiệu lực và cần được chuyển hướng tới giao diện đăng nhập tài khoản quản trị.

Kiểu `session` này thường được gọi chung là `login session` - hay phiên đăng nhập - và được tính từ thời điểm một người dùng thực hiện xong chức năng đăng nhập tài khoản vào một trang web, cho đến khi tài khoản được đăng xuất bởi thao tác người dùng hoặc bởi code quản lý của `server`.

## Quản lý bằng Cookie

Như chúng ta đã thảo luận ở phía trên thì việc quản lý `session` về cơ bản là quản lý các lượt truyền tải thông tin yêu cầu `request` và phản hồi `response`. Một yêu cầu mở giao diện chỉnh sửa một bài viết được gửi tới trong khung thời gian của một `login session` cần được xử lý phản hồi khác với một yêu cầu tương tự được gửi tới ngoài khung thời gian của `login session`.

Việc xác định một yêu cầu nhận được tại `server` có ở trong một `session` nào đó hay không thì có khá nhiều cách thức. Tuy nhiên cách đơn giản nhất là chúng ta có thể gắn một mảnh thông tin nhỏ để đánh dấu tất cả các yêu cầu được trình duyệt web gửi tới sau khi người dùng thực hiện đăng nhập tài khoản. Đây là một tiện ích `convention` được sử dụng chung trong lập trình phần mềm giao tiếp qua mạng máy tính - có tên gọi là `cookie`.

> Một cookie là một mảnh thông tin nhỏ, được tạo ra bởi một phần mềm A, và được lưu lại bởi một phần mềm B. Mỗi khi phần mềm B gửi bất kỳ một thông điệp gì đó tới phần mềm A thì sẽ phải gửi kèm lại nguyên cả cái cookie đã lưu. Như vậy phần mềm A sẽ có thể nhận biết được những yêu cầu được gửi tới bởi phần mềm B trong số 1001 yêu cầu được gửi tới từ cả những phần mềm C, D, E, v.v... nữa.  
> *_Một người đang học lập trình*

Trong lập trình web nói riêng, các trình duyệt web và các môi trường vận hành phần mềm `server` đều cung cấp sẵn những phương thức để hỗ trợ chúng ta tạo ra và gắn các `cookie` như vậy vào các lượt truyền tải thông tin yêu cầu `request` và phản hồi `response`. Và code ví dụ dưới đây là cách mà chúng ta tạo ra một `cookie` bằng NodeJS để trình duyệt web có thể lưu lại và gắn vào mỗi yêu cầu gửi tới `server` sau đó:

```javascript:server.js
const loginHandler = function(request, response) {
   // Kiểm tra thông tin đăng nhập ...
   // Tạo cookie và chuyển cho trình duyệt web lưu lại
   response.setHeader("Cookie", "session=admin; HttpOnly");
};

const logoutHandler = function(request, response) {
   // Thay đổi cookie và chuyển cho trình duyệt web lưu lại
   response.setHeader("Cookie", "session=normal; HttpOnly");
};
```

Trong code ví dụ trên, một mảnh thông tin `cookie` có dạng `key=value` tự định nghĩa đang được gắn vào `response` và chuyển cho trình duyệt web. Chúng ta cũng có thể tạo nội dung cho một `cookie` với nhiều cặp `key=value` phân tách với nhau bởi các dấu chấm phẩy `;`.

Bên cạnh các cặp `key=value` tự định nghĩa, các `cookie` còn có các thuộc tính chung được quy định sẵn để tùy chỉnh một số yếu tố liên quan tới `cookie` đó. Trong ví dụ ở trên thì thuộc tính `HttpOnly` sẽ khiến `cookie` này được ẩn khỏi bề mặt sử dụng của code JavaScript `client-side` và chỉ có thể được truy xuất hay chỉnh sửa bởi `server`.

Thao tác gắn `cookie` này vào mỗi yêu cầu gửi tới `server` sau đó sẽ được trình duyệt web tự động xử lý nếu như người dùng chấp nhận lưu `cookie` khi có thông báo hiển thị bởi trình duyệt.

Để tìm hiểu thêm về các thuộc tính khác của `cookie` trong môi trường web, bạn có thể sử dụng liên kết sau: [HTTP Cookie - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent)

[[NodeJS] Bài 8 - Event & Emitter](https://viblo.asia/p/oOVlYR9r58W)