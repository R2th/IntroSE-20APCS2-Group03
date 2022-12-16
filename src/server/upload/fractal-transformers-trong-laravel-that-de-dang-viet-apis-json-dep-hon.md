Xin chào các bạn mình đã trở lại và có vẻ là ăn hại hơn trước rồi!

Chắc hẳn các bạn cũng đã ít nhiều viết API rồi phải không, với API thì đa số chúng ta đều đang dump data và trả về response trực tiếp. Nó sẽ gặp một chút khó khăn và khó quản lý khi chúng ta muốn trả về những dữ liệu tuỳ chỉnh hoặc chỉ đơn giản là client hay là "sếp" (khách hàng nhé) muốn trả về như thế.

Khi tạo REST API ta thường trả về dữ liệu dưới dạng JSON. Trong Laravel ta có nhiều cách để trả về  JSON. Ví dụ một chút nhé

Thông thường, khi chúng ta tạo ra một JSON Response trong Laravel, chúng ta sẽ sử dụng Model.
```PHP
class User
    {
        protected $fillable = [
            'name', 'email', 'address',
        ];

        protected $hidden = [
            'password', 
        ];
    }
```

Giả sử chúng ta muốn lấy User đầu tiên dạng JSON, thì có lẽ chúng ta sẽ sử dụng một cách nào đó như sau.
```PHP
$user = User::find(1);
return $user;
```
Bùm! Bạn nhận JSON response của user đầu đã đăng ký. Nhưng nếu Model thay đổi trong tương lai  ví dụ: 
```PHP
class User
    {
        protected $fillable = [
            'name', 'email', 'address',
        ];

        protected $hidden = [
            'password', 'remember_token',
        ];
    }
```
thêm remember_token => JSON response cũng thay đổi. Các bên sử dụng API của bạn cũng phải thay đổi theo.  Vậy có lẽ nào ta cần thay đổi tất cả theo cái API chết tiệt đã thay đổi kia sao. Câu trả lời là không nên mà chúng ta nên tìm một giải pháp mới phù hợp hơn, và đó là dùng  [Fractal](http://fractal.thephpleague.com/). Vậy Fractal là gì ....

# 1.Fractal là gì?
Theo [Fractal](http://fractal.thephpleague.com/) thì nó là thế này:
> Fractal provides a presentation and transformation layer for complex data output, the like found in RESTful APIs, and works really well with JSON. Think of this as a view layer for your JSON/YAML/etc.
> 
> When building an API it is common for people to just grab stuff from the database and pass it to json_encode(). This might be passable for “trivial” APIs but if they are in use by the public, or used by mobile applications then this will quickly lead to inconsistent output.

Hiểu nôm na thì Fractal cung cấp một lớp trình bày, nó cho phép chúng ta tạo ra một lớp chuyển đổi mới cho các models trước khi trả về chúng như là một response. Cách làm này rất linh hoạt và dễ dàng tích hợp vào bất kỳ ứng dụng hoặc framework nào. Nhất là đối với các API sử dụng "public" hay các ứng dụng dành cho mobile.

# 2.Cài đặt
Chúng ta sẽ sử dụng Laravel 5.4 để xây dựng một ví dụ và tích hợp các gói Fractal với nó, trước hết tạo ra một ứng dụng Laravel mới sử dụng trình cài đặt hoặc thông qua Composer.
```PHP
laravel new fractal
```
Sau đó cd vào thư mục fractal chúng ta sẽ require Fractal package.
```PHP
cd fractal
composer require league/fractal
```

Tạo một bảng user như sau:

```PHP
// app/User.php

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'address',
        'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
```
# 3.Tạo Transformers
Chung ta sẽ tạo transformers cho model User
```PHP
// app/Transformers/UserTransformer.php

namespace App\Transformers;

use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'name' => $user->name,
            'email' => $user->email
        ];
    }
}
```
Chú ý dòng này `use League\Fractal\TransformerAbstract;` sẽ thấy, chúng ta extends TransformerAbstract class và định nghĩa tranform method sẽ được gọi với một User instance.

Đó là tất cả những gì cần để tạo ra một transfomer! Nó chỉ biến đổi dữ liệu trong một cách mà có thể được quản lý bởi các developer, và không dùng tới ORM hay một repository.

# 4.Tạo Controllers
Việc làm của controller là nên chuyển đổi dữ liệu trước khi gửi cho người sử dụng. Chúng ta thử với UsersController và action `index` nhé.
```PHP
// app/Http/Controllers/UsersController.php

class UsersController extends Controller
{
    /**
     * @var Manager
     */
    private $fractal;

    /**
     * @var UserTransformer
     */
    private $userTransformer;

    function __construct(Manager $fractal, UserTransformer $userTransformer)
    {
        $this->fractal = $fractal;
        $this->userTransformer = $userTransformer;
    }

    public function index(Request $request)
    {
        $users = User::all(); // Get users from DB
        $users = new Collection($users, $this->userTransformer); // Create a resource collection transformer
        $users = $this->fractal->createData($users); // Transform data

        return $users->toArray(); // Get transformed array of data
    }
}
```
Đầu tiên action `index` sẽ truy vấn tất cả dữ liệu từ database, sau đó tạo một resource collection với một list các users và transformer, cuối cùng sẽ chuyển đổi. Nó có dạng sau:

```JSON
{
  "data": [
    {
      "name": "Hello word",
      "email": "admin@gmail.com"
    },
    {
      "name": "Name user",
      "email": "Name@gmail.com"
    },
    {
      "name": "admin",
      "email": "admin1@gmail.com"
    },
    {
      "name": "naruto",
      "email": "naruto@gmail.com"
    }
    // ...
  ]
}
```
Vậy đó việc chuyển đổi đã xong

# 5.Example
Ta thử với một ví dụ khác nhé. Thay đổi model một chút như thế này:
```PHP
// app/Transformers/UserTransformer.php

namespace App\Transformers;

use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'name' => $user->name,
            'email' => $user->email
        ];
    }
    
    public function transformWithoutAddress(User $user) {
        return [
            'name' => $user->name,
            'email' => $user->email,
        ];
    }
}
```

Sửa lại controller một chút
```PHP
// app/Http/Controllers/UsersController.php

class UsersController extends Controller
{
    /**
     * @var Manager
     */
    private $fractal;

    /**
     * @var UserTransformer
     */
    private $userTransformer;

    function __construct(Manager $fractal, UserTransformer $userTransformer)
    {
        $this->fractal = $fractal;
        $this->userTransformer = $userTransformer;
    }

    public function index(Request $request)
    {
        $users = User::all(); // Get users from DB
        $users = new Collection($users, $this->userTransformer); // Create a resource collection transformer
        $users = $this->fractal->createData($users); // Transform data

        return $users->toArray(); // Get transformed array of data
    }
    
    public function show($id)
    {
       $user = User::find($id);
       return (new UserTransformer)->transformWithoutAddress($user);
    }
}
```
OK, mọi thứ đều ổn, chúng ta sẽ có được name và email như ví dụ trên. Nhưng nếu ta muốn trả lại cả address thì sao? Chỉ cần tạo thêm một transformer nữa trong UserTransformer như sau:
```PHP
public function transformWithoutAddress(User $user) {
        return [
            $data = ['address' => (string) $user->address];
            return array_merge($data, $this->transformWithoutAddress($user));
        ];
    }
```
Vậy là có đủ giá trị cần có rồi. Các bạn có biết tại sao mình lại gán address riêng không, câu trả lời là thế này, giả sử một ngày đẹp trời "save" yêu quý của các bạn gửi một request cho bạn nói rằng: mày chuyển address thành user_address cho anh và thế là chúng ta chỉ việc thay đổi trong Transformer và các bên sử dụng API của ta không bị ảnh hưởng gì cả. Đó là câu trả lời cho phần mở đầu ở trên nhé.
# 6.Kết luận
Trên đây là một chút ý hiểu của mình về Fractal - Transformers hy vọng sẽ giúp ích cho các bạn, nếu muốn tìm hiểu kỹ hơn về Fractal mọi người có thể đọc thêm tài liệu ở [website](http://fractal.thephpleague.com/)
Chúc các bạn một ngày vui vẻ và đừng quên vote cho mình nhé :p .


# Tài liệu tham khảo
* https://www.sitepoint.com/php-fractal-make-your-apis-json-pretty-always/
* http://fractal.thephpleague.com/
* http://rizqi.id/simple-transformers-for-json-in-laravel
* https://viblo.asia/p/php-fractal-viet-apis-json-dep-hon-eW65GYvJZDO#eager-loading-5