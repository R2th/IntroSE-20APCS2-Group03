***Xem thêm*** : [***Công nghệ web và dịch vụ trực tuyến***](https://www.tailieubkhn.com/2021/10/cong-nghe-web-va-dich-vu-truc-tuyen.html)
## Overloading trong PHP

Nếu bạn chuyển từ Java sang code PHP có lẽ đã quen với việc overloading lại một hàm vì thế ta có những hàm cùng tên khác chữ ký trong cùng một lớp. Trong Java, chữ ký của một hàm đại diện bằng tên và danh sách đối số truyền vào hàm đó, tuy nhiên trong PHP chữ ký của hàm chỉ đại diện bằng chính tên của hàm đó vì thế nên chúng ta không thể tạo 2 hàm với tên giống nhau trong cùng 1 lớp. 

Tuy nhiên cũng có một số giải pháp ở PHP giải quyết vấn đề này. PHP có những cơ chế giúp chúng ta sử dụng linh hoạt các biến hơn như là tự động định nghĩa kiểu của biến, optional parameter (các đối số tùy chọn) hay PHP cung cấp 2 hàm[`func_num_args()`](http://php.net/manual/en/function.func-num-args.php) và [`func_get_arg()`](http://php.net/manual/en/function.func-get-arg.php) để nhận được đối số và số lượng đối số truyền vào giúp dễ dàng hơn trong việc sử dụng chúng. Giờ chúng ta sẽ đi vào từng trường hợp một.

### PHP tự động định nghĩa kiểu của biến

Ví dụ, trong Java khi tạo một hàm so sánh giữa 2 số, chúng ta có thể sử dụng kỹ thuật overloading tạo 2 hàm như sau: 

```java
public boolean compare(int a, int b);
public boolean compare(float a, float b);
```

khi đó chúng ta chỉ cần gọi hàm `compare` với đối truyền vào là `int` hay `float` thì Java tự động tìm hàm có chữ ký phù hợp và thực thi nó.

Trong PHP thì tự động suy ra kiểu của biến, vì thế chúng ta chỉ cần 1 hàm: 

```php
public function compare($a, $b);
```

Như vậy, khi truyền bất cứ gì vào đi nữa cũng sẽ OK và không cần tới overloading trong trường hợp này. Dĩ nhiên việc tự động suy ra kiểu của biến khiến cho trình biên dịch của PHP chậm hơn so với Java.

### Optional parameter

Đây là một ví dụ cho optional parameter: 

```php
public function alert($a, $b = null){
	if($b != null){
		echo "alert $a and $b";
	} else {
		echo "alert $a";
	}
}

alert(1); // console: alert 1
alert(1,2); // console: alert 1 and 2
```

Chắc chắn rằng optional parameter cũng có những nhược điểm riêng, nhưng ở mức trìu tượng hơn, các bạn có thể search Google với từ khóa `disadvantage of optional parameter` để tìm hiểu thêm.

### Sử dụng 2 hàm `func_num_args` và `func_get_arg`

Giả sử chúng ta cần nhiều các hàm khởi tạo cho một lớp, thì sau đây có thể là 1 cách: 

```php
class Animal
{
    public function __construct()
    {
        $arguments = func_get_args();
        $numberOfArguments = func_num_args();

        if (method_exists($this, $function = '__construct'.$numberOfArguments)) {
            call_user_func_array(array($this, $function), $arguments);
        }
    }
   
    public function __construct1($a1)
    {
        echo('__construct with 1 param called: '.$a1.PHP_EOL);
    }
   
    public function __construct2($a1, $a2)
    {
        echo('__construct with 2 params called: '.$a1.','.$a2.PHP_EOL);
    }
   
    public function __construct3($a1, $a2, $a3)
    {
        echo('__construct with 3 params called: '.$a1.','.$a2.','.$a3.PHP_EOL);
    }
}

$o = new Animal('sheep');
$o = new Animal('sheep','cat');
$o = new Animal('sheep','cat','dog');
```

Tham khảo: [https://www.amitmerchant.com/](https://www.amitmerchant.com/multiple-constructors-php/),  [https://www.php.net/](https://www.php.net/manual/en/language.oop5.overloading.php)