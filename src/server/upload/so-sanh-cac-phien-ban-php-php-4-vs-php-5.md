PHP đã xuất hiện từ hơn 20 năm trước và đã nhanh chóng trở thành một ngôn ngữ lập trình web phổ biến nhất thế giới. Để có được vị thế như bây giờ, PHP đã trải qua rất nhiều các phiên bản cập nhật, thay đổi liên tục ngày càng hoàn thiện hơn. Hôm nay mình muốn điểm lại một trong những bản cập nhật đáng chú ý của PHP cho các lập trình viên đó là bản cập nhật từ PHP 4 lên PHP 5. Bản PHP 5 đã khắc phục điểm yếu về khả năng hỗ trợ lập trình hướng đối tượng (OOP), xử lý XML trong bản PHP 4

# Mục lục:
**1. Object Model**
* Truyền tham chiếu
* Class Constants and Static Methods/Properties
* Visibility
* Thống nhất lại hàm tạo và hàm hủy
* Abstrac Class và Interface
* Magic Methods
* Finality
* __autoload function

**2. Giới thiệu về các thư viện chuẩn PHP (Standard PHP Library (SPL))**

**3. Các tính năng và cập nhật khác**
* Type Hinting
* Exceptions
* E_STRICT Error Level
* Các extension mới
* Các hàm mới
4. Các vấn đề về tương thích
# 1. Object Model

Object Model đã được giới thiệu trong PHP 4, nhưng nó đã được làm lại để hoàn thiện hơn trong phiên bản PHP 5. Dưới đây là một vài cập nhật mới của nó

### 1.1. Truyền tham chiếu
Đây là một trong những điểm mới và quan trọng nhất trong phiên bản PHP 5. Nếu như bản PHP 4 mọi thứ bao gồm cả Object đều truyền tham trị. Truyền tham chiếu trong Object như thế nào bạn có thể tham khảo trong [bài viết](https://viblo.asia/p/co-ban-ve-javascript-bJzKmMeDK9N)

Xét đoạn mã trong PHP 4
```
$pObject1 = new Object(); 
$pObject1->setName('Adam'); 
$pObject1->setAddress('https://framgia.com/'); 

$pObject2 = new Object(); 
$pObject2->setName('Karl'); 
$pObject2->setAddress('https://framgia.com/');
```

Nếu như trong PHP 4, bạn muốn tạo bản sao của một đối tượng, bạn phải copy và gán giá trị của mới của nó vào. Trong PHP 5, bạn có thể thực hiện nó một cách đỡ giản hơn rất nhiều bằng việc sử dụng "clone". Điều đó có nghĩa là bạn cũng không còn cần sử dụng toán tử tham chiếu (&) trong code nữa
Ví dụ sau sẽ tạo bản sao một đối tượng như trên 

```
$pObject1 = new Object(); 
$pObject1->setName('Adam'); 
$pObject1->setAddress('https://framgia.com/'); 
$pObject2 = clone $pObject1; 
$pObject2->setName('Karl');
```

Bạn có thể dễ dàng thay đổi các trường bạn muốn thay đổi như chỉ name


 ### 1.2. Class Constants and Static Methods/Properties

PHP 5 giúp bạn có thể tạo các "class constants" (các hằng số trong lớp)  cái mà hoạt động giống như các hằng số được định nghĩa nhưng nó bị giới hạn trong lớp đó và được truy cập bằng "::". Hãy nhớ rằng giá trị hằng số này cần phải gán một giá trị chứ không được gán cho một biến hay kết quả trả về của một hàm


Xét ví dụ sau về class constants trong một lớp
```
class MyClass
{
   const constant = 'constant value';

   function showConstant() {
       echo  self::constant . "\n";
   }
}
```
Các phương thức và thuộc tính tĩnh cũng là điểm đổi mới trong PHP 5. Khi bạn tạo một thành phần tĩnh trong lớp đó, nó hoàn toàn có thể được truy cập thông qua lớp với cú pháp "::" mà không cần khởi tạo một đối tượng để truy cập

### 1.3.  Visibility
Từ PHP 5, PHP mới thêm các visibility cho các lớp và các thuộc tính, đó là public, private, protected. Cái này chắc không cần giải thích nữa vì các bạn nắm quá rõ 3 visibility này trong môn OOP rồi :D	

	
### 1.4.  Thống nhất lại hàm tạo và hàm hủy
Nếu như trong phiên bản PHP 4, hàm tạo chỉ là một phương thức với tên giống tên lớp thì sang phiên bản 5, nó đã được xây dựng lại với một định nghĩa rõ ràng hơn - "**__construct()**". Từ khóa mới xuất hiện đi kèm nữa là "**__destruct()**". Khi được sử dụng, hàm này sẽ thực khi mỗi khi đối tượng bị hủy


### 1.5.  Abstrac Class và Interface
Nếu bạn đã làm project, áp dụng 2 vấn đề này trong project của mình thì bạn cảm thấy nó thật hữu ích và tiện lợi đến nhường nào. Nó giúp design code một cách tốt hơn và áp dụng các tính chất của lập trình hướng đối tượng (OOP) vào lập trình một cách tường minh rõ ràng hơn. Tuy nhiên phải đến phiên bản PHP 5, hai khái niệm này mới được đưa vào

### 1.6.  Magic Methods
Tất cả các phương thức, bắt đầu bằng "__" (2 dấu gạch dưới) được định nghĩa là "Magic Methods". Nó là một tập các hàm được thêm vào với các class. Một số magic methods phổ biến như __call, __get, __set và __toString

### 1.7.  Finality
Từ khóa "final" được giới thiệu, sử dụng trong một phương thức để không thể bị ghi đè bởi lớp con. Từ khóa này cũng được sử dụng với class để ngăn chặn có thể tạo các con từ lớp đó

### 1.8.  Hàm __autoload
Một hàm rất hữu dụng được thêm vào PHP 5. Hàm này được sử dụng để tự động tải các tệp tin đối tượng, khi một lớp PHP chưa xác định
```
function __autoload($class_name) {
    require_once "./includes/classes/$class_name.inc.php";
}
```

Bên cạnh nhưng cải thiện về  Object Model, PHP 5 cũng cung cấp rất nhiều tính năng mới
	
# 2. Giới thiệu về các thư viện chuẩn PHP (SPL)
Các thư viện này là tập các interface trong PHP, với mục đích triển khai các lớp interface truy cập dữ liệu một cách hiệu quả hơn. Các hàm được thiết kế  để dễ dàng truy cập với các kiểu dữ liệu khác nhau như mảng, tập kết quả của database, cây XML, kiểu danh sách từ điển nay các kiểu danh sách khác.
Một trong những lợi ích khác của nó là từ giờ, nó trở thành tập các chuẩn, có nghĩa là nó sẽ được sử dụng bởi mọi người, cung cấp tính thống nhất và code dễ hiểu hơn :D
# 3. Các tính năng và cập nhật khác
###  3.1. Type Hinting
Với tính năng này, lập trình viên có thể loại kiểu dữ liệu biến có thể truyền vào các phương thức của lớp hoặc hàm. Hiện tại, chức năng này chỉ hoạt động với class hoặc mảng, số nguyên và chuỗi sẽ không hỗ trợ. Xét ví dụ sau:
```
function echo_user(User $user) {
echo $user->getUsername();
}
```
Một thông báo lỗi sẽ xuất hiện nếu tham số truyền vào không phải là một class User hoặc lớp con của User
###  3.2. Exceptions
Các bạn chắc hẳn cũng đã quen với khái niệm này khi lập trình không chỉ trong PHP mà các ngôn ngữ khác cũng hỗ trợ
```
try {
		$cache->write();
} catch (AccessDeniedException $e) {
		die('Unable to write the cache, access denied.');
} catch (Exception $e) {
		die('Unknown error occurred : ' . $e->getMessage());
}
```

###  3.3. E_STRCT error level
Trong PHP 5 có một level báo lỗi mới được giới thiệu, đó là E_STRICT. Nó không bao gồm trong E_ALL như mặc định, và để sử dụng nó, bạn cần phải chỉ định nó

### 3.4. Các extensions mới
Một vài extensions mới được thêm vào PHP 5
* SimpleXML - for an easier processing of XML data
* DOM and XSL - their goal is to act in the place of DOMXML in PHP 4. With them, XML usage is much easier.
* PDO - a very good OO interface for interacting with databases
* Hash - you now have access to a lot of hash functions beside the most popular ones - md 5 and sha1


### 3.5. Các hàm mới
Arrays:

* array_combine() - it will create one array, using another two arrays - one for the keys and one for their values
* array_walk_recursive() - a user function is applied recursively to all of the array members

InterBase:

* ibase_db_info() - it will request the statistics for a database
* ibase_name_result() - it will assign a name to a set of results
* ibase_service_attach() - this function will connect you to the service manager
* ibase_affected_rows() - it will return the number of rows affected by the previous query
* iconv:
 
* iconv_strlen() - it will return the character count of a string
* iconv_substr() - it will cut a part of a string
* iconv_mime_decode_headers() - this function will decode several MIME headers at the same time

Streams:

* stream_copy_to_stream() - it will copy the data from one stream to another stream
* stream_socket_get_name() - it will find the names of the local and remote sockets
* stream_socket_sendto() - it will send a message to a socket, no matter if this socket is connected or not

Date and time related:

* date_sunset() - it will give you the time of the sunset for a given day and location
* idate() - it will format the local time and date as an integer
* date_sunrise() - it will give you the time of the sunrise for a given day and location

Strings:

* str_split() - it will convert a string to an array
* strpbrk() - it will search the string for any set of characters specified


# 4. Các vấn đề về tương thích
Phần cuối cùng cũng là phần rất quan trọng mình muốn nói đến là khả năng tương thích của PHP 5 với PHP 4. Tuy là sự phát triển lên của PHP 4 nhưng cũng có một số phần không tương thích, khi sử dụng các hàm có thể gây lỗi do output không như PHP 4
* array_merge: giờ đây hàm này sẽ không đưa ra cảnh báo nếu như một vài tham số của nó không phải là một mảng
* Như đã đề cập ở phần trước, object giờ đây được truyền tham chiếu, hãy cẩn thận nếu bạn dùng truyền tham trị đối với PHP 4 và giờ cập nhật lên PHP 5 :D
* get_*() giờ đây sẽ trả về tên mà chúng định nghĩa. Nếu tên lớp là MyTestClass sau đó gọi phương thức get_class() thì nó trả về tên đó, không giống như PHP 4, nó trả về các kí tự viết thường
* Một đối tượng không có thuộc tính không còn được coi là "trống" (empty)
* Trong một số trường hợp, các lớp phải được khai báo trước khi sử dụng. Nó chỉ xảy ra nếu một số tính năng mới của PHP 5 (như interface) được sử dụng.

# Tài liệu tham khảo:

* https://www.ntchosting.com/encyclopedia/scripting-and-programming/php/php4-php5-comparison
* https://vi.wikipedia.org/wiki/PHP#PHP/FI