# 1. Cơ sở dữ liệu là gì?
► **Cơ sở dữ liệu (Database)**, viết tắt là CSDL hoặc DB, là một tập hợp các Dữ liệu có quan hệ logic với nhau. CSDL là một tập hợp có cấu trúc của những Dữ liệu có liên quan với nhau được lưu trữ trong máy tính. Một CSDL được thiết kế, xây dựng và lưu trữ với một mục đích xác định như phục vụ lưu trữ, truy xuất dữ liệu cho các ứng dụng hay người dùng. 

► **Bảng CSDL**: Một CSDL thường bao gồm một hoặc nhiều bảng (table). Mỗi bảng được xác định thông qua một tên (ví dụ Nhân viên ). Bảng chứa các cột (colum), mẩu tin - dòng (record - row), là dữ liệu của bảng 
# 2. Một số hệ quản trị CSDL? 
**Hệ quản trị cơ sở dữ liệu (Database Management System)** có thể hiểu là hệ thống được thiết kế để quản lí một khối lượng dữ liệu nhất định một cách tự động và có trật tự. Các hành động quản lý này bao gồm chỉnh sửa, xóa, lưu thông tin và tìm kiếm (truy xuất thông tin) trong một nhóm dữ liệu nhất định.

**Một số hệ quản trị CSDL phổ biến hiện nay**:

**SQL server**: 
là hệ quản trị database của Microsoft, còn MySQL là hệ quản trị database có mã nguồn mở có thể chạy trên nhiều platform như Linux, WinXP... Theo đánh giá của nhiều người, SQL Server của Microsoft mạnh hơn, bảo mật tốt hơn nhiều so với MySQL.

Ở bài trước mình có giới thiệu về MySql cơ bản, cùng với cách để tạo CSDL, một hệ quản trị cơ sở dữ liệu phổ biến nhất thế giới, được các nhà phát triển ưa chuộng. Các bạn có thể tham khảo ở link sau:
https://viblo.asia/p/mysql-co-ban-924lJW8X5PM

**Hệ quản trị CSDL Oracle**: là hệ quản trị CSDL mạnh nhất, tốt nhất chạy trên mọi nền tảng.

**SQlite:** SQLite là hệ thống cơ sở dữ liệu quan hệ nhỏ gọn, hoàn chỉnh, có thể cài đặt bên trong các trình ứng dụng khác. SQLite được viết dưới bằng ngôn ngữ lập trình C.

**MongoDB:** MongoDB là một mã nguồn mở và là một tập tài liệu dùng cơ chế NoSQL để truy vấn, nó được viết bởi ngôn ngữ C++.

**PostgreSql**: PostgreSQL cũng là hệ quản trị cơ sở dữ liệu hỗ trợ rất tốt trong việc lưu trữ dữ liệu không gian. PostgreSQL kết hợp với module Postgis cho phép người dùng lưu trữ các lớp dữ liệu không gian một cách hiệu quả.

# 3. Một số câu lệnh truy vấn CSDL hay sử dụng
Trước tiên thì các bạn nên biết tìm hiểu cơ bản về MySql  và cách tạo CSDL ở bài viết trước của mình nha: https://viblo.asia/p/mysql-co-ban-924lJW8X5PM
## 3.1 SQL DISTINCT

► Câu lệnh SELECT DISTINCT được sử dụng để chỉ trả về các giá trị khác nhau. 

► Trong 1 bảng, 1 cột có thể chứa nhiều giá trị trùng lặp và đôi khi bạn chỉ muốn lấy ra danh sách những giá trị duy nhất. 

► Từ khóa DISTINCT có thể sử dụng để trả về chỉ các giá trị duy nhất không trùng lặp. 

► Cấu trúc câu lệnh : 

SELECT DISTINCT column_name,column_name FROM table_name; 

Ví dụ: 

SELECT DISTINCT City FROM Customers;

