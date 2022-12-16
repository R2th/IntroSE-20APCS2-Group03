# Mở đầu
Hibernate là một thư viện ORM (Object Relational Mapping) mã nguồn mở giúp lập trình viên viết ứng dụng Java có thể map các objects (pojo) với hệ quản trị cơ sở dữ liệu quan hệ, và hỗ trợ thực hiện các khái niệm lập trình hướng đối tượng với cơ dữ liệu quan hệ. Hiểu ngắn gọn thì Hibernate sẽ là một layer đứng trung gian giữa ứng dụng và database. Chúng ta sẽ giao tiếp với Hibernate thay vì giao tiếp với database . Phần trước mình đã giới thiệu cách tổng quan về các thủ thuật về hibernate. Có thể xem lại phần trước tại đây
https://viblo.asia/p/cac-thu-thuat-trong-hibernate-ma-ngay-ca-cac-java-developer-cung-chua-biet-Az45bepQlxY . Trong phần này mình sẽ trình bày tiếp các thủ thuật khác mà ngay cả các java developer cũng chưa biết

# Nội dung
## Làm cách nào để truy vấn một POJO dựa vào JPQL query
### Vấn đề
Mặc định JPQL sẽ trả về một entity có chú thích @Entity. Bạn có một POJO và mong muốn trả về nó thay vì trả về một entity
###  Giải pháp
JPQL hỗ trợ constructor expressions cho phép bạn xác định lệnh gọi constructor trong mệnh đề SELECT của truy vấn của bạn. Ví dụ:

```
EntityManager em= new EntityManager()
TypedQuery<BookValue> q = em.createQuery(
"SELECT new com.baotrung.model.BookValue("
+ "b.id, b.title, b.publisher.name) FROM Book b "
+ "WHERE b.id = :id", BookValue.class);
q.setParameter("id", 1L);
BookValue b = q.getSingleResult();
```

Thay vì select một entity, chúng ta  xác định constructor expression trong mệnh đề SELECT.Nó bao gồm từ khóa NEW, đường dẫn đầy đủ của POJO muốn khởi tạo và một danh sách các tham số được phân tách bằng dấu phẩy. 
Ví dụ trongcode phía trên gọi hàm tạo của lớp BookValue và danh sách các tham số gồm : id,title và Publisher Publisher

```
public class BookValue {
public Long id;
public String title;
public String publisherName;
public BookValue(Long id, String title, String publisherName) {
this.id = id;
this.title = title;
this.publisherName = publisherName;
} .
..
}
```

Ví dụ phía trên về môt lớp POJO và constructor chúng ta muốn khởi tạo. Hibernate sẽ map câu lệnh này đến một truy vấn SQL chọn các cột cần thiết
từ cơ sở dữ liệu và thực hiện lệnh gọi constructor đã xác định cho record được trả ra.
Kết quả từ hibernate

```
20:25:38,544 DEBUG [org.hibernate.SQL] -
select
book0_.id as col_0_0_,
book0_.title as col_1_0_,
publisher1_.name as col_2_0_
from
Book book0_,
Publisher publisher1_
where
book0_.publisherid=publisher1_.id
and book0_.id=?
```

## Làm cách nào chỉ để truy vấn một số trường của entity trong hibernate
### Vấn đề
Đôi lúc bạn chỉ muốn lấy một số trường trong entity của bạn chứ không cần lấy toàn bộ. Và bạn muốn lấy  một trường trong một entity khác có liên kết với entity bạn đang select. Làm cách nào để thực hiện điều này.
###  Giải pháp
Về cơ bản bạn có thể SELECT một số trường trong entity tương tự như cách bạn lấy toàn bộ entity. Tuy nhiên thay vì trả ra một entity bạn sẽ trả ra một **Object[].class**
Ví dụ phía dưới Select ra **title** từ entity tên là **book** và **name** từ một entity tên là **publisher** có liên kết với entity **book** .
```
EntityManager em= new EntityManager()
TypedQuery<Object[]> q = em.createQuery(
"SELECT b.title, b.publisher.name FROM Book b WHERE b.id = :id",
Object[].class);
q.setParameter("id", 1L);
Object[] result = q.getSingleResult();
```
Ở ví dụ trên có thể thấy chúng ta đang chọn một trường cụ thể là title trong entity Book và trường name trong entity publisher. Nhưng thay vì trả ra một entity như thông thường chúng ta đã trả ra một mảng các object class.

Kết quả :

```
15:37:16,708 DEBUG [org.hibernate.SQL] -
select
book0_.title as col_0_0_,
publisher1_.name as col_1_0_
from
Book book0_,
Publisher publisher1_
where
book0_.publisherid=publisher1_.id
and book0_.id=?
```

## Làm cách để gọi một function  của database trong hibernate
### Vấn đề
Đôi lúc bạn muốn thực hiện gọi một function nào đó của database trong chính JPQL. Ví dụ upper(String s),upper(String s),current_timestamp() , size(c). Làm cách nào để thực hiện được điều này
###  Giải pháp
Về cơ bản JPQL hỗ trợ một số hàm có thể sử dụng được trong truy vấn ở mệnh đề SELECT và WHERE. Trong ví dụ sau sẽ gọi hàm size trong books.

```
EntityManager em= new EntityManager()
Query q = em.createQuery(
"SELECT a, size(a.books) FROM Author a GROUP BY a.id");
List<Object[]> results = q.getResultList();
```

Hàm size() là một đặc tả của JPA. Chúng ta có thể dùng nó để đếm số lượng các entity được liên kết với thực thể đã select. Như câu lệnh phía dưới,  Hibernate sẽ khởi tạo mệnh đề JOIN để join giữa các bảng với nhau và gọi hàm COUNT của SQL để đếm các số lượng các entity có liên kết với Book
```
05:47:23,682 DEBUG [org.hibernate.SQL] -
select
author0_.id as col_0_0_,
count(books1_.authorId) as col_1_0_,
author0_.id as id1_0_,
author0_.firstName as firstNam2_0_,
author0_.lastName as lastName3_0_,
author0_.version as version4_0_
from
Author author0_ cross
join
BookAuthor books1_
where
author0_.id=books1_.authorId
group by
author0_.id
```

## Làm cách nào để gọi một function người dùng tự định nghĩa trong database ở  truy vấn JPQL 
### Vấn đề
Bạn có 1 hàm bạn tự định nghĩa trong DB và bạn muốn gọi nó trong JPQL
###  Giải pháp
Kể từ JPA 2.1 đã thêm vào JPQL một function là :  function(function_name {,function_arg})  nhằm giúp người dùng có thể gọi cụ thể một hàm do chính họ định nghĩa trong database. Đầu tiên chúng ta phải xác định tên function trong function_name, và các parameter như một argument truyền vào.
Đoạn code phía dưới sẽ gọi một hàm cụ thể do người dùng định nghĩa trong db gọi là : calculate . Function này sẽ trả về 1 Double , chúng ta sẽ cung cấp price trong entity Book và query parameter như một argument truyền vào

```
EntityManager em= new EntityManager()
TypedQuery<Book> q = em.createQuery(
"SELECT b FROM Book b "
+ "WHERE :double2 > function('calculate', b.price, :double1)",
Book.class);
q.setParameter("double1", 10.0D);
q.setParameter("double2", 40.0D);
List<Book> books = q.getResultList();
```

## Làm cách nào xác định Timeout trong JPQL
### Vấn đề
Bạn có một truy vấn JPQL và bạn set timeout cho nó.
### Giải pháp
JPA và Hibernate hỗ trợ javax.persistence.query.timeout dùng để xác định một  query timeout theo dạng milliseconds. Phương thức này sẽ gọi phương thức setTimeout  JDBC Statement . Nếu hết thời gian được chỉ định, truy vấn sẽ loại bỏ. Đoạn code sau này sẽ cung cấp cách set một timeout cho một JPQL

```
EntityManager em= new EntityManager()
List<Author> authors = em.createQuery("SELECT a FROM Author a")
.setHint("javax.persistence.query.timeout", 1)
.getResultList();
HashMap<String, Object> hints = new HashMap<>();
hints.put("javax.persistence.query.timeout", 1);
em.find(Author.class, 1L, hints);
```

Trong đoạn code trên  **em**  viết tắt của EntityManager.  Gồm tạo query set timeout và get kết quả. Nếu quá time, query bị loại bỏ

### Kết luận
Bài viết trên chỉ là một phần nhỏ trong các thủ thuật để bạn có thể làm việc hiệu quả hơn với Hibernate. Còn rất nhiều thủ thuật mình chưa kịp đề cập ở bài viết này. Hẹn gặp lại trong các bài viết kế tiếp.