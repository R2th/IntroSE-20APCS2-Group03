Hôm nay dự án của tôi bị dính incident ở production khiến server bị sập, mà nguyên nhân của nó là do thiết lập php-fpm không chính xác.
Vậy thiết lập các giá trị như thế nào mới là chính xác, mời các bạn xem bài dịch sau:

Vào một ngày, tôi đã tìm kiếm các bài viết và lời khuyên về cách tinh chỉnh các cài đặt PHP-FPM. Với sự thất vọng của tôi, tài liệu chính thức đã không đưa ra bất kỳ hướng dẫn nào và không có nhiều tutorial về chủ đề này.

Sau khi tìm kiếm qua các bài đăng trên blog khác nhau, tôi đã xoay sở để ghép các thông tin sau đây.

Bạn cần biết ba điều về máy chủ của mình trước khi thay đổi cài đặt PHP FPM:

Máy chủ của bạn có bao nhiêu lõi?
Dung lượng bộ nhớ (RAM) trên máy chủ của bạn.
Quá trình PHP trung bình tiêu thụ bao nhiêu bộ nhớ trên máy chủ của bạn?

## Máy chủ của bạn có bao nhiêu core?

Để biết máy chủ của bạn có bao nhiêu lõi, hãy chạy lệnh sau:

```
echo Cores = $(( $(lscpu | awk '/^Socket/{ print $2 }') * $(lscpu | awk '/^Core/{ print $4 }') ))

```

Khi bạn chạy lệnh Linux ở trên, bạn sẽ nhận được một cái gì đó giống như Cores = 4.

Ghi lại con số đó vì nó rất quan trọng.

## Máy chủ của bạn có bao nhiêu bộ nhớ?

Bạn nên biết máy chủ của bạn có bao nhiêu bộ nhớ. Câu hỏi thực sự ở đây là: Bạn muốn cung cấp bao nhiêu bộ nhớ cho PHP?

Bạn phải tính đến thực tế là máy chủ của bạn cũng có thể đang chạy NGINX, Apache hoặc MySQL. Những quá trình này tiêu thụ bao nhiêu bộ nhớ? Nếu bạn có 8GB RAM và các quy trình khác trên máy của bạn đang tiêu tốn 2GB, điều đó khiến bạn có 6GB - hoặc 5GB nếu bạn muốn chơi an toàn và để lại một số miễn phí.

Chỉ ra bao nhiêu bộ nhớ bạn muốn cung cấp cho PHP và ghi lại. Trong trường hợp của tôi, tôi có 4GB mà tôi có thể phân bổ cho PHP.

## Trung bình, mỗi process PHP tiêu thụ bao nhiêu bộ nhớ?

Điều này sẽ phụ thuộc vào ứng dụng và phiên bản PHP của bạn. Các phiên bản cũ hơn của PHP có xu hướng tiêu thụ nhiều bộ nhớ hơn PHP 7.

Chạy lệnh dưới đây để nắm được việc mỗi bộ xử lý PHP FPM đang tiêu thụ bao nhiêu bộ nhớ.

```
ps --no-headers -o "rss,cmd" -C php-fpm7.2 | awk '{ sum+=$1 } END { printf ("%d%s\n", sum/NR/1024,"M") }'
```

Lưu ý rằng lệnh ở trên đang tìm kiếm một process tên là php-fpm7.2. Process PHP trên máy chủ của bạn có thể được đặt tên theo cách khác nhau. Để tìm ra tên của process PHP của bạn, hãy sử dụng lệnh `top`. Khi bạn chạy lệnh `top`, bạn có thể sẽ thấy một trong các process sau:

- php-fpm
- php5-fpm
- php7.0-fpm
- php7.1-fpm
- php7.2-fpm

Khi tôi chạy lệnh trên, tôi nhận được 29 MB. tức là mỗi process php-fpm7.2 trên máy chủ của tôi tiêu tốn khoảng 29 MB RAM.

## Các cài đặt cấu hình.
Bây giờ tôi có ba thông tin quan trọng:

- Máy chủ của tôi có 4 core.
-  Tôi có thể phân bổ khoảng 4GB RAM cho PHP.
- Mỗi process FPM PHP trên máy chủ của tôi tiêu tốn khoảng 29 MB bộ nhớ. Trên các phiên bản cũ hơn của PHP, có lẽ bạn sẽ thấy rằng mỗi process tiêu thụ nhiều hơn thế. Tôi đã đạt khoảng 90 MB cho mỗi process khi tôi đang chạy cùng một ứng dụng trên PHP 5.5.
Bây giờ là lúc để chỉnh sửa tệp www.conf, nằm trong thư mục pool.d. Trên máy chủ của tôi, nó được đặt tại:

`/etc/php/7.2/fpm/pool.d/www.conf`

Trên máy của bạn, vị trí có thể hơi khác nhau.

Có 4 giá trị cấu hình mà chúng tôi sẽ thay đổi trong tệp www.conf:

- pm.max_children
- pm.start_servers
- pm.min_spare_servers
- pm.max_spare_servers

### pm.max_children
Để có được giá trị tốt cho điều này, bạn nên lấy bộ nhớ mà bạn muốn phân bổ cho PHP FPM và chia nó cho bộ nhớ trung bình được sử dụng bởi mỗi quy trình FPM của PHP.

Trong trường hợp của tôi, tôi muốn phân bổ 4GB (4000MB) và mỗi quy trình tiêu tốn khoảng 29 MB.

Chia 4000 cho 29 và bạn nhận được khoảng 138.

Vì vậy, tôi đặt pm.max_children thành 138.

Nếu bạn có 8000 MB để dự phòng và PHP của bạn tiêu thụ khoảng 80 MB cho mỗi quy trình, thì đó sẽ là: 8000/80 = 100.

### pm.start_servers
Đối với pm.start_servers, tôi nhân số lượng lõi mà tôi có với 4.

4 x 4 = 16

Vì vậy, tôi đặt pm.start_servers thành 16.

Nếu bạn có 8 lõi, thì nó sẽ là: 4 x 8 = 32.

### pm.min_spare_servers
Đối với pm.min_spare_servers, nhân số lượng lõi mà bạn có với 2.

Trong trường hợp của tôi, đó là 2 x 4 = 8.

Vì vậy, tôi đặt pm.min_spare_servers thành 8.

### pm.max_spare_servers
Đối với pm.max_spare_servers, nhân số lõi trên máy chủ của bạn với 4.

Trên máy của tôi, đó là 4 x 4 = 16.

Vì vậy, tôi đặt pm.max_spare_servers thành 16, cùng giá trị mà tôi đã sử dụng cho pm.start_servers.

### Khởi động lại PHP FPM.
Để những thay đổi này có hiệu lực, bạn sẽ cần khởi động lại PHP FPM. Dưới đây, tôi đã bao gồm một số lệnh khởi động lại dịch vụ có thể áp dụng cho thiết lập của bạn. Chọn một cái đúng và chạynó.

```
sudo service php-fpm restart   
sudo service php5-fpm restart   
sudo service php7.0-fpm restart
sudo service php7.1-fpm restart
sudo service php7.2-fpm restart
```

## Tham khảo
https://thisinterestsme.com/php-fpm-settings/
http://blog.rhasm.net/tune-nginx-and-php-fpm/