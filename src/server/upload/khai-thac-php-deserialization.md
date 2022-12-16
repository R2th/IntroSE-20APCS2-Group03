![](https://images.viblo.asia/87d68e7a-b957-4d68-baf9-e41e33785818.png)

Giống như JAVA, PHP giờ đây cũng đã hỗ trợ **O**bject-**O**riented **P**rogramming (OOP hay hướng đối tượng). Lập trình hướng đối tượng giúp lập trình viên kế thừa mã nguồn một cách hiêu quả hơn so với lập trình hướng cấu trúc. Không chỉ dừng lại với việc kế thừa mã nguồn, lập trình hướng đối tượng còn có các ưu điểm khác được thể hiện thông qua 4 tính chất của OOP như:

* Tính đóng gói (encapsulation)
* Tính kế thừa (Inheritance)
* Tính đa hình (polymorphism)
* Tính trừu tượng (abstraction)

Để hiểu thêm về 4 tính chất trong OOP có thể đễ dàng tìm kiếm trên google hoặc có thể tham khảo tại đây: https://www.codehub.com.vn/4-tinh-chat-cua-lap-trinh-huong-doi-tuong-trong-Java

Trong lập trình hướng đối tượng chương trình được tổ chức theo các lớp (Class). Lớp được hiểu như một khuôn mẫu của một đối tượng trong thực tế có thuộc tính (biến trong lập trình hướng cấu trúc) và phương thức (hàm trong lập trình hướng cấu trúc). Khi muốn thực hiện công việc nào đó ta sẽ tạo các thực thể của một lớp thể thực hiện công việc mong muốn.

Lớp cũng là một kiểu dữ liệu nhưng nó khác với các kiểu dữ liệu nguyên thủy đã biết như số nguyên (integer), chuỗi (string), boolean,  do lớp chứa thuộc tính và phương thức. Vì vậy, để có thể lưu trữ, truyền tải qua mạng thì ta cần có một quy tắc để chuyển lớp sang dạng có thể lưu trữ cũng như có thể gửi qua các phương tiện truyền thông được. Để thực hiện điều đó PHP đưa ra 2 hàm: serialize, unserialize.

* serialize có nhiệm vụ chuyển một đối tượng sang dạng chuỗi để có thể lưu trữ cũng như gửi qua mạng.
* Unserialize chuyển chuỗi sang đối tượng tương ứng.

Để hiểu được tại sao lại có lỗ hổng này trước hết ta sẽ tìm hiểu hoạt động của hàm serialize và unserialize. Sau đó, ta sẽ tiến hành thực dụng lab demo lỗ hổng.

## Hoạt động của hàm serialize

Như đã nói qua ở trên, hàm serialize nhận đầu vào là một đối tượng và đầu ra là một chuỗi tương ứng với dữ liệu đầu vào. Để hình dung rõ hơn ta thực hiện một ví dụ nhỏ.

```php
<?php
    class User{
        public $username;
        public $status;
    }
    
    $user = new User;
    $user->username = 'cm0s';
    $user->status = 'labs';
    echo serialize($user);
?>
```

kết quả hiển thị ra

```
O:4:"User":2:{s:8:"username";s:6:"vickie";s:6:"status";s:9:"not admin";}
```

Kết quả chuyển đổi từ object sang chuỗi phải tuân theo một cấu trúc nhất định.

### cấu trúc serialize

Cấu trúc serialize trong PHP có dạng `data-type:data`. Ví dụ, `b` là kiểu dữ liệu boolean
```
b:THE_BOOLEAN;
```

`i` là số nguyên
```
i:THE_INTEGER;
```

`d` là số thực
```
d:THE_FLOAT;
```

`s` là kiểu chuỗi
```
s:độ-dài-chuỗi:"giá trị";
```

`a` là mảng
```
a:số-lượng-phần-tử:{các-phần-tử}
```

Cuối cùng `O` đại diện cho một đối tượng.
```
O:độ-dài-lớp:"tên-lớp":số-lượng-thuộc-tính:{các-thuộc-tính}
```

Dựa vào mô tả cấu trúc trên ta dễ dàng hiểu được tại sao sau khi serialize lại có đầu ra là một chuỗi dài như trên.

## Hoạt động của hàm unserialize

Ngược lại với hàm serialize, hàm unserialize nhận đầu vào là một chuỗi tuân theo cấu trúc serialize chuyển thành một đối tượng tương ứng. Thêm phần trực quan ta xem thêm một đoạn code nhỏ nữa.

```php
<?php
	class User{
		public $username;
		public $status;
	}

	$user = new User;
	$user->username = 'cm0s';
	$user->status = 'labs';
	$serialized_string = serialize($user);
	$unserialized_data = unserialize($serialized_string);
	var_dump($unserialized_data);
	var_dump($unserialized_data->status);
?>
```

Với đoạn code trên sẽ cho ra kết quả như sau
![](https://images.viblo.asia/5d131b6a-fb1e-4306-a255-660df21c46d6.png)

Đến đây ta đã hiểu được cơ bản hướng đối tượng hay OOP là gì. Và cũng hiểu được cách để serialize và unserialize đối tượng như nào. Tiếp theo ta sẽ tìm hiểu tại sao khi unserialize lại có thể bị khai thác và tìm hiểu lý do tại sao. Đầu tiên ta sẽ tìm hiểu một vài **magic method** (mình để nguyên vì khi dịch ra tiếng Việt không hay) trong PHP. Những hàm này là một phần nguyên nhân dẫn đến việc PHP deserialization bị khai thác.

**__wakeup()** là phương thức trong class được thực thi khi một object được gọi dậy. Trong trường hợp cụ thể này là khi hàm unserializtion chạy xong.

**__destruct()** phương thức trong class được thực hiện khi một object bị hủy bỏ hay không còn tồn tại trong chương trình nữa.

## Khai thác lỗ hổng PHP deserialization

Lỗ hổng PHP deserialization có thể giúp ta thực hiện được các tấn công như SQL injection, path traversal, code injection,... Tùy code bị lỗi như nào.

Để khai thác được lỗ hổng PHP deserialization cần có 2 điều kiện.

1. Class phải sử dụng 1 trong 2 hàm **__wakeup()**, **__destruct()** để xử lý dữ liệu người dùng.
2. Người dùng có thể chèn dữ liệu độc hại vào hàm **unserialize()**.

Để cho tường minh thêm ta sẽ làm thêm một ví dụ nữa.

```php
 class User {
        private $role;

        function __construct($role) {
            $this->role = $role;
        }

        function __wakeup() {
            if (isset($this->role)) eval($this->role);
        }
    }

$user_data = unserialize($_COOKIE['data']);
```

Ta cùng phân tích qua đoạn code trên xác định lỗ hổng và khả năng khai thác.

1. Đoạn code trên nhận dữ liệu từ người dùng nhập vào (lấy dữ liệu qua **$_GET**) mà không thực hiện bất kỳ biện pháp làm sạch hay lọc dữ liệu. Nên ta có thể chèn dữ liệu độc hại vào.
2. Class **PHPdeserialization** có sử dụng hàm **__wakeup()** để thực thi dữ liệu người dùng truyền vào.

Từ 2 điều trên ta đã xác định được đoạn code trên có lỗi PHP deserialization. Lỗi này giúp ta thực hiện tấn công code injection do sử dụng hàm **eval()** để xử lý dữ liệu của người dùng nhập vào mà không thực hiện làm sạch.

Để thực hiện khai thác ta sẽ chèn payload sau vào **COOKIE** với thên data.

```
O%3A4%3A%22User%22%3A1%3A%7Bs%3A10%3A%22%00User%00role%22%3Bs%3A10%3A%22phpinfo%28%29%3B%22%3B%7D
```
Kết quả là ra ta thực hiện được code PHP :-^

![](https://images.viblo.asia/531cf03b-482e-4a9f-a8db-6fbe5c8a20f0.png)


Qua bài ta hiểu cơ bản được thế nào là hướng đối tượng, và nguyên nhân và điều kiện để khai thác lỗi PHP deserialization. Tìm hiểu một ví dụ cơ bản khai thác lỗi này.

Giờ thì xin chào và tạm biệt!

## Tham khảo
* [php unserialize](https://www.php.net/manual/en/function.unserialize.php)
* [php magic](https://www.php.net/manual/en/language.oop5.magic.php)
* https://medium.com/swlh/exploiting-php-deserialization-56d71f03282a