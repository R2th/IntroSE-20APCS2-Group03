### Giới Thiệu Về Xdebug.
Là một lập trình viên, Xdebug là một việc không thể thiếu trong quá trình xây dựng và phát triển sản phẩm. Hôm nay mình sẽ hướng dẫn mọi người config mà sử dụng Xdebug

Xdebug Là Gì ?
    Xdebug là một chương trình mở rộng viết cho ngôn ngữ lập trình PHP giúp các lập trình viên có thể dễ dàng hơn trong việc gỡ rối (hay còn gọi là debug) cho chương trình.
    Xdebug giúp các theo tác gỡ rối có thể thực hiện một các đơn giản bằng việc cho phép các lập trình viên sử dụng các điểm dừng (hay breakpoint) vào các vị trí khác nhau trên mã lệnh của chương trình để tạp dừng quá trình thực thi chương trình ở vị trí điểm dừng đó và khảo sát các dữ liệu tại thời điểm đó.

### Bước 1: Cài đặt Xdebug extension.

Kiểm tra phpinfo, nếu đã có tồn tại như hình dưới thì chuyển qua bước 2, nếu chưa có thì hãy thực hiện các thao tác dưới đây.
![](https://images.viblo.asia/b8466ad3-9173-4e49-98b4-24a834d74c52.png)

1. Bạn vào trang "phpinfo.php" bấm chuột phải chọn  "view page source" sau đó copy toàn bộ thông tin.
2. Bạn vào trang https://xdebug.org/wizard.php paste vào khung input như hình sau và bấm submit.
![](https://images.viblo.asia/eb86d46a-2cee-43f9-b33c-4e2c91bcb2c3.png)
3. khi bạn submit xong sẽ hiện ra các thông tin version php của bạn và phiên bản xdebug phù hợp như hình sau.
![](https://images.viblo.asia/a639c8ba-66bf-4465-9c51-1bd255f271ae.png)
Sau đó bạn thực hiện các bước theo hình trên.
4. Config trong file php.ini. như sau
```
zend_extension = /opt/lampp/lib/php/extensions/no-debug-non-zts-20170718/xdebug.so
xdebug.remote_host = 127.0.0.1
xdebug.remote_enable = 1
xdebug.remote_port = 9000
xdebug.remote_handler = dbgp
xdebug.remote_mode = req
xdebug.profiler_enable=0
xdebug.profiler_enable_trigger=1
xdebug.remote_autostart=1
xdebug.idekey=PHPSTORM 
```
5. Khi thực hiện xong bạn bạn reset lại sever và vào lại trang "phpinfo.php" kiểm tra xem đã được cài đặt thành công chưa như hình ở thao tác kiểm tra.

### Bước 2: Cách dùng Xdebug extension.

1. Xác định file chạy vào sau đó đặt break point.
vd:
![](https://images.viblo.asia/3a7119ba-b9ec-4f98-b73e-0f9a7106b47c.png)
2. Sau đó bấm nút start "listening for php debug" như hình sau.
![](https://images.viblo.asia/eb6abca9-e748-4173-9f10-9ae1d447d885.png)
3. Quay lại trình duyệt load trang.
4. Bạn thấy code đã bị dừng ở break point như hình sau.
![](https://images.viblo.asia/2ea2c54a-b92b-48eb-9d65-645118539d1a.png)
Vậy là bạn đã config thành công công cụ Xdebug.



Rất nhanh và rất nguy hiểm đúng không ạ. Đây là cách mình hay dùng nên chưa biết cách này đã tối ưu nhất chưa, vì vậy rất mong góp ý từ mọi người ạ.
Cảm ơn mọi người đã đọc bài viết của mình, hẹn gặp mọi người ở bài viết sau.