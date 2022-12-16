ImageMagick có thể giúp bạn thực hiện các thao tác từ đơn giản như: dịch chuyển, thay đổi kích thước, xoay, kéo xiên, thu phóng hỉnh, điều chỉnh màu sắc, vẽ vẵn bản, hình học... cho đến thêm các hiệu hứng phức tạp như các bộ lọc gotham, lomo, kelvin, toaster (bộ lọc phức tạp nhất) và nashville (bộ lọc phổ biến nhất).

# I. Giới thiệu

### a. ImageImagick là gì?

ImageMagick là bộ phần mềm (có thể gọi là thư viện) xử lí các file ảnh.

ImageMagick nổi tiếng do tương thích với nhiều định dạng ảnh và có giao diện (API) phong phú.

ImageMagick có thể giúp bạn thực hiện các thao tác từ đơn giản như: dịch chuyển, thay đổi kích thước, xoay, kéo xiên, thu phóng hỉnh, điều chỉnh màu sắc, vẽ vẵn bản, hình học... cho đến thêm các hiệu hứng phức tạp như các bộ lọc gotham, lomo, kelvin, toaster (bộ lọc phức tạp nhất) và nashville (bộ lọc phổ biến nhất).

### b. Imagick PHP là gì?

Imagick là một extension của PHP dùng để tạo và sửa đổi các ảnh sử dụng ImageMagick API.
### c. So sánh Imagick với GD

Cả Imagick và GD đều là extension của PHP, sử dụng với cùng mục đích là xử lý ảnh. Tuy nhiên, Imagick thể hiện sự vượt trội hơn so với GD.

Các type hỗ trợ: GD chỉ hỗ trợ các file JPG, PNG, GIF, WBMP, WebP, XBM và XPM files. Trong khi đó, Imagick hỗ trợ hơn 100 định dạng file khác nhau.

Các hàm hỗ trợ: Cả GD và Imagick đều hỗ trợ các hàm cơ bản như: resize, crop ảnh,  tạo ảnh là tổng hợp của các hình khối, text và các file ảnh khác, hỗ trợ các bộ lọc cho ảnh. Tuy nhiên, nếu bạn muốn nâng cao hơn, thì Imagick là sự lựa chọn tối ưu, do nó cung cấp khoảng hơn 300 hàm giúp bạn có thể xử lý ảnh một cách hiệu quả nhất.

Hiệu suất: Hiệu suất của GD và Imagick gần như là tương đương.

Coding style: Imagick có cấu trúc đơn giản hơn nhiều so với GD

Tính phổ biến: GD được include mặc định vào các version của PHP, do đó, GD được sử dụng và biết đến nhiều hơn so với Imagick.
# II. Cài đặt Imagick trên Ubuntu 12.04

Cài đặt imagemagick

```markdown
Default
sudo apt-get install imagemagick
```

Cài đặt imagemagick PECL extension

```markdown
Default
sudo apt-get install php5-imagick
```

Restart webserver

# III. Một số tính năng đặc trưng của Imagick

Thay đổi kích thước và định dạng ảnh
Chỉnh sửa hàng loạt ảnh với tốc độ nhanh
Thêm hiệu ứng cho ảnh
Loại bỏ các phần kém chất lượng trên ảnh
Hỗ trợ nhiều định dạng ảnh
Tạo ảnh động

# IV. Ví dụ

Lấy thông tin ảnh

```php
<?php
$im = new Imagick('image.jpg');

// get image length
$im->getImageLength();

// get image format
$im->getFormat();

// get image size
$im->getImageSize();

// get image file name
$im->getImageFilename();

// get image mime type
$im->getImageMimeType();

// get all information of image
$im->identifyimage();
?>
```

Thay đổi thuộc tính của ảnh

```php
<?php
$im = new Imagick('image.jpg');

// convert image with format jpg to png
$im->setImageFormat('png');

// resize image
$im->resizeImage(320, 240, Imagick::FILTER_LANCZOS, 1);

// change image quality
$im->setCompressionQuality(75);

// change dpi image
$im->setResolution(96, 96);

//write image
$im->writeImage('image.png');

?>
```

Tạo ảnh động

```php
<?php
$im = new Imagick();
$im->setFormat("gif");

$_FILES['image0']="/data/C4Drz.png";

$_FILES['image1']="/data/DuCIz.png";

$_FILES['image2']="/data/fwrko.png";

$_FILES['image3']="/data/GOWmh.png";

for ($i = 0; $i < sizeof($_FILES); ++$i) {

   $im = new Imagick();

   $im->readImage($_FILES["image$i"]);

   $im->setImageDispose(2);

   $im->setImageDelay(100);

   $im->addImage($frame);
}

$im->writeImages("/data/allimage.gif" , true);

?>
```

# V. Nguồn tham khảo

https://vi.wikipedia.org/wiki/ImageMagick

http://php.net/manual/en/book.imagick.php

http://www.imagemagick.org/script/index.php