Chào mọi người, mình tiếp tục series Spring Boot cơ bản đây. Trong bài viết này mình sẽ giới thiệu cách Spring Boot xử lý exception nhé.

## 1. Exception trong Spring Boot

Khi học Java cơ bản, hẳn bạn đã nghe nói về exception, và không chỉ có Java, hầu như mọi ngôn ngữ đều có khái niệm này.

Exception cơ bản là đối tượng đại diện cho một lỗi xảy ra khi chạy chương trình. Lỗi này có thể do tác động bên ngoài hoặc chính trong code ném ra. Nhiệm vụ của chúng ta là phải "bắt" và "xử lý" chúng một cách thích hợp (đưa ra thông báo lỗi,...). Nếu exception không được xử lý, nó có thể làm chương trình bị dừng.

Cách bắt exception phổ biến là dùng try catch.

```java
try {
    // Do something
} catch (Exception e) {
    // Xử lý lỗi
}
```

Với Spring Boot, nếu dùng try catch như trên cho mọi nơi có exception, thì thực sự không hay. Trong project mình join trước đây, thì coder trước đã thực hiện dùng try catch để bắt exception, và mình đã vừa refactor lại vừa chửi :scream:

```UserController.java
@RestController
public class UserController {
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginDto loginDto) {
        log.info("Begin login");
        try {
            // Thực hiện login
        } finally {
            log.info("Done");
        }
    }
}
```

Như vậy thì phải làm sao mới đúng đây?

## 2. `@ControllerAdvice` và `@ExceptionHandler`

### 2.1. Aspect Oriented Programming (AOP)

Spring có sử dụng Aspect Oriented Programming (AOP), nhờ đó chúng ta mới có được một cách xử lý exception tuyệt vời. Vừa dễ hiểu, code gọn hơn mà lại còn gom lại một chỗ nữa.

AOP là gì thì các bạn chưa cần biết, trong trường hợp này chỉ cần hiểu là AOP nó sẽ có thể ngắt ngang một method để thực hiện method khác, trong điều kiện gì đó.

Ví dụ, khi đang thực hiện method trong Service mà có lỗi (điều kiện đúng), thì dừng thực hiện và chuyển tiếp sang method xử lý lỗi. Như vậy, có thể nói method xử lý lỗi đã được "chèn" vào từng method của service, điều kiện ngắt là có exception xảy ra.

![](https://images.viblo.asia/bd61ee99-ef99-488b-b91a-03d82ab150e5.png)

Như trong hình, các bạn để ý icon @ màu hồng ở lề trái. Đó là dấu hiệu có một aspect sẽ chèn vào ngay vị trí đó (trong hình là aspect dùng để logging lại các API controller được gọi).

### 2.2. `@ControllerAdvice` và `@ExceptionHandler`

Spring Boot sử dụng hai annotation `@ControllerAdvice` và `@ExceptionHandler` bên trong để thực hiện bắt mọi exception xuất hiện trong ứng dụng.

Thường thì class controller để bắt exception và các class exception khác được đặt trong thư mục `exception/`.

```GlobalExceptionHandler.java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({ ExceptionA.class, ExceptionB.class })  // Có thể bắt nhiều loại exception
    public ResponseEntity<String> handleExceptionA(Exception e) {
        return ResponseEntity.status(432).body(e.getMessage());
    }
    
    // Có thêm các @ExceptionHandler khác...
    
    // Nên bắt cả Exception.class
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleUnwantedException(Exception e) {
        // Log lỗi ra và ẩn đi message thực sự (xem phần 3.2)
        e.printStackTrace();  // Thực tế người ta dùng logger
        return ResponseEntity.status(500).body("Unknow error");
    }
}
```

Nếu có exception ở bất cứ đâu, sẽ được chuyển tới method có `@ExceptionHandler` tương ứng. Thứ tự đặt chúng không quan trọng, Spring sẽ tự động tìm cái phù hợp nhất, nếu không có thì chuyển dần lên các exception class cha (do đó, nên có một `@ExceptionHandler` để bắt Exception class, dành cho các exception còn lại).

Các method này viết tương ứng với method của Controller, nhưng thay vì trả data về thì chúng ta trả về message lỗi.

## 3. Vài mẹo khi xử lý exception

### 3.1. Tạo các exception class tùy chỉnh

Mặc dù Spring Boot có các class exception có sẵn như `IllegalAccessException`,... chúng ta vẫn nên tạo cac class exception của riêng mình. Điều này giúp ta phân biệt giữa:

* **System exception:** Do hệ thống, các framework, thư viện ném ra
* **Custom exception:** Do code mình viết ném ra khi có gì đó "sai sai". Ví dụ user không tồn tại, request quá nhiều,...

```AppException.java
@Getter
@AllArgsConstructor
public class AppException extends RuntimeException {
    private int code;
    private String message;
}
```

Và thực hiện ném Exception đó trong ngữ cảnh thích hợp.

```UserService.java
public class UserService {
    ...
    public User getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new AppException(404, "User not found");
        ...
    }
}
```

Trên đây là ví dụ về custom exception tên `AppException`. Nó chỉ dùng cho mục đích thông báo hoàn cảnh không đúng, không cần fix nó. Và tất nhiên, để Spring Boot xử lý được nó thì cũng phải dùng `@ExceptionHandler` như trên.

### 3.2. Che giấu lỗi hệ thống

Nguyên tắc quan trọng khi xử lý exception phía backend là:

> Không bao giờ được trả về chi tiết lỗi (error details) cho client.

Do đó, dễ thấy được lợi ích của việc chia hai loại exception ở phần trên:

* **Với system exception:** cần ẩn message đi, không return về cho client (mà return về một message khác)
* **Với custom exception:** do viết code ném ra, nên message có thể return về cho client được.

Ngoài ra, với system exception cần thực hiện log ra đâu đó, để biết và sửa lỗi. Ví dụ log ra console, hoặc ra file, để nhanh chóng phát hiện và xử lý.

---

Vậy là bài viết tới đây là hết rồi. Trong dịp [May Fest](https://mayfest.viblo.asia/) này của Viblo mình sẽ cố gắng viết nhiều bài hơn nữa. Nhớ upvote và clip bài viết của mình nhé các bạn. Mãi iu :heart: