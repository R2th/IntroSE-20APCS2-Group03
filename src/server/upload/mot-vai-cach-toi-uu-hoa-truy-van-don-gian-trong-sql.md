Dù cho hiện tại có rất nhiều hệ quản trị cơ sở dữ liệu NoSQL ra đời với rất nhiều mặt cải tiến nhưng SQL DBs vẫn rất được ưa chuộng và vẫn là loại hệ quản trị cơ sở dữ liệu được sử dụng nhiều nhất. Với một DB đủ lớn nếu truy vấn không được tối ưu tốt thì việc ứng dụng chạy ỳ ạch là khó thể tránh khỏi. Trong bài viết này mình sẽ đưa ra một vài phương pháp đơn giản để tối ưu truy vấn giúp việc thao tác với dữ liệu ở trong DB trở nên nhanh hơn.
# Sử dụng index
Dùng index một cách ĐÚNG ĐẮN sẽ giúp việc thực thi truy vấn nhanh hơn rất nhiều lần. 
Index giống như một cái mục lục vậy, khi bạn muốn tìm đến một phần hay một chương trong cuốn sách thì chỉ cần nhìn mục lục và số trang rồi lật đến trang đó là xong, thay vì mất công xem tìm từng trang một trong cuốn sách.

Ví dụ với sample database quen thuộc: sakila. Trong db này có một bảng film chứa thông tin về bộ phim, trong đó có trường description chứa miêu tả về bộ phim, bây giờ mình muốn lấy ra những phim có dòng description bắt đầu là "An emotional" thì câu truy vấn sẽ là

`select * from film where description like "A emotional%";`

Sử dụng câu lệnh `explain` chúng ta sẽ thấy được mysql cần duyệt qua 1000 dòng để thực thi câu truy vấn này.
![](https://images.viblo.asia/f7b96020-b2bd-4b85-8a04-9bbba4ff9a8c.png)
Mình sẽ thêm index vào film description bằng cách chạy câu lệnh `create index idx_film_description on film(description(15));` để xem sự khác biệt sẽ như thế nào.
![](https://images.viblo.asia/e4365a60-e7ec-4a3b-b7a4-8c076a69b86c.png)
Bây giờ thì mysql chỉ cần phải duyệt 57 dòng để thực thi câu truy vấn trên, nhanh hơn rất nhiều lần phải không nào :D 

Tuy nhiên, như mình đã nói là chúng ta cần phải sử dụng index một cách "đúng đắn"  bởi vì việc sử dụng index sẽ làm cho các câu lệnh thay đổi dữ liệu như `INSERT`, `UPDATE` và `DELETE` chậm hơn. Nếu dữ liệu của bạn thường xuyên phải thay đổi, các thao tác ghi là chính thì chúng ta không nên sử dụng index, ngoài ra thì nếu có function hoặc operation được sử dụng trên trường đó thì cũng không nên dùng index. Còn nếu dữ liệu của bạn có tính ổn định cao, chủ yếu thực thi các thao tác đọc thì Index sẽ là một sự lựa chọn tuyệt vời.

Sau đây là một số mẹo khi sử dụng index:
* Bất kỳ một Index nào cũng làm tăng thời gian để thực hiện các câu lệnh INSERTS, UPDATES, DELETES vì vậy số Index không nên quá nhiều. Cố gắng hạn chế, khoảng 4-5 index trên một bảng, không nên nhiều. Nếu bạn có bảng dữ liệu chỉ để chỉ đọc, khi đó số lượng index có thể gia tăng.
* Giữ index càng nhỏ càng tốt. Giúp giảm bớt kích thước index và giảm bớt số yêu cầu để đọc index.
* Nên tạo Index trên các cột mà có giá trị là Interger hơn là giá trị chuỗi.
* Nếu bạn tạo ra một index hỗn hợp(gồm nhiều cột), thứ tự của những cột là khóa rất quan trọng. Cố gắng đặt thứ tự các cột là khóa làm tăng khả năng Select, với hầu hết các cột Select để bên trái của khóa.
* Nếu bạn muốn dùng lệnh Join nhiều bảng, cố gắng tạo các khóa đại diện có kiểu dữ liệu là interger cho mục đích này và tạo index trên những cột đó.
* Tạo khóa chính đại diện là kiểu Interger(ví dụ: identity) nếu mà bảng dữ liệu đó không có nhiều thao tác insert.
* Clustered indexes là được yêu thích hơn noclustered, nếu bạn cần chọn một vùng giá trị hay bạn cần sắp xếp tập kết quả với GROUP BY hay ORDER BY.
* Nếu ứng dụng của bạn sẽ thực hiện cùng một truy vấn nhiều lần trên một bảng, nên xem xét việc tạo một index trên toàn bảng.

# Chỉ lấy ra những dữ liệu cần thiết
Cái này cực kỳ đơn giản, nói ra ai cũng biết nhưng mà nhiều người lười (như mình) thì hay quen tay sẽ lấy ra hết các trường trong một bộ vì gõ nó nhanh hơn :) cứ `SELECT * FROM Users` hay là trong Rails thì còn nhanh hơn `User.all`

Việc này với một DB nhỏ nhắn thì không thấy chậm lắm nhưng với một DB lớn, một records có nhiều trường phức tạp thì việc lấy ra hết các trường sẽ làm câu truy vấn chạy chậm một cách đáng kể và việc này khá là tai hại, vì thế chúng ta nên tập thói quen ngay từ đầu là chỉ nên lấy ra những **dữ liệu mà mình cần**.
# Hạn chế dùng bảng tạm
Việc dùng bảng tạm khiến cho việc viết câu lệnh sql dễ dàng và logic hơn nhưng về hiệu suất, nhất là dữ liệu lớn chúng ta không nên dùng nó.

Bởi vì trong các hệ quản trị cơ sở dữ liệu SQL, bảng tạm được đối xử như một bảng bình thường và nó được lưu trong RAM nếu đủ bộ nhớ, nếu bảng tạm có kích thước vượt quá một mức quy định, nó sẽ được chuyển vào ổ cứng, về tốc độ truy vấn từ bảng tạm cũng không nhanh hay chậm hơn việc truy vấn từ biến kiểu bảng nhưng có một điều nho nhỏ là việc dùng bảng tạm sẽ INSERT biến kiểu bảng vào bảng tạm, nó cũng sẽ generate ra một cái id cho mỗi record, ngoài ra thì nó cũng sẽ ghi vào log file như việc insert một bảng bình thường nên việc dùng bảng tạm sẽ tốn khá nhiều thời gian để INSERT dữ liệu. 

Do đó nếu có thể thì chúng ta nên dùng sub query hay stored procedure thay cho việc dùng bảng tạm.

# Nên dùng Joins thay cho SubQuery
Ở đây thì mình sẽ chỉ đề cập tới HQTCSDL MySQL. Nó có một thứ gọi là "MySQL Query Optimizer" để tối ưu truy vấn, nó sẽ tìm ra phương án thực thi truy vấn một cách nhanh nhất có thể.
Các bạn có thể tham khảo bài viết [này](https://viblo.asia/p/join-vs-subquery-the-problem-of-mysql-query-optimizer-mrDGMbgXezL) để hiểu rõ hơn về việc tại sao trong MySQL thường thì sử dụng Joins sẽ nhanh hơn là dùng SubQuery 
> Căn bản thì tất cả đều đi đến một kết luận chung, đó là MySQL có cơ chế hỗ trợ Join, khiến nó nhanh hơn Subquery, và do vậy chúng ta nên dùng Join, hạn chế dùng Subquery.


# Hạn chế sử dụng mệnh đề DISTINCT 
Chúng ta khi trong truy vấn có xuất hiện các records trùng lặp sẽ thường nghĩ đến việc sử dụng `DISTINCT` vì nó rất là đơn giản, thêm `DISTINCT` vào là done, mọi vấn đề được giải quyết, tuy nhiên thì việc sử dụng mệnh đề `DISTINCT` trong câu truy vấn sẽ làm chậm quá trình truy vấn dữ liệu đi rất nhiều nên chúng ta nên hạn chế tối đa việc sử dụng `DISTINCT` trong câu truy vấn.

Điều này sẽ kéo theo một điều là bạn nên sử dụng `UNION ALL` thay cho `UNION` vì ngầm định việc sử dụng `UNION` sẽ được thực hiện tương đương với câu lệnh `SELECT DISTINCT`, mà `DISTINCT` thì chậm cho nên... 
#
# Sử dụng view và Stored Procedure  thay cho các câu lệnh truy vấn phức tạp

Thời gian thực thi của mấy cái này không khác nhau nhiều tuy nhiên việc dùng view và stored procedure sẽ giúp cho request từ client được gửi tới server nhanh hơn vì chỉ phải gọi view/stored procedure thay vì đống query dài hàng km.

Ngoài ra thì các bạn nên tránh việc sử dụng các View lồng nhau do vấn đề hiệu năng mặc dù điều này được cho phép trong hầu hết các HQTCSDL.

# Lời kết
Hi vọng với bài viết này, các bạn có thể biết thêm một vài cách đơn giản để tối ưu câu lệnh truy vấn trong SQL và có thể áp dụng ngay vào trong các project hiện tại hoặc trong tương lai

Tài liệu tham khảo:

*[5 Tips to Optimize Your SQL Queries](http://www.vertabelo.com/blog/technical-articles/5-tips-to-optimize-your-sql-queries)*

*[Join vs Subquery: The Problem Of MySQL Query Optimizer?](https://viblo.asia/p/join-vs-subquery-the-problem-of-mysql-query-optimizer-mrDGMbgXezL)*

[*THỦ THUẬT TỐI ƯU HÓA SQL*](https://sqlvietnam.wordpress.com/2016/01/09/thu-thuat-toi-uu-hoa-sql/)