Các bạn có thể đọc Phần 1 [tại đây](https://viblo.asia/p/nhung-lo-hong-security-lien-quan-den-viec-upload-file-phan-1-1Je5E9dA5nL).

## 3. Lỗ hổng Cross Site Scripting (XSS) khi download file
### 3.1 Khái quát
Khi user download file thì có trường hợp trình duyệt bị hiểu nhầm file type. Ví dụ, mặc dù ứng dụng giả định đó là file hình ảnh png, nhưng khi có bao gồm tag HTML trong dữ liệu hình ảnh thì tùy theo điều kiện có trường hợp trình duyệt sẽ hiểu nhầm là file HTML và chạy JavaScript trong file hình ảnh. Điều này được gọi là Cross Site Scripting khi download file (XSS).

Kẻ tấn công lợi dụng lỗ hổng này sẽ upload file hình ảnh hoặc file PDF có chứa HTML hoặc JavaScript lên rồi công khai. File này sẽ không được nhận diện là HTML trong cách tham chiếu đúng, nhưng khi kẻ tấn công đánh bẫy user thì file upload sẽ được nhận diện là HTML. Khi trình duyệt của user nhận diện file này là HTML thì tấn công XSS sẽ hình thành.

Đối sách đối với lỗ hổng XSS khi download file gồm những biện pháp như dưới đây:

* Thiết đặt đúng Content-Type của file
* Xác nhận xem phần đuôi hình ảnh và nội dung hình ảnh (magic byte) có tương ứng với nhau không 
* Trong file định download, chỉ định [Content-Disposition:attachment] làm Response Header

### 3.2 Kỹ thuật tấn công và ảnh hưởng
Trong mục này sẽ giới thiệu ví dụ kỹ thuật tấn công XSS khi download file. Kỹ thuật tấn công giới thiệu ở đây có thể tái hiện trong Internet Explorer (IE). Các trình duyệt khác ngoài IE có thể sẽ không tái hiện được.

**◆ XSS bằng file hình ảnh**

Có thể đặt bẫy tấn công XSS bằng cách upload lên 1 file hình ảnh giả mạo có chứa HTML hoặc JavaScript.

Ở đây chúng ta sẽ thấy, dù thực hiện đối sách ngăn không cho chạy Script trên Server đã giải thích ở Phần 1 thì vẫn có khả năng xảy ra tấn công Cross Site Scripting khi download.

Source code xử lý upload như sau:

Upload.php
```
<?php
$tmpfile = $_FILES["imgfile"]["tmp_name"]; 
$tofile = $_FILES["imgfile"]["name"];

if (!is_upload_file($tmpfile)){
     die('File have not been uploaded');
     }  else if(!move_uploaded_file($tmpfile,'img/'.@tofile)){
           die('Cannot upload file');
     }
$imgurl='img/'.urlencode($tofile);
?>

<body>
    <a href="<?php echo htmlspecialchars(@imgurl); ?>"><?php echo htmlspecialchars($tofile, ENT_NOQUOTES, 'UTF-8');?></a>
    have been uploaded<br>
    <img src="<?php echo htmlspecialchars($imgurl); ?>">
</body>
```

Sau đó tạo file JavaScript như sau rồi đặt tên file là " image.png"
```
<scripe>alert('XSS');</script>
```

Upload file image giả mạo này lên (Upload.php). Sau đó click vào tên file ở màn hình thông báo Upload thành công. Lúc này đoạn mã lệnh Script sẽ được chạy.

Ảnh hưởng của tấn công XSS bằng file hình ảnh giống với trường hợp tấn công XSS thông thường khác. Nó có khả năng  giả mạo bằng cách lấy trộm giá trị cookie, lạm dụng chức năng Web, hay phishing bằng cách thay đổi màn hình...

### 3.3 Nguyên nhân làm phát sinh lỗ hổng
Trong các nguyên nhân làm phát sinh lỗ hổng XSS khi download file thì đặc tính đặc trưng của Internet Explorer cũng có một phần ảnh hưởng. Internet Explorer ngoài Content-Type Header của HTTP Response thì còn sử dụng phần đuôi mở rộng trên URL và nội dung file để nhận định file type. Đặc tính nhận định đó mặc dù không công khai nhưng có thể hiểu là nó được chia ra thành những trường hợp dưới đây.

**◆ Trường hợp nội dung là hình ảnh**

Ngoài Response Header Content-Type thì magic byte của file hình ảnh cũng được sử dụng để nhận định file type. Magic byte là chuỗi ký tự cố định được đặt vào đầu file để nhận diện file type. Ví dụ, magic byte của GIF, JPEG, PNG như sau:


| Image Type | Magic byte | 
| -------- | -------- |
| GIF     | GIF87a hoặc GIF89a     | 
| JPEG     | \xFF\xD8\xFF     | 
| PNG     | \x89PNG\x0D\x0A\x1A\x0A\     | 


Internet Explorer (7 trở về trước) sẽ tiến hành nhận diện file type như dưới đây trong thiết đặt mặc định.

⧫ Trường hợp magic byte đồng nhất với Content-Type

Trường hợp này thì sử dụng file type hiển thị trong Content-Type.

⧫ Trường hợp magic byte không đồng nhất với Content-Type

Trường hợp hiển thị file type mà magic byte và Content-Type khác nhau thì bỏ qua cả hai, thực hiện suy đoán file type từ nội dung của file. Cũng có trường hợp nếu tag HTML được bao gồm trong nội dung file thì nhận định là HTML. File PNG giả mạo đã giới thiệu ở [XSS bằng file hình ảnh] sẽ phù hợp trong trường hợp này. Trong file sample này không bao gồm magic byte hình ảnh, tuy nhiên dù có bao gồm magic byte nhưng lại mâu thuẫn với Content-Type thì cũng bị bỏ qua.

**◆ Trường hợp nội dung không phải là hình ảnh**

Trường hợp không phải là hình ảnh thì sẽ có đặc trưng như sau bất kể version nào của IE.

Đầu tiên, phụ thuộc vào việc IE có thể xử lý Content-Type hay không mà hoạt động sẽ thay đổi.

Trường hợp Content-Type thuộc xử lý của IE thì IE sẽ xử lý dựa theo loại Content-Type. Content-Type thuộc xử lý của IE sẽ được đăng ký vào HKEY_CLASSES_ROOT¥MIME¥Database¥Content Type của Registry. 

Trường hợp Content-Type không thuộc xử lý của IE, thì IE sẽ nhận định file type dựa trên phần đuôi mở rộng trong URL. 

### 3.4 Đối sách
Đối sách của lỗ hổng XSS khi download file là những biện pháp được thực hiện khi upload file và download file. 

**◆ Đối sách khi upload file**

Khi upload file thực hiện những biện pháp sau:
* Kiểm tra có phải là đuôi mở rộng được chấp nhận hay không
* Đối với hình ảnh thì xác nhận cả magic byte
Về biện pháp kiểm tra đuôi mở rộng thì đã giải thích trong đối sách của [ Chạy Script trên Server bằng file upload] (Phần 1)

Khi xác nhận magic byte của hình ảnh, đối với PHP có thể sử dụng hàm số getimagesize như sau:
```
array getimagesize (string $filename [, array $imageinfo]);
```

Hàm số này sẽ nhận tên file dưới dạng đối số, trả lại width,height của hình ảnh và dạng hình ảnh dưới dạng array. Dưới đây sẽ giới thiệu một vài giá trị và hằng số của các dạng hình ảnh thường được sử dụng. Chi tiết hãy tham chiếu hướng dẫn sử dụng của PHP.


| Giá trị | Hằng số |
| -------- | -------- | -------- |
| 1     | IMAGETYPE_GIF    |
| 2     | IMAGETYPE_JPEG     |
| 3     | IMAGETYPE_PNG     |


**◆ Đối sách khi download file**

Đối sách khi download file gồm những biện pháp như dưới đây:
* Thiết đặt đúng Content-Type
* Đối với hình ảnh, xách nhận magic byte
* Thiết đặt Content-Dispositon khi cần thiết

⧫ Thiết đặt đúng Content-Type

Khi xảy ra lỗ hổng XSS giả mạo file PDF thì nguyên nhân chủ yếu là do nhầm lẫn Content-Type. Nếu thiết đặt đúng Content-Type của dạng PDF là [application/pdf] thay vì application/x-pdf thì lỗ hổng sẽ không xảy ra. Việc thiết đặt đúng Content-Type là một xử lý cần thiết không chỉ riêng với IE mà còn đối với tất cả các trình duyệt khác.
 
⧫ Đối với hình ảnh, xác nhận magic byte

Khi download file, nếu xác nhận magic byte cả khi download thì dù vì một nguyên nhân nào đó mà file hình ảnh giả mạo trà trộn vào Web Server ta vẫn có thể thực hiện đối sách xác thực.

⧫ Thiết đặt Content-Disposition khi cần thiết

Nếu không mở file đã download bằng ứng dụng mà vẫn có thể download được, thì có phương pháp chỉ định Response Header là [ Content-Disposition: attachment]. Trường hợp này, khi Content-Type cũng thiết đặt là [ application/octet-stream] thì file type cũng có ý nghĩa là [file nên download]. Sau đây là ví dụ thiết đặt các Header này.

```
Content-Type:application/octet-stream
Content-Disposition: attachment
```


**◆ Các đối sách khác**

Các đối sách đã giải thích cho đến hiện tại chỉ xoay quanh việc kiểm tra các giới hạn tối thiểu cần thiết để ngăn chặn lỗ hổng. Ví dụ, chỉ với việc kiểm tra magic byte thì không thể xác nhận liệu có thể hiển thị thật sự trên trình duyệt của user hay không.

Vì thế, khi xem xét đặc tính của ứng dụng Web, cần kiểm tra xem có thực hiện những kiểm tra dưới đây hay không.
*  Kiểm tra các yếu tố khác ngoài kích cỡ size ra, như: width, height, sắc lượng...
*  Kiểm tra xem có thể đọc như hình ảnh hay không
*  Scan virus
*  Kiểm tra nội dung ( kiểm tra tự động hoặc thủ công)

         ⇨ Adult Content
         
         ⇨ Những nội dung xâm phạm đến quyền tác giả
         
         ⇨ Những nội dung đi ngược lại pháp luật, phong tục đạo đức
         
         ⇨ Khác
         
*Gửi hình ảnh bằng Domain riêng*

Từ khoảng năm 2009, đã xuất hiện các Web site gửi hình ảnh bằng Domain riêng khác với Domain dùng để cung cấp dịch vụ. Dưới đây là ví dụ những Web site gửi hình ảnh bằng Domain riêng.



| Tên site | Domain chính | Domain dùng cho hình ảnh |
| -------- | -------- | -------- |
| Yahoo! JAPAN     | yahoo.co.jp     | yimg.jp     |
| YouTube     | youtube.com     | ytimg.com    |
| ニコニコ動画     | nicovideo.jp    | nimg.jp    |
| Twitter     | twitter.com    | twimg.com    |
| Amazon.co.jp     | amazon.co.jp   | images-amazon.com    |

Đó đều là những Web site có lượng trao đổi thông tin nhiều, lý do phân ra Domain hình ảnh riêng để nâng cao tốc độ cũng thường gặp, tuy nhiên việc chia ra Domain hình ảnh riêng như vậy cũng có hiệu quả về mặt security.
Bằng việc chứa các nội dung như image, PDF,... vào một Domain riêng, thì dù xảy ra các loại tấn công XSS cũng sẽ không ảnh hưởng đến dịch vụ.


Hết.