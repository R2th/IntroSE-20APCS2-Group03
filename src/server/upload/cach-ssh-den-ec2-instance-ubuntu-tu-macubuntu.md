### Giới thiệu:

Đã từ lâu, Ubuntu và các dẫn xuất hoặc bản phân phối của nó là nền tảng được sử dụng rộng rãi nhất trên đám mây. Trong bài đăng này, mình sẽ hướng dẫn các bạn cách kết nối với EC2 Instance Ubuntu qua **SSH**. Lần này mình sử dụng máy Mac, vì vậy một số ảnh chụp màn hình của mình sẽ được lấy từ giao diện người dùng Mac. 

> Tuy nhiên, đối với các bạn sử dụng hệ điều hành Ubuntu thì cách thức cũng như dòng lệnh cũng tương tự nên vẫn có thể áp dụng các bước hướng dẫn ở bài viết này.

Kết nối qua SSH thường được thực hiện thông qua sự xác thực của **public key**, yêu cầu người dùng có sẵn **private key** của họ. Thông thường chúng ta có thể tạo cặp public key–private key bằng công cụ của bên thứ ba và sau đó thêm public key trên Amazon EC2 hoặc một cách khác là từ chính EC2 Instance. 

Trong quá trình tạo EC2, sẽ có một bước chọn cặp khóa (Key pair) cho Instance để bạn có thể kết nối với EC2 một cách bảo mật nhất.

Bây giờ, chúng ta sẽ SSH đến EC2 Instance Ubuntu từ máy cục bộ của bạn (Mac/Ubuntu).

### Cần chuẩn bị:
1. Một tài khoản AWS.
2. Một máy chủ ảo EC2 Instance. Nếu bạn chưa setup, bạn có thể kham khảo tại bài viết này : [Cách để tạo một máy chủ ảo EC2 Instance Ubuntu 22.04 trên Amazon AWS.](https://viblo.asia/p/cach-de-tao-mot-may-chu-ao-ec2-instance-ubuntu-2204-tren-amazon-aws-EvbLbOxvVnk)
3. Một file private key (.pem) mà bạn đã tạo ra khi setup EC2 Instance

### Các bước kết nối EC2 từ Mac/Ubuntu:
Để kết nối với EC2 Instance từ Mac/Ubuntu:

1. Mở **Terminal**.
2. Dẫn đến thư mục nơi chứa file private key (.pem).
3. Run dòng lệnh với format sau đây để kết nối với EC2 Instance

    `$ sudo ssh -i "<private-key-cua-ban>.pem" <instance-user-name>@<instance-public-dns-name>`

    Ví dụ:

![Ảnh chụp Màn hình 2022-08-24 lúc 14.07.30.png](https://images.viblo.asia/ed40474c-3c73-4452-a333-0aaf1f3a71a7.png)

Thay thế `<instance-user-name>@<instance-public-dns-name>` bằng **Hostname** và **Username** của EC2 Instance của bạn. Bạn có thể tìm thấy thông tin này trên Bảng điều khiển AWS EC2. Đi tới **EC2 Dashboard**. Bấm chọn Instances. Tích vào ô Instance mà bạn muốn kết nối, sau đó bấm chọn **Connect**. Tiếp tục bấm chọn **SSH Client**. Bạn có thể thấy một cách chi tiết về các bước kết nối với EC2 Instance qua SSH mà AWS cũng hướng dẫn.

![Ảnh chụp Màn hình 2022-08-24 lúc 14.08.28.png](https://images.viblo.asia/004bc38e-8728-4128-8b56-055c46c6df4d.png)

> Trước khi SSH, nếu file private key (.pem) của bạn đang ở trạng thái public thì trước tiên cần phải run command sau để đảm bảo tính bảo mật của private key.   
>`$ sudo chmod 400 "<private-key-cua-ban>.pem"`

Nếu đây là lần đầu tiên bạn kết nối với instance này, nó sẽ hiển thị cảnh báo bảo mật. Nhập **yes** để tiếp tục kết nối với EC2 Instance.

![Ảnh chụp Màn hình 2022-08-24 lúc 14.12.11.png](https://images.viblo.asia/d6e57452-9335-4b96-8428-11a5e6429447.png)

Bây giờ bạn đã có thể kết nối với EC2 Instance từ máy cục bộ của bạn.

### Các lỗi thường xảy ra khi SSH đến EC2 Instance:
1. Permision denied:

    `Permission denied (publickey,gssapi-keyex,gssapi-with-mic)`

    Đây là một trong những lỗi phổ biến khi kết nối SSH với Instance. Đó là chọn sai cặp khóa khi khởi chạy Instance. Vì vậy hãy đảm bảo private key mà bạn sử dụng trong quá trình kết nối SSH và cặp khóa bạn đã chọn trước đó phải trùng khớp. Nếu chúng không khớp, bạn sẽ nhận được lỗi như trên.

2. Connection timed out:

    `ssh: connect to host ec2-X-X-X-X.compute-1.amazonaws.com port 22: Connection timed out`

    Thông báo lỗi này xuất phát từ SSH Client. Lỗi này cho biết EC2 Instance không phản hồi với máy cục bộ và kết nối hết thời gian chờ. Sau đây là các nguyên nhân phổ biến gây ra lỗi này: 
    * Security group không cho phép kết nối. Đối với trường hợp này, bạn hãy xem lại port 22 trong security group của EC2 Instance có cho phép kết nối từ Public IP Address của bạn hay chưa.
    * Tường lửa (firewall) đã được bật trên EC2 Instance. Đối với trường hợp này, bạn nên đảm bảo rằng sẽ không có tường lửa ngăn chặn kết nối giữa Instance và máy cục bộ.
    * Hostname hay IP address của server không tồn tại. Đối với trường hợp này, bạn nên kiểm tra lại hostname hay IP address đã trùng khớp hay chưa.