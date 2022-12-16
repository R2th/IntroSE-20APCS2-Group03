Tác giả: Tamesuu
Nguồn: https://qiita.com/tamesuu/items/d9475a35709ec0d49763

Khi nào thì bạn sẽ giới hạn Unique cho MySQL ?
"Khi cần thiết chứ khi nào", bạn có thể sẽ nói thế.
Vậy khi nào là cần thiết?

Trong bài viết này, tác giả Tamesuu sẽ nói về những case cần giới hạn Unique

Giới hạn Unique là gì?

Là việc đảm bảo rằng dữ liệu của 1 column trong 1 table nào đó là duy nhất 

URL ref: https://dev.mysql.com/doc/refman/5.6/ja/constraint-primary-key.html


Khi nghĩ về trường hợp Web application
Khi bạn muốn đảm bảo tính đặc trưng của data trong Web application (Rails) 

Ở phía web application (server), kiểm tra trước khi save data.
Tôi sẽ thiết lập giới hạn Unique ở phía My SQL

Vậy thì câu trả lời cho câu hỏi "Khi nào thì cần thiết lập giới hạn Unique trong MySQL?" ở đầu bài sẽ là

1. Khi test trước khi save data bên phía Web app (phía server ) 

2. Gắn giới hạn Unique cho MySQL

Hãy thử xem qua các case cần gắn nào:

Môi trường test 

```
$ rails --version
Rails 5.2.3

$ mysql --version
mysql  Ver 14.14 Distrib 5.6.43, for osx10.13 (x86_64) using  EditLine wrapper
```

Test
Chuẩn bị:

MySQL

```
CREATE TABLE `hoges` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uniq_test1` int(11) DEFAULT NULL,
  `uniq_test2` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_test2` (`uniq_test2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

```
INSERT INTO hoges VALUES (null, 11111, 22222, NOW(), NOW());


app/models/hoge.rb

class Hoge < ApplicationRecord
  validates :uniq_test1, uniqueness: true
  validates :uniq_test2, uniqueness: true

  validate :hoge

  def hoge
    sleep(5)
  end
end
```

Bên phía Web application (Server)、 cả uniq_test1 lẫn uniq_test2 đều test trước khi save data 

