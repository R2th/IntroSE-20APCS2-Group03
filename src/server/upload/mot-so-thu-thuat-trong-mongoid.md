# Một số thủ thuật trong mongoid
1. Về Mongoid
2. Cài đặt Mongoid
3. Mẹo và thủ thuật trong Mongoid
4. Cài đặt thời gian chờ trong cấu hình Mongoid
5. Sử dụng no_timeout khi truy vấn tốn nhiều thời gian chờ
6. Lưu ý quản lý kết nối khi sử dụng sidekiq
7. Kết
## 1. Về Mongoid
-  Mongoid là một Ruby Object Document Mapper (ODM). 
-  Đối với relational, ODM tương đương với MongoDB của Object Relational Mappers (ORM). 
-  Một lý do chính mà các nhà phát triển sử dụng ODM như Mongoid là nó mang lại cho họ khả năng xác định một lược đồ cho tài liệu của họ, sau đó có thể được sử dụng để ánh xạ tài liệu với các đối tượng trong ngôn ngữ lập trình của họ. 
-  Với Mongoid, tính năng này đóng vai trò là bước chuyển đổi dễ dàng cho các nhà phát triển Ruby on Rails đã từng làm việc với ActiveRecord.
-  Mongoid là trình điều khiển mongodb cấp thấp hơn mà nó được viết ở trên
-  Mongoid còn là một trong những trình điều khiển ngôn ngữ chính duy nhất không được viết bởi MongoDB, Inc., là trình điều khiển hỗ trợ cho Ruby phổ biến nhất 
## 2. Cài đặt Mongoid
- Dưới đây là cấu hình Mongoid cơ bản 
- Ngoài ra các bạn có thể tham khảo thêm các options tại [đây](https://docs.mongodb.com/mongoid/current/tutorials/mongoid-configuration/)
```
development:
  sessions:
    default:
      database: db_dev

      hosts:
        - localhost:27017
      options:
        # Change whether the session persists in safe mode by default.
        # (default: false)
        # safe: false
        # Change the default consistency model to :eventual or :strong.
        # :eventual will send reads to secondaries, :strong sends everything
        # to master. (default: :eventual)
        consistency: :strong

test:
  sessions:
    default:
      database: db_test
      hosts:
        - localhost:27017
      options:
        consistency: :strong
        
        # The timeout in seconds for selecting a server for an operation. (default: 30)
        server_selection_timeout: 30


staging:
  sessions:
    default:
      database: db_staging
      hosts:
        - localhost:27017
      options:
        consistency: :strong
        
        # The timeout in seconds for selecting a server for an operation. (default: 30)
        server_selection_timeout: 30

production:
  sessions:
    default:
      database: db_staging
      hosts:
        - localhost:27017
      options:
        consistency: :strong
        
        # The timeout in seconds for selecting a server for an operation. (default: 30)
        server_selection_timeout: 30
```
## 3. Mẹo và thủ thuật trong mongoid
***Mặc định, Mongoid đọc từ secondary***
- Mongoid hỗ trợ hai chế độ tùy chọn read là primary and secondary
- Nếu bạn sử dụng cài đặt mặc định của Mongoid, Mongoid sẽ read từ secondary. Điều này thường không mong muốn vì một số lý do. 
- Đặc biệt, khi read từ secondary có thể dẫn tới một số vấn đề:

*1. Read dữ liệu cũ bởi vì secondary chưa kịp đồng bộ từ primary. Do đó, các truy vấn phụ có thể không phản ánh chính xác những thay đổi so với các hoạt động cơ sở dữ liệu trước đó và có thể trả về kết quả không mong muốn. Vì vậy cần xem xét kĩ tính nhất quán nếu bạn muốn read từ secondary*

*2. Read chậm hoặc không thành công trong quá trình tạo chỉ mục bởi vì MongoDB chỉ hỗ trợ xây dựng chỉ mục nền trước dựa trên secondary, điều này sẽ chặn các hoạt động khác trong khi các chỉ mục đang xây dựng. Nếu bạn bắt đầu xây dựng chỉ mục trên một triển khai đang chạy, các truy vấn bạn gửi đến secondary sẽ bị treo.*

*3. Read chậm hoặc không thành công trong khi backups or snapshots. Hầu hết các kỹ thuật sao lưu liên quan đến việc khóa hoặc dừng một secondary MongoDB instance. Nếu bạn đang sử dụng các truy vấn read secondary mà bạn gửi đến secondary sẽ bị treo.*

*4. Một nút primary bị quá tải, nếu một nút secondary gặp trục trặc hoặc không thể truy cập được. Việc chuyển hướng đọc đến thiết bị thứ cấp làm tăng thông lượng đọc và giảm tải trên thiết bị chính. Tuy nhiên, khi một nút phụ bị lỗi, tất cả các lần đọc và ghi đều được cấp cho nút primary. Các hoạt động bổ sung này có thể làm tăng đáng kể tải và đổ vỡ cơ sở dữ liệu.*
## 4. Cài đặt thời gian chờ trong cấu hình Mongoid
```
:server_selection_timeout: nên đặt giá trị này thấp (ví dụ: 1)
```

- Nếu máy chủ MongoDB của bạn đang chạy cục bộ và bạn khởi động nó theo cách thủ công. Thời gian chờ lựa chọn máy chủ thấp sẽ khiến trình điều khiển nhanh chóng bị lỗi khi không có máy chủ chạy.
- Dưới đây là cấu hình mẫu được đề xuất cho local:
```
development:
  clients:
    default:
      database: mongoid
      hosts:
        - localhost:27017
      options:
        server_selection_timeout: 1
```
## 5. Sử dụng no_timeout khi truy vấn tốn nhiều thời gian chờ
- Hầu hết các trình điều khiển MongoDB đều có các cài đặt riêng biệt cho thời gian chờ kết nối (thời gian chờ thiết lập kết nối) và thời gian chờ socket (thời gian chờ phản hồi từ cơ sở dữ liệu khi phát hành các hoạt động cũng như như truy vấn). Điều này có thể có vấn đề vì bạn thường muốn thời gian chờ kết nối ngắn và hữu hạn nhưng thường thì bạn sẽ đợi lâu hơn (thường là vô thời hạn) cho kết quả từ các truy vấn.
- Với cài đặt thời gian chờ kết nối được khuyến nghị là 30 giây, bạn có thể thấy trình điều khiển của mình sớm từ bỏ các truy vấn kéo dài hơn 30 giây.
- May mắn thay mongoid có tùy chọn no_timeout có thể được sử dụng cho những trường hợp cụ thể này.
ví dụ:
```
Users.all.no_timeout.each do |user|
   user.posts.count
end
```

## 6. Lưu ý quản lý kết nối khi sử dụng sidekiq
- Khi sử dụng Sidekiq (cho các công việc xử lý nền) cùng với Mongoid, điều quan trọng cần lưu ý là mỗi công việc sẽ nhắc nhở việc tạo một kết nối mới
- Có thể điều chỉnh max_pool_size để phù hợp
## 7. Kết
- Trên đây là một số tips and tricks trong mongoid, mình sẽ tổng hợp thêm và hi vọng sẽ có phần tiếp theo. Cảm ơn mọi người đã đón đọc !