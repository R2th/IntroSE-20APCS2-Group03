## I. Giới thiệu
Ngày nay, nhu cầu về sử dụng đồ hoạ đang bùng nổ rất mạnh mẽ, kéo theo sự phát triển không có điểm dừng của các thư viện đồ hoạ trong những năm gần đây. Tiêu biểu có thể kể đến OpenGL, DirectX,... Trong bài viết này mình xin giới thiệu một số hàm để thao tác, xử lý đồ hoạ trong ngôn ngữ lập trình PHP đó chính là GD.

### GD Là gì?
GD được ra đời bởi Thomas Boutell, GD là một mã nguồn mở, được xây dựng từ ANSI C và có giao diện cho nhiều loại ngôn ngữ lập trình khác nhau, có thể kể đến như Perl, Python, PHP.... Các lập trình viên thường sử dụng thư viện này để hỗ trợ cho việc vẽ biểu đồ, đồ hoạ, hình ảnh, hoặc bất kỳ một thứ gì khác mà nó hỗ trợ.

### SETUP
Hiện tại trên php version mới, đã support GD,  Bạn cũng có thể kiểm tra nếu GD được cài đặt trên hệ thống của bạn bằng cách sử dụng function `phpinfo()`.

Trường hợp server chưa được enable GD, bạn có thể setup theo hướng dẫn: 
[To enable GD-support configure PHP](http://php.net/manual/en/image.installation.php)
![](https://images.viblo.asia/bcfa9724-3ec8-4279-9aa6-02c10ba0644d.png)

## II. Một số hàm thông dụng

### imagecreate
Cú pháp 
```php
imagecreate ( int $width , int $height ) : resource
// Trong đó: $width và $height là kích thước hình cần tạo.
```
Hàm này hỗ trợ tạo nên một hình ảnh, chính xác hơn thì nó sẽ tạo ra một khung hình có kích thước, mà từ đó người dùng có thể thực hiện các thao tác khác tại đây. Bạn vui lòng xem các ví dụ bên dưới để hiểu rõ hơn.

```php
<?php
header("Content-Type: image/png");
$im = @imagecreate(210, 100)
    or die("Cannot Initialize new GD image stream");
$background_color = imagecolorallocate($im, 0, 0, 0);
$text_color = imagecolorallocate($im, 233, 14, 91);
imagestring($im, 10,25, 30,  "Framgia VietNam", $text_color);
imagepng($im);
imagedestroy($im);
```
Demo
![](https://images.viblo.asia/d1800399-7655-4740-8dfc-ed0bf7590d00.png)

### imagecreatefrompng
Cú pháp:
```php
imagecreatefrompng ( string $filename ) : resource
   ```
   
Bên cạnh việc tạo một typ jpg như trên, bạn cũng có thể tạo một khung ảnh để làm việc với một tấm hình PNG cho trước.

```php
<?php
function LoadPNG($imgname)
{
    /* Attempt to open */
    $im = @imagecreatefrompng($imgname);

    /* See if it failed */
    if(!$im)
    {
        /* Create a blank image */
        $im  = imagecreatetruecolor(150, 30);
        $bgc = imagecolorallocate($im, 255, 255, 255);
        $tc  = imagecolorallocate($im, 0, 0, 0);

        imagefilledrectangle($im, 0, 0, 150, 30, $bgc);

        /* Output an error message */
        imagestring($im, 1, 5, 5, 'Error loading ' . $imgname, $tc);
    }

    return $im;
}

header('Content-Type: image/png');

$img = LoadPNG('bogus.image');

imagepng($img);
imagedestroy($img);
?>
```
![](https://images.viblo.asia/65b88023-a549-406b-9dfe-ba86b5b2a12d.png)

Trong đó: `$filepath` là đường dẫn đến file hình ảnh cần khởi tạo.

Bạn cũng có thể thực hiện tương tự với một tấm hình JPEG với hàm ```imagecreatefromjpeg().```

### imagepng và imagejpeg

Trong quá trình thực hiện các thao tác của bạn lên khung ảnh, chắc chắn rằng lúc nào đó bạn sẽ cần lưu lại các thao tác đó, hoặc hiển thị chúng ra ngoài. Thì khi đó `imagepng()` và `imagejpeg()` sẽ là 2 lựa chọn của bạn. 

Cú Pháp:
```php
imagepng ( resource $image [, mixed $to = NULL [, int $quality = -1 [, int $filters = -1 ]]] ) : bool
```


Trong đó:

* `$image` là biến chứa đối tượng mà bạn đã thao tác lên đó.
* `$filepath` là đường dẫn nơi bạn lưu trữ file. Nếu không có, hoặc đường dẫn không tồn tại, đối tượng sẽ được xuất ra.
* `$quality` là mức độ nén, có giá trị từ 0 đến 9.
* `$filters` là bộ lọc cho phép giảm kích thước của hình ảnh.


ex:
```php
<?php
$im = imagecreatefrompng("test.png");

header('Content-Type: image/png');

imagepng($im);
imagedestroy($im);
?>
```


### imagedestroy
Bên cạnh việc khởi tạo một hình ảnh thì GD cũng cung cấp cho người sử dụng cách để huỷ đối tượng đó ra khỏi vùng nhớ.

Cú pháp:
```php
imagedestroy ( resource $image ) : bool
```

Ex:
```php
<?php
// create a 100 x 100 image
$im = imagecreatetruecolor(100, 100);

// alter or save the image

// frees image from memory
imagedestroy($im);
?>
```
### imagecolorallocate

Cú pháp
```php
imagecolorallocate ( resource $image , int $red , int $green , int $blue ) : int
```
Giúp khởi tạo một màu sắc kiểu RGB được truyền vào từ tham số của hàm.

Trong đó:
* `$image` là biến chứa đối tượng mà bạn đang thao tác lên đó.
* `$red, $green, $blue` chứa giá trị của 3 kênh màu RGB tương ứng.

Ex:
```php
<?php

$im = imagecreate(100, 100);

// sets background to red
$background = imagecolorallocate($im, 255, 0, 0);

// sets some colors
$white = imagecolorallocate($im, 255, 255, 255);
$black = imagecolorallocate($im, 0, 0, 0);

// hexadecimal way
$white = imagecolorallocate($im, 0xFF, 0xFF, 0xFF);
$black = imagecolorallocate($im, 0x00, 0x00, 0x00);

?>
```

### imagestring
Cú pháp:
```php
imagestring ( resource $image , int $font , int $x , int $y , string $string , int $color ) : bool
```

Hàm này cho phép vẽ một chuỗi ký tự.

Trong đó:
* `$image` là đối tượng bạn đang thao tác đến.
* `$font` là font chữ bạn mong muốn. Có thể chọn từ 1 đến 5 để sử dụng các font đã hỗ trợ sẵn, hoặc bạn cũng có thể load một font mới với hàm imageloadfont().
* `$x, $y` là toạ độ vị trí cần vẽ (toạ độ này được tính ở góc trên bên trái khi chuỗi được vẽ ra).
* `$string` là chuỗi cần vẽ.
* `$color` là màu sắc của chuỗi khi vẽ.

Ex:
```php
<?php
// Create a 100*30 image
$im = imagecreate(100, 30);

// White background and blue text
$bg = imagecolorallocate($im, 0, 0, 0);
$textcolor = imagecolorallocate($im, 0, 0, 255);

// Write the string at the top left
imagestring($im, 5, 0, 0, 'Hello world!', $textcolor);

// Output the image
header('Content-type: image/png');

imagepng($im);
imagedestroy($im);
```
![](https://images.viblo.asia/64d46bcd-94ea-4dc0-ac66-d2ba58cffb29.png)

### imagecopymerge

Hỗ trợ lấy một phần (hoặc toàn bộ) tấm ảnh này vẽ lên một tấm ảnh khác tại vị trí mong muốn.

Cú pháp:

```php
imagecopymerge ( resource $dst_im , resource $src_im , int $dst_x , int $dst_y , int $src_x , int $src_y , int $src_w , int $src_h , int $pct ) : bool
```
Trong đó:

* `$dst_im` là tấm ảnh được vẽ lên.
* `$src_im` là tấm ảnh cần lấy để vẽ.
* `$dst_x, $dst_y` là vị trí muốn vẽ trên tấm ảnh được vẽ.
* `$src_x, $src_y` là vị trí để bắt đầu lấy tấm ảnh.
* `$src_w, $src_h` là chiều rộng và chiều dài cần lấy từ tấm ảnh cần lấy.
* `$pct` là độ trong suốt của phần ảnh sau khi được vẽ lên, có giá trị từ 1 đến 100.

Ex:
```php
<?php
// Create image instances
$dest = imagecreatefromgif('php.gif');
$src = imagecreatefromgif('php.gif');

// Copy and merge
imagecopymerge($dest, $src, 10, 10, 0, 0, 100, 47, 75);

// Output and free from memory
header('Content-Type: image/gif');
imagegif($dest);

imagedestroy($dest);
imagedestroy($src);
?>
```


Tham khảo: [http://php.net/manual/en/ref.image.php](http://php.net/manual/en/ref.image.php)