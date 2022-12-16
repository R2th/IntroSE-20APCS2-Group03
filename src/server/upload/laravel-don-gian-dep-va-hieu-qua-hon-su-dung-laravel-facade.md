# 1. Giới thiệu
Có thể nói Laravel là một framework PHP phổ biến số 1 hiện nay vì:
- Cú pháp đơn giản, dễ bắt đầu ngay cả với người mới làm quen Laravel, bạn sẽ thấy thực sự dễ hiểu và thực hành được ngay.
- Framework Laravel là tổng hợp của rất nhiều các gói thư viện tốt nhất, các thành phần này có thể được viết bởi nhóm phát triển Laravel hoặc từ các framework khác. Đặc biệt, Laravel cũng lấy khá nhiều các ý tưởng từ các ngôn ngữ lập trình khác như .NET, Java cũng như các IDE tiên tiến như Visual Studio. Bởi vì Taylor Otwell, người tạo ra Laravel đã từng có rất nhiều năm kinh nghiệm trong lập trình .NET.

# 2. Laravel Facade là gì?
Sở dĩ chúng ta có tiêu đề “Laravel đơn giản, đẹp và hiệu quả hơn sử dụng Laravel Facade”, đúng vậy bạn đã bắt đầu ngay với các khái niệm ở thượng tầng hệ thống một cách rất dễ hiểu, nhưng bạn không ngờ tới rằng mình sử dụng Laravel Facade rất nhiều. Ví dụ, khái niệm đầu tiên khi làm quen với Laravel là Laravel Route, bạn sẽ thấy ngay một route được định nghĩa sẵn trong routes\web.php:
```
    Route::get('/', function () {
        return view('welcome');
    });
```

Route ở đây chính là một Laravel Facade và get() là một phương thức của Facade Route.

Facade là một chủ đề hot trong cộng đồng Laravel, Facade là một phần không thể thiếu của Laravel, không có nó Laravel không thể trở thành một framework PHP phổ biến như hôm nay. Laravel Facade có những điểm mà rất nhiều người thắc mắc:

- Thứ nhất, Laravel Facade có tên giống một mẫu lập trình (Design Pattern) rất hay dùng là Facade Pattern, tuy nhiên khi làm việc sâu hơn bạn sẽ thấy nó tương đồng hơn với Proxy Pattern (cũng có một số ý kiến rằng ở một góc độ khác nó giống với Adapter Pattern hoặc Decorator Pattern). Laravel Facade là một thành phần trong framework, nó không phải là một pattern và Laravel Facade áp dụng nhiều các pattern để tạo ra một thư viện rất tuyệt vời.
- Thứ hai, các phương thức của Laravel Facade được gọi giống như các phương thức static với việc sử dụng toán tử phạm vi :: để gọi phương thức. Nhưng không phải vậy, bên trong nội tại Facade sử dụng magic method __callStatic(), một phương thức được xây dựng sẵn trong các đối tượng được thực hiện khi có một lời gọi phương thức static đến class. 

# 3. Laravel Facade hoạt động như thế nào?
## 3.1 __callStatic là mấu chốt của Laravel Facade
Các thành phần trong Laravel được lưu trữ trong một container, ta có thể tưởng tượng nó là một cái hộp lớn lưu trữ toàn bộ các service. Các service này chỉ được tạo ra instance một lần và chỉ tạo ra khi cần dùng đến, tức là bạn không cần khởi tạo các dịch vụ này, nó tự động hoàn toàn. 
Chúng ta cùng tìm hiểu xem cách Laravel Facade sử dụng container như thế nào?

Xét ví dụ về Route ở mục 2, nó gọi đến phương thức get() theo cách gọi một phương thức static, nhưng không vì thế Laravel Facade tương đồng với Proxy Pattern, nó sử dụng magic method __callStatic() để làm một bức tường chắn phía trước (proxy) để thực hiện các phương thức của lớp. Khi chúng ta gọi phương thức get(), Facade sẽ lấy các service liên quan trong container và trả về một instance, do vậy nó có thể thực thi được phương thức của class tương ứng. Chính vì thế cách viết code sau là cùng kết quả với ví dụ đầu.
```
    $app->router->get('/', function () {
        return view('welcome');
    });
```

