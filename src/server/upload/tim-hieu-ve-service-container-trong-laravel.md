Xin chào các anh em, hôm qua mình vừa mới phát hiện ra một điều rất hay trong Laravel mà hôm nay mình muốn lên chia sẻ ngay cho anh em. Thế nhé, mình sẽ tiếp tục series **Laravel và những điều thú vị** thì hôm nay mình sẽ chia sẻ cho anh em về `Service Container` trong Laravel, nó được dùng khắp nơi trong project của chúng ta luôn nhưng hầu như chúng ta lại không quan tâm nó cho lắm. Cho nên bài viết này mình muốn nói ra những điều hay ho thú vị về nó cho mọi người nghe. Trước tiên để tìm hiểu về `Service Container` thì chúng ta sẽ tìm hiểu qua một dưới đây trước nhá.

# 1.Denpendency Injection & Inversion of Control
Trước tiên chúng ta cần phân biệt 3 khái niệm sau đây nhé:

`Denpendency Inversion`: là một nguyên lý thiết kế và viết code.

`Inversion of Control`: Đây là một design partern nằm trong nguyên lý SOLID, nó được tạo ra để tuân thủ theo nguyên lý Denpendency Inversion. Có rất nhiều cách để thực hiện partern này, Dependency Inversion là một trong số những cách đó.

`Dependency Injection `: Đây là một design partern để thực hiện Inversion of Control. Dependency Injection là cách tổ chức source code, sao cho có thể inject (tiêm) các đối tượng dependency vào trong đối tượng mà nó dependent. Các bạn có thể hiểu đơn giản như này, nếu class A phụ thuộc vào các class khác tức là bên trong class A khởi tạo nhiều đối tượng khác trong đó thì chúng ta có thể  truyền những instance của class con đó trong hàm `__contruct` hoặc hàm `setter`

Và nó có 3 kiểu DI:
* Constructor Injection: Các dependency sẽ được container truyền vào (inject vào) 1 class thông qua constructor của class đó. Đây là cách thông dụng nhất.
* Setter Injection: Các dependency sẽ được truyền vào 1 class thông qua các hàm Setter.
* Interface Injection: Class cần inject sẽ implement 1 interface. Interface này chứa 1 hàm tên Inject. Container sẽ injection dependency vào 1 class thông qua việc gọi hàm Inject của interface đó. Đây là cách rườm rà và ít được sử dụng nhất.

Mình sẽ lấy ví dụ để hiểu rõ hơn nhé
```PHP
class Tire
{
    public $number;
    public function __contruct($number)
    {
        $this->number = $number;
    }
    public function aboutNumberTire()
    {
        echo "Xe có " . $this->number . " lốp";
    }
}

class Car
{
    public $tire;
    public function __construct($number)
    {
        $this->tire = new Tire($number);
    }
    
    public function info()
    {
        $this->tire->aboutNumberTire();
    }
}

//Main
$car = new Car(4);
$car->info();
```

Ví dụ trên ta thấy class `Car` đã bị phụ thuộc vào class `Tire` nên nó đã bị vi phạm nguyên tắc Dependency Inversion. Chúng ta có thể sửa code như sau để nó tuân thủ theo IoC
```PHP
class Tire
{
    public $number;
    public function __contruct($number)
    {
        $this->number = $number;
    }
    public function aboutNumberTire()
    {
        echo "Xe có " . $this->number . " lốp";
    }
}

class Car
{
    public $tire;
    public function __construct(Tire $tire)
    {
        $this->tire = $tire;
    }
    
    public function info()
    {
        $this->tire->aboutNumberTire();
    }
}

//Main
$car = new Car(new Tire(4));
$car->info();
```
## Ưu điểm của DI
* Giảm sự phụ thuộc giữa các class, các module.
* Code dễ bảo trì, dễ thay thế .
* Giảm sự kết dính giữa các module
* Rất dễ test và viết Unit Test
* Dễ dàng thấy quan hệ giữa các module (Vì các dependecy đều được inject vào constructor)
## Nhược điểm của DI
* Khái niệm DI khá “khó tiêu”, các developer mới sẽ gặp khó khăn khi học
* Sử dụng interface nên đôi khi sẽ khó debug, do không biết chính xác module nào được gọi
* Các object được khởi tạo toàn bộ ngay từ đầu, có thể làm giảm performance
* Làm tăng độ phức tạp của code
# 2. Service Container
Có một vấn đề nảy sinh ra như thế này, nếu như khi khởi tạo class A thì nó chỉ phụ thuộc 1,2 class con khác. Nhưng điều này thật chớ trêu khi class `Tire` trong ví dụ trên nó lại còn phụ thuộc vào mấy class con nữa (khoc). Nó gây khó khắn cho chúng ta trong công việc khởi tạo một object mà ta cần, bởi vì chúng ta không thể cover hết được danh sách phụ thuộc của nó.
<br>
<br>
Để giải quyết vấn đề này thì các contributor đã nghĩ ra Dependency Injection Container hay cũng chính là Inversion of Control Container. Và các bạn biết đấy, Laravel từ phiên bản 5. trở đi khi các bạn vào documentaion của nó đọc thì đã không thấy nó nữa rồi. Thuật ngữ đó đã được chuyển thành `Service Container`. Vậy bạn có thể hiểu nôm na `Service Container` như là tấm bản đò, một dịch vụ tổng đài để quản lý class dependency và thực hiện **inject** class indepent.

