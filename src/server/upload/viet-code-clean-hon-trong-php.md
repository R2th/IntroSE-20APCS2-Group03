#  Giới thiệu
Chắc hẳn trong chúng ta cũng đã ít nhất một lần đọc đoạn code mà nó rối rắm, khó hiểu, phải mất khá nhiều thời gian để có thể hiểu được đoạn code đó viết cái gì. Những đoạn code này khiến cho việc phát triển, bảo trì gặp nhiều khó khăn. Ngay cả khi chính người viết đoạn code đó sau một thời gian đọc lại cũng ... không hiểu được mình viết cái gì. Để tránh những rắc rối này thì việc viết code clean là rất cần thiết.
# Tại sao cần clean code
## 1. Dễ đọc, dễ hiểu
Viết code không phải chỉ để cho mình mình đọc, viết code cần để cho những người khác đọc và hiểu dễ dàng. Khi mới đọc qua đoạn code là có thể hiểu được sơ sơ đoạn code đó viết cho chức năng gì, biến đó có chức năng gì.
## 2. Dễ phát triển, bảo trì
Với bất kì dự án nào việc bảo trì là một yêu cầu cơ bản, không thể thiếu. Nếu việc tổ chức code không rõ ràng thì thời gian và công sức bảo trì dự án rất tốn kém, nên việc đảm bảo chất lượng code của dự án là rất quan trọng ngay từ khâu đầu tiên.
## 3. Hướng tới một quy tắc chung
Trong một dự án có thể có nhiều thành viên, nếu mỗi thành viên lại có một "phong cách" lập trình riêng thì rất khó có thể mang lại hiệu quả chung của dự án. Clean code giúp xây dựng một bộ quy tắc chung giúp cả nhóm tuân theo một "phong cách" lập trình chung sẽ mang lại hiệu quả rõ ràng.

Trên đây là vài lợi ích khi viết code clean, bên cạnh đó còn rất nhiều tác dụng khác nữa mà trong quá trình làm việc các bạn sẽ hiểu.
# Một số mẹo để viết code clean
## 1. Đặt tên biến rõ nghĩa
Tên biến, hàm, lớp nên đặt tên sao cho có ý nghĩa, đúng với chức năng của nó

Bad:
```
$ymdstr = $moment->format('y-m-d');
```
Good:
```
$currentDate = $moment->format('y-m-d');
```

## 2. Sử dụng các tên biến có nghĩa thay vì các hard code vô nghĩa

Bad:
```
class User
{
    // What the heck is 7 for?
    public $access = 7;
}

// What the heck is 4 for?
if ($user->access & 4) {
    // ...
}

// What's going on here?
$user->access ^= 2;
```

Good:
```
class User
{
    public const ACCESS_READ = 1;

    public const ACCESS_CREATE = 2;

    public const ACCESS_UPDATE = 4;

    public const ACCESS_DELETE = 8;

    // User as default can read, create and update something
    public $access = self::ACCESS_READ | self::ACCESS_CREATE | self::ACCESS_UPDATE;
}

if ($user->access & User::ACCESS_UPDATE) {
    // do edit ...
}

// Deny access rights to create something
$user->access ^= User::ACCESS_CREATE;
```

## 3. Hạn chế dùng quá nhiều câu lệnh lồng nhau
Quá nhiều câu lệnh if - else lồng nhau sẽ khiến code của bạn khó đọc hơn

Bad:
```
function isShopOpen($day): bool
{
    if ($day) {
        if (is_string($day)) {
            $day = strtolower($day);
            if ($day === 'friday') {
                return true;
            } elseif ($day === 'saturday') {
                return true;
            } elseif ($day === 'sunday') {
                return true;
            }
            return false;
        }
        return false;
    }
    return false;
}
```

Good:
```
function isShopOpen(string $day): bool
{
    if (empty($day)) {
        return false;
    }

    $openingDays = ['friday', 'saturday', 'sunday'];

    return in_array(strtolower($day), $openingDays, true);
}
```

## 4. Sử dụng toán tử so sánh giống hệt nhau
Bad:
```
$a = '42';
$b = 42;

if ($a != $b) {
    // The expression will always pass
}
```

Khi so sánh `$a != $b`  sẽ trả về `false` tuy nhiên mong muốn của chúng ta là `true`

Good:
```
$a = '42';
$b = 42;

if ($a !== $b) {
    // The expression is verified
}
```

## 5. Tên hàm nên nói lên những gì chúng làm
Bad:
```
class Email
{
    //...

    public function handle(): void
    {
        mail($this->to, $this->subject, $this->body);
    }
}

$message = new Email(...);
// What is this? A handle for the message? Are we writing to a file now?
$message->handle();
```

Good:
```
class Email
{
    //...

    public function send(): void
    {
        mail($this->to, $this->subject, $this->body);
    }
}

$message = new Email(...);
// Clear and obvious
$message->send();
```

## 6. Sử dụng toán tử kết hợp null ??
Toán tử kết hợp null (??) được giới thiệu từ phiên bản PHP 7. Cú pháp:
```
$var = $var1 ?? $var2
```
$var sẽ có giá trị của $var1 nếu $var1 tồn tại và không null, ngược lại thì $var sẽ mang giá trị của $var2. Sử dụng toán tử này hợp lí có thể làm cho code dễ đọc hơn khá nhiều.

Bad:
```
if (isset($_GET['name'])) {
    $name = $_GET['name'];
} elseif (isset($_POST['name'])) {
    $name = $_POST['name'];
} else {
    $name = 'nobody';
}
```

Good:

```
$name = $_GET['name'] ?? $_POST['name'] ?? 'nobody';
```

## 7. Không sử dụng cờ làm tham số cho hàm
Các biến cờ cho người dùng biết hàm này thực hiện nhiều hơn một chức năng. Hãy tách thành các hàm khác nhau nếu chúng hoạt động theo các đường dẫn khác nhau dựa trên biến cờ bool. Các hàm này có tên đúng với chức năng nó thực hiện thay vì dùng biến cờ bool làm tham số gây khó hiểu.

Bad:

```
function createFile(string $name, bool $temp = false): void
{
    if ($temp) {
        touch('./temp/' . $name);
    } else {
        touch($name);
    }
}
```

Good:
```
function createFile(string $name): void
{
    touch($name);
}

function createTempFile(string $name): void
{
    touch('./temp/' . $name);
}

```


## 8. Hạn chế dùng các điều kiện phủ định

Bad:
```
function isDOMNodeNotPresent(DOMNode $node): bool
{
    // ...
}

if (! isDOMNodeNotPresent($node)) {
    // ...
}
```

Good:
```
function isDOMNodePresent(DOMNode $node): bool
{
    // ...
}

if (isDOMNodePresent($node)) {
    // ...
}
```


**Trên đây là một vài mẹo để viết code clean hơn, các bạn có thể tìm hiểu thêm để viết code tốt hơn.**


# Tổng kết
Có thể thấy clean code là không thể thiếu đối với mỗi lập trình viên, chúng mang lại những lợi ích rất rõ ràng: dễ đọc, dễ hiểu, dễ bảo trì và phát triển,... Vì vậy mỗi lập trình viên hãy tập cho mình thói quen viết code clean, hãy là người có trách nhiệm đối với mỗi dòng code được viết ra.

# Nguồn tham khảo
https://github.com/jupeter/clean-code-php