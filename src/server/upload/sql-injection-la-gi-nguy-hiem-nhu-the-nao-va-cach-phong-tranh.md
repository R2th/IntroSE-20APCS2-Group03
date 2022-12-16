Nguồn bài viết: https://tienminhvy.com/kinh-nghiem/sql-injection-la-gi-va-cach-phong-tranh

SQL injection là một lỗi khá cơ bản nhưng cực kỳ nguy hiểm khi lập trình một ứng dụng web, tuy vậy, có rất nhiều website lớn trên Internet đã gặp phải lỗi bảo mật nghiêm trọng này và hậu quả là những sự cố rò rỉ dữ liệu của hàng triệu người dùng khắp thế giới.

Vốn dĩ việc lập trình một website đã khó, và để bảo vệ nó khỏi những hacker đang lăm le dòm ngó website của bạn lại càng khó hơn, như bài trước mình có nhắc đến việc [rò rỉ dữ liệu tại Flaticon và Freepik](https://tienminhvy.com/tin-tuc-cong-nghe/ro-ri-du-lieu-tai-flaticon-va-freepik/) và nguyên nhân của sự cố này đó chính là lỗi SQL injection.

Vì sao lỗi này tuy khá cơ bản nhưng nhiều lập trình viên thường mắc phải khi lập trình ứng dụng, chúng ta cùng tìm hiểu.

## SQL injection là gì?

SQL injection là một lỗi kỹ thuật do người lập trình vô tình (hoặc có thể cố ý) tạo ra khi lập trình một ứng dụng web, đây là lỗ hổng của việc kiểm tra đầu vào (input) của người dùng có chứa các ký tự đặc biệt gây ảnh hưởng đến hệ thống cơ sở dữ liệu.

Từ đó cho phép các hacker có thể vượt qua quá trình kiểm tra dữ liệu chỉ bằng vài ký tự đặc biệt. Và kết quả như bạn đã biết là gây ra các sự cố bảo mật dẫn đến rò rỉ dữ liệu của người dùng không hề mong muốn. Thông thường lỗi SQL injection thường xảy ra ở: Form đăng nhập/đăng ký, form tìm kiếm, form tra cứu dữ liệu,…

## SQL injection nguy hiểm đến mức nào?

SQL injection cực kỳ nguy hiểm, với lỗi bảo mật SQL injection, hacker có thể tận dụng để đánh cắp dữ liệu trong cơ sở dữ liệu của một website. Với lỗi này, hacker có thể chèn dữ liệu, xuất dữ liệu ra ngoài màn hình và đánh cắp dễ dàng,…

![SQL injection](https://i1.wp.com/www.indusface.com/wp-content/uploads/2020/03/how-to-prevent-blind-sql-injection.png?ssl=1)

Ngoài ra, nếu hacker là đối thủ website của bạn thì người đó có thể thực thi một câu lệnh dùng để xoá nhiều dữ liệu quan trọng trong cơ sở dữ liệu hay xoá toàn bộ cơ sở dữ liệu của một website, mà đối với một website động thì cơ sở dữ liệu là thứ quan trọng nhất nhì đấy.

## Ví dụ về lỗi SQL injection

### Ví dụ #1
Để bạn có thể hình dung về lỗi SQL injection ra làm sao và nguy hiểm thế nào thì mình đã viết một form đăng nhập nhỏ dùng để test như sau (lưu ý form này chỉ dùng cho mục đính thử nghiệm thôi nhé):

![alt text](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex1_01.png?resize=1024%2C576&ssl=1)

PHP:
```php
<?php
  
    // Ví dụ về SQL Injection
    // Bản quyền © 2020 by tienminhvy.com - vui lòng ghi rõ nguồn nếu chia sẻ lại

    $db = mysqli_connect('localhost', 'root', '', 'sql_inj', '3306');

    if (!$db) {
        die('Không thể kết nối đến CSDL, hãy kiểm tra lại thông tin');
    }

    $content = <<<HTML
        <form method='POST'>
            <p>Bạn phải đăng nhập mới có thể tiếp tục sử dụng dịch vụ!</p>
            <input type="text" name="username" placeholder='Tên đăng nhập' required>
            <input type="password" name="password" placeholder='Mật khẩu' required>
            <button type='submit'>Đăng nhập</button>
        </form>
    HTML;

    if (isset($_POST['username'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $result = mysqli_query($db, "SELECT * FROM user WHERE username = '$username' AND password = '$password'");

        if (mysqli_num_rows($result)==1) {
            $content = "<p>Đăng nhập thành công</p>";
            $content .= "<p><b>Thông tin tài khoản</b></p>";
            $content .= "<p><b>Tên đăng nhập:</b> $username</p>";
            $content .= "<p><b>Số dư tài khoản:</b> 29,194,500đ</p>";
        } else {
            $content .= "<p><b>Đăng nhập thất bại</b></p>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ngân hàng XYZ</title>
</head>
<body>
    <?php
        echo $content;
    ?>
</body>
</html>
```

#### Bắt đầu thử nghiệm

Ví dụ đây là trang đăng nhập của ngân hàng XYZ, mình biết được tên đăng nhập của một người có tên là tmv, nhưng anh ta không cho mình biết mật khẩu. Do đó khi mình nhập vào mật khẩu bất kỳ thì máy chủ web trả về như hình dưới.

![SQL injection ex_1](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex1_01.5.png?resize=1024%2C576&ssl=1)

Và mình hay có tính nghịch ngợm nên mình đã thêm ký tự ( ‘ ) vào ô mật khẩu và nhận được kết quả sau:

![SQL injection ex_1](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex1_03.png?resize=1024%2C576&ssl=1)

Khi máy chủ trả về lỗi dạng Warning: … thì chắc chắc website này đã mắc lỗ hổng SQL Injection rồi. do đó, nếu mình muốn đăng nhập thì mình sẽ nhập tên đăng nhập và câu lệnh sau vào ô mật khẩu rồi nhấn đăng nhập:

```sql
' OR 1=1 --
```
Và website sẽ trả về trang như sau:

![SQL injection ex_1](https://i2.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sqlinj_ex_01_4.png?resize=1024%2C576&ssl=1)

#### Vì sao lại như vậy?
Ở đây, mình đoán nguyên lý của câu lệnh SQL của website này như sau:

```SQL
SELECT * FROM table WHERE username='tmv' AND password='matkhau'
```
Và khi mình nhập ký tự ( ‘ ) vào sau mật khẩu bất kỳ trong ô mật khẩu thì sẽ được câu lệnh sau:

```SQL
SELECT * FROM table WHERE username='tmv' AND password='matkhau''
```
Khi thực thi câu lệnh trên, hệ thống sẽ báo lỗi Warning: … như hình trên, vì thế, mình đã chỉnh sửa câu lệnh trên và câu lệnh nhận được là:

```SQL
SELECT * FROM table WHERE username='tmv' AND password='' OR 1=1 -- '
```
Ở đây, khi hệ thống kiểm tra câu lệnh này thì có 3 điều kiện, username=string, password=string và 1=1. Mặc định, khi câu điều kiện số 1 đúng nhưng câu điều kiện 2 không đúng thì hệ thống sẽ thoát ra ngay. Sau khi biến đổi như trên thì nó sẽ trả về TRUE cho mọi trường hợp vì TRUE AND FALSE OR TRUE thì kết quả cuối cùng sẽ là TRUE.

Do đó, hệ thống sẽ tìm được người dùng và hiển nhiên sẽ bybass (vượt qua) quá trình kiểm tra mật khẩu, vì thế hệ thống trả về người dùng cùng thông tin như hình trên luôn mà không phải qua quá trình kiểm tra nào cả.

### Ví dụ #2

Với ví dụ này, mình sẽ lấy được thông tin của toàn bộ người dùng trong CSDL của website Ngân hàng XYZ luôn. Mã nguồn của trang này như sau (chỉ dành cho mục đích thử nghiệm thôi nhé):

![SQL injection ex_2](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_01.png?resize=1024%2C576&ssl=1)

```php
<?php

    // Ví dụ về SQL Injection
    // Bản quyền © 2020 by tienminhvy.com - vui lòng ghi rõ nguồn nếu chia sẻ lại

    $db = mysqli_connect('localhost', 'root', '', 'sql_inj', '3306');

    if (!$db) {
        die('Không thể kết nối đến CSDL, hãy kiểm tra lại thông tin');
    }

    $content = <<<HTML
        <form method='POST'>
            <p>Tìm tin nhắn. Hãy nhập tiêu đề</p>
            <input type="text" name="tieude" placeholder='Tiêu đề cần tìm' required>
            <button type='submit'>Kiểm tra</button>
        </form>
    HTML;

    if (isset($_POST['tieude'])) {
        $tieude = $_POST['tieude'];

        $result = mysqli_query($db, "SELECT msg, msg_name FROM msg WHERE msg_name = '$tieude'");

        if (mysqli_num_rows($result)>0) {
            $content .= "<table>
            <tr>
              <th>Tiêu đề tin nhắn</th>
              <th>Nội dung</th>
            </tr>";
            while($row = mysqli_fetch_assoc($result)) {
                $content .= "<tr>
                <td>".$row['msg_name']."</td>
                <td>".$row['msg']."</td>
                </tr>";
            }
            $content .= "</table>";
        } else {
            $content .= "<p><b>Không tìm thấy</b></p>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tin nhắn - Ngân hàng XYZ</title>
</head>
<body>
  
    <?php
        echo $content;
    ?>

</body>
</html>
```
Ví dụ ngân hàng XYZ có một trang để tìm các tin nhắn của ngân hàng, và mình muốn kiểm tra tin nhắn của ngân hàng thì mình truy cập vào trang trên. Và mình cũng làm thao tác như trên, nhập ký tự ( ‘ ) vào ô tiêu đề cần tìm và nhấn Kiểm tra.

Và website hiện thông báo như bên dưới thì website đã dính lỗi bảo mật SQL injection rồi. Nhưng lần này đặc biệt hơn, nếu bạn nhập đúng tiêu đề thì website sẽ hiện danh sách tiêu đề và nội dung của thông báo. Do đó mình đoán ở đây hệ thống gọi câu lệnh SQL để lấy giá trị của 2 cột như sau.

```SQL
SELECT table_1, table_2 FROM table WHERE input='giatri'
```

![SQL injection ex_2](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_02.png?resize=1024%2C576&ssl=1)


Vì thế, cho nên mình sẽ nhập câu lệnh sau vào ô:

```SQL
-- Câu lệnh nhập vào ô:

' UNION ( SELECT table_name, table_schema FROM information_schema.tables ) --

-- Sẽ chuyển thành

-- SELECT table_1, table_2 FROM table WHERE input='' UNION ( SELECT table_name, table_schema FROM information_schema.tables ) -- '
```

Sau khi nhập vào, mình nhấn kiểm tra để thực thi câu lệnh.

![SQL injection ex_2](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_03.png?resize=1024%2C576&ssl=1)

Và chúng ta đã nhận được danh sách như sau, với câu lệnh trên, mình đã biết được trên hệ thống CSDL SQL đó bao nhiêu table trong một CSDL rồi. Để kiểm tra CSDL mà website hiện đang kết nối thì bạn kéo xuống đến cuối danh sách.

![SQL injection ex_2](https://i2.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_04.png?resize=1024%2C576&ssl=1)

Và dưới đây, ngay chỗ từ khoá **phpmyadmin** cuối cùng và bắt đầu dòng mới có 2 dòng thì 2 dòng đó là 2 table hiện tại có trong CSDL tên là **sql_inj**

![SQL injection ex_2](https://i2.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_05.png?resize=1024%2C576&ssl=1)

Trong table **user** sẽ có thông tin đăng nhập của toàn bộ người dùng trên website này. Nhưng có một điều là mình vẫn chưa biết trong table user có bao nhiêu column để có thể lấy vì nếu lấy tất cả bằng dấu (*) thì hệ thống sẽ báo lỗi.

Vì thế, nên mình sẽ nhập câu lệnh sau vào ô và nhấn Enter:

```SQL
-- Câu lệnh nhập vào ô:

' UNION ( SELECT column_name, 1 FROM information_schema.columns WHERE table_name='user' ) --

-- Sẽ chuyển thành

-- SELECT table_1, table_2 FROM table WHERE input='' UNION ( SELECT column_name, 1 FROM information_schema.columns WHERE table_name='user' ) -- '
```

Ở câu lệnh trên, mình chọn 2 cột là column_name và 1 vì mặc định hệ thống đã chọn 2 cột để xử lý yêu cầu, vậy nên nếu chọn hơn hoặc thiếu thì hệ thống sẽ báo lỗi.

Sau khi thực thi câu lệnh trên, mình nhận được danh sách như hình. Như bạn thấy đấy, có vô số cột trong table user của cả hệ thống CSDL, ở đây mình dự đoán rằng 2 dòng tô đậm chính là các cột của table user trong cơ sở dữ liệu **sql_inj**

![SQL injection ex_2](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_06.png?resize=1024%2C576&ssl=1)

Và để lấy danh sách thông tin trong table user này, mình nhập câu lệnh sau vào ô và nhấn Enter:

```sql
-- Câu lệnh nhập vào ô:

' UNION ( SELECT username, password FROM user ) --

-- Sẽ chuyển thành

-- SELECT table_1, table_2 FROM table WHERE input='' UNION ( SELECT username, password FROM user ) -- '
```

Và chúng ta đã lấy thành công danh sách người dùng có trong table user rồi đó.

![SQL injection ex_2](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sql_inj_ex2_07.png?resize=1024%2C576&ssl=1)

## Cách phòng tránh lỗ hổng SQL injection

Như bạn thấy phần trên, lỗ hổng SQL injection cực kỳ nguy hiểm vì nó giúp cho hacker có thể thao tác trực tiếp với cơ sở dữ liệu mà không cần phải xác minh bất kỳ bước nào cả.

May mắn thay, đa số các ngôn ngữ lập trình hiện tại đã hỗ trợ hàm để có thể escape câu lệnh (thêm các dấu ( \ ) trước các ký tự đặc biệt) trước khi thực thi nó trên cơ sở dữ liệu, do đó sẽ hạn chế và có thể sẽ chặn lỗ hổng SQL injection một cách an toàn.

Và ngôn ngữ lập trình PHP hiện tại có hỗ trợ nhiều hàm cho việc này, tiêu biểu nhất là hàm mysqli_real_escape_string(), với hàm này, hệ thống sẽ dùng cú pháp của hệ thống CSDL để escape các chuỗi lệnh thành lệnh SQL tiêu chuẩn.

Để có thể sử dụng câu lệnh này, bạn tham khảo đoạn code bên dưới:

```php 
<?php
    $db = mysqli_connect('localhost', 'root', '', 'sql_inj', '3306');

    if (!$db) {
        die('Không thể kết nối đến CSDL, hãy kiểm tra lại thông tin');
    }

    $chuoiCanEscape = "test'";

    $chuoiDaEscape = mysqli_real_escape_string($db, $chuoiCanEscape);
  
    $caulenh = "SELECT * FROM table WHERE username='$chuoiDaEscape'";
  
    // Câu lệnh sẽ trở thành SELECT * FROM table WHERE username='test\''
?>
```
Như bạn thấy, câu lệnh đã được escape và an toàn để thực thi.

## Tóm lại

![SQL injection](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/sqlinj.jpg?w=800&ssl=1)

Tóm lại là qua bài này, các bạn đã nắm rõ thế nào là SQL injection, nó nguy hiểm ra sao và phòng tránh bằng cách nào rồi đó. Lưu ý là hãy áp dụng cách giải quyết như mình đề cập ở trên vào tất cả các form khi bạn lập trình website nhé, và nhớ luật bất thành văn rằng “Đừng bao giờ tin tưởng input của người dùng!”.

Chúc các bạn thành công.

Nếu thích thì bạn có thể ghé thăm blog của mình tại đây: https://tienminhvy.com