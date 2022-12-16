# Giới thiệu
Bạn muốn làm 1 app mà các dữ liệu của app cần được lữu trữ online, tuy nhiên bạn lại không biết code server để lưu trữ dữ liệu đó. Có 1 giải pháp rất hữu dụng trong trường hợp này "Parse server". Parse server là 1 service cung cấp cho bạn các api để lưu trữ data mà bạn không cần phải code 1 dòng backend nào. Trong bài viết này mình sẽ trình bày cách đăng ký 1 server miễn phí trong vòng 12 tháng trên aws để lưu trữ dữ liệu, và cách để swift giao tiếp với server đó.
# Bắt đầu nào
## 1. Tạo server free trên AWS
Trước tiên chúng ta sẽ đăng ký 1 server miễn phí trong vòng 12 tháng trên aws. Việc đầu tiên là bạn cần tạo 1 tải khoản amazone, việc này hoàn toàn miễn phí và dễ dàng. sau đó vào aws theo đường link: https://aws.amazon.com/vi/

Ấn vào nút bảng điều khiển để vào màn hình console. 
![](https://images.viblo.asia/3b62698e-69f1-4a10-9369-23e7a0b3d0b2.png)

Trong màn hình này bạn cần chọn EC2 và click vào "Launch Instance" để bắt đầu sử dụng Amazone EC2:
![](https://images.viblo.asia/0b8947cf-7f13-4f5f-a509-3e0aedb64385.png)
Ở màn hình tiếp theo bạn chọn "Parse Server Certified by Bitnami" đây là 1 parse platform khá mạnh và free 12 tháng cho người mới bắt đầu.
![](https://images.viblo.asia/7978b556-de24-4b6e-8ab2-fba9afbbbc79.png)

Chọn next để đến màn hình "Choose an Instance Type". Ở đây bạn nên chọn gói t2.micro đây là gói free 12 tháng. Sau đó click "Review and launch" để đến bước tạo key pair. Đây là bước quan trọng. Vì ko có key pair bạn ko thể kết nối code client đến server bạn vừa tạo ra được.
![](https://images.viblo.asia/10ac1fee-ae01-42db-8e1a-04e42b98f1de.png)
Cuối cùng click "Launch" để start server của bạn.
## 2. Kết nối parse server trong swift
Tạo project mới dùng cocoapod để tải parse framework về project: "pod Parse".
Config parseServer trong AppDelegate.swift 
![](https://images.viblo.asia/6444f837-dde5-450a-88ba-8724056f73ec.png)
Trong đó $0.server chính là đường link tới server chúng ta vừa tạo ra:
![](https://images.viblo.asia/611f05d0-b238-4ccf-9a63-9cc6c509ad5e.png)
Để lấy được App_id và clientKey chúng ta quay lại trang server click vào "Launch Instance" và làm theo hướng dẫn:
![](https://images.viblo.asia/84995521-c2cc-4df0-8eda-8513b3ddcba1.png)
![](https://images.viblo.asia/287cff86-d4d6-4617-b273-f9bd45cfb980.png)
Sau khi đã config xong chúng ta bắt đầu test thử. Vào ControllerView.swift và sửa lại code như sau:
![](https://images.viblo.asia/e440b56e-513d-454b-8f5e-f09c8233b619.png)
Bây giờ chúng ta vào trang parse dashboard để xem kết quả: 
![](https://images.viblo.asia/e91e1bc1-d6cd-4ef6-92cc-9ddef33e479a.png)
GameScore đã được tạo ra. Good job!
# Tổng kết
Parse server không chỉ kết hợp được với swift mà còn tương thích với rất nhiều ngôn ngữ khác nhau như android, php, node.js, c#... Nên đây sẽ là 1 dịch vụ mang đến nhiều hữu ích cho các lập trình viên, khi mà việc code backend lưu trữ dữ liệu trở nên vô cùng đơn giản. Hy vọng bài viết của mình mang lại nhiều điều bổ ích cho các bạn. Cám ơn đã chú ý theo dõi. Hẹn gặp lại trong những bài viết lần sau.