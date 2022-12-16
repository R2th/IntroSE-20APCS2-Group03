![](https://images.viblo.asia/f50dba1f-bb7d-4c2f-bcb6-d48863824646.png)

##  **I. Frontend Testing**

![](https://images.viblo.asia/21f66164-b263-4473-9fec-2c962f9f16ea.png)

**1. Fontend Testing là gì?**

Frontend Testing là một thuật ngữ bao gồm nhiều chiến lược thử nghiệm khác nhau. Một người kiểm thử cần hiểu biết tốt về các yêu cầu kinh doanh (business) để thực hiện tốt loại thử nghiệm này. 

Vậy Frontend Testing hướng đến việc thử nghiệm những phần nào?
- Mọi thứ hiện diện trên màn hình (User Interface)
- Đối với một ứng dụng Web, kiểm tra Frontend sẽ bao gồm cả việc kiểm tra các chức năng như Biểu mẫu, Biểu đồ, Menu...cũng như Javascript liên quan.

**2. Tại sao cần chú trọng thử nghiệm Frontend**

Bởi vì các trang Web và Ứng dụng ngày càng phức tạp hơn bao giờ hết:
* Có nhiều Mã code được viết trên Frontend: 
   Đã có sự sai khác đáng kể về chức năng từ máy chủ (Server) sang máy khách (Client), đặc biệt đối với các Website được xây dựng bởi framworks  Angular and React.
* Websites tích hợp nhiều dịch vụ hơn:
   SaaS (Software as a Service) ngày càng phổ biến, điều đó có nghĩa là bạn phải đối phó với các dịch vụ của bên thứ 3 gây ra nhiều vấn đề không tương thích trên Website của bạn.
* Các Websites sẽ được sử dụng trên nhiều trình duyệt hơn:
   Ngoài Desktop, Laptop, các websites còn mong muốn được chạy trơn tru trên nhiều thiết bị và trình duyệt khác như: mobile, TV, Tablet, Car...
* Đối tượng và nhu cầu ngày càng đa dạng:
  Từ trẻ em cho đến người lớn, giao diện người dùng cần được đáp ứng phù hợp.
  
Bởi vì có rất nhiều lỗi tinh vi có thể xảy ra tại giao diện người dùng:
* Những thay đổi nhỏ về CSS cũng có thể làm giao diện người dùng trở nên tồi tệ hơn.
* Các thay đổi JavaScript có thể phá vỡ giao diện người dùng.
* Các dịch vụ bên thứ 3 không tương thích với nhau.

**3. Các công cụ hỗ trợ kiểm thử Frontend**
Dưới đây là một số công cụ phổ biến:

* **Grunt:**
Grunt là một trình chạy tác vụ JavaScript, cung cấp nhiều Plugin được đóng gói cho các tác vụ thông thường.

  Tìm hiểu thêm về Grunt tại đây: https://gruntjs.com/

* **LiveReload**
LiveReload là một giao thức Web đơn giản. Nó kích hoạt các sự kiện cho khách hàng bất cứ khi nào các tệp được sửa đổi. Khách hàng cũng có thể xử lý sự kiện này theo cách của họ, ngay cả khi trường hợp sử dụng phổ biến nhất là khi tệp bị sửa đổi.

  Tìm hiểu thêm về LiveReload tại đây: http://livereload.com/

* **Karma**
Karma là một công cụ chạy thử JavaScript. Nó cho phép bạn thực hiện các bài kiểm tra từ máy chủ (Server) đến Production.

  Tìm hiểu thêm về Karma tại đây: https://karma-runner.github.io/latest/index.html


##  **2. Backend Testing**

![](https://images.viblo.asia/5c0ebade-b974-4665-96c1-03050ac9ffd7.png)

**1. Backend Testing là gì?**

Backend Testing (hay Database Testing) là kiểu kiểm tra lớp ứng dụng và Cơ sở dử liệu, tập trung vào việc kiểm tra các hành vi của hệ thống ở cấp cơ sở dữ liệu. trong một ứng dụng phần mềm phức tạp, kiểm tra Backend sẽ đòi hỏi kiểm tra logic nghiệp vụ (business) trong lớp ứng dụng. Điều đó có nghĩa là dữ liệu được nhập vào từ giao diện người dùng sẽ được kiểm tra tại Cơ sở dữ liệu. Các định dạng cơ sở dữ liệu có thể là SQL Server, MySQL, Oracle...và được sắp xếp trong các bảng dưới dạng bản ghi.

Trong thử nghiệm Backend, không cần sử dụng GUI. Bạn có thể truyền dữ liệu bằng trình duyệt với các tham số cần thiết cho chức năng để nhận phản hồi ở một số định dạng mặc định. Ví dụ: XML hoặc JSON. Bạn cũng thực hiện kết nối trực tiếp với cơ sở dữ liệu và xác minh dữ liệu bằng các truy vấn SQL.

**2. Tại sao cần chú trọng kiểm thử Backend?**
* Vì Cơ sở dữ liệu là một thành phần thiết yếu và cốt lõi của ứng dụng phần mềm.
* Có thể kiểm tra chi tiết về hệ thống và phát hiện lỗi khi chi phí sửa chữa ở mức thấp nhất.
* Giúp hệ thống luôn hoạt động đúng như yêu cầu, ổn định, lâu dài, mạnh mẽ.

**3. Các công cụ hỗ trợ kiểm thử Backend**

* **Data Factory:**
Data Factory  là công cụ kiểm tra cơ sở dữ liệu. Nó hoạt động như trình tạo dữ liệu và quản lý dữ liệu để kiểm tra cơ sở dữ liệu. Nó có giao diện rất dễ sử dụng và có khả năng quản lý mối quan hệ dữ liệu phức tạp. 

  Tìm hiểu thêm về Data Factory ở đây: https://sourceforge.net/projects/data-factory/

* **Data Generator:**
Data Generator là một công cụ kiểm tra Backend khác. Nó được sử dụng để tạo các hàng dữ liệu và các đối tượng lược đồ để kiểm tra cơ sở dữ liệu. Công cụ này hỗ trợ khả năng sử dụng tải và kiểm tra hiệu suất trên cơ sở dữ liệu.

   Tìm hiểu thêm về Data Generator: http://www.sqledit.com/dg/download.html

* **TurboData:**
Công cụ phần mềm Turbodata có thể được sử dụng để tạo dữ liệu thử nghiệm với khóa ngoại. Nó cho phép sử dụng các lệnh Chọn, Cập nhật và Xóa dữ liệu. Nó cũng hỗ trợ nhiều tệp tuần tự và cơ sở dữ liệu quan hệ.

   Tìm hiểu thêm về TurboData ở đây: https://www.turbodata.com/

##  **3. Sự khác nhau cơ bản giữa Frontend Testing Vs. Backend Testing **



| Frontend testing | Backend testing | 
| -------- | -------- | -------- |
|Kiểm thử Frontend luôn được thực hiện trên GUI     | Kiểm thử Backend bao gồm việc kiểm tra database và logic nghiệp vụ (business) trong lớp ứng dụng      |
|Người kiểm thử cần có kiến thức về các yêu cầu nghiệp vụ cũng như việc sử dụng các công cụ tự động hóa     | Người kiểm thử cần có kiến thức vững chắc trong cơ sở dữ liệu và các khái niệm Ngôn ngữ truy vấn có cấu trúc (SQL)      |
|GUI được sử dụng để thực hiện kiểm thử     | GUI có thể hoặc không được sử dụng để kiểm thử      |
|Dữ liệu để kiểm tra GUI được nhập thủ công vào các ứng dụng. Dựa trên dữ liệu thử nghiệm này, việc kiểm tra chức năng cho ứng dụng được thực hiện      | Cơ sở dữ liệu thu thập dữ liệu không đồng nhất để kiểm tra từ nhiều nguồn như dữ liệu qua các ứng dụng web, ứng dụng Intranet, tương tác của người dùng      |


Các nguồn tham khảo:
1. https://www.guru99.com/frontend-testing-vs-backend-testing.html#4
2. http://frontendtesting.com/
3. https://tech.vccloud.vn/saas-la-gi-20181024112523984.htm
4. https://www.softwaretestingclass.com/how-to-do-backend-testing/
5. https://www.mindk.com/blog/backend-testing/