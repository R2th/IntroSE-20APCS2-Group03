# Giới thiệu
TinyPNG là một công cụ tối ưu dung lượng ảnh trực tuyến tốt nhất hiện nay, với dung lượng ảnh giảm đến hơn 70% một con số không tưởng. Có rất nhiều các công cụ tối ưu ảnh trực tuyến có thể kể đến như Compressor, JPEG Optimizer, Optimizilla... tuy nhiên TinyPNG đứng số một do thuật toán tối ưu ảnh của TinyPNG luôn đạt hiệu quả cực ấn tượng và TinyPNG còn có một số các API cho phép tự động hóa các công việc này.
# 1. Tại sao phải tối ưu dung lượng ảnh?
Các website hiện nay sử dụng rất nhiều ảnh trong nội dung giúp cho bài viết trở nên phong phú dễ tiếp cận. Nhưng cùng với việc sử dụng ảnh trong nội dung chúng ta sẽ gặp phải một số vấn đề như sau:

*    Dung lượng lưu trữ ảnh tăng đáng kể, những ảnh không tối ưu dung lượng có khi lên đến hàng MB. Tuy dung lượng không còn là một thứ xa xỉ hiện nay với máy chủ, nhưng việc tăng dung lượng dẫn đến hàng loạt các công việc khác cũng khó khăn hơn như backup, restore mất nhiều thời gian và tốn kém nhiều dung lượng lưu trữ hơn.
*    Đứng về góc độ trải nghiệm người dùng, các trang web có nhiều ảnh không tối ưu dẫn đến tải trang về rất lâu, có nhiều người dùng không thể kiên nhẫn chờ tải xong các ảnh này.
*    Các bộ máy tìm kiếm như Google, Bing... cũng đưa các tiêu chí về tối ưu ảnh để đánh giá thứ hạng trong kết quả tìm kiếm, một website có ảnh tối ưu tốt sẽ SEO tốt hơn. Bạn có thể kiểm tra xem website của mình đã đạt được các tối ưu về hình ảnh chưa bằng công cụ Google Speed Insight.

Với những lý do trên hẳn bạn đã biết Tại sao phải tối ưu dung lượng ảnh? Tuy nhiên, vẫn còn một số những vấn đề còn lăn tăn chút xíu như tối ưu dung lượng như vậy, chất lượng ảnh sẽ giảm xuống gây khó chịu cho người đọc. Đừng quá lo lắng, bạn hãy thử xem hai ảnh dưới đây, ảnh nào là ảnh gốc: 

![](https://images.viblo.asia/b9010c80-6fed-4664-a99f-1b95ab70378f.png)
![](https://images.viblo.asia/9343b4d5-36d1-4bba-bbf8-a432d755d030.png)

Chắc khó mà phân biệt được phải không, nếu cực tinh mắt mới thấy ảnh 2 có độ mượt màu sắc tốt hơn ảnh 1, ảnh 2 chính là ảnh gốc, với dung lượng 57KB, sau khi tối ưu dung lượng được ảnh 1 có dung lượng là 15KB, giảm đến 73% dung lượng. TinyPNG xây dựng những thuật toán cho phép giảm tối đa những thông tin mà mắt chúng ta không thể cảm nhận tốt kèm theo chuyển đổi số màu từ 24 bit xuống 8 bit.

# 2. TinyPNG là công cụ miễn phí?

TinyPNG là công cụ tối ưu ảnh trực tuyến có phí, tuy nhiên có một gói miễn phí với số lượng tối ưu 500 ảnh/ tháng. Với các ảnh tiếp theo dưới 10,000 ảnh bạn sẽ phải trả 0.009$ (khoảng 200đ) cho một ảnh và nếu hơn 10,000 ảnh thì bạn chỉ phải trả cỡ 0.002 (cỡ hơn 40đ) cho một ảnh được tối ưu. Thực hiện đăng ký trên TinyPNG là khá dễ dàng, bạn vào trang chủ và nhập địa chỉ email của mình vào phần LOGIN. Khi đó một API key sẽ được gửi đến email của bạn và bạn đã có thể sử dụng API key này để viết các đoạn mã sử dụng dịch vụ tối ưu hình ảnh của TinyPNG.
# 3. Sử dụng TinyPNG trong ứng dụng Laravel

Bạn hoàn toàn có thể thao tác bằng tay trước khi tải hình ảnh lên server bằng cách vào trang TinyPNG và upload các hình ảnh này lên, sau khi tối ưu xong bạn download về tiếp tục công việc. Tuy nhiên, nếu website của bạn có hàng nghìn ảnh thì thao tác tay là bất khả thi. TinyPNG cung cấp một hệ thống API cho phép bạn thực hiện các công việc này tự động.
## 3.1 Cài đặt TinyPNG thông qua Composer

TinyPNG có các API cho các ngôn ngữ khác nhau như PHP, Ruby, Node.js, Java... chúng ta sẽ tập trung vào PHP thôi vì đang sử dụng framework Laravel. Cài đặt gói thư viện TinyPNG khá đơn giản thông qua Composer với câu lệnh composer require tinify/tinify:

```php
    Admin@ADMIN-PC c:\xampp\htdocs\allaravel.com
    $ composer require tinify/tinify
    Using version ^1.5 for tinify/tinify
    ./composer.json has been updated
    Loading composer repositories with package information
    Updating dependencies (including require-dev)
    Package operations: 1 install, 0 updates, 0 removals
      - Installing tinify/tinify (1.5.1): Loading from cache
    Writing lock file
    Generating optimized autoload files
    > Illuminate\Foundation\ComposerScripts::postUpdate
    > php artisan optimize
    Generating optimized class loader
    The compiled services file has been removed.
```

## 3.2 Thiết lập API key

Trước khi thực hiện các công việc tối ưu hình ảnh bằng code, bạn cần thiết lập API key cho TinyPNG, key này bạn nhận được thông qua bước đăng ký ở trên.

```php
    \Tinify\setKey("EQOPlBHZ_G-LuIeEmGPYO973MmcEdhvt");
```

**Chú ý:** bạn nên đăng ký một key TinyPNG riêng, key ở trên chỉ để minh họa.

## 3.3 Tối ưu dung lượng ảnh với TinyPNG

Các hình ảnh có thể tối ưu được với TinyPNG là JPEG và PNG. Trước tiên, chúng ta tạo một instance Tinify\fromFile với tham số truyền vào là đường dẫn file ảnh, để tối ưu hình hình TinyPNG cung cấp phương thức toFile(). Tham số truyền vào cho fromFile() có thể là một đường dẫn ảnh ở máy khách.
```php
    $source = \Tinify\fromFile("unoptimized.jpg");
    $source->toFile("optimized.jpg");
```

Cũng có thể là một ảnh từ buffer:

```php
    $sourceData = file_get_contents("unoptimized.jpg");
    $resultData = \Tinify\fromBuffer($sourceData)->toBuffer();
```

Hoặc một ảnh từ một URL trên internet:

```php
    $source = \Tinify\fromUrl("https://cdn.tinypng.com/images/panda-happy.png");
    $source->toFile("optimized.jpg");
```

## 3.4 Chỉnh sửa kích thước ảnh với TinyPNG

Ngoài việc tối ưu dung lượng ảnh, TinyPNG còn cho phép chỉnh sửa kích thước ảnh.

   Ảnh trên website nên để kích thước đúng với kích thước hiển thị, ví dụ với khung 200 x 200 pixel thì ảnh cũng nên để đúng kích thước là 200x200 như vậy là tối ưu nhất. Đặc biệt với các ảnh thumbnail,

Với phương thức resize(), bạn có thể điều chỉnh được ảnh với nhiều cách khác nhau:


```php
    $source = \Tinify\fromFile("large.jpg");
    $resized = $source->resize(array(
        "method" => "fit",
        "width" => 150,
        "height" => 100
    ));
    $resized->toFile("thumbnail.jpg");
```

Phương thức resize() được truyền vào một mảng thông tin bao gồm kích thước chiều rộng (width), chiều cao (height) cần điều chỉnh và phương thức điều chỉnh (method). Có 3 phương thức điều chỉnh hình ảnh:
### 3.4.1 Điều chỉnh kích thước ảnh kiểu Scale

Kiểu điều chỉnh này giống như phóng to hay thu nhỏ một ảnh, bạn chỉ cần truyền vào một tham số kích thước, hoặc là chiều rộng (width) hoặc là chiều cao (height), kích thước còn lại sẽ tự động điều chỉnh theo tỉ lệ: 

![](https://images.viblo.asia/bebf483c-7466-4eb5-922f-f2bd40019eb9.png)

```php
    $source = \Tinify\fromFile("large.jpg");
    $zoomouted = $source->resize(array(
        "method" => "scale",
        "width" => 150
    ));
    $zoomouted ->toFile("zoomoutedImage.jpg");
```

### 3.4.3 Điều chỉnh ảnh kiểu Cover

Kiểu điều chỉnh ảnh Cover còn có một tên khác là Crop tức là nó sẽ lấy một vùng trong ảnh gốc với kích thước bạn đưa ra. TinyPNG có một thuật toán trí tuệ nhân tạo AI để xác định nên giữ lại vùng ảnh nào. 

![](https://images.viblo.asia/a9a5a399-4430-4c86-a9a5-b6416902086a.png)

```php
    // Ảnh gốc kích thước 320x210
    $source = \Tinify\fromFile("large.jpg");
    $coverImage = $source->resize(array(
        "method" => "cover",
        "width" => 200,
        "height" => 200
    ));
    $coverImage ->toFile("thumbnail.jpg");
```

## 3.5 Sao chép thông tin metadata của ảnh

Trong mỗi ảnh kỹ thuật số sẽ có một ít thông tin được gắn trong các header của ảnh còn được gọi là metadata, thông tin chứa trong metadata này có thể bao gồm thông tin bản quyền, địa điểm chụp ảnh (thông số GPS), ngày tạo hay chụp ảnh... TinyPNG cho phép sao chép các thông tin từ ảnh gốc vào ảnh khi được chỉnh sửa thông qua phương thức preserve():

```php
    $source = \Tinify\fromFile("unoptimized.jpg");
    $copyrighted = $source->preserve("copyright", "creation");
    $copyrighted->toFile("optimized-copyright.jpg");
```


Phương thức này có thể truyền vào 3 giá trị là:

*    copyright: Thông tin bản quyền
*    location: Thông tin về địa điểm chụp ảnh là các tọa độ trên hệ GPS.
*    creation: Thông tin thời gian chụp ảnh.

## 3.6 Lưu ảnh đã tối ưu vào Amazon S3

Amazon Simple Storage Service (Amazon S3) một dịch vụ lưu trữ trên nền điện toán đám mây của Amazon. Amazon S3 cam kết khả năng phục vụ 24/24 lên đến 99.999999999% tức là chỉ gián đoạn chưa đến 1 giây trong 1 năm. Amazon S3 có hệ thống máy chủ trên toàn cầu do đó ảnh được lưu trữ trên đây sẽ được tối ưu truy cập, khi có một yêu cầu, hệ thống sẽ tìm máy chủ có vị trí địa lý gần yêu cầu nhất nên thời gian đáp ứng là cực nhanh. TinyPNG hỗ trợ lưu trữ các ảnh sau khi đã tối ưu vào Amazon S3, đương nhiên bạn phải đăng ký sử dụng dịch vụ Amazon S3.

```php
    $source = \Tinify\fromFile("unoptimized.jpg");
    $source->store(array(
        "service" => "s3",
        "aws_access_key_id" => "AKIAIOSFODNN7EXAMPLE",
        "aws_secret_access_key" => "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        "region" => "us-west-1",
        "path" => "example-bucket/my-images/optimized.jpg"
    ));
```

## 3.7 Kiểm soát lỗi khi tối ưu ảnh bằng TinyPNG

TinyPNG API sử dụng mã trạng thái HTTP để xác định xem một yêu cầu xử lý hình ảnh có gây ra lỗi hay không. Có một số loại lỗi được kiểm soát bởi TinyPNG như sau:

   AccountException: Các lỗi như không thể xác thực API key hay lỗi vượt quá hạn mức tối ưu sẽ phát sinh ra AccountException.
   ClientException: Lỗi này phát sinh khi không thể submit ảnh từ máy khách lên.
   ServerException: Lỗi phát sinh khi máy chủ API của TinyPNG đang gặp lỗi, với lỗi này cần liên hệ bộ phận hỗ trợ của TinyPNG.
   ConnectionException: Lỗi phát sinh khi truyền dữ liệu ảnh qua đường truyền.
    
```php
    try {
      \Tinify\setKey("YOUR_API_KEY");
      \Tinify\validate();

    } catch(\Tinify\AccountException $e) {
      print("The error message is: " . $e.getMessage());
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

phương thức validate() sẽ thử kiểm tra thiết lập API key trước khi thực hiện tối ưu ảnh.
## 3.8 Sử dụng TinyPNG với chi phí tối thiểu

Với các hệ thống lớn, việc bỏ ra một tháng vài chục USD đến vài trăm USD cho việc tối ưu hình ảnh là rất nhỏ, tuy nhiên, với các website nhỏ phục vụ mục đích sở thích cá nhân, các chi phí trên là khá tốn kém. TinyPNG cho phép tối ưu hóa miễn phí tối đa 500 ảnh / 1 tháng với một API Key, vậy chúng ta hoàn toàn có thể tạo ra nhiều API key khác nhau và kiểm tra ngưỡng sử dụng của từng API sau đó tải lại key. TinyPNG API có phương thức compressionCount() trả về số lượng ảnh đã tối ưu trong tháng với API key tương ứng.


```php
    \Tinify\setKey("API_KEY_1");
    \Tinify\validate();
    $compressionsThisMonth = \Tinify\compressionCount();
    if ($compressionsThisMonth > 499) {
      \Tinify\setKey("API_KEY_2");
      \Tinify\validate();
    }
```
# 4. Lời kết

Các ứng dụng Laravel sẽ được chắp thêm cánh với TinyPNG API. TinyPNG có một thuật toán tối ưu ảnh thực sự đáng kinh ngạc, theo thông tin chính thức từ TinyPNG sắp tới đây sẽ hỗ trợ tối ưu thêm ảnh động GIF, tuyệt vời. Một điều cần chú ý nữa là trong ứng dụng Laravel cần xây dựng các cơ chế kiểu hàng đợi do sử dụng TinyPNG API cần có thời gian delay cho xử lý ảnh phía máy chủ TinyPNG. Trong các bài viết tới, chúng ta sẽ còn quay lại chủ đề xử lý ảnh trong ứng dụng Laravel với một số các gói thư viện khác.

***Bài viết được dịch lại từ:*** https://tinypng.com/developers/reference/php