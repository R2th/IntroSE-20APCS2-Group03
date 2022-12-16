Structured Query Language (SQL) là ngôn ngữ truy vấn có cấu trúc được sử dụng để lưu trữ, thao tác và truy xuất dữ liệu từ cơ sở dữ liệu. Tất cả các hệ thống quản lý cơ sở dữ liệu quan hệ (RDMS) như MySQL, MS Access, Oracle, Sybase, Informix, Postgres và SQL Server đều sử dụng SQL làm ngôn ngữ cơ sở dữ liệu chuẩn. Bằng cách sử dụng các câu lệnh SQL, các developers dễ dàng create, update và delete dữ liệu. Khi khối lượng data tăng lên và technology ngày càng phức tạp, việc tối ưu hóa cơ sở dữ liệu MySQL đúng cách để tăng trải nghiệm người dùng và giảm chi phí cơ sở hạ tầng trở nên quan trọng hơn. 

Với sự phức tạp của khối data ngày càng tăng và các thao tác công việc thay đổi liên tục, thì việc điều chỉnh database performance và tối ưu hóa lệnh truy vấn MySQL rất cần thiết để tối đa hóa việc sử dụng resource và system performance.

Có nhiều lý do khiến cho việc điều chỉnh SQL trở nên complex đối với các developers. Thứ nhất, nó đòi hỏi chuyên môn kỹ thuật sâu rộng để viết và hiểu các lệnh thực thi khác nhau. Trong khi viết các câu lệnh SQL clean và complete là trách nhiệm của người có kiến thức thấu đáo về nó.

Bên cạnh những complex đó, việc điều chỉnh là rất tốn thời gian. Bởi vì khi bạn có số lượng lớn các câu lệnh SQL để sắp xếp, bạn cần phải chắc chắn tìm ra câu lệnh nào bạn phải điều chỉnh và câu lệnh nào bạn nên để lại.

Trong bài viết này, mình sẽ đề cập đến một số tips điều chỉnh MySQL performance để tối ưu hóa các thao tác với MySQL database.

## Các lợi ích của việc điều chỉnh MySQL Performance

Lợi ích của việc xác định các phần ảnh hưởng tốc độ của database giúp bạn tránh cung cấp quá mức và giảm chi phí bằng cách chọn đúng kích cỡ server. Nó cũng giúp bạn nhận ra việc có hay không nên chuyển đổi data storage hoặc thêm server để cải thiện tốc độ hoặc không, và nếu như vậy thì bao nhiêu là đủ.

Điều chỉnh cơ sở dữ liệu để tối ưu hóa MySQL query performance không đi kèm với những thách thức nhỏ. Tuy nhiên, một khi được điều chỉnh đúng, cơ sở dữ liệu cho kết quả hiệu suất đáng giá với các chức năng tuyệt vời. Nó không chỉ làm giảm tải nhiệm vụ không mong muốn mà còn tối ưu hóa cơ sở dữ liệu MySQL để truy xuất dữ liệu nhanh hơn.

## Nguyên tắc tối ưu hóa truy vấn MySQL

Thực hiện theo các hướng dẫn sau sẽ điều chỉnh MySQL performance và tối ưu hóa tốc độ truy vấn cơ sở dữ liệu.

Trước hết, đảm bảo lập index của tất cả predicates trong mệnh đề WHERE, JOIN, ORBER BY và GROUP BY. WebSphere Commerce nhấn mạnh vào việc lập index của predicates để tăng hiệu năng SQL. Bởi vì việc lập index các truy vấn SQL không đúng có thể gây ra quét cả table, cuối cùng dẫn đến các vấn đề locking và các issue khác.

Do đó, ta nên lập index cho tất cả các predicate columns  vì như thế sẽ tối ưu hóa truy vấn MySQL.

1. Tránh dùng functions trong predicates

Database không sử dụng index nếu nó có một số function predefined trong column.

Ví dụ:

```
SELECT * FROM TABLE1 WHERE UPPER(COL1)='ABC'Copy
```

Do function UPPER(), database không sử dụng index trên COL1. Nếu có bất kỳ cách nào để tránh function đó trong SQL, bạn phải tạo một index dựa trên function mới hoặc phải custom các column trong database để cải thiện performance.

2. Tránh sử dụng các ký tự % ở đầu câu

 Ví dụ trong trường hợp sau LIKE '%abc' gây quét toàn bộ table:

```
SELECT * FROM TABLE1 WHERE COL1 LIKE '%ABC'Copy
```

Trong hầu hết các trường hợp, việc sử dụng ký tự % này gây giới hạn performance lớn.

3. Tránh SELECT các column không cần thiết

Thay vì viết  "SELECT * " , thì hãy luôn chỉ định các column trong mệnh đề SELECT để cải thiện performance của MySQL. Bởi vì các SELECT column không cần thiết gây ra load thêm nhiều dữ liệu trên cơ sở dữ liệu, làm chậm performance của MySQL cũng như toàn bộ systematic process.

