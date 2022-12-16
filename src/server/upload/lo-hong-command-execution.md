Hề lâu ! :v Như mọi người cũng biết thì hiện nay rất nhiều hệ thống web gọi `operating system processes` thông qua command line, thao tác này sẽ ẩn chứa lỗ hổng về bảo mật, là một Dev có tâm thì chúng ta cẩn phải chắc chắc rằng command stirng được xây dựng một cách chặt chẽ, an toàn. Trong bài viết này mình sẽ giới thiệu cơ bản về lỗ hổng bảo mật này và cách phòng tránh nó, bắt tay vào chém gió nào :))

# Nguyên nhân
Nhiều hệ thống websites sử dụng command line để đọc files, gửi emails, và thực hiện nhiều thao tác khác. Nếu như hệ thống transforms input "sida" vào shell commands thì ... :)) bạn cần phải quan tâm đến việc lọc input đó trước đã.

Nếu không lọc input, hacker có thể craft HTTP requests thực hiện command theo yêu cầu của hắn.

Không nói nhiều, Cùng xem cách nó hoạt động nhé

# Thực hiện
Hãy tưởng tượng rằng bạn đang chạy một trang web đơn giản thực hiện việc tìm kiếm, website sẽ thực hiện command tra cứu và hiện thị kết quả ra view.

Xem qua một chút về đoạn code dưới đây, từ biến `$domain` chưa được lọc, bạn đã vô tình tạo ra lỗ hổng như mình đã đề cập, nó được biết đến với cái tên là `command injection`

```php
<?php
  if (isset($_GET['domain'])) {
    echo '<pre>';
    $domain = $_GET['domain'];
    $lookup = system("nslookup {$domain}");
    echo($lookup);
    echo '</pre>';
  }
?>
```
Lại là Mal, một đực rựa xấu tánh thích nghịch ngợm "hách hủng" cái website yêu quý của bạn, hắn đã cảnh báo trước rằng bạn đang chạy php, và hắn có lợi thế về món này :))

Trong khi đang sử dụng chức năng tìm kiếm, hắn đoán domain được đặt vào trong query string với biến `$domain`, thử search: `google.com`

![](https://images.viblo.asia/191b5ce2-129f-4349-8fcf-9bd473517441.png)

Hắn đoán: IP tìm kiếm thực hiện thông qua một `operating system function` và gắn tag vào lệnh bổ sung ở cuối.

Hắn làm một phép thử trên thanh tìm kiếm với nội dung: `google.com && echo "HAXXED"`

![](https://images.viblo.asia/6f5d7d03-0bab-47f7-878b-bac42aee595a.png)

Như bạn thấy đấy, ngoài nội dung tìm kiếm đơn thuần, lần này hắn có thể thấy được cả output với đoạn `echo` chèn vào phần tìm kiếm, yep, web của bạn không thích điều này :)))

Tin xấu là bây giờ hắn đã biết cơ chế để thực thi code trên server ... Bạn có thể thử nó nhé, thêm 1 command vào thanh search với nội dung `google.com && cat /etc/passwd`

![](https://images.viblo.asia/0be3d512-6a06-49ed-9e02-bfdfe2c92074.png)

Output sẽ có thêm đoạn thông tin "nhạy cảm" này ở phía dưới cùng với nội dung được đọc từ server:
```
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
```

Đó chỉ là cơ chế hoạt động của lỗ hổng này, bây giờ chúng ta sẽ phải protect nó.

# Ngăn chặn
Nếu kẻ tấn công có thể thực thi mã tùy ý trên máy chủ của bạn, hệ thống của bạn gần như chắc chắn sẽ bị xâm phạm. Bạn cần hết sức cẩn thận khi thiết kế cách máy chủ web của bạn tương tác với hệ điều hành.

### 1. Trước hết cứ phải là espace inputs đã :))
Lỗ hổng xảy ra khi input không được lọc cẩn thận các ký tự như: `;`, `&`, `|`, ``` ` ``` . Hoặc nếu tốt hơn thì bạn có thể dùng regex để lọc.

### 2. Hạn chế các command được phép
Hãy cố gắng xây dựng các shell commands thay vì để người dùng tự nhập. Nếu như phải sử dụng input, hãy thử liệt kê ra các giá trị được phép trong danh sách.

### 3. Thực hiện review code kỹ lưỡng
Kiểm tra việc gọi ra các lỗ hổng sẽ được coi như là một phần review code, hãy chắn chắn rằng team của bạn biết phải bảo vệ nó như thế nào

### 4. Chạy với quyền hạn chế
Đừng quên set quyền cho từng loại user nhé :v phải chắc cú rằng server xử lý, truy cập vào nơi nó cần thoy nha.

### 5. Tránh gọi tất cả các lệnh cùng nhau
ngôn ngữ lập trình hiện đại cho phép bạn đọc các tập tin, gửi email, và thực hiện các chức năng khác trên hệ thống. Sử dụng API bất cứ khi nào có thể, chỉ sử dụng shell khi nào cần thiết, điều này giúp giảm thiểu rủi do và cũng đơn giản hóa codebase của bạn

### Code Samples
**PHP**

Tạo command line trong Php khá phổ biến, dưới đây là 1 số cách để tạo chúng:
```php

   shell_exec "ls -l"

   exec "ls -l"

   passthru "ls -l"

   system "ls -l"

   `ls -l`
```

# Tổng kết
Trên đây là phần giới thiệu cơ bản về command injection, hy vọng bài viết giúp ích được cho quý bạn đọc, hãy lọc cẩn thận input của người dùng nhé, đừng có tin người, có không giữ mất đừng tìm :v

Chúc bạn có một ngày thật là zui zẻ, Happy coding !