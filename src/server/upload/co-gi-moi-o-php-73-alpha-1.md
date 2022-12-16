Đội ngũ phát triển **PHP** mới đây đã công bố phiên bản đầu tiên của `PHP 7.3.0 - Alpha 1` đã sẵn sàng. Phiên bản `PHP` `7.3` được xây dựng tiếp nối phiên bản PHP 7.2 - được ra mắt tháng 11 năm ngoái.

Việc tiếp tục mắt `PHP 7.3`, một thời gian ngắn sau phiên bản `7.2` cho thấy tốc độ của chu trình phát triển PHP 7 là một điểm cộng đáng kể cho các Lập trình viên có thể tin tưởng và tiếp tục gắn bó với **PHP**, tin tưởng vào sự phát triển của **PHP** sẽ mạnh mẽ trong thời gian tới.

![](https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2018/06/php-7.3-release-cycle.png?resize=600%2C418)

Trong bài viết này, tôi sẽ chia sẻ những tính năng nổi bật sẽ được ra mắt trong phiên bản 7.3 sắp tới, bao gồm:

## 1 . Có thể thêm dấu phẩy khi gọi hàm.

Việc cho phép thêm dấu phẩy sau lệnh gọi hàm làm cho việc bổ sung tham số trong nhiều ngữ cảnh trở nên thuận tiên hơn, khi bạn gọi hàm có nhiều đối số, đặc biệt là các `variadic functions`.

Từ phiên bản PHP 7.2 , việc thêm dấu phẩy đã được sử dụng trong cú pháp khai báo mảng, cũng nhưng cú pháp `namespace` .
``` php
# PHP 7.2
use Foo\Bar\{
    Foo,
    Bar,
};
 
$foo = [
    'foo',
    'bar',
];
```
### Ví dụ về các trường hợp thường xuyên sử dụng
Trong ngữ cảnh ví dụ dưới đây, việc thêm dấu phẩy sẽ rất có lợi, vì luôn có các giá trị mới được nối vào.
```php
unset(
    $foo,
    $bar,
    $baz,
);
```

Hoặc trong trường hợp bạn muốn gửi một danh sách các biển tới `template engine` bằng cách sử dụng `compact()`.
```php
echo $twig->render(
    'index.html',
    compact(
        'title',
        'body',
        'comments',
    )
);
```
Merge nhiều mảng
```php
$newArray = array_merge(
    $arrayOne,
    $arrayTwo,
    ['foo', 'bar'],
);
```

Bạn có thể debug mọi thứ nhanh chóng với var_dump(), thật tuyệt khi không phải xóa bỏ các dấu phẩy để đoạn mã hoạt động.
```php
var_dump(
    $whatIsInThere,
    $probablyABugInThisOne,
    $oneMoreToCheck,
);
```
Những ví dụ trên chưa hẳn đã đầy đủ, nhưng qua đó, bạn có thể thấy việc cho phép dấu phẩy ở các lời gọi hàm sẽ rất phù hợp trong các ngữ cảnh mà dấu phẩy cần phải có. 

### Trong các lời gọi Method và Closure.
Các lời gọi Method cũng được áp dụng chức năng này:
```php
class Foo
{
  public function __construct(...$args) {
    //
  }
 
  public function bar(...$args) {
    //
  }
 
  public function __invoke(...$args) {
    //
  }
}
 
$foo = new Foo(
  'constructor',
  'bar',
);
 
$foo->bar(
  'method',
  'bar',
);
 
$foo(
  'invoke',
  'bar',
);
```
và `Closure` tương tự
```php
$bar = function(...$args) {
  //
};
 
$bar(
  'closure',
  'bar',
);
```

## 2. JSON_THROW_ON_ERROR flag cho hàm xử lý JSON
PHP hiện có 2 hàm để xử lý JSON là  `json_decode()` và `json_encode()`. Thật không may, cả hai đều không xử lý tối ưu được các lỗi. `json_decode()` trả về `null` khi lỗi, nhưng `null` cũng có thể là một kết quả hợp lệ khi bạn decode một JSON "null". Cách duy nhất để biết khi nào có lỗi xảy ra bằng cách gọi `json_last_error()` hoặc `json_last_erro_msg`,  cách này sẽ trả về lỗi theo cấu trúc mà chúng ta hoặc máy có thể đọc được. `json_encode()` cũng sử dụng cách này, nhưng đỡ hơn là nó sẽ có lỗi rõ ràng hơn. Nhưng cả hai hàm này để tạm dừng chương trìnhkhi có lỗi mặc định hay cảnh báo.

Trong phiên bản 7.3, một tính năng mới được đề xuất thay thế là bổ sung một giá trị flag mới cho `json_decode()` và `json_encode()` là JSON_THROW_ON_ERROR. Khi flag này được truyền, hành vi gây ra lỗi của các hàm trên sẽ thay đổi. `Global error state` sẽ không bị ảnh hưởng, và  khi xảy ra lỗi, flag sẽ được set giá trị, hàm sẽ trả ra `JsonException` với message và code gioosng với` json_last_error()` và` json_last_error_msg()`. JSON_PARTIAL_OUTPUT_ON_ERROR sẽ ghi đè và disable JSON_THROW_ON_ERROR, vì vậy những function đang sử dụng JSON_PARTIAL_OUTPUT_ON_ERROR flag vẫn tiếp tục sử dụng JSON_PARTIAL_OUTPUT_ON_ERROR.

