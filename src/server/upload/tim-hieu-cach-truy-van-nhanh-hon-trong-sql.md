Khi lập trình chúng ta thường phải làm việc với các câu lệnh truy vấn Sql. Nên việc hiểu và áp dụng các cách tối ưu câu lệnh là rất cần thiết. Việc tối ưu câu lệnh sẽ giúp cho hệ thống nhanh hơn đồng nghĩa với việc người dùng không phải chờ đợi. Khi lập trình thường thì chúng ta sẽ nhận được kết quả trả về một cách nhanh chóng. Nhưng vấn đề xảy ra khi dự án đi vào hoạt động và dữ liệu ngày một tăng dẫn đến các trường hợp hệ thống phản hồi chậm dẫn đến việc người dùng phải chờ đợi và người dùng không vui vì điều này.

Việc tối ưu các câu lệnh Sql là một việc cần thiệt và nó đặc biệt cần thiết đối với các hệ thống có quy mô dữ liệu lớn. Khi làm việc với dữ liệu quy mô lớn thì những thay đổi nhỏ nhất cũng có thể có tác động lớn đến hiệu suất. Do vậy tối ưu các câu lệnh truy vẫn là một công việc khá khó khăn.

![](https://images.viblo.asia/fd4d3a64-209a-4419-b23c-85de44d85019.png)

Trong bài viết này sẽ nói về một số cách để tối ưu giúp làm tăng hiệu suất truy vấn Sql

* Indexing: đánh index một cách hợp lí 
* Select query: chỉ định tên trường trong câu lệnh SELECT thay vì SELECT *  chọn tất cả các trường trong bảng.
* Running queries: tránh việc truy vấn trong một vòng lặp
* Matching records: sử EXITS() trong trường hợp tìm thấy bản ghi.
* Subqueries: dùng Joins thay cho SubQuery
* Dùng DISTINCT và UNION chỉ khi cần
* Sử dụng WHERE thay HAVING.
* Sử dụng Stored Procedure thay cho những cây truy vấn phức tạp
* Tránh sử dụng các cột đã đánh index với function


1. đánh index một cách hợp lí 
Đánh index giúp cải thiện tốc độ của các hoạt động truy xuất dữ liệu trên bảng. Tuy nhiên đối với các câu lệnh INSERTS, UPDATES, DELETES thì đánh index làm tăng thời gian thực hiện. do vậy hạn chế không nên đánh nhiều. Với các bảng chỉ để đọc dữ liệu thì số lượng index có thể nhiều hơn.
Một chỉ mục là một cấu trúc dữ liệu giúp cải thiện tốc độ của các hoạt động truy xuất dữ liệu trên bảng cơ sở dữ liệu. Một chỉ mục duy nhất tạo các cột dữ liệu riêng biệt mà không chồng chéo lẫn nhau. Lập chỉ mục thích hợp đảm bảo truy cập nhanh hơn vào cơ sở dữ liệu, tức là bạn có thể chọn hoặc sắp xếp các hàng nhanh hơn. Sơ đồ sau giải thích các vấn đề cơ bản về lập chỉ mục trong khi cấu trúc các bảng.

![](https://images.viblo.asia/3beeab1a-e688-4d7b-8e40-70463beb17f1.jpg)

2.  chỉ định tên trường trong câu lệnh SELECT thay vì SELECT *  chọn tất cả các trường trong bảng

    Sử dụng SELECT * sẽ lấy ra những trường không cần thiết dẫn đến việc thực hiện truy vấn lâu. Dữ liệu được truy xuất càng ít, truy vấn sẽ chạy càng nhanh. Lọc dữ liệu càng nhiều càng tốt tại máy chủ. Điều này giới hạn dữ liệu được gửi đến máy khách.
    Do vậy không nên viết các câu truy vấn dạng:
    ```sql 
    SELECT * FROM employees
    ```

    Nên sử dụng :

    ```sql
    SELECT first_name, last_name, mobile, city, state FROM employees
    ```
3.  Tránh việc truy vấn trong một vòng lặp

    không nên viết truy vấn bên trong vòng lặp điều này làm chậm cả quá trình

    ```php
    for ($i = 0; $i < 10; $i++) {  
      $query = “INSERT INTO TBL (A,B,C) VALUES . . . .”;  
      $mysqli->query($query);  
      printf (“New Record has id %d.\ “, $mysqli->insert_id);
    }
    ```

    thay vì việc viết truy vấn trong vòng lặp như trên ta có thể sử dụng câu truy vấn như sau

    ```sql
    INSERT INTO TBL (A,B,C) VALUES (1,2,3), (4,5,6). . . .
    ```
4.  sử EXITS() trong trường hợp tìm thấy bản ghi

    Để kiểm tra bản ghi có tồn tại trong bảng ta có thể sử dụng EXITS() hoặc COUNT() tuy nhiên việc dùng EXITS() sẽ tối ưu hơn trong bài toán này. Vì hàm EXITS() sẽ dừng ngay khi tìm thấy bản ghi thỏa mãn còn COUNT() sẽ quét toàn bộ và đếm các bản ghi thỏa mãn.

    không nên:
    ```sql
    IF (SELECT COUNT(1) FROM EMPLOYEES WHERE FIRSTNAME LIKE ‘%JOHN%’) > 0 PRINT ‘YES’
    ```

    nên 

    ```sql
    IF EXISTS(SELECT FIRSTNAME FROM EMPLOYEES WHERE FIRSTNAME LIKE ‘%JOHN%’)
    PRINT ‘YES’
    ```

5. Dùng Joins thay cho SubQuery


    SubQuery phụ thuộc vào truy vấn bên ngoài (không độc lập) làm  giảm tốc độ của cả quá trình. Với MySQL có cơ chế hỗ trợ Join, khiến nó nhanh hơn Subquery, và do vậy chúng ta nên dùng Join, hạn chế dùng Subquery. [(tham khảo)](https://viblo.asia/p/join-vs-subquery-the-problem-of-mysql-query-optimizer-mrDGMbgXezL)

    không nên dùng:

    ```sql
    SELECT c.Name, c.City,(
        SELECT CompanyName FROM Company WHERE ID = c.CompanyID
        ) AS CompanyName 
    FROM Customer c
    ```

    nên dùng 

    ```sql
    SELECT c.Name, c.City, co.CompanyName 
    FROM Customer c 
    LEFT JOIN Company co ON c.CompanyID = co.CompanyID
    ```

6.  Dùng DISTINCT và UNION chỉ khi cần


    Khi sử dụng union và distinct trong trường hợp không cần thiết có thể dẫn đến giảm performance của câu truy vấn. Thay vì sử dụng UNION có thể sử dụng UNION ALL sẽ cho kết quả tốt hơn.
    
7. Sử dụng WHERE thay HAVING.

    Nên tránh dùng mệnh đề HAVING, khi có thể. Mệnh đề HAVING dùng để giới hạn bớt kết quả trả về bởi mệnh đề GROUP BY. Khi dùng mệnh đề GROUP BY với mệnh đề HAVING, mệnh đề GROUP BY sẽ chia tất cả các dòng thành những tập hợp gồm nhiều tập hợp của các dòng và những giá trị của nó. Khi đó, mệnh đề HAVING sẽ hạn chế kết quả xuất ra không mong muốn của các tập hợp đó. Trong nhiều trường hợp, ta có thể viết câu lệnh SELECT mà chỉ có mệnh đề WHERE, GROUP BY không cần mệnh đề HAVING. Cách viết này sẽ cải thiện tốc độ câu truy vấn của bạn.

 8. Sử dụng Stored Procedure thay cho những cây truy vấn phức tạp

    Stored Procedure thực thi mã nhanh hơn và giảm tải băng thông.
    - Thực thi nhanh hơn: Stored Procedure sẽ được biên dịch và lưu vào bộ nhớ khi được tạo ra. Điều đó có nghĩa rằng nó sẽ thực thi nhanh hơn so với việc gửi từng đoạn lệnh SQL. Vì nếu bạn gửi từng đoạn lệnh nhiều lần thì SQL cũng sẽ phải biên dịch lại nhiều lần, rất mất thời gian so với việc biên dịch sẵn.
    - Giảm tải băng thông: Nếu bạn gửi nhiều câu lệnh SQL thông qua network đến SQL  sẽ ảnh hưởng tới hiệu suất đường truyền. Thay vì gửi nhiều lần thì bạn có thể gom các câu lệnh SQL vào 1 Stored Procedure và chỉ phải gọi đến 1 lần duy nhất qua network.
    - Thêm nữa viết Stored Procedure sẽ thuận lợi cho việc phân quyền và bảo mật tốt hơn 

9. Tránh sử dụng các cột đã đánh index với function

    ```sql
    Select * from Customer where YEAR(AccountCreatedOn) == 2005 and  MONTH(AccountCreatedOn) = 6
    ```
    Chúng ta sử dụng function YEAR cùng với cột AccountCreatedOn nó sẽ không cho phép database sử dụng index ở cột AccountCreatedOn bởi vì index giá trị của AccountCreatedOn chứ không phải YEAR(AccountCreatedOn).

    Do đó chúng ta nên sử dụng 

    ```sql
    Select * From Customer Where AccountCreatedOn between ‘6/1/2005’ and ‘6/30/2005’
    ```
    
    
###   [  Tài liệu tham khảo](https://www.mantralabsglobal.com/blog/sql-query-optimization-tips/)