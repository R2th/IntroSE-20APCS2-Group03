![](https://images.viblo.asia/aaad2ca2-89bc-4461-a884-3c9ce66d4938.png)

**Nhân dịp đầu xuân năm mới, mình xin gửi lời chúc an lành tới tất cả thành viên của viblo.asia**

Mỗi lần xuân đến mình lại nhớ tới câu: "Mỗi mùa xuân sang là tôi lại thêm một tuổi". Nghe quen quen phải không ạ! Vâng các bạn không nhầm đâu, nó nghe như lời của một bài hát nào đó phải không? Nhưng thực tế thì đó không phải lời của bài hát **mừng tuổi mẹ - của nhạc sĩ Trần Long Ẩn** đâu. Mà mình đã sửa lại một chút để cho phù hợp với hoàn cảnh bản thân. Mỗi lần đọc câu đó mình lại nhớ đến câu mà cư dân mạng truyền tai nhau: "Có lớn mà không có khôn". Vâng đó là "chính ta của hiện tại", để cải thiện sự "ngu lâu dốt bền" đó mình đã tích cực tìm tòi và học hỏi. Và hôm nay mình viết bài này để chia sẻ một trong những điều mình đã học: debug code PHP sử dụng vscode + xdebug.

# Debug cơ bản
Trong quá trình học tập và làm việc mình đọc code PHP khá nhiều. Khi mình muốn debug code PHP thì mình sử dụng các hàm như:
+ **echo**: in ra dấu hiệu cho biết luồng thực thi đã đi đúng.
+ **var_dump**: hiển thị giá trị của biến.
+ **exit**: thoát ra nếu muốn code dừng lại tại vị trí mong muốn.

![](https://images.viblo.asia/b485923b-7d73-4319-ac8e-6e2e5604c2fb.png)

Mình hay kết hợp 3 hàm này để debug dễ dàng hơn.

![](https://images.viblo.asia/2a304011-bf0f-4d12-8d8b-098bbb4d7bbb.png)

Với 3 hàm trên thì quá trình debug thực sự là vất vả. Nói cho văn thơ thì đây là thời kì ăn lông ở lỗ.

Sau một thời gian dùng cách này cảm thấy việc trace code phức tạp quá và mình muốn tìm cái gì đó tốt hơn. Vậy là mình đã tìm đến người bạn thân nhất của mình, **google is the best friend!**, và mình cũng có được câu trả lời phù hợp. Câu trả lời đó là **debug_print_backtrace** (hiển thị luồng gọi của hàm)

![](https://images.viblo.asia/eee5336a-75d6-42bd-8610-e99e23c73521.png)

![](https://images.viblo.asia/c49c1991-ac0e-4558-838d-29cc323ce51e.png)

Khi thêm hàm **debug_print_backtrace** kết quả mang lại rất ấn tượng đúng không? Đáng ra mình nên biết hàm này sớm hơn. Nhưng dù sao thì mình cảm thấy tự hào về bản thân vì cũng đã đặt chân tới thời kì đồ đá rồi. :v

Mình sẽ nói thêm về tại sao mình lại kết hợp các hàm như vậy. 
> Tại sao lại in ra dòng **cm0s**? 

Cái này một phần là thói quen, một phần là do có nhiều lúc kết quả hiển thị ra không chỉ có dữ liệu debug mà còn nhiều dữ liệu không liên quan khác. Do đó mình in ra một dấu hiệu nhận biết để sử dụng tính năng tìm kiếm cho nhanh.
> Tại sao mình lại dùng **var_dump** để in giá trị biến mà không phải là **echo**?

**var_dump** không chỉ in ra giá trị mà còn in ra cả kiểu dữ liệu của biến. Một điểm nữa là **echo** sẽ không in ra giá trị nếu chúng không phải là kiểu chuỗi (**string**). Cuối cùng là tính thẩm mĩ, nếu dùng **echo** thì phải thêm **\n** vào cuối chuỗi để khi hiển thị ra nó có thể xuống dòng. Mà **\n** phải được đặt trong hai dấu nháy kép (**"**) thì mới xuống dòng. Nếu đặt trong hai dấu nháy đơn (**'**) thì không được. Do vậy mình đã chọn dùng **var_dump** là sự lựa chọn phù hợp nhất.

"Kẻ còn chơi là còn gỡ"

Với phương châm học tới nơi chơi tới chóp, mình đã ra một quyết định táo bạo là: tìm xem có "đồ" nào tốt hơn không?

# Debug với vscode + xdebug
Nếu bạn là một người biết múa quạt thì chắc hẳn bạn sẽ biết câu: **đấy là do bạn chưa chơi đồ đấy bạn ơi**.

Đúng vậy câu này không có sai đâu, hãy tin vào mình. Chính mình là người đã trải nghiệm và rút ra kết luận rằng: "Chơi đồ thì sướng hơn không chơi". Từ ngày chơi đồ vào thì mình đã nghiện mất rồi. Dù được nhiều người khuyên: "bạn ơi đừng nghiện nữa, nhà mình còn gì đâu" nhưng mình vẫn không thể bỏ được. Để biết "đồ" có gì mà lại làm cho mình nghiện sâu đến vậy. Thì hãy cùng mình đọc tiếp =))

`Note: Trong bài mình sử dung môi trường linux`

## Cài đặt
### Cài đặt extention PHP Debug
Cài đặt PHP Debug rất đơn giản, bạn mở ứng dụng vscode và vào phần extentions và tìm kiếm với từ khóa **PHP**.

![](https://images.viblo.asia/7c3151c4-1445-4854-8d1c-351fae270a18.png)

Dễ dàng thấy extention PHP Debug, bạn chọn vào nó và cài đặt như bình thường. Phần này quá đơn gian không có lưu ý gì.

### Cài đặt Xdebug
Sau khi cài đặt xong extention PHP Debug, tiếp đến ta sẽ cài Xdebug. Để cài Xdebug nhanh và đơn giản ta sử dụng [Xdebug wizard](https://xdebug.org/wizard).

![](https://images.viblo.asia/84e148c3-988b-48f1-8991-d6938fac03c6.png)

Ta sẽ paste dữ liệu từ câu lệnh `php -i` vào ô nhập liệu của wizard. Sau khi nhập xong ta nhấn nút ở phía dưới để chuyển sang trang hướng dẫn cài đặt.

![](https://images.viblo.asia/9c80d942-ead6-468e-bab7-baf2a8e43806.png)

Làm theo 10 bước trong hướng dẫn là ta đã cài đặt xdebug thành công.

![](https://images.viblo.asia/523bf675-381b-4a3f-b998-f6feb3fc862a.png)

Trong phần này ta cần nhớ:
+ Phiên bản Xdebug mà ta tải.
+ Đường dẫn lưu file thư viện Xdebug ở bước 9.

### Cấu hình file php.ini
Sau khi cài đặt xong extention tiếp theo cần làm là cấu hình file php.ini để có thể debug được với vscode.
#### 1. Xác nơi lưu file config
Để biết được file php.ini của ta đang ở đâu thì ta tạo một file **info.php** trong thư mục web có chứa đoạn code sau.
```php
<?php phpinfo(); ?>
```
Truy cập vào file đó để biết được nơi lưu file php.ini

![](https://images.viblo.asia/a0feb416-d845-49a4-9134-aef2c0fe08b9.png)

Như trên hình nơi lưu file php.ini là
```
/etc/php/7.4/fpm/php.ini
```
#### 2. Sửa nội dung file php.ini
Mở file php.ini với đường dẫn đã được xác định từ bước trên và sử đổi cho phù hợp.

Thêm vào cuối file php.ini với đoạn code sau.

Xdebug 3.x.x
```
[XDebug]
xdebug.mode = debug
xdebug.start_with_request = yes
xdebug.client_port = 9000
zend_extension = /usr/lib/php/20190902/xdebug.so
```

Xdebug 2.x.x
```
[XDebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
zend_extension = /usr/lib/php/20190902/xdebug.so
```

Sau khi đã xong tất cả các bước trên ta restart lại: **nginx** và **php-fpm**
```bash
sudo systemctl restart nginx.service && sudo systemctl restart php7.4-fpm.service 
 ```
 
 Để kiểm tra ta có thể sử dụng lệnh `php -v` hoặc vào trang **info.php** đã tạo từ trước.
 
 ![](https://images.viblo.asia/3831b917-3cd2-430d-b4b6-81b673aaf611.png)

## Sử dụng
Trước khi dùng cần tạo file cấu hình debug cho vscode. Việc tạo file cấu hình cũng đơn giản, bạn hãy tham khảo [ở đây](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) để cấu hình nhé. Mình đưa ra file cấu hình của mình cho các bạn so sánh.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",
            "port": 9000
        }
    ]
}
```

![](https://images.viblo.asia/71f95b80-f42b-4e90-b7af-7407cae17660.png)

Để bắt đầu lắng nghe bạn nhấn vào nút **run** màu xanh.

Tiếp theo là đặt break point và debug. Trong hình dưới mình đặt break point tại dòng 1384 sau đó mình gửi request để debug.

![](https://images.viblo.asia/01be55e1-26b7-4904-94c6-1224fb93439e.png)

![](https://images.viblo.asia/599d20ae-e940-4cbd-af3a-d7333b314406.png)

Với sự giúp đỡ của debuger công việc debug của mình trở nên nhẹ dàng hơn nhiều. Với trinh debuger mình có thể nhảy từng dòng để quan sát sự thay đổi giá trị của các biến cũng như luồng thực thi của chương trình. Và điểm lợi hại của trình debuger cho phép mình có thể thay đổi giá trị trong lúc debug. Từ đó có thể thay đổi luồng thực thi mà không tốn nhiều công sức. Nói chung là debuger rất lợi hại! :v

Đến đây các bạn đã hiểu vì sao mình lại bị nghiện khi chơi đồ chưa! =))

Đến đây là cũng coi như hết bài rồi. Phân dưới là khắc phục lỗi trong quá trình cài đặt và sử dụng.

Cảm ơn các bạn nhiều.

# Khắc phục lỗi
Trong quá trình cài đặt không thể tránh khỏi lỗi. Do đó khi cài đặt các bạn cần lưu ý một số điểm sau:
+ Thực hiện đúng theo hướng dẫn
+ Cấp quyền đầy (khi sử dụng linux)

Để xem thông tin Xdebug cũng như kiểm tra lỗi khi cài đặt bạn tạo file **xdebug.php** chứa đoạn code sau:
```php
<?php xdebug_info(); ?>
```

## Lỗi: Creating socket for 'localhost:9000', getaddrinfo: Invalid argument.

![](https://images.viblo.asia/69af3101-e38d-4126-8485-ca59d76d0a6d.png)

Lỗi này xảy ra do không thể phân giải domain **localhost** thành địa chỉ IP. Do trước đó mình đã đổi **localhost** thành **notlocalhost** trong file **/etc/hosts**.

![](https://images.viblo.asia/30537725-58c8-4d5e-bf9c-68ca7a1ff12d.png)

Do đó việc khắc phục lỗi này rất đơn giản, chỉ cần sửa **notlocalhost** thành **localhost** là xong.

Bật lắng nghe debug trên vscode lên và load lại trang **xdebug.php** và kiểm tra kết quả.

![](https://images.viblo.asia/37d0ffd4-d723-49ec-b6ed-c7319f229d50.png)