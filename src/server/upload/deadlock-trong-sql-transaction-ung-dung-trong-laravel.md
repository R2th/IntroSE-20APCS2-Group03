# I. Lời mở đầu
Chào mọi người, đợt vừa rồi, dự án mình có một bug khá mới so với bản thân mình. Đó là xảy ra tình trạng deadlock giữa các transaction trong SQL, rồi mình cũng đi tìm hiểu deadlock nó là cái khỉ gì để còn tìm cách đối ứng.... Nên hôm nay mình có tổng hợp lại một số thứ mình tìm hiểu được để chia sẻ với anh em, kiến thức còn hạn hẹp chưa đủ sâu nên có gì mọi người cùng góp ý để mình hoàn thiện bài viết tốt nhất nhé.
# II. Nhắc lại kiến thức
Như trên mình có nói là deadlock xảy ra trong quá trình thức hiện nhiều transaction đồng thời, cụ thể như nào thì mình sẽ đề cập đến nó sau, Trước đó thì chúng ta nhắc lại một chút kiến thức về transaction nhé, bài này mình không đi sâu vào transaction nên mình chỉ tóm tắt kiến thức thôi, để còn tập trung vào vấn đề chính đó là **`deadlock`**
### Transaction là gì?
![](https://images.viblo.asia/0896fd2b-2a7b-475e-8c4b-fec35855e35b.png)

Transaction trong SQL là một nhóm các câu lệnh SQL, xử lý có tuần tự các thao tác trên cơ sở dữ liệu
Transaction được sử dụng với mục đích để `bảo toàn` dữ liệu, 1 ăn cả 2 ngả về 0, với 4 thuộc tính:
* **Atomicity** (Tính tự trị): Nguyên tắc "All or nothing", Transaction sẽ thực hiện thành công nếu tất cả các lệnh SQL trong transaction đó chạy thành công. Ngược lại, transaction sẽ bị dừng ngay ở thời điểm phát sinh lỗi, và sẽ rollback lại thời điểm trước khi chạy transaction.
* **Consistency** (Tính nhất quán): Đảm bảo tất cả các thao tác trên cơ sở dữ liệu được thay đổi sau khi giao dịch thành công và không xảy ra lỗi.
* **Isolation** (Tính cô lập): Đảm bảo transaction này hoạt động độc lập so với transaction khác. Transaction 1 lỗi sẽ không ảnh hưởng đến transaction 2.
* **Durability** (Tính bền vững): Đảm bảo kết quả hoặc tác động của transaction vẫn luôn tồn tại, kể cả khi hệ thống xảy ra lỗi.

Transaction sẽ chạy thành công và lưu kết quả thực thi của các tập lệnh SQL thưộc transaction đó thông qua lệnh **COMMIT**. Nếu gặp lệnh **ROLLBACK** khi có lỗi SQL thì sẽ khôi phục lại các thay đổi.

```python
Các lệnh điều khiển transaction chỉ được sử dụng với các lệnh thao tác dữ liệu DML như:
INSERT, UPDATE và DELETE.

Chúng không thể được sử dụng trong lệnh CREATE TABLE hoặc DROP TABLE 
vì các hoạt động này được tự động được commit trong cơ sở dữ liệu.
```

### Sử dụng Transaction trong MySQL
Theo mặc định thuộc tính autocommit sẽ đc `enabled`, Tức là mỗi câu lệnh sẽ tương đương như nằm trong khối START TRANSACTION-COMMIT và không thể ROLLBACK (trừ khi có exception)
Vì vậy chúng ta cần disabled nó: `SET autocommit = 0` hoặc bắt đầu một transaction `START TRANSACTION`.
ví dụ:
```python
START TRANSACTION;
BEGIN;
INSERT INTO `users` (`name`, `email`) VALUES ('lxquan', 'lxquanit@gmail.com')
UPDATE `users` SET name='quanluu' WHERE email = 'lxquanit@gmail.com';
COMMIT;
ROLLBACK;
```

### Sử dụng Transaction trong Laravel
Lướt nhanh nhé mọi người, Laravel có 2 cách để bắt đầu 1 transaction.
*Cách 1:*
Transaction sẽ tự động **COMMIT** (nếu chạy thành công toàn bộ lệnh SQL trong transaction) hoặc tự động **ROLLBACK** nếu xảy ra exception.
```python
DB::transaction(function () {
    DB::table('users')->update(['name' => 'qunalx']);
    DB::table('users')->where('id', 1)->delete();
});
```
*Cách 2:*
Laravel cung cấp cách thử 2 là thực hiện transaction thủ công vs `try` và `catch`, cách này thường được sử dụng để làm nhiều việc hơn là chỉ mỗi **ROLLBACK** khi có exception, ví dụ như `Log` chẳng hạn.
```python
DB::beginTransaction();
    try {
      	DB::table('users')->update(['name' => 'qunalx']);
    	DB::table('users')->where('id', 1)->delete();
        
        DB::commit();
    } catch (Exception $e) {
        DB::rollBack();
        // TODO SOMETHING
        \Log::error($e->getMessage());
    }
```

### Vấn đề
Bạn đã bao giờ nghĩ đến trường hợp nhiều hơn 1 Transaction (ghi dữ liệu) đồng thời xảy ra chưa? Rồi sẽ như thế nào khi những transaction đó tác động vào cùng 1 bảng, cùng 1 row? Hay kinh khủng hơn nữa là transaction này chiếm giữ tài nguyên mà transaction khác đang cần.... Cùng nhau giải đáp ở các phần tiếp nhé. Trước hết chúng ta lại cần phải xem qua nguyên lý `consistency` của relational database - MYSQL.

# III. Nguyên lý consistency của relational database - MYSQL
MYSQL nói riêng và các database quan hệ nói chung là dạng database có độ nhất quán dữ liệu cao nhất. Dữ liệu trong database luôn ở dạng consistency tại mọi thời điểm. Nghĩa là với cùng một dữ liệu thì không thể có việc ghi (update, insert, delete) tại cùng một thời điểm. Việc ghi cùng một dữ liệu sẽ dẫn tới hiện tượng Lock lẫn nhau để đảm bảo dữ liệu được consistency. Tuy nhiên, InnoDB trong MYSQL xử lý `SELECT` với mode `Consistent read`,  nó sẽ không Lock trên table đang access. Điều đó dẫn tới một số tình huống sau:

* Lệnh Select sẽ không xung đột với các lệnh Update, Insert, Delete. Điều này có thể gây ra một số vấn đề như, đọc dữ liệu ra không chính xác, dữ liệu chưa được cập nhật mới nhất nếu đọc và ghi dữ liệu đồng thời. 
* Các lệnh Select không lock lẫn nhau. Các lệnh select thự hiện chế độ share lock, nghĩa là việc thực hiện lệnh đọc đồng thời cùng một dữ liệu thì không bị ảnh hưởng lẫn nhau.
* Các lệnh Insert, Update, Delete lock theo row không lock theo table. Nghĩa là có thể thực hiện đồng thời các lệnh đó trên cùng một table miễn là chúng không tranh chấp nhau cùng một row dữ liệu.
	
    Lock để đảm bảo tính consistency data là một trong các ưu điểm nổi bật của cơ sở dữ liệu quan hệ. Vì vậy nếu đã dùng cơ sở dữ liệu quan hệ thì phải biết tận dụng nó. Tránh tối đa việc sử dụng các chế độ bỏ lock như mode nolock vì có thể dẫn tới hiện tượng đọc sai lệch dữ liệu (tỉ lệ, số lượng, trạng thái …)

Dựa vào nguyên lý trên, mình cùng phân tích vấn đề nêu trên nhé.
### Phân tích vấn đề
Trong trường hợp có nhiều hơn 1 transaction đồng thời xử lý trên cùng 1 table, sẽ rơi vào 1 số trường hợp sau (2 transaction: T1 & T2)
* 2 transaction đó không xử lý trên cùng 1 row: 
	* 	Nếu config cho database đó đang để là lock table: table sẽ bị lock cho đến khi T1 xử lý xong và được commit thì mới unlock, lúc này T2 mới được xử lý tiếp. ```T2 sẽ được xử lý khi T1 chạy xong, trường hợp T1 chạy mãi không xong thì T2 sẽ bắn ra 1 exception là timeout```
	*  Nếu config cho database đó đang để là lock row: row đang được xử lý ở 2 transaction sẽ bị lock, tuy nhiên 2 transaction xử lý 2 row khác nhau nên cả 2 đều được xử lý đồng thời. 

* 2 transaction đó xử lý vào cùng 1 row: row được xử lý sẽ lock, T1 xử lý xong, commit thì lúc này T2 mới thực thi, nếu T1 xử lý chậm  thì T2 sẽ bắn ra exeption ` Lock wait timeout exceeded; try restarting transaction`.

```python
Đối với InnoDB trong MYSQL, thì theo mặc định là database sẽ được lock theo row và default timeout là 50s.

MYSQL có 2 loại lock row:
 + LOCK FOR UPDATE: không cho phép các Transaction khác SELECT, UPDATE hoặc DELETE row.
 Transaction khác chỉ có thể đọc các row này khi Transaction trước đó đc COMMIT hoặc ROLLBACK.

 + LOCK IN SHARE MODE: cho phép Transaction khác đọc row bị lock nhưng sẽ không cho phép Transaction khác UPDATE hoặc DELETE row.
```
 *Nếu có cơ hội, mình sẽ tìm hiểu kĩ hơn và chia sẻ với mọi người về việc Locking trong DB*     
 
 Đấy là trường hợp Lock, nó chỉ ảnh hưởng một phần dtới performance khi các Transaction đồng thời phải chờ và thực hiện một cách tuần tự. Nhưng, sẽ có trường hợp các Transaction đó bị conflict, dẫn tới không một Transaction nào thực hiện được. Trường hợp như vậy được gọi là **DeadLock**
 
# IV. DeadLock là gì?
Deadlock Là tình trạng 2 hoặc nhiều transactions khác nhau không thể tiếp tục xử lý vì mỗi transaction đều đang Lock các tài nguyên mà các transaction khác cần để xử lý và release Lock. Dẫn đến các transactions không bao giờ có thể release Lock các tài nguyên mà nó đang giữ.
![](https://images.viblo.asia/de31ba0b-841e-488a-b01c-4329aa669ae6.png)

 Ví dụ như hình ảnh trên: Transaction 1 đang Lock tài nguyên ở Table 1, và cần tài nguyên ở Table 2 xử lý tiếp để kết thúc và release Lock tài nguyên Table 1. Đồng thời, Transaction 2 lại đang Lock tài nguyên ở Table 2, và cần tài nguyên ở Table 1 để xử lý và release Lock. 
 Một vòng tròn đợi chờ xuất hiện, lúc này MYSQL sẽ phải kill 1 Transaction để release Lock mà Transaction đó đang nắm giữ, Transaction còn lại được cấp tài nguyên xử dụng đầy đủ và thực hiện thành công (COMMIT hoặc ROLLBACK).

### Demo
*Ví dụ 1:*
Tạo 2 table:
Table `trans1`: 
```python
CREATE TABLE `trans1` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
 `value` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB
```
Table `trans2`
```python
CREATE TABLE `trans2` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
 `value` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB
```
Bắt đầu thực thi transaction:
Transaction 1:
```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
INSERT INTO trans1(name, value) VALUES('trans1', 100); (1)
DO SLEEP(10);
INSERT INTO trans2(name, value) VALUES('trans2', 100); (2)
COMMIT;
```
Transaction 2:
```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
UPDATE trans2 set value = 300; (3)
DO SLEEP(10);
UPDATE trans1 set value = 300; (4)
COMMIT;
```
Mình dùng hàm `DO SLEEP` để dễ dàng tái hiện tình trạng DeadLock, run 2 câu query cùng 1 lúc, 1 exception sẽ xuất hiện
```python
Deadlock found when trying to get lock; try restarting transaction
```
**Phân tích:** 
Khi 2 Transaction đc chạy, (1) & (3) của 2 Transansaction chạy thành công, lúc này table `trans1` đang bị Lock row vừa insert ở (1), table `trans2` đang bị Lock toàn bộ row ở (3) --> Lock table. Câu (2)  sẽ không thể thực thị đc mà ở trạng thái waiting do table `trans2` đang bị lock --> không thể COMMIT và giải phóng Lock ở table `trans1`. 

Tương tự, câu (4)  sẽ ở trạng thái waiting do table `trans1` đang lock 1 row --> không thể COMMIT và giải phóng Lock ở `trans2`.  Xảy ra tình trạng **DeadLock**, MYSQL buộc phải **kill** 1 transaction.

**Kết quả:** Transaction 1 sẽ được thực thi, còn Transaction 2 sẽ bị **kill** và báo exception.

---
*Ví dụ thứ 2 dễ hiểu hơn:*
Transaction 1:
```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
UPDATE trans1 set value = 500 where id = 1; 
DO SLEEP(10);
UPDATE trans2 set value = 600 where id = 2; 
COMMIT;
```
Transaction 2:
```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
UPDATE trans2 set value = 700 where id = 2; 
DO SLEEP(10);
UPDATE trans1 set value = 800 where id = 1; 
COMMIT;
```
Ví dụ này các bạn tự phân tích ra vấn đề gây ra **DeadLock** nhé.

---
**Lưu ý:**
Với ví dụ 1 ở trên, nếu Transaction 2 là như sau:

```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
UPDATE trans2 set value = 300 WHERE	 id = 100; (3)
DO SLEEP(10);
UPDATE trans1 set value = 300 WHERE id = 200; (4)
COMMIT;
```
Thì sẽ không xảy ra tình trạng **DeadLock** vì lúc này (3) sẽ không lock toàn bộ row ở table `trans2` mà chỉ lock row vs `id = 100`. Lúc này, 2 Transaction sẽ Lock các row khác nhau và sẽ thực thi bình thường.

---
Thử ví dụ về đọc - ghi đồng thời xảy ra xem có xảy ra DeadLock không nhé, xem có đúng như mình có đề cập là `SELECT` trong InnoDB sử dụng mode `Consistent read`.
Transaction 1:
```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
UPDATE trans1 set value = 500 where id = 1; 
DO SLEEP(10);
UPDATE trans2 set value = 600 where id = 2; 
COMMIT;
```
Transaction 2:
```python
SET autocommit = 0;
START TRANSACTION;
BEGIN;
SELECT * FROM trans2 WHERE id = 2; 
DO SLEEP(10);
SELECT * FROM trans1 WHERE id = 1;
COMMIT;
```
Kết quả: cả 2 Transaction đều thực hiện thành công, không xảy ra vấn đề DeadLock, tuy nhiên, Transaction 2 không trả về dữ liệu mới nhất (được update bởi Transaction 1) mà vẫn hiển thị data cũ. Nếu chạy lại transaction 2 thì data đã được update mới nhất.
# V. Các phương pháp hạn chế DeadLock
* Hạn chế sử dụng transactions nếu không thật sự cần thiết.

	Để làm được điều này, thì chúng ta cần phải hiểu ý nghĩa của việc sử dụng transaction và tránh lạm dụng. Chỉ nên đóng gói các lệnh logic xử lý phụ thuộc  nhau vào 1 transaction.    
  	Ví dụ điển hình là bài toán kinh điển chuyển tiền: A chuyển tiền cho B thì A trừ tiền xong thì B mới được cộng tiền. Nếu 1 trong 2 action bị lỗi thì đều bị khôi phục lại trước khi có giao dịch --> Cần sử dụng Transaction cho 2 action (lệnh) A trừ tiền và B cộng tiên. 
* Giảm thiểu số lượng bảng cần tác động trong một transactions, transactions có số bảng tham gia càng ít thì khả năng xảy ra deadlock càng thấp.
* Giữ cho các transactions luôn có khối lượng công việc và thời gian xử lý càng ít càng tốt, tối ưu query, clean code
* Khi sửa đổi nhiều table trong một transactions hoặc các row khác nhau trong cùng một table, nên thực hiện các thao tác đó theo thứ tự nhất quán mỗi lần.

```python
Cá nhân mình thấy, trên đây nhìn chung cũng chỉ là một số phương pháp hạn chế mang tính lý thuyết, 
đôi khi có trường hợp khó có thể apply đc. 
Vì vậy, còn 1 phương pháp backup giảm thiểu đáng kể tình trạng DeadLock, 
nhưng cái giá phải trả là performance bị chậm đi một chút. 
Đó chính là Retry Transaction.
```
# VI. Ứng dụng retry Transaction trong Laravel
Như mình đã trình bày ở trên thì Laravel hỗ trợ 2 kiểu Transaction. bản chất cả 2 cách này đều có thể apply được `Retry`. Đơn giản chỉ là cho chạy vòng lặp lại `Transaction` đó nếu có exception xảy ra, tối đa `x lần`. Laravel hỗ trợ tận răng:
```python
DB::transaction(function () {
    DB::table('users')->update(['name' => 'qunalx']);
    DB::table('users')->where('id', 1)->delete();
}, 5);
```
thực hiện retry Transaction 5 lần. Nếu ae muốn log lại mỗi lần bị DeadLock, hay log lại số lần phải reTry thì có thể custom lại như sau, đoạn code trên sẽ tương tự như:
```python
for	($currentAttempt = 0; $currentAttempt < 5; $currentAttempt++) {
	DB::beginTransaction();
    try {
    	// Query
   		// Query
  		...
    	DB::commit();
    	return $currentAttempt;
    } catch (Exception $e) {
    	DB::rollBack();
   		// Nếu exception là DeadLock thì mới retry!!
    	if ($this->causedByDeadlock($e) && $currentAttempt < $attempts) {
   			// ToDo SomeThing (Log,...)
    		continue;
    	}
    	throw $e;
    }
}
```
Để tránh tình trạng kéo performance đi xuống thì logic business cố gắng để hết ngoài Transaction, trong Transaction chỉ thực thi truy vấn. Nếu để hết vào trong Transaction, mỗi lần reTry, hệ thống sẽ chạy lại hàm tính toán mất thêm nhiều thời gian. Trong khi mục đích của mình chỉ là Retry câu truy vấn.

# Tổng kết
Hết rồi, trên đây là một chút tìm hiều của mình về DeadLock trong MYSQL, và ứng dụng trong Laravel. Hi vọng sẽ giúp ích cho mọi người. Cám ơn mọi người đã dành thời gian đọc bài viết, nếu có bất cứ vấn đề gì, đừng ngại thắc mắc dưới phần bình luận, mình cùng nhau chia sẻ kiến thức, cùng nhau nâng cao trình độ, và nhớ tặng mình 1 vote up nhé. Tks!!!

*Tài liệu tham khảo*

[https://kipalog.com/posts/Mot-so-phan-tich-ve-deadlock-trong-co-so-du-lieu](https://kipalog.com/posts/Mot-so-phan-tich-ve-deadlock-trong-co-so-du-lieu)

[https://laravel.com/docs/8.x/database#database-transactions](https://laravel.com/docs/8.x/database#database-transactions)

[https://dev.mysql.com/doc/refman/8.0/en/innodb-consistent-read.html](https://dev.mysql.com/doc/refman/8.0/en/innodb-consistent-read.html)