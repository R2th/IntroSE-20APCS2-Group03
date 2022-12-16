## Frontend Testing là gì?
Frontend Testing là một kiểm thử Presentation layer của Kiến trúc 3 lớp.

Tức là, bạn đang kiểm tra GUI - mọi thứ hiển thị trên màn hình, phía client. Đối với một ứng dụng web, kiểm tra front-end sẽ bao gồm kiểm tra các chức năng như biểu mẫu, biểu đồ, menu, báo cáo, v.v. cũng như Javascript liên quan. Frontend tests là một thuật ngữ bao gồm nhiều chiến lược thử nghiệm khác nhau. Tester cần có sự hiểu biết tốt, có kinh nghiệm về các yêu cầu nghiệp vụ để thực hiện dạng test này.

![](https://images.viblo.asia/2c8a47db-048c-4196-8c50-be02ab100923.png)

## Back-end Testing là gì?
Back-end Testing là một dạng test kiểm tra Ứng dụng và Cơ sở dữ liệu của Kiến trúc 3 tầng.

Trong một ứng dụng phần mềm phức tạp như ERP, Back-end Testing sẽ đòi hỏi phải kiểm tra logic nghiệp vụ trong từng lớp ứng dụng. Đối với các ứng dụng đơn giản hơn, Backend testing kiểm tra phía máy chủ hoặc Cơ sở dữ liệu. Điều đó có nghĩa là dữ liệu tích hợp vào giao diện người dùng sẽ được kiểm tra trong cơ sở dữ liệu phía sau. Định dạng cơ sở dữ liệu có thể là SQL Server, MySQL, Oracle, DB2, v.v. Dữ liệu sẽ được sắp xếp trong các bảng dưới dạng bản ghi.

Cơ sở dữ liệu được kiểm tra các thuộc tính ACID, hoạt động CRUD, Lược đồ của chúng, tuân thủ quy tắc nghiệp vụ. Cơ sở dữ liệu cũng được kiểm tra Bảo mật và Hiệu suất.

Trong Backend testing, không cần sử dụng GUI. Bạn có thể trực tiếp truyền dữ liệu bằng trình duyệt với các tham số cần thiết cho chức năng để nhận phản hồi ở một số định dạng mặc định. Ví dụ: XML hoặc JSON. Bạn cũng kết nối trực tiếp với cơ sở dữ liệu và xác minh dữ liệu bằng các truy vấn SQL.

## Frontend Testing với Backend Testing

| Frontend Testing | Backend Testing | 
| -------- | -------- |
| Frontend luôn được thực hiện trên GUI| Back End Testing liên quan đến cơ sở dữ liệu và kiểm tra logic nghiệp vụ| 
| Tester phải có kiến thức về các yêu cầu nghiệp vụ cũng như việc sử dụng các công cụ frameworks tự động hóa|Để có thể thực hiện Back End Testing, Tester phải có một nền tảng vững chắc về cơ sở dữ liệu và các khái niệm Ngôn ngữ truy vấn có cấu trúc (SQL)| 
| GUI được sử dụng để test | Có thể sử dụng hoặc không sử dụng GUI trong việc test| 
| Không cần bất kỳ thông tin nào được lưu trữ trong cơ sở dữ liệu| Cần thông tin được lưu trữ trong cơ sở dữ liệu     | 
| Điều cần thiết là kiểm tra chức năng tổng thể của ứng dụng| Back End Testing là bước quan trọng để kiểm tra sự bế tắc, hỏng dữ liệu, mất dữ liệu, v.v.     | 
| Những kiểu test được thực hiện là test đơn vị, test chấp nhận, test khả năng truy cập, test hồi quy, v.v| Hai kiểu test cơ sở dữ liệu được sử dụng rộng rãi là test SQL, test API, v.v.  | 

## Các công cụ quan trọng được sử dụng để thực hiện Front-end testing

Có nhiều công cụ có sẵn để được sử dụng để test front-end. Dưới đây, là ba công cụ test front-end phổ biến.
### 1. Grunt:

Grunt là một trong những công cụ được ưa chuộng khi nói đến tự động hóa task. Nó là một trình chạy tác vụ JavaScript, cung cấp nhiều bundled plugins cho các task thông thường.

### 2. LiveReload:

LiveReload là một giao thức Web đơn giản. Nó kích hoạt các sự kiện cho client bất cứ khi nào tập tin được sửa đổi. Client có thể xử lý sự kiện này theo cách của chúng, ngay cả khi trường hợp phổ biến nhất là khi tệp bị sửa đổi.

### 3. Karma:

Karma là một công cụ test chạy JavaScript. Nó cho phép bạn thực hiện các bài test từ workstation đến production  CI.

## Các công cụ quan trọng được sử dụng để thực hiện Backend testing
Test cơ sở dữ liệu cũng đề cập rằng việc test Back-end là rất quan trọng. Dưới đây, là một số công cụ test Back-end giúp tìm ra các vấn đề như bế tắc, hỏng dữ liệu và hiệu suất kém.

### 1. Data Factory:

Data factory là công cụ test cơ sở dữ liệu. Nó hoạt động như trình tạo dữ liệu và quản lý dữ liệu để test cơ sở dữ liệu. Nó có giao diện rất dễ sử dụng và có khả năng quản lý mối quan hệ dữ liệu phức tạp.

### 2. Data Generator:

DTM Data Generator là một công cụ test Back-end khác. Nó được sử dụng để tạo các hàng dữ liệu và các schema objects để test cơ sở dữ liệu. Công cụ này hỗ trợ khả năng sử dụng tải và kiểm tra hiệu suất trên cơ sở dữ liệu.

### 3. TurboData

Công cụ phần mềm Turbodata có thể được sử dụng để tạo dữ liệu test với khóa ngoại. Nó cho phép sử dụng các lệnh Chọn, Cập nhật và Xóa SQL. Nó cũng hỗ trợ nhiều tệp tuần tự và cơ sở dữ liệu quan hệ.

## Khác biệt
* Frontend testing kiểm tra lớp trình bày của Kiến trúc 3 lớp trong khi Back-end testing là kiểm tra lớp ứng dụng và cơ sở dữ liệu của Kiến trúc 3 lớp.
* Frontend testing luôn được thực hiện trên GUI trong khi  Back-end testing liên quan đến cơ sở dữ liệu và kiểm tra logic nghiệp vụ.
* Frontend testing không cần bất kỳ thông tin nào được lưu trữ trong cơ sở dữ liệu, nhưng  Back-end testing cần thông tin được lưu trữ trong cơ sở dữ liệu.
* Frontend testing là điều cần thiết để kiểm tra chức năng tổng thể của ứng dụng trong khi  Back-end testing rất quan trọng để kiểm tra sự bế tắc, hỏng dữ liệu, mất dữ liệu, v.v.
* Frontend tester phải có kiến thức về các yêu cầu nghiệp vụ và các công cụ framework tự động hóa trong khi Back-end tester phải có nền tảng vững chắc về cơ sở dữ liệu và các khái niệm Ngôn ngữ truy vấn có cấu trúc (SQL).
* Các ví dụ Frontend testing là Kiểm thử đơn vị, Kiểm tra chấp nhận, Kiểm tra khả năng truy cập, Kiểm tra hồi quy trong khi các ví dụ kiểm tra phụ trợ là Kiểm tra SQL, Kiểm tra API, v.v.


Bài viết được dịch lại từ nguồn: https://www.guru99.com/