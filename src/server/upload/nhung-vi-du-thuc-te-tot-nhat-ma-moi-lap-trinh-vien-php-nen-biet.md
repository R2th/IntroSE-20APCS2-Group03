`PHP là ngôn ngữ được sử dụng rất nhiều trong lập trình web. Dưới đây là những ví dụ thực tế tốt nhất mà mọi lập trình viên đều nên biết và làm theo.`

Từng là một lập trình viên PHP, cũng làm những dự án lớn nhỏ của cá nhân, của công ty các thứ. Thì sau một thời gian dựa vào kinh nghiệm bản thân cũng như tìm hiểu qua bác google, mình cũng đúc rút ra được một số thứ hay ho muốn chia sẻ cho mọi người cùng đọc. Cụ thể ở bài này sẽ là `Những ví dụ thực tế tốt nhất mà mọi lập trình viên php nên biết`.

## Bật cảnh báo lỗi (error reporting) trong quá trình phát triển

Trong quá trình phát triển, cảnh báo lỗi (error reporting) là công cụ tốt. Các cảnh báo lỗi này giúp bạn tìm ra những lỗi chính tả trong biến, phát hiện hàm sử dụng sai và rất nhiều thứ khác nữa. Tuy nhiên, khi web project đã được đưa lên chạy thực tế thì bạn cần phải tắt nó đi, vì nó có thể cho người dùng biết rất nhiều thứ về trang web của bạn như: phần mềm bạn sử dụng, cấu trúc folder, ...

Bạn có thể dử sử dụng hàm `error_reporting(0);` để tắt cảnh báo.

**Một lần nữa, mình xin nhắc lại là khi project của bạn đã public thì bạn nên tắt `error reporting` đi, vì nếu không tắt đi thì các lỗi có trong project sẽ hiển thị lên cho người dùng thấy, và kéo theo đó bao nhiêu vấn đề.**

## Khuyến khích sử dụng <?php ?>

Có một số cách để để viết code php như:

```php
//-------- kiểu 1 --------
<?php echo "manhnv.com"; ?>

//-------- kiểu 2 --------
<?   echo "manhnv.com"; ?>

//-------- kiểu 3 --------
<?= "manhnv.com"; ?>

//-------- kiểu 4 --------
<% echo "manhnv.com"; %>
```

Tất cả 4 kiểu trên đều hiển thị ra là `manhnv.com`. Nhưng chỉ có một kiểu `<?php ?>` là mặc định, còn lại những kiểu còn lại đều bị vô hiệu hóa, nếu bạn muốn sử dụng thì bắt buộc bạn phải kích hoạt nó lên bằng cách cấu hình server PHP với tùy chọn `short_open_tag`. Do đó, cách tốt nhất để đảm bảo code của bạn chạy tốt trên tất cả mọi server, cũng như mọi phiên bản nếu có cập nhật lên cao hơn nữa, thì mình khuyên bạn nên sử dụng định dạng `<?php ?>`.

Nhưng nếu tự triển khai một server PHP của bản thân, hoặc một server bạn có quyền điều khiển, và muốn sử dụng kiểu 1,2,3 thì bạn có thể tự cấu hình cho server của mình sử dụng thẻ nào ngắn gọn và thuận tiện hơn. Nhưng hãy nhớ rằng thẻ `<? ?>` có thể xung đột với XML và `<% %>` là kiểu viết của ASP.

## Sử dụng tên biến, tên class có ý nghĩa và nhất quán

Có hai chuẩn đặt tên phổ biến:

* **camelCase:** Chữ cái đầu tiên của mỗi từ được viết hoa, trừ từ đầu tiên.

```php
$urlBlog = "https://manhnv.com";

function showUrlBlog(){
    echo $urlBlog;
}
```

* **underscores:** Thêm dấu gạch dưới giữa các từ.

```php
$url_blog = "https://manhnv.com";

function show_url_blog(){
    echo $url_blog;
}
```

Trên đây là 2 chuẩn phổ biến nhất, bạn nên chọn cho mình 1 trong 2 quy ước để code. Tuy nhiên, hãy dùng một cách nhất quá, tức là dùng 1 chuẩn cho từ đầu đến cuối project, không nên dùng nửa vời kiểu này sang kiểu kia.

Mình thì lúc code php mình sẽ dùng kiểu `camelCase` nhưng lúc code ngôn ngữ khác như python thì lại dùng `underscores`.

Hoặc các bạn cũng có thể kết hợp 2 chuẩn lại với nhau theo kiểu: biến thì chuẩn `underscores` và các function chuẩn `camelCase`, và ngược lại. Nhưng chắc chắn rằng bạn phải đảm bảo code nhất quán trong project, ví dụ: biến dùng `underscores` thì phải dùng `underscores` từ đầu cho đến cuối project.

```php
$url_blog = "https://manhnv.com";

function showUrlBlog(){
    echo $url_blog;
}
```

## Đừng nên viết code lồng nhau quá nhiều mức

Lồng nhau quá nhiều mức sẽ làm cho code trở nên khó đọc, ví dụ như vầy:

