# Mở đầu
Hibernate là một thư viện ORM (Object Relational Mapping) mã nguồn mở giúp lập trình viên viết ứng dụng Java có thể map các objects (pojo) với hệ quản trị cơ sở dữ liệu quan hệ, và hỗ trợ thực hiện các khái niệm lập trình hướng đối tượng với cơ dữ liệu quan hệ. Hiểu ngắn gọn thì Hibernate sẽ là một layer đứng trung gian giữa ứng dụng và database. Chúng ta sẽ giao tiếp với Hibernate thay vì giao tiếp với database . Phần trước mình đã giới thiệu cách tổng quan về các thủ thuật về hibernate. Có thể xem lại phần trước tại đây
https://viblo.asia/p/cac-thu-thuat-trong-hibernate-ma-ngay-ca-cac-java-developer-cung-chua-biet-phan-2-yMnKMvdaZ7P . Trong phần này mình sẽ trình bày tiếp các thủ thuật khác mà ngay cả các java developer cũng chưa biết

# Nội dung
## Làm cách nào để tạo native query ở Runtime
### Vấn đề
Bạn cần tạo một native query dựa trên dữ liệu user input để truy vấn dữ liệu. Làm cách nào để tạo một native query trong thời gian runtime
###  Giải pháp
Chúng ta có thể tạo một native query tương tự giống cách mà chúng ta tạo đối với JPQL .  Chúng ta chỉ cần cung cấp câu lệnh **native query** như một String và sử dụng method **createNativeQuery** của **EntityManager**. 
Câu lệnh phía dưới tìm tất cả các record trong table book với id bằng với dữ liệu input từ người dùng.  Dấu **?**  được xem như một parameter chỉ ra rằng đó là nơi user sẽ input data vào.  Để có thể input được **parameter** vào native query chúng ta sử dụng method **setParameter** của **Query** interface. Lưu ý rằng index của  parameter được xác định bởi** ?** bắt đầu bằng 1

```
Query q = em.createNativeQuery("SELECT * FROM book b WHERE id = ?",
Book.class);
q.setParameter(1, 1);
Book b = (Book) q.getSingleResult();
```

Câu lệnh phía trên thực hiện tạo native query tìm tất các các book với điều kiện id = 1. 
q.setParameter(1, 1); chỉ ra rằng thiết lập giá trị id = 1 ở index 1. (Book) q.getSingleResult(); => dùng để trả ra 1 kết quả duy nhất.

## Làm cách nào để tạo name native SQL query
### Vấn đề
Bạn không muốn tạo native query ở logic code của bạn ?  Liệu có cách nào để tạo một name query tương tự như JPQL
### Giải pháp
Chúng ta cần define name native query SQL query với anotation **@NamedNativeQuery** . Như câu lệnh SQL phía dưới, tương tự như **@NamedQuery** được sử dụng cho JPQL query.

```
@Entity
@NamedNativeQuery(name=Book.QUERY_SELECT_BY_ID,
query="SELECT * FROM book b WHERE id = ?",
resultClass = Book.class)
public class Book {
public static final String QUERY_SELECT_BY_ID =
"Book.selectById";
...
}
```

Chúng ta cần define  2 tham số  name và query .  Câu lệnh query phía trên rất đơn giản. Tìm book dựa trên id.  Hibernate hỗ trợ **named bind parameters** dành cho **native query** nhưng JPA thì không hỗ trợ. Vì vậy chúng ta cần xác định parameter dựa trên** positional bind** bằng chú thích** ?** .  Chúng ta cần xác định resultClass để chỉ ra cho hibernate map kết quả query vào Book entity.

Tiếp theo , chúng ta sử dụng name query tương tự như cách sử dụng name JPQL query. 

```
Query q = em.createNamedQuery(Book.QUERY_SELECT_BY_ID);
q.setParameter(1, 100);
Book b = (Book) q.getSingleResult();
```

Ở  câu lệnh phía trên, chúng ta khởi tạo câu query bằng cách gọi phương thức createNameQuery từ EntityManager.  Tiếp theo , sử dụng phương thức setParameter để input id cho câu lệnh (ở đây = 100) và gọi phương thức getSingleResult để nhận kết quả. 
Lưu ý 1 ở đây là vị trí index của id. Postion parameter luôn bắt đầu bằng 1

## Làm cách nào để map result của native query đến một POJO
### Vấn đề
Câu lệnh SQL của bạn quá phức tạp đối với JPQL và bạn muốn sử dụng native query.  Có cách nào để map kết quả từ native query sau khi truy vấn đến một POJO.
### Giải pháp
JPA hỗ trợ chú thích **@SqlResultSetMappings** , dùng để map một result từ native query đến một POJO . Ví dụ phía dưới dùng để map kết quả của native query SQL sang POJO BookValue.

```
public class BookValue {
private String title;
private Date publishingDate;
public BookValue(String title, Date publishingDate) {
this.title = title;
this.publishingDate = publishingDate;
} .
..
}
```

Chúng ta sử dụng @SqlResultSetMapping  để define constructor tương tự như đối với JPQL. 

```
@SqlResultSetMapping(
name = "BookValueMapping",
classes = @ConstructorResult(
targetClass = BookValue.class,
columns = {@ColumnResult(name = "title"),
@ColumnResult(name = "date")}))
```

Câu lệnh phias trên gồm name  và anotation** @ConstructorResult** .  name được dùng để khai báo như một parameter ở phương thức **createNativeQuery** . **@ConstructorResult** dùng để khai báo như một constructor ở lớp **BookValue**. **@ColumnResult** dùng để khai báo cách hibernate thực hiện map kết quả từ native query đến parameter của constructor. Ở v dụ trên ,  Hibernate thực hiện gọi constructor với cột title như parameter đầu và cột date column như parameter thứ 2. 

Khi thực hiện cung cấp tên của **@SqlResultSetMapping** như một second parameter ở method **createNativeQuery** , Hibernate sẽ thực hiện mapping kết quả đó sang POJO tương ứng đã define.

```
BookValue b = (BookValue) em.createNativeQuery(
"SELECT b.publishingDate as date, b.title, b.id "
+ "FROM book b WHERE b.id = 1", "BookValueMapping")
.getSingleResult();
```
    
Câu lệnh phía trên thực hiện tạo một native query tìm tất cả các book với điều kiện **book = 1** và thực hiện map kết quả dựa trên **BookValueMapping** đã define ở phía trên dựa trên chú thích **@SqlResultSetMapping**

### Kết luận
Bài viết trên chỉ là một phần nhỏ trong các thủ thuật để bạn có thể làm việc hiệu quả hơn với Hibernate. Còn rất nhiều thủ thuật mình chưa kịp đề cập ở bài viết này. Hẹn gặp lại trong các bài viết kế tiếp.