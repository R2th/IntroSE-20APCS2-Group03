© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

Việc concurrent read/write data tưởng chừng đơn giản nhưng với programming thì không ez tí nào. Chém thế chứ cũng không quá phức tạp khi sử dụng các cơ chế **sync/lock**, tuy nhiên nó có thể làm giảm performance của hệ thống. 

Vậy có cách nào không cần **lock** mà vẫn **concurrent read/write** không?

Let's begin.

## 1) Multi-version concurrency control

Với phần trước, ta biết rằng database sử dụng **shared lock** và **explicit lock** trong concurrent read/write để đảm bảo **data integrity**. Nhược điểm của nó là việc read/write không thể diễn ra cùng lúc vì có thể dẫn đến **half-written**.
> Phần trước mình đã nói qua về **half-written** nhưng lần này sẽ giải thích kĩ hơn. 
> 
> Chúng ta biết rằng database lưu trữ data trên disk (HDD, SSD). Có thể hiểu data là một chồng gạch to khổng lồ. Việc lưu trữ data giống như việc xếp gạch vào kho chứa. Bạn không thể chuyển cả 1000 viên gạch vào kho trong một lần, mà phải chuyển từ từ từng block một, mỗi block 10 - 20 viên tùy theo sức của mình. 
> 
> Nếu đang chuyển gạch mà có người khác kiểm đếm gạch trong kho thì khả năng sẽ không chính xác. Chỉ đếm được một phần số gạch đã chuyển. Nó là ví dụ của **half-written**.

Công việc check lock, acquire lock, release lock mỗi khi read/write data tốn kha khá thời gian và công sức. Túm cái váy lại, thấy được 2 vấn đề:
> - Read data phải check và acquire shared lock. Nếu quá trình read chưa hoàn thành thì không thể write.
> - Write data cũng cần check và acquire explicit lock. Nếu write chưa xong thì không thể read.

Có vấn đề thì phải giải quyết. Vừa read/write lên một record khá vất vả. Nếu có 2 record A B giống y hệt nhau, record A để read, record B để write, chả phải là mọi chuyện được giải quyết êm đẹp. Thích read thì read ở A, muốn write thì write tại B. Cả read và write có thể diễn ra đồng thời mà không cần lock, chả ảnh hưởng gì đến hòa bình thế giới. Hợp lý :100:.

Đó là idea của **multi-version concurrency control**, cụ thể là **PostgreSQL multi-version concurrency control**. Nói vậy không có nghĩa là các loại database khác không có MVCC, mà cách tiếp cận của nó sẽ khác.

Mục đích chính của **multi-version concurrency control** để quản lý các truy cập read/write đồng thời đến database mà không cần **locking**. Reading không block writing và ngược lại. Có 2 phương pháp chính để tiếp cận **MVVC**:
> - Thứ nhất, duy trì multi-version of record trong table, tất nhiên chỉ dùng latest record thôi. Các record cũ sẽ được Garbage Collector thu dọn sau. Đây chính là cách mà PostgreSQL tạo ra và vẫn đang áp dụng. SQL Server cũng áp dụng hình thức tương tự, tuy nhiên có chút khác biệt là các record cũ được lưu tại tempdb - database tạm, khác với database chính.
> - Phương pháp thứ hai được Oracle và MySQL/InnoDB sử dụng, chỉ giữ duy nhất version mới nhất của record trong database. Các version cũ được lưu trữ tại rollback segments, hay còn gọi là undo log.

Cùng tìm hiểu cụ thể PostgreSQL apply **multi-version concurrency control** như thế nào. Các database khác thì.. để dành cho Expert DBA.

## 2) MVCC với PostgreSQL

Trong PosgreSQL, khi một row được update data, một version mới (**tuple**) của row sẽ được thêm vào table. Version cũ được đánh dấu **expire** và có pointer trỏ sang version mới. Lưu ý là version cũ vẫn nằm ở database và chờ thu dọn sau. Idea là vậy, còn cụ thể PostgreSQL implement thế nào?

