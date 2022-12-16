# I. Lời nói đầu
![](https://images.viblo.asia/d9969007-426f-42aa-b10f-8935a48e7d7f.png)

SQL (Structured Query Language) là ngôn ngữ truy vấn mang tính cấu trúc, là một loại ngôn ngữ máy tính phổ biến để tạo, sửa, và lấy dữ liệu từ một hệ quản trị cơ sở dữ liệu quan hệ. 
Ngôn ngữ này phát triển vượt xa so với mục đích ban đầu là để phục vụ các hệ quản trị cơ sở dữ liệu đối tượng-quan hệ. 
Nó là một tiêu chuẩn ANSI/ISO.
# II. Các câu lệnh SQL: 
# 1. SELECT
![](https://images.viblo.asia/f75b25bd-c3be-4448-b3c1-98f34e302d31.jpg)

Câu lệnh SELECT là đơn giản nhất, và bạn cần phải hiểu nó vì nó làm cơ sở cho khá nhiều lệnh khác.

Như tên của nó ngụ ý, SELECT được sử dụng để chọn dữ liệu từ cơ sở dữ liệu. Đây là cách sử dụng đơn giản nhất:

SELECT * FROM table;
Câu lệnh trên có hai phần:

SELECT *: xác định cột bạn muốn chọn, dấu * ở đây hiểu là bạn muốn chọn tất cả các cột trong bảng.
FROM table: phần này nói với công cụ cơ sở dữ liệu nơi bạn muốn trích xuất dữ liệu, thay thế "table" bằng tên của bảng cơ sở dữ liệu cần lấy.
Câu lệnh SELECT này được gọi là "select star", sử dụng dấu * là một phương pháp khá hay giúp tìm, tính toán dữ liệu trong bảng, nhưng không phải lúc nào cũng dùng câu lệnh này. Khi sử dụng select star, việc trình bày dữ liệu trả về như thế nào hoàn toàn phụ thuộc vào engine của database, bạn không thể kiểm soát thứ tự dữ liệu được trả về, vì vậy, nếu có ai đó thêm cột mới vào bảng, bạn thấy các biến trong ngôn ngữ lập trình của mình không hiển thị dữ liệu đúng. May mắn là có một giải pháp khác cho vấn đề này.

Bạn có thể nói rõ các cột muốn truy xuất, như sau:

SELECT age, name FROM people;
Truy vấn này sẽ trích xuất cột name và age từ bảng people. 

Nếu bạn muốn chọn thêm dữ liệu bổ sung, nhưng nó không được lưu trữ trong bất kỳ bảng nào, thì có thể làm như sau: 

SELECT age, '1234' FROM people;
Câu lệnh SELECT

Bất kỳ chuỗi nào bên trong dấu nháy đơn sẽ được trả về thay vì tên cột phù hợp.

# 2. WHERE
![](https://images.viblo.asia/fa7155ba-7eec-4bc6-a230-4519b900c62c.jpg)

Câu lệnh SELECT là lựa chọn tuyệt vời để lấy dữ liệu, nhưng nếu bạn muốn lọc kết quả kỹ hơn chút nữa, ví như, chỉ muốn trích xuất ra những người có màu mắt xanh, người sinh tháng 1 và làm thợ cơ khí thì phải làm sao? Đây chính là lúc sử dụng câu lệnh WHERE. WHERE cho phép áp dụng thêm các điều kiện vào SELECT, bạn chỉ cần nối nó vào cuối cùng của câu lệnh là được:

SELECT age, name FROM people WHERE age > 10;
Kết quả trả về của câu lệnh WHERE

Truy vấn này được giới hạn cho những người có tuổi lớn hơn 10. Bạn có thể kết hợp nhiều điều kiện bằng cách sử dụng toán tử AND:

SELECT age, name FROM people WHERE age > 10 AND age < 20;
Lệnh AND làm việc chính xác như nghĩa của nó trong tiếng Anh: Nó áp dụng những điều kiện khác nhau cho câu lệnh. Trong ví dụ trên, dữ liệu được trả về sẽ là bất kỳ bản ghi nào có tuổi nằm giữa 10 và 20. Do không có kết quả nào phù hợp nên không có dữ liệu nào được trả lại.

Một lệnh khác có thể được sử dụng để kết hợp điều kiện là OR. Đây là ví dụ:

SELECT age, name FROM people WHERE age > 10 OR name = 'Joe';
WHERE kết hợp với OR

Truy vấn này yêu cầu trả về những bản ghi có tuổi lớn hơn 10 hoặc tên là Joe. Chú ý, ở đây chỉ có một dấu "=", nhưng nhiều ngôn ngữ lập trình sử dụng 2 dấu bằng (==) để kiểm tra sự tương đương, điều này không cần thiết cho phần lớn các engine của database, xong bạn vẫn nên kiểm tra kỹ trên môi trường làm việc của cơ sở dữ liệu.

# 3. ORDER
![](https://images.viblo.asia/f3900947-0174-4504-b2c6-646dcbc4aaae.png)
Lệnh ORDER được sử dụng để sắp xếp kết quả trả về, sử dụng ORDER khá đơn giản, chỉ cần thêm ORDER vào cuối câu lệnh như ví dụ dưới đây:

SELECT name, age FROM people ORDER BY age DESC;
Kết quả của lệnh ORDER

Nếu cần chọn cột và thứ tự cụ thể, bạn có thể làm như sau (ASC là tăng dần, DESC là giảm dần): 

SELECT name, age FROM people ORDER BY name ASC, age DESC;
Lệnh ORDER BY

ORDER BY có lẽ là hữu ích nhất khi kết hợp với các lệnh khác.Lệnh này sẽ giúp tất cả các truy vấn sẽ trả về dữ liệu một cách hợp lý hoặc có trật tự 

# 4. JOIN
![](https://images.viblo.asia/409efca0-0170-4b87-8b26-30829b08eb30.jpg)
Lệnh JOIN được sử dụng để kết hợp các dữ liệu liên quan được lưu trữ trong một hoặc nhiều bảng. 
Dưới đây là ví dụ cơ bản:

SELECT age, name, height FROM people LEFT JOIN heights USING (name);
Có một vài chú ý ở đây. Bạn phải bắt đầu với cú pháp "LEFT JOIN", hiểu rằng bạn muốn nối một bảng bằng cách sử dụng một kiểu nối LEFT. Tiếp theo, xác định bảng mà bạn muốn nối (heights). Cú pháp USING (name) cho biết cột "name" có thể được tìm thấy trong cả hai bảng và cột này sẽ được sử dụng như một chìa khóa để kết hợp các bảng với nhau.

Đừng lo lắng nếu các cột của bạn có tên khác nhau trong mỗi bảng. Bạn có thể sử dụng "ON" thay vì "USING":

SELECT age, name, height FROM people LEFT JOIN heights ON (namea = nameb);
Kết quả trả về sau lệnh JOIN

Lệnh ON sẽ xác định rõ cột nào là chìa khóa để nối. 
Cụ thể:
(INNER) JOIN: Trả về các hàng có trong cả hai bảng.
LEFT (OUTTER) JOIN: Trả về tất cả các hàng từ bảng bên trái cùng với những bản ghi phù hợp ở bảng bên phải. Nếu không có bản ghi nào phù hợp thì những bản ghi ở bảng bên trái vẫn được trả về.
RIGHT (OUTER) JOIN: Trái ngược với kiểu nối bên trên, tất cả các hàng của bảng bên phải sẽ được trả về cùng với những hàng phù hợp của bảng bên trái.
FULL (OUTER) JOIN: Trả về tất cả những bản ghi phù hợp ở trong hai bảng.
Cú pháp INNER hay OUTER là tùy chọn, nó làm cho mọi thứ dễ hiểu hơn nhưng không nhất thiết lúc nào bạn cũng bắt buộc phải dùng đến chúng.

# 5. ALIAS
![](https://images.viblo.asia/fb6cae2b-a12d-41a9-b96e-4b85bffabfdb.jpg)

Câu lệnh này được sử dụng để tạm thời đổi tên một bảng, tên mới này chỉ tồn tại bên trong tiến trình xử lý (transaction) bạn đang chạy. Đây là cách sử dụng:

SELECT A.age FROM people A;
Có thể sử dụng bất kỳ tên phù hợp nào bạn muốn, trong ví dụ này tôi sử dụng các chữ cái trong bảng chữ cái. Trước mỗi tên cột, ALIAS sẽ được đặt trước. ALIAS này được gán cho bảng ngay sau khi khai báo. 
Tương tự:

SELECT people.age FROM people;
Thay vì phải nhập tên bảng dài, bạn chỉ cần nhập chữ cái đơn giản, dễ nhớ. Nhưng ở đây có một vấn đề nhỏ, nếu bạn chọn từ nhiều bảng, rất dễ bị nhầm lẫn giữa các cột trong bảng. Trong trường hợp các bảng đó có những cột giống tên nhau, truy vấn cơ sở dữ liệu có thể bị lỗi vì không tham chiếu chính xác được đến tên bảng hoặc ALIAS. Đây là ví dụ với hai bảng:

SELECT staff.age, staff.name, customers.age, customers.name FROM staff, customers;
Và đây là truy vấn tương tự với các ALIAS:

SELECT A.age, A.name, B.age, B.name FROM staff A, customers B;
Bảng staff được gán tên mới là A, bảng customers được gán tên mới là B. Các bảng này giúp code dễ hiểu hơn và giảm số lượng chữ cần phải gõ.

Nếu muốn đổi tên cột với ALIAS, bạn sử dụng lệnh AS:

SELECT age AS person_age FROM people;
Kết quả trả về khi thực hiện lệnh ALIAS

Khi truy vấn này được thực hiện, cột sẽ được gọi là "person_age" thay vì "age".

# 6. UNION
![](https://images.viblo.asia/0108287d-26ae-400c-8ca0-6b788fd7480e.jpg)

UNION là một lệnh tuyệt vời. Nó cho phép bạn nối các hàng với nhau. Không giống như lệnh JOIN chỉ nối thêm các cột phù hợp, UNION có thể nối các hàng không liên quan với nhau nếu có cùng một số lượng cột và tên cột. 

SELECT age, name FROM customers
UNION 
SELECT age, name FROM staff;
Kết quả trả về khi thực hiện lệnh UNION

Một câu lệnh UNION sẽ chỉ trả về những kết quả là hàng duy nhất giữa 2 truy vấn, bạn có thể sử dụng cú pháp UNION ALL để trả lại tất cả dữ liệu, kể cả những cái trùng nhau.

SELECT age, name FROM customers
UNION ALL
SELECT age, name FROM staff;
Kết quả trả về khi thực hiện lệnh UNION ALL

# 7. INSERT
![](https://images.viblo.asia/89d27326-ca15-4fc4-a892-000e07da3943.jpg)

Dùng câu lênh INSERT để chèn thêm dữ liệu vào database 

INSERT INTO people(name, age) VALUES('Joe', 102);
Bạn phải chỉ định tên bảng (people) và cột bạn muốn sử dụng (name và age). Cú pháp VALUES sau đó được sử dụng để cung cấp các giá trị cần chèn. Thứ tự của giá trị cần chèn phải được đặt đúng như thứ tự của các cột đã được chỉ định trước đó.

# 8. UPDATE
![](https://images.viblo.asia/ee8dff40-9595-4851-ba5d-cb30d108394e.jpg)

Sau khi chèn thêm dữ liệu, bạn cần phải thay đổi các hàng cụ thể. Đây là cú pháp của lệnh UPDATE:

UPDATE people SET name = 'Joe', age = 101;

Bạn phải chỉ định bảng muốn thay đổi, sau đó sử dụng cú pháp SET để xác định các cột và các giá trị mới của chúng. 

Để cụ thể hơn, bạn có thể sử dụng WHERE giống như khi thực hiện lệnh SELECT:

UPDATE people SET name = 'Joe', age = 101 WHERE name = 'James';
Thậm chí, có thể sử dụng cả toán tử điều kiện AND, OR:

UPDATE people SET name = 'Joe', age = 101 WHERE (name = 'James' AND age = 100) OR name = 'Ryan';
Hãy chú ý cách mà dấu ngoặc đơn được sử dụng để bắt buộc tuân theo các điều kiện.
# 9. UPSERT
![](https://images.viblo.asia/aea44f11-98aa-4048-ab5a-6b26a6a093bf.jpg)
UPSERT nghe có vẻ lạ, nhưng đây lại là lệnh khá hữu ích. Giả sử có một hạn chế trên bảng dữ liệu là bạn chỉ lưu những bản ghi với tên duy nhất, bạn không muốn có hai hàng trùng tên nhau xuất hiện trong bảng. Khi đó nếu cố gắng chèn nhiều giá trị "Joe" vào thì engine của database sẽ báo lỗi và từ chối làm điều đó (gần như vậy). Lệnh UPSERT cho phép bạn cập nhật bản ghi nếu nó đã tồn tại. Nếu không có lệnh này, bạn sẽ phải viết rất nhiều logic để kiểm tra như kiểm tra xem nó đã tồn tại chưa, nếu chưa tồn tại thì chèn, nếu đã tồn tại thì trích xuất khóa chính (primary key) chính xác của nó rồi cập nhật. 

Tiếc là lệnh này được thực hiện khác nhau trên những database khác nhau. PostgreSQL gần đây đã có thêm lệnh này, trong khi MySQL đã có từ rất lâu. Đây là cú pháp lệnh UPSERT trên MySQL để bạn tham khảo:

INSERT INTO people(name, age)
VALUES('Joe', 101)
ON DUPLICATE KEY UPDATE age = 101;
Nếu tinh ý, bạn sẽ nhận thấy rằng cách này thực chất là một lệnh cập nhật kết hợp với lệnh chèn, có thể hiểu là "cập nhật nếu chèn không thành công".

# 10. DELETE

![](https://images.viblo.asia/34c08c2a-6eed-4fc4-963d-039d00b743c6.jpg)

Lệnh DELETE được sử dụng để xóa hoàn toàn các bản ghi, nó có thể khá nguy hiểm nếu bị lạm dụng.
Cú pháp của lệnh này khá đơn giản:

DELETE FROM people;
Câu lệnh trên sẽ xóa mọi thứ từ bảng people. Nếu chỉ muốn xóa những bản ghi nhất định hãy sử dụng thêm WHERE:

DELETE FROM people WHERE name = 'Joe';
Nếu bạn đang phát triển một hệ thống thì cách khôn ngoan hơn là sử dụng một lệnh "soft delete". Cụ thể, bạn không bao giờ thực sự chạy một lệnh DELETE, mà tạo một cột đã xóa (chuyển dữ liệu sang đó), kiểm tra cột một lần nữa để tránh những trường hợp xóa nhầm đáng tiếc. Cách này cũng giúp nhanh chóng lấy lại bản ghi nếu phát hiện lỗi hay vấn đề cần kiểm tra lại. Tất nhiên, đây không phải là lựa chọn sao lưu thích hợp đâu nhé. Hãy cứ thực hiện sao lưu hệ thống của bạn, bởi cẩn tắc vô áy náy mà.

# 11. CREATE TABLE

![](https://images.viblo.asia/1dcefb07-a552-4e32-a6a7-2e6148c4e78e.png)

Cú pháp để tạo table:

CREATE TABLE people (
  name TEXT,
  age, INTEGER,
  PRIMARY KEY(name)
);
Chú ý cách các tên cột, ràng buộc nằm trong ngoặc và gán kiểu dữ liệu cho cột được viết như thế nào. Khóa chính cũng cần được chỉ định, đây là yêu cầu đầu tiên của một thiết kế database chuẩn.

# 12. ALTER TABLE
![](https://images.viblo.asia/8dcd34f5-8edc-4e43-91de-d38d9a336a79.jpg)
Lệnh ALTER TABLE được sử dụng để sửa đổi cấu trúc của một bảng. Ở đây có một chút hạn chế, vì cơ sở dữ liệu của bạn sẽ không cho phép thay đổi một bảng nếu dữ liệu đang tồn tại có thể gây ra xung đột, ví dụ, thay đổi một chuỗi thành một số nguyên. Trong những trường hợp này, cần sửa dữ liệu trước, sau đó sửa đổi bảng. Đây là ví dụ:

ALTER TABLE people ADD height integer;
Ví dụ này thêm một cột được gọi là "height" với kiểu dữ liệu là số nguyên vào bảng people. Không có giới hạn về những gì bạn có thể thay đổi.

# 13. DROP TABLE
![](https://images.viblo.asia/bd82e96b-14c2-4f79-8aad-6f022a9a775a.jpg)

Lệnh cuối cùng là DROP TABLE. Lệnh này cũng gần giống với DELETE nhưng thay vì xóa một bản ghi duy nhất, nó xóa mọi bản ghi trong bảng.
Đây là cách sử dụng nó:

DROP TABLE people;
Lệnh này khá nguy hiểm, vì thế nên thực hiện nó bằng tay trong phần lớn các trường hợp, đề phòng những lỗi không mong muốn có thể xảy ra.
# III. Reference: 
https://quantrimang.com/

https://vi.wikipedia.org/wiki/SQL