10 tip cho API testing cho người mới bắt đầu (SOAP & REST)

API (Application Programming Interface) testing là một loại software testing thực hiện test trực tiếp ở API. Đây là một phần của integration test để xác định xem các API có đáp ứng mong đợi của tester về chức năng, độ tin cậy, hiệu suất và bảo mật hay không. Không giống như UI testing, API testing được thực hiện mức dữ liệu trả về.

![](https://images.viblo.asia/a9adde39-b45c-44b5-aa83-c86f6f5aee05.png)

## 1. Tip cho API testing

Có hai loại web service cho API gồm SOAP và REST. SOAP (Simple Object Access Protocol) là một giao thức chuẩn được xác định bởi các tiêu chuẩn W3C để gửi và nhận các yêu cầu và phản hồi của web service. REST (REpresentational State Transfer) là kiến trúc dựa trên tiêu chuẩn web sử dụng HTTP. Không giống như các web service dựa trên SOAP, không có tiêu chuẩn chính thức cho RESTful Web API.

Dưới đây là 10 tip cơ bản mà bạn cần biết để test API:

### 1.1. Hiểu các yêu cầu API

Trước khi test API của bạn, bạn cần trả lời những câu hỏi này để hiểu kỹ các yêu cầu của API:

- Mục đích của API là gì?

Biết mục đích của API sẽ đặt nền tảng vững chắc để bạn chuẩn bị tốt dữ liệu test của mình cho đầu vào và đầu ra. Bước này cũng giúp bạn xác định test viewpoint. Ví dụ: đối với một số API, bạn test sẽ với dữ liệu từ database và đối với một số khác, tốt hơn là test toàn vẹn dữ liệu với các API khác.

- Quy trình làm việc của ứng dụng là gì? và API được dùng ở đâu trong luồng đó?

Nói chung, API của một ứng dụng được sử dụng để điều khiển dữ liệu của nó. Chúng được sử dụng để lấy, tạo và cập nhật dự liệu cho ứng dúng. Biết mục đích của API sẽ đặt nền tảng vững chắc để bạn chuẩn bị tốt dữ liệu test của mình cho đầu vào và đầu ra. Bước này cũng giúp bạn xác định phương pháp test.

Ví dụ: đầu ra của API "Create User" sẽ là đầu vào của API "Get User". Đầu ra của API "Get User" có thể sử dụng API "Update User",...

### 1.2. Những API response status thông dụng

Đầu ra của API phổ biến nhất bạn cần test trong test API là response status.

Test xem response status có bằng 200 hay không để quyết định xem test API có được pass hay fail đối với những tester API mới. Đây không phải là một test sai. Tuy nhiên, nó không phản ánh tất cả các kịch bản test của API.

Tất cả các response status của API được phân tách thành năm nhóm (hoặc danh mục) trong một tiêu chuẩn quốc tế. Chữ số đầu tiên của response code xác định nhóm response. Hai chữ số cuối đại diện cho 1 loại trong nhóm.

Có năm nhóm như sau:

- 1xx (Informational): Request được nhận và tiếp tục chờ xử lý
- 2xx (Successful): Resquest được nhận, hiểu và được xử lý
- 3xx (Redirect): Cần thực hiện thêm hành động để hoàn thành request
- 4xx (Client error): Request chứa cú pháp sai hoặc không thể thực hiện được
- 5xx (Server error): Server không thực hiện request hợp lệ

Tuy nhiên, response status thực tế của API được chỉ định bởi develop team đã xây dựng API. Vì vậy, là tester, bạn cần test xem:

- Response code theo các tiêu chuẩn quốc tế
- Response code được quy định theo yêu cầu.

### 1.3. Tập trung vào các API nhỏ

Trong một dự án test, luôn có một số API đơn giản chỉ với một hoặc hai đầu vào như API đăng nhập, API lấy token, API health check... Tuy nhiên, các API này là cần thiết và được coi là cánh cổng để xử dụng API. Tập trung vào các API này trước các API khác sẽ đảm bảo rằng các server, môi trường và xác thực API hoạt động đúng.

Bạn cũng nên tránh test nhiều hơn một API trong trường hợp test. Thật đau đầu nếu xảy ra lỗi thì bạn sẽ phải tìm lại luồng dữ liệu được tạo bởi API theo trình tự đã test. Giữ test case của bạn đơn giản nhất có thể. Có một số trường hợp bạn cần gọi một loạt API để đạt được luồng test từ đầu đến cuối. Tuy nhiên, các tác vụ này sẽ xuất hiện sau khi tất cả các API đã được test riêng lẻ.

### 1.4. Quản lý các API endpoint

Một dự án test có thể có một vài hoặc thậm chí hàng trăm API để test. Chúng tôi khuyên bạn nên sắp xếp chúng thành các mục để quản lý test tốt hơn. Cần phải làm thêm một bước nhưng sẽ giúp bạn tạo ra các test scenerio với độ bao phủ và tích hợp cao. Lấy API của JIRA, ví dụ:

![](https://images.viblo.asia/d7436371-f9e6-4af2-8e29-6f742170f8c2.png)
![](https://images.viblo.asia/810289d1-a6bd-4f29-a33a-c3230525582f.png)

Các API trong cùng loại chia sẻ một số thông tin như resource, đường dẫn... Việc tổ chức các test của bạn với cùng cấu trúc sẽ giúp test của bạn có thể sử dụng lại và có thể mở rộng với dòng tích hợp.

### 1.5. Tận dụng khả năng automation để test API

Tận dụng khả năng automation để test API của bạn càng nhiều và càng sớm càng tốt. Dưới đây là một số lợi ích đáng kể của việc automation các test API:

- Dữ liệu test và lịch sử thực hiện có thể được lưu cùng với các API endpoint. Điều này làm cho testcase dễ chạy lại hơn cho các test sau này.
- API testcase nên ổn định và thay đổi cẩn thận. Một API phản ánh một business của hệ thống. Mọi thay đổi trong API đều cần một yêu cầu rõ ràng; vì vậy tester luôn có thể chú ý mọi thay đổi và điều chỉnh chúng đúng hạn.
- Chạy test nhanh hơn nhiều so với UI testing web
- API testing được coi là test hộp đen trong đó người dùng gửi đầu vào và nhận đầu ra để test. Automation với cách tiếp cận dựa trên dữ liệu - tức là áp dụng các bộ dữ liệu khác nhau trong cùng một kịch bản test - có thể giúp tăng phạm vi API testing
- Nhập và xuất dữ liệu theo một số mẫu hoặc mô hình cụ thể để bạn chỉ có thể tạo tập lệnh test một lần. Các kịch bản test này cũng có thể được sử dụng lại trong toàn bộ dự án test.
- Các test API có thể được thực hiện ở giai đoạn đầu của vòng đời phát triển phần mềm. Cách tiếp cận automation với các kỹ thuật mock có thể giúp test API và tích hợp của nó trước khi API thực tế được phát triển. Do đó, mức độ phụ thuộc trong team bị giảm.

### 1.6. Chọn một công cụ automation phù hợp

Một bước nữa để tận dụng khả năng automation của test API là chọn công cụ phù hợp nhất. Dưới đây là một số tiêu chí mà bạn nên xem xét khi chọn công cụ test automation API:

- Công cụ có hỗ trợ import API/Web service từ WSDL, Swagger, WADL hay một số phương thức khác không? Đây là một tính năng tùy chọn. Tuy nhiên, sẽ tốn nhiều thời gian nếu bạn có hàng trăm API để test.
- Công cụ có hỗ trợ các phương pháp test dựa trên dữ liệu không? Đây cũng là một tính năng tùy chọn. Tuy nhiên, phạm vi test của bạn sẽ tăng đáng kể nếu công cụ có chức năng này.
- Cuối cùng nhưng không kém phần quan trọng, bên cạnh test API, bạn có cần thực hiện các loại test khác, chẳng hạn như WebUI hoặc nguồn dữ liệu không? API testing được thực hiện ở business giữa database và giao diện người dùng. Điều bình thường là tất cả các phần này phải được test. Một công cụ hỗ trợ tất cả các loại test sẽ là một lựa chọn lý tưởng để các đối tượng test.

[Tham khảo: 5 automation testing tool cho API](https://www.katalon.com/resources-center/blog/top-5-free-api-testing-tools/)

### 1.7. Chọn phương pháp test phù hợp

Trong khi response status cho biết trạng thái của request, response body là nội dung mà API trả về với đầu vào đã chỉ định. API response thay đổi từ loại dữ liệu đến kích thước. Các response có thể ở dạng văn bản, JSON, XML hoặc các kiểu khác. Chúng có thể là một chuỗi vài từ đơn giản (thậm chí trống) hoặc tệp JSON / XML hàng trăm trang. Do đó, điều cần thiết là chọn một phương thức test phù hợp cho một API nhất định.

Nói chung, có một số phương pháp cơ bản để test API response:

- **So sánh toàn bộ nội dung response với expected info**

Phương pháp này phù hợp cho một response có nội dung tĩnh. Thông tin động như thời gian ngày, tăng ID... sẽ gây sai cho testcase.

- **So sánh từng giá trị thuộc tính của response**

Đối với những response ở định dạng JSON hoặc XML, thật dễ dàng để có được giá trị của một khóa hoặc thuộc tính nhất định. Do đó, phương pháp này hữu ích khi test nội dung động hoặc giá trị riêng lẻ thay vì toàn bộ nội dung.

- **So sánh kết hợp với regex (biểu thức chính quy)**

Cùng với việc test các giá trị thuộc tính riêng lẻ, phương pháp này được sử dụng để test response dữ liệu với một mẫu cụ thể để xử lý dữ liệu động phức tạp.

Mỗi phương pháp test đều có ưu và nhược điểm và không có tùy chọn một kích cỡ phù hợp cho tất cả. Bạn cần chọn giải pháp phù hợp nhất với dự án test của bạn.

### 1.8. Tạo các case positive và negative

API testing yêu cầu cả test positivev và negative case để đảm bảo API hoạt động chính xác. Vì test API được coi là một loại test hộp đen, cả hai loại test đều được điều khiển bởi dữ liệu đầu vào và đầu ra. Có một vài gợi ý để tạo kịch bản test:

- Positive case
  - Test rằng API nhận đầu vào và trả về đầu ra như mong đợi theo requirement.
  - Test rằng response status được trả về như trong requirement, bất kể nó trả về mã 2xx hay mã lỗi.
  - Chỉ định đầu vào với các trường bắt buộc tối thiểu và với các trường tối đa.

- Negative case
  - Test rằng API trả về response theo mong đợi với dữ liệu không tồn tại.
  - Test input validation.
  - Test hành vi của API với các quyền khác nhau.

### 1.9. Quy trình test trực tiếp

Lập lịch thực hiện API testing mỗi ngày trong khi quy trình test đang hoạt động rất được khuyến khích. Vì việc thực hiện API testing nhanh, ổn định và đủ nhỏ, nên dễ dàng thêm nhiều test vào quy trình test hiện tại với rủi ro tối thiểu. Điều này chỉ có thể với các công cụ API testing tự động đi kèm với các tính năng như:

- Lập lịch test với các lệnh đã tích hợp trong tool
- Tích hợp với các công cụ quản lý test và các công cụ theo dõi lỗi
- Tích hợp liên tục với các công cụ CI khác nhau
- Tạo báo cáo nhật ký trực quan

Khi quá trình test hoàn tất, bạn có thể nhận được kết quả của các bài test đó mỗi ngày. Nếu các test thất bại xảy ra, bạn có thể test các đầu ra và xác nhận các vấn đề để có giải pháp phù hợp.

### 1.10. Đừng đánh giá thấp automation API testing

Luồng test API khá đơn giản với ba bước chính:

- Gửi request với dữ liệu đầu vào cần thiết
- Nhận phản hồi có dữ liệu đầu ra
- Test rằng phản hồi trả về như mong đợi trong requirement

Các phần nhạy cảm nhất của API testing không phải là gửi request cũng như không nhận được phản hồi. Mà là quản lý data test và xác nhận. Điều phổ biến là việc test một vài API đầu tiên như đăng nhập, truy vấn một số tài nguyên,... khá đơn giản. Nhiệm vụ test ngày càng trở nên khó khăn hơn đối với các API tiếp theo. Do đó, nhiệm vụ test API rất dễ bị đánh giá thấp. Tại một số thời điểm, bạn sẽ thấy mình ở giữa việc chọn một phương pháp tốt cho dữ liệu test và phương pháp test. Đó là bởi vì dữ liệu trả về có cấu trúc tương tự, nhưng không giống nhau trong một dự án test. Sẽ rất khó để quyết định xem bạn có nên test dữ liệu JSON / XML theo từng key hay không, hoặc sử dụng code.

Việc xem xét automation API test trong một dự án rất được khuyến khích, để cấu trúc có thể mở rộng, tái sử dụng và bảo trì.

## 2. Tham khảo
- [10 API Testing Tips for Beginners (SOAP & REST)](https://www.katalon.com/resources-center/blog/api-testing-tips/)