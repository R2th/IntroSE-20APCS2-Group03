# Đặt vấn đề
A: Nếu bạn quá mệt mỏi với việc cài các IDE cho việc code của mình, hãy đến với PhpStorm!

B: Ừ, nếu code thì dùng PhpStorm được vậy tôi muốn quản lý cơ sở dữ liệu bằng PhpStorm được không? :upside_down_face:

A: Có. PhpStorm cũng là một `database tools` tuyệt vời.

B: Vậy tôi phải làm gì để có được điều tuyệt vời đó?

A: Cấu hình, đơn giản như đan giổ :joy_cat:

B: Nhưng tôi không biết đan giổ!! :crying_cat_face:

A: Uhm, vậy bạn có thể tham khảo cách đơn giản dưới đây để suy ra cách đan giổ.
# Database tools and SQL
## Cấu hình
PhpStorm có thể trở thành một `database tools` chỉ với việc `Enable` plugin `Database tools and SQL`. Chọn `File -> Setting -> Plugin`
 sau đó tìm kiếm SQL chọn `Database tools and SQL` chọn `Enable`. 

![](https://images.viblo.asia/53c07cae-b8d5-46ec-b662-d3d8d6dbb30c.png)

Sau đó chúng ta bắt đầu sử dụng thôi nào.
Tại thanh tool bar bên phải màn hình chúng ta có thể thấy Option `Database` đã xuất hiện click vào đó đẻ bắt đầu. 
Hoặc nếu không thấy, bạn có thể chọn `View -> Tool Windows -> Database`.

Tạo kết nối: Database connection

![](https://images.viblo.asia/41543cfc-d0b2-451c-91b6-4535bd5edad7.png)

Với `Database tools and SQL` , bạn có thể truy vấn, tạo và quản lý cơ sở dữ liệu. Cơ sở dữ liệu có thể hoạt động cục bộ, trên máy chủ hoặc trên Cloud. Plugin hỗ trợ MySQL, PostgreSQL, Microsoft SQL Server, SQLite, MariaDB, Oracle, Apache Cassandra và các công cụ khác. Xem danh sách đầy đủ các nhà cung cấp được hỗ trợ trong Kết nối với cơ sở dữ liệu.

![](https://images.viblo.asia/673d2146-c5c1-4c3f-8e33-acd73248ff60.png)
 
 Cấu hình theo nhu cầu, ở đây mình cấu hình máy local, username root, database laravel.
 Hãy ấn `Test Conneciton` để kiểm tra xem đã kết nối được đến cơ sở dữ liệu hay chưa. 

Sau khi đã tạo được connection đến máy chủ cục bộ, chúng ta có thể tạo một database mới bằng cách click chuột phải vào `schemas` chọn `New` -> `schema`...
Tại đây chúng ta có thể tiếp tục `New` table hay import database bằng cách click chuột phải vào một schema hoặc table và chọn `Import Data from File`. (Thường khi `Export` sẽ vào thư mục /home/{username}/dumps nên có thể bạn chọn import file có trong này)

Mặt khác trong máy chủ của bạn đã có sẵn cơ sở dữ liệu thì chúng ta có thể show nó lên bằng cách chọn chuột phải và chọn `Database tools -> Manage Shown Schemas` tiếp tục chọn ALL hoặc từng database muốn hiện.

Bây  giờ chúng ta đã xong bước kết nối!
Bắt đầu tạo cơ sở dữ liệu cho bảng
![](https://images.viblo.asia/b1101155-d230-4456-8055-cbebb16129e2.png)

Thêm dữ liệu cho bảng qua `Add New Row` hoặc `Alt + Insert`  xong `Ctr + Enter` để thêm
![](https://images.viblo.asia/0c82a5f1-b9e3-4ca8-87cf-34d8baaf7ae7.png)

Chúng ta cũng có thể edit bảng, chỉnh khóa chính... bằng cách nhấp trực tiếp vào tên bảng.

Để tạo một truy vấn trong bảng, hãy nhấn biểu tượng `QL` trên thanh công cụ của `Database tool and SQL`, và bắt đầu gõ (PhpStorm đã hỗ trợ hầu hết các từ khóa truy vấn trong SQL). Khi chạy các query này màn hình console sẽ được hiển thị thông báo các câu lệnh được chạy, thời gian chạy và kết quả.

## Xem diagram
Một chức năng tuyệt vời của `Database tool and SQL` là có thể cho người dùng xem diagram của csdl hay thêm các bảng 
![](https://images.viblo.asia/24f7b8b3-138e-40e8-87fe-6995991d3f8e.png)

 có thể room phần diagram bằng cách giữ phím ALT + chuột trái

## Export database
Chọn table muốn export -> click chuột phải -> Dump Data to File -> chọn loại file muốn export
 ![](https://images.viblo.asia/443fdd35-afa4-454b-ae39-7c670ed134d8.png)

# Kết luận
Database tool and SQL :
 
* Tìm kiếm và sửa dữ liệu trực tiếp trên giao diện đồ họa
* Tự hoàn thiện câu truy vấn
* Phân tích và sửa lỗi nhanh
* Import/export file
* Hỗ trợ sinh biểu đồ

Dùng PhpStrorm để quản lý database cũng có đầy đủ các tính năng của các IDE chuyên biệt nên đừng ngần ngại khi sử dụng  :innocent:

Bạn có thể đọc thêm ở trang chủ của [jetbrains](https://www.jetbrains.com/help/phpstorm/relational-databases.html) để tìm hiểu thêm tính năng tuyệt vời này.
Cảm ơn bạn đã đọc :maple_leaf::maple_leaf::maple_leaf: