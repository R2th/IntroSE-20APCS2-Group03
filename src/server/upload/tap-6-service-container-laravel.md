Chào mừng các bạn đã quay trở lại với mình cùng series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)". Tập hôm nay mình sẽ nói về một trong những khái niệm kiến trúc (Architecture concepts) của Laravel đó chính là "Service container". 

Achitecture concepts của Laravel là những khái niệm hoàn toàn mới, có thể bạn chưa tiếp xúc bao giờ nên sẽ rất khó hiểu. Thông thường bài này là ở Laravel nâng cao nhưng mình vẫn để ở tập này vì một phần nào đó nó sẽ giúp Laravel gần hơn với bạn. Việc hiểu biết về service container sẽ là một thế mạnh giúp bạn có thể xây dựng một ứng dụng tuyệt vời. 

> **Khuyến cáo:** Đây là một trong những phần Laravel nâng cao, chính vì thế sẽ gây khó hiểu, mất nghị lực, quyết tâm khi học. Mình khuyên bạn hãy đọc một lần, nếu thấy không thể tiếp thu thì có thể bỏ qua.  

# I. Khái niệm service container (Service container conception)
Trước tiên tìm hiểu về service container thì các bạn hãy hiểu hai thuật ngữ "dependency" và "dependency injection" trước đã. Mới đọc xong câu này chắc các bạn rất hụt hẫng khi chẳng biết nó là cái quái gì cả đúng không? Vì đây là các thuật ngữ trong lập trình nên dù có Google translate cũng vô cùng khó hiểu. "Dependency" nghĩa là "phụ thuộc", "dependency injection" nghĩa là "tiêm phụ thuộc", nghe xong lại càng mơ hồ. Chính điều đó, để giải thích hai thuật ngữ này mình sẽ làm example sau để các bạn có thể hình dung được nghĩa của nó.

Chẳng hạn mình có một file PHP với nội dung sau:

```PHP
<?php

class Health {}
class Money {}
class Happy {}

class SuccessfulPeople
{    
    public function __construct()
    {
        new Health();
        new Money();
        new Happy();
    }
}

new SuccessfulPeople();
```
Để trở thành một người thành công, bạn cần phải có sức khỏe, tiền bạc và hạnh phúc. Dựa vào đoạn code trên, class `SuccessfulPeople` sẽ phụ thuộc vào các class `Health`, `Money` và `Happy`. Nhưng thay vì khởi tạo các class đó bên trong `People` thì ta sẽ "tiêm" chúng thông qua phương thức `__construct` hoặc `setter`. 

```PHP
<?php

// ...

class SuccessfulPeople
{    
    public $health, $money, $happy;

    public function __construct(Health $health, Money $money, Happy $happy)
    {
        $this->health = $health;
        $this->money = $money;
        $this->happy = $happy;
    }
}

new SuccessfulPeople(new Health(), new Money(), new Happy());
```

Các khởi tạo class `Health`, `Money` và `Happy` là điều kiện để class `People` hoạt động, đó chính là các "class dependency". Và phương thức truyền cái object đó thông qua `__construct` hay `setter` thì gọi là "dependency injection".

Trước khi tiếp tục mình xin nói về một thuật ngữ nữa, đó là là "type-hint". Hiểu đơn giản nó chính là từ khóa đứng trước biến khi inject dependency vào các method. Như ở đoạn code trên, tại method `__construct` chúng ta nhận ba tham số, mỗi tham số đều có các "type-hint" đứng trước, đại diện cho việc hiểu tham số đó chính là class tương ứng với tên của "type-hint".

Nhưng tại sao lại dùng cơ chế dependency injection? Mình sẽ sử dụng lại example trên để nêu ra lợi ích của cơ chế này. Bây giờ mình muốn lấy thông tin về tài sản mà người đó có được. Thì nếu như chưa áp dụng dependency injection thì đoạn code sẽ như thế này:

```PHP
<?php

// ...

class SuccessfulPeople
{    
    public function __construct()
    {
        new Health();
        new Money();
        new Happy();
    }
    
    public function getMoney()
    {
        return new Money();
    }
}

$people = new SuccessfulPeople();
$people->getMoney();
```

Như quan sát, để đáp ứng yêu cầu trên ta phải khởi tạo object `Money` hai lần. Nhưng với dependency injection thì lại khác:
```PHP
<?php

// ...

class SuccessfulPeople
{    
    public $health, $money, $happy;

    public function __construct(Health $health, Money $money, Happy $happy)
    {
        $this->health = $health;
        $this->money = $money;
        $this->happy = $happy;
    }
    
    public function getMoney()
    {
        return $this->money;
    }
}

$people = new SuccessfulPeople(new Health(), new Money(), new Happy());
$people->getMoney();
```

Ta chỉ khởi tạo `Money` một lần duy nhất và lưu nó vào trong `public $money`, chính vì thế nó vẫn đáp ứng được yêu cầu.

> Tóm lại, cơ chế dependency injection chúng ta phải tuân thủ 2 điều kiện thiết yếu:
> 1. Các class dependency được truyền qua phương thức `__construct` hoặc `setter`.
> 2. Trong class chính phải có biến lưu trữ các class dependency để dễ dàng gọi trong các method.

Vậy service container trong Laravel chính là công cụ hữu ích để quản lý các class dependency và depedency injection.

# II. Binding
Đây là một thuật ngữ trong Laravel, "binding" được hiểu là dùng để đăng ký một class hay interface trong service container. Việc binding này thường được code ở các file service provider trong thư mục `app/Provider` tại method `register`.

> **Chú ý:** Bắt đầu từ đây với mỗi code example, mình không sử dụng lại nội dung phía trước nên mỗi khi qua một ví dụ mới, bạn nên đưa các file đã thay đổi ở ví dụ trước đó về trạng thái ban đầu để tránh lỗi code. Chân thành cảm ơn!

## 1. Khái niệm cơ bản binding (Bindings basic)

Trong một file service provider, bạn luôn có quyền truy cập đến container thông qua thuộc tính `$this->app`.

### a. Binding simple
Chúng ta có thể bind đơn giản bằng cách sử dụng method `bind`, truyền tên class hoặc interface chúng ta mong muốn đăng ký cùng với một Closure trả về lớp được khởi tạo.

Các bạn mở file `app/Providers/AppServiceProvider.php` lên và viết đoạn code này trong method `register`:

```PHP:providers/AppServiceProvider.php
$this->app->bind('MyUser', function($app) {
    return new \App\User;
});
```

> **Chú ý:** Tại Closure, có thể nhận tham số `$app` để có thể truy cập các thuộc tính của object `App`.

**Trong đó:** `MyUser` chính là tên class thay thế mình mong muốn cho `\App\User` (đây là namespace class của file `app/User.php`).

Để kiểm chúng cho việc đã binding thành công chưa, các bạn mở file `routes/web.php` và sửa lại code như thế này:
```PHP:routes/web.php
Route::get('/', function () {
    dd(app()); // Dòng code để kiểm chứng việc đã bind thành công 
});
```
Về dòng code kiểm chứng, đại loại nó sẽ dump object `App` để ta có thể quan sát các thuộc tính của nó.

Bây giờ các bạn nạp server và chạy đường dẫn http://localhost:8000, tại đây các bạn quan sát tại thuộc tính `bindings` trong object `App`:

![](https://images.viblo.asia/d2c17ceb-c7a5-49ad-a0c1-54eb47b4768f.png)

Như vậy là ta đã bind thành công rồi đấy.


### b. Binding a singleton
Giống như tên của nó, phương thức bind này khai báo với Laravel rằng khi khởi tạo class này thì chỉ một lần duy nhất, những yêu cầu khởi tạo kế tiếp trong cùng một request chỉ trả lại object đã tạo lần đầu.

Các bạn sẽ hiểu rõ hơn khi quan sát mô hình so sánh này:

![](https://images.viblo.asia/77f42b7e-af7a-49ad-a4cb-98d83d9667ff.JPG)

Để thực hiện bind singleton cũng rất đơn giản, bạn chỉ việc thay thế `bind` thành `singleton` như thế này:

```PHP:app/Providers/AppServiceProvider.php
$this->app->singleton('MyUser', function($app) {
    return new \App\User;
});
```

Bây giờ để kiểm tra xem có đúng là singleton chỉ tạo được duy nhất một object dù cho có yêu cầu khởi tạo nhiều lần hay không thì bạn chỉnh sửa code ở file `routes/web.php`:

```PHP:routes/web.php
Route::get('/', function () {
    dd([
        app()->make('MyUser'),
        app()->make('MyUser')
    ]);
});
```

Dòng `app()->make('MyUser')` dùng để khởi tạo class `MyUser` vừa mới được bind ở phía trên theo phương thức `singleton`, cái này chỉ dùng để test nên bạn không cần phải hiểu bây giờ dòng này đâu nhé! Ở đây mình gọi hai lần để xem nó có trả về cùng một object hay không.

Nạp server chạy lại và đây là kết quả:

![](https://images.viblo.asia/0f7746da-079b-485c-8742-830453f6f0bd.JPG)

Dù gọi hai lần như nó vẫn trả về cùng một object, đó chính là `singleton`.

### c. Binding instances
Đây chẳng qua là một biến tấu của `singleton`. Nó cũng sẽ trả về một object duy nhất dù có gọi bao nhiêu lần, nhưng object khởi tạo đầu tiên không phải ở trong Closure mà là ở ngoài, nằm ở trước bind `instance`.

```PHP:app/Providers/AppServiceProvider.php
$user = new \App\User; // Khởi tạo object lần đầu

$this->app->instance('MyUser', $user);
```
Khác với `bind` và `singleton`, phương thức `instance` chỉ nhận tham số thứ hai là một object chứ không phải là Closure nữa.

Bây giờ vẫn giữ nguyên đoạn code kiểm chứng và chạy lại:

![](https://images.viblo.asia/db849a7e-ccc9-48d6-b0b4-37adc64bd4d1.JPG)

Nó vẫn trả về cùng một object giống như `singleton`. Việc sử dụng `instance` sẽ giúp bạn linh hoạt hơn trong việc binding.

### d. Binding primitives
Có thể nói đây là cách mà ta có thể tự động inject các dependency vào trong class. Nhìn vào đoạn code dưới đây:

```PHP:app/Providers/AppServiceProvider.php
$this->app->when('App\User')
          ->needs('$id')
          ->give(1);
```

**Trong đó:**
* `when` chứa tham số namespace class nhận dependency, có thể nhận mảng. 
    Ở đây là class `App\User` của file `app/User.php`
* `needs` chứa tên biến hoặc  class
* `give` chứa giá trị của `needs`, có thể là Closure (trong trường hợp muốn gán giá trị là một object class...)

Tiếp theo các bạn mở file `app/User.php` và thêm đoạn code này vào dưới cùng:
```PHP:app/User.php
public function __construct($id) 
{
    echo $id;
}
```

Ngay tại `__construct`, chúng ta đã thêm tham số `$id` để nhận dependency từ phía binding primitives.

Để kiếm chứng, tại `routes/web.php`, các bạn sửa code thành như này:
```PHP
Route::get('/', function() {
    app()->make('App\User');
});
```

Bây giờ nạp server và xem kết quả:

![](https://images.viblo.asia/b0abd954-e4b7-4655-8851-72ad640fd2c4.JPG)

Một ví dụ thực tế cho phương thức này đó chính là giả sử bạn đang làm một dự án chia sẻ hình ảnh, video trực tuyến cho người dùng. Bạn muốn ảnh đại diện của người dùng thì được lưu tại máy chủ, còn video và ảnh khác thì lưu tại Amazon S3. Đây chính là lúc binding primitives thể hiện khả năng của mình.

```PHP
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\VideoController;
use Illuminate\Contracts\Filesystem\Filesystem;

$this->app->when(AvatarController::class)
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('local');
          });

$this->app->when([PhotoController::class, VideoController::class])
          ->needs(Filesystem::class)
          ->give(function () {
              return Storage::disk('s3');
          });
```

Bạn không cần hiểu quá chi tiết về đoạn code trên, vì chúng ta chỉ mới bắt đầu. Bạn chỉ cần hiểu cho mình thể này:
* Khi class `AvatarController` được gọi thì nó sẽ được inject một dependency với giá trị là một object `Storage::disk('local')` tại type-hint là `Filesystem` để có thể thao tác lưu trữ tại server.
* Khi class `PhotoController` hoặc `VideoController` được gọi thì nó sẽ được inject một dependency với giá trị là một object `Storage::disk('s3')` tại type-hint là `Filesystem` để có thể thao tác lưu trữ tại Amazon S3.

## 2. Binding interfaces to implementations.
Đây là một công cụ mạnh mẽ trong service container. Bạn còn nhớ nội dung file `bootstrap/app.php` hôm trước chứ. Tại nhiệm vụ bind các interface quan trọng, các binding dưới đây là một ví dụ cụ thể cho cơ chế này:

```PHP:bootstrap/app.php
$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
```
Nói dễ hiểu, cơ chế này có thể bind một interface cho một implementation cụ thể.

Chẳng hạn chúng ta có một interface `Logger` và một implementation `ErrorLogger`.

```PHP
$app->singleton(
    Interface\Logger::class,
    ErrorLogger::class
);
```
Đoạn code trên nói cho container biết rằng nó phải inject interface `Logger` như một dependency cho implementation `ErrorLogger`. Bây giờ chúng ta có thể type-hint interface `Logger` tại `__construct` của implementation `ErrorLogger`:

```PHP
use Interface\Logger;

class ErrorLogger
{
    public function __construct(Logger $logger)
    {
        // 
    }
}
```

## 3. Tagging
Có thể từ này đã quá quen thuộc với rất nhiều bạn rồi. Nó là từ đại điện cho một nhóm có nội dung, đặc điểm hay tính chất chung. Chẳng hạn `ErrorReport`, `MemoryReport`, `ActiveReport` đều có thẻ chung là `Report`. 

Mình sẽ lấy dẫn chứng ở trên để đưa vào code. Chúng ta sẽ sử dụng method `tag` để nhóm các binding lại với nhau. 
```PHP
$this->app->bind('ErrorReport', function () {
    //
});

$this->app->bind('MemoryReport', function () {
    //
});

$this->app->bind('ActiveReport', function () {
    //
});

$this->app->tag(['ErrorReport', 'MemoryReport', 'ActiveReport'], 'reports');
```



**Trong đó:**
* Tham số thứ nhất là các thành phần binding.
* Tham số thứ hai là tên thẻ.

Bây giờ chúng ta sẽ inject chúng vào class `ReportAggregator`:

```PHP
$this->app->bind('ReportAggregator', function ($app) {
    return new ReportAggregator($app->tagged('reports'));
});
```

Để lấy các dependency từ tagging, chúng ta sử dụng method `tagged` với tham số duy nhất là tên của thẻ.

## 4. Extending binding
Đây là một cơ chế cho phép thay đổi một service đã được khởi tạo. Method `extend` có thể nhận Closure làm tham số cho việc thêm code.

Bây giờ chúng ta tiến hành thử nghiệm. Mình sẽ sử dụng file `app/User.php` có sẵn và tạo thêm một model `DecoratedUser` nữa bằng lệnh Artisan:

> php artisan make:model DecoratedUser

Các bạn mở file `app/DecoratedUser.php` vừa tạo lên và thêm đoạn code này vào dưới cùng:
```PHP:app/DecoratedUser.php
protected $user;

public function __construct(User $user)
{
    $this->user = $user;
}

public function decoratedTest()
{
    return 'Decorated: ' . $this->user->test();
}
```

Tại file `app/User.php`, bạn viết thêm method `user` như sau:
```PHP:app/User.php
public function test()
{
    return "test() method of User class";
}
```

Giờ mới là phần chính, mở file `app/Providers/AppServiceProvider.php` và code đoạn extend tại method `register`:
```PHP:app/Providers/AppServiceProvider.php
$this->app->extend('App\User', function($user) {
    return new \App\DecoratedUser($user);
});
```

Cuối cùng để kiểm chứng, tại `routes/web.php` các bạn sửa thành đoạn code sau:

```PHP:routes/web.php
Route::get('/', function() {
    return app()->make('App\User')->decoratedTest();
});
```

Chúng ta sẽ có kết quả như thế này:

![](https://images.viblo.asia/608965e0-170e-4b21-b1ae-aad3719db94d.JPG)

> Với kết quả như thế này các bạn thử đoán xem `app()->make('App\User')` sẽ trả về object `App\User` hay `App\DecoratedUser`? 

Đáp án đó chính là object `App\DecoratedUser`. Nếu bạn không tin có thể thay `app()->make('App\User')->decoratedTest()` thành `app()->make('App\User')->test()` xem, chắc chắn sẽ xuất hiện một lỗi như này:

![](https://images.viblo.asia/49d08ac9-40f4-4aef-a17d-83c545830490.JPG)

Đây là bằng chứng cho việc `app()->make('App\User')` trả về object `App\DecoratedUser`. Vậy nếu ứng dụng bạn đòi hỏi  `app()->make('App\User')` vừa có thể gọi method `decoratedTest` trong `App\DecoratedUser` vừa có thể gọi `test()` trong `App\User` thì phải giài quyết như thế nào?

Rất đơn giản, bạn chỉ cần cho class `App\DecoratedUser` extend với class `App\User` là ok.

```PHP:app/DecoratedUser.php
// ...

use App\User;

class DecoratedUser extends User
{

// ...
```

Bây giờ chắc chắn chúng ta đã có thể thực thi câu lệnh `app()->make('App\User')->test()` rồi đấy.

Ngoài ra, trong tham số Closure của method `extend`, ngoài nhận biến chứa binding thì nó còn nhận biến thứ hai đó là `$app` giúp chúng ta có thể linh hoạt trong quá trình code.

```PHP
$this->app->extend('App\User', function($user, $app) {
    //
});
```

> **Lưu ý:** Trong trường hợp binding mà không thể tham chiếu tới `$app`, bạn có thể sử dụng hàm app() (một trong những global helper function, mình sẽ nói vấn đề này ở những tập sau) để thay thế. Ta có thể áp dụng cách này cho cả binding và resolve.

Chẳng hạn thay vì:
```PHP
$this->app->bind('MyUser', function() {
    // 
});
```
Ta có thể sử dụng `app()` để thay thế nếu không thể tham chiếu tới `$app`:
```PHP
app()->bind('MyUser', function() {
    //
});
```
# III. Resolving
Phương thức này dùng để khởi tạo các class đã được bind hoặc lấy các object đã được khởi tạo từ binding a singleton hoặc binding intances.

## 1. Một số cách resovle (Some resolve ways)
Bạn có thể sử dụng method `make` để resolve một class trong container:

```PHP
$this->app->make('App\User');
```

hoặc dùng global helper function `app()` để resolve:

```PHP
app()->make('App\User');
```

Cách này giống như dòng code kiểm chứng mà mình để cập ở phần trên. 

Ngoài ra bạn có thể sử dụng một global helper function nữa là `resolve()` để làm thao tác này.

```PHP
resolve('App\User');
```

Trong quá trình code, đôi khi bạn không thể tham chiếu đến `$app`, nên hãy tùy biến trong ngữ cảnh mà sử dụng các cách khác nhau.

Laravel cung cấp cho chúng ta method `makeWith` để truyền tham số cho class khi resolve.

```PHP
$this->app->makeWith('App\User', ['id' => 1])
```
**Trong đó:** 
* Tham số thứ nhất là class cần resolve
* Tham số thứ hai là một mảng với các dữ liệu cần inject (không thể truyền object)

Tại file `app/User.php` để nhận tham số, ta chỉ cần thêm biến ở method `__construct`:

```PHP
public function __construct($id)
{
    //
}
```

## 2. Automatic injection
Đây mà một cơ chế hữu ích và quan trọng trong quá trình code, vì hầu như bạn luôn gặp nó khi code ở bất cứ phần nào, bao gồm controller, middleware, event listener...

Với cơ chế tự động inject này, bạn có thể inject một class dependency bất kỳ ở tất cả các method bằng cách truyền tham số biến cùng với "type-hint" namespace class.

Dưới đây là đoạn code mẫu của một file controller có sử dụng automatic injection:
```PHP
<?php

namespace App\Http\Controllers;

use App\Users\Repository as UserRepository;

class UserController extends Controller
{
    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }
}
```
Như vậy khi route thực thi controller thì container sẽ tự động inject class dependency `UserRepository` cho method `__construct` của `UserController`.

Ta có thể áp dụng cơ chế này cho cả method `handle` của queued jobs (sẽ tìm hiểu ở các tập sau).

# IV. Container events
Service container sẽ kích hoạt một sự kiễn mỗi khi ta resovle một object. Để có thể bắt sự kiện đó, ta chỉ cần sử dụng method `resolving`:

```PHP
$this->app->resolving(function ($object, $app) {
    // Được gọi khi resolve bất kỳ object nào
});

$this->app->resolving(App\User::class, function ($user, $app) {
    // Được gọi khi resolve object với class là "App\User"
});
```

Cơ chế này giúp bạn tùy biến thêm cho ứng dụng, cho phép bạn bổ sung thêm thuộc tính gì đó trước khi trả về object cần resolve.

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