Theo mặc định, tất cả các object là private - có nghĩa là chỉ owner của bucket mới có quyền truy cập vào đối tượng. Nếu bạn muốn người dùng có quyền truy cập vào bucket hoặc các đối tượng cụ thể mà không cần phải public chúng, chúng ta có thể cung cấp cho người dùng các quyền hạn thích hợp bằng cách sử dụng chính sách IAM. Ngoài việc cho phép truy cập bằng chính sách IAM, bạn cũng có thể tạo một presigned URL - nghĩa là người dùng có thể tương tác với các đối tượng mà không cần thông tin đăng nhập AWS hoặc quyền IAM.

### Vậy presigned URLs là gì vậy ?

Presigned URL là URL mà bạn có thể cung cấp cho người dùng của mình để cấp quyền truy cập tạm thời vào một đối tượng S3 cụ thể. Sử dụng URL, người dùng có thể đọc và ghi đối tượng (hoặc cập nhật đối tượng hiện có). URL chứa các thông số cụ thể do ứng dụng mà bạn cài đặt. Presigned URL sử dụng ba tham số để giới hạn quyền truy cập cho người dùng:

* Bucket: Chứa các đối tượng - nơi đối tượng nằm trong đây.
* Key: Tên của đối tượng.
* Expires: thời hạn có hiệu lực của URL.

Như mong đợi, khi đã quá thời thời gian hết hạn, người dùng không thể tương tác với đối tượng được chỉ định. AWS cấp quyền truy cập vào đối tượng thông qua presigned URL vì URL chỉ có thể được đăng ký chính xác bởi owner của bucket S3.

Bất kỳ ai có presigned URL hợp lệ đều có thể tương tác với các đối tượng như được chỉ định trong quá trình tạo. Ví dụ: nếu presigned URL GET (đọc) được cung cấp, người dùng không thể sử dụng URL này để PUT (Ghi).

Bản thân URL được tạo bằng cách sử dụng các tham số khác nhau, được tạo tự động thông qua AWS JS SDK. Bao gồm các:

* X-AMZ-Algorithm
* X-AMZ-Credential
* X-AMZ-Date
* X-AMZ-Expires
* X-AMZ-Signature
* X-AMZ-SignedHeaders


> https://presignedurldemo.s3.eu-west-2.amazonaws.com/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJJWZ7B6WCRGMKFGQ%2F20180210%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20180210T171315Z&X-Amz-Expires=1800&X-Amz-Signature=12b74b0788aa036bc7c3d03b3f20c61f1f91cc9ad8873e3314255dc479a25351&X-Amz-SignedHeaders=host


Trên đây là một ví dụ về presigned URL có thể được sử dụng để GET Đối tượng. Liên kết bây giờ sẽ không hợp lệ vì khoảng thời gian tối đa trước khi một presigned URL đã hết hạn.

### Tiếp đó, làm cách nào để tạo presigned URL ?

Điều đầu tiên chúng ta cần làm là tạo một người dùng IAM có quyền truy cập vào cả việc đọc và ghi các đối tượng vào S3. Khi đó, 1 API key sẽ được tạo cho người dùng IAM, key này sẽ được lưu trữ dưới dạng một biến môi trường trên server.

