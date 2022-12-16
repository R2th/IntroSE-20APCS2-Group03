Xin chào tất cả các mọi người, bài viết này mình xin trình bày về xử lý lỗi và Exception trong PHP, rất mong được sự theo dõi của mọi người
### 1) Xử lý lỗi

Xử lý lỗi là tiến trình phát hiện lỗi được tạo khi chạy code của bạn và sau đó thực hiện các hành động thích hợp. Nếu bạn xử lý lỗi không chính xác, thì có thể dẫn tới nhiều kết quả không mong đợi.

PHP có cung cấp các cơ chế giúp bắt lỗi, giám sát các lỗi và xử lý các lỗi có thể xảy ra khi lập trình.

**1.1) Hàm die() và exit()**

- Để bắt lỗi trong PHP ta có thể sử dụng hàm die() hoặc hàm exit().
- Khi dùng hàm die() hoặc exit() thì một message sẽ được bắn ra và chương trình sẽ bị dừng lại.

```php
<?php
   if(!file_exists("/path/to/data-file.txt")) {
       // nếu chương trình chạy vào đây thì code ở phía sau sẽ không được thực thi
       exit("Không tìm thấy file này!!!"); 
   }
   else {
       $file=fopen("/path/to/data-file.txt","r");
       print "Mở file thành công!!!";
   }
   // logic ....
?>
```
**1.2) Tự định nghĩa hàm để xử lý lỗi trong PHP**
- Để tự định nghĩa hàm để xử lý lỗi thì ta có thể sử dụng cú pháp : 

    `error_function(errno, errstr, errfile, errline, errcontext);`
- Hàm xử lý lỗi tùy chỉnh phải có ít nhất hai tham số (error_level và errstr) bắt buộc, ngoài ra nó có thêm ba tham số (errfile, errline và errcontext) không bắt buộc, như được mô tả dưới đây

    - errno: Xác định mức độ lỗi, dưới dạng một số nguyên. Điều này tương ứng với hằng số cấp độ lỗi phù hợp (E_ERROR, E_WARNING, ...)
    - errstr: Xác định thông báo lỗi dưới dạng chuỗi
    - errfile: Xác định tên file của tập lệnh trong đó xảy ra lỗi
    - errline: Xác định số dòng mà lỗi xảy ra
    - errcontext: Xác định một mảng chứa tất cả các biến và giá trị của chúng tồn tại tại thời điểm xảy ra lỗi. Tham số này rất hữu ích cho việc gỡ lỗi

- **Các cấp độ lỗi trong PHP**


| Cấp độ lỗi | Giá trị | Mô tả |
| -------- | -------- | -------- |
| E_ERROR | 1 | Một lỗi Runtime nghiêm trọng. Việc thực thi kịch bản được dừng lại ngay lập tức |
| E_WARNING | 2 | Các lỗi không nghiêm trọng và việc thực thi script không bị dừng lại |
| E_NOTICE     | 8     | 	Một thông báo runtime. Cho biết rằng tập lệnh gặp phải lỗi có thể xảy ra, mặc dù tình huống cũng có thể xảy ra khi chạy tập lệnh bình thường     |
| E_USER_ERROR     | 256     | Một thông báo lỗi do người dùng tạo ra. Điều này giống như một E_ERROR, ngoại trừ nó được tạo bởi tập lệnh PHP bằng cách sử dụng hàm trigger_error () chứ không phải là PHP engine     |
| E_USER_WARNING     | 512     | Một thông điệp cảnh báo không trí mạng do người dùng tạo ra. Điều này giống như một E_WARNING, ngoại trừ nó được tạo bởi tập lệnh PHP bằng cách sử dụng hàm trigger_error () chứ không phải PHP engine     |
| E_USER_NOTICE     | 1024     | Một thông báo thông báo do người dùng tạo. Điều này giống như một E_NOTICE, ngoại trừ nó được tạo bởi tập lệnh PHP bằng cách sử dụng hàm trigger_error () chứ không phải PHP engine     |
| E_STRIC     | 2048     | 	Không hoàn toàn là một lỗi, nhưng được kích hoạt bất cứ khi nào PHP gặp mã có thể dẫn đến sự cố hoặc chuyển tiếp không tương thích     |
| E_ALL     | 8189     | Tất cả các lỗi và cảnh báo, ngoại trừ E_STRICT trước PHP 5.4.0.     |

**Ví dụ**

```php
<?php
  function handleError($error_no, $error_msg)
  {
    echo "Opps, something went wrong:";
    echo "Error number: [$error_no]";
    echo "Error Description: [$error_msg]";
  }
  
   //thiết lập error handler
  set_error_handler("handleError");
  
  echo (5 / 0);
?>
```

Như vậy, chúng ta tùy chỉnh tin nhắn thông báo lỗi cho thân thiện và rõ ràng hơn.



### 2) Exception
- Exception là một giải pháp quản lý lỗi kiểu hướng đối tượng
- Nó là một class được xây dựng sẵn trong ngôn ngữ PHP
- Một đối tượng Exception sẽ chứa các thông tin về nơi xảy ra lỗi (tên file, số dòng)
- Một số từ khóa liên quan tới Exception

    - Try : đoạn mã có khả năng xảy ra ngoại lệ nằm trong khối “try”. Nếu không xảy ra ngoại lệ mã sẽ tiếp tục như bình thường. Tuy nhiên nếu xảy ra ngoại lệ thì một ngoại lệ sẽ được ném ra.
    - Throw : Ngoại lệ được kích hoạt. Mỗi “throw” phải bao gồm ít nhất một khối “catch”.
    - Catch : lấy ra một ngoại lệ và tạo ra một đối tượng chứa thông tin ngoại lệ.

**Cú pháp**

```php
try 
{
    //Khối lệnh mà có thể phát sinh Exception
} 
catch (Exception $e) 
{    
    //Khối lệnh bắt được Exception
}
```

**Ví dụ :**

```php
<?php
//tạo hàm và throw một ngoại lệ
function checkNum($number) {
  if($number > 1) {
    throw new Exception("Giá trị phải nhỏ hơn hoặc bằng 1.");
  }
  return true;
}
 
//kích hoạt ngoại lệ trong khối "try"
try {
  checkNum(2);
  // nếu ngoại lệ được ném ra thì lệnh sau không được thực thi
  echo 'Number nhỏ hơn hoặc bằng 1.';
} catch(Exception $e) { //catch exception
  echo 'Message: ' .$e->getMessage();
}
?>
```

- Hàm checkNum() kiểm tra nếu một số lớn hơn 1. Nếu điều kiện đúng ngoại lệ được ném ra
- Hàm checkNum() được gọi trong khối “try”
- Ngoại lệ trong hàm checkNum() được ném ra
-  Khối “catch” lấy ra ngoại lệ và tạo ra một đối tượng ($e) chứa thông tin ngoại lệ
-  Thông báo lỗi từ ngoại lệ được lặp lại bằng cách gọi $ e-> getMessage() từ đối tượng ngoại lệ.

Trong ví dụ trên, hàm $e->getMessage được sử dụng để lấy error message. Dưới đây là một số hàm có thể được sử dụng từ lớp Exception trong PHP.

- getMessage() : Hiển thị tin nhắn ngoại lệ
-  getCode() : Hiển thị các mã số là đại diện của các loại ngoại lệ.
-  getFile() : Hiển thị tên các tập tin và đường dẫn nơi xảy ra ngoại lệ.
-  getLine() : Hiển thị các dòng xảy ra ngoại lệ.
-  getTrace() : Hiển thị trả về thông tin truy vết lỗi là một mảng các tên file và số dòng
-   getPrevious() : Hiển thị các ngoại lệ trước khi xảy ra trường hợp hiện tại
-   getTraceAsString() : Hiển thị một loạt các dấu vết của ngoại lệ như một chuỗi thay vì một mảng
-    `__toString()` : Hiển thị toàn bộ ngoại lệ như một chuỗi.

