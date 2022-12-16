### isLowerCase
Trả về true nếu chuỗi đã cho là chữ thường, ngược lại là false.
```php
function isLowerCase($string)
{
    return $string === strtolower($string);
}
```
```javascript
isLowerCase('Morning shows the day!'); // false
isLowerCase('hello'); // true
```

-----

### groupBy
Nhóm các phần tử của một mảng dựa trên chức năng đã cho.
```shell
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
```javascript
groupBy(['one', 'two', 'three'], 'strlen'); // [3 => ['one', 'two'], 5 => ['three']]
```

-----
### median
Trả về giá trị trung bình của một mảng số.
```php
function median($numbers)
{
    sort($numbers);
    $totalNumbers = count($numbers);
    $mid = floor($totalNumbers / 2);

    return ($totalNumbers % 2) === 0 ? ($numbers[$mid - 1] + $numbers[$mid]) / 2 : $numbers[$mid];
}
```
```rust
median([1, 3, 3, 6, 7, 8, 9]); // 6
median([1, 2, 3, 6, 7, 9]); // 4.5
```

-----
### once
Chỉ gọi một hàm một lần.
```javascript
function once($function)
{
    return function (...$args) use ($function) {
        static $called = false;
        if ($called) {
            return;
        }
        $called = true;
        return $function(...$args);
    };
}
```
```perl
$add = function ($a, $b) {
    return $a + $b;
};

$once = once($add);

var_dump($once(10, 5)); // 15
var_dump($once(20, 10)); // null
```

-----
### orderBy
Sắp xếp tập hợp các mảng hoặc đối tượng theo khóa.
```perl
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
```perl
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

-----

### take
Trả về một mảng có n phần tử bị loại bỏ từ đầu.
```markdown
function take($items, $n = 1)
{
    return array_slice($items, 0, $n);
}
```
```rust
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3, 4, 5], 2); // [1, 2]
```

-----

### gcd
Tính ước số chung lớn nhất giữa hai hoặc nhiều số.
```perl
function gcd(...$numbers)
{
    if (count($numbers) > 2) {
        return array_reduce($numbers, 'gcd');
    }

    $r = $numbers[0] % $numbers[1];
    return $r === 0 ? abs($numbers[1]) : gcd($numbers[1], $r);
}
```
```javascript
gcd(8, 36); // 4
gcd(12, 8, 32); // 4
```

-----

### last
Trả về phần tử cuối cùng trong một mảng.
```php
function last($items)
{
    return end($items);
}
```
```rust
last([1, 2, 3]); // 3
```

-----

### startsWith
Kiểm tra xem một chuỗi có bắt đầu bằng một chuỗi con nhất định hay không.
```perl
function startsWith($haystack, $needle)
{
    return strpos($haystack, $needle) === 0;
}
```
```sql
startsWith('Hi, this is me', 'Hi'); // true
```