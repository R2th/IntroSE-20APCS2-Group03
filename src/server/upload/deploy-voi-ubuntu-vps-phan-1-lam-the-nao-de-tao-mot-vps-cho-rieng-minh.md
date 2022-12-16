# 1. Mở đầu
- Bản chất của cuộc sống là sự nỗ lực không ngừng nghỉ mỗi ngày. Mỗi người cố gắng làm cho phiên bản của mình ngày hôm nay tốt hơn ngày hôm qua. Trong công việc cũng thế, bản thân mình là một **backend web developer**, mình nghĩ chỉ biết code thôi là chưa đủ, để tăng giá trị bản thân, mình nghĩ chúng ta cần phải biết nhiều hơn thế. Ví dụ như cần học thêm kiến thức để trờ thành **fullstack developer**, để có thể tự build, deploy trang web của mình lên **server**. Vì thế gần đây mình có tham gia một khóa học về deploy project trên **VPS** và ngày hôm nay mình muốn chia sẻ cho các bạn cách để có thể tạo **VPS** riêng cho mình. Oke bắt đầu thôi 👌
# 2. Chọn nhà cung cấp VPS
Hiện nay có rất nhiều nhà cung cấp **VPS** cung cấp cho bạn khả năng uptime đáng tin cậy, tốc độ nhanh và tài nguyên dồi dào (**RAM**, dung lượng lưu trữ, băng thông vv) với một giá thành hợp lý. Một trong số những nhà cung cấp **VPS** tốt hiện nay có thể kể đến như:

