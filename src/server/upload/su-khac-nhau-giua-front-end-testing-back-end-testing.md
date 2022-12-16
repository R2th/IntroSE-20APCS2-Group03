# Front-end Testing là gì ?

Kiểm thử Front-end Testing là một loại kiểm thử kiểm tra giao diện người dùng của kiến trúc 3 cấp.

Theo thuật ngữ, đó chính là đang kiểm tra GUI - bất kỳ thứ gì hiển thị trên màn hình phía client. Đối với một ứng dụng web, kiểm tra giao diện người dùng sẽ bao gồm việc kiểm tra các chức năng như biểu mẫu, đồ thị, menu, báo cáo, v.v. cũng như Javascript liên quan. Kiểm thử giao diện người dùng là một thuật ngữ bao hàm nhiều loại chiến lược kiểm thử. Người kiểm thử cần hiểu rõ về các yêu cầu nghiệp vụ để thực hiện loại kiểm thử này.

![](https://images.viblo.asia/7654eaed-b169-42aa-8624-47d5a606290c.png)

 
# Back-end Testing là gì ?
Back-end testing là một loại kiểm thử kiểm tra lớp Ứng dụng và Cơ sở dữ liệu của kiến trúc 3 cấp.

Trong một ứng dụng phần mềm phức tạp như ERP, kiểm tra back-end sẽ đòi hỏi phải kiểm tra logic nghiệp vụ trong tầng ứng dụng (Application Layer). Đối với các ứng dụng đơn giản hơn, kiểm tra Back-end sẽ kiểm tra phía máy chủ (Server) hoặc Cơ sở dữ liệu. Điều đó có nghĩa là dữ liệu được nhập vào front-end sẽ được kiểm tra trong cơ sở dữ liệu back-end. Định dạng cơ sở dữ liệu có thể là SQL Server, MySQL, Oracle, DB2, v.v. Dữ liệu sẽ được tổ chức trong các bảng dưới dạng bản ghi. Cơ sở dữ liệu được kiểm tra các thuộc tính ACID, hoạt động CRUD, lược đồ của chúng, sự tuân thủ quy tắc nghiệp vụ. Cơ sở dữ liệu cũng được kiểm tra về Bảo mật và Hiệu năng.

Trong thử nghiệm back-end, không cần sử dụng GUI. Ta có thể chuyển trực tiếp dữ liệu bằng trình duyệt với các tham số cần thiết cho hàm để nhận phản hồi ở một số định dạng mặc định. Ví dụ: XML hoặc JSON. Hoặc cũng có thể kết nối trực tiếp với cơ sở dữ liệu và xác minh dữ liệu bằng cách sử dụng truy vấn SQL.


# Các điểm khác nhau chính

| Frontend Testing | Back-end Testing  | 
| -------- | -------- | -------- |
| Kiểm tra Front-end Testing luôn được thực hiện trên GUI.| Kiểm tra Back-end liên quan đến cơ sở dữ liệu và kiểm tra logic nghiệp vụ.     | 
| Người kiểm thử phải hiểu biết về các yêu cầu nghiệp vụ cũng như việc sử dụng các công cụ Framework tự động hóa.     | Người kiểm thử để có thể thực hiện kiểm tra Back-end testing phải có kiến ​​thức nền tảng vững chắc về cơ sở dữ liệu và khái niệm Ngôn ngữ truy vấn có cấu trúc (SQL).    | 
| GUI bắt buộc được sử dụng để thực hiện Kiểm tra     | GUI có thể được sử dụng hoặc không     | 
| Không cần bất kỳ thông tin nào được lưu trữ trong cơ sở dữ liệu.     | Cần tất cả thông tin liên quan đến việc lưu trữ trong cơ sở dữ liệu.   | 
|  Kiểm tra chức năng tổng thể của ứng dụng là điều cần thiết .     | Back-end testing là rất quan trọng để kiểm tra xem luồng hệ thống có xảy ra sự cố, hỏng dữ liệu, mất dữ liệu, v.v.     | 
| Các loại kiểm tra được thực hiện:  Unit Test, Acceptance Testing, Accessibility Testing, Regression Testing, v.v.  |Ba loại kiểm tra cơ sở dữ liệu được sử dụng rộng rãi là Kiểm tra SQL, Kiểm tra API, v.v.    |

# Tools kiểm thử Front-end

Có rất nhiều công cụ có sẵn để kiểm tra front-end. Dưới đây là ba công cụ kiểm tra front-end phổ biến.
## 1. Grunt:

Grunt là một trong những công cụ được ưa thích khi nói đến tự động hóa nhiệm vụ. Nó là một trình chạy tác vụ JavaScript, cung cấp nhiều plugin đi kèm cho các tác vụ phổ biến.

## 2. LiveReload:

LiveReload là một giao thức Web đơn giản. Nó kích hoạt các sự kiện cho phía client bất cứ khi nào tệp được sửa đổi. Phía client có thể xử lý các sự kiện xảy ra theo cách của riêng họ, ngay cả khi trường hợp sử dụng phổ biến nhất là khi tệp được sửa đổi.

## 3. Karma:

Karma là một công cụ chạy thử nghiệm JavaScript. Nó cho phép thực hiện kiểm thử từ máy trạm đến CI sản xuất.

# Tools kiểm thử Back-end
Kiểm thử cơ sở dữ liệu cũng đề cập đến kiểm thử Back-end là rất quan trọng. Dưới đây là một số công cụ kiểm tra back-end quan trọng giúp tìm ra các vấn đề như deadlock, hỏng dữ liệu và hiệu suất kém.

## 1. Data Factory:
Data Factory là công cụ kiểm tra cơ sở dữ liệu. Nó hoạt động như trình tạo dữ liệu và quản lý dữ liệu để kiểm tra cơ sở dữ liệu. Giao diện rất dễ sử dụng và có khả năng quản lý mối quan hệ dữ liệu phức tạp.

## 2. Data Generator:
Data Generator là một công cụ kiểm tra phụ trợ khác. Nó được sử dụng để tạo các hàng dữ liệu và các đối tượng lược đồ để kiểm tra cơ sở dữ liệu. Tool có thể hỗ trợ kiểm tra khả năng chịu tải và tái sử dụng trên cơ sở dữ liệu.

## 3. TurboData
Công cụ phần mềm Turbodata có thể được sử dụng để tạo dữ liệu kiểm tra bằng khóa ngoại. Nó cho phép sử dụng các lệnh SQL như Select, Updates, and Delete. Nó cũng hỗ trợ nhiều files tuần tự và quan hệ cơ sở dữ liệu .

# Kết luận:
Bài viết sẽ rất hữu ích cho các bạn quản lý chất lượng (QA) level: *Fresher* giúp các bạn nắm được khái niệm cơ bản, sự khác biệt rõ ràng và từ đó có thể hình dung và phát triển quan điểm Test của mình

Tài liệu tham khảo: https://www.guru99.com/frontend-testing-vs-backend-testing.html