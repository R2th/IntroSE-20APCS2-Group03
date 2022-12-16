### 1. Tổng quan về Web Service
Web service là một hệ thống phần mềm được thiết kế để hỗ trợ khả năng tương tác giữa các ứng dụng trên các máy tính khác nhau thông qua mạng Internet, giao diện chung và sự gắn kết của nó được mô tả bằng XML. Web service là tài nguyên phần mềm có thể xác định bằng địa chỉ URL, thực hiện các chức năng và đưa ra các thông tin người dùng yêu cầu. 

Một Web service được tạo nên bằng cách lấy các chức năng riêng biệt và đóng gói sao cho các ứng dụng khác có thể truy cập đến, đồng thời có thể yêu cầu thông tin từ Web service khác. Web Service được xây dựng dựa trên mã nguồn mở và gồm có nhiều modun. 

Các ứng dụng cần được tích hợp với cơ sở dữ liệu (CSDL) và các ứng dụng khác, người sử dụng sẽ giao tiếp với CSDL để tiến hành phân tích và lấy dữ liệu. Cùng với đó là sự kết hợp của việc phát triển theo hướng từng thành phần với những lĩnh vực cụ thể nhằm cung cấp lợi ích cho cả doanh nghiệp, khách hàng, cá nhân,… 

Ưu điểm của Web Service

* Nâng cao khả năng tái sử dụng.
* Tạo mối quan hệ tương tác lẫn nhau , dễ dàng cho việc phát triển các ứng dụng phân tán.
* Cung cấp khả năng hoạt động với ứng dụng hay phần mềm khác nhau chạy trên nhiều nền tảng khác nhau.
* Sử dụng các giao thức và chuẩn mở. Giao thức và định dạng dữ liệu dựa trên văn bản (text), giúp các lập trình viên dễ dàng hiểu được.
* Phát triển hệ thống tích hợp và tương tác hiệu quả với các doanh nghiệp.

Nhược điểm của Web Service

* Có nhiều chuẩn khiến người dùng khó nắm bắt.
* Nếu Web Service mà chết trong một khoảng thời gian thì sẽ khiến giao diện không đổi,thiếu các giao thức cho việc vận hành, và có thể lỗi nếu máy khách không được nâng cấp,
* Vấn đề bảo mật và an toàn phải được quan tâm nhiều hơn.

### 2. Các thành phần của Web Service là gì ?
2.1.  XML – eXtensible Markup Language 

XML là kiến trúc nền tảng cho việc xây dựng một Web service, tất cả dữ liệu sẽ được chuyển sang định dạng thẻ XML và cấu trúc thẻ giống như ngôn ngữ HTML. Với XML, các thẻ có thể được lập trình viên tự tạo ra trên mỗi trang web và được chọn là định dạng thông điệp chuẩn bởi tính phổ biến và hiệu quả mã nguồn mở.

2.2. WSDL – Web Service Description Language 

Mô tả Web Service theo cú pháp tổng quát của XML gồm các thông tin như : 

* Tên dịch vụ
* Loại thông tin: thao tác, tham số, những kiểu dữ liệu,...
* Giao thức và kiểu mã hóa sẽ được sử dụng khi gọi các hàm của Web service

Một WSDL hợp lệ gồm hai phần: phần giao diện (mô tả giao diện và phương thức kết nối) và phần thi hành mô tả thông tin truy xuất CSDL. Cả hai phần này sẽ được lưu trong 2 tập tin XML tương ứng là tập tin giao diện dịch vụ và tập tin thi hành dịch vụ.

2.3.  UDDI – Universal Description, Discovery, and Integration

UDDI định nghĩa một số thành phần cho biết các thông tin này, cho phép các client truy tìm và nhận những thông tin được yêu cầu khi sử dụng Web service.

Cấu trúc UDDI :

* Loại dịch vụ – tModel:  chứa các thông tin về loại dịch vụ mà được sử dụng.
* White pages: chứa thông tin liên hệ và các định dạng của Web Service.
* Green pages: chứa chức năng của Web Service và thông tin kỹ thuật mô tả các hành vi .
* Yellow pages: gồm có thông tin mô tả dịch vụ Web.

2.4. SOAP – Simple Object Access Protocol 

Web service có thể truy xuất bằng một giao thức là Simple Object Access Protocol – SOAP. SOAP là một giao thức giao tiếp có cấu trúc như XML. Là cấu trúc xương sống của các ứng dụng phân tán được xây dựng từ các hệ điều hành khác nhau và nhiều ngôn ngữ. SOAP còn được coi là giao thức mà thay đổi các thông điệp dựa trên XML thông qua mạng máy tính.

Phần tử gốc: bao trùm nội dung thông điệp.
Phần tử đầu trang : chứa các thông tin tiêu đề cho trang
Phần tử đưa ra các thông tin về lỗi :cung cấp thông tin lỗi xảy ra trong qúa trình xử lý .
Phần tử khai báo nội dung chính trong thông điệp:  thông tin được phản hồi và chứa các thông tin yêu cầu.

### 3. Sơ lược về SoapUI
SoapUI là một sản phẩm của hãng SmartBear, SOAP UI là công cụ kiểm thử mã nguồn mở API hàng đầu, cho phép bạn dễ dàng thực hiện kiểm thử tự động chức năng, kiểm thử hồi quy và kiểm thử tải trên các Web API khác nhau. 

SOAP UI hỗ trợ tất cả các chuẩn giao thức và công nghệ để test tất cả các loại API. 

Ngoài ra SOAP UI còn cho phép chúng ta thực hiện thử nghiệm phi chức năng như kiểm thử hiệu suất và kiểm thử bảo mật. 

