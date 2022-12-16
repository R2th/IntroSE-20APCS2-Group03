# 1. Tổng quan về MySQL

## 1.1 MySQL là gì ?
- MySQL là một hệ quản trị cơ sở dữ liệu phổ biến nhất thế giới, được các nhà phát triển ưa chuộng.
- MySQL có tốc độ cao, ổn định, dễ sử dụng, hoạt động trên nhiều hệ điều hành khác nhau.
- MySQL rất thích hợp cho các ứng dụng có truy cập cơ sở dữ liệu trên internet.
- MySQL hỗ trợ nhiều ngôn ngữ lập trình như PHP, Perl,…. trong việc phát triển website.

## 1.2 MySQL làm những gì?

MySQL làm rất nhiều việc đối với dữ liệu, dưới đây là một số ít công việc của MySQL:
- MySQL thêm dữ liệu vào cơ sở dữ liệu.
- MySQL sửa dữ liệu trong cơ sở dữ liệu.
- MySQL xóa dữ liệu khỏi cơ sở dữ liệu.
- MySQL truy vấn dữ liệu từ cơ sở dữ liệu.
- MySQL tạo cơ sở dữ liệu, tạo bảng.
   ....
   
## 1.3 Tầm quan trong của MySQL đối với website

Website luôn cần phải làm việc với cơ sở dữ liệu.
MySQL là một hệ quản trị cơ sở dữ liệu có tốc độ cao, ổn định, dễ sử dụng, và có lượng người dùng hỗ trợ đông đảo .
Do đó, nó là sự lựa chọn hàng đầu trong việc phát triển website.

# 2. Các kiểu dữ liệu trong MySQL

Trong MySQL, kiểu dữ liệu được chia làm ba loại chính: kiểu số, kiểu văn bản, kiểu ngày tháng

## 2.1 Kiểu Số 

![](https://images.viblo.asia/0ab97cff-00c7-4454-ac93-c91624f03dcf.PNG)

## 2.2 Kiểu văn bản

![](https://images.viblo.asia/73033cad-7d79-4049-933e-067df7624349.PNG)

## 2.3 Kiểu ngày tháng 

![](https://images.viblo.asia/303dc6b3-4797-44cc-a271-fc9701cfecaa.PNG)

# 3. Một số câu lệnh cơ bản trong MySQL

## 3.1 Cú pháp tạo Database 

Để tạo một Database trong MySQL, bạn sử dụng câu lệnh dưới đây.

**CREATE DATABASE database_name;**

Ví dụ: 
Tạo một Database có tên là Quantriduan

CREATE DATABASE Quantriduan;

Trong MySQL để chọn một database nào đó ta sẽ sử dụng cú pháp sau:

**USE database_name;**

Ví dụ: 
Để sử dụng Database Quantriduan ta dùng câu lệnh như sau: 

Use Quantriduan;

![](https://images.viblo.asia/0d62f5e1-206f-45ff-afa9-1088f206b2c7.PNG)


## 3.2 Câu lệnh tạo bảng 

Để tạo một bảng trong MySQL, chúng ta sử dụng cú pháp dưới đây:

**CREATE TABLE table_name
(
    column_name1 data_type(size),
    column_name2 data_type(size),
    column_name3 data_type(size),
    ....
);**

Trong đó:

- table_name là tên của bảng mà bạn muốn tạo.

- column_name1 là tên cột thứ nhất của bảng. (Tương tự: column_name2 và column_name3 lần lượt là tên cột thứ hai và cột thứ ba).

- data_type là kiểu dữ liệu của cột.

- size là kích thước tối đa của kiểu dữ liệu của cột.

![](https://images.viblo.asia/c157e774-2dd0-4a19-9d3f-790b580fe0ef.PNG)

## 3.3 Cú pháp thêm dữ liệu vào bảng

**INSERT INTO table_name (column1,column2,column3)**

**VALUES (value1,value2,value3);**

Trong đó:

column1, column2, column3 lần lượt là tên của cột 1, cột 2, cột 3.

value1, value2, value3 lần lượt là giá trị của cột 1, cột 2, cột 3.

![](https://images.viblo.asia/ffcb81e9-cf12-433b-89e3-48b64812d526.PNG)


## 3.4 Cú pháp xóa 

Để xóa database ta sử dụng cú pháp: 

**DROP DATABASE db_name;**

Ví dụ:

DROP DATABASE SINHVIEN;

Để xóa bảng ta sử dụng cú pháp:

Để xóa bảng ta sử dụng cú pháp: 

**DROP TABLE tb_name;**

Ví dụ:

DROP TABLE users;

![](https://images.viblo.asia/fbca92c7-e547-4846-81d9-97004ccacd6c.PNG)

## 3.5 Câu Lệnh truy xuất dữ liệu 

Khi bạn muốn truy xuất dữ liệu (lấy dữ liệu) của một bảng nào đó, chúng ta có 2 cú pháp:

Cú pháp 1:

**SELECT * FROM name_table;**

Cú pháp này sẽ truy xuất tất cả dữ liệu của bảng có tên là name_table.

Lưu ý: Dấu sao (*) có nghĩa là chọn hết các cột của bảng.

Cú pháp 2:

**SELECT name_column1, name_column2 FROM name_table;**

Cú pháp này sẽ truy xuất tất cả dữ liệu của hai cột có tên là name_column1 và name_column2 trong bảng có tên là name_table.
![](https://images.viblo.asia/0d06a860-1430-43e7-b7bc-e7207d09983d.PNG)


# Kết Luận 

Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về MySQL và cách dùng một số câu lệnh cơ bản trong MySQL. Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn, thực hành tốt các câu lệnh trong MySQL và áp dụng hiệu quả nó vào công việc của bạn. Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học và thực hành một cách tốt nhất!

Tài liệu tham khảo: https://freetuts.net/hoc-mysql