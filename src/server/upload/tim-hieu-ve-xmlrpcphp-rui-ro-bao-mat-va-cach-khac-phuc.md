Vừa rồi, ở dự án của tôi gặp phải một loạt request gây ra tình trạng tăng tải CPU. Tôi đã tìm hiểu và nhận thấy nhiều khả năng đây là những request liên quan đến tấn công DoS bằng cách lợi dụng lỗ hổng bảo mật ở xmlrpc.php của Wordpress.
Vì vậy tôi đã tham khảo các bài viết về cơ chế này của Wordpress và xin phép dịch nội dung của bài sau: https://kinsta.com/jp/blog/xmlrpc-php/

## Mở đầu

XML-RPC, một trong những cơ chế của WordPress, được phát triển để chuẩn hóa giao tiếp giữa các hệ thống khác nhau. Điều này có nghĩa là các ứng dụng bên ngoài WordPress (chẳng hạn như các nền tảng blog khác và ứng dụng khách trên máy tính để bàn) có thể tương tác với WordPress.

Đặc điểm kỹ thuật này đã là một phần của WordPress kể từ khi ra đời và đã đóng một vai trò rất hữu ích. Nếu không có điều này, WordPress có thể đã bị tách biệt khỏi phần còn lại của Internet.

Tuy nhiên, xmlrpc.php có nhược điểm của nó. Điều này có thể dẫn đến các lỗ hổng trong trang web WordPress của bạn và vai trò này hiện được thay thế bởi API REST của WordPress. Điều này cho phép bạn kết nối WordPress với các ứng dụng khác.

Trong bài viết này, tôi cũng sẽ chỉ cho bạn xmlrpc.php là gì, tại sao bạn cần tắt nó đi và cách tìm hiểu xem nó có đang được bật cho trang web WordPress của bạn hay không.

Bạn đã sẵn sàng chưa? Bắt đầu nào!

## Xmlrpc.php là gì?

XML-RPC là một cơ chế cho phép giao tiếp giữa WordPress và các hệ thống khác. Điều này đạt được bằng cách chuẩn hóa giao tiếp, sử dụng HTTP làm cơ chế truyền tải và XML làm cơ chế mã hóa.

Bản thân XML-RPC có lịch sử lâu đời hơn WordPress. Điều này tồn tại trong phần mềm blog b2, nền tảng cho WordPress vào năm 2003. Mã đằng sau hệ thống này được lưu trữ trong một tệp có tên xmlrpc.php trong thư mục gốc của trang web. XML-RPC đã lỗi thời, nhưng vẫn còn đó.

Trong các phiên bản trước của WordPress, XML-RPC bị tắt theo mặc định. Tuy nhiên, kể từ phiên bản 3.5, nó được bật theo mặc định. Lý do chính cho điều này là cho phép ứng dụng di động WordPress giao tiếp với trang web WordPress của bạn.

Với các ứng dụng di động WordPress trước phiên bản 3.5, bạn phải bật XML-RPC trên trang web của mình để đăng nội dung từ ứng dụng ... (Bạn có nhớ không?) Điều này là do ứng dụng không chạy WordPress. Thay vào đó, nó sử dụng xmlrpc.php để giao tiếp với trang WordPress.

Nhưng XML-RPC không phải là ứng dụng di động duy nhất được sử dụng. Nó cũng được sử dụng để kích hoạt giao tiếp giữa WordPress và các nền tảng blog khác, kích hoạt trackback và pinbacks và củng cố khả năng của plugin Jetpack để liên kết WordPress tự lưu trữ với WordPress.com.

Sau đó, REST API đã được tích hợp vào lõi WordPress và tệp xmlrpc.php không còn được sử dụng cho giao tiếp này nữa. Chúng tôi sử dụng API REST để giao tiếp với các ứng dụng dành cho thiết bị di động WordPress, ứng dụng khách trên máy tính để bàn, nền tảng blog bên ngoài, WordPress.com (dành cho plugin Jetpack), cũng như các hệ thống và dịch vụ khác. Sự lựa chọn hệ thống mà REST API có thể kết nối phong phú hơn nhiều so với xmlrpc.php. Nó cũng có tính linh hoạt áp đảo.

Do đó, hiện tại REST API đã thay thế XML-RPC, bạn nên tắt xmlrpc.php trên trang web của mình. Lý do chi tiết cho việc vô hiệu hóa như sau.

## Tại sao bạn nên tắt xmlrpc.php
Lý do chính khiến bạn cần phải vô hiệu hóa xmlrpc.php trên trang web WordPress của mình là nó có thể khiến bạn tiếp xúc với các lỗ hổng bảo mật và có thể trở thành mục tiêu tấn công.

Không có lý do gì để giữ cho XML-RPC được bật vì nó không cần giao tiếp bên ngoài WordPress nữa. Bạn nên tắt tính năng này để tăng tính bảo mật cho trang web của mình.

Nhưng nếu xmlrpc.php là một vấn đề bảo mật và thậm chí không hoạt động, tại sao nó không bị xóa hoàn toàn khỏi WordPress?

Điều này là do một trong những tính năng chính của WordPress luôn là khả năng tương thích ngược. Tất cả chúng ta đều biết rằng việc cập nhật WordPress, plugin và theme của bạn là điều quan trọng đối với bất kỳ ai biết cách quản lý trang web.

Tuy nhiên, một số chủ sở hữu trang web không muốn hoặc không thể cập nhật phiên bản WordPress của họ. Nếu người đó đang sử dụng phiên bản trước khi API REST được giới thiệu, anh ta sẽ cần quyền truy cập vào xmlrpc.php.

Bây giờ chúng ta hãy xem xét kỹ hơn lỗ hổng cụ thể.

### Tấn công DDoS sử dụng pingback XML-RPC

Một trong những tính năng mà xmlrpc.php đã có là pinback và trackback. Những điều này cho phép bạn hiển thị thông báo trong phần nhận xét của trang web khi blog hoặc trang web khác liên kết đến nội dung của bạn.

Giao tiếp này được hỗ trợ bởi XML-RPC (như đã được giải thích), nhưng vai trò này hiện được thực hiện bởi API REST.

Nếu XML-RPC được bật trên trang web của bạn, tin tặc có thể khai thác xmlrpc.php của bạn để gửi một số lượng lớn mã pinback đến trang web của bạn trong một khoảng thời gian ngắn để khởi động một cuộc tấn công DDoS trên trang web của bạn. Điều này khiến bạn có nguy cơ quá tải máy chủ và khiến trang web của bạn bị lỗi.

### Tấn công Brute force sử dụng XML-RPC

Mỗi khi xmlrpc.php đưa ra yêu cầu, nó sẽ gửi tên người dùng và mật khẩu để xác thực. Điều này gây ra các vấn đề bảo mật nghiêm trọng (không có trong API REST). Trên thực tế, REST API sử dụng OAuth để gửi mã thông báo để xác thực chứ không phải là tên người dùng hoặc mật khẩu.

xmlrpc.php gửi thông tin đăng nhập theo mọi yêu cầu mà tin tặc có thể sử dụng để truy cập trang web của bạn. Và các cuộc tấn công brute force có thể dẫn đến chèn nội dung, xóa mã hoặc hỏng cơ sở dữ liệu.

Nếu kẻ tấn công đưa ra nhiều yêu cầu đối với trang web của bạn và chỉ định các cặp tên người dùng và mật khẩu khác nhau, cuối cùng họ sẽ có được thông tin đăng nhập chính xác ... và sau đó họ có thể truy cập vào tài khoản của bạn.

Do đó, nếu bạn đang sử dụng phiên bản mới nhất của WordPress sử dụng API REST để giao tiếp với các hệ thống bên ngoài, hãy tắt xmlrpc.php. Tính năng này không cần thiết và chỉ có thể khiến trang web của bạn dễ bị tấn công.

