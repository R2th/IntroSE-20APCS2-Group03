# I. Tìm hiểu về proxy?
<br>
<br>

Proxy server là máy chủ trung gian giữa client và server thực hiện nhiệm vụ chuyển dữ liệu giữa client với server. 

Ngay sau khi được yêu cầu thì proxy server sẽ kiểm tra bộ đệm của nó xem có dữ liệu trong đó, nó sẽ trả lại dữ liệu cho client, nếu không có trên bộ nhớ đệm, nó sẽ thực hiện yêu cầu thay cho client và gửi lại dữ liệu cho client.

Ở đây người mọi người hay sử dụng proxy với mục đích fake IP hoặc ẩn giấu thông tin truy cập

![image.png](https://images.viblo.asia/eb36bce0-eb7c-40ea-b679-5b64c6a13a0c.png)

<br>
<br>

# II. Giới thiệu Squid Proxy

<br>

Squid proxy là một là một giải pháp proxy phần mềm mã nguồn mở tự do được sử dụng nhiều nhất trong giải pháp Proxy của cộng đồng mạng. Squid proxy làm nhiệm vụ chuyển tiếp các yêu cầu từ phía client và đồng thời đóng vai trò kiểm soát tạo sự an toàn cho việc truy cập Internet của các client.

![image.png](https://images.viblo.asia/cc1f5104-4d85-430d-9b0e-41f37fc7866e.png)

<br>
<br>

Hiểu nôm na thì:

Squid là một caching proxy cho web nó hỗ trợ HTTP. HTTPS, FTP... giúp chúng ta cải thiện thời gian phản hồi và làm giảm việc sử dụng băng thông.

<br>
<br>

# III. Hướng dẫn cài đặt Squid Proxy trên linux

<br>
<br>

Để tăng tính chân thật của bài viết. Mình sẽ thực hiện trên một con server thật nhé. Mọi người chắc chắn sẽ thành công nếu làm theo hướng dẫn

<br>

**B1: Truy cập vào server thông qua ssh**


![image.png](https://images.viblo.asia/983c07db-f60c-4ae3-9f3b-f20c3013e092.png)

<br>

**B2: Chạy những lệnh sau để cài đặt**

<br>

`sudo yum -y update`

`yum -y install squid`

`systemctl start squid`

`systemctl enable squid`

<br>

![image.png](https://images.viblo.asia/c17ce4fb-183a-412a-b77d-fc61c535628d.png)

<br>

![image.png](https://images.viblo.asia/c02609be-fad0-427c-9971-3570cfb41479.png)

<br>

![image.png](https://images.viblo.asia/fdef9c23-8717-4ebf-b4a9-90c8523a5e40.png)

<br>

Để kiểm tra trạng thái

`systemctl status squid`

<br>

![image.png](https://images.viblo.asia/dc673bb3-e31c-46f5-aac9-05057b93148d.png)

<br>

Để xem thông tin cài đặt cấu hình squid

`sudo vi /etc/squid/squid.conf`

<br>

![image.png](https://images.viblo.asia/522dc83c-1c27-4c3f-aea5-630a4eedb7d8.png)

<br>
Chỉnh dòng:

`http_access deny all -> http_access allow all`

và khởi động lại bằng 2 lệnh này:

`systemctl restart squid`

`systemctl enable squid`

Kiểm tra file cấu hình ta có thể thấy mặc định cổng proxy sẽ là: 3128

<br>

**B3: Mở cổng để kiểm tra proxy đã hoạt động chưa**

<br>

Giờ chúng ta mở cổng 3128 để kiểm tra xem đã thành công chưa nhé

Các bạn dùng lệnh:

`firewall-cmd --zone=public --add-port=3128/tcp --permanent`

`firewall-cmd --reload`

Ở đây mình dùng centOs 8 nên dùng lệnh này nhé. Còn tùy từng server mọi người đang sài là hệ điều hành nào thì cài thêm app hoặc dùng lệnh tương ứng

<br>

![image.png](https://images.viblo.asia/61954a94-dc95-4c49-bd23-718b03e37a32.png)

Giờ mình dùng 1 terminal khác để kiểm tra IP xem đã ăn theo proxy mình setting chưa nhé

![image.png](https://images.viblo.asia/7d8527f9-cb7c-4aa5-bf57-882847043da7.png)

Oke đã xong. Mọi người có thể thấy trong "origin" có 2 ip mình che mờ đi. Thì ip 1 là ip thật của máy mình, còn ip thứ 2 là IP của server proxy.

<br>
<br>

# Cảm ơn mọi người đã theo dõi!!!!