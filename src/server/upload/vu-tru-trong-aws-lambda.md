## 1. AWS Lambda là gì?
 
**AWS Lambda là một serverless**, là dịch vụ tính toán hướng sự kiện, nơi cho phép bạn chạy code mà không cần phải cung cấp/quản lý server. Để hiểu hơn về serverless bạn có thể xem bài [Vì mẹ anh bắt tìm hiểu serverless](https://viblo.asia/p/vi-me-anh-bat-tim-hieu-serverless-1VgZv247ZAw). AWS Lambda chạy code của bạn trên cơ sở hạ tầng máy tính có tính khả dụng cao và thực hiện tất cả các công đoạn quản lý các tài nguyên máy tính bao gồm bảo trì hệ thống, khả năng cung cấp dung lượng, tự mở rộng, monitoring và logging. Bạn chỉ cần tổ chức, hiện thực code và upload lên AWS Lambda. AWS Lambda sẽ tự động chạy code của bạn khi được trigger, và tự động scale khi cần thiết. Chi phí của AWS Lambda sẽ được trên thời gian tính toán mà bạn sử dụng -> Nếu bạn upload code lên AWS Lambda, nhưng không chạy nó thì sẽ không mất phí.

*Note: Trong bài viết này mình sẽ gọi AWS Lambda là lambda(do thói quen), vậy nên bạn đừng nhầm lẫn lambda mà mình nhắc đến là lambda của python hay các loại lambda khác nhé.*
## 2. Các thành phần và cách hoạt động của lambda?
 
**Các thành phần chính của lambda:**
- Lambda function: chính là code của bạn được upload lên lambda. Trong code cần có một entry point. Khi lambda được trigger sẽ gọi vào entry point đó. Bạn có thể đặt entry point là hàm bất kì chỉ cần khai báo trong handler của lambda là được. Entry point là điểm vào đầu tiên khi thực thi, ví dụ như ngôn ngữ C, C++ hàm `main` sẽ luôn thực thi đầu tiên.
- Trigger: là các sự kiện kích hoạt lambda thực thi.
- Event: event là document dạng JSON chứa data để lambda function xử lý. Event có nhiều format khác nhau tùy theo kiểu trigger
- Execution Environment: Cung cấp môi trường độc lập, bảo mật cho lambda function thực thi.
- Runtime: cung cấp môi trường cho ngôn ngữ cục thể chạy trong execution environment
 
**Cách hoạt động:**

Lambda cung cấp mô hình phần mềm chung cho tất cả ngôn ngữ mà lambda hỗ trợ. Trong đó, chúng ta cần phải định nghĩa entry point cho function của mình bằng cách cấu hình handler. Khi có request kích hoạt lambda, lambda sẽ khởi tạo một instance để xử lí request đó. Runtime sẽ truyền object(bao gồm event và context) vào instance của handler. Khi handler hoàn thành xử lý event thứ nhất, runtime sẽ truyền tiếp event thứ hai vào. Instance vẫn được giữ trên memory, vì vậy biến ngoài handler(biến lưu giá trị trong giai đoạn runtime) vẫn có thể sử dụng lại. Ví dụ, chúng ta có một biến requestCount để đếm số request, mặc định ban đầu là 0. Mỗi khi có request mới thì biến này được cộng thêm 1. Sau khi request thứ nhất tới, biến requestCount sẽ có giá trị là 1 và lưu vào memory. Khi có request thứ hai đến, biến requestCount vẫn nằm trên memory có giá trị là 1. Lúc đó requestCount = 1 + 1 là 2 và lưu lại vào memory. Tuy nhiên, sau một khoảng thời gian instance không được sử dụng, memory của instance sẽ giải phóng. Lúc đó, nếu có request mới tới, biến requestCount lại quay lại giá trị khởi tạo là 0. Mỗi instance có thể xử lí hàng nghìn request. Runtime cũng log lại toàn bộ output từ lambda function và gửi vào cloudwatch logs.
 
Chúng ta có thể trigger/kích hoạt lambda hoạt động từ hơn 200 dịch vụ của AWS và các phần mềm dưới dạng dịch vụ(Service as a Service). Các luồng trigger tiêu biểu:
 
- Xử lí tệp
  Sử dụng S3 để trigger lambda, khi ảnh/file được lưu trữ lên s3, s3 sẽ trigger lambda để thực thi code.
 
  ![Image](https://d1.awsstatic.com/product-marketing/Lambda/Diagrams/product-page-diagram_Lambda-RealTimeFileProcessing.a59577de4b6471674a540b878b0b684e0249a18c.png)
 
- Xử lý luồng dữ liệu:
  Amazon Kinesis theo dõi hoạt động của ứng dụng, xử lý lệnh giao dịch, phân tích luồng nhấp chuột, chọn lọc dữ liệu. Khi có dữ liệu mới vào Amazon Kinesis, nó sẽ trigger lambda để generate hashtag, gán nhãn dữ liệu, hoặc xử lí tác vụ nào đó tùy theo business.
 
  ![Image](https://d1.awsstatic.com/product-marketing/Lambda/Diagrams/product-page-diagram_Lambda-RealTimeStreamProcessing.d79d55b5f3a5d6b58142a6c0fc8a29eadc81c02b.png)
 
- Ứng dụng web:
   Mobile/Web ở phía client sẽ gửi request lên API Gateway. API Gateway validate request body, sẽ để điều hướng, trigger lambda, format response và trả về kết quả cho client.
  ![Image](https://d1.awsstatic.com/product-marketing/Lambda/Diagrams/product-page-diagram_Lambda-WebApplications%202.c7f8cf38e12cb1daae9965ca048e10d676094dc1.png)
  ![Image](https://d1.awsstatic.com/product-marketing/Lambda/Diagrams/product-page-diagram_Lambda-MobileBackends_option2.00f6421e67e8d6bdbc59f3a2db6fa7d7f8508073.png)
 
 
## 3. Tính năng của lambda
- **Concurrency and scaling controls:** Lần đầu tiên bạn gọi lambda bằng event, lambda sẽ tạo ra một instance để thực hiện function của nó và trả về kết quả, sau đó instance vẫn tiếp tục duy trì một thời gian để đợi event theo. Nếu như bạn gọi lambda function trong khi nó đang xử lý event thứ nhất thì lambda sẽ khởi tạo instance thứ 2 để xử lý event của bạn. Lúc đó sẽ có hai instance chạy đồng thời - concurrency. Khi số lượng request tăng lambda sẽ tạo ra các instance để xử lý tương ứng, khi lượng request giảm xuống, các instance không dùng nữa sẽ được giải phóng. Với trường hợp khi lượng request tăng đột biến, lambda sẽ khởi chạy 500 instance mỗi phút cho đến khi số instance đáp ứng đủ số lượng request hoặc số instance chạm ngưỡng cho phép. Số instance giới hạn sẽ tùy thuộc vào từng khu vực, tuy nhiên con số này giao động từ 500 -> 3000(Con số này có thể tăng thêm nếu chúng ta contact vs AWS). Việc scale up sẽ có hai giai đoạn, giai đoạn chưa chạm ngưỡng burst limit thì số instance sẽ tăng theo số mũ, sau khi chạm ngưỡng burst limit, số instance sẽ tăng theo tuyến tính. ![image](https://docs.aws.amazon.com/lambda/latest/dg/images/features-scaling.png)
Tuy nhiên request lần đầu tiên tới mỗi instance, instance cần thời gian để load code -> sẽ có độ trễ nhất định ở những request đầu tiên. Vậy nên, để hạn chế điều đó, chúng ta có thể cấu hình provisioned concurrency, lambda sẽ khởi tạo số lượng instance để sẳn đó để phục vụ cho bạn, tuy nhiên phải tốn thêm chi phí.
![image](https://docs.aws.amazon.com/lambda/latest/dg/images/features-scaling-provisioned.png)
Việc lambda scale up/scale down được thực hiện một cách tự động không cần sự can thiệp bởi người dùng. 

- **Function được định nghĩa giống container images:** Điều đó giúp cho chúng ta có thể promote lambda từ môi trường TEST sang STAGING/PROD một cách dễ dàng
- Code Signing: Mỗi khi bạn upload code lên lambda(bằng cách thủ công hay qua tool/IAC) thì lambda sẽ ký lên code bạn đã upload. Bạn có thể lưu trữ, kiểm tra chữ ký đó để biết code có bị ai đó tác động/thay đổi trong lúc chạy không
- **Lambda extensions:** Lambda cung cấp các extensions như extension của chrome vậy, tùy theo nhu cầu, mục đích mà bạn có thể sử dụng nó.
- **Function blueprints:** Lambda có những bản code mẫu, format mẫu và các config liên quan về các trigger lambda, handle third-party
- **File systems access:** Lambda cung cấp cơ chế truy cập EFS
- **Database access:** Quản lý connection tới database, tính năng này khá quan trọng khi có nhiều instance chạy đồng thời.
## 4. Ưu, nhược điểm của lambda?
**Ưu điểm của Lambda:**
 
- Phát triển nhanh: Bạn chỉ cần code phần function sau đó upload lên lambda, còn những việc còn lại lambda sẽ tự xử lí
- Chi phí: với kiểu truyền thống, bạn phải trả chi phí duy trì server ngay cả khi không có bất kì request nào tới. Nhưng với lambda, bạn chỉ cần trả chi phí mà server bạn tiêu tốn.
- Không cần quan tâm tới hạ tầng, scaling. Lambda sẽ handle các công việc đó.
- Cải thiện khả năng phục hồi của server
 
**Nhược điểm của lambda:**
 
- Package bị giới hạn kích thước 50MB, để giải quyết nó, chúng ta có thể upload lên s3
- Không thể can thiệp sâu vào tiến trình, cấu hình server. Để can thiệp được vào tiến trình, tài nguyên khi chạy lambda, bạn phải sử dụng các dịch vụ khác của AWS như EC2.
- Tăng thời gian thiết kế ứng dụng để phù hợp với aws lambda. Về mindset, người ta sẽ tách monolithic thành nhiều service nhỏ trong microservice. Với lambda, bạn có thể phải chia nhỏ các service của microservice thành một hoặc nhiều lambda. Điều đó có thể làm bạn mất thời gian khi thiết kế, migrate hệ thống cũ sang lambda.
- Giới hạn service: Aws Lambda hiện tại giới hạn bạn chạy 1000 execution đồng thời(Con số này tùy thuộc vào region, và bạn có thể request AWS tăng con số này lên tùy theo nhu cầu, nhưng tất nhiên phải bỏ thêm chi phí).
- Giới hạn thời gian execution: lambda chỉ chạy tối đa 15 phút. Vậy nên với những tiến trình chạy nhiều hơn 15 phút. Bạn không nên dùng lambda, thay vào đó bạn có thể chia nhỏ tiến trình thành nhiều lambda hoặc sử dụng các dịch vụ khác như EC2 của AWS
- Cold start: Lambda cũng là serverless, vậy nên lambda cũng gặp vấn đề cold start của serverless mà mình đã phân tích ở bài [Vì mẹ anh bắt tìm hiểu serverless](https://viblo.asia/p/vi-me-anh-bat-tim-hieu-serverless-1VgZv247ZAw)

## 5. Tổng kết
Như vậy là chúng ta đã có cái nhìn tổng quan, về ưu nhược điểm của lambda. Ở bài tiếp theo mình sẽ mô tả thêm về cách mà AWS Lambda tương tác với các service khác trong AWS.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé