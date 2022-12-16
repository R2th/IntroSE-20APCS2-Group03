Nếu bạn đã xử dụng nhiều mapping framework như ModelMapper, MapStruct, JMapper,... bạn sẽ nhận ra mỗi loại framework có ưu điểm riêng biệt, ModelMapper cho phép sử dụng cực kì nhanh thông qua instance của nó, MapStruct cho phép ta định nghĩa các interface và thấy tường minh quá trình mapping bên trong thông qua auto-gen implementation. Vậy bạn có tự hỏi tại sao Spring Boot không tạo riêng cho mình 1 cách mapping duy nhất để thống nhất code 🤔 Thật ra có khá nhiều cơ chế như Converter, Projection,... và trong bài này mình sẽ giới thiệu về Projection.

# Context

Trước khi đi vào chi tiết, mình sẽ mô tả case của project để dùng projection. Project gồm 2 entity là Book và Author.. không có magic vào khó hiểu cả 🤣

Mình có tạo seed cho Book và Author ở file **DataSeedingRunner.java** và để đây cho tiện theo dõi

```java
// seed data for author
		Author auth0 = Author.builder()
				.name("Nguyen Van Teo")
				.address("Vietnam")
				.build();
		auth0 = authorService.createOne(auth0);
		
		// seed data for book
		Book book0 = Book.builder()
				.title("Book of auth0")
				.verboseCode("00123")
				.author(auth0)
				.build();
		
		bookService.createOne(book0);
```



# Dive into Projection

Nếu bạn muốn xem qua về định nghĩa, tham khảo tại Spring Document tại [ĐÂY](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#projections)

Trong bài viết này mình sẽ đi thẳng vào ví dụ để trực quan hơn, Projection được dùng ở giai đoạn hứng dữ liệu từ Repository JPA trả về nên đầu tiên chúng ta sẽ cần có project Spring Boot sử dụng JPA, Projection không yêu cầu bất cứ dependency nào khác.

## Interface-based Projection

Một trong 2 cách sử dụng Projection, mình hay dùng cách này vì viết code gọn hơn do chỉ cần khai báo interface và các method liên quan.

Okay, khi mình lấy hết book sẽ nhận được giá trị json như sau

```jso
[
    {
        "id": 1,
        "title": "Book of auth0",
        "author": {
            "id": 1,
            "name": "Nguyen Van Teo",
            "address": "Vietnam"
        },
        "verboseCode": "00123"
    }
]
```

Giờ thì requirement 🎯 sẽ như sau: trong **author** chỉ lấy  `id` và bỏ `verboseCode`. Chúng ta sẽ giải quyết bằng interface projection.

Tạo interface **BookSlim.java** (Projection)

```java
public interface BookSlim {
	Long getId();

	String getTitle();

	AuthorWithId getAuthor();

	interface AuthorWithId {
		Long getId();
	}
}
```

> 💥Giải thích cơ chế:
>
> - Method của attribute cần lấy phải khớp với getter method của nó trong entity.
> - Đối với composition complex object (như Author), chúng ta có thể định nghĩa interface cho nó với cách viết method tương tự và nhớ là **mọi method đều phải khớp với getter method trong entity**. 

Tiếp theo, làm sao để viết method trả về **BookSlim** 🤨 như ta biết khi dùng Repository interface phải viết theo chuẩn Dynamic Method hoặc phải có annotaion `@Query`, may thay Dynamic Method có thể dùng như sau

```java
public interface BookRepository extends JpaRepository<Book, Long>{
	<T> List<T> findBy(Class<T> classType); 
}
```

Và cách chúng ta gọi sử dụng

```java
// get without projection
bookRepository.findAll();
// get with projection
bookRepository.findBy(BookSlim.class);
```

> 📝Note: nhờ Generic, chúng ta có thể tạo ra nhiều interface khác nhau mà vẫn áp dụng được cho method `findBy`. Đây được gọi là Dynamic Projection (anh em của Dynamic Method đây mà 😋)

Kết quả:

```json
[
    {
        "id": 1,
        "title": "Book of auth0",
        "author": {
            "id": 1
        }
    }
]
```



Trông ổn phết 👏 Vậy trong trường hợp lấy ra 1 object thôi thì thế nào? Chẳn hạn `findById`. Rất đơn giản như sau

```java
public interface BookRepository extends JpaRepository<Book, Long>{
	<T> List<T> findBy(Class<T> classType);
    
    //findById with Projection
    <T> T findById(Long id, Class<T> type);
}
```

Các bạn tự test xem kết quả cho có hứng thú 😁

### Closed Projections

Cũng là 1 interface projection nhưng có đặc điểm là các method bên trong đều match với các property thuần của entity đó, interface **BookSlim** là 1 closed projection.

### Open Projections

Một số trường hợp ta cần trả thêm thông tin là kết hợp của nhiều trường phức tạp, chẳn hạn cần trả thêm `verId` là kết hợp giữa `verboseCode` và `id`. Chúng ta làm như sau

```java
public interface BookSlimWithVerId {
	Long getId();

	String getTitle();

	@Value("#{target.id.toString() + ' ' + target.title}")
	String getVerId();
}
```

Vì chúng ta đã dùng generic, chỉ việc dùng lại method và thay đổi tham số là được

```java
bookRepository.findBy(BookSlimWithVerId.class);
```

Kết quả:

```java
[
    {
        "id": 1,
        "title": "Book of auth0",
        "verId": "1 00123"
    }
]
```

Theo Doc của Spring, biểu thức trong `@Value` không nên phức tạp, cách khác để thay thế là dùng **default method**  trong interface được giới thiệu ở java 8

```java
default String getVerId() {
	return getId().toString().concat(" ").concat(getVerboseCode());
}
```

## Class-based Projection

Khái niệm này gần với việc chúng ta sử dụng DTO (Data Transfer Object), về chức năng nó không khác Interface Projection ngoại trừ không dùng proxy (vì nó đã trả về object của class rồi) và cũng không dùng được nested projection (AuthorWithId trong BookSlim là 1 nested projection).

Thay vì dùng Interface mình sẽ convert **BookSlim** sang class:

```java
@Value
public class BookSlimDTO {
	Long id;
	String title;
}
```

> Annotation `@Value` là của Lombok với tác dụng generate ra 1 số code tự động, cần thiết nhất là `@AllArgsContructor` để đáp ứng Projection.

Game là dễ 🕹 Nhưng rất tiếc với cách này chúng ta không thể trả về thêm Author bên trong được. Nếu gặp phải hạn chế từ interface projection nhưng class projection cũng không đáp ứng được, bạn biết rồi đấy, đến lúc phải dùng mapper rồi 🤣 

# Summary

Lặn cũng lâu rồi ⏳ chúng ta ngoi lên thôi, vậy là bài viết này đã cung cấp kiến thức cần thiết về Projection, chúc bạn tích lũy thêm kiến thức mới.

# Tham khảo

Spring Projection Documentation : https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#projections 

Source code Github : https://github.com/phatnt99/spring-boot-tutorial/tree/main/projection