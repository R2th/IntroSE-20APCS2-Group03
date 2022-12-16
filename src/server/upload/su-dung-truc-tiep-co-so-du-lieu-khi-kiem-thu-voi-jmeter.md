# I. Cấu hình JDBC Connection Configuration
- Để có thể thực hiện một số thao tác với DB trong JMeter, ta cần phải thêm một kết nối được gọi là JDBC Connection Configuration.
## 1. JDBC
- JDBC (**Java Database Connectivity**) là một API tiêu chuẩn dùng để tương tác với các loại cơ sở dữ liệu quan hệ. JDBC có một tập hợp các class và các Interface dùng cho ứng dụng Java để có thể trao đổi với các cơ sở dữ liệu.
- Khi làm việc với cơ sở dữ liệu từ Java bạn cần phải có **Driver** ( là class điều khiển việc kết nối với loại cơ sở dữ liệu bạn muốn). 
- Trong JDBC chúng ta có **java.sql.Driver**, nó là một interface có sẵn trong JDK. Vì vậy bạn phải download thư viện Driver ứng với loại Database đang dùng. Ở đây, mình sẽ sử dụng MySQL nên sẽ sử dụng thư viện **mysql jbcd**
- **Các Driver class thông dụng** (bảng 1)

|  | JDBC driver name | URL format |
| -------- | -------- | -------- |
|MySQL| com.mysql.jdbc.Driver| jdbc:mysql://hostname/ databaseName|
|ORACLE|oracle.jdbc.driver.OracleDriver |jdbc:oracle:thin:@hostname:port Number:databaseName|
|DB2 COM|.ibm.db2.jdbc.net.DB2Driver|jdbc:db2:hostname:port Number/databaseName|
|Microsoft SQL Server|com.microsoft.jdbc.sqlserver.SQLServerDriver| jdbc:microsoft:sqlserver://<HOST>:<PORT>; databaseName= <DATABASE_NAME>;SelectMethod=<SELECT_MODE>|
## 2. Download thư viện JDBC
- Điều đầu tiên để có thể kết nối tới cơ sở dữ liệu (SQL server, MySQL,...) chúng ta cần download [mysql jbcd](https://mvnrepository.com/artifact/mysql/mysql-connector-java)
- Thêm thư viện JDBC tương ứng vào folder lib của JMeter

![image.png](https://images.viblo.asia/7fecf075-bfb0-42a2-8ccc-c05e1bfe7d45.png)
## 3. Thêm JDBC Connection Configuration
- Sau khi add mới một Test plan:  Click chuột phải vào **Thread Group→ chọn Add → Config Element→JDBC Connection Configuration.**
    
![image.png](https://images.viblo.asia/dc4ca77e-2ffe-450c-a625-e4fad97803bf.png)
- Trong phần Database Connection Configuration

![image.png](https://images.viblo.asia/d946169b-ce61-43d4-8d25-e30cb11df6ff.png)
- **Database URL**: gồm 3 phần chính
    - URL format của MySQL: jdbc:mysql:// (tham khảo bảng 1)
    - Địa chỉ IP và port:  localhost:3306/
    - Tên của Scheme trong database: learningsql
- **JDBC Driver class**: Chọn class tương ứng với DB đang sử dụng (tham khảo bảng 1)
- **Username**: Username đăng nhập vào DB
- **Password**: Password đăng nhập vào DB
# II. Tạo Request tới MySQL
## 1. JDBC Request
- Nhấp chuột phải vào **Thread group → Add → Sampler → JDBC Request**

![image.png](https://images.viblo.asia/00b22974-5a7c-4188-97aa-9ce3624ef03c.png)
- Sau khi Add JDBC Request chúng ta sẽ điền các thông tin để thực hiện truy vấn CSDL

![image.png](https://images.viblo.asia/58c8a8d9-5e89-48b7-8bb8-59d1112cd121.png)
- **Variable Name of Pool decleared in JDBC Connection Configuration**: Điền tên biến chúng ta đã thiết lập ở bước 2 chỗ JDBC Connection Configuration.
- **Query Type**: Chọn loại truy vấn tương ứng với câu truy vấn phía dưới, trong list sẽ có các loại như Select/ update/callable/rollback ...
## 2. Kiểm tra kết quả sau khi chạy JDBC request
- Kết quả sẽ hiển thị ở **Listeners → View Results Tree → Response Data**
- Dưới đây là kết quả tương ứng với truy vấn trên

![image.png](https://images.viblo.asia/50cf7a1e-5afe-4501-9ee9-028bc5636b52.png)
# III. Demo
## 1. Cấu hình JDBC Connection configuration và JDBC Request
- Ở ví dụ này, mình sẽ sử dụng bộ data về account để login vào trang web : https://vnexpress.net
- Tương tự các steps phía trên, chúng ta lần lượt
    - Cấu hình JDBC Connection Configuration
    - Thêm JDBC Request
    - Thêm các HTTP Request để call API test
    - Thêm Listeners để kiểm tra kết quả test
![image.png](https://images.viblo.asia/9aac8324-071b-4400-9b79-a6cb883f2ec4.png)
- Sau khi config JDBC và nhập câu lệnh truy vấn data trực tiếp từ DB MySQL, mình sẽ kiểm tra kết quả truy vấn từ JDBC Request xem có okie chưa nhé.
![image.png](https://images.viblo.asia/9a998b29-637a-4ccf-b1f2-9094ded97774.png)
- Tiếp theo, chúng ta sẽ phải set biến để có thể lấy giá trị của data get từ JDBC Request đưa vào các HTTP Request cần test.
    - Cần phải set 2 biến ${email}, ${password} ở các mục Parameter values, Variable names, Result variable name
![image.png](https://images.viblo.asia/78eb5f01-ef8d-406a-b4ec-0201825ef7d4.png)
- Không giống như thông thường chỉ cần sử dụng định dạng ${email}, ${password}. Ở đây, chúng ta có nhiều bộ dữ liệu (email/password) khác nhau và muốn mỗi thread sẽ sử dụng login với 1 bộ dữ liệu khác nhau, vì vậy cần phải thêm **Counter.**
## 2. Thêm Counter
- Chọn **Thread group → Add → Config Element → Counter**
![image.png](https://images.viblo.asia/604a185c-c4a9-4f12-871f-79664e1cd2ed.png)
- **Starting value**: Chúng ta sẽ set giá trị bắt đầu từ record "1". Nếu để trống, tool sẽ tự hiểu bắt đầu với record "0"
- **Increment**: Tăng lên 1 đơn vị sau mỗi thread (nghĩa là sẽ chuyển đến record tiếp theo để get data)
## 3. Cấu hình biến trong HTTP request (Login)
- Thực hiện request Login, sử dụng bộ dữ liệu đã được truy vấn từ database phía trên.
- Vì chúng ta sử dụng trực tiếp data được truy vấn từ DB thông qua JDBC, nên các biến tương ứng phải trùng tên được khai báo lúc config cho JDBC Request.
    - Ví dụ:  ${email}, ${password}
- Thêm vào đó, để có thể sử dụng lần lượt các bộ dữ liệu khác nhau trong mỗi Thread với Counter, nên chúng ta cần sử dụng thêm hàm **__V(A_${N})**
- Ví dụ:
    - ${_V(email_${Counter})} 
    - ${_V(password_${Counter})}
![image.png](https://images.viblo.asia/e2f09507-24d3-453f-99b6-610faa4f5279.png)
## 4. Thực hiện và kiểm tra kết quả test
![image.png](https://images.viblo.asia/0592eec0-bb6e-496d-af9f-3290df279d82.png)
- Các bộ data đã được đưa vào giá trị param của Request login.
- Kết quả (Passed/Failed) sẽ tương ứng với từng bộ data được truyền vào.
    

-----
Tài liệu tham khảo
1. https://jmeter.apache.org/usermanual/functions.html
2. https://www.blazemeter.com/blog/jmeter-parameterization-the-complete-guide