```php
function writeFileFunction() {
// ...
if (is_writable($folder)) {
    if ($fp = fopen($file_path,'w')) {
       if ($stuff = extractSomeStuff()) {
         if (fwrite($fp,$stuff)) {
         // ...
         } else {
            return false;
         }
      } else {
       return false;
     }
    } else {
     return false;
    }
  } else {
   return false;
 }
}
```

Các có thấy, đoạn code trên rất khó đọc, khó hiểu, và khó maintain. Để code dễ đọc hơn, dễ maintain hơn thì hãy giảm mức độ lồng nhau lại, như:

```php
function writeFileFunction() {
// ...
  if (!is_writable($folder)) {
    return false;
  }

  if (!$fp = fopen($file_path,'w')) {
    return false;
  }

  if (!$stuff = extractSomeStuff()) {
    return false;
  }

  if (fwrite($fp,$stuff)) {
   // ...
  } else {
    return false;
  }
}
```

## Hãy nhớ Comment, Comment và Comment đầy đủ khi code.

Hãy nhớ `Comment` đẩy đủ khi code. Nó rất là quan trọng khi dự án có thể dài hơi kéo dài tận 5, 10 hay 15 năm thì chắc chắn đội phát triển dự án sẽ thay đổi rất nhiều và khi bạn comment thì những người vào dự án sau sẽ hiểu được code của bạn đã từng code như thế nào, và khi dự án đã relase nhưng sau một thời gian xảy ra lỗi thì đội phát triển nhận project để maintain có thể hiểu code nó hoạt động như thế nào, và sửa lỗi một cách nhanh chóng và dễ dàng.

Và cả khi dự án là của cá nhân, không cần làm việc nhóm thì bạn cũng nên comment lại chức năng mình làm, vì có thể sau một thời gian đọc lại code mà không có comment thì bạn sẽ không biết là mình đã từng code cái gì nữa.

Ví dụ đây là một chức năng tạo mới user:

```php
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
```

## Không đặt phpinfo() trong webroot của bạn

Phpinfo là một chức năng rất hữu ích. Đơn giản là bạn tạo một tệp PHP có

```php
<?php phpinfo(); ?>
```

và bạn đặt nó vào ở đâu đó trên server, bạn có thể biết mọi thứ về môi trường server của mình. Tuy nhiên, rất nhiều lập trình viên sẽ đặt tệp chứa `phpinfo()` trong webroot. Thực tế điều này sẽ không an toàn một tý nào. Hãy xóa nó sau khi bạn xem xong thông tin cần thiết.

## Không bao giờ tin tưởng người dùng

Nếu ứng dụng của bạn có chỗ cho người dùng nhập dữ liệu vào, bạn phải luôn nghĩ là họ sẽ cố gắng nhập mọi thứ gây lỗi cho hệ thống. Cách tốt nhất để giữ cho trang web của bạn không bị các hacker tấn công XSS hay [SQLinjection](https://manhnv.com/2019/05/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/ "Mô tả SQL Injection là gì và cách kiểm tra"), là luôn kiểm tra mọi dữ liệu người dùng nhập vào.

Ví dụ một đoạn code thể hiện chức năng lấy thông tin một bài viết không kiểm tra đầu vào và dẫn tới lỗ hổng SQLinjection:

```php
  $server = "localhost";
  $user = "manhnv.com";
  $password = "manhnv.com";
  $db = "manhnv.com";

  // // Create connection
  $conn = new mysqli($server, $user, $password, $db);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Câu lệnh sql có lỗi sql injection
  $query = "SELECT * FROM posts WHERE id=". $_GET['id'];
  $result = $conn->query($query);
  // var_dump($result->fetch_assoc());

  if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - title: " . $row["content"]. " " . $row["description"]. "<br>";
    }
  } else {
    echo "0 results";
  }
  $conn->close();
```

Các bạn có thể thấy câu lệnh `$sql = "SELECT * FROM posts WHERE id=". $_GET['id'];` biến `$_GET['id']` được lấy trực tiếp truy vấn vào database mà không lọc dữ liệu, những kẻ tấn công có thể dựa vào đó thể injection nhưng câu lệnh sql đọc hại vào.

Sau đây mình có 3 cách để bảo vệ được câu lệnh trên:

* Dùng PDO PHP Data Objects)

PDO là một phần tiện ích mở rộng của PHP, nó giúp website bạn trở nên nhanh và an toàn hơn

```php
$results = $db->prepare('SELECT * FROM posts WHERE id = :id');

$results->execute(array(':id' => $_GET['id']));

$rows = $results->fetchAll();
```

* Sử dụng hàm `mysqli_real_escape_string()`

Hàm này giúp bạn loại bỏ những kí tự không cần thiết trước khi xử lí câu lệnh SQL.

```php
  $con=mysqli_connect("localhost","my_user","my_password","my_db");
  $id = mysql_real_escape_string($conn, $_GET['id']);

  $query = mysql_query($conn, "SELECT * FROM posts where id = "' .$id. '");
```

* Sử dụng hàm `preg_replace()`

`preg_replace()` giúp bạn loại bỏ những kí tự được chỉ định giúp câu lệnh trở nên an toàn hơn.

```php
// Câu lệnh giúp bạn loại bỏ các chữ số chính xác là từ 0-9.
$id = preg_replace("/[^0-9]/","", $_GET['id']);

$query = mysqli_query($conn, "SELECT * FROM posts where id = "' .$id. '");
```

## Sử dụng cơ chế bộ nhớ cache

Bộ nhớ cache web (hoặc bộ nhớ cache HTTP) hay còn gọi là Web caching là một công nghệ thông tin để lưu trữ tạm thời (lưu trữ) các dữ liệu web như: các trang và hình ảnh HTML, để giảm tải băng thông, giảm tải máy chủ. Một hệ thống lưu trữ web lưu trữ bản sao các dữ liệu đi qua nó.

Một số hệ thống bộ nhớ cache mạnh mẽ có miễn phí:

* [Memcached](http://www.danga.com/memcached/ "Memcached")
* [APC](https://www.php.net/manual/en/intro.apc.php "APC")
* [Zend Cache](http://files.zend.com/help/Zend-Platform/zend_cache_api.htm "Zend Cache")
* [eAccelerator](http://eaccelerator.net/ "eAccelerator")

## Giữ các function chạy ở bên ngoài vòng lặp (loops)

Project của bạn sẽ giảm hiệu suất rất nhiều khi bạn lạm dụng đưa các function vào bên trong vòng lặp. Vòng lặp càng lớn, thời gian thực hiện càng lâu. Vì vậy nên đặt các function bên ngoài vòng lặp nếu có thể.

Một ví dụ tệ hết sức tệ khi đặt function vào trong vòng lặp:

```php
for ($i = 0; $i < count($array); $i++) {
  //manhnv.com @phần code cần chạy
}
```

Bạn có thể viết lại đoạn code trên để code tường mình cũng như hiệu suất tốt hơn.

```php
$count = count($array);

for($i = 0; $i < $count; $i++) {
  //manhnv.com @phần code cần chạy
}
```

## Không sao chép các biến phụ nếu không cần thiết

Một số bạn muốn làm cho code trông kinh khủng hơn, nhiều dòng hơn (để người khác nhìn vào cho ngầu) bằng cách sao chép các biến có trước vào một biến mới. Tuy nhiên, thực sự không tốt khi làm như vậy vì nó làm giảm hiệu suất và khả năng tăng gấp đôi bộ nhớ khi chạy lệnh.

Một ví dụ minh họa cho điều mình nói bên trên:

```php
$description = strip_tags($_POST['description']);

echo $description;
```

Các bạn có thể viết thành như vầy để code được tối ưu hơn nè:

```php
echo strip_tags($_POST['description']);
```

## Sử dụng framework

Một khi bạn đã biết cơ bản về PHP rồi thì mình khuyên bạn nên học lấy 1 framework của PHP để làm việc tốt hơn. Có rất nhiều framework PHP khác nhau. Tuy nhiên, đã số được thiết kế dựa trên kiến trúc Model-View-Controller (MVC). Một trong framework đang được sử dụng phổ biến đó là bởi vì kiến trúc MVC đảm bảo sự phân chia rõ ràng giữa dữ liệu. logic và template, đảm bảo dễ dàng duy trì và phát triển. Ngoài ra còn một số điểm mạnh khác như:

* **Mất ít thời gian hơn để phát triển dự án hơn:** Với framwork, bạn đã có một khung sườn làm việc. Bạn không mất thời gian phân tích kiến trúc ứng dụng để “sáng tạo” những thứ người khác đã làm rất tốt, viết lại những thứ quá đỗi nhàm chán.
* **Bạn sẽ có một ứng dụng với mã nguồn sạch đẹp, dễ dàng phát triển, bảo trì.**
* **Hiệu năng cũng như bảo mật sẽ được cập nhật thường xuyên nhờ cộng đồng phát triển framework đó.**

Và còn nhiều, nhiều hơn nữa các lợi ích mà framework mang lại.

Một số framework php:

1. Laravel: `Đây là framework ưa chuộng của mình`
2. Symfony
3. CodeIgniter
4. Yii 2
5. Phalcon
6. CakePHP
7. Zend Framework
8. Slim
9. FuelPHP
10. PHPixie

**CUỐI CÙNG:** Trên đây là một số ví dụ dựa trên kinh nghiệm thực tế mình đi làm học hỏi được cũng như tìm hiểu được mà mình muốn chia sẻ cho các bạn đọc cùng được biết.

**Nếu các bạn có thêm kinh nghiệm nào, mẹo nhỏ nào có thể comment phía bên dưới cho mình được biết, cũng như chia sẻ cho nhiều bạn hơn được biết. Để chúng ta cùng giúp đỡ nhau học tập, tìm hiểu và phát triển**

=> Chúc mọi người code càng ngày càng đẹp hơn, sịn xò hơn, hiệu năng cao hơn và tạo ra được nhiều sản phẩm thú vị hơn. Thân!

`Hãy ghé thăm blog của mình thường xuyên để đọc nhiều bài mình chia sẻ hơn nữa, và mình là` [manhnv](https://manhnv.com)