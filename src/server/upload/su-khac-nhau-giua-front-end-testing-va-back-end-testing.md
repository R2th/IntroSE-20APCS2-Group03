# Frontend Testing là gì?
 
Frontend Testing là một loại kiểm thử kiểm tra tầng UI (Presentation) trong mô hình 3 lớp (3-tier). 

Frontend Testing là kiểm thử  GUI - mọi thứ hiển thị trên màn hình, phía client. Đối với một ứng dụng web, kiểm thử front-end sẽ bao gồm kiểm tra các chức năng như biểu mẫu, biểu đồ, menu, báo cáo, v.v. cũng như Javascript liên quan. Frontend tests là một thuật ngữ bao gồm nhiều chiến lược kiểm thử khác nhau. Một người kiểm thử cần có sự hiểu biết tốt về các yêu cầu nghiệp vụ để thực hiện loại kiểm thử này.

![](https://images.viblo.asia/997094ed-88c6-4e07-8e57-cbe60f768afd.png)

# Trong hướng dẫn này, chúng ta sẽ tìm hiểu:

 Front-end Testing  là gì?
Back-end Testing là gì?
Frontend tests Vs Backend tests
Các công cụ kiểm thử Front-end 
Các công cụ kiểm thử Back-end 


# Back-end Testing là gì?
Back-end Testing là một loại thử nghiệm kiểm tra tầng Ứng dụng (application)  và Cơ sở dữ liệu của mô hình 3 lớp (3-tier).

Trong một ứng dụng phần mềm phức tạp như ERP, back-end testing sẽ đòi hỏi phải kiểm tra logic nghiệp vụ trong tầng ứng dụng. Đối với các ứng dụng đơn giản hơn, kiểm thử phía server  hoặc Cơ sở dữ liệu. Điều đó có nghĩa là dữ liệu được nhập vào giao diện người dùng sẽ được kiểm tra trong cơ sở dữ liệu phía sau. Định dạng cơ sở dữ liệu có thể là SQL Server, MySQL, Oracle, DB2, v.v. Dữ liệu sẽ được sắp xếp trong các bảng dưới dạng bản ghi.

Cơ sở dữ liệu được kiểm tra các thuộc tính ACID, hoạt động CRUD, Lược đồ của chúng, tuân thủ quy tắc nghiệp vụ. Cơ sở dữ liệu cũng được kiểm tra về Bảo mật và Hiệu suất.

Trong kiểm thử back-end, không cần sử dụng GUI. Bạn có thể trực tiếp truyền dữ liệu bằng trình duyệt với các tham số cần thiết cho chức năng để nhận phản hồi ở một số định dạng mặc định. Ví dụ: XML hoặc JSON. Bạn cũng kết nối trực tiếp với cơ sở dữ liệu và xác minh dữ liệu bằng các truy vấn SQL

# So sánh Front-end testing và Back-end testing 



| Front-end Testing|Back-end Testing|
| -------- | -------- |
| Luôn thực hiện trên giao diện người dùng (GUI)     | Bao gồm kiểm thử nghiệp vụ và database    | 
|Người kiểm thử phải hiểu về yêu cầu nghiệp vụ cũng như biết cách sử dụng tool tự động     | Người kiểm thử cần có kiến thức database, SQL tốt    | 
| Giao diện người dùng dùng để kiểm thử     | Có thể dùng giao diện người dùng, có thể không  | 
| Không cần thông tin lưu trữ trong database    | Cần phải sử dụng thông tin lưu trữ trong db      | 
| Điều cần thiết là kiểm tra chức năng tổng thể của ứng dụng.    | quan trọng để kiểm tra sự bế tắc, hỏng dữ liệu, mất dữ liệu, v.v.    | 
|Các loại kiểm thử: Unit Tests, Acceptance Testing, Accessibility Testing, Regression Testing, etc.   |Nhiều loại: bao gồm kiểm thử SQL testing và API testing   | 


# Công cụ kiểm thử Front-end 

* **Grunt**

https://gruntjs.com/

![](https://images.viblo.asia/47817e27-7841-4cbe-b194-5ce3b9d6a295.png)

Grunt là một trong những công cụ ưa thích khi nói đến automation test frontend . Nó là một trình chạy tác vụ JavaScript, cung cấp nhiều plugin được đóng gói cho các tác vụ thông thường.

* **Live reload**

http://livereload.com/

![](https://images.viblo.asia/70f14d7f-af99-459f-9b7e-4199bca9179b.png)

LiveReload là một giao thức Web đơn giản. Nó kích hoạt các sự kiện cho khách hàng bất cứ khi nào tập tin được sửa đổi. Khách hàng có thể xử lý sự kiện này theo cách của họ, ngay cả khi trường hợp sử dụng phổ biến nhất là khi file bị sửa đổi


* **Karma**

https://karma-runner.github.io/latest/index.html

![](https://images.viblo.asia/ae6604f7-f8d5-4ef1-9c39-22068b41e98c.png)

Là công cụ chạy javascrip giúp thực hiện test từ work station đến CI


# Công cụ kiểm thử Back-end 

*  Data factory
*  Data generator
*  Turbo data


# Kết luận 

* Front-end testing thực hiện trên giao diện trong khi Back-end testing bao gồm cả database testing 
* Người kiểm thử front-end phải có kiến thức về nghiệp vụ 
* Người kiểm thử back-end phải có kiến thức về database và SQL testing 
* Grunt, LiveReload, Karma là công cụ kiểm thử front-end 
* Data factory, Data Generator, Turbo data là công cụ kiểm thử back-end