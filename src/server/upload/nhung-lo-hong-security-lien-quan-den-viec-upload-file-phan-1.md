Upload, Download file là những chức năng thường có trên các ứng dụng Web, App. Tuy nhiên ít ai biết được khi implement function này sẽ có những lỗ hổng như thế nào tạo thành security injection.
Trong series này mình sẽ giới thiệu các lỗ hổng thường phát sinh trong chức năng upload file hoặc download file.

## 1. Khái quát các vấn đề khi upload, download file
Có những trường hợp tấn công dưới đây đối với việc upload, download file:
*     Tấn công DoS đối với chức năng upload
*     Tấn công chạy file Script trên Server 
*     Tấn công khiến người sử dụng download file có chứa mã độc
*     Download vượt quá quyền hạn của file

Dưới đây mình sẽ giải thích từng trường hợp tấn công.

### 1.1 Tấn công DoS đối với chức năng upload
Đối với chức năng upload của ứng dụng Web, có khả năng sẽ bị tấn công DoS ( Denial of Service Attack) làm chiếm dụng một lượng tài nguyên khổng lồ trong Website bằng cách liên tục gửi những file có dung lượng lớn. 

![](https://images.viblo.asia/f79f482f-1a68-41ce-a0a8-1044ad635e8f.png)

Tấn công DoS sẽ gây ra những ảnh hưởng như làm giảm tốc độ xử lý, hay trường hợp xấu nhất là làm ngưng hoạt động Server.

Trong các đối sách đối với loại tấn công này thì giới hạn dung lượng file upload là một biện pháp rất hữu hiệu. Đối với PHP, có thể giới hạn dung lượng của chức năng upload bằng config php.ini. 

| Tên biến| Ý nghĩa | Default value |
| -------- | -------- | -------- |
| file_uploads     | Có thể sử dụng chức năng upload file không?    | ON     |
| upload_max_filesize     | Dung lượng tối đa của mỗi file     | 2MB     |
| max_file_uploads     | Số lượng file tối đa có thể gửi     | 20    |
| post_max_size     | max body size của POST Request     | 8MB     |
| memory_limit     | max size memory     | 128MB    |

Trường hợp ứng dụng không cung cấp chức năng upload file, hãy thiết đặt file_uploads là Off.

Hoặc cũng có thể limit Request body size bằng config httpd.conf của Apache. Thiết đặt này có thể sử dụng ở các ngôn ngữ khác ngoài PHP, đồng thời còn có thể set error request bằng cách kiểm tra ở giai đoạn ban đầu nên rất hữu hiệu trong việc nâng cao khả năng chống lại tấn công DoS. Dưới đây là config trong trường hợp thu nhỏ body size của Request còn 100Kb.
```
LimitRequestBody 102400
```

Về phương pháp giới hạn của các ngôn ngữ khác thì hãy tham chiếu hướng dẫn sử dụng của từng ngôn ngữ.

**Chú ý: **

*Nội dung đã giải thích ở trên chỉ xoay quanh việc kiểm tra dung lượng của file đã được upload. Tuy nhiên, để nâng cao khả năng chống lại tấn công DoS thì nên kiểm tra cả những tham số khác. Ví dụ, khi xử lý file trên Server thì kích cỡ file sau khi giải nén sẽ đáng chú ý hơn kích cỡ file khi nén lại.
Vì thế, không chỉ cần check dung lượng file khi upload lên mà còn phải tính đến dung lượng file sau khi giải nén ra (nếu có) và cố gắng kiểu tra ngay trong giai đoạn đầu.*

### 1.2 Chạy file Script trên Server 
Trường hợp user upload file script lên server thì có thể gây ra những ảnh hưởng như làm rò rỉ thông tin, sửa đổi làm giả file, tấn công đến server khác,...

![](https://images.viblo.asia/f730df11-8969-402c-b8ab-4fc7cc8b1082.png)

### 1.3 Tấn công khiến user của hệ thống download file có chứa mã độc
Trường hợp tấn công thứ 3 lợi dụng uploader là trường hợp kẻ tấn công upload lên một file có chứa mã độc. Khi user khác truy vấn file đó, có thể sẽ xảy ra tình huống như chạy Script trên PC của user hoặc bị nhiễm malware.
![](https://images.viblo.asia/658bd9e8-4dc6-4527-8974-6ab5a452cc44.png)

Lý do chạy JavaScript khi download là bởi hiểu nhầm file đã upload thành HTML trong trình duyệt. 

Mặt khác, kỹ thuật làm nhiễm malware khi download file là kỹ thuật lợi dụng lỗ hổng của program mở file download.

Trường hợp người sử dụng bị nhiễm malware do file download thì trách nhiệm trực tiếp đối với việc bị nhiễm thuộc về người đã upload malware, nhưng có trường hợp phía vận hành uploader cũng phải chịu trách nhiệm. Vì thế, khi kiểm tra spec dịch vụ của Website, phải dựa vào tính chất của Website để quyết định có thực hiện đối sách malware trên site hay không.

### 1.4 Download vượt quá quyền hạn của file
Một vấn đề khi download fille là trường hợp file vốn dĩ chỉ có user có quyền hạn mới có thể download được thì user không có quyền hạn vẫn có thể download được. 

Nguyên nhân của vấn đề này đó là trong nhiều trường hợp, giới hạn truy cập đối với file không được đặt ra và file có thể được download dựa trên việc suy đoán URL.


*Tiếp theo mình sẽ trình bày rõ các phương thức tấn công và các phòng tránh *

## 2. Chạy Script trên Server bằng file upload
### 2.1 Khái quát
Trong uploader có phần lưu file do user upload vào public directory của Web Server. Nếu có thể upload các file có đuôi mở rộng là script của các ngôn ngữ như php, asp, aspx, jsp… thì có thể chạy Script file đã upload trên Web Server.

Khi chạy một Script được gửi từ bên ngoài vào có thể gây ra những ảnh hưởng tương tự như OS Command Injection. Cụ thể những ảnh hưởng đó như sau: 
*      Truy vấn, làm giả, sửa đổi, xóa file trong Web Server
*      Gửi mail ra bên ngoài
*      Tấn công đến Server khác
*      
Để ngăn chặn việc chạy Script trên Server bằng file upload có thể thực hiện một trong hai biện pháp sau hoặc thực hiện đồng thời cả hai biện pháp.
*      File do user upload lên không đưa vào public directory
*      Giới hạn file upload (không cho upload file script)
     
### 2.2 Kỹ thuật tấn công và ảnh hưởng
Giả sử chúng ta đã implement màn hình Upload file như sau:
```
<body>
    <form action="upload.php" method="POST"
          enctype="multipart/form-data">
          File:<input type="file" name="imgfile" size="20"><br>
         <input type="submit" value="Upload">
    </form>
 </body>
```

*upload.php*
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

Đến đây là ta đã có màn hình Upload file rồi nhé. Tuy nhiên, thay vì upload file image thì chúng ta sẽ upload file script dưới đây.

*acttack.php*
```
<pre>
    <?php
       system('bin/cat etc/passwd');
    ?>
</pre>
```

PHP Script này gọi ra lệnh cat bằng hàm system, rồi hiển thị nội dung của /etc/passwd. 
Sau khi upload file script thì trên màn hình trình duyệt sẽ hiển thị là " *acttack.php* have been uploaded".
Click vào link *acttack.php* trên màn hình thì sẽ chạy script và hiển thị ra nội dung etc/passwd

### 2.3 Nguyên nhân làm phát sinh lỗ hổng
Lỗ hổng chạy Script file upload xảy ra khi thỏa mãn những điều kiện sau:
*      File upload được lưu vào public directory 
*      Có thể upload các file script
Đối với uploader, khi tạo ra một ứng dụng phù hợp hai điều kiện trên thì sẽ trở thành nguyên nhân sinh ra lỗ hổng. Vì thế, việc không thỏa mãn ít nhất một trong hai điều kiện nêu trên trở thành đối sách giải quyết của lỗ hổng này.

### 2.4 Đối sách
Như đã giải thích ở trên, hai điều kiện để chạy Script file upload là khi file được lưu vào public directory và user có thể chỉ định file script để upload.

Phá vỡ một trong hai điều kiện trở thành đối sách giải quyết của vấn đề này, tuy nhiên vì có trường hợp spec yêu cầu cho phép upload file script nên ta sẽ đi vào giải quyết vấn đề "không lưu file upload vào public directory" 

Sửa file *upload.php* lại như sau

```
<?php
function get_upload_file_name(tofile){
   //giản lược
}

$tmpfile = $_FILES["imgfile"]["tmp_name"]; 
$tofile = $_FILES["imgfile"]["name"];

if (!is_upload_file($tmpfile)){
     die('File have not been uploaded');
     }  
     
 $tofile=get_upload_filename($orgfile);
 if(!move_uploaded_file($tmpfile,$tofile)){
           die('Cannot upload file');
     }
$imgurl='download.php?file=' .basename($tofile);
?>

<body>
    <a href="<?php echo htmlspecialchars(@imgurl); ?>"><?php echo htmlspecialchars($orgfile, ENT_NOQUOTES, 'UTF-8');?></a>
    have been uploaded<br>
    <img src="<?php echo htmlspecialchars($imgurl); ?>">
</body>
```

Code upload đã được chỉnh sửa ở 2 chỗ. Trước tiên là thay đổi nơi chứa file từ public directory (/img) thành tên file mà hàm get_upload_file_name trả lại, sau đó tạo url image (download.php). 

Dưới đây là source của hàm get_upload_file_name.  
```
define('UPLOADPATH', '/var/upload');

function get_upload_file_name($tofile) {
//check đuôi file
   $info = pathinfo($tofile);
   $ext = strtolower($info['extension']); //lowercase extension
   if($ext !='gif'&& $ext !='jpg'&& $ext !='png'){
        die('error msg');
        }
    // gen uniqued file name
    $count = 0;
    do {
         $file = sprintf('%s/%08x.%s', UPLOADPATH, mt_rand(), $ext);
         //create file. Nếu file đã tồn tại thì out error
         $fp = @fopen($file, 'x');
    } while($fp === FALSE && ++$count <10);
    if($fp === FALSE){
        die ('error msg');
    }
    fclose($fp);
    return $file;
}
```

Tại hàm get_upload_file_name, trước tiên lấy phần đuôi mở rộng, xác nhận xem có phải là một trong ba đuôi gif, jpg hay png không.
Tiếp theo, sau khi sử dụng số ngẫu nhiên tạo tên file không trùng lặp mang phần đuôi mở rộng ban đầu thì kiểm tra xem tên file có bị trùng lặp hay không. Lý do thiết đặt option ‘x’ của fopen rồi mở file sau khi tạo tên file là vì sẽ xảy ra lỗi trong trường hợp file đã tồn tại. Trong trường hợp đó thì tạo lại file rồi lặp lại thao tác nêu trên. Cứ lặp lại thao tác đó cho đến khi fopen không còn xảy ra lỗi. Tuy nhiên, cũng có trường hợp xảy ra lỗi bởi một lý do khác ngoài lý do xung đột tên file nên trong trường hợp số lần tạo lại tên file vượt quá 10 lần thì ngừng xử lý. 

Sau đó đóng file lại. File đã được tạo ở đây sẽ không bị xóa mà cho phép viết đè lên bằng hàm move_uploaded_file. Nếu xóa file này thì tính duy nhất của tên file sẽ không được đảm bảo.

Tiếp theo, dưới đây là source của *download.php*
```
<?php
   // Note : có lỗ hổng XSS trong cách implement này
   define('UPLOADPATH', '/var/upload');
   $mimes = array('gif' => 'image/gif', 'jpg' => 'image/jpg', 'png' => 'image/png');
   $file = $_GET('file');
   $info = pathinfo('file'); //get file info
   $ext = strtolower($info['extension']);
   $content_type = $mimes[$ext]; //get Content-Type
   if(!$content_type){
        die('error msg');
   }
   header('Content-Type:'.$content_type);
   readfile(UPLOADPATH.'/'.basename($file));
?>
```

Script này chỉ định tên file bằng querystring file. Trước tiên, trường hợp lấy đuôi mở rộng mà đuôi mở rộng khác gif, jpg, png thì set error. Sau đó, sau khi output Content-Type ứng với mỗi phần đuôi mở rộng thì đọc lấy dữ liệu của file bằng hàm readfile rồi giữ nguyên output ra. Việc cho tên file đã nhận được bằng querystring vào hàm basename là đối sách của lỗ hổng Directory Traversal. 

Bằng đối sách hiện tại có thể ngăn được việc chạy script file upload. Tuy nhiên, trong Script này trường hợp user dùng Internet Explorer (IE) thì có khả năng sẽ gặp tấn công Cross Site Scripting. 


[Còn tiếp..]