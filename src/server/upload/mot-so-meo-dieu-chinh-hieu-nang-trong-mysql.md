# Mở đầu
Mysql là hệ quản trị cơ sở dữ liệu phổ biến nhất hiện. Nó mạnh mẽ và hỗ trợ ta rất nhiều thứ tuyệt vời. Nhưng với sự phát triển của ORM thì chúng ta đang dần quên đi bản chất thự sự của sql nói chung hay mysql nói riêng. Trong bài hôm nay tôi, một thằng thi lại môn CSDL 2 lần xin giới thiệu cho các bạn một số điều cần chú ý để đảm bảo hiệu năng trong khi viết truy vấn với mysql.
#  Lựa chọn Local Storage Engine phù hợp
 Mysql hỗ trợ khá nhiều loại Local Storage Engine phù hợp với nhiều mục đích sử dụng khác nhau. Nhưng tôi chỉ giới thiệu 2 loại phổ biến nhất là MyISAM và InnoDB.
 
| MyISAM | 	InnoDB  |
| -------- | -------- |
Hỗ trợ Table - Level Loking	|Hỗ trợ Row - Level Locking
Được thiết kế cho nhu cầu về tốc độ (speed)	|Được thiết kế để đạt hiệu suất tối đa khi xử lý lượng dữ liệu lớn
Không hỗ trợ Foreign keys vì thế nên chúng ta gọi MySQL với MyISAM là DBMS	|Hỗ trợ Foreign keys vì thế nên chúng ta gọi MySQL với InnoDB là RDBMS
Lưu trữ tables, data, indexes của nó trong không gian đĩa bằng cách sử dụng 3 file riêng biệt (table_name.FRM, table_name.MYD, table_name.MYI)	|Lưu trữ tables, indexes của nó trong 1 không gian bảng
Không hỗ trợ Transaction	|Có hỗ trợ Transaction
Hỗ trợ Full |Text Search



>Tóm cái váy lại thì nếu ứng dụng của bạn cần truy xuất(SELECT) thông tin nhiều và ít có các action Insert/Update dữ liệu thì nên sử dụng MyISAM để có hiệu suất tốt nhất. Ví dụ như: Blog, News...Ngược lại, Ứng dụng cuả bạn yêu cầu việc Insert/ Update dữ liệu liên tục, và có cả những nghiệp vụ yêu cầu sử dụng transaction như `payment,...` thì nên sử dụng InnoDB. Ví dụ như : Forum, Socials network,...
# Đừng quên đánh index
 Bỏ qua những lý thuyết như cây nhị phân hay index kiểu Btree. Thì chúng ta hãy hiểu đơn giản như sau. Nếu 1 câu truy vấn không kết hợp với index thì sql sẽ phải đọc lần lượt tất cả bản ghi trong 1 table. Sau đó lấy ra những bản ghi phù hợp và trả về kết quả cho chúng ta. Nhưng nếu sử dụng index, bằng một magic nào đó, Giống như mục lục của 1 trang sách vại. Ta chỉ cần vào đó và biết được những trang sách mà ta cần ở đâu. Vào đó lấy ra hoy chứ không cần phải lật lần lượt từng trang một =)) Đấy là lý thuyết của một thằng thì lại vài lần thôi các bạn đừng cười :3

Quay về với thực tại, Chúng ta nên lưu ý 2 điều sau trước khui quyết định đánh index cho 1 trường.
* Index làm tăng tốc độ truy vấn cho các mệnh đề:  Order By, Group By, Where, Join,..
* Nhưng cũng chính nó là nguyên nhân của việc insert, update bị chậm. Vì sao ư ? Đơn giản là cái mục lục đang yên đang lành lại phải đánh lại khi có action insert/update. Và nó sẽ trở thành 1 vấn đề nếu các action này là liên tục và lượng data lớn.

# Truy vấn phức tạp hay nhiều truy vấn 

Theo `lối nhỏ` của thiết kế cơ sở dữ liệu nhấn mạnh việc thực hiện càng nhiều công việc càng tốt với càng ít truy vấn càng tốt. Nghe cũng thuyết phục =)) Nhưng lại không hoàn toàn đúng. Cách tiếp cận này về mặt lịch sử tốt hơn vì chi phí truyền thông mạng và chi phí của các giai đoạn `parsing` và `optimization`.

Tuy nhiên, lời khuyên này không áp dụng nhiều cho MySQL, vì nó được thiết kế để xử lý kết nối và ngắt kết nối rất hiệu quả và phản hồi các truy vấn nhỏ và đơn giản rất nhanh chóng. Mạng hiện đại cũng nhanh hơn đáng kể so với trước đây, giảm độ trễ của mạng. Theo 1 thống kê từ trên mạng (không phải VOZ đâu nhé. Các bạn yên tâm =)) )  MySQL có thể chạy hơn 50.000 truy vấn đơn giản mỗi giây trên phần cứng máy chủ hàng hóa và hơn 2.000 truy vấn mỗi giây. Vì vậy việc chạy nhiều truy vấn không nhất thiết là một điều `tệ`.

