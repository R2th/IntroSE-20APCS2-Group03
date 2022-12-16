Tiếp nối sau OS Command thì chắc hẳn vấn đề về lọc dữ liệu và phân quyền thư mục vẫn là sơ sót tạo tiền đề để OS Command có thể thực hiện được nhanh chóng hơn nếu như không được thực hiện phân quyền 1 cách đúng đắn.

Để tìm hiểu những nguy cơ cũng như là cách phòng chống cho các cuộc tấn công này 1 cách hiệu quả thì hôm nay chúng ta sẽ cùng đi tới 1 lỗ hổng tiếp theo đó chính là Path Traversal.
# PHẦN LÝ THUYẾT
## 1. Path Traversal
### 1.1 Path Traversal là gì?
Path traversal hay còn gọi là Directory traversal là một lỗ hổng bảo mật cho phép kẻ tấn công đọc các file TÙY Ý trên server. Nó dẫn đến việc bị lộ thông tin nhạy cảm của ứng dụng web như thông tin đăng nhập, một số file hoặc thư mục hệ điều hành.

Vì sao mình nói là TÙY Ý, bởi vì trên server sẽ có sự phân quyền và sở hữu đối với các file và folder, admin sẽ sử dụng Access Control List để quy định ai được sử dụng những file này nhằm mục đích gì (read, write, excute).
Còn Path Traversal sẽ thực hiện hành vi truy cập vào các file hay folder bị hạn chế truy cập như thế này.
![image.png](https://images.viblo.asia/29ed9f65-73c6-4a94-8eb0-ad9550058758.png)

### 1.2 Path Traversal có thể xuất hiện ở đâu?
Tương tự như OS Command Injection thì Path Traversal có thể xuất hiện ở bất kì đâu nếu không thực hiện các biện pháp như lọc các kí tự mà người dùng nhập vào và ràng buộc hoặc phân quyền rõ ràng cho file và folder được phép truy cập.
### 1.3 Nguyên nhân gây ra Path Traversal
Vẫn sẽ có 2 nguyên nhân chủ yếu là do vô tình hoặc cố tình.

Do lập trình viên chủ quan, không phân quyền thư mục rõ ràng và không lọc ra kí tự mà người dùng nhập vào có an toàn hay không. Từ đó kẻ tấn công có thể lợi dụng mà truy cập vào bằng các dấu phân cách thư mục mà truy cập và chỉnh sửa các file có trên hệ thống.

Cố tình vẫn là do nhiều nguyễn nhân sâu xa khác như cty nợ lương :v hoặc build lab.

## 2. Hacker có thể làm gì khi đã tấn công được vào hệ thống?
Trong một số trường hợp kẻ tấn công có thể ghi vào các file dữ liệu trên server và cho phép kẻ tấn công có thể thay đổi dữ liệu hay thậm chí là chiếm quyền điều khiển server.

Các thức tấn công sẽ như sau:

Ví dụ 1 trang web sẽ có tag load hình ảnh như thế này
```html
<img src="/loadImage?filename=218.png">
```
Và path chứa ảnh sẽ là như này ```/var/www/images/218.png```

Trong trường hợp này **loadImage** sẽ nhận tham số truyền vào là **filename** và lấy image từ trong path được load lên.

Kẻ tấn công có thể tấn công vào bằng cách truy cập vào
https://insecure-website.com/loadImage?filename=../../../etc/passwd

```/etc/passwd``` -> đường dẫn chứa thông tin của user trong hệ thống linux

Đường dẫn khi server nhận vào xử lý sẽ là như này
```/var/www/images/../../../etc/passwd (../ để trở ra 1 cấp thư mục)```

Và chuyện tới cũng tới, hệ thống sẽ thản nhiên thực hiện command từ phía back-end và trả ra reponse của file passwd.

## 3. Những trở ngại khi thực hiện tấn công
Nếu một ứng dụng tách hoặc chặn các dấu phân tách thư mục (/ hoặc \) từ tên tệp do người dùng cung cấp, thì chúng ta có thể vượt qua bằng nhiều kỹ thuật khác nhau.

Có thể sử dụng cách duyệt thư mục lồng nhau, chẳng hạn như **.... //** hoặc **.... \ /**, nó sẽ trả về về trình tự duyệt đơn giản khi trình tự bên trong bị loại bỏ.

Có thể sử dụng các non-standard encodings (mã hóa không có chuẩn) khác nhau, chẳng hạn như **..% c0% af** hoặc **..% 252f**, để bypass qua các filter đầu vào.

Nếu một ứng dụng yêu cầu tên file do người dùng cung cấp phải bắt đầu bằng base folder, chẳng hạn như ```/var/www /images```, thì chúng ta có thể áp dụng cách như sau:

```php
filename=/var/www/images/../../../etc/passwd 
(nó sẽ nhảy ra 3 cấp thư mục bên ngoài vừa đúng chỗ của folder etc)
```
Nếu ứng dụng yêu cầu tên file do người dùng cung cấp phải kết thúc bằng 1 đuôi file, chẳng hạn như **.png**, thì có thể sử dụng byte rỗng trước phần đuôi file được yêu cầu. 

Ví dụ: ```filename=../../../etc/passwd%00.png```

## 4. Ví Dụ
Chúng ta có cấu trúc project như thế này
![image.png](https://images.viblo.asia/d4caf0d4-1195-4fa2-b4f0-16cbe4ce047d.png)
Phần front-end
```html
<form name="formLoad" class="card" action="loadImg.php" method="GET">
    <div class="card-content">
      <p class="title">
        Path Traversal
      </p>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          <a onclick=loadImg() href="/?path=imgs">View</a>
        </span>
      </p>
      <p class="card-footer-item">
        <span>
          Share on <a href="#">Facebook</a>
        </span>
      </p>
    </footer>
  </form>
<script>
  function loadImg() {
    document.getElementById('formLoad').submit();
  }
```
// Code php sẽ như sau:
```php
<?php 
  if (isset($_GET['path'])) {
    $s = $_GET['path'];
    header('Location: '. $s);
    exit();
  }
```

Thay vì load ảnh nhưng chúng ta thay đổi path bằng đường dẫn của file txt trong folder txt sẽ nhận được nội dung từ trong đó.

![image.png](https://images.viblo.asia/236c4f28-8412-45a6-bc3f-a4be43accc3f.png)
![image.png](https://images.viblo.asia/f1d4ab03-271f-4915-b21d-f27234a96e30.png)

## 4. Cách ngăn chặn
### 4.1 Giai đoạn đang phát triển
- Lọc ra các kí tự đầu vào nhằm ngăn chặn người dùng sử dụng các dấu phân cách truy cập tới API hệ thống tệp.
- Xác thực đầu vào của người dùng trước khi xử lý bằng whitelist các giá trị được phép, còn nếu không thể tránh khỏi việc phải sử dụng path truy cập thì phải xác thực được nội dung cho phép truy cập (ví dụ như các kí tự phải hoàn toàn là chữ và số)
- Sau khi xác thực đầu vào, ứng dụng sẽ thêm đầu vào vào base directory và sử dụng API hệ thống để chuẩn hóa đường dẫn. Nó sẽ xác minh rằng đường dẫn được chuẩn hóa bắt đầu với base directory.
### 4.2 Giai đoạn release
Bằng cách sử dụng WAF (Web Application Firewall) chúng ta sẽ có thêm 1 lớp bảo mật nữa từ giai đoạn đang phát triển.

Cấu hình lọc các chuỗi đầu vào từ người dùng (tránh tình trạng chấm chấm xuỵt chấm chấm v.v.v.v) :v: 
# PHẦN THỰC HÀNH
## 1. Lab Cơ Bản
link: https://portswigger.net/web-security/file-path-traversal/lab-simple
Send tới Repeater 1 request gọi tới tên ảnh.

![image.png](https://images.viblo.asia/94ac27f2-1bb0-43a5-ad2b-53c227410e6a.png)

Thay vì tên ảnh chúng ta sẽ thay bằng đường dẫn của 1 file nào đó có trên linux

Ví dụ ở đây là file passwd

Trong bài lab OS Command Injection chúng ta đã biết được folder images nằm ở  ```/var/www/images``` cho nên khi đi ra 3 cấp folder chúng ta sẽ ra được chỗ thư mục ngang cấp với /var bao gồm etc, usr, .v.v.v

![](https://images.viblo.asia/89e97f3d-1cb1-4ef8-9dac-974e71a47861.png)
![image.png](https://images.viblo.asia/4f412a60-f7d7-460e-a55e-fb1cc26f643b.png)

## 2. Path Traversal (Absolute Path Bypass)
link: https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass
Nếu chúng ta thực hiện đường dẫn absolute như lab ở trên thì sẽ nhận lại “No such file”

![image.png](https://images.viblo.asia/8ddb9d6e-d2df-4ed0-a6a3-d004298abd6c.png)

Vì thế chúng ta sẽ chuyển sang đường dẫn relative và vẫn truy cập vào file passwd dễ dàng.

![](https://images.viblo.asia/fff52dd4-13c1-4169-a43e-db8319e51d98.png)
![image.png](https://images.viblo.asia/e1d6e11b-3881-4dee-80c1-0bc94e5697c7.png)

## 3. Path Traversal (Superfluous Url Decode)
link: https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode

Nếu sử dụng cả 2 cách trên thì cũng sẽ nhận lại “No such file” ngay.

Vì thế trong lab này có giải thích
>“The application blocks input containing path traversal sequences. It then performs a URL-decode of the input before using it.”
>
>Nôm na có nghĩa là nó sẽ decode url để truyền vào parameter trước khi thực hiện các function bên dưới back-end để xử lý.

Vì thế chúng ta sẽ truyền vào 1 url đã encode.
```
GET /image?filename=..%252f..%252f..%252fetc/passwd HTTP/1.1
```
Giải thích 1 chút:

> **%252f** được encode 2 lần, lần đầu là **%2f** là dấu /, sau khi encode **%2f** thêm 1 lần nữa sẽ trở thành **%252f**. 
Vì ứng dụng đã lọc đầu vào là các dấu phân cách folder và decode nên chúng ta phải áp dụng kỹ thuật này để nhằm cho ứng dụng hiểu rằng **%2f** (sau khi decode **%252f**) vẫn là parameter đúng.

![](https://images.viblo.asia/452a428a-b679-49ef-91b6-ebe3c3f374f2.png)
![image.png](https://images.viblo.asia/0b25ed6c-1775-4e66-8ce7-a4feec46e023.png)

## 4. Path Traversal (Validate of path)
link: https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path

Vẫn bắt lại request load ảnh chúng ta sẽ nhận được GET như thế này
```
GET /image?filename=/var/www/images/something.jpg HTTP/1.1
```

Có vẻ như ứng dụng yêu cầu phải load ảnh từ base dir (cụ thể là từ **/var/www**)

Nhưng không sao, chúng ta có thể quay xe bằng các thêm vào đằng sau base directory để thỏa mãn điều kiện :v (dống như bài 1)

![](https://images.viblo.asia/f3876978-99bb-41ee-b0a1-7cca2f9cb8f2.png)
![image.png](https://images.viblo.asia/6b99ef05-0bcd-4637-8079-d8327669b1da.png)

## 5. Path Traversal (Validate File Extension Null Byte Bypass)
link: https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass

>Lab đã bảo trước cho chúng ta “The application validates that the supplied filename ends with the expected file extension.”
>
>Nôm na có nghĩa là nó sẽ validate theo điều kiện là phải có đuôi file.

Chả nhẽ chúng ta phải nhập vào ```/etc/passwd.png``` (thế thì phèn quá mà cũng chã thành công :v)
Như mình đã đề cập ở phần 3, chúng ta có thể thêm vào 1 byte rỗng trước đuôi file để bypass qua điều kiện này.

![](https://images.viblo.asia/1e66dab6-843f-48c0-add5-c152ed85dcaa.png)

Vậy là chúng ta đã bypass qua bằng cách đỡ phèn hơn :v: 

![image.png](https://images.viblo.asia/015def6a-fdaf-41bb-8c7d-2bee66fd6ebb.png)

# Tài Liệu Tham Khảo
- PortSwigger: https://portswigger.net/web-security/file-path-traversal
- Linux Command - Cheat Sheet: https://gist.github.com/riipandi/3097780