`JsonException` là một class mới là class con của `Exception`.

## 3.  Heredoc and Nowdoc sử dụng thuận tiện hơn
Những thay đổi của cú pháp `Heredoc` và `Nowdoc` được đề xuất trong **php.net RFC** được xây dựng ở bản PHP 7.3, thay đổi nhắm vào việc cải thiện cái nhìn và dễ đọc.
> The heredoc and nowdoc syntaxes have very rigid requirements. This has caused them to be, in-part, eschewed by developers because their usage in code can look ugly and harm readability. This proposal therefore puts forth two changes to the current heredoc and nowdoc syntaxes:
>1. To enable for the closing marker to be indented, and
>2. To remove the new line requirement after the closing marker

Ở bản PHP 7.2 hiện tại :
```php
<?php
class foo {
    public $bar = <<<EOT
bar
EOT;
}
```

Ở phiên bản 7.3:
```php
<?php
class foo {
    public $bar = <<<EOT
    bar
    EOT;
}
```
Dấu lùi dòng của điểm đánh dấu ngoặc đóng, sẽ xác định bao nhiêu khoảng trắng sẽ bị xóa ở mỗi dòng mới trong `heredoc` hay `nowdoc`.
```php
<?php

// 4 spaces of indentation
echo <<<END
      a
     b
    c
    END;
/*
  a
 b
c
*/
```

Ở bản PHP 7.2 hiện tại, một dòng mới bắt buộc phải thêm vào để xác định kết thúc `heredoc` hay `nowdoc`. PHP 7.3 đã loại bỏ yêu cầu này:
```php
<?php

stringManipulator(<<<END
   a
  b
 c
END);

$values = [<<<END
a
b
c
END, 'd e f'];
```

## 4. Bổ sung hàm is_countable()

`is_countable` : Xác minh rằng nội dung của biến là giá trị có thể đếm được không?

Mô tả:  
```php
bool is_countable ( mixed $var )
```
Xác minh nội dung của một biến (dạng mảng, hoặc đối tượng con [Countable](https://secure.php.net/manual/en/class.countable.php)). Hàm sẽ trả về `TRUE` nếu `$var` đếm được, `FALSE` nếu ngược lại.

Ví dụ:
```php
<?php
var_dump(is_countable([1, 2, 3])); // bool(true)
var_dump(is_countable(new ArrayIterator(['foo', 'bar', 'baz']))); // bool(true)
var_dump(is_countable(new ArrayIterator())); // bool(true)
var_dump(is_countable(new stdClass())); // bool(false)
```

## 5. list() Reference Assignment

Hiện tại PHP chỉ có thể sử dụng các `reference assignement` với `list()`. **RFC** đề xuất cú pháp để cover nó  như sau:
```php
$array = [1, 2];
list($a, &$b) = $array;
```

Nó cũng tương đương với:
```php
$array = [1, 2];
$a = $array[0];
$b =& $array[1];

/* Note; cú pháp []=  cũng hoạt động tương tự */
[$a, &$b] = $array;
```
Tất nhiên, điều đó hoạt động giống như `list()` ở phiên bản trước, bạn vẫn có thể sử dụng `list()`  lồng nhau
```php
$array = [1, 2, 3, [3, 4]];
list(&$a, $b,, list(&$c, $d)) = $array;
var_dump($array);

/*
array(4) {
  [0]=>
  &int(1)
  [1]=>
  int(2)
  [2]=>
  int(3)
  [3]=>
  array(2) {
    [0]=>
    &int(3)
    [1]=>
    int(4)
  }
}
*/
```
Hoạt động bình thường với `foreach()`
```php
$array = [[1, 2], [3, 4]];
foreach ($array as list(&$a, $b)) {
    $a = 7;
}
var_dump($array);
/*
array(2) {
  [0]=>
  array(2) {
    [0]=>
    int(7)
    [1]=>
    int(2)
  }
  [1]=>
  array(2) {
    [0]=>
    &int(7)
    [1]=>
    int(4)
  }
}
*/
```
# Tạm kết
Trên đây là những tính năng mới được implement ở phiên bản `PHP 7.3 Alpha 1` được release gần đây, để xem thông tin mới về phiên bản mới nhất của `PHP`, bạn có thể xem bài phát biểu của Rasmus Lerdorf tại [PHP in 2018](https://laravel-news.com/php-in-2018) và cập nhật thông tin tại [thông báo chính thức của PHP.net](https://php.net/archive/2018.php#id2018-06-07-1).

## Nguồn tham khảo
- http://us3.php.net/archive/2018.php#id2018-06-07-1
- https://wiki.php.net/todo/php73