* [Hostinger](https://www.hostinger.vn/)
* [GoDaddy Hosting](https://www.godaddy.com/)
* [Vulter](https://my.vultr.com/)
* [Amazon web services](https://signin.aws.amazon.com/)

Trong bài viết này, mình sẽ hướng dẫn các bạn tạo một **VPS** trên **Vultr**.
# 1. Vultr là gì?
- Với trên 200 nghìn khách hàng từ 150 quốc gia trên toàn cầu, **Vultr** được biết đến như một nền tảng cung cấp máy chủ đám mây với bộ lưu trữ linh hoạt. Nền tảng đám mây tiên tiến này nhằm mục đích cung cấp cơ sở hạ tầng đám mây và dịch vụ lưu trữ cho doanh nghiệp và các nhà phát triển. Với 17 trung tâm dữ liệu, **Vultr** làm đơn giản hóa môi trường đám mây cho các nhà phát triển ở khắp nơi trên thế giới
- Triển khai bằng một cú click, 100% ổ cứng SSD, hoàn toàn tự động và chuyên dụng khiến người dùng mê mẩn. Tương tự so với các đối thủ cạnh tranh với giá cả hợp lý và một hệ quản trị thân thiện. **Vultr** được xem như một trong số những nhà cung cấp dịch vụ tốt nhất dịch vụ **Cloud Server** . Chắc chắn, nó có thể là một sự lựa chọn đáng tin cậy cho các dự án quy mô nhỏ với quy mô nhỏ và ngân sách hạn chế.

# 2. Tạo VPS trên Vultr
- Đầu tiên các bạn cần tạo tài khoản trên **Vultr**. Hiện tại **Vultr** đang có chương trình tặng **150$** khi đăng kí mới các bạn có thể tham khảo tại [đây](https://canhme.com/vultr/tang-150-khach-hang-linode/)
- Đây là màn hình đăng ký **VPS** trên **Vultr**
![image.png](https://images.viblo.asia/b8c6ff77-c10d-4e0c-abb5-602705a005b0.png)
* Đầu tiên các bạn cần chọn **Server**. Ở đây có nhiều loại **server** cho các bạn chọn với mục đích dùng khác nhau. 
Nếu bạn chỉ dùng với mục đích đơn giản là tự học hay **build** một trang **web** đơn giản không có quá nhiều người dùng thì mình khuyến nghị các bạn cứ gói rẻ nhát mà chơi.
* Tiếp đến chúng ta cần chọn nhà cung cấp **CPU & Storage Technology**. 
![image.png](https://images.viblo.asia/a98d1751-f505-4b0c-acce-e4a865e06a82.png)

    Ở đây có 2 nhà cung cấp là **Intel** và **AMD**. Thông tin chi tiết bạn có thể xem như mô tả
* **Server Location**
![image.png](https://images.viblo.asia/79a6bc4e-91aa-4fbb-b1c1-510ce12ca352.png)

    **Vultr** cung cấp cho chúng ta rất nhiều **server** đặt tại các quốc gia khác nhau, điều này rất thuận lợi cho việc truy cập **Server** được nhanh chóng và ổn định. Do mình ở Việt Nam nên mình khuyến nghị các bạn nên chọn các **Server** ở gần Việt Nam như Nhật bản, Hàn Quốc, Singapore...

* **Server Image**
![image.png](https://images.viblo.asia/b3cae15e-3e01-49ea-8929-bcb7913264bf.png)

    Tiếp đến  chúng ta cần chọn hệ điều hành cho **server**. **Vultr** cung cấp cho chúng ta rất nhiều **hệ điều hành** như **Debian**, **window**, **ubuntu**... Các bạn có thể chọn hệ điều hành phù hợp với nhu cầu của mình. Ở đây mình chọn hệ điều hành **ubuntu** **20.04**

* **Server size**
![image.png](https://images.viblo.asia/400e8e78-a291-4d3b-bb85-e127d8e88dbb.png)

    Tùy vào quy mô của dự án các bạn nên chọn **server** sao cho phù hợp. Nếu chỉ đơn giản mục đích để học tập chọn gói 25 GB NVme là đủ
* **Tự động sao lưu**
![image.png](https://images.viblo.asia/cab8a45c-df83-4cab-8229-437d90ec8041.png)

    Đây là một tính năng khá là hay của **Vultr** cho phép bạn khôi phục lại **image** bị mất bằng cách sao lưu lại một phiên bản mới từ **image** đã lưu

* **Tính năng bổ sung**
![image.png](https://images.viblo.asia/64ba1d25-9ff1-49d0-b94a-8b73b1cacebd.png)

    Các bạn có thể chọn thêm một số tính năng tùy nhu cầu. Với nhu cầu của mình thì chọn thêm **Enable IPv6**
* **SSH Keys**

    Các bạn cần tạo **ssh** key trên **local**, rồi tạo  **ssh key** trên **Vultr** bằng cách. Điền tên bạn muốn tạo và copy nội dung file **public key (id_rsa.pub)** trên local vào box.

![image.png](https://images.viblo.asia/ede3e4a4-b022-45b2-8d1d-ebd44d1e73a3.png)![image.png](https://images.viblo.asia/d7259425-c75e-448f-a570-bb95935050a8.png)

* **Firewall**

    Mặc định sẽ là **no Firewall**. Tuy nhiên, các bạn có thể cấu hình **firewall** cho riêng mình. Như bên dưới mình có tạo một số **options** cho **Firewall**: **SSH**, **TCP**
![image.png](https://images.viblo.asia/578df0f4-891e-42b2-9156-98c562a09006.png)

* **Server Host name & Label**

    Các bạn có thể đặt **domain** của mình vào (nếu đã có). Còn không có thể thêm một **domain** bất kỳ. Phần này mình thấy không quan trọng lắm nên các bạn không nhập cũng được.

![image.png](https://images.viblo.asia/5097786b-8fe3-4fe8-b450-8db7c1a00abe.png)

* **Deploy** thôi. Sau khi **deploy** xong sẽ hiện ra như sau:
![image.png](https://images.viblo.asia/4f4e3042-028d-4a5f-8bc1-6d8c0b27dcb2.png)
- Các bạn có thể xem chi tiết **VPS** mình vừa mới tạo. Ở đây hiển thị ra khá là đầy đủ các thông tin như **Username**, **Password**, địa điểm đặt **server**, lượng **CPU** đã mất, số tiền phải thanh toán ...
![image.png](https://images.viblo.asia/a04327ea-cc7f-4f9d-bf08-c2b580237ca1.png)

    Để kiểm tra, các bạn có thể **ssh** vào xem có **login** được không
```
ssh your_user@your_ip
Ex: ssh root@45.77.14.51
```

Hiển thị được như thế này là thành công.
![image.png](https://images.viblo.asia/c55b6f5f-e3bf-4ba2-aa72-3f37d55af136.png)
# 3. Lưu ý
Nếu không cần dùng đến **server** thì hãy **stop** để tránh bị trừ tiền nhé 😀

# 4. Kết luận
- Trên đây mình vừa hướng dẫn các bạn cách tạo **VPS** trên **Vultr**. Bài viết rất đơn giản nhưng hị vọng sẽ giúp ích được cho các bạn.  Bài viết tiếp theo mình sẽ hướng dẫn các bạn, cách **deploy** một **project** **Laravel** hoàn chỉnh trên **VPS**. Các bạn có thể xem tại [đây](https://viblo.asia/p/deploy-voi-ubuntu-vps-phan-2-deploy-project-laravel-hoan-chinh-tren-vps-Eb85ovj4l2G). Rất mong nhận được sự ủng hộ từ các bạn. Cám ơn các bạn vì đã đọc bài viết của mình 😘