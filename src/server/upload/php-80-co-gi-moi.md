# I: Lời mở đầu.
Mới đây php phiên bản 8.0 đã được chính thức phát hành, theo các chuyên gia thì php có khá nhiều công nghệ đột phá nhằm tăng tính liên kết và cải thiện tốc độ xử lý. Vậy chúng ta cùng nhau tìm hiểu xem php8.0 có gì khác mới mẻ.

# I: Các tính năng mới.
### 1: Union types.
Với bản chất được định kiểu động của PHP, có rất nhiều trường hợp mà kiểu liên hợp có thể hữu ích. Nói một các đơn thuần thì ta có thể set nhiều kiểu dữ liệu cho đầu vào và đầu ra của function.

`public function foo(Foo|Bar $input): int|float;`

Nhưng Lưu ý rằng void không bao giờ có thể là union type, vì nó chỉ ra "no return value at all". Hơn nữa, `nullable` các hợp nhất có thể được viết bằng cách sử dụng `|null` hoặc bằng cách sử dụng `? `ký hiệu hiện có :

```
public function foo(Foo|null $foo): void;

public function bar(?Bar $bar): void;
```

### 2: JIT

Trình biên dịch JIT - đúng lúc - hứa hẹn sẽ cải thiện hiệu suất đáng kể, mặc dù không phải lúc nào cũng nằm trong ngữ cảnh của các yêu cầu web. Tôi đã thực hiện các điểm [benchmarks](https://stitcher.io/blog/jit-in-real-life-web-applications) trên các ứng dụng web ngoài đời thực và có vẻ như JIT không tạo ra nhiều sự khác biệt, nếu có, trên các loại dự án PHP đó.

Bạn có thể tìm hiểu thêm về JIT [ở đây](https://stitcher.io/blog/php-jit).

### 3:  Toán tử nullsafe
Nếu bạn đã quen thuộc với [toán tử liên kết null](https://stitcher.io/blog/shorthand-comparisons-in-php#null-coalescing-operator), bạn đã quen với những thiếu sót của nó: nó không hoạt động trên các cuộc gọi phương thức. Thay vào đó, bạn cần kiểm tra trung gian hoặc dựa vào `optional` người trợ giúp được cung cấp bởi một số khuôn khổ:

```
$startDate = $booking->getStartDate();

$dateAsString = $startDate ? $startDate->asDateTimeString() : null;
```

Với việc bổ sung toán tử nullsafe, bây giờ chúng ta có thể có hành vi giống như liên kết null trên các phương thức!

`$dateAsString = $booking->getStartDate()?->asDateTimeString();`


Bạn có thể đọc tất cả về toán tử nullsafe [tại đây ](https://stitcher.io/blog/php-8-nullsafe-operator).

### 4: Gán giá trị tham số.

Các đối số được đặt tên cho phép bạn chuyển các giá trị vào một hàm, bằng cách chỉ định tên giá trị, do đó bạn không phải xem xét thứ tự của chúng và bạn cũng có thể bỏ qua các tham số tùy chọn!
```

function foo(string $a, string $b, ?string $c = null, ?string $d = null) 
{ /* … */ }

foo(
    b: 'value b', 
    a: 'value a', 
    d: 'value d',
);
```

### 5: Attributes 
Các thuộc tính , thường được gọi là chú thích trong các ngôn ngữ khác, cung cấp một cách để thêm dữ liệu meta vào các lớp mà không cần phải phân tích cú pháp docblocks.

Để xem nhanh, đây là một ví dụ về các thuộc tính trông như thế nào, từ RFC:
```

use App\Attributes\ExampleAttribute;

#[ExampleAttribute]
class Foo
{
    #[ExampleAttribute]
    public const FOO = 'foo';
 
    #[ExampleAttribute]
    public $x;
 
    #[ExampleAttribute]
    public function foo(#[ExampleAttribute] $bar) { }
}
```

```
#[Attribute]
class ExampleAttribute
{
    public $value;
 
    public function __construct($value)
    {
        $this->value = $value;
    }
}
```
Lưu ý rằng cơ sở này Attributetừng được gọi PhpAttributetrong RFC ban đầu, nhưng sau đó đã được thay đổi bằng một RFC khác . 

### 
### 6: Match expression
Bạn có thể gọi nó là anh cả của `switch` biểu thức: `match` có thể trả về giá trị, không yêu cầu `break` câu lệnh, có thể kết hợp điều kiện, sử dụng so sánh kiểu nghiêm ngặt và không thực hiện bất kỳ sự ép buộc kiểu nào.

Nó trông như thế này:

```
$result = match($input) {
    0 => "hello",
    '1', '2', '3' => "world",
};
```

### 7: Constructor property promotion

RFC này bổ sung thêm đường cú pháp để tạo các đối tượng giá trị hoặc đối tượng truyền dữ liệu. Thay vì chỉ định các thuộc tính của lớp và một hàm tạo cho chúng, PHP giờ có thể kết hợp chúng thành một.

Thay vì làm như này:

```
class Money 
{
    public Currency $currency;
 
    public int $amount;
 
    public function __construct(
        Currency $currency,
        int $amount,
    ) {
        $this->currency = $currency;
        $this->amount = $amount;
    }
}
```

Bây giờ bạn có thể làm như sau:

```
class Money 
{
    public function __construct(
        public Currency $currency,
        public int $amount,
    ) {}
}
```


### 8: New `static` return type

Mặc dù đã có thể trả về `self`, nhưng `static` không phải là kiểu trả về hợp lệ cho đến PHP 8. Với bản chất được nhập động của PHP, đây là một tính năng sẽ hữu ích cho nhiều nhà phát triển.

```
class Foo
{
    public function test(): static
    {
        return new static();
    }
}
```

### 9: New mixed type
Một số người có thể gọi nó là một tội ác cần thiết: `mixed` loại khiến nhiều người có cảm xúc lẫn lộn. Tuy nhiên, có một lập luận rất tốt để giải quyết vấn đề này: một loại bị thiếu có thể có nhiều ý nghĩa trong PHP:
* Một hàm không trả về gì hoặc null
* Chúng tôi đang mong đợi một trong nhiều loại
* Chúng tôi đang mong đợi một kiểu không thể nhập được gợi ý trong PHP

Bởi vì những lý do trên, đó là một điều tốt mà `mixed` loại được thêm vào. `mixed` bản thân nó có nghĩa là một trong những loại sau:

* array
* bool
* callable
* int
* float
* null
* object
* resource
* string



Lưu ý rằng nó `mixed` cũng có thể được sử dụng như một tham số hoặc kiểu thuộc tính, không chỉ như một kiểu trả về.

Cũng lưu ý rằng vì `mixed` đã bao gồm null, nên không được phép làm cho nó có giá trị vô hiệu. Điều sau sẽ gây ra lỗi:

```
// Fatal error: Mixed types cannot be nullable, null is already part of the mixed type.
function bar(): ?mixed {}
```

### `10: Throw expression`

RFC này thay đổi `throw` từ một câu lệnh thành một biểu thức, điều này làm cho nó có thể đưa ra ngoại lệ ở nhiều vị trí mới:
```
$triggerError = fn () => throw new MyError();

$foo = $bar['offset'] ?? throw new OffsetDoesNotExist('offset');
```

### 11: Non-capturing catches
Với các phiên bản cũ chúng ta viết catch như này:
```
try {
    // Something goes wrong
} catch (MySpecialException $exception) {
    Log::error("Something went wrong");
}
```

Với phiên bản 8.0 chúng ta chỉ cần viết như này:

```
try {
    // Something goes wrong
} catch (MySpecialException) {
    Log::error("Something went wrong");
}
```

# III:  Tổng kết.
Trên mình đã nói đến 11 thay đổi mình nghĩ chúng ta hay dùng. Còn một số thay đổi nữa mình sẽ update vào bài viết sau.
thanks!

# IV: Tham khảo.

https://stitcher.io/blog/new-in-php-8