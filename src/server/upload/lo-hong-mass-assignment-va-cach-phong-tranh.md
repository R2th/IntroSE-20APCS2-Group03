# Giới thiệu lỗ hổng
Khi phát triển phần mềm, các developer thường xử dụng các framework được xây dựng sẵn để phát triển. Việc này vừa tiện cũng như giảm thiểu thời gian và công sức xây dựng từ đầu. Các framework này được được phát triển kèm theo các tính năng về bảo mật giúp đảm bảo an toàn cho ứng dụng được phát triển ra. Nhưng đôi khi việc sử dụng không đúng hoặc sai mục đích lại gây ra những lỗ hổng nghiêm trọng.

Một số framework phát triển web (ví dụ: Laravel, Ruby on Rails,..), để thuận tiện cho việc phát triển, nó cho phép developer tự động đẩy các tham số thông qua các HTTP request vào biến của chương trình hay đối tượng. Từ đó chương trình sẽ thực hiện lấy và xử lý dữ liệu trên server. Việc này đôi khi gây ra các vấn đề và bảo mật. Kẻ tấn công có thể lợi dụng việc này để chèn các dữ liệu độc hại là các tham số của chương trình (các tham số này vốn không được cho phép hoặc do các developer không có ý định truyền lên) để từ đó thực hiện các hành vi không mong muốn. Lỗ hổng bảo mật này được gọi là Mass Assigment.

Một số tên gọi khác của hình thức tấn công này:
* **Mass Assignment**: Ruby on Rails, NodeJS.
* **Autobinding**: Spring MVC, ASP NET MVC.
* **Object injection**: PHP
# Cách thức tấn công
Để hiểu hơn về cách thức tấn công,  chúng ta cùng đi qua một số ví dụ để hiểu rõ hơn về lỗ hổng bảo mật này.

**Ví dụ 1:**  Tạo mới user trong hệ thống

User có các trường thông tin sau:

```java
public class User {
   private String userid;
   private String password;
   private String email;
   private boolean isAdmin, default: false;

   //Getters & Setters
}
```

Người lập trình viên tạo ra một form tạo mới user như sau:

```html
<form>
     <input name="userid" type="text">
     <input name="password" type="text">
     <input name="email" text="text">
     <input type="submit">
</form>  
```

Ở đây, developer thiết kế cho phép người dùng cập nhật thông tin 3 trường là: `userid, password và email`
Phần xử lý ở controller sẽ được thực hiện như sau:

```javascript
@RequestMapping(value = "/addUser", method = RequestMethod.POST)
public String submit(User user) {
   userService.add(user);
   return "successPage";
}
```

Và một request bình thường được gửi lên sẽ trông như thế này:

```markdown
POST /addUser
...
userid=bobbytables&password=hashedpass&email=bobby@tables.com
```

Như thông thường, thì sau khi request POST được gửi lên, ứng dụng sẽ thực hiện đọc và lấy dữ liệu và thực hiện chèn vào cơ sở dữ liệu. Một user được tạo ra với thông tin như sau:

* **userid**: bobbytables
* **password**: hashedpass
* **email**: bobby@tables.com
* **isAdmin**: false

Một luồng hoạt động bình thường và dĩ nhiên đến đây, developer đã hoàn thành nhiệm vụ phát triển tính năng và nó chạy hoàn toàn ổn.

**Vậy ứng dụng trên có thể bị tấn công như thế nào?**
Vấn đề ở đây nằm ở chỗ xử lý trong controller, developer đã vô tình tạo cơ hội cho attacker có thể thực hiện tấn công. Như ta thấy, user có 4 trường thông tin và developer phát triển tính năng cho phép tạo ra user với 3 trường thông tin như trên (không bao gồm trường: isAdmin) vì trường này là trường quan trọng xác định vai trò của user và chỉ nên được cập nhật bởi admin trong hệ thống. Nhưng controller, developer lại xử lý nhận toàn bộ tham số người dùng truyền lên mà không kiểm tra là tham số nào là được phép hay không?

Vì vậy, hacker sẽ thực hiện tấn công bằng cách truyền thêm tham số trong request để thực hiện tạo 1 user mới:

```markdown
POST /addUser
...
userid=bobbytables&password=hashedpass&email=bobby@tables.com&isAdmin=true
```

Sau khi request POST được gửi lên, ứng dụng sẽ thực hiện đọc và lấy dữ liệu và thực hiện chèn vào cơ sở dữ liệu. Một user được tạo ra với thông tin như sau:

* **userid**: bobbytables
* **password**: hashedpass
* **email**: bobby@tables.com
* **isAdmin**: true

Vậy là attacker có thể tạo được một user là tài khoản admin. Rõ ràng điều này không đúng như thiết kế và đã gây ra lỗ hổng nghiêm trọng, cho phép tạo ra một tài khoản có đặc quyên cao trong hệ thống.

![](https://images.viblo.asia/7949b41d-dda7-4932-9cd7-b9de7bb0c4cc.jpg)

Vậy chúng ta đã hiểu cách tấn công của lỗ hổng này. Nhưng còn 1 vấn đề nữa ở đây, là làm sao attacker có thể đoán được là user có trường thông tin` isAdmin` để thực hiện tấn công. Có 1 số cách sau mà attacker có thể tìm được.
* Thông qua chức năng xem thông tin người dùng, cập nhật thông tin người dùng attacker có thể xem các trường mà user có
* Thông qua việc review sourcode và tài liệu của hệ thống
* Thông qua kỹ thuật guessing để đoán ra một số trường thông tin nhạy cảm. (Ví dụ: isAdmin, admin, isAthenticated..)
# Hậu quả
Hậu quả của lỗ hổng này gây ra tùy thuộc và chức năng cũng như trường mà attacker có thể tấn công. Nó có thể gây ra một số hình thức tấn công:
* Tấn công leo thang đặc quyền trong hệ thống
* Tấn công sửa đổi thông tin trái phép trong hệ thống
# Cách phòng tránh
Tùy vào framework chúng ta sử dụng, chúng ta có cách xử lý khác nhau, nhưng tất cả sẽ theo cơ chế chung:
* Whitelist các trường được phép bind
* Blacklist các trường không được phép bind
* Sử dụng Data Transfer Objects ([tham khảo tại đây](https://martinfowler.com/eaaCatalog/dataTransferObject.html)).
DTO định nghĩa chính xác các trường dữ liệu được phép bind:

```rust
public class UserRegistrationFormDTO {
 private String userid;
 private String password;
 private String email;

 //NOTE: isAdmin field is not present

 //Getters & Setters
}
```

## Một số ví dụ về cách triển khai với framework
### Spring MVC
**Whitelisting**

```java
@Controller
public class UserController
{
    @InitBinder
    public void initBinder(WebDataBinder binder, WebRequest request)
    {
        binder.setAllowedFields(["userid","password","email"]);
    }
...
}
```

**Blacklisting**

```java
@Controller
public class UserController
{
   @InitBinder
   public void initBinder(WebDataBinder binder, WebRequest request)
   {
      binder.setDisallowedFields(["isAdmin"]);
   }
...
}
```

### PHP Laravel 
**Whitelisting**

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    private $userid;
    private $password;
    private $email;
    private $isAdmin;

    protected $fillable = array('userid','password','email');
}
```

**Blacklisting**

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    private $userid;
    private $password;
    private $email;
    private $isAdmin;

    protected $guarded = array('isAdmin');
}
```

Xem thêm các frameworks khác [tại đây](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html)
# Case study
**Github : Public Key Security Vulnerability and Mitigation**

Năm 2012, Github đã bị khai thác lỗ hổng Mass Assigment. Một hacker đã  khai thác lỗ hổng thông qua public key update form để có thể add public key của cậu ta và rails organization, từ đó cậu ta có thể truy cập vào github của tổ chức này và đẩy file lên tùy ý.

Trong quá trình thực hiện kiểm thử bảo mật, tôi cũng đã gặp nhiều ứng dụng gặp phải lỗi trên. Ứng dụng vẫn cho phép cập nhật các trường thông tin vốn không được cho  phép. Vì vậy, ngay lúc này các developer cần xem lại xem mình đã thực hiện đúng như khuyến nghị của các framework chưa để tránh gặp phải lỗ hổng này.

# Reference
[mass assigment OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html)