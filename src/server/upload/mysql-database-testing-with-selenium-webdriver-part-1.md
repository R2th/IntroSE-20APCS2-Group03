## I. Download And Install MySQL For Database Testing Using Selenium WebDriver
Với mỗi ứng dụng có cơ sở dữ liệu (database), việc verify một bản ghi mới hoặc cập nhật một bản ghi có phù hợp hay không là rất quan trọng. Trong manual testing, chúng ta thực hiện truy vấn một cách thủ công để xác minh, cập nhật hoặc xóa các bản ghi nhưng nếu dùng selenium WebDriver như một công cụ tự động thì nên có cách tương tự nhưng bằng cách sử dụng script. 
### 1. Download MySQL Installer
Để bắt đầu trả lời cho câu hỏi: thực hiện kiểm thử database sử dụng selenium WebDriver với MySQL như thế nào?, trước tiên chúng ta cần downloand MySQL Installer, thực hiện download theo các bước dưới đây
- Go to link downloand: https://dev.mysql.com/downloads/windows/
- Click on MySQL Installer => tới trang "Download MySQL Installer"

![](https://images.viblo.asia/ddd491b1-f943-40d4-af7b-2528ae74e942.png)
- Tại trang "Download MySQL Installer", click button Donwnload "(x86, 32-bit), MSI Installer". Nó sẽ yêu cầu bạn login hoặc đăng ký.

![](https://images.viblo.asia/0645f755-f357-4ba4-b1f3-cdf4b2678d02.png)
- Trên trang login or register, bạn có thể login sử dụng tài khoản oracle của bạn đã có hoặc tạo mới nếu chưa có tài khoản. Sau khi login, sẽ tới trang như bên dưới

![](https://images.viblo.asia/c6c0207e-523a-41dc-84ec-62c2bd2d3c29.png)
- Hiển thị popup lưu file mysql Installer như bên dưới

![](https://images.viblo.asia/4a0e1204-37f7-47d4-84b1-89b63590578b.png)
- Click Save File button => thực hiện downloand file    
### 2. Install MySQL Server Using MySQL Installer
Thực hiện Install MySQL server theo các bước dưới đây
- Double click MySQL Installer msi file

![](https://images.viblo.asia/f4a69eda-0887-4763-b223-90941162d7ab.png)
- Sau khi kiểm tra cấu hình hệ thống, màn hình MySQL Installer hiển thị như bên dưới. Lựa chọn Custom và click Next button.

![](https://images.viblo.asia/325ade8a-621e-499e-af16-8adb4d47466e.png)
- Ở màn hình tiếp theo, Add MySQL server IN Features tới Installed box và click Next button

![](https://images.viblo.asia/e68a7bc9-85ae-41d7-add3-3d39aef363b2.png)

![](https://images.viblo.asia/b390d711-30b8-4aff-b95a-503ea871db95.png)
- Click Execute button

![](https://images.viblo.asia/03f7d3d6-aa3c-492b-9922-d1fa046b4d65.png)
- Thực hiện cài đặt MySQL server như bên dưới

![](https://images.viblo.asia/e3bbcc7a-6ee2-45b4-b1e3-70431c2f654e.png)
- Khi cài đặt hoàn thành, Status sẽ hiển thị Ready To Configure. Click Next button

![](https://images.viblo.asia/0aec14c6-42b7-45d6-8970-67b7b0283944.png)
- Add port number = 3306 và click Next

![](https://images.viblo.asia/7969044a-e238-4854-9fae-fb7f542bbd56.png)
- Thiết lập password và repeat password, sau đó click Next button
Note: Ghi nhớ password để Login vào MySql, sẽ sử dụng trong test scripts.

![](https://images.viblo.asia/d1630dff-6843-4bbc-b627-60171ad31415.png)
- Giữ tất cả các thiết lập như bên dưới và click Next

![](https://images.viblo.asia/8838dad1-4f91-44c5-bf4d-5cd7b3823721.png)
- Click Excute button

![](https://images.viblo.asia/98676982-3077-4c89-aa5f-368e75c969b1.png)

![](https://images.viblo.asia/fecd25cc-9b7c-4ad8-b33b-d84cf9437335.png)
- Click Next button

![](https://images.viblo.asia/eaf0f2ed-968b-4324-a403-470efb8f3c7a.png)
- Khi cấu hình server đã được áp dụng, click Finish button

![](https://images.viblo.asia/df51084a-7465-44c1-9c78-1d82feb2d7f2.png)
Sau khi cài đặt hoàn tất, MySQL Command Line Client sẽ có ở Start menu của Windows.

## II. MySQL - Creating Data Tables To Use In Selenium WebDriver Test
Để thực hiện test database MySQL dùng selenium WebDriver chúng ta cần tạo bảng trong database và cần insert dữ liệu, thực hiện theo các step dưới đây:
***Step 1: Kết nối MySQL Server từ command line***
- Open MySQL command line client từ Start menu.
- Nó sẽ yêu cầu bạn nhập password. Enter password login mà bạn đã thiết lập trong khi config ở phần I

![](https://images.viblo.asia/bf56a57f-4730-40e3-878d-864c9050cc6b.png)

- Màn hình hiển thị message như bên dưới => bạn đã kết nối được tới database

![](https://images.viblo.asia/ec0e143e-3200-42a4-b09d-c79603ea52a5.png)

***Step 2: Xem database có sẵn trong MySQL***
Để xem database đang tồn tại trong mysql, bạn cần thực hiện như dưới đây
- Gõ show databases => Hiển thị danh sách tất cả các database đang có

![](https://images.viblo.asia/43077b4c-87bf-45f4-9145-896fbc6e3810.png)

Bạn có thể thấy ở trên, có 1 database mặc định với tên "test", chúng ta có thể dùng nó để tạo bảng
***Step 3: Lựa chọn database để tạo bảng***

- Gõ "use test" => chọn database "test" từ list để tạo bảng.
- 
![](https://images.viblo.asia/eab30666-fae4-4fcc-b282-3cd03d491b0b.png)

***Step 4: Tạo bảng trong "test" database***
Để tạo 1 bảng mới trong "test" databse, trước tiên cần kiểm tra các bảng đang tồn tại trong "test" database, gõ lệnh "show tables;"

![](https://images.viblo.asia/ec5097df-2427-4bc2-bb42-3ab97651d2a7.png)

- Không có bất kỳ bảng nào trong "test" database. Tiến hành tạo 1 bảng mới "user" tới database gồm 4 cột id, name, city và age. Để tạo "user" table, thực hiện lệnh truy vấn sau: "CREATE TABLE user (id INT(6), name VARCHAR(20), city VARCHAR(20), age INT(6));"

![](https://images.viblo.asia/1078b36d-d164-41ba-989c-851c5fe91932.png)

***Step 5: Insert data vào "user" table***
Thực hiện lần lượt các lệnh truy vấn dưới đây trên MySQL command line client để insert các bản ghi vào "user" table
INSERT INTO user (id, name, city, age) VALUES (1, 'smith', 'London', 25);
INSERT INTO user (id, name, city, age) VALUES (2, 'Daniel', 'Boston', 37);
INSERT INTO user (id, name, city, age) VALUES (3, 'Anup', 'Delhi', 22);
INSERT INTO user (id, name, city, age) VALUES (4, 'Joshua', 'Boston', 33);
INSERT INTO user (id, name, city, age) VALUES (5, 'Karan', 'Delhi', 45);
INSERT INTO user (id, name, city, age) VALUES (6, 'Karishma', 'Delhi', 21);

![](https://images.viblo.asia/17c443a4-e900-4fea-a122-fbf82647413b.png)

***Step 6: Xem bảng dữ liệu***
Chúng ta có thể xem dự liệu của "user" table bằng cách thực hiện lệnh truy vấn: "select * from user;"

![](https://images.viblo.asia/9334a1b1-7693-4e29-b4ff-1ba20a3963e2.png)

Như vậy chúng ta đã có bảng dữ liệu trong MySQL database để sử dụng test với selenium WebDriver.

### Tài liệu tham khảo:
Translate: http://www.software-testing-tutorials-automation.com/