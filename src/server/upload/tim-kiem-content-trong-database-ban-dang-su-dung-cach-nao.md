Chào các bạn, có lẽ trong tất cả các project chúng ta đã làm đều không ít thì thì nhiều có một vài ô input cho phép người dung tìm kiếm thông tin họ muốn. Là một chức năng có trong hầu hết tất cả các ứng dụng web, trải qua bao đời developer nó cũng không có biến tướng gì nhiều, kết hợp thêm một chút Ajax cho tăng phần trải nghiệm người dùng. Trong quá trình làm việc thì mình đúc kế lại có 3 cách search hay được sử dụng một cách phổ biến nhất từ cơ bản đến nâng cao.
## 1. Where ... Like
![](https://images.viblo.asia/549931d5-6963-44c6-8516-f201495d96dc.jpg)

Đây có lẽ là tuổi thơ dữ dội nhất của bất kỳ một lập trình viên nào. Từ cái ngày biết đến database, biết viết dăm ba câu truy vấn thì `where ... like` chắc là thứ được sử dụng nhiều nhất cho đến tận bây giờ. Lắm lúc mình cảm thấy mình nó có thể cân mọi thứ khi:

* Có thể search chính xác một từ hoặc cụm từ có trong một cột nào đó trong database
* Nếu muốn search đồng thời trong 2 hoặc nhiều cột thì thêm cái `orWhere`

Có vẻ chỉ cần thế thôi là đã đủ cho một tính năng search khi người dùng nhập vào một chuỗi ký tự họ cần tìm kiếm, bonus thêm chút Ajax Jquery nữa là perfect. Nhưng khách hàng bản chất tham lam họ không muốn search theo kiểu khô khan cứng nhắc nữa, họ luôn lấy google ra so sánh và google làm được sao các anh không làm được nhỉ (khoc)

![](https://images.viblo.asia/ce7d9049-96f1-4765-a4cc-7f9e74d99896.png)

Đùa chút vậy, với cách search cổ truyền này thì có những nhược điểm sau:

* Không chính xác, độ nhiễu cao
* Tốc độ truy vấn chậm, vì nếu dùng % like % mysql sẽ không đánh index mà đi tìm kiếm từng row một, điều này thực sự là khủng khiếp.
* Có nhiều vấn đề với tìm kiếm tiếng Việt hoặc những ngôn ngữ có dấu.

## 2. Full Text Search
![](https://images.viblo.asia/7b12a85a-ab17-4428-bf75-eee90a9fe34a.jpeg)

Khá khẩm và nâng cao hơn `where ... like` chúng ta cùng tìm hiểu full text search. Kỹ thuật cốt lõi sử dụng trong full text search là inverted index nó cho phép bạn tìm kiếm những kết quả gần nhất với input nhập vào thay vì chỉ tìm chính xác cụm từ đó.
* FULLTEXT là kiểu index trong mysql
* Hiện tại chỉ có 2 engine hỗ trợ full-text index là InnoDB or MyISAM
* FULLTEXT có thể được tạo ra trong lúc tạo table hoặc update table

Có 2 chế độ tìm kiếm đó là BOOLEAN MODE và NATURAL LANGUAGE MODE. Trong BOOLEAN MODE thì không có default sorting, và trong chế độ này thì ta có thể qui định từ khóa nào sẽ xuất hiện, và từ khóa nào không xuất hiện trong kết quả trả về. Còn NATURAL LANGUAGE MODE thì tìm kiếm những kết quả thích hợp hơn là chính xác keyword được tìm.

Để tạo table full-text ta sử dụng syntax  như ví dụ sau:
```SQL
CREATE TABLE table_name (
id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, 
title VARCHAR(200), 
description TEXT, 
FULLTEXT(title,description)
) ENGINE=InnoDB;
```

Khi chúng ta đã có table được đánh full-text index, chỉ định những cột muốn search là title và description. Mỗi khi update hoặc insert dữ liệu vào một bảng , ví dụ bảng posts, chúng ta sẽ đồng thời insert vào tảng full-text này.

Truy vấn dữ liệu full-text cũng khá đơn giản, bạn chỉ cần :
```SQL
SELECT * FROM table_name WHERE MATCH(col1, col2)
AGAINST('search terms' IN NATURAL LANGUAGE MODE)
```
NATURAL LANGUAGE MODE là chế độ tìm kiếm từ ngữ tự nhiên nhất, nó sẽ giúp tìm kiếm những từ đồng nghĩa, được cung cấp bởi engine trên.
Tất cả chỉ là lý thuyết, còn thực tế chúng ta không dại gì tự code một đống thứ như vậy (cuoi).

Trong Laravel mình thường sử dụng package https://packagist.org/packages/5dmatwebsearch/advancesearch . Việc thao tác sẽ đơn giản hơn nhiều.

#### Install
```
 composer require 5dmatwebsearch/advancesearch:dev-master
```

#### Add index
```
php artisan index:table table fields
```
#### Hưởng thụ
```
Search::search(modelName , fields, searchText  ,select , order , pagination , limit)
```
Ví dụ:
```PHP
Search::search(
      "Post" ,
      ['title' , 'description'] ,
      "text input"  ,
      ['post_id' , 'title', 'description'],
      'post_id',
      false
)->where('post_id' , 10)->get()
```

## 3. Elasticsearch
![](https://images.viblo.asia/fedb4187-3e9c-4120-8fed-f3ac67e76d73.jpg)

Elastic Search (ES) là một search engine tổ chức phân tán, được xây dựng theo cơ chế RESTful API như một server cloud. Được phát triển bằng java. Dựa trên nền tảng kế thừa và phát triển từ Lucene Apache. Có đặc tính nổi bật là phân tán và tốc độ.
#### Ưu điểm của Elasticsearch
* Xây dựng theo cơ chế RESTful API, hoạt động như 1 Web Server độc lập 
* Có tốc độ tìm kiếm lớn do sử dụng kỹ thuật Inverted Index 
* Cho phép bạn thực hiện các câu truy vấn từ đơn giản tới phức tạp, từ có cấu trúc tới phi cấu trúc theo bất kì cách bạn muốn
* Cho khả năng thống kê, phân tích dữ liệu dễ dàng
* Được thiết kế phân tán, bao gồmđảm bảo tốc độ và tin cậy (hệ thống vẫn hoạt động khi một node bị sập)

Cơ chế lưu trữ của elasticsearch là lưu trữ dưới dạng các term có cấu trúc json, hiểu đơn giản là phân tích và chia vùng dữ liệu, từ khóa nào nằm ở khu vực nào, những từ cùng nghĩa hoặc tương tự sẽ cùng ở một vùng.

## 4. Tổng kết
Trên đây là 3 cách tìm kiếm phổ biến và hay được áp dụng nhất, bạn đang sử dụng cách nào? có những cách đơn giản và có những cách phức tạp. Tùy vào mục đích và yêu cầu của hệ thống mà chúng ta cần cân nhắc sử dụng cho phù hợp. Bài viết chỉ nói qua nói lại về lý thuyết hy vọng giúp ích một chút cho các bạn. Thanks!