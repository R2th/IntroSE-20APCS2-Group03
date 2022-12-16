## Mô tả

Thực thi mã từ xa - Remote Code Execution tên viết tắt là RCE.

Có thể hiểu là bạn sử dụng một số kỹ thuật nào đó để có thể chiếm được quyền điều khiển trên máy nạn nhân, thông qua đó có thể thực thi những câu lệnh shell, bash ..., hoặc thực thi code của những ngôn ngữ kịch bản (script) như python, perl, php, javascript, ...

Những ứng dụng có thể dễ xảy ra RCE là do không kiểm soát, lọc dữ liệu đầu vào từ người dùng đúng cách.

Một đoạn code ví dụ cơ bản về việc không lọc dữ liệu đầu vào và dễ dẫn đến RCE:

```php
<html>
  <body>
    <h1>Web Adminstration Interface</h1>
    <?php
        if(isset($_GET['cmd'])){
            $cmd = $_GET['cmd'];
            echo $cmd;
            eval($cmd);
        }else{
            echo 'Invalid input';
        }
    ?>
    <form>
      Enter command as JSON:
      <input name="cmd" />
    </form>
  </body>
</html>
```

![alt text](https://manhnv.com/images/posts/remote-code-execution/giao-dien.png "Giao dien demo")

Nhìn qua ví dụ trên, kẻ tấn công có thể sử dụng một số cách sau để thực thi mã php tùy ý.

* chỉ đơn giản là lấy thông tin về phiên bản php đang chạy của hệ thống đó. Kẻ tấn công đơn giản là truyền đường dẫn là `http://127.0.0.1/RCE.php?cmd=phpinfo();`, ngay lập tức câu lệnh `phpinfo();` sẽ được thực thi.

![alt text](https://manhnv.com/images/posts/remote-code-execution/phpinfo.png "Thực thi lệnh php")

* Kẻ tấn công có thể dựa vào ví dụ trên và thực hiện một số câu lệnh shell bằng cách sử dụng hàm `system()` trong php, và khi chạy lên có thể biết được rất nhiều thứ có trong hệ thống. Ví dụ: đọc mã nguồn của trang đang chạy, lấy thông tin user có trên hệ thống...

    - Ví dụ về lấy thông tin hệ thống như đọc file `passwd`: `http://127.0.0.1/RCE.php?cmd=system('cat /etc/passwd');`
    
    ![alt text](https://manhnv.com/images/posts/remote-code-execution/readfile-passwd.png "Đọc file passwd")

* Ngoài ra kẻ tấn công có thể thực hiện một số cách khác để leo thang lỗ hổng, và tìm cách khai thác triệu để với lỗ hổng này.

## Các rủi ro

* Những lỗ hổng này có thể rất khó hoặc dễ tìm.
* Nếu được tìm thấy, thường rất khó khai thác, tùy thuộc vào kịch bản.
* Nếu khai thác thành công, thì có thể dấn đến mất bảo mật, mất tính khả dụng, mất tính toàn vẹn...
* Một khi kể tấn công có khả năng thực hành mã lệnh OS, hắn có thể cố gắng để sử dụng web shell hoặc cài đặt các phần mềm độc hại khác. Bắt nguồn từ đó, hắn thậm chí có khả năng tấn công các hệ thống khác từ bên trong.

## Tìm lỗi và cách phòng tránh

Có thể dễ dàng kiểm tra xem web hoặc ứng dụng web của bạn có dễ bị tấn REC và các lỗ hổng khác hay không bằng cách quét web tự động bằng trình quét lỗ hổng [Acunetix](https://manhnv.com/2019/05/su-dung-acunetix-web-vulnerability-scanner-de-danh-gia-phat-hien-diem-yeu-cua-ung-web/).

Để phòng tránh thì tốt nhất nên kiểm soát tốt dữ liệu đầu vào cho ứng dụng của mình. Đối với ví dụ trên chúng ta có thể viết lại thành:

```php
<html>
  <body>
    <h1>Web Adminstration Interface</h1>

    <?php

    putenv('PATH=/home/rceservice/jail');

    if (isset($_REQUEST['cmd'])) {
    $json = $_REQUEST['cmd'];

    if (!is_string($json)) {
        echo 'Hacking attempt detected<br/><br/>';
    } elseif (preg_match('/^.*(alias|bg|bind|break|builtin|case|cd|command|compgen|complete|continue|declare|dirs|disown|echo|enable|eval|exec|exit|export|fc|fg|getopts|hash|help|history|if|jobs|kill|let|local|logout|popd|printf|pushd|pwd|read|readonly|return|set|shift|shopt|source|suspend|test|times|trap|type|typeset|ulimit|umask|unalias|unset|until|wait|while|[\x00-\x1FA-Z0-9!#-\/;-@\[-`|~\x7F]+).*$/', $json)) {
        echo 'Hacking attempt detected<br/><br/>';
    } else {
        echo 'Attempting to run command:<br/>';
        $cmd = json_decode($json, true)['cmd'];
        if ($cmd !== NULL) {
        system($cmd);
        } else {
        echo 'Invalid input';
        }
        echo '<br/><br/>';
    }
    }

    ?>

    <form>
      Enter command as JSON:
      <input name="cmd" />
    </form>
  </body>
</html>
```

Có một mã lệnh mà giới chuyên môn gọi là “thần chú” cho ngôn ngữ PHP  là: `hàm eval() luôn là hàm chứa mã độc`. Nếu ứng dụng cần sử dụng tới thì cần phải đề cao việc kiểm soát dữ liệu `strong user input validation`. Điều đó yêu cầu càng nhiều sự hạn chế trong các dữ liệu không đáng tin cậy càng tốt.

## Tổng kết

* Qua bài viết mình muốn giới thiệu cho các bạn cơ bản nhất về RCE, và nêu ra một số ví dụ, cách phòng tránh.
* Chúc các bạn kiểm soát lỗ hổng trong ứng dụng của bạn thành công!
* Các bạn có thể đọc bài viết gốc của mình: [Thực thi mã từ xa](https://manhnv.com/2019/06/thuc-thi-ma-tu-xa-remote-code-execution/)