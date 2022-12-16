Nếu bạn nghĩ rằng Http/2 có những cơ chế bảo mật hơn Http truyền thống thì có lẽ bạn đã nhầm. Bài viết dưới đây sẽ chia sẻ 1 vài thông tin về điều đó.
![](https://images.viblo.asia/edc388fc-2b3a-4ab6-9b98-8b965c362829.png)

Các nhà nghiên cứu từ trung tâm bảo mật dữ liệu Imperva đã chỉ ra rằng có ít nhất bốn lỗ hổng quan trọng của giao thức Http/2 mà các trang web ngày nay đang vận hành. Các lỗ hổng đó làm cho server thường xuyên bị throttle dẫn đến chậm kết nối bằng cách tải những tệp tin cỡ lớn và dẫn tới vòng lặp vô tận trên server của bạn.

## 1. Slow Read (CVE-2016-1546)
Đây là cách tấn công DDos phổ biến nhất mà các tin tặc thường dùng họ làm cho server thường bị tê liệt khi bắt server phải nhỏ giọt từng dữ liệu trả về.

Khi server nhận được đủ 1 gói tin và bắt đầu thao tác đọc các gói tin đó và sẽ phản hồi về cho client đủ các thông điệp nhận được quá trình phản hồi này sẽ bị bóc tách thành những phần nhỏ, Chính quá trình phản hồi này làm server mất nhiều thời gian để xử lý cứ duy trì tốc độ chậm này đến khi client nhận đủ reponse hoặc bị timeout.

## 2. HPACK Bomb (CVE-2016-1544, CVE-2016-2525)
Cách thức tấn công này nhằm vào lớp nén (compression layer).
Các tin tặc thường gửi gói tin được nén lại và qua mặt với header có dung lượng rất nhỏ và dễ dàng gửi chúng lên server. Nhưng khi đã gửi chúng lên server và server bắt đầu giải nén chúng thì lại lên tới hàng chục hàng trăm gigabytes điều này gây ảnh hưởng và tiêu tốn rất nhiều tài nguyên của server.

## 3. Dependency Cycle Attack (CVE-2015-8659)
Http/2 đã tạo ra 1 cơ chế kiểm soát các luồng trong 1 kết nối điều này giúp giao thức này đảm bảo ko bị phân mảnh và kiểm soát được tốc độ. Tuy nhiên điều đó lại là một lỗ hổng cho các tin tặc. họ gửi lên nhiều request phụ thuộc lẫn nhau và tạo thành những vòng luẩn quẩn cho đến khi server bị rơi vào tình trạng vòng lặp vô hạn và dần bị tê liệt

## 4. Stream Multiplexing Abuse (CVE-2016-0150)

Cách thức tấn công này bằng cách gửi nhiều luồng dữ liệu trong 1 connection duy nhất. Và chính việc ghép các luồng này lại là nguyên nhân dẫn đến tình trạng phá vỡ máy chủ khi thực thi những mã lệnh độc. cuộc tấn công này thường gây tình trạng bị treo từ chối tới những người dùng hợp pháp khác.


### Giải pháp để kiểm tra nếu server của bạn đã bị tấn công.
Khi server đã bị tê liệt vì tiêu tốn quá nhiều tài nguyên bởi cuộc tấn công. vậy giải pháp để bạn khách phục sẽ là gì. Dưới đây là một vài giải pháp mình đã tham khảo được để giảm thiểu các vấn đề này.

+ Đếm lượng connection vào các port web 80, 443..
```sh
$ netstat -n | grep :80 |wc -l
```

+ Kiểm tra số lượng connection đang ở trạng thái SYN_RECV
```sh
$ netstat -n | grep :80 | grep SYN_RECV|wc -l
```

+ Hiển thị tất cả các IP đang kết nối và số lượng kết nối từ mỗi IP:
```sh
$ netstat -an|grep :80 |awk '{print $5}'|cut -d":" -f1|sort|uniq -c|sort -rn
```

+ Nếu bạn muốn kiểm tra IP nào mở nhiều SYN
```sh
$ netstat -an|grep :80|grep SYN |awk '{print $5}'|cut -d":" -f1|sort|uniq -c|sort -rn
```

+ Nếu bạn sử dụng nhiều server muốn kiểm tra địa chỉ server nào đang bị tấn công

```sh
$ netstat -plan | grep :80 | awk '{print $4}'| cut -d: -f1 |sort |uniq -c
```

+ Hiển thị tất cả các IP đang kết nối và số lượng kết nối từ mỗi IP
```sh
$ netstat -an | grep ':80' | awk '{print $5}' | sed s/'::ffff:'// | cut -d":" -f1 | sort | uniq -c
```

Khi đã kiểm tra và xác định có dấu hiệu nghi vấn việc cần làm của bạn là block ngay lập tức IP đó lại

```sh
$ route add 192.168.1.8 reject
```

Sau đó hãy restart lại tất các các connection đang diễn ra bằng cách restart web server của bạn

```sh
$ service nginx restart
```

Đây là các giải pháp nhằm mục đích chống tấn công nhanh chóng để khắc phục khi server của bạn bị tê liệt. Hi vọng nó sẽ giúp ích phần nào cho các bạn.

Tài liệu tham khảo:

https://thehackernews.com/2016/08/http2-protocol-security.html