# 1. API là gì 
   Với những người làm trong ngành công nghệ, chắc hẳn không còn xa lạ gì với cụm từ API. Với những bạn chập chững bước vào nghề cốt đơ :stuck_out_tongue_winking_eye:, hoặc bạn là manual QA, hay chỉ đơn giản bạn làm business và bạn đang hợp tác với công ty IT để cho ra ứng dựng trên cả smartphone, table và Web, bạn chắc chắn sẽ được nghe về API. Và tôi khẳng định sẽ có rất nhiều bạn khi nghe cụm từ này như một vật thể lạ rơi xuống vậy, rất mông lung :rofl:
   
   API viết tắt của Application Programming Interface (giao diện lập trình ứng dụng). Hiểu nôm na, API là giao diện giữa phần mềm với phần mềm. Sử dụng 'giao diện' này để các phần mềm giao tiếp với nhau, giúp đỡ và tận dụng thế mạnh của nhau cuối cùng đạt được mục đích đề ra. Những năm gần đây khi cuộc cách mạng về khoa học kỹ thuật bùng nổ, thì API cũng trở thành mắt xích quan trọng trong việc kết nối các ứng dụng trên các thiết bị khác nhau. Chính vì vậy, không có gì quá xa lạ khi hầu hết các công ty IT đều hướng tới mục đích phát triển đi đôi với kiểm thử API trong các sản phẩm.
#    2. Top 5 API Testing Tools 
Trong tất cả quy trình, luôn có bước kiểm thử để đảm bảo không có quá nhiều lỗi xảy ra khi đưa sản phẩm công nghệ tới người sử dụng. Vì thế, khi phát triển API thì đi kèm với đó chính là việc kiểm thử API. Đặc biệt là sự xuất hiện của hàng loạt các công cụ hỗ trợ kiểm thử. Tuy mới xuất hiện và phục vụ cho các mục đích khác nhau nhưng hy vọng top 5 công cụ trong bài viết này sẽ giúp bạn hoặc team của bạn sẽ có lựa chọn đúng đắn và nhanh nhất phù hợp với mục tiêu dành cho phát triển sản phẩm. 
![](https://images.viblo.asia/cbc30b17-fff0-4086-bc69-8fef1c8f021f.png)
Hình ảnh tổng quan về 5 công cụ 
## 2.1. Postman 
Thông thường tool này được sử dụng bởi Developers trong giai đoạn phát triển sản phẩm, cụ thể là ở bước unit test. Người sử dụng postman hoàn toàn kiểm tra chất lượng của sản phẩm thông qua các kết quả trả về mà không cần quan tâm tới giao diện của sản phẩm 
Hiện nay, Postman đã đa dạng phiên bản để phù hợp với hệ điều hành khác nhau: Mac OS, Windows. Nếu sử dụng hệ điều hành nhân Linux thì bạn cần tải từ Extensions của Chrome. Đặc điểm nổi bật nhất: 

* Dễ dàng sử dụng REST client (Easy-to-use REST client). Việc gọi các REST API của Google, Youtube, Facebook rất i zì :) 
* Giao diện đơn giản, dễ hiểu 
* Có thể chạy trên các hệ điều hành khác nhau: MAC OS, Windows, Linux and Chrome Apps 
* Không đòi hỏi phải học một ngôn ngữ mới 
* Cho phép gửi HTTP Request đầy đủ các method: GET, POST, PUT, DELETE
* Cho phép thay đổi header của request 
* Cho phép post dữ liệu theo các định dạng: text, json, key-value 
* Kết quả nhận về theo nhiều định dạng: text, hình ảnh, xml, json 

**Giá: Free - $21/user/month**

## 2.2. Jmeter 
Thông thường tool này được sử dụng bởi Tester để thực hiện test hiệu năng, đo độ tải sản phẩm trong giai đoạn giữa và gần release sản phẩm. Đặc điểm nổi bật:

* Hỗ trợ chạy lại kết quả kiểm thử 
* Tự động làm việc với các file CSV và cho phép người sử dụng tạo ra các biến để test API một cách nhanh chóng 
* Sử dụng để kiểm thử hiệu năng, độ tải trên cả nguồn tĩnh và nguồn động trên nhiều loại server khác nhau 
* Là mã nguồn mở được viết bằng java 
* Công cụ chạy trên nhiều hệ điều hành khác nhau 

**Giá: Free**

## 2.3. Katalon Studio 
Thông thường tool này được sử dụng bởi Tester, là một công cụ kiểm tra tự động hoá miễn phí, cung cấp một môi trường chung để tạo và thực thi chức năng UI, các dịch vụ API/WEB và Mobile. 

![](https://images.viblo.asia/c6eaa41f-b772-4b6d-ad42-181b9a7e8f75.jpg)
Đặc điểm nổi bật:
* Quick & easy set-up: Cài đặt đơn giản và nhanh gọn 
* Faster & Better results: Hàng trăm từ khoá được tích hợp để tạo các trường hợp kiểm thử 
* Flexible modes: Xây dựng bộ kiểm thử linh hoạt 
* Ease of use: Đơn giản, dễ hiểu ngay cả với những người đầu hoặc chưa có nhiều kinh nghiệm lập trình
* Multi-OS application : Hỗ trợ trên nhiều nền tảng: Windows, MAC OS
* No costs requried: Miễn phí 

**Giá: Free**
## 2.4. Tricentis Tosca 
Là nền tảng thử nghiệm liên tục cho Agile và DevOps. Đặc điểm nổi bật:
* Hỗ trợ nhiều giao thức: HTTPs JMS, AMQP, Rabbit MQ, TIBCO EMS, SOAP, REST, IBM MQ, NET TCP 
* Tích hợp vào chu trình Agile và DevOps
* Tối đa hoá việc sử dụng và bảo trì với tự động hoá thử nghiệm dựa trên mô hình 
* API có thể được sử dụng trên thiết bị di động, đa nền tảng
* Giảm thiểu thời gian kiểm thử hồi quy 

**Giá: Contact sales**

## 2.5. Apigee
Là một công cụ kiểm thử API trên đám mây, cho phép người dùng đo lường và kiểm tra hiệu suất API, hỗ trợ và xây dựng API bằng các trình soạn thoả khác như Swagger 
* Được viết bởi Javascript 
* Cho phép giảm sát thiết kế, triển khai và chia tỷ lệ API 
* Xác định các vấn đề về hiệu suất bằng cách theo dõi lưu lượng API, tỷ lệ và thời gian phản hồi 
* Dễ dàng tạo ra các proxy API từ đặc tả API mở và triển khai chúng trong đám mây 
* Mô hình triển khai đám mây, tại chỗ hoặc kết hợp trên một mã duy nhất 
* Được xây dựng với mục đích kinh doanh kỹ thuật số và các ứng dụng dựa trên thiết bị di động nhiều tài nguyên 

**Giá: Free trial - $2,500/month**

***Tài liệu tham khảo:***
https://www.toolsqa.com/blogs/top-api-testing-tools-review/