Chào các bạn, đang khi lang thang trên vài blog công nghệ thì mình có đọc được bài viết gồm  các tips khá hay về PHP, mình muốn share lại cho mọi người để cùng học hỏi nhé :D

## 1. Tạo process chạy trong background
Trong quá trình code, sẽ có nhiều lúc bạn cần những xử lý trong background để gửi mail hay chạy batch, hay đơn giản là xử lý database, ... hãy sử dụng hàm exec như dưới đây:

```erlang
exec(sprintf("%s > %s 2>&1 & echo $! >> %s", $cmd, $outputfile, $pidfile));
```
=> Lệnh này sẽ chạy lệnh $cmd và output ra biến $outputfile, sau đó ghi id quá trình vào $pidfile.

## 2. Xóa toàn bộ folder và nội dung trong folder
Cũng đơn giản thôi nhưng nếu được hãy lưu nó lại 1 nơi nào đó để sử dụng nhanh nhé :D
```javascript
$dir = 'folder_path'; // ex: '../uploads/media/1
if (is_dir($dir)) {
    array_map('unlink', glob($dir . '/*'));
    rmdir($dir);
}
```

## 3. Ghi log error debug ra file
Chắc hẳn đôi khi bạn sẽ cần ghi log ra file để debug code đúng không? đoạn code ngắn dưới đây sẽ giúp bạn log time và lỗi ra file cho bạn :D

```php
function cloud_error_log($errordata) {
    $filePath = 'file/path/errorLogFile.txt';
    $handle = fopen($filePath, 'a+');
    $logtext = "******************" . date('d-m-Y h:i:s') . "******************\n\n";
    $logtext .= print_r($errordata, true);
    $logtext .= "\n\n**********************************************************\n\n";
    $errorlog = fwrite($handle, $logtext);
    fclose($handle);
    chmod($filePath, 0777);
    return true;
}

cloud_error_log('Error'); // Error: text, array, ...
```

Kết quả:
```scala
******************03-02-2020 10:46:26******************

Error

**********************************************************
```

## 4. Lấy danh sách ngày từ tên ngày của năm và tháng
Liên quan đến ngày tháng, dưới đây là hàm để lấy mảng các ngày trong tháng, theo tên của thứ:

```php
function getMonthDatefromDay($month, $year, $searchdayname)
{
    $start_date = "01-" . $month . "-" . $year;
    $start_time = strtotime($start_date);
    $end_time = strtotime("+1 month", $start_time);
    for ($i = $start_time; $i < $end_time; $i += 86400) {
        if (strtolower(date('D', $i)) == $searchdayname)
            $list[] = date('Y-m-d', $i);
    }
    return $list;
}

echo "<pre>";
var_dump(self::getMonthDatefromDay('02', '2020', 'mon'));
die();
```

Kết quả:
```perl
array(4) {
  [0]=>
  string(10) "2020-02-03"
  [1]=>
  string(10) "2020-02-10"
  [2]=>
  string(10) "2020-02-17"
  [3]=>
  string(10) "2020-02-24"
}
```
## 5. Mã hóa và giải mã password (Encrypt, Decrypt)
Trong project của bạn 1 chức năng rất cần thiết đó là mã hóa và giải mã password của người dùng hoặc bất kỳ 1 mã số nào đó cần mã hóa đúng không?

Đoạn code dưới đây sử dụng hàm `openssl_encrypt()` và `openssl_decrypt()` của PHP để xử lý:
```
function encrypt_decrypt($string, $action = 'encrypt')
{
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'AA74CDCC2BBRT935136HH7B63C27'; // user define private key
    $secret_iv = '5fgf5HJ5g27'; // user define secret key
    $key = hash('sha256', $secret_key);
    $iv = substr(hash('sha256', $secret_iv), 0, 16); // sha256 is hash_hmac_algo
    if ($action == 'encrypt') {
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
    } else if ($action == 'decrypt') {
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }
    return $output;
}

echo "Your Encrypted password is => ". $pwd = encrypt_decrypt('spaceo', 'encrypt');
echo '<br/>';
echo "Your Decrypted password is => ". encrypt_decrypt($pwd, 'decrypt');
 ```

Kết quả:
```perl
Your Encrypted password is => VVlsNjJuSXppU0dCbDlKUGh2MGR6UT09
Your Decrypted password is => abc123
```

## 6. Create random Unique Key
Một hàm khá là ngắn gọn nhưng lại rất hay cho các bạn cần để tạo 1 unique key. 
```cpp
echo md5(uniqid(time()));
```
Tuy ngắn gọn nhưng không mấy bạn biết để sử dụng đâu :D 

## 7. Hiển thị số cùng suffix
Bạn vẫn thường thấy facebook có tính năng hiển thị count list users ex: 10K đúng không? đây là một hàm nhỏ để xử lý thêm suffix vào sau một số:
```php
function formatWithSuffix($input)
{
    $suffixes = array('', 'K', 'M', 'B', 'T');
    $suffixIndex = 0;
    while(abs($input) >= 1000 && $suffixIndex < sizeof($suffixes)) {
        $suffixIndex++;
        $input /= 1000;
    }
    return ($input > 0 ? floor($input * 1000) / 1000 : ceil($input * 1000) / 1000). $suffixes[$suffixIndex];
}
echo formatWithSuffix('10000');
echo formatWithSuffix('10000000');
```

Kết quả:
```markdown
10K
10M
```

## 8. Multiple array sorting
Trong khi code nếu có nhiều array cần sort bạn có thể dùng hàm `array_multisort()` có sẵn của PHP để code hay hơn nhé:
```perl
$data = array(['id'=>1,'name'=>"sameer"],['id'=>2,'name'=>"yagnesh"],['id'=>3,'name'=>"chirag"]);
foreach ($data as $key => $row) {
    $id[$key] = $row['id'];
    $name[$key] = $row['name'];
}
array_multisort($id, SORT_DESC, $name, SORT_ASC, $data);
echo "<pre>";
var_dump($id);

echo "<pre>";
var_dump($name);
```

Kết quả:
```cpp
array(3) {
  [0]=> int(3)
  [1]=> int(2)
  [2]=> int(1)
}

array(3) {
  [0]=> string(6) "chirag"
  [1]=> string(7) "yagnesh"
  [2]=> string(6) "sameer"
}
```

## 9. Lấy kích thước tệp tin từ URL hoặc file
Hàm `filesize()` của PHP cho phép bạn lấy kích thước của file để bạn có thể check được file nặng hay nhẹ để đưa ra hướng xử lý data cho phù hợp:
```sql
echo filesize("test.txt");
```
Lưu ý: Vì kiểu int() của PHP đã được ký và nhiều nền tảng sử dụng số nguyên 32 bit, một số hàm hệ thống file có thể trả về kết quả không mong muốn cho các tệp lớn hơn 2GB.

## 10. Tip nhỏ 
Không bao giờ sử dụng 
```php
for($i=0; $i<count($arrayName); $i++){…} 
```

mà nên sử dụng:
```perl
$cnt = count($arrayName); 
for($i=0; $i<$cnt; $i++){…}
```

Trong ví dụ trên, phương thức đầu tiên sẽ gọi hàm đếm trên mỗi lần lặp cho vòng lặp, trong khi ở lần lặp thứ hai, hàm đếm chỉ được gọi một lần.

=> Nếu array cần count càng lớn thì thời gian chạy sẽ giảm đáng kể đấy.

### Tham khảo
1. [https://www.spaceotechnologies.com/advanced-php-tips-php-developers/](https://www.spaceotechnologies.com/advanced-php-tips-php-developers/)
2. [https://www.php.net/manual/en/function.array-multisort.php](https://www.php.net/manual/en/function.array-multisort.php)
3. [https://stackoverflow.com/a/45966](https://stackoverflow.com/a/45966)
4. [https://www.php.net/manual/en/function.filesize.php](https://www.php.net/manual/en/function.filesize.php)
### Kết
Hy vọng những tips trên sẽ 1 phần nào giúp đỡ các bạn trong khi làm việc cùng PHP, hãy lưu lại nó ở 1 nơi nào đó nhé :D

Cảm ơn bạn đã đọc bài viết của mình, chào thân ái!