Để support multi-version, mỗi record có thêm 2 column là **xmin** và **xmax**. Khi query không explicit khai báo thì chúng không xuất hiện. 
> - xmin: **transaction id** đã thực hiện insert/update record.
> - xmax: **transaction id** đã thực hiện delete record. Default khi init một record sẽ có giá trị = 0.
> 
> Tại sao lại là **transaction id**, có phải query nào cũng nằm trong transaction đâu nhỉ?
> 
> Mình đã giải thích ở [phần trước](https://viblo.asia/p/010-exclusive-lock-va-shared-lock-924lJjn0lPM), tất cả các DML đều được thực thi như một transaction dù có explicit begin transaction và commit hay không. Nếu để transaction mode là manual, bạn có thể thử update một record và query record đấy với một transaction khác. Hai giá trị nhận được không giống nhau.

Muốn biết giá trị của 2 column này, chỉ cần thêm vào SELECT query:
```sql
SELECT *, xmin, xmax FROM COUNTRY WHERE id = 1;
```

PostgreSQL lưu **transaction id** dưới dạng số nguyên integer 32-bit, tức là đâu đấy có khoảng 2^32 ~ hơn 4 tỉ giá trị. Nghe có vẻ cũng lớn, nhưng nếu số lượng **transaction** vượt quá con số đó thì chuyện gì xảy ra? Tạm để đây đã.

Transaction bao gồm các state: **in-progress**, **committed**, **aborted** và được quản lý trong table CLOG với file pg_clog. Nếu một transaction commit hoặc rollback, nó sẽ chuyển state tương ứng để chúng ta biết đâu là version mới nhất của record, hoặc rollback thì rollback về version nào.

Ok, lý thuyết đi đôi với thực hành, cùng xem **MVCC** hoạt động thế nào trong PostgreSQL nhé.

Mình sử dụng database cũ từ [bài trước](https://viblo.asia/p/002-hieu-ve-index-de-tang-performance-voi-postgresql-p1-3Q75wV3elWb). Tạo **2 session** connect đến database, select data trước ở bất kì session nào:

```sql
SELECT *, xmin, xmax FROM country WHERE id = 1;
```

|ID|COUNTRY_NAME|CREATED|XMIN|XMAX|
|-|-|-|-|-|
|1|Afghanistan|2021-07-19 03:08:46.670749|8119|0|

Bắt đầu với **session 1**, start transaction và update data:

```sql
BEGIN TRANSACTION;
UPDATE country SET country_name = 'Updated record' WHERE id = 1;
SELECT *, xmin, xmax FROM country WHERE id = 1;
```

|ID|COUNTRY_NAME|CREATED|XMIN|XMAX|
|-|-|-|-|-|
|1|Updated record|2021-07-19 03:08:46.670749|8120|0|

Sang **session 2**, thực hiện query data:

```sql
SELECT *, xmin, xmax FROM country WHERE id = 1;
```

|ID|COUNTRY_NAME|CREATED|XMIN|XMAX|
|-|-|-|-|-|
|1|Afghanistan|2021-07-19 03:08:46.670749|8119|8120|

Có thêm vài thông tin hay ho rồi. 

Với **session 2** thực hiện read data, nó vẫn read data cũ, column **xmax** được gán giá trị = **transaction id** của transaction đã update data.

Tiếp theo, **COMMIT** ở **session 1** và select lại ở **session 2**:

```sql
SELECT *, xmin, xmax FROM country WHERE id = 1;
```

|ID|COUNTRY_NAME|CREATED|XMIN|XMAX|
|-|-|-|-|-|
|1|Updated record|2021-07-19 03:08:46.670749|8120|0|

Nếu thay vì **COMMIT** ở **session 1**, ta thực hiện **ROLLBACK** và select lại ở **session 2** thì data sẽ thế nào? Nó sẽ giữ nguyên kết quả và **xmax** không bị reset về giá trị 0.

|ID|COUNTRY_NAME|CREATED|XMIN|XMAX|
|-|-|-|-|-|
|1|Afghanistan|2021-07-19 03:08:46.670749|8119|8120|

**PostgreSQL** cần giữ lại **xmax** vì nó đúng là những gì đã xảy ra. Ngoài **xmin** và **xmax**, cần dựa thêm vào transaction state để quyết định version nào là mới nhất.

Có một điều cần chú ý là vì sao **session 1** update data mà **session 2** khi query không thấy sự thay đổi đó? Nó liên quan đến tính **isolation**, một trong 4 tính chất của relational database: **ACID**. Việc không nhìn thấy sự thay đổi trên là default isolation level của PostgreSQL và một vài database khác. Tuy nhiên ta hoàn toàn có thể khiến **session 2** query được sự thay đổi đó. Chủ đề này sẽ bàn kĩ hơn ở [bài sau](https://viblo.asia/p/OeVKB67JKkW).

Quay lại vấn đề, mặc dù **PostgreSQL multi-version concurrency control** giúp giải quyết concurrent read/write nhưng cũng có nhược điểm đã thấy phía trên:
> - Nếu số lượng transaction vượt quá 2^32 thì chuyện gì xảy ra. [PostgreSQL handle thế nào](https://viblo.asia/p/ByEZkrRWKQ0)?
> - UPDATE/INSERT/DELETE nhiều dẫn tới dư thừa số lượng lớn các dead tuple (old record version) thì xử lý ra sao?

Theo dõi bài sau để tìm câu trả lời nhé.

--- 

**NOTE**: tranh thủ kiếm tìm talent về với team mình. Nếu bạn đang cân nhắc một cơ hội mới với 2 mục tiêu:
- Job remote full time, không quản thúc thời gian hay địa điểm. Bạn hoàn toàn có thể vừa nhâm nhi li cocktail bên bãi biễn, vừa fix bug và trò chuyện với crush.
- Package hàng năm lên tới 50k USD (chưa tính thưởng + bonus), tất nhiên nó còn tùy thuộc vào sự chai lì của bạn.

Đừng ngại ngần [contact](mailto:datbv.other@gmail.com) với mình nếu có nhu cầu nhé. Mà thời buổi này ngại chỉ có thiệt thân thôi, good luck!

---

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)