Đến đây, ta thấy rõ cú pháp của Laravel đã đơn giản, dễ đọc hơn khi áp dụng Laravel Facade. Tuy nhiên, một câu hỏi chưa được trả lời “Laravel Facade hoạt động như thế nào?”. 

Khi bạn gọi Route::get() thì Route là một cái tên ngắn (alias) cho tên lớp đầy đủ Illuminate\Support\Facades\Route. Thiết lập này được thực hiện trong file cấu hình config\app.php trong mảng aliases:
```
    'aliases' => [
    ...
        'Route' => Illuminate\Support\Facades\Route::class,
    ...
    ],
```

Như vậy, khi bạn thực hiện Route::get() thì thực ra là bạn gọi đến Illuminate\Support\Facades\Route::get(). Chúng ta sẽ đi sâu hơn vào framework để hiểu cách hoạt động của Laravel Facade, class Illuminate\Support\Facades\Route được lưu trữ trong file vendor\laravel\framework\src\Illuminate\Support\Facades\Route.php, mở file này chúng ta thấy các Facade có chung một phương thức getFacadeAccessor:

```
    namespace Illuminate\Support\Facades;
    class Route extends Facade
    {
        /**
         * Get the registered name of the component.
         *
         * @return string
         */
        protected static function getFacadeAccessor()
        {
            return 'router';
        }
    }
```

Các class này đều được mở rộng từ class cơ bản Facade, như ở trên đã nói thì các phương thức của Facade được gọi theo kiểu phương thức static do đó khi gọi nó sẽ thực hiện magic method __callStatic() của class. Như vậy, phương thức __callStatic của class Facade chính là nơi xử lý các lời gọi phương thức kiểu như Route::get().
```
    namespace Illuminate\Support\Facades;
    abstract class Facade {
    ...
        public static function __callStatic($method, $args)
        {
            $instance = static::getFacadeRoot();
            if (! $instance) {
                throw new RuntimeException('A facade root has not been set.');
            }
            return $instance->$method(...$args);
        }
    ...
    }
```

Laravel sử dụng spread operator (toán tử …) từ phiên bản Laravel 5.0 trở đi, với các phiên bản cũ hơn, phương thức __callStatic() được thực hiện như sau:
```
    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();
        switch (count($args))
        {
            case 0:
                return $instance->$method();

            case 1:
                return $instance->$method($args[0]);

            case 2:
                return $instance->$method($args[0], $args[1]);

            case 3:
                return $instance->$method($args[0], $args[1], $args[2]);

            case 4:
                return $instance->$method($args[0], $args[1], $args[2], $args[3]);

            default:
                return call_user_func_array(array($instance, $method), $args);
        }
    }
```