![](https://images.viblo.asia/95fe20bc-4c12-49c6-a74b-98bf495304de.png)

1. Di chuyển đến trang S3 và tạo bucket. Tên bucket phải là duy nhất.
2. Di chuyển đến IAM.
3. Tạo **người dùng** với quyền truy cập có *Programmatic Access*.
4. Click vào **Click Next: Permissions**
5. Click vào **Attach existing policies directly**  và **Create policy**.
6. Sử dụng trình chỉnh sửa để chọn dịch vụ S3. Chúng ta chỉ cần một vài yêu cầu truy cập; vì vậy hãy mở rộng các nhóm cấp độ truy cập
7. Đảm bảo rằng **GetObject** trong phần **READ** và **PutObject** trong phần ghi đều được đánh dấu.
8. Chọn các tài nguyên bạn muốn cấp quyền truy cập; chỉ định bucket mà bạn đã tạo trước đó và nhấp vào **Any** cho tên đối tượng.
9. Chúng ta sẽ không chỉ định bất kỳ** Request conditions**.
10. Nhấp vào **Review Policy** và nhập tên cho policy => **Save Policy**.

![](https://images.viblo.asia/b035089c-1267-4216-89a6-113ce99d3736.png)

11. Áp dụng policy mới cho người dùng mới mà bạn đã tạo và lưu ý kiểm tra các thông tin xác thực truy cập aws nhé.

![](https://images.viblo.asia/f8a32962-94a0-4f1c-abc5-712121dbde76.png)

### Tạo các presigned URL bằng AWS JS SDK

Dưới đây trình bày hai phương pháp tạo URL GET và URL PUT bằng cách sử dụng class AWS S3.

```
# Tạo presigned URL GET:

require('dotenv').load();
require('dotenv').config();
var AWS = require('aws-sdk');
var credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey : process.env.S3_SECRET_KEY
};
AWS.config.update({credentials: credentials, region: 'eu-west-2'});
var s3 = new AWS.S3();

var presignedGETURL = s3.getSignedUrl('getObject', {
    Bucket: 'presignedurldemo',
    Key: 'image.jpg', //filename
    Expires: 100 //time to expire in seconds
});
```

```
## Create presigned URL PUT

var presignedPUTURL = s3.getSignedUrl('putObject', {
    Bucket: 'presignedurldemo',
    Key: 'user12/image.jpg', //filename
    Expires: 100 //time to expire in seconds
});
```

### Sử dụng presigned URLs

Sử dụng GET URL, chúng ta có thể dễ dàng sử dụng trong bất kỳ trình duyệt web nào. Để sử dụng URL PUT, chúng ta có thể sử dụng POSTMAN trong cấu hình như bên dưới. Bạn có thể đính kèm một tệp trong phần nội dung của yêu cầu PUT ở định dạng nhị phân.

![](https://images.viblo.asia/99c96803-7225-415d-80fa-96a3d253b4bf.png)

![](https://images.viblo.asia/c58e5335-d5ed-441c-bcae-6f0ea79f1394.png)

### Nhược điểm

Ttrong bài viết, các presigned URL (PUT & GET) không hỗ trợ giới hạn kích thước tệp. Do yêu cầu PUT HTTP sử dụng presigned URL là đơn luồng, kích thước đối tượng được giới hạn là 5GB. Tuy nhiên, việc sử dụng presigned URL giúp bạn linh hoạt hơn khi triển khai tải tệp lên trong ứng dụng của mình. Ví dụ, một đối tượng có thể được tải lên bằng cách sử dụng API tải lên nhiều phần cũng như có kích thước giới hạn và có kích thước tối đa là 5TB.

### Presigned POST URLS

POST presigned, như PUT cho phép bạn thêm nội dung vào bucket S3. Phương thức GET chỉ cho phép bạn GET từ bucket S3. URL presigned POST có nhiều tham số hơn presigned URL PUT và phức tạp hơn một chút để kết hợp vào ứng dụng của bạn. Nó cho phép bạn tải lên S3 trực tiếp bằng HTML form.

### Danh sách parameter của POST URL

Mọi người có thể tham khảo danh sách các params dùng cho POST URL tại đây https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTConstructPolicy.html

* Bucket: process.env.S3_BUCKET (Tên bucket)
* Expires: 1800 (Thời gian hết hạn trong vài giây (30m))
* key: 'image.jpg' (Tên tệp)
* {acl: 'private'} (Nó xác định tài khoản hoặc nhóm AWS nào được cấp quyền truy cập và loại quyền truy cập.)
* {success_action_status: "201"} (Mã trạng thái HTTP được trả về nếu thành công)
* ['started-with', '$ key', ''] (Giá trị phải bắt đầu bằng giá trị được chỉ định (ví dụ: ‘user1/’. Trong trường hợp này, hình ảnh không có prefix‘’)
* ['content-length-range', 0, 100000] (Chỉ định phạm vi của kích thước file bạn đang tải lên tính bằng byte)
* {'x-amz-math': 'AWS4-HMAC-SHA256'} (Chỉ định thuật toán chữ ký được sử dụng trong quá trình tính toán chữ ký)

### Làm thế nào để bạn có thể bảo mật hơn nữa cho URL S3 ?

**CORS!**

Sử dụng CORS, bạn có thể chỉ định giá trị khởi tạo của S3 (AllowedOrigin). Ký hiệu dấu sao (*) có nghĩa là bất kỳ đâu (ví dụ: bất kỳ nguồn gốc nào được phép). Bạn có thể chỉnh sửa cấu hình CORS bằng cách chọn tab quyền của button cấu hình CORS khi ở trong bucket.

Ví dụ dưới đây cho phép truy cập từ bất kỳ URL nào và từ nhiều phương thức HTTP.

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

Và đừng quên 1 điều là phải thêm tệp .env chứa các biến môi trường bên dưới và chỉ định các giá trị của bạn.

```
S3_ACCESS_KEY=anaccesskeyishere
S3_SECRET_KEY=asecretkeyishere
S3_BUCKET=presignedurldemo
S3_REGION=eu-west-2
```

### Nguồn tham khảo

https://medium.com/@aidan.hallett/securing-aws-s3-uploads-using-presigned-urls-aa821c13ae8d
https://leonid.shevtsov.me/post/demystifying-s3-browser-upload/
AWS SDK S3 Documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html