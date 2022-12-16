Khi code, việc gặp bug là điều không thể tránh khỏi, bug không ngán một ngôn ngữ nào. Khi project nhỏ (tự code từ đầu) hay đang code để giải bài tập thì việc debug có thể khá dễ dàng. Nhưng khi ta code một project khổng lồ với những luồng đi rất chi là loằng ngoằng thì việc debug code không hề dễ dàng. Hay trường hợp phổ biến là code trên các framework nhiều phần gặp lỗi mà ta không biết lỗi đó là của mình hay của người và để xác định được tại sao thì ta cần debug.

Trong bài, ta sẽ tìm hiểu cách debug code PHP, cài đặt PhpStorm, cài đặt công cụ debug.
# Cài đặt PhpStorm
```
Note: Môi trường demo của mình trên linux, nếu là Windows thì hãy ánh xạ các bước sao cho đúng. 
```

Để tải PhpStorm vào link: [https://www.jetbrains.com/phpstorm/](https://www.jetbrains.com/phpstorm/)

Phần cài đặt tham khảo link: [https://vinasupport.com/phpstorm-ide-huong-dan-download-va-cai-dat/](https://vinasupport.com/phpstorm-ide-huong-dan-download-va-cai-dat/)

Hoặc có thể xem video để dễ dàng hơn:  [https://www.youtube.com/watch?v=jT9h8qyhzcY](https://www.youtube.com/watch?v=jT9h8qyhzcY)

# Cài đặt php-cli và php-cgi
Khạy PhpStorm để debug, PhpStorm sẽ tự tạo ra một server riêng và code sẽ được thực thi trên server này. Để PhpStorm server chạy được ta cần 2 thư viện là `php-cli` và `php-cgi`

Cài đặt trên linux
```bash
sudo apt install php-dev php-cli php-cgi -y
```

Cài CLI cho PhpStorm, sau khi cài `php-cli` và `php-cgi` ta bật PhpStorm và kiểm tra xem đã nhận `php-cli` chưa. Bằng cách truy cập: File -> Setting (ctr + alt + s) -> PHP & FrameWork

![](https://images.viblo.asia/93224c31-521c-4298-a0e0-199aec72098a.png)
 
Nếu tại phần **CLI Interpreter** chưa thấy hiện gì, ta cần cài đặt nó thủ công bằng cách chọn vào **...** sẽ hiển thị lên 1 cửa sổ. Chọn tiếp vào dấu **+** và chọn vào đường dẫn file thực thi của `php-cli`, nếu không thấy đường dẫn file thực thi chọn **Other Local...** để chọn thủ công.

![](https://images.viblo.asia/5a204de7-d0ea-46dd-be7c-cae32bb47d42.png)

Cài đặt đường dẫn xong nhấn **Apply** tiếp đó là **OK**. Sau đó ta quay lại cửa sổ trước và chọn **CLI Interpreter** và ta mới thêm.

# Cài đặt trình debug
Để thực hiện debug PhpStorm yêu cầu trình debuger, có 2 trình debugger được hỗ trợ: [xdebug](https://xdebug.org/) và [zend debuger](https://www.zend.com/downloads). Nhưng theo khuyến cáo của jetbrains thì ta nên dùng xdebug.

Cài đặt xdebug cho linux
```bash
sudo pecl install xdebug
```
Bật chế độ debug cho PHP ta sửa file **php.ini**, thêm vào đoạn dòng chữ sau
```ini
[xdebug]
zend_extension="/usr/lib/php/20170718/xdebug.so"
xdebug.remote_enable=1
xdebug.remote_port=9000
xdebug.remote_connect_back=on
```
Nếu không biết đường dẫn file `xdebug.so` ta cần tìm nó
```bash
find / -name xdebug.so 2>/dev/null
```
Cuối cùng kiểm tra xem trình debug đã được bật chưa?
```bash
php -v
```
Nếu kết quả hiển thị có thông tin về debugger đã bật thì thành công, nếu không là không thành công.

![](https://images.viblo.asia/1d6cf02c-20d9-4f71-a32a-7e7f64d8e391.png)
# Debug code PHP
## Debug file PHP
Để thực hiện chức năng này ta cần đặt một breakpoint tại vị trí muốn debug. Sau đó nhấn vào icon debug hoặc nhấn tổ hợp phím **Shift+F9**

![](https://images.viblo.asia/679c17d6-e749-43a2-b278-63664466191e.png)
Sau khi chương trình thực thi đến phần ta đặt breakpoint nó sẽ lập tức dừng lại cho ta debug. Toàn bộ thông tin về hàm và biến được hiển thị lên.

![](https://images.viblo.asia/344ed6ed-5f04-43ce-ba09-d0340ea9d43f.png)

## Debug remote
Đây là phần đáng chú ý trong khi debug code PHP. Nó rất tiện lợi và dễ dàng trong việc debug khi server nhận được toàn bộ thông tin của người dùng nhập trên trình duyệt. Thông tin đó bao gồm cả **POST** và **GET** request.
Để thực hiện được tính năng này ta cần thực hiện như sau:

1. Cài extension debug client cho trình duyệt

![](https://images.viblo.asia/c27cb6d7-e643-4866-bb3a-2259a1ea7627.png)
2. Bật lắng nghe debug server bằng cách chọn
![](https://images.viblo.asia/4223903a-2791-4e39-898c-b6c9da9b9e5b.png)

3. Đặt breakpoint
4. Truy cập vào server PhpStorm

![](https://images.viblo.asia/8825252c-d519-4809-9e4a-abb8b3909c08.png)
Bằng cách chọn vào biểu tượng trình duyệt muốn mở. Trang web chạy trên server PhpStorm sẽ hiện lên trên trình duyệt. Khi muốn debug tính năng nào của trong web chỉ cần click vào con bọ trên trình duyệt và thực hiện request.

Đây là một tính năng rất hay của PhpStorm trong việc debug gỡ rối chương trình. Ngoài ra PhpStorm còn nhiều tính năng thú vị nữa.