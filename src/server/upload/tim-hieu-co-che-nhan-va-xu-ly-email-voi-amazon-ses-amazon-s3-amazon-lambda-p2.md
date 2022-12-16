Tiếp nối của nội dung tìm hiểu về cơ chế nhận và xử lý mail với amazon SES, S3, Lambda, hôm nay chúng ta sẽ tiếp tục tìm hiểu về Amazon S3 và Amazon Lambda. 
## Amazon S3
Amazon Simple Storage Service (Amazon S3) là một dịch vụ lưu trữ đối tượng cung cấp khả năng thay đổi theo quy mô, tính khả dụng của dữ liệu, bảo mật và hiệu năng hàng đầu trong lĩnh vực. Điều này có nghĩa là khách hàng thuộc mọi quy mô và lĩnh vực có thể sử dụng dịch vụ này để lưu trữ và bảo vệ bất kỳ lượng dữ liệu nào cho nhiều trường hợp sử dụng khác nhau, chẳng hạn như trang web, ứng dụng di động, sao lưu và khôi phục, lưu trữ, ứng dụng doanh nghiệp, thiết bị IoT và phân tích dữ liệu hớn. Amazon S3 cung cấp các tính năng quản lý dễ sử dụng, nhờ đó, bạn có thể tổ chức dữ liệu và cấu hình các kiểm soát truy cập được tinh chỉnh để đáp ứng yêu cầu cụ thể của doanh nghiệp, tổ chức và yêu cầu về tuân thủ. Amazon S3 được thiết kế để đảm bảo độ bền 99,999999999% (11 9's) và lưu trữ dữ liệu của hàng triệu ứng dụng cho các công ty trên toàn thế giới.

## Amazon Lambda
AWS Lambda là một dịch vụ tính toán cho phép bạn chạy mã mà không cần cung cấp hoặc quản lý máy chủ. AWS Lambda chỉ thực thi mã của bạn khi cần và tự động chia tỷ lệ, từ một vài yêu cầu mỗi ngày đến hàng nghìn mỗi giây. Bạn chỉ trả tiền cho thời gian tính toán mà bạn tiêu thụ - không mất phí khi mã của bạn không chạy. Với AWS Lambda, bạn có thể chạy mã cho hầu hết mọi loại ứng dụng hoặc dịch vụ phụ trợ - tất cả đều có quản trị bằng không. AWS Lambda chạy mã của bạn trên cơ sở hạ tầng tính toán có tính sẵn sàng cao và thực hiện tất cả việc quản trị tài nguyên tính toán, bao gồm bảo trì máy chủ và hệ điều hành, cung cấp năng lực và tự động mở rộng, giám sát mã và ghi nhật ký. Tất cả những gì bạn cần làm là cung cấp mã của bạn bằng một trong những ngôn ngữ mà AWS Lambda hỗ trợ. Bạn có thể sử dụng AWS Lambda để chạy mã của mình để phản ứng với các sự kiện, chẳng hạn như thay đổi dữ liệu trong nhóm Amazon S3 hoặc bảng Amazon DynamoDB; để chạy mã của bạn để đáp ứng các yêu cầu HTTP bằng Amazon API Gateway; hoặc gọi mã của bạn bằng các lệnh gọi API được thực hiện bằng AWS SDK. Với các khả năng này, bạn có thể sử dụng Lambda để dễ dàng xây dựng các trình kích hoạt xử lý dữ liệu cho các dịch vụ AWS như Amazon S3 và Amazon DynamoDB, xử lý dữ liệu phát trực tuyến được lưu trữ trong Kinesis hoặc tạo phần cuối của riêng bạn hoạt động ở quy mô AWS, hiệu suất và bảo mật. Bạn cũng có thể xây dựng các ứng dụng không có máy chủ bao gồm các chức năng được kích hoạt bởi các sự kiện và tự động triển khai chúng bằng CodePipeline và AWS CodeBuild. Để biết thêm thông tin, xem Ứng dụng AWS Lambda. Để biết thêm thông tin về môi trường thực thi AWS Lambda, xem AWS Lambda Runtimes.

## Cài đặt cấu hình cho Amazon Lambda và Amazon S3 xử lý mail
Ở phần trước, chúng ta đã cài đặt Amazon SES sau khi nhận mail thì sẽ lưu mail đó vào s3, vậy ở phần này tất nhiên đầu tiên chúng ta phải khởi tạo một bucket s3 cho SES lưu mail rồi :D. 
Để tạo một bucket của s3, bạn cần vào phần quản lý của s3 và chọn **Create bucket**: 

![](https://images.viblo.asia/84d2950d-9397-46ab-8755-b6c676b0a36c.png)

Chú ý: Tên bucket name chính là tên s3 mà chúng ta đã thiết lập ở trong Amazon SES.

Sau khi thiết lập thành công bên Amazon SES và khởi tạo Bucket S3, khi vào bucket s3 mới tạo, ta sẽ thấy  

![](https://images.viblo.asia/03403c8c-bdb4-45be-ae8e-1a03a319ba34.png)

Như vậy là chúng ta đã thiết lập thành công cho mail nhận sẽ được lưu vào s3. Tiếp theo là việc ta cần thiết lập Lambda để đọc mail từ s3. 
Bước đầu tiên để sử dụng **Lambda** là ta cần phải tạo một **Function**. **Function** có thể hiểu là 1 nơi ta lưu mã code ta xử lý và là nơi để lắng nghe và xử lý các sự kiện của Lambda: 

![](https://images.viblo.asia/72c406de-c513-48c6-81ad-3b03ea8afd00.png)

Sau khi tạo thành công một Function Lambda, chúng ta cần chú ý 2 phần quan trọng nhất. Đầu tiên là nơi để thiết lập các sự kiện cho các services khác có thể trigger Lambda Function được gọi là **Designer**

![](https://images.viblo.asia/bbed7d40-6d97-4762-8c2e-f38c0685c146.png)

Tại đây ta có thể dễ dàng thiết lập cho Function có thể được trigger từ sự kiện nào bằng việc click vào **Add Trigger**. Chúng ta đang cần lắng nghe từ s3 nên chắc chắn ta sẽ chọn s3 là điều kiện để trigger Lambda Function.

![](https://images.viblo.asia/e802e8aa-af1a-45bd-8eaa-659a11e6524d.png)

Chú ý: Chúng ta phải khởi tạo s3 và function Lamda cùng một region thì khi đó chúng mới có thể lắng nghe được nhau.
 
 Như vậy là ta đã hoàn thành bước thiết lập để mỗi khi s3 được nhận mail mới thì s3 sẽ gửi dữ liệu mail đó sang Function Lambda và việc tiếp theo là tạo luồng xử lý cho dữ liệu được gửi sang từ s3. Đây chính là phần quan trọng thứ hai của Lamda Function gọi là **Function Code**.
 
 ![](https://images.viblo.asia/be1142eb-32c1-42d8-a51a-f0f689daa5ac.png)

Ở đây chúng ta sẽ sử dụng những dòng mã của mình để xử lý code được gửi s3.

Như vậy chúng ta đã hoàn thành việc thiết lập xử lý nhận mail với Amazon SES, S3 và Lambda.

https://viblo.asia/p/tim-hieu-co-che-nhan-va-xu-ly-email-voi-amazon-ses-amazon-s3-amazon-lambda-p1-4dbZNpGL5YM