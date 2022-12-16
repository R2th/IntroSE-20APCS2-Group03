# Mở đầu
Hibernate là một thư viện ORM (Object Relational Mapping) mã nguồn mở giúp lập trình viên viết ứng dụng Java có thể map các objects (pojo) với hệ quản trị cơ sở dữ liệu quan hệ, và hỗ trợ thực hiện các khái niệm lập trình hướng đối tượng với cơ dữ liệu quan hệ. Hiểu ngắn gọn thì Hibernate sẽ là một layer đứng trung gian giữa ứng dụng và database. Trong phần này mình sẽ trình bày tiếp các thủ thuật khác mà ngay cả các java developer cũng chưa biết
# Nội dung

# Làm thế nào để đếm số lượng query trong Session của Hibernate
## Vấn đề
Một số câu lệnh query của bạn chậm và thực hiện quá nhiều truy vấn. Làm cách nào để đếm số lượng query trong Session của hibernate
## Giải pháp
Cách dễ nhất để đếm tất cả các truy vấn đã thực thi là active Hibernate’s statistics. Hibernate sau đó thu thập  và cung cấp cho chúng dưới dạng các log message và thông qua Statistics API.
**Lưu ý** Không sử dụng tính năng này trên product vì nó sẽ làm chậm hệ thống của bạn
Mặc định , tính năng statistics component của **hibernate** sẽ bị tắt. Bạn phải bật tính năng đó qua lệnh **hibernate.generate_statistics = true** . Có thể bật thông qua tập tin cấu hình hibernate như sau :
```
<persistence>
<persistence-unit name="my-persistence-unit">
<description>Log</description>
<provider>
org.hibernate.jpa.HibernatePersistenceProvider
</provider>
<properties>
<persistence>
<persistence-unit name="my-persistence-unit">
<description>Hibernate Tips</description>
<provider>
org.hibernate.jpa.HibernatePersistenceProvider
</provider>
<properties>
<property name="hibernate.generate_statistics"
<value="true" />
</properties>
</persistence-unit>
</persistence>
```
Bạn có 2 tùy chọn để truy cập vào statistics của Hibernate. Hibernate sẽ viết toàn bộ các thông tin của mỗi session vào 1 file log hoặc bạn có thể truy cập Statistics API.
Đầu tiên hãy nhìn vào file log,hibernate sẽ viết các log tương tự như đoạn log sau vào cuối mỗi session. Trong đó nó sẽ hiển thị số lượng truy vấn sql, thời gian thực thi chúng.

```
16:24:55,318 INFO
[org.hibernate.engine.internal.StatisticalLoggingSessionEventListene
r] – Session Metrics {
25659 nanoseconds spent acquiring 1 JDBC connections;
22394 nanoseconds spent releasing 1 JDBC connections;
1091216 nanoseconds spent preparing 12 JDBC statements;
11118842 nanoseconds spent executing 12 JDBC statements;
0 nanoseconds spent executing 0 JDBC batches;
0 nanoseconds spent performing 0 L2C puts;
0 nanoseconds spent performing 0 L2C hits;
0 nanoseconds spent performing 0 L2C misses;
16999942 nanoseconds spent executing 1 flushes (flushing a total of
17 entities and 17 collections);
63915 nanoseconds spent executing 1 partial-flushes (flushing a
total of 0 entities and 0 collections)
```

Bạn cũng thể truy cập vào Statistics API thông qua Hibernate’s Statistics interface . Chúng ta có thể truy cập nó qua  **SessionFactory**.
```
Statistics stats = sessionFactory.getStatistics();
long queryCount = stats.getQueryExecutionCount();
long collectionFetchCount = stats.getCollectionFetchCount();
```


# Làm cách nào để sử dụng query comments để xác định một query
## Vấn đề
Ứng dụng của bạn có quá nhiều truy vấn giống nhau và bạn cần tìm ra output của một query cụ thể trong file log của bạn.
## Giải pháp

Hibernate có thể thêm comment khi nó tạo câu lệnh SQL cho JPQL hoặc thực thi một truy vấn hoặc Criteria query hoặc native SQL . Bạn có thể xem nó ở file log khi bạn kích hoạt tính năng log hoặc trong log từ database. Bạn cần kích hoạt tính năng SQL comments bằng cách set giá trị ** hibernate.use_sql_comments = true**. Dưới đây là đoạn code để thực hiện

