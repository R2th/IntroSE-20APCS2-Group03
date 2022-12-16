*Bài viết này chỉ mang tính chất tham khảo, thích hợp cho những bạn đang làm Node/PHP hoặc muốn chọn công nghệ để viết ứng dụng real-time.*

Mình nhớ cách đây khá lâu, khoảng năm 2012 gì đó, cộng đồng lập trình rộ lên một công nghệ mới giúp xử lý bất đồng bộ (cũng như là các tác vụ theo thời gian thực, real-time) một cách trơn tru và nhanh chóng - tên là **Node.js**. Hồi đó, **PHP** đã bộc lộ một điểm yếu rất lớn, đó là hỗ trợ xử lý bất đồng bộ không tốt chút nào, dẫn đến performance xử lý các tác vụ real-time tệ hại (Chỉ bằng khoảng 1/6 so với Node thì phải, ảnh Benchmark cũng lâu rồi mình không tìm được nữa). Vậy nên hồi đó cộng đồng lập trình chuyển sang Node.js khá nhiều.

Tuy nhiên, công nghệ là thứ không ngừng thay đổi, PHP hiện nay đã lên phiên bản 7, tối ưu lại rất nhiều về nền tảng của nó, và nhóm phát triển **Swoole** đã tận dụng tốt điều này, tạo nên một "Production-Grade Async programming Framework for PHP" giúp xử lý các tác vụ không đồng bộ hay nhiều tác vụ đồng thời (concurrency) với một tốc độ **khủng khiếp**. Thử so sánh một chút nhé:

![](https://images.viblo.asia/453f9226-cf85-43cf-b9cc-cfbe105cfe81.PNG)

Vậy điều gì đã khiến Swoole nhanh như vậy? Đó là vì Swoole là một PHP Extension, viết bằng C++ nên nó có thể tối ưu tốc độ tới mức độ tầng thấp (Linux Kernel), và PHP cũng hỗ trợ sẵn đa luồng nữa.
Trông cũng có vẻ xịn xò, vậy cùng tìm hiểu tiếp về Swoole nhé.

# Swoole là gì?
Swoole là một PHP Extension, cài qua PECL và ứng dụng viết ra thường chạy qua PHP Cli, giúp tạo ra một HTTP Server với performance cao. Bạn có thể cài qua hướng dẫn trên trang chủ: https://www.swoole.co.uk/
Ngoài ra, nếu bạn là một người làm Laravel thì không nên bỏ qua **Laravel Swoole** https://github.com/swooletw/laravel-swoole.

![](https://images.viblo.asia/ffb6f83d-2944-495d-a937-15f8f511d57c.PNG)

**Lưu ý: Vì nó hoạt động dựa trên Linux Kernel nên Swoole không chạy được trên Windows nhé, trừ khi bạn dùng Máy ảo cài hđh Linux hoặc Windows Linux subsystem**

## Demo
Ta sẽ làm theo các bước giống trên trang chủ hướng dẫn để cài đặt, hoặc đơn giản là gõ 2 dòng sau: 

```markdown
sudo apt-get install php php7.2-dev
sudo pecl install swoole
```

Sau khi cài xong Swoole, nó sẽ nhắc nhở bạn thay đổi file php.ini. Thường là trong đường dẫn /etc/php/7.2/cli/php.ini (Mình cài bản 7.2, bạn có thể thay đổi lại cho đúng phiên bản bạn cài).
Ta thêm dòng này vào cuối file (Để bật extension Swoole)
```sql
extension=swoole.so
```

Sau đó ta tạo lần lượt 3 file này trong một folder bất kỳ để thực hiện demo: 

*index.php* - Giao diện cho người dùng

![](https://images.viblo.asia/38b38cd8-5177-4355-8fe8-cc304b266233.png)

*server.php* - Server HTTP để người dùng kết nối và xem giao diện

![](https://images.viblo.asia/461ba4e3-6ab2-4323-98d5-b507443f841a.png)

*socket.php* - Server Websocket để người dùng kết nối websocket (Giống socket.io vậy), từ đây bạn có thể phát triển ra các ứng dụng như Chat hay Video Call...

![](https://images.viblo.asia/944041e7-96a2-442f-a27c-5c1ca06947f9.png)

Sau đó, mở 2 cái Terminal riêng và chạy 2 lệnh tương ứng với 2 cái Terminal:
```php
php server.php
```

```php
php socket.php
```

Xong rùi đó, giờ ta có thể bật trình duyệt lên và gõ đường dẫn 127.0.0.1:9501 để tận hưởng thành quả :D 

![](https://images.viblo.asia/f545e236-e73e-42dc-b70f-8f0251575979.png)

Log bên server socket:

![](https://images.viblo.asia/7b11ae9d-66ba-4019-b08a-dfba737f3d66.png)

## Lời kết
Cảm ơn các bạn đã dành thời gian ra đọc :) Hi vọng bài viết của mình có thể giúp chút ích cho các bạn :) Nếu thấy hay hãy để cho mình 1 upvote để mình có động lực viết tiếp.