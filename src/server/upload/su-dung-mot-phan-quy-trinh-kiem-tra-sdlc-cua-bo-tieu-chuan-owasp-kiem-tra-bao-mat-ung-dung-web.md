# PHẦN 1: LÝ THUYẾT
## I. Giới thiệu về OWASP
Penetration testing là quá trình kiểm tra bảo mật cho các ứng dụng web bằng cách giả lập các cuộc tấn công vào website để tìm kiếm và phát hiện các lỗ hổng, các vấn đề bảo mật trong website. Những người kiểm thử sẽ đóng vai trò là các hacker và giả lập các tấn công vào các trang web mục tiêu. 
### 1. Quy trình kiểm tra bảo mật OWASP (Dự án bảo mật ứng dụng web mở)
OWASP là một tiêu chuẩn để phục vụ việc kiểm thử của Penetration Testing(Pentest) do tổ chức Open Web Application Security Project(OWASP) đề xuất. OWASP là tổ chức phi lợi nhuận và đưa ra chuẩn OWASP phục vụ cho công việc pentest hiệu quả và chi tiết. 
Tổ chức phòng thủ ở các thiết bị mạng không chỉ giúp ngăn chặn mã độc xâm nhập vào mạng bằng cách khai thác thông tin và lỗ hổng, mà còn giúp chủ động ngăn cản những truy cập trái phép và không phù hợp vào hệ thống. Tuy nhiên, điều này không giúp các ứng dụng web tránh khỏi các cuộc tấn công, tin tặc có thể tấn công vào ứng dụng trước khi thực hiện tấn công vào hệ thống. Do vậy, cần có phương pháp kiểm tra, đánh giá các nguy cơ bảo mật cơ bản trên ứng dụng. OWASP được thực hiện với mục tiêu đó. Đây là dự án được phát triển bởi công đồng mở nhằm nâng cao nhận thức về bảo mật ứng dụng trong các tổ chức. OWASP cung cấp nhiều tài liệu hướng dẫn về các lĩnh vực khác nhau trong việc bảo mật ứng dụng:
- Các vấn đề về bảo mật ứng dụng (Application Security Desk Reference): Tài liệu này cung cấp các định nghĩa và mô tả về tất cả các khái niệm quan trọng, các loại lỗi, lỗ hổng, các phương pháp tấn công, phương pháp kiểm tra, các tác động kỹ thuật và tác động kinh doanh trong bảo mật ứng dụng. Đây là tài liệu tham chiếu cho tất cả các tài liệu hướng dẫn khác của OWASP.
- Hướng dẫn Phát triển (Developer’s Guide): Tài liệu này bao gồm tất cả các yếu tố bảo mật mà người phát triển ứng dụng cần quan tâm. Trong tài liệu cung cấp hàng trăm loại lỗ hổng phần mềm, có thể được sử dụng như một sách hướng dẫn mạnh mẽ về kiểm soát bảo mật.
- Hướng dẫn Kiểm tra (Testing Guide): Là tài liệu cung cấp về các quy trình và công cụ kiểm tra bảo mật ứng dụng. Cách sử dụng tài liệu tốt nhất là áp dụng vào việc kiểm tra điểm yếu bảo mật của một ứng dụng hoàn thiện.
- Hướng dẫn Kiểm tra mã nguồn (Code Review Guide): Kiểm tra ứng dụng bằng cách xem mã nguồn sẽ hỗ trợ phòng tránh cho ứng dụng khỏi các tác động bên cạnh việc kiểm tra từ bên ngoài. Người kiểm tra có thể chủ động lựa chọn cách thức tiếp cận với ứng dụng phù hợp nhất.
Ngoài ra, cộng đồng OWASP cũng giới thiệu tài liệu “OWASP Top 10”. Đây là một dự án tập trung vào phân loại 10 rủi ro bảo mật ứng dụng phổ biến nhất trong mối quan hệ với các tác động kỹ thuật và kinh doanh, đồng thời cung cấp các hướng dẫn cụ thể về cách thức kiểm tra, xác minh và khắc phục những điểm yếu bảo mật dễ gặp phải của ứng dụng. OWASP Top 10 chủ yếu tập trung giải quyết vấn đề về các nguy cơ phổ biến hơn là việc bảo mật trên một ứng dụng web hoàn thiện. Toàn bộ nội dung trong OWASP Top 10 được đăng tải tại địa chỉ: 
 www.owasp.org/index.php/Top10
