## V. Phân tích và khai thác các lỗ hổng Directory traversal (tiếp)

### 5. Bypass lỗ hổng khi trang web sử dụng đường dẫn đầy đủ

Xét đoạn code **php** sau:

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    include('/home/Viblo/Desktop/DiretoryTraversal/' . $file);
}

?>
```

Khi nhận được giá trị tham số `$file` từ người dùng, hệ thống lấy nội dung từ đường dẫn đầy đủ bắt đầu từ `/home`. Yếu tố này có thể không trực tiếp hiển thị ra giao diện web (như bài lab dưới đây cho chúng ta biết trực tiếp sử dụng đường dẫn tuyệt đối) nên chúng ta có thể thử lùi nhiều thư mục tới thư mục gốc để đọc được file `/etc/passwd`:

```
  /home/Viblo/Desktop/DiretoryTraversal/../../../../../../../../etc/passwd
= /home/Viblo/Desktop/../../../../../../../etc/passwd
= /home/Viblo/../../../../../../etc/passwd
= /home/../../../../../etc/passwd
= /../../../../etc/passwd
= /etc/passwd
```

![](https://i.imgur.com/OQFJZkQ.png)

#### Phân tích lab **[File path traversal, validation of start of path](https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path)**

![](https://i.imgur.com/L6mFspd.png)

**Miêu tả:** Trang web chứa lỗ hổng Directory traversal trong mục hiển thị hình ảnh sản phẩm. Hệ thống kiểm tra giá trị tham số `filename` theo định dạng đường dẫn đầy đủ trong thư mục. Chúng ta cần khai thác để đọc nội dung file `/etc/passwd`.

Tham số `filename` trong trường hợp này là một đường dẫn đầy đủ.

![](https://i.imgur.com/5u61cPr.png)

Hệ thống chỉ nhận giá trị tham số `filename` bắt đầu bằng `/var/www/images/`, nếu không sẽ trả về thông báo lỗi:

![](https://i.imgur.com/iZhouuW.png)

Khi tham số `filename` bắt đầu bằng `/var/www/images/` hệ thống thực hiện tìm file tương ứng:

![](https://i.imgur.com/sUYJuAQ.png)

Bởi vậy, chúng ta chỉ cần xây dựng payload bắt đầu bằng `/var/www/images/`, sau đó sử dụng kỹ thuật lùi thư mục để trỏ tới file `/etc/passwd`:

`filename=/var/www/images/../../../etc/passwd`

![](https://i.imgur.com/VYCpUFx.png)

### 6. Bypass filter bằng null byte (`%00`)

- `%00` - null byte là kết quả mã hóa URL của một ký tự byte rỗng. Trong một số ứng dụng, chúng ta có thể sử dụng `%00` để kết thúc sớm một chuỗi, do các thành phần sau kí tự `%00` sẽ được hệ thống hiểu là các ký tự rỗng và sẽ không xử lý.

Xét đoạn code **php** sau: (lưu ý phiên bản **php** trước 5.3, đọc thêm [https://bugs.php.net/bug.php?id=39863](https://bugs.php.net/bug.php?id=39863))

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    $pattern = "/.html/";
    if (preg_match($pattern, $file)) {
        include($file);
    } else {
        echo "chỉ được đọc các file có phần mở rộng là .html";
        exit();
    }
}

?>
```

- Hàm `preg_match($pattern, $subject, $matches)`: trong đó `$pattern` là biểu thức Regular Expression, `$subject` là chuỗi cần kiểm tra, `$matches` là kết quả trả về, đây là một tham số truyền vào ở dạng tham chiếu và có thể bỏ trống. Kết quả trả về của hàm sẽ là true nếu so khớp, false nếu không so khớp.

Đoạn code trên sử dụng biểu thức chính quy (Regular Expressions) để kiểm tra chuỗi người dùng nhập có thỏa mãn điều kiện kết thúc bằng phần mở rộng `.html` hay không.

Như vậy payload chúng ta tạo ra cần có định dạng `X.html`. Có thể sử dụng ký tự null byte `%00` chèn vào trước `.html`, thu được payload `X%00.html`. Khi đó hệ thống chỉ xử lý chuỗi đầu vào là `X`.

