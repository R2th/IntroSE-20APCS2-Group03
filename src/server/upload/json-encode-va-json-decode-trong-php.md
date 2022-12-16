Trong PHP người ta sử dụng hàm số để convert data thành định dạng JSON và để decode định dạng JSON.

**JSON là gì?**
JSON là viết tắt của cụm từ “JavaScript Object Notation”, là cách thức để mô tả object trong xử lý của java script.

**json_encode là gì?**
Để conver giá trị chỉ định thành định dạng JSON, người ta sử dụng hàm số json_encode.
Hàm số json_encode được viết như sau:

**Cách viết:**
```
string json_encode ( mixed $value [, int $options = 0 [, int $depth = 512 ]] )
```

**Argument:**
- Biến thứ nhất value:
Giá trị encode. Chỉ định string hoặc array để convert sang định dạng JSONCó thể chỉ định giá trị tùy ý khác với định dạng resource
Tất cả data dạng chuỗi phải encoding bằng UTF-8.
- Biến thứ 2 options:
Set được việc sẽ convert theo định dạng như thế nào và có thể chỉ định được constant bằng các option.
JSON_HEX_QUOT, JSON_HEX_TAG, JSON_HEX_AMP, JSON_HEX_APOS, JSON_NUMERIC_CHECK, JSON_PRETTY_PRINT, JSON_UNESCAPED_SLASHES, JSON_FORCE_OBJECT, JSON_PRESERVE_ZERO_FRACTION, JSON_UNESCAPED_UNICODE, JSON_PARTIAL_OUTPUT_ON_ERROR 
- Biến thứ 3 depth: 
Chỉ định được max depth bằng số nguyên.	

**Giá trị trả về:**
Hàm json_encode trả về giá trị đã encode JSON, trường hợp xử lý lỗi sẽ trả về FALSE.

**Lưu ý:**
Tất cả các string data convert phải được encode thành encoding UTR-8.

**Cách sử dụng json_encode**
Sử dụng hàm json_encode để convert giá trị string chỉ định thành định dạng JSON.

**Sample program:**

Ví dụ 1 json_encode():

```
<?php
$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

echo json_encode($arr);
?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
{"a":1,"b":2,"c":3,"d":4,"e":5}
```

Ví dụ 2 json_encode() , ví dụ hiển thị vài option đang sử dụng:

```
<?php
$a = array('<foo>',"'bar'",'"baz"','&blong&', "\xc3\xa9");

echo "Normal: ",  json_encode($a), "\n";
echo "Tags: ",    json_encode($a, JSON_HEX_TAG), "\n";
echo "Apos: ",    json_encode($a, JSON_HEX_APOS), "\n";
echo "Quot: ",    json_encode($a, JSON_HEX_QUOT), "\n";
echo "Amp: ",     json_encode($a, JSON_HEX_AMP), "\n";
echo "Unicode: ", json_encode($a, JSON_UNESCAPED_UNICODE), "\n";
echo "All: ",     json_encode($a, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE), "\n\n";

$b = array();

echo "Empty array output as array: ", json_encode($b), "\n";
echo "Empty array output as object: ", json_encode($b, JSON_FORCE_OBJECT), "\n\n";

$c = array(array(1,2,3));

echo "Non-associative array output as array: ", json_encode($c), "\n";
echo "Non-associative array output as object: ", json_encode($c, JSON_FORCE_OBJECT), "\n\n";

$d = array('foo' => 'bar', 'baz' => 'long');

echo "Associative array always output as object: ", json_encode($d), "\n";
echo "Associative array always output as object: ", json_encode($d, JSON_FORCE_OBJECT), "\n\n";
?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
Normal: ["<foo>","'bar'","\"baz\"","&blong&","\u00e9"]
Tags: ["\u003Cfoo\u003E","'bar'","\"baz\"","&blong&","\u00e9"]
Apos: ["<foo>","\u0027bar\u0027","\"baz\"","&blong&","\u00e9"]
Quot: ["<foo>","'bar'","\u0022baz\u0022","&blong&","\u00e9"]
Amp: ["<foo>","'bar'","\"baz\"","\u0026blong\u0026","\u00e9"]
Unicode: ["<foo>","'bar'","\"baz\"","&blong&","e"]
All: ["\u003Cfoo\u003E","\u0027bar\u0027","\u0022baz\u0022","\u0026blong\u0026","e"]

Empty array output as array: []
Empty array output as object: {}

Non-associative array output as array: [[1,2,3]]
Non-associative array output as object: {"0":{"0":1,"1":2,"2":3}}

Associative array always output as object: {"foo":"bar","baz":"long"}
Associative array always output as object: {"foo":"bar","baz":"long"}
```

Ví dụ 3 JSON_NUMERIC_CHECK option:

```
<?php
echo "Strings representing numbers automatically turned into numbers".PHP_EOL;
$numbers = array('+123123', '-123123', '1.2e3', '0.00001');
var_dump(
 $numbers,
 json_encode($numbers, JSON_NUMERIC_CHECK)
);
echo "Strings containing improperly formatted numbers".PHP_EOL;
$strings = array('+a33123456789', 'a123');
var_dump(
 $strings,
 json_encode($strings, JSON_NUMERIC_CHECK)
);
?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
Strings representing numbers automatically turned into numbers
array(4) {
  [0]=>
  string(7) "+123123"
  [1]=>
  string(7) "-123123"
  [2]=>
  string(5) "1.2e3"
  [3]=>
  string(7) "0.00001"
}
string(28) "[123123,-123123,1200,1.0e-5]"
Strings containing improperly formatted numbers
array(2) {
  [0]=>
  string(13) "+a33123456789"
  [1]=>
  string(4) "a123"
}
string(24) "["+a33123456789","a123"]"
```

Ví dụ 4 về sequential and nonsequential sequences:

```
<?php
echo "Sequential array".PHP_EOL;
$sequential = array("foo", "bar", "baz", "blong");
var_dump(
 $sequential,
 json_encode($sequential)
);

echo PHP_EOL."Non-sequential array".PHP_EOL;
$nonsequential = array(1=>"foo", 2=>"bar", 3=>"baz", 4=>"blong");
var_dump(
 $nonsequential,
 json_encode($nonsequential)
);

echo PHP_EOL."Sequential array with one key unset".PHP_EOL;
unset($sequential[1]);
var_dump(
 $sequential,
 json_encode($sequential)
);
?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
Sequential array
array(4) {
  [0]=>
  string(3) "foo"
  [1]=>
  string(3) "bar"
  [2]=>
  string(3) "baz"
  [3]=>
  string(5) "blong"
}
string(27) "["foo","bar","baz","blong"]"

Non-sequential array
array(4) {
  [1]=>
  string(3) "foo"
  [2]=>
  string(3) "bar"
  [3]=>
  string(3) "baz"
  [4]=>
  string(5) "blong"
}
string(43) "{"1":"foo","2":"bar","3":"baz","4":"blong"}"

Sequential array with one key unset
array(3) {
  [0]=>
  string(3) "foo"
  [2]=>
  string(3) "baz"
  [3]=>
  string(5) "blong"
}
string(33) "{"0":"foo","2":"baz","3":"blong"}"
```

Ví dụ 5 JSON_PRESERVE_ZERO_FRACTION option:

```
<?php
var_dump(json_encode(12.0, JSON_PRESERVE_ZERO_FRACTION));
var_dump(json_encode(12.0));
?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
string(4) "12.0"
string(2) "12"
```

**json_decode là gì?**

Để nhận và giải mã chuỗi đã mã hóa JSON, người ta sử dụng hàm json_decode.
Giải mã nói một cách đơn giản là khôi phục dữ liệu đã được mã hoá trở về bản gốc.
Hàm json_decode được mô tả như sau.

**Cách viết:**
```
mixed json_decode ( string $json [, bool $assoc = false [, int $depth = 512 [, int $options = 0 ]]] )
```

**Argument:**
- json: Chuỗi ký tự json đối tượng decode.
- assoc: Trường hợp là TRUE , thì object trả về có định dạng array kết hợp.
- depth: Độ sâu đệ quy do user chỉ định.
- options: Đây là một bitmask của tùy chọn giải mã JSON. 
Hiện tại, có hai option được hỗ trợ.
1. JSON_BIGINT_AS_STRING
2. JSON_OBJECT_AS_ARRAY

**Lưu ý:**
Hàm số này chỉ hoạt động đối với chuỗi ký tự đã encoding bằng UTF-8.

**Giá trị trả về:**
Trả về dữ liệu được mã hóa trong json thành kiểu PHP thích hợp TRUE, FALSE và NULL. Nếu json không thể giải mã hoặc dữ liệu được mã hoá vượt quá giới hạn đệ quy, nó sẽ trả về NULL.

**Cách sử dụng json_decode**
Sau đây là cách sử dụng hàm json_decode và phương pháp decode cho giá trị dạng chuỗi đã chỉ định.

**Sample program:**

Ví dụ 1 json_decode():

```
<?php
$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';

var_dump(json_decode($json));
var_dump(json_decode($json, true));

?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
object(stdClass)#1 (5) {
    ["a"] => int(1)
    ["b"] => int(2)
    ["c"] => int(3)
    ["d"] => int(4)
    ["e"] => int(5)
}

array(5) {
    ["a"] => int(1)
    ["b"] => int(2)
    ["c"] => int(3)
    ["d"] => int(4)
    ["e"] => int(5)
}
```

Ví dụ 2 Truy cập đối tượng thuộc tính không hợp lệ:

Để truy cập các phần tử chứa các ký tự (chẳng hạn như các dấu nối) không thể được sử dụng trong các quy ước đặt tên PHP trong các đối tượng, hãy đặt tên các phần tử trong dấu ngoặc nhọn và dấu nháy.

```
<?php

$json = '{"foo-bar": 12345}';

$obj = json_decode($json);
print $obj->{'foo-bar'}; // 12345

?>
```

Ví dụ 3 Một lỗi phổ biến trong json_decode ():

```
<?php

// Chuỗi ký tự sau đây hợp lệ với JavaScript, nhưng nó không hợp lệ với JSON

// Tên và giá trị phải được để trong ngoặc kép.
// Không thể sử dụng dấu nháy đơn
$bad_json = "{ 'bar': 'baz' }";
json_decode($bad_json); // null

// Tên phải được để trong ngoặc kép
$bad_json = '{ bar: "baz" }';
json_decode($bad_json); // null

// Không đặt dấu phẩy vào cuối
$bad_json = '{ bar: "baz", }';
json_decode($bad_json); // null

?>
```

Ví dụ 4 depth error:

```
<?php
// Encode data
$json = json_encode(
    array(
        1 => array(
            'English' => array(
                'One',
                'January'
            ),
            'French' => array(
                'Une',
                'Janvier'
            )
        )
    )
);

// Định nghĩa lỗi
$constants = get_defined_constants(true);
$json_errors = array();
foreach ($constants["json"] as $name => $value) {
    if (!strncmp($name, "JSON_ERROR_", 11)) {
        $json_errors[$value] = $name;
    }
}

// Lỗi hiển thị ở các độ sâu khác nhau
foreach (range(4, 3, -1) as $depth) {
    var_dump(json_decode($json, true, $depth));
    echo 'Last error: ', $json_errors[json_last_error()], PHP_EOL, PHP_EOL;
}
?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
array(1) {
  [1]=>
  array(2) {
    ["English"]=>
    array(2) {
      [0]=>
      string(3) "One"
      [1]=>
      string(7) "January"
    }
    ["French"]=>
    array(2) {
      [0]=>
      string(3) "Une"
      [1]=>
      string(7) "Janvier"
    }
  }
}
Last error: JSON_ERROR_NONE

NULL
Last error: JSON_ERROR_DEPTH
```

Ví dụ 5 Ví dụ về xử lý các số nguyên lớn với json_decode ():

```
<?php
$json = '{"number": 12345678901234567890}';

var_dump(json_decode($json));
var_dump(json_decode($json, false, 512, JSON_BIGINT_AS_STRING));

?>
```

Kết quả output của ví dụ trên sẽ như sau:

```
object(stdClass)#1 (1) {
  ["number"]=>
  float(1.2345678901235E+19)
}
object(stdClass)#1 (1) {
  ["number"]=>
  string(20) "12345678901234567890"
}
```

**Chú ý:**

- Specs JSON không phải là JavaScript, nó là một tập hợp con của JavaScript.

- Nếu giải mã không thành công, bạn có thể sử dụng json_last_error () để biết chính xác trạng thái của error.