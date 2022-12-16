SQL injection (SQLi) là một trong những lỗ hổng web được biết đến nhiều nhất. Hầu như tất cả các chuyên gia bảo mật đều quen thuộc với nó. Đôi khi ngay cả những nguồn ít liên quan cũng có nhắc tới lổ hổng dạng SQLi.

Tuy rằng đã rất phổ biến và xuất hiện trong nhiều năm, SQLi vẫn tiếp tục ảnh hưởng đến nhiều ứng dụng web cả mới phát triển hay đã được xây dựng từ lâu.

Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu những kiến thức cơ bản nền tảng về lỗ hổng SQL injection (SQLi).

# 1. Nguồn gốc của SQL injection
Công cụ thông dụng nhất được sử dụng để lưu trữ dữ liệu cho các ứng dụng là các cơ sở dữ liệu quan hệ dạng SQL. Vì nhiều lý do khác nhau, các ứng dụng thường xuyên sử dụng các cơ sở dữ liệu SQL để lưu trữ, truy xuất, thêm mới hay chỉnh sửa các dữ liệu cần thiết. Các ứng dụng web cũng không ngoại lệ.

Lỗ hổng xuất phát từ việc các ứng dụng cho phép người dùng nhập truy xuất dữ liệu được lưu trữ bằng một truy vấn động do người dùng nhập vào. Điều này cho phép các truy vấn độc hại có thể được thực thi trong quá trình truy vấn dữ liệu. Hậu quả là kẻ tấn công có thể truy xuất dữ liệu lưu trữ trái phép, thay đổi, thêm mới hay xóa dữ liệu trong cơ sở dữ liệu một cách trái phép. Khi đó mối đe dọa về việc lộ các dữ liệu nhạy cảm, quan trọng như thông tin khách hàng, các loại dữ liệu cá nhân, bí mật kinh doanh, sở hữu trí tuệ, ... là rất lớn.
# 2. Cơ sở dữ liệu quan hệ
Để hiểu rõ về SQLi, trước tiên, chúng ta sẽ nêu lại một chút về cơ sở dữ liệu quan hệ. Các cơ sở dữ liệu quan hệ và hệ sinh thái hỗ trợ cho chúng - các hệ quản trị cơ sở dữ liệu quan hệ (Relational Database Management Systems - RDBMS) đang phát triển rất mạnh. Tuy rằng chúng ta chỉ nói đến SQL injection một cách tổng quát, nhưng trên thực tế có nhiều khía cạnh liên quan của SQLi phụ thuộc vào đặc tính của RDBMS được sử dụng (ví dụ như Oracle Database, MySQL, MS SQL server, PostgreSQL, ...).

Chúng ta cần tìm hiểu thêm một chút về SQL. Những động từ sau đây là những động từ SQL phổ biến nhất và được hỗ trợ rộng rãi bởi các RDBMS:
* **SELECT** - truy vấn dữ liệu từ một bảng
* **INSERT** - thêm dữ liệu vào bảng
* **UPDATE** - chỉnh sửa dữ liệu đã có
* **DELETE** - xóa dữ liệu trong một bảng
* **DROP** - xóa một bảng
* **UNION** - ghép dữ liệu từ nhiều truy vấn với nhau

Tiếp theo chúng ta sẽ xét tới những từ khóa dùng để tùy chỉnh  truy vấn hay gặp nhất trong SQL:
* **WHERE** - bộ lọc SQL được sử dụng khi có điều kiện đi kèm
* **AND/OR** - kết hợp với từ khóa WHERE để làm truy vấn cụ thể hơn
* **LIMIT #1, #2** - Giới hạn lượng dữ liệu trả về #2 bắt đầu từ vị trí #1 (Ví dụ LIMIT 3,2; sẽ trả về 2 dòng dữ liệu thứ 4 và 5.)
* **ORDER BY** - sắp xếp dữ liệu theo cột

Từ khóa WHERE được sử dụng ở khắp mọi nơi. Trên thực tế, vị trí từ khóa WHERE chính là nơi mà chúng ta dễ dàng tìm ra SQL injection nhất, vì đó là nơi mà dữ liệu đầu vào được cung cấp và tìm kiếm.

## Các ký tự đặc biệt trong SQL
Mỗi RDBMS có hệ thống các ký tự đặc biệt riêng cho các mục đích cụ thể. Tuy nhiên có những mục đích có thể có nhiều ký tự cùng được sử dụng.
![](https://images.viblo.asia/849b0172-7ff7-4a50-9650-25d60662ca5d.jpg)

# Ví dụ SQL injection
Chúng ta sẽ cùng nhau xét một ví dụ đơn giản về SQL injection để hiểu về lỗ hổng bảo mật này:
## Đoạn mã code:
Giả sử chúng ta sử dụng PHP cho server-side, để lấy giá trị tham số *name* từ đường dẫn làm input cho truy vấn SQL ta sẽ sử dụng đoạn code sau:
```
$sql = "SELECT * FROM Users WHERE lname='$_GET["name"]'";
```

## Sử dụng input thông thường
**INPUT:** Hula

**URL:** http://web.org/sqli.php?name=Hula

**SQL Query:**  ```SELECT * FROM Users WHERE lname='Hula';```

**Kết quả:** Kết quả truy vấn trả về bình thường

## Sử dụng input gây lỗi
**INPUT:** Hula'

**URL:** http://web.org/sqli.php?name=Hula'

**SQL Query:**  ```SELECT * FROM Users WHERE lname='Hula'';```

**Kết quả:** Người dùng sẽ nhận được thông báo lỗi SQL Syntax do hai dấu nháy thừa cuối truy vấn gây nên.

## Xử lý input gây lỗi bằng comment
**INPUT:** Hula'; -- 

**URL:** http://web.org/sqli.php?name=Hula';&--&

**SQL Query:**  ```SELECT * FROM Users WHERE lname='Hula'; -- ;```

**Kết quả:** Kết quả truy vấn trả về bình thường

## Sử dụng input độc hại
**INPUT:** ' OR 1=1; --

**URL:** http://web.org/sqli.php?name='&OR&1=1;&--& 

**SQL Query:**  ```SELECT * FROM Users WHERE lname='' OR 1=1; -- ';```

**Kết quả:** Truy vấn trả về tất cả dữ liệu trong bảng Users do điều kiện 1=1 luôn đúng.

# Kết luận
Dù đã rất phổ biến nhưng SQLi vẫn luôn là lỗ hổng tiềm tàng rất nguy hiểm và có thể dẫn đến những tổn thất rất nghiêm trọng nếu như bị kẻ xấu khai thác. Vì vậy nên hiểu về SQL injection và biết cách phòng tránh nó là rất quan trọng với các nhà phát triển ứng dụng nói chung và phát triển ứng dụng web nói riêng.

Trong các bài viết tới chúng ta sẽ tìm hiểu kỹ hơn về các cách phát hiện lỗ hổng SQLi và một số biện pháp xử lý lỗ hổng loại này.

# Nguồn tham khảo
Internet và SANS SEC542-2016.