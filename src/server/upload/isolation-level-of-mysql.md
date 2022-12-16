## 1. ACID
Là một trong 4 tính chất quan trọng của transaction bao gồm:
* Tính nguyên tố (**Atomicity**). Một transaction bao gồm các hoạt động khác nhau phải thỏa mãn điều kiện hoặc là tất cả thành công hoặc là không một hành động nào thành công.
* Tính nhất quán (**Consistency**). Một transaction sẽ có trạng thái bất biến về dữ liệu có nghĩa là dữ liệu luôn được bảo toàn. Nếu có lỗi quay về trạng thái trước đó.
* Tính độc lập (**Isolation**). Một transaction đang thực thi và chưa được xác nhận phải bảo đảm tính độc lập với các transaction khác.
* Tính bền vững (**Durability**). Khi một transaction được commit thành công dữ liệu sẽ được lưu lại một cách chuẩn xác.
## 2. Bài toán
Giả sử khi chúng ta đang tiến hành song song và đồng thời 2 transaction cùng cập nhật giá trị vào 1 bản ghi trong CSDL. Ở đây sẽ xảy ra **concurency** giữa các transaction và xảy ra các vấn đề :
1. Transaction trước hay sau sẽ được tiến hành hay cả 2 cùng được tiến hành một lúc.
2. Kết quả cuối cùng là kết quả của transaction nào trước hay sau?
Ở đây xảy ra concurency giữa các transaction, chúng ta cùng tìm hiểu các mức level của **Isolation** để giải quyết vấn đề trên.

## 2.1 Read Uncommitted
Một transaction lấy dữ liệu từ một transaction khác ngay cả khi transaction đó chưa được commit.
Xét ví dụ cụ thể như sau:

Tạo bảng test:
```
CREATE DATABASE test;
```
Tạo mới bản ghi:
```
INSERT INTO `users` (`id`, `name`, `point`) VALUES ('1', 'BaLongStupid', '1');
```
Tiến hành tạo một transaction update point.
Query 1:
```
START TRANSACTION;
    UPDATE `users` SET `point`= 100;
    SELECT SLEEP(30);
ROLLBACK;
```
Tiến hành Query 2:
```
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SELECT * FROM `users`;
COMMIT;
```
Giả sử sau khi tiến hành câu Query 1 ta tiến hành chạy câu Query 2 thì kết quả trả về sẽ là 'point' = 100. Nhưng ngay sau khi câu Query 1 chạy xong và bị rollback thì kết quả trả về thực tế sẽ là là 'point' = 1. Như vậy transaction thứ 2 lấy kết quả chưa được commit của transaction thứ 1 => Hiện tượng trên gọi còn được gọi là Dirty Read.
Ưu điểm ở đây là các transaction sẽ chạy liên tục và transaction sau ghi đè lên Transaction trước (**Dirty Write**). Đây là mức Isolation thấp nhất và nó cũng tương đương với câu lệnh:

``` SELECT * FROM users WITH (nolock) ```
## 2.2 Read Committed
Đây là level default của một transaction nếu như chúng ta không config gì thêm. Tại level này thì Transaction sẽ không thể đọc dữ liệu từ từ một Transaction đang trong quá trình cập nhật hay sửa đổi mà phải đợi transacction đó hoàn tất. Như vậy thì chúng ta có thể tránh được Dirty Read và Dirty Write nhưng các Transaction sẽ phải chờ nhau => Perfoman hệ thống thấp.
Ta thực hiện câu Query 1 như sau:
```
START TRANSACTION;
    UPDATE `users` SET `point`= 100 WHERE 'id' > 0;
    SELECT SLEEP(30);
COMMIT;
    SELECT * FROM `users` WHERE `id` = 2;
```
và ngay sau đó thực hiện câu Query 2:
```
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    INSERT INTO `users` (`id`, `name`, `point`) VALUES ('2', 'DaoAnhDungStupid', '2');
COMMIT;
``` 
Khi ta tiến hành thực thi câu Query 2 thì kết quả trả về sẽ bản ghi 'id' = 2 sẽ có point = 2. Mặc dù câu query q1 đã update tất cả bản ghi có id > 0 và updated point = 100 nhưng bản ghi với id = 2 được cập nhật sau khi bảng users được cập nhật và trước khi transaction (q1) kết thúc => Bản ghi này được gọi là **Phantom Row** (Bản ghi ma). 
## 2.3 Repeatable read
Giống như mức độ của Read Committed, tại mức độ này thì transaction còn không thể đọc / ghi đè dữ liệu từ một transaction đang tiến hành cập nhật trên bản ghi đó.
Query 1:
```
START TRANSACTION;
    SELECT SLEEP(30);
    SELECT * FROM `users` WHERE `id` = 2;
COMMIT;
```
Query 2:
```
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    SELECT * FROM `users` WHERE `id` = 2;
COMMIT;
``` 
Khi thực thi 2 câu query trên thì câu Query 2 phải đợi câu Query 1 commit hoàn tất mới có thể thực thi. Ở level này khi chúng ta sẽ được bảo vệ khi đọc dữ liệu select các bản ghi trong cùng một transaction. Giả sử ở câu Query 2 ta thay thế lệnh select thành lệnh **Update / Delete** thì dữ liệu tại 2 câu query sẽ khác nhau và chúng ta cũng không thể tránh được các **Phantom Row**.

## 2.4 Serializable
Level cao nhất của Isolation, khi transaction tiến hành thực thi nó sẽ khóa các bản ghi liên quan và sẽ unlock cho tới khi rollback hoặc commit dữ liệu.
Query 1:
```
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
    SELECT * FROM `users`;
    SELECT SLEEP(30);
    SELECT * FROM `users`;
COMMIT;
```
Query 2:
```
    INSERT INTO `users` (`id`, `name`, `point`) VALUES ('3', 'Dat09', '3');
``` 
Khi tiến hành 2 câu query trên thì bản ghi trả về giữa 2 lần select ở câu Query 1 là giống như nhau, và câu Query thứ 2 sẽ pending cho tới khi Query 1 kết thúc.
## 2.5 SnapShot
Tương tự với level Serializable, nhưng cách thức hoạt động nó lại khác so với Serializable. Khi một transaction select các bản ghi thì nó sẽ không lock các bản ghi này lại, mà tạo một bản sao trên bản ghi hoặc các bản ghi đó. Khi ta tiến hành **UPDATE / DELETE** ta tiến hành trên bản sao dữ liệu đó và không gây ảnh hưởng tới dữ liệu ban đầu. Ưu điểm của snapshot là giảm độ trễ giữa các transaction nhưng bù lại cần tốn thêm tài nguyên lưu trữ các bản sao. 
## 2.6 Tóm tắt các mức Isolation

```
| Transaction isolation level | Dirty reads | Nonrepeatable reads | Phantoms |
| Read uncommitted	          |       X     |        X            |     X    |
| Read committed	          |       -     |        X            |     X    |
| Repeatable read		      |       -     |        -            |     X    |
| Serializable    	          |       -     |        -            |     -    |
```

Tài liệu tham khảo:
https://dev.mysql.com