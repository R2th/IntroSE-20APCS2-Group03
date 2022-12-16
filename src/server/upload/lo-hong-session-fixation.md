# Cách thức hoạt động
Việc xử lý `session IDs` không an toàn có thể khiến người dùng bị tấn công. Websites với tài khoản người dùng thông thường triển khai cơ chế xác thực để định danh người dùng và trả về cho người dùng. Sau khi xác thực, session sẽ được tạo. Server và browser sẽ hiều với nhau **session ID**, vậy nên server sẽ phân biệt được người dùng với mỗi HTTP request. Nếu như hacker có thể truy cập tới session ID của người dùng khác, họ có thể mạo danh người dùng khác. `SESSION FIXATION` là một phương thức tấn công mà hacker sử dụng để làm điều đó.

Trong bài viết này, **Mal** sẽ chỉ cho bạn cách thức hoạt động của lỗ hổng này, nếu như bạn chưa biết về nhân vật này thì có thể tìm hiểu trong [series](https://viblo.asia/u/bachnguyen2907/series) của mình. Giả sử website của bạn passes session ID trong query string (chắc cũng hiếm người làm vậy :v). **Mal** chế ra URL có chưa session ID : `www.hmstr.com?jsessionid=STEALING_UR_DATA`.

**Vic** là một người dùng trong hệ thống của bạn, anh ta rất thích chuột hamster, và cũng giả sử **Mal**  biết được email của bạn, hoặc là đoán được. Hắn gửi cho **Vic** một email với đường link hấp dẫn về chuột hamster, trỏ tới đường dẫn đã được hắn craft

![](https://images.viblo.asia/25f47436-c867-428d-8f1d-7f4667e76aaa.png)

**Vic** click vào đường dẫn, giả sử anh ta chưa login, trang của bạn sẽ chuyển hướng về trang đăng nhập. Nó sẽ accepts session ID trước đó được chỉnh sửa bởi **Mal** trên URL. khi **Vic** đăng nhập thành công, session được establish, và anh ta có thể enjoy bức ảnh gif về chuột hamster:

![](https://images.viblo.asia/ed046abd-1d98-4b12-aa4d-f43d3436f4cd.gif)

Tuy nhiên, bây giờ **Mal** có thể truy cập theo đường dẫn mà hắn đã gửi cho **Vic**, và hắn cũng có thể truy cập với session của **Vic**, tức là hắn đã đăng nhập với tài khoản của **Vic**.

# Bảo vệ
Nhìn chung thì nó cũng hiếm gặp, dễ khai thác và rất nguy hiểm.

Với kiểu tấn công này, hacker có thể bypass phương thức xác thực của bạn, và tệ hơn là bạn khó có thể phát hiện khi nó xảy ra. Có vài cách chống lỗ hổng này như sau.

### không truyền Session ID trong biến GET/POST
Truyền session ID trong `query strings`, hoặc trong body của POST request chính là vấn đề. Ngoài ra session ID có thể bị rò rỉ theo những cách sau:
1. Nếu người dùng follows link bên ngoài (`Referer` header sẽ mô tả trình duyệt tới từ đâu).
2. Trong lịch sử duyệt web và bookmarks.
3. trong log trên server và bất ky proxy server nào.

Tốt hơn là truyền vào HTTP cookie, chẳng hạn như với PHP thì bạn có thể dùng [session_regenerate_id(true)](https://www.php.net/manual/en/function.session-regenerate-id.php)

### Tạo lại session ID khi xác thực
Do đã bị tạo lại nên session ID mà **Mal** tạo ra đã không còn trùng khớp nữa

### chỉ chấp nhận tạo session ID ở phía server
Nó là practive tốt để chắc chắn chỉ server mới được phép tạo session ID.

### Đặt Timeout và thay thế session ID cũ
Reset session ID định kỳ sẽ làm giảm rủi do gây lỗi này.

### triển khai logout function đủ mạnh
Hàm logout  nên đánh dấu session ID đã hết hạn.

### Yêu cầu Session mới khi truy cập từ Referrers đáng ngờ
Xem xét việc login lại nếu nó truy cập từ nguồn khác.

# Tổng kết
Vừa rồi là cách thức bảo vệ và và cách thức hoạt động của lỗ hổng Session Fixation, hy vọng sẽ hữu ích cho bạn. Happy coding ! <3