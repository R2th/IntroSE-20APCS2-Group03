# 1, Vấn đề với `OFFSET`
Bạn có biết được rằng khi sử dụng `OFFSET` cho việc phân trang sẽ có vấn đề gì xảy ra không ?

Theo định nghĩa, `OFFSET` sẽ ra lệnh cho DB bỏ qua N kết quả đầu tiên. Tuy nhiên để thực hiện điều này, DB vẫn phải đọc và sắp xếp các bản ghi (`OFFSET` luôn phải sử dụng cùng `ORDER BY`), sau đó mới đưa ra được kết quả mà ta mong muốn. 

Đây không phải là một vấn đề về việc implement, đây là cách mà `OFFSET` được thiết kế ra:

> …the rows are first sorted according to the (order by clause) and then limited by dropping the number of rows specified in the (result offset clause) from the beginning…  -- ***SQL:2016, Part 2, §4.15.3 Derived tables***

Điều này dẫn đến 2 vấn đề:
- Tham số N truyền vào quá lớn sẽ ảnh hưởng tới performance của hệ thống, khi mà database phải tìm hết toàn bộ các bản ghi phù hợp, sắp xếp và loại bỏ N bản ghi.
- Trong trường hợp có 1 bản ghi mới được thêm vào (như hình dưới), sử dụng OFFSET để loại bỏ các kết quả trước đó sẽ dẫn tới hiện tượng lặp kết quả giữa 2 trang, và đây là vẫn đề thường xuyên gặp phải nhất.
    
![](https://images.viblo.asia/d30bc565-516f-4caf-9a10-9f229b4f9ce5.png)
    
Đây không phải là lỗi do DB, trong cách mà các framework phân trang, chúng chỉ đề cập tới page-number cần lấy và bao nhiêu rows cần bỏ qua. Với lượng thông tin như vậy, không DB nào có thể tránh được các vấn đề bên trên.
    
# 2, Cuộc sống không cần `OFFSET`
    
Bây giờ hãy thử tưởng tượng một thế giới không có các vấn đề nêu trên đi, chúng ta có thể sử dụng một cách phân trang khác mà không cần đến `OFFSET` không ?
    
 Tất nhiên là có rồi, thay vì sử dụng `OFFSET`, dùng `WHERE` để lọc kết quả dựa vào giá trị ID của bản ghi trong trang trước đó, kết hợp với việc đánh index sẽ đem lại hiệu quả tốt hơn về performance.
 
 Tất nhiên nếu làm như vậy, chúng ta vẫn phải sắp xếp các bản ghi để hiển thị chúng ra một cách có thứ tự. Tuy nhiên các bạn cứ thử so sánh giữa việc sắp xếp 10 bản ghi và 1 triệu bản ghi thì hiệu năng bên nào sẽ tốt hơn ?
 
 Đây là một ví dụ về một filter đơn giản để lấy ra 10 bản ghi tiếp theo bản ghi cuối cùng chúng ta truy cập đến:
 
 ```sql
 SELECT ...
  FROM ...
 WHERE ...
   AND id < ?last_seen_id
 ORDER BY id DESC
 FETCH FIRST 10 ROWS ONLY
 ```
 
 Đây là một công thức cơ bản cho việc sử dụng `WHERE` để phân trang. Việc sắp xếp với điều kiện nằm trên nhiều cột sẽ khó khăn hơn, nhưng ý tưởng cơ bản vẫn vậy. Công thức này có thể áp dụng  cả cho NoSQL.
 
 Giải pháp này được gọi là seek method (hay keyset pagination), nó giúp giải quyết các vấn đề của `OFFSET` và hiệu năng còn tốt hơn `OFFSET`.
 
 Để rõ hơn về cách thức hoạt động của DB khi sử dụng `OFFSET` và seek method, các bạn có thể tham khảo thêm trong [slide này](https://www.slideshare.net/MarkusWinand/p2d2-pagination-done-the-postgresql-way). 
 
Tuy nhiên, seek method cũng đi kèm một vài giới hạn đó là:
- Không thể nhảy tới một trang bất kỳ, vì seek method cần giá trị ID bản ghi nằm ở trang trước đó.
- Phức tạp hơn để xử lý hành động đi ngược từ cuối lên đầu danh sách trang.

# 3, Đối với các framework

Hiện nay thì phần lớn các tool phân trang đều sử dụng `OFFSET` chứ không phải là keyset pagination. Đây cũng chính là lý do mà các dự án vẫn chưa cân nhắc nhiều tới việc sử dụng keyset pagination.

Cùng với đó là việc phải sửa code (nhất là JS) trong việc chuyển trang, bởi vì bây giờ thay vì gửi một con số đến server để chuyển trang, khi sử dụng keyset pagination, ta phải gửi full keyset (chứa nhiều dữ liệu từ nhiều cột) đến server.

Tuy nhiên, hiện nay số lượng các framework hỗ trợ keyset pagination ở các ngôn ngữ đang dần nhiều hơn, ta có thể list ra một vài ví dụ như sau:

* [jOOQ](https://www.jooq.org/) — Java Object Oriented Querying. [Docs](https://www.jooq.org/doc/3.9/manual/sql-building/sql-statements/select-statement/seek-clause/).
* Ruby [order_query](https://github.com/glebm/order_query), [nexter](https://github.com/charly/nexter), và [Sequel::SeekPagination](https://github.com/chanks/sequel-seek-pagination)
* Django (Python): [chunkator](https://github.com/novafloss/django-chunkator) và [Django Infinite Scroll Pagination](https://pypi.python.org/pypi/django-infinite-scroll-pagination)
* [SQL Alchemy sqlakeyset](https://github.com/djrobstep/sqlakeyset).
* [blaze-persistence](https://github.com/Blazebit/blaze-persistence) — a rich Criteria API for JPA providers
* Perl [DBIx::Class::Wrapper](https://metacpan.org/pod/DBIx::Class::Wrapper::Factory#fast_loop_through)
* Node.js: [bookshelf-cursor-pagination](https://github.com/binded/bookshelf-cursor-pagination)
* [Massive.js](https://massivejs.org/), a data mapper for Node.js that goes all in on [PostgreSQL: Keyset Documentation](https://massivejs.org/docs/options-objects#keyset-pagination)

# 4, Tài liệu tham khảo
https://use-the-index-luke.com/no-offset