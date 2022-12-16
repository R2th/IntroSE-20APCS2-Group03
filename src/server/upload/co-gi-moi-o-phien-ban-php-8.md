PHP 8.0 là phiên bản PHP mới nhất được phát hành ngày 26 tháng 11, 2020 Trong bài này, tôi sẽ nói đến một số tính năng mới, vài cách tinh chỉnh hiệu năng và lý do vì sao bạn nên chuyển lên PHP8.0.

PHP liên tục phát triển mạnh. Bằng việc tung ra bản cập nhật PHP 8.0 mới nhất này, nó đã thêm được rất nhiều tính năng mới. Giống với những phiên bản PHP 7 trước – hiệu năng và tốc độ đều cải thiện. PHP 8 bao gồm các cập nhập về đặt tên tham số, union types, thay đổi về constructor, match expression, Just In Time (JIT),...
PHP 8 đã được kiểm chứng về mặt hiệu năng và các cải thiện đáng kể khác
![](https://images.viblo.asia/a5f39deb-9f19-4b7b-bc1f-c52f264bd13c.png)

## Những thay đổi trong PHP 8

Từ lâu, PHP 8 đã được nâng cấp hằng năm. Mỗi năm nó đều có tính năng mới, và có tính năng giúp viết code gọn hơn, khiến cho ngôn ngữ lập trình thân thiện với developer hơn

### Named Arguments

`Named Arguments` sẽ cho phép truyền biến số vào trong function dựa theo tên của tham số đó thay vì vị trí của tham số đó. Điều này giúp việc định nghĩa function sẽ linh hoạt hơn, không phụ thuộc vào thứ tự và cho phép bỏ qua các param có giá trị mặc định.

ví dụ :

```
// Using positional arguments:
array_fill(0, 100, 50);
 
// Using named arguments:
array_fill(start_index: 0, num: 100, value: 50);

```

Bạn không cần quan tâm thứ tự của các tham số đã được đặt tên

```php
array_fill(value: 50, num: 100, start_index: 0);\
```

Bằng việc đặt tên tham số, lời gọi làm sẽ ngắn gọn hơn

- Bỏ qua các giá trị default

```php
// Phiên bản cũ
htmlspecialchars($string, default, default, false);
// PHP 8
htmlspecialchars($string, double_encode: false);
```

- Việc define function sẽ dễ dàng cho việc viết document hơn 

```php
// Phiên bản cũ
array_slice($array, $offset, $length, true);
// PHP 8
array_slice($array, $offset, $length, preserve_keys: true);
```

### Attributes

`Attributes` là tính năng mới cho phép chúng ta bổ sung thông tin về cấu trúc code, thông tin về metadata trong code như: class, method, function, params. Giống  như khái niệm Annotations trong Java, Decorators trong Python, Javascript, `Attributes` ở PHP 8 sẽ mang tới thông tin metadata có thể truy cập ở runtime thông qua `Reflection API`. 

Ví dụ
```php
// PHP 7
class PostsController
{
    /**
     * @Route("/api/posts/{id}", methods={"GET"})
     */
    public function get($id) { /* ... */ }
}

// PHP 8
class PostsController
{
    #[Route("/api/posts/{id}", methods: ["GET"])]
    public function get($id) { /* ... */ }
}
```

Thay vì viết PHPDoc, chúng ta có thể viết metadata với cú pháp PHP

### Constructor property promotion

Hiện tại để viết một object đơn giản chúng ta cần viết kha khá số lượng code, việc lặp lại các dòng code định nghĩa thuộc tính khiến code trở nên rườm rà hơn
```php
class Point {
    public float $x;
    public float $y;
    public float $z;
 
    public function __construct(
        float $x = 0.0,
        float $y = 0.0,
        float $z = 0.0,
    ) {
        $this->x = $x;
        $this->y = $y;
        $this->z = $z;
    }
}
```

Với PHP 8, hàm `__construct` đã có thể nhận vào các thuộc tính được định nghĩa cụ thể, PHP sẽ thông dịch để tạo ra cả thuộc tính của object, tham số của hàm construct và đồng thời gán giá trị cho thuộc tính đó luôn. Nội dung trong constructor có thể trống hoặc chứa các công việc khác.

```php
class Point {
  public function __construct(
    public float $x = 0.0,
    public float $y = 0.0,
    public float $z = 0.0,
  ) {}
}
```

### Union Types

`Union types` cho phép thuộc tính thuộc nhiều kiểu dữ liệu khác nhau, thay vì 1 kiểu như hiện tại. Ở PHP 8, biến số `union types` được định nghĩa theo cú pháp `T1 | T2 | T3 | ...` . `null` cũng là 1 kiểu dữ liệu được hỗ trợ trong `union types` T1 | T2 | null` được sử dụng để tạo ra biến có thể gán giá trị null.
Ví dụ 
```php
PHP 7
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

```php
class Number {
  public function __construct(
    private int|float $number
  ) {}
}

new Number('NaN'); // TypeError
```

### Match expression
`match` gần giống với `switch`, với mô tả :

- `match` có thể chứa kết quả trong biến hoặc trả về trực tiếp
- `match` không cần sử dụng `break;` để dừng, nó sẽ trả về kết quả với lần match đầu tiên
- `match` thực hiện một so sánh chính xác tới kiểu dữ liệu luôn


```php
PHP 7
switch (8.0) {
  case '8.0':
    $result = "string";
    break;
  case 8.0:
    $result = "integer";
    break;
}
echo $result;
//> string

```
```php
PHP 8
echo match (8.0) {
  '8.0' => "string",
  8.0 => "integer",
};
//> integer
```

`match` có thể gộp nhiều kết quả , giống như logic `OR` và có hỗ trợ `default`

```php
<?php
$expressionResult = match ($condition) {
    1, 2 => foo(),
    3, 4 => bar(),
    default => baz(),
};
?>

```

Nếu expression không match bất kỳ kết quả nào thì nó sẽ throw ra `\UnhandledMatchError $e`

```php
$condition = 5;

try {
    match ($condition) {
        1, 2 => foo(),
        3, 4 => bar(),
    };
} catch (\UnhandledMatchError $e) {
    var_dump($e);
}
```

### Nullsafe operator

Toán tử nullsafe giúp chúng ta đơn giản hơn trong việc xử lý giá trị nếu object bạn truy cập `null`
Trong phiên bản PHP 7, chúng ta phải kiểm tra giá trị có `null` hay không rồi mới tiếp tục truy cập tiếp 
```php
PHP 7
$user =  null;

if ($user !== null) {
  $address = $user->address;

  if ($address !== null) {
    $city = $address->getCity();
 
    if ($city !== null) {
      $country = $city->country;
    }
  }
}
```

giờ đây, code đã được viết ngắn gọn hơn rồi 
```php
$country = $user?->address?->getCity()?->country;
```

### JIT compilation

PHP 8 giới thiệu cơ chế biên dịch JIT mới. 
> JIT compiler chạy sau khi chương trình được khởi tạo và biên dịch lại những đoạn code (thường là bytecode hoặc là một dạng tương tự để các Virtual Machine có thể hiểu được) giúp cho ứng dụng chạy nhanh hơn. JIT có thể truy xuất vào các câu truy xuất tại thời điểm "Runtime" trong khi các compiler khác không thể và từ đó chọn lọc được ra những function mà thường xuyên được sử dụng từ đó có thể tối ưu giúp chương trình thực thi hiệu quả và nhanh hơn.

Đây là phương thức phổ biến mà được sử dụng rất nhiều từ Java Virtual Machine (JVM), V8 JavaScript VM, CLR (.net) hay HHVM (Một phiên bản PHP được cách tân bởi Facebook).

Tracing JIT, cho thấy hiệu suất tốt hơn 3 lần, cải thiện performance của các ứng dụng chạy trong thời gian dài tới 1.5 đến 2 lần.
Về lý thuyết, JIT (Just-In-Time) sẽ tăng tốc độ của một ứng dụng do cách nó xử lý việc biên dịch các tập lệnh PHP.

![](https://images.viblo.asia/d537e91a-cb3e-49fc-bbaa-e5a28779be99.png)