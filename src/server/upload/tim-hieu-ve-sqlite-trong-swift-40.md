# I. Giới thiệu về SQLite
## 1. SQLite là gì?
SQLite là một hệ thống quản lý cơ sở dữ liệu quan hệ nhúng. Hầu hết các cơ sở dữ liệu quan hệ (điển hình như Oracle hay MySQL) chạy trên máy chủ, chạy độc lập, cho phép các ứng dụng yêu cầu truy cập cơ sở dữ liệu kết nối vào. Tuy nhiên SQLite được gọi là hệ cơ sở dữ liệu nhúng vì nó được cung cấp dưới dạng một thư viện liên kết bên trong ứng dụng. Như vậy, hệ cơ sở dữ liệu SQLite không có máy chủ cơ sở dữ liệu nào, tất cả các hoạt động truy xuất cơ sở dữ liêu được sử lý nội bộ trong ứng dụng thông qua các hàm của thư viện SQLite.

SQLite là một hệ cơ sở dữ liệu mã nguồn mở và hiện tại đã trở thành giải pháp cơ sở dữ liệu triển khai rộng rãi.

SQLite được viết bằng ngôn ngữ C bởi vậy để sử dụng SQLite trong Swift hoặc là cần sử dụng những cú pháp C phức tạp, các kiểu dữ liệu, con trỏ của ngôn ngữ C, hoặc cách tiếp cận dễ dàng hơn là sử dụng một SQLite wrapper như một lớp đứng giữa SQLite và Swift với cú pháp đơn giản dễ đọc hơn.
## 2.Structured Query Language (SQL)
Dữ liệu được truy vấn trong SQLite sử dụng một ngôn ngữ cấp cao được gọi là ngôn ngữ truy vấn có cấu trúc (thường được viết tắt là SQL). SQL là một chuẩn ngôn ngữ sử dụng bởi hầu hết các hệ cơ sở dữ liệu quan hệ
## 3.Chạy thử SQLite trên macOS
Đối với người đọc không quen thuộc với database nói chung và SQLite noi riêng, việc tạo ngay một ứng dụng iOS sử dụng SQLite có vẻ hơi khó khăn. MacOS được cài đặt sẵn một môi trường làm việc với SQLite bằng cách sử dụng Terminal. ĐIều này vừa hữu ích để học về SQLite và SQL, ngoài ra còn là một công cụ để người dùng kiểm tra hay debug với database được tạo ra mởi ứng dụng trong iOS simulator

Để chạy một phiên làm việc với SQLite, mở Terminal trên macOS, di chuyển đến thư mục thích hợp và chạy dòng lệnh:

*sqlite3 ./mydatabase.db

SQLite version 3.19.3 2018-08-20 22:48:08

Enter ".help" for usage hints.

sqlite>

Tiếp đó ta có thể nhập vào lệnh SQL như tạo bảng, insert, trích suất dữ liệu, …

Ví dụ để tạo một table contact trong database với các trường ID, name, address, và phone ta sử dụng dòng lệnh:
 create table contacts (id integer primary key autoincrement, name text, address text, phone text);

lưu ý rằng mỗi row trong table cần phải có một khoá chính (primary key) duy nhất, định danh cho row đó. Trong ví dụ trên ta thiết kế trường ID là khoá chính, kiểu dữ liệu là integer và nói với SQLite tự động tăng trường này mỗi khi thêm 1 row, đây là cách phổ biến để chắc chắn rằng mỗi row có một khoá chính duy nhất, không trùng lặp. Các trường còn lại được khai báo kiểu text.

* Để liệt kê các bảng có trong database sử dụng lệnh .tables:

sqlite> .tables

* Để insert một record vào bảng:

sqlite> insert into contacts (name, address, phone) value (“Ho va ten”, “Dia chi”, “0987887888”)

* Để truy xuất tất cả các row trong bảng:

sqlite> select * from contacts;

* Để trích xuất row đáp ứng các tiêu trí cụ thể:

sqlite> select * from contacts where id=”1”

* Để thoát môi trường sqlite3:

sqlite> .exit
## 4. SQLite, Swift và Wrappers
Mặc định, môi trường Xcode không bao gồm SQLite trong ứng dụng của bạn. Để sử dụng SQLite cần thêm một vài bước. Trước tiên, project cần cấu hình thêm thư viện động libsqlite3.tbd

