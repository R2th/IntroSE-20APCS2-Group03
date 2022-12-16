# Mở đầu
Hibernate là một thư viện ORM (Object Relational Mapping) mã nguồn mở giúp lập trình viên viết ứng dụng Java có thể map các objects (pojo) với hệ quản trị cơ sở dữ liệu quan hệ, và hỗ trợ thực hiện các khái niệm lập trình hướng đối tượng với cớ dữ liệu quan hệ.
Hiểu ngắn gọn thì Hibernate sẽ là một layer đứng trung gian giữa ứng dụng và database, và chúng ta sẽ giao tiếp với Hibernate thay vì giao tiếp với database . 
Bài viết này sẽ không không trình bày các cấu hình về hibernate nhưng sẽ chỉ ra các công dụng của hibernate mà chính các Java Developer cũng chưa biết

# Nội dung
## Sử dụng UUID như một primary key trong Hibernate

**Vấn đề :** Bạn muốn dùng UUID như một primary key trong database . 

**Giải pháp**: 

Hibernate  hỗ trợ  rất tốt cho các thuộc tính của loại  java.util.UUID nhằm sử dụng UUID làm khóa chính và cung cấp hai trình tạo để tạo UUID.  Hibernate hỗ 2 loại chính IETF RFC 4122 version 4 và IETF RFC 4122 version 1 . Ở đây mình chỉ giới thiệu tạo theo tiêu chuẩn RFC 4122 version 4

**ETF RFC 4122 version 4 .**

Để có thể tạo UUDI, chúng ta chỉ cần thêm chú thích @GeneratedValue vào thuộc tính khóa chính java.util.UUID. Ví dụ 

```
@Entity
public class Author {
@Id
@GeneratedValue
@Column(name = "id", updatable = false, nullable = false)
private UUID id;
...
}
```

Khi thực hiện lưu đối tượng vào databae, UUID sẽ được tạo trước khi đối tượng được lưu vào database

```
Author a = new Author();
a.setFirstName("Trung");
a.setLastName("Tran");
em.persist(a);
```

```
12:25:31,071 DEBUG
[org.hibernate.event.internal.AbstractSaveEventListener] - Generated
identifier: 35a18e65-97b9-48fd-a547-56f81e157253, using strategy:
org.hibernate.id.UUIDGenerator
12:25:31,113 DEBUG [org.hibernate.SQL] -
insert
into
Author
(firstName, lastName, version, id)
values
(?, ?, ?, ?)
12:25:31,117 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [1] as [VARCHAR] - [Trung]
12:25:31,118 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [2] as [VARCHAR] - [Tran]
12:25:31,119 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [3] as [INTEGER] - [0]
12:25:31,120 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [4] as [OTHER] - [35a18e65-97b9-48fd-a547-
56f81e157253]
```

## Map enum sang database column

**Vấn đề :** Bạn muốn map thuộc tính enum sang cột trong database.
 
**Giải pháp:** 
JPA và Hibernate cung cấp hai tùy chọn tiêu chuẩn để ánh xạ enum vào cơ sở dữ liệu
cột. Bạn có thể sử dụng Enum dưới dạng String hoặc theo thứ tự

- Đối với Enum dưới dạng String, đổi tên một giá trị enum yêu cầu
chúng ta sẽ phải cũng cập nhật cơ sở dữ liệu
- Đối với kiểu ordinal : Thứ tự của một giá trị enum phụ thuộc  vị trí của nó trong khai báo enum. Bạn sẽ phải cập nhật cơ sở dữ liệu của mình khi xóa giá trị hiện có hoặc thay đổi vị trí các giá trị trong enum
    Khi thực hiện ánh xạ, Hibernate và JPA hỗ trợ một chú thích để bạn có thể xác định kiểu ánh xạ  với chú thích @Enumerated

**Ví dụ:** một enum cơ bản với Enum tên là AuthorStatus

```
public enum AuthorStatus {
PUBLISHED, SELF_PUBLISHED, NOT_PUBLISHED;
}
```
. 
Ví dụ phía dưới,  sử dụng chú thích **@Enumerated** với kiểu **ordinal**. Nếu mặc định  không khai báo chú thích  **@Enumerated** hoặc không xác định kiểu chú thích  EnumType , Hibernate mặc định sẽ sử dụng ordinal làm default mapping

```
@Entity
public class Author {
@Enumerated(EnumType.ORDINAL)
private AuthorStatus status;
...
}
```

Khi thực hiện lưu Author vào database với status **PUBLISHED**, **Hibernate** sẽ lưu giá trị 0 vào database

Nếu sử dụng kiểu** STRING**,  chúng ta cần khai báo chú thích @Enumerated và xác định kiểu ánh xạ là **EnumType.STRING**

