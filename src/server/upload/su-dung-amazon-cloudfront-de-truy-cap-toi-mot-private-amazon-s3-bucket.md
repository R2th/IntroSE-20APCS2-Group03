# Bài toán 

Ok, hiện tại thì hệ thống mà mình đang làm đang sử dụng AWS S3 để lưu file và nội dung mà user lưu trữ. Cho đến một ngày đẹp trời, khách hàng tự dưng có yêu cầu: Chuyển việc trích xuất và lấy các tài nguyên lưu trên S3 đó - thay vì lấy trực tiếp từ S3 - thì sẽ chuyển sang lấy thông qua CloudFront. Tất nhiên là họ cũng có lý do:
- Khách hàng có phát triển một app, trong đó có nhúng WebView để hiện thị trang web mình đang làm; tình cờ là app đó cũng có chức năng giới hạn domain, website mà client có thể truy cập => Thay vì cho domain của S3 vào whitelist, họ lại muốn sử dụng CloudFront để chuyển domain về cùng với hệ thống asset cũ của họ :|
- Tận dụng được lợi ích của 1 CDN (giảm thiểu chi phí request tới S3 , tăng tốc độ tải tài nguyên nhờ vào caching ... bla bla bla)

:|

...

Ok, làm thôi :)

## Giới thiệu

Bỏ qua phần giới thiệu, vì các khái niệm S3 và CloudFront - nếu các bạn đã có ý định click và đọc bài viết này - thì hẳn ít nhất bạn cũng đã nắm được chúng là rồi.

Còn đối với ai thực sự chưa biết, thì có thể đến với bài giới thiệu sau:
https://viblo.asia/p/amazon-s3-with-amazon-cloudfront-OeVKBxyMlkW

# Thiết lập AWS cho CloudFront và S3

## Khởi tạo bucket cho S3

Quay lại bài toán lúc đầu, mình sẽ cần một bucket trên S3. Trong trường hợp chưa có, ta có thể tạo một cái mới. VD ở đây mình sẽ tạo một bucket S3 mới với tên `sample-s3-ntd`.

