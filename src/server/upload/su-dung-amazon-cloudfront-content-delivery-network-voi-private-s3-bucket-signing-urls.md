Trong nhiều trường hợp, thì việc sử dụng CDN là bắt buộc. Mình đã trải nghiệm với một số CDN nhưng cuối cùng mình lựa chọn sử dụng AWS CloudFront. Việc thiết lập cho nó cũng không phải đơn giản, nhưng qua bài hướng dẫn này, các bạn sẽ biết được cách:

* Cung cấp các bucket file tĩnh từ s3 CloudFront.
* Triển khai các file tĩnh trên CloudFront trên nhiều regions. (các bạn xem qua bản đồ phía dưới).
* Get các signed URLs từ CloudFront để sử dụng chúng trong quá trình phát triển (Python).

![](https://images.viblo.asia/b500f8e6-cf3d-4f4e-b8c9-184a7c0c691f.jpeg)

## Các tính năng của CloudFront

Amazon CloudFront là dịch vụ mạng phân phối nội dung toàn cầu (CDN) giúp tăng tốc quá trình phân phối các tệp tĩnh. CloudFront cũng hỗ trợ nội dung dynamic.

Chúng ta cũng có thể sử dụng chúng để xem các báo cáo thống kê bộ nhớ cache, các đối tượng được sử dụng phổ biến nhất và để theo dõi CDN.

Nó có các tính năng bảo mật nâng cao và một số hạn chế về địa lý. Chúng cũng được tích hợp với các dịch vụ  của AWS khác như S3.

Ngoài ra, chúng có thể được tích hợp với các blog Wordpress bằng cách sử dụng plugin W3 Total Cache.

## Tạo Bucket

Trước hết, chúng ta sẽ cần tạo một bucket: thông tin cơ bản sẽ cần là tên của bucket và Region được lưu trữ.

![](https://images.viblo.asia/7d501220-b2a4-41c9-a633-0222df17af62.jpeg)

## Tạo CloudFront Key Pairs

Đi đến menu “Security Credentials” :

![](https://images.viblo.asia/379b23a4-c499-4a35-b3f6-84f1d9e8d3e5.jpeg)

Tiếp đó chúng ta click vào continue nhé:

![](https://images.viblo.asia/bc9f8d17-7d7b-4dfd-a44d-e31510c49a78.jpeg)

Sau đó, chúng ta tạo một cặp khóa, hãy giữ private key thật an toàn nhé, chúng ta sẽ cần phải sử dụng chúng:

![](https://images.viblo.asia/8341b52b-899d-4289-af80-f9ab4c72b0b0.jpeg)

## Tạo CloudFront Distribution

Bây giờ chúng ta sẽ chuyển đến màn hình console của CloudFront và tiến hành tạo mới Web Distribution:

![](https://images.viblo.asia/0961db3c-a78b-4dd7-a8ba-a1476a52ba13.jpeg)

Giả sử chúng ta đã có bucket có tên là *thisisatempbucket*

![](https://images.viblo.asia/67f5398c-6365-45ad-8f2f-f1601c769a27.jpeg)

Chúng ta sẽ set domain như sau:

```
thisisatempbucket.s3.amazonaws.com
```

![](https://images.viblo.asia/17f77e1a-0cb4-4314-aaae-54517b5e2d81.jpeg)

Bây giờ chúng ta sẽ đến bước lựa chọn *Price Class* và trong chức năng này, chúng ta sẽ triển khai các tệp tĩnh của mình cho các regions mà mình muốn:

![](https://images.viblo.asia/d87883e1-247c-4c3a-a39c-a441357b645d.jpeg)

Liên quan đến định danh, tôi thường tạo một định danh mới cho mỗi bản phân phối mới để có thể tận dụng việc sử dụng tài nguyên AWS được nhiều hơn:

![](https://images.viblo.asia/3d7317f4-110a-4c2b-8324-7adba58d7d73.jpeg)

Cuối cùng, chúng ta sẽ các setting về cấu hình và kiểm tra quá trình tạo bản phân phối CloudFront:

![](https://images.viblo.asia/864a0597-a11c-4f60-9d11-37fca3801816.jpeg)

## Giữ cho content ở chế độ Private

Bây giờ, để giữ cho content ở chế độ private và không thể truy cập được trực tiếp qua S3, chúng ta sẽ hạn chế người xem truy cập và sử dụng các signed URL.

Chuyển đến phần *Behavior*, nhấp vào *Default Behavior* và chọn *Edit*

![](https://images.viblo.asia/5966291f-4254-4305-b346-2b9ac8f14e3e.jpeg)

Chọn *Yes* để hạn chế quyền truy cập và lưu.

![](https://images.viblo.asia/38a2402e-3c05-4f3e-b2e2-91d0fd151e89.jpeg)

## S3 / CloudFront Policy

Bây giờ, hãy quay trở lại bucket để cho phép CloudFront truy cập vào các tệp của nó.

Để thực hiện việc này, chúng ta phải có *Origin Access Identity* của bản phân phối (chúng ta có thể tìm thấy trong menu *origins* của bản phân phối CloudFront) và nó tương tự như:

```
origin-access-identity/cloudfront/EVR8CA2SK123FA
```

Chúng ta nên thêm các policy sau vào bucket mà chúng ta đang sử dụng làm origin:

```
{
 "Version": "2008-10-17",
 "Id": "PolicyForCloudFrontPrivateContent",
 "Statement": [
  {
   "Sid": "1",
   "Effect": "Allow",
   "Principal": {
    "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EVR8CA2SK123FA"
   },
   "Action": "s3:GetObject",
   "Resource": "arn:aws:s3:::thisisatempbucket/*"
  }
 ]
}
```

Lưu ý rằng chúng ta đang sử dụng cùng một id trong bucket policy:

```
EVR8CA2SK123FA
```

## Tạo Signed URLs

Mọi người có nhớ khóa private mà chúng ta đã tải xuống không?

Bây giờ là lúc chúng ta sẽ sử dụng đến nó.

Đây là file script demo cho phép chúng ta đăng ký và tạo URL của tệp tĩnh bằng Python:

```
import datetime
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from botocore.signers import CloudFrontSigner
def rsa_signer(message):
    with open('The_Path_To_The_Private_Key', 'rb') as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )
    signer = private_key.signer(padding.PKCS1v15(), hashes.SHA1())
    signer.update(message)
    return signer.finalize()
key_id = 'This_Is_Your_Key_ID'
url = 'http://Your_CloudFront_URL_ID.cloudfront.net/css/file.css'
expire_date = datetime.datetime(2019, 1, 1)
cloudfront_signer = CloudFrontSigner(key_id, rsa_signer)
# Create a signed url that will be valid until the specfic expiry date provided using a canned policy.
signed_url = cloudfront_signer.generate_presigned_url(url, date_less_than=expire_date)
print(signed_url)
```

Làm đến đây, chúng ta có thể thấy rằng có thể sử dụng URL sau để lấy tệp tài nguyên XML của mình:

```
url = 'http://Your_CloudFront_URL_ID.cloudfront.net'
```

### Tổng kết

Đến đây, các bạn đã nắm rõ được các phần mà mình đề cập từ đầu bài viết về CloudFront của AWS rồi đó. Mong rằng bài viết của mình sẽ giúp các bạn khi làm việc với chúng.

**Nguồn tài liệu**
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html
https://medium.com/faun/using-amazon-cloudfront-content-delivery-network-with-s3-e73861dbe060