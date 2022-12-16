*Mục tiêu của người tester khi kiểm thử một trang web hay một hệ thống  là đảm bảo sản phẩm được kiểm thử đó được bảo vệ nhiều nhất có thể. Kiểm thử về chức năng bảo mật thường được thực hiện cho mục đích này. Để thực hiện loại thử nghiệm này, ban đầu, chúng ta cần phải xem xét, những cuộc tấn công nào có khả năng xảy ra nhất. Và SQL Injection là một trong những cuộc tấn công đó.*


### **1.SQL Injection là gì?**

Giống như tên của nó, mục đích tấn công của SQL injection là inject các mã độc hại. Mỗi và tất cả các trường của một website như một cổng vào cơ sở dữ liệu. Ví dụ, trong form đăng nhập, người dùng nhập dữ liệu, trong trường tìm kiếm người dùng nhập văn bản tìm kiếm, trong biểu mẫu lưu dữ liệu, người dùng nhập dữ liệu cần lưu. Tất cả các dữ liệu được chỉ định này đều đi vào cơ sở dữ liệu.

Thay vì nhập dữ liệu đúng, mình nhập vào một vài mã độc hại, sau đó xem xét  khả năng xảy ra những ảnh hưởng nghiêm trọng đối  với cơ sở dữ liệu và toàn bộ hệ thống. 
SQL Injection được thực hiện với ngôn ngữ lập trình SQL. SQL (Structured Query Language) được sử dụng để quản lý dữ liệu được lưu trữ trong toàn bộ cơ sở dữ liệu.  

Một ứng dụng được thử nghiệm có thể có giao diện người dùng chấp nhận đầu vào của người dùng được sử dụng để thực hiện các tác vụ sau:

#1) Hiển thị dữ liệu được lưu trữ có liên quan cho người dùng, ví dụ ứng dụng kiểm tra thông tin đăng nhập của người dùng bằng thông tin đăng nhập do người dùng nhập và chỉ hiển thị các chức năng và dữ liệu có liên quan cho người dùng.

#2) Lưu dữ liệu do người dùng nhập vào cơ sở dữ liệu, ví dụ khi người dùng điền vào một biểu mẫu và gửi nó, ứng dụng sẽ tiến hành lưu dữ liệu vào cơ sở dữ liệu, dữ liệu này sau đó được cung cấp cho người dùng trong cùng một phiên cũng như trong các phiên tiếp theo.

###  2.Sự nguy hiểm của SQL Injection
 
Những điều sau đây có thể là kết quả của SQL injection:

* Hack tài khoản cá nhân của người khác

* Ăn cắp hoặc sao chép dữ liệu của trang web hoặc hệ thống

* Thay đổi dữ liệu nhạy cảm của hệ thống

* Xóa dữ liệu nhạy cảm của hệ thống

* Người dùng có thể đăng nhập vào ứng dụng với tư cách người dùng khác, ngay cả với tư cách quản trị viên.

* Người dùng có thể xem thông tin cá nhân thuộc về những người dùng khác, ví dụ chi tiết hồ sơ của người dùng khác, chi tiết giao dịch của họ, v.v.

* Người dùng có thể sửa đổi cấu trúc của cơ sở dữ liệu, thậm chí xóa các bảng trong cơ sở dữ liệu ứng dụng.

* Người dùng có thể kiểm soát máy chủ cơ sở dữ liệu và thực thi lệnh theo ý muốn.

*Bản chất của cuộc tấn công này:*

Như đã đề cập trước đó, bản chất của cuộc tấn công này là để hack cơ sở dữ liệu với mục đích không tốt. Đầu tiên, bạn cần tìm các phần của hệ thống dễ bị tấn công và sau đó gửi mã SQL độc hại qua chúng tới cơ sở dữ liệu. Nếu loại tấn công này  khả thi cho hệ thống, mã SQL độc hại thích hợp sẽ được gửi và các hành động có hại có thể được thực hiện trong cơ sở dữ liệu. 

### 3. Kiểm thử SQL injection như thế nào?