Chúng ta thấy dù là theo cách nào, tại đây Facade sẽ lấy một instance tương ứng với class và thực hiện gọi đến phương thức với việc truyền vào cả các tham số.
## 3.2 Sử dụng IoC Container
Inversion of Control(IoC), để hiểu được IoC là gì chúng ta xét vấn đề sau trong lập trình: "Một class A phụ thuộc vào một service hoặc một component là những lớp cụ thể (concrete class) trong lúc chạy ứng dụng".
![](https://images.viblo.asia/3b524d43-7c70-4654-a05f-17da29569833.png)

Một số vấn đề gặp phải:
   - Nếu thay thế hoặc cập nhật các phụ thuộc, chúng ta cần thay đổi mã nguồn của class.
   - Các lớp cụ thể của một phụ thuộc có thể dùng được trong thời gian chạy hay không?
   - Các class như vậy không tách biệt và rất khó cho unit test bởi chúng phụ thuộc trực tiếp, như vậy các phụ thuộc không thể thay thế bởi các stub hoặc mock trong test.
   - Các class cần phải viết những đoạn mã cho việc tạo, tìm kiếm và quản lý các phụ thuộc.

**Nguyên lý Inversion of Control để giải quyết vấn đề trên, nó ủy quyền thực hiện việc lựa chọn các class cụ thể cho một component ở ngoài. Thực hiện nguyên lý này có hai pattern hay được sử dụng là Service Locator và Dependency Injection**. Dưới đây là hai cách thực hiện nguyên lý trên.

Service Locator:
![](https://images.viblo.asia/8b5fbbe7-b7d4-4ec5-ac84-d0840793aca1.png)
Dependency Injection:
![](https://images.viblo.asia/69b134d5-a7e8-4fe7-807d-43e8bd9d4ca0.png)

Các khái niệm này bạn có thể tự tìm hiểu thêm, quay trở lại với Laravel Facade, nó sử dụng một IoC Container hay chính là một trong hai pattern trên, ở đây Laravel sử dụng IoC Container là Service Locator.

Container này đơn giản là một lưu trữ kiểu key-value để tìm ra thực thể của class cần sử dụng. Trong luồng hướng đối tượng, việc gán tĩnh các object được thay thế bởi builder object, nó sẽ đưa ra các object ở runtime (thông thường là tạo đối tượng ngay, nhưng ở đây sẽ tạo đối tượng trong một lúc nào đó không xác định khi ứng dụng chạy). Với kỹ thuật này, dễ dàng thay thế các đối tượng với các thực thể khác phù hợp. Chúng ta cùng xem một ví dụ về container:

```

    class App {
        private static $instances = [];

        public static function set($name, $instance)
        {
            if (is_string($instance)) {
                $instance = new $instance();
            }

            static::$instances[$name] = $instance;
        }

        public static function get($name)
        {
            $instance = static::$instances[$name];

            if ($instance instanceof Closure) {
                $instance = $instance();
            }

            return $instance;
        }
    }
```
Hai phương thức set và get trong class trên cho phép tương tác với mảng các instance, người dùng có thể thêm hoặc lấy ra các thực thể thông qua tên class. Ví dụ có một class sau:

```
    interface MessageInterface {
        public function greeting();
    }

    class EnglishMessage implements MessageInterface {
        public function greeting() { return 'Hello!'; }
    }

    class VietnameseMessage implements MessageInterface {
        public function greeting() { return 'Xin chào!'; }
    }
```
Khi đó, có thể sử dụng Service Locator như sau:

```
    App::set('message', 'EnglishMessage');

    echo App::get('message')->greeting(); // Hello!
```

Khi muốn thay thế thực thể của EnglishMessage bởi một thực thể của class khác phù hợp, ví dụ như VietnameseMessage, chúng ta chỉ cần thiết lập lại và vẫn thực hiện các phương thức get như bình thường.

```
    App::set('message', 'VietnameseMessage');

    echo App::get('message')->greeting(); // Xin chào!
```

Bạn thấy đấy, phần code thực hiện không bị thay đổi gì, và nó giải quyết vấn đề về phụ thuộc trong lập trình.

Trong Laravel Facade, nó cũng thực hiện tương tự thông qua thuộc tính $resolvedInstance và phương thức resolveFacadeInstance() trong class Facade:
```

    protected static function resolveFacadeInstance($name)
        {
            if (is_object($name)) {
                return $name;
            }

            if (isset(static::$resolvedInstance[$name])) {
                return static::$resolvedInstance[$name];
            }

            return static::$resolvedInstance[$name] = static::$app[$name];
        }
```

# 4. Tạo Laravel Facade riêng trong Laravel 5.4
Đôi khi bạn cần sử dụng lại các đoạn code, các chức năng, bạn hoàn toàn có thể tạo ra một Laravel Facade riêng để sử dụng. Cách tạo một Facade cũng khá đơn giản, chúng ta cùng thực hiện các bước sau:

## Bước 1: Tạo class

Trước hết chúng ta cần có một môi trường đã cài đặt sẵn Laravel, tạo một thư mục FacadeLaravel trong thư mục app của project để lưu trữ các class tạo ra. Tiếp đó tạo một file DemoClass.php trong app\FacadeLaravel với nội dung bạn muốn thực hiện:

```
    namespace App\FacadeLaravel;
    class DemoClass {
        public function demoMethod()
        {
            return 'This is custome Facade demo';
        }
    }
```

Class này rất đơn giản với phương thức demoMethod() trả về dòng chữ ‘This is custome Facade demo’.

## Bước 2: Tạo Service Provider

Service Provider dùng để đăng ký class với framework, sử dụng câu lệnh Laravel Artisan để thực hiện:

```
    $ php artisan make:provider DemoClassServiceProvider
    Provider created successfully.
```
câu lệnh này sẽ tạo ra file DemoClassServiceProvider.php trong thư mục app\Providers, mở file ra và thêm code gắn class.

```

    <?php

    namespace App\Providers;

    use Illuminate\Support\ServiceProvider;
    use App;

    class DemoClassServiceProvider extends ServiceProvider
    {
        /**
         * Bootstrap the application services.
         *
         * @return void
         */
        public function boot()
        {
            //
        }

        /**
         * Register the application services.
         *
         * @return void
         */
        public function register()
        {
            App::bind('democlass', function() {
                return new \App\FacadeLaravel\DemoClass;
            });
        }
    }
```

## Bước 3: Tạo Facade class

Trong bước này chúng ta tạo ra một class DemoClassFacade.php nằm trong thư mục app\Allaravel, class này phải kế thừa từ class Facade.

```
    namespace App\FacadeLaravel;
    use Illuminate\Support\Facades\Facade;
    class DemoClassFacade extends Facade{
        protected static function getFacadeAccessor() { 
            return 'democlass'; 
        }
    }
```

## Bước 4: Thiết lập cấu hình ứng dụng

Service Provider ở bước 2 và lớp DemoClassFacade cần được thiết lập trong file cấu hình của ứng dụng Laravel, các thiết lập này trong file config\app.php:

Thiết lập thứ nhất cho Service Provider, thiết lập thứ hai để alias cho Facade.

```
    'providers' => [
        ...
        App\Providers\DemoClassServiceProvider::class,
        ...
    ],
    'aliases' => [
        ...
        'DemoClass'=> App\FacedeLaravel\DemoClassFacade::class,
        ...
    ],
```

## Bước 5: Sử dụng DemoClassFacade

Mở file routes\web.php và thử sử dụng DemoClassFacade:

```
    Route::get('/', function () {
        $message = DemoClass::demoMethod();
        echo $message;\\ This is custome Facade demo
    });
```

# 5. Lời kết
Laravel Facade là một nội dung nâng cao trong framework Laravel do nó ăn sâu vào trong hệ thống, cái hay của Laravel là cho người dùng mới sử dụng ngay Facade nhưng người dùng không biết gì về khái niệm phức tạp này. Qua bài viết, chúng ta chỉ cần nhớ một số nội dung sau về Laravel Facade:
- Laravel Facade không phải là Facade Pattern một mẫu rất phổ biến trong Design Pattern, nó giống hơn với Proxy Pattern.
- Mấu chốt của Laravel Facade là sử dụng magic method __callStatic() kết hợp với Inversion of Control Container.
- Tạo mới một Laravel Facade để sử dụng riêng là khá đơn giản.

Trong bài viết này chúng ta cũng nhắc đến Dependency Injection, đây cũng là một mảng kiến thức rất hay mà có dịp chúng ta sẽ bàn luận chi tiết về nó. Bài viết trên là những hiểu biết cá nhân, có thể có những khái niệm chưa rõ ràng do hạn chế về hiểu biết, rất mong các bạn có ý kiến cùng trao đổi cùng nhau nâng cao kiến thức.

Xem bài viết khác tại đây: https://viblo.asia/p/laravel-pagination-da-phan-trang-trong-mot-trang-web-LzD5dBjeZjY