# 1. Định nghĩa về ajax
AJAX viết tắt từ Asynchronous JavaScript and XML (JavaScript và XML không đồng bộ).

- Theo như các trang thống kê (Google Suggest) thì AJAX là một kiểu lập trình trở nên phổ biến vào năm 2005.

- AJAX không phải là một ngôn ngữ lập trình mới mà là một cách thức mới sử dụng
những chuẩn đã có.

- AJAX dựa chính trên request JavaScript và HTML ngoài ra XML và CSS cũng là các chuẩn tạo nên AJAX

- AJAX thân thiện với người dùng

Nói ngắn gọn, nếu bạn muốn không phải đợi mòn mỏi để load được đống dữ liệu trên trang web mà thay vào đó phần cần thiết được load lại siêu nhanh không cần load lại cả trang nặng nề kia. Cái này dựa trên nguyên lý cắt nhỏ dữ liệu của ajax

## 1.1 Hình dung về sử dụng Ajax

Chúng ta tạo một biểu mẫu đơn giản như bên dưới. Trường `username` sẽ được điền bởi người dùng và trường `time` sẽ được điền bằng cách sử dụng AJAX kiểu như này

```html
<html>
<body>
<form name="myFirstDemo">
Họ và tên: <input type="text" name="username" />
Thời gian hiện tại: <input type="text" name="time" />
</form>
</body>
</html> 
```
Đấy kiểu vậy, sau đây thì mình có thêm một vài ví dụ về sử dụng Ajax

## 1.2 Tạo một ứng dụng Ajax đơn giản

Khi bạn click vào button `View more` sau 3 giây sẽ hiển thị một đoạn text lên. Ở đây các bạn có thể thực hiện việc ajax này bằng javascript thuần (sử dụng các phương thức trong lớp XMLHttpRequest) hoặc sử dụng thư viện jQuery cái mà cũng được viết bằng js. Trong ví dụ này thì thực hiện nó thông qua jQuery. Nếu bạn muốn tìm hểu thêm cách thực hiện bằng js thuần thì xem thêm ở đây https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest 

Đầu tiên chúng ta include thư viện jQuery, gọi như thế này là mặc định nó sẽ include version mới nhất.

`<script type="text/javascript" src="https://code.jquery.com/jquery-latest.pack.js"></script>`

Thêm đoạn này vào body:

```html
<div id="demo-ajax">
</div>
<button id="btn">View more</button>
```
Thẻ div đầu tiên chúng ta để hiển thị kết quả trang php trả về, button thứ 2 là nút để bạn click

Và bây giờ đến đoạn quan trọng, bạn cho đoan script này vào bên trong thẻ head (trước thẻ body)

```script
<script>
        $(document).ready(function () {
            jQuery("#btn").click(function(){
                var data_test = 'This is first demo';
                $.ajax({
                    url: 'controller.php',
                    type: 'POST',
                    data: 'string=' + data_test,
                    success: function (data) {
                        setTimeout(function(){
                            $('#demo-ajax').html(data);
                        }, 3000);
                    },
                    error: function (e) {
                        console.log(e.message);
                    }
                });
            });
        });
 </script>
```
Ở đây chúng ta cần đảm bảo rằng trang của chúng ta đã load hết nên chúng ta đặt code bên trong hàm này

` $(document).ready(function () {});`

Sau đó chúng ta sẽ tạo một event click chuột vào button `view more`, vậy khi button `view more` được click thì chúng ta sẽ xử lý cái gì?

Khai báo 1 biến có nội dung là “This is first demo”

Sử dụng hàm ajax để gửi biến ấy sang cho file php xử lý, trong hàm này cần các tham số như:

`url`: tức là nơi sẽ xử lý dữ liệu.

`type`: chính là phương thức đẩy dữ liệu đi (POST hoặc GET)

`data`: dữ liệu nào sẽ được đẩy sang, ở đây chúng ta đấy biến data_test sang và cần gán nó vào 1 tham số string để sang bên php chúng ta có thể lấy giá trị string bằng cách `$_POST[‘string’]` nếu type là post còn `$_GET[‘string’]` với type là get.

Hàm success sẽ thực hiện khi chúng ta thực hiện thành công. Ở đây nếu thành công chúng ta hẹn giờ 3s để nó set content cho thẻ có id là #demo-ajax

Hàm error sẽ thực hiện khi công việc thất bại. ở đây chúng ta đơn giản chỉ console.log ra thôi, cái này bạn phải nhấn F12 mới thấy được.

Đây là code đầy đủ trang html

