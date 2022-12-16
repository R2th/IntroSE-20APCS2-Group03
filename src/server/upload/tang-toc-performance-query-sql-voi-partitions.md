Chào mọi người, đây là lần đầu tiên mình viết blog. Nếu có gì sai sót mong mọi người góp ý cùng nhau chia sẻ kiến thức.
Gần đây, mình có được assign tìm hiểu về partitions để apply vào dự án mục đích để cải thiện tốc độ truy vấn với table cỡ khoảng 60 triệu records. 
Sau một thời gian tìm hiểu, thì mình cũng lượm nhặt, tổng hợp lại kiến thức mà mình thấy khá ok, muốn chia sẻ và mong nhận được sự phản hồi tích cực từ mọi người.
![](https://images.viblo.asia/cfc771e4-9174-4c9b-b960-279cc30da4e1.png)
Không lan man nữa, mình đi thẳng vào vấn đề nhé! 

## I. Partition là gì???
Partition là quá trình phân chia table thành các phân vùng nhỏ theo một quy tắc nào đó được gọi là partition function.
![](https://images.viblo.asia/1485b448-610a-46d8-b4a8-1b7fd11e14ea.png)

Ví dụ đơn giản như này, nếu coi cả dự án là 1 **table** thì việc chia các dự án thành các team nhỏ được gọi là **partition table**, mỗi team được coi là 1 **partition**, chia dự án thành các team nhỏ theo *"quy tắc"* - chức năng như: team frontend (phụ trách client), team backend (phụ trách server), team test (phụ trách đảm bảo chất lượng) ... những *"quy tắc"*  đó được coi như là **partition function**.
Đến đây mọi người đã hiểu nôm na Partition nó là gì chưa nào? Tóm gọn lại nó là một kĩ thuật ***chia để trị***.

**Tuy nhiên**, nếu table quá ít dữ liệu, hoặc dữ liệu chưa đủ lớn - cỡ khoảng **1 triệu** records thì việc partition table cũng không có quá nhiều sự khác biệt.

## II. Phân vùng ngang và phân vùng dọc
	
* Phân vùng ngang: Chia table theo các row - bản ghi. các bản ghi matching theo điều kiện partition function mà được assign vào các partition tương ứng khác nhau.
* Phân vùng dọc: Chia table theo các column. 

![](https://images.viblo.asia/8b086807-d06e-4d2d-bdf9-da6d774aa55b.png)

**Nhưng**, hiện tại MySQL **chưa hỗ trợ phân vùng dọc**. và cũng chưa có kế hoặch sớm trong tương lại về việc apply phân vùng dọc. Lý do: mysql insert/update lưu dữ liệu dưới dạng các bản ghi theo row, hoàn toàn phù hợp với phân vùng ngang...  Vì vậy trong khuôn khổ bài viết này, mình chỉ đề cập đến phân vùng ngang trong MySql.

## III. Kiểm tra DB engine có hỗ trợ?
Phần này chán v**, nhưng thôi mình lướt qua cho ai cần ạ. Chắc đa phần mọi người cũng cũng cóc xem phần này, như mình tìm hiểu cũng thế =))

Để kiểm tra xem DB engine version của bạn có hỗ trợ partition không bằng cách chạy
`SHOW PLUGINS` kéo xuống xem có bản row `partition` vs status là `ACTIVE` thì là hỗ trợ r đấy. 

![](https://images.viblo.asia/01fc9c8c-ff18-4024-91c2-9ef398793b29.png)

Hoặc có thể kiểm tra `INFORMATION_SCHEMA.PLUGINS` thông qua query:

```python
SELECT
PLUGIN_NAME as Name,
    PLUGIN_VERSION as Version,
    PLUGIN_STATUS as Status
    FROM INFORMATION_SCHEMA.PLUGINS
    WHERE PLUGIN_TYPE='STORAGE ENGINE';
```
Output có chứa partition 
![](https://images.viblo.asia/3d0536b3-1a38-499c-85a5-337467d2fad6.png)

Ok, xong next đến phần mình cho là hay nhất đây, hàng nóng cho ae hiểu rõ hơn về partition!!

## IV. Những điều cần lưu ý khi sử dụng partition
*  Partition sẽ được bắt đầu từ index bằng 0, cần chú ý nếu trong câu truy vấn chúng ta chỉ định rõ partition nào được chọn nhé. 
*  Số Partition có thể chia tối đa là **8192** partition.
*  Với dữ liệu là datetime thì những function `TO_DAYS()`, `YEAR()`, `TO_SECONDS()`... là cực kì hữu ích khi sử dụng trong partition, những hàm này sẽ trả về giá trị `INT` or `NULL`NULL.
* Naming convention: cũng như table hay database, partition cũng tuân thủ MySql naming convention ví dụ như không thể tạo ra 2 partition có name giống nhau không phân biệt hoa thương, chẳng hạn partitionNumber1 & PARTITIONNUMBER1 sẽ báo lỗi:
	
```python
ERROR 1488 (HY000): Duplicate partition name myvertabelopart
```
* Partition sẽ apply cho toàn bộ data và cả index của table, tức là indexs cũng sẽ được phân vùng tương ứng với data. Bạn không thể chỉ partition data mà bỏ qua index, hay làm điểu ngược lại.
* Khóa ngoại: partition InnoDB không hỗ trợ **Foreign Keys**, bạn không thể thêm foreign keys vào table đã được partition, ngược lại cũng vậy một table nếu đã sử dụng khóa ngoại thì không thể partition table. Ngoài ra, table không được partition cũng `không được có foreign keys` trỏ đến column của bảng được partition.
* Partition columns: tất cả các column sử dụng để partition đều phải thuộc (1 phần) tất cả các unique keys hoặc primary keys của table đó. (**nếu có**)
	
```python
Khó hiểu ý cuối đúng không? Hiểu thì hiểu không hiểu thì hiểu :)) 
```
Ok, làm cái ví dụ cho dễ hiểu nhé, mình có làm 1 table **wallets** lưu lại ví tiền của user, 1 user có nhiều tài khoản ngân hàng, nhưng 1 tài khoản ngân hàng chỉ thuộc 1 ngân hàng.
```python
CREATE TABLE `wallets` (
	`id` int not null AUTO_INCREMENT, primary key (`id`),
    `user_id` int(10) unsigned NOT NULL,
    `bank_id` int(10) unsigned NOT NULL,
    `account_id` int(10) unsigned NOT NULL,
    `amount` int(11) NOT NULL DEFAULT 0,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    UNIQUE (user_id, bank_id, account_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
PARTITION BY HASH (user_id)
PARTITIONS 50
```
Ở đây, mình có sử dụng kĩ thuật **`Hash partition`**, nó là gì thì mình sẽ giải thích ở phần dưới nhé, mọi người chỉ quan tâm bây giờ là column dùng để partition là `user_id`. Nếu chạy query trên thì sẽ báo lỗi: 
```python
Error Code: 1503. A PRIMARY KEY must include all columns in the table's 
partitioning function.
```
**Lí do** thì như mình có đề cập trước thì: **`user_id`** là column được sử dụng để partition, nó **đã thuộc unique key** (user_id, bank_id, account_id) nhưng nó **không thuộc column primary**. Không thõa mãn điều kiên nên sẽ báo lỗi.  
**Giải pháp:** xóa primary key (id) đi hoặc thay đổi primary key từ `id` --> `id, user_id`
Ngoài ra, nếu bạn muốn add thêm unique key khác thì **bắt buộc** phải chứa column user_id. Đến đây ae đã hiểu chưa nào?? ai còn chưa hiểu thì có thể contact mình nhé, mình thông cho :kissing_smiling_eyes::kissing_smiling_eyes:

### Tìm hiểu một số lợi ích mà partition đem lại
* **Deletion**: Việc drop 1 partition - phân vùng chứa data k cần thiết gần như là  tức thì trong khi việc delete data theo cách bình thường có thể mất đến vài phút
* **Performane**: Chắc chắn đây là lý do quan trọng nhất mà mình cần ở thằng partition, thay vì cần tìm kiếm dữ liệu ở toàn bộ table, thì mình chỉ cần tìm kiếm data ở một số partition nhất định dựa trên *"quy tắc"*  đặt ra ban đầu hay còn gọi là partition function. Tin tôi đi, nó sẽ tăng tốc độ đáng kể đấy, đặc biệt nếu bạn chỉ định rõ partition nào được chọn khi truy vấn thì tốc độ còn nhanh hơn cả *nyc trở mặt đó.*  Kĩ thuật này còn được gọi là **partition pruning**

*(ví dụ ở phía dưới nhé)*

## V. Những kĩ thuật partition
#### Range Partition
Các row sẽ được assign đến partition dựa vào value của column có nằm trong phạm vi của partition function tương ứng hay không. Range partition sử dụng `VALUE LESS THAN`.
Các value phải được liền kề nhau và không được chồng chéo lên nhau và phải mang giá trị integer hoặc NULL
```python
CREATE TABLE members (
    firstname VARCHAR(25) NOT NULL,
    lastname VARCHAR(25) NOT NULL,
    username VARCHAR(16) NOT NULL,
    email VARCHAR(35),
    joined DATE NOT NULL
)
PARTITION BY RANGE( YEAR(joined) ) (
    PARTITION p0 VALUES LESS THAN (1960),
    PARTITION p1 VALUES LESS THAN (1970),
    PARTITION p2 VALUES LESS THAN (1980),
    PARTITION p3 VALUES LESS THAN (1990),
    PARTITION p4 VALUES LESS THAN MAXVALUE
);
```
Lưu ý: MAXVALUE được biểu thị với giá trị luôn lớn hơn giá trị lớn nhất có thể (ở đây là 1990). Nhờ có nó mà nếu ta insert bản ghi với joined là 1991 thì nó sẽ biết được assign vào p4, nếu không có thì việc insert sẽ lỗi - vì nó không biết được chỉ định vào partition nào? Vậy còn với những bản ghi có năm nhỏ hơn 1960 hay thậm trí giả sử là NULL thì sao? Lúc này nó sẽ được assign vào partition thấp nhất (p0).
Tuy nhiên bạn cần cẩn thận khi sử dụng `MAXVALUE` vì nếu sử dụng nó đồng nghĩ với việc bạn sẽ không thể thêm partition p5, p6, . . . được nữa vì `MAXVALUE` được coi là giá trị lớn nhất và lúc này p4 sẽ là partition cuối cùng.
Giá sử p4 có `VALUES LESS THAN` là 2000, thì ta có thể thêm partition p5:
```python
ALTER TABLE members ADD PARTITION (PARTITION p5 VALUES LESS THAN (2020)
```
khi đến năm 2020, ta sẽ thêm tiếp partition p6:
```python
ALTER TABLE members ADD PARTITION (PARTITION p6 VALUES LESS THAN (2035)
```
```python
Range Partition còn có thể sử dụng cùng lúc nhiều column, mọi người có thể nghịch thêm.
```
#### List Partition
Tương tự như `Range partition` nhưng value để phân vùng đã được defined sẵn với `VALUES IN`, nó hoạt động như `WHERE IN` vậy. Có điểm khác biệt nữa với `Range partition` là value ngoài `INTEGER, NULL` thì nó có thể là `STIRNG, DATE, TIME`
```python
	CREATE TABLE employees (
    id INT NOT NULL,
    fname VARCHAR(30),
    lname VARCHAR(30),
    store_id INT
)
PARTITION BY LIST(store_id) (
    PARTITION pNorth VALUES IN (3,5,6,9,17),
    PARTITION pEast VALUES IN (1,2,10,11,19,20),
    PARTITION pWest VALUES IN (4,12,13,14,18),
    PARTITION pCentral VALUES IN (7,8,15,16)
);
```
Value các partition function không được có sự chồng chéo, trường hợp insert với `store_id` không thuộc bất kì  value nào trong tập values thì sẽ báo lỗi.
--> Cân nhắc trước khi sử dụng `List partition`, cá nhân mình thấy chỉ nên dùng với column có value thuộc 1 tập constant ví dụ như tháng (1-12), ngày trong tháng (1-31), . . .

#### Hash Partition
Không giống như `Range` và `List`, `Hash Partition` không cần define trước value để quyết định xem row insert sẽ đc assign vào partition nào, nó sẽ làm điều này một cách tự động dựa vào biếu thức hoặc giá trị `INTEGER` của cột đã đc chọn. các bản ghi sẽ đc chia đều cho các partition vs số lượng partition đc quyết định bới keyword **`PARTITIONS`** nếu k định nghĩa số lượng partition. thì sẽ **default là 1**, và 1 thì biết rồi đấy, khác đ** gì khi không partition đâu :laughing::laughing:
```python
CREATE TABLE `wallets` (
	`id` int not null AUTO_INCREMENT,
    `user_id` int(10) unsigned NOT NULL,
    `bank_id` int(10) unsigned NOT NULL,
    `account_id` int(10) unsigned NOT NULL,
    `amount` int(11) NOT NULL DEFAULT 0,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    primary key (`id`, `user_id`),
    UNIQUE (user_id, bank_id, account_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
PARTITION BY HASH (user_id)
PARTITIONS 50
```
MySQL xác định phân vùng nào lưu trữ các giá trị bằng cách sử dụng công thức <br>
N = MOD (expr, num)  
Trong đó:<br>
* N là số phân vùng kết quả
* expr là biểu thức
* num là số phân vùng được xác định trong từ khóa PARTITIONS.

Lại lưu ý cho ae là với Hash Partition chỉ sử dụng trên 1 column. Còn nếu mọi người muốn sử dụng nhiều cột để partition thì áp dụng kỹ thuật dưới đây.

#### Key Partition
Cũng tương tự như `Hash Partition` có điều  `Key Partition` có thể sử dụng 0 hoặc n column để partition, các column không nhất thiết phải là INTEGER. Trường hợp không truyền column để partition thì primary key hoặc unique key sẽ auto được chọn, nếu không có Primary key hay unique key trong trường hợp này thì sẽ báo lỗi.
```python
CREATE TABLE serverlogs4 (
    serverid INT NOT NULL, 
    logdata BLOB NOT NULL,
    created DATETIME NOT NULL,
    UNIQUE KEY (serverid)
)
PARTITION BY KEY()
PARTITIONS 10;
```
Nếu key không được chỉ định thì sẽ auto chọn primary key hoặc unique key, ở đây không có primary key mà chỉ có unique key thì `serverid` sẽ là *`"người được chọn"`* 

Ví dụ khác: 
```python
CREATE TABLE serverlogs5 (
    serverid INT NOT NULL, 
    logdata BLOB NOT NULL,
    created DATETIME NOT NULL,
    label VARCHAR(10) NOT NULL
)
PARTITION BY KEY(serverid, label, created)
PARTITIONS 10;
```

# VI. Khi nào thì nên sử dụng Partitions 
* Partition nên là lựa chọn cuối cùng khi muốn tối ưu hóa, tức là sau khi đã optimize câu query, sử dụng Index.
* Partition sẽ đem lại nhiều ý nghĩa nhất khi dữ liệu của bảng quá to hàng triệu bản ghi. Cụ thể hơn khi sử dụng Range Partition, khi dữ liệu quá lớn, muốn xóa các data cũ đi thì lựa chọn Range Partition theo time là vô cùng hợp lý.
* Khi áp dụng Partition lên bất kỳ bảng nào thì nên nhớ đến một số hạn chế như: không thể sử dụng khóa ngoại, cẩn thận với khóa chính hay unique. Hãy đảm bảo điều kiện khi muốn sử dụng Partition.
-----
## Demo
Mình sẽ demo trực tiếp với ví dụ mình làm thực tế, đó là sử dụng `hash partition` cho table `wallets` (query ở trên mình có đề cập rồi, bạn có thể kéo lên xem nhé)
Xong, sau khi table đã partition và mình có insert data vào rồi. Cùng xem data nó sẽ được phân chia vào các partition như thế nào nhé. 
```python
 SELECT PARTITION_NAME,TABLE_ROWS
      FROM INFORMATION_SCHEMA.PARTITIONS
      WHERE TABLE_NAME = 'wallets';
```
Và đây là kết quả: 
![](https://images.viblo.asia/8408dbf7-677d-4901-9a19-e917433b58e9.png)

Như bạn thấy, data đã được chia tối đa vào 50 partition, `từ p0 đến p49` 
(data test nên mình k insert nhiều, chứ thực tế trong dự án data khoảng gần 60tr records).
Bạn có để ý là tại sao số records tại mỗi partition có sự khác nhau không? Lý do là vì chúng ta đang chia partitions với key là user_id, thực tế là số user thuộc các partition là tương đương nhau, tuy nhiên số records ứng với mỗi user là có sự khác nhau: ví dụ user A có 10 records, user B có 100 records . . . 

Tiếp tục nhé, thử explain 1 câu query xem nào. Vì mình đang chia theo key là `user_id` nên 
trong câu truy vấn sẽ phải có `user_id` nếu muốn áp dụng Partition.
```python
EXPLAIN SELECT * FROM wallets WHERE user_id  = 300
```

id | select_type | table |	partitions	| type|	possible_keys | key | key_len | ref | rows | filtered | Extra
--- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
1 |SIMPLE |wallets	|p0 |ALL|||||	123	|10|Using where|	

Bạn chỉ cần focus vào `column` partition thôi, partition được chỉ định trong câu truy vấn sẽ là `p0` thay vì phải duyệt hết toàn bộ data (35k records) thì chỉ cần duyệt tại partition `p0` (123 records)
```python
Bạn có biết: Tốc độ truy vấn sẽ còn tăng lên đáng kể nếu kết hợp Partition và Index.
```
Mình cũng có bài viết về **Index** 	[tại đây](https://viblo.asia/p/su-dung-index-trong-database-nhu-the-nao-cho-hieu-qua-4P856q69lY3)

Một vài trường hợp bạn có thể biết chính xác data mình cần tìm thuộc partition nào (thường là áp dụng đối với **List Partition**  theo tháng p0 - p11), ta có thể `SELECT` trực tiếp tại partition đó.
```python
SELECT * FROM wallets PARTITION(p0) WHERE user_id = 300
```
Xóa data theo partition:
```python
ALTER TABLE wallets DROP PARTITION p0;
```
## Kết Luận
Xong, bài viết cũng khá là dài. Là sản phẩm đầu tay nên mình khá là tâm huyết, viết khá chi tiết và đầy đủ cho ae tìm hiểu. Hi vọng sẽ giúp ích được cho mọi người, nếu có ý kiến hay bình luận gì, đừng ngại comment phía dưới nhé. Sắp tới mình cũng sẽ tìm hiểu một vài chủ đề SQL hay ho nữa, ok thì mình lại `đẻ` thằng nữa cho ae cùng vọc nhé. Cám ơn mọi người đã dành thời gian đọc bài viết!<br> 
*(Author: QuanLx)*

*Tài liệu tham khảo*

[https://dev.mysql.com/doc/refman/5.7/en/partitioning-types.html](https://dev.mysql.com/doc/refman/5.7/en/partitioning-types.html)

[https://www.vertabelo.com/blog/everything-you-need-to-know-about-mysql-partitions/](https://www.vertabelo.com/blog/everything-you-need-to-know-about-mysql-partitions/)