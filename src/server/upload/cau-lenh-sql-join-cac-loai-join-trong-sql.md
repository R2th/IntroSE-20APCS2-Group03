# 1. Các loại Join trong SQL
- Ở bài trước thì mình đã chia sẻ về các câu lệnh thường dùng trong truy vấn CSDL như: SQL DISTINCT, SQL Where,SQL And Or, SQL Count, SQL ORDER BY, SQL GROUP BY, SQL HAVING các bạn có thể tham khảo trong bài viết trước của mình trong link: https://viblo.asia/p/co-so-du-lieu-la-gimysql-mot-so-cau-lenh-truy-van-co-so-du-lieu-thuong-dung-gDVK26AAKLj
- Hôm nay mình chia sẻ thêm về các câu lệnh SQL Join, các loại Join trong SQL 
- **JOIN** là phép kết nối dữ liệu từ nhiều bảng lại với nhau, nối 2 bảng, 3 bảng.. với nhau. Khi bạn cần truy vấn các cột dữ liệu từ nhiều bảng khác nhau để trả về trong cùng một tập kết quả , bạn cần dùng JOIN. 2 bảng kết nối được với nhau khi có 1 trường chung giữa 2 bảng này. 

## 1.1 INNER JOIN (Hoặc JOIN)

INNER JOIN (Hoặc JOIN): Trả về tất cả các hàng khi có ít nhất một giá trị ở cả hai bảng 
![](https://images.viblo.asia/6732c696-bbf8-466b-aa27-42db8df1cebd.PNG)


## 1.2 LEFT OUTER JOIN (Hoặc LEFT JOIN)

LEFT OUTER JOIN (Hoặc LEFT JOIN): Trả lại tất cả các dòng từ bảng bên trái, và các dòng đúng với điều kiện từ bảng bên phải 
![](https://images.viblo.asia/5bc006d7-e003-4829-864f-6345a8eedb87.PNG)

## 1.3 RIGHT OUTER JOIN (Hoặc RIGHT JOIN)

RIGHT OUTER JOIN (Hoặc RIGHT JOIN): Trả lại tất cả các hàng từ bảng bên phải, và các dòng thỏa mãn điều kiện từ bảng bên trái 
![](https://images.viblo.asia/3debc3a8-3e03-4796-b9c6-0e99310ecc15.PNG)

## 1.4 FULL OUTER JOIN (Hoặc OUTER JOIN)

FULL OUTER JOIN (Hoặc OUTER JOIN): Trả về tất cả các dòng đúng với 1 trong các bảng. 
![](https://images.viblo.asia/d32891d5-ec3b-4253-a149-b77162b0e197.PNG)

# 2. Câu lệnh SQL Join
## 2.1 Câu lệnh INNER JOIN

- **INNER JOIN** trả về kết quả là các bản ghi mà trường được join hai bảng khớp nhau, các bản ghi chỉ xuất hiện một trong hai bảng sẽ bị loại. 
- Có thể thay **INNER JOIN** bởi JOIN. Ý nghĩa và kết quả là như nhau. 
- **Cú pháp**: 

    SELECT column_name(s)

    FROM table1

    INNER JOIN table2

    ON table1.column_name = table2.column_name;
- **INNER JOIN nhiều table** 

    SELECT column_list 

    FROM table1

    INNER JOIN table2 ON join_condition1 

    INNER JOIN table3 ON join_condition2 
    
    Ví Dụ:
- Có bảng khach_hang với thông tin như sau:
![](https://images.viblo.asia/c1cfe2c8-648f-4131-9cc4-1898440d606f.PNG)

- Có bảng order_kh với thông tin như sau:
![](https://images.viblo.asia/b59c6517-a26f-4c19-9f54-26b30cf00777.PNG)

    => Ở 2 bảng trên thì thấy rằng MaKH được phản ánh là  mã khách hàng ở bảng khach_hang, mối quan hệ 2 bảng là cột MaKH

- Chúng ta chạy câu lệnh SQL join sau đây, và xem kết quả trả ra, sẽ lấy ra như sau:

    Select * from  lanptp.khach_hang as KH 
    
     Join lanptp.order_kh as OD on KH.MaKH= OD.MaKH
     ![](https://images.viblo.asia/61628f4e-a421-47b9-b248-fddbcf80c931.PNG)
     
## 2.2 Câu lệnh LEFT OUTER JOIN
 - **LEFT OUTER JOIN** là từ khóa trả về tất cả các hàng (rows) từ bảng bên trái (table1), với các hàng tương ứng trong bảng bên phải (table2). Chấp nhận cả dữ liệu NULL ở bảng 2. 
 
- **LEFT OUTER JOIN** hay còn được gọi là LEFT JOIN
- **Cú pháp**:

    SELECT column_name(s)

    FROM table1

    LEFT JOIN table2

    ON table1.column_name = table2.column_name;
    
-  **LEFT JOIN cũng có thể join nhiều table** 

    SELECT column_list 

    FROM table1

    LEFT JOIN table2 ON join_condition1 

    LEFT JOIN table3 ON join_condition2 
    
- Ví dụ: Vẫn với data như 2 bảng ở trên khach_hang, order_kh khi sử dụng câu lệnh Left Join kết quả sẽ trả ra như sau:
    
    Select * from  lanptp.khach_hang as KH 
    
    Left  join lanptp.order_kh as OD on KH.MaKH= OD.MaKH
![](https://images.viblo.asia/91c29fa3-c477-49c9-b5ec-fe6ed28cc4aa.png)

## 2.3 Câu lệnh RIGHT OUTER JOIN

- **RIGHT OUTER JOIN** là từ khóa trả về tất cả các hàng (rows) từ bảng bên phải (table1), với các hàng tương ứng trong bảng bên trái (table2). Chấp nhận cả dữ liệu NULL ở bảng 2.  ngược lại với LEFT JOIN
-  **RIGHT OUTER JOIN** hay còn được gọi là RIGHT JOIN
- **Cú pháp**:

    SELECT column_name(s)

    FROM table1

    RIGHT JOIN table2

    ON table1.column_name = table2.column_name;
 - Vẫn với data 2 bảng trên các bạn hãy thử chạy câu lệnh RIGHT JOIN nhé!

-  **RIGHT JOIN cũng có thể join nhiều table** 

    SELECT column_list 

    FROM table1

    RIGHT JOIN table2 ON join_condition1 

    RIGHT JOIN table3 ON join_condition2 
 
##  2.4 Câu lệnh FULL OUTER  JOIN
 - **FULL OUTER JOIN** là sự kết hợp của LEFT  JOIN và RIGHT  JOIN 
 - **Cú Pháp**:

    SELECT column_name(s)
    
    FROM table1
    
    FULL OUTER JOIN table2

    ON table1.column_name = table2.column_name

    WHERE condition;
#   3. Kết Luận 
Ở trên mình đã giới thiệu với các bạn về Các loại Join trong SQL và câu lệnh đi kèm, trong quá trình thực hành các bạn có thể kết hợp thêm các câu SQL DISTINCT, SQL Where,SQL And Or, SQL Count, SQL ORDER BY, SQL GROUP BY, SQL HAVING,... để truy vấn theo yêu cầu lấy ra data nhé!. Các bạn cần tìm hiểu thêm để có thể hiểu sâu hơn, kết hợp giữa các câu lệnh với nhau để thực hành tốt các câu lệnh trong MySQL và áp dụng hiệu quả nó vào công việc của bạn. Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học và thực hành một cách tốt nhất!

Tài liệu tham khảo:
https://www.w3schools.com/sql/sql_join.asp