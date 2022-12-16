Đối với dữ liệu của website phần lớn chúng ta đều lưu trữ trong CSDL tuy nhiên cũng có đôi lúc việc lưu trữ dữ liệu với file sẽ thuận tiện hơn rất nhiều do dễ dàng thay đổi chẳng hạn như lưu trữ thông tin truy cập CSDL cho ứng dụng web hoặc lưu trữ thông tin cấu hình email...

Việc nắm vững kiến thức về xử lý file và quyền hạn của file, thư mục (trong Linux) khi học PHP không những giúp bạn dễ dàng lưu trữ thông tin cho website mà còn giúp bạn tăng tính bảo mật cho các file và thư mục quan trọng.

Để biểu diễn cho dấu phân cách trong đường dẫn chúng ta sử dụng dấu \ trên hệ điều hành Windows còn trên Linux chúng ta sử dụng dấu /. Để đơn giản hóa khi biểu diễn ký tự phân cách trong đường dẫn PHP dùng hằng DIRECTORY_SEPARATOR để biểu diễn.

Ví dụ: 
```php
DEFINE('DS', DIRECTORY_SEPARATOR);
$path = 'www'.DS.'site'.DS.'admin';
//Biểu diễn cho đường dẫn tương đối $path = www/site/admin (trên Linux) và $path = www\site\admin (trên Windows)
```

Dưới đây là một số hàm thường sử dụng để xử lý file và thư mục trong PHP

1. is_file($path): trả về TRUE nếu $path tồn tại và là một file
2. is_dir($path): trả về TRUE nếu $path tồn tại và là một thư mục
3. file_exists($path): trả về TRUE nếu $path tồn tại và là một file hoặc thư mục
4. getcwd(): trả về chuỗi biểu diễn thư mục hiện tại đang làm việc
5. scandir($path): trả về một mảng chứa danh sách file và thư mục trong đường dẫn $path nếu $path là tên 1 thư mục tồn tại, nếu không trả về FALSE
Chúng ta xem qua một ví dụ đơn giản liệt kê các file và thư mục hiện hành:

```php
<?php
$path = getcwd();
$items = scandir($path);
//hoặc có thể viết là: $items = scandir('.');
echo "<p>Content of $path</p>";
echo '<ul>';
foreach ($items as $item) {
    echo '<li>' . $item . '</li>';
}
echo '</ul>';
?>
```

**Đọc file**

Để đọc file chúng ta sử dụng hàm fread($file, $length) và để ghi file chúng ta sử dụng hàm fwrite($file, $data). 

Ví dụ:

```php
<?php
$fp = @fopen('welcome.txt', "r");
   
if (!$fp) {
    echo 'File not found';
}
else
{
$data = fread($fp, filesize('welcome.txt'));
echo $data;
fclose($fp);
}
?>
```

Trong ví dụ trên chúng ta đọc file welcome.txt ở chế độ chỉ đọc (r) và để tránh trường hợp xảy ra lỗi khi không tìm thấy file chúng ta đặt ký tự @ trước hàm fopen(). Hàm filesize() sẽ trả về toàn bộ kích thước của file cần đọc. Sau khi đọc xong chúng ta đóng lại file qua hàm fclose() để xóa bỏ vị trí của con trỏ đang duyệt file.

**Ghi file**

```php
<?php
$filename = 'test.txt';
$content = "https://viblo.asia\n";
if (is_writable($filename)) {
    if (!$file= fopen($filename, 'a')) {
         echo "Cannot open file ($filename)";
         exit;
    }
    if (fwrite($file, $content) === FALSE) {
        echo "Không thể viết file ($filename)";
        exit;
    }
    echo "Ghi thành công. Đã ghi nội dung ($content) vào file ($filename)";
 
    fclose($file);
} else {
    echo "The file $filename is not writable";
}
?>
```

Trước khi thực hiện thao tác ghi file chúng ta nên kiểm tra file có quyền khi hay không bằng cách sử dụng hàm is_writeable($filename).

**Upload file**
Xử lý upload file là công việc mà chúng ta thường xuyên gặp nhất khi làm việc với file và form upload file cũng là nơi để hacker dễ dàng khai thác lỗ hỏng nhằm upload shellscript lên trên webserver. Vì vậy chúng ta cần kiểm tra kỹ định dạng file trước khi di chuyển nó sang thư mục được chỉ định trên website.

Để có thể upload được file chúng ta cần có input field với type="file" và trên form upload chúng ta cần chỉ định thuộc tính enctype="multipart/form-data"
```php
<?php
   if(isset($_FILES['image'])){
      $errors= array();
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp = $_FILES['image']['tmp_name'];
      $file_type = $_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
       
      $expensions= array("jpeg","jpg","png");
       
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="Chỉ hỗ trợ upload file JPEG hoặc PNG.";
      }
       
      if($file_size > 2097152) {
         $errors[]='Kích thước file không được lớn hơn 2MB';
      }
       
      if(empty($errors)==true) {
         move_uploaded_file($file_tmp,"images/".$file_name);
         echo "Success";
      }else{
         print_r($errors);
      }
   }
?>
<html>
   <body>
       
      <form action = "" method = "POST" enctype = "multipart/form-data">
         <input type = "file" name = "image" />
         <input type = "submit"/>
             
         <ul>
            <li>Sent file: <?php echo $_FILES['image']['name'];  ?>
            <li>File size: <?php echo $_FILES['image']['size'];  ?>
            <li>File type: <?php echo $_FILES['image']['type'] ?>
         </ul>
             
      </form>
       
   </body>
</html>
```

Khi người dùng submit form, file sẽ được upload lên thư mục tạm của webserver và tên của file đã upload cũng là một tên tạm thời do webserver sinh ra, do đó để di chuyển nó đến thư mục được chỉ định trên webserver chúng ta cần sử dụng hàm move_upload_file($ten_file_tam, $duong_dan_den_thu_muc_moi).

Tham khảo
- Tài liệu: http://hoclaptrinhweb.org/lap-trinh/hoc-php/247-bai-9-cac-ham-xu-ly-file-va-upload-file-trong-php.html
- Tài liệu : http://php.net/manual/en/features.file-upload.post-method.php