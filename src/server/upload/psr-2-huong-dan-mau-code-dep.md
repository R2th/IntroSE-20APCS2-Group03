Hướng dẫn này là mở rộng của PSR-1, tiêu chuẩn code cơ bản.

Mục đích của hướng dẫn này là nhằm giảm thiểu sự không khớp nhau giữa các tác giả khi biên dịch code, bằng cách đặt ra các quy chuẩn và kỳ vọng khi định dạng code PHP.

Các quy tắc về phong cách ở đây có nguồn gốc từ sự tương đồng giữa các dự án thành viên khác nhau. Khi các tác giả khác nhau cộng tác trên nhiều dự án, nó giúp có một bộ nguyên tắc được sử dụng trong tất cả các dự án đó. Vì vậy, lợi ích của tài liệu hướng dẫn này không nằm trong các quy tắc, mà là trong việc chia sẻ các quy tắc đó.

# Tóm tắt nội dung chính:

- Code PHẢI theo chuẩn PSR-1.
- Code PHẢI dùng 4 phím Space để thụt dòng, không phải Tab
- KHÔNG ĐƯỢC có 1 giới hạn cứng cho độ dài của 1 dòng, giới hạn mềm PHẢI là tối đa 120 kí tự, NÊN là ít hơn hoặc bằng 80 kí tự.
- Sau khi định nghĩa 1 khối `namespace` PHẢI để 1 dòng trống sau khối đó. Áp dụng tương tự cho 1 khối `use`.
- Ngoặc nhọn mở cho class PHẢI ở dòng dưới so với dòng định nghĩa class, và ngoặc nhọn đóng class phải ở dòng dưới thân class.
- Ngoặc nhọn mở cho phương thức PHẢI ở dòng dưới so với dòng định nghĩa phương thức, và ngoặc nhọn đóng phương thức phải ở dòng dưới thân phương thức.
- Tính đóng mở(public, protected, private) PHẢI được định nghĩa ở tất cả các thuộc tính và phương thức; `abstract` và `final` PHẢI định nghĩa trước tính đóng mở, `static` PHẢI định nghĩa sau tính đóng mở.
- Các từ khóa về cấu trúc điều khiển PHẢI có 1 space ở đằng sau nó, tuy nhiên với việc gọi hàm và phương thức thì KHÔNG ĐƯỢC.
- Ngoặc nhọn mở cho cấu trúc điều khiển PHẢI ở cùng dòng với dòng định nghĩa cấu trúc điều khiển, và ngoặc nhọn đóng cấu trúc điều khiển PHẢI ở dòng dưới thân cấu trúc điều khiển.
- Ngoặc đơn mở cho cấu trúc điều khiển KHÔNG ĐƯỢC có space nào ở đằng sau, và ngoặc đơn đóng cấu trúc điều khiển KHÔNG ĐƯỢC có space nào ở đằng trước.
## Ví dụ
```
<?php
namespace Vendor\Package;

use FooInterface;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

class Foo extends Bar implements FooInterface
{
    public function sampleMethod($a, $b = null)
    {
        if ($a === $b) {
            bar();
        } elseif ($a > $b) {
            $foo->bar($arg1);
        } else {
            BazClass::bar($arg2, $arg3);
        }
    }

    final public static function bar()
    {
        // method body
    }
}
```
# Toàn thể
## Tiêu chuẩn code cơ bản

