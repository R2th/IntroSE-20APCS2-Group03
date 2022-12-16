##  **A. Tổng Quan về SQL Server.**
### 1. SQL Server là gì?
- Là phần mềm được Microsoft phát triển dựa trên RDBMS.
- Là hệ quản trị cơ sở dữ liệu quan hệ đối tượng.
- Là một nền tảng độc lập.
- Phần mềm sử dụng cả giao diện dòng lệnh và giao diện GUI.
### 2. Mục đích sử dụng của SQL Server.
- Tạo cơ sở dữ liệu.
- Duy trì cơ sở dữ liệu.
- Phân tích dữ liệu bằng SSAS - SQL Server Analysis Services.
- Tạo báo cáo bằng SSRS - SQL Server Reporting Services.
- Thực hiện quá trình ETL (Extract-Transform-Load) bằng SSIS SQL Server Integration Services.
### 3. Các phiên bản của SQL Server.
- Enterprise - bản cao cấp nhất với đầy đủ tính năng.
- Standard - ít tính năng hơn Enterprise, sử dụng khi không cần dùng tới các tính năng nâng cao. 
- Workgroup - phù hợp cho các công ty lớn với nhiều văn phòng làm việc từ xa.
- Web - thiết kế riêng cho các ứng dụng web.
- Developer - tương tự như Enterprise nhưng chỉ cấp quyền cho một người dùng duy nhất để phát triển, thử nghiệm, demo. Có thể dễ dàng nâng cấp lên bản Enterprise mà không cần cài lại.
- Express - bản này chỉ dùng ở mức độ đơn giản, tối đa 1 CPU và bộ nhớ 1GB, kích thước tối đa của cơ sở dữ liệu là 10GB.
- Compact - nhúng miễn phí vào các môi trường phát triển ứng dụng web. Kích thước tối đa của cơ sở dữ liệu là 4GB.
- Datacenter - thay đổi lớn trên SQL Server 2008 R2 chính là bản Datacenter Edition. Không giới hạn bộ nhớ và hỗ trợ hơn 25 bản cài.
- Business Intelligence - Business Intelligence Edition mới được giới thiệu trên SQL Server 2012. Phiên bản này có các tính năng của bản Standard và hỗ trợ một số tính năng nâng cao về BI như Power View và PowerPivot nhưng không hỗ trợ những tính năng nâng cao về mức độ sẵn sàng như AlwaysOn Availability Groups…
- Enterprise Evaluation - bản SQL Server Evaluation Edition là lựa chọn tuyệt vời để dùng được mọi tính năng và có được bản cài miễn phí của SQL Server để học tập và phát triển. Phiên bản này có thời gian hết hạn là 6 tháng từ ngày cài.
## **B.Cách cài đặt của MS SQL Server**
### 1. Truy cập: 
https://www.microsoft.com/en-us/sql-server/sql-server-downloads
### 2. Nếu là Tester hoặc Dev thì chọn bản Developer. (Còn bạn nào muốn tìm hiểu để biết thì tải bản Express )
![](https://images.viblo.asia/51370ae3-8d4a-4006-b31b-2f69ca9036c3.JPG)https://images.viblo.asia/51370ae3-8d4a-4006-b31b-2f69ca9036c3.JPG
### 3. Cài đặt
B1: Click đúp vào biểu tượng vừa tải về.
![](https://images.viblo.asia/0b322b9a-49ea-4bb2-adfc-e80c34e4457a.JPG)
B2: Chọn yes.
![](https://images.viblo.asia/e6c2ca0c-fe35-4480-8865-cc1e8db35327.JPG)
B3: Chọn Basic.
![](https://images.viblo.asia/c6fe608f-91bc-4286-a4d5-17fa32817282.JPG)
B4: Chọn Accept.
![](https://images.viblo.asia/a5eb61d4-e44e-4469-9969-50f3cbf545e1.JPG)
B5: Click Install.
![](https://images.viblo.asia/04744bf0-f812-46ba-9ae8-efeaab7112e1.JPG)
B6: Sau khi chạy cài đặt xong, chương trình hiện ra giao diện bên dưới, click  “Install SSMS”
![](https://images.viblo.asia/fa66fb55-5f22-47bb-9b54-1eeb2c03ef5e.JPG)
B7: Chương trình dẫn đến trang download SSMS ( SQL Server Management Studio)
> click “Download SQL Server Management Studio 17.8”
SSMS : là môi trường tích hợp để quản lý bất kỳ cơ sở hạ tầng SQL nào, từ SQL Server đến cơ sở dữ liệu SQL. SSMS cung cấp các công cụ để cấu hình, giám sát và quản lý các cá thể của SQL. Sử dụng SSMS để triển khai, theo dõi và nâng cấp các thành phần cấp dữ liệu được ứng dụng của bạn sử dụng, cũng như xây dựng truy vấn và tập lệnh.
![](https://images.viblo.asia/3d79f0b9-fcc4-4ec1-937d-3fac71114ee4.JPG)
B8: Kích đúp vào file vừa tải về rồi chọn yes.
![](https://images.viblo.asia/9306c40e-ba49-4219-a29b-b825d1f2ef01.JPG)

B9: Hiển thị màn hình tiếp theo chọn “Install”.

![](https://images.viblo.asia/ac6ed443-c4c7-4ec0-b1d2-bd2c15434c35.JPG)

B10: Thông báo hoàn thành cài đặt SSMS, chọn Close

![](https://images.viblo.asia/f8cdc0e1-99f9-4845-8c22-b6d082bac9df.JPG)

## **C. Thao tác với SSMS**
### 1. Cài đặt.
- Click Start
- Click Expand ( Nếu không thấy hiển thị Microsoft SQL Server Management Studio).
- Click Microsoft SQL Server Management Studio.
- Màn hình hiển thị chương trình SSMS, chọn Connect.
![](https://images.viblo.asia/fc1fda5d-99b0-4577-9688-3e6b0f24a86a.JPG)
- Khi màn hình hiện thị ra giao diện bên dưới chọn “Security” , click chuột phải vào “Login”, chọn “New Login” để thiết lập đăng nhập vào CSDL của bạn.
- Điền Tên login ở phân “Login name” và chọn SQL Server authentication điền Password và Confirm password rồi chọn “OK”.
![](https://images.viblo.asia/8cc1ba0d-d640-417f-9dc0-009aba6a0f4e.JPG)
- Hoặc dùng câu lệnh: Chọn New Query, gõ “Create login yourloginname with password='yourpassword'”, chọn Excute.

### 2. Tạo CSDL.
- Cách 1: Dùng câu lệnh.
->Chọn New Query, gõ “Create database <yourdatabasename> “, chọn Excute.
    
    ![](https://images.viblo.asia/ddb2f55a-1ed8-44f0-8198-b2474d67769d.JPG)
    
- Cách 2: Dùng  giao diện. 
->Click chuột phải “Database”, chọn “New Database”, gõ tên Database vào Database name và chọn OK.

![](https://images.viblo.asia/47fe4669-9806-49fd-a81b-79a99d05735b.JPG)
- Cách 3: Retore Dữ liệu: ( Trình bày phần sau).

### 3. Tạo bảng trong CSDL.
- Cách 1: Chọn New Query
Gõ:

 Create Table Tên_Bảng (
  Tên_Cột   Kiểu_Dữ_Liệu(Kích cỡ)
  ,Tên_Cột  Kiểu_Dữ_Liệu(Kích cỡ)
  ,...
  ,primary key (Khoá chính)
  ,foreign key (Khoá ngoại) references Bảng_Tham_Chiếu(Khoá ngoại)
)
Chọn Excute

![](https://images.viblo.asia/c18265a1-88d1-4187-bde8-9206471e6600.JPG)

- Cách 2: 
Chọn duongtam_90
Click trái Tables
Click Tables
Điền thông tin
Điền tên bảng ở menu bên phải ô Name

![](https://images.viblo.asia/a67b5022-bc9a-475e-a935-ea7439c29bfb.JPG)

* Kết quả hiển thị các bảng đã tạo
![](https://images.viblo.asia/07b16c52-9871-4eca-a7b7-755966035afe.JPG)

***Tài liệu tham khảo:*** https://www.tutorialspoint.com/ms_sql_server/ms_sql_server_monitor_database.htm