4. Sử dụng inner join, thay vì outer join nếu có thể

Chỉ sử dụng outer join khi cần thiết. Việc sử dụng nó khi không cần thiết không chỉ gây giới hạn database performance mà còn giới hạn các tùy chọn tối ưu hóa truy vấn MySQL, dẫn đến việc thực thi các câu lệnh SQL chậm hơn.

5. Chỉ sử dụng DISTINCT và UNION khi cần thiết

Việc sử dụng UNION và DISTINCT mà không có bất kỳ mục đích chính nào gây ra sự sắp xếp không mong muốn và làm chậm quá trình thực thi SQL. Thay vì UNION, sử dụng UNION ALL mang lại hiệu quả cao hơn trong quy trình và cải thiện performance của MySQL chính xác hơn.

6. Việc sử dụng ORDER BY để sắp xếp kết quả trả về

ORDER BY sắp xếp tập kết quả theo column được chỉ định. Mặc dù câu lệnh mang lại lợi ích trong việc lấy ra dữ liệu được sắp xếp, nhưng nó cũng tạo ra tác động hiệu năng bit trong thực thi SQL. Bởi vì trước tiên truy vấn cần sắp xếp dữ liệu để tạo tập kết quả cuối cùng, gây ra việc bit complexed trong thực thi SQL.

## Không sử dụng MySQL làm Queue
Queue thực sự có thể ảnh hưởng đến database performance của bạn ngay từ trong core và có thể nhập vào app databases mà bạn không biết. Chẳng hạn, nếu bạn đang thiết lập trạng thái cho một mặt hàng cụ thể thì một quy trình có liên quan có thể truy cập vào đó, bạn vô tình tạo ra một hàng đợi. Những gì nó thực sự làm là ngốn thêm thời gian tải để truy cập tài nguyên mà không có bất kỳ lý do chính nào cả.

Queue gây ra vấn đề vì hai lý do chính. Chúng tuần tự hóa khối lượng công việc của bạn, ngăn chặn việc hoàn thành các nhiệm vụ song song và kết quả là thường có một table chứa công việc đang xử lý cũng như dữ liệu lịch sử từ các công việc đã hoàn thành. Nó không chỉ thêm độ trễ cho ứng dụng mà còn gây thêm trở ngại cho việc điều chỉnh MySQL performance.

## Hiểu thêm 4  tài nguyên cơ bản
Bạn cần bốn tài nguyên cơ bản để tạo database function:CPU, disk, memory and network. Nếu bất kỳ một trong các tài nguyên này không hoạt động chính xác, nó sẽ ảnh hưởng đến database server và dẫn đến performance kém.

Để hiểu đúng các tài nguyên cơ bản, bạn cần tập trung vào hai lĩnh vực cụ thể, đó là chọn đúng phần cứng và xử lý sự cố với nó.

Luôn đảm bảo sử dụng các performance components toàn diện khi chọn phần cứng cho cơ sở dữ liệu MySQL. Không chỉ lựa chọn tốt nhất các ngăn xếp, mà còn đảm bảo rằng cần phải có sự cân bằng phù hợp giữa chúng. Chúng ta thường thấy rằng các doanh nghiệp có xu hướng chọn các máy chủ có CPU nhanh và đĩa lớn, nhưng họ bị nhầm với memory bị bỏ đói cuối cùng sẽ giết chết performance.

Trong một số tình huống, việc thêm memory trở nên rất đáng kể để cải thiện performance. Nó trông có vẻ hơi trực quan, nhưng trong hầu hết các trường hợp, việc sử dụng quá mức các đĩa ảnh hưởng trực tiếp đến database performance. Vì sự thiếu hụt vùng memory để lưu dữ liệu máy chủ, gây tốn kém trong việc làm giảm database performance.

Khi nói đến khắc phục sự cố, luôn luôn kiểm tra hiệu suất của cả bốn tài nguyên cơ bản. Xác nhận một cách định tính rằng họ đang thực hiện theo sự cải thiện nhu cầu trong các chỉ tiêu. Đưa việc kiểm toán này vào xem xét thường xuyên sẽ nhanh chóng giải quyết các vấn đề lớn xảy ra.

Khi nói đến khắc phục sự cố, luôn luôn kiểm tra hiệu suất của cả bốn tài nguyên cơ bản. Xác nhận một cách định tính rằng các tài nguyên này đang thực hiện ổn. Đưa việc kiểm toán này vào xem xét thường xuyên sẽ nhanh chóng giải quyết các vấn đề lớn xảy ra.

