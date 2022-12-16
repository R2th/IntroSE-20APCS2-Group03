![](https://images.viblo.asia/1ea5e264-c3db-4607-bb4f-0a215ef87424.jpg)

Sử dụng hộp thư trên hosting trên Internet khá là bất tiện, một trong số đó chính là việc thường xuyên bỏ lỡ những email quan trọng được gửi từ đối tác, khách hàng,… Và bài viết này chúng ta sẽ cùng khắc phục vấn đề trên, tự làm tính năng nhận thông báo email mới theo cách của một lập trình viên.

> Bài viết gốc tại: https://tienminhvy.com/chia-se/nhan-thong-bao-email-moi-tren-hosting/

# Nhận thông báo email mới trên hosting

Trong bài này, chúng ta sẽ sử dụng ngôn ngữ lập trình PHP (vì hosting của mình sử dụng máy chủ Litespeed cho PHP 7.4). Và đồng thời, ta sẽ cần một tài khoản email cùng mật khẩu được tạo trên hosting luôn.

Trước tiên, ta cần tạo một tài khoản [Pushbullet](https://tienminhvy.com/chia-se/pushbullet-ung-dung-ket-noi-da-nen-tang/) (bạn hãy nhấn vào liên kết màu xanh trước đó để biết cách cài đặt Pushbullet nha – bạn cũng có thể nhận thông báo email mới bằng nền tảng khác nữa, nhưng Pushbullet vẫn nên dùng hơn).

Sau đó, bạn truy cập [liên kết này](https://www.pushbullet.com/#settings/account), tiếp tục bạn rê chuột xuống và nhấn vào nút “Create access token”.

![](https://images.viblo.asia/ddd36338-e9bf-4b57-85a2-89781d3e118d.png)

Bạn sẽ thấy một dãy ký tự nằm bên trong nền đen, hãy lưu dãy ký tự này ở đâu đó trước khi tiếp tục (lưu ý là dãy kí tự này bạn phải bảo mật thật kỹ, vì nếu người khác biết được dãy ký tự này sẽ có thể sử dụng API bằng tài khoản của bạn, thậm chí có thể xem, chỉnh sửa hay xoá tài khoản luôn đấy!)

Sau đó, bạn đăng nhập vào hosting bạn đang dùng (ở bài viết này mình sử dụng cPanel). Và mình sẽ vào File manager và tạo một file tên là sendNotify.php (bạn có thể đặt tên khác mình, không cần nhất thiết phải theo y vậy).

Lưu ý, file php này bạn nên đặt nó ở vị trí chỉ có thể truy cập ở phía server để tăng độ bảo mật. Nhưng nếu bạn dùng Cron Jobs trỏ đến URL thì cứ đặt nó ở trong public_html để có thể truy cập.

Và, file php này bạn điền vào đoạn code bên dưới:

```php
<?php // copyright by tienminhvy.com - all rights reserved

$mbox = imap_open("{localhost:993/imap/ssl/novalidate-cert/debug}INBOX", "emailcuaban@example.com", "Mật khẩu của email")
      or die("can't connect: " . imap_last_error());

$check = imap_mailboxmsginfo($mbox);

if ($check) {
    if ($check->Recent>0) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://api.pushbullet.com/v2/pushes');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 
        '{"body":"Dear Vy, we have checked your mailbox (emailcuaban@example.com) and found '.$check->Recent.' new email(s). Please check your mailbox for more info.",
        "title":"New emails!",
        "type":"link",
        "url":"https://diachiwebmailcuaban.com"}');
        
        $headers = array();
        $headers[] = 'Access-Token: tokenCuaBanODay';
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        $result = curl_exec($ch);
        
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
    }
} else {
    echo "imap_mailboxmsginfo() failed: " . imap_last_error() . "<br />\n";
}

imap_close($mbox);

?>
```

Và mình xin giải thích công dụng của một số dòng như sau:

* Dòng 3: mở IMAP để đọc email, nếu code lỗi, bạn có thể thay 993 thành 143 (với 143 là port không bảo mật, 993 là port SSL/TLS), bạn điền email và mật khẩu email của bạn tại dòng này luôn.
* Dòng 6: đọc thông tin IMAP.
* Dòng 8: kiểm tra xem có trả về kết quả không, nếu không code sẽ bỏ qua và chạy dòng 34
* Dòng 9: kiểm tra xem có thư mới hay không, nếu có thực thi code
* Dòng 12 -> 31: gọi cURL trỏ đến Pushbullet để gửi thông báo, giúp bạn nhận thông báo email mới. Các dòng bạn có thể thay đổi:
  * Dòng 16: nội dung thư, có thể thay đổi tất cả trừ **$check->Recent** vì đoạn này sẽ hiện số thư mới gửi đến trong hòm thư của bạn.
  * Dòng 17: tiêu đề của thông báo
  * Dòng 19: liên kết đến địa chỉ bạn đăng nhập để xem thư
  * Dòng 22: access token (phải đổi), đổi **tokenCuaBanODay** thành token của bạn đã tạo ở trên.
* Dòng 34: thông báo lỗi (nếu có)
* Dòng 37: đóng IMAP

Sau khi tạo xong, bạn lưu lại và trở về cPanel, sau đó truy cập Cron Jobs. Tiếp tục, bạn rê chuột xuống và ngay mục **Common Settings**, chọn “Once Per Minute”.

![](https://images.viblo.asia/805d6668-8f66-48b2-a33b-a032fbaae8b1.png)

Ngay mục Command, bạn nhập theo cú pháp sau:
```
/usr/local/bin/php /home/tendangnhapcuaban/public_html/duong/dan/den/file/php
```

và bạn cần đổi ***tendangnhapcuaban*** thành tên đăng nhập cPanel, đồng thời ***publichtml/duong/dan/den/file/php*** cũng đổi thành đường dẫn đến file php mà bạn đã tạo ở trên.

Và đây là thành quả, mình đã nhận thông báo email mới khi có email mới đến, đơn giản đúng không nào?

![](https://images.viblo.asia/d8e8f0e3-81d7-47a7-a829-8840c9e57004.png)

Như vậy, bài viết này mình đã hướng dẫn cách để nhận thông báo email mới trên hosting theo cách lập trình viên rồi đó. Bạn còn thắc mắc gì, cứ nhắn cho mình ở phía dưới nha! Chúc các bạn thành công!