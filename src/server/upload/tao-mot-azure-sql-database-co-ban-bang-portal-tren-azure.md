### Giới thiệu về SQL Database trên Azure
Azure SQL Database là một nền tảng hoàn toàn gống như một công cụ quản lí khác về dịch vụ cơ sở dữ liệu (PaaS) và cũng xử lý hầu hết các chức năng quản lý cơ sở dữ liệu tự động và không cần sự tham gia của người dùng như : patching, backups, và monitoring...<br>
Với Azure SQL Database chúng ta có thể tạo các lớp lưu trữ với hiệu suất cao có sẵn các ứng dụng , giải pháp trong Azure.<br>
Chúng ta có thể chạy Azure SQL Database trên hạ tầng tại chỗ hoặc trên dịch vụ đám mây với các lợi ích của Azure như tự động hóa, hỗ trợ không giới hạn, quản trị hợp nhất và tiết kiệm chi phí. <br>
Có 2 lựa chọn cho Azure SQL Database:
 + Single database: Là một cơ sở dữ liệu bình thường tương tự như một cơ sở dữ liệu chứa trong công cụ cơ sở dữ liệu SQL Server.
 + Elastic pool: Là một tập hợp các Single databas, có thể thêm 1 Single database hoặc đi chuyển Single database ra khỏi Elastic pool một cách dễ dàng.
Để tìm hiểu rõ hơn, cách dễ nhất chúng ta bắt đầu vào portal. Azure để tạo 1 SQL database. 
### Tạo một Azure SQL Database single database sử dụng portal
Điều kiện cơ bản: Đã phải có tài khoản Azure. <br>
- Bước 1: từ browser chọn vào trang https://portal.azure.com/#create/Microsoft.AzureSQL, ta được giao diện như bên hình. 
![](https://images.viblo.asia/c57f7462-2dd2-4ece-9e51-72f75d7bdfb7.png)
- Bước 2: Tiếp theo ta chọn SQL Database, chọn Resource Type - Single database. Sau đó chọn Create
![](https://images.viblo.asia/f0cd3ac1-3606-4e37-a5f0-6f87455164d5.png)
- Bước 3: Ở màn hình Create SQL Database phần Database details, chúng ta lần lượt điền vào các thông tin cơ bản theo yêu cầu. 
![](https://images.viblo.asia/54a3a8b8-8b7e-4785-bfb0-38239a22b344.png)
- Bước 4: Thiết lập New sever: Điền cái thông tin ở màn hình bên phải của Create SQL Database
- Bước 5: Mục [Want to use SQL elastic pool] chọn No
- Bước 6: Chọn Configure database. Thì sẽ được giao diện, serverless database, Chọn Serverless, và chọn Apply.
![](https://images.viblo.asia/9322f0eb-3bb0-4459-b8c4-fe16e00b9cef.png)
- Bước 7: Chọn  Next: Networking ở màn hình Create SQL Database
- Bước 8: Ở Networking, chọn Public endpoint.
- Bước 9: Ở Firewall rules, chọn Add current client IP address là Yes. 
![](https://images.viblo.asia/cd90befa-6cbb-4251-9d82-6bc1361bf559.png)
- Bước 10: Ở Additional settings,  Data source,  Use existing data, chọn Sample: chọn sample để ta có được database mẫu, để dễ dàng tìm hiểu hơn. 
![](https://images.viblo.asia/83f4c74f-6b6c-4f06-aa51-5dcaca1d7610.png)
- Bước 11: Chọn Review + create. Sau khi review xong thì chọn select. 
Ta có được database SQL Azure. <br><br>
*****Query trong database**<br>
Sau khi Database được tạo, chúng ta có thể sử dụng Query editor trên Azure để thực hiện các thao tác cơ bản như : thêm dữ liệu, tìm kiếm dữ liệu,...<br>

Bài viết này chỉ dừng lại ở việc thao tác tạo một database SQL trên Azure, mong kiến thức cơ bản này có thể giúp ích cho những bạn mới bắt đầu tìm hiểu nội dung này như mình. <br>
Cám ơn mọi người. <br><br>
Link tham khảo: https://docs.microsoft.com/en-us/azure/azure-sql/database/