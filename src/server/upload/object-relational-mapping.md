Trong cách phát triển ứng dụng `web` hiện nay chắc hẳn các bạn đã quen với với từ khóa `ORM(Object Relational Mapping)`. Khi mà thời đại của các `framework` ứng với các ngôn ngữ đang lên ngôi một cách mạnh mẽ, `ORM` gần như là sự lựa chọn tuyệt vời của các nhà phát triển hiện nay.

`ORM` giúp chúng ta `dễ dàng` thao tác với dữ liệu với`Database` hơn, giúp chúng ta dễ `code`, dễ `maintain` hơn . . . Ở bài viết này tôi sẽ giới thiệu chung về `ORM`,  đi sâu vào phân tích các điểm `ưu điểm`, `nhược điểm` và khi nào áp dụng chúng trong các dự án thực tế.

Để cho dễ theo dõi từ thời điểm này của bài viết tôi xin được dùng `ORM` thay cho cụm từ `Object Relational Mapping`


 ![](https://images.viblo.asia/b5bef5c4-dd8f-43ac-931c-36e1c2130fa5.gif)


# 1. ORM là gì ?

Theo `Wikipedia `:
> Object-relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language. There are both free and commercial packages available that perform object-relational mapping, although some programmers opt to construct their own ORM tools.

Hiểu một cách đơn giản thì 

ORM là 1 `kỹ thuật lập trình` giúp `ánh xạ` các record dữ liệu trong `hệ quản trị cơ sở dữ liệu` sang dạng `đối tượng` đang định nghĩa trong các `class` - một khái niệm phổ biến được sử dụng trong tất cả các ngôn ngữ hiện đại ngày nay như: `Java`, `PHP`, `Ruby`. Bạn có thể áp dụng kĩ thật này với bất cứ dự án nào bạn thích.![](https://images.viblo.asia/be45a661-dbd0-4195-83dd-6ad004bd0c45.png)

Theo[ Martin Fowler](https://twitter.com/martinfowler)  có hai `patterns` được áp dụng cho các cách thiết kế `ORM` khác nhau.
 
>  1.  Một là [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html), kĩ thuật này sẽ sử dụng một object wraps một hàng trong bảng cơ sở dữ liệu hoặc view, đóng gói quyền truy cập cơ sở dữ liệu, và cả logic trên dữ liệu đó. Một đối tượng bao gồm cả dữ liệu và hành vi. Dữ liệu này thường mang tính liên tục và phải lưu trữ trong `database`. `Active Record` sử dụng cách tiếp cận rõ ràng, minh bạch, đưa logic thao tác dữ liệu vào `object domain`. Bằng cách này, các `dev` dễ dàng đọc hiểu logic của `pattern`.
 
 *Một số`ORM`nổi tiếng sử dụng `Active Record`* có thể kể tên là: [Eloquent](https://laravel.com/), [CachePHP](https://cakephp.org/), [JOOQ](https://www.jooq.org/), [TOPLINK](https://www.oracle.com/middleware/technologies/top-link.html)

![](https://images.viblo.asia/fcb9e8a5-b549-4d80-ac38-69a7b930b049.gif)

>  2. Hai là [Data Mapper](https://martinfowler.com/eaaCatalog/dataMapper.html), Theo như định nghĩa chính thức, thì đó là 1 `layer` mapper đưa dữ liệu qua lại giữa `object` và `Database` mà vẫn giữ được tính độc lập giữa chúng và cả giữa chính nó (lớp mapper)".
Như vậy là có `layer`  đặc biệt tách biệt với bộ nhớ của `database` và nhiệm vụ chính là chuyển dữ liệu qua lại giữa 2 lớp 

![](https://images.viblo.asia/47659995-75ff-490d-bade-83275e4f3a37.gif)

*Một số `ORM` nổi tiếng sử dụng `Data Mapper` như*: [Doctrine](https://www.doctrine-project.org/), [Hibernate](http://hibernate.org/), [SqlAlchemy](https://www.sqlalchemy.org/)

# 2. ORM hoạt động như thế nào ?
> Đặc trưng cơ bản của ORM là gói gọn CSDL trong 1 object. 1 phần của object sẽ chứa data, và phần còn lại lo việc data xử lý như nào và biến nó thành CSDL quan hệ.

ORM giải quyết vấn đề đồng bộ giữa kiểu dữ liệu trả về khác nhau. Một bên là cơ sở dữ liệu, ***ở đó dữ liệu được thể hiện dưới dạng tập hợp các bản ghi.*** Một bên là các đối tượng, ***ở đó dữ liệu đc hiện thị dưới dạng object***

![](https://images.viblo.asia/89075f0f-5e90-44e3-b228-60b2f8f2ff10.png)

![](https://images.viblo.asia/bb7407cb-2161-42be-a5cc-6df6c69dab3f.png)





# 3. Ưu và nhược điểm ORM
*Ví dụ về việc tìm kiếm danh sách bản ghi với điều kiện với sql thuần*
```php
book_list = new List();
sql = "SELECT * FROM library WHERE author = 'Linus'";
data = query(sql);
while (row = data.next())
{
     book = new Book();
     book.setAuthor(row.get('author');
     book_list.add(book);
}
```

*Với ORM, nó sẽ đơn giản như sau*
```php
book_list = BookTable.query(author="Linus");
```
Từ ví dụ đơn giản trên chúng ta dễ dàng nhận thấy các ưu điểm sau khi sử dụng ORM
## Ưu điểm

* Tuân thủ nguyên tắc [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), tập trung hóa code của bạn tại một chỗ, và việc chỉnh sửa, `maintain`, tái sử dụng lại code sẽ dễ dàng hơn
*  Rất nhiều thứ được thực hiện "tự động", liên quan tới việc xử lí dữ liệu, trong ví dụ trên chúng ta không cần quan tâm đến việc dùng vòng để convert data từ mysql ra, Chỉ cần biết đầu vào là keyword đầu ra trả lại 1 danh sách các quyển sách có author=Linus
*  Việc sử dụng ORM làm bạn bắt buộc phải viết code theo mô hình MVC, khiến code của bạn dễ sửa đổi, bảo trì hơn.
* Bạn không cần phải biết quá nhiều về MYSQL, bạn vẫn có thể tiếp cận dễ dàng với ORM.
*  Model k ràng buộc chặt chẽ với ứng dụng, hay nói cách khác, Model thì linh hoạt, vì vậy bạn có thể thay đổi hoặc sử dụng nó bất cứ chỗ nào 
*  ORM cho phép bạn tận dụng ưu điểm của `OOP` như kế thừa dữ liệu mà không phải đau đầu 
## Nhược điểm
*  Với mỗi framework sẽ có 1 thư viện ORM khác nhau, tất nhiên là bạn phải mất thời gian học nó. Và vì chúng là thư viện nên sẽ rất "nặng".
*   Performance ổn đối với các truy vấn thông thường, nhưng `Raw SQL` sẽ luôn làm tốt hơn với các dự án lớn.
*  ORM được coi là  `abstracts` của DB. Nếu bạn không quan tâm đến những gì thực sự xảy ra khi sử dụng ORM. Nó có thể là cái bẫy với những bài toán N + 1 query.

# 4 Đánh giá performance của ORM
Như ở phần nhược điểm mình có nói ORM sẽ có `performance` chậm hơn so với việc sử dụng `raw sql`. Dưới đây là một thống kê với `Eloquent ORM` của `Laravel` và `raw mysql`.
Môi trường: 
* CPU: Quad core Intel Xeon E31220
* Network: Broadcom NetXtreme BCM5722 Gigabit Ethernet PCI Express 
* Memory: 8.0 GB 
* HDD: 2000.4 GB 
* Operating System: CentOS 
   
## 4.1 Insert
Ở đây các nhà thử nghiệm đã `insert` số lượng bài viết khác nhau từ 1000 đến 10000 cho cả 2 kĩ thuật trong mỗi vòng lặp.
### Eloquent ORM



| Số lượt | Số bài viết |  Lượt 1 (ms) | Lượt 2(ms) |Lượt 3 (ms) | Trung bình cộng (ms) | Sai lệch (ms)  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1     | 1000     | 665,25      | 619,5      | 585,6      | 623,5     |  39,97 |
| 2     | 2000     | 1150     | 1140     | 1110     | 1133,3      |  20,81 |
| 3     | 3000     | 1490     | 1490     | 1420     | 1466,7      |  40,41 |
| 4     | 4000     | 1770      | 1790     | 1670     | 1743,3      |  64,29 |
| 5     | 5000     | 2080     | 2090     | 2220     | 2130,0      |  78,10|
| 6     | 6000     | 2540     | 2510     | 2560     | 2536,7      |  25,16 |
| 7     | 7000     | 2930     | 3010     | 3080     | 3006,7       |  75,05 |
| 8     | 8000     | 3360     | 3520     | 3380     | 3420,0       |  87,17  |
| 9     | 9000     | 3800      | 3900     | 3880     | 3860,0      |  52,91  |
| 10     | 10000     | 4270     | 4360     | 4390     | 4340,0       | 62,44|

### Raw SQL 
| Số lượt | Số bài viết |  Lượt 1 (ms) | Lượt 2(ms) |Lượt 3 (ms) | Trung bình cộng (ms) | Sai lệch (ms)  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1     | 1000     | 195,81   | 189,62      | 180,1      | 188,5     |  7,91  |
| 2     | 2000     | 322,78    | 335,64     | 307,01     | 321,8 |  14,33  |
| 3     | 3000     | 413,4     | 437,62     | 458,24      | 436,4     | 22,44  |
| 4     | 4000     | 598,87      | 567,57     | 559,01     | 575,2      |  20,98  |
| 5     | 5000     | 725,5     | 740,94      | 780,15     | 748,9       |  28,17 |
| 6     | 6000     | 867,93      | 869,12      | 891,27      | 876,1      |  13,14|
| 7     | 7000     | 1000     | 996,14      | 949,05      | 981,7       |  28,36 |
| 8     | 8000     | 1150     | 1120     | 1130     | 1133,3       |  15,27  |
| 9     | 9000     | 1190      | 1270     | 1220     | 1226,7       |  40,41   |
| 10     | 10000     | 1430     | 1380     | 1450     | 1420,0       | 36,05 |


Từ bảng trên ta có biểu đồ như sau 

![](https://images.viblo.asia/3c2aa2ba-f3e6-4dab-8da1-10a6cbbfc330.png)

 ## 4.2 Update
Ở đây các nhà thử nghiệm đã `update` số lượng bài viết khác nhau từ 1000 đến 10000 cho cả 2 kĩ thuật trong mỗi vòng lặp.

### Eloquent ORM



| Số lượt | Số bài viết |  Lượt 1 (ms) | Lượt 2(ms) |Lượt 3 (ms) | Trung bình cộng (ms) | Sai lệch (ms)  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1     | 1000     | 305,59       | 316,06 | 297,93      | 306,5      |  9,10 |
| 2     | 2000     | 522,06      | 565,12      | 543,43     | 543,5  |  21,53  |
| 3     | 3000     | 778,4      | 772,33      | 790,52      | 780,4 |  9,26  |
| 4     | 4000     | 1040      | 1010      | 1080      | 1043,3       |  35,11 |
| 5     | 5000     | 1290     | 1240     | 1260     | 1263,3      |  25,16 |
| 6     | 6000     | 2540     | 2510     | 2560     | 2536,7      |  25,16 |
| 7     | 7000     | 2930     | 3010     | 3080     | 3006,7       |  75,05 |
| 8     | 8000     | 3360     | 3520     | 3380     | 3420,0       |  87,17  |
| 9     | 9000     | 3800      | 3900     | 3880     | 3860,0      |  52,91  |
| 10     | 10000     | 4270     | 4360     | 4390     | 4340,0       | 62,44|

### Raw SQL 
| Số lượt | Số bài viết |  Lượt 1 (ms) | Lượt 2(ms) |Lượt 3 (ms) | Trung bình cộng (ms) | Sai lệch (ms)  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1     | 1000     | 195,81   | 189,62      | 180,1      | 188,5     |  7,91  |
| 2     | 2000     | 322,78    | 335,64     | 307,01     | 321,8 |  14,33  |
| 3     | 3000     | 413,4     | 437,62     | 458,24      | 436,4     | 22,44  |
| 4     | 4000     | 598,87      | 567,57     | 559,01     | 575,2      |  20,98  |
| 5     | 5000     | 725,5     | 740,94      | 780,15     | 748,9       |  28,17 |
| 6     | 6000     | 867,93      | 869,12      | 891,27      | 876,1      |  13,14|
| 7     | 7000     | 1000     | 996,14      | 949,05      | 981,7       |  28,36 |
| 8     | 8000     | 1150     | 1120     | 1130     | 1133,3       |  15,27  |
| 9     | 9000     | 1190      | 1270     | 1220     | 1226,7       |  40,41   |
| 10     | 10000     | 1430     | 1380     | 1450     | 1420,0       | 36,05 |

Từ bảng trên ta có biều đồ sau 
![](https://images.viblo.asia/4ef1a651-b3b1-4f88-a59b-62169f0975fe.png)
## 4.3 Select
Ở đây các thứ nghiệm chia làm 3 lượt 

*  Lượt đầu tiên lấy ra 3000 bài viết được `post` bởi một `user`
* Lượt hai lấy ra 3000 bài viết có tag là `sport` và `post` bởi một `user`
* Lượt 3 lấy ra 3000 bài viết có tag là `music` và `post` bởi một `user` và có thời gian post sau ngày `2015-05-21 22:00:00` 

### Eloquent ORM
| Số lượt | Số bảng join|  Lượt 1 (ms) | Lượt 2(ms) |Lượt 3 (ms) | Trung bình cộng (ms) | Sai lệch (ms)  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1     | 1     | 157,85       | 161,51  | 167,27     | 162,2      |  4,74 |
| 2     | 3     | 1000       | 1002  | 1006     | 1002,7      |3,055  |
| 3     | 4     | 1510      | 1540  | 1570     | 1540,0      |  30 |

### Raw SQL
| Số lượt | Số bảng join|  Lượt 1 (ms) | Lượt 2(ms) |Lượt 3 (ms) | Trung bình cộng (ms) | Sai lệch (ms)  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1     | 1     | 98,87        | 126,54 | 123,83    | 116,4     |  15,25 |
| 2     | 3     | 143,18        | 123,12  | 125,52      | 130,6    |10,95   |
| 3     | 4     | 158,33      | 141,16  | 166,23      | 155,2      |  12,81  |

## 4.4 Đánh giá và phân tích

Từ các số liệu bên trên có thể dễ dàng thấy được performance của `raw sql` rõ ràng tốt hơn so với `ORM` trong tất cả các hành động `select`, `insert`, `update`.

**Lí do ở đây là**: `ORM` cần thời gian tạo `Model instances`,  tạo ra các `property` cho `model` và `transform` đối tượng model thành dữ liệu quan hệ trước khi thực hiện việc giao tiếp với `database`. Tất cả những gì đằng sau nó là Laravel đã `convert` từng code `Eloquent ORM`   thành câu lệnh SQL thích hợp và sau đó thực thi trên tầng `database` và trả lại kết quả lại tầng `application`. Vì vậy thời gian để thực thi 1 tác vụ luôn mất nhiều thời gian hơn so với việc dùng `raw sql`.

***Nhưng khoan, đừng vội nhìn những con số trên mà vội nói `ORM` là đồ bỏ đi.***

Trong thực tế không ai `select` vài nghìn bản ghi, hay thực hiện việc tạo ra vài nghìn bản ghi trong một lúc.

Tức là khi số lượng bản ghi càng ít thì độ chênh lênh về hiệu suất giảm đi đáng kể. Lúc đó cộng thêm việc sử dụng cách kĩ thuật `cache` của `ORM` làm cho ứng dụng của bạn cũng tạm chấp nhận được so với những lợi ích về tốc độ phát tiển ứng dụng(thời gian phát triển), loại bỏ việc sử dụng code lặp đi lặp lại, bảo mật tốt hơn vào nhiều thứ tuyệt vời khác nữa.
#  5. Tổng kết

Tóm lại, đi xuyên suốt cả bài viết, mình đã mô tả cách hoạt động của `ORM`, nêu các điểm ưu điểm và  nhược điểm của `ORM`. Việc có nên sử dụng `ORM`hay không vẫn là đề tài tranh luận chưa có hồi kết. 

Về kinh nghiệm của bản thân khi làm dự án, mình thường mix giữa `ORM` và `Raw SQL` sao cho hiệu quả, với các truy vấn thông thường, `ORM` là lựa chọn của mình. Với các tình huống phải thao tác với nhiều bản ghi,`raw SQL` có vẻ hợp lí hơn. Nhưng khi dùng `raw sql` bạn phải thực sự cẩn thận về vấn đề [Sql injection](https://vi.wikipedia.org/wiki/SQL_injection).

Cảm ơn các bạn đã theo dõi bài viết trên, trong bài viết có tham khảo từ một số nguồn.
1. [Số liệu thống kê về thời gian truy vấn](http://www.diva-portal.org/smash/get/diva2:1014983/FULLTEXT02)
2. [ORM là gì? ](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one)

Và lượm nhặt linh tinh mà không nhớ :D. Hẹn gặp lại các bạn trong các bài viết sau 

**Donate cho tác giả** : **[Buy me a coffee](https://www.buymeacoffee.com/su.lowkey)**