# Giới thiệu
Chào các bạn, lại là mình đây (hehe).

Hiện nay, các Website từ nhỏ đến lớn ít nhiều đều sử dụng ảnh để hiển thị, làm cho nội dung của trang Web thêm cụ thể, chi tiết hơn. Nếu như dung lượng của các ảnh này lớn sẽ khiến cho việc load trang trở nên chậm chạp, đồng thời nó cũng làm cho việc backup hay restore dữ liệu mất nhiều thời gian và công sức,... Vì vậy, việc tối ưu ảnh cho ứng dụng Web là vô cùng cần thiết, tuy nhiên để tối ưu dung lượng ảnh nhưng chất lượng ảnh vẫn tốt thì không hề đơn giản.

Trong bài viết này mình sẽ giới thiệu cho các bạn `Tinify` - một thư viện giúp tối ưu dung lượng ảnh dựa trên API của `TiniPNG`. `TiniPNG` là một công cụ tối ưu ảnh online, nó được xây dựng với các thuật toán cho phép tối ưu dung lượng ảnh lên đến 70% nhưng chất lượng hiển thị ảnh vẫn rất tốt. Tuy vậy, với gói free thì bạn sẽ chỉ được tối ưu 500 ảnh miễn phí/1 tháng cho một tài khoản. `Tinify` là một thư viện được xây dựng dựa trên công cụ tối ưu ảnh này, nó hỗ trợ nhiều ngôn ngữ như `PHP`, `Ruby`, `Java`, `Python`, `NodeJs`,... Trong bài viết này mình sẽ sử dụng `Tinify` trên nền tảng `PHP/Laravel`. Bạn có thể xem thêm các ngôn ngữ kể trên [ở đây](https://tinypng.com/developers/reference/php).
# Lấy API key của TiniPNG
Bạn hãy vào [đây](https://tinypng.com/developers) và nhập địa chỉ mail. API key sẽ được gửi về mail mà bạn đã nhập.
# Cài đặt
Cài đặt thông qua `Composer`, bạn hãy chạy lệnh sau:
```
composer require tinify/tinify
```
# Thiết lập API key
Trước khi thực hiện việc tối ưu ảnh thì bạn cần phải thiết lập API key như lệnh sau:
```
\Tinify\setKey("YOUR_API_KEY");
```

Bạn nên thiết lập API key này thông qua file `.env` để dễ dàng cho việc quản lý và cập nhật.
# Tối ưu dung lượng ảnh
Các hình ảnh có thể tối ưu được với TinyPNG là JPEG và PNG. Ta sử dụng phương thức `toFile()` để thực hiện việc tối ưu ảnh.
* Với hình ảnh được lưu trên client:
```
$source = \Tinify\fromFile("/images/unoptimized.jpg");
$source->toFile("optimized.jpg");
```
* Với hình ảnh được lưu trên buffer:
```
$sourceData = file_get_contents("unoptimized.jpg");
$resultData = \Tinify\fromBuffer($sourceData)->toBuffer();
```
* Với hình ảnh từ một URL trên Internet:
```
$source = \Tinify\fromUrl("https://tinypng.com/images/panda-happy.png");
$source->toFile("optimized.jpg");
```
# Thay đổi kích thước ảnh
Ngoài việc tối ưu dung lượng ảnh, `Tinify` còn cho phép chúng ta chỉnh sửa kích thước ảnh với chất lượng ảnh vô cùng tốt. Việc này sẽ giúp bạn không phải viết các đoạn code để tùy chỉnh kích thước ảnh. Để thay đổi kích thước ảnh, ta sử dụng phương thức `resize()`:
```
$source = \Tinify\fromFile("large.jpg");
$resized = $source->resize(array(
    "method" => "fit",
    "width" => 150,
    "height" => 100
));
$resized->toFile("thumbnail.jpg");
```
Tham số truyền vào resize() là một mảng gồm:
* `method`: tùy chọn điều chỉnh ảnh.
* `width`: chiều rộng ảnh.
* `height`: chiều cao ảnh.

Các tùy chọn điều chỉnh ảnh của `method` gồm:

* **scale:** Khi bạn chọn kiểu điều chỉnh này, bạn chỉ cần truyền vào chiều rộng(width) hoặc chiều cao(height), tham số còn lại sẽ được điều chỉnh theo tỉ lệ.

![](https://images.viblo.asia/7ac27167-625a-422b-b6ec-19c2b591e160.png)
* **fit:** Với kiểu này, bạn sẽ phải cung cấp cả chiều rộng và chiều cao, ảnh sẽ được điều chỉnh kích thước sao cho ảnh nằm vừa với kích thước mà bạn đã đưa ra.

![](https://images.viblo.asia/12f0a0d5-f019-4673-93f4-8e6a333c0b95.png)
*  **cover:** Khi bạn chọn kiểu này, bạn cũng sẽ phải cung cấp cả chiều rộng và chiều cao, ảnh sẽ được cắt từ ảnh gốc theo kích thước mà bạn đã đưa ra. `TiniPNG` sử dụng một thuật toán thông minh để xác định giữ lại phần nào trong ảnh.

![](https://images.viblo.asia/ba8ac1fe-1503-4b2d-b7d1-10549504b05c.png)
* **thumb:** Với kiểu điều chỉnh này, ảnh sẽ được cắt từ ảnh gốc, và được điều chỉnh kích thước theo chiều rộng và chiều cao mà bạn đã đưa ra. Nó còn tự động thêm khoảng nền phù hợp với thích thước đã cung cấp.

![](https://images.viblo.asia/f8652369-dc95-4070-bfd3-6394beb97d62.png)
# Lấy thông tin metadata của ảnh
Bạn có thể lấy được các thông tin metadata của ảnh như thông tin bản quyền, địa điểm chụp ảnh (thông số GPS), thời gian chụp ảnh,… thông qua phương thức ` preserve()`:
```
$source = \Tinify\fromFile("unoptimized.jpg");
$copyrighted = $source->preserve("copyright", "creation");
$copyrighted->toFile("optimized-copyright.jpg");
```
Tham số của ` preserve()` gồm:
* `copyright`: Thông tin bản quyền
* `location`: Thông tin về địa điểm chụp ảnh (GPS).
* `creation`: Thời gian chụp ảnh (chỉ khả dụng với ảnh JPEG).
# Lưu trữ ảnh với Amazon S3
`Amazon S3` là một dịch vụ lưu trữ trên nền điện toán đám mây của Amazon với tốc độ lưu trữ và truy cập rất nhanh. Để lưu ảnh tối ưu từ `Tinify` thì trước hết bạn cần phải đăng ký sử dụng dịch vụ `Amazon S3`. Lưu trữ ảnh đã được tối ưu trên `Amazon S3` với phương thức `store()`:
```
$source = \Tinify\fromFile("unoptimized.jpg");
$source->store(array(
    "service" => "s3",
    "aws_access_key_id" => "AKIAIOSFODNN7EXAMPLE",
    "aws_secret_access_key" => "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "region" => "us-west-1",
    "path" => "example-bucket/my-images/optimized.jpg"
));
```
# Quản lý Exception
`Tinify` cung cấp một số `Exception` để quản lý lỗi khi thực hiện việc tối ưu ảnh như sau:
* `AccountException`: Các lỗi như không thể xác thực API key hay lỗi vượt quá hạn mức tối ưu sẽ phát sinh ra AccountException.
* `ClientException`: Lỗi này phát sinh khi không thể gửi ảnh từ client lên.
* `ServerException`: Lỗi này phát sinh khi máy chủ API của TinyPNG đang gặp lỗi, với lỗi này cần liên hệ bộ phận hỗ trợ của TinyPNG.
* `ConnectionException`: Lỗi này phát sinh khi truyền dữ liệu ảnh qua đường truyền gặp sự cố.
```
try {
    // Use the Tinify API client.
    \Tinify\setKey("YOUR_API_KEY");
    \Tinify\validate();
} catch(\Tinify\AccountException $e) {
    // Verify your API key and account limit.
} catch(\Tinify\ClientException $e) {
    // Check your source image and request options.
} catch(\Tinify\ServerException $e) {
    // Temporary issue with the Tinify API.
} catch(\Tinify\ConnectionException $e) {
    // A network connection error occurred.
} catch(Exception $e) {
    // Something else went wrong, unrelated to the Tinify API.
}
```
Phương thức `validate()` sẽ thực hiện việc kiểm tra API key.
# Quản lý số lượng ảnh đã tối ưu
Bạn có thể kiểm soát số lượng ảnh đã tối ưu của mình theo tháng trên `TinyPNG` với phương thức `compressionCount()`, để sử dụng được phương thức này bạn cần phải `validate()` API key.
```
$compressionsThisMonth = \Tinify\compressionCount();
```
Nếu như bạn xài gói free 500 ảnh/1 tháng thì phương thức này rất hữu ích, nó sẽ giúp bạn kiểm soát số lượng ảnh đã tối ưu trong tháng. Bạn có thể dùng nó để kiểm tra nếu đạt 500 ảnh/tháng thì thiết lập một API key khác để tiếp tục sử dụng dịch vụ.
# Kết quả
Dưới đây là ảnh gốc và ảnh đã được tối ưu hóa dung lượng:
* Ảnh gốc (~1MB)
![](https://images.viblo.asia/036c724e-3803-436b-8603-2a136f763cf5.jpg)

* Ảnh đã được tối ưu bằng `TinyPNG` (240KB)
![](https://images.viblo.asia/01357504-412f-49c7-a146-64152ba6832f.jpg)

Thật awesome! Nếu không có chú thích liệu bạn có phân biệt được đâu là ảnh gốc, đâu là ảnh đã tối ưu hóa không? Sau khi tối ưu hóa, dung lượng giảm đến gần 80% nhưng chất lượng ảnh vẫn rất tốt.

Một **tips nhỏ** cho bạn là từ các phương thức mà `Tinify` cung cấp bạn hãy tự xây dựng một class xử lý ảnh riêng cho ứng dụng của bạn để sử dụng mọi nơi, dễ dàng quản lý và cập nhật khi cần. Đừng quên sử dụng `Queues` của `Laravel` để tối ưu việc xử lý ảnh này. 
# Kết luận
Qua bài viết này, mình đã giới thiệu cho các bạn `Tinify` - một thư viện tối ưu dung lượng ảnh dựa trên API của `TiniPNG`. Hy vọng bài viết của mình sẽ có ích cho các bạn.
# Tham khảo
https://tinypng.com/developers/reference/php