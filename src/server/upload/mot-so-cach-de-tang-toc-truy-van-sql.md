## SQL Processing & Query Execution
Để cải thiện hiệu năng của các truy vấn SQL, trước hết bạn cần biết điều gì xảy ra khi bạn thực thi một câu truy vấn SQL.

Đầu tiên, câu truy vấn được đưa vào một cây phân tích cú pháp. Câu truy vấn được kiểm tra xem nó có phù hợp về mặt cú pháp và ngữ nghĩa không. Trình phân tích cú pháp tạo ra một biểu diễn nội bộ của câu truy vấn đầu vào và kết quả được đưa vào rewrite engine. Sau đó, optimizer tìm ra kế hoạch thực thi tối ưu cho câu truy vấn. Kế hoạch thực thi định nghĩa chính xác thuật toán nào được sử dụng cho mỗi thao tác và thực hiện như thế nào.

Để tìm ra kế hoạch thực hiện tối ưu nhất, optimizer liệt kê ra tất cả các kế hoạch thực hiện có thể , xác định chất lượng và chi phí của mỗi kế hoạch, lấy thông tin về trạng thái của cơ sở dữ liệu hiện tại và sau đó chọn ra kế hoạch thực hiện tốt nhất. Do optimizer có thể không hoàn hảo, developer đôi khi cần kiểm tra và điều chỉnh thủ công các kế hoạch thực thi được optimizer tạo ra để có hiệu suất tốt hơn.
Vậy thế nào là một kế hoạch truy vấn tốt.

