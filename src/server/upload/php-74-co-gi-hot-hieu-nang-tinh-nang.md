Cuối cùng thì php7.4 cũng chính thức được ra mắt vào 28 tháng 11 năm 2019 vừa qua. Trong thời gian từ đó đến nay, hẳn cũng đã có nhiều developer, user có những trải nghiệm đầu tiên của mình về phiên bản php này. 
Hãy cùng mình xem có gì hot ở phiên bản 7.4 này nhé.
Trong bài này mình sẽ đề cập đến các khía cạnh sau:
- Php 7.4 này có ý nghĩa như thế nào đối với bạn ?
- Các thay đổi
# PHP7.4 có ý nghĩa như thế nào đối với bạn

Giống như chúng ta đã thấy trong các bản phát hành PHP 7 trước đây - hiệu suất và tốc độ tiếp tục được cải thiện. Một trong những tính năng mới thú vị nhất là **Preload**. Nó giúp tăng tốc thực thi **code** cũng như cho thấy khả năng chạy nhanh hơn và code sạch (clean code), nhờ đơn giản hóa các dòng **code** phổ biến.

Những người tốt chịu trách nhiệm về PHP đã nghe ý kiến của mọi người và có câu trả lời cho họ thật đầy đủ. Họ đã liên tục thay đổi code để trực quan hơn và dễ dàng chuyển đổi giữa các ngôn ngữ lập trình.
PHP được sử dụng trong hơn 78,9% của tất cả các trang web. Theo [W3techs](https://w3techs.com/technologies/details/pl-php), các trang web phổ biến nhất sử dụng PHP là Wikipedia, Pinterest và Facebook (một ít)

Nếu chúng ta đặc biệt nhìn vào các trang web WordPress chạy PHP, so sánh PHP 5 và 7, chúng ta có thể thấy tốc độ tăng gấp đôi. Các trang web hỗ trợ WordPress chắc chắn đạt được nhiều nhất bằng cách sử dụng phiên bản PHP mới nhất hiện có.

![](https://images.viblo.asia/3820f6a5-9c2f-429b-9339-c77e233d8115.png)

Nhìn vào biểu đồ ta có thể thấy 39,191,714 hiện tại đang dùng php. Rất nhiều phải không, qua đó ta có thể thấy php cũng ngon đó chứ.

Xem một chút  [benchmark test ](https://www.phoronix.com/scan.php?page=article&item=php-74-benchmarks&num=1) giữa các version php nhé.

![](https://images.viblo.asia/bdcd27c0-d689-4535-a27c-f83fcab8b94f.png)

wow, benchmark ngày càng được cải thiện, rõ nhất là từ php5. lên php7. có thể thấy php7.4 đã vượt lên khá nhiều so với các phiên bản 7. trước đó. Vậy có gì khiến nó tăng vọt lên như vậy. Hãy bắt đầu nhé.
# Các thay đổi 

## Preloading
Hãy nói chuyện về code 1 chút nhé. Khi sử dụng **Framework** hoặc thư viện, các **files** của nó phải được tải và liên kết theo mọi **request**. **Preloading** là khi bạn có thể load các framework và thư viện vào OPCache. Nó cho phép máy chủ tải các files PHP và lưu trữ chúng trong bộ nhớ trong khi khởi động và sẵn sàng chúng cho bất kỳ yêu cầu nào trong tương lai. 

**Preloading** được chạy bởi một lệnh **php.ini** cụ thể là **opache.preload**. Cái này có trình biên dịch file PHP và thực thi khi máy chủ khởi động. Nó cũng có thể được sử dụng để **preload** nhiều files hơn và **include** hoặc biên dịch chúng.

Điều này thật tuyệt vời, tuy nhiên, nếu source của các files được tải sẵn bị thay đổi, máy chủ phải được khởi động lại. Các tệp được tải sẵn cũng được lưu trong bộ nhớ OPCache mãi mãi.

Tuy nhiên, các files được tải sẵn này sẽ tiếp tục khả dụng cho mọi request trong tương lai trong trường hợp bạn cần sử dụng lại chúng.
## Toán tử Spread trong Array
Quay lại phiên bản php 5.6, php bắt đầu hỗ trợ toán tử spread cho đối số. Và bây giờ, php 7.4 ta có thể sử dụng toán tử này trong array roài nè. 
Cú pháp vẫn là 3 dấu chấm đằng trước.

```php
$animals = ['dog', 'cat'];
$animalkingdom = ['lion', 'elephant', ...$animals, 'giraffe'];
// [‘lion’, ‘elephant’, ‘dog’, ‘cat’, ‘giraffe’];
```
nhiều ví dụ hơn 1 chút về các cú pháp nhé

```php
$num1 = [1, 2, 3];
$num2 = [...$num1]; // [1, 2, 3]
$num3 = [0, ...$num1]; // [0, 1, 2, 3]
$num4 = array(...$num1, ...$num2, 111); // [1, 2, 3, 1, 2, 3, 111]
$num5 = [...$num1, ...$num1]; // [1, 2, 3, 1, 2, 3]
```

Ngoài ra bạn cũng có thể sử dụng nó trong function

```php
function getNum() {
  return ['a', 'b'];
}
$num6 = [...getNum(), 'c']; // ['a', 'b', 'c']
 
$num7 = [...new NumIterator(['a', 'b', 'c'])]; // ['a', 'b', 'c']
 
function arrGen() {
    for($i = 11; $i < 15; $i++) {
        yield $i;
    }
}
$num8 = [...arrGen()]; // [11, 12, 13, 14]
```

function return về array thì sao nhỉ, vẫn cứ là oke :v: 

```php
function getAnimals(){
	return ['dog', 'cat', 'elephant'];
}
$num1 = [...getAnimals(), 'lion', 'tiger', 'giraffe'];
```

và ở php 7.4 nó sẽ in ra như này

```php
array(6) {
	[0]=>
	string(3) "dog"
	[1]=>
	string(3) "cat"
	[2]=>
	string(8) "elephant"
	[3]=>
	string(4) "lion"
	[4]=>
	string(5) "tiger"
	[5]=>
	string(7) "giraffe"
}
```
toán tử **spread** cũng tốt hơn nhiều so với **array_merge** ở php 7.3. vì toán tử này  có thể áp dụng với **object** mà **array_merge** không làm được.

Một chú ý quan trọng đó là toán tử không sử dụng được với trường hợp key là string. 
Và php 7.4 cũng bỏ luôn **array_merge** .

Ở php 7.4, ta sẽ sử dụng 1 chức năng mới đó là **[generator function](https://www.php.net/manual/en/language.generators.syntax.php)**.
Nó như 1 function bình thường nhưng thay vì return về giá trị nào đó thì nó sẽ giữ lại các giá trị được tạo ra để sử dụng sau này. Ta cùng xem ví dụ sử dụng toàn tử **spread** và **generator function** dưới đây nhé
```php
function generator() {
	for ($i = 3; $i <= 5; $i++) {
		yield $i;
	}
}
$num1 = [0, 1, 2, ...generator()];
```
## Weak References
Ở phiên bản PHP 7.4 này, sẽ xuất hiện lớp **WeakReference**, không bị nhầm lẫn với lớp WeakRed hoặc phần mở rộng Weakref nhé.
**WeakReferences**  sẽ cho phép ta gọi lại 1 tham chiếu của 1 object. Nó khá là hữu ích khi có thể ngăn chặn việc hủy object ngoài mong muốn.
```php
WeakReference {
/* Methods */
    public __construct ( void )
    public static create ( object $referent ) : WeakReference
    public get ( void ) : ?object
}
```
## Contravariant Parameters and Covariant Returns
Hiện tại, PHP sử dụng hầu hết các loại tham số bất biến và các kiểu trả về. Có nghĩa là, nếu một phương thức có một tham số hoặc kiểu trả về của X thì tham số kiểu con hoặc kiểu trả về cũng phải là kiểu X.

Bây giờ, php 7.4 cho phép ta **covariant** (sắp xếp từ riêng biệt đến chung) và **contravariant** (đảo ngược thứ tự) trên các loại tham số và trả về.

```php:Covariant.php
interface Factory {
	function make(): object;
}
class UserFactory implements Factory {
	function make(): User;
}
```
```php:Contravariant.php
interface Concatable {
	function concat(Iterator $input); 
}
class Collection implements Concatable {
	// accepts all iterables, not just Iterator
	function concat(iterable $input) {/* . . . */}
}
```
## Typed Properties 2.0
Kể từ PHP 5, **type hint** đã có một tính năng cho phép bạn chỉ định loại biến được dự kiến sẽ được truyền cho một hàm hoặc lớp. Chuyển qua PHP 7.2, addition of the object data type đã cho chúng ta hy vọng rằng sẽ có nhiều hơn trong tương lai. Và nó đây.
Trong phiên bản PHP 7.4, đã hỗ trợ các types sau đây:
```php:typedProperties.php
bool, int, float, string, array, object, iterable, self, parent
any class or interface name
?type // where "type" may be any of the above
```
Lưu ý rằng, **parent** type có thể được sử dụng trong các class và nó không cần phải có parent thích hợp theo parameter và type trả về.
Ngoài ra thì **void** và **callable** không được hỗ trợ. **Void** đã bị bỏ đi vì nó không hữu dụng và ngữ nghĩa của nó không rõ ràng. Còn **callable**, vì hành vi của nó đã phụ thuộc vào bối cảnh rồi.
Xem 1 số ví dụ nhé. Ở đây ta có 1 class trong phiên bản **PHP 7.3**:
```php:user.php
class User {
    /** @var int $id */
    private $id;
    /** @var string $name */
    private $name;
 
    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
 
    public function getId(): int {
        return $this->id;
    }
    public function setId(int $id): void {
        $this->id = $id;
    }
 
    public function getName(): string {
        return $this->name;
    }
    public function setName(string $name): void {
        $this->name = $name;
    }
}
```
Trong PHP 7.4 thì sao nhỉ, đơn giản hơn nhiều:
```php:user.php
class User {
    public int $id;
    public string $name;
 
    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }
}
```
Đó là int và string, còn các kiểu các bạn hãy xem ví dụ sau để hiểu rõ hơn nhé:
```exampleTypes.php
class Example {
  
    public int $scalarType;
    protected ClassName $classType;
    private ?ClassName $nullableClassType;
 
    // Types are also legal on static properties
    public static iterable $staticProp;
 
    // Types can also be used with the "var" notation
    var bool $flag;
 
    // Typed properties may have default values (more below)
    public string $str = "foo";
    public ?string $nullableStr = null;
 
    // The type applies to all properties in one declaration
    public float $x, $y;
    // equivalent to:
    public float $x;
    public float $y;
}
```
## Arrow Functions 2.0
Anonymous functions trong PHP có xu hướng cú pháp dài dòng hơn, mặc dù chỉ là một toán tử đơn giản. Cú pháp dài, quá nhiều biến được sử dụng. Okay chê hơi nhiều xem qua ví dụ biết ngay nè.
```php:arrowFunctionPHP7.3.php
function array_values_from_keys($arr, $keys) {
    return array_map(function ($x) use ($arr) { return $arr[$x]; }, $keys);
}
```
```php:arrowFunctionPHP7.4.php
function array_values_from_keys($arr, $keys) {
    return array_map(fn($x) => $arr[$x], $keys);
}
```
Những ai biết về ES6 hẳn sẽ thấy quen quen đúng không nhỉ :smile:. Giờ cú pháp rất đơn giản như sau:
```php
fn(parameter_list) => expr
```
Chúng ta có thể so sánh kỹ hơn qua ví dụ dưới đây ở PHP7.3 và PHP7.4 nhé:
```php
$y = 1;
$fn1 = fn($x) => $x + $y;
 
 
$fn2 = function ($x) use ($y) 
{
    return $x + $y;
};
```
Lồng nhau thì sao nhỉ :smile:
```php
$z = 1;
$fn = fn($x) => fn($y) => $x * $y + $z;
```
Ta có thể thấy **$z** được sử dụng function bên trong function. Từ PHP7.4, ta đã có thể làm điều này 1 cách ez, nhưng ở PHP7.3 thì không.
Nếu bạn muốn viết đúng cú pháp, hãy tham khảo các cách dưới đây nhé:
```php
fn(array $x) => $x;
fn(): int => $x;
fn($x = 42) => $x;
fn(&$x) => $x;
fn&($x) => $x;
fn($x, ...$rest) => $rest;
```
Thêm một chút lưu ý về sự ưu tiên xử lý của arrow function nè:
```php
fn($x) => $x + $y
// is
fn($x) => ($x + $y)
// not
(fn($x) => $x) + $y
```