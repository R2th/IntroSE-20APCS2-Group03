## Khái niệm:
- Khi bạn cần viết một thủ tục, trong đó tùy thuộc vào giá trị của các tham số đầu vào mà câu lệnh SQL cần thực hiện sẽ thay đổi, bạn cần tạo lập chuỗi lệnh SQL trong chương trình và thực thi chuỗi này. Chuỗi lệnh SQL đó được gọi là sql động.
- SQL động giúp lập trình viên linh động hơn trong việc thực thi các câu lệnh SQL, tuy nhiên Dynamic SQL dễ bị dính lỗi sql injection hơn và phải biên dịch lại code.
- Dynamic SQL gồm có 2 loại:
    - Native Dynamic (NDS).
    - DBMS_SQL Package
## 1. Native Dynamic(NDS)
### a. Dùng EXCUTE IMMEDIATE:
- Chuẩn bị một phát biểu (Select, update, delete, ...) -> thực thi nó -> return giá trị.
- Syntax:
![](https://images.viblo.asia/1ce71d37-cc54-4d46-a418-f358d2dca031.png)
- Chú thích:
    - INTO: thường dùng cho câu truy vấn trả về một dòng và xác định biến hoặc record(loại dữ liệu)
    - USING: thường được dùng để chứa tất cả các đối số ràng buộc.
- Ví dụ:
```
DECLARE
    plsql_block varchar2(500);
    new_depid number(4);
    new_dnam varchar2(30) := 'Advertising';
    new_mgrid number(6) := 200;
    new_locid number(4) := 1700;
BEGIN
    plsql_bloc := 'Begin create dept(:a, :b, :c, :d); END;';
    EXECUTE IMMEDIATE plsql_block
        USING IN OUT new_depid, new_dname, new_mgrid, new_locid;
END;
```
=> Khi gọi EXECUTE IMMEDIATE plsql_block USING ..... thì sẽ HQT sẽ thực thi câu lệnh được lưu trong biến plsql_block, với các tham số truyền vào được khai báo sau từ khóa USING.
### b. SQL động với FORALL statement:
```
DECLARE 
    TYPE NumList IS TABLE OF number;
    TYPE NameList IS TABLE OF varchar2(25);
    emp_ids NumList;
    e_name NameList;
BEGIN
    emp_ids := NumList(100,  102, 103, 104, 105);
    FORALL i in 1..5
        EXECUTE IMMEDIATE 
            'UPDATE employees
            SET salary = salary * 1.5
            WHERE employee_id = :1 
            RETURNING last_name INTO :2'
         USING emp_ids(i)
         RETURNING BULK COLLECT INTO e_name;
    END;
END;
```
=> Đoạn SQL này dùng để update lại lương của các nhân viên có id nằm trong danh sách emp_ids và danh sách tên các nhân viên(last_name) được update lương sẽ được lưu trữ trong biến e_name.
## 2. Dùng DBMS_SQL package(dùng để viết sql động):
- Bắt buộc phải sử dụng DBMS_SQL trong trường hợp: thực thi một phát biểu SQL động có chứa biến input, output là <unknown>
- Nên sử dụng khi:
    - Bạn không biết danh sách SELECT tại thời gian biên dịch,
    - Không biết có bao nhiêu cột được trả về trong mệnh đề SELECT hoặc trả về những loại dữ liệu nào.
### a. Một số hàm và thủ tục của package:
    - OPEN_CURSOR: mở ra một cursor mới và return 1 cursor ID.
    - PARSE: để phân tích câu lệnh SQL. Mọi câu lệnh SQL phải được phân tích bởi Parse procedure. Câu lệnh Parsing kiểm tra cú pháp của câu lệnh và kết hợp nó với con trỏ(cursor) trong chương trình. Có thể kiểm tra bất kì phát biểu DML(select, Insert, Update, ...), DDL(create, alter, drop, truncate, ...). DDL statement được thực thi ngay lập tức khi được parse.
    - BIND_VARIABLE: để bind một giá trị đến 1 biến bind được xác định bởi tên trong câu lệnh parse. Việc này không cần thiết nếu phát biểu không có biến bind.
    - EXECUTE: để thực thi một phát biểu SQL và return lại.
    - FETCH_ROWS: để khôi phục lại dòng kế tiếp cho một cấu truy vấn(dùng vòng lặp loop cho nhiều dòng).
    - CLOSE_CURSOR: để đóng 1 cursor.
   *Note: Dùng DBMS_SQL package để thực thi DMS statement (insert, update,...) có thể gây ra deadlock. Ví dụ như drop 1packge đang được sử dụng.
- Ví dụ:
```
CREATE OR REPLACE  FUNCTION delete_all_rows (p_table_name varchar2)
    RETURN number
IS
    v_cur_id integer;
    v_row_delete number;
BEGIN
    v_cur_id := DBMS_SQL.Open_cursor;    // thiết lập bộ nhớ cho tiến trình SQL
    DBMS_SQL.Parse(v_curs_id, 'Delete from ' || p_table_name, DBMS_SQL.Native); // thiết lập hiệu lực cho câu lệnh SQL
    v_rows_delete := DBMS.Execute(v_cur_id);
    DBMS_SQL.Close_cursor(v_cur_id);
    RETURN v_rows_delete;
END;
/
CREATE TABLE temp_emp
AS
    SELECT * FROM employees;
BEGIN
    DBMS_OUTPUT.put_line('Rows deleted: ' || delete_all_rows('temp_emp'));
END;
```
## Tài liệu tham khảo:
    https://docs.oracle.com/cloud/latest/db112/LNPLS/dynamic.htm#LNPLS011