Việc kiểm tra lỗ hổng này có thể được thực hiện rất dễ dàng. Đôi khi ta chỉ cần nhập ký hiệu  ‘ hoặc “  vào các trường được kiểm tra. Nếu nó trả về bất kỳ thông báo bất ngờ hoặc bất thường, thì ta có thể chắc chắn rằng SQL Injection khả thi cho trường đó. 

*Ví dụ:*  Nếu nhận được thông báo lỗi như “ Internal Server Error” làm kết quả tìm kiếm, thì ta có thể chắc chắn rằng cuộc tấn công này có thể xảy ra trong phần đó của hệ thống.

Các kết quả khác, có thể thông báo tấn công bao gồm:

* Blank page loaded.

* No error or success messages – chức năng và trang không phản ứng với đầu vào

* Success message for malicious code -thông báo thành công với mã độc hại

Giả sử:  Kiểm tra cửa sổ đăng nhập có dễ bị tấn công đối với SQL Injection hay không. Trong trường địa chỉ email hoặc mật khẩu, ta gõ ký hiệu '   như hình dưới đây.


![](https://images.viblo.asia/684751db-6c47-4979-bc09-2b2ac7e5a533.jpg)

Nếu đầu vào như vậy trả về kết quả như thông báo lỗi “ ‘Internal Server Error” hoặc bất kỳ kết quả không phù hợp được liệt kê nào khác, thì chúng ta gần như có thể chắc chắn rằng cuộc tấn công này có thể xảy ra cho trường đó.

![](https://images.viblo.asia/f121ebdb-f756-4644-b707-8e87766f05ed.jpg)

Do đó việc kiểm tra SQL Injection với ký hiệu ' là một cách đáng tin cậy để kiểm tra xem cuộc tấn công này có khả thi hay không.

Nếu ký hiệu '  không trả lại bất kỳ kết quả không phù hợp nào, thì ta có thể thử nhập các ký hiệu  khác như " để kiểm tra kết quả.

![](https://images.viblo.asia/684751db-6c47-4979-bc09-2b2ac7e5a533.jpg)

Một số loại dữ liệu khác mà cũng nên thử submit để biết xem trang web có gặp lỗi hay không như:

' or 1=1--

" or 1=1--

or 1=1--

' or 'a'='a

" or "a"="a

') or ('a'='a

Việc kiểm tra tấn công SQL có thể cũng có thể được thực hiện từ link url của trang. Giả sử ta có một website có link sau: http://www.testing.com/books=1. Trong trường hợp này books là một tham số và 1 là giá trị.  Nếu trong link trên, ta sẽ sửa ký hiệu  ' thay vì 1, sau đó kiểm tra injection. 

![](https://images.viblo.asia/ed98c67c-7c5d-425c-a0da-26405617564e.jpg)

Trong trường hợp này nếu link http://www.testing.com/books= trả về thông báo lỗi như Internal Server Error hoặc blank page hoặc các thông báo lỗi không mong muốn, ta có thể chắn chắn trang web đã bị tấn công SQL injection. Sau đó, ta có thể gửi mã SQL phức tạp hơn thông qua liên kết của trang web.  Ví dụ

![](https://images.viblo.asia/6927dd93-81d6-4095-91b8-bd3158c558ea.jpg)

### 4. Các phần dễ bị tấn công 

Các phần dễ bị tấn công bao gồm:

* Login fields

* Search fields

* Comment fields

* Any other data entry and saving fields

* Website‘s links

Điều quan trọng cần lưu ý là trong khi thử nghiệm chống lại cuộc tấn công này là không thể chỉ kiểm tra một hoặc một vài trường bởi vì một trường có thể được bảo vệ chống lại SQL Injection, nhưng một trường khác thì không. Do đó, điều quan trọng là đừng quên kiểm tra tất cả các trường của trang web.

### **5.Tài liệu tham khảo**
https://www.softwaretestinghelp.com/sql-injection-how-to-test-application-for-sql-injection-attacks/

http://www.securiteam.com/securityreviews/5DP0N1P76E.html