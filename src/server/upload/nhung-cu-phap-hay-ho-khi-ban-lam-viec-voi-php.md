Ở đây mình chỉ nói chung chung trong qua từng version chứ ko nói cụ thể nha, nếu bạn không dùng được chúng, thì hãy tra nó ở version nào có thể sử dụng nhé.
# 1. Bắt đầu từ php7
Kể từ khi ra mắt php7, tốc độ trong PHP 7 được cải thiện đến đáng kinh ngạc khi nó nhanh hơn PHP 5 ít nhất 2 lần, nếu bạn biết tối ưu thì nó còn nhanh hơn nữa, có thể lên đến 3-4 lần
## 1. Khai báo kiểu của biến và kiểu trả về
Ở php5, chúng ta chỉ có 2 kiểu type-hint đó là `class` và `array`. Còn với php7 chúng ta có có thêm các kiểu như :  `integer`, `float`, `string`, `bool`.

```php
class Animal {
	public function __construct(
		string $name,
		integer $age,
		float $weight,
		bool $isForeign
	) {
	 // 
	}
	
	public function getName() : string
	{
		return $this->name;
	}
}
```

Như các bạn đã thấy, chúng ta có thể khai báo các type của biến và có thể chỉ định type trả về của hàm.

Ở php7.4 nó còn được support nhiều hơn :
```php
bool, int, float, string, array, object, iterable, self, parent
any class or interface name
?type // kiểu dữ liệu trả về có thể là bất kỳ kiểu nào kể trên
```

## 2. Toán tử mới 

- Spaceship Operator: `< = >`

```php
$a = 2;
$b = 2;
 
$compare = $a <=> $b;
 
/**
return -1 nếu $a < $b
return 0 nếu $a = $b
return 1 nếu $a > $b
*/
 ```
 
 - Null Coalesce Operator : `??`. Nó được sử dụng để thay thế phép toán ba ngôi kết hợp với hàm Isset()
 
```php
// thay vì
$a = isset($a) ? $a : null;
// thì bạn sẽ làm như này 
$a = $a ?? null;

// hoặc 
if (!empty($name)) $name = $name;
else $name = 'Guest';

$name = $name ?? 'Guest';

// bạn cũng có thể check nhiều lần
$a = $a ?? $b ?? $c ?? $d ?? 0;
```
 
 ## 3. Anonymous class
 Chúng ta có Anonymous function như này:
 ```php
 $func = function () {
	 return $a;
 }
 
 $func();
 ```
ở php7, chúng ta còn có thêm Anonymous class:
```php
$animal = new class {
	function demo($name)
	{
		echo "Đây là con $name của mình";
	}
};
 
$animal->demo('Bẹc rê Đức');
```

 ### Self invoking function (IIFE) ? 
 Nghe quen quen, giống trong js 
 ```js
 (function () {
 // trong js ta sẽ viết như này =))
 }())
 ```
 
 Và trông php ta cũng làm tương tự :v
 ```php
(function () {
// echo 1;
 }())
 ```
 Ngày càng thấy code php giống như code js phải ko
 
 ## 4. Arrow function 
 Trong php7.4, bạn có thể viết function ngắn gọn hơn với arrow function, nó giống như js vậy :v
 ```php
 // ví dụ 
$a =  function () {
	return 1;
}
// thì bạn có thể viết thế này
$a = fn() => 1;
```

Nhiều ví dụ hơn kết hợp arrow function :
```php
// dùng với array_map
$validated[$field] = array_map(fn($item) => (int)$item, $validated[$field]);
// dùng để load relation
$object->load([
	'posts' => fn($q) => $q->select('id', ...),
	'author' => fn($q) => $q->select('id', ...)->with([
		'profile' => fn($q) => $q->select('id', ...),
	]),
]);
// dùng với query
$builder->when(true, fn($sq1) => $q->where(....)}
```

## 5. Spread Operator trong Array Expressions
Chắc bạn đã thấy người ta dùng threedots (`...`) trong js rồi nhỉ ? vâng, php cũng làm được đấy :v
```php
// tha hồ cho ta nhiều cách sáng tạo để dùng với nó 

$arr1 = ['3', '4'];
$arr2 = ['1', '2', ...$arr1, '5'];
// ['1', '2', '3', '4', '5'];

now()->setTime(...explode(':', '12:00'));
// => Illuminate\Support\Carbon @1633521600 {#4717
// date: 2021-10-06 12:00:00.0 UTC (+00:00),
// }

$arrayMerged = [...$arr1, ...$arr2];
$arrayMerged = [...$arr1, ...(fn () => [1,2,3])()];
```

Quá xịn luôn phải không nào ?

### Nhìn sơ qua thì php 7 chúng ta sẽ có những cái trên gọi là mới mẻ, và hay sử dụng nhất.
# 2. Đến php8 có gì mới ?
Php8 là một bản cập nhật mới, nó chứa nhiều tính năng tối ưu hoá hơn và cũng tăng tốc độ xử lí lên đôi chút.
Chúng ta cùng điểm qua một số thứ hay ho trên php8 nhé.

## 1. Named arguments
Ở php7, khi đặt một hàm có nhiều tham số, thông thường các tham số giữa bạn chỉ muốn để default nhưng khi sử dụng bạn bắt buộc phải truyền tham số cho nó nếu bạn có sử dụng tham số sau nó :
VD
```php
function demo($a = 1, $b = 1, $c = 2) {
// handle
}
 // Bây giờ bạn vẫn muốn $b = 1 nhưng $c lại là một số khác thì bạn phải làm như này 
 demo(1, 1, 4);
 // đấy bạn phải điền lại các tham số mặc định rất mất tg
```

Do đó, php8 cho chúng ta 1 cái gọi là Named arguments, nó giúp chúng ta bỏ qua các tham số default, options.
```php
// vẫn là function demo($a = 1, $b = 1, $c = 2); ta viết lại như sau :
demo($c: 1);
```
Chỉ cần như vậy, nó cũng đủ hiểu chúng ta đang truyền 1 vào `$c`, còn lại giữ default.
## 2.Attributes
Thay vì chú thích PHPDoc, giờ đây bạn có thể sử dụng siêu dữ liệu có cấu trúc với cú pháp gốc của PHP.
```php
// PHP 7
class PostsController
{
    /**
     * @Route("/api/posts/{id}", methods={"GET"})
     */
    public function get($id) { /* ... */ }
}
```

```php
// PHP 8
class PostsController
{
    #[Route("/api/posts/{id}", methods: ["GET"])]
    public function get($id) { /* ... */ }
}
```

## 3.Constructor property promotion
Ở php7, khi khai báo một property của class, ta thường khai báo phạm vi của nó trên hàm khởi tạo, sau đó rồi set nó trong hàm khởi tạo luôn:
```php
class Point {
  public float $x;
  public float $y;
  public float $z;

  public function __construct(
    float $x = 0.0,
    float $y = 0.0,
    float $z = 0.0
  ) {
    $this->x = $x;
    $this->y = $y;
    $this->z = $z;
  }
}
```
Nhìn khá dài đúng ko ? nhưng may thay, php8 giúp ta ngắn gọn điều này :
```php
class Point {
  public function __construct(
    public float $x = 0.0,
    public float $y = 0.0,
    public float $z = 0.0,
  ) {}
}
```
Bạn cũng có thể sử dụng nó như này :

```php
class ManagerController extends ApiController
{
public function __construct(
	private PostService $courseService,
	private UserService $temporaryService
) {
}
```
## 4. Union types
Khi bạn khai báo type của biến, bạn có thể khái báo nhiều loại của biến đó
```php
// php7
class Number {
  /** @var int|float */
  private $number;

  /**
   * @param float|int $number
   */
  public function __construct($number) {
    $this->number = $number;
  }
}

new Number('NaN'); // Ok
```
Dưới đây sẽ cho chúng ta biến, `$number` sẽ nhận 2 type là `int|float` nếu không hợp 1 trong 2 nó sẽ lỗi `TypeError`
```php
//php8
class Number {
  public function __construct(
    private int|float $number
  ) {}
}

new Number('NaN'); // TypeError
```

## 5. Match
Chúng ta hay dùng switch case nhưng từng case trong đó quá đơn giản thì khiến hàm nó dài lên.
```php
// PHP 7
switch (8.0) {
  case '8.0':
    $result = "Oh no!";
    break;
  case 8.0:
    $result = "This is what I expected";
    break;
}
echo $result;
//> Oh no!
```
 
 VỚi php8, bạn có thể sử dụng `match`, nó sẽ giúp các case của switch gọn hơn:
 ```php
 echo match (8.0) {
  '8.0' => "Oh no!",
  8.0 => "This is what I expected",
};
//> This is what I expected
```

## 6. Nullsafe
Nếu ai dùng js rồi, thì bạn có thể thấy js cũng tương nhự như này 
```js
let object = {};
object?.user?.name // => null
```

Trong php cũng có tương tự như này :
```php
$user = User::find(1);
$user->name; // nếu name có,
// nhưng khi không find ra $user chúng ta sẽ nhận được lỗi, do đó chúng ta cần làm như sau để tránh lỗi
$user?->name // nếu không có nó sẽ trả về null
// ngoài ra chúng ta có thể sử dụng nhiều hơn
$user?->profile?->address ?? 'Default';
```

## 7.  Operators
Ngoài các toán tử như :
```php 
$a = $a ?: 1; // Ternary
$a = $a ?? 1; // 	Null coalescing

// Thì chúng ta còn có 1 cái nữa:
$a ??= 1;
// Cái này sẽ giúp chúng ta gắn luôn nếu $a không có giá trị, hoặc không tồn tại
```

# Kết
Bên trên không phải là những cái mới trong php7 và php8 nhé, đây chỉ là những cái mình hay sử dụng của từng phiên bản, còn nhiều cái mới mà mình chưa nói ra hết được, các bạn tham khảo trên mạng nhé. Cảm ơn các bạn đã theo dõi, mong các bạn tiếp tục ủng hộ mình.