Code PHẢI theo chuẩn [PSR-1](https://viblo.asia/p/psr-1-chuan-viet-code-co-ban-1Je5EjJjKnL)

## Các tệp

Tất cả các tệp PHP đều phải kết thúc dòng theo chuẩn Unix LF.

Tất cả các tệp PHP đều phải kết thúc với 1 dòng trống duy nhất.

Nếu file chỉ là PHP thuần thì PHẢI bỏ qua thẻ đóng `?>`
## Dòng
KHÔNG ĐƯỢC có 1 giới hạn cứng cho độ dài của 1 dòng.

Giới hạn mềm cho 1 dòng PHẢI là tối đa 120 kí tự, các trình soát tự động PHẢI cảnh báo nhưng KHÔNG ĐƯỢC thông báo lỗi khi vi phạm giới hạn mềm.

Độ dài của dòng KHÔNG NÊN nhiều hơn 80 ký tự; dòng nhiều hơn 80 ký tự thì nên tách thành các dòng phụ mà mỗi dòng phụ cũng không được quá 80 ký tự.

Các dòng trống CÓ THỂ được thêm vào để tăng tính dễ đọc và phân biệt các khối code có liên hệ với nhau.

KHÔNG ĐƯỢC có nhiều hơn 1 lệnh/dòng.
## Cú pháp thụt dòng
Code PHẢI thụt dòng bằng 4 space, và KHÔNG ĐƯỢC dùng Tab để thụt dòng.

Lý do: Chỉ sử dụng space và không dùng lẫn các space với các tab giúp tránh các nhầm lẫn với phần phân biệt sự khác nhau ở version control, bản vá, lịch sử và chú thích. Việc dùng space cũng sẽ giúp việc thêm các việc thụt dòng phụ cho mục đích căn chỉnh trở nên dễ dàng hơn.
## Từ khóa và True/False/Null
Từ khóa ở trong PHP PHẢI ở dạng viết thường toàn bộ(lower case)

Các hằng ở PHP như `true`,`false` và `null` PHẢI ở dạng viết thường toàn bộ(lower case)
# Định nghĩa namespace và use
Khi có định nghĩa `namespace` thì ngay sau đó PHẢI là 1 dòng trống.

Khi có định nghĩa `use` thì tất cả đều ở sau `namespace`

Mỗi định nghĩa chỉ dùng 1 `use`

Sau khối `use` phải có dòng trống

```
<?php
namespace Vendor\Package;

use FooClass;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

// ... additional PHP code ...
```
# Class, thuộc tính và phương thức
Class ở đây ám chỉ tất cả các class, interface và trait.
## `extends` và `implements`
Từ khóa `extends` và `implements` PHẢI ở cùng dòng với tên class.

Ngoặc nhọn mở cho class PHẢI ở dòng dưới so với dòng định nghĩa class, và ngoặc nhọn đóng class phải ở dòng dưới thân class.
```
<?php
namespace Vendor\Package;

use FooClass;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

class ClassName extends ParentClass implements \ArrayAccess, \Countable
{
    // constants, properties, methods
}
```
Danh sách các `implements` CÓ THỂ chia ra làm nhiều dòng, nhưng khi làm vậy thì phần tử đầu tiên PHẢI ở dòng tiếp theo so với dòng tên class, và mỗi dòng CHỈ ĐƯỢC chứa duy nhất 1 interface.
```
<?php
namespace Vendor\Package;

use FooClass;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

class ClassName extends ParentClass implements
    \ArrayAccess,
    \Countable,
    \Serializable
{
    // constants, properties, methods
}
```
## Thuộc tính
Tính đóng mở PHẢI được định nghĩa ở tất cả các thuộc tính.

Từ khóa `var` KHÔNG ĐƯỢC dùng để định nghĩa thuộc tính.

KHÔNG ĐƯỢC có nhiều hơn 1 thuộc tính được định nghĩa ở mỗi dòng.

Tên thuộc tính KHÔNG NÊN có gạch dưới đơn ở đằng trước(ví dụ như `$_quandeptrai`) để thể hiện tính đóng mở là `private` hay là `protected`.

Ví dụ cho cách viết đúng:
```
<?php
namespace Vendor\Package;

class ClassName
{
    public $foo = null;
}
```
## Phương thức
Tính đóng mở PHẢI được định nghĩa ở tất cả các phương thức.

Tên phương thức KHÔNG NÊN có gạch dưới đơn ở đằng trước để thể hiện tính đóng mở là `private` hay là `protected`.

Tên của phương thức KHÔNG ĐƯỢC có dấu cách đằng sau khi định nghĩa. Ngoặc nhọn mở cho phương thức PHẢI ở dòng dưới so với dòng định nghĩa phương thức, và ngoặc nhọn đóng phương thức phải ở dòng dưới thân phương thức. Ngoặc đơn mở cho phương thức KHÔNG ĐƯỢC có space nào ở đằng sau, và ngoặc đơn đóng phương thức KHÔNG ĐƯỢC có space nào ở đằng trước.

Ví dụ cho cách viết đúng.
```
<?php
namespace Vendor\Package;

class ClassName
{
    public function fooBarBaz($arg1, &$arg2, $arg3 = [])
    {
        // method body
    }
}
```
## Tham số của phương thức
Trong danh sách các thuộc tính, KHÔNG ĐƯỢC có khoảng trống trước dấu phẩy và PHẢI có 1 khoảng trống sau dấu phẩy(1 phím space)

Tham số có chứa giá trị mặc định PHẢI cho ở cuối danh sách tham số.
```
<?php
namespace Vendor\Package;

class ClassName
{
    public function foo($arg1, &$arg2, $arg3 = [])
    {
        // method body
    }
}
```
Tham số CÓ THỂ chia ra làm nhiều dòng khác nhau. Khi chia ra làm nhiều dòng khác nhau,  tham số đầu tiên PHẢI ở dòng tiếp theo so với dòng tên class, và mỗi dòng CHỈ ĐƯỢC chứa duy nhất 1 tham số.

Khi chia dòng như vậy thì ngoặc đơn đóng  và ngoặc nhọn mở PHẢI cùng dòng với nhau và cách nhau 1 dấu space
```
<?php
namespace Vendor\Package;

class ClassName
{
    public function aVeryLongMethodName(
        ClassTypeHint $arg1,
        &$arg2,
        array $arg3 = []
    ) {
        // method body
    }
}
```
## `abstract`, `final` và `static`
Khi được gọi tới `abstract` và `final` PHẢI định nghĩa trước tính đóng mở.

Khi được gọi tới `static` PHẢI định nghĩa sau tính đóng mở.
```
<?php
namespace Vendor\Package;

abstract class ClassName
{
    protected static $foo;

    abstract protected function zim();

    final public static function bar()
    {
        // method body
    }
}
```
## Phương thức và hàm
   Khi gọi phương thức hay hàm nào đó, KHÔNG ĐƯỢC có khoảng trắng giữa hàm(phương thức) và ngoặc đơn mở, KHÔNG ĐƯỢC có khoảng trắng sau dấu ngoặc đơn mở, và KHÔNG ĐƯỢC có khoảng trắng trước ngoặc đơn đóng. Trong danh sách tham số KHÔNG ĐƯỢC có khảng trống trước dấu phẩy và PHẢI có khoảng trống sau dấu phẩy.
```
<?php
bar();
$foo->bar($arg1);
Foo::bar($arg2, $arg3);
```
Tham số CÓ THỂ chia ra làm nhiều dòng khác nhau. Khi chia ra làm nhiều dòng khác nhau,  tham số đầu tiên PHẢI ở dòng tiếp theo so với dòng tên class, và mỗi dòng CHỈ ĐƯỢC chứa duy nhất 1 tham số.
# Cấu trúc điều khiển
- PHẢI có 1 dấu cách ở đăng sau từ khóa của câu lệnh điều khiển.
- KHÔNG ĐƯỢC có dấu cách sau ngoặc nhọn mở.
- KHÔNG ĐƯỢC có dấu cách trước ngoặc nhọn đóng.
- Ngoặc đơn đóng  và ngoặc nhọn mở PHẢI cùng dòng với nhau và cách nhau 1 dấu space.
- Phần thân cấu trúc điều khiển PHẢI thụt dòng.
- Ngoặc đơn đóng PHẢI ở dòng tiếp theo so với dòng kết thúc thân.
- Thân của mỗi cấu trúc điều khiển phải được gói gọi trong ngoặc. Điều này sẽ giúp chuẩn hóa về cách trình bày của cấu trúc điều khiển, cũng nhưng giảm thiểu lỗi khi thêm lệnh.
## `if`, `elseif`, `else`
Viết như sau
```
<?php
if ($expr1) {
    // if body
} elseif ($expr2) {
    // elseif body
} else {
    // else body;
}
```
NÊN dùng `elseif` thay vì `else if ` để các từ khóa trông liền mạch hơn
## `switch`, `case`
Ví dụ về `switch`. `case` PHẢI thụt 1 khoảng 4 space so với `switch` (quy tắc cú pháp thụt dòng), và `break` cũng phải thụt khoảng tương đương so với `case`. PHẢI có 1 comment để thể hiện chủ ý không break trong các trường hợp case không rỗng
```
<?php
switch ($expr) {
    case 0:
        echo 'First case, with a break';
        break;
    case 1:
        echo 'Second case, which falls through';
        // no break
    case 2:
    case 3:
    case 4:
        echo 'Third case, return instead of break';
        return;
    default:
        echo 'Default case';
        break;
}
```
## `while`, `do while`
Ví dụ về `while`
```
<?php
while ($expr) {
    // structure body
}
```
Ví dụ của `do while`
```
<?php
do {
    // structure body;
} while ($expr);
```
## `for`
```
<?php
for ($i = 0; $i < 10; $i++) {
    // for body
}
```
## `foreach`
```
<?php
foreach ($iterable as $key => $value) {
    // foreach body
}
```
## `try`,`catch`
```
<?php
try {
    // try body
} catch (FirstExceptionType $e) {
    // catch body
} catch (OtherExceptionType $e) {
    // catch body
}
```
# Cấu trúc đóng
Cấu trúc đóng PHẢI được định nghĩa với dấu cách sau từ khóa `function`, và trước và sau từ khóa `use` đều phải có dấu cách.

Ngoặc nhọn mở PHẢI cùng dòng với cấu trúc đóng, và ngoặc nhọn đóng PHẢI ở dòng tiếp theo so với phần thân.

KHÔNG ĐƯỢC có khoảng trắng sau dấu ngoặc đơn mở, và KHÔNG ĐƯỢC có khoảng trắng trước ngoặc đơn đóng.

Trong danh sách tham số KHÔNG ĐƯỢC có khảng trống trước dấu phẩy và PHẢI có khoảng trống sau dấu phẩy.

Tham số có chứa giá trị mặc định PHẢI cho ở cuối danh sách tham số.
```
<?php
$closureWithArgs = function ($arg1, $arg2) {
    // body
};

$closureWithArgsAndVars = function ($arg1, $arg2) use ($var1, $var2) {
    // body
};
```
Tham số CÓ THỂ chia ra làm nhiều dòng khác nhau. Khi chia ra làm nhiều dòng khác nhau,  tham số đầu tiên PHẢI ở dòng tiếp theo so với dòng tên class, và mỗi dòng CHỈ ĐƯỢC chứa duy nhất 1 tham số.

Khi chia dòng như vậy thì ngoặc đơn đóng  và ngoặc nhọn mở PHẢI cùng dòng với nhau và cách nhau 1 dấu space
```
<?php
$longArgs_noVars = function (
    $longArgument,
    $longerArgument,
    $muchLongerArgument
) {
    // body
};

$noArgs_longVars = function () use (
    $longVar1,
    $longerVar2,
    $muchLongerVar3
) {
    // body
};

$longArgs_longVars = function (
    $longArgument,
    $longerArgument,
    $muchLongerArgument
) use (
    $longVar1,
    $longerVar2,
    $muchLongerVar3
) {
    // body
};

$longArgs_shortVars = function (
    $longArgument,
    $longerArgument,
    $muchLongerArgument
) use ($var1) {
    // body
};

$shortArgs_longVars = function ($arg) use (
    $longVar1,
    $longerVar2,
    $muchLongerVar3
) {
    // body
};
```
Quy tắc vẫn đúng khi dùng cấu trúc đóng như 1 tham số
```
<?php
$foo->bar(
    $arg1,
    function ($arg2) use ($var1) {
        // body
    },
    $arg3
);
```
# Kết luận
Hướng dẫn này đang bỏ qua 1 số phần: 
- Khai báo biến và hằng global
- Khai báo hàm
- Toán tử

- .....

Mọi người CÓ THỂ mở rộng hướng dẫn này ở trong tương lai.
# Tài liệu tham khảo
https://www.php-fig.org/psr/psr-2/