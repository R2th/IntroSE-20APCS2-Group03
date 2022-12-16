Hiện nay ngôn ngữ PHP có rất nhiều framework điển hình như Laravel, CakePHP, CodeIgniter, ... Ngoài các hàm mà php đã hỗ trợ thì các framework cũng đã hộ trợ rất nhiều các hàm để người lập trình dễ dàng thao tác với array, string, math. Tuy nhiên để hiểu chi tiết và các hàm được xây dựng và hoạt động như nào thì không phải người lập trình nào cũng nắm được. Bài viết này sẽ giới thiệu cho chúng ta cách sử dụng cũng như cách viết của một số hàm hữu dụng.
![](https://images.viblo.asia/421d26b1-1562-4a54-9ba8-a154f21913b6.jpg)

# 1. Array
* all
trả về là `true` nếu kết quả trả về là tất các các giá trị trong mảng và là `false` nếu ngược lại
```php
function all($items, $func)
{
    return count(array_filter($items, $func)) === count($items);
}
```
ví dụ 
```php
all([2, 3, 4, 5], function ($item) {
    return $item > 1;
}); // true
```

* any
trả về là `true` nếu kết quả trả về ít nhất một phần tử trong mảng  và là `false` nếu ngược lại
```php
function any($items, $func)
{
    return count(array_filter($items, $func)) > 0;
}
```
```php
any([1, 2, 3, 4], function ($item) {
    return $item < 2;
}); // true
```
* deepFlatten
Làm phẳng một mảng nhiều chiều thành mảng một chiều.
```php
function deepFlatten($items)
{
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            $result[] = $item;
        } else {
            $result = array_merge($result, deepFlatten($item));
        }
    }

    return $result;
}
```
ví dụ 

```php
deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]
```

*  **drop**  trả về một mảng với n phần tử được loại bỏ từ bên trái
```php
function drop($items, $n = 1)
{
    return array_slice($items, $n);
}
```
ví dụ 
```php
drop([1, 2, 3]); // nếu khồng truyền vào tham số thì mặc định một phần từ bên trái bị loại bỏ khi này phần từ đâu tiên bên trái sẽ bị loại bỏ kết quả trả về còn magnr chưa 2 phần tử [2,3]
drop([1, 2, 3], 2); // [3]
```
* **findLast**  trả về phần tử cuối cùng thông qua điều kiện đã cho.

```php
function findLast($items, $func)
{
    $filteredItems = array_filter($items, $func);

    return array_pop($filteredItems);
}
```
ví dụ
```php
findLast([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 1;
});
// 3
```
thông qua điều kiện có hai phân từ thỏa mãn [1, 3] và ta lấy phần tử cuối cùng là **3**

* **findLastIndex** trả về chỉ mục của phần tử cuối cùng thông qua điều kiện đã cho

```php
function findLastIndex($items, $func)
{
    $keys = array_keys(array_filter($items, $func));

    return array_pop($keys);
}
```

ví dụ

```php
findLastIndex([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 1;
});
// 2
```
* **groupBy** Nhóm các phần tử của mảng dựa trên hàm cho sẵn

```php
function groupBy($items, $func)
{
    $group = [];
    foreach ($items as $item) {
        if ((!is_string($func) && is_callable($func)) || function_exists($func)) {
            $key = call_user_func($func, $item);
            $group[$key][] = $item;
        } elseif (is_object($item)) {
            $group[$item->{$func}][] = $item;
        } elseif (isset($item[$func])) {
            $group[$item[$func]][] = $item;
        }
    }

    return $group;
}
```
ví dụ 
```php
groupBy(['one', 'two', 'three'], 'strlen'); // [3 => ['one', 'two'], 5 => ['three']]
```

như ví dụ ở trên ta dựa vào hàm **strlen** để nhóm các phần tử có cùng số kí tự vào một nhóm với key là số kí tự.

* **hasDuplicates** kiểm tra danh sách các phần tử trong mảng nếu có ít nhất hai giá trị phần tử trùng lặp thì trả về **true** còn các giá trị của mảng là duy nhất thì trả về **false**
```php
function hasDuplicates($items)
{
    return count($items) > count(array_unique($items));
}
```
ví dụ

```php
hasDuplicates([1, 2, 3, 4, 5, 5]); // true
hasDuplicates([1, 2, 3, 4, 5]); // false
```
* **head** trả về giá trị  phần tử đầu tiên của mảng

```php
function head($items)
{
    return reset($items);
}
```
ví dụ
```php
head([1, 2, 3]); // 1
```
* **last** trả về giá trị phần tử cuối cùng của mảng
```php
function last($items)
{
    return end($items);
}
```
ví dụ
```php
last([1, 2, 3]); // 3
```
* **pluck** lấy tất cả giá trị có chung key đã cho sẵn
```php
function pluck($items, $key)
{
    return array_map( function($item) use ($key) {
        return is_object($item) ? $item->$key : $item[$key];
    }, $items);
}
```
ví dụ 

```php
pluck([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
], 'name');
// ['Desk', 'Chair']
```
ở ví dụ trên hàm **pluck** trả về một mảng có chung key là '*name*' mà ta truyền vào.
* **pull** để lọc ra các giá trị được truyền vào.
```php
function pull(&$items, ...$params)
{
    $items = array_values(array_diff($items, $params));
    
    return $items;
}
```
ví dụ

```php
$items = ['a', 'b', 'c', 'a', 'b', 'c'];
pull($items, 'a', 'c'); // $items will be ['b', 'b']
```
ở ví dụ trên khi truyền vào hàm pull 2 giá trị 'a', 'c' thì hai giá trị này đã bị loại bỏ ra khỏi mảng.

* **reject** loại bỏ các phần tử không thỏa mãn điều kiện cho trước
```php
function reject($items, $func)
{
    return array_values(array_diff($items, array_filter($items, $func)));
}
```

ví dụ

```php
reject(['Apple', 'Pear', 'Kiwi', 'Banana'], function ($item) {
    return strlen($item) > 4;
}); // ['Pear', 'Kiwi']
```

* **remove** loại bỏ các phần tử trong mảng khi hàm trả về là false
```php
function remove($items, $func)
{
    $filtered = array_filter($items, $func);

    return array_diff_key($items, $filtered);
}
```

ví dụ 

```php
remove([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 0;
});
// [0 => 1, 2 => 3]
```

* **tail** lấy tất cả các phần từ của mảng trừ phần tử đầu tiên
```php
function tail($items)
{
    return count($items) > 1 ? array_slice($items, 1) : $items;
}
```
ví dụ
```php
tail([1, 2, 3]); // [2, 3]
```
* **take** lấy ra một mảng gồm n phần tử đầu tiên
```php
function take($items, $n = 1)
{
    return array_slice($items, 0, $n);
}
```

ví dụ 

```php
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3, 4, 5], 2); // [1, 2]
```
* **without** loại bỏ các phần tử mà giá trị của nó trùng với giá trị của các phần từ truyền vào
```php
function without($items, ...$params)
{
    return array_values(array_diff($items, $params));
}
```
ví dụ 
```php
without([2, 1, 2, 3], 1, 2); // [3]
```
* **orderBy** sắp sếp tăng dần hoặc giảm dần các giá trị của mảng theo key truyền vào

```php
function orderBy($items, $attr, $order)
{
    $sortedItems = [];
    foreach ($items as $item) {
        $key = is_object($item) ? $item->{$attr} : $item[$attr];
        $sortedItems[$key] = $item;
    }
    if ($order === 'desc') {
        krsort($sortedItems);
    } else {
        ksort($sortedItems);
    }

    return array_values($sortedItems);
}
```
ví dụ
```php
orderBy(
    [
        ['id' => 2, 'name' => 'Joy'],
        ['id' => 3, 'name' => 'Khaja'],
        ['id' => 1, 'name' => 'Raja']
    ],
    'id',
    'desc'
); // [['id' => 3, 'name' => 'Khaja'], ['id' => 2, 'name' => 'Joy'], ['id' => 1, 'name' => 'Raja']]
```
# 2.Math
* **average** trả về giá trị trung bình của các giá trị truyền vào
```php
function average(...$items)
{
    $count = count($items);
    
    return $count === 0 ? 0 : array_sum($items) / $count;
}
```
ví dụ 
```php
average(1, 2, 3); // 2
```
* **factorial** dùng đệ quy để tính giai thừa
```php
function factorial($n)
{
    if ($n <= 1) {
        return 1;
    }

    return $n * factorial($n - 1);
}
```
ví dụ
```php
factorial(6); // 720
```
* gcd tính ước số chung lớn nhất của hai hay nhiều số
```php
function gcd(...$numbers)
{
    if (count($numbers) > 2) {
        return array_reduce($numbers, 'gcd');
    }

    $r = $numbers[0] % $numbers[1];
    return $r === 0 ? abs($numbers[1]) : gcd($numbers[1], $r);
}
```

ví dụ 
```php
gcd(8, 36); // 4
gcd(12, 8, 32); // 4
```

* **median** tính trung vị của một mảng


![](https://images.viblo.asia/7a37fc64-edc0-423b-8d08-88b7933c0a49.png)
```php
function median($numbers)
{
    sort($numbers);
    $totalNumbers = count($numbers);
    $mid = floor($totalNumbers / 2);

    return ($totalNumbers % 2) === 0 ? ($numbers[$mid - 1] + $numbers[$mid]) / 2 : $numbers[$mid];
}
```
ví dụ 
```php
median([1, 3, 3, 6, 7, 8, 9]); // 6
median([1, 2, 3, 6, 7, 9]); // 4.5
```
# 3. String
*  **endsWith** kiểm tra chuỗi kết thúc có phải là chuỗi truyền vào hay không
```php
function endsWith($haystack, $needle)
{
    return strrpos($haystack, $needle) === (strlen($haystack) - strlen($needle));
}
```
ví dụ 
```php
endsWith('Hi, this is me', 'me'); // true
```
* **firstStringBetween** trả về chuỗi đầu tiên giữa tham số bắt đầu và tham số kết thúc
```php
function firstStringBetween($haystack, $start, $end)
{
    return trim(strstr(strstr($haystack, $start), $end, true), $start . $end);
}
```

ví dụ 
```php
firstStringBetween('This is a [custom] string', '[', ']'); // custom
```
tham số bắt đầu là '[' tham số kết thúc là ']'
* **isAnagram** so sánh 2 chuỗi và trả về là true nếu 2 chuối đố là đảo người của nhau là false nếu ngược lại
```php
function isAnagram($string1, $string2)
{
    return count_chars($string1, 1) === count_chars($string2, 1);
}
```
```php
isAnagram('act', 'cat'); // true
```
* **isLowerCase** trả về kết quả là true nếu chuối là chữ thường ngược lại thì trả về false
```php
function isLowerCase($string)
{
    return $string === strtolower($string);
}
```
ví dụ
```php
isLowerCase('Morning shows the day!'); // false
isLowerCase('hello'); // true
```
*  **isUpperCase** trả về true nếu chuỗi đã cho là chữ in hoa ngược lại thì trả về là false
```php
function isUpperCase($string)
{
    return $string === strtoupper($string);
}
```
ví dụ
```php
isUpperCase('MORNING SHOWS THE DAY!'); // true
isUpperCase('qUick Fox'); // false
```
* **countVowels** trả về số nguyên âm trong một chuỗi. Sử dụng một biểu thức chính quy để đếm số nguyên âm (A, E, I, O, U) trong một chuỗi.
```php
function countVowels($string)
{
    preg_match_all('/[aeiou]/i', $string, $matches);

    return count($matches[0]);
}
```
ví dụ 
```php
countVowels('sampleInput'); // 4
```
* Kiểm tra một từ / chuỗi có tồn tại trong đầu vào một chuỗi đã cho không nếu có trả về true còn không thì trả về false
```php
function isContains($string, $needle)
{
    return strpos($string, $needle) === false ? false : true;
}
```
ví dụ
```php
isContains('This is an example string', 'example'); // true
isContains('This is an example string', 'hello'); // false
```
## Giải thích một số hàm có sẵn của php đã dùng ở trên
* **array_filter** Truyền mảng vào như là tham số đầu tiên và một hàm ẩn danh làm tham số thứ hai. Trả về true trong một hàm callback nếu muốn để lại phần tử này trong mảng, và false nếu không muốn
* **array_merge** Các phần tử của các mảng sẽ được hợp nhất lại với nhau, và các giá trị với cùng một khoá sẽ bị ghi đè bằng giá trị cuối cùng
* **array_slice** Để lấy một phần của mảng, ví dụ, chỉ ba phần tử đầu tiên của mảng.
* **array_values** trả về một mảng các giá trị đã được lập chỉ mục. 
* **array_keys** trả về một mảng các khoá của một mảng cho trước
* **array_flip** đổi chỗ các khoá với các giá trị
* **array_unique** lấy các giá trị duy nhất từ ​​một mảng bằng cách sử dụng hàm.  Lưu ý rằng hàm này sẽ bảo lưu các khoá của các phần tử duy nhất đầu tiên
* **array_map** có thể áp dụng một callback cho mỗi phần tử của một mảng.

```php
$numbers = [1, -2, 3, -4, 5];
$squares = array_map(function($number) {
    return $number ** 2;
}, $numbers);
 
print_r($squares);  // [1, 4, 9, 16, 25]
```
* **array_diff** để loại bỏ các giá trị của mảng khỏi một mảng khác (hoặc các mảng).
* **array_sum** để lấy tổng các giá trị của mảng
* **array_product** để nhân chúng
*  **array_reduce** để tạo công thức riêng
# Tài liệu tham khảo
* [ 30 seconds of php code](https://github.com/30-seconds/30-seconds-of-php-code/)