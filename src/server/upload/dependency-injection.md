**Xin chào mọi người, việc làm quen với các định nghĩa trong Laravel đối với những newbie quả là một việc khó khăn, và một trong các định nghĩa mà theo mình cũng khó là Dependency Injection. Vậy Dependency Injection là gì và nó có lợi ích hay tác dụng gì cho project của mình ko :joy: Mình sẽ cùng tìm hiểu và phân tích nó ra xem** =))


-----

### Đặt vấn đề: 
Khi làm việc với hướng đối tượng, việc một Class A khi được đề ra thường sẽ liên quan ít nhiều đến một hay nhiều lớp khác Class B, hoặc C chẳng hạn. Nếu chẳng mau Class B hay Class C đó thay đổi thì điều gì sẽ xảy ra, chắc chắn lớp A liên quan đó cũng ít nhiều sẽ thay đổi. Sự thay đổi đó khiến cho Class A phụ thuộc vào Class B , C. Và đó gọi là Dependency.
<br>Vậy câu hỏi đặt ra ở đây là liệu có các nào đề khi vẫn giữ nguyên được sự liên quan của Class B, C đó với Class A, nhưng khi ta thay đổi Class B, C đó mà Class A giảm được sự thay đổi hoặc ko thay đổi mà chức năng vẫn còn được giữ nguyên ko ? Câu trả lời là Có. Và một trong các cách đó là sự dụng Dependency Injection.

### Dependency Injection.
Dependency Injection - Đúng như tên gọi khi google dich: Tiêm phụ thuộc =)) là một kĩ thuật xử lý truyền tham số vào khi xử lí tịa thời điểm runtime thay vì truyền vào tại thời điểm compile time, nó giúp class đó không cần phải nhớ những lớp nào mà nó phụ thuộc, khi nào cần thì nó mới gọi vào.<br><br>
Có một số các triển khai Dependency Injection: <br>
* Constructor Injection: Các dependency sẽ được container truyền vào (inject vào) 1 class thông qua constructor của class đó. Đây là cách thông dụng nhất.
* Setter Injection: Các dependency sẽ được truyền vào 1 class thông qua các hàm Setter.
* Interface Injection: Class cần inject sẽ implement 1 interface. Interface này chứa 1 hàm tên Inject. Container sẽ injection dependency vào 1 class thông qua việc gọi hàm Inject của interface đó. Đây là cách rườm rà và ít được sử dụng nhất.

Lợi ích của Dependency Injection: <br>
* Giảm sự phụ thuộc giữa các class, các module.
* Code dễ bảo trì, dễ thay thế .
* Giảm sự kết dính giữa các module
* Rất dễ test và viết Unit Test
* Dễ dàng thấy quan hệ giữa các module (Vì các dependecy đều được inject vào constructor)

Tuy có nhiều điểm mạnh xong nó cũng có nhược điểm: <br>
* Khái niệm DI khá “khó tiêu”, các developer mới sẽ gặp khó khăn khi học
* Sử dụng interface nên đôi khi sẽ khó debug, do không biết chính xác module nào được gọi
* Các object được khởi tạo toàn bộ ngay từ đầu, có thể làm giảm performance
* Làm tăng độ phức tạp của code

**Nghe đến đây có vè hơi mơ hồ và khó hiều =)) Chúng ta có thể tìm hiểu qua một ví dụ nhỏ sau đây để hiểu về nó**
<br>
> Ban đầu ta có một UsersController có một method là profile
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function profile()
    {
        return "Hiển thị profile của user đăng nhập!";
    }
}
```
Định nghĩa một route: `Route::get('/users/profile', 'UsersController@profile'); ` và gọi nó theo đường dẫn sẽ ra được kết quả sau: 
> Hiển thị profile của user đăng nhập!

Tiếp theo viết một class UserService với phương thức getLoggedInUser cùng hai tham số $email và $password
```php
<?php

namespace App;

class UserService
{
    public function getLoggedInUser($email, $password)
    {
        $user = \App\User::where('email', '=', $email)
            ->where('password', '=', $password)->first();

        return $user;
    }
}
```
Đến đây vẫn chưa có điều gì liên quan lắm đến dependency =))
Nhưng sau đây sẽ xảy ra dependency :v Bạn sử dụng lớp UserService  này trong UserController và có chỉnh sửa một số chỗ trong phương thức profile
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function profile()
    {
        $email = isset($_GET['email']) ? $_GET['email'] : null;
        $password = isset($_GET['password']) ? $_GET['password'] : null;
        
      //đây là phần dependency
        $userService = new \App\UserService();
        
        $loggedInUser = $userService->getLoggedInUser($email, $password);

        if ($loggedInUser) {
            return "Chào " . $loggedInUser->name . "!";
        }
        return "Email hoặc pass không hợp lệ!";
    }
}
```
Bây giờ chúng ta tạo truy cập lại vào route và truyền hai tham số vào `/users/profile?email=abc@gmail.com&password=123456` Và sau đó bạn sẽ nhận được thông báo
> Xin chào ABCDEF
> 
Và bạn sẽ thấy rằng class UsersController phụ thuộc vào UserService hay UsersController có một dependency là UserService. Chẳng may bây giờ nếu hàm getLoggedInUser của UserService thay đổi thì chắc chắn hàm profile của UserController cũng sẽ thay đổi theo.
<br><br>
Để giải quyểt vấn đề phụ thuộc lên, ta có thể dùng Dependency Injection. Bằng cách thay đổi nhỏ sau, ta có thể áp dụng nó vào source code của hàm bị phụ thuộc profile
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function profile(\App\UserService $userService)
    {
        $email = isset($_GET['email']) ? $_GET['email'] : null;
        $password = isset($_GET['password']) ? $_GET['password'] : null;

        $loggedInUser = $userService->getLoggedInUser($email, $password);

        if ($loggedInUser) {
            return "Chào " . $loggedInUser->name . "!";
        }
        return "Email hoặc pass không hợp lệ!";
    }
}
```
Nhìn qua thì có vẻ ko khác nhau là mấy nhưng ta có thể thấy chúng ta ko còn khởi tạo object của UserService trực tiếp trong hàm nữa mà ta quy định lại method profile cần một đối số truyền vào $userService là một đối tượng thể hiện của class UserService.<br>
**Chúng ta không cần khởi tạo nữa mà Laravel đã tự động khởi tạo cho chúng ta :confused: Nhưng làm sao có thể :neutral_face:  <br>**
> Đó là nhờ tính năng Auto Resolving dependency cung cấp bởi framework này. Khi scan method profile(), Laravel nhận thấy method này phụ thuộc vào class \App\UserService và do đó nó sẽ tự động khởi tạo object từ class này cho bạn.
> 
Tương tự bạn có thể áp dụng cách làm trên cho tất cả những method nào phụ thuộc vào UserService (nói chi tiết hơn là cần một object khởi tạo từ class này).

<br>Tiếp tục với ví dụ, ta tạo ra lớp RedisService để truy vấn vào redis, nhưng để đơn giản hóa ta vẫn sẽ giữ truy vấn DB thay vì dùng thư viện
```php
<?php

namespace App;

class RedisService
{
    public function getLoggedInUser($email, $password) {
        $user = \App\User::where('email', '=', $email)
            ->where('password', '=', $password)->first();
        return $user;
    }
}
```

 Ta chỉnh sửa lại một chút code ở class UserController để ko phải truy vấn vào database nữa mà sẽ sử dụng Redis để lấy dữ liệu 
```php
<?php

namespace App;

class UserService
{
    private $_dbService;

    public function __construct(\App\RedisService $dbService)
    {
        $this->_dbService = $dbService;
    }

    public function getLoggedInUser($email, $password)
    {
        $user = $this->_dbService->getLoggedInUser($email, $password);
        return $user;
    }
}
```
Có gì cần chú ý trong source code của cách triển khai mới ở trên? Nếu bạn không sử dụng tính năng Autowiring trong Laravel bạn sẽ cần viết code trong method profile() của UsersController như sau
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function profile()
    {
        $email = isset($_GET['email']) ? $_GET['email'] : null;
        $password = isset($_GET['password']) ? $_GET['password'] : null;

        $redisService = new \App\RedisService();
        $userService = new \App\UserService($redisService);

        $loggedInUser = $userService->getLoggedInUser($email, $password);

        if ($loggedInUser) {
            return "Chào " . $loggedInUser->name . "!";
        }
        return "Email hoặc pass không hợp lệ!";
    }
}
```
Với cách viết như trên thì method profile() (và tất cả những object nào phụ thuộc vào UserService) sẽ phải thay đổi nếu như có sự thay đổi trong UserService hoặc RedisService. Thử tưởng tượng có 200 class khác nhau phụ thuộc vào class UserService =)) Kinh hoàng luôn.

<br>
Trên đây là ví vụ nhỏ về Dependency Injection mà mình tìm hiểu được, hi vọng sẽ giúp ích cho mọi người có cách nhìn cơ bản về nó. Bài viết xin kết thúc tại đây :slightly_smiling_face: 
<br>Bài viết có tham khảo:

- https://viblo.asia/p/tim-hieu-ve-service-container-trong-laravel-Qbq5QLw3lD8#_instance-binding-6
- https://www.codehub.vn/Giai-Thich-Ve-Dependency-Injection-Pattern-Su-Dung-Laravel-5

<br>

Bonus: Có một câu nói rằng: **"Dependency Injection" is a 25-dollar term for a 5-cent concept. [...] Dependency injection means giving an object its instance variables. [...]."** 

<br>

Translate có nghĩa là: "Dependency Injection" là một thuật ngữ 25 đô la cho khái niệm 5 xu. [...] Tiêm phụ thuộc có nghĩa là đưa ra một đối tượng các biến đối tượng của nó. [...]. " =)))<br>
Theo mình hiểu đơn giản là thay vì việc bạn dùng tự dùng 25 dollar của mình thì bạn có thể yêu cầu 5 cent cho việc đó từ bên ngoài =))