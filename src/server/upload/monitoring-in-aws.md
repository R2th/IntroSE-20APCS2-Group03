## Mở đầu
Hệ thống giám sát (monitoring) là một phần không thể thiếu khi triển khai các ứng dụng, nhằm thu thập, theo dõi, phân tích các số liệu liên quan đến trạng thái hoạt động, hiệu suất của các tài nguyên, đồng thời đưa ra những cảnh báo kịp thời khi hệ thống gặp sự cố hoặc bị tấn công. Hệ thống giám sát cần phải có số liệu, biểu đồ trực quan, hệ thống cảnh báo.

## Giới thiệu CloudWatch
CloundWatch là một dịch vụ giám sát nhằm theo dõi, thu thập số liệu không chỉ của các tài nguyên trong aws mà còn cả ứng dụng của bạn trong thời gian thực. Bên cạnh đó chúng ta cũng có thể giám sát và thu thập log files, theo dõi hiệu suất, mức độ sử dụng, tình trạng sức khoẻ.
CloudWatch không phân chia khu vực nên chúng ta có thể theo dõi tình trạng các instances ở area khác nhau trên cùng một bảng điều khiển.
Với tính năng cơ bản, dữ liệu được cung cấp trong khoảng thời gian 5 phút, tuy nhiên với bản trả phí, bạn có thể chọn theo dõi chi tiết theo từng  phút. 

CloundWatch lưu trữ dữ liêu trong khoảng 15 tháng, vì vậy ngay cả khi terminate instance, chúng ta vẫn có thể truy xuất tài nguyên này

**CloundWatch Architechture**

![](https://images.viblo.asia/e49ef2ba-54fe-4319-8b8d-914b7d613304.png)

Sau đây chúng ta cùng điểm qua một số tính năng phổ biến cũng như lợi ích mà chúng đem lại
* **Monitor EC2**: Giúp theo dõi tình trạng sức khoẻ cũng như hiệu suất của tất cả các EC2 instances mà không cần cài đặt thêm phần mềm bổ sung nào khác. Các số liệu này bao gồm: % CPU, Network, storage v.v. Nó cũng cho phép chúng ta cài đặt một số tuỳ chỉnh và theo dõi thông tin về nó trên bảng điều khiển trung tâm.
* **Giám sát tài nguyên khác**: Bên cạnh đó chúng ta cũng có thể theo dõi các dịch vụ khác như S3, RDS, 
* **Theo dõi và lưu trữ Logs**: Việc lưu trữ logs vô cùng cần thiết, nó cho phép chúng ta thu thập thông tin để phân tích và sử lí sự cố.
* **Set Alarms**: Chúng ta có thể đặt cảnh báo cho các số liệu mình cần theo dõi bất cứ khi nào chúng vượt quá ngưỡng, ví dụ như đặt cảnh báo khi mức sử dụng CPU của RDS vượt quá 50% trong khoảng thời gian 10 phút, hay đặt cảnh báo trong trường hợp các khoản phí thanh toán ước tính vượt ngưỡng con số chúng ta dự trù.
![](https://images.viblo.asia/a306a620-0faa-4498-9756-9762287b200d.png)
AWS CloudWatch create Alarms

-----
* **Dashboard** : Cho phép tạo bảng điều khiển với biểu đồ và số liệu thống kê cho tất cả tài nguyên AWS, trên bảng điều khiển này chúng ta cũng có thể thiết lập nhiều dạng biểu đồ như lines, stacks, numbers: biểu đồ theo dõi redis server, sidekiq worker, app server CPU, app server network ...
![](https://images.viblo.asia/729a0c2f-45e5-4eba-8a28-a42f280a0202.png)

* **Phản ứng khi tài nguyên thay đổi**: CloudWatch có thể phát hiện và phản hồi gần như realtime khi có sự thay đổi tài nguyên, chúng ta có thể tích hợp các event này với lamda hoăc SNS để tự động gửi phản hồi. 

## Các thành phần của CloudWatch 
**1. Metrics**: 
Đây là số liệu mà bạn thu thập định kỳ trong một khoảng thời gian, dùng để đánh tình trạng tài nguyên đang sử dụng. Các số liệu này không thể xóa manually và nó sẽ hết hạn sau 15 tháng. Đơn vị đo lường có thể là byte, giây hay phần trăm. Khoảng thời gian lấy số liệu có thể là 1s, 5s, hoặc bội số của 60(s). 
![](https://images.viblo.asia/2067fe8e-e8e2-4311-979e-e02e22712008.png)
**2. Events**: AWS Events cũng là một thành phần hữu ích khác của CloudWatch, cung cấp luồng trạng thái liên tục bất cứ khi nào tài nguyên có thay đổi, nó bổ sung cho metrics, đem lại bức tranh toàn diện về trạng thái chung của hệ thống. Vòng đời của events được mô tả bên hình dưới đây 
![](https://images.viblo.asia/25c8019c-3985-4f2a-b5e5-38bfd7b994a4.png)
Các services như EC2, auto scaling, CloudTrail tự động gửi events đến cloudwatch. Bên cạnh đó chúng ta cũng có thể tạo các events tuỳ chỉnh cho ứng dụng của mình bằng cách sử dụng api PutEvents

**3. Alarms** : Chúng ta có thể tạo cảnh báo cho bất kỳ tài nguyên nào cần giám sát như EC2, S3, EBS, RDS, billing. Mỗi một cảnh báo sẽ thực hiện một hoặc nhiều actions phụ thuộc vào số liệu vượt ngưỡng một hay nhiều lần trong một khoảng thời gian. Những actions này có thể là EC2 actions, auto scalling, hoặc notification cho SNS topic. Chúng ta có thể tạo cảnh báo cho các chức năng khác nhau như: bắt đầu, dừng, xoá hay khôi phục phiên bản EC2 , tuy nhiên tối đa chỉ có thê tạo 5000 cảnh báo.
![](https://images.viblo.asia/036763d9-96da-4891-8049-8d1ee8fc9933.png)
## Kết luận
Hệ thống giám sát của AWS cung cấp cho chúng ta đầy đủ các dịch vụ cũng như các tính năng, giải pháp đáp ứng tất cả các yêu cầu giám sát thủ công hay tự động, dùng cho khối lượng công việc từ đơn giản đến phức tạp, tập trung hay phân tán, và nó được tích hợp sẵn trong các dịch vụ AWS, điều này có nghĩa là bạn không phải trả thêm khoản chi phí phát sinh khi sử dụng hệ thống giám sát cho các dịch vụ aws mà mình  đang sử dụng. 
AWS cho phép giám sát tất cả các tài nguyên trên nền tảng cloud của họ bao gồm tài nguyên, dịch vụ, và ứng dụng trên đó.
Trong bài viết này, chúng ta đã tìm hiểu các tính năng và lợi ích trong các thành phần của CloundWatch như: Metrics, Dashboards, Events, Alams
### Tài liệu tham khảo
https://docs.aws.amazon.com/cloudwatch/index.html