Nếu các đã tìm hiểu về cấu trúc mysql thì hẵn sẽ nhớ đến giai đoạn `conection handing` `parsing` và `optimization`. Nếu chưa nắm rõ thì tôi xin giới thiệu đến các bạn 1 bài về [Mysql Architecture](https://viblo.asia/p/tim-hieu-mysql-architecture-RnB5pj9JZPG) cũng của cái thằng thì lại CSDL 2 lần =))

## Cắt nhỏ một truy vấn
Tôi xin dẫn chứng 1 câu nói khá hay như sau: "Chia để trị =))". Thật vậy, trong nhiều trường hợp mà phổ biến nhất chính là khi insert/delete dữ liệu. Chúng ta sẽ có rất là nhiều record, có thể liên quan đến vài bảng khác nhau cần thao tác. Nếu cứ `cố đấm ăn xôi` thì rất có thể `xôi hỏng bỏng không` . Vậy cho nên lời khuyên của tôi là hãy chia nó thành nhiều câu query nhỏ. Và insert từng đó vào DB thôi nhé :v 
VD:
```
rows_affected = 0
do {
   rows_affected = do_query(
      "DELETE FROM messages WHERE created < DATE_SUB(NOW(),INTERVAL 3 MONTH)
      LIMIT 10000")
} while rows_affected > 0
```
## Join Decomposition
Nhiều trang web hiệu suất cao sử dụng Join Decomposition. Bạn có thể phân tách một mệnh đề Join bằng cách chạy nhiều truy vấn bảng đơn. Cùng thao khảo ví dụ dưới đây để thấy rõ hơn nhé.

```
mysql> SELECT * FROM tag
    ->    JOIN tag_post ON tag_post.tag_id=tag.id
    ->    JOIN post ON tag_post.post_id=post.id
    ->WHERE tag.tag='mysql';
```

Bạn có thể chuyển thành các truy vấn sau:

```
mysql> SELECT * FROM  tag WHERE tag='mysql';
mysql> SELECT * FROM  tag_post WHERE tag_id=1234;
mysql> SELECT * FROM  post WHERE  post.id in (123,456,567,9098,8904);
```
Điều này thoạt nhìn có vẻ lãng phí vì bạn đã tăng số lượng truy vấn mà không nhận lại được gì. Tuy nhiên,  điều bất ngờ thường đến sau :D:

* Bộ nhớ đệm có thể hiệu quả hơn. Nhiều ứng dụng  caches các `đối tượng` được `ánh xạ` trực tiếp đến các bảng. Trong ví dụ này, nếu bạn tìm thấy các bài đăng có id là 123, 567 hoặc 9098 trong bộ nhớ cache, thì chúng có thể bỏ qua việc truy vấn vào lại và lấy kết quả trực tiếp từ bộ nhớ cache.

* Đối với bảng MyISAM, thực hiện một truy vấn trên mỗi bảng sử dụng `table locks` hiệu quả hơn. Các truy vấn sẽ `lock` các bảng riêng lẻ  dẫn đến thời gian `lock` tương đối ngắn. Thay vì phải `lock` tất cả chúng trong một thời gian dài hơn.

 * Dễ dàng mở rộng cơ sở dữ liệu bằng cách đặt các bảng trên các máy chủ khác nhau.

* Bản thân các truy vấn có thể hiệu quả hơn. Trong ví dụ này, việc sử dụng một danh sách IN() thay vì một phép Join cho phép MySQL sắp xếp các ID hàng và truy xuất các hàng một cách tối ưu hơn những gì có thể có với Join.

* Bạn có thể giảm các truy cập hàng thừa. Thực hiện phép Join trong **ứng dụng** có nghĩa là bạn chỉ truy xuất mỗi hàng một lần, trong khi phép Join trong **truy vấn** về cơ bản là một quá trình không chuẩn hóa có thể truy cập nhiều lần vào cùng một dữ liệu. Vì lý do tương tự, chẳng hạn tái cấu trúc cũng có thể làm giảm tổng lưu lượng mạng và sử dụng bộ nhớ.

* Ở một mức độ nào đó, bạn có thể xem kỹ thuật này như việc triển khai thủ công một phép Hash Join thay vì thuật toán các vòng lồng nhau mà MySQL sử dụng để thực hiện một phép Join.

# Cần gì thì lấy đấy
 Nhiều câu truy vấn đang yêu nhiều dữ liệu hơn mức cần thiết, rồi sau đó lại loại bỏ những thông tin thừa này đi. Điều này khiến cho mysql phải làm việc nhiều hơn, tốn chi phí mạng, tiêu tốn bộ nhớ và tài nguyên CPU trên máy chủ.
## Lấy ra tất cả các cột:  
Chúng ta đã khá quen thuộc với câu lệnh `SELECT` sẽ lấy ra toàn bộ các hàng. Nhưng nếu yêu cầu chỉ là hiển thị thông tin của 10 users thì hãy thêm cho câu truy vẫn của bạn `limit(10)` nhé.
##  Lấy ra toàn bộ thông tin từ các bảng liên quan
 Cùng theo dõi câu query dưới đây nhé 
```
mysql> SELECT * FROM test_db.users
    -> INNER JOIN test_db.comments USING(post_id)
    -> INNER JOIN test_db.posts USING(user_id)
    ->WHERE sakila.posts.title = 'yasuo'
``` 
Câu truy vấn trên sẽ lấy ra toàn bộ thông tin cuả 3 bảng `users`, `posts`, `comments`.
Thay vào đó chúng ta có thể viết như sau:
`SELECT test_db.users.* FROM ...`

##  Lấy ra tất cả các cột:
 Đây có thể nói là 1 trong những lỗi cơ bản và phổ biến nhất. Mỗi khi nhìn thấy 1 câu truy vấn có `Select *...`, Điều đầu tiên bạn nên đặt 1 câu hỏi rằng: "Liệu chúng ta có cần hết tất cả thông tin ?". Chắc là không :v. Việc truy vất toàn các cột của 1 bảng có thể dẫn đến việc ngăn cản tối ưu hoá như `covering indexes`, tăng I/O, bộ nhớ cũng như chi phí cho máy chủ.

# Cẩn thận với Like %
 Khi truy vẫn với mệnh đề LIKE thì ta hay kết hợp với ký tự `%` để có thể search hiệu quả hơn. Nhưng hãy cẩn thận vì nếu ta sử dụng `Like %keyword` thì sẽ gây ra quá trình quét toàn bộ bảng. Và kiến câu query của bạn trở nên `so bad`.
# Chỉ sử dụng DISTINCT và UNION khi cần thiết
Việc sử dụng các toán tử UNION và DISTINCT mà không có bất kỳ mục đích chính nào gây ra việc sắp xếp không mong muốn và làm chậm quá trình thực thi SQL. Thay vì UNION, sử dụng UNION ALL mang lại hiệu quả hơn trong quy trình và cải thiện hiệu suất MySQL chính xác hơn.
# Phân trang
Trong các hệ thống phân trang thường gặp các mệnh đề LIMIT và OFFSET và gần như luôn được kết hợp với ORDER BY.
Một vấn đề thường gặp là nếu giá trị số bản ghi lớn như `Limit 1000, 20` thì server cần quét 1020 rows rồi bỏ 1000 rows đầu tiên và giữ lại 20 rows cuối cùng. Điều này khá tốn kém.

Một số cách hiệu quả đó chính là thực hiện offset trên 1 trường được đánh index. Quan sát câu query dưới đây :
```
mysql> SELECT film_id, description FROM sakila.film ORDER BY title LIMIT 50, 5;
```
Nếu bảng rất lớn, truy vấn này được viết tốt hơn như sau:

```
mysql> SELECT film.film_id, film.description
    -> FROM sakila.film
    ->    INNER JOIN (
    ->       SELECT film_id FROM sakila.film
    ->       ORDER BY title LIMIT 50, 5
    ->   ) AS lim USING(film_id);
```
Điều này hoạt động vì nó cho phép máy chủ kiểm tra càng ít dữ liệu càng tốt trong một  mà không cần truy cập vào các hàng và sau đó, khi các hàng mong muốn được tìm thấy, Join chúng với bảng đầy đủ để truy xuất các cột khác từ hàng. Một kỹ thuật tương tự áp dụng cho các phép Join với LIMITcác mệnh đề.

Còn 1 kỹ thuật nữa là tạo thêm 1 trường position và đánh index cho nó. Khi đó ta sẽ truy vấn như sau:
```
mysql> SELECT film_id, description FROM sakila.film
    -> WHERE position BETWEEN 50 AND 54 ORDER BY position;
```
Nhưng nó cũng đặt ra 1 thách thức về việc tính toán thứ hạng trước khi lưu vào DB.
# Mysql Query Cache
 Trong docs cũng như 1 số tài liệu trên mạng tôi có tìm thấy khá là nhiều ưu điểm của việc cache query. Nhưng xét theo quan điểm cá nhận thì tôi thấy việc này hoàn toàn có thể làm `tốt hơn` ở phía application. Chúng ta có thể cache, set thời gian hết hạn cho data cache 1 cách hiệu quả và linh động chả kém gì mysql. Nếu có quan điểm khác mong các cao nhân comment nhé. Đừng gạch đá tội em nhỏ =))

# Kết Luận
 Bằng kiến thức hạn hẹp, kinh nghiệm ít ỏi(nhưng số lần thi lại nhiều ). Tôi đã nêu lên 1 số điểm cần chú ý khi chọn là sử dụng truy vấn trong mysql. Có thể nó còn hơi thô sơ nhưng mong sẽ giúp ích được cho các bạn để tránh cách lỗi performance không đáng có khi sử dụng mysql. Cuối cùng xin cảm ơn các bạn đã đọc(bow)


Link tham khảo :
* [High Performance Mysql](https://learning.oreilly.com/library/view/high-performance-mysql/9780596101718/ch04.html)
* [Myisam vs Innodb](https://viblo.asia/p/myisam-innodb-in-mysql-924lJOkm5PM)
* https://www.cloudways.com/blog/mysql-performance-tuning/