Như đã nói ở trên, SQLite viết bằng ngôn ngữ C, sẽ khó khăn để làm quen với các dòng lệnh, cũng như các vấn đề khi sử dụng C trong Swift project. Một giải pháp phổ biến là sử dụng một SQLite wrapper. Có nhiều wrapper hiện có sẵn phục vụ mục đích này. CHúng ta sẽ làm việc với một trong số đó tên là FMDB wrapper. Mặc dù FMDB được viết bằng Objective C nhưng nó vẫn dễ dàng sử dụng trong Swift code. Việc lựa chọn FMDB vì nó đã ra đời tương đối lâu, ổn định và nhiều chức năng. FMDB là một dự án open source
## 5. Các lớp quan trọng trong FMDB
Khi triển khai một database sử dụng SQLite với FMDB cần sử dụng một số lớp quan trọng:

* FMDatabase: Sử dụng để đại diện một cơ sở dữ liệu SQLite. Đối tượng để câu lệnh SQL sẽ thực hiện

* FMResultSet: Sử dụng để giữ kết quả của một hoạt động truy vấn trên một FMDatabase

* FMDatabaseQueue: một phiên bản của FMDatabase được thiết kế cho phép cơ sở dữ liệu có thể thực hiện từ nhiều thread
## 6. Tạo và mở một Database

Trước khi có thể làm việc trên một database ta cần tạo và mở database. Đoạn code sau mở một file database với đường dẫn <database file path> . Nếu file database không tồn tại sẽ tạo mới

let myDatabase = FMDatabase(path: <database file path>) if (myDatabase.open()) {

// Database is ready

} else {

Print(“Error: \(myDatabase.lastErrorMessage())”)

}

## 7. Tạo một bảng dữ liệu

Dữ liệu trong database được tổ chức thành các bảng. Trước khi dữ liệu có thể chứa trong database, cần tạo một bảng trước. Sử dụng câu lệnh CREATE TABLE để tạo bảng. Đoạn code sau sẽ tạo một bảng tên là contacts sử dụng FMDB: let sql_stmt = "CREATE TABLE IF NOT EXISTS CONTACTS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, ADDRESS TEXT, PHONE TEXT)"

if !myDatabase.executeStatements(sql_stmt) {

// Table creation failed

}”

## 8. Trích xuất dữ liệu từ một bảng

Đoạn code sau một câu lệnh SQL SELECT được sử dụng để trích xuất address và phone từ tất cả các row của một bảng tên là contacts bằng cách gọi phương thức executeQuery của FMDatabase:

let querySQL = “SELECT address, phone FROM CONTACTS WHERE name = ‘\(name.text!)’”

do {

let result: FMResultSet? = try myDatabase.executeQuery(querySQL, value: nil)

} catch {

print(“Error: \(error.localizedDescription)”)

}

FMResults object được trả về từ phương thức trên sẽ bao gồm kết quả của câu lệnh truy vấn. Bất kể một hoặc nhiều kết quả mong muốn có được trả về hay không thì phương thức next của FMResultSet object vẫn cần phải gọi. Nếu phương thức next trả về false tức là không có kết quả được trả về.

Trong trường hợp kết quả được trả về thì dữ liệu trả về có thể được truy cập bằng cách sử dụng tên column để truy xuất.

While results?.next() == true {

print(results?.stringForColumn(“address”))

print(results?.strongForColumn(“phone”))

}

## 9. Close một SQLite Database

Sau khi ứng dụng kết thúc công việc với database một điều rất quan trọng là phải gọi phương thức close:

myDatabase.close()
# II. Tổng kết
Trên đây chúng ta đã tìm hiểu về SQLite và việc sử dụng nó trong swift 4. SQLite thực sự thích hợp với những hệ thống ứng dụng vừa và nhỏ bởi tính đơn giản, nhỏ gọn của nó. Hy vọng qua bài viết này có thể giúp các bạn có cái nhìn cụ thể hơn về SQLite để ứng dụng hiệu quả trong các app của các bạn trong tương lại. Cảm ơn đã chú ý theo dõi. Hẹn các bạn trong bài viết lần sau!