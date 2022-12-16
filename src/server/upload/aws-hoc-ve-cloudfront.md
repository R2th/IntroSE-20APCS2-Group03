### Amazon CloudFront là gì ?

Amazon CloudFront là Contents Delivery Network (CDN) tốc độ cao, performance cao được AWS cung cấp. Trên khắp thế giới có lắp đặt rất nhiều Edge server, nên bằng cách dẫn user tới Edge server gần nhất thì việc access sẽ có tốc độ rất cao. Ngoài ra, tại Edge server cũng có thực hiện cache contents, nên giảm được tải cho Origin server, việc truyển gửi thông tin sẽ trở nên an toàn hơn nữa.

![](https://images.viblo.asia/42d53cd3-1f3a-4b05-b45e-27254b2cdcbb.png)

### Cơ chế của CloudFront

File gốc để gửi thì được đặt trong server gọi là "Origin server", còn server thực hiện gửi đến cho user thì gọi là "Edge server". Các setting như chỉ định Origin server, hay các setting của CloudFront thì được tổng hợp hết tại "Distribution". Distribution sẽ được gán cho một domain CloudFront kiểu như là "d111111abcdef8.clodufront.net" (phần 111111abcdef8 thực tế là 1 chuỗi kí tự random). Bằng cách cho user access tới domain CloudFront này, thì có thể gửi tin thông qua Edge server của CloudFront.

![](https://images.viblo.asia/425cd929-84b1-4951-8d6a-f23537f38d26.png)


### Dẫn  đến Edge server gần nhất

Nếu user access vào domain của CloudFront, CloudFront DNS sẽ trả về ID address của Edge server gần user đó nhất. Do Edge server được lắp đặt ở khắp thế giới, nên user access vào IP address đó thì có thể được nhận thông tin từ Edge server rất nhanh.

![](https://images.viblo.asia/56cf28ea-bb6d-4448-82ca-bbb06a8601a7.jpg)

### Cơ chế cache

Edge server đã nhận request từ user, sẽ confirm thử xem là file được request có đang được cache chưa ? Trường hợp nếu chưa được cache, thì sẽ get file từ Origin server, và gửi tới user file đó. Và đồng thời thực hiện cache file đó trong một khoảng thời gian nhất đinh. Còn trường hợp nếu file được request đã được cache, thì sẽ không phát sinh access tới Origin server, mà từ Edge server tiến hành trả file đó về cho user.

### Chức năng multi Origin

Do trong CloudFront có nhiều origin server, nên có chức năng multi origin thay đổi đích gửi đến theo path access, và chức năng Cache Behavior thay đổi thao tác cache theo path access. Ví dụ, về cấu trúc thì nội dung file tại mỗi origin server sẽ như bên dưới.

![](https://images.viblo.asia/c35db9a5-a7ea-4bd5-86f5-0e3074fa345c.png)

S3-Origin

| File path | Bên trong file |
| -------- | -------- |
| /index.html | chuỗi ký tự "S3-Origin: /index.html"  |
| multi-origin-behavior/index.html | chuỗi ký tự "S3-Origin: multi-origin-behavior/index.html"  |


ELB-Origin

| File path | Bên trong file |
| -------- | -------- |
| /index.html | chuỗi ký tự "ELB-Origin: /index.html"  |
| multi-origin-behavior/index.html | chuỗi ký tự "LB-Origin: /multi-origin-behavior/index.html"  |
| multi-origin-behavior/nocache/test_cookie.php | page count của PHP dùng cho confirm cache  |