## Binding
Hầu hết tất cả các `Service Container` binding của chúng ta sẽ được đăng ký trong `Service Provider`. Bên trong một `Service Provider` thì chúng ta luôn có quyền truy cập vào `Container` thông qua `$this->app`.
Ví dụ nhá tạo 1 file Computer.php
```PHP
class Computer
{
    //code
}
```
Vào trong `AppServiceProvider.php` đăng ký 
```PHP
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
        $this->app->bind('Computer', function () {
            return time();
        });
    }
}

```
Và cuối cùng vào tạm 1 cái controller nào đó :
```PHP
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Event;

class HomeController extends Controller
{
    
    public function index()
    {
        $computer = app('Computer');
        dd($computer);
        return view('home');
    }
}
```
Kết quả <br>
![](https://images.viblo.asia/5667327f-638d-441b-b48f-e258b49185f6.png)
<br>Mình giải thích chỗ này chút nhé: `$computer = app('Computer')` Laravel kiểm tra xem đã có cái gì được bind vào Container dưới cái tên Computer hay chưa? Nếu chưa nó coi như Computer như là tên class và tiến hành resolve ra instance từ class Computer.
## Singleton Binding
Chỉ được resolve một lần, những lần gọi tiếp theo sẽ không tạo ra instance mới mà chỉ trả về instance đã được resolve từ trước.
## Instance Binding
Cái này cũng giống như `Singleton Binding`, chúng ta có một instance đang tồn tại và chúng ta bind nó vào `Service Container`. Mỗi lần lấy ra chúng ta sẽ nhận lại được đúng instance đó.
## Binding Interfaces vào Implementations
Chúng ta sẽ cùng thông qua một ví dụ để hiểu rõ hơn nhé.
<br>Tạo file app/Contracts/Repositories/CategoryRepository.php
```PHP
<?php

namespace App\Contracts\Repositories;

interface CategoryRepository extends AbstractRepository
{
    public function getData($data = [], $with = [], $dataSelect = ['*']);
}

```
Tạo tiếp file app/Repositories/CategoryRepositoryEloquent.php
```PHP
<?php

namespace App\Repositories;

use App\Eloquent\Category;
use App\Contracts\Repositories\CategoryRepository;
use Illuminate\Pagination\Paginator;
use App\Exceptions\Api\ActionException;
use App\Exceptions\Api\NotFoundException;
use App\Exceptions\Api\UnknownException;
use Log;

class CategoryRepositoryEloquent implements CategoryRepository
{
    public function model()
    {
        return new Category;
    }

    public function getData($data = [], $with = [], $dataSelect = ['*'])
    {
        $categories = $this->model()
            ->select($dataSelect)
            ->with($with)
            ->get();

        return $categories;
    }
}

```
Trong CateController chúng ta có đoạn code như sau
```PHP
<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Repositories\CategoryRepository;
use App\Http\Requests\Api\Category\CreateCategoryRequest;
use App\Http\Requests\Api\Category\SearchRequest;

class CategoryController extends ApiController
{
    public $category;
    public function __construct(CategoryRepository $repository)
    {
        $thí->category = $repository;
    }

    public function index()
    {
        return $this->getData(function() {
            $this->compacts['items'] = $this->repository->getData();
        });
    }  
}
```
Các bạn chú ý đến đoạn code trong hàm khởi tạo `__contruct()` các bạn có thấy người ta đi khởi tạo `interface CategoryRepository` không. Theo nguyên tắc thì sẽ không khởi tạo được interface đúng không, nhưng ở đây chúng ta code theo design pattern `Repository`. Nhưng cái cốt lõi nhất ở đây là chúng ta đã khởi tạo 1 interface , thật là hoang đường đúng không.

Nhưng với sự hỗ trợ mạnh mẽ của `Service Container` của Laravel thì chúng ta có thể làm được điều đấy. Chúng ta sẽ cần vào file `app/Providers/AppServiceProvider.php` để đăng ký như sau :
```PHP
<?php

namespace App\Providers;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Support\ServiceProvider;
use League\Glide\ServerFactory;
use League\Glide\Responses\LaravelResponseFactory;
use Illuminate\Support\Facades\Storage;
use League\Glide\Urls\UrlBuilderFactory;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            \App\Contracts\Repositories\CategoryRepository::class,
            \App\Repositories\CategoryRepositoryEloquent::class
        );
    }
}
```
Chúng ta hiểu thế này nhé, mình đã nói ở trên `Service Container` là tấm bản đồ, là tổng đài dịch vụ đúng không. Bây giờ nó làm đúng nhiệm vụ của nó rồi đấy, khi chúng ta type-hint interface ở hàm `__contruct()` hay method thì chúng sẽ nhận được `implementaion` tương ứng khi ta đăng ký trong `Service Container`. Thực chất nó là quá trình `bind` (đăng ký 1 class hay 1 interface vs Container) và `resolve` (lấy ra) instance từ Container.
## Contextual Binding
Đôi khi bạn sẽ có 2 class implementaion từ 1 interface, nhưng trong trường hợp này bạn lại muốn inject implementation này và trong trường hợp khác thì bạn lại muốn inject implementaion khác. Khi đó bạn cần đến **Contextual Binding**. Bây giờ ta có `PostRepository` thì implementation tương ứng của nó là `PostRepositoryEloquent` thì trong hàm register() ta sẽ bind như sau :
```PHP
$this->app->bind(
    \App\Contracts\Repositories\PostRepository::class,
    \App\Repositories\PostRepositoryEloquent::class,
),
```
Nhưng bây giờ có thêm implementation `NewRepositoryEloquent` <br>
==> 1 interface có 2 implementation thì chúng ta sẽ bind như sau :
```PHP
$this->app->when(\App\Contracts\Repositories\PostRepository::class)
          ->needs(\App\Repositories\PostRepositoryEloquent::class)
          ->give(function () {
              // code
          });

$this->app->when(\App\Contracts\Repositories\PostRepository::class)
          ->needs(\App\Repositories\NewRepositoryEloquent::class)
          ->give(function () {
              // code
          });
```
## Resolving
Bạn có thể sử dụng `make` để resolve(lấy ra instance) 1 class hay 1 interface ra khỏi Container. Phương thức `make` nhận tên class hay tên interface bạn muốn resolve. Ta có ví dụ sau:
```PHP
class A {
    public $b;
    public function __construct(B $b) {
        $this->b = $b;
    }
}
class B {
    public $c;
    public function __construct(C $c) {
        $this->c = $c;
    }
}
class C 
{
    public $d;
    public function __construct(D $d)
    {
        $this->d = $d;
    }
}

class D
{
    //code
}
```
Khi bạn khởi tạo đối tượng A `$a = new A() `thì hệ thống sẽ báo lỗi <br>
`Argument 1 passed to A::__construct() must be an instance of B, none given,...`
Ta cũng thấy dễ hiểu bởi vì class A phụ thuộc vào class B, B lại phụ thuộc vào C, C lại phụ thuộc vào D. Để không bị lỗi chúng ta phải khai báo như sau : `$a = new A(new B(new C(new D())))` (khoc) nhìn mắc mệt luôn. Nhưng không sao trong Laravel chúng ta sẽ sử dụng `App::make` thì Service Container trong Laravel sẽ tự động phân giải các dependency của class A và giúp chúng ta khởi tạo đối tượng `$a` một cách đúng đắn.
```PHP
$a = App::make('A');
```
Trở lại ví dụ mà dùng Repository ở trên nhá. Nếu như ta không đăng ký trong `AppServiceProvider.php` thì chúng ta phải khởi tạo chúng như sau:
```PHP
App::bind(\App\Contracts\Repositories\PostRepository::class, \App\Repositories\PostRepositoryEloquent::class);

$category = App::make('PostRepository');
//hoac
$category = $this->app->make('PostRepository');
//hoac
$category = resolve('PostRepository');
```

# 3. Kết luận
Sau một vài những chia sẻ về `Service Container` thì mình mong rằng các bạn một phần nào cũng hiểu được về nó. Cảm ơn anh em đã đọc bài chia sẻ của mình.
# 4. Tham khảo
https://laravel.com/docs/5.6/container<br>
https://viblo.asia/p/laravel-beauty-tim-hieu-ve-service-container-3KbvZ1wLGmWB<br>
https://toidicodedao.com/2015/11/03/dependency-injection-va-inversion-of-control-phan-1-dinh-nghia/