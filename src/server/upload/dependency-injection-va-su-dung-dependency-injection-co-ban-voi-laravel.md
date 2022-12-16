#  Dependency Injection.
## 1.	Dependency injection là gì?
-	Dependency injection là một kĩ thuật khi mà một Object phụ thuộc vào một Object khác. Dependecy trong lập trình có thể hiểu như Khi class A sử dụng một phương thức của class B, khi đó người ta nói Class A phụ thuộc vào class B. Vì vậy khi cần 1 Object có dependency với các object khác, Object đó sẽ gọi 1 service khác, service đó có nhiệm vụ khỏi tạo các Object phụ thuộc, và đó là cơ chế của Dependency Injection.
## 2.	Vậy tại sao nên sử dụng Dependency injection?
Ví dụ:
 Class PC {
	private Screen screen = new LG ();
	private Keyboard keyboard = new Logitech();
}

Ở đây, Pc tạo ra tất cả các đối tượng phụ thuộc như screen, keyboard, …

Thông thường khi muốn thay đổi screen LG thành SamSung, ta lại phải tạo lại đối tượng PC, và khởi tạo lại screen là SamSung. Nhưng khi sử dụng dependency injection, chúng ta có thể thay đổi Screen tại runtime, vì dependency có thể được chèn ngay tại runtime (thời gian chạy) thay vì tại Compile Time (thời gian biên dịch). Có thể thấy DI là người vận chuyển, hay người trung gian ở giữa để thực hiện tất cả công việc khởi tạo và cung cấp cho lớp sử dụng nó.  Nó làm cho lớp PC không còn phụ thuộc vào việc khởi tạo các đối tượng nhưng Screen hay KeyBoard ở trên nữa. 

## 3.	Các loại Dependency injection:
-	Constructor Injection: Sử dụng Dependency thông qua hàm khởi tạo Constructor

-	Setter injection: Sử dụng phương thức Setter để chèn sự phục thuộc.

-	Interface injection: Dependency được cung câp bởi phương thức sẽ chèn Dependency vào bất kì class nào được nó truyền vào, class phải thực thi một giao diện(Interface) để chấp nhận dependency đó. 

Nếu có bất kì thay đổi object phụ thuộc nào trong class, thì DI sẽ có trách nhiệm cung cấp các đối tượng phù hợp cho lớp đó.

## 4.	Sử dụng Dependency trong Laravel.
– Kỹ thuật Dependency Injection này được sử dụng rất nhiều trong Laravel
Sử dụng với hàm khởi tạo hoặc hàm setter.


```
<?php
namespace App\Http\Controllers;
use App\User;
use App\Repositories\UserRepository;
use App\Http\Controllers\Controller;
class UserController extends Controller
{
    /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $users;
    /**
     * Create a new controller instance.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $user = $this->users->find($id);
        return view('user.profile', ['user' => $user]);
    }
}
```

Ở ví dụ trên, UserController cần lấy user từ cơ sở dữ liệu, vì vậy chúng ta chèn 1 service có thể truy xuất được users là UserRepository. Nó sử dụng Eloquent để lấy thông tin User từ cơ sở dữ liệu. Từ đó ta có thể dễ dàng làm việc với thông tin user thông qua UserRepository.