### Cách tắt xmlrpc.php

Có ba cách để tắt xmlrpc.php.

### Tắt xmlrpc.php trong plugin

Cách dễ nhất là cài đặt một plugin vô hiệu hóa xmlrpc.php. Nó có thể bị vô hiệu hóa hoàn toàn bằng plugin Disable XML-RPC. Cách sử dụng như sau.

Ở đây tôi sẽ sử dụng trang web của mình với xmlrpc.php được kích hoạt. Kiểm tra xác nhận rằng nó hiện đang hợp lệ.

![](https://kinsta.com/jp/wp-content/uploads/sites/6/2020/07/rachel-mccollin-website-xml-rpc-check.jpg)

Cài đặt và kích hoạt plugin từ màn hình plugin của màn hình quản trị WordPress.

Chỉ cái này. Bạn không phải làm bất cứ điều gì khác. XML-RPC bị vô hiệu hóa khi plugin được bật. Và khi tôi kiểm tra nó, tôi thấy rằng nó không hợp lệ.

![](https://kinsta.com/jp/wp-content/uploads/sites/6/2020/07/rachel-mycollin-website-second-check.jpg)

Chỉ cần như vậy là đủ. Đơn giản phải không?

### Tắt XML-RPC Pingback trong plugin

Làm cách nào để tắt một số tính năng nhất định của xmlrpc.php và bỏ lại những tính năng khác? Chỉ có thể sử dụng plugin Disable XML-RPC Pingback để tắt tính năng pinback. Điều này có nghĩa là bạn có thể tiếp tục tận dụng các tính năng khác của XML-RPC nếu cần.

Plugin hoạt động giống như plugin Tắt XML-RPC được mô tả ở trên. Chỉ cần cài đặt và kích hoạt nó.

### Kiểm soát chi tiết đối với các API XML-RPC và REST với các plugin

Nếu bạn muốn kiểm soát nhiều hơn các cài đặt xmlrpc.php và REST API trên trang web của mình, bạn có thể sử dụng plugin REST XML-RPC Data Checker.

Sau khi cài đặt và bật plugin này, hãy đi tới Cài đặt> REST Trình kiểm tra dữ liệu XML-RPC và nhấp vào tab XML-RPC.

![](https://kinsta.com/jp/wp-content/uploads/sites/6/2020/07/rest-xml-rpc-data-checker.jpg)

Điều này sẽ cho phép bạn xác định chính xác các tính năng của xmlrpc.php sẽ được kích hoạt cho trang web của bạn.

Hoặc bạn chỉ cần tắt hoàn toàn. Nếu bạn cũng cần kiểm soát API REST, hãy sử dụng tab riêng dành riêng cho nó trong plugin này.

## Cách tắt xmlrpc.php mà không cần plugin

Nếu bạn không muốn cài đặt plugin này trên trang web của mình, bạn có thể vô hiệu hóa nó bằng cách thêm mã vào bộ lọc hoặc tệp .htaccess của mình. Hãy xem xét cả hai phương pháp.

### Vô hiệu hóa xmlrpc.php bằng bộ lọc

Phương pháp này sử dụng bộ lọc xmlrpc_enabled để vô hiệu hóa xmlrpc.php. Sử dụng chức năng này để tạo một plugin và kích hoạt nó trên trang web của bạn.

```
add_filter( 'xmlrpc_enabled', '__return_false' );
```

Bạn có thể thêm cái này vào tệp chức năng chủ đề của mình, nhưng chúng tôi khuyên bạn nên tạo một plugin riêng.

Một tùy chọn khác là chỉnh sửa tệp .htaccess của nhà cung cấp dịch vụ lưu trữ của bạn bằng Apache bằng cách kết nối với máy chủ của trang web của bạn qua cPanel hoặc FTP.

### Tắt xmlrpc.php qua tệp .htaccess

Thêm mã sau vào tệp .htaccess.

```
<Files xmlrpc.php>
Order Allow,Deny
Deny from all
</Files>
```