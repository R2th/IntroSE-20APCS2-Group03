## V. Phân tích và khai thác các lỗ hổng Directory traversal

### 1. Lỗ hổng xảy ra khi sử dụng các hàm đọc file và tin tưởng đầu vào người dùng

Xét đoạn code **php** sau:

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    include($file);
}

?>
```

![](https://i.imgur.com/pcP35Df.png)

Chúng ta có thể hiểu đoạn code trên hoạt động như sau: Hệ thống nhận giá trị biến `$file` được người dùng truyền lên bằng phương thức **GET**, sau đó sử dụng hàm `include()` hiển thị nội dung file `$file` cho người dùng.

Nhận thấy rằng hệ thống tin tưởng tuyệt đối đầu vào từ người dùng bởi đoạn code trên không có bất kì hành động filter nào đối với biến `$file`. Do đó ở đây xảy ra lỗ hổng Directory traversal: người dùng có thể đọc file tùy ý trong server. Chẳng hạn, chúng ta có thể đọc nội dung file `/etc/passwd`:

![](https://i.imgur.com/5XP4Cqn.png)

#### Phân tích lab [File path traversal, simple case](https://portswigger.net/web-security/file-path-traversal/lab-simple)

![](https://i.imgur.com/4hCxtzr.png)

**Miêu tả:** Trang web chứa lỗ hổng Directory traversal trong mục hiển thị hình ảnh sản phẩm. Chúng ta cần khai thác để đọc nội dung file `/etc/passwd`.

Các sản phẩm đều có ảnh chi tiết:

![](https://i.imgur.com/VIm7bqG.png)

Quan sát source code nhận thấy các đường link tải ảnh:

![](https://i.imgur.com/iwXh6Pm.png)

Hoặc có thể click chuột phải vào ảnh, chọn "Open image in new web" cũng có thể thu được URL tải ảnh:

![](https://i.imgur.com/8NR8yan.png)

Quan sát request trong Burp Suite:

![](https://i.imgur.com/xF7zUXb.png)

Ảnh được tải từ thư mục `/image`, xác định bằng tham số `filename` có thể sửa đổi bởi người dùng. Ở đây chúng ta có thể dự đoán các file ảnh được lưu trong thư mục `/var/www/images/`, khi đó chúng ta có thể khai thác lỗ hổng Directory traversal bằng cách lùi lại 3 thư mục, sau đó trỏ tới file `/etc/passwd`:

`/image?filename=../../../etc/passwd`

Thực tế chúng ta khó dự đoán các file ảnh được lưu trong thư mục nào nên có thể thử lùi lần lượt với số thư mục lùi tăng dần: `../etc/passwd`, `../../etc/passwd`, `../../../etc/passwd`, ...

![](https://i.imgur.com/IbAKwVm.png)

Lưu ý rằng, do tệp `/etc/passwd` nằm ngay dưới thư mục gốc nên có thể trực tiếp lùi với số lượng thư mục lớn (Do không thể lùi quá thư mục gốc):

![](https://i.imgur.com/sGZWZby.png)

### 2. Bypass filter bằng cách sử dụng đường dẫn tuyệt đối

Đường dẫn tuyệt đối của một tệp tin hay thư mục đều bắt đầu bởi thư mục gốc `/` (root) và theo cây, theo nhánh, cho đến thư mục hoặc tệp mà bạn mong muốn. Tóm lại, một đường dẫn tuyệt đối là đường dẫn bắt đầu bởi `/` (root).

Xét đoạn code **php** sau:

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    $filter = "../";
    $check = strpos($file, $filter);
    if ($check === false) {
        include($file);
    } else {
        echo "Phat hien tan cong Directory traversal!";
        exit();
    }
}

?>
```

- Hàm `strpos($string, $substring, $position)` sẽ trả về vị trí đầu tiên xuất hiện của chuỗi con `$substring` trong chuỗi `$string`, bắt đầu tìm kiếm từ vị trí `$position` (Nếu không có tham số `$position` sẽ mặc định tìm từ đầu chuỗi). Nếu chuỗi con không xuất hiện, trả về `false`.

So với đoạn code trong mục 1, chúng ta nhận thấy hệ thống có thêm cơ chế kiểm tra đầu vào từ người dùng: sử dụng hàm `strpos()` kiểm tra biến `$file` nếu chứa chuỗi ký tự `../` sẽ trả về thông báo cảnh cáo và thoát khỏi chương trình.

![](https://i.imgur.com/PjrY602.png)

Tuy nhiên, chúng ta thấy khi biến `$file` không chứa chuỗi `../` thì hệ thống sẽ thực hiện trực tiếp đoạn mã `include($file);`. Bởi vậy chúng ta vẫn có thể đọc được nội dung file `/etc/passwd` bằng cách sử dụng đường dẫn tuyệt đối `/etc/passwd`:

![](https://i.imgur.com/KqR1pQC.png)

#### Phân tích lab **[File path traversal, traversal sequences blocked with absolute path bypass](https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass)**

![](https://i.imgur.com/q3C7LtH.png)

**Miêu tả:** Trang web chứa lỗ hổng Directory traversal trong mục hiển thị hình ảnh sản phẩm. Hệ thống chứa một lớp ngăn chặn tấn công lỗ hổng này nhưng trực tiếp tìm kiếm nội dung file với đầu vào người dùng. Chúng ta cần khai thác để đọc nội dung file `/etc/passwd`.

Thực hiện đọc nội dung tệp `/etc/passwd` bằng cách lùi thư mục với `../` nhưng luôn nhận được phản hồi "No such file":

![](https://i.imgur.com/1wJ3AlS.png)

Có thể trang web đã ngăn chặn chuỗi ký tự `../`. Do miêu tả bài lab cho biết trang web trực tiếp lấy nối dung file với đầu vào từ người dùng (nghĩa là không có bước xử lý nào khác). Bởi vậy có thể bypass cơ chế ngăn chặn này bằng cách sử dụng đường dẫn tuyệt đối tới `/etc/passwd`:

![](https://i.imgur.com/VNEDSNL.png)

### 3. Bypass filter loại bỏ trực tiếp `../`

Một số trang web sử dụng cơ chế ngăn chặn loại bỏ chuỗi ký tự lùi thư mục `../`. Xét đoạn code **php** sau:

```php=
<?php

if (isset($_GET['file'])) {
    $file = $_GET['file'];
    $search = "../";
    $replace = "";
    $file_removed_traversal = str_replace($search, $replace, $file);
    include($file_removed_traversal);
    exit();
}

?>
```

- Hàm `str_replace($search, $replace, $string)` sẽ tìm kiếm và thay thế tất cả chuỗi `$search` thành `$replace` trong chuỗi `$string`.

Đoạn code trên kiểm tra kí tự đầu tiên của `$file` có phải `/` không để ngăn chặn sử dụng đường dẫn tuyệt đối. Sau đó tìm kiếm và loại bỏ (thực chất là thay thế bằng kí tự trắng) tất cả các chuỗi con `../`.

Như vậy chúng ta không được phép sử dụng đường dẫn tuyệt đối. Chú ý rằng hàm `str_replace()` chỉ hoạt động một lần, tức là nếu chúng ta truyền vào chuỗi `X../Y` thì biến `$file` sẽ trở thành `XY`, nếu chuỗi con `XY` chứa `../` thì vẫn có thể tấn công lỗ hổng Directory traversal như bình thường. Do đó, chúng ta có thể xây dựng payload như `..././` hoặc `....//`.

![](https://i.imgur.com/Mrug2un.png)

![](https://i.imgur.com/juzAY7u.png)

#### Phân tích lab **[File path traversal, traversal sequences stripped non-recursively](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively)**

![](https://i.imgur.com/YTV3zU8.png)

**Miêu tả:** Trang web chứa lỗ hổng Directory traversal trong mục hiển thị hình ảnh sản phẩm. Hệ thống chứa một lớp ngăn chặn tấn công lỗ hổng bằng cách loại bỏ các chuỗi kỳ tự lùi thư mục. Chúng ta cần khai thác để đọc nội dung file `/etc/passwd`.

Mặc dù đã thực hiện lùi thư mục nhưng chúng ta vẫn thu được phản hồi chứa nội dung file ảnh `15.jpg`:

![](https://i.imgur.com/kuB4ryn.png)

Điều này chứng tỏ hệ thống đã loại bỏ các chuỗi ký tự `../`. Dự đoán hệ thống chỉ xử lý input từ người dùng một lần, nên chúng ta có thể bypass cơ chế này bằng cách lùi thư mục với `....//` hoặc `..././`:

![](https://i.imgur.com/NhOWaDZ.png)

![](https://i.imgur.com/sG1uzfG.png)

### 4. Trường hợp hệ thống decode input người dùng bằng các thuật toán

Thông qua việc thử để phát hiện các thuật toán encode được sử dụng (Ví dụ Base64, MD5, ...), sau đó chúng ta chỉ cần thêm một bước mã hóa payload theo thuật toán tương ứng, và khai thác các lỗ hổng Directory traversal như bình thường.

#### Phân tích lab **[File path traversal, traversal sequences stripped with superfluous URL-decode](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)**

![](https://i.imgur.com/QLtSYBK.png)

**Miêu tả:** Trang web chứa lỗ hổng Directory traversal trong mục hiển thị hình ảnh sản phẩm. Hệ thống chứa một lớp ngăn chặn các chuỗi ký tự lùi thư mục như `../`, và thực hiện decode input người dùng trước khi sử dụng chúng. Chúng ta cần khai thác để đọc nội dung file `/etc/passwd`.

Tấn công lùi thư mục bình thường nhận được phản hồi "No such file"

![](https://i.imgur.com/86oiwm1.png)

Kiểm tra cơ chế decode input người dùng của hệ thống:

![](https://i.imgur.com/N12cb6K.png)

![](https://i.imgur.com/qXBiNyM.png)

Bởi vậy chúng ta chỉ cần encode URL payload của chúng ta để đọc nội dung file `/etc/passwd`, lưu ý cần encode 2 lần do bản thân thanh URL sẽ decode payload của chúng ta 1 lần:

![](https://i.imgur.com/r7WySx0.png)

![](https://i.imgur.com/6dXQe2O.png)

## Các tài liệu tham khảo

- [https://portswigger.net/web-security/file-path-traversal](https://portswigger.net/web-security/file-path-traversal)