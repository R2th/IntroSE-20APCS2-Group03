### 1. Giới Thiệu
MySQL cho phép chúng ta có thể log lại các câu truy vấn tốn nhiều thời gian để thực hiện. Việc chạy một câu query tốn nhiều thời gian có thể do nguyên nhân dữ liệu lấy ra quá lớn. Tuy nhiên trong một số trường hợp khác thì việc chậm này đến từ nguyên nhân từ người viết câu query không thực hiện việc tối ưu hoá. Ví dụ như khi câu query truy vấn tìm kiếm từ bảng không được index hoặc sử dụng query lồng (nested query), thực hiện việc join nhiều bảng... Trên thực tế thì nguyên nhân thứ hai diễn ra rất phổ biến do khi phát triển ứng dụng thì các developer lại thường chính là những người viết các câu query SQL và không phải developer nào cũng rành về database. Do đó việc log các query chậm sẽ giúp chúng ta có thể kiểm tra và tìm nguyên nhân của việc query chạy chậm.
<br><br>
Trên MySQL database để log các query tốn nhiều thời gian bạn cần kích hoạt tính năng này thông qua hai cách khác nhau:
<br>
### 2. Cài đặt
Cài đặt trong file config của MySQL server. Cách này có ưu điểm ở chỗ bạn chỉ cần config một lần sau đó MySQL sẽ tự động log các query chậm tuy nhiên sẽ đòi hỏi bạn cần restart lại server.
Chạy câu lệnh SQL sử dụng MySQL client. Cách này có ưu điểm là bạn không cần restart lại MySQL server nhưng lại có nhược điểm là chỉ áp dụng với session kết nối tới MySQL server hiện tại từ client nếu client này kết thúc session thì việc log query chậm cũng sẽ kết thúc.
### 2.1 Kích Hoạt Sử Dụng File Cài Đặt
Bạn sử dụng một text editor để mở file config của MySQL server (nếu sử dụng Linux thì file này thường nằm ở` /etc/mysql/my.cnf`) và sau đó thêm các dòng sau:
```
slow-query-log = 1
slow-query-log-file = /var/log/mysql/mysql-slow.log
long_query_time = 1
log-queries-not-using-indexes
```
Ý nghĩa của từng thiết lập phía trên:<br>

1. sql-query-log=1: Kích hoạt tính năng log các truy vấn chậm<br>
1. slow-query-log-file=...: Thiết lập vị trí file log.<br>
1. long_query_time=1: Quy định mốc thời gian mà ở đó một query được coi là chậm.<br>
1. log-queries-not-using-indexes: Log tất cả các query chậm không sử dụng index ngay cả khi query này không vượt quá mốc log_query_time ở trên.<br>

Bạn có thể bỏ qua cần thiết lập cuối cùng log-queries-not-using-indexes nếu muốn. Ngoài ra thì nếu server bạn có it RAM bạn cũng nên xem xét tăng mộc thời gian trong thiết lập long_query_time.
<br><br>
Với cách này thì để việc kích hoạt tính năng log slog querry bạn cần khởi động lại MySQL server. Nếu sử dụng Ubuntu Linux câu lệnh khởi động lại MySQL database sẽ như sau:

>$ sudo service restart mysql

Trên CentOS hoặc Redhat:
> $ sudo /etc/rc.d/init.d/mysqld restart

### 2.2 Kích Hoạt Thông Qua Chạy Câu Lệnh Sử Dụng MySQL Client
Với cách làm này bạn cần đăng nhập vào MySQL server sử dụng MySQL Client dưới user có quyền admin. Ví dụ dưới đây sẽ thực hiện việc đăng nhập vào MySQL server sử dụng user root:
> $ mysql -u root -p

Việc kích hoạt log slow query cũng như đặt các thiết lập liên quan khác thông qua MySQL client được thực hiện bằng cách gán giá trị cho các biến GLOBAL của MySQL sử dụng câu lệnh SET.
<br>
Chạy câu lệnh dưới đây để bật chế độ log slow query trên MySQL database server:
> set global slow_query_log = 'ON';

Bạn có thể thay giá trị ON ở thiết lập trên bằng 1.
<br>
Để thiết lập vị trí của file log bạn chạy câu lệnh:

> set global slow_query_log_file ='/var/log/mysql/slow-query.log';
> 
Để thiết lập mốc thời gian được dùng làm ngưỡng xác định một query là chậm hay không bạn chạy câu lệnh:

> set global long_query_time = '20'; // 20 giây - mặc định là 10
> 
Thay 20 ở trên bằng một mốc thời gian thích hợp với cấu hình server của bạn. Lưu ý với các server có dung lượng RAM ít bạn nên tăng mốc thời gian này lên.

Để log các query không sử dụng index (tuỳ ý) bạn chạy câu lệnh sau:

> set global log_queries_not_using_indexes = 'ON'
> 
Để kiểm tra lại giá trị của các biến global vừa được gán giá trị:

> show variables like '%slow%';
> 
Tới đây chúng ta đã cùng nhau tìm hiểu hai cách khác nhau để kích hoạt tính năng log slow query trong MySQL. Ở các bài viết tiếp theo chúng ta sẽ tìm hiểu cách phân tích nguyên nhân tại sao một câu SQL lại chậm.