SQS (Simple Queue Service) vs SNS (Simple Notification Service) in AWS
![](https://images.viblo.asia/65caa02d-3077-4b80-a30a-ca7242e7062f.png)
# 1. SNS (Dịch vụ Thông báo Đơn giản)
![](https://images.viblo.asia/a0794b0e-88aa-4712-801e-e2bd9122fa6d.png)
Amazon SNS là một dịch vụ thông báo nhanh, linh hoạt, được quản lý đầy đủ cho phép bạn gửi từng tin nhắn riêng lẻ hoặc gửi tin nhắn hàng loạt tới số lượng lớn người nhận. Amazon SNS giúp việc gửi thông báo đẩy đến người dùng thiết bị di động, người nhận email hoặc thậm chí gửi tin nhắn đến các dịch vụ phân tán khác trở nên đơn giản và tiết kiệm chi phí.

Một hệ thống đăng ký xuất bản phân tán. Tin nhắn được đẩy đến người đăng ký khi và khi chúng được nhà xuất bản gửi đến SNS, SNS hỗ trợ một số điểm cuối như email, sms, http endpoint và SQS. Nếu bạn muốn số lượng và loại người đăng ký không xác định nhận được tin nhắn, bạn cần SNS.

Với Amazon SNS, bạn có thể gửi đẩy thông báo đến các thiết bị Apple, Goole, FIreOS, và Window, cũng như các thiết bị Android ở Trung Quốc với Baidu Cloud Push. Bạn có thể sử dụng SNS để gửi tin nhắn SMS cho người dùng thiết bị di động ở Mỹ hoặc cho người nhận email trên toàn thế giới.

SNS à một hệ thốg theo dõi công khai (publish-subscribe). Những tin nhắn được đẩy đến người đăng ký khi và khi họ được nhà xuất bản gửi đến SNS.
# 2. SQS ( Dịch vụ hàng đợi)
![](https://images.viblo.asia/5b20b24b-7271-4127-837c-8cdda1ed7a99.jpeg)
SQS là hệ thống sắp xếp phân tán. Tin nhắn không được đẩy đến người nhận. Người nhận phải thăm dò SQS để nhận tin nhắn. Nhiều người nhận không thể nhận tin nhắn cùng một lúc. Bất kỳ người nhận nào cũng có thể nhận được tin nhắn, xử lý và xóa nó. Những người nhận khác không nhận được tin nhắn tương tự sau đó. Thăm dò ý kiến vốn đã gây ra một số độ trễ trong việc gửi tin nhắn trong SQS không giống như SNS, nơi tin nhắn được đẩy ngay lập tức đến người đăng ký.

SQS chủ yếu được sử dụng để tách các ứng dụng hoặc tích hợp các ứng dụng. Tin nhắn có thể được lưu trữ trong SQS trong thời gian ngắn (tối đa 14 ngày). SNS phân phối một số bản sao của tin nhắn cho một số người đăng ký. Ví dụ: giả sử bạn muốn sao chép dữ liệu được tạo bởi một ứng dụng sang một số hệ thống lưu trữ. Bạn có thể sử dụng SNS và gửi dữ liệu này đến nhiều người đăng ký, mỗi người sao chép thông điệp mà nó nhận được đến các hệ thống lưu trữ khác nhau (s3, đĩa cứng trên máy chủ lưu trữ, cơ sở dữ liệu của bạn, v.v.).

SNS hỗ trợ một số endpoint như email, sms, http end point và SQS. Nếu bạn muốn số lượng và loại người đăng ký không xác định nhận được tin nhắn, bạn cần SNS.
# 3. Sự khác biệt
Phân loại:
* SQS : Hàng đợi (Tương tự như JMS)
* SNS : Chủ đề (Hệ thống Pub / Sub)

Cơ chế:
* SQS : Cơ chế kéo - consumer thăm dò ý kiến và lấy tin nhắn từ SQS
* SNS : Cơ chế đẩy - SNS Đẩy tin nhắn đến consumer

Cách sử dụng
* SQS : Tách hai ứng dụng và cho phép xử lý không đồng bộ song song
* SNS : Fanout - Có nghĩa là cho phép xử lý cùng một thông báo theo nhiều cách

Bền bỉ
* SQS: Tin nhắn vẫn tồn tại trong một số khoảng thời gian (có thể định cấu hình) không có sẵn cho consumer 
* SNS: Không bền bỉ. Bất kỳ consumerg nào có mặt tại thời điểm nhận được tin nhắn, nhận được tin nhắn và tin nhắn sẽ bị xóa. Nếu không có consumer nào thì thông báo sẽ bị mất.

Trong SQS, việc gửi tin nhắn được đảm bảo nhưng trong SNS thì không.

Loại consumer :
* SQS: Tất cả những người tiêu dùng phải giống hệt nhau và do đó xử lý các tin nhắn theo cách chính xác 
* SNS: Tất cả những consumer xử lý các thông điệp theo những cách khác nhau

Ứng dụng
* SQS: frameworks job. Nơi mà job được gửi đến SQS và người tiêu dùng ở đầu bên kia có thể xử lý công việc không đồng bộ. Và nếu tần suất công việc tăng lên thì có thể tăng số lượng consumer để xử lý song song 
* SNS: Xử lý ảnh. Nếu ai đó tải hình ảnh lên S3 thì hãy đánh dấu hình ảnh đó, tạo hình thu nhỏ và gửi email Cảm ơn. Trong trường hợp đó, S3 có thể gửi thông báo đến Chủ đề SNS và 3 consumer có thể được gắn vào chủ đề SNS. Thứ nhất làm mờ hình ảnh, thứ hai tạo hình thu nhỏ và thứ ba gửi email Cảm ơn. Tất cả chúng đều nhận được cùng một thông báo (URL hình ảnh) và thực hiện xử lý tương ứng song song.

Nguồn : https://medium.com/awesome-cloud/aws-difference-between-sqs-and-sns-61a397bf76c5