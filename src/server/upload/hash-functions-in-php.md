# Hash Functions

## 1. Danh sách các hàm
| Hàm | Mô tả |
| -------- | -------- |
|[md5()](#_21-md5-3)|	Chuyển một chuỗi sang dạng một chuỗi mới đã được mã hóa theo tiêu chuẩn MD5 (32 bít). (Trong PHP không hỗ trợ giải mã một chuỗi đã mã hóa MD5 sang dạng ban đầu.)|
|[sha1()](#_22-sha1-4)|	Chuyển một chuỗi sang một chuỗi mới đã được mã hóa theo tiêu chuẩn `sha1`. (Trong php không có hàm nào hỗ trợ chuyển một chuỗi đã được sử dụng `sha1()` sang chuỗi ban đầu.)|
|[md5_file()](#_23-md5_file-5)|	Chỉ định một file bất kì để chuyển sang một chuỗi được mã hóa theo tiêu chuẩn MD5(32 bit) , (trong PHP không hỗ trợ giải mã một chuỗi đã mã hóa `MD5` sang dạng ban đầu, hàm này khá giống với hàm `md5();`)|
|[hash_algos()](#_24-hash_algos-6)|	Hàm `hash_algos()` trả về một mảng bao gồm danh sách các thuật toán mã hóa được hỗ trợ.|
|[hash()](#_25-hash-7)	|Hàm `hash()` sẽ mã hóa truyền vào theo một thuật toán nhất định.|
|[hash_init()](#_26-hash_init-8)|	Hàm `hash_init()` sẽ quy định thuật toán mã hóa.|
|[hash_update()](#_27-hash_update-9)	|Hàm `hash_update()` sẽ tiến hành cập nhật chuỗi cần mã hóa và tài nguyên quy định thuật toán mã hóa từ hàm hash_init() vào quá trình mã hóa.|
|[hash_final()](#_28-hash_final-10)|	Hàm `hash_final()` sẽ hoàn thành bước cuối cùng trong quá trình mã hóa và nhận về kết quả mã hóa.|
|[hash_copy()](#_29-hash_copy-11)|	Hàm `hash_copy()` sẽ sao chép tài nguyên quy định thuật toán mã hóa và lưu vào biến nào đó.|
|[hash_file()](#_210-hash_file-12)|	Hàm `hash_file()` sẽ mã hóa nội dung của file được truyền vào theo thuật toán nhất định.|
|[hash_equals()](#_211-hash_equals-13)|	Hàm `hash_equals()` sẽ so sánh hai chuỗi đã được mã hóa xem chúng có giống nhau hay không|

## 2. Chi tiết về các hàm
### 2.1. md5
Cú pháp
```php
md5(string $str [, bool $raw_output = FALSE]) // Hàm sẽ trả về một chuỗi thập lục phân với chiều dài 32 ký tự (đã mã hóa)
```
Trong đó:
> `$str` là chuỗi bạn muốn mã hóa
> \
> `$raw_output` có giá trị true hoặc `false`, mặc định là `false`:
> - Nếu `true`: hàm sẽ trả về chuỗi nhị phân 16 ký tự đã mã hóa
> - Nếu `false`: hàm trả về chuỗi bình thường gồm 32 ký tự đã mã hóa

Ví dụ:
#### Mã hóa với $row_output = false
```php
$str = 'truongthinhi';
echo md5($str); // 3679eb61591196c7fbb4591986a8df89
echo md5($str, false); // 3679eb61591196c7fbb4591986a8df89
```
#### Mã hóa với $row_output = true
```php
$str = 'truongthinhi';
echo md5($str, true); // 6y�aY����Y��߉
```
### 2.2. sha1
Cú pháp:
```php
sha1(string $str [, bool $raw_output = FALSE]) // Trả ra một chuỗi số thập lục phân với chiều dài 40 ký tự
```
Trong đó:
> `$str` là chuỗi cần mã hóa
> \
> `$raw_output` có giá trị `true` hoặc `false`, mặc định là `false`.
> - Nếu `true` thì hàm sẽ trả về chuỗi nhị phân với 20 ký tự (đã mã hóa)
> - Nếu `false` thì hàm trả về chuỗi thập lục phân gồm  40 ký tự (đã mã hóa)

Ví dụ:
#### Mã hóa với $raw_output = false
```php
$str = 'truongthinhi';
echo sha1($str); // ec74b54dc6251b3e8964812aacf4c65c2e059122
echo sha1($str, false); // ec74b54dc6251b3e8964812aacf4c65c2e059122
```
#### Mã hóa với $raw_output = true
```php
$str = 'truongthinhi';
echo sha1($str, true); // ec74b54dc6251b3e8964812aacf4c65c2e059122
```
### 2.3. md5_file
Cú pháp:
```php
string md5_file(string $str [, bool $raw_output = false])
// Hàm sẽ trả về một chuỗi thập lục phân với chiều dài 32 ký tự (đã mã hóa)
```
Trong đó:
> `$str` là chuỗi bạn muốn mã hóa
> \
> `$raw_output` có giá trị true hoặc `false`, mặc định là `false`:
>- Nếu `true`: hàm sẽ trả về chuỗi nhị phân 16 ký tự đã mã hóa
>- Nếu `false`: hàm trả về chuỗi bình thường gồm 32 ký tự đã mã hóa
Ví dụ:
#### Mã hóa với $row_output = false
```php
// Các bạn tạo file mới trên local trước đã nha, file mới của mình tên là testHashFile.txt
file_put_contents("testHashFile.txt", "Mình đang test hàm hash_file nha.");
$file = 'testHashFile.txt';
echo md5_file($file, false); // ec93df26a79d51c7bb2bebe5b2bbc945
```
#### Mã hóa với $row_ouput = true
```php
$file = 'testHashFile.txt';
echo md5_file($file, true); //
```
### 2.4. hash_algos
Cú pháp:
```php
hash_algos(); // Hàm sẽ trả về một mảng liên tục chứa danh sách các thuật toán mã hóa được hỗ trợ.
```
Ví dụ:
```php
$arr = hash_algos();
print_r($arr);
```
Kết quả:
```php
Array
(
    [0] => md2
    [1] => md4
    [2] => md5
    [3] => sha1
    [4] => sha224
    [5] => sha256
    [6] => sha384
    [7] => sha512/224
    [8] => sha512/256
    [9] => sha512
    [10] => sha3-224
    [11] => sha3-256
    [12] => sha3-384
    [13] => sha3-512
    [14] => ripemd128
    [15] => ripemd160
    [16] => ripemd256
    [17] => ripemd320
    [18] => whirlpool
    [19] => tiger128,3
    [20] => tiger160,3
    [21] => tiger192,3
    [22] => tiger128,4
    [23] => tiger160,4
    [24] => tiger192,4
    [25] => snefru
    [26] => snefru256
    [27] => gost
    [28] => gost-crypto
    [29] => adler32
    [30] => crc32
    [31] => crc32b
    [32] => crc32c
    [33] => fnv132
    [34] => fnv1a32
    [35] => fnv164
    [36] => fnv1a64
    [37] => joaat
    [38] => haval128,3
    [39] => haval160,3
    [40] => haval192,3
    [41] => haval224,3
    [42] => haval256,3
    [43] => haval128,4
    [44] => haval160,4
    [45] => haval192,4
    [46] => haval224,4
    [47] => haval256,4
    [48] => haval128,5
    [49] => haval160,5
    [50] => haval192,5
    [51] => haval224,5
    [52] => haval256,5
)
```

### 2.5. hash
Cú pháp:
```php
hash($algo, $str, $raw_output);
// Hàm sẽ trả về chuỗi được tính toán dưới dạng nhị phân nếu $raw_output mang giá trị TRUE,
// và trả về chuỗi được tính toán dưới dạng thập phân nếu $raw_output mang giá trị FALSE .
```
Trong đó:
> `$algo` là thuật toán mã hóa.
> \
> `$str` là chuỗi cần mã hóa.
> \
> `$raw_output` là tham số, mặc định mang giá trị `FALSE` chuỗi trả về sẽ là chuỗi in thường thập phân. Nếu `$raw_output` mang giá trị `TRUE` chuỗi trả về sẽ là chuỗi theo kiểu nhị phân.

Ví dụ:
#### Mã hóa theo kiểu "ripemd160":
```php
echo hash('ripemd160', 'The quick brown fox jumped over the lazy dog.'); // 92a5ec97824260974efb2a3a3d07c48df1afe99a
echo hash('ripemd160', 'The quick brown fox jumped over the lazy dog.', true); // ��엂B`�N�*:=č��
```
#### Mã hóa theo kiểu "md5":
```php
echo hash('md5', 'The quick brown fox jumped over the lazy dog.'); // 1397c8e097423f2099d29fc72143b3e6
echo md5("The quick brown fox jumped over the lazy dog."); // 41bf1887028c20e22b00c84d08ec192c
```
### 2.6. hash_init
Cú pháp: 
```php
hash_init($algo);
// Hàm sẽ trả về một tài nguyên quy định thuật toán mã hóa,
// tài nguyên này sẽ được sử dụng trong các hàm hash_update(), hash_update_stream(), hash_update_file(), và hash_final().
```
Trong đó:
> `$algo` là thuật toán mã hóa.

Ví dụ:
```php
$ctx = hash_init('md5');
hash_update($ctx, 'This a test string');
echo hash_final($ctx); // d25a9357d0b6daa60fae67ab419a1f20
```

### 2.7. hash_update
Trong trường hợp ta muốn thay đổi thuật toán mã hóa hoặc chuỗi cần mã hóa, ta sẽ sử dụng hàm hash_update()

Cú pháp:
```php
hash_update($context, $str);
// Hàm luôn trả về TRUE nếu $context là một tài nguyên hợp lê. Nếu $context không hợp lệ hàm sẽ báo lỗi.
```
Trong đó:
> `$context` là tài nguyên quy định thuật toán mã hóa. Nó chính là kết quả trả về từ hàm `hash_init()`.
> \
> `$str` là chuỗi cần mã hóa.

Ví dụ:
```php
$ctx = hash_init('md5');
echo hash_update($ctx, 'this is a test'); // 1
echo hash_final($ctx); // 54b0c58c7ce9f2a8b551351102ee0938
echo  md5('this is a test'); // 54b0c58c7ce9f2a8b551351102ee0938
```
### 2.8. hash_final
Cú pháp:
```php
hash_final($context, $raw_output); // Hàm chả về chuỗi đã được mã hóa.
```
Trong đó:
> `$context` sẽ là tài nguyên quy định thuật toán mã hóa. `$context` chính là kết quả của hàm `hash_init()`.
> \
> `$raw_output` là tham số không bắt buộc, giá trị mặc định là `FALSE`.
> - Nếu `$raw_output = FALSE`, hàm `hash_final()` sẽ trả về kết quả là chuỗi thập phân in thường.
>- Nếu `$raw_output = TRUE`, hàm `hash_final()` sẽ trả về kết quả là chuỗi nhị phân.

Ví dụ:

Sử dụng hàm `hash_final()` nhận kết quả là chuỗi thập phân in thường:
```php
$ctx = hash_init('md5');
hash_update($ctx, 'this is a test');
echo hash_final($ctx); // 54b0c58c7ce9f2a8b551351102ee0938
```
### 2.9. hash_copy
Cú pháp:
```php
hash_copy($context); 
// Hàm sẽ trả về một tài nguyên quy định thuật toán mã hóa. Tài nguyên tương đương với tài nguyên truyền vào.
```
Trong đó:
> `$context` là tài nguyền quy định thuật toán mã hóa. `$context` là kết quả trả về của hàm `hash_init()`.

Ví dụ:
```php
$ctx = hash_init('md5');
hash_update($ctx, 'This is a test');
$copy = hash_copy($ctx);
echo hash_final($ctx); // ce114e4501d2f4e2dcea3e17b546f339
echo hash_final($copy); // ce114e4501d2f4e2dcea3e17b546f339
```

### 2.10. hash_file
Cú pháp: 
```php
hash_file($algo, $filename, $raw_output);
// Kết quả trả về  là một chuỗi đã được mã hóa từ nội dung của file truyền vào.
```
Trong đó: 

> `$algo` là tên của thuật toán mã hóa( md5, md4 .v.v.).
\
`$filename` là đường dẫn tới file cần mã hóa nội dung.
\
`$raw_output` là tham số không bắt buộc, mặc định mang giá trị `FALSE`:
> -  Nếu `$raw_output = FALSE`, hàm sẽ trả về chuỗi mã hóa dưới dạng chuỗi thập phân in thường.
> -  Nếu `$raw_output = TRUE`, hàm sẽ trả về chuỗi mã hóa dưới dạng chuỗi nhị phân.

Ví dụ:
```php
// Mình lấy luôn file testHashFile.txt ở trên đã tạo nha
echo hash_file('md5', 'testHashFile.txt'); // ec93df26a79d51c7bb2bebe5b2bbc945
```

### 2.11. hash_equals
Cú pháp
```php
hash_equals($known_string, $user_string); // Trả về `TRUE` nếu hai chuỗi giống nhau, trả về `FALSE` nếu khác nhau.
```
> `$known_string` là chuỗi đã biết.
\
`$user_string` là chuỗi mà người dùng chuyền vào dùng để so khớp với `$known_string`

Ví dụ:
```php
$expected  = crypt('truongthinhi', '$thisismysalt$');
$correct   = crypt('truongthinhi', '$thisismysalt$');
$incorrect = crypt('soccer', '$thisismysalt$');
 
var_dump(hash_equals($expected, $correct)); // bool(true) 
echo "<br />";
var_dump(hash_equals($expected, $incorrect)); // bool(false)
```

source: 

https://www.php.net/manual/en/function.hash.php