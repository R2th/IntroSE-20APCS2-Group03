Bài viết dưới đây sẽ chỉ ra một vài trường hợp có thể gặp phải khi viết code PHP nói chung, Laravel nói riêng. Đó có thể là lỗi logic cơ bản, cách sử dụng hàm chưa hợp lý; Hoặc chỉ đơn giản là những lỗi convention không đáng có.

## 1. Sử dụng `try-catch` với thứ tự `catch` chưa đúng

```php
try {
    ...
} catch (\Throwable $exception) {
    report($exception);
} catch (ValidationException $exception) {
    reportValidationException($exception);
} catch (\Exception $exception) {
    reportException($exception);
}
```

Vì Throwable là class cha của Exception và ValidationException nên ở ví dụ trên, exception được throw sẽ được bắt ngay tại catch đầu tiên và hai đoạn catch phía dưới sẽ trở nên vô nghĩa.

Khi sử dụng try catch, hãy chú ý đến thứ tự và quan hệ cha con của các loại exception nhé.

Đoạn code trên có thể sửa lại như sau:
```php
try {
    ...
} catch (ValidationException $exception) {
    reportValidationException($exception);
} catch (\Exception $exception) {
    reportException($exception);
} catch (\Throwable $exception) {
    report($exception);
}
```

## 2. Xử lý exception giống nhau trong câu lệnh `catch`

```php
try {
    ...
} catch (ValidationException $exception) {
    report($exception);
} catch (\Exception $exception) {
    report($exception);
}
```

Trong cả hai trường hợp `catch`, đều có chung một xử lý là gọi tới hàm `report()`. Khi đó việc tách thành hai câu lệnh `catch` trở nên không cần thiết.

Nếu chỉ muốn `catch` ValidationException thì nên bỏ câu lệnh `catch` phía dưới.

Nếu muốn bắt tất cả exception và có xử lý trong `catch` giống nhau thì nên bỏ câu lệnh `catch` bên trên.

## 3. Sử dụng cú pháp `if` không cần thiết

```php
if ($a == $b) {
    return true;
} else {
    return false;
}
```

Hoặc có thể ngắn hơn chút.
```php
return $a == $b ? true : false;
```
 
Hai đoạn code trên viết không sai về logic nhưng khá thừa thãi và dài dòng. Đối với những logic so sánh đơn giản, cân nhắc rút ngắn lại như sau:
```php
return $a == $b;
```

## 4. Khai báo biến chỉ được sử dụng một lần

```php
function foo() {
    $a = 'bar';

    return $a;
}
```

Việc khai báo biến cục bộ `$a` trong trường hợp này là không cần thiết.

Đối với các phép toán không quá dài và phức tạp, nên cân nhắc sửa lại như sau:

```php
function foo() {
    return 'bar';
}
```

## 5. Sử dụng hàm `array_splice()` trong vòng lặp của chính mảng hiện tại.

```php
$numbers = [1, 2, 3, 4, 5, 6];

foreach ($numbers as $key => $number) {
    if ($number % 2 !== 0) {
        array_splice($numbers, $key, 1);
    }
}

var_dump($numbers);
```
Hàm `array_splice()` là một trong những giải pháp được nghĩ tới trong các bài toán loại bỏ các phần tử không mong muốn ra khỏi một mảng.

Trong ví dụ trên, hàm `array_splice()`  được sử dụng để loại bỏ các số lẻ bên trong mảng `$numbers`.

Kết quả mong muốn khi chạy đoạn code trên là:
```php
$numbers = [2, 4, 6];
```

Tuy nhiên, thực tế thì kết quả trả về lại là

```php
$numbers = [2, 3, 5, 6];
```

Nguyên nhân là hàm `array_splice()`  đã làm thay đổi mảng hiện tại và gây ra sự sai lệnh khi sử dụng biến chỉ mục `$key`. Giá trị của `$key` không còn phản ánh đúng vị trí của phần tử cần được loại bỏ.

Có thể kiểm chứng lại bằng cách hiển thị dữ liệu sau mỗi vòng lặp `foreach`

```php
$numbers = [1, 2, 3, 4, 5, 6];

foreach ($numbers as $key => $number) {
    if ($number % 2 !== 0) {
        var_dump($numbers);
        var_dump('Spliced number: ' . $number);
        var_dump('Spliced postion: ' . $key);
        array_splice($numbers, $key, 1);
    }
}

var_dump($numbers);
```

```
array(6) {
  [0] => int(1)
  [1] => int(2)
  [2] => int(3)
  [3] => int(4)
  [4] => int(5)
  [5] => int(6)
}
string(17) "Spliced number: 1"
string(18) "Spliced postion: 0"

array(5) {
  [0] => int(2)
  [1] => int(3)
  [2] => int(4)
  [3] => int(5)
  [4] => int(6)
}
string(17) "Spliced number: 3"
string(18) "Spliced postion: 2"

array(4) {
  [0] => int(2)
  [1] => int(3)
  [2] => int(5)
  [3] => int(6)
}
string(17) "Spliced number: 5"
string(18) "Spliced postion: 4"
```

Đây là lỗi khá cơ bản nhưng đôi khi lại bị bỏ qua, dẫn đến những kết quả không lường trước.

Với bài toán ở ví dụ trên, có nhiều cách giải quyết khác nhau. Hai trong số nhiều cách có thể cân nhắc tới:

### Sử dụng vòng lặp `for` và giảm giá trị của biến con trỏ tại thời điểm "splice"
```php
$numbers = [1, 2, 3, 4, 5, 6];

for ($i = 0; $i < count($numbers); $i++) {
    if ($numbers[$i] % 2 !== 0) {
        array_splice($numbers, $i, 1);
        $i--;
    }
}
```

### Sử dụng hàm `array_filter()`
```php
$numbers = [1, 2, 3, 4, 5, 6];
$evenNumbers = array_filter($numbers, function ($number) { return $number % 2 === 0; });
```
## 6. Gán giá trị có chứa ký tự space cho biến môi trường của Laravel

```dotenv 
APP_NAME=My App
```
Các biến trong file dotenv (của Laravel) không hỗ trợ các giá trị có ký tự whitespace chưa escape. Do đó, ở ví dụ trên, lỗi sẽ được đổ ra với nội dung như sau (Laravel 5.8):

```php
The environment file is invalid!
Failed to parse dotenv file due to unexpected whitespace. Failed at [My App].
```

Vì vậy, hãy luôn ghi nhớ escape các giá trị của biến môi trường trong Laravel.
```php
APP_NAME="My App"
```

## 7. Truyền giá trị `null` vào hàm sử dụng type-hint

```php
function foo(int $a) {
    return $a;
}

$b = foo(null);
```

Đoạn code trên sẽ sinh ra lỗi (PHP Fatal error) khi có sự khác biệt về kiểu dữ liệu giữa tham số truyền vào và đối số của hàm.

Có thể giải quyết vấn đề trên bằng một trong hai phương án sau:

### Sử dụng nullable type (Từ PHP 7.1 trở lên)
```php
function foo(?int $a) {
    return $a;
}
```

### Gán giá trị mặc định bằng null cho đối số của hàm
```php
function foo(int $a = null) {
    return $a;
}
```

## 8. Sử dụng loose comparisons (`==` , `!=`) trên hàm `strpos()`

```php
function doesContain($str, $char) {
    return strpos($str, $char) != false;
}
```

Hàm `strpos()` thường được dùng để xác định một substring có nằm trong string cho trước hay không nhờ vào vị trí của substring đó. Nếu không tìm thấy substring, hàm `strpos()` trả về giá trị `false`.

Với ví dụ trên, hàm `doesContain()` sẽ trả về `true` nếu string `$str` chứa chuỗi ký tự `$char`.
```
var_dump(doesContain('Hello world!', 'l'));
bool(true)
```

Tuy nhiên, khi kiểm tra chữ `H` hoặc chuỗi ký tự `Hello` thì kết quả lại ra `false`
```php
var_dump(doesContain('Hello world!', 'H'));
bool(false)

var_dump(doesContain('Hello world!', 'Hello'));
bool(false)
```

Nguyên nhân là ký tự/chuỗi ký tự (substring) nằm ở vị trí đầu tiên sẽ có giá trị offset bằng 0. Do đó, khi so sánh `!=` với giá trị `false`, kết quả sẽ ra `false`.

Vì vậy, nên dùng strict comparisons (`===`, `!===`) khi sử dụng hàm `strpos()` 
```php
function doesContain($str, $char) {
    return strpos($str, $char) !== false;
}
```

## 9. Khai báo tham số không bắt buộc đứng trước tham số bắt buộc

 ```php
function foo($a = null, $b) {...}
```

Cách khai báo tham số của hàm như trên là hợp lệ nhưng không hợp lý.

Khi muốn gọi hàm `foo()`  với giá trị của tham số `$a` bằng `null`, chúng ta sẽ phải truyền giá trị cho cả hai tham số. Mặc dù tham số đầu tiên đã có giá trị mặc định.
```php
function foo($a = null, $b) {...}
foo(null, $c);
```

Vì vậy, luôn sắp xếp các tham số không bắt buộc đứng sau cùng khi định nghĩa hàm.
```php
function foo($b, $a = null) {...}
foo($c);
```