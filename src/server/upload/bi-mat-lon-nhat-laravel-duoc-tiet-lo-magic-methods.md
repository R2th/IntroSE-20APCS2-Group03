Xin chào các bạn! Như các bạn biết thì `Laravel` là 1 framework mới nhưng đã vượt trội hoàn toàn so với các Framework đàn anh đàn chị khác của PHP về sự phổ biến. Vậy bạn có bao giờ bạn đặt câu hỏi WHAT, điều gì làm cho Laravel trở nên nổi bật như vậy không?
Có rất nhiều bài viết đã phân tích sự tuyệt vời trong Laravel, các bạn có thể tìm đọc seri [Laravel Beauty](https://viblo.asia/s/laravel-the-beauty-Wj53Om3p56m) của anh @thangtd90.

Trong bài này, mình muốn giới thiệu cho các bạn đặc trưng của PHP đóng góp vai trò quan trọng trong việc xây dựng framework Laravel tuyệt vời như vậy, không thể không nhắc đến `Magic Methods` của PHP.

Vậy nó có điều gì 'ma thuật' như vậy, hãy cùng mình tìm hiểu trong bài viết này nhé!

![](https://images.viblo.asia/92772a78-9c8b-4eb5-91c8-1cdad8c0496a.jpg)

# Magic Methods là gì?

Điều đầu tiên, các bạn phải hiểu rằng các `magic methods` không chỉ dành riêng cho Laravel, mà nó có sẵn trong bất kỳ ứng dụng PHP nào. Vì mình đang làm việc với Framework Laravel nên mình xin phép bài viết này lấy ví dụ liên quan đến framework này ạ. 

 **Magic methods** là các phương thức đặc biệt để tùy biến các sự kiện trong PHP. Hiểu đơn giản là nó cung cấp thêm cách giải quyết 1 vấn đề. Magic methods được dùng để xử lý các đối tượng trong OOPS.
 
 Các magic methods sẽ không bao giờ được gọi trực tiếp, có thể gọi magic methods là `behind the scenes`.
 
 Hiện tại có tổng 15 hàm `magic methods`:
 ```php
 class MyClass
{
    public function __construct() {}

    public function __destruct() {}

    public function __call() {}

    public function __callStatic() {}

    public function __get() {}

    public function __set() {}

    public function __isset() {}

    public function __unset() {}

    public function __sleep() {}

    public function __wakeup() {}

    public function __toString() {}

    public function __invoke() {}

    public function __set_state() {}

    public function __clone() {}

    public function __debuginfo() {}
}
 ```
 
 Nếu bạn, đã từng làm việc với `OOPs PHP` nói chung, Laravel nói riêng thì bạn đã bắt gặp ở đâu đó phương thức `__construct()`. Hàm `__contruct` sẽ tự động được gọi khi ta khởi tạo 1 đối tượng (còn được gọi là hàm khởi tạo). Vậy là bạn đã từng sử dụng `method magics` rồi phải không? :relaxed:
 
 Bạn cũng sẽ nhận thấy rằng tất cả các `magic methods` đều có tiền tố prefix `__`.
 
 Bài viết này, mình không thể giới thiệu hết các `magic method`, mình chỉ nêu ra 4 hàm: `__get()`, `__set()`, `__call()`, `__callStatic()` được sử dụng trong codebase của Laravel. Nếu bạn quan tâm đến các hàm khác, có thể tìm hiểu thêm [tại đây](https://www.php.net/manual/en/language.oop5.magic.php).
 
#  Laravel đã sử dụng 'ma thuật' như nào?
 
##  __get()
 
 Trong `Model` của Laravel thực sự đặc biệt. Chúng không lưu trữ dữ liệu thuộc tính dưới dạng thuộc tính trực tiếp của Class nhưng trong đó có 1 thuộc tính `protected $attributes`, là mảng lưu các thuộc tính attribute của Model.
 
 Sự khác biệt giữa cách sử dụng giữa lớp trong PHP thuần và lớp Model trong Laravel
 ```php
 /**
 * A user class in PHP (without Laravel) will be just a class with the said attributes
 */
class User
{
    public $firstName = 'Quan';
}

$user = new User;

echo $user->firstName; // Will return 'Quan'
 ```
 
 ```php
 namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * A user class in Laravel
 */
class LaravelUser extends Model
{
    /**
     * Note that store all the attributes data in one and single array
     */
    protected $attributes = [
        'firstName' => 'Quan',
    ];
}

$laravelUser = new LaravelUser;

echo $laravelUser->firstName; // Will return 'Quan' as well
 ```
 
Chúng ta có thể thấy 2 ví dụ hoạt động cho ra kết quả giống hệt nhau. Tuy nhiên, trong Laravel các thuộc tính `attribute` không được lưu như trong PHP, thay vào đó, tất cả thuộc tính `attribute` được định nghĩa trong 1 thuộc tính có tên `$attributes`. Vậy tại sao khi truy cập vào thuộc tính cần, chúng lại có thể trả về đúng dữ liệu được nhỉ :-? :-? :-?

Đơn giản vì phía sau con đường luôn có magic method `__get`

```php
class User
{
    /**
     * Declare the attributes that same way as in Laravel
     */
    protected $attributes = [
        'firstName' => 'Quan',
    ];

    /**
     * The function __get receive one parameter
     * which will be the name of the attribute you want to access
     * in this case $key = "firstName"
     */
    public function __get($key)
    {
        return $this->attributes[$key];
    }
}

$user = new User;

echo $user->firstName; // Will return 'Quan'
```

Mọi thứ có vẻ ổn!

Chúng ta cần lưu ý rằng magic method `__get()` chỉ được gọi khi ta truy cập vào thuộc tính không tồn tại hoặc thuộc tính không thể truy cập (`protected` hoặc `private`) trong Class. Để làm rõ điều này, hãy cùng xem ví dụ dưới đây:
```php
class User
{
    public $firstName = 'Quan';

    protected $attributes = [
        'firstName' => 'Vinh',
    ];

    public function __get($key)
    {
        return $this->attributes[$key];
    }
}

$user = new User;

/**
 * Will return 'Quan' as the attribute exists in the class
 * so the magic method __get doesn't get call in this case
 */
echo $user->firstName;
```

Còn nhiều thứ được Laravel thực hiện khi hàm `__get()` magic methods được gọi, chi tiết các bạn có thể xem [tại đây](https://github.com/laravel/framework/blob/7.x/src/Illuminate/Database/Eloquent/Model.php#L1631).

## __set()

Magic method `__set()` được gọi khi ta truyền dữ liệu vào thuộc tính không tồn tại hoặc thuộc tính (`protected` hoặc `private`) trong Class.

Cùng mình xem tiếp ví dụ để xem sự khác biệt giữa cách sử dụng giữa lớp trong PHP thuần và lớp Model trong Laravel nhé!
```php
class User
{
    public $firstName = '';
}

$user = new User;

$user->firstName = 'Quan';

echo $user->firstName; // Will return 'Quan'
```

```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class LaravelUser extends Model
{
    protected $attributes = [
        'firstName' => '',
    ];
}

$laravelUser = new LaravelUser;

$laravelUser->firstName = 'Quan';

echo $laravelUser->firstName; // Will return 'Quan' as well
```
Trong ví dụ, ta đang cố gắng gán `value` 'Quan' vào thuộc tính attribute `firstName` không tồn tại trong Class mà nó được định nghĩa trong thuộc tính `$attributes`.

Các bạn nhìn title là `__set()`, chắc nhiều bạn cũng đoán được là dùng ma thuật của hàm `__set()` để xử lí chứ gì :rofl::rofl::rofl: . Hãy cùng thử thực hiện xem sao :-? :-? :-?
```php
class User
{
    public $attributes = [
        'firstName' => '',
    ];

    /**
     * The magic method __set receives the $name you want to affect the value on
     * and the value
     */
    public function __set($key, $value)
    {
        $this->attributes[$key] = $value;
    }
}

$user = new User;

$user->firstName = 'Quan';

echo $user->attributes['firstName']; // Will return 'Quan'
// echo $user->firstName;
```
Vậy là xong, chúng ta đã thực hiện thành công việc sử dụng cơ bản magic method `__get()` và `__set()` trong Laravel. Mình đang cố gắng lấy ví dụ đơn giản để bạn có thể hiểu đơn giản về các mà Laravel làm việc, chi tiết về `__set()` các bạn có thể xem thêm [tại đây](https://github.com/laravel/framework/blob/7.x/src/Illuminate/Database/Eloquent/Model.php#L1643).

## __call() & __callStatic()

Magic method `__call()` được gọi khi ta gọi phương thức không được phép truy cập trong phạm vi của một đối tượng. Trong Laravel, magic method này được sử dụng để tạo ra các `macro` có trong PHP. 

Nhiệm vụ của macro là gì? Thì nhiệm của macro khác nhau ở các ngôn ngữ khác nhau, tuy nhiên nó đều mang một sứ mệnh chung là thực hiện một nhiệm vụ mầ chúng ta định sẵn. 

Ở bài này, mình sẽ không giải thích chi tiết về `marco` nhưng nếu bạn quan tâm về cách bạn có thể sử dụng chúng trong project Laravel của mình, bạn có thể tìm hiểu thêm thông qua bài viết [Laravel MacroableTrait](https://viblo.asia/p/laravel-macroabletrait-MLzkOYxBGpq) của anh @tungshooter.

Bây giờ, thử xem làm thế nào chúng ta có thể tạo `macro` trong PHP thuần nhé...
```php
class User
{
    public $firstName = 'Quan';

    public $lastName = 'Tien';
}

$user = new User;

$user->fullName();
```
Đoạn chương trình này khi chạy chắc chắn sẽ gặp lỗi vì phương thức `fullName` chưa được khai báo trong class `User`. Chúng ta nhận được thông báo **Call to undefined method User::fullName()**

Bây giờ với magic method `__call`, ta có thể định nghĩa 1 mảng sẽ chứa hàm Closure.
```php
class User
{
    public $firstName = 'Quan';

    public $lastName = 'Tien';

    /**
     * We initialise our macros as an empty array that we will fill
     */
    public static $macros = [];

    /**
     * We define this method to add new macro as we go
     * the first argument will be the name of the macro we want to define
     * the second will be a Closure function that will be executed when calling the macro
     */
    public static function addMacro($name, $macro) {
        static::$macros[$name] = $macro;
    }

    /**
     * "__call" receives two parameters,
     * $name which will be the name of the function called in our case 'fullName'
     * $arguments which will be all the arguments passed in the function in our case it'll just be an empty array as we can't pass any arguments in our function
     */
    public function __call(string $name, array $arguments) {
        /**
         * We retrieve the macro with the right name
         */
        $macro = static::$macros[$name];
        /**
         * Then we execute the macro with the arguments
         * Note: we need to bind the Closure with "$this" before calling it to allow the macro method to act in the same context
         */
        return call_user_func_array($macro->bindTo($this, static::class), $arguments);
    }
}

$user = new User;

$user->fullName(); // This will still break as we didn't define the macro 'fullName' yet and the method 'fullName' doesn't exist either

/**
 * Add the macro function 'fullName'
 */
User::addMacro('fullName', function () {
    return $this->firstName . ' ' . $this->lastName;
});

$user->fullName(); // Now, returns 'Quan Tien'
```
Vậy là chúng ta đã biết tạo `macro` bằng việc sử dụng magic method `__call`.

Với magic method `__callStatic` hoạt động tương tự như magic method `_call` nhưng đối với các `phương thức tĩnh static`.

Bạn có thể tham khảo `Macroable` trong Laravel [tại đây].(https://github.com/laravel/framework/blob/7.x/src/Illuminate/Support/Traits/Macroable.php)

# Kết luận

Trên đây mình đã giới thiệu cho các bạn cách Laravel sử dụng `magic methods` trong basecode của họ. Bài viết này có vẻ hơi sâu về framework với những bạn mới tìm hiểu về Laravel nhưng chung quy lại thì nếu bạn chắc về kiến thức PHP thì cũng không gặp khó khăn gì cả. Mong qua bài viết này, các bạn có hiểu được thêm dòng code mình viết ra nó được xử lí như nào.

Cảm ơn bạn đã đọc bài viết của mình!!!

**Tài liệu tham khảo**

https://viblo.asia/p/laravel-and-php-magic-methods-157G5o7ORAje

https://viblo.asia/p/laravel-macroabletrait-MLzkOYxBGpq

https://www.php.net/manual/en/language.oop5.magic.php

https://github.com/laravel/framework/blob/7.x/src/Illuminate/Database/Eloquent/Model.php

https://github.com/laravel/framework/blob/7.x/src/Illuminate/Support/Traits/Macroable.php