Để tạo một bucket thông qua AWS console, truy cập vào trang [S3 managament](https://console.aws.amazon.com/s3/home?region=ap-southeast-1)  và click "Create Bucket". 

![](https://images.viblo.asia/aa124ac1-bfec-4f6f-96e4-726c5de629ef.png)

Các step tiếp theo ta có thể để mặc định; và theo mặc định thì các resource trên bucket này sẽ là private.

Sau khi được tạo, bucket sẽ có URL là `https://sample-s3-ntd.s3-ap-southeast-1.amazonaws.com` (Chú ý là sẽ có phần region - `ap-southeast-1` - bên trong url)

Lúc này, mình sẽ có thể thử upload 1 file mới vào bucket này . Có thể thấy là sẽ có 1 url tương ứng để truy cập vào file vừa được upload:

![](https://images.viblo.asia/adef2040-ab70-4293-a0a6-b7fdd6e0fcc1.png)

Tuy nhiên, nếu thử truy cập trực tiếp vào URL kia, ta sẽ gặp error `AccessDenied`. Lý do vừa nói ở trên: bucket được tạo với setting mặc định thì các asset bên trong đều là private.

![](https://images.viblo.asia/e93f8c61-ce51-44a4-beac-ba1249c7feca.png)

## Tạo CloudFront Distribution

Step thứ 2: Ta sẽ tạo 1 cái Distribution mới cho CloudFront !

Tương tự với S3, ta có thể quản lý CloudFront thông qua trang [CloudFront Management](https://console.aws.amazon.com/cloudfront/home?region=ap-southeast-1#). Ở trang này, tạo một distrubtion băng cách click vào `Create Distribution`

1. Ở bước đầu tiên, chọn `Web` thay cho `RTMP`.

2. Ở bước thứ 2 - `Origin settings` - sẽ có một số setting ta cần quan tâm đến:
- **Origin domain name**: đây là địa chỉ domain của S3 bucket (chú ý là domain ở đây bao gồm cả region) - như bucket của mình thì sẽ là 
`sample-s3-ntd.s3-ap-southeast-1.amazonaws.com`
- **Origin Path**: Một distribution thực ra có thể kết nối tới nhiều origin, nhưng trong bài này thì ta chỉ cần 1 origin thôi, nên có thể dùng mặc định do AWS tự sinh ra cũng được.
- **Restrict Bucket Access**: `Yes`.
- **Origin Access Identity**: Ở đây ta sẽ chọn `Create a New Identity` (ở dưới ta sẽ quay lại với option còn lại sau - `Use an Existing Identity`)
- **Comment**: đặt tên cho cái identity tạo ở dòng trên. Mình sẽ để là `CloudFront OAI`
- **Grant Read Permissions on Bucket**: tiếp tục chọn là `Yes, Update Bucket Policy` (option còn lại - `No, I will Update Permissions` - sẽ yêu cầu ta phải thiết lập policy cho S3 bucket bằng tay)
- **Viewer Protocol Policy**: có thể chọn gì cũng đc, tuy nhiên vì mình thích dùng HTTPS hơn, nhưng vẫn muốn flexible một chút nên lựa chọn `Redirect HTTP to HTTPS` - cái này đọc tên các option là hiểu.
- **Query String Forwarding and Caching**: hiện giờ thì mặc định là `None`, nhưng ta có thể quay lại với nó sau.
- **Restrict Viewer Access (Use Signed URLs or Signed Cookies)**: cái này sẽ chọn là `Yes`
  - Ở đây khi ta chọn Yes, thì việc truy cập để lấy được asset S3 thông qua CloudFront cũng không thể trực tiếp được, mà phải thông qua một bước tạo ra signed_url hoặc sử dụng signed cookie nữa
- **Trusted Signers**: `Self`
- **Alternate Domain Names (CNAMEs)**: đây chính là chỗ mà để mình thực hiện theo như yêu cầu đề bài của khách - sử dụng một custom domain để truy cập vào CloudFront.


Tạm thời như vậy, nhấn Create distribution, và uống một cốc cà phê - sẽ phải mất tầm 15 phút để cái Distribution mới được khởi tạo xong.

![](https://images.viblo.asia/40f381f6-e9e2-490f-8b4c-7934125622c1.png)

***

Xong 15 phút ! Click vào xem Distribution mới mà ta vừa tạo xong !

Để ý dòng `Domain Name` - đây là domain của Distribution này (mặc định AWS sẽ sinh ra một domain random cho ta)

![](https://images.viblo.asia/829be315-5296-41b6-b1f7-9e5d6169560b.png)

Ta có thể sử dụng domain này để truy cập lấy tài nguyên vừa nãy vừa tạo bên S3 rồi. Nhớ lại đường link để lấy file bên S3:

```
https://sample-s3-ntd.s3-ap-southeast-1.amazonaws.com/07f29316d02c2f03864e94c388ed6b1834341364.jpg
```

Thay domain bằng domain mới của CloudFront, ta sẽ có:

```
https://dezzpzhhpx122.cloudfront.net/07f29316d02c2f03864e94c388ed6b1834341364.jpg
```

Truy cập thử vào đường link này, ta sẽ tiếp tục nhận được một error khác.

![](https://images.viblo.asia/ea057bd0-ef65-43b0-8179-3724046d7426.png)

Lý do của cái error này là ta cho lựa chọn `Restrict Viewer Access` ở phía trên. Lúc này, ta buộc phải truy cập tài nguyên của S3 thông qua việc sử dụng signed_url hoặc signed cookies của CloudFront.

Để có thể tạo được 2 cái kia, bước tiếp theo, ta cần tạo thêm 1 thứ nữa : `CloudFront Key Pair`

##  Tạo CloudFront Key Pair

Như đã nói ở trên, S3 Url có thể bị giới hạn - khi đó ta buộc phải sử dụng phiên bản signed của nó - ta có thể sign 1 S3 URL bằng chính S3, hoặc sử dụng signed_url của CloudFront (cách mình sẽ trình bày tiếp ở dưới). Để tạo được cái này, ta sẽ cần 1 thứ gọi là `CloudFront Key Pair`. Tuy nhiên ...

> [Important](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs-procedure) - Để tạo `CloudFront Key Pair` - bắt buộc phải login vào tài khỏa root. Một tài khoản IAM user không thể tạo được CloudFront Key Pair. 
 
Ok. Đăng nhập vào root user, vào trang `My Security Credentials`. Ở đây ta có thể thấy `CloudFront key pairs`. 

Tạo một key pair mới, **nhớ phải lưu lại file private key !!**, đồng thời copy lại cái `Access Key ID` (thực ra ko copy cũng đc, cái acccesskey này chính là tên file lưu private_key)

![](https://images.viblo.asia/8ce35931-4de0-4e4c-8e4f-511cbb644f95.png)

Giờ ta có thể sử dụng Key Pair này để tạo signed_url được rồi.

## Genarate CloudFront's signed URLs

Ở bước này, AWS cung cấp rất nhiều bộ SDK cho từng ngôn ngữ một : PHP, C#, JAVA, RUBY ...

Ở đây, mình sẽ demo thử bằng ngôn ngữ Ruby, với [bộ thư viện chuẩn của AWS](https://docs.aws.amazon.com/sdkforruby/api/Aws/CloudFront/UrlSigner.html)

```
signer = Aws::CloudFront::UrlSigner.new(
  key_pair_id: "cf-keypair-id",               # Access Key ID mình vừa tạo ra ban nãy.
  private_key_path: "./cf_private_key.pem"    # file chứa private_key đi kèm.
)
url = signer.signed_url(url, expires: Time.current.to_i + 30)
```

Ở đây ta có thể để ý thấy có param optional `expires`: Nếu thiết lập thêm param này, url được generated ra sẽ chỉ có thời gian sống  là 30 giây. Quá 30 giây, URL đó sẽ trở thành invalid.

Sử dụng đường link được generate ra, ta có thể xem được file rồi :)

***

## Ngoài lề 1: `Identity` khi tạo Distribution là gì ?

Vừa nãy mình có tua qua phần này 1 chút, tuy nhiên giờ ta có thể quay lại cái distribution ban nãy và nhìn lại cái này một chút.

![](https://images.viblo.asia/ffd898bc-88e2-47b1-acec-17cef0e9acb6.png)

Đây là màn hình edit distribution ban nãy, và ta có thể thấy là hiện thời nó đang sử dụng 1 `Identity` là `CloudFront OAI`. Đây là cái ta vừa mới tạo vừa nãy trong lúc tạo Distribution.

Quay lại màn hình chính của CloudFront, để ý bên menu bên trái có một phần tên là `Origin Access Identity`

![](https://images.viblo.asia/b7c43994-6843-4523-8883-8a7287d90578.png)

Click vào, ta sẽ vào được trang `Origin Access Identity` của CloudFront. Khái niệm của cái này đã được ghi trong [document của AWS](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)

> To restrict access to content that you serve from Amazon S3 buckets, you create CloudFront signed URLs or signed cookies to limit access to files in your Amazon S3 bucket, and then you create a special CloudFront user called an origin access identity (OAI) and associate it with your distribution. Then you configure permissions so that CloudFront can use the OAI to access and serve files to your users, but users can't use a direct URL to the S3 bucket to access a file there. Taking these steps help you maintain secure access to the files that you serve through CloudFront.

![](https://images.viblo.asia/4029640c-dfbc-4856-822d-ca69574eade8.png)

Tóm lại là OAI sẽ là 1 dạng user đặc biệt của CloudFront, nó sẽ có quyền truy cập vào các tài nguyên bên phía S3.

Vậy làm sao 1 user OAI có thể kết nối tới S3 ? 

Quay qua màn hình setting cho bucket bên phía S3.

bên trong bucket S3, đi vào `Permissions` => `Bucket Policy`, ta sẽ thấy một cụm như sau

![](https://images.viblo.asia/ea823d67-f8e6-4ae7-b628-a64aca827efa.png)

Ở đây, ta sẽ thấy phần dưới này chính là phần cấp phép cho user OAI kia truy cập vào các tài nguyên S3. (Cái cụm XXXXXX kia chính là ID của user OAI phía trên)

```
{
  "Sid": "1",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity XXXXXXXXXXXX"
  },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::sample-s3-ntd/*"
 },
```

Đây chính là phần mà ta thêm vào sau khi lựa chọn option `Grant Read Permissions on Bucket` là `Yes, Update Bucket Policy` (tức là khi nãy, nếu lựa chọn `I will Update Permissions` thì ta sẽ phải thêm cụm trên vào policy cho S3 bucket bằng tay).

Thêm nữa, vừa nãy khi chọn `Origin Access Identity`, ta đã chọn `Create a New Identity` - trên thực tế, các Origin có thể dùng lại một OAI user đã có, vì vậy ta sẽ có thêm option `Use an Existing Identity` khi tạo các Origin hay hay Distribution tiếp theo)

## Ngoài lề 2: gắn `content_disposition` và `content_type` cho CloudFront's signed_url

Cái ghi chú thứ 2 này là dành cho các bạn code Ruby, tuy nhiên các ngôn ngữ khác thì cơ chế cũng giống vậy.

Thực tế là đối với hệ thống của mình, file lưu trên S3 không hề chứa tên thật cũng như phần extension của file; thay vào đó, những thứ này sẽ lưu trong DB. Và theo logic trước đây của mình, khi tạo `signed_url` bằng S3, mình sẽ bao gồm cả 2 thứ `content_disposition` và `content_type` khi generate `S3 signed_url`. Lúc này thì link trả về cho client sẽ chứa 2 cái header `content_disposition` và `content_type`, 2 cái này mới là thứ quy định tên file hiển thị trên web cũng như tên file khi download.

Giờ khi chuyển sang sử dụng `CloudFront signed_url`, ta cũng có thể chứa 2 cái option kia vậy, tuy nhiên cách implement hơi khác 1 chút.

Mình có thể impelement một đoạn code như sau:

```
signer = Aws::CloudFront::UrlSigner.new(
  key_pair_id: "cf-keypair-id",               # Access Key ID mình vừa tạo ra ban nãy.
  private_key_path: "./cf_private_key.pem"    # file chứa private_key đi kèm.
)

content_disposition = "attachment; #{format_file_name(file)}"   # Hàm thực hiện generate ra chuỗi content_disposition
content_type = content_mime_type(file)                          # Hàm lấy ra content_type của file
file_path = generate_file_path(file)                            # generate ra đường dẫn của file trên S3
url = "#{cloud_front_domain}/#{file_path}?response-content-disposition=#{CGI.escape content_disposition}&response-content-type=#{CGI.escape content_type}"

signer.signed_url(url,  expires: Time.current.to_i + 30)

```