Lần này, sẽ tạo model trong rails console 
```
$ rails c
Running via Spring preloader in process 12528
Loading development environment (Rails 5.2.3)
irb(main):002:0> ActiveRecord::Base.transaction do
irb(main):003:1* Hoge.create(uniq_test1: 5, uniq_test2: nil)
irb(main):004:1> end
   (1.9ms)  BEGIN
  Hoge Exists (6.3ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test1` = 5 LIMIT 1
  Hoge Exists (9.9ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test2` IS NULL LIMIT 1
  Hoge Create (4.0ms)  INSERT INTO `hoges` (`uniq_test1`, `created_at`, `updated_at`) VALUES (5, '2020-03-09 16:42:39', '2020-03-09 16:42:39')
   (6.9ms)  COMMIT
=> #<Hoge id: 6, uniq_test1: 5, uniq_test2: nil, created_at: "2020-03-09 16:42:39", updated_at: "2020-03-09 16:42:39">
```

QUy trình xử lý thì đại khái như sau 

1. Bắt đầu transaction của MySQL 
2. Kiểm tra tính đặc trưng của data 
3. Kết thúc transaction của MySQL (Tại đây sẽ tạo data )

Vấn đề là : xử lý được tiến hành gần như cùng lúc 

Nếu không giới hạn unique cho MySQL (Bad pattern)

Console1

```
$ rails c
Running via Spring preloader in process 12742
Loading development environment (Rails 5.2.3)
irb(main):001:0> ActiveRecord::Base.transaction do
irb(main):002:1* Hoge.create(uniq_test1: 5, uniq_test2: nil)
irb(main):003:1> end
   (2.2ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
   (1.1ms)  BEGIN
  Hoge Exists (3.2ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test1` = 5 LIMIT 1
  Hoge Exists (1.4ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test2` IS NULL LIMIT 1
  Hoge Create (4.3ms)  INSERT INTO `hoges` (`uniq_test1`, `created_at`, `updated_at`) VALUES (5, '2020-03-09 16:55:12', '2020-03-09 16:55:12')
   (7.9ms)  COMMIT
=> #<Hoge id: 7, uniq_test1: 5, uniq_test2: nil, created_at: "2020-03-09 16:55:12", updated_at: "2020-03-09 16:55:12">
```

Console2
```
$ rails c
Running via Spring preloader in process 12757
Loading development environment (Rails 5.2.3)
irb(main):001:0> ActiveRecord::Base.transaction do
irb(main):002:1* Hoge.create(uniq_test1: 5, uniq_test2: nil)
irb(main):003:1> end
   (1.8ms)  SET NAMES utf8mb4,  @@SESSION.sql_mode = CONCAT(CONCAT(@@sql_mode, ',STRICT_ALL_TABLES'), ',NO_AUTO_VALUE_ON_ZERO'),  @@SESSION.sql_auto_is_null = 0, @@SESSION.wait_timeout = 2147483
   (1.5ms)  BEGIN
  Hoge Exists (2.0ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test1` = 5 LIMIT 1
  Hoge Exists (5.1ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test2` IS NULL LIMIT 1
  Hoge Create (5.1ms)  INSERT INTO `hoges` (`uniq_test1`, `created_at`, `updated_at`) VALUES (5, '2020-03-09 16:55:13', '2020-03-09 16:55:13')
   (49.3ms)  COMMIT
=> #<Hoge id: 8, uniq_test1: 5, uniq_test2: nil, created_at: "2020-03-09 16:55:13", updated_at: "2020-03-09 16:55:13">
```

Phía Web app (Server) sẽ để lọt dữ liệu！！！

Gắn giới hạn Unique key cho MySQL  (Good pattern)
Console1
```
$ rails c
Running via Spring preloader in process 12742
Loading development environment (Rails 5.2.3)
irb(main):001:0> ActiveRecord::Base.transaction do
irb(main):002:1* Hoge.create(uniq_test1: nil, uniq_test2: 77777)
irb(main):003:1> end
   (3.7ms)  BEGIN
  Hoge Exists (1.4ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test1` IS NULL LIMIT 1
  Hoge Exists (2.8ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test2` = 77777 LIMIT 1
  Hoge Create (3.5ms)  INSERT INTO `hoges` (`uniq_test2`, `created_at`, `updated_at`) VALUES (77777, '2020-03-09 16:57:01', '2020-03-09 16:57:01')
   (18.2ms)  COMMIT
=> #<Hoge id: 9, uniq_test1: nil, uniq_test2: 77777, created_at: "2020-03-09 16:57:01", updated_at: "2020-03-09 16:57:01">
```

Console2

```
$ rails c
Running via Spring preloader in process 12757
Loading development environment (Rails 5.2.3)
irb(main):001:0> ActiveRecord::Base.transaction do
irb(main):002:1* Hoge.create(uniq_test1: nil, uniq_test2: 77777)
irb(main):003:1> end
   (7.9ms)  BEGIN
  Hoge Exists (3.7ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test1` IS NULL LIMIT 1
  Hoge Exists (1.8ms)  SELECT  1 AS one FROM `hoges` WHERE `hoges`.`uniq_test2` = 77777 LIMIT 1
  Hoge Create (5.4ms)  INSERT INTO `hoges` (`uniq_test2`, `created_at`, `updated_at`) VALUES (77777, '2020-03-09 16:57:04', '2020-03-09 16:57:04')
   (19.1ms)  ROLLBACK
Traceback (most recent call last):
        2: from (irb):4
        1: from (irb):5:in `block in irb_binding'
ActiveRecord::RecordNotUnique (Mysql2::Error: Duplicate entry '77777' for key 'uniq_test2': INSERT INTO `hoges` (`uniq_test2`, `created_at`, `updated_at`) VALUES (77777, '2020-03-09 16:57:04', '2020-03-09 16:57:04'))
```

Phía web app (server) có để ọt đi nữa, khi save xuống MySQL thì phía MySQL sẽ phát hiện và đưa ra error 


Chốt:
Để đảm bảo tính đặc trưng của data, cần gắn Unique key cho MySQL. Tác dụng thứ hai là đối phó được cho trường hợp bên web app (server) bị thiếu sót.