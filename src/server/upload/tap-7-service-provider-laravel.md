Rất vui được gặp lại các bạn và cảm ơn đã đồng hành cùng với mình trong các tập trước. Và ngày hôm nay, mình sẽ nói về "Service provider", đây cũng là một trong những khái niệm cấu trúc của Laravel. Nếu bạn nào đã hiểu rõ về "Service container" ở tập trước thì mình tin chắc rằng nội dung ngày hôm nay sẽ không làm khó được bạn. Trong tập này bạn sẽ học được cách làm thể nào để viết cũng như đăng ký một service provider cho ứng dụng.

> **Khuyến cáo:** Đây là một trong những phần Laravel nâng cao, chính vì thế sẽ gây khó hiểu, mất nghị lực, quyết tâm khi học. Mình khuyên bạn hãy đọc một lần, nếu thấy không thể tiếp thu thì có thể bỏ qua.  

# I. Giới thiệu (Introduction)
Service provider là trung tâm của tất cả các bootstrapping trong ứng dụng Laravel. Các service của riêng bạn hay tất cả các service cốt lõi của Laravel đều được bootstrap thông qua nó. Nói "bootstrap" mấy bữa giờ nhưng chúng ta vẫn chưa biết nó thực thi gì cả. Trong Laravel, "bootstrap" có nghĩa là đăng ký mọi thứ, bao gồm đăng ký các service container binding, envent listener, middleware và route... Service provider còn được biết là trung tâm cấu hình cho ứng dụng của bạn.

Nếu bạn mở file `config/app.php` thì bạn sẽ thấy một mảng `providers`, tại đây chứa tất cả các lớp service provider sẽ được load cho ứng dụng. Chú ý rằng một trong số đó là các "deferred" provider (provider "hoãn lại"), điều này có nghĩa các provider này sẽ không được load trong mỗi request mà chỉ khi nào cần đến chúng.

# II. Viết các service provider (Writing service providers)

Tất cả các service provider đều kế thừa class `Illumination\Support\ServiceProvider` và chứa hai method `register` và `boot`. Hai method này chính là hai chốt chặn "Register service providers" và "Bootstrap service providers" mà mình đã nói ở trong [tập 5](https://viblo.asia/p/tap-5-vong-doi-request-laravel-request-lifecycle-laravel-LzD5dwqOljY).

Để tạo một provider mới là `TestServiceProvider` chẳng hạn, bạn chỉ cần việc chạy lệnh Artisan:

> php artisan make:provider TestServiceProvider

## 1. Phương thức "register" (The "register" method)

Trong method `register`, chúng ta chỉ nên thực hiện công việc là bind đến container. Các bạn không nên cố đăng ký bất kỳ một event listener, route hoặc bất kỳ chức năng nào khác. Bởi vì trong quá trình thực thi một chức năng nào đó ngoài việc binding thì bạn có thể vô tình sử dụng một service provider nào đó mà chưa được load.

Trong bất cứ method của service provider, bạn luôn có quyền truy cập đến `$app`.

```PHP
public function register()
{
    $this->app->singleton('App\User', function() {
        //
    });
}
```
Về binding service container thì mình sẽ không đề cập đến nữa vì đã nói rất chi tiết ở tập trước rồi.

## 2. Thuộc tính "bindings" và "singletons" (The "bindings" and "singletons" properties)

Nếu trong method `register` có quá nhiều simple binding, bạn có thể sử dụng thuộc tính `bindings` và `singletons` để thay thế cho việc `bind` hay `singleton` thủ công.

Ví dụ như bạn có đoạn binding service container như sau:

```PHP
public function register()
{
    $this->app->bind(User:class, function() {
        return new \App\User;
    });

    $this->app->singleton(Post:class, function() {
        return new \App\Post;
    });
}
```

Thì bạn có thể làm như sau:
```PHP
// ...

use Illuminate\Support\ServiceProvider;

class TestServiceProvider extends ServiceProvider
{
    public $bindings = [
        User::class => \App\User::class,
        //
    ];
    
    public $singletons = [
        Post::class => \App\Post::class,
        //
    ];
    
    public function register()
    {
        //
    }
    
// ...
```

## 3. Phương thức "boot" (The "boot" method)

Trong method `boot` này, bạn đã có thể gọi tất cả các service provider (ngay cả ở những file provider khác) đã đăng ký trước đó.

```PHP
public function boot()
{
    $this->app->make('App\User');
}
```

Ngoài ra ở method `boot`, bạn có thể inject dependency, container sẽ tự động inject bất kỳ class nào mà bạn khai báo.

```PHP
use App\User;

public function boot(User $user)
{
    //
}
```

# III. Đăng ký các provider (Register providers)

Tất cả các provider đều được đăng ký ở file `config/app.php`, cụ thể hơn là tại mảng `providers`. Các provider cốt lõi của Laravel mặc định đã được liệt kê ở đây sẵn. Để đăng ký provider do bạn tạo ra, bạn có thể liệt kê nó như thế này:

```PHP:config/app.php
'providers' => [
    // ...

    // Other Service Providers
    App\Providers\TestServiceContainer::class,
],
```

# IV. Deferred providers
Như đã nói ở trên, deferred provider sẽ không được load sau mỗi request mà chỉ khi nào có yêu cầu resolve  thì mới load chúng.

Để defer một provider, bạn chỉ cần implement class `\Illuminate\Contracts\Support\DeferrableProvider` cho provider và khởi tạo method `providers`. Method này trả về một mảng chứa các class cần defer.

```PHP
// ...
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Support\DeferrableProvider;

class TestServiceProvider extends ServiceProvider implements DeferrableProvider
{
    public function register()
    {
        $this->app->singleton('User', function() {
            return new \App\User;
        });
    }
    
    public function providers()
    {
        return [
            User::class,
            //
        ];      
    }
    
// ...
```

----

Cảm ơn các bạn đã quan tâm theo dõi. Cùng đồng hành với mình qua những tập tiếp theo tại series "[Hành trình chinh phục Laravel Framework](https://viblo.asia/s/hanh-trinh-chinh-phuc-laravel-framework-nB5pXJDG5PG)" nhé! Chúc may mắn và hẹn gặp lại.

> Mình đang xây dựng blog riêng là [lechihuy.dev ](https://lechihuy.dev), mong các bạn ghé sang ủng hộ, mình cảm ơn rất nhiều ạ