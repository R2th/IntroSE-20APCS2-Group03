![](https://images.viblo.asia/1680a376-4410-42b9-b2f3-36d5b0cc018a.png)

Bài viết dưới đây mình sẽ chia sẻ cho các bạn cách trỏ tên miền miễn phí vào EC2 instance Amazon web service. Chúng ta có thể đăng ký tên miền từ các nhà cung cấp khác nhau, với bài viết này mình xin phép được suggest [Freenom](https://www.freenom.com/en/index.html?lang=en).

[Freenom](https://www.freenom.com/en/index.html?lang=en) cho phép chúng ta đăng ký tên miền miễn phí tối đa đến 1 năm. Mặc dù domain extension thường không được phổ biến ví dụ như .tk, .ml, .cf, .ga, .gq, ... nhưng lại khá gắn gọn và dễ nhớ nên mình thường sử dụng những tên miền này thay vì dãy IP rườm rà, khó nhớ :D. 

# Đăng ký domain 
1. Đăng ký tài khoản [Freenom](https://www.freenom.com/en/index.html?lang=en)
2. Chọn Services -> Register a new domain
3. Nhập tên miền mong muốn và kiểm tra
4. Sau khi chọn được tên miền phụ hợp tiến hành đặt mua, chúng ta có thể lựa chọn tối đa 12 tháng miễn phí

![](https://images.viblo.asia/9f2f909b-bbaf-4fc4-b4e9-5135db8981e9.png)

5. Đến bước này chúng ta tạm thời skip khai báo DNS cho đến khi đã có Nameservers cho EC2 instance. 

# Trỏ tên miền đến EC2 instance
1.  Đăng nhập vào tài khoản AWS account và đăng ký Elastic IP cho instance
![](https://images.viblo.asia/da8d59a7-e6dc-4c41-80a4-5c5caaa41bfe.png)

    Sau khi đã tạo new address ta chỉ định IP này đến instance, chọn Action -> Associate address 
![](https://images.viblo.asia/6c93d482-012f-4338-9e34-b44f60dc1830.png)

2. Create Hosted Zone tại [Route53](https://console.aws.amazon.com/route53/home?region=us-east-2#hosted-zones:)
![](https://images.viblo.asia/00771d43-2a7e-4a1a-b34d-41ca54ecc75f.png)

3. Sau khi tạo Hosted Zone chúng ta sẽ có mặc định 2 record sets mặc định, mình sẽ note lại 4 Nameservers đã được cung cấp. 
4. Tạo thêm 2 record sets một cái có www name và một cái không với value là elastic IP mà chúng ta đã tạo từ trước 
 ![](https://images.viblo.asia/a5b122e2-5683-4746-b956-4d1840dd7383.png)
 
 5. Cuối cùng chúng ta cần khai báo 4 Nameservers được cung cấp bởi Route53 service cho domain đã đăng ký ở [Freenom](https://www.freenom.com/en/index.html?lang=en)

    Thiết lập Nameserver Service -> My domain -> Manage domain -> Management Tools -> Nameservers
![](https://images.viblo.asia/017c5b98-9000-467c-8220-f74d5cf42304.png)

 Như vậy chúng ta đã có tên miền cho ứng dụng web của mình rồi, hãy truy cập tên miền của mình để kiểm tra nhé [denthoquangtrung.tk](http://denthoquangtrung.tk/). Hy vọng bài viết này mang đến kiến thức bổ ích cho mọi người, chúc các bạn một ngày làm việc vui vẻ!
 
 Tham khảo: [Getting a FREE domain for your EC2 Instance
](https://medium.com/@kcabading/getting-a-free-domain-for-your-ec2-instance-3ac2955b0a2f)