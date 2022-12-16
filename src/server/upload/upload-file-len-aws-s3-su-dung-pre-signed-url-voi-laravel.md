## Đặt vấn đề
Hiện tại yêu cầu của KH muốn xây dựng upload một file zip có dung lượng từ mấy chục Mb tới mấy trăm Mb để lưu trên S3.
Và khi đó bạn thấy không có gì đặc biệt lắm, đi vào làm code logic upload file như bình thường theo các bước như:

* Xây dựng Form upload bằng HTML
* Thực hiện validate form request như là file, mime, max, ...
* Sử dụng Storage để upload file lên S3 và trả về thông báo upload thành công hoặc upload fail cho người dùng


Tuy nhiên khi mọi thứ dưới máy local chạy rất mượn và mịn thì khi lên server chạy chính thức thì lại bị hiển thị alert Page Unresponsive :scream:
Khi đó nhấn wait thì sẽ tắt được alert, nhấn Exit page thì page sẽ bị crash. Tất nhiên là người dùng sẽ không hề muốn sử dụng như vậy chút nào. Vậy mình phải xử lý như nào?

![](https://images.viblo.asia/3a2ca46b-fa48-4e89-874c-cad201178c9c.png)

Nguyên nhân được xác định là do logic upload đang có vấn đề, khi đó follow của upload file sẽ là Client -> upload lên server -> upload từ server lên S3. Trong đó request từ upload từ client lên server là do nginx xử lý, từ server lên S3 là do php-fpm xử lý. Cả hai thằng này đều có timeout, ở đây là do nginx chờ php-fpm phản hồi lâu quá dẫn tới chrome sẽ tự động bật alert Page Unresponsive lên.

Để xử lý vấn đề trên thì sẽ có 2 phương án xử lý theo như mình biết:
1. Sử dụng Job ở server để upload file lên S3
2. Sử dụng multipart uploads để upload file từ client lên thằng S3

Ở đây mình sẽ chọn làm theo cách 2 là upload trực tiếp từ client lên S3 để khắc phục vấn đề trên nhé :sweat_smile:

## Upload file bằng S3 Pre-Signed URL
### Pre-Signed URL là gì?
Một presigned URL được dùng để cho phép bạn có quyền thao tác read - write với đối tượng được xác định trong URL, miễn là người tạo (IAM User) URL có quyền để xử lý các thao tác đó. Có nghĩa là, nếu bạn nhận được một presigned URL để upload một đối tượng thì bạn sẽ có thể upload được đối tượng đó mà không bị chặn lại nếu tài khoản IAM User đã được chỉ định các quyền cần thiết.

Tất cả các đối tượng và bucket theo mặc định của S3 sẽ là private. Vậy nên để người dùng không cần phải có thông tin xác thực hoặc permission của AWS mà vẫn có thể upload được file thì khi bạn tạo một presigned URL bạn sẽ phải chỉ định trước các thông tin xác thực bảo bảo mật như tên bucket, key object, phương thức HTTP (GetObject hoặc PutObject) và điều tiên quyết phải có chính là ngày giờ hết hạn của URL đó.

Bạn có thể sử dụng presigned URL đó nhiều lần nhưng miễn sao nó phải được thực hiện trước ngày giờ hết hạn URL, nếu không sẽ gặp lỗi khi S3 cố gắng xử lý với một URL đã hết hạn.

Và đây cũng chính là URL để bạn có thể upload file đó từ client lên thẳng S3 mà không cần upload thông qua server.

### Xử lý upload file

**1. Generate presigned URL từ server**

Đầu tiên thì mình cần phải có các thông tin config cần thiết trong file `.env` của mình về S3 như sau. Bạn lưu ý là phải setting đúng key, bucket, region nhé ...

```
# AWS S3
AWS_ACCESS_KEY_ID=minio
AWS_SECRET_ACCESS_KEY=minio@123456
AWS_DEFAULT_REGION=ap-northeast-1
AWS_BUCKET=test
AWS_ENDPOINT='http://minio:9000'
AWS_USE_PATH_STYLE_ENDPOINT=true
```

Tiếp theo thì mình sẽ dụng `Storage` Facades của Laravel luôn vì nó rất tiện của framework để thực hiện tạo một presigned URL trả về client.

Trong UploadController.php mình sẽ làm như sau

```php
    public function getPreSigned(Request $request)
    {
        $client = Storage::disk('s3')->getDriver()->getAdapter()->getClient();
        $fileName = Str::random(10) . '_' . $request->file_name;
        $filePath = config('define.upload_path_zip_file') . '/' . $fileName;

        $command = $client->getCommand('PutObject', [
            'Bucket' => config('filesystems.disks.s3.bucket'),
            'Key' => $filePath,
        ]);

        $request = $client->createPresignedRequest($command, '+20 minutes');

        return [
            'file_path' => $filePath,
            'pre_signed' => (string) $request->getUri(),
        ];
    }
```
Trong đó, mình sẽ truyền lên file name của file mình muốn upload với mục đích là khi sử dụng function `getCommand` để tạo command thì truyền chính tên file vào cho cái key đó. Trường hợp bạn muốn để file đó trong thư mục với đường dẫn như nào thì cũng nên truyền nguyên cả đường dẫn vào nhé. Ví dụ như biến $filePath của mình bên trên :)))

