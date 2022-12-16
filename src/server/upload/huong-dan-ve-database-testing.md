Không quan trọng ứng dụng của bạn là một trang web, desktop hay là một phần mềm điện thoại... Database (Cơ sở dữ liệu) là phần không thể thiếu và luôn luôn có ở [Back-end](https://nordiccoder.com/blog/backend-la-gi-tai-sao-chung-ta-lai-can-no/). 

Khi độ phức tạp của ứng dụng tăng lên, nhu cầu về một Database an toàn và mạnh mẽ hơn xuất hiện. Đối với các ứng dụng có tần suất hoặc tỉ lệ giao dịch cao (Ví dụ: ứng dụng Ngân hàng hoặc Tài chính), sự cần thiết của Database testing cần được đưa lên hàng đầu. 

Ngày nay, dữ liệu của người dùng ngày càng phức lớn và phức tạp, những bộ quản lý Database truyền thống như trước không còn có thể xử lý nổi nữa. Thay vào đó, trên internet ngày càng có nhiều công cụ hỗ trợ quản lý cực kỳ hữu ích như : MS SQL Server, SQL Server, Oracle, Oracle Financial, MySQL, PostgreSQL, DB2, Toad, Admirer... Những công cụ này có chi phí, tính năng, độ bảo mật khác nhau nên tùy vào dự án mà Leader có thể chọn ra một công cụ phù hợp nhất.

# I. Tại sao chúng ta cần phải thực hiện Database testing?

Dựa vào những Test viewpoint bên dưới, chúng ta sẽ nhận thấy được tầm quan trọng của Database testing.

## 1. Sự kết nối dữ liệu

Trong hệ thống phần mềm, dữ liệu thường truyền từ UI (User Interface) tới Back-end và chiều ngược lại. Vì vậy, có một số vấn đề chúng ta cần phải xem xét về việc kết nối dữ liệu như:
* Kiểm tra xem những trường trong các biểu mẫu gửi dữ liệu (form) có được liên kết tới đúng trường trong Database hay không. Thông thường thì thông tin này sẽ được xác nhận rõ ràng trong file tài liệu của dự án. Việc của bạn là đảm bảo mọi thứ đều rõ ràng và chuẩn xác.
* Bất cứ khi nào một hành động nhất định được thực hiện ở mặt [front-end](https://iconicjob.vn/blog/front-end-la-gi-lap-trinh-vien-front-end-gioi-can-ky-nang-gi/) của ứng dụng, một hành động CRUD (Create - Tạo, Retrieve/Read - Lấy, Update - Cập nhật, Delete - Xóa) tương ứng sẽ được truyền tới back-end. QA sẽ là người kiểm tra xem hành động thực thi đưa ra có đúng với yêu cầu hay không, hoặc là hành dộng đó có thực hiện thành công hay không.

## 2. Kiểm tra các thuộc tính [ACID](https://tedu.com.vn/sql-server/thuoc-tinh-acid-trong-co-so-du-lieu-la-gi-27.html)

![](https://images.viblo.asia/bb5eac51-74c4-4205-b2a4-7ebae6942ab8.jpg)


* **Atomicity - Tính bảo toàn** là một đề xuất tất cả hoặc không có gì. Tính chất này đảm bảo rằng khi một giao dịch liên quan đến hai hay nhiều xử lý, hoặc là tất cả các xử lý được thực hiện hoặc không có xử lý được thực hiện.
* **Consistency - Tính nhất quán** đảm bảo rằng một giao dịch không bao giờ được thông qua cơ sở dữ liệu của bạn trong tình trạng dở dang. Tính chất này, hoặc là tạo ra toàn bộ trạng thái mới hoặc rollback tất cả các xử lý để về trạng thái ban đầu, nhưng không bao giờ thông qua cơ sở dữ liệu trong trạng thái dở dang.
* **Isolation - Tính độc lập** giữ giao dịch tách rời nhau cho đến khi chúng đã hoàn tất. Tính chất này đảm bảo rằng hai hoặc nhiều giao dịch không bao giờ được trộn lẫn với nhau, tạo ra dữ liệu không chính xác và không phù hợp.
* **Durability - Tính bền vững** đảm bảo rằng cơ sở dữ liệu sẽ theo dõi các thay đổi cấp phát trong một cách mà các máy chủ có thể phục hồi từ một sự kết thúc bất thường. Tính chất này đảm bảo rằng trong trường hợp thất bại hay dịch vụ khởi động lại các dữ liệu có sẵn trong  trước khi gặp lỗi.

## 3. Tính toàn vẹn của dữ liệu

Đối với bất kỳ[ hành động CRUD](https://www.softwaretestinghelp.com/crud-testing/) nào, dữ liệu thay đổi phải được thực thi và hiển thị ở tất cả các màn hình hoặc biểu mẫu dữ liệu. Không thể để xảy ra trường hợp màn hình này thì là dữ liệu mới, màn hình khác thì lại dữ liệu cũ hoặc bất cứ giá trị gì đó khác.

Khi ứng dụng đang trong giai đoạn phát triển, những sự kiện từ người dùng cuối sẽ được giả định và kiểm thử trong công cụ Database (query). 

* **C**: Create - Khi người dùng thực hiện lưu một giao dịch mới.
* **R**: Retrieve/Read - Khi người dùng tìm kiếm hoặc xem bất cứ một giao dịch gì đó.
* **U**: Update - Khi người dùng chỉnh sửa bất cứ dữ liệu nào đó đã tồn tại.
* **D**: Delete - Khi người dùng xóa dữ liệu khỏi hệ thống.

Bất kỳ một hành động nào được thực hiện bởi người dùng cuối luôn là một trong bốn câu lệnh trên.

Vì vậy, hãy nghĩ ra các trường hợp kiểm tra Database của bạn - bao gồm kiểm tra dữ liệu ở tất cả các vị trí xuất hiện để xem liệu nó có giống nhau không - giữa câu lệnh database và hành động của người dùng cuối trên UI.


## 4. Sự phù hợp với quy tắc kinh doanh

Sự phức tạp hơn trong Database có nghĩa là sẽ có các thành phần phức tạp hơn như các ràng buộc quan hệ, điều kiện kích hoạt, thủ tục được lưu trữ, v.v. Vì vậy, người kiểm tra sẽ phải đưa ra các truy vấn SQL thích hợp để xác thực các đối tượng phức tạp này.


# II. Kiểm tra gì trong Database

## 1. Transactions

Khi kiểm tra các Transactions, điều quan trọng là chúng phải đảm bảo được các thuộc tính ACID ở phần trên.

Đây là 2 câu lệnh thường được sử dụng nhiều:
```
BEGIN TRANSACTION;
END TRANSACTION;
```

Lệnh ROLLBACK dùng để điều khiển Transaction  về trạng thái trước khi có các thay đổi.

```
ROLLBACK;
```

Khi một Transaction hoàn chỉnh được hoàn thành thì lệnh COMMIT phải được gọi ra. Đây là lệnh điều khiển Transaction được sử dụng để lưu các thay đổi gọi bởi một Transaction tới cơ sở dữ liệu.

```
COMMIT;
```

Sau khi các câu lệnh được thực thi, bạn sẽ cần câu lệnh SELECT để chắc chắn rằng các thay đổi đã được lưu đúng vào Database.

```
SELECT * FROM TABLENAME;
```

## 2. Database Schemas


![](https://images.viblo.asia/76223e8b-f228-4c43-aa78-cdcc3b432f17.png)

Schema là một khái niệm mới được đưa vào SQL, nó là tên một nơi làm việc (namespace) dùng để gom nhóm các table có chung một đặc điểm nào đó để dễ dàng quản lý. 

Nói một cách dễ hiểu Database Schemas là bản lược đồ của cơ sở dữ liệu mô tả tối tượng quan hệ giữa các đối tượng và thông tin trong cơ sở dữ liệu. Để dễ hình dung một lược đồ là như một hộp chứa các bảng, các thủ tục được lưu trữ, các khung nhìn và các tài sản dữ liệu liên quan. Một lược đồ xác định cơ sở hạ tầng của hộp này. 

1. Kiểm tra và chắc chắn rằng Database của bạn được thiết theo tài liệu mô tả từ dự án (thứ mà được nghiên cứu và thống nhất từ trước). Một vài điểm cơ bản như:
    * Các khóa chính(Primary keys) phải được tạo trước khi bất kỳ trường nào khác được tạo trong bảng, collection.
    * Các khóa ngoại nên được sắp xếp, đánh thứ tự để dễ dàng tìm kiếm và tìm kiếm.
    * Tên các trường được bắt đầu hoặc kết thúc với ký tự, cụm từ gì đó (được mô tả cho từng ràng buộc trong tài liệu. Ví dụ: HS_Lop, HS_Khoa...).
    * Các trường được ràng buộc biến có thể thay đổi dữ liệu hay không, kiểu chuỗi hay kiểu số (Ví dụ: String, Interger, Boolean...)

2. Sử dụng một vài câu lệnh sau để kiểm tra tính chính xác của hệ thống:

    * SQL Query DESC<table name> - để kiểm tra cách đặt tên và lược đồ của Database.
    * Regular expressions hay còn gọi là biểu thức chính quy: dùng để xác định tính chính xác của tên và giá trị của từng trường riêng lẻ.
    

## 3. Triggers
    
Khi có bất kỳ một sự kiện nào được thực thi từ Database(Insert, Update, Delete...) thì một Trigger được tự động sản sinh từ phía server.
    
Ví dụ: Khi một sinh viên mới vào trường học. Sinh viên này học 2 môn là: Toán học và Hóa học. Sinh viên này sẽ được thêm vào bảng "SinhVien". Một trigger được sinh ra và sẽ thêm sinh viên này vào những môn học một cách chính xác ngay sau khi anh ta được thêm vào bảng "SinhVien"
    
```
CREATE TABLE SinhVien (
    id INT AUTO_INCREMENT PRIMARY KEY,
    MSSV INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthday DATETIME DEFAULT NULL,
    subjection VARCHAR(50) DEFAULT NULL
);
```
    
    
    
Test view-point ở đây là: bạn gửi câu lệnh SQL trong Trigger. So sánh kết quả của Trigger so với lúc Update thông thường. Nó sẽ chỉ ra lỗi logic ở mức đơn giản với các Trigger sai.
    
Bạn có thể thực thi cả 2 phương pháp kiểm thử ở đây:
* **White box testing**: Thực hiện trigger SQL và so sánh kết quả đối với câu lệnh SQL thông thường (Ví dụ: câu lệnh Trigger ở trên so với câu query thông thường đi từng bảng, từng đối tượng).
* **Black box testing**: Thực hiện trigger và so sánh kết quả của User ở front-end.

a, Một khi UI và Database đã hoàn thiện, hoặc có thể sử dụng để thực hiện intergration, thì bạn có thể kết hợp giữa front-end và Trigger để xác minh một cách dễ dàng Trigger có hoạt động ổn định hay không.
    
b, Có cách dễ dàng hơn để kiểm tra Trigger là kiểm tra trực tiếp bằng các công cụ của SQL. Đi tới trực tiếp bảng để xác định các liên kết có đúng hay không. Tuy thủ công và mất thời gian nhưng đây cũng là một cách.
    
## 4. Stored Procedures

Stored Procedure là một tập hợp các câu lệnh SQL dùng để thực thi một nhiệm vụ nhất định. Nó hoạt động giống như một hàm trong các ngôn ngữ lập trình khác.
    
Ví dụ: Bạn tạo một câu lệnh để select dữ liệu từ bảng SinhVien ra và đặt nó vào Stored Procedure:
    
```
DELIMITER //
CREATE PROCEDURE  all_SinhVien
BEGIN
SELECT * FROM SinhVien
END //
DELIMITER ;
```
    
Từ đó, mỗi khi chạy câu lệnh Stored Procedured này, bạn chỉ việc gọi nó lên:
    
`CALL all_SinhVien;`
    
Từ đó, sau khi xác định được bản chất, điều bạn cần kiểm tra là:
* White box testing: Gọi hàm Stored Procedure, so sánh kết quả và kết quả mong muốn của mình.
* Black box testing: Gọi hàm Stored Procedure bằng front-end, UI của hệ thống. So sánh kết quả và kết quả mong muốn của mình.

## 5. Field Constraints
    
**Giá trị mặc định, giá trị duy nhất, và khóa ngoại:**
* Thực hiện kiểm tra các validation từ những trường trên mặt front-end xem có đồng nhất với định nghĩa của trường đó ở Database hay không (Ví dụ: trường Số điện thoại là Interger - kiểu số, trên UI có khả năng nhập text vào hay không, có xảy ra lỗi gì khi nhập khác số hay không...).
* Kiểm tra các kết quả của những câu lệnh SQL được thực thi (Ví dụ: Gọi thẳng query trực tiếp vào trường đó để xem dữ liệu, kiểu dữ liệu là gì).

1. Kiểm tra giá trị mặc định của một trường khá là đơn giản, bạn chỉ cần gọi trường đó xem data hiện tại là gì, hoặc xem trực tiếp trên front-end. Giá trị mặc định có thể được chỉnh sửa thành giá trị khác hay không, bạn cần chắc chắn sau khi thay đổi, trường đó vẫn ổn định.
2. Giá trị duy nhất có nghĩa là khi bạn thay đổi nó, sẽ xảy ra lỗi và bạn không thể thực hiện hành động tiếp theo. 
    * Về khi sử dụng lệnh trong Database: nếu bạn dùng data khác giá trị đó, sẽ xảy ra lỗi và bạn không thể thực hiện chạy lệnh này, hoặc không ra kết quả.
    * Về mặt front-end: thường thì giá trị này sẽ được mặc định nhập vào trường nào đó và không thể thay đổi. Hoặc nếu bạn có thể, lúc thay đổi sẽ hiển thị lỗi ngay trên màn hình hoặc lúc bạn thực hiện gửi data đi thì sẽ hiển thị lỗi ra là đang sử dụng data không đúng.

3. Khi kiểm tra các khóa ngoại, trực tiếp thay đổi giá trị của khóa ngoại có ảnh hưởng tới ràng buộc qua bảng khác hay không. Còn nếu trên front-end, kiểm tra nếu một khóa ngoại truyền vào không chính xác hoặc không tồn tại, thì sẽ báo lỗi và không thể nào thực hiện tới Database.

![](https://images.viblo.asia/44f574bf-2eec-44ba-8ffd-a54adb20f1c4.jpg)

    
# III. Kết luận
    
Trên đây chỉ là giới thiệu sơ qua về SQL và những gì bạn cần biết khi thao tác trong Database. Một QA có khả năng gọi lệnh để kiểm tra dữ liệu so với front-end là một QA hoàn hảo, nhất là với những dự án cần tính chính xác cao về dữ liệu người dùng. 
    
Bạn nên nhớ, tất cả thao tác ở đây chỉ là trên môi trường developer, môi trường mà khi bạn thao tác sai tới Database thì có thể dễ dàng ROLLBACK và quay lại như ban đầu. Còn khi sản phẩm đã release Production, không được phép có bất kỳ thao tác test nào trên Database của khách hàng/người dùng. Điều này gây rủi ro cao về những vấn đề như: tính bảo mật của dữ liệu, tính an toàn của dữ liệu, cấu trúc hệ thống có thể bị hỏng... Nên hãy đảm bảo rằng bạn đang thực hiện đúng môi trường nhé.
    
    


-----
    
Nguồn và tài liệu tham khảo mà bạn có thể quan tâm tìm hiểu:
* [Transaction](https://www.mssqltips.com/sqlservertutorial/3305/what-does-begin-tran-rollback-tran-and-commit-tran-mean/)
*  [Trigger](https://topdev.vn/blog/trigger-trong-sql/)
* [Stored Procedure](https://www.codehub.vn/MySQL-Stored-Procedure-la-gi)
* [ACID](https://tedu.com.vn/sql-server/thuoc-tinh-acid-trong-co-so-du-lieu-la-gi-27.html)
* [Database Testing Complete Guide (Why, What, And How To Test Data)](https://www.softwaretestinghelp.com/database-testing-process/)