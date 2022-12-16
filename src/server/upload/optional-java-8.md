> Nếu bạn là một lập trình viên Java, thì bạn hẳn đã nghe nói hoặc trải nghiệm về NullPointerExceptions trong các chương trình của mình. NullPointerExceptions là các ngoại lệ được jvm ném ra trong quá trình chạy.  Kiểm tra rỗng trong các chương trình thường bị các lập trình viên bỏ qua gây ra các lỗi nghiêm trọng. Java 8 đã giới thiệu` Optional<T>` để giúp các nhà phát triển xử lý các giá trị null đúng cách.

# Optional là gì?
Optional là một thùng chứa cho một đối tượng có thể là null.
Hãy xem xét hàm findUserById sau, trả về một đối tượng `User` từ `userId` truyền vào.
```
    User findUserById(String userId) { ... };
```
Nếu `userId` không có trong cơ sở dữ liệu thì hàm trên trả về null.  Bây giờ, hãy xem xét đoạn mã sau:
```
    User user = findUserById("667290");
    System.out.println("User's Name = " + user.getName());
```
Một trường hợp để xảy ra `NullPointerException` phổ biến. Lập trình viên đã quên kiểm tra đối tượng `User` trước khi gọi hàm `user.getName()`. Bởi vì `userId` không có trong csdl nên đoạn mã trên sẽ tạo ra một `NullPointerException`. Chúng ta có thể dùng `Optional` để giải quyết rắc rối này: 
```
Optional<User> findUserById(String userId) { ... };
```
Bằng cách trả về `Optional<User>` từ hàm, chúng ta đã nói rõ với những lời gọi hàm này rằng có thể sẽ không có `User` nào với `userId` đã cho. Bây giờ lời gọi hàm này chúng ta phải xử lý như sau :
```
    Optional<User> optional = findUserById("667290");

    optional.ifPresent(user -> {
        System.out.println("User's name = " + user.getName());    
    })
```
Phương thức `ifPresent()` sẽ gọi biểu thức `lambda` nếu `User` tồn tại, nếu không biểu thức `lambda` sẽ không được gọi.
# Tạo đối tượng Optional
## 1. Tạo một `Optional` rỗng
```
Optional<User> user = Optional.empty();
```

## 2. Tạo một `Optional` chứa giá trị
```
User user = new User("667290", "Sun Bear");
Optional<User> userOptional = Optional.of(user);
```
Nếu đối số được cung cấp cho `Optional.of()` là `null`, thì nó sẽ ném ra một `NullPointerException` ngay lập tức và đối tượng `Optional` sẽ không được tạo.
## 3. Tạo một `Optional` có giá trị hoặc rỗng

```
Optional<User> userOptional = Optional.ofNullable(user);
```
Nếu đối số được truyền đến `Optional.ofNullable()`không phải là `null`, thì nó sẽ trả về một `Optional` chứa giá trị được chỉ định, nếu không nó sẽ trả về một `Optional` trống.

# Kiểm tra giá trị của `Optional`
## 1. isPresent()
Phương thức `isPresent ()` trả về `true` nếu Tùy chọn chứa giá trị khác rỗng, nếu không, nó trả về `false`.
```
    if(optional.isPresent()) {
        System.out.println("Value found - " + optional.get());
    } else {
        System.out.println("Optional is empty");
    }	
```
## 2. ifPresent()
Phương thức `ifPresent ()` cho phép gọi biểu thức `lambda` bên trong nếu `optional` có giá trị. Nó không có tác dụng gì nếu `Optional` trống.
```
optional.ifPresent(value -> {
    System.out.println("Value found - " + value);
});
```

# Một số phương thức `Optional` cung cấp
## 1. get()
Phương thức `get ()` của `Optional` trả về một giá trị nếu nó tồn tại, nếu không nó sẽ ném `NoSuchElementException`.
```
User user = optional.get()
```
## 2. orElse()
`orElse ()` trả về giá trị mặc định nếu Optional trống. Hãy xem xét ví dụ sau:
```
User finalUser = (user != null) ? user : new User("0", "Unknown User");
```
Ta có thể dùng `orElse()` như sau: 
```
User finalUser = optionalUser.orElse(new User("0", "Unknown User"));
```
## 3. orElseGet()
Không giống như `orElse ()`, trả về giá trị mặc định trực tiếp nếu `Optional` trống, `orElseGet ()` cho phép bạn chuyển một hàm mà chúng ta cung cấp được gọi khi `Optional` trống.  Kết quả của hàm được chúng ta cung cấp trở thành giá trị mặc định của `Optional`.

```
User finalUser = optionalUser.orElseGet(() -> {
    return new User("0", "Unknown User");
});
```
## 4. ResourceNotFoundException()
Chúng ta có thể sử dụng `orElseThrow () `để ném một ngoại lệ nếu `Optional` trống.  Một trường hợp điển hình trong đó điều này có thể hữu ích là - trả về một ngoại lệ `ResourceNotFound() `tùy chỉnh từ `REST API` nếu đối tượng với các tham số yêu cầu được chỉ định không tồn tại.
```
@GetMapping("/users/{userId}")
public User getUser(@PathVariable("userId") String userId) {
    return userRepository.findByUserId(userId).orElseThrow(
	    () -> new ResourceNotFoundException("User not found with userId " + userId);
    );
}
```
## 5. filter()
Giả sử ta có đối tượng `Optional<User>`.  Muốn kiểm tra giới tính của user đó và gọi một hàm nếu đó là Male.  Đây là cách giúp chúng ta làm điều đó bằng phương pháp cũ: 

```
if(user != null && user.getGender().equalsIgnoreCase("MALE")) {
    // call a function
}
```
Bây giờ, Sử dụng `Optional` với `filter()`:
```
userOptional.filter(user -> user.getGender().equalsIgnoreCase("MALE"))
.ifPresent(() -> {
      // call a function
})
```
## 6. map()
Giả sử rằng ta muốn lấy địa chỉ của người dùng nếu địa chỉ đã có sẵn và in địa chỉ đó nếu người dùng đến từ VietNam.  
Phương thức `getAddress () `bên trong lớp `User`:
```
Address getAddress() {
    return this.address;
}
```
Đây là cách chúng ta làm truyền thống: 
    
```
if(user != null) {
    Address address = user.getAddress();
    if(address != null && address.getCountry().equalsIgnoreCase("VietNam")) {
	    System.out.println("User belongs to VietNam");
    }
}
```
 Sử dụng `Optional` và `map()`:
```
userOptional.map(User::getAddress)
.filter(address -> address.getCountry().equalsIgnoreCase("VietNam"))
.ifPresent(() -> {
    System.out.println("User belongs to VietNam");
});
```
# Kết luận
> Bài viết này mình đã trình bày về `Optional` trong Java 8 và cách sử dụng nó để chúng ta có thể tránh các `NullPointerExceptions` trong quá trình chúng ta làm việc với Java. Cảm ơn mọi người!