## Truy vấn phân trang
Các web có phân trang sẽ làm máy chủ chậm lại. Khi hiển thị cho bạn một trang kết quả, với một liên kết để đến trang tiếp theo, các ứng dụng này thường nhóm và sắp xếp theo cách không thể sử dụng index và chúng sử dụng hàm LIMIT và offset khiến máy chủ thực hiện tạo nhiều công việc, sau đó loại bỏ các rows.

Bạn có thể thấy việc tối ưu hóa trong chính giao diện người dùng. Thay vì hiển thị số trang chính xác trong kết quả và liên kết đến trang riêng lẻ, bạn chỉ có thể hiển thị một liên kết đến trang tiếp theo. Bạn cũng có thể ngăn mọi người đi đến các trang không liên quan.

Về phía truy vấn, thay vì sử dụng LIMIT với offset, bạn có thể chọn thêm một row so với nhu cầu của mình và khi người dùng nhấp vào liên kết "Trang tiếp theo", bạn có thể chỉ định row cuối cùng làm điểm bắt đầu cho tập kết quả tiếp theo . Ví dụ: nếu người dùng đã xem một trang có row từ 101 đến 120, bạn cũng sẽ phải chọn row 121; để hiển thị trang tiếp theo, bạn truy vấn máy chủ cho các row lớn hơn hoặc bằng 121, giới hạn 21.

## Tối ưu hóa các MySQL Subqueries
Các Subqueries là object của công việc tối ưu hóa bởi nhóm tối ưu hóa và các phiên bản sắp tới của MySQL có thể có nhiều subquery tối ưu hóa. Hãy kiểm tra xem những tối ưu hóa nào sẽ kết thúc trong code được phát hành và mức độ khác biệt mà chúng sẽ tạo ra. 

## Mysql Query Cache
Một trong những khía cạnh quan trọng nhất của việc đo lường performance là lưu trữ nội dung. MySQL cung cấp bộ nhớ đệm truy vấn cơ sở dữ liệu lưu trữ việc thực thi câu lệnh SELECT và kết quả được truy xuất. Do đó, bất cứ khi nào bạn tạo một cơ sở dữ liệu trùng lặp, bạn gọi bộ đệm truy vấn MySQL, nó sẽ trả lời bạn và hiển thị kết quả từ bộ đệm và không có thao tác nào sẽ được phân tích cú pháp nhiều lần. Theo cách này, bạn có thể tối đa hóa quá trình tối ưu hóa bộ đệm của MySQL.

Để thiết lập MySQL query cache, bạn phải thêm một vài cài đặt vào MySQL. Trước hết, bạn phải kiểm tra xem bộ đệm truy vấn có khả dụng hay không bằng lệnh sau:

```
mysql> SHOW VARIABLES LIKE 'have_query_cache';
```

Khi kết quả trả về là YES. Điều này có nghĩa là MySQL cache hoạt động tốt.

```
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| have_query_cache | YES   |
+------------------+-------+
```

Bây giờ, bạn có thể thiết lập kích thước và loại bộ đệm truy vấn MySQL. Hãy nhớ kích thước mặc định tối thiểu là 40KB. Kích thước tối đa là 32MB. Bạn có thể thiết lập MySQL query_cache_size bằng cách sử dụng lệnh sau:

```
mysql> SET GLOBAL query_cache_size = 40000;
```

Type bộ đệm truy vấn có thể xác định tất cả các kết nối. Bạn cũng có thể tắt bộ đệm Truy vấn như sau:

```
mysql> SET SESSION query_cache_type = OFF;
```

Bạn cũng có thể đặt các giá trị như 0,1 và 2 để thiết lập trạng thái kết nối.

## Sử dụng Memcached cho MySQL Caching
Memcached  là một hệ thống lưu trữ bản sao các đối tượng (objects) và dữ liệu được truy cập nhiều lần để tăng tốc độc truy xuất. Mục đích chính của nó là để tăng tốc độ ứng dụng web bằng cách truy vấn cơ sở dữ liệu bộ nhớ đệm, nội dung, hoặc kết quả tính toán khác.

Để sử dụng memcache, bạn đơn giản chỉ sử dụng 2 cách dưới đây :
* Lưu trữ giá trị V với khóa K
* Truy xuất giá trị V với khóa K

Chỉ với 2 cơ chế đơn giản này, bạn có thể làm được rất nhiều việc và đem lại một hiệu suất không đơn giản chút nào cho trang web của bạn.
Để hiểu rõ hơn về memcached, bạn có thể đọc [hướng dẫn về cách thiết lập memcache trong php](https://www.cloudways.com/blog/memcached-with-php/) .

Trên đây là một số tips điều chỉnh MySQL Performance nhằm tối ưu hóa cơ sở dữ liệu được mình tham khảo tại [đây](https://www.cloudways.com/blog/mysql-performance-tuning/) của Shahroze Nawaz. Hy vọng sẽ giúp ích cho các bạn khi làm việc với cơ sở dữ liệu.