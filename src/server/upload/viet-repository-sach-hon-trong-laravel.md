Tình cờ hôm trước có đọc được một câu hỏi liên quan đến phần thiết kế `Repository` của một bạn trên diễn đàn. Mình cũng vào ngó qua xem cách bạn ấy thiết kế `Repository`, thấy các thiết kế `Repository` của bạn ấy chưa hợp lí cho lắm. Hôm nay mình quyết định viết luôn cách mà mình đã viết `Repository` như thế nào ?

Mình không chắc những gì mình thiết kế ra là chuẩn nhất và clear nhất  .Chỉ hi vọng có thể giúp chút ít nào đó giúp mọi người có cách nhìn chuẩn xác hơn về cách sử dụng `Repository`.

# 1.Repository Pattern là gì?
Đi qua một chút về lí thuyết, để có 1 cái nhìn tổng quan hơn về `Repository` đã nhé

* Repository Pattern là lớp trung gian giữa tầng Business Logic và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.

* Repository đóng vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng.
* Thông thường thì các phần truy xuất, giao tiếp với database năm rải rác ở trong code, khi bạn muốn thực hiện một thao tác lên database thì phải tìm trong code cũng như tìm các thuộc tính trong bảng để xử lý. Điều này gây lãng phí thời gian và công sức rất nhiều.


Với Repository design pattern, thì việc thay đổi ở code sẽ không ảnh hưởng quá nhiều công sức chúng ra chỉnh sửa.

Một số lý do chung ta nên sử dụng Repository Pattern:
* Một nơi duy nhất để thay đổi quyền truy cập dữ liệu cũng như xử lý dữ liệu.
* Một nơi duy nhất chịu trách nhiệm cho việc mapping các bảng vào object.
* Tăng tính bảo mật và rõ ràng cho code.

Rất dễ dàng để thay thế một Repository với một implementation giả cho việc testing, vì vậy bạn không cần chuẩn bị một cơ sở dữ liệu có sẵn.
# 2.Triển khai thiết kế từng Repository với từng Model
Để dễ cho việc theo dõi mình sẽ đi từng phần từng phần một, giải thích cho mọi người tại sao phải sử dụng chúng.

Trước tiên hãy nhìn qua một đoạn code đã.
```php
/**
 * Show the form for editing the specified resource.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
public function edit($id)
{
    $user = User::finOrFail($id);

    return view('admin.user.edit', compact('user'));
}
```
Một đoạn code rất quen thuộc trong việc CRUD User được thực hiện trong controler `UserController` đúng không nào. Việc của chúng ta là phải triển khai việc `tách` phần truy xuất cũng như giao tiếp với database ở đây cụ thể là Model `User`.

Trước tiên ta tạo một thư mục nằm trong thư mục app của ứng dụng Laravel của bạn với tên là `Repositories`. Nhìn qua qua thì ta có thể hình dung thư mục này cùng cấp thư mục Http của app.
Như tiêu đề của chỉ mục ta sẽ thiết kế tiếp 1 thư mục con ứng với mỗi `Model`- ở đây cụ thể là `User`.
Trong thư mục User này ta thiết kế 2 file có tên là `UserRepository.php` và `UserRepositoryInterface.php`


Đây đại loại là cấu trúc như vậy.
![](https://images.viblo.asia/191b04f3-61b5-4527-bb82-9bab61f312e1.png)

Việc tiếp theo là xử lí file `UserRepository.php` 

```php
<?php

namespace App\Repositories\User;

use App\User;

class UserRepository implements UserRepositoryInterface
{

    public function findById($id)
    {
        return User::findOrFail($id);
    }
}

```
Bên file `UserRepositoryInterface.php` sẽ xử lí như sau 
```php
<?php

namespace App\Repositories\User;


interface UserRepositoryInterface
{
     public function findById($id);
}
```
Sửa lại UserController một chút nào 
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Repositories\User\UserRepositoryInterface;

class UserController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = $this->userRepository->findById($id);

        return view('admin.user.edit', compact('user'));
    }
```
Ở đây mình inject class `UserRepositoryInterface` vào `UserController` rồi gọi hàm `findById($id)` ra, vì vậy để code chạy được việc tiếp theo là phải `bind`  `UserRepositoryInterface` vào Container **sử dụng UserRepository** trong đó.


Ta tìm đến file `AppServiceProvider.php` làm việc này trong function `register()`. 
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Database\DatabaseManager;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
    }
}
```
Mọi việc có vẻ ổn và chúng ta đã hoàn thiện `Repository`.

Không cuộc sống thì không dễ dàng như vậy, vài ngày sau bạn cũng làm 1 chức năng liên quan đến việc `findById` này nhưng ở một controller khác cụ thể là `CategoryController` chẳng hạn.

Bạn sẽ hình dung mọi chuyện nó như thế này. Đầu tiên ta cũng phải tạo thư mục con Category trong thư mục Repositories với 2 file là `CategoryRepository.php` và `CategoryRepositoryInterface.php` sau đó viết phần logic code trong đó.
```php
<?php

namespace App\Repositories\Category;

use App\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function findById($id)
    {
        return Category::findOrFail($id);
    }
}
```
Như vậy bạn đã tự làm khó bản thân, code sẽ bị lặp lại ở mỗi Repository.

