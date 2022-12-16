## Mới học AWS thì học gì
![](https://images.viblo.asia/c50cf7d3-859e-4edd-af0e-7f0cd521e7e6.gif)
AWS được biết đến là một dịch vụ hấp dẫn bởi nó cung cấp rất nhiều các service đi kèm. Những service, tính năng mới được công bố, cập nhật liên tục hàng ngày liên quan đến các lĩnh vực nóng bỏng như IOT, AI khiến nó đang dần trở nên được ưu chuộng và khá là "hot". 
Thực thế, khi truy cập trang chủ AWS, link tới 「Products」chúng ta có thể thấy 1 loạt các service được chia theo category, hơn nữa trong các category đó cũng có hàng loạt các service con, điều này khiến những người mới học AWS nhiều khi cảm thấy bối rối không biết phải bắt đầu từ đâu. 
Chính vì vậy, trong bài này mình sẽ giới thiệu 4 service cơ bản mà hầu như hệ thống nào cũng sử dụng - người mới bắt đầu học AWS đầu tiên nên học những service này!
* Amazon EC2
* Amazon EBS
* Amason S3
* Amazon Route53

### 1. Amazon EC2 và EBS - Server ảo và Disk
![](https://images.viblo.asia/d01e4097-0415-49af-aa2b-a86d2cced908.png)
Chúng ta sẽ bắt đầu từ Amazon EC2 - viết tắt của Elastic Compute Cloud. 
Bản thân khi chúng ta tra nghĩa của từ elastic trên Google, kết quả tìm kiếm sẽ là sự đàn hồi, co dãn. Oh, hóa ra vậy, thằng này có thể co dãn tùy thích đây. Có vẻ đây là cũng điểm mà Amazon muốn nhấn mạnh ở dịch vụ này!
Vậy EC2 là gì, nó là 1 dịch vụ tạo server ảo trên môi trường AWS. Thông thường, muốn chạy một ứng dụng, người phát triển ứng dụng cần mua một máy tính (server) và cài các thông số cần thiết để chạy ứng dụng trên đó.
Với AWS EC2, chúng ta có thể thuê các server đó, cài cắm Windows or Linux, lựa chọn cấu hình máy tùy thích (như mua máy tính thông thường) mà mọi việc cài cắm AWS đều làm cho chúng ta. Thật là tiện lợi phải không nào!

Tiếp đến khi nhắc tới EC2, chắc chắn phải nhắc tới một dịch vụ đi kèm đó là EBS - viết tắt của Elastic Block Store. Nó được sử dụng với EC2 như một set, như chân với tay, như thịt chó với mắm tôm. 
EBS là bộ nhớ (block store) mang tính vĩnh cửu được thiết kế để sử dụng kèm với EC2, mọi dữ liệu EC2 về cơ bản sẽ được lưu ở EBS. 
Thực ra EC2 cũng có nơi lưu trữ dữ liệu, tuy nhiên khi stop EC2 (như kiểu shutdown máy tính) thì dữ liệu này sẽ bị mất đi (kiểu bộ nhớ RAM) còn đối với EBS thì trái ngược, turn off server thoải mái dữ liệu vẫn còn nguyên, bảo sao được gọi là bộ nhớ lưu trữ mang tính vĩnh cửu.

### 2. S3 - bộ nhớ lưu trữ data số lượng lớn
![](https://images.viblo.asia/b43ebf47-7f68-4fdc-a350-458a664b3f15.jpg)

S3 viết tắt của Simple Storage Service, nghe tên đã thấy chức năng của nó là làm gì rồi phải không nào ^^. Nó là một bộ nhớ lưu trữ đơn giản. Nhắc đến đây chắc sẽ có nhiều người nghĩ rằng "lưu ở EBS cũng được, sao lại sinh ra cái S3 này làm gì?" phải không nào.
Thật ra giữa S3 và EBS có rất nhiều điểm khác nhau, nhưng điểm ấn tượng nhất có lẽ là S3 cho phép lưu trữ không giới hạn, hơn nữa S3 so với EBS nó rẻ hơn rất nhiều ( hiểu đơn giản thì so với S3 trả 0.025$/tháng, EBS cần trả 0.12$/tháng - gấp 5 lần)
Cho nên những data thường xuyên truy cập nên lưu ở EBS, còn những dữ liệu mang tính backup thì nên lưu ở S3.

### 3. Amazon DNS server - Route53
![](https://images.viblo.asia/944bb8bf-0504-4c13-9996-de36a6d4add7.png)

Route53 là dịch vụ DNS của Amazon. 「53」ở đây là DNS source port number. 
DNS (hệ thống tên miền)  là một hệ thống đặt tên theo thứ tự cho máy vi tính, dịch vụ, hoặc bất kỳ nguồn lực tham gia vào Internet. Nó liên kết nhiều thông tin đa dạng với tên miền được gán cho những người tham gia. Quan trọng nhất là, nó chuyển tên miền có ý nghĩa cho con người vào số định danh (nhị phân), liên kết với các trang thiết bị mạng cho các mục đích định vị và địa chỉ hóa các thiết bị khắp thế giới.
Ví dụ, www.sun-asterisk.com dịch thành 208.77.188.144.
Tất cả các dịch vụ trên là các dịch vụ cơ bản cần thiết để chạy một ứng dụng và chúng ta cần nắm vững trước khi đi sâu hơn vào tìm hiểu AWS!

### Tổng kết
Vừa rồi là những kiến thức cơ bản mình nghĩ là cần thiết cho người mới bắt đầu học AWS. Hy vọng sẽ giúp ích cho những bạn mới bắt đầu học về nó.

* Tài liệu tham khảo
(https://www.bit-drive.ne.jp/managed-cloud/column/column_04.html)