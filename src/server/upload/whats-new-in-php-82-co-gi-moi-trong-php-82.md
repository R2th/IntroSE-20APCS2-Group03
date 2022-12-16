PHP 8.2 sẽ được phát hành vào ngày 24 tháng 11 năm 2022. Trong bài đăng này, chúng ta sẽ tìm hiểu các tính năng, cải tiến hiệu suất, thay đổi và không dùng nữa trong lần phát hành này nhé.

Readonly classes - Lớp chỉ đọc [rfc](https://wiki.php.net/rfc/readonly_classes)
-------------------------------------------------------------------------------

Ở phiên bản php 8.1 chúng ta có **Readonly properties** ở phiên bản 8.2 thêm cú pháp để làm cho tất cả các thuộc tính của class chỉ được đọc cùng một lúc. 

```php
    # PHP 8.1
    class Post
    {
        public function __construct(
            public readonly string $title, 
            public readonly Author $author,
            public readonly string $body,
            public readonly DateTime $publishedAt,
        ) {}
    }
    
    # PHP 8.2
    readonly class Post
    {
        public function __construct(
            public string $title, 
            public Author $author,
            public string $body,
            public DateTime $publishedAt,
        ) {}
    }
```

Về mặt chức năng, việc tạo một lớp chỉ đọc hoàn toàn giống như việc tạo mọi thuộc tính chỉ đọc; nhưng nó cũng sẽ ngăn các thuộc tính động được thêm vào một lớp:
```php
    $post = new Post(/* … */);
    
    $post->unknown = 'wrong';
    
    // Sẽ báo lỗi: Uncaught Error: Cannot create dynamic property Post::$unknown
```

Lưu ý rằng bạn chỉ có thể mở rộng từ các **readonly classes**  nếu lớp con cũng là **readonly class**.

Deprecate dynamic properties - Không dùng thuộc tính động [rfc](https://wiki.php.net/rfc/deprecate_dynamic_properties)
----------------------------------------------------------------------------------------------------------------------

Tôi muốn nói rằng đây là một thay đổi để tốt hơn, nhưng nó sẽ ảnh hưởng một chút. Thuộc tính động không được chấp nhận trong PHP 8.2 và sẽ tạo ra lỗi `ErrorException` trong **PHP 9.0**:
```php
    class Post
    {
        public string $title;
    }
    
    // Thuộc tính name không được khai báo và ide sẽ cảnh báo đoạn này
    
    $post->name = 'Name';
```

New random extension - Phần mở rộng random mới [rfc](https://wiki.php.net/rfc/rng_extension)
--------------------------------------------------------------------------------------------

PHP 8.2 bổ sung một trình tạo số ngẫu nhiên mới để khắc phục nhiều vấn đề với phần trước: nó hoạt động hiệu quả hơn, an toàn hơn, dễ bảo trì hơn và không dựa vào trạng thái toàn cục; loại bỏ một loạt lỗi khó phát hiện khi sử dụng các hàm ngẫu nhiên của PHP.

Có một lớp mới được gọi là `Randomizer`, chấp nhận một `randomizer engine`.
```php
    $rng = $is_production
        ? new Random\Engine\Secure()
        : new Random\Engine\Mt19937(1234);
    
    // Randomizer construct với tham số là một Randomizer engine
    $randomizer = new Random\Randomizer($rng);
    $randomizer->shuffleString('foobar');
```
### `null`, `true`, and `false` as standalone types [rfc](https://wiki.php.net/rfc/null-false-standalone-types)

PHP 8.2 bổ sung thêm ba kiểu mới là **null, true và false** có thể được coi là các **loại hợp lệ**. Các ví dụ phổ biến là các hàm tích hợp sẵn của PHP, trong đó false được sử dụng làm kiểu trả về khi xảy ra lỗi. Ví dụ trong file\_get\_contents:
```
    file_get_contents(/* … */): string|false
```
Trước PHP 8.2, bạn đã có thể sử dụng false cùng với các kiểu khác như một liên hợp; nhưng bây giờ nó cũng có thể được sử dụng như một loại độc lập:
```php
    function alwaysFalse(): false
    {
        return false;
    }
    
    // tương tự với null và true
```
Disjunctive Normal Form Types - DNF Types [rfc](https://wiki.php.net/rfc/dnf_types)
-----------------------------------------------------------------------------------

Các loại DNF cho phép chúng ta kết hợp **union (|) and intersection (&)** types, tuân theo một quy tắc nghiêm ngặt: intersection types phải được nhóm với dấu ngoặc. Trong thực tế, nó trông như thế này:
```php
    function generateSlug((HasTitle&HasId)|null $post) 
    {
        if ($post === null) {
            return '';
        }
    
        return 
            strtolower($post->getTitle()) 
            . $post->getId();
    }
```
Trong trường hợp này, `(HasTitle & HasId) | null` là kiểu DNF.

Constants in traits [rfc](https://wiki.php.net/rfc/constants_in_traits)
-----------------------------------------------------------------------

Bây giờ bạn có thể sử dụng hằng số trong các trait:
```php
    trait Foo 
    {
        public const CONSTANT = 1;
     
        public function bar(): int 
        {
            return self::CONSTANT;
        }
    }
```
Bạn sẽ không thể truy cập hằng số thông qua tên của trait, từ bên ngoài trait hoặc từ bên trong nó.
```php
    trait Foo 
    {
        public const CONSTANT = 1;
     
        public function bar(): int 
        {
            // không thể truy cập từ bên trong!
            return Foo::CONSTANT;
        }
    }
    
    // không thể truy cập từ bên ngoài!
    Foo::CONSTANT;
```
Tuy nhiên, bạn có thể truy cập hằng số thông qua class sử dụng trait, với điều kiện là nó công khai:
```php
    class MyClass
    {
        use Foo;
    }
    
    MyClass::CONSTANT; // 1
```
Redact parameters in back traces [rfc](https://wiki.php.net/rfc/redact_parameters_in_back_traces)
-------------------------------------------------------------------------------------------------

Khi code chạy trên production thường xảy ra lỗi, chúng ta có thể dùng các dịch vụ theo dõi để phát hiện điều này và gửi chúng cho dev sửa. Thường khi lỗi phát sinh sẽ có **stack traces** để có thể dò tìm lỗi, nhưng nó cũng đi kèm với những thông tin nhạy cảm như biến môi trường, mật khẩu hoặc tên người dùng.

PHP 8.2 cho phép bạn đánh dấu các "_**tham số nhạy cảm**_" như vậy bằng một thuộc tính, do đó bạn không cần phải lo lắng về việc chúng được liệt kê trong stack traces khi có sự cố. Đây là một ví dụ từ RFC:
```php
    function login(
        string $user,
        #[\SensitiveParameter] string $password <- param này được đánh dấu là param nhạy cảm
    ) {
        // …
        
        throw new Exception('Error');
    }
    
    // khi gọi hàm login và có lỗi
    login('root', 'root');
    
    Fatal error: Uncaught Exception: Error in login.php:8
    Stack trace:
    #0 login.php(11): login('root', Object(SensitiveParameterValue))
    #1 {main}
      thrown in login.php on line 8
```

Fetch properties of enums in const expressions - Lấy giá trị của enum trong biểu thức hằng số [rfc](https://wiki.php.net/rfc/fetch_property_in_const_expressions)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
```php
    enum A: string 
    {
        case B = 'B';
    
        // có thể lấy giá trị B    
        const C = [self::B->value => self::B];
    }
```

### Không dùng chuỗi nội suy ${} [rfc](https://wiki.php.net/rfc/deprecate_dollar_brace_string_interpolation)

PHP có một số cách để nhúng các biến trong chuỗi. RFC này không chấp nhận hai cách làm như vậy, vì chúng hiếm khi được sử dụng và thường dẫn đến nhầm lẫn:
```php
    "Hello ${world}";
    Deprecated: Using ${} in strings is deprecated
    
     
    "Hello ${(world)}";
    Deprecated: Using ${} (variable variables) in strings is deprecated
```

Nói rõ hơn: hai cách nội suy chuỗi phổ biến vẫn hoạt động:
```php
    "Hello {$world}";
    "Hello $world";
```

Không dùng `utf8_encode()` và `utf8_decode()` [rfc](https://wiki.php.net/rfc/remove_utf8_decode_and_utf8_encode) RFC gợi ý sử dụng `mb_convert_encoding()` để thay thế
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

`strtolower()` và `strtoupper()` không còn hỗ trợ locale characters ví dụ như umlaut-a (ä) nếu muốn hỗ trợ bạn hãy dùng `mb_strtolower()`
-----------------------------------------------------------------------------------------------------------------------------------------

Xem bản đẹp tại: https://chungnguyen.xyz/posts/what-s-new-in-php-8-2