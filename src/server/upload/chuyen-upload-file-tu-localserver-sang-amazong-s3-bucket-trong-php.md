Trong bài viết này, bạn sẽ tìm hiểu cách di chuyển các file đã tải lên của mình từ local hoặc server sang nhóm Amazon S3 bucket.
> Code đã có sẵn trên github [ Moving Uploaded Files To Amazon S3 Bucket](https://github.com/channaveer/tutorial-upload-files-to-aws-s3-bucket). Nó là miễn phí để bạn có thể sử dụng hoặc chia sẻ với bất ký ai.

<br>

Bạn sẽ học cách làm thế nào để:
1. Tạo Amazon S3 bucket.
2. Tải AWS SDK cho PHP để upload file. 
3. Kiểm tra việc upload với 1 file. 
4. Thiết lập đường dẫn hình ảnh dự án cho các file được lưu trữ tại Local / Server / Domain Hosted Files

### Bước 1 - Tạo Amazon S3 bucket.
Đầu tiên hãy đăng nhập vào tài khoản Amazon AWS của bạn. Khi bạn đăng nhập, bạn sẽ có thể thấy `AWS Management Console` hoặc click vào `Services` ở trên cùng bên trái của menu như trong hình dưới đây.

![AWS Management Console | Search -> S3](https://images.viblo.asia/0bccfbdd-0af8-4f2a-9306-92f1b6163b8f.jpeg)

Từ hình ảnh trên như bạn thấy, bạn có thể tìm kiếm S3 hoặc nếu bạn cuộn xuống một chút, bạn sẽ có thể thấy `Storage -> S3` click vào nó.

Theo mặc định, bạn sẽ có thể xem danh sách tất cả các Buckets của bạn ở đây. Cho phép tạo Bucket mới bằng cách nhấp vào nút `Create bucket` như trong hình dưới đây:

![S3 Buckets List | Create New S3 Bucket](https://images.viblo.asia/c25e3f25-ac0a-43d4-98ca-ffb64244702c.jpeg)

Sau khi click vào nút `Create bucket`, bạn sẽ thấy form sau:

![New S3 Bucket Creation Form](https://images.viblo.asia/b1ffd6d7-850c-4b1e-bcfe-ef37e16c2536.jpeg)

**Bucket Name** - Thêm tên dự án của bạn hay bất cứ thứ gì khiến bạn nhớ đến nó.

**Region** - Chọn khu vực gần với nơi cung cấp dịch vụ của bạn.

**(Vô cùng quan trọng) - Bỏ chọn Block all public access** - (Đảm bảo bỏ chọn phần này nếu bạn muốn upload hình ảnh hoặc bất kỳ file nào bạn muốn hiển thị công khai. Nếu không, trong tương lai khi bạn muốn lấy các file của bạn, bạn sẽ gặp lỗi).

**Chọn Accept Terms**

**Click vào Create bucket button.**

> **LƯU Ý:** Đảm bảo tải xuống file credentials CSV. Vì chúng ta sẽ sử dụng thông tin này trong Bước 3

Tada! AWS S3 Bucketcủa bạn đã sẵn sàng.

### Bước 2 - Tải AWS SDK cho PHP để upload file. 

Hãy tạo dự án ở nơi tôi muốn sử dụng SDK AWS. Ở đây tôi đang sử dụng Plain PHP, nhưng code vẫn nên là tên trong bất kỳ framework nào đó như Laravel, Codeigniter, Symfony, ...

Sau đây là cấu trúc thư mục dự án của tôi. Tôi đã cài đặt composer package. Đừng lo lắng, tôi sẽ chỉ cho bạn cách chạy tương tự như hình ảnh ở dưới:

![Project Folder Structure](https://images.viblo.asia/4c6ef05b-acbc-4d1a-bbd4-b37b42707818.jpeg)

Sử dụng câu lệnh bên dưới để cài ddawtj AWS SDK.

```
composer require aws/aws-sdk-php
```

Vậy là bạn đã hoàn thành thêm một bước nữa.

### Bước 3 - Kiểm tra việc upload với 1 file. 


Khi tôi sử dụng `Composer` nó sẽ xử lý **autoloading the classes** giúp tôi, tôi phải gọi các `autoload.php` từ thư mục `vendor` như sau:

> **LƯU Ý:** Hầu hết các giải thích tôi sẽ làm trong code để bạn có thể hiểu rất dễ dàng

```
<?php
/** Following line for just debugging the errors if any, but you can omit it out */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/** Autoload the file with composer autoloader */
require 'vendor/autoload.php';
```

Trong khi chúng ta tạo S3 bucket, hãy đảm bảo bạn đã tải về credentials. Bạn sẽ cần nó như dưới đây:

```
<?php
/** Following line for just debugging the errors if any,
 * but you can omit it out */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


/** Autoload the file with composer autoloader */
require 'vendor/autoload.php';


/** AWS S3 Bucket Name */
$bucket_name = 'chans3';


/** AWS S3 Bucket Access Key ID */
$access_key_id    = 'your_access_key';


/** AWS S3 Bucket Secret Access Key */
$secret = 'your_secret_key';


/** You can generate random file name here */
$file_name          = 'profile.jpg';


/** Full path of the file where it exists */
$file_location      = './assets/images/'. $file_name;


/** With the following code I am fetching the MIME type of the file */
$finfo              = new finfo(FILEINFO_MIME_TYPE);
$file_mime          = $finfo->file($file_location);


/** Let's initialize our AWS Client for the file uploads */
$s3 = new Aws\S3\S3Client([
    /** Region you had selected, if don't know check in S3 listing */
    'region'  => 'us-west-2',
    'version' => 'latest',
    /** Your AWS S3 Credential will be added here */
    'credentials' => [
        'key'    => $access_key_id,
        'secret' => $secret,
    ]
]);


/** Since the SDK throw exception if any error
 * I am adding in try, catch
 */
try {
    $aws_object = $s3->putObject([
        /** You bucket name */
        'Bucket'        => $bucket_name,
        /** This is the upload file name, you can change above */
        'Key'           => $file_name,
        /** Give the complete path from where it needs to upload the file */
        'SourceFile'    => $file_location,
        /** Keep It Public Unless You dont want someone to access it
         * You can skip the following if you want to keep it private
         */
        'ACL'           => 'public-read',
        /** Make sure to add the following line,
         * else it will download once you use the end URL to render
         */
        // 'ContentType'   => 'image/jpeg'
        'ContentType'   => $file_mime
    ]);


    /**
     * Uncomment the following for debugging the whole object
     */


    // echo '<pre>';
    // print_r($aws_object);
    
    /** To get the uploaded path of the image you can do 2 ways */
    
    /** Type 1 - Uploaded AWS S3 Bucket URL */
    echo $aws_object['@metadata']['effectiveUri'];
    
    /** Type 2 - Uploaded AWS S3 Bucket URL */
    echo $aws_object['ObjectURL'];

    /****** SAVE THE ABOVE PATH IN YOUR DATABASE FOR FUTURE REFERENCE ******/

} catch (Aws\Exception\AwsException $e) {
    /** Handle the error if any */
    return 'Error: ' . $e->getAwsErrorMessage();
}
```

Khi bạn dump biến `$aws_object` ở trên để debug, bạn sẽ có thể thấy tương tự như output sau:

```
Aws\Result Object
(
    [data:Aws\Result:private] => Array
        (
            [Expiration] => 
            [ETag] => "c7161dd38b84e8fea7f778a349882fa7"
            [ServerSideEncryption] => 
            [VersionId] => 
            [SSECustomerAlgorithm] => 
            [SSECustomerKeyMD5] => 
            [SSEKMSKeyId] => 
            [SSEKMSEncryptionContext] => 
            [RequestCharged] => 
            [@metadata] => Array
                (
                    [statusCode] => 200
                    [effectiveUri] => https://chans3.s3.us-west-2.amazonaws.com/profile.jpg
                    [headers] => Array
                        (
                            [x-amz-id-2] => W5aSkTIf24p8d074+pgHQs9JAxTah7JIGBWXG5RpF9IUFoNKC46bcyuzsVNp2jJsjff89Bw4W3Y=
                            [x-amz-request-id] => 75669CA75B12E083
                            [date] => Sun, 24 May 2020 16:33:00 GMT
                            [etag] => "c7161dd38b84e8fea7f778a349882fa7"
                            [content-length] => 0
                            [server] => AmazonS3
                        )

                    [transferStats] => Array
                        (
                            [http] => Array
                                (
                                    [0] => Array
                                        (
                                        )

                                )

                        )

                )

            [ObjectURL] => https://chans3.s3.us-west-2.amazonaws.com/profile.jpg
        )

    [monitoringEvents:Aws\Result:private] => Array
        (
        )

)
```

Quan sát các đường dẫn sau từ đoạn mã trên tức là:

```
/** You can generate random file name here */
$file_name          = 'profile.jpg';


/** Full path of the file where it exists */
$file_location      = './assets/images/'. $file_name;
```

Ở đây tôi đã hardcoded, trong bước tiếp theo tôi sẽ giải thích làm thế nào bạn có thể thiết lập nó một cách linh hoạt.

### Bước 4 - Thiết lập đường dẫn hình ảnh dự án cho các file được lưu trữ tại Local / Server / Domain Hosted Files

Bạn đã thấy cách hardcoded, bạn có thể có một số scripts hoặc một cái gì đó sẽ lấy tất cả các chi tiết giống nhau từ cơ sở dữ liệu. Chúng ta có thể làm như sau.

```
$products = 'YOUR QUERY FOR PRODUCTS';

foreach($products as $product){
  /** Your image might be something like this */
  /** similar to 
   * $file_name = 'profile.jpg'; 
   */
  $product_image = $product->image_name;

  /** Your upload file path might be like */
  /** similar to 
   * $file_location = './assets/images/'. $file_name;
   */

  /** Upload path in project uploads */
  $upload_path = './uploads/images/product_images/';

  /** Upload path in some API domain */
  $upload_path = 'https://your_api.com/uploads/product_images/';

  /********* REST OF THE CODE REMAINS SAME AS ABOVE **************/
}
```

Trong đoạn code trên, `$upload_path` tôi đã chỉ ra 2 ví dụ bạn có thể chọn ví dụ bạn muốn.

***Tài liệu:*** https://stackcoder.in/posts/move-uploaded-files-from-local-computer-or-server-to-amazon-s3-bucket-in-php