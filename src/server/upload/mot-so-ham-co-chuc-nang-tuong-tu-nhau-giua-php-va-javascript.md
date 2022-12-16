Bài viết dưới đây sẽ tổng hợp một số hàm phổ biến có chức năng tương tự nhau giữa hai ngôn ngữ lập trình: PHP và JavaScript (JS). 

Việc nắm rõ các hàm built-in của cả hai ngôn ngữ sẽ giúp việc coding trở nên linh hoạt hơn.

Đồng thời, việc phân biệt giữa cách sử dụng những hàm này sẽ tránh những nhầm lẫn không đáng có.

## Các hàm thao tác với chuỗi

### Tách chuỗi thành một mảng

Nếu như trong PHP, hàm đầu tiên có thể nghĩ tới là [`explode()`](https://www.php.net/manual/en/function.explode.php), thì trong JS, hàm tương ứng sẽ là [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) .

[`explode()`](https://www.php.net/manual/en/function.explode.php)
```php
$pizza  = "piece1 piece2 piece3 piece4 piece5 piece6";
$pieces = explode(" ", $pizza);
echo $pieces[0]; // piece1
echo $pieces[1]; // piece2
```
[`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
```js
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words[3]);
// expected output: "fox"
```

### Khớp một biểu thức chính quy

[`preg_match()`](https://www.php.net/manual/en/function.preg-match)
```php
// The "i" after the pattern delimiter indicates a case-insensitive search
if (preg_match("/php/i", "PHP is the web scripting language of choice.")) {
    echo "A match was found.";
} else {
    echo "A match was not found.";
}
```

[`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
```js
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```
Có thể thấy, dù thực hiện cùng một chức năng, nhưng kết quả trả về giữa hai hàm trên là khác nhau.

`preg_match()`: trả về `1` nếu khớp với pattern, `0` nếu không khớp và `FALSE` nếu có lỗi xảy ra.

`match()`: trả về chuỗi khớp với pattern và `NULL` nếu không có chuỗi thoản mãn.

Tương tự, cũng sẽ có cặp hàm tương ứng [`preg_match_all`](https://www.php.net/manual/en/function.preg-match-all.php) và [`matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)

### Lấp đầy chuỗi (pad a string) theo độ dài cho trước

[`str_pad()`](https://www.php.net/manual/en/function.str-pad.php)
```php
$input = "Alien";
echo str_pad($input, 10);                      // produces "Alien     "
echo str_pad($input, 10, "-=", STR_PAD_LEFT);  // produces "-=-=-Alien"
echo str_pad($input, 10, "_", STR_PAD_BOTH);   // produces "__Alien___"
echo str_pad($input,  6, "___");               // produces "Alien_"
echo str_pad($input,  3, "*");                 // produces "Alien"
```

[`padStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart), 
[`padEnd()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd),

```js
const str1 = '5';

console.log(str1.padStart(2, '0'));
// expected output: "05"

const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

console.log(maskedNumber);
// expected output: "************5581"

const str1 = 'Breaded Mushrooms';

console.log(str1.padEnd(25, '.'));
// expected output: "Breaded Mushrooms........"

const str2 = '200';

console.log(str2.padEnd(5));
// expected output: "200  "
```

Thay vì có một đối số `pad_type` - quy định pad về bên trái hay bên phải như hàm `str_pad()` của PHP, sẽ có hai hàm tương ứng với từng kiểu padding trong JS.

### Tìm vị trí xuất hiện đầu tiên của chuỗi cần tìm trong chuỗi cho trước

[`strpos()`](https://www.php.net/manual/en/function.strpos.php)
```php
$mystring = 'abc';
$findme   = 'a';
$pos = strpos($mystring, $findme);

// Note our use of ===.  Simply == would not work as expected
// because the position of 'a' was the 0th (first) character.
if ($pos === false) {
    echo "The string '$findme' was not found in the string '$mystring'";
} else {
    echo "The string '$findme' was found in the string '$mystring'";
    echo " and exists at position $pos";
}
```

[`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
```js
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log('The index of the first "' + searchTerm + '" from the beginning is ' + indexOfFirst);
// expected output: "The index of the first "dog" from the beginning is 40"

console.log('The index of the 2nd "' + searchTerm + '" is ' + paragraph.indexOf(searchTerm, (indexOfFirst + 1)));
// expected output: "The index of the 2nd "dog" is 52"
```
Một lưu ý tiếp theo về sự khác nhau giữa dữ liệu trả về của hai hàm trên.

Khi không có chuỗi cần tìm:

Hàm `strpos()`:  trả về giá trị `FALSE`.  Do đó, cần tránh nhầm lẫn với giá trị `0`

Hàm `indexOf()`: trả về giá trị `-1`.

### Một số cặp hàm xử lý chuỗi khác
| PHP           |   JavaScript  |
|:---------------|:-------------|
| [`str_repeat()`](https://www.php.net/manual/en/function.str-repeat.php)  |    [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)   |
| [`str_replace()`](https://www.php.net/manual/en/function.str-replace.php) |   [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)   |
| [`strtolower()`](https://www.php.net/manual/en/function.strtolower.php)  | [`toLowerCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) |
| [`strtoupper()`](https://www.php.net/manual/en/function.strtoupper.php)  | [`toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) |

## Các hàm thao tác với mảng

### Đếm số lượng phần tử của mảng

Một trong những bài toàn thường gặp nhất ở bất kỳ ngôn ngữ lập trình nào.

[`count()`](https://www.php.net/manual/en/function.count.php)
```php
$a[0] = 1;
$a[1] = 3;
$a[2] = 5;
var_dump(count($a));  // 3

$b[0]  = 7;
$b[5]  = 9;
var_dump(count($b));  // 2
```

[`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
```js
const clothing = ['shoes', 'shirts', 'socks', 'sweaters'];

console.log(clothing.length);
// expected output: 4
```
Trong trường hợp của JS, có thể đếm số lượng phần tử mảng dựa vào thuộc tính `length` , thay vì lời gọi hàm.

### Nối các phần tử của mảng thành một chuỗi

[`implode()`](https://www.php.net/manual/en/function.implode)
```php
$array = array('lastname', 'email', 'phone');
$comma_separated = implode(",", $array);

echo $comma_separated; // lastname,email,phone

// Empty string when using an empty array:
var_dump(implode('hello', array())); // string(0) ""
```

[`join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"
````

Hàm `implode()` có một alias `join()`, có tên giống với hàm `join()` trong JS.


### Gộp hai mảng vào nhau

[`array_merge()`](https://www.php.net/manual/en/function.array-merge.php)
```php
$array1 = array(1, 2, 4);
$array2 = array(4, 5);
$result = array_merge($array1, $array2);
print_r($result);
/** expected result
Array
(
    [0] => 1
    [1] => 2
    [2] => 4
    [3] => 4
    [4] => 5
)
**/
```

[`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

Hàm `array_merge()` sẽ có kết quả tương đương với hàm `concat()` trong trường hợp mảng đầu vào chỉ có key dạng số.

Đối với mảng có key dạng chuỗi, phần tử của mảng bị trùng key sẽ bị ghi đè.

### Xác định giá trị cho trước có tồn tại trong mảng

[`in_array()`](https://www.php.net/manual/en/function.in-array.php)
```php
<?php
$os = array("Mac", "NT", "Irix", "Linux");
if (in_array("Irix", $os)) {
    echo "Got Irix";
}
if (in_array("mac", $os)) {
    echo "Got mac";
}
?>

// expected result: Got Irix
```

[`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
```js
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```
Mặc định cả hai hàm trên đều phân biệt hoa thường khi tìm kiếm.

### Tìm vị trí xuất hiện đầu tiên của phần tử cần tìm trong chuỗi cho trước

[`array_search()`](https://www.php.net/manual/en/function.array-search.php)
```php
$array = array(0 => 'blue', 1 => 'red', 2 => 'green', 3 => 'red');

$key = array_search('green', $array); // $key = 2;
$key = array_search('red', $array);   // $key = 1;
```

[`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1
```


*Chú ý:*

Hàm `array_search()`: trả về giá trị `FALSE` khi không tìm thấy phần tử tương ứng. Do đó, cũng cần lưu ý để tránh nhầm với trường hợp giá trị trả về là `0` (phần tử đầu tiên trong mảng).

Hàm `array_search()` mặc định so sánh sử dụng loose comparison `==`.

Hàm `indexOf()`: trả về giá trị `-1` khi không tìm thấy phần tử trong mảng. Hàm này chỉ sử dụng strict comparison `===`.

Cả hai hàm trên đều phân biệt hoa thường.


### Sắp xếp mảng theo hàm tự định nghĩa

[`usort()`](https://www.php.net/manual/en/function.usort.php)
```php
function cmp($a, $b)
{
    if ($a == $b) {
        return 0;
    }
    return ($a < $b) ? -1 : 1;
}

$a = array(3, 2, 5, 6, 1);

usort($a, "cmp");

foreach ($a as $key => $value) {
    echo "$key: $value\n";
}

// expected result
/**
0: 1
1: 2
2: 3
3: 5
4: 6
**/
```

[`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```

### Một số cặp hàm xử lý mảng khác
| PHP           |   JavaScript  |
|:---------------|:-------------|
| [`array_filter()`](https://www.php.net/manual/en/function.array-filter.php)  |    [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)   |
| [`array_keys()`](https://www.php.net/manual/en/function.array-keys.php)  |    [`keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)   |
| [`array_map()`](https://www.php.net/manual/en/function.array-map.php)  |    [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)   |
| [`array_push()`](https://www.php.net/manual/en/function.array-push.php)  |    [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)   |
| [`array_pop()`](https://www.php.net/manual/en/function.array-pop.php)  |    [`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)   |
| [`array_reduce()`](https://www.php.net/manual/en/function.array-reduce.php)  |    [`reduce()`]()   |
| [`array_reverse()`](https://www.php.net/manual/en/function.array-reverse.php)  |    [`reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)   |
| [`array_shift()`](https://www.php.net/manual/en/function.array-shift.php)  |    [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)   |
| [`array_slice()`](https://www.php.net/manual/en/function.array-slice.php)  |    [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)   |
| [`array_splice()`](https://www.php.net/manual/en/function.array-splice.php)  |    [`splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)   |

## Tổng hợp chung các hàm đã điểm qua

| PHP           |   JavaScript |
|:---------------|:-------------|
|String||
| [`explode()`](https://www.php.net/manual/en/function.explode.php) | [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) | string
| [`preg_match()`](https://www.php.net/manual/en/function.preg-match) | [`match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) | string
|[`str_pad()`](https://www.php.net/manual/en/function.str-pad.php) | [`padStart()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart), [`padEnd()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd) | string
| [`strpos()`](https://www.php.net/manual/en/function.strpos.php) | [`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) | string
| [`str_repeat()`](https://www.php.net/manual/en/function.str-repeat.php)  |    [`repeat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)   | string
| [`str_replace()`](https://www.php.net/manual/en/function.str-replace.php) |   [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)   | string
| [`strtolower()`](https://www.php.net/manual/en/function.strtolower.php)  | [`toLowerCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) | string
| [`strtoupper()`](https://www.php.net/manual/en/function.strtoupper.php)  | [`toUpperCase()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) | string
|Array||
|[`count()`](https://www.php.net/manual/en/function.count.php)|[`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)|
|[`implode()`](https://www.php.net/manual/en/function.implode) |[`join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)|
|[`array_merge()`](https://www.php.net/manual/en/function.array-merge.php)|[`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)|
|[`in_array()`](https://www.php.net/manual/en/function.in-array.php)|[`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)|
|[`array_search()`](https://www.php.net/manual/en/function.array-search.php)|[`indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)|
|[`usort()`](https://www.php.net/manual/en/function.usort.php)|[`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)|
| [`array_filter()`](https://www.php.net/manual/en/function.array-filter.php)  |    [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)   | array
| [`array_keys()`](https://www.php.net/manual/en/function.array-keys.php)  |    [`keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)   | array
| [`array_map()`](https://www.php.net/manual/en/function.array-map.php)  |    [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)   | array
| [`array_push()`](https://www.php.net/manual/en/function.array-push.php)  |    [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)   | array
| [`array_pop()`](https://www.php.net/manual/en/function.array-pop.php)  |    [`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)   | array
| [`array_reduce()`](https://www.php.net/manual/en/function.array-reduce.php)  |    [`reduce()`]()   | array
| [`array_reverse()`](https://www.php.net/manual/en/function.array-reverse.php)  |    [`reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)   | array
| [`array_shift()`](https://www.php.net/manual/en/function.array-shift.php)  |    [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)   | array
| [`array_slice()`](https://www.php.net/manual/en/function.array-slice.php)  |    [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)   | array
| [`array_splice()`](https://www.php.net/manual/en/function.array-splice.php)  |    [`splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)   | array


Như một lẽ dĩ nhiên, không phải lúc nào cũng có cặp hàm tương ứng trong hai ngôn ngữ lập trình. Một số hàm có tồn tại ở PHP, nhưng lại không có ở JS và ngược lại. Chính vì lẽ đó, một vài thư viện ra đời để góp phần giải quyết vấn đề này.

Thư viện JS có thể kể đến trong việc hỗ trợ tích hợp các hàm của PHP: [`kvz/locutus`](https://github.com/kvz/locutus) (https://locutus.io/)

Ở chiều ngược lại, gần như các hàm của JS đều có thể được hỗ trợ bởi PHP. Với framework phổ biến nhất hiện nay là [Laravel](https://laravel.com/), có thể dễ dàng tìm thấy các hàm mở rộng thông qua hai class [`Str`](https://laravel.com/api/7.x/Illuminate/Support/Str.html) và [`Arr`](https://laravel.com/api/7.x/Illuminate/Support/Arr.html)

## ** *Tham khảo* **
**PHP Manual**, [*PHP*](https://www.php.net/manual/en/index.php)

**MDN web docs**, [*MDN*](https://developer.mozilla.org/en-US/)