Và các bạn đừng có nhầm lẫn key ở đây là phải truyền vào access key hoặc secret key giống mình nhé :D

Tiếp theo thì mình phải truyền đúng tên bucket vào function `getCommand` đó. Quan trọng nhất dùng để upload file thì bạn nhớ phải dùng `PutObject` nhé, `GetObject` chỉ dùng để đọc file thôi và giá trị truyền vào key cũng phải khác nhau, read thì key đó trên S3 phải tồn tại rồi (file đã tồn tại), còn write thì mình định nghĩa cho key đó.

Cuối cùng thì sử dụng function `createPresignedRequest` để tạo URL trả về cho client với 2 giá  trị truyền vào là $command và thời gian hết hạn của URL đó (cái này bắt buộc phải có nha).

Tiếp theo ở phía client trong file js thì mình sẽ sử dụng như sau
```js
    var fileData;

    $('.upload_input').change(function (e) {
        fileData = $(e.target).prop('files')[0];
    })
    
    function getPreSignedURL() {
        $.ajax({
            type: 'GET',
            url: $('#upload_form').attr('action'),
            data: {
                file_name: fileData.name
            },
            success: function (response) {
                uploadFileZip(response.pre_signed, response.file_path);
            },
            error: function () {
                showError('Create presigned URL fail!');
            },
        });
    }
```

Và kết quả mình có presigned URL như sau

> http://minio:9000/sms/zips/GzA38YmxHy_test.zip?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=test%2F20210906%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20210906T024640Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=7131010d7c20af5cdb47d047ee5a6286a7b857502e2e422825d62e8d2d646472



**2. Upload file bằng presigned URL vừa sinh**

Sau khi có được presigned URL thì mình sẽ thực hiện upload file bằng js như sau
```js
    function uploadFileZip(preSigned, filePath) {
        axios.put(preSigned, fileData, {
            headers: {
                'Content-Type': fileData.type,
                'Content-Disposition': `attachment; filename=${fileData.name}`
            }
        }).then(function (response) {
            // Call function create data into database

        }).catch(function (error) {
            showError('Upload fail!');
        })
    }
```

À còn vấn đề validate file như nào thì ở đây mình sẽ validate file bằng js luôn nhé, vì nếu validate trên server thì vẫn phải put cả file lên server nên có thể vẫn hiển thị page unresponsive. Các bạn có thể tìm hiểu trên mạng có rất nhiều hướng validate file bằng js đó.

**3. Lưu thông tin file như đường dẫn, tên file vào database**

Sau khi có response upload file trả về là 200 thì bạn có thể tạo thêm một function nữa dùng để lưu các thông tin cần thiết của file vào DB để quản lý sau này nhé, cái này chắc ai cũng sẽ làm được thôi nên mình không nói nữa :+1: 

### Một số lưu ý
* Phải có đầy đủ các thông tin về các biến của S3 trong env, tùy setting thì giá trị access key và secret key có thể có hoặc không.
* Setting đầy đủ các permission cho tài khoản bạn dùng để tạo presigned URL để thực thi các thao tác
* Khi upload bị lỗi CORS thì bạn cần phải setting lại CORS cho bucket của bạn để allow đúng địa chỉ trang web của bạn.
* Mặc dù chuyển upload file thông qua Client nhưng về tốc độ upload sẽ phụ thuộc nhiều yếu tố khác nhau nên cái này sẽ tùy tình hình của mỗi dự án sẽ khác nhau, như của mình sẽ là hiển thị modal uploading cho đến khi client upload xong thì reload lại trang.

-----
Như vậy mình đã làm xong các bước để có thể upload một file lên AWS S3 bằng Pre-Signed URL rồi, chúc các bạn thành công!

Tài liệu tham khảo

https://aws.amazon.com/premiumsupport/knowledge-center/s3-upload-large-files/
https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html

https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/s3-presigned-url.html#creating-a-pre-signed-url
https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html