### 2. Ưu điểm của phương pháp OWASP
Khuyến khích các nhà phát triển thực hành mã hóa an toàn bằng cách tích hợp kiểm tra an ninh ở từng giai đoạn phát triển. Điều này sẽ giúp cho các ứng dụng trong quá trình phát triển tránh được các lỗi và an toàn hơn.
Tài liệu Hướng dẫn Kiểm tra của OWASP cung cấp chi tiết về các kỹ thuật đánh giá, cung cấp một cái nhìn rộng hơn vào nhiều nền tảng công nghệ giúp người kiểm tra lựa chọn cách thức phù hợp nhất để tiến hành kiểm tra.
Tài liệu OWASP Top 10 cung cấp các hướng dẫn kỹ thuật giúp chống lại các cuộc tấn công và điểm yếu bảo mật phổ biến nhất và duy trì tính bảo mật (Confidentiality), tính toàn vẹn (Integrity) và tính sẵn sàng (Availability) của ứng dụng (CIA).
Cộng đồng OWASP cũng đã phát triển một số công cụ bảo mật và hướng dẫn sử dụng tập trung vào kiểm tra ứng dụng web một cách tự động. Một vài công cụ như: WebScarab, Wapiti, JBroFuzz và SQLiX. Các công cụ này cũng được cài đặt sẵn trong hệ điều hành BackTrack.
## II. Khung thử nghiệm OWASP
Khung kiểm tra này bao gồm các hoạt động sau đây sẽ diễn ra:
Giai đoạn 1: Trước khi bắt đầu phát triển
Giai đoạn 2: Trong quá trình định nghĩa và thiết kế
Giai đoạn 3: Trong quá trình phát triển
Giai đoạn 4: Trong quá trình triển khai
Giai đoạn 5: Bảo trì và vận hành
![](https://images.viblo.asia/c20927e1-47fc-4d5c-933d-fc287a9d25ad.gif)Quy trình thử nghiệm SDLC điển hình
# PHẦN 2: THỰC HÀNH - KIỂM TRA BẢO MẬT ỨNG DỤNG WEB
## I. Input Validation Testing - MySQL Testing
### 1. Tổng quan 
Các lỗ hổng SQL Injection xảy ra bất cứ khi nào đầu vào được sử dụng trong quá trình xây dựng truy vấn SQL mà không bị ràng buộc. Việc sử dụng SQL động (việc xây dựng các truy vấn SQL bằng cách nối các chuỗi) mở ra cơ hội cho các lỗ hổng này. Truy vấn SQL cho phép kẻ tấn công truy cập vào các máy chủ SQL. Nó cho phép thực thi mã SQL theo các đặc quyền của người dùng được sử dụng để kết nối với cơ sở dữ liệu.
Máy chủ MySQL có một vài đặc điểm để một số khai thác cần được tùy chỉnh đặc biệt cho ứng dụng này. 
### 2. Làm thế nào để kiểm tra 
Khi tìm thấy lỗ hổng SQL trong một ứng dụng được hỗ trợ bởi cơ sở dữ liệu MySQL, có một số cuộc tấn công có thể được thực hiện tùy thuộc vào phiên bản MySQL và đặc quyền người dùng trên DBMS.
MySQL đi kèm với ít nhất bốn phiên bản được sử dụng trong sản xuất trên toàn thế giới, 3.23.x, 4.0.x, 4.1.x và 5.0.x. Mỗi phiên bản có một bộ tính năng tỷ lệ thuận với số phiên bản.
•	Từ phiên bản 4.0: UNION
•	Từ phiên bản 4.1: Truy vấn con
•	Từ Phiên bản 5.0: Các thủ tục được lưu trữ, Các chức năng được lưu trữ và chế độ xem có tên là Information_SCHema
•	Từ phiên bản 5.0.2: Kích hoạt
Cần lưu ý rằng đối với các phiên bản MySQL trước 4.0.x, chỉ có thể sử dụng các cuộc tấn công Blind Boolean hoặc dựa trên thời gian, vì chức năng truy vấn phụ hoặc các câu lệnh UNION không được thực hiện.
Chúng tôi sẽ giả định rằng có một lỗ hổng SQL cổ điển, có thể được kích hoạt bởi một yêu cầu tương tự như yêu cầu được mô tả trong Phần về Kiểm tra SQL.
```
http://www.example.com/page.php?id=2
```
**a. Vấn đề trích dẫn đơn**
Trước khi tận dụng các tính năng của MySQL, phải xem xét cách các chuỗi có thể được biểu diễn trong một câu lệnh, vì thường các ứng dụng web thoát các dấu ngoặc đơn.
Thoát trích dẫn MySQL là như sau: 'Một chuỗi có \' trích dẫn \ ''
Đó là, MySQL diễn giải thoát các dấu nháy đơn (\ ') dưới dạng ký tự và không phải là ký tự đại diện.
Vì vậy, nếu ứng dụng, để hoạt động đúng, cần sử dụng các chuỗi không đổi, hai trường hợp sẽ được phân biệt:
1.	Ứng dụng web thoát các dấu ngoặc đơn ('=> \')
2.	Ứng dụng web không thoát khỏi dấu ngoặc đơn ('=>')
Trong MySQL, có một cách tiêu chuẩn để bỏ qua nhu cầu của dấu ngoặc đơn, có một chuỗi liên tục được khai báo mà không cần dấu ngoặc đơn.
Giả sử chúng ta muốn biết giá trị của một trường có tên 'mật khẩu' trong một bản ghi, với một điều kiện như sau:
1.	Mật khẩu như 'A%'
2.	Các giá trị ASCII trong một hex được nối:
mật khẩu THÍCH 0x4125
3.	Hàm char ():
mật khẩu THÍCH CHAR (65,37)
**b. Nhiều truy vấn hỗn hợp:**
Trình kết nối thư viện MySQL không hỗ trợ nhiều truy vấn được phân tách bằng ';' vì vậy không có cách nào để tiêm nhiều lệnh SQL không đồng nhất vào bên trong một lỗ hổng SQL tiêm đơn lẻ như trong Microsoft SQL Server.
Ví dụ, lần nhúng truy vấn sau sẽ dẫn đến lỗi:
```
1 ; update tablename set code='javascript code' where 1 --
```
**c. Thu thập thông tin**
Tất nhiên, điều đầu tiên cần biết là liệu có DBMS MySQL làm cơ sở dữ liệu phía sau hay không. Máy chủ MySQL có một tính năng được sử dụng để cho các DBMS khác bỏ qua một mệnh đề trong phương ngữ MySQL. Khi một khối nhận xét ('/ ** /') có dấu chấm than ('/ *! Sql ở đây * /'), nó được MySQL giải thích và được coi là một khối bình luận bình thường bởi các DBMS khác như được giải thích trong hướng dẫn sử dụng MySQL .
Thí dụ:
```
1 / *! và 1 = 0 * /
```
Kết quả dự kiến:
Nếu MySQL có mặt, mệnh đề bên trong khối bình luận sẽ được diễn giải.

**d. Phiên bản**
Có ba cách để có được thông tin này:
- Bằng cách sử dụng biến toàn cầu @@ phiên bản
- Bằng cách sử dụng hàm [ VERSION () ]
- Bằng cách sử dụng dấu vân tay nhận xét với số phiên bản / *! 40110 và 1 = 0 * /
```
if(version >= 4.1.10) 
   add 'and 1=0' to the query.
```
In band injection:
```
1 AND 1=0 UNION SELECT @@version /*
```
Inferential injection:
```
1 AND @@version like '4.0%'
```
Kết quả dự kiến:
```
5.0.22-log
```
**e. Người dùng đăng nhập**
Có hai loại người dùng MySQL Server .
- [ USER () ]: người dùng được kết nối với Máy chủ MySQL.
- [ CURRENT_USER () ]: người dùng nội bộ đang thực hiện truy vấn.
Có một số khác biệt giữa 1 và 2. Cái chính là người dùng ẩn danh có thể kết nối (nếu được phép) với bất kỳ tên nào, nhưng người dùng nội bộ MySQL là một tên trống (''). Một sự khác biệt khác là một thủ tục được lưu trữ hoặc một chức năng được lưu trữ được thực thi như người dùng của người tạo, nếu không được khai báo ở nơi khác. Điều này có thể được biết bằng cách sử dụng CURRENT_USER .
In band injection:
```
1 AND 1=0 UNION SELECT USER() 
```
Inferential injection:
```
1 AND USER() like 'root%'
```
Kết quả dự kiến:
```
user@hostname
```
**f. Tên cơ sở dữ liệu đang sử dụng**
Có hàm gốc là DATABASE ()
In band injection:
```
1 AND 1=0 UNION SELECT DATABASE() 
```
Inferential injection:
```
1 AND DATABASE() like 'db%'
```
Kết quả dự kiến:
```
dbname
```
**g. INFORMATION_SCHEMA**
Từ MySQL 5.0, chế độ xem có tên [ INFORMATION_SCHEMA ] đã được tạo. Nó cho phép chúng tôi nhận được tất cả các thông tin về cơ sở dữ liệu, bảng và cột, cũng như các thủ tục và chức năng.
| Tables_in_INFORMATION_SCHEMA | Column 2 |
| -------- | -------- |
| SCHEMATA     | Tất cả các cơ sở dữ liệu người dùng có (ít nhất) SELECT_priv     |
| SCHEMA_PRIVILEGES     | Các đặc quyền người dùng có cho mỗi DB    |
| TABLES     | Tất cả các bảng mà người dùng có (ít nhất) SELECT_priv     |
| TABLE_PRIVILEGES     | Các đặc quyền người dùng có cho mỗi bảng     |
| COLUMNS     | Tất cả các cột người dùng có (ít nhất) SELECT_priv     |
| COLUMN_PRIVILEGES     | Các đặc quyền người dùng có cho mỗi cột     |
| VIEWS     | Tất cả các cột người dùng có (ít nhất) SELECT_priv     |
| ROUTINES     | Các thủ tục và chức năng (cần EXECUTE_priv)     |
| TRIGGERS     | TRIGGERS (cần INSERT_priv)     |
| USER_PRIVILEGES     | Đặc quyền người dùng được kết nối có     |
Tất cả thông tin này có thể được trích xuất bằng cách sử dụng các kỹ thuật đã biết như được mô tả trong phần SQL Injection.
h. Vectơ tấn công
Viết trong một tập tin
Nếu người dùng được kết nối có các đặc quyền FILE và các dấu ngoặc đơn không được thoát, mệnh đề ‘into outfile' có thể được sử dụng để xuất kết quả truy vấn trong một tệp.
```
Select * from table into outfile '/tmp/file'
```
Lưu ý: không có cách nào để bỏ qua các trích dẫn đơn xung quanh tên tệp. Vì vậy, nếu có một số điều kiện vệ sinh đối với các trích dẫn đơn lẻ như thoát (\ '), sẽ không có cách nào để sử dụng mệnh đề' outfile '.
Kiểu tấn công này có thể được sử dụng như một kỹ thuật ngoài băng tần để có được thông tin về kết quả của truy vấn hoặc để viết một tệp có thể được thực thi trong thư mục máy chủ web.
Thí dụ:
```
1 limit 1 into outfile '/var/www/root/test.jsp' FIELDS ENCLOSED BY '//'  LINES TERMINATED BY '\n<%jsp code here%>';
```
Kết quả dự kiến:
Kết quả được lưu trữ trong một tệp có các đặc quyền rw-rw-rw thuộc sở hữu của người dùng và nhóm MySQL.
Trường hợp /var/www/root/test.jsp sẽ chứa:
```
//field values//
<%jsp code here%>
```
Đọc từ một tập tin
Load_file là một hàm riêng có thể đọc tệp khi được các quyền của hệ thống tệp cho phép. Nếu người dùng được kết nối có đặc quyền TỆP , nó có thể được sử dụng để lấy nội dung của tệp. Báo giá đơn thoát khỏi vệ sinh có thể bằng cách bỏ qua bằng cách sử dụng các kỹ thuật được mô tả trước đó.
```
load_file('filename')
```
Kết quả dự kiến:
Toàn bộ tệp sẽ có sẵn để xuất bằng cách sử dụng các kỹ thuật tiêu chuẩn.
Tấn công SQL tiêu chuẩn
Trong một phép tiêm SQL tiêu chuẩn, bạn có thể có các kết quả được hiển thị trực tiếp trong một trang dưới dạng đầu ra bình thường hoặc là một lỗi của MySQL. Bằng cách sử dụng các cuộc tấn công SQL Injection đã được đề cập và các tính năng đã được mô tả của MySQL, việc tiêm SQL trực tiếp có thể dễ dàng được thực hiện ở độ sâu tùy thuộc chủ yếu vào phiên bản MySQL mà pentester đang phải đối mặt.
Một cuộc tấn công tốt là để biết kết quả bằng cách buộc một chức năng / thủ tục hoặc chính máy chủ đưa ra lỗi. Một danh sách các lỗi được ném bởi MySQL và đặc biệt là các hàm riêng có thể được tìm thấy trên Hướng dẫn sử dụng MySQL .
**i. Blind SQL Injection**
Đối với truy vấn SQL bị che đi, có một tập hợp các hàm hữu ích được cung cấp bởi máy chủ MySQL.
•	Chiều dài chuỗi:
LENGTH (str)
•	Trích xuất một chuỗi con từ một chuỗi nhất định:
SUBSTRING (chuỗi, offset, #chars_returned)
•	Tiêm mù theo thời gian: BENCHophone và SLEEP
BẾN (# of Motorcycle, action_to_be_performed)
Hàm điểm chuẩn có thể được sử dụng để thực hiện các cuộc tấn công thời gian, khi việc tiêm mù bởi các giá trị boolean không mang lại bất kỳ kết quả nào.
Xem. SLEEP () (MySQL> 5.0.x) để thay thế trên điểm chuẩn.
## II. Input Validation Testing - Testing for Format string
### 1. Tổng quan
Phần này mô tả cách kiểm tra các cuộc tấn công chuỗi định dạng có thể được sử dụng để đánh sập chương trình hoặc thực thi mã độc hại. Vấn đề bắt nguồn từ việc sử dụng đầu vào của người dùng chưa được lọc làm tham số chuỗi định dạng trong các hàm C nhất định thực hiện định dạng, chẳng hạn như printf ().
Định dạng đầu ra cung cấp ngôn ngữ C-Style khác nhau bằng các hàm như printf (), fprintf (), v.v. chức năng định dạng được gọi với xác nhận tham số không đầy đủ và dữ liệu do người dùng kiểm soát.
Một ví dụ đơn giản sẽ là printf (argv [1]). Trong trường hợp này, bộ xác định kiểu chưa được khai báo rõ ràng, cho phép người dùng chuyển các ký tự như% s,% n,% x cho ứng dụng bằng đối số dòng lệnh argv [1].
Tình huống này có xu hướng trở nên bấp bênh vì người dùng có thể cung cấp các công cụ xác định định dạng có thể thực hiện các hành động độc hại sau:
Liệt kê ngăn xếp quy trình: Điều này cho phép đối thủ xem tổ chức ngăn xếp của quy trình dễ bị tổn thương bằng cách cung cấp các chuỗi định dạng, chẳng hạn như% x hoặc% p, có thể dẫn đến rò rỉ thông tin nhạy cảm. Nó cũng có thể được sử dụng để trích xuất các giá trị canary khi ứng dụng được bảo vệ với cơ chế bảo vệ ngăn xếp. Cùng với tràn ngăn xếp, thông tin này có thể được sử dụng để bỏ qua bộ bảo vệ ngăn xếp.
Kiểm soát luồng thực thi: Lỗ hổng này cũng có thể tạo điều kiện cho việc thực thi mã tùy ý vì nó cho phép ghi 4 byte dữ liệu vào một địa chỉ được cung cấp bởi đối thủ. Trình xác định% n có ích để ghi đè các con trỏ hàm khác nhau trong bộ nhớ với địa chỉ của tải trọng độc hại. Khi các con trỏ hàm ghi đè này được gọi, thực thi chuyển sang mã độc.
Từ chối dịch vụ: Nếu đối thủ không ở vị trí cung cấp mã độc để thực thi, ứng dụng dễ bị tấn công có thể bị sập bằng cách cung cấp chuỗi% x theo sau là% n.
### 2. Làm thế nào để kiểm tra
Kiểm tra hộp đen
Chìa khóa để kiểm tra lỗ hổng chuỗi định dạng là cung cấp các chỉ định loại định dạng trong đầu vào ứng dụng.
Ví dụ:
Hãy xem xét một ứng dụng xử lý chuỗi URL http://xyzhost.com/html/en/index.htm
hoặc chấp nhận đầu vào từ các biểu mẫu. Nếu lỗ hổng chuỗi định dạng tồn tại trong một trong các thói quen xử lý thông tin này, hãy cung cấp một URL như http://xyzhost.com/html/en/index.htmlm%n%n%n hoặc chuyển% n vào một trong các trường mẫu có thể làm hỏng ứng dụng tạo kết xuất lõi trong thư mục lưu trữ.
Các lỗ hổng định dạng chuỗi biểu hiện chủ yếu ở các máy chủ web, máy chủ ứng dụng hoặc ứng dụng web sử dụng mã dựa trên C / C ++ hoặc tập lệnh CGI được viết bằng C. Trong hầu hết các trường hợp này, chức năng báo cáo hoặc ghi nhật ký lỗi như syslog () đã được gọi là không an toàn.
Khi kiểm tra tập lệnh CGI cho các lỗ hổng chuỗi định dạng, các tham số đầu vào có thể được thao tác để bao gồm các chỉ định loại% x hoặc% n. Ví dụ: một yêu cầu hợp pháp như
```
http://hostname/cgi-bin/query.cgi?name=john&code=45765  
```
Có thể được thay đổi thành
```
http://hostname/cgi-bin/query.cgi?name=john%x.%x.%x&code=45765%x.%x
```
Nếu lỗ hổng chuỗi định dạng tồn tại trong quy trình xử lý yêu cầu này, người kiểm tra sẽ có thể thấy dữ liệu ngăn xếp được in ra trình duyệt.
Nếu mã không có sẵn, quá trình xem xét các đoạn lắp ráp (còn được gọi là nhị phân kỹ thuật đảo ngược) sẽ mang lại thông tin đáng kể về lỗi chuỗi định dạng.
Lấy ví dụ về mã (1):
```
int main(int argc, char **argv)
{
printf("The string entered is\n");
printf(“%s”,argv[1]);
return 0;
}
```
Khi quá trình tháo gỡ được kiểm tra bằng IDA Pro, địa chỉ của một công cụ xác định loại định dạng được đẩy trên ngăn xếp sẽ hiển thị rõ ràng trước khi thực hiện lệnh gọi printf.
![](https://images.viblo.asia/1cd0b3e5-0cc2-4a9f-9158-5b76282727ea.gif)
Mặt khác, khi cùng một mã được biên dịch mà không có đối số %% như là một đối số, thì sự khác biệt trong lắp ráp là rõ ràng. Như được thấy dưới đây, không có phần bù nào được đẩy lên ngăn xếp trước khi gọi printf.
![](https://images.viblo.asia/e6662505-7059-4ce2-aa6d-2c78948bf612.gif)
Kiểm tra hộp xám
Trong khi thực hiện đánh giá mã, gần như tất cả các lỗ hổng chuỗi định dạng có thể được phát hiện bằng cách sử dụng các công cụ phân tích mã tĩnh. Việc tuân theo mã được hiển thị trong (1) cho ITS4, một công cụ phân tích mã tĩnh, sẽ cho đầu ra sau.
![](https://images.viblo.asia/79dc05fe-2652-4958-8947-87686271d807.gif)
Các hàm chịu trách nhiệm chính cho các lỗ hổng chuỗi định dạng là các hàm xử lý các bộ định dạng định dạng là tùy chọn. Do đó, khi xem xét thủ công mã, có thể nhấn mạnh đến các chức năng như:
```
printf 
fprintf 
sprintf 
snprintf 
vfprintf 
vprintf 
vsprintf 
vsnprintf
```
Có thể có một số chức năng định dạng dành riêng cho nền tảng phát triển. Chúng cũng nên được xem xét khi không có chuỗi định dạng sau khi sử dụng đối số của chúng.
Demo: Tìm địa chỉ của chuỗi định dạng của chúng tôi. Điều này kết hợp với phần bù ngăn xếp được tìm thấy trong bước trước cho phép chúng tôi liên kết bất kỳ dữ liệu nào trên ngăn xếp với địa chỉ của nó bằng mã sau:
or i in {1..100}; do ./printf "offset $i = %$i$p:%$i$s"; echo; done | grep -v ^$
Finding the address of our format string. This combined with the stack offset found in the previous step lets us associate any data on the stack with its address using the following code:
or i in {1..100}; do ./printf "offset $i = %$i$p:%$i$s"; echo; done | grep -v ^$
## III.  Input Validation Testing -Testing for Local File Inclusion
### 1. Tổng quan 
Lỗ hổng File Inclusion cho phép kẻ tấn công bao gồm một tệp, thường khai thác các cơ chế "bao gồm tệp động" được triển khai trong ứng dụng đích. Lỗ hổng xảy ra do sử dụng đầu vào do người dùng cung cấp mà không có xác nhận hợp lệ.
Điều này có thể dẫn đến một cái gì đó như xuất ra nội dung của tệp, nhưng tùy thuộc vào mức độ nghiêm trọng, nó cũng có thể dẫn đến:
- Thực thi mã trên máy chủ web
- Thực thi mã ở phía máy khách, chẳng hạn như JavaScript, có thể dẫn đến các cuộc tấn công khác, chẳng hạn như tập lệnh chéo trang (XSS)
- Từ chối dịch vụ (DoS)
- Tiết lộ thông tin nhạy cảm
Bao gồm tệp cục bộ (còn được gọi là LFI) là quá trình bao gồm các tệp, đã có mặt cục bộ trên máy chủ, thông qua việc khai thác các thủ tục đưa vào dễ bị tổn thương được thực hiện trong ứng dụng. Lỗ hổng này xảy ra, ví dụ, khi một trang nhận được, là đầu vào, đường dẫn đến tệp phải được đưa vào và đầu vào này không được vệ sinh đúng cách, cho phép các ký tự truyền tải thư mục (như dấu chấm-dấu gạch chéo) được chèn. Mặc dù hầu hết các ví dụ đều chỉ ra các tập lệnh PHP dễ bị tổn thương, chúng ta nên nhớ rằng nó cũng phổ biến trong các công nghệ khác như JSP, ASP và các công cụ khác.
### 2. Làm thế nào để kiểm tra
Vì LFI xảy ra khi các đường dẫn được chuyển đến các câu lệnh "include" không được vệ sinh đúng cách, nên trong cách tiếp cận kiểm tra hộp đen, chúng ta nên tìm các tập lệnh lấy tên tệp làm tham số.
Hãy xem xét ví dụ sau:
```
http://vulnerable_host/preview.php?file=example.html
```
Đây có vẻ là một nơi hoàn hảo để thử LFI. Nếu kẻ tấn công đủ may mắn và thay vì chọn trang thích hợp từ mảng theo tên của nó, tập lệnh trực tiếp bao gồm tham số đầu vào, có thể bao gồm các tệp tùy ý trên máy chủ.
Bằng chứng khái niệm điển hình sẽ là tải tập tin passwd:
```
http://vulnerable_host/preview.php?file=../../../../etc/passwd
```
Nếu các điều kiện được đề cập ở trên được đáp ứng, kẻ tấn công sẽ thấy một cái gì đó như sau:
```
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
alex:x:500:500:alex:/home/alex:/bin/bash
margo:x:501:501::/home/margo:/bin/bash
...
```
Rất thường xuyên, ngay cả khi lỗ hổng như vậy tồn tại, việc khai thác của nó phức tạp hơn một chút. Hãy xem xét đoạn mã sau:
```
<?php “include/”.include($_GET['filename'].“.php”); ?>
```
Trong trường hợp, sự thay thế đơn giản bằng tên tệp tùy ý sẽ không hoạt động vì hậu tố 'php' được nối thêm. Để bỏ qua nó, một kỹ thuật với các đầu cuối null byte được sử dụng. Vì% 00 thể hiện một cách hiệu quả phần cuối của chuỗi, bất kỳ ký tự nào sau byte đặc biệt này sẽ bị bỏ qua. Do đó, yêu cầu sau đây cũng sẽ trả về danh sách kẻ tấn công thuộc tính người dùng cơ bản:
```
http://vulnerable_host/preview.php?file=../../../../etc/passwd%00
http://vulnerable_host/preview.php?file=../../../../etc/passwd%00jpg
```