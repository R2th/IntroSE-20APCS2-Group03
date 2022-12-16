Chào các bạn, chắc hẳn ai trong chúng ta đã biết về biến và tham chiếu khi học các môn cơ sở lập trình khi mới vào nghề. Thế nhưng khi làm việc với PHP một vài người tưởng như đã quên là nó có tồn tại, hoặc một vài người thì biết nó có nhưng lại không biết xài nó như nào; thậm chí một vài trong chúng ta đã từng xài nhưng lại phát sinh một số lỗi không ngờ tới.

Để giúp các bạn hiểu rõ hơn về biến và tham chiếu trong PHP, đồng thời cũng giúp mình có cơ hội được tìm hiểu kỹ hơn về tính năng, đặc điểm này, hôm nay mình sẽ viết về vấn đề tham chiếu với biến trong PHP.

Để đảm bảo sự chính xác nguyên vẹn của thuật ngữ cũng như các định nghĩa, trong bài viết này mình xin phép dùng một số từ nguyên mẫu so với định nghĩa của nó:
- `Class`: Lớp
- `Property` , `properties`: Các thuộc tính trong class
- `Object`: kiểu dữ liệu là các đối tượng (có thể là object hoặc class)
- `Array`: kiểu dữ liệu là mảng
- `Reference`: tham chiếu

Trong bài này, mình định nghĩa hai functions giúp mình in ra giá trị dễ nhìn hơn:
```
// Dùng để log trên màn hình console
function beatifyLog(...$arr)
{
    foreach ($arr as $item) {
        print_r($item);
    }
}
// Dùng để log trên giao diện html
function beatifyHtml(...$arr)
{
    echo '<pre>';
    foreach ($arr as $item) {
        print_r($item);
    }
    echo '</pre>';
}
```

## Biến tham chiếu (reference variables)
Biến `$b` lúc này được gọi là biến tham chiếu của `$a`, còn gọi là (alias), khi `$b` và `$a` trỏ về cùng một địa chỉ bộ nhớ trên máy. Lúc này, `$a` hoặc `$b` thay đổi giá trị thì biến còn lại cũng sẽ thay đổi theo.

```
$a;
$b = &$a;
```

Ví dụ:

![Ví dụ về biến tham chiếu reference variable](https://images.viblo.asia/505092d3-b5e5-43de-bcea-2906f7451018.png)


## Tham chiếu trong object và array
Trong PHP, các biến object là tham chiếu, trong khi mảng thì không.
Ví dụ:
```
$arr = [
    'key'       => 'value',
    'other_key' => 'other_value',
];
$obj = (object) $arr;

$arr2 = $arr;
$obj2 = $obj;

$arr['key'] = 'another_value';
$obj2->key  = 'another_value';

beatifyLog('arr: ', $arr, 'arr2: ', $arr2);
echo "=====\n";
beatifyLog('obj: ', $obj, 'obj2: ', $obj2);
```
Kết quả là:
![Reference trong Object và Array](https://images.viblo.asia/e1dbb27d-c25a-4ffc-af18-aedeb4f87bd9.png)

Như vậy muốn array tham chiếu được thì như thế nào? Minh xin chia sẻ một cách dùng trong foreach hữu ích giúp chúng ta có được điều đó:
```
$arr = [1, 2, 3, 4,];
beatifyLog('Initial Value: ', $arr);
echo "=====\n";
foreach ($arr as $item) {
    $item++;
}
beatifyLog('Foreach without reference: ', $arr);
echo "=====\n";
foreach ($arr as &$item) {
    $item++;
}
beatifyLog('Foreach with reference: ', $arr);
```
Và đây là kết quả sau khi chạy các dòng lệnh trên:
![](https://images.viblo.asia/4f7504fa-3666-4bbe-b9a0-48fece4ef69b.png)


## Tham chiếu trong function
PHP có hỗ trợ biến tham chiếu khi đưa vào function, cú pháp:
```
function fnName(&$a, $b)
{}
```
Ở đây `$a` là biến tham chiếu, còn `$b` là biến bình thường. Xét ví dụ cụ thể sau:
```
function test(&$a, $b)
{
    $a++;
    $b++;
}
$a = 3;
$b = 4;
beatifyLog('Before: ', 'a=', $a, '; b=', $b);
echo "\n";
test($a, $b);
beatifyLog('After:  ', 'a=', $a, '; b=', $b);
```
Kết quả:
![Reference in function](https://images.viblo.asia/6a774406-80a4-47bf-becc-325a13265eac.png)


## Một số vấn đề khi dùng reference variable
Đây là phần mình mong chờ nhất trong bài viết này. Dưới đây mình xin chia sẻ các lỗi mình đã gặp và cách xử lí khi làm việc với reference variable. Dĩ nhiên sẽ còn thiếu rất nhiều trường hợp, mong các bạn có thể chia sẻ thêm để giúp ích hơn cho bài viết của mình cũng như các bạn khác được hiểu rõ hơn.
### Reference object
Để nói về vấn đề này, mình xin đưa ra một bài toán nho nhỏ để minh hoạ nhé.
- Cho class `Date` cùng các method như bên dưới
    ```
    class Date
    {
        private $d = 0;
        private $m = 0;
        private $Y = 0;

        public function __construct(int $year, int $month, int $day)
        {
            $this->Y = $year;
            $this->m = $month;
            $this->d = $day;
        }

        private function addSubZero(int $i): string
        {
            return $i > 9 ? $i : "0$i";
        }

        public function toString(): string
        {
            $Y = $this->Y;
            $m = $this->addSubZero($this->m);
            $d = $this->addSubZero($this->d);

            return "$Y-$m-$d";
        }

        public function addYears(int $num): Date
        {
            $this->Y += $num;

            return $this;
        }
    }
    ```

- Cho một array các ngày tháng ngẫu nhiên, ví dụ
    ```
    $db = [
        '2021-01-02',
        '2020-01-02',
        '2021-01-01',
        '2020-01-05',
        '2019-01-05'
    ];
    ```
- Nhập vào một ngày tháng năm (đúng định dạng), xuất ra các giá trị trong vòng 1 năm kể từ ngày nhập.

    Ví dụ input `2021-01-01`. Kết quả mong muốn với array như trên là `2020-01-02`, `2021-01-01` và `2020-01-05`.


** Dưới đây là đoạn code của mình đề xuất:
```
// Should be 2021-01-01
$curYear  = new Date(2021, 1, 1);

// Should be 2020-01-01
$prevYear = $curYear;
$prevYear->addYears(-1);

// Should return 2020-01-02, 2021-01-01 and 2020-01-05
beatifyLog('Result:', array_filter($db, function ($a) use ($curYear, $prevYear) {
    return $a >= $prevYear->toString() && $a <= $curYear->toString();
}));
```
Chạy thử đoạn code trên:
![](https://images.viblo.asia/27eb2bf2-141d-45ea-b629-7cc2183c7e34.png)
Xem kết quả, không như mong muốn, dể biết chi tiết, mình debug đoạn code trên:
```
// Should be 2021-01-01
$curYear  = new Date(2021, 1, 1);
beatifyLog('Initial CurYear: ' . $curYear->toString());
echo "\n";

// Should be 2020-01-01
$prevYear = $curYear;
$prevYear->addYears(-1);

// Should return 2020-01-02, 2021-01-01 and 2020-01-05
beatifyLog('Result: ', array_filter($db, function ($a) use ($curYear, $prevYear) {
    return $a >= $prevYear->toString() && $a <= $curYear->toString();
}));

echo "\n";
beatifyLog('CurYear:', $curYear->toString());
echo "\n";
beatifyLog('PrevYear:', $prevYear->toString());
```
Kết quả:
![](https://images.viblo.asia/5d104bc8-2592-4804-bd44-20399130baf3.png)

Vậy lí do là gì ? Là vì object reference đó các bạn (mình đã nhắc ở trên rồi).

Thế thì có cách nào để sửa không nhỉ? Dĩ nhiên là có rồi, mình thử dùng `clone` của PHP nhé. Dưới đây là code mình có chỉnh sửa tí xíu:
```
$db = [
    '2021-01-02',
    '2020-01-02',
    '2021-01-01',
    '2020-01-05',
    '2019-01-05'
];

// Should be 2021-01-01
$curYear  = new Date(2021, 1, 1);
beatifyLog('Initial CurYear: ' . $curYear->toString());
echo "\n";

// Should be 2020-01-01
$prevYear = clone $curYear;
$prevYear->addYears(-1);

// Should return 2020-01-02, 2021-01-01 and 2020-01-05
beatifyLog('Result: ', array_filter($db, function ($a) use ($curYear, $prevYear) {
    return $a >= $prevYear->toString() && $a <= $curYear->toString();
}));

echo "\n";
beatifyLog('CurYear:', $curYear->toString());
echo "\n";
beatifyLog('PrevYear:', $prevYear->toString());
```

Kết quả đây:
![](https://images.viblo.asia/347e99e7-66fa-4344-9fd4-594131e77dcb.png)

Kết quả đúng như mong muốn rồi!! Các bạn chú ý khi thao tác với object trong PHP nhé. 

### Reference array
Mình xin phép dùng lại một tí ví dụ ở phần reference trong array, đồng thời chỉnh sửa lại một tí:
```
$arr = [1, 2, 3, 4,];
beatifyLog('Initial Value: ', $arr);
echo "=====\n";
foreach ($arr as &$item) {
    $item++;
}
beatifyLog('Foreach with reference: ', $arr);
echo "=====\n";
echo "Foreach without reference and do nothing.\n";
foreach ($arr as $item) {
}
beatifyLog('And after that: ', $arr);
```
Và đây là kết quả:
![](https://images.viblo.asia/7f9b1ed7-ca61-4304-831f-a5524a23e5fe.png)

Để giải thích vấn đề này thì có lẽ là nên đi sâu vào phần bộ nhớ của reference variable, nên mình xin phép hẹn lại lần sau nhé. Ở đây mình chỉ đề xuất phương pháp để "né" thôi ạ. Xin xem mình viết lại như sau:
```
$arr = [1, 2, 3, 4,];
beatifyLog('Initial Value: ', $arr);
echo "=====\n";
foreach ($arr as &$item) {
    $item++;
}
beatifyLog('Foreach with reference: ', $arr);
echo "=====\n";
echo "Foreach without reference and do nothing.\n";
foreach ($arr as $itemOther) {
}
beatifyLog('And after that: ', $arr);
```
Đơn giản là thay bằng tên biến khác thôi, và đây là kết quả:
![](https://images.viblo.asia/b482758b-78a4-48bd-bc01-7d9c3d6ab7d9.png)

## Kết luận
Trên đây là những gì mình đã nghiên cứu, đồng thời cũng thu thập từ một số kinh nghiệm của mình về reference trong PHP, hi vọng phần nào hữu ích cho các bạn trong một số trường hợp.
## Nguồn tham khảo
Bài viết này mình chủ yếu tham khảo trên trang document của PHP và phần còn lại là do những kinh nghiệm thực tế mình có được.
- https://www.php.net/manual/en/language.oop5.references.php
- https://www.php.net/manual/en/language.oop5.cloning.php