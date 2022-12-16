# Traits là gì?
Nhiều developer nhầm lẫn "Traits", một khái niệm mới trong php 5.4.0. Traits hoạt động như các lớp nhưng lại giống như interface.Một đặc điểm của Traits là triển khai thực hiện 1 phần (vd: hằng số, thuộc tính, phương thức) có thể được dùng bởi một hay nhiều class php.

Bạn có thể quen thuộc với các đặc điểm của trait trong các ngôn ngữ khác. Php traits giống như là các modules composable của Ruby, or mixins (vue...).

Khái niệm Trait chúng ta hiểu đơn giản như sau: gom những đoạn code trùng lặp ra một nơi sử dụng ơ nhiều nơi và nếu cần thay đổi bạn chỉ cần sửa đổi ở một file duy nhất.

Nó là một bổ sung cho thừa kế truyền thống, áp dụng cho các lớp mà không yêu cầu thừa kế.
 
Cũng giống như Abstract Class chúng ta không thể khởi tạo một đối tượng mới từ Traits.
## Cách sử dụng Trait
Ví dụ ta có 1 bài Blog muốn get Post content, và Comment cũng muốn get bài Post thì ta viết như sau:

sử dụng từ khóa `trait` để khai báo 1 trait

```
<?php
trait PostCommon{
    public function getPost()
    {
        return 'Post content';
    }
}
```

class Blog
```
<?php
class Blog{
    use PostCommon;
    
    public function showPost()
    {
        return $this->getPost();
    }
}
```

class Comment
```
class Comment{
    use PostCommon;
    
    public function showPost()
    {
        return $this->getPost();
    }
}
```
dùng **use** để import trait

## Tại sao chúng ta sử dụng traits?

PHP chỉ cho phép mỗi class thừa kế từ tối đa là 1 class khác.

trong khi trait có thể hỗ trợ đa kế thừa. ví dụ ta tạo thêm một trait để get user name
```
<? php 
trait UserCommon{
    public function getNameUser()
    {
        return 'Name user';
    }

}
```
cách dùng thêm trait:

```
class Comment{
    use PostCommon;
    use UserCommon;
    
    public function showPost()
    {
        return $this->getPost();
    }
}
```

Nhiều bạn sẽ thắc mắc tại tai sao không dùng implement nó cũng hỗ trợ đa kế thừa?. 
Implements nó giúp cho chúng ta thực hiện lại các khuân mẫu mà interface đã định ra. Interface thì chỉ có thể khai báo phương thức chứ không được triển khai code cho phương thức đó, còn trait thì có thể.

-Và trait giúp chúng ta tránh việc lặp code

# Generator là gì?
-Generator là thuật ngữ được PHP hỗ trợ từ phiên bản 5.5 trở lên, nó hỗ trợ chúng ta có thể truy xuất dến dữ liệu trong mảng mà không cần lưu trữ mảng trên bộ nhớ.

-Để sử dụng generators thì chúng ta sẽ dùng từ khóa **yield** thay cho return thông thường

-Một số lưu ý khi dùng generator

- chỉ dùng được một lần
- chỉ có thể lặp theo một hướng
## Một số hàm trong generator
```
Generator::current — Get the yielded value
Generator::getReturn — Get the return value of a generator
Generator::key — Get the yielded key
Generator::next — Resume execution of the generator
Generator::rewind — Rewind the iterator
Generator::send — Send a value to the generator
Generator::throw — Throw an exception into the generator
Generator::valid — Check if the iterator has been closed
Generator::__wakeup — Serialize callback
```
 
##  so sánh khi dùng generator
case 1: biến max = 1000000;

khi ko dùng generator

```
function myGenerator($max) {
    $array = [];
    for ($i=0; $i < $max; $i++) {
        $array[] = $i;
    }
    return $array;
}

$start_time = microtime(true);
$total = 0;
foreach (myGenerator(1000000) as $value) {
    $total += $value;
}
$end_time = microtime(true);
echo "Thời gian thực hiện: ", bcsub($end_time, $start_time, 4), PHP_EOL;
echo "Bộ nhớ sử dụng: ", memory_get_peak_usage(true), PHP_EOL;
```

kết quả
```
Thời gian thực hiện: 0.2370
Bộ nhớ sử dụng: 31457280
```

khi sử dụng generator, ta viết lại function như sau:
```
function myGenerator($max) {
    $array = [];
    for ($i=0; $i < $max; $i++) {
        yield $i;
    }
}
```
kết quả sau khi chạy:
```
Thời gian thực hiện: 0.2340
Bộ nhớ sử dụng: 2097152
```

case 2: ta tăng biến max = 10000000;


ko dùng generator
```
PHP Fatal error:  Allowed memory size of 134217728 bytes exhausted (tried to allocate 100663304 bytes) in D:\xampp\php\test.php on line 5

Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 100663304 bytes) in D:\xampp\php\test.php on line 5
```

có dùng:

```
Thời gian thực hiện: 2.7558
Bộ nhớ sử dụng: 2097152
```

Theo kết quả test ta thấy dùng generator giúp tiết kiệm memory của server như thế nào =))
## Associative arrays trong generator
PHP cũng hỗ trợ các mảng kết hợp và các generator cũng như thế. Ví dụ:

```
function Gen()
{
    yield 'today' => 'Hôm nay trời đẹp';
    yield 'tomorrow' => 'Ngày mai trời nắng';
}
foreach(Gen() as $genKey => $genValue){
    echo "{$genKey} => {$genValue}", PHP_EOL;    
}
```

kết quả sau khi chạy:
```
today => Hôm nay trời đẹp
tomorrow => Ngày mai trời nắng

```


## Tại sao nên sử dụng generator

Trong nhiều trường hợp chúng ta muốn xử lý một tập dữ liệu lớn (ví dụ như dữ liệu từ các file log hệ thống, csv, xml...) hoặc muốn tính toán xử lý trên một mảng với vô cùng lớn các phần tử. Rõ ràng chúng ta không hề muốn việc xử lý trên các tập dữ liệu đó chiếm dụng một lượng lớn thậm chí là tất cả bộ nhớ của chúng ta và việc nên làm là tìm cách tiết kiệm bộ nhớ càng nhiều càng tốt. Thay vì phải lưu trữ cả một tập dữ liệu lớn như vậy, chúng ta có thể sử dụng các generators để lấy ra các dữ liệu nào cần thiết.

# Tài liệu tham khảo
https://secure.php.net/manual/en/language.generators.syntax.php

https://secure.php.net/manual/en/language.generators.overview.php

http://php.net/manual/en/language.oop5.traits.php

...