![](https://i.imgur.com/by59iXD.png)

#### Phân tích lab **[File path traversal, validation of file extension with null byte bypass](https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass)**

![](https://i.imgur.com/RqCjNkb.png)

**Miêu tả:** Trang web chứa lỗ hổng Directory traversal trong mục hiển thị hình ảnh sản phẩm. Hệ thống kiểm tra giá trị tham số `filename` có thỏa mãn phần mở rộng file đúng yêu cầu định dạng. Chúng ta cần khai thác để đọc nội dung file `/etc/passwd`.

Xét request hiển thị file ảnh sau:

![](https://i.imgur.com/G4uglX5.png)

Từ miêu tả đề bài chúng ta thấy tham số `filename` phải có phần mở rộng là `.jpg`, hay nói cách khác là giá trị `filename` phải kết thúc bằng `.jpg`. Chúng ta có thể xây dựng payload kết thúc bằng `.jpg`, kết hợp với kí tự Null `%00` để "ngắt" bỏ phần đuôi `.jpg` đi:

`../../../etc/passwd%00.jpg`

![](https://i.imgur.com/1jIUpg4.png)

### 7. Bypass bằng các cơ chế URI (URI scheme)

Trong công nghệ máy tính, URI (viết tắt từ Uniform Resource Identifier) là một chuỗi ký tự được sử dụng để xác định, nhận dạng một tên hoặc một tài nguyên. Cụ thể, URI dùng để xác định tài nguyên bởi chính xác nơi lấy nó hoặc tên của nó, và có thể bằng cả hai. Ví dụ:

- https://viblo.asia/
- urn:isbn-13:978-1786469946
- view-source:https://viblo.asia/
...

Cấu tạo của một URI như sau:

`URI = scheme:[//authority]path[?query][#fragment]`

Trong đó:

- **scheme**: chính là giao thức mạng sử dụng để truyền dẫn dữ liệu, các giao thức phổ biến mà chúng ta biết là http, https, ftp, mailto, irc, ..., phân cách giao thức với phần còn lại bằng ký tự `:`.
- **authority** là phần tổ hợp bao gồm các phần nhỏ hơn
`authority = [userinfo@]domain[:port]`
- **userinfo**: Thông tin người dùng bao gồm tên đăng nhập và mật khẩu, chỉ sử dụng với các URL được bảo mật cần đăng nhập.
- **domain**: tên miền của website là ánh xạ 1 – 1 từ một tên có thể nhớ sang địa chỉ IP của máy chủ web nơi chứa nội dung trang web.
- **port**: Số cổng sử dụng bởi giao thức trên máy chủ.
- **path**: Đường dẫn đến nội dung trang web, đường dẫn này là đường dẫn trong nội bộ website, phân cách giữa thư mục cha và thư mục con bởi dấu gạch chéo (`/`).
- **query**: là chuỗi truy vấn, chứa các thông tin theo cặp tên/giá trị được gửi đến máy chủ web, mỗi cặp này cách nhau bởi dấu `&`.
- **fragment**: là các chỉ mục con của nội dung, được bắt đầu với dấu `#`.

![](https://i.imgur.com/KwZt7JM.png)

Để hiểu rõ hơn cách hoạt động của URI scheme, chúng ta xem xét đoạn code **php** sau:

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    // kiểm tra đường dẫn tuyệt đối
    if ($file[0] == '/') {
        echo "không được bắt đầu bằng /";
        exit;
    }
    // kiểm tra ../
    $filter = "../";
    $check = strpos($file, $filter);
    if ($check === false) {
        include($file);
    } else {
        echo "không được chứa ../";
        exit;
    }
}

?>
```

Đoạn code trên kiểm tra input người dùng, không được phép bắt đầu bằng `/`, không cho phép chứa chuỗi ký tự `../`. Đã hoàn toàn ngăn chặn tất cả các phương pháp tấn công trên, tuy nhiên, chúng ta có thể sử dụng **file URI scheme** để đọc file `/etc/passwd`.

- Payload 1: `file:///etc/passwd`

![](https://i.imgur.com/Zn5Bb1v.png)

- Payload 2: `php://filter/convert.base64-encode/resource=/etc/passwd`

![](https://i.imgur.com/GwfeSRN.png)

Payload này sẽ trả về nội dung tệp `/etc/passwd` ở dạng Base64 encode, chỉ cần decode sẽ thu được nội dung:

```php=
<?php

$encode_string = "VGhpcyBpcyBhIGJhc2U2NCBlbmNvZGUgc3RyaW5n";
echo base64_decode($string);

?>
```

![](https://i.imgur.com/SFEAKWJ.png)

![](https://i.imgur.com/Cn9wZ5u.png)

- Payload 3: `php://filter/read=convert.base64-encode/resource=/etc/passwd`

Cách hoạt động tương tự payload 2.

![](https://i.imgur.com/DPYt9IY.png)

- Payload 4: `php://filter/read=string.rot13/resource=/etc/passwd`

Payload trên sẽ trả về kết quả ở dạng **ROT13**:

![](https://i.imgur.com/gfY66m6.png)

Decode **ROT13** tại [https://rot13.com/](https://rot13.com/) thu được nội dung `/etc/passwd`:

![](https://i.imgur.com/2DmRdQI.png)

### 8. Directory traversal vulnerability via misconfigured **NGINX** alias

Khi config tệp `nginx.conf`, nếu không nắm vững khái niệm cũng như cách sử dụng của **alias** có thể sẽ dẫn tới lỗ hổng Directory traversal.

**Alias** (bí danh) có thể hiểu đơn giản như một shortcut thay thế cho một câu lệnh dài trong Linux. Cấu tạo của một câu lệnh **alias** như sau:

`alias [option] [name]='[value]'`

Trong đó:

- `alias`: khai báo sử dụng lệnh `alias`.
- `[option]`: các tùy chọn.
- `[name]`: câu lệnh rút gọn.
- `[value]`: câu lệnh đầy đủ.

Chúng ta cùng xem xét trường hợp sau, link github chứa toàn bộ source code sử dụng: [https://github.com/tkmru/nginx-alias-traversal-sample](https://github.com/tkmru/nginx-alias-traversal-sample).

Đầu tiên, clone tất cả mã nguồn về bằng lệnh `git clone https://github.com/tkmru/nginx-alias-traversal-sample.git`

![](https://i.imgur.com/bmnpVST.png)

Di chuyển tới thư mục `nginx-alias-traversal-sample`, chúng ta sẽ sử dụng [Docker](https://www.docker.com/) để dựng môi trường:

![](https://i.imgur.com/oKniY6K.png)

Build một image mới với tên `nginx-alias-traversal-sample` bằng lệnh `docker build -t nginx-alias-traversal-sample .`

![](https://i.imgur.com/n78RJzc.png)

Run image `nginx-alias-traversal-sample` bằng lệnh `docker run -dp 3000:80 nginx-alias-traversal-sample`:

![](https://i.imgur.com/pkg3vB2.png)

Kiểm tra các container đang chạy với lệnh `docker container ls`, chúng ta thấy server đã dựng thành công đang chạy trên cổng 3000 ánh xạ vào cổng 80:

![](https://i.imgur.com/7FWjr3c.png)

![](https://i.imgur.com/Esim68m.png)

Chúng ta cùng xem xét tệp nginx.conf bị config lỗi:

![](https://i.imgur.com/A4I6TZh.png)

```
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html;
    }

    location /static {
        alias /var/www/app/static/;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

Chú ý đoạn code sau:

```
location /static {
        alias /var/www/app/static/;
    }
```

Ban đầu đoạn code trên có mục đích khi người dùng truy cập tới `/static` sẽ được ánh xạ tới `/var/www/app/static/`. Nhưng cách config này chứa lỗ hổng Directory traversal, thật vậy, nếu chúng ta truy cập `/static../` thì thực tế hệ thống sẽ hiểu là `/var/www/app/static/../` hay `/var/www/app/`.

Dựa vào `Dockerfile` chúng ta thấy file `flag.txt` được đặt trong thư mục `/var/www/app/`:

![](https://i.imgur.com/IGxZtDE.png)

Chúng ta có thể khai thác lỗ hổng Directory traversal với payload: `/static/../flag.txt`, khi đó từ cách config lỗi `alias` chúng ta đang truy cập vào `/var/www/app/static/../flag.txt = /var/www/app/flag.txt`, đọc được file `flag.txt`:

![](https://i.imgur.com/5Tl76dz.png)

### 9. Tổng kết

Từ các mục trên, chúng ta đã biết một số lượng lớn các cách tấn công và khai thác các lỗ hổng Directory traversal. Sau khi phân tích chi tiết các đoạn code mẫu nhỏ phía trên, có lẽ chúng ta cũng đã biết cách viết code phòng chống dạng tấn công này. Chúng ta nên thử tự viết một chương trình đọc file và chống lại tất cả các cách khai thác trên.

Xem xét đoạn code **php** sau:

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    if ($file != 'song.html' && $file != 'datnuoc.html' && $file != 'chiecthuyenngoaixa.html') {
        echo "không tồn tại file yêu cầu";
        exit;
    } else {
        include($file);
    }
}

?>
```

Như chúng ta thấy, đoạn code trên trực tiếp so sánh giá trị biến `$file` với tất cả tên tệp (cho phép đọc bởi người dùng) có trong hệ thống, rất khó có thể bị tấn công lỗ hổng Directory traversal. Chúng ta cũng có thể tối ưu hóa hơn bằng cách liệt kê tất cả tên tệp (cho phép đọc bởi người dùng) vào trong một danh sách và tìm kiếm trong danh sách đó tham số `file` người dùng yêu cầu.

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/file-path-traversal](https://portswigger.net/web-security/file-path-traversal)
- [https://www.php.net/manual/en/security.filesystem.nullbytes.php](https://www.php.net/manual/en/security.filesystem.nullbytes.php)
- [https://en.wikipedia.org/wiki/List_of_URI_schemes](https://en.wikipedia.org/wiki/List_of_URI_schemes)
- [https://en.wikipedia.org/wiki/ROT13](https://en.wikipedia.org/wiki/ROT13)
- [https://httpd.apache.org/docs/2.4/configuring.html](https://httpd.apache.org/docs/2.4/configuring.html)
- [https://www.nginx.com/resources/wiki/start/topics/examples/full/](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
- [https://phoenixnap.com/kb/linux-alias-command#:~:text=Vim%20or%20nano-,What%20Is%20an%20Alias%20in%20Linux%3F,and%20avoiding%20potential%20spelling%20errors.](https://phoenixnap.com/kb/linux-alias-command#:~:text=Vim%20or%20nano-,What%20Is%20an%20Alias%20in%20Linux%3F,and%20avoiding%20potential%20spelling%20errors.)