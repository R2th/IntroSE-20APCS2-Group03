# Microsoft SQL Server là gì?
SQL Server là một hệ quản trị cơ sở dữ liệu quan hệ (Relational Database Management System (RDBMS) ) sử dụng câu lệnh SQL (Transact-SQL) để trao đổi dữ liệu giữa máy Client và máy cài SQL Server. Một RDBMS bao gồm databases, database engine và các ứng dụng dùng để quản lý dữ liệu và các bộ phận khác nhau trong RDBMS. SQL Server được phát triển và tiếp thị bởi Microsoft.

SQL Server được tối ưu để có thể chạy trên môi trường cơ sở dữ liệu rất lớn (Very Large Database Environment) lên đến Tera-Byte và có thể phục vụ cùng lúc cho hàng ngàn user. SQL Server có thể kết hợp “ăn ý” với các server khác như Microsoft Internet Information Server (IIS), E-Commerce Server, Proxy Server….

Về cơ bản,  MS SQL server yêu cầu:

.Net Framework, 1GB bộ nhớ được đề xuất và hệ thống NTFS.

# Cách Download SQL Server Setup
**Step1)** Truy cập đường dẫn URL: https://www.microsoft.com/en-in/sql-server/sql-server-downloads


Microsoft cung cấp hai phiên bản miễn phí chuyên biệt để hoạt động trên MS SQL server:

1. **Developer** - Nó có tất cả các tính năng mà MS SQL server cung cấp nhưng không thể sử dụng nó trong sản xuất phần mềm. Từ quan điểm học hỏi, nó là một ứng cử viên lý tưởng để bắt đầu.
2.  **Express:** Đây cũng là phiên bản miễn phí nhưng với bộ tính năng giới hạn không có ứng dụng nghiệp vụ thông minh.

Vì thế chúng ta sẽ ưu tiên  chọn phiên bản **Developer edition**  để cài đặt.

**Step 2)** Click vào **"Download now"**

![](https://images.viblo.asia/5478d28e-cee2-45df-a3fd-390cc5378c38.png)

 Phiên bản sau khi tải về sẽ được thiết lập là: **'SQLServer2017-SSEI-Dev.exe'.**
 
#  Cách cài đặt SQL Server
**Step 1)**  Nhấp đúp chuột vào **"SQLServer2017-SSEI-Dev.exe".** Màn hình bên dưới sẽ xuất hiện với ba tùy chọn: Basic, Custom and Download files.

![](https://images.viblo.asia/59103cb4-b1eb-4345-be53-cad8097087f8.png)


**Step 2)** 
Chọn phiên bản cơ bản bằng cách nhấp vào tùy chọn **'Basic'**, vì nó có tất cả cấu hình mặc định cần thiết để tìm hiểu MS SQL.
![](https://images.viblo.asia/627309c8-1fa0-4d21-8b61-d95d6ec51d6a.png)

**Step 3)**  Màn hình **'Microsoft Server License Terms'** sẽ xuất hiện. Đọc License Terms - Điều khoản cấp phép và sau đó nhấp vào **'Accept-Chấp nhận'**

![](https://images.viblo.asia/52082b98-f9b2-4461-b852-d2d5f9da7c2f.png)

**Step 4)** 
Bên dưới **'SQL server install location'** sẽ xuất hiện cửa sổ

1. Vị trí mặc định là **C:\Program Files\Microsoft SQL Server.**
2. Mục tùy chọn, cũng có thể thay đổi vị trí cài đặt bằng cách nhấp vào **Browse-Duyệt**
3. Ở vị trí được chọn, nhấp vào nút **'Install-Cài đặt'**

![](https://images.viblo.asia/d7d16f53-e5aa-4663-8f16-8c80c694e8fc.png)


Bên dưới màn hình tiến trình  **'Downloading install package'** sẽ được hiển thị. Chờ cho đến khi tải xuống hoàn tất
![](https://images.viblo.asia/23c21295-161d-44bc-991b-54aa316540f2.png)



Sau khi tải xuống hoàn tất, hệ thống sẽ bắt đầu cài đặt phiên bản dành cho nhà phát triển.
![](https://images.viblo.asia/41275ef3-3190-4835-9e8a-3a9dd9acbfdf.png)


Dưới màn hình hiển thị tiến trình cài đặt.

![](https://images.viblo.asia/41275ef3-3190-4835-9e8a-3a9dd9acbfdf.png)

**Step 5)**  
Sau khi cài đặt hoàn tất thành công, màn hình bên dưới sẽ xuất hiện.
![](https://images.viblo.asia/cf808cdc-494b-4e03-a096-888916c4929c.png)

Thiết lập này là  **self-sufficient for proceeding further** để học tập với SQL Server  và có thể **'Close - Đóng'** cửa sổ này.

Tuy nhiên, dưới đây là một bản tóm tắt của Label và Button:
1. **Instance name:** Theo mặc định, Label này là MSSQLSERVER.
2. **Connect now:**  Ở đây sẽ mở một cửa sổ dòng lệnh riêng để kiểm tra kết nối về những gì chúng ta vừa cài đặt.
Hệ thống sẽ chạy theo mặc định 'select @@ Version' để xác nhận rằng có thể kết nối với phiên bản MSSQLSERVER mới thành công.
![](https://images.viblo.asia/3e41a2e9-5d79-4b4a-8e33-4c4236cfd990.png)
3. **Customize:** Ở đây sẽ mở SQL Installation center để tùy chỉnh thêm và thêm tính năng khác ngoài tính năng cài đặt BASIC.
4. **Install SSMS:** Đây là IDE sẽ đưa chúng ta đến liên kết tải xuống Microsoft SSMS. 
5. **Close**:  Ở đây sẽ thực hiện  đóng cửa sổ. Người dùng hiện đã sẵn sàng để cài đặt SSMS IDE theo hướng dẫn trong hướng dẫn SSMS.

**Kết luận:** 

Ở bài viết này đã hướng dẫn chi tiết cách cài đặt **SQL Server**. Hy vọng có thể giúp mọi người dễ dàng cài đặt để tìm hiểu 

Tài liệu tham khảo: https://www.guru99.com/download-install-sql-server.html