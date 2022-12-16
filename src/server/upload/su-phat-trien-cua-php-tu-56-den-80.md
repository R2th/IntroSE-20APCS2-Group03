Một đánh giá cô đọng về các thay đổi trong PHP v7.x trong vòng dưới 15 phút
![](https://images.viblo.asia/1800b1ca-d659-4d97-892c-7ba09d9fc88c.png)

Khi phiên bản PHP 7.3 được phát hành, tôi quyết định xem xét chi tiết về phát triển PHP: điều gì đang được phát triển và hướng nào để hiểu rõ hơn tiềm năng mới và tối ưu hóa của ngôn ngữ lập trình phổ biến rộng rãi này.

Sau khi tìm kiếm một danh sách các tính năng cô đọng mà PHP đã triển khai trong quá trình phát triển PHP v7.x, tôi đã quyết định tự mình biên dịch danh sách này - một cách bắt kịp công nghệ mà tôi tin rằng ai đó cũng có thể thấy nó hữu ích.

Chúng ta sẽ bắt đầu với PHP 5.6 như một đường cơ sở và sẽ xem xét những gì đã được thêm vào, thay đổi. Tôi cũng đã thêm các liên kết đến tài liệu chính thức cho từng điều được đề cập, vì vậy nếu bạn quan tâm đến việc đọc sâu hơn - hãy tự nhiên.

### PHP 7.0

**[Anonymous Class Support](https://wiki.php.net/rfc/anonymous_classes)**

Một anonymous class có thể được sử dụng trên một class được đặt tên:
* Khi class không cần phải được ghi lại.
* Khi class chỉ được sử dụng một lần trong khi thực thi.

```
new class($i) {
    public function __construct($i) {
        $this->i = $i;
    }
}
```

<br>

**Hàm chia số nguyên** -- cách an toàn để chia (thậm chí cho 0). 
Nó trả về phép chia số nguyên của toán hạng thứ nhất cho toán hạng thứ hai. Nếu số chia (toán hạng thứ hai) bằng 0, nó sẽ ném `E_WARNING` và trả về `FALSE`.
```
intdiv(int $numerator, int $divisor)
```

<br>

**[Đã thêm mới toán tử hợp nhất null](https://wiki.php.net/rfc/isset_ternary)** -- là `??`

```
$x = NULL;
$y = NULL;
$z = 3;
var_dump($x ?? $y ?? $z); // int(3)
 
$x = ["c" => "meaningful_value"];
var_dump($x["a"] ?? $x["b"] ?? $x["c"]); // string(16) "meaningful_value"
```

<br>

**[Đã thêm mới toán tử space ship (<=>)](https://wiki.php.net/rfc/combined-comparison-operator)**

Được sử dụng để tối ưu hóa và đơn giản hóa các phép so sánh.

```
// Before
function order_func($a, $b) {
    return ($a < $b) ? -1 : (($a > $b) ? 1 : 0);
}
// Using <=> operator
function order_func($a, $b) {
    return $a <=> $b;
}
```

<br>

**[Khai báo kiểu vô hướng](https://wiki.php.net/rfc/scalar_type_hints_v5)**

Đây chỉ là bước đầu để đạt được ngôn ngữ lập trình mạnh mẽ hơn trong PHP - v0.5.

```
function add(float $a, float $b): float {
    return $a + $b;
}
 
add(1, 2); // float(3)
```

<br>

**[Khai báo kiểu trả về](https://wiki.php.net/rfc/return_types)**

Đã thêm khả năng trả về các type ngoài scalar - các class bao gồm cả thừa kế. Vẫn bằng cách nào đó hoàn toàn bỏ lỡ khả năng làm cho nó tùy chọn (được giới thiệu trong v7.1 :) ).

```
interface A {
    static function make(): A;
}
class B implements A {
    static function make(): A {
        return new B();
    }
}
```

<br>

**[Khai báo theo group](https://wiki.php.net/rfc/group_use_declarations)**

```
// Explicit use syntax:
 
use FooLibrary\Bar\Baz\ClassA;
use FooLibrary\Bar\Baz\ClassB;
use FooLibrary\Bar\Baz\ClassC;
use FooLibrary\Bar\Baz\ClassD as Fizbo;
// Grouped use syntax:
 
use FooLibrary\Bar\Baz\{ ClassA, ClassB, ClassC, ClassD as Fizbo };
```


**[Generator Delegation](https://wiki.php.net/rfc/generator-delegation)**

Cú pháp mới sau đây được cho phép trong phần thân của các hàm generator:

```
yield from <expr>
```

<br>

***Cải thiện hiệu suất***

PHP7 nhanh gấp đôi so với PHP5.6

![](https://images.viblo.asia/5eb11906-af15-4692-932b-9c0f9fde61c7.png)

<br>

***Sử dụng bộ nhớ giảm đáng kể***

![](https://images.viblo.asia/b20d6551-12ff-4041-b86b-85d66bad892e.png)

Như bạn có thể thấy từ các biểu đồ, PHP 7.0 là một cải tiến lớn về **hiệu suất** và việc **sử dụng bộ nhớ**. Đối với trang có các truy vấn cơ sở dữ liệu, phiên bản 7.0.0 **nhanh hơn 3 lần** so với 5.6 với *opcache* được bật và **nhanh hơn 2,7 lần** mà không cần *opcache*! Về mặt sử dụng bộ nhớ, sự khác biệt cũng rất đáng kể!

<br>

**[Throwable interface](https://wiki.php.net/rfc/throwable-interface)**

Tái cấu trúc các exception class để có một naming scheme không trực quan và sẽ dẫn đến ít nhầm lẫn hơn, đặc biệt là đối với người dùng mới hơn.

`Errors` và `Exception` bây giờ được implement `Throwable`

Đây là hệ thống cấp bậc của `Throwable`

```
interface Throwable
  |- Error implements Throwable
      |- ArithmeticError extends Error
          |- DivisionByZeroError extends ArithmeticError
      |- AssertionError extends Error
      |- ParseError extends Error
      |- TypeError extends Error
          |- ArgumentCountError extends TypeError
  |- Exception implements Throwable
      |- ClosedGeneratorException extends Exception
      |- DOMException extends Exception
      |- ErrorException extends Exception
      |- IntlException extends Exception
      |- LogicException extends Exception
          |- BadFunctionCallException extends LogicException
              |- BadMethodCallException extends BadFunctionCallException
          |- DomainException extends LogicException
          |- InvalidArgumentException extends LogicException
          |- LengthException extends LogicException
          |- OutOfRangeException extends LogicException
      |- PharException extends Exception
      |- ReflectionException extends Exception
      |- RuntimeException extends Exception
          |- OutOfBoundsException extends RuntimeException
          |- OverflowException extends RuntimeException
          |- PDOException extends RuntimeException
          |- RangeException extends RuntimeException
          |- UnderflowException extends RuntimeException
          |- UnexpectedValueException extends RuntimeException
   ```
 
 ***Chú ý:*** *bạn chỉ có thể implement `Throwable` thông qua `Error` và `Exception`.*
 
 <br>
 
 **[Unicode Codepoint Escape Syntax ](https://wiki.php.net/rfc/unicode_escape)— “\u{xxxxx}”**
 
 ```
 echo "\u{202E}Reversed text"; // outputs ‮Reversed text
echo "mañana"; // "ma\u{00F1}ana"
echo "mañana"; // "man\u{0303}ana" "n" with combining ~ character (U+0303)
```

**[Context Sensitive Lexer](https://wiki.php.net/rfc/context_sensitive_lexer)**

Với những từ globally reserved nay đã trở thành semi-reserved:

```
callable  class  trait  extends  implements  static  abstract  final  public  protected  private  const
enddeclare  endfor  endforeach  endif  endwhile  and  global  goto  instanceof  insteadof  interface
namespace  new  or  xor  try  use  var  exit  list  clone  include  include_once  throw  array
print  echo  require  require_once  return  else  elseif  default  break  continue  switch  yield
function  if  endswitch  finally  for  foreach  declare  case  do  while  as  catch  die  self parent
```

**[Generator return expressions](https://wiki.php.net/rfc/generator-return-expressions)**

**[Cú pháp biến đồng nhất](https://wiki.php.net/rfc/uniform_variable_syntax)**

**[Mức hỗ trợ cho functions dirname()](http://php.net/manual/en/function.dirname.php)**

### PHP 7.1

**[Nullable Types](https://wiki.php.net/rfc/nullable_types)**

```
function answer(): ?int  {
    return null; //ok
}

function answer(): ?int  {
    return 42; // ok
}

function answer(): ?int {
    return new stdclass(); // error
}
function say(?string $msg) {
    if ($msg) {
        echo $msg;
    }
}

say('hello'); // ok -- prints hello
say(null); // ok -- does not print
say(); // error -- missing parameter
say(new stdclass); //error -- bad type
```

<br>

**[Void Returns](https://wiki.php.net/rfc/void_return_type)**

```
function should_return_nothing(): void {
    return 1; // Fatal error: A void function must not return a value
}
```

Không giống như các kiểu trả về khác được thi hành khi hàm được gọi, loại này được kiểm tra tại thời gian biên dịch, điều đó có nghĩa là một lỗi được tạo ra mà không cần gọi hàm.

Một hàm có kiểu trả về là `void` hoặc hàm `void`, có thể trả về ngầm hoặc có câu lệnh return mà không có giá trị:

```
function lacks_return(): void {
    // valid
}
```

<br>

**[Iterable pseudo type](https://wiki.php.net/rfc/iterable)**

Thông thường, một hàm chấp nhận hoặc trả về một `array` hoặc một object implementing `Traversable` sẽ được sử dụng với `foreach`. Tuy nhiên, vì mảng là kiểu nguyên thủy và `Traversable` là một interface, hiện tại không có cách nào để sử dụng khai báo kiểu trên tham số hoặc kiểu trả về để chỉ ra rằng giá trị có thể lặp lại được.

```
function foo(iterable $iterable) {
    foreach ($iterable as $value) {
        // ...
    }
}
```

`iterable` cũng có thể được sử dụng như một kiểu trả về để chỉ ra một hàm sẽ trả về một giá trị lặp. Nếu giá trị được trả về không phải là một mảng hoặc instance của `Traversable`, `TypeError` sẽ được throw.

```
function bar(): iterable {
    return [1, 2, 3];
}
```

Các tham số được khai báo với `iterable` có thể sử dụng `null` hoặc một mảng làm giá trị mặc định.

```
function foo(iterable $iterable = []) {
    // ...
}
```

<br>

**[Closure from callable](https://wiki.php.net/rfc/closurefromcallable)**

```
class Closure {
    ...
    public static function fromCallable(callable $callable) : Closure {...}
    ...
}
```

<br>

**[Cú pháp dấu ngoặc vuông cho phép destructuring assignment mảng](https://wiki.php.net/rfc/short_list_syntax)**

```
$array = [1, 2, 3];
// Assigns to $a, $b and $c the values of their respective array elements in $array with keys numbered from zero
[$a, $b, $c] = $array;
 
// Assigns to $a, $b and $c the values of the array elements in $array with the keys "a", "b" and "c", respectively
["a" => $a, "b" => $b, "c" => $c] = $array;
```

**Cú pháp dấu ngoặc vuông cho danh list()**

```
$powersOfTwo = [1 => 2, 2 => 4, 3 => 8];
list(1 => $oneBit, 2 => $twoBit, 3 => $threeBit) = $powersOfTwo;
```

<br>

**[Class constant visibility](https://wiki.php.net/rfc/class_const_visibility)**

```
class Token {
	// Constants default to public
	const PUBLIC_CONST = 0;
 
        // Constants then also can have a defined visibility
        private const PRIVATE_CONST = 0;
        protected const PROTECTED_CONST = 0;
        public const PUBLIC_CONST_TWO = 0;
 
        //Constants can only have one visibility declaration list
        private const FOO = 1, BAR = 2;
}
```

**[Catching Multiple Exception Types](https://wiki.php.net/rfc/multiple-catch)**

```
try {
   // Some code...
} catch (ExceptionType1 | ExceptionType2 $e) {
   // Code to handle the exception
} catch (\Exception $e) {
   // ...
}
```

### PHP 7.2

**[Mở rộng kiểu tham số](https://wiki.php.net/rfc/parameter-no-type-variance)**

```
<?php
 
class ArrayClass {
  public function foo(array $foo) { /* ... */ }
}
 
 
// This RFC proposes allowing the type to be widened to be untyped aka any
// type can be passed as the parameter.
// Any type restrictions can be done via user code in the method body.
class EverythingClass extends ArrayClass {
  public function foo($foo) { /* ... */ }
}
```

<br>

**[Đếm các object không đếm được](https://wiki.php.net/rfc/counting_non_countables)**

Gọi `count()` trên một scalar hoặc object không implement [Countable interface](http://php.net/manual/en/class.countable.php) trả về 1 (phi logic).

Trong phiên bản này đã thêm một cảnh báo khi gọi `count()` với tham số là scalar, null hoặc một object không implement `Countable`.

<br>

**[Cú pháp dấu phảy](https://wiki.php.net/rfc/list-syntax-trailing-commas) được sử dụng trong namespace**

```
use Foo\Bar\{ Foo, Bar, Baz, };
```

<br>

**[Argon2 Password Hash](https://wiki.php.net/rfc/argon2_password_hash)**

Các hàm `password_ *` hiện có cung cấp interface đơn giản để băm mật khẩu. RFC này đề xuất triển khai Argon2i (v1.3) trong các hàm `password_ *` để sử dụng thay thế an toàn cho `bcrypt`.

<br>

**[Debugging PDO Prepared Statement Emulation](https://wiki.php.net/rfc/debugging_pdo_prepared_statement_emulation)**

```
$db = new PDO(...);
 
// works with statements without bound values
$stmt = $db->query('SELECT 1');
var_dump($stmt->activeQueryString()); // => string(8) "SELECT 1"
 
$stmt = $db->prepare('SELECT :string');
$stmt->bindValue(':string', 'foo');
 
// returns unparsed query before execution
var_dump($stmt->activeQueryString()); // => string(14) "SELECT :string"
 
// returns parsed query after execution
$stmt->execute();
var_dump($stmt->activeQueryString()); // => string(11) "SELECT 'foo'"
```

### PHP 7.4 (In development)

**[Typed properties](https://wiki.php.net/rfc/typed_properties_v2)**

```
class User {
    public int $id;
    public string $name;
 
    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
}
```

<br>

**[Foreign Function Interface](https://wiki.php.net/rfc/ffi)**

FFI là một trong những tính năng giúp *Python* và *LuaJIT* rất hữu ích cho việc tạo mẫu nhanh. Nó cho phép gọi các hàm C và sử dụng các kiểu dữ liệu C từ ngôn ngữ kịch bản thuần túy và do đó phát triển "system code" hiệu quả hơn. Đối với PHP, FFI mở ra một cách để viết các phần mở rộng và ràng buộc PHP vào các thư viện C trong PHP thuần.

<br>

**[Null Coalescing Assignment Operator](https://wiki.php.net/rfc/null_coalesce_equal_operator)**

```
// The folloving lines are doing the same
$this->request->data['comments']['user_id'] = $this->request->data['comments']['user_id'] ?? 'value';
// Instead of repeating variables with long names, the equal coalesce operator is used
$this->request->data['comments']['user_id'] ??= 'value';
```

<br>

**[Preloading](https://wiki.php.net/rfc/preload)**

PHP đã sử dụng opcode caches từ lâu (APC, Turck MMCache, Zend OpCache). Họ đạt được hiệu suất tăng đáng kể bằng cách **GẦN NHƯ** loại bỏ hoàn toàn overhead của biên dịch lại PHP code. Preloading sẽ được kiểm soát chỉ bằng một chỉ thị `php.ini` mới - **opcache.preload**. Sử dụng chỉ thị này, chúng ta sẽ chỉ định một file PHP - sẽ thực hiện nhiệm vụ tải trước. Sau khi tải, file này sau đó được thực thi đầy đủ - và có thể tải trước các file khác, bằng cách including chúng hoặc bằng cách sử dụng hàm `opcache_compile_file()`.

<br>

**[Luôn có sẵn hash extention](https://wiki.php.net/rfc/permanent_hash_ext)**

Điều này sẽ làm cho hash extension (\`ext / hash\`) luôn có sẵn, tương tự như \`date\`. Phần hash extension cung cấp một tiện ích rất phong phú với nhiều thuật toán băm cực kỳ hữu ích trong các ứng dụng hiện đại, không chỉ trong code người dùng mà còn rất nhiều trong nội bộ.

### On the way to PHP 8.0

**[JIT.](https://wiki.php.net/rfc/jit)**

Nói ngắn gọn. Khi bạn khởi động một chương trình PHP, Zend Engine sẽ phân tích code thành một cây cú pháp trừu tượng (AST) và dịch nó sang opcodes. Các opcodes là các **đơn vị thực thi cho Máy ảo Zend (Zend VM)**. Opcode là mức độ khá thấp, do đó dịch code sang máy nhanh hơn nhiều so với code PHP gốc. PHP có một phần mở rộng có tên OPcache trong lõi, để lưu trữ các opcodes này.

> “JIT” is a technique that will compile parts of the code at runtime, so that the compiled version can be used instead.

<br>

Đây là một trong những chiến lược tối ưu hóa PHP cuối cùng và lớn nhất vẫn còn trên bàn. Các PHP engineers đang tìm kiếm để xem cách tiếp cận mới này có thể vượt qua các ứng dụng của họ. Thực sự quan tâm đến điều này.

<br>

**[Nhất quán loại errors cho internal function](https://wiki.php.net/rfc/consistent_type_errors)**

Làm cho các API phân tích tham số nội bộ luôn tạo ra `TypeError` nếu parameter parsing không thành công. Cần lưu ý rằng điều này cũng bao gồm `ArgumentCountError` (con của `TypeError`) cho các trường hợp có quá ít/nhiều đối số được thông qua.

### So sánh hiệu suất

Tôi đã soạn một bài test đơn giản để giúp dễ dàng so sánh hiệu suất của các phiên bản PHP khác nhau (sử dụng Docker). Điều này thậm chí sẽ cho phép dễ dàng kiểm tra hiệu năng của các phiên bản PHP mới chỉ bằng cách thêm tên container mới.

Chạy trên Macbook pro, 2,5 GHz Intel Core i7.

```
PHP version : 5.6.40
--------------------------------------
test_math                 : 1.101 sec.
test_stringmanipulation   : 1.144 sec.
test_loops                : 1.736 sec.
test_ifelse               : 1.122 sec.
Mem: 429.4609375 kb Peak mem: 687.65625 kb
--------------------------------------
Total time:               : 5.103

PHP version : 7.0.33
--------------------------------------
test_math                 : 0.344 sec.
test_stringmanipulation   : 0.516 sec.
test_loops                : 0.477 sec.
test_ifelse               : 0.373 sec.
Mem: 421.0859375 kb Peak mem: 422.2109375 kb
--------------------------------------
Total time:               : 1.71

PHP version : 7.1.28
--------------------------------------
test_math                 : 0.389 sec.
test_stringmanipulation   : 0.514 sec.
test_loops                : 0.501 sec.
test_ifelse               : 0.464 sec.
Mem: 420.9375 kb Peak mem: 421.3828125 kb
--------------------------------------
Total time:               : 1.868

PHP version : 7.2.17
--------------------------------------
test_math                 : 0.264 sec.
test_stringmanipulation   : 0.391 sec.
test_loops                : 0.182 sec.
test_ifelse               : 0.252 sec.
Mem: 456.578125 kb Peak mem: 457.0234375 kb
--------------------------------------
Total time:               : 1.089

PHP version : 7.3.4
--------------------------------------
test_math                 : 0.233 sec.
test_stringmanipulation   : 0.317 sec.
test_loops                : 0.171 sec.
test_ifelse               : 0.263 sec.
Mem: 459.953125 kb Peak mem: 460.3984375 kb
--------------------------------------
Total time:               : 0.984

PHP version : 7.4.0-dev
--------------------------------------
test_math                 : 0.212 sec.
test_stringmanipulation   : 0.358 sec.
test_loops                : 0.205 sec.
test_ifelse               : 0.228 sec.
Mem: 459.6640625 kb Peak mem: 460.109375 kb
--------------------------------------
Total time:               : 1.003
```

Nếu muốn tự kiểm tra, bạn có thể tìm source code trong [repository](https://github.com/meskis/php-bench)  này.

### Benchmarks từ PHP 5.6 trở lên

Tôi thực sự thích phần tổng hợp hiệu năng trực quan từ [servbolt.com](https://servebolt.com/articles/wordpress-5-0-php-7-2-vs-php-7-3-performance-and-speed-benchmark/) của tất cả các phiên bản chính từ 5.6 trở lên. Xem kết quả trong các bảng dưới đây.
![](https://images.viblo.asia/cd129b83-7aa2-47b6-9e3f-c01229b5054a.png)
![](https://images.viblo.asia/5c20bf1f-13cb-43a7-b95f-41782df65a07.png)

### Tóm lược hiệu năng

PHP 7.0.0 là một cột mốc quan trọng với hiệu suất được cải thiện đáng kể và sử dụng bộ nhớ thấp hơn nhưng các PHP maintainers chỉ đơn giản là hết ý tưởng để cải thiện nó. Một trong những điểm còn lại là biên dịch JIT (Just in time). Và nó đi kèm với PHP 8.0.

### Hướng phát triển

Trong suốt các phiên bản PHP 7.x, có một path  có thể nhìn thấy được nhắc tới nhiều hơn (và khách quan hơn một chút) và ngôn ngữ lập trình hiện đại. Tuy nhiên, PHP thích áp dụng các tính năng hữu ích và gọn gàng từ các ngôn ngữ lập trình khác.

Chúng ta sẽ sớm thấy một số tính năng hay hơn, như:

* [Named Arguments](https://wiki.php.net/rfc/simplified_named_params)
* [Nullsafe Calls](https://wiki.php.net/rfc/nullsafe_calls)
* [Enumerated Types (ENUMs)](https://wiki.php.net/rfc/enum)
* [Arrow functions](https://wiki.php.net/rfc/arrow_functions)

Với những điều này, PHP developers sẽ tham gia nhóm những người áp dụng ngôn ngữ hiện đại. Không có ngôn ngữ nào là hoàn hảo, nhưng PHP đang mở đường cho tương lai.

### TL;DR

Để rút ngắn hơn nữa, tôi đã chọn hầu hết các thay đổi quan trọng đối với ý kiến cá nhân của mình với phiên bản mới nhất của PHP 7.3. Chúng đây rồi:

* [Added new null coalesce operator](https://wiki.php.net/rfc/isset_ternary)
* [Scalar type declarations](https://wiki.php.net/rfc/scalar_type_hints_v5)
* [Return type declarations](https://wiki.php.net/rfc/return_types)
* [Throwable interface](https://wiki.php.net/rfc/throwable-interface)
* [Nullable Types](https://wiki.php.net/rfc/nullable_types)
* [Void Returns](https://wiki.php.net/rfc/void_return_type)
* [Square bracket syntax for array destructing](https://wiki.php.net/rfc/short_list_syntax)
* [Class constant visibility](https://wiki.php.net/rfc/class_const_visibility)

<br>

**References:**

https://wiki.php.net/rfc
https://www.cloudways.com/blog/php-5-6-vs-php-7-symfony-benchmarks/
https://servebolt.com/articles/wordpress-5-0-php-7-2-vs-php-7-3-performance-and-speed-benchmark/

The head illustration was made by Badoo team for Badoo Tech blog

https://tech.badoo.com/ru/article/511/php-8-chego-zhdat-pismo/



***Nguồn:*** https://medium.com/@meskis/evolution-of-php-v5-6-to-v8-0-c3514ebb7f28