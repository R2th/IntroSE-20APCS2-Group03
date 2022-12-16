Hello, mình đã comeback đây. Trước giờ mình hay viết bài về Java và Spring Boot, nay có chủ đề này hay quá nên đá qua JPA một tí. Còn series Spring Boot mình sẽ cố ra nhiều bài hơn, cũng update thêm vài thứ nữa.

Ok quay trở lại chủ đề chính của bài viết. Thực sự mình làm Spring Boot hơn năm rồi, dùng JPA cũng nhiều mà mãi gần đây mới biết đến Proxy entity. Theo mình đây là chủ đề khá hay, nhưng chưa thấy web hay tutorial nào nói tới. Tìm trên google với đúng từ khóa thì ra được vài bài trên [Baedung](https://www.baeldung.com/hibernate-proxy-to-real-entity-object), [Vladmihalcea](https://vladmihalcea.com/how-does-a-jpa-proxy-work-and-how-to-unproxy-it-with-hibernate/) (ông này trùm Hibernate và các thứ liên quan đến database trong Java) với [Techmaster](https://techmaster.vn/posts/36294/su-khac-biet-giua-getone-va-findbyid-trong-spring-data-jpa).

Phần mở đầu vậy thôi, hãy tiếp tục với bài viết về Proxy entity trong JPA nhé.

# 1. Đặt vấn đề

## 1.1. Vấn đề select khi insert

Ví dụ bạn có 2 entity Book và Category (ví dụ kinh điển 😄), một Category có nhiều Book, là mối quan hệ 1-N. Câu chuyện ở đây là khi bạn muốn insert một Book mới vào, bạn sẽ làm như thế nào?

Đúng ra mình sẽ liệt kê danh sách các bước ở đây. Cơ mà lười quá, mình để code ở đây các bạn xem luôn cho lẹ.

```java
@Override
@Transactional
public Book createBook(BookDto dto) {
    var category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new ApiException(ErrorCode.CATEGORY_NOT_FOUND));
    var book = new Book();
    book.setName(dto.getName()); // and others
    book.setCategory(category);
    return bookRepository.save(book);
}
```

Khi mình mới bắt đầu code Spring Boot cho tới mãi vài tháng trước, mình đã code theo cách này. Thực sự cũng không có gì xấu, cũng rõ ràng, tường minh, dễ hiểu. Vấn đề duy nhất ở đây là lệnh đầu tiên lấy ra Category entity, nó không cần thiết và cũng làm ảnh hưởng performance.

Nếu bạn bật `show-sql: true` lên, bạn sẽ thấy Hibernate log ra 2 câu SQL, một select Category, một insert Book.

![image.png](https://images.viblo.asia/e4837cf3-c5e9-4fd1-9e9f-1f26d7a2d811.png)

## 1.2. Cách xử lí tạm thời

Thực ra cách thì có đó, cũng không quá phức tạp. Đó là dùng custom query để insert book bằng câu native query.

```java
public interface BookRepository {
    @Query(value = """
            insert into books(name)
            values (:name)""", nativeQuery = true)
    @Modifying
    @Transactional
    void insertBook(String name);
}
```

Kết quả chỉ có một lệnh SQL insert được chạy, khá tốt đó chứ.

![image.png](https://images.viblo.asia/e7d371b7-d079-4d6c-bbaa-f70dbc41f6d2.png)

Nếu số lượng thuộc tính nhiều lên, có thể dùng syntax sau để gom các param lại.

https://stackoverflow.com/a/61200701/13779659

Cơ mà mình không prefer cách này lắm, dễ bug nếu không cấu hình đúng. Như mình khi demo project cũng bị gặp bug này. Phải đổi auto increment strategy của `Book.id` lại thành IDENTITY mới fix được.

https://stackoverflow.com/a/54697387/13779659

![image.png](https://images.viblo.asia/223c0343-1f86-4f32-96f0-f149b9da44d8.png)

# 2. Tìm hiểu proxy entity

### 3.1. Proxy entity là gì?

Proxy entity có cấu trúc tương tự entity bình thường, nhưng chỉ có khóa chính là được khởi tạo (trong ví dụ là field `id`). Các field khác đều chưa được đặt giá trị (khi cần sẽ fetch thêm). Do đó, khi lấy ra proxy entity không yêu cầu chạy câu SQL nào cả.

Proxy entity sẽ hữu ích trong trường hợp không cần fetch dữ liệu của entity, ví dụ như trường hợp nối bảng ở đầu bài. Với các hành động khác, như update, delete thì proxy entity không khác gì entity bình thường cả (đều sinh ra thêm câu SQL select).

https://www.baeldung.com/jpa-entity-manager-get-reference

### 3.2. Cách lấy ra proxy entity?

Trong Hibernate, dùng `EntityManager.getReference()` để lấy ra proxy entity. JPA thì đơn giản hơn, được tích hợp vào method `JpaRepository.getById()`. Chỉ cần truyền id vào thì sẽ nhận lại một proxy entity tương ứng.

```java
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // ...
}
// ...
var categoryProxy = categoryRepository.getById(1L); // do id là Long
```

Cần lưu ý với JPA chỉ lấy được proxy entity bằng method `getById()`. Còn các cách khác đều không cho ra proxy entity, luôn sinh ra câu SQL.

```java
// Cách nào cũng không được
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> getById(Long id); // Override trả về Optional<T>
    
    Category getCategoryById(Long id); // Sửa đổi method name
    
    Category getByName(String name); // Get thông qua field khác
    
    // ...
}
```

### 3.1. Áp dụng giải quyết vấn đề

Đọc đến đây các bạn đã hiểu được phần nào về proxy entity rồi. Và cũng không khó để mường tượng ra được cách áp dụng proxy entity để giải quyết vấn đề ở đầu bài.

> Thay vì lấy ra cả một entity Category, thì chỉ cần lấy ra proxy entity là được.
>
> Proxy entity sẽ được dùng làm khóa ngoại `category_id` khi insert Book.

```java
var categoryProxy = categoryRepository.getById(dto.getCategoryId());
// ...
book.setCategory(categoryProxy);
// ...
```

Và lấy ra proxy entity sẽ không sinh ra câu SQL, nên không còn lệnh select dư thừa nữa (hiệu suất cũng được cải thiện).

# 3. Hạn chế của proxy entity

Hạn chế lớn nhất của proxy entity là bạn sẽ không biết được entity lấy ra có tồn tại hay không. Mọi field của proxy entity lấy ra được đều null, cả khi entity tồn tại hay không tồn tại trong database.

Theo trên [Javadoc](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html#getById-ID-) thì method này có thể ném `EntityNotFoundException`, cơ mà hành vi này phụ thuộc vào provider cụ thể. Cá nhân mình dùng method này mà chả thấy nó ném exception gì cả, nên cũng khó xác định được có tồn tại record hay không.

![image.png](https://images.viblo.asia/b093cfa5-0259-4421-9391-fe7e4551bd59.png)

Do đó, phải dùng thêm method kiểm tra id tồn tại trước, rồi mới lấy ra proxy entity để dùng. Cơ mà tính ra thì vẫn tối ưu hơn cách làm cũ, một câu select count chắc chắn nhanh hơn select cả một entity phải không.

```java
@Override
@Transactional
public Book createBook(BookDto dto) {
    if (!categoryRepository.existsById(dto.getCategoryId())) {
        throw new ApiException(ErrorCode.CATEGORY_NOT_FOUND);
    }
    var categoryProxy = categoryRepository.getById(dto.getCategoryId());
    var book = new Book();
    book.setName(dto.getName()); // and others
    book.setCategory(categoryProxy);
    return bookRepository.save(book);
}
```

Đoạn code hoàn chỉnh mình để ở đây nhé.

---

Bài viết hôm nay tới đây thôi. Hi vọng các bạn đã hiểu được thêm về proxy entity và tránh được sai lầm nêu ra trong bài (nếu có bị rồi thì cũng giúp bạn biết cách khắc phục). Nếu thấy bài hay, hữu ích đừng ngại vote và share nhiều vào nhé nhé. Thanks 😍