```html
<html>
<head><title>Basic Ajax Demo</title>
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.pack.js"></script>
    <script>
        $(document).ready(function () {
            jQuery("#btn").click(function(){
                var data_test = 'This is first demo';
                $.ajax({
                    url: 'controller.php',
                    type: 'POST',
                    data: 'string=' + data_test,
                    success: function (data) {
                        setTimeout(function(){
                            $('#demo-ajax').html(data);
                        },3000);
                    },
                    error: function (e) {
                        console.log(e.message);
                    }
                });
            });
        });
    </script>
</head>
<body>
<div id="demo-ajax"></div>
<button id="btn">View more</button>
</body>
</html>
```

**=> Xử lý php**

Quan trọng không kém là file controller.php, file này có nhiệm vụ mã hóa sang dạng json và hiển thị (giống như return đối với hàm) nó ra để cho bên hàm success hoặc error của ajax dễ xử lý:

```php
<?php
echo json_encode($_POST['string']);
```
## 1.3 Ví dụ về sử dụng jQuery Ajax và php để gửi dữ liệu trong form Login
Trước tiên chúng ta sẽ tạo 1 form login như sau:

```html
<form method="post" id="form-login">
    <input type="text" name="username" id="username" placeholder="Tên đăng nhập" />
    <input type="text" name="password" id="password" placeholder="Mật khẩu" />
    <button id="btn-login" type="submit">Login</button>
</form>
```

Tiếp theo chúng ta sẽ sử dụng thư viện jquery mới nhất chèn vào website

`<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>`

Tiếp đến xây dựng code jQuery ajax để thực hiện kiểm tra dữ liệu trong form và gửi dữ liệu trong form lên server

```
<script type="text/javascript">
$(document).ready(function()
{
    var submit = $("button[type='submit']");
     
    // bắt sự kiện click vào nút Login
    submit.click(function()
    {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
         
        // Kiểm tra đã nhập tên tài khoản chưa
        if (username == '') {
            alert('Vui lòng nhập tài khoản');
            return false;
        }
         
        // Kiểm tra đã nhập mật khẩu chưa
        if (password == '') {
            alert('Vui lòng nhập mật khẩu');
            return false;
        }
         
        // Lấy tất cả dữ liệu trong form login
        var data = $('form#form-login').serialize();
        // Sử dụng $.ajax()
        $.ajax({
        type : 'POST', //kiểu post
        url  : 'submit.php', //gửi dữ liệu sang trang submit.php
        data : data,
        success :  function(data)
               {
                    if (data == 'false')
                    {
                        alert('Sai tên đăng nhập hoặc mật khẩu');
                    } else {
                        $('#content').html(data);
                    }
               }
        });
        return false;
    });
});
</script>
```
Cuối cùng xây dựng file `submit.php` để xử lý dữ liệu

```php
<?php
if ($_POST)
{
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    //neu dang nhap dung, fake data
    if ($username == 'tendangnhap' && $password == 'matkhau')
    {
?>
<p>Đăng nhập thành công</p>
<h1>Xin chào: <?php echo $username ?></h1>
<?php
    } else {
?>
 <p>Tên đăng nhập hoặc mật khẩu sai rồi</p>
<?php
    }
}
?>
```
# 2. Mặt hạn chế khi sử dụng Ajax

Ngoài những mặt tối ưu như phần trên đã nêu thì Ajax cũng có một vài hạn chế:

- Không thể **bookmark** nó vào favourite trên trình duyệt hay gửi link đến cho bạn bè, vì tất cả quá trình nó thực hiện ngầm và không hiển thị trên address
- Không thể hiện thị nội dung trên các trang tìm kiếm vì các trang tìm kiếm hiện nay vẫn chưa hỗ trợ tìm vì rất khó tìm và gần như không thể tìm đc.
- Không thể sử dụng nút back vì back cũng là chính nó
- Với một số trình duyệt, do nhu cầu bảo mật, sẽ tắt chức năng thực hiện javascript nên ajax không thể chạy, hay trong một vài host, không hỗ trợ vào sâu cấu hình server nên hay bị lỗi “Access denied”

Nhưng với những điểm hạn chế nói trên thì AJAX vẫn đang được các lập trình viên sử dụng rộng rãi và đang nghiên cứu để cải thiện nó, ví dụ như vừa update thông tin trên web, vừa thay đổi trên thanh address để có thể sử đung một số chức năng liên quan tới địa chỉ tuyệt đối này.


Bài viết này được tham khảo từ một vài nguồn, cụ thể là từ các trang:
- https://www.w3schools.com/js/js_ajax_intro.asp
- http://canthoit.info/ajax-la-gi-uu-diem-va-khuyet-diem-cua-ajax/