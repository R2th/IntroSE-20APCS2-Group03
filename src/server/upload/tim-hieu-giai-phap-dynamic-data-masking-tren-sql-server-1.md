# Tổng quan về Dynamic Data Masing
## I. Khái niệm và phân loại
### 1.1 Khái niệm
Dynamic Data Masking(DDM) là giải pháp giúp hẹn chế việc tiếp xúc dữ liệu nhạy cảm bằng cách che giấu dữ liệu đối với người dùng không có đặc quyền. DDM được sử dụng để đơn giản hóa rất nhiều thiết kế và mã hóa
bảo mật trong các ứng dụng.

Che giấu dữ liệu động giúp ngăn chặn truy cập trái phép vào dữ liệu nhạy cảm bằng cách cho phép khách hàng chỉ định lượng dữ liệu nhạy cảm được hiển thị với tác động tối thiểu trên ứng dụng. DDM có thể được cấu hình trên cơ sở dữ liệu để ẩn dữ liệu nhạy cảm trong tập kết quả truy vấn, trên các trường cơ sở dữ liệu được chỉ định, trong khi dữ liệu trong cơ sở dữ liệu không bị thay đổi.

Che giấu dữ liệu động rất dễ sử dụng với các ứng dụng hiện có, vì các quy tắc che giấu được áp dụng trong các kết quả truy vấn. Nhiều ứng dụng có thể che giấu dữ liệu nhạy cảm mà không cần sửa đổi các truy vấn hiện có.
![](https://images.viblo.asia/b36ba1d5-bdb8-4733-a6db-f3ee800049d4.png)

### 1.2 Phân loại
DDM cung cấp cho người dùng 4 giải pháp chính:

• Tạo ra các chính sách che giấu dữ liệu trung tâm hoạt động trực tiếp trên các trường nhạy cảm trong cơ sở dữ liệu.

• Chỉ định người dùng hoặc vai trò đặc quyền có quyền truy cập vào dữ liệu nhạy cảm.

• DDM có đầy đủ chức năng che che giấu và che giấu một phần, cũng như che giấu ngẫu nhiên cho dữ liệu số.

• Các lệnh Transact-SQL đơn giản xác định và quản lý các che giấu.

Che giấu dữ liệu động không nhằm mục đích ngăn người dùng cơ sở dữ liệu kết nối trực tiếp với cơ sở dữ liệu và chạy truy vấn đầy đủ để hiển thị các phần dữ liệu nhạy cảm. Che giấu dữ liệu động bổ sung cho các tính năng bảo mật khác của SQL Server (kiểm tra, mã hóa, bảo mật mức hàng ...) và rất khuyến khích sử dụng tính năng này cùng với chúng để bảo vệ dữ liệu nhạy cảm trong cơ sở dữ liệu tốt hơn.

Che giấu dữ liệu động có sẵn trong SQL Server 2016 (13.x) và Cơ sở dữ liệu SQL Azure, và được cấu hình bằng cách sử dụng lệnh Transact-SQL. Để biết thêm thông tin về cấu hình che giấu dữ liệu động bằng cách sử dụng cổng Azure, hãy xem Bắt đầu với che giấu dữ liệu động cơ sở dữ liệu SQL ( Azure portal)

### 1.3 Phân tích chức năng và các trường hợp sử dụng Dynamic Data Masking
1.3.1 Chức năng
Như đã đề cập ở trên thì DDM cung cấp cho người dùng 4 giải pháp chính:

• Tạo ra các chính sách masking dữ liệu

• Cấp quyển cho người dùng truy vấn dữ liệu

• Các loại masking được sử dụng

• Các lệnh Transact-SQL và quản lí tiến trình masking

![](https://images.viblo.asia/18767578-4045-4373-8af2-eb2bfef8694a.png)

Tạo che giấu trên cột không ngăn cập nhật dữ liệu cho cột đó. Vì vậy, mặc dù người dùng nhận được dữ liệu bị che giấu khi truy vấn cột có che giấu, cùng một người dùng có thể cập nhật dữ liệu nếu họ có quyền ghi. Chính sách kiểm soát quyền truy cập thích hợp vẫn nên được sử dụng để giới hạn quyền cập nhật.

1.3.2 Các chính sách Masking
DDM cung cấp 4 qui tắc Masking có sẵn

• Default masking

• Email masking

• Random masking

• Partial masking


| Chức năng | Miêu tả | Ví dụ |
| -------- | -------- | -------- |
|   Default (mặc định) |  + Đối với các kiểu dữ liệu chuỗi, hãy sử dụng XXXX hoặc XXX nếu kích thước của trường nhỏ hơn 4 ký tự (char, nchar, varchar, nvarchar, văn bản, ntext). <br><br> + Đối với các kiểu dữ liệu số sử dụng giá trị bằng không (bigint, bit, decimal, int, money, numeric, smallint, smallmoney, tinyint, float, real). <br><br>+ Đối với các kiểu dữ liệu ngày và thời gian sử dụng 01.01.1900 00: 00: 00.0000000 (ngày, datetime2, datetime, datetimeoffset, smalldatetime, time). <br><br> + Đối với các kiểu dữ liệu nhị phân, sử dụng một byte đơn giá trị ASCII 0 (nhị phân, varbinary, hình ảnh).  | Ví dụ cú pháp định nghĩa cột: Phone varchar(12) MASKED WITH (FUNCTION = 'default()') NULL <br><br> Ví dụ cú pháp thay đổi: ALTER COLUMN Gender ADD MASKED WITH (FUNCTION = 'default()')  |
| Email | Phương thức che giấu hiển thị chữ cái đầu tiên của địa chỉ email và hậu tố liên tục ".com", dưới dạng địa chỉ email.aXXX@XXXX.com.| Email varchar(100) MASKED WITH (FUNCTION = 'email()') NULL <br><br>Ví dụ cú pháp thay đổi: ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()' |
|Random  |Một hàm che giấu ngẫu nhiên để sử dụng trên bất kỳ loại số nào để che dấu giá trị ban đầu với một giá trị ngẫu nhiên trong một phạm vi được chỉ định. | Ví dụ cú pháp định nghĩa: Account_Number bigint MASKED WITH (FUNCTION = 'random([start range], [endrange])') <br><br>Ví dụ cú pháp thay đổi ALTER COLUMN [Month] ADD MASKED WITH (FUNCTION = 'random(1, 12)') |
|Partial (chuỗi tùy chỉnh)| Phương thức tạo che giấu hiển thị các chữ cái đầu tiên và cuối cùng và thêm một chuỗi đệm tùy chỉnh ở giữa .prefix,[padding],suffix. <br><br>Lưu ý: Nếu giá trị ban đầu quá ngắn để hoàn thành toàn bộ che giấu, một phần của tiền tố hoặc hậu tố sẽ không bị lộ.  |Ví dụ cú pháp định nghĩa: FirstName varchar(100) MASKED WITH (FUNCTION = 'partial(prefix,[padding],suffix)') NULL <br><br>Ví dụ cú pháp thay đổi: ALTER COLUMN [PhoneNumber] ADD MASKED WITH (FUNCTION ='partial(1,"XXXXXXX",0)') <br><br>Ví dụ bổ sung: ALTER COLUMN [PhoneNumber] ADD MASKED WITH (FUNCTION = 'partial(5,"XXXXXXX",0)') ALTER COLUMN [SocialSecurity Number] ADD MASKED WITH (FUNCTION = 'partial(0,"XXX-XX-",4)'|