Giao diện SOAP UI đơn giản, thân thiện, dễ sử dụng.

**Một số tính năng quan trọng của SOAP UI:**

**Kiểm thử chức năng – Functional Testing:**

* Một công cụ mạnh mẽ cho phép tester viết Functional API Tests trong SOAP UI
* Hỗ trợ tính năng kéo-thả mà làm tăng tốc độ phát triển script
* Hỗ trợ gỡ lỗi và cho phép tester phát triển data driven tests.

**Kiểm thử bảo mật – Security Testing:**

* Ngăn chặn SQL Injection để bảo đảm cơ sở dữ liệu
* Thực hiện Fuzzing scan và Boundary scan để tránh những hành vi thất thường của các dịch vụ.

**Kiểm thử tải – Load Testing:**

* Kiểm thử khả năng chịu tải của một ứng dụng web sử dụng loadUI. Sau khi thực hiện kiểm tra tải, LoadUI sẽ tạo ra một bản báo cáo, giúp xác định liệu các ứng dụng có thể chịu tải nặng hay không.
* Kiểm thử khả năng chịu tải của một ứng dụng web sử dụng loadUI
* Mô phỏng mức độ cao và kiểm thử tải thực tế một cách dễ dàng.
* Cho phép tùy chỉnh báo cáo chi tiết để nắm bắt các thông số hiệu suất.

**![](https://images.viblo.asia/8cfb5cba-0975-47f4-920d-40a6c9a2340a.png)**

### 4. Cài đặt SoapUI
Tải phần mềm: Download SOAP UI free version (SOAP UI Open Source) tại https://www.soapui.org/downloads/soapui.html hoặc http://soapui.org/downloads/soapui/open-source.html

Cài đặt SOAP UI theo hướng dẫn: https://www.soapui.org/getting-started/installing-soapui/installing-on-windows.html

Giao diện sau khi cài đặt và mở ứng dụng SOAP UI:![](https://images.viblo.asia/2dd24057-d798-4e9d-9dd8-fb6262acc592.png)

### 5. Sử dụng SOAP UI
### 5.1 Tạo SoapUI Project
B1. Mở ứng dụng SoapUI

B2. Trên menu, chọn File -> New SOAP Project hoặc nhấn phím tắt CTRL + N.

![](https://images.viblo.asia/e9a13fdb-74ad-4b78-9c7a-4d45e417055b.png)

B3: Nhập tên Project và địa chỉ URL đến file WSDL của WS

B4: Các thiết lập còn lại có thể để mặc định và nhấn OK để hoàn tất.!

[](https://images.viblo.asia/3b2ae123-1930-4124-930f-505c5f43cd54.png)


Khi URL được WSDL xử lý thành công, SOAP Project sẽ được tạo ra:

![](https://images.viblo.asia/bb22de37-dc40-4210-81c5-e9f921c87041.png)

Double click lên tên project sẽ thấy Tab overview để xem các thông tin chi tiết của project, hoặc nhập thông tin username/ password để truy cập WS nếu có ở Tab WS-Sercurity Configurations

![](https://images.viblo.asia/0bd5c6ee-293e-4b82-aaa9-8029784fbc55.png)

Hoặc có thể dùng cách Import một project đã tồn tại từ máy tính:

* Click File > Import Project
* Nhập địa chỉ URL đến file XML của project hoặc click Browse và chọn đến file
* Click OK.

### 5.2 Tìm hiểu ví dụ
Ví dụ 1: 

(1) Double click vào request. Nó sẽ hiển thị SOAP request dưới dạng XML

(2) Nhập data test: Nhập chuyển đổi giữa 2 loại tiền tệ: FromCurrency và ToCurrency

(3) Gửi request bằng cách click nút Run

![](https://images.viblo.asia/b1f1a7ef-74b8-4c4b-9ea8-8d0c7376ac66.png)

(4) SoapUI sẽ gửi request tới web service chuyển đổi tiền tệ cùng với các dữ liệu đầu vào trong request. Sau đó, web service nhận được dữ liệu đầu vào và xử lý chúng. Cuối cùng, server sẽ gửi response cho SoapUI.

Response XML sẽ được hiển thị cửa sổ bên phải

![](https://images.viblo.asia/8e2141ed-ea29-43e8-8f91-73bb267b2580.png)

Thông thường, response sẽ trả về kết quả trực tiếp như ví dụ trên hoặc sẽ trả về mã lỗi và message tương ứng với mã lỗi đó. 

Đôi khi các response có thể chứa các thông báo lỗi. Ví dụ, trong khi xử lý request đầu vào, xảy ra trường hợp down server hoặc mất kết nối Internet, trong thời gian đó, chúng ta sẽ nhận được một response là một exception.

Ví dụ 2: Test API insert

![](https://images.viblo.asia/50d3d054-0877-4dda-bc82-af4a8ed61e77.png)

(1) : Double click để mở cửa sổ test API insert.

(2) : Nhập data test.

(3) : Gửi request (Click nút Run)

(4) : Kết quả trả về (response).

(5) : Nhập thông tin chứng thực, header, … nếu có.

(6) : Chọn show log nếu cần.

Trong ví dụ này, response trả về mã return = 1, tức là inseart thành công.

Ví dụ 3: API getAll()

Tương tự:

![](https://images.viblo.asia/d5cafc4e-e35f-4fc4-b924-26406c9d5025.png)

Bài viết này được thanh khảo các tài liệu sau và bằng vốn hiểu biết nho nhỏ qua một dự án test web service của mình, tuy nhiên thời gian làm dự án không lâu lắm.

https://www.guru99.com/soapui-tutorial.html

https://www.soapui.org/getting-started/soap-test.html