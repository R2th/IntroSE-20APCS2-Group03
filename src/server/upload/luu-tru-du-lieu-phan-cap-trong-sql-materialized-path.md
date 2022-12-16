*Bài viết được post tại https://phatng.com/luu-tru-du-lieu-voi-materialized-path/ *

Gần đây mình có làm 1 task khá thú vị về lưu trữ dữ liệu với SQL, tưởng chừng như kiến thức học SQL cơ bản ở trường đã giải quyết được tốt nhưng không! Trong bài này chúng ta sẽ cùng khám phá cách mà Cấu trúc dữ liệu (CTDL) và Cơ sở dữ liệu (CSDL) kết hợp với nhau để giải quyết bài toán thú vị sau đây cùng mình nhé.

# Bài toán
Bài toán cần giải quyết như sau: giả sử cần lưu trữ các danh mục (categories) của 1 bài viết trên blog của mình, có các danh mục sau

![](https://images.viblo.asia/18a23494-2917-4bc9-94b6-c340df8d16cb.png)

Từ sơ đồ có thể thấy đây là 1 cây danh mục, ta có lập trình căn bản là cha của lập trình web và lập trình mobile và tương tự với những danh mục còn lại. Tiếp theo chúng ta sẽ nhúng tay vào SQL để tạo bảng lưu trữ các thông tin này xem sao.

# Cơ sở dữ liệu
Mình chọn MySQL để lưu trữ dữ liệu, đây là cấu trúc bảng ban đầu mình nghĩ đến

```sql
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(6) unsigned AUTO_INCREMENT NOT NULL,
  `value` varchar(255) NOT NULL,
  `parent_id` int(6) unsigned NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`parent_id`) REFERENCES categories(`id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8;
```

Và sau khi insert xong data như ở hình trên, ta được như sau

```sql
> SELECT * FROM categories where `parent_id` = 3

-----------------------------------------------
|   id    |      value           | parent_id  |
-----------------------------------------------
|    6    | Progresstive web app | 3          |
|    7    | Hybrid app           | 3          |
|    8    | Native app           | 3          | 
-----------------------------------------------
```
Mình dùng khóa ngoại `parent_id` thực chất là reference đến chính bảng đó để lưu thông tin danh mục cha, điều này sẽ hữu dụng khi ta muốn truy xuất toàn bộ danh mục con từ 1 danh mục cha, câu lệnh SQL bên dưới để lấy tất cả danh mục con của Lập trình mobile

```sql
> SELECT * FROM `categories`

-----------------------------------------------
|   id    |      value           | parent_id  |
-----------------------------------------------
|    1    | Lập trình căn bản    | NULL       |
|    2    | Lập trình web        | 1          | 
|    3    | Lập trình mobile     | 1          |
|    4    | Backend              | 2          |
|    5    | Frontend             | 2          |
|    6    | Progresstive web app | 3          |
|    7    | Hybrid app           | 3          |
|    8    | Native app           | 3          | 
-----------------------------------------------
```

Worked! Trông ổn thế cơ mà, cứ tưởng thế là đã xong task nhưng đời không như mơ :D anh lead vừa ngó vào xem code đã phát hiện ngay 1 trường hợp mà mình không nhìn đến:

> Nếu muốn lấy tất cả danh mục con của Lập trình căn bản thì phải làm như thế nào? Theo cấu trúc này thì anh nghĩ câu query sẽ không đơn giản đâu nha!
> -- Anh Lead

Mình sẽ thử viết câu query với yêu cầu của anh lead, nó sẽ như sau

```sql
> SELECT * FROM `categories` WHERE `parent_id` 
IN (SELECT `id` FROM `categories` WHERE `parent_id` = 1)

-----------------------------------------------
|   id    |      value           | parent_id  |
-----------------------------------------------
|    4    | Backend              | 2          |
|    5    | Frontend             | 2          |
|    6    | Progresstive web app | 3          |
|    7    | Hybrid app           | 3          |
|    8    | Native app           | 3          | 
-----------------------------------------------
```

Đến đây mình nhận thấy vấn đề, cụ thể chúng ta cần biết danh mục cha đang ở cấp thứ mấy để dùng câu lệnh WHERE..IN (hoặc JOIN) với số lần tương ứng (cụ thể ở câu query trên cần 1 lần) và đương nhiên không thể ngồi đếm thứ cấp của tụi này khi data lớn lên được. OK Fine! It's time to googling!

*Update*: Một vấn đề khác được bạn @thaohsk phát hiện và bình luận bên dưới, chúng ta chỉ mới nhận được tất cả category con của 2 category với id là 2 (Lập trình web) và 3 (Lập trình mobile). Để có thể hoàn thành được yêu cầu, chúng ta có thể dùng UNION hoặc chỉnh sửa điều kiện. Ví dụ
```sql
> SELECT * FROM `categories` WHERE `parent_id` 
IN (SELECT `id` FROM `categories` WHERE `parent_id` = 1) 
UNION 
SELECT * FROM `categories` WHERE `parent_id` = 1
```
```sql
> SELECT * FROM `categories` WHERE `parent_id` 
IN (SELECT `id` FROM `categories` WHERE `parent_id` = 1) 
OR `id` IN (SELECT `id` FROM `categories` WHERE `parent_id` = 1) 
```
# Cấu trúc dữ liệu: cây - tree
Sau khi đã google ra thông tin cần thiết, mình chọn materialized path pattern để áp dụng lưu trữ dạng data này, nguyên lí hoạt động khá đơn giản: chúng ta sẽ thêm vào 1 cột trong bảng để lưu đường dẫn của node hiện tại.

Mình không nói sâu hơn về cây (tree) mà đi thẳng vào cách áp dụng luôn (để cho người đọc dễ hình dung hơn và ít lí thuyết hơn :D ), chúng ta sửa lại schema như sau:

```sql
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(6) unsigned AUTO_INCREMENT NOT NULL,
  `value` varchar(255) NOT NULL,
  `parent_id` int(6) unsigned NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`parent_id`) REFERENCES categories(`id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8;
```

Sau khi seed lại dữ liệu tương tự như ban đầu, ta được

```sql
> SELECT * FROM `categories`

-----------------------------------------------
|   id    |      value           |    path    |
-----------------------------------------------
|    1    | Lập trình căn bản    | /1         |
|    2    | Lập trình web        | /1/2       | 
|    3    | Lập trình mobile     | /1/3       |
|    4    | Backend              | /2/4       |
|    5    | Frontend             | /2/5       |
|    6    | Progresstive web app | /3/6       |
|    7    | Hybrid app           | /3/7       |
|    8    | Native app           | /3/8       | 
-----------------------------------------------
```

Các bạn có hình dung được cách cài đặt của pattern này chưa? Giờ thì mình cùng query vài câu xem nhé. Chúng ta sẽ giải quyết vấn đề của cách cũ bằng câu query sau:

> SELECT * FROM `categories` WHERE `path` LIKE '/1/%'

Yeah! Câu query đã được ngắn gọn đi rất nhiều và đặc biệt dù cây danh mục của chúng ta có bao nhiêu cấp và đang tìm ở cấp nào thì chỉ việc thay '/1/%' thành 'path%' với path của danh mục hiện tại là xong :D

![](https://media.tenor.com/images/d66ce2af486030763fdbdad9e2d026ae/tenor.gif)
# Kết luận
Mặc dùng CTDL là 1 thứ gì đó khá là khoai đối với sinh viên khi nghe giảng ở trường nhưng không thể phủ nhận được tính ứng dụng thực tiễn tuyệt với mà nó mang lại, vậy nên các bạn sinh viên hãy học tốt môn này nhé, nếu cấu trúc cây mà chưa không biết thì nên học ngay vì nó còn ứng dụng nhiều thứ khác nữa đấy. Happy coding!~

## Tham khảo

[1] http://www.dba-oracle.com/t_sql_patterns_trees.htm

[2] https://bojanz.wordpress.com/2014/04/25/storing-hierarchical-data-materialized-path/

Bài viết được trích từ blog mình, nếu thấy hay các bạn vào blog https://phatng.com/ ủng hộ mình nhé :D