```
<persistence>
<persistence-unit name="my-persistence-unit">
<description>Hibernate Tips</description>
<provider>
org.hibernate.jpa.HibernatePersistenceProvider
</provider>
<exclude-unlisted-classes>false</exclude-unlistedclasses>
<properties>
<property name="hibernate.dialect"
value="org.hibernate.dialect.PostgreSQLDialect" />
<property name="hibernate.use_sql_comments"
value="true" />
....
</properties>
</persistence-unit>
</persistence>
```

Khi thực hiện kích hoạt SQL comments, Hibernate sẽ tạo comment cho mỗi query. Nó thường không hữu ích khi bạn muốn tìm một truy vấn sql cụ thể. Sẽ tốt hơn là nên cung cấp một comment cụ thể với org.hibernate.comment .

Ví dụ dưới sẽ thực hiện tạo comment với comment là  "Test comment for query"
```
TypedQuery q = em.createQuery(
"SELECT a FROM Author a WHERE a.id = :id",
Author.class);
q.setParameter("id", 1L);
q.setHint("org.hibernate.comment", "Test comment for query");
Author a = q.getSingleResult();
```

Hibernate sẽ thực hiện add comment để tạo câu lệnh sql và viết nó vào log file.
```
08:15:57,432 DEBUG [org.hibernate.SQL] – /* Test comment for query */
select author0_.id as id1_0_, author0_.firstName as firstNam2_0_,
author0_.lastName as lastName3_0_, author0_.version as version4_0_
from Author author0_ where author0_.id=?
```

# Làm cách nào để map một generated values
## Vấn đề
Cơ sở dữ liệu của bạn thiết lập một trigger để tạo value một column trong database. Làm cách nào bạn có thể map nó để hibernate lấy giá trị sau khi được tạo từ database
## Giải pháp
Bạn có thể đánh dấu một thuộc tính entity với** @Generated(GenerationTimevalue)**. Điều này sẽ chỉ cho **Hibernate** rằng database sẽ tạo giá trị của thuộc tính . The **GenerationTime** enum sẽ chỉ ra cho Hiberate biết khi nào database sẽ được tạo giá trị. gồm 2 thuộc tính là **INSERT** hoặc  **ALWAY**(tạo hoặc cập nhật). Hibernate sau đó sẽ thực thi câu lệnh lấy giá trị từ database.
Ví dụ

```
@Entity
public class Author {
@Column
@Generated(GenerationTime.ALWAYS)
private LocalDateTime lastUpdate;
...
}
```
Như bạn có thể thấy trong log, Hibernate hiện thực hiện một truy vấn bổ sung cho mỗi câu lệnh chèn và cập nhật để truy xuất giá trị được tạo.
```
// Transaction 1
em.getTransaction().begin();
Author a = new Author();
a.setFirstName("Trung");
a.setLastName("Tran");
em.persist(a);
em.getTransaction().commit();
log.info(a);
// Transaction 2
em.getTransaction().begin();
a = em.find(Author.class, a.getId());
a.setFirstName("Changed Firstname");
em.getTransaction().commit();
log.info(a);
12:06:36,349 DEBUG [org.hibernate.SQL] -
insert
into
Author
(firstName, lastName, version, id)
values
(?, ?, ?, ?)
12:06:36,353 DEBUG [org.hibernate.SQL] -
select
author_.lastUpdate as lastUpda4_0_
from
Author author_
where
author_.id=?
12:06:36,376 INFO [com.example.TestGenerate]
- Author [id=1, version=0, firstName=Trung, lastName=Tran,
lastUpdate=2020-10-21T12:06:36.322]

12:06:36,382 DEBUG [org.hibernate.SQL] -
update
Author
set
firstName=?,
lastName=?,
version=?
where
id=?
and version=?
12:06:36,384 DEBUG [org.hibernate.SQL] -
select
author_.lastUpdate as lastUpda4_0_
from
Author author_
where
author_.id=?
12:06:36,387 INFO [com.example.TestGenerate]]
- Author [id=1, version=1, firstName=Changed Firstname,
lastName=Tran, lastUpdate=2020-10-21T12:06:37.322]
```
## Kết luận
Bài viết trên chỉ là một phần nhỏ trong các thủ thuật để bạn có thể làm việc hiệu quả hơn với Hibernate. Còn rất nhiều thủ thuật mình chưa kịp đề cập ở bài viết này. Hẹn gặp lại trong các bài viết kế tiếp.