**Bài toán đặt ra ở đây là làm sao tái sử dụng được các hàm hay dùng trong Repository cụ thể trong ví dụ trên là `findById($id)`.**

# 3. Triển khai thiết kế BaseRepository
Ở `UserController` mình vẫn giữ nguyên logic code cũ. Sử dụng `UserRepositoryInterface` để gọi được hàm `findById($id)` đã được định nghĩa sẵn. Tất nhiên vẫn phải xử lí bind chúng trong `AppServiceProvider.php`.
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Repositories\User\UserRepositoryInterface;

class UserController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * UserController constructor.
     * 
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = $this->userRepository->findById($id);

        return view('admin.user.edit', compact('user'));
    }

```

Ở đây mình tạo ra 2 file trong thư mục Repositories cùng cấp với thư mục User và Category như ở phần 2 mình đã thiết kế với tên lần lượt là `BaseRepository.php` và `RepositoryInterface.php`.

![](https://images.viblo.asia/173c9004-2bfa-4671-a348-96f8c97ad47f.png)

Trong file `BaseRepository.php` mình sẽ xử lí như sau.

```php
<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BaseRepository
 *
 * @package App\Repositories
 */
class BaseRepository implements RepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @inheritdoc
     */
    public function findById(int $id)
    {
        return $this->model->where('id', $id)->first();
    }
}

```
Mình sẽ move code logic của phần `findById($id)` vào đây. Đồng thời sử dụng  `$this->model` để gọi ra Model tương ứng để giải quyết bài toán dùng chung.

Đương nhiên không thể thiếu việc định nghĩa từng hàm thông qua `RepositoryInterface`, vì vậy file `RepositoryInterface.php` ta thiết kế như sau.
```php
<?php

namespace App\Repositories;

use Exception;
use Illuminate\Database\Eloquent\Model;

/**
 * Interface BaseRepositoryInterface
 *
 * @package App\Repositories
 */
interface RepositoryInterface
{
    public function findById(int $id);
}

```

Tiếp theo là phần **cực kì quan trọng để giải quyết bài toán dùng chung** đó là 2 file `UserRepository.php` và `UserRepositoryInterface.php`
File `UserRepositoryInterface.php` mình sẽ xử lí như sau.
```php

<?php

namespace App\Repositories\User;

use App\User;
use App\Repositories\RepositoryInterface;
use Throwable;

/**
 * Interface UserRepositoryInterface
 *
 * @package App\Repositories\User
 */
interface UserRepositoryInterface extends RepositoryInterface
{
    
}
```
Ở đây mình đã kế thưa class `RepositoryInterface` nên phần định nghĩa hàm `findById($id)` mình cũng để luôn bên `RepositoryInterface`

File `UserRepository.php` mình sẽ xử lí như sau.
```php
<?php

namespace App\Repositories\User;

use App\User;
use App\Repositories\BaseRepository;
use Illuminate\Database\DatabaseManager;
/**
 * Class BaseRepository
 *
 * @package App\Repositories
 */
class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * @var User
     */
    protected $model;

    /**
     * UserRepository constructor.
     *
     * @param User $model
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
}

```
Ở đây `UserRepository` của mình đang **kế thừa** `BaseRepository`để sử dụng được hàm `findById($id)` mình đã dựng ở `BaseRepository`. Tiếp dưới mình khai báo 1 `constructor` inject vào nó Model tương ứng cụ thể ở đây là `User` Model.

Sửa lại  file `AppServiceProvider.php` một chút 
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\User;
use Illuminate\Database\DatabaseManager;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
    }
}

```
Ở đây khi `UserRepository` được `binding` vào mình có new thêm model `User` để bên `UserRepository` có thể chạy được.
Vậy là đi thiết kế 1 hồi ta có 1 cái luồng như sau.

* `binding`UserRepositoryInterface vào `Container` sử dụng `UserRepository`
* User controller gọi đế hàm `findById($id)` trong `UserRepositoryInterface`;
* UserRepositoryInterface **kế thừa** từ lớp `RepositoryInterface` nên sẽ gọi vào hàm `findById($id)` trong đó.

Giờ khi ta có thêm bao nhiêu controller cần hàm `findById($id)` thì công việc cũng đơn giản là gọi ra trong `BaseRepository` chứ không phải xử lí logic cho bất cứ từng Model, controller nào.
# 4.Lời kết
Repository được đưa ra để bạn dễ dàng hơn trong việc đối ứng với những thay đổi của Cơ sở dữ liệu. Tất nhiên bạn không bắt buộc phải theo mô hình này ở tất cả các dự án bạn đang làm, bạn có thể chọn hoặc không chọn.  
Bạn cũng có thể chỉ xem bài của mình như một tài liệu tham khảo, đừng bó buộc bản thân phải làm y hệt người này người kia.

Chúc các bạn code đẹp, code sạch
Bài viết có tham khảo từ 2 nguồn
* Repository:  [The Repository Design Pattern](https://viblo.asia/p/the-repository-design-pattern-AeJ1vONQGkby)
* Laravel Container:[ Laravel Beauty: Tìm hiểu về Service container](https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB)