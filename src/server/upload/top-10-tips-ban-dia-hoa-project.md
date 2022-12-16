Chào mọi người. 

Một trong những vấn đề khi lập trình mà chắc chắn các bạn sẽ gặp phải đó là việc bản địa hóa ứng dụng theo từng quốc gia khác nhau về dữ liệu ngôn ngữ.

Hôm nay mình sẽ giới thiệu cho các bạn 10 tips để giải quyết vấn đề language nhé.

## 1. Set timezone cho ứng dụng
Ứng dụng nên đặt một múi giờ cho chính nó. Nếu không, múi giờ của máy / máy chủ sẽ bị mất, đây có thể không phải là điều người dùng muốn.
```sql

date_default_timezone_set( 'Asia/Ho_Chi_Minh' );
```
Bạn nên chạy hàm này sớm nhất trong project của bạn.

Ngoài ra bạn có thể sử dụng hàm `timezone_identifiers_list()` để tạo ra một danh sách các múi giờ mà từ đó người dùng có thể lựa chọn. 

Ví dụ:
```php
/**
	Lấy 1 list timezones khả dụng cho ứng dụng
*/
function get_timezones()
{
	$o = array();
	$t = timezone_identifiers_list();

	foreach($t as $a)
	{
		$t = '';

		//Get the time difference
		$zone = new DateTimeZone($a);
		$seconds = $zone->getOffset( new DateTime('now', $zone) );
		$hours = sprintf( '%+02d' , intval($seconds/3600));
		$minutes = sprintf( '%02d' , ($seconds%3600)/60 );

		$t = $a . "[ $hours:$minutes ]";
		$o[$a] = $t;
	}
	ksort($o);

	return $o;
}
```

Hàm trên sẽ trả về kết quả là một danh sách các timezone ví dụ như thế này:

* [Africa/Abidjan] => Africa/Abidjan [ +0:00 ]
* [Africa/Accra] => Africa/Accra [ +0:00 ]
* [Africa/Addis_Ababa] => Africa/Addis_Ababa [ +3:00 ]
* [Africa/Algiers] => Africa/Algiers [ +1:00 ]
* [Africa/Asmara] => Africa/Asmara [ +3:00 ]
* [Africa/Bamako] => Africa/Bamako [ +0:00 ]
* [Africa/Bangui] => Africa/Bangui [ +1:00 ]
* [Africa/Banjul] => Africa/Banjul [ +0:00 ]
* [Africa/Bissau] => Africa/Bissau [ +0:00 ]
* .... 

Sau đó bạn có thể sử dụng select để cho người dùng lựa chọn timezone của họ.

## 2. Đặt timezone cho mysql từ project
Các projects thường được lưu trữ trên các máy chủ ở múi giờ khác, so với máy dưới local của lập trình viên và người dùng. Do đó múi giờ của mysql cần phải được đặt đúng với thời gian của người sử dụng.

Bạn  có thể thực hiện câu lệnh SQL sau để set timezone cho MySql:

 ```php
$c = mysqli_connect($host, $username, $password);
mysqli_query($c , "SET `time_zone` = '" . date('P') . "'");
```

Hàm `date` của php với tham số `P` dùng để lấy sự chênh lệch thời gian giữa hiện tại và giờ UTC.

**TIMESTAMP**

Đối với các trường `TIMESTAMP` trong mysql, mọi kết hợp thời gian theo ngày sẽ được chuyển đổi thành `timestamp` chính xác bởi `mysql`, vì bản thân `mysql` nằm trong múi giờ chính xác.

**DATETIME**

Khi sử dụng các cột `datetime`, ứng dụng cần chuyển đổi các giá trị ngày giờ thành UTC, sau đó lưu vào mysql.

Khi lấy dự liệu từ cơ sở dữ liệu, chúng ta phải chuyển đổi giá trị đó theo múi giờ của ứng dụng.

Lưu vào cơ sở dữ liệu:
```php

$time_to_save = date('Y-m-d h:i:s');	//Thời gian hiện tại của người dùng sẽ được lưu trong cột datetime

$d = new DateTime($time_to_save , new DateTimeZone(date_default_timezone_get()) );

$d->setTimezone( new DateTimeZone('UTC') );	//Chuyển đổi sang giờ UTC

$mysql_datetime = $d->format('Y-m-d h:i:s');	//Giá trị cuối cùng được lưu trong cơ sở dữ liệu
```

## 3. Set collation cho database tại thời điểm tạo
`collation` của database cần được đặt chuẩn ngay từ đầu, để tránh sai sót sau này và luôn thống nhất khi backup, dump database.
```sql

ALTER DATABASE db_name CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```
Hoặc bạn có thể sửa `collation` sau khi tạo database. Đặt `collation`, `character` được đặt từ đầu cho database đảm bảo rằng tất cả các bảng, cột sau này sẽ giống nhau theo mặc định.

## 4. Set character cho object kết nối mysql
Khi ứng dụng đang hiển thị các ký tự không phải tiếng Anh, thì nó phải đặt mã hóa ký tự của kết nối mysql. 

VD:
```sql
mysqli_set_charset ( $connect , 'UTF8' );
```
Thật easy phải không nào? :D 
## 5. Set character chính xác cho htmlentities
Chức năng `htmlentities` được sử dụng để in ra nội dung, trước đây được cung cấp bởi người dùng.
Trước php 5.4, mã hóa ký tự mặc định được sử dụng là ISO-8859-1 không thể hiển thị các ngôn ngữ như tiếng hindi , bengali , russian etc.

```php
$value = htmlentities($value , ENT_QUOTES , 'UTF-8');
echo $value;
```

Php 5.4 trở đi, mã hóa mặc định sẽ là UTF-8 sẽ giải quyết hầu hết các vấn đề, nhưng vẫn nhận thức rõ hơn về nó nếu ứng dụng của bạn là đa ngôn ngữ.

Bạn cũng có thể sử dụng hàm `mb_list_encodings` có thể được sử dụng để tạo danh sách cho người dùng chọn hoặc bạn sẽ tùy theo language của người dùng và xử lý.
```php
//Lấy danh sách các mã được hỗ trợ bằng hàm mb_list_encodings
function get_supported_encodings()
{
	$e = mb_list_encodings();
	$list = array();
	foreach($e as $c =&gt; $val)
	{
		$list[$val] = $val;
	}

	return $list;
}
```
Sau khi chạy hàm trên bạn sẽ nhận được kết quả như này:

* [UTF-32BE] => UTF-32BE
* [UTF-32LE] => UTF-32LE
* [UTF-16] => UTF-16
* [UTF-16BE] => UTF-16BE
* [UTF-16LE] => UTF-16LE
* [UTF-8] => UTF-8
* [UTF-7] => UTF-7
* [UTF7-IMAP] => UTF7-IMAP
* [ASCII] => ASCII
* [EUC-JP] => EUC-JP
* [SJIS] = > SJIS
* ...
* 
## 6. Set encoding cho nội dung không phải html bằng cách gửi headers chính xác
Khi bạn muốn xử dụng file: css, javascript, xml, v.v., hãy set encoding chính xác thông qua hàm `header` như thế này:

**XML**
```php
header('Content-Type: text/xml; charset=utf-8');
// Echo phần còn lại của nội dung xml

```
**Javascript**
```php
header('Content-Type: text/javascript; charset=utf-8');
// Echo phần còn lại của nội dung javascript
```
## 7. Set character Đặt bchính xác cho đầu ra html và xml
HTML: Điều này nằm trong thẻ đầu của tài liệu html
```html

[html]
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
[/ html]
```

Hỗ trợ html5:
```html

[html]
<meta charset="utf-8">
[/ html]
```

XML: Dòng đầu tiên của tài liệu xml có mã hóa được chỉ định
```xml

[xml]
<?xml version="1.0" encoding="utf-8"?>
[/ xml]
```

## 8. Set locale chính xác
Đặt `locale` chính xác sẽ hữu ích cho các cài đặt liên quan đến ngôn ngữ như cách định dạng số, ký hiệu tiền tệ, v.v ... Đặt `locale` chính xác cho ứng dụng nên được thiết lập càng sớm càng tốt trong project.
```php

setlocale(LC_ALL, 'en_US.UTF-8');
```
Bạn cũng nên cung cấp cho người dùng một danh sách các địa điểm để lựa chọn, hoặc từ language bạn hãy chọn 1 locale để sử dụng cho hợp lý. 

## 9. Định dạng số theo locale
Khi hiển thị các số như số thường hoặc số tiền, bạn nên định dạng chúng bằng dấu phẩy, số thập phân, v.v ... bằng cách sử dụng hàm `money_format`. 

VD:
```php

$amount = '100000';

//Định dạng số tại Indian - Lakh, Crore
setlocale(LC_MONETARY, 'en_IN');
$am = money_format('%!i', $amount);
echo $am;    //1,00,000.00

//Định dạng triệu, tỷ
echo "<br />";
setlocale(LC_MONETARY, 'en_US.utf8');
$am = money_format('%!i', $amount);
echo $am;    //100,000.00
```
## 10. Định dạng hiển thị ngày
Định dạng ngày hiển thị theo định dạng người dùng. 

Có một số loại định dạng ngày khác nhau hay được sử dụng là:
```markdown

Định dạng ISO: 2020-05-26 (YYYY-MM-DD)
Các nước Asian: 26-05-2020 (DD-MM-YYYY)
Mỹ: 05-26-2020 (MM-DD-YYYY)
```

Dates phải được định dạng cả khi hiển thị và khi được nhập vào một form input.
```markdown
Giá trị trên form: 26/05/2020 or 05/26/2020
Hiển thị: 26 May 2020 or May 26, 2020
```

Định dạng ngày với hàm `strftime`:
```php
$format = '%d-%b-%Y';
$stamp = time();
$display_format = strftime( $format , $stamp);

echo $display_format; 	//Output 26-05-2020
```

Định dạng với lớp `DateTime`:
```php
$t = date('Y-m-d h:i:s');
$d = new DateTime($t , new DateTimeZone(date_default_timezone_get()) );
$display_format = $d->format('d-m-Y');
echo $display_format;    //26-05-2020
```
Tùy theo từng project, có thể người dùng nên có tùy chọn để chọn định dạng để hiển thị ngày và nhập ngày trong form hoặc lập trình viên có thể tự lựa chọn format theo locale của người dùng để xử lý.

### Kết luận
Như vậy mình đã hướng dẫn xong 10 tips để bản địa hóa project, hy vọng sẽ giúp các bạn phần nào trong quá trình lập trình.

Hẹn gặp lại các bạn vào bài viết sau.

Thanks you!

### Tham khảo 
1. [https://www.tutorialspoint.com/strftime-function-in-php](https://www.tutorialspoint.com/strftime-function-in-php)
2. [https://www.php.net/manual/en/function.mb-list-encodings.php](https://www.php.net/manual/en/function.mb-list-encodings.php)
3. [https://www.php.net/manual/en/class.datetime.php](https://www.php.net/manual/en/class.datetime.php)
4. [https://www.binarytides.com/php-tips-localise-application/](https://www.binarytides.com/php-tips-localise-application/)