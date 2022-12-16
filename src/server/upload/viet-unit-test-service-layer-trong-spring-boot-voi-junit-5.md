Hello friend!

Là dev, đặc biệt là web dev, bạn đã quá quen với một vòng lặp như sau: tạo model, tạo service, tạo controller và liên kết chúng với nhau để cho ra 1 API hoàn chỉnh, đây đúng là quy trình mà mình đã áp dụng trong suốt những năm đại học 😆 nhưng hình như thiếu cái gì đó thì phải, à đúng rồi còn thiếu mấy cái tick xanh thần thánh của unit test nữa, có tick xanh thì mới an tâm code được 🤗 Bài viết này sẽ hướng dẫn các bạn cách viết unit test cho service layer trong Spring Boot để nhanh chóng có tick xanh nhất, nào let's go!

# Chuẩn bị Project

Đầu tiên chúng ta cần có Project để áp dụng unit test, ở đây mình đã tạo sẵn 1 project demo, các bạn có thể áp dụng ngay trên project hiện tại của mình hoặc tải [project Demo](https://github.com/phatnt99/spring-boot-tutorial/tree/main/unit-test).

## Dependency

Với Spring Boot, để viết unit test chúng ta chỉ cần dependency **spring-boot-starter-test** (khi bạn tạo project bằng Initializr và chọn dependency Web mặc định sẽ kèm theo)

```xml
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
</dependency>
```

Hãy kiểm tra file **pom.xml** nếu chưa có bạn có thể add tay vào nha.

Ngoài ra, trong project Demo có sử dụng **lombok**, nếu sử dụng bạn đảm bảo IDE đã config cho lombok rồi nhé.

# Viết Unit test

Mục tiêu của bài viết là unit test cho service layer trong Spring Boot, đầu tiên chúng ta tạo file **BookServiceTest** ở `src/test/java/service` như sau:

```java
@ExtendWith(MockitoExtension.class)
public class BookServiceTest {

}
```

Ngoài việc nó là 1 class rỗng 😁 thì các bạn có thể thấy annotation `@ExtendWith`, có thể bạn sẽ thắc mắc hay thấy tut trên mạng dùng `@RunWith` thì mình xin dẫn trích câu trả lời như sau:

> If you are using JUnit 4, don’t forget to also add `@RunWith(SpringRunner.class)` to your test, otherwise the annotations will be ignored. If you are using JUnit 5, there’s no need to add the equivalent `@ExtendWith(SpringExtension.class)` as `@SpringBootTest` and the other `@…Test` annotations are already annotated with it.
>
> Source: https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing 

## Autowired Service

Để sử dụng được service class, cách hay dùng là wire interface vào, nhưng đối với class khai báo ở trên autowired sẽ không hoạt động, vì khi chạy test chúng ta không chạy toàn bộ Spring Boot do đó không dùng được Bean nào cả, nhờ annotation `@Mock` của Mockito ta có thể tạo ra 1 mock object ngay trong class test

```java
@Mock
BookService bookService;
```

Thêm 1 vấn đề nữa, trong class BookService có wire BookRepository và như đã đề cập nó sẽ không hoạt động, một lần nữa sử dụng annotation `@InjectMock` của Mockito để giải quyết như sau

```java
@Mock
BookRepository BookRepository;
	
@InjectMocks
BookServiceImpl bookService;
```

> 📝Note: dùng `@InjectMocks` cho interface sẽ không hoạt động, thay vì BookService Interface thì mình dùng BookServiceImpl class.

Bạn có thể nhận ra vấn đề này, nếu ta mock Repository thì thao tác với database sẽ như thế nào? và do implement của Repository được quản lí bởi Jpa thì các method bên trong sẽ hoạt động đúng chứ ⁉ Trả lời là nó sẽ không hoạt động như 1 Repository thật sự, vì chúng ta đang test service layer nên không cần quan tâm persistence layer hoạt động như thế nào, tiếp theo chúng ta sẽ khắc phục việc dùng Repository

## Viết method test

Cơ bản 1 method unit test thường sẽ trải qua 4 giai đoạn sau:

1. Tạo mock data
2. Định nghĩa hành vi
3. Gọi method
4. Kiểm tra kết quả

Đây là test case kiểm tra hàm `getAll` của service:

```java
@Test
void whenGetAll_shouldReturnList() {
	// 1. create mock data
	List<Book> mockBooks = new ArrayList<>();
	for(int i = 0; i < 5; i++) {
		mockBooks.add(new Book((long)i));
	}
		
	// 2. define behavior of Repository
	when(bookRepository.findAll()).thenReturn(mockBooks);
		
	// 3. call service method
	List<Book> actualBooks = bookService.getAll();
		
	// 4. assert the result
	assertThat(actualBooks.size()).isEqualTo(mockBooks.size());
		
	// 4.1 ensure repository is called
	verify(bookRepository).findAll();
}
```

Mình cũng đã comment khá dễ hiểu ở trên, mình giải thích thêm 1 tí như sau

📝 Ở bước 2, đây là cách mình giải quyết vấn đề hoạt động của Repository. Đọc code khá tường minh, chúng ta định nghĩa bất cứ khi nào gọi đến hàm `findAll` cũng sẽ trả về List đã khai báo ở bước 1 nhờ vậy mà hàm `getAll` của service (bên trong hàm thực chất gọi repository.findAll()) có thể hoạt động mà không throw bất cứ lỗi nào 👏

📝 Ở bước 4, mình dùng hàm `verify` để xác thực `findAll` của bookRepository có được gọi hay không vì khi gọi `getAll` của service chắc chắc sẽ gọi đến nó. Bạn có thể tìm hiểu thêm về hàm ở [Mockito](https://site.mockito.org/).

Tiếp theo là 1 test case rất phổ biến, kiểm tra xem có throw exception đúng hay không, cùng xem test case dưới đây:

```java
@Test
void whenGetInvalidOne_shouldThrowException() {
	Long invalidBookId = 7L;
		
	when(bookRepository.findById(any(Long.class))).thenReturn(Optional.ofNullable(null));
		
	assertThatThrownBy(() -> bookService.getOne(invalidBookId))
	.isInstanceOf(BookNotFoundException.class);
		
	verify(bookRepository).findById(any(Long.class));
}
```

Để đảm bảo không phát sinh lỗi khi sử dụng hàm `verify` mình dùng static method `any` với ý tưởng chấp nhận bất cứ tham số nào thuộc class Long.

# Summary

Nếu để ý bạn sẽ thấy có 2 cách dùng annotation `@ExtendWith` là **SpringExtension.class** và **MockitoExtension.class**, sự khác biệt có liên quan đến Spring, khi dùng SpringExtension bạn có thể dùng annotation `@MockBean` và 1 số annotaion khác (mà Spring quản lí) , trong demo mình chỉ dùng Mockito nên không cần bê hết cả những thứ liên quan đến Spring vào.

Bài viết đã giới thiệu cho bạn cách viết unit test (junit version 5)  đơn giản nhất, source code hoàn chỉnh bạn có thể tham khảo [ở đây](https://github.com/phatnt99/spring-boot-tutorial/tree/main/unit-test).

Không quên show bạn xem tíck xanh thần thánh ✔

![phatng-blog2-img1](https://res.cloudinary.com/dcrhhc6qr/image/upload/v1626863656/blog-2_w6dpts.png)

Happy coding 👨‍💻