```
@Entity
public class Author {
@Enumerated(EnumType.STRING)
private AuthorStatus status;
}
```

Khi thực hiện lưu Author vào database với status PUBLISHED, Hibernate sẽ lưu giá trị **PUBLISHED** vào database ở cột status

## Tự động thiết lập một attribute trước khi lưu

**Problem** : Bạn muốn tự động thiết lập một attribute trước khi nó được lưu vào database: Ví dụ thời gian, tính toán một giá trị ...
**Giải pháp:** :  Bạn có thể sử dụng chú thích  @PrePersist tự động thiết lập một giá trị trước khi nó được lưu vào database

```
@Entity
public class Author {
...
@PrePersist
private void initializeCreatedAt() {
this.createdAt = LocalDateTime.now();
log.info("Set createdAt to "+this.createdAt);
}
}
```
Hibernate sẽ gọi phương thức này trước khi nó lưu Author vào database.

```
Author a = new Author();
a.setFirstName("Trung");
a.setLastName("Tran");
em.persist(a);
```

Hibernate gọi phương thức initizeCreatedAt trước khi nó chọn giá trị khóa chính từ cơ sở dữ liệu. Sau đó, nó sẽ lưu giá trị createdAt  vào cơ sở dữ liệu.
```

05:34:00,205 INFO [org.thoughts.on.java.model.Author] - Set
createdAt to 2020-02-23T05:34:00.198
05:34:00,211 DEBUG [org.hibernate.SQL] -
select
nextval ('hibernate_sequence')
05:34:00,260 DEBUG [org.hibernate.SQL] -
insert
into
Author
(createdAt, firstName, lastName, version, id)
values
(?, ?, ?, ?, ?)
05:34:00,267 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [1] as [TIMESTAMP] - [2020-02-23T05:34:00.198]
05:34:00,269 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [2] as [VARCHAR] - [Trung]
05:34:00,270 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [3] as [VARCHAR] - [Tran]
05:34:00,271 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [4] as [INTEGER] - [0]
05:34:00,272 TRACE [org.hibernate.type.descriptor.sql.BasicBinder] -
binding parameter [5] as [BIGINT] - [1]
```

## Tính toán thuộc tính của đối tượng với chú thích @Formula trong hibernate

**Vấn đề** :  Giá trị của một trong các thuộc tính của entity cần được tính bằng SQL
expression. Và bạn muốn map nó với hibernate.

**Giải pháp** :  Có thể sử dụng chú thích @Formula để khai báo giá trị trong SQL snippet .  Hibernate sẽ thực thi nó khi thực hiện truy vấn từ cơ sở dữ liệu.

Ví dụ sau đây sử dụng chú thích @Formula để tính toán ages của Author

```
@Entity
public class Author {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "id", updatable = false, nullable = false)
private Long id;
@Column
private LocalDate dateOfBirth;
@Formula(value = "date_part('year', age(dateOfBirth))")
private int age;
...
public int getAge() {
return age;
}
}
```

Khi Hibernate tìm nạp Entity Author từ cơ sở dữ liệu, nó sẽ thêm SQL đoạn trích của chú thích @Formula cho câu lệnh SQL của nó.

```
05:35:15,762 DEBUG [org.hibernate.SQL] – select author0_.id as
id1_0_, author0_.dateOfBirth as dateOfBi2_0_, author0_.firstName as
firstNam3_0_, author0_.lastName as lastName4_0_, author0_.version as
version5_0_, date_part(‘year’, age(author0_.dateOfBirth)) as
formula0_ from Author author0_ where author0_.id=1
```

##  Truy vấn kết quả query dưới dạng Stream trong Java 8
**Problem**  : Bạn muốn sử dụng Java 8 Stream để truy cập kết quả
**Giải pháp** : 
Đối với phiên bản Hibernate 5.2 ,  chúng ta có thể làm được điều đó bằng cách sử dụng : Hibernate’s Query interface. Nó trả về kết quả query dưới dạng Stream và sử dụng
HibernateScrollableResults để truy cập kết quả. 
**Ví dụ** :
```
Stream<Book> books = session.createQuery("SELECT b FROM Book b",
Book.class).stream();
books.map(b -> b.getTitle() + " was published on "
+ b.getPublishingDate())
forEach(m -> log.info(m)); 
```

# Kết luận
Bài viết trên chỉ là một phần nhỏ trong các thủ thuật để bạn có thể làm việc hiệu quả hơn với Hibernate. Còn rất nhiều thủ thuật mình chưa kịp đề cập ở bài viết này. Hẹn gặp lại trong các bài viết kế tiếp