Số lượng i/o đĩa được yêu cầu, chi phí CPU và thời gian phản hồi tổng thể có thể được quan sát bởi database client. Các thông số trên đều đóng vai trò rất lớn vào chất lượng của một kế hoạch thực thi.
Tiếp theo, kế hoach truy vấn đã chọn được thực hiện và kết quả của câu truy vấn được trả về.
![](https://images.viblo.asia/f680c14b-6cc7-4d24-8d75-dfe42a4e1358.png)
Điều đó có nghĩa là khi viết truy vấn, bạn không chỉ cần tuân theo một tiêu chuẩn nhất định mà còn cần quan tâm đến vấn đề về hiệu suất trong câu truy vấn của bạn.

Việc đầu tiên cần quan tâm là các phần trong câu truy vấn mà vấn đề về hiệu suất có thể xảy ra. Nói chung, có một số từ khóa chính mà người mới cần quan tâm:
* Mệnh đề `WHERE`
* Phép `JOIN`
* Mệnh đề `HAVING`

Cách tiếp cận này khá đơn giản nhưng nó đủ tốt cho người mới bắt đầu mặc dù cũng rất khó phát hiện. Sau đây là một số cách để bạn cải thiện hiệu năng các câu truy vấn của mình.

## 1. Chỉ lấy ra dữ liệu cần thiết
Càng nhiều dữ liệu càng tốt không phải là điều bạn cần khi viết một câu truy vấn SQL. Bạn không chỉ làm mờ nhạt đi những dữ liệu thực sự cần thiết mà còn làm giảm hiệu suất khi phải xử lý quá nhiều dữ liệu. Đó là lý do ta cần quan tâm các câu lệnh `SELECT`, mệnh đề `DISTINCT` và toán tử `LIKE`. Điều đâu tiên bạn có thể kiểm tra đó là câu lệnh `SELECT` có nhỏ gọn nhất có thể không. Mục đích của bạn ở đây là loại bỏ các cột không cần thiết khỏi `SELECT`. Bằng cách này, bạn bắt buộc chỉ lấy những dữ liệu mà bạn thực sự cần cho mục tiêu truy vấn của mình.

Trong trường hợp bạn có các truy vấn con tương quan có sử dụng `EXISTS`, bạn nên cố gắng sử dụng hằng số trong câu lệnh `SELECT` thay vì chọn giá trị của một cột thực tế. Điều này thực sự hữu ích khi bạn dùng chỉ để kiểm tra sự tồn tại. Note: Truy vấn con tương quan là các truy vấn phụ sử dụng các giá trị từ truy vấn ngoài.

Sau đây là một ví dụ để hiểu ý nghĩa của việc sử dụng hằng số:
```
SELECT driverslicensenr, name 
FROM Drivers 
WHERE EXISTS (SELECT '1' FROM Fines WHERE fines.driverslicensenr = drivers.driverslicensenr);
```
Tip: Việc sử dụng truy vấn con tương quan không phải lúc nào cũng là ý tưởng hay và ta có thể loại bỏ chúng bằng một số cách, với ví dụ trên, ta có thể viết lại bằng cách sử dụng `JOIN`
```
SELECT driverslicensenr, name 
FROM drivers 
INNER JOIN fines ON fines.driverslicensenr = drivers.driverslicensenr;
```
Câu lệnh `SELECT DISTINCT` được sử dụng để chỉ trả về các giá trị khác biệt. `DISTINCT` là một từ khóa mà bạn nên cố gắng tránh nếu có thể. Thời gian thực thi của câu lệnh sẽ chỉ tăng nếu bạn đưa từ khóa này vào trong câu lệnh SQL của mình. Do đó, luôn luôn là một ý tưởng tốt để xem xét bạn có thực sự cần toán tử `DISTINCT` này để có được kết quả mà bạn mong muốn hay không.

Khi bạn sử dụng toán tử `LIKE` trong câu truy vấn, index sẽ không được sử dụng nếu pattern bắt đầu với `%` hoặc `_`. Từ một quan điểm khác, bạn cũng có thể cho rằng loại truy vấn này sẽ truy xuất quá nhiều bản ghi không cần thiết đáp ứng mục tiêu truy vấn của bạn.

Kết luận, với sự hiểu biết về dữ liệu được lưu trữ trong database, hãy dây dựng những câu truy vấn lọc ra những dữ liệu thực sự cần thiết với mục đích của bạn.
## 2. Giới hạn kết quả trả về
Khi bạn không thể tránh được việc lọc ra dữ liệu cần thiết trên câu lệnh `SELECT`, bạn có thể xem xét giới hạn kết quả theo những cách khác. Dưới đây là một số phương pháp tiếp cận như sử dụng mệnh đề `LIMIT`.

Bạn có thể thêm mệnh đề `LIMIT` hoặc `TOP` vào câu truy vấn để giới hạn số hàng lớn nhất của tập kết quả. Ví dụ:
```
SELECT TOP 3 * FROM Drivers;
```
Ngoài ra bạn cũng có thể sử dụng mệnh đề `ROWNUM`, tương đương với việc sử dụng mệnh đề `LIMIT` trong câu truy vấn của bạn.
```
SELECT * 
FROM Drivers 
WHERE driverslicensenr = 123456 AND ROWNUM <= 3;
```
## 3. Không làm cho truy vấn phức tạp hơn mức cần thiết
Cố gắng giữ cho các truy vấn của bạn đơn giản và hiệu quả. Điều này nghe có vẻ ngu ngốc nhưng việc làm cho các truy vấn đơn giản trở lên phức tạp là hoàn toàn có thể. Các ví dụ được đề cập trong các phần tiếp theo sẽ cho thấy các truy vấn đơn giản bị thực hiện phức tạp hơn những gì chúng cần.

Khi bạn sử dụng toán tử `OR` trong câu truy vấn, có thể bạn không sử dụng index.
index là một cấu trúc dữ liệu giúp tăng tốc cho việc tìm kiếm dữ liệu trong bảng cơ sở dữ liệu, nhưng nó sẽ cần chi phí: việc ghi và không gian lưu trữ cho index. Việc không sử dụng index sẽ khiến câu truy vấn mất nhiều thời gian hơn để chạy và còn gây lãng phí vì đã tốn chi phí để tạo index mà lại không sử dụng.

Xem xét câu truy vấn:
```
SELECT driverslicensenr, name 
FROM Drivers 
WHERE driverslicensenr = 123456 OR driverslicensenr = 678910 OR driverslicensenr = 345678;
```
Bạn có thể thay thế bằng câu lệnh sau:
```
SELECT driverslicensenr, name 
FROM Drivers 
WHERE driverslicensenr IN (123456, 678910, 345678);
```
Bạn cần phải cẩn thận khi sử dụng toán tử `UNION` vì bạn truy vấn vào một bảng nhiều lần, đồng thời, khi sử dụng `UNION`, thời gian thực hiện truy vấn cũng tăng lên. Các giai pháp có thể thay thế cho UNION là làm cho tất cả các điều kiện cần thiết trong một mệnh đề `SELECT` duy nhất hoặc sử dụng `OUTER JOIN` thay vì `UNION`

Khi câu truy vấn của bạn có chứa toán tử `NOT`, index cũng không được sử dụng giống như `OR`

Xem xét câu truy vấn sau:
```
SELECT driverslicensenr, name FROM Drivers WHERE NOT (year > 1980);
```
Truy vấn trên sẽ chạy chậm hơn so với những gì bạn mong đợi, chủ yếu vì nó được xây dựng phức tạp hơn rất nhiều. Xem xét thay thế `NOT` bằng các toán tử so sánh, >, <> hay !>. Ví dụ trên có thể viết lại như sau:
```
SELECT driverslicensenr, name FROM Drivers WHERE year <= 1980;
```
Toán tử `AND` cũng là một toán tử không sử dụng index và làm giảm tốc độ truy vấn của bạn nếu sử dụng một cách phức tạp và không hiệu quả:
```
SELECT driverslicensenr, name 
FROM Drivers 
WHERE year >= 1960 AND year <= 1980;
```
Sẽ tốt hơn nếu viết lại câu truy vấn trên sử dụng toán tử `BETWEEN`
```
SELECT driverslicensenr, name 
FROM Drivers 
WHERE year BETWEEN 1960 AND 1980;
```
Một số trường hợp index không được sử dụng mà ta nên tránh là toán tử `ALL`, hay khi sử dụng việc tính toán trong mệnh đề `WHERE`
## 4. Ràng buộc điều kiện một cách hợp lý
Điều này đặc biệt đúng cho các phép `JOIN` và mệnh đề `HAVING`

Khi bạn thực hiện `JOIN` hai bảng, việc xem xét thứ tự của các bảng trong phép `JOIN` là rất quan trọng. Nếu bạn nhận thấy rằng một bảng lớn hơn đáng kể so với bảng còn lại, bạn nên viết lại truy vấn với bảng lớn được đặt ở cuối cùng của phép `JOIN`. 

Khi bạn thêm quá nhiều điều kiện vào phép `JOIN`, về cơ bản bạn buộc SQL chọn một con đường join nhất định dù con đường này không phải luôn mang lại hiệu suất tốt.

Mệnh đề `HAVING` được thêm vào SQL vì mệnh đề `WHERE` không thể sử dụng được với các hàm tổng hợp. `HAVING` thường được sử dụng với `GROUP BY` để ràng buộc những nhóm bản ghi được trả về chỉ khi chúng thỏa mãn điều kiện cụ thể. Tuy nhiên nếu sử dụng mệnh đề này trong câu truy vấn, index cũng không được sử dụng.

Xem xét ví dụ sau:
```
SELECT state, COUNT(*) FROM Drivers WHERE state IN ('GA', 'TX') GROUP BY state ORDER BY state
SELECT state, COUNT(*) FROM Drivers GROUP BY state HAVING state IN ('GA', 'TX') ORDER BY state
```
Câu truy vấn đầu tiên sử dụng mệnh đề `WHERE` để ràng buộc số hàng được group, trong khi đó câu truy vấn thứ hai group tất cả các hàng trong bảng sau đó sử dụng `HAVING` trên các nhóm thu được. Trong trường hợp này, việc sử dụng mệnh đề `WHERE` rõ ràng tốt hơn do không ràng buộc vào tập kết quả mà thay vào đó ràng buộc được đặt vào tập các bản ghi trung gian trong câu truy vấn.

Lưu ý sự khác biệt giữa hai mệnh đề là `WHERE` áp dụng điều kiện trên các hàng riêng lẻ, trong khi đó mệnh đề `HAVING` áp dụng điêù kiện trên kết quả của tập hợp như `MIN`, `MAX`, `SUM` được tạo ra từ nhiều hàng.
## Từ truy vấn đến kế hoạch thực thi
Việc đánh giá chất lượng các câu truy vấn là rất khó và có rất nhiều điều cần xem xét khi tìm kiếm các lựa chọn thay thế cho một câu truy vấn. Mọi sự trợ giúp đều hữu ích và đó là lý do vì sao cần cách tiếp cận có cấu trúc để tối ưu hóa truy vấn với một số công cụ.

Cách tiếp cận có cấu trúc chủ yếu dựa trên kế hoạch truy vấn. Như đã biết, câu truy vấn đầu tiên được đưa vào cây phân tích cú pháp và xác định chính xác thuật toán nào sẽ được sử dụng cho mỗi hành động và thực hiện như thế nào.

Các kế hoạch thực thi được tạo ra bởi optimizer có thể được điều chỉnh thủ công. Với những trường hợp như vậy, bạn cần phân tích lại truy vấn của mình bằng cách xem xét kế hoạch truy vấn. Để xem được kế hoạch truy vấn, bạn sẽ cần những công cụ mà hệ quản trị cớ sở dữ liệu cung cấp. Một số công cụ mà bạn có thể sử dụng là:
* Các gói công cụ chức năng tạo ra hình ảnh trực quan của một kế hoạch truy vấn như ví dụ dưới đây:

![](https://images.viblo.asia/08b6489a-ab28-496f-8367-d52789f0d998.png)
* Các công cụ khác cung cấp cho bạn mô tả dạng text về kế hoach thực thi như câu lệnh `EXPLAIN PLAN` trong Oracle, `EXPLAIN` trong MySQL, PostgreSQL, hay `EXPLAIN QUERY PLAN` trong SQLite.

Bài viết đã cung cấp cho bạn một cái nhìn nhỏ về hiệu suất truy vấn SQL, một số cách để cải thiện hiệu năng của câu truy vấn SQL và cách tiếp cận nâng cao để cải thiện hiệu năng bằng cách phân tích kế hoạch truy vấn của optimizer với `EXPLAIN`. Để hiểu rõ hơn về `EXPLAIN`, bạn có thể tham khảo [tại đây](https://www.dalibo.org/_media/understanding_explain.pdf)

Tài liệu tham khảo:

https://towardsdatascience.com/sql-tutorial-how-to-write-better-queries-108ae91d5f4e