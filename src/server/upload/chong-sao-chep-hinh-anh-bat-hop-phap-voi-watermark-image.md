# watermark image là gì?
Gần đây mình thấy trên viblo có mội số bài viết khá hay và chất lượng. Nhưng điều đáng buồn là các trang web về công nghệ khác đã copy các bài viết này mà không xin phép tác giả hay có thì cũng chỉ là ghi link tới bài viết rất nhỏ ở cuối bài.
Cũng chính vì lý do đó mà các tác giả của viblo gần đây đã gắn thêm watermark vào hình ảnh của mình. 

Như chính bài này sau 1 thời gian thì cũng đã bị copy https://topdev.vn/blog/chong-sao-chep-hinh-anh-bat-hop-phap-voi-watermark-image/ tại trang này. :joy::joy::joy::joy::joy: 

dưới đây là 1 ví dụ về watermark: 
![](https://images.viblo.asia/a8d172b1-d2b7-449e-93bd-b65afe49527d.jpg)

bạn có thể thấy ở góc bottom-right có ảnh cái mẹt của mình. và như để khẳng định nguồn hình ảnh bài viết này là của mình. :rofl::rofl::rofl::rofl::rofl::rofl::rofl::rofl::rofl::rofl::rofl:

vậy watermark là gì ?

 ## Khái niệm Watermark là gì?
  Watermark được hiểu là một dấu hiệu nhận biết như text, Image, logo hay slogan của riêng bạn hoặc công ty bạn được in hoặc làm chìm, làm mờ phía đăng sau bức ảnh. Mục đích của việc làm này chính là đánh dấu hoặc đặt ra dấu hiệu nhận biết đó là sản phẩm của bạn làm ra. Khi người khác lấy ảnh hoặc tài liệu của bạn để sử dụng cho website của họ. Mặc định người ta biết rằng đó là ảnh của bạn làm ra.
  ![](https://images.viblo.asia/f8d2f803-3713-4a01-a8d0-a2c1f27de809.jpg)
  
 ## Ý nghĩa của việc sử dụng Watermark là gì?
*  **Chống sao chép bất hợp pháp hoặc chưa có sự đồng ý của chủ nhân tác phẩm.**

   Đặc biệt trong bán hàng online trên mạng, hay thậm chí  việc sử dụng lại hình ảnh của nhau là điều thường xảy ra. Khi đối thủ cạnh tranh của bạn sử dụng lại hình ảnh của bạn một cách trái phép để làm công cụ riêng của họ thì việc gắn Watermark cho tác phẩm của mình là điều cần thiết. Bạn có thể sử dụng logo chìm, hotline hoặc tên của bạn làm mờ phía sau ảnh. Điều này đảm bảo cho bạn dễ dàng bảo vệ được tác phẩm của mình.
*    **Hỗ trợ quảng bá và tăng độ phủ của thương hiệu**
    
     Việc sử dụng Watermark là một trong nhiều yếu tố được các thương hiệu nổi tiếng sử dụng để quảng bá thương hiệu của bạn dễ dàng. Ngoài việc bảo vệ bản quyền tác phẩm, bạn còn có thể sử dụng Watermark làm một trong các công cụ để giới thiệu công ty. Nếu ảnh của bạn chất lượng, sẽ có rất nhiều người lấy ảnh của bạn để chia sẻ và đăng tải.

      Điều này không hề có hại mà ngược lại sẽ giúp doanh nghiệp của bạn được quảng bá dễ dàng hơn rất nhiều. Đây chính là điểm mạnh của Watermark giúp bạn phát triển được tiềm năng thương hiệu.
*   **Tạo ra điểm nhấn của tác phẩm**

    Sự chăm chút trong tác phẩm của bạn từ chi tiết tới Watermark cũng có thể giúp bạn gây ấn tượng với người xem. Ngoài việc đóng dấu bản quyền, chúng còn đem lại một điểm nhấn sáng tạo cho bức hình của chính bạn hoặc của công ty.

# Demo watermark image với intervention
   Lý thuyết vậy đủ rồi giờ thực hành thôi
## Cài đặt thư viện
> Yêu cầu môi trường:
> 
> * PHP >= 5.4
> 
> * Fileinfo Extension
> 
> * GD Library (>=2.0)
> 
> * Imagick PHP extension (>=6.5.7)

Đầu tiên chạy lệnh này để tiến hành clone thư viện về project:
```
composer require intervention/image
```

Trong file *config/app.php* thêm `providers`
```config/app.php
Intervention\Image\ImageServiceProvider::class
```
và thêm `aliases`
```config/app.php
'Image' => Intervention\Image\Facades\Image::class
```

Vậy là xong phần cài đặt tiếp theo bắt tay vào code chức năng watermark image.

## Demo
Nếu bạn truy cập vào document của thư viện [tại đây](http://image.intervention.io/getting_started/introduction) thì đã có hẳn một ví dụ về việc watermark này:

```php
// open an image file
$img = Image::make('public/foo.jpg');

// now you are able to resize the instance
$img->resize(320, 240);

// and insert a watermark for example
$img->insert('public/watermark.png');

// finally we save the image as a new file
$img->save('public/bar.jpg');
```

Dựa vào ví dụ của doc thì mình cần 2 ảnh 1 là ảnh cần watermark và 1 ảnh watermark.

Mình sẽ dùng 2 ảnh này cho nó cute!

1. Ảnh gốc (ảnh mình muốn gắn watermark) có tên `foo.jpg`
![](https://images.viblo.asia/349cd9d4-abe7-49c3-bd33-1fa9ed3f5e0e.jpg)
3. Ảnh watermark ( dùng luôn cái mặt mình ) có tên `watermark.png`

    ![](https://images.viblo.asia/avatar/3a85fdbd-c6e9-49ad-80b9-7b637af70860.JPG)

2 ảnh này mình để trong fodel public của project

Tiến hành code thôi. mình sửa lại đoạn code ví dụ của doc 1 chút : 

```php
// Mở ảnh gốc
$img = Image::make('public/foo.jpg');

// Mở ảnh watermark
$watermark = Image::make('public/watermark.jpg');

//làm mờ ảnh watermark
$watermark = $watermark->opacity(50);

// resize ảnh watermark (= 1/10 ảnh gốc)
$resizePercentage = 10/100;
$watermarkSize = round($image->width() * $resizePercentage, 2);
$watermark->resize($watermarkSize, null, function ($constraint) {
    $constraint->aspectRatio();
})

//set position : vị trí của ảnh watermark ở đây mình để  góc dười bên phải
$position = 'bottom-right'; 
// có thể chọn các vị trí:
// top-left (default)
// top
// top-right
// left
// center
// right
// bottom-left
// bottom
// bottom-right
// Tiến hành watermark 
$img->insert($watermark, $position);

// finally we save the image as a new file
$img->save('public/bar.jpg');
```

vậy là done! 

![](https://images.viblo.asia/a8d172b1-d2b7-449e-93bd-b65afe49527d.jpg)
# Kết luận
Qua bài viết này mình mong các bạn có thêm 1 sự lựa chọn cho website của mình về việc bản quyền.  Chúc các bạn thành công :heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes:

Tài liệu tham khảo:  
    https://haviweb.com.vn/watermark-la-gi/
         
   http://image.intervention.io