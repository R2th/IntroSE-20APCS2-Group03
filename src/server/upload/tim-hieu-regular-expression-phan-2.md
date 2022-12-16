XIn chào các bạn, bài viết này mình sẽ lại viết tiếp chủ để `Regular Expression` , nếu bạn nào chưa rõ nó là cái gì thì mời các bạn [tham khảo](https://viblo.asia/p/tim-hieu-regular-expressions-trong-php-bJzKmxnY59N) bài này của mình nhé. Hôm nay mình sẽ giới thiệu đến các bạn một số hàm được sử dụng với `Regular Expression` trong PHP và một số các trường hợp mà chúng ta cần Regex.

![](https://images.viblo.asia/f8122e72-3942-4017-8d6d-8ca2db1a3ff7.png)

# Một số hàm sử dụng Regex trong PHP
Ở trong PHP chúng ta có tổng cộng 9 PCRE hàm để sử dụng
* preg_filter - thực hiện tìm kiếm những kết quả theo biểu thức chính quy và thay thế
* preg_grep - trả về mảng các kết quả mà match với pattern
* preg_last_error - trả về lỗi code của lần thực thi regex PCRE cuối cùng
* preg_match && preg_match_all - thực thi khớp với biểu thức chính quy, sự khác nhau tẹo nữa phần dưới mình sẽ nói rõ hơn nhé
* preg_quote - đặt dấu gach chéo ngược trước mỗi ký tự là ký tự đặc biệt trong biểu thức chính quy trong chuỗi đầu vào
* preg_replace - thực thi tìm kiếm những phần tử nào mà khớp với biểu thức chính quy và thay thế nó với chuỗi mà ta cần.
* preg_replace_callback - thực thi tìm kiếm những phần tử nào mà khớp với biểu thức chính quy và thay thế nó với chuỗi mà ta cần và sau đó kết quả sẽ dùng để thực hiện 1 hàm callback khác. Kết quả cuối cùng trả về là input sau khi đã replace và đi qua hàm callback đó.
* preg_split - chia chuỗi bằng biểu thức chính quy

Và theo kinh nghiệm làm việc của mình ý thì hay dùng nhất là 3 hàm `preg_match`, `preg_match_all` và `preg_replace`. 
## preg_match
Hàm này dùng để kiểm tra xem dữ liệu đầu vào có khớp với chuỗi biểu thức chính quy hay không và trả kết quả. Cú pháp
```PHP
preg_match($pattern, $subject, $match, $flags, $offset)
```
Trong đó:
* $pattern là chuối Regex
* $subject là chuỗi cần so khớp
* $match là kết quả trả về, được truyền vào dưới dạng tham chiếu ( có thể bỏ trống nếu không cần dùng)
* $flags là tham số chỉ ra vị trí cắt chuỗi so khớp ( có thể bỏ trống) mặc định **$flag** = 0
* $offset là tham số chỉ ra vị trí bắt đầu của việc match ( có thể bỏ trống) mặc định **$offset** = 0

Mình có ví dụ đơn giản như sau

**2 tham số truyền vào**
```PHP
<?php
$testString = "hello honey";
$check = preg_match('/hello/', $testString);
if ($check) {
    echo 'Khớp chuỗi';
} else {
    echo 'Chuỗi không khớp';
}

//Kết quả: Khớp chuỗi
```

**3 tham số truyền vào**
Cũng như ví dụ trên nhưng tham số thứ 3 như sau 
```PHP
<?php
$testString = "hello honey";
$match
$check = preg_match('/hello/', $testString, $matches);
if ($check) {
    echo '<pre>';
    print_r($matches);
    echo '</pre>';
} else {
    echo 'Chuỗi không khớp';
}

//Kết quả: 
Array
(
    [0] => hello,
)
```

**4 tham số truyền vào**

Cũng là ví dụ trên nhưng lần này mình sẽ trả về vị trí so khớp chuỗi bằng cách truyền thêm tham số thứ 4
```PHP
<?php
$testString = "hello honey hello";
$match
$check = preg_match('/hello/', $testString, $matches, PREG_OFFSET_CAPTURE);
if ($check) {
    echo '<pre>';
    print_r($matches);
    echo '</pre>';
} else {
    echo 'Chuỗi không khớp';
}

//Kết quả: 
Array
(
    [0] => Array(
        [0] => hello
        [1] => 0
    )
    [1] => Array(
        [0] => hello
        [1] => 12
    )
)
```
Ở đây 0 và 12 chính là vị trí bắt đầu chuỗi khớp với pattern

**5 tham số truyền vào**
Cũng là ví dụ ở trên nhưng chúng ta sẽ truyền tham số thứ 5 vào nhé
```PHP
<?php
$testString = "hello honey hello";
$match
$check = preg_match('/hello/', $testString, $matches, PREG_OFFSET_CAPTURE, 11);
if ($check) {
    echo '<pre>';
    print_r($matches);
    echo '</pre>';
} else {
    echo 'Chuỗi không khớp';
}

//Kết quả: 
Array
(
    [0] => Array(
        [0] => hello
        [1] => 12
    )
)
```
Chúng ta truyền vào tham số thứ 5 này là 11 thì ý muốn nói là hàm sẽ regex từ vị trí số 11 của chuỗi đầu vào.
## preg_match_all
Hàm này có tác dụng so khớp toàn bộ các pattern trong chuỗi. Còn lại tham số truyền vào thì y hệt như hàm `preg_match` mình đã đề cập ở trên.
```PHP
preg_match_all($pattern, $subject, $match, $flags, $offset)
```
Trong đó:
* $pattern là chuối Regex
* $subject là chuỗi cần so khớp
* $match là kết quả trả về, được truyền vào dưới dạng tham chiếu ( có thể bỏ trống nếu không cần dùng)
* $flags là tham số chỉ ra vị trí cắt chuỗi so khớp ( có thể bỏ trống) mặc định **$flag** = 0
* $offset là tham số chỉ ra vị trí bắt đầu của việc match ( có thể bỏ trống) mặc định **$offset** = 0
Mình có ví dụ đơn giản như sau: 
```PHP
<?php
   $userinfo = "Name: <b>John Poul</b> <br> Title: <b>PHP Guru</b>";
   preg_match("/<b>(.*)<\/b>/U", $userinfo, $pat_array);
   echo "<pre>";
  print_r($pat_array);
  echo "</pre>";
?>
// Kết quả
Array
(
    [0] => John Poul
    [1] => John Poul
)
```

Nếu ta dùng `preg_match_all` thì kết quả như sau
```PHP
Array
(
    [0] => Array
        (
            [0] => John Poul
            [1] => PHP Guru
        )

    [1] => Array
        (
            [0] => John Poul
            [1] => PHP Guru
        )
)
```
Sự khác nhau giữa hàm `preg_match_all()` và `preg_match()` đó là `preg_match_all()` thì nó sẽ match tất cả các đoạn khớp trong chuỗi, còn hàm `preg_match()` nó sẽ chỉ match với cái đầu tiên mà nó gặp , còn các đoạn tiếp theo nó sẽ không match nữa. 
## preg_replace
```PHP
preg_replace($pattern, $stringReplacement, $subject, $limit, $count)
```
* $pattern là biểu thức chính quy mà các bạn muốn match
* $stringReplacement là chuỗi thay thế cho kết quả tìm được
* $subject là chuỗi mà các bạn cần tìm kiếm và thay thế
* $limit là giới hạn số lần thay thế chuỗi , mặc định $limit = -1 là không giới hạn ( có thể bỏ trống )
* $count là số lần thay thế chuỗi khi sử dụng hàm, được sử dụng dưới dạng tham chiếu ( có thể bỏ trống )

Ví dụ
```PHP
<?php
   $age = "He was 24 years old";
   $updateAge = preg_replace("([0-9]+)", "30", $age);
   
   print $updateAge;
?>

//Ket qua 
He was 30 years old
```
# Một số các ví dụ
## Validate Email
```PHP
function validateEmail($email)
{
    $pattern ="/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/"

    if (preg_match($pattern, $email)) {
        return true;
    }

    return false;
}
```
## Validate URL
```PHP
function validateURL($url)
{
    $pattern = "|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i";
    
    return preg_match($pattern, $url);
}
```
## Blank
Nếu như các bạn có một đoạn câu hỏi như sau 
"Tên tôi là ___ . Tôi đên từ ____"

Yêu cầu đề bài là trong đoạn text gửi lên phải có đoạn blank, đó chính là tối thiểu 3 dấu gạch dưới thì mới pass, và có tối đa là 5 blank.
```PHP
function checkBlank($input)
{
    $regex = '/_{3,}/';
    
    return preg_match($regex, $input);
}

function checkNumberOfBlank($input)
{
    $regex = '/_{3,}/';
    
    if (preg_match_all($regex, $input, $matches)) {
        $numberBlank = count($matches[0]);
        if ($numberBlank < 5) {
            return true;
        }
    }
    
    return false;
}
```
## Validate alpha
```PHP
function validateAlpha($input)
{
    return preg_match("/^[A-Za-z0-9_- ]+$/", $input);
}
```

## Get domain from URL
```PHP
function getDomain($url)
{
    $pattern = '/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i';
    if (preg_match($pattern, $url, $matches)) {
        return $matches[1];
    }
    
    return null;
}

kết quả trả về
array:2 [▼
  0 => "https://viblo.asia/posts/Qbq5QNjGKD8/edit"
  1 => "viblo"
]
```
# Kết luận
Vậy qua một vài những điều mình tổng hợp mà mình tìm hiểu được thì mong rằng cũng giúp các bạn hiểu được thêm phần nào Regex và các hàm dùng Regex trong PHP. Cảm ơn các bạn đã bạn đã đọc bài viết của mình.
# Tham khảo
https://www.php.net/manual/en/ref.pcre.php