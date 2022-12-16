Bài hôm nay sẽ là cách sử dụng thư viện ModelMapper để mapping qua lại giữa các object trong Spring nhé. Trang chủ của ModelMapper đây http://modelmapper.org/, đọc rất dễ hiểu dành cho các bạn muốn tìm hiểu sâu hơn

## 1. Giới thiệu ModelMapper

### 1.1. ModelMapper là gì?

ModelMapper là một thư viện Java, giúp đơn giản hóa code mapping các object. Mapping có thể hiểu là việc convert qua lại giữa hai object có cấu trúc gần giống nhau. Trong Spring Boot có các dạng khác nhau của data, nhưng cấu trúc gần tương tự nhau, nên cũng dùng được thư viện này với chúng. Ví dụ map giữa entity và model, entity và DTO,...

![](https://images.viblo.asia/352abb4f-c013-403d-abae-b4e5acc339a8.png)

Ví dụ mình có hai class `User` (entity) và `UserDto` khá giống nhau, nhưng `UserDto` không có trường `password` như sau.

```java
@Getter
@Setter
class User {
    private String username;
    private String password;
    private String displayName;
    private int age;
}

@Getter
@Setter
class UserDto {
    private String username;
    private String displayName;
    private int age;
}
```

Dùng thư viện ModelMapper, chỉ cần vài dòng code ngắn gọn như sau.

```java
// Object nguồn
User user = new User("john", "123456", "Nguyễn Văn John", 20);

// Tạo mapper object
ModelMapper mapper = new ModelMapper();

// Map thành object đích
UserDto userDto = mapper.map(user, UserDto.class);
```

Trước đây, nếu không dùng model mapper thì bạn phải thực hiện copy từng field giữa hai class. Cách đó rất dài dòng và không cần thiết, tuy vậy tốc độ lại nhanh nhất. Nên cũng cần cân nhắc thêm việc có nên dùng ModelMapper hay không.

## 2. Cách sử dụng

### 2.1. Thêm vào project

Thêm ModelMapper vào project Spring Boot tương tự các dependency khác. Nếu project sử dụng Maven, chỉ cần thêm phần này vào file `pom.xml`

```pom.xml
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>2.3.0</version>
</dependency>
```

Trong Gradle thì như sau.

```build.gradle
compile 'org.modelmapper:modelmapper:2.3.0'
```

Hoặc bạn có thể tải xuống JAR tại đây http://modelmapper.org/downloads/.

### 2.2. Tạo instance và sử dụng

Trên homepage của ModelMapper không có hướng dẫn chi tiết nên tổ chức trong source code như thế nào. Chỉ nói đơn giản là phải tạo một object của ModelMapper trước. Mọi thao tác đều sử dụng object này, nên lý tưởng là chúng ta sẽ tạo một bean cho nó luôn.

Mình tạo một file cấu hình `ModelMapperConfig.java` như sau.

```ModelMapperConfig.java
@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        // Tạo object và cấu hình
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    }
}
```

Code trên sử dụng `@Configuration` và `@Bean` để định nghĩa bean. Các bạn có thể xem lại bài viết này để hiểu hơn [Vòng đời, các loại bean và cơ chế component scan](https://viblo.asia/p/vong-doi-cac-loai-bean-va-co-che-component-scan-L4x5x6BrZBM).

Sau đó, lúc nào cần thì lấy bean ModelMapper ra dùng thôi.

```UserService.java
@Service
public class UserService {
    // Có thể inject bằng cách khác, mình viết như thế này cho gọn
    @Autowired
    private final ModelMapper mapper;

    public UserDto getUser(String username) {
        // Lấy User entity ra từ DB
        User user = userRepository.findByUsername(username);

        // Map thành DTO
        UserDto userDto = mapper.map(user, UserDto.class);
        
        return userDto;
    }
}
```


## 3. Vài điều cần lưu ý

### 3.1. Các mức độ mapping

Còn gọi là Matching strategy, chi tiết tại đây http://modelmapper.org/user-manual/configuration/#matching-strategies. Tóm lại, có 3 loại mapping, mỗi loại có một hằng số biểu diễn (để set config):

* Chiến lược map chuẩn: `MatchingStrategies.STANDARD`
* Chiến lược map lỏng lẻo: `MatchingStrategies.LOOSE`
* Chiến lược map chặt chẽ: `MatchingStrategies.STRICT`

Phần so sánh này khá khó nói, nên mình viết ra đây vài ví dụ nhé.

**Tiêu chí 1:** Thứ tự các từ trong tên thuộc tính:

* Standard: không quan tâm thứ tự
* Loose: không quan tâm thứ tự
* Strict: Thứ tự từ phải đúng

**Tiêu chí 2:** Thuộc tính nguồn (source property):

* Standard: mọi từ trong tên thuộc tính nguồn phải tồn tại trong tên thuộc tính đích.
* Loose: từ cuối cùng phải có trong tên thuọc tính đích
* Strict: mọi từ trong thuộc tính nguồn phải khớp với toàn bộ từ

**Tiêu chí 3:** Thuộc tính đích (destination property):

* Standard: mọi từ của thuộc tính đích phải khớp hết
* Loose: chỉ cần từ cuối trong thuộc tính đích khớp là được
* Strict: mọi từ trong thuộc tính đích phải khớp hết
Để cấu hình, dùng method `ModelMapper.getConfiguration().setMatchingStrategy()` như code bên dưới.

Mình khuyến khích các bạn dùng **Standard** hoặc **Strict**. Trong trường hợp bất khả kháng mới dùng **Loose**. Nói chung tìm hiểu cái này hơi bị nhức đầu, nên mình chỉ nói sơ vậy thôi.


### 3.2. Tùy chỉnh cấu hình map

Cấu hình mapping có thể được điều chỉnh bằng cách set các thuộc tính của `ModelMapper.getConfiguration()`.

```java
ModelMapper modelMapper = new ModelMapper();
modelMapper.getConfiguration()
    .setMatchingStrategy(MatchingStrategies.STRICT);
    // Còn các thuộc tính khác nữa
```

Vài thuộc tính cấu hình căn bản như sau:

* `setSkipNullEnabled()` có cho phép bỏ qua thuộc tính null hay không
* `setDeepCopyEnabled()` mặc định dùng shallow copy, dùng deep copy thì sẽ chậm hơn.
* `setMatchingStrategy()` đặt loại mapping (như phần trên)
* `setFieldAccessLevel()` chỉ định field truy cập ở mức độ nào (private, public,...)
* `setMethodAccessLevel()` chỉ định mức độ truy cập method, getter và setter (như trên)
* `setSourceNameTokenizer()` chỉ định quy ước đặt tên cho thuộc tính ở source (object nguồn dùng để map)
* `setDestinationNameTokenizer()` chỉ định quy ước đặt tên cho thuộc tính ở đích (object map ra).

### 3.3. Nên dùng getter, setter

Hầu hết các model object trong Spring Boot đều chỉ public getter setter ra ngoài, các field được giữ private. Do đó, khi dùng ModelMapper thì cũng vậy:

* Object nguồn thì cần có getter
* Object đích cần có setter

### 3.4. Luôn luôn phải test

Khi sử dụng model mapper, nhất thiết phải kiểm tra lại kết quả map.

Vì sao, lý do đơn giản vì chúng ta không nắm rõ được quá trình model mapper thực hiện việc mapping các object. Do đó, có thể xảy ra trường hợp không map được, map bị thiếu field, map không chính xác. Do đó, luôn luôn nhớ điều này.

> Luôn luôn test để kiểm tra ModelMapper có map chính xác hay không.

Test thì bạn có thể viết Unit test, debug hoặc dùng tính năng validation có trong ModelMapper cũng được. Chi tiết xem tại đây http://modelmapper.org/user-manual/validation/.

Ngoài các tính năng trên, ModelMapper còn có nhiều tính năng hay ho khác nữa. Các bạn có thể tìm hiểu thêm trên trang chủ của nó.

---

Okay bài viết tới đây là hết rồi. Nhớ upvote hoặc clip bài viết của tớ nếu thấy hay nhé. Thân.