# Mở đầu

Trong bài viết trước [Sử dụng Prometheus, Blackbox Exporter, Alert Manager và Grafana để theo dõi trạng thái uptime website như updown.io](https://viblo.asia/p/su-dung-prometheus-blackbox-export-alert-manager-va-grafana-de-theo-doi-trang-thai-uptime-website-nhu-updownio-gGJ59r3DKX2), mình có chia sẻ cách mình theo dõi trạng thái uptime của website thông qua các công cụ **Prometheus, Blackbox Exporter, Alert Manager và Grafana**, thực tế chúng là những công cụ rất tốt, có nhiều ứng dụng trong việc monitor, các metrics từ các Exporter phong phú. Tuy nhiên, cách cấu hình và triển khai chúng hơi phức tạp, mỗi khi cần bổ sung các website thì ta lại cần chỉnh sử từng file cấu hình. Với người dùng chỉ quan tâm tới trạng thái Uptime, thời gian phản hồi của website, trạng thái SSL,... thì có vẻ bộ công cụ trên giống như mang dao mổ trâu để tỉa hoa vậy :D 

Chính vì thế, mình sẽ chia sẻ cách xây dựng công cụ theo dõi trạng thái Uptime đơn giản hơn, đó là sử dụng 1 OSS có tên là [Uptime Kuma](https://github.com/louislam/uptime-kuma)
![image.png](https://images.viblo.asia/bc5719a8-4cc9-44b5-abca-25741195fbee.png)

# Giới thiệu về Uptime Kuma

**Uptime Kuma** là một công cụ giám sát mã nguồn mở được viết bằng Nodejs. Nó là một công cụ giám sát độc lập với bảng điều khiển đẹp mắt và hỗ trợ một số phương pháp thông báo. **Uptime Kuma** giám sát thời gian hoạt động của các máy chủ hoặc máy chủ thông qua các giao thức HTTP, TCP và Ping. Nếu website không phản hồi qua các giao thức này trong khoảng thời gian, **Uptime Kuma** sẽ gửi tin nhắn qua *Webhooks, Telegram, Discord, Gotify, Slack, Pushover, Email (SMTP),...*

Các tính năng nổi bật của **Uptime Kuma** có thể kể tới:
- Giám sát hoạt động của website thông qua các giao thức HTTP(s) / TCP / HTTP(s) Keyword / Ping / DNS Record / Push / Steam Game Server.
Fancy, Reactive, Fast UI/UX,... rất phong phú lựa chọn cho mọi người
- Thông báo được đa kênh: Telegram, Discord, Gotify, Slack, Pushover, Email (SMTP),...
- Thời gian giãn cách giữa cách lần thăm dò tối thiểu 20s
- Giao diện website đa ngôn ngữ
- Có biểu đồ heartbeat rõ ràng cho từng Monitor

# Cài đặt

Để triển khai **Uptime Kuma**, mình sẽ sử dụng Heroku, một nền tảng đám mây cho phép các lập trình viên xây dựng, triển khai, quản lý và mở rộng ứng dụng **(PaaS – Platform as a service)**.

Nó rất linh hoạt và dễ sử dụng, cung cấp cho một con đường đơn giản nhất để đưa sản phẩm tiếp cận người dùng. Nó giúp các nhà phát triển tập trung vào phát triển sản phẩm mà không cần quan tâm đến việc vận hành máy chủ hay phần cứng…
## Bước 1: Clone Uptime Kuma về tài khoản Github

Đầu tiên, bạn truy cập vào Github Repository của **Uptime Kuma** ở https://github.com/louislam/uptime-kuma và thực hiện fork repository đó về tài khoản Github của mình
![image.png](https://images.viblo.asia/1253d6cf-4edb-43e8-a0e3-1edc3a0b60a5.png)

## Bước 2: Triển khai lên Heroku

- Bước 2.1: Bạn cần đăng ký 1 tài khoản **Heroku** ở https://signup.heroku.com/login sau đó đăng nhập vào Heroku

![image.png](https://images.viblo.asia/5c83bec4-f74a-4098-b0c5-b4f078aa61d0.png)

- Bước 2.2: Từ giao diện https://dashboard.heroku.com/apps , bạn chọn `New` > `Create new app`

![image.png](https://images.viblo.asia/b52ea7be-367b-4036-85c3-48230087945e.png)

- Bước 2.3: Điền tên App và chọn khu vực cho máy chủ. Tên app bắt buộc không được trùng với bất kỳ app nào trên **Heroku**, bạn nên chọn 1 cái tên dễ nhớ. Sau đó chọn `Create App`
![image.png](https://images.viblo.asia/382587ad-4eb2-488d-9786-0b92e75dc21d.png)

- Bước 2.4: Sau đó ở giao diện `Deploy`, các bạn chọn Deploy method là `Github` và thực hiện `Connect to Github`, sau bước này tài khoản Heroku sẽ có thể truy cập vào Github và lấy source code từ repository mà chúng ta vừa fork ở trên

![image.png](https://images.viblo.asia/00c69db6-bc3d-4f0d-8f2a-c25787c8c862.png)

- Bước 2.5: Sau khi connect thành công với *Github Repository* , bạn cuộn tới `Manual deploy`, `Choose a branch to deploy` , bấm `Deploy Branch` và chờ kết quả thôi

![image.png](https://images.viblo.asia/4376a077-7098-4fa3-a609-07ddb12e4b9c.png)

Sau khi Heroku deploy thành công, chúng ta bấm `View` để xem website monitor đã được triển khai thành công. [Demo](https://uptime-kuma-2.herokuapp.com/dashboard)

# Sử dụng Uptime Kuma

Lần đầu tiên truy cập vào ứng dụng chúng ta cần cấu hình tài khoản quản trị, bạn có thể tuỳ chọn ngôn ngữ Tiếng Việt, Tiếng Anh,...
![image.png](https://images.viblo.asia/094c7cd9-8c4f-46cb-850a-227ac844f25b.png)

Giao diện đầu tiên sẽ trông như này 
![image.png](https://images.viblo.asia/9f80b262-49ff-49b5-864e-08646643db84.png)

Để cấu hình cho việc theo dõi Uptime của từng website, ta chọn vào `Add New Monitor` rồi điền các tham số của website:
![image.png](https://images.viblo.asia/281d1724-c7c3-424a-a87b-04e68feea2a7.png)

Trong đó:
- **Monitor Type** : Là giao thức mà Uptime Kuma sẽ thăm dò tới website
- **Friendly Name**: Tên của monitor
- **URL**: Là đường dẫn tới website
- **Heartbeat Interal**: Khoảng thời gian giãn cách giữa các lần thăm dò, tối thiểu 20s
- **Accepted Status Codes**: Là status code mà bạn chấp nhận là website đang ở trạng thái Uptime

Ngoài ra để cấu hình nhận cảnh báo khi website bị downtime bạn chọn vào `Setup Notification`, 1 dialog sẽ hiển thị ra để bạn điền các thông tin cho cảnh báo:
![image.png](https://images.viblo.asia/a47f46d3-9e94-4339-a24e-67449c1466a0.png)

Cấu hình Notification:
- **Notifcation type**: Kênh thông báo, ví dụ mình chọn là Slack
- **Webhook URL** : Là webhook URL của Slack, bạn có thể cài đặt App Incoming Webhook (https://suncibot.slack.com/apps/A0F7XDUAZ-incoming-webhooks?tab=more_info) trên Slack Workspace và lấy nó 
- **Channel name**: Channel sẽ nhận cảnh báo

Bạn chọn `Test` để xác minh cấu hình notification chính xác, trên channel sẽ nhận được 1 message như này ![image.png](https://images.viblo.asia/5f96a112-427b-499e-82f3-be95bf03594b.png)

Khi website có downtime, **Uptime Kuma** sẽ gửi cảnh báo tới channel 
![image.png](https://images.viblo.asia/2b063764-13f7-415a-a6bc-5fc885d9bef1.png)

Giao diện dashboard của **Uptime Kuma** khá là rõ ràng và đầy đủ những thông tin cần thiết, đơn giản nó nhắm tới những thông tin mà user quan tâm như trạng thái Uptime, thời gian phản hồi, trạng thái của SSL.
![image.png](https://images.viblo.asia/6d19e772-7758-43d2-b7af-e1ff386c3425.png)

Ngoài ra **Uptime Kuma** còn hỗ trợ bạn publish các status page ví dụ https://uptime-kuma-2.herokuapp.com/status/viblo , chúng ta dễ dàng chia sẻ trạng thái Uptime của các website tới cho các thành viên khác trong team.
![image.png](https://images.viblo.asia/e6e023dc-1231-4ff4-a027-43355330e1f2.png)

# Tài liệu tham khảo
- https://github.com/louislam/uptime-kuma
- https://heroku.com/
- Demo: https://uptime-kuma-2.herokuapp.com (user: `admin` , password: `canmoP-xawte7-mopfim`)