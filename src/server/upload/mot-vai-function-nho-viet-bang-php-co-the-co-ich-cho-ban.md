# Array
## all
Returns true if the provided function returns true for all elements of an array, false otherwise.

Trả về **true** nếu hàm được cung cấp trả về true khi áp dụng cho toàn bộ phần tử của mảng đó, nếu ko trả về false 
```php
function all($items, $func)
{
    return count(array_filter($items, $func)) === count($items);
}
```
ex:
```php
all([2, 3, 4, 5], function ($item) {
    return $item > 1;
}); // true
```

## any
Returns true if the provided function returns true for at least one element of an array, false otherwise.

Trả về **true** nếu hàm được cung cấp trả về true cho ít nhất 1 phần tử của mảng, nếu ko trả về **false**
```php
function any($items, $func)
{
    return count(array_filter($items, $func)) > 0;
}
```
ex:
```php
any([1, 2, 3, 4], function ($item) {
    return $item < 2;
}); // true
```
## deepFlatten
làm "phẳng" một mảng
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
ex:
```php
deepFlatten([1, [2], [[3], 4], 5]); 
// [1, 2, 3, 4, 5]
```
## drop
Trả về mảng mới với n phần tử đã xóa từ phía bên trái
```php
function drop($items, $n = 1)
{
    return array_slice($items, $n);
}
```
Ex:
```php
drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
```

## findLast

trả về phần tử cuối cùng mà match với hàm được cung cấp
```php
function findLast($items, $func)
{
    $filteredItems = array_filter($items, $func);

    return array_pop($filteredItems);
}
```
Ex:
```php
findLast([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 1;
});
// 3
```

## findLastIndex

Trả về index của phần tử cuối cùng mà khớp với function đã cung cấp
```php
function findLastIndex($items, $func)
{
    $keys = array_keys(array_filter($items, $func));

    return array_pop($keys);
}
```
Ex:
```php
findLastIndex([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 1;
});
// 2
```

## flatten
Làm phẳng một mảng với độ sâu 1 level
```php
function flatten($items)
{
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            $result[] = $item;
        } else {
            $result = array_merge($result, array_values($item));
        }
    }

    return $result;
}
```
Ex:
```php
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2], [[3], 4], 5]); //[1, 2,[3], 4, 5]
```

## groupBy
group các phần tử của mảng dựa theo function đã cung cấp
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
Ex:
```php
groupBy(['one', 'two', 'three'], 'strlen'); // [3 => ['one', 'two'], 5 => ['three']]
```

## hasDuplicates

Kiểm tra giá trị bị trùng các phần tử trong một mảng. Trả về **true** nếu có giá trị trùng ngược lại trả về **false**
```php
function hasDuplicates($items)
{
    return count($items) > count(array_unique($items));
}
```
Ex:
```php
hasDuplicates([1, 2, 3, 4, 5, 5]); // true
```

## head
Returns the head of a list.
Trả về giá trị đầu tiên của mảng

```php
function head($items)
{
    return reset($items);
}
```
Ex:
```php
head([1, 2, 3]); // 1
```

## last
Trả về phần tử cuối cùng của mảng
```php
function last($items)
{
    return end($items);
}
```
Ex:
```php
last([1, 2, 3]); // 3
```

## pluck
Lấy tất cả giá trị dựa theo key đã cho của một mảng
```php
function pluck($items, $key)
{
    return array_map( function($item) use ($key) {
        return is_object($item) ? $item->$key : $item[$key];
    }, $items);
}
```
Ex:
```php
pluck([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
], 'name');
// ['Desk', 'Chair']
```

## pull
trả về mảng mới khi đã xóa các phần tử đã cung cấp
```php
function pull(&$items, ...$params)
{
    $items = array_values(array_diff($items, $params));
    return $items;
}
```
Ex:
```php
$items = ['a', 'b', 'c', 'a', 'b', 'c'];
pull($items, 'a', 'c'); // $items will be ['b', 'b']
```

## reject
Trả về mảng mới khi đã loại bỏ các phần tử khớp với function đã cung cấp
```php
function reject($items, $func)
{
    return array_values(array_diff($items, array_filter($items, $func)));
}
```
Ex:
```php
reject(['Apple', 'Pear', 'Kiwi', 'Banana'], function ($item) {
    return strlen($item) > 4;
}); // ['Pear', 'Kiwi']
```

