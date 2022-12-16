# 1.Mở đầu

Khi trang web được hiển thị trên trình duyệt thì sẽ hiển thị các thông tin cho người dùng dưới dạng chuỗi. Vì vậy nếu bạn xử lý chuỗi không hợp lý và đúng quy chuẩn thì trang web của bạn hiển thị cho người dùng không đúng như những gì bạn muốn hay những gì bạn muốn đem đến cho người dùng. Đồng thời đem lại trải nghiệm không tốt cho người dùng khi truy cập tới trang web. 



-----


Việc xử lý đầu ra cho một trang web cũng là một phần quan trọng trong việc phát triển trang web đem đến trải nghiệm tốt cho người dùng, cụ thể ở đây là việc xử lý chuỗi. Dưới đây là một nguyên tắc xử lý chuỗi và một số hàm xử lý chuỗi trong PHP.

# 2. Nguyên tắc khi xuất chuỗi.
- Khi muốn nối 2 chuỗi với nhau có thể sử dụng toán tử “ . “ hoặc toán tử “ .= “ 

    ví dụ:
```php
<?php  
	$txt1 = "Hello";
	$txt2 = "Viet Nam!";
	printf("%s %s",$txt1,$txt2);
	echo "<br>";
	echo $txt1." ".$txt2;
	echo "<br>";
	$txt1 .= $txt2;
	echo "$txt1 $txt2";
?>
```
> output:
```php
Hello Viet Nam!
Hello Viet Nam!
HelloViet Nam! Viet Nam!
```

**lưu ý:** Khi dùng toán tử ‘.=’ thì ký tự cuối của chuỗi này sẽ nối với ký tự đầu của chuỗi kia không xuất hiện khoảng trắng giữa 2 chuỗi và sau khi thực hiện ‘.=’ thì biến `$txt1` đã bị thay đổi.

- Nếu bạn sử dụng dấu nháy "" để in ra chuỗi thì khi chèn biến bạn sẽ không phải nối chuỗi.

    ví dụ:
```php
<?php  
	$txt1 = "Hello";
	$txt2 = "Viet Nam!";
	echo "$txt1 $txt2";
?>
```
> output: Hello Viet Nam!


- Khi sử dụng dấu "" để in ra chuỗi đồng thời trong chuỗi có ký tự " thì phải dùng ký tự \ trước dấu " ở trong chuỗi.

     ví dụ:
```php
<?php  
	$txt1 = "Hello";
	$txt2 = "\"Viet Nam\"!";
	echo "$txt1 $txt2";
?>
```
> output: Hello "Viet Nam"!

- Ký tự ' xuất hiện trong chuỗi khi in ra sử dụng dấu "" thì chúng ta không phải thêm bất kỳ ký tự gì trước nó.

     ví dụ:
```php
<?php  
	$txt1 = "Xin chao";
	$txt2 = "dat nuoc 'Viet Nam'!";
	echo "$txt1 $txt2";
?>
```
> output: Xin chao dat nuoc 'Viet Nam'!

# 3. các hàm xử lý chuỗi thông dụng.
### strlen(`$string`)
- Hàm này có tác dụng đếm số ký tự của chuỗi` $string`.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!";
	echo strlen($txt1);
?>
```
> output: 18


### str_word_count(`$string`)
- Hàm này có tác dụng đếm số từ có trong chuỗi $string.

- ví dụ: 
```php
<?php  
	$subject = "U23 Viet Nam vo dich";
	echo str_word_count($subject);
?>
```
> output: 5


### str_repeat(`$string`, `$repeat`)
- Hàm này có tác dụng lặp chuỗi `$string` `$repeat` lần.
- ví dụ: 
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 Viet Nam co len!<br>";
	echo $txt1 . str_repeat($txt2, 3);
?>
```
> output: 
```php
Xin chao Viet Nam!
U23 Viet Nam co len!
U23 Viet Nam co len!
U23 Viet Nam co len!
```


### str_replace(`$search`, `$replace`, `$string`)
- Hàm tìm kiếm chuỗi `$search` trong chuỗi `$string` và thay thế bằng chuỗi `$search` trong chuỗi `$string `bằng chuỗi `$replace`.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 Viet Nam co len!<br>";
	echo $txt1 . str_replace("Viet Nam", "", $txt2);
?>
```
> output:
```php
Xin chao Viet Nam!
U23 co len!
```


### substr(`$string`, `$start`, `$length`)
- Hàm này có tác dụng cắt chuỗi `$string`, cắt toàn bộ các phần của chuỗi trừ điểm bắt đầu ở vị trí `$start` đếm `$length` ký tự sẽ được giữ lại.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 Viet Nam co len!<br>";
	echo $txt1 . substr($txt2, 4, 8);
?>
```
> output: 
```php
Xin chao Viet Nam!
Viet Nam
```



### addcslashes(`$string`, `$charlist`)
- Hàm `addcslashes()` trả về một chuỗi có dấu \ được chèn phía trước các ký tự của chuỗi `$string` mà các ký tự này được chỉ định trong chuỗi `$charlist`.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 Viet Nam co len!";
	echo $txt1 . addcslashes($txt2, 'a...z');
?>
```
> output:
```php
Xin chao Viet Nam!
\U\2\3 \V\i\e\t \N\a\m \c\o \l\e\n!
```

### addslashes(`$string`)
- Hàm có tác dụng chèn ký tự \ vào trước ký tự " hoặc ký tự ' nếu có trong chuỗi `$string`.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 'Viet Nam' co len!";
	echo $txt1 . addslashes($txt2);
?>
```
> output:
```php
Xin chao Viet Nam!
U23 \'Viet Nam\' co len!
```

### strtoupper(`$string`)
- Sử dụng hàm để chuyển các ký tự trong chuỗi thành chữ hoa.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 'Viet Nam' co len!";
	echo $txt1 . strtoupper($txt2);
?>
```
> output: 
```php
Xin chao Viet Nam!
U23 'VIET NAM' CO LEN!
```
### ucwords(`$string`)
- Sử dụng hàm này để chuyển các ký tự đầu tiên của các từ trong chuỗ `$string` thành chữ hoa.

- ví dụ: 
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "u23 viet nam co len!";
	echo $txt1 . ucwords($txt2);
?>
```
> output:
```php
Xin chao Viet Nam!
U23 Viet Nam Co Len!
```
### ucfirst(`$string`)
- Sử dụng hàm để chuyển ký tự đầu tiên của chuỗi `$string` thành chữ hoa.

- ví dụ: 
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "u23 Viet Nam co len!";
	echo $txt1 . ucfirst($txt2);
?>
```
> output:
```php
Xin chao Viet Nam!
U23 Viet Nam co len!
```

### strtolower(`$string`)
- Sử dụng hàm để chuyển hết các chữ cái trong chuỗi `$string` thành chữ in thường.

- ví dụ:
```php
<?php  
	$txt1 = "Xin chao Viet Nam!<br>";
	$txt2 = "U23 VIET NAM VO DICH!";
	echo $txt1 . strtolower($txt2);
?>
```
> output:
```php
Xin chao Viet Nam!
u23 viet nam vo dich!
```

# 4. Regular Expression
- Khi bạn muốn kiểm tra định dạng chuỗi hay muốn kiểm tra định dạng dữ liệu truyền vào có đúng hay không thì có thể sử dụng **Regular Expression** để giải quyết vấn đề đó.
- **Regular Expression** là một biểu thức chính quy được dùng để xử lý so khớp với dữ liệu giúp chúng ta có thể kiểm tra chuỗi một cách chi tiết hơn. Những biểu thức này sẽ có những nguyên tắc riêng và phải tuân theo nguyên tắc đó thì biểu thức chuỗi đầu vào mới hoạt động được.

- ví dụ: muốn kiểm tra email nhập vào có đúng là định dạng của 1 email không?

## Một số quy tắc Regular Expressions trong PHP
### Hàm preg_match.
- Hàm `preg_match()` được dùng để so khớp dữ liệu đầu vào và chuỗi **Regular Expressions** trả về kết quả so khớp.

- Cú pháp: 
`preg_match($pattern, $subject, $matches)`

    - `$pattern`là biểu thức **Regular Expression**
    - `$subject` là chuỗi cần kiểm tra
    - `$matches` là kết quả trả về, đây là một tham số truyền vào ở dạng tham chiếu.(có thể bỏ trống)
    - Kết quả trả về của hàm sẽ là `true` nếu so khớp - `false` nếu không so khớp
- ví dụ:
```php
<?php  
	$subject = "bacha@gmail.com";
	$pattern = "/@gmail.com/";
	if( preg_match($pattern, $subject, $matches) ){
		echo "Khop";
	}
	else 
		echo "Khong khop";
?>
```
> output: Khop

ở ví dụ này chuỗi `$subject` được đem so khớp với mẫu `$pattern`.

- Chuỗi `$pattern` chúng ta không được phép khai báo tùy ý mà phải theo 1 số cú pháp thì chuỗi đó mới được đem ra so khớp, nếu không chương trình sẽ bị lỗi.

## Một số quy tắc khai báo chuỗi `$pattern`
- Khi khai báo chuỗi `$pattern` luôn phải đặt chuỗi trong cặp dấu / /. Nếu chỉ đặt 1 chuỗi hay 1 biểu thức hay quy tắc trong / / thì phép so khớp chỉ là so khớp ở đây có nghĩa là chỉ cần chuỗi `subject` xuất hiện chuỗi `pattern ` là trả về true. 

  >	 `$pattern = "/@gmail.com/";`

- Nếu muốn so khớp tất cả của 1 chuỗi `$subject` với 1 `$pattern` thì phải sử dụng thêm cặp ^ và `$` ở bên trong dấu //.
    - ^ bắt đầu
    - `$` la kết thúc
```php
<?php  
	$subject = "bacha@gmail.com";
	$pattern = "/^@gmail.com$/";
	if( preg_match($pattern, $subject, $matches) ){
		echo "Khop";
	}
	else 
		echo "Khong khop";
?>
```
> output: Khong khop
> 
> Vì ở đây yêu cầu toàn bộ chuỗi `subject` phải khớp với chuỗi` pattern`

- Chuỗi `$pattern` cũng có thể được khai báo theo kiểu khuôn mẫu như sau:


| Khuôn mẫu| mô tả|
| -------- | -------- | 
| [a-z]    | chuỗi đầu vào phải là in thường gồm các ký tự từ a->z     | 
|  [A-Z]        |   chuỗi đầu vào phải là in hoa gồm các ký tự từ A->Z       |
|     [0-9]         |chuỗi đầu vào phải là các số từ 0->9

- ví dụ: [0-9]
```php
<?php  
	$subject = "19008198";
	$pattern = "/[0-9]/";
	if( preg_match($pattern, $subject, $matches) ){
		echo "Khop";
	}
	else 
		echo "Khong khop";
?>
```
> output: Khop
> 
> Vì chuỗi subject có sự xuất hiện các chữ số từ  0 - 9

- ví dụ: [a-z]
```php
<?php  
	$subject = "U23 Viet Nam vo dich";
	$pattern = "/[a-z]/";
	if( preg_match($pattern, $subject, $matches) ){
		echo "Khop";
	}
	else 
		echo "Khong khop";
?>
```
> output: Khop
> 
>  Vì chuỗi subject có sự xuất hiện các chữ cái từ a-z



-----

Trên đây là cơ bản về một số điểm cần lưu ý trong **Regular Expression**, còn một số các quy tắc khác sâu hơn về khai báo chuỗi `$pattern `mình sẽ trình bày ở phần tiếp theo. Nếu có thể mong mọi người góp ý để phần nội dung trên được hoàn chỉnh hơn!

# 5. Tham khảo
- https://www.w3schools.com/php/php_string.asp
- http://www.tutorialspoint.com/php/
- https://toidicode.com