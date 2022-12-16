Khi đi ứng tuyển vào các vị trí lập trình viên, ngay cả những vị trí cho những nhân viên mới thì việc nắm vững được ngôn ngữ truy vấn cấu trúc SQL luôn là một kỹ năng quan trọng mà nhà tuyển dụng muốn ứng viên có được. Cá nhân mình đã từng trải qua vài cuộc phỏng vấn với nhà tuyển dụng thì mình thấy sql là vấn đề luôn luôn đc hỏi đến, hôm nay mình viết bài này để chia sẻ về môt vài câu hỏi sql mình đã đc hỏi và những câu mình sưu tập được với mọi người và cũng để giữ lại cho riêng mình :)

### 1. UNION dùng để làm gì? sự khác nhau giữa UNION và UNION ALL?
* **UNION** và **UNION ALL** đều dùng để hợp hai tập bản ghi cùng cấu trúc, nhưng giữa hai mệnh đề có một khác biệt khá tinh tế: **UNION** loại bỏ các bản ghi trùng lặp trước khi trả lại kết quả, còn **UNION ALL** giữ lại tất cả các bản ghi từ hai tập ban đầu.
```sql
CREATE TABLE #test1(id INT, txt VARCHAR(10) )
CREATE TABLE #test2(id INT, txt VARCHAR(10) )
GO
INSERT #test1 VALUES(1,'a1')
INSERT #test1 VALUES(2,'a2')
 
INSERT #test2 VALUES(1,'a1') -- trùng với một bản ghi của #test1
INSERT #test2 VALUES(3,'a3')
 
-- UNION
SELECT * FROM #test1
UNION
SELECT * FROM #test2
 
id          txt
----------- ----------
1           a1
2           a2
3           a3
 
(3 ROW(s) affected)
 
-- UNION ALL
SELECT * FROM #test1
UNION ALL
SELECT * FROM #test2
 
id          txt
----------- ----------
1           a1
2           a2
1           a1
3           a3
 
(4 ROW(s) affected)
```
Điều quan trọng cần lưu ý là hiệu suất của **UNION ALL** thường sẽ tốt hơn **UNION**, vì **UNION** yêu cầu máy chủ thực hiện công việc bổ sung để loại bỏ các bản ghi bị trùng. Vì vậy, trong trường hợp là chắc chắn rằng sẽ không có bản sao nào, hoặc nơi có bản sao không phải là một vấn đề, sử dụng UNION ALL sẽ được khuyến khích vì lý do hiệu suất. Chẳng hạn khi cần hợp danh sách khách hàng từ Hà Nội và Sài Gòn (lưu ở hai bảng khác nhau), hoặc cần hợp các hóa đơn bán hàng của năm 2009 và 2010 (cũng lưu ở hai bảng khác nhau). Khi đó bạn đã biết theo logic của dữ liệu các tập này không thể trùng nhau.

### 2. Cho một bảng có một cột được định nghĩa đơn giản là customer_id VARCHAR (100), hãy xem xét hai kết quả truy vấn sau đây: 
```sql
SELECT count(*) AS total FROM orders;
```
```sql
+-------+
| total |
+-------+
|  100  |
+-------+
```
```sql
SELECT count(*) AS cust_123_total FROM orders WHERE customer_id = '123';
```
```sql
+----------------+
| cust_123_total |
+----------------+
|       15       |
+----------------+
```
### Với kết quả truy vấn ở trên, kết quả của truy vấn dưới đây sẽ là gì?
```sql
SELECT count(*) AS cust_not_123_total FROM orders WHERE customer_id <> '123';
```
Câu trả lời có vẻ đơn giản là 85 (tức là 100 - 15). Tuy nhiên, không phải lúc nào đó cũng là câu trả lời đúng. Cụ thể, bất kỳ bản ghi nào có customer_id là **NULL** sẽ không được bao gồm trong cả hai số (nghĩa là chúng sẽ không được bao gồm trong cust_123_total, cũng như chúng sẽ không được bao gồm trong cust_not_123_total). Ví dụ: nếu một trong 100 khách hàng có customer_id là **NULL**, kết quả của truy vấn cuối cùng sẽ là:
```sql
+--------- ----------+
| cust_not_123_total |
+--------------------+
|         84         |
+--------------------+
```
### 3. Cho các bảng sau:
```sql
sql> SELECT * FROM runners;
+----+--------------+
| id | name         |
+----+--------------+
|  1 | John Doe     |
|  2 | Jane Doe     |
|  3 | Alice Jones  |
|  4 | Bobby Louis  |
|  5 | Lisa Romero  |
+----+--------------+

sql> SELECT * FROM races;
+----+----------------+-----------+
| id | event          | winner_id |
+----+----------------+-----------+
|  1 | 100 meter dash |  2        |
|  2 | 500 meter dash |  3        |
|  3 | cross-country  |  2        |
|  4 | triathalon     |  NULL     |
+----+----------------+-----------+
```
### kết quả của câu truy vấn dưới đây là?
```sql
SELECT * FROM runners WHERE id NOT IN (SELECT winner_id FROM races)
```
Nhìn qua có thể bạn sẽ dễ bị nhầm lẫn. Câu trả lời là câu truy ván trên sẽ trả về rỗng. Lý do:  Nếu tập hợp được đánh giá bởi điều kiện SQL NOT IN chứa bất kỳ giá trị nào là null, thì truy vấn bên ngoài ở đây sẽ trả về một tập rỗng, ngay cả khi có nhiều id runner khớp với winner_ids :)

### 4. Làm thế nào tìm ra một bản ghi trùng lặp?
* **Bản ghi trùng lặp trên với 1 trường**
```sql
 SELECT name, COUNT(email) 
 FROM users
 GROUP BY email
 HAVING COUNT(email) > 1 
```
*  **Bản ghi trùng lặp với nhiều trường**
```sql
 SELECT name, email, COUNT(*)
 FROM users
 GROUP BY name, email
 HAVING COUNT(*) > 1
```
### 5.  Sự khác nhau giữa Delete và Truncate


| TRUNCATE | DELETE | 
| -------- | -------- | 
| Xóa dữ liệu nhưng không xóa cấu trúc    | Xóa dữ liệu nhưng không xóa cấu trúc    |
| Xóa tất cả dòng dữ liệu trong bảng     | Xóa các dòng dữ liệu trong bảng     |
| Không sử dụng được WHERE| Sử dụng được WHERE|
|KHÔNG ghi lại các dòng xóa trong transaction log| CÓ ghi lại các dòng xóa trong transaction log|

Phần 2: https://viblo.asia/p/mot-vai-cau-hoi-phong-van-sql-phan-2-E375z0g6ZGW

bài viết tham khảo:
* https://dinhnn.com/2011/07/04/s%C6%B0%CC%A3-khac-nhau-gi%C6%B0%CC%83a-truncate-va-delete/
* https://viblo.asia/p/nhung-thu-duong-nhu-co-ve-giong-nhau-trong-sql-Eb85oBoBl2G
* https://www.toptal.com/sql/interview-questions