## orderBy

Sắp xếp các mảng hoặc các đối tượng theo key.
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
Ex:
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

## bubbleSort

Sắp xếp 1 mảng sử dụng thuật toán Bubble

Thuật toán sắp xếp này là thuật toán dựa trên so sánh, trong đó mỗi cặp phần tử liền kề được so sánh và các phần tử được hoán đổi nếu chúng không theo thứ tự.
```php
function bubbleSort($array) {
    $array = array_unique($array);
    $arrayLength = count($array);
    for ($i = 0; $i < $arrayLength - 1; $i++) { 
        $swapped = false;
        for ($j = 0; $j < $arrayLength - 1 - $i; $j++) {
            if ($array[$j] > $array[$j + 1]) {
                $temp = $array[$j];
                $array[$j] = $array[$j + 1];
                $array[$j + 1] = $temp;
                $swapped = true;
            }
        }
        if (!$swapped) {
            break;
        }
    }
    return $array;
}
```
Ex:
```php
bubbleSort([44, 11, 7, 20, 12, 90, 35, 5]); // [5,7,11,12,20,35,44,90]
```

## rotate

xoay mảng theo hướng bên trái dựa trên số phần tử truyền được truyền vào
```php
function rotate($array, $shift = 1)
{
    for ($i = 0; $i < $shift; $i++) {
        array_push($array, array_shift($array));
    }

    return $array;
}
```
Ex:
```php
rotate([1, 3, 5, 2, 4]); // [3, 5, 2, 4, 1]
rotate([1, 3, 5, 2, 4], 2); // [5, 2, 4, 1, 3]
```

# Math
## average

Trả về kết quả trung bình cộng của 2 hoặc nhiều số
```php
function average(...$items)
{
    $count = count($items);
    
    return $count === 0 ? 0 : array_sum($items) / $count;
}
```
Ex:
```php
average(1, 2, 3); // 2
```
## factorial
Trả về giai thừa của một số
```php
function factorial($n)
{
    if ($n <= 1) {
        return 1;
    }

    return $n * factorial($n - 1);
}
```
Ex:
```php
factorial(6); // 720
```

## fibonacci
Trả về mảng fibo giá trị lên đến đối số truyền vào
```php
function fibonacci($n)
{
    $sequence = [0, 1];

    for ($i = 2; $i < $n; $i++) {
        $sequence[$i] = $sequence[$i-1] + $sequence[$i-2];
    }

    return $sequence;
}
```
Ex:
```php
fibonacci(6); // [0, 1, 1, 2, 3, 5]
```

## gcd
Tìm ước số chung lớn nhất của 2 or nhiều số
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
Ex:
```php
gcd(8, 36); // 4
gcd(12, 8, 32); // 4
```

## isEven
Kiểm tra là số chẵn
```php
function isEven($number)
{
    return ($number % 2) === 0;
}
```
Ex:
```php
isEven(4); // true
```

## sPrime
Kiểm tra có phải là số nguyên tố
```php
function isPrime($number)
{
    $boundary = floor(sqrt($number));
    for ($i = 2; $i <= $boundary; $i++) {
        if ($number % $i === 0) {
            return false;
        }
    }

    return $number >= 2;
}
```
Ex:
```php
isPrime(3); // true
```

## lcm
Trả về bội số chung nhỏ nhất của 2 hoặc nhiều số

```php
function lcm(...$numbers)
{
    $ans = $numbers[0];
    for ($i = 1, $max = count($numbers); $i < $max; $i++) {
        $ans = (($numbers[$i] * $ans) / gcd($numbers[$i], $ans));
    }

    return $ans;
}
```
Ex:
```php
lcm(12, 7); // 84
lcm(1, 3, 4, 5); // 60
```

## median
Trả về số trung vị của một mảng

```php
function median($numbers)
{
    sort($numbers);
    $totalNumbers = count($numbers);
    $mid = floor($totalNumbers / 2);

    return ($totalNumbers % 2) === 0 ? ($numbers[$mid - 1] + $numbers[$mid]) / 2 : $numbers[$mid];
}
```
Ex:
```php
median([1, 3, 3, 6, 7, 8, 9]); // 6
median([1, 2, 3, 6, 7, 9]); // 4.5
```

Bài viết tham khảo https://github.com/30-seconds/30-seconds-of-php-code