=> Câu lệnh trả ra tất cả kết quả ̀City trong bảng Customers mà không bị trùng lặp bất cứ kết quả nào với nhau 
![](https://images.viblo.asia/0560c568-3ee5-41b1-85ed-60dcabea6fdc.PNG)

## 3.2 SQL Where 
► Where là câu lệnh nhằm giới hạn phạm vi tìm kiếm. Yếu tố thêm trong query này là WHERE để xác định hàng có tính chất nào đó. 

► Cấu trúc câu lệnh : 

WHERE <column1> <operator> <column2>
    
Ví dụ: SELECT * FROM Customers WHERE country = ‘USA’; 
    
=> Kết quả trả ra bị giới hạn với điều kiện country = ‘USA’
    ![](https://images.viblo.asia/7e9e1a49-cda0-45cd-b160-4395ce4634fa.PNG)

##     3.3 SQL And Or
► AND và OR nối hai hoặc nhiều điều kiện trong mệnh đề WHERE lại với nhau.
    
► AND sẽ hiển thị 1 dòng (kết quả) nếu **Tất Cả** các điều kiện đều thoả mãn. Toán tử OR hiển thị một dòng hoặc nhiều dòng (kết quả) nếu **Bất Kì**  điều kiện nào được thoả mãn 
    
Ví dụ: 
    
SELECT * FROM Persons 
    
WHERE FirstName = ‘Lan' AND LastName = ‘Pham‘;

 ![](https://images.viblo.asia/a140fa0e-1736-4dfd-951b-52281993e3e1.PNG)

 Kết quả trả ra:
![](https://images.viblo.asia/eaac20f0-bac0-428a-9969-4f1da98d9626.PNG)
    
► Sử dụng OR để tìm những người có tên là Lan hoặc họ là Nguyen
    
Ví dụ: 
SELECT * FROM Persons WHERE FirstName = ‘Lan' AND LastName = ‘Nguyen' ;
![](https://images.viblo.asia/44975d5e-a5b8-4c2c-9ca8-7b73aaa3ca5b.PNG)
    
 Kết quả trả ra:
    ![](https://images.viblo.asia/110462b8-1b4b-40df-b579-3ef8c5e37e46.PNG)

##     3.4 SQL Count
► Cú pháp: SELECT COUNT(tên_cột) FROM tên_bảng 
    
► Hàm COUNT(*): trả về số lượng các dòng được chọn ở trong bảng. 
    
Đếm toàn bộ row trong 1 tables: 
    
SELECT COUNT(*) FROM Tên bảng 
    
► Ví dụ:
    
SELECT COUNT(*) FROM Persons; 
    
=> Kết quả trả về là 3 
    
![](https://images.viblo.asia/926e23e0-e653-4aee-a052-d4a8204db07d.PNG)

    
Câu lệnh sau sẽ trả về số lượng những người lớn hơn 20 tuổi: 
    
► Ví dụ:
    
SELECT COUNT(*) FROM Persons WHERE Age > 20; 
    
=> Kết quả trả về là 2 do thêm điều kiện Age > 20
    ![](https://images.viblo.asia/523187d1-4e91-4f7e-9b47-1f219254eb5c.PNG)
    
##     3.5 SQL ORDER BY
► Từ khóa ORDER BY được dùng để sắp xếp một tập các bản ghi trong câu lệnh SELECT theo một hoặc nhiều tiêu chí. 
    
► Từ khóa ORDER BY sắp xếp các bản ghi mặc định là tăng dần. Để sắp xếp giảm dần chúng ta dùng từ khóa DESC. 
    
► Cú pháp ORDER BY 
    
SELECT column_name,column_name 
    
FROM table_name 
    
ORDER BY column_name,column_name ASC|DESC; 
    
  ►   Ví dụ:
    
SELECT Persons.ID, Persons.name
    
FROM Persons
    
ORDER BY Persons.ID ASC;
    
=> Kết quả trả ra sắp xếp theo thứ tự tăng dần của ID
    
 ![](https://images.viblo.asia/b7b5fa6f-4f99-4f00-bb4b-bfcfbe70af27.PNG)

##     3.6 SQL GROUP BY
► Các hàm tập hợp (ví dụ như SUM) thông thường cần thêm chức năng của mệnh đề GROUP BY. 
    
► Mệnh đề GROUP BY...được thêm vào SQL bởi vì các hàm tập hợp (như SUM) trả về một tập hợp của các giá trị trong cột mỗi khi chúng được gọi, và nếu không có GROUP BY ta không thể nào tính được tổng của các giá trị theo từng nhóm riêng lẻ trong cột. 
    
► Cú pháp của GROUP BY như sau: 
    
SELECT tên_cột, SUM(tên_cột) 
FROM tên_bảng 
GROUP BY tên_cột 
    
► Ví dụ:
    
SELECT Company, SUM(Amount) 
    
FROM Sales 
    
GROUP BY Company;
    
=> Kết quả trả về sẽ gom nhóm theo Company: có 3 kết quả 
    ![](https://images.viblo.asia/d2921023-1b5a-495f-a2e8-eb09508cf723.PNG)
    
##     3.7 SQL HAVING
► Having là một câu lệnh điều kiện của Group by. 
    
► Mệnh đề HAVING...được thêm vào SQL vì mệnh đề WHERE không áp dụng được đối với các hàm tập hợp (như SUM). Nếu không có HAVING, ta không thể nào kiểm tra được điều kiện với các hàm tập hợp. 
    
► Cú pháp của HAVING như sau: 
    
SELECT tên_cột, SUM(tên_cột) 
    
FROM tên_bảng 
    
GROUP BY tên_cột 
    
HAVING SUM(tên_cột) điều_kiện giá_trị
    
► Ví dụ:
    
SELECT Company, SUM(Amount) 
    
FROM Sales 
    
GROUP BY Company 
    
HAVING SUM(Amount) > 10000;
    
=> Kết quả trả về sẽ gom nhóm theo Company có điều kiện   Amount>10000: có 2 kết quả 
    ![](https://images.viblo.asia/1f444b95-1df8-4c00-b036-1a5e865d4a1b.PNG)
   
# Kết Luận 

Bài viết này chỉ hy vọng giúp các bạn hiểu thêm về CSDL, một số hệ quản trị CSDL, các câu truy vấn thường dùng trong quá trình thao tác với CSDL trong MySQL. Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn, kết hợp giữa các câu lệnh với nhau để thực hành tốt các câu lệnh trong MySQL và áp dụng hiệu quả nó vào công việc của bạn. Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học và thực hành một cách tốt nhất!

Tài liệu tham khảo:
    
https://www.w3schools.com/sql/default.asp
    
https://blog.webico.vn/quan-tri-co-du-lieu-la-gi-cac-quan-tri-co-du-lieu-pho-bien-nhat-hien-nay/