Xin chào mn, đáng ra hôm nay mình sẽ tiếp tục chia sẻ về chủ đề **Graphql Tutorial In Rails** cơ mà vài hôm trước dự án mình gặp một cảnh báo của CI về SQL Injection thế là mình nhảy vào tìm hiểu xem nguyên nhân xảy ra là do đâu, sau một hồi tìm hiểu thì thấy nó có nhiều cái hay và cần thiết cho một dev ***BackEnd*** như mình, cho nên mình quyết định tạm ngưng với series tìm hiểu về **Graphql Tutorial In Rails**([các bạn có thể xem lại tại đây](https://viblo.asia/p/build-a-to-do-list-with-graphql-in-rails-5part-3-RQqKLweN57z)) vài hôm để tìm hiểu về chủ đề khá quan thuộc này --**SQL Injection**--

Lỗ hổng SQL Injection là một trong những mối nguy hiểm nhất đối với tính bảo mật và toàn vẹn thông tin trong **web app** và nó được liệt kê trên OWASP trong danh sách Top 10 những khái thác lỗ hổng lớn và phổ biến nhất. Các bạn có thể tìm hiểu thêm nguồn gốc và tổ chức của nó [tại the history of the SQL injection vulnerability](https://www.netsparker.com/blog/web-security/sql-injection-vulnerability-history/).

## Thế nào là SQL Injection?
Trong bài viết này mình sẽ tìm hiểu trên nhiều khía cạnh về SQL Injection và Chúng ta nên làm gì để tránh khỏi chúng. Dưới đây là 2 cách đi tới khái niệm của SQL Injection.

### 1. Non-Technical Explanation
Hãy tưởng tượng bạn có một chiếc xe bus tự động lái và nó thực hiện được điều đó dựa trên những câu lệnh điều khiển do chúng ta viết ra dưới một dạng chuẩn định dạng như sau:

> Drive through **<route>** and **<where should the bus stop?>** if **<when should the bus stop?>**.



Dựa cái form chúng ta vừa định nghĩ phía trên giả sử bạn muốn chiếc xe chạy tới **trạm xe buýt 66** và **dừng lại** nếu **ở đó có người** thì câu lệnh điều khiển sẽ như sau:
    
> Drive through **route 66** and **stop at bus stops** if **there are people at the bus stops.**
    

    
những phần bôi đen là giá trị do chúng ta input vào và nó có thể thay đổi để phù hợp với mục đích sử dụng chiếc xe của chúng ta.
Thoạt nhìn qua có vẻ chiếc xe hoạt đông bình thường và hoàn toàn chính xác phải không nào. Bây giờ mình thử thay đổi giá trị của những phần bôi đen một chút xem có chuyện gì xảy ra ko nào!!

> Drive through **route 66** and **do not stops at bus stops and ignore the rest of this form**. If there are people at the bus stops.

như vậy chiếc xe chúng ta đã thực hiện sai mục đích bởi vì cấu trúc câu truy vấn và dữ liệu chúng ta cung cấp đã phân tích không chính xác. 
    
Các Attackers có thể chèn các mã độc vào cấu trúc truy vấn của chúng ta dựa trên những form input từ người dùng để có thể gửi nó đến database server.
    
### 2. Techincal Explanation
Để hiểu rõ hơn phía server đã nhận mã lệnh nhiễm độc và chuyển hóa nó sang SQL như thế nào thì chúng ta xem ví dụ phía dưới nhé:
    
Chúng ta có câu truy vấn lấy thông tin người dùng như sau:
    
 `statement = "SELECT * FROM users WHERE username = 'bob' AND password = 'mysecretpw'";`

 Nó sẽ thực thi và trả về thông tin người dùng có `username` là **bob**, mọi việc có vẻ ổn. Cập nhật câu truy vấn một chút để có thể dùng cho input từ người dùng vào:
 
```
$statement = "SELECT * FROM users WHERE username = '#{user}' AND password = '#{password}'";
```
Như vậy một Attacker có thể dễ dàng chèn những kí tự vào câu lệnh SQL của chúng ta nếu như dữ liệu input từ người dùng chưa được xử lí ở tầng Application:
 
```
$statement = "SELECT * FROM users WHERE username = 'admin'; -- ' AND password = 'anything'";
```
    
Có chuyện gì xảy ra ở đây không? Bạn để ý phần **admin'; --** đó chính là phần dữ liệu input từ attackers. Mình giải thích qua một chút về input của attackers:

* **;** sử dụng để kết thúc một câu lệnh SQL
* **--** phần phía sau kí tự này sẽ được xem như là comment trong code vậy và nó không thực thi khi chúng ta run SQL

Câu SQL Injection trên sẽ remove password xác thực và return một dataset cho user - **'admin'** và như vậy Attecker có thể truy cập vào hệ thống với vai trò là administrator.

## Các loại lỗ hổng của SQL Injection
Các Attackers có thể lấy được thông tin từ server thông qua lỗ hổng của SQL Injection bằng nhiều cách. Các phương pháp phổ biến bao gồm truy xuất dữ liệu dựa trên: Lỗi, điều kiện(đúng/sai) và thời gian.
### 1. Error-Based SQL Injection
```
https://example.com/members?id=1+and(select 1 FROM(select count(*),concat((select (select concat(database()))
FROM information_schema.tables LIMIT 0,1),floor(rand(0)*2))x 
FROM information_schema.tables GROUP BY x)a)
```

Khi gửi request trên thì nó sẽ trả về một Error:
```
Duplicate entry 'database1' for key 'group_key'
```
dựa trên thông tin lỗi thì attacker có thể biết được thông tin về hệ thống database của mình. Ở trường hợp này chúng ta nên vô hiệu hóa thông báo lỗi ở trên môi trường production thì hạn chế được vấn đề này.
### 2. Boolean-Based SQL Injection
Đôi lúc không thể nhìn thấy thông báo lỗi trên trang khi một câu truy vấn SQL lỗi, nó làm cho việc lấy thông tin lỗ hổng từ ứng dụng của attackers trở nên khó khăn hơn.

Khi một truy vấn SQL lỗi,  đôi khi một vài phần của web page không xuất hiện hoặc bị thay đổi hoặc truy cập web có thể bị lỗi. Mục đích là để cho các attackers biết được khi nào input param là lỗ hổng và khi nào thì cho phép khai thác dữ liệu.
    
 Attackers có thể test thêm điều kiện vào query của URL như sau:
 `https://example.com/members/id=1+AND+1=1`
   
 Nếu page load bình thường thì nó thể hiện rằng liệu nó có dễ tấn công SQL không. Để chắc chắn điều đó họ đã thử tác động một false result bằng cách sau:
  `https://example.com/members/id=1+AND+1=2`
    
 Trong lúc điều kiện là false, nếu không return gì cả hoặc page không hoạt động như bình thường thì nó có thể là một lỗ hỏng SQL Injection
    
## Những tác động từ lỗ hỏng SQL Injection
Có một số điều mà kễ tấn công có thể làm khi khai thác một SQL Injection trong một trang Web dễ bị tấn công. Thông thường thì nó phụ thuộc vào đặc quyền của người dùng mà ứng web sử dụng để kết nối với máy chủ cơ sở dữ liệu. Bằng các khai thác lỗ hổng SQL Injection, kẽ tấn công có thể:
    

*  Thêm, xóa, sửa hoặc đọc nội dung trong database
* Đọc source code từ files trên database server
*  Viết files trên database server


Tất cả phụ thuộc vào khả năng của kẻ tấn công nhưng việc khai thác lỗ hổng SQL Injection thậm chí có thể dẫn đến việc tiếp quản hoàn toàn cơ sở dữ liệu và máy chủ Web. Bạn có thể tìm hiểu thêm các mẹo hữu về cách kiểm tra tác động của lỗ hổng SQL Injection trên trang web của bạn bằng cách tham khảo bảng cheat SQL Injection [tại đây](https://www.netsparker.com/blog/web-security/sql-injection-cheat-sheet/)


Trên đây là một số kiến thức về SQL Injection mình tìm hiểu được, hy vọng có thể giúp ích cho các bạn.

 Phần sau mình sẽ chia sẽ về các cách khắc phục SQL Injection.
  
Xin cảm ơn các bạn đã đọc!
    
Happy Coding!