**2.1 Tạo một lớp ngoại lệ tùy chỉnh**
Nếu lớp Exception mặc định chưa đủ dùng cho bạn, bạn có thể tạo ra các Exeption riêng bằng cách kế thừa lớp Exception
- Chú ý, chỉ có phương thức khởi tạo `__contruct()` và `__toString` của Exception có thể ghi đè trong lớp kế thừa, còn lại các phương thức khác không thể ghi đè vì nó được định nghĩa là final.

**Ví dụ :**

```php
<?php
class CustomException extends Exception {
  public function errorMessage() {
    //error message
    $errorMsg = 'Error on line '.$this->getLine().' in '.$this->getFile()
        .': <b>'.$this->getMessage().'</b> is not a valid E-Mail address';
        
    return $errorMsg;
  }
}
 
$email = "ahihi@example...com";
 
try {
  //check email hợp lệ
  if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
    //throw exception nếu email không hợp lệ
    throw new customException($email);
  }
} catch (customException $e) {
  //hiển thị message
  echo $e->errorMessage();
}
?>
```

**2. 2) Xử lý nhiều ngoại lệ**

- Multiple Exceptions sử dụng nhiều block try...catch để cố gắng bắt các ngoại lệ được ném ra.

**Ví dụ**

```php
<?php
class CustomException2 extends Exception {
  public function errorMessage() {
    //error message
    $errorMsg = 'Error on line '.$this->getLine().' in '.$this->getFile()
    .': <b>'.$this->getMessage().'</b> is not a valid E-Mail address.';
    return $errorMsg;
  }
}
 
$email = "ahihi@example.com";
 
try {
  //check if
  if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
    //throw exception nếu email không hợp lệ
    throw new CustomException2($email);
  }
  //kiểm tra tồn tại chuỗi "example" trong địa chỉ email
  if(strpos($email, "example") !== FALSE) {
    throw new Exception("$email is an example e-mail.");
  }
} catch (CustomException2 $e) {
  echo $e->errorMessage();
} catch(Exception $e) {
  echo $e->getMessage();
}
?>
```


**2.3) Thiết lập Xử lý ngoại lệ toàn cục**
Khi ứng dụng phát sinh ngoại lệ bằng lệnh throw, nếu ngoại lệ không bị bắt lại bằng khối lệnh try ... catch ... thì ngoại lệ đó sẽ chuyển cho hàm xử lý ngoại lệ mặc định của PHP. Giờ nếu bạn muốn tạo ra hàm mặc định này thì làm như sau: Tạo hàm riêng xử lý ngoại lệ có dạng function my_exception_handler($exception), sau đó dùng hàm set_exception_handler('my_exception_handler') để đăng ký với PHP

**Ví dụ**

```php
<?php
function handleUncaughtException($e){
    // Hiển thị thông báo lỗi chung cho người dùng
    echo "Opps! Có lỗi xảy ra. Hãy thử lại hoặc liên hệ với chúng tôi nếu còn lỗi.";
    
    // Lấy thông tin lỗi
    $error = "Uncaught Exception: " . $message = date("Y-m-d H:i:s - ");
    $error .= $e->getMessage() . " trong file " . $e->getFile() . " ở dòng " . $e->getLine() . "\n";
}
 
// Đăng ký xử lý ngoại lệ tùy chỉnh
set_exception_handler("handleUncaughtException");
 
// Ném ra một ngoại lệ
throw new Exception("Kiểm tra ngoại lệ!");
?>
```

### Kết bài
Như vậy là trong bài này mình đã trình bày về xử lý lỗi và Exception trong PHP cám ơn tất cả mọi người đã theo dõi

**Nguồn tham khảo**
- https://www.php.net/
- https://vietjack.com/
- https://laptrinhvienphp.com/