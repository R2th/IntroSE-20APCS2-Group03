### Giới thiệu
- Trong C/C++, Java... khi khai báo biến chúng ta cần định nghĩa cả kiểu dữ liệu cho nó, nhưng đối với PHP, Python, hay Javascript khi khai báo biến thì chỉ cần khai báo tên biến mà không cần định nghĩa thêm kiểu dữ liệu.
- PHP có 2 kiểu so sánh là **==** và **===**, hai kiểu so sánh này trả về `BOOLEAN (TRUE/FALSE)`, hai kiểu so sánh này lại rất khác nhau. 
    - Toán tử so sánh **===** chỉ trả về TRUE khi hai biến so sánh giống nhau về `giá trị` và `kiểu dữ liệu`.
    -  Toán tử so sánh **==** nếu như kiểu dữ liệu khác nhau nó sẽ đưa về một kiểu dữ liệu chung để thực hiện việc so sánh
- Tuy nhiên cần lưu ý khi sử dụng những kiểu so sánh trong PHP, nó cũng có thể là một nguyên nhân gây ra lỗi không mong muốn đối với lập trình viên.
### Cách so sánh



   | PHP Comparisons: Loose | Value | 
   | -------- | -------- |
   |   "0000" == int(0) | TRUE     | 
   |   0e12" == int(0)   | TRUE     | 
   |   "0e12345" == "0"   | TRUE     | 
   |    "0abc" == int(0)  | TRUE     | 
   |    "abc" == int(0)   | TRUE     | 
   |    "0e12345" == "0e54321"| TRUE     | 
   |   "0e12345" <= "1"  | TRUE     | 
   |   "1abc" == int(1)  | TRUE     | 
   |   "0xF" == "15"  | TRUE     | 

   
Tham khảo thêm bảng các so sánh trong PHP:

 ![](https://images.viblo.asia/56c6c24a-b785-444a-9fc0-6a1a473af784.png)
 
 ![](https://images.viblo.asia/caf6d620-caf0-43d5-834b-eb875ad3ade6.png)

### Những lỗ hổng có thể xảy ra
#### Authentication Bypass
Ta có đoạn mã PHP xác thực như sau:
```php
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        $data = json_decode(file_get_contents("php://input"));
        if($data->{'username'} == "admin" && $data->{'password'} == "admin"){
                echo "success";
                header('location: admin');
        }
        else{ 
                echo "failed";
                header("location: login");
        }
}
```

Khi người dùng xác thực với username và password là `test/test` thì request và response sẽ có dạng như sau:

```http
POST /login HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://web-lab.pwn/debug.php
Content-Type: text/plain;charset=UTF-8
Origin: http://web-lab.pwn
Content-Length: 37
Connection: close

{"username":"test","password":"test"}
```
```http
HTTP/1.1 302 Found
Date: Mon, 19 Oct 2020 03:19:15 GMT
Server: Apache/2.4.43 (Debian)
location: login
Content-Length: 698
Connection: close
Content-Type: text/html; charset=UTF-8

failed
```
Để ý thấy body request có data dạng json với username và password là các strings
```json
{"username":"test","password":"test"}
```
Thay vì người dùng xác thực bằng username và password là `admin/admin` như bình thường thì người dùng xác thực bằng cách thay đổi username và password thành các giá trị số nguyên `0`. Khi đó PHP thực hiện so sánh string với interger, nếu như string không bắt đầu là 1 số thì string mặc định được ép kiểu về `int(0)`. Vậy nên biểu thức so sánh vô tình trở thành:
```
0 == "admin" -> TRUE
```
Nhìn request và response dưới đây thì có thể thấy ta đã bypass xác thực mà không cần biết username và password.
```http
POST /login HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://web-lab.pwn/debug.php
Content-Type: text/plain;charset=UTF-8
Origin: http://web-lab.pwn
Content-Length: 27
Connection: close

{"username":0,"password":0}
```
```http
HTTP/1.1 302 Found
Date: Mon, 19 Oct 2020 03:25:46 GMT
Server: Apache/2.4.43 (Debian)
location: admin
Content-Length: 699
Connection: close
Content-Type: text/html; charset=UTF-8

success
```

Tuy nhiên việc xác thực này thông qua json nên người dùng mới có thể thay đổi được type của input, nếu như input là tham số của POST, GET, hay COOKIE thì input được gửi đi dưới dạng string hoàn toàn không thể thay đổi được type nên việc so sánh dẫn đến việc so sánh 2 string 
```
"0" == "admin" -> FALSE
```
Nhưng nếu ứng dụng chấp nhận các input thông qua các hàm như `json_decode()` hay `unserialize()` thì người dùng có thể thay đổi `type` của input giống như ở trên.
#### Magic Hashes
Khi so sánh một string với một số interger trong PHP, nếu như string bắt đầu bằng một ký tự không phải là số, nó sẽ mặc định là `int(0)`:
```
'abc...000' == 0 -> TRUE
```
Hoặc các strings bắt đầu với các ký tự là `0e`, khi đó các chuỗi được chuyển thành các lũy thừa ví dự như `0e1234`->$0^{1234}$, `0e4321`->$0^{4321}$ vậy tương đương với `int(0)`:
```
'0e1234' == '0e4321' 
'0e1234' == '0' 
'0e1234' <= '1'
```
Ví dụ:
```php
<?php
        $key = "0e124656823434657657655654324342";
        if(isset($_COOKIE['key']) && md5($_COOKIE['key']) == $key) {
                // access
        }
        else {
                // error
        }
?>
```
Đoạn mã trên với input cookie `key = '240610708'` hoàn toàn có thể bypass việc check key, vì khi md5 giá trị `240610708` sẽ được một string `0e462097431906509019562988736854` mà khi đem so sánh với key trên server là `0e124656823434657657655654324342` khi đó PHP sẽ ngầm định so sánh 

```
0e124656823434657657655654324342 = int(0) 
0e462097431906509019562988736854 = int(0)
=> 0e462097431906509019562988736854 == 0e124656823434657657655654324342
```
```php
md5($_COOKIE['key']) == $key;
md5('240610708') == '0e124656823434657657655654324342'
=> '0e462097431906509019562988736854' == '0e124656823434657657655654324342' -> TRUE
```

Ví dụ khác cũng tương tự với sha256
```php
$pwd1 = '1]W';
$pwd2 = '@1$';
$hash_pwd = password_hash(hash('sha256',$pwd1, true), PASSWORD_DEFAULT);
var_dump(password_verify(hash('sha256', $pwd2, true), $hash_pwd));
#output
bool(true)
```
Một số ví dụ khác:
```php
var_dump(md5('240610708') == md5('QNKCDZO'));
var_dump(md5('aabg7XSs')  == md5('aabC9RqS'));
var_dump(sha1('aaroZmOk') == sha1('aaK1STfY'));
var_dump(sha1('aaO8zKZF') == sha1('aa3OFF9m'));
var_dump('0010e2'         == '1e3');
var_dump('0x1234Ab'       == '1193131');
var_dump('0xABCdef'       == '     0xABCdef');
```

### Cách phòng ngừa
- Nên sử dụng so sánh **===** thay vì **==** trong một số trường hợp đơn giản.
- Không nên ép kiểu trước khi so sánh **===**, việc này giống như sử dụng **==**, ví dụ:

    *Code*
    ```php
    $ex_int = 1999;
    $ex_string = '1999 was my birth year';
    if($ex_int === (int)$ex_string){
      echo "yes";
    }
    else{
      echo "no";
    }
    ```
    *Output*
    ```
    yes
    ```
 - Thay vì sử dụng
     ```
     if($value) {
        //code
    }
    ```
    thì nên sử dụng
    ```
    if($value === true) {
        //code
    }
    ```