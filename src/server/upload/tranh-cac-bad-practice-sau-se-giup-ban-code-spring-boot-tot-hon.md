Đã một thời gian khá dài mình không viết bài trên Viblo. Chả là thời gian đó mình khá bận với công việc, cộng thêm việc càng học nhiều, càng làm nhiều càng thấy ngu ra 😂 nên cũng ngại viết. Nay nhân dịp năm mới, sắp tới cũng rảnh rỗi nên mình quyết định bắt đầu lại với series Spring Boot.

Bước đầu sẽ là edit lại dần dần các bài viết cũ (vì mình cảm thấy chưa ưng lắm), ngoài ra còn viết thêm các bài linh tinh, ngoài lề khác (như bài này). Dự kiến sẽ xong trước Tết để bắt đầu viết các bài mới luôn.

Vậy thôi, hãy quay lại chủ đề của bài hôm nay. Mình sẽ chỉ ra một vài đoạn code mà-mình-cho-là bad practice trong Spring Boot. Đây là ý kiến cá nhân thôi nhé, có gì vui lòng xuống phần comment rồi hẵng gạch đá. Okay bắt đầu thôi.

## 1. Dùng `try catch finally` để logging

Lúc mới code Spring Boot, mình đã gặp một dự án code như thế này. Cụ thể, trong các method trong controller luôn dùng `try catch finally` để thực hiện việc bắt lỗi và logging (ghi nhật kí).

```java
@PostMapping("/users")
public UserModel createUser(@RequestBody UserDto dto) {
    log.info("Create user start");
    try {
        userService.createUser(dto);
        ...
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        log.info("Create user done");
    }
}
```


Code như vậy sẽ gây ra 2 vấn đề. Thứ nhất làm code dài dòng, API nào cũng phải `try catch finally` thế này không hay. Thứ hai, làm cho `@ExceptionHandler` không còn ý nghĩa (do được xử lý bởi `try catch` rồi).

Giải pháp cho trường hợp này:

* Dùng Spring AOP để inject đoạn code logging vào trước và sau mỗi Controller method
* Loại bỏ `try catch finally`, để việc xử lý exception cho `@ExceptionHandler`

## 2. Luôn dùng `ResponseEntity<T>`

Lại một vấn đề nữa liên quan tới Controller method. Đây là việc lạm dụng class `ResponseEntity<T>` làm kiểu trả về trong Controller method quá mức (đi đâu cũng thấy luôn).

```java
@PostMapping("/users")
public ResponseEntity<UserModel> createUser(@RequestBody UserDto dto) {
    // Thêm đoạn này còn tệ hơn nữa
    if (dto == null)
        return ResponseEntity.badRequest().body("Error");
    else
        return ResponseEntity.ok(userService.createUser(dto));
}
```

Vấn đề ở đây là khả năng vi phạm nguyên tắc Single Responsibility (chữ S trong SOLID). Có 2 trường hợp.

Thứ nhất, nếu dùng như trên đoạn code thì sẽ vi phạm Single Responsibility. Do controller method vừa xử lý trường hợp 200, vừa xử lý trường hợp lỗi 400, rõ ràng là đang làm 2 việc khác nhau. Controller method nên chỉ tập trung vào nhiệm vụ chính, nghĩa là trường hợp thành công 200. Các trường hợp lỗi thì ném exception cho `@ExceptionHandler` xử lý.

Trường hợp 2, nếu chỉ dùng method `ok()` thì dùng `ResponseEntity<T>` làm gì. Chúng ta hoàn toàn có thể đơn giản nó đi như sau. Nếu bạn muốn trả về status code khác 200, chỉ cần thêm `@ResponseStatus`.

```java
@PostMapping("/users")
@ResponseStatus(HttpStatus.CREATED) // 201
public UserModel createUser(@RequestBody UserDto dto) {
    return userService.createUser(dto);
}
```

Vài dự án gần đây của mình có tới 90% API không cần dùng tới `ResponseEntity<T>`. Trừ những lúc cần thiết như tùy chỉnh headers hoặc các thứ phức tạp khác, thì mới cần dùng đến nó.

## 3. Sử dụng các Exception class có sẵn

Thực ra lí do mình gọi phần này là bad practice đơn giản vì nó trái ngược với best practice trong Spring Boot 😂 Thông thường, trong một app sẽ chia ra 2 loại exception:

* Technical exception: về mặt kĩ thuật, do code gây ra nên cần fix hoặc có biện pháp xử lý.
* Business exception: về mặt logic nghiệp vụ, do điều gì đó không đúng, không hợp lệ khi xử lý business logic. Thường sẽ đưa ra thông báo yêu cầu user điều chỉnh và thử lại.

Cách implement 2 loại exception trên trong Spring Boot mình sẽ không bàn tới, nó thuộc chủ đề riêng rồi. Nhưng ở đây, quan trọng là chúng ta phải tách biệt được 2 loại exception trên.

Mình từng thấy có dự án code ném ra exception như thế này.

```java
public UserModel createUser(UserDto dto) {
    if (dto.getAge() < 18)
        throw new IllegalStateException("18+ only");
    ...
}
```

Rõ ràng trường hợp tuổi dưới 18 thì báo lỗi thuộc về mặt logic ứng dụng, thế mà lại dùng class `IllegalStateException`. Class này thuộc về technical, cần phải được fix nếu thấy bị ném ra. Bản thân Java và các thư viện khác cũng ném ra exception này, nên sẽ khó phân biệt được.

Vậy tại sao lại cần phân biệt chúng? Thực ra không phân biệt cũng chả hại gì, nhưng tốt hơn là nên phân biệt ra. Lấy ví dụ đơn giản là khi dùng với logging để log bug ra console:

* Business exception không cần log ra làm gì (vì sao thì tự ngẫm nhé)
* Technical exception phải log ra để dễ dàng đọc được và debug

Nếu cả 2 loại này dùng chung `IllegalStateException` class, thì bạn sẽ xử lý làm sao trong tình huống này? Vậy nên tốt nhất là tách ra, ít ra phải thêm một class `BusinessException`, rồi khi dùng `@ExceptionHandler` thì xử lý riêng cho 2 class sẽ hợp lí hơn.

## 4. Mỗi service class có một interface

Thực ra practice này mình bonus thêm theo ý kiến cá nhân thôi, cũng không hẳn là xấu. Tuy nhiên đôi lúc mình thấy mọi người sử dụng nó chưa phù hợp. Ví dụ như sau, mình code viết chung vậy thôi chứ thật ra tách làm 2 file.

```java
interface UserService {
    UserModel createUser(UserDto dto);
}

@Service
class UserServiceImpl implements UserService {
    @Override
    public UserModel createUser(UserDto dto) {
        ...
    }
}
```

Và mỗi `@Service` class đều có một interface tương ứng. Khi inject vào thì dùng interface đó. Và câu hỏi đặt ra là có nên dùng interface như trên không, hay dùng trực tiếp luôn Service class.

Mình có google thử và thấy trên mạng cũng đang tranh cãi vụ này. Bên ủng hộ cho là làm vậy sẽ đạt được DI principle (quên là không được đâu), giúp dễ mock khi unit test hơn, dễ mở rộng với dự án lớn. Bên phản đối thì bảo DIP không có ý nghĩa, khi chỉ có 1 implementation class (ý này mình thấy đúng, do hầu hết dự án mình gặp chưa bao giờ có quá 2 class implement),...

Chung quy lại, mình thấy luận điểm dùng interface vì giúp unit test dễ mock hơn là đúng nhất. Cơ mà mọi dự án mình gặp đều code theo kiểu này cả. Lúc nào cũng thấy mỗi service phải có 1 interface đi kèm. Kể cả dự án bé xíu xiu, chả có unit test gì sất. Có cảm giác các bạn code ra chỉ làm theo một cách cứng nhắc, mà không hiểu vì sao phải làm thế. Đó là cái mình không thích.

Hiệu quả thì chưa thấy đâu, nhưng khi code mệt kinh khủng. Ctrl+click thì IDE nhảy vào interface, phải click thêm lần nữa mới vô implementation. Còn chưa kể việc mở thêm 1 tab chẳng để làm gì, và số lượng file Service được nhân đôi 😱

---

Những bad practice như trên còn khá nhiều nữa, ví dụ như Base Service, `@RequestMapping`, vẫn dùng `HttpServletRequest`,... nhưng mình không viết ra đây. Có thể sau này mình sẽ viết thành một bài riêng không biết chừng.

Okay vậy thôi nhé, bài mở đầu năm mới mình nghĩ nhiêu đây là đủ rồi nhỉ. Cảm ơn và tiếp tục ủng hộ mình nhé.