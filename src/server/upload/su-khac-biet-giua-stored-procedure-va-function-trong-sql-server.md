# 1. Giới thiệu
*   Cả stored procedure và function đều là các đối tượng cơ sở dữ liệu chứa một tập các câu lệnh SQL để hoàn thành một tác vụ.
*   Một stored procedure (thủ tục lưu trữ) có thể sử dụng lại nhiều lần. Vì vậy, nếu bạn có một truy vấn SQL mà bạn có ý định sử dụng nhiều lần thì hãy lưu nó dưới dạng một thủ tục lưu trữ, sau đó chỉ cần gọi nó để nó thực thi truy vấn SQL của bạn. Ngoài ra, bạn củng có thể truyền tham số cho một thủ tục lưu trữ...
*   Một function (hàm) được biên dịch và thực thi mỗi khi hàm đó được gọi. Hàm phải trả về giá trị...
> Để so sánh được sự khác biệt giữa Stored Procedure và Function bạn phải có kiến thức kha khá về SQL. 
# 2. Sự khác biệt cơ bản giữa Stored Procedure và Function
* Thủ tục lưu trữ có thể trả về giá trị zero, một hoặc nhiều giá trị. Trong khi hàm phải trả về một giá trị duy nhất (có thể là bảng).
* Các hàm chỉ có thể có các tham số đầu vào cho nó trong khi thủ tục lưu trữ có thể có các tham số đầu vào hoặc đầu ra.
* Hàm có thể được gọi từ thủ tục lưu trữ trong khi thủ tục lưu trữ không thể được gọi từ hàm.
# 3. Sự khác biệt nâng cao giữa Stored Procedure và Function
* Các thủ tục không thể được sử dụng trong câu lệnh SELECT trong khi hàm có thể được nhúng trong câu lệnh SELECT. Bởi vì một thủ tục có thể trả về nhiều tập kết quả nên nó không phù hợp để sử dụng trong câu lệnh SELECT.
* Các thủ tục lưu trữ không thể được sử dụng trong các câu lệnh WHERE / HAVING / SELECT trong khi hàm thì có thể.
* Một ngoại lệ có thể được xử lý bằng [try-catch](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/try-catch) trong thủ tục lưu trữ, đối với hàm thì không thể.
* Có thể sử dụng [Transactions](https://docs.microsoft.com/vi-vn/sql/t-sql/language-elements/transactions-transact-sql?view=sql-server-ver15) trong thủ tục lưu trữ, với hàm thì không thể.
# 4. Tham khảo
* Bài viết này mình đã chia sẽ với các bạn một số khác biệt giữa Stored Procedure và Function. Hi vọng bài viết đem lại môt số thông tin giá trị đối với bạn.
* Các bạn có thể tham khảo thêm một số tài liệu: [Stored Procedure](https://www.dotnettricks.com/learn/sqlserver/different-types-of-sql-server-stored-procedures), [Function](https://www.dotnettricks.com/learn/sqlserver/different-types-of-sql-server-functions)