# Mở đầu
Ở [bài viết trước](https://viblo.asia/p/stored-procedure-la-cai-gi-vay-924lJJXYlPM) tôi đã trình bày sơ bộ một chút về Store Procedures, và tiếp đây sẽ là cách dùng những lệnh cơ bản để làm quen với nó.
Lưu ý: Các thao tác với PROCEDURE sẽ chỉ có hiệu lực khi bạn có quyền hạn với nó (đôi khi nó được tài khoản khác tạo ra và phân quyền)
# Nội dung chính
## 1. Cách tạo
Cú pháp:

```
DELIMITER //
 
CREATE PROCEDURE NameOfStoreProcedures(parameters)
BEGIN
   SqlStatements;
END //
 
DELIMITER ;
```

- DELIMITER ở đây là keyword cho phép bạn thay đổi dấu nhắc kết thúc lệnh. Vì SqlStatements kia có thể sẽ có nhiều câu query được ngăn cách mặc định bởi dấu ";"  , chúng ta cần phải thay đổi dấu nhắc lệnh thành 1 kí tự khác như "//" (tất nhiên sau đó nên trả lại nó về dạng ";" )
- NameOfStoreProcedures là cái mà chúng ta sẽ sử dụng để làm việc với Store Procedures, nó như 1 function trong ngôn ngữ lậ trình, có thể truyền vào các tham số để sử dụng trong SqlStatements.

## 2. Sử dụng
Việc này rất dễ, khai báo như function và gọi ra để execute cũng như function.
Cú pháp: 
```
CALL NameOfStoreProcedures(parameters);

```

Và tất nhiên nếu tạo kèm theo parameters thì lúc gọi ra cũng phải truyền parameters vào.

## 3. Xóa
Cú pháp :
```
DROP PROCEDURE [IF EXISTS] NameOfStoreProcedures;
```
- Khi Store Procedures không tồn tại mà cố tình xóa thì option IF EXISTS sẽ giúp Mysql hiểu vấn đề và không bắn ra lỗi nữa. Tất nhiên là đừng gõ hẳn [IF EXISTS] vào nhé, dấu ngoặc vuông được hiểu là option không bắt buộc.

## 4. Chỉnh sửa
Mysql không hề có một dạng cú pháp nào cho phép chúng ta sửa Store Procedures cả, không như alter table hay view.

Vì vậy để làm điều này, bắt buộc là bạn hãy drop nó đi vào tạo lại như mong muốn.

Tất nhiên là các Tool quản lí như workbench cũng có hỗ trợ thao tác thuật sĩ nhé.

## 5. Liệt kê Store Procedures
Cú pháp :
```
SHOW PROCEDURE STATUS [LIKE 'pattern' | WHERE search_condition]
```

Option trên hỗ trợ cho việc tìm, liệt kê các PROCEDURE được match kí tự hoặc khớp điều kiện.

Kết quả thu được có những thông tin như database được gắn PROCEDURE, tên của nó, người tạo ra.

# Giới thiệu thêm 1 đoạn về biến trong PROCEDURE nhé.
## 1. Khai báo
Cú pháp :
```
DECLARE var_name datatype(size) [DEFAULT default_value];

```
- Các datatype trong mysql [ở đây nhé](https://www.mysqltutorial.org/mysql-data-types.aspx).
- DEFAULT option mà không có là sẽ bị gán mặc định giá trị null.
- Có thể khai báo tiện thể nhiều biến tương đương nhau. 

   Ví dụ : DECLARE x, y INT DEFAULT 9999;
   
##    Gán giá trị
Cú pháp:
```
SET var_name = value;
```
## Phạm vi
- Biến trong Procedure có thể khai báo bên ngoài khối BEGIN - END  hoặc bên trong. Tùy vào vị trí đó mà phạm vi hoạt động sẽ khác nhau.
- Đặc biệt nếu đặt tiền tố "@" vào trước tên của biến thì nó sẽ được coi là biến toàn cục cho phiên đó.

# Kết
*Tham khảo https://www.mysqltutorial.org*