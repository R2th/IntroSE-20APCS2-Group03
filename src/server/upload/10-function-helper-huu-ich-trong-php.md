Trong bài viết này mình xin chia sẻ với các bạn một số hàm mà mình hay sử dụng trong các project hiện tại.
## 1. Random 1 chuỗi string
– Tham số:

`$length`: Độ dài chuỗi bạn muốn random.
```php
function randomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
```
## 2. Convert string sang slug
– Tham số:

`$string`: Chuỗi bạn muốn chuyển đổi.

`$symbol`: Ký tự đặc biệt bạn muốn nối các từ lại với nhau, mặc định các từ được nối bằng dấu `_`
```php
function stringToSlug($string, $symbol = '_') {
    if (empty($string)) {
        return $string;
    }
    $character_a = array('à', 'á', 'ạ', 'ả', 'ã', 'â', 'ầ', 'ấ', 'ậ', 'ẩ', 'ẫ', 'ă', 'ằ', 'ắ', 'ặ', 'ẳ', 'ẵ');
    $character_e = array('è', 'é', 'ẹ', 'ẻ', 'ẽ', 'ê', 'ề', 'ế', 'ệ', 'ể', 'ễ');
    $character_i = array('ì', 'í', 'ị', 'ỉ', 'ĩ');
    $character_o = array('ò', 'ó', 'ọ', 'ỏ', 'õ', 'ô', 'ồ', 'ố', 'ộ', 'ổ', 'ỗ', 'ơ', 'ờ', 'ớ', 'ợ', 'ở', 'ỡ');
    $character_u = array('ù', 'ú', 'ụ', 'ủ', 'ũ', 'ư', 'ừ', 'ứ', 'ự', 'ử', 'ữ');
    $character_y = array('ỳ', 'ý', 'ỵ', 'ỷ', 'ỹ');
    $character_d = array('đ');
    $character_symbol = array('!', '@', '%', '^', '*', '(', ')', '+', '=', '<', '>', '?', '/', ', ', '.', ':', ';', '|', '"', '&', '#', '[', ']', '~', '$', '_', '__', '--', ' ');
    $alias = mb_strtolower($string, 'UTF-8');
    $alias = trim($alias);
    $alias = str_replace($character_a, 'a', $alias);
    $alias = str_replace($character_e, 'e', $alias);
    $alias = str_replace($character_i, 'i', $alias);
    $alias = str_replace($character_o, 'o', $alias);
    $alias = str_replace($character_u, 'u', $alias);
    $alias = str_replace($character_y, 'y', $alias);
    $alias = str_replace($character_d, 'd', $alias);
    $symbol_modify = '-';
    if (!empty($symbol)) {
        $symbol_modify = $symbol;
    }
    $alias = str_replace($character_symbol, $symbol_modify, $alias);
    $alias = preg_replace('/--+/', $symbol_modify, $alias);
    $alias = preg_replace('/__+/', $symbol_modify, $alias);
    return $alias;
}
```
## 3. Get timezone theo IP hiện tại
- Hàm này sẽ dùng hàm file_get_contents đến `http://ip-api.com/json` để lấy file json chứa thông tin timezone theo IP của client đang call đến nó.
```php
function getTimeZoneUser() {
    $json   = file_get_contents( 'http://ip-api.com/json');
    $timezone = '';
    if (!empty($json )) {
        $ipData = json_decode( $json, true);
        if (!empty($ipData['timezone'])) {
            $timezone = $ipData['timezone'];
        }
    }
    return $timezone;
}
```

## 4. Hàm đọc dữ liệu từ file
– Tham số:

`$file`: Đường dẫn vật lý tới file cần đọc.

`$convert_to_array`: Chuyển đổi dữ liệu đọc được sang dạng mảng.
```php
function get_file_data($file, $convert_to_array = true)
{
     $file = @file_get_contents($file);
     if (!empty($file)) {
         if ($convert_to_array) {
            return json_decode($file, true);
         }
         return $file;
     }
     return false;
}
```
## 5. Hàm json_encode helper
– Hàm này sẽ hỗ trợ chuyển đổi dữ liệu khi dùng json encode sang dạng dễ đọc. Mặc định json_encode thì sẽ ra string dính liền với nhau, khi chúng ta ghi ra file nhìn sẽ rất khó. Dùng hàm này thì lúc ghi dữ liệu ra file, nó sẽ ở dạng json giúp dễ đọc hơn.

```php
function json_encode_prettify($data)
{
     return json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}
```
## 6. Hàm ghi dữ liệu
```php
 function save_file_data($path, $data, $json = true)
 {
    try {
        if ($json) {
            $data = json_encode_prettify($data);
        }
        @file_put_contents($path, $data);
        return true;
     } catch (Exception $ex) {
        return false;
     }
 }
```
## 7. Hàm lấy tất cả tập tin và thư mục con của một thư mục
– Tham số:

`$path`: Đường dẫn vật lý tới thư mục cần quét.

`$ignore_files`: các tập tin bạn không muốn bao gồm trong kết quả tìm được. Ví dụ: .gitignore, .thumb, .DS_STORE…
```php
function scan_folder($path, $ignore_files = [])
{
    try {
        if (is_dir($path)) {
            $data = array_diff(scandir($path), array_merge(['.', '..'], $ignore_files));
            natsort($data);
            return $data;
        }
        return [];
    } catch (Exception $ex) {
         return [];
    }
}
```
## 8. Hàm dd() dùng để debug code
```php
function dd()
{
    $args = func_get_args();
    foreach ($args as $k => $arg) {
        echo '<fieldset class="debug">
        <legend>' . ($k + 1) . '</legend>';
        CVarDumper::dump($arg, 10, true);
        echo '</fieldset>';
    }
    die;
}
```
## 9. Loại bỏ 1 giá trị trong array theo key và value
– Tham số:

`$array`: Mảng truyền vào.

`$key`: Key muốn xóa

`$value`: Value muốn xóa
```php
function removeElementWithValue($array, $key, $value) {
    foreach ($array as $subKey => $subArray) {
        if (isset($subArray[$key]) && $subArray[$key] == $value) {
            unset($array[$subKey]);
        }
    }
    return $array;
}
```
## 10.  Diff 2 array bằng đệ quy
– Tham số:

`$aArray1`: Mảng thứ nhất

`$aArray2`: Mảng thứ hai
```php
function arrayRecursiveDiff($aArray1, $aArray2) {
  $aReturn = array();

  foreach ($aArray1 as $mKey => $mValue) {
    if (array_key_exists($mKey, $aArray2)) {
      if (is_array($mValue)) {
        $aRecursiveDiff = arrayRecursiveDiff($mValue, $aArray2[$mKey]);
        if (count($aRecursiveDiff)) { $aReturn[$mKey] = $aRecursiveDiff; }
      } else {
        if ($mValue != $aArray2[$mKey]) {
          $aReturn[$mKey] = $mValue;
        }
      }
    } else {
      $aReturn[$mKey] = $mValue;
    }
  }
  return $aReturn;
} 
```

**Lưu ý: Nếu viết trong helper các bạn nên check `if (!function_exists('function_name'))` trước mỗi hàm nhé!**

Thanks you for reading :))