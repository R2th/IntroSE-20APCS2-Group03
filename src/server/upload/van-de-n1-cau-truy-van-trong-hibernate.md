Hibernate là một khung công tác (framework) ORM(Object Relational Mapping) phổ biến trong hệ sinh thái ngôn ngữ lập trình Java. Hiện đang là khung công tác phổ biến không có nghĩa là không cónhững yếu tố khó khăn khi sử dụng. <br>Các khung ORMs thân thiệt với các lập trình viên và rất nhiều lập trình viên đã sử dụng chúng để nhanh chóng khởi dựng được ứng dụng và thao tác với cơ sở dữ liệu mà không cần phải viết các câu lệnh truy vấn cơ sở  dữ liệu.Nhưng nó có thể dẫn đến nhiều vấn đề nếu các lập trình viên không quen với các chức năng cơ bản của khung. Và vấn đề  n+1 câu truy vấn là một vấn đề như  vậy. <br>Đây cũng là một câu hỏi mình từng được hỏi trong một cuộc phỏng vấn. Có một bài viết nhất hay về cách giải quyết vấn đề này và mình xin được chia sẻ lại với các bạn. 
# 1. Vấn đề n+1  câu truy vấn
 Nếu bạn đã sử dụng Hibernate( hay bất kì khung ORM nào khác ), rất có thể bạn đã gặp phải vấn đề n+1 khét tiếng hết lần này đến lần khác.<br>
 Vấn đề n+1 câu truy vấn xảy ra  khi trong khi bạn load dữ liệu ở chế độ **FetchType.LAZY** trong **One-to-Many** ở mối quan hệ cha con:<br>
 1 câu truy vấn để lấy ra n đối tượng cha<br>
 Mất thêm n câu truy vấn(mỗi câu cho một đối tượng cha) để lấy ra các đối tượng con
# 2. Ví dụ minh họa
Môi trường là : Spring Boot, JPA(Hibernate), H2 database.
Chúng ta tạo ra một cơ sở dữ liệu với 5 tác giả(author) và 25 quyển sách(book). Mỗi tác giả gán với 5 quyển sách 
```
@Entity
public class Author {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String firstName;
private String lastName;
private String address;
@OneToMany(fetch=FetchType.LAZY, mappedBy="author")
private List<Book> books;
}
. . . 
@Entity
public class Book {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String title;
private String isbn;
@ManyToOne
private Author author;
}
. . . 
public interface BookDataService extends JpaRepository<Book, Long>{
}
. . .
public interface AuthorDataService extends JpaRepository<Book, Long>{
}
. . .
List<Author> authors = authorDataService.findAll();
for (Author author : authors) {
    System.out.printf("Author: %s %s has %d books.%n",
        author.getFirstName(), author.getLastName(),
        author.getBooks().size());
}
```
Đó là một phần của code để in ra tên của tác giả và số lượng sách liên quan.<br>
Ở đây ta sẽ có logs: 
```
13-01-2019 20:22:53.182 [restartedMain] INFO  org.hibernate.hql.internal.QueryTranslatorFactoryInitiator.initiateService - HHH000397: Using ASTQueryTranslatorFactory
Hibernate: 
    select
        author0_.id as id1_0_,
        author0_.address as address2_0_,
        author0_.first_name as first_na3_0_,
        author0_.last_name as last_nam4_0_ 
    from
        author author0_
Hibernate: 
    select
        books0_.author_id as author_i4_1_0_,
        books0_.id as id1_1_0_,
        books0_.id as id1_1_1_,
        books0_.author_id as author_i4_1_1_,
        books0_.isbn as isbn2_1_1_,
        books0_.title as title3_1_1_ 
    from
        book books0_ 
    where
        books0_.author_id=?
Author: Lucille Ordelt has 5 books.
Hibernate: 
    select
        books0_.author_id as author_i4_1_0_,
        books0_.id as id1_1_0_,
        books0_.id as id1_1_1_,
        books0_.author_id as author_i4_1_1_,
        books0_.isbn as isbn2_1_1_,
        books0_.title as title3_1_1_ 
    from
        book books0_ 
    where
        books0_.author_id=?
Author: Slade Gerwood has 5 books.
Hibernate: 
    select
        books0_.author_id as author_i4_1_0_,
        books0_.id as id1_1_0_,
        books0_.id as id1_1_1_,
        books0_.author_id as author_i4_1_1_,
        books0_.isbn as isbn2_1_1_,
        books0_.title as title3_1_1_ 
    from
        book books0_ 
    where
        books0_.author_id=?
Author: Wallis Croall has 5 books.
Hibernate: 
    select
        books0_.author_id as author_i4_1_0_,
        books0_.id as id1_1_0_,
        books0_.id as id1_1_1_,
        books0_.author_id as author_i4_1_1_,
        books0_.isbn as isbn2_1_1_,
        books0_.title as title3_1_1_ 
    from
        book books0_ 
    where
        books0_.author_id=?
Author: Alena Hall has 5 books.
Hibernate: 
    select
        books0_.author_id as author_i4_1_0_,
        books0_.id as id1_1_0_,
        books0_.id as id1_1_1_,
        books0_.author_id as author_i4_1_1_,
        books0_.isbn as isbn2_1_1_,
        books0_.title as title3_1_1_ 
    from
        book books0_ 
    where
        books0_.author_id=?
Author: Marcello Szymanski has 5 books.
13-01-2019 20:22:53.197 [restartedMain] INFO  org.hibernate.engine.internal.StatisticalLoggingSessionEventListener.end - Session Metrics {
    32411 nanoseconds spent acquiring 1 JDBC connections;
    0 nanoseconds spent releasing 0 JDBC connections;
    811912 nanoseconds spent preparing 6 JDBC statements;
    993417 nanoseconds spent executing 6 JDBC statements;
    0 nanoseconds spent executing 0 JDBC batches;
    0 nanoseconds spent performing 0 L2C puts;
    0 nanoseconds spent performing 0 L2C hits;
    0 nanoseconds spent performing 0 L2C misses;
    928594 nanoseconds spent executing 1 flushes (flushing a total of 30 entities and 5 collections);
    9723 nanoseconds spent executing 1 partial-flushes (flushing a total of 0 entities and 0 collections)
}
```
Như bạn có thể thấy có 1 một lệnh truy vấn được thực thi để lấy ra danh dách tác giả và sau đó mỗi truy vấn riêng được thực hiện lấy sách cho mỗi tác giả, kêt quả là có thêm 6 câu truy vấn được thực hiên. Đây là hành vi mặc định trong Hibernate , theo mình nó vẫn ổn miễn là bạn lấy cho sách cho một tác giả.<br>
Nhưng bây giờ hay xem xet ảnh hưởng của vấn đề này trong một ứng dựng thực tế, khi mà dữ liệu không nằm cùng trên một máy chủ duy nhất và có hàng nghìn bản ghi. Nó sẽ tốt rất nhiều hiệu suất của bạn khi thực hiên đấy.
# 3. Sử dụng Fetch Mode 
 Trong Hibernate cung cấp chú thích(anotation) @Fetch(...) có thể được sử dụng để xác định cách tìm nạp tập hợp các đối tượng liên quan(như nạp đối tượng sách cho đối tượng tác giả ở ví dụ trên)<br><br>
**FetchMode.SUBSELECT**
* "sử dụng một câu truy vấn phụ để tải các bộ sưu tập bổ sung"* [— SUBSELECT](https://docs.jboss.org/hibernate/annotations/3.5/api/org/hibernate/annotations/FetchMode.html#SUBSELECT)
<br>
Việc sử dụng @Fetch(FetchMode.SUBSELECT) sẽ chỉ đưa ra một truy vấn bổ sung để lấy các quyển sách.<br>
Sửa lại lớp Author.java như sau: 
```
@Entity
public class Author {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String firstName;
private String lastName;
private String address;
@OneToMany(fetch=FetchType.LAZY, mappedBy="author")
@Fetch(FetchMode.SUBSELECT)
private List<Book> books;
}
```
Và giờ chúng ta sẽ có log: 
```
13-01-2019 21:45:55.231 [restartedMain] INFO  org.hibernate.hql.internal.QueryTranslatorFactoryInitiator.initiateService - HHH000397: Using ASTQueryTranslatorFactory
Hibernate: 
    select
        author0_.id as id1_0_,
        author0_.address as address2_0_,
        author0_.first_name as first_na3_0_,
        author0_.last_name as last_nam4_0_ 
    from
        author author0_
Hibernate: 
    select
        books0_.author_id as author_i4_1_1_,
        books0_.id as id1_1_1_,
        books0_.id as id1_1_0_,
        books0_.author_id as author_i4_1_0_,
        books0_.isbn as isbn2_1_0_,
        books0_.title as title3_1_0_ 
    from
        book books0_ 
    where
        books0_.author_id in (
            select
                author0_.id 
            from
                author author0_
        )
Author: Lucille Ordelt has 5 books.
Author: Slade Gerwood has 5 books.
Author: Wallis Croall has 5 books.
Author: Alena Hall has 5 books.
Author: Marcello Szymanski has 5 books.
13-01-2019 21:45:55.262 [restartedMain] INFO  org.hibernate.engine.internal.StatisticalLoggingSessionEventListener.end - Session Metrics {
    43756 nanoseconds spent acquiring 1 JDBC connections;
    0 nanoseconds spent releasing 0 JDBC connections;
    2011683 nanoseconds spent preparing 2 JDBC statements;
    1827476 nanoseconds spent executing 2 JDBC statements;
    0 nanoseconds spent executing 0 JDBC batches;
    0 nanoseconds spent performing 0 L2C puts;
    0 nanoseconds spent performing 0 L2C hits;
    0 nanoseconds spent performing 0 L2C misses;
    771397 nanoseconds spent executing 1 flushes (flushing a total of 30 entities and 5 collections);
    9724 nanoseconds spent executing 1 partial-flushes (flushing a total of 0 entities and 0 collections)
}
```
Chúng ta có thể thấy chỉ có hai câu truy vấn được thực hiện , một cho việc lấy ra danh sách tác giả, một cho việc lấy ra các quyển sách liên quan tới những tác giả này.
**JOIN FETCH**
Điều gì sẽ xảy ra nếu chúng ta muốn tìm nạp tất cả các tác giả và sách của họ trong một câu truy vấn duy nhất ?<br>
Nếu muốn viết một câu truy vấn cho mục đích này, tôi sẽ thực hiện join các bảng lại với nhau. <br>
Hãy thực hiện điều đó bằng một cách của ORM thân thuộc với các lập trình viên bằng việc sử dụng chú thích @Query.<br>
Sử lại lớp  AuthorDataService.java như sau: 
```
public interface AuthorDataService extends JpaRepository<Author, Long>{
@Query("select a from Author a join fetch a.books")
List<Author> findAll();
}
```
Giờ ta được log như sau: 
```
Hibernate: 
    select
        author0_.id as id1_0_0_,
        books1_.id as id1_1_1_,
        author0_.address as address2_0_0_,
        author0_.first_name as first_na3_0_0_,
        author0_.last_name as last_nam4_0_0_,
        books1_.author_id as author_i4_1_1_,
        books1_.isbn as isbn2_1_1_,
        books1_.title as title3_1_1_,
        books1_.author_id as author_i4_1_0__,
        books1_.id as id1_1_0__ 
    from
        author author0_ 
    inner join
        book books1_ 
            on author0_.id=books1_.author_id
Author: Lucille Ordelt has 5 books.
Author: Lucille Ordelt has 5 books.
Author: Lucille Ordelt has 5 books.
Author: Lucille Ordelt has 5 books.
Author: Lucille Ordelt has 5 books.
Author: Slade Gerwood has 5 books.
Author: Slade Gerwood has 5 books.
Author: Slade Gerwood has 5 books.
Author: Slade Gerwood has 5 books.
Author: Slade Gerwood has 5 books.
Author: Wallis Croall has 5 books.
Author: Wallis Croall has 5 books.
Author: Wallis Croall has 5 books.
Author: Wallis Croall has 5 books.
Author: Wallis Croall has 5 books.
Author: Alena Hall has 5 books.
Author: Alena Hall has 5 books.
Author: Alena Hall has 5 books.
Author: Alena Hall has 5 books.
Author: Alena Hall has 5 books.
Author: Marcello Szymanski has 5 books.
Author: Marcello Szymanski has 5 books.
Author: Marcello Szymanski has 5 books.
Author: Marcello Szymanski has 5 books.
Author: Marcello Szymanski has 5 books.
13-01-2019 22:19:06.954 [restartedMain] INFO  org.hibernate.engine.internal.StatisticalLoggingSessionEventListener.end - Session Metrics {
    37273 nanoseconds spent acquiring 1 JDBC connections;
    0 nanoseconds spent releasing 0 JDBC connections;
    426213 nanoseconds spent preparing 1 JDBC statements;
    324117 nanoseconds spent executing 1 JDBC statements;
    0 nanoseconds spent executing 0 JDBC batches;
    0 nanoseconds spent performing 0 L2C puts;
    0 nanoseconds spent performing 0 L2C hits;
    0 nanoseconds spent performing 0 L2C misses;
    616901 nanoseconds spent executing 1 flushes (flushing a total of 30 entities and 5 collections);
    9723 nanoseconds spent executing 1 partial-flushes (flushing a total of 0 entities and 0 collections)
}
```
Vấn đề đã được giải quyết! Hâu như việc sử dụng ** JOIN FETCH**  giải quyết được vấn đề  nhiều câu truy vấn bằng cách sử dụng join nhưng nó lại trả về các bản ghi trùng nhau cho mỗi Author. Nhưng đó là những gì là join được cho là phải làm 
```
select * from author author0_ 
inner join book books1_ 
on author0_.id=books1_.author_id
```
Thực hiện truy vấn trên cho kết quả như sau, trong đó mỗi tác giả được sao chép với dữ liệu của họ
![](https://images.viblo.asia/e711f879-2140-4f8e-86f1-30b971f664a1.png)
Giải quyết cho vấn đề lặp lại bản ghi là thêm vào DISTINCT vào trong câu truy vấn:
```
public interface AuthorDataService extends JpaRepository<Author, Long>{
@Query("select distinct a from Author a join fetch a.books")
List<Author> findAll();
}
```
Logs:
```
Hibernate: 
    select
        distinct author0_.id as id1_0_0_,
        books1_.id as id1_1_1_,
        author0_.address as address2_0_0_,
        author0_.first_name as first_na3_0_0_,
        author0_.last_name as last_nam4_0_0_,
        books1_.author_id as author_i4_1_1_,
        books1_.isbn as isbn2_1_1_,
        books1_.title as title3_1_1_,
        books1_.author_id as author_i4_1_0__,
        books1_.id as id1_1_0__ 
    from
        author author0_ 
    inner join
        book books1_ 
            on author0_.id=books1_.author_id
Author: Slade Gerwood has 5 books.
Author: Lucille Ordelt has 5 books.
Author: Alena Hall has 5 books.
Author: Wallis Croall has 5 books.
Author: Marcello Szymanski has 5 books.
13-01-2019 22:20:00.730 [restartedMain] INFO  org.hibernate.engine.internal.StatisticalLoggingSessionEventListener.end - Session Metrics {
    38353 nanoseconds spent acquiring 1 JDBC connections;
    0 nanoseconds spent releasing 0 JDBC connections;
    494818 nanoseconds spent preparing 1 JDBC statements;
    979372 nanoseconds spent executing 1 JDBC statements;
    0 nanoseconds spent executing 0 JDBC batches;
    0 nanoseconds spent performing 0 L2C puts;
    0 nanoseconds spent performing 0 L2C hits;
    0 nanoseconds spent performing 0 L2C misses;
    681185 nanoseconds spent executing 1 flushes (flushing a total of 30 entities and 5 collections);
    10264 nanoseconds spent executing 1 partial-flushes (flushing a total of 0 entities and 0 collections)
}
```
# 4. Kết luận
Như vậy qua bài viết này mình đã trình bày cho  các bạn vấn  n+1 câu truy vấn cũng như cách giải quyết trong Hibernate. Cảm hơn các bạn đã dành thời gian đọc và khi vọng nó giúp ích được cho các bạn!
tài liệu tham khảo: https://medium.com/@mansoor_ali/hibernate-n-1-queries-problem-8a926b69f618