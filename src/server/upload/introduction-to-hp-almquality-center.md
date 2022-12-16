## 1. HP ALM là gì? ##
HP ALM (Application Life Cycle Management) là một tool web căn bản giúp đỡ tổ chức quản lý vòng đời phát triển đúng từ khi lập kế hoạch dự án, thu thập yêu cầu, cho đến khi kiểm thử và triển khai mục đích tiết kiệm thời gian

HP Application LifeCycle Management (ALM) là hóa thân mới nhất của công cụ quản lý kiểm tra chất lượng hàng đầu Quality Center(QC). Tool quản lý được phát triển bởi Mercury interactive.

ALM bây giờ được phát triển bởi HP như Công cụ quản lý vòng đời ứng dụng và hỗ trợ các giai đoạn khác nhau của vòng đời phát triển phần mềm.

ALM cũng cung cấp tích hợp cho tất cả các sản phẩm HP khác như UFT và Load Runner.

## 2. Tại sao lại sử dụng HP ALM? ##
Phần lớn các thành phần tham gia đội dự án bao gồm

Developer

Tester

Business Analysts

Project Managers

Product Owners

Sơ đồ sử dụng HP ALM
![](https://images.viblo.asia/36b25d69-dd85-4e84-a138-a6f10c6dc97a.png)
- Nó cho phép tất cả các bên liên quan tương tác và phối hợp, để đạt được các mục tiêu của dự án.
- Nó cung cấp robust tracking & reporting và tích hợp liền mạch các nhiệm vụ liên quan đến dự án khác nhau.
- ALM có thể kết nối tới hệ thống email và gửi email về bất kỳ thay đổi gì ( như thay đổi yêu cầu dự án, báo cáo lỗi, etc...) tới toàn bộ team members

## 3. Các phiên bản HP Quality Center ##
Lịch sử của ALM

Quality Center trước đó được biết đến như là Test Director được phát triển bởi Mercury Interactive

Trong 2008, phiên bản 8 được phát hành, và sản phẩm được đổi tên là Quality Center

Sau đó HP mua lại Mercury Interactive và đổi tên thành HP

Do đó Mercury Quality Center trở thành HP Quality Center

Trong năm 2011, Version 11 được phát hành, và Quality center được tái xác nhận là HP ALM.
![](https://images.viblo.asia/c240e9c6-fdcc-4110-a93d-0ab5bbe2bf4f.PNG)

## 4. Architecture of QC ##
Nào bây giờ chúng ta hãy hiểu một phần công nghệ của HP-ALM.

ALM là một ứng dụng doanh nghiệp được phát triển bằng cách sử dụng Java 2 Enterprise Edition (J2EE) có thể có MS SQL Server hoặc Oracle làm back end.ALM có 3 thành phần đó là Client, Application server và Database server.

HP ALM client: Khi một người dùng cuối hoặc tester truy cập URL của ALM, các thành phần máy khách được tải xuống trên hệ thống của máy khách. 

HP ALM client: when an end user/tester accesses the URL of ALM, the client components are downloaded on the client's system. Các thành phần máy khách ALM giúp người dùng tương tác với máy chủ bằng cách sử dụng các công nghệ .NET và COM qua kết nối bảo mật (HTTPS).

ALM server/Application server:Application server thường chạy trên nền tảng Windows hoặc Linux phục vụ cho các yêu cầu của khách hàng. App server sử dụng trình điều khiển Kết nối cơ sở dữ liệu Java (JDBC) để giao tiếp giữa application server và cơ sở dữ liệu.

Database servers: Lớp cơ sở dữ liệu được lưu trữ 3 schemas

Site Administration schema: Lưu trữ thông tin liên quan tới domains, users, và thông số trang web.

Lab Project: Lược đồ này được lưu trữ thông tin lab liên quan tới chức năng và hiệu suất trên máy chủ từ xa

Project schema: Lưu trữ thông tin dự án, chẳng hạn như thư mục công việc, dữ liệu được tạo bởi người dùng trong cùng dự án. Mỗi dự án có lược đồ riêng của nó và chúng được tạo ra trên cùng một máy chủ cơ sở dữ liệu như lược đồ quản trị trang.
![](https://images.viblo.asia/745ee234-fc92-4f89-b47d-8c645d110c4c.PNG)

## 5. HP ALM Editions ##
Sơ đồ HP ALM 
![](https://images.viblo.asia/669d7c6e-c41a-409d-b1a1-6a02ca08f03e.PNG)

## 6.ALM Edition Feature Comparison ##
Mỗi giấy phép cho phép người dùng truy cập một số chức năng ALM nhất định. Bảng sau liệt kê các tính năng mà một giấy phép cụ thể
![](https://images.viblo.asia/9a94f587-afd2-4372-aba9-5cc7d5cea073.PNG)

Hãy nghiên cứu lý do tại sao bạn sẽ mua một phiên bản cụ thể

HP ALM Essentials –Phiên bản này giành cho các công ty chỉ cần các tính năng cơ bản để hỗ trợ toàn bộ vòng đời phần mềm của họ. Nó có quyền truy cập vào quản lý yêu cầu, quản lý kiểm tra và quản lý lỗi.

HP QC Enterprise Edition –Giấy phép này có lợi cho các công ty muốn sử dụng ALM dành riêng cho mục đích thử nghiệm. Nó cũng cung cấp tích hợp với Unified Functional Tester (UFT).

HP ALM Performance Center Edition –Giấy phép này phù hợp nhất cho các tổ chức muốn sử dụng HP ALM để chạy HP-Load runner scripts. Nó giúp người dùng duy trì, quản lý, lên lịch, thực hiện và giám sát các performance tests.

## 7. ALM Workflow ##
Để tìm hiểu quy trình làm việc ALM, trước tiên hãy nghiên cứu quy trình thử nghiệm điển hình
![](https://images.viblo.asia/26c9b004-1afa-4a32-8ebc-9f3ec435f0b8.PNG)
- THeo quy trình làm việc của ALM thì bước đầu tiên sẽ tạo kế hoạch chi tiết các lần release, xác định chu trình mỗi lần release, xác định phạm vi mỗi lần release.
- Sau đó ALM tạo Requirement scecification
- Dựa trên yêu cầu test plan và test case được tạo.
- Giai đoạn tiếp theo là chạy test theo kế hoạch đã tạo
- Giai đoạn tiếp theo là thực hiện tìm lỗi và sửa lỗi
- Trong tất cả các giai đoạn ALM đều thực hiện phân tích, tạo và xuất report, biểu đồ sau mỗi công việc được thực thi thành công.

HP ALM cung cấp một mô-đun phục vụ cho từng giai đoạn của quá trình thử nghiệm, chúng ta sẽ tìm hiểu chúng trong các bài viết sau.

Tài liệu tham khảo:

https://www.guru99.com/hp-alm-introduction.html