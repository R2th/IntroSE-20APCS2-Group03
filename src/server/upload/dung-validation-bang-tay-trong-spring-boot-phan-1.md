Bài hôm nay mình sẽ trình bày một khái niệm cực kì quan trọng với mọi hệ thống backend. Hẳn mọi người đã từng nghe điều này.

> Đừng tin tưởng dữ liệu cho người dùng nhập vào.

Câu trên có thể mở rộng ra phạm vi với các nguồn dữ liệu khác được coi là không tin cậy, gồm database, client,... Trong trường hợp cần nhận data từ các nguồn đó, nhất thiết phải thực hiện **Validation**.

## 1. Validation thế nào?

### 1.1. Giới thiệu về validation

Validation là hành động kiểm tra tính hợp lệ của dữ liệu. Việc này giúp cho hệ thống hoạt động an toàn, đảm bảo, tránh xử lý dữ liệu lỗi,... và cũng giúp ngăn chặn một số cuộc tấn công phổ biến như SQL injection hoặc XSS.

![](https://images.viblo.asia/e8ea0761-ba48-4d58-83fa-921018b7c8dc.jpg)

Ví dụ khi nhập dữ liệu vào form đăng kí, cần thực hiện validate dữ liệu form để đảm bảo:

* Trường username không được trống
* Password phải đủ độ khó
* Email phải đúng định dạng email
* ...

Đấy, tất cả những việc kiểm tra dữ liệu trước xử lý đều được gọi là validation.

### 1.2. Validation ở đâu?

Trong một hệ thống web hoàn chỉnh, có hai phần client side và server side, thì validation cũng có thể thực hiện ở hai nơi tương ứng. Do đó, câu hỏi đặt ra như sau.

> Nên thực hiện validation ở client hay server?

Câu trả lời đúng là nên validate ở cả hai, chúng có lợi ích riêng như:

* Validate ở client thì có thể nhanh chóng thông báo cho user, giúp giảm việc chờ đợi server phản hồi
* Validate ở server cung cấp thêm một lớp nữa để đảm bảo rằng dữ liệu luôn hợp lệ.

Nếu không có validation ở server, thì hacker có thể gửi những request độc hại đến, gây lỗi, sập server,... (không thông qua web, app,... thì không bị dính validate ở client).

### 1.3. Validation thủ công

Từ phần này trở xuống khi mình nói validation thì mặc định nó ở phía server nhé.

Hầu hết các ngôn ngữ cho backend như Java, C#, PHP,... đều có những thư viện, framework khá tiện cho việc validate dữ liệu. Chúng cung cấp cách viết code ngắn gọn và dễ hiểu hơn cho việc validation.

Chỉ những trường hợp nào không thể dùng thư viện để validate được thì mới sử dụng đến code. Ví dụ như đoạn code sau trong Java là thực hiện validation thủ công.

```java
if (username == null || username.isEmpty())
    throw new Exception("Username không được rỗng");
// Một đống if nữa
```

Thay vào đó sao không sử dụng thư viện validation. Code sẽ đơn giản và ngắn gọn hơn nhiều. Project mình từng tham gia có bạn kia dùng validation "nửa vời", chỗ có chỗ không, nên sửa lại cực vô cùng (thậm chí không làm được).

Thêm một ví dụ nữa là validate username phải không tồn tại trong hệ thống. Việc này thì thư viện validation không hỗ trợ, do đó chúng ta phải code tay như sau.

```UserService.java
@Service
public class UserService {
    ...
    // Trong class UserDto có các annotation kiểm tra các field
    // Chỉ khi UserDto hợp lệ thì mới qua được @Valid
    public User createUser(@Valid UserDto userDto) {
        // Check thêm username tồn tại thủ công
        if (userRepository.existsByUsername(userDto.getUsername())
            throw new Exception("Username đã tồn tại");
        ...
    }
}
```

## 2. Validation đúng cách trong Spring Boot

### 2.1. Dependency

Spring Boot có package `spring-boot-starter-validation` dùng cung cấp các validation API dưới dạng annotation để tiện sử dụng. Nếu project dùng Maven, bạn thêm block sau vào file `pom.xml`.

```pom.xml
<dependencies>
    ...
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
        <version>2.4.5</version>
    </dependency>
</dependencies>
```

Các starter package là những package mà gom các thư viện khác lại. Spring Boot dùng các starter package là để đơn giản hóa việc thêm các package cho bạn.

Như trên, package `spring-boot-starter-validation` là tổng hợp của Hibernate validator và vài thư viện khác.

### 2.2. Quy trình validation

Trong Spring Boot, việc validation gồm 2 bước:

* Thêm các annotation ràng buộc trên các field của class nào đó. Mỗi annotation có ý nghĩa riêng, ví dụ `@NotNull`, `@NotEmpty`, `@Email`,...
* Class đó được dùng ở vị trí nào cần đảm bảo hợp lệ, ví dụ truyền cho method làm tham số, mà tham số phải hợp lệ rồi mới thực hiện method, thì thêm `@Valid` hoặc `@Validated` trên tham số (thuộc class đó).

Ở bước 1, ví dụ mình có một class đại diện cho dữ liệu đăng kí tài khoản.

```UserDto.java
@Data
public class UserDto {
    @NotEmpty(message = "Thiếu username")
    private String username;
    
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @NotEmpty(message = "Thiếu password")
    @Min(value = 8, message = "Password phải từ 8 kí tự trở lên")
    private String password;
}
```

Ở bước này chỉ là khai báo nếu class `UserDto` là hợp lệ thì các annotation kia phải thỏa mãn. Việc validate chưa diễn ra.

Tiếp theo bước 2, khi Controller nhận dữ liệu từ client (dạng tham số `userDto`) như sau, thì để đảm bảo dữ liệu trong đó hợp lệ, thì cần thêm `@Valid` như sau.

```UserController.java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/")
    public User createUser(@RequestBody @Valid UserDto userDto) {
        // Khi đã vào được trong đây thì userDto luôn hợp lệ
    }
}
```

### 2.3. Xử lý lỗi khi validation fail

Ở đoạn code ngay phía trên, nếu dữ liệu không hợp lệ, thì method `createUser` sẽ không được gọi. Lúc này là validation đã bị fail.


Spring Boot có hai cách để xử lý việc này:

* Dùng thêm 1 tham số cuối cùng là `BindingResult`. Nếu validation fail, method vẫn sẽ được gọi vào, và chúng ta có thể check tham số `BindingResult` kia có chứa lỗi hay không, từ đó xử lý phù hợp.
* Nếu không, chương trình ném ra lỗi `BindException`. Chúng ta chỉ cần bắt lỗi lại với `@ExceptionHandler` (ở bài trước) và xử lý phù hợp.

Lúc đầu mình chưa biết nên dùng mỗi cách 1. Sau này đổi qua ưu tiên dùng cách 2 hơn, do nó gọn và chỉ viết một lần xử lý.

Và đây là code của cả hai cách nhé, mình sẽ không trình bày sâu vì nhìn code là hiểu liền.

Cách 1.

```UserController.java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/")
    public User createUser(
            @RequestBody @Valid UserDto userDto,
            BindingResult bindingResult) {  // Thêm tham số này
        // Khi có BindingResult thì lỗi được tạm bỏ qua để xử lý thủ công
        // Nếu có lỗi thì chặn lại
        if (bindingResult.hasErrors())
            throw new Exception("...");
        ...
    }
    
    // Các method khác cũng xử lý tương tự
}
```

Cách 2.

```GlobalExceptionHandler.java
@ExceptionHandler(BindException.class)
@ResponseStatus(HttpStatus.BAD_REQUEST)  // Nếu validate fail thì trả về 400
public String handleBindException(BindException e) {
    // Trả về message của lỗi đầu tiên
    String errorMessage = "Request không hợp lệ";
    if (e.getBindingResult().hasErrors())
        e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
    return errorMessage;
}
```

---

Bài viết của mình tới đây là hết rồi. Phải nói là chủ đề validation này khá là hay để tìm hiểu, và nó cũng không kém phần phức tạp nên mình mới chia ra nhiều phần thế này. Hãy cùng đón chờ phần 2 nhé, mình sẽ đi sâu hơn vào các khái niệm validation profile, khá hay và hữu ích nhé.

Và nếu bài viết hữu ích, ngại gì mà không cho tớ một clip và upvote trong đợt May Fest này nhỉ. Thank you :heart: