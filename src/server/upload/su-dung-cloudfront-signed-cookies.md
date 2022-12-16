Giả sử bạn có một nội dung (ví dụ: file phương tiện hoặc file phông chữ TTF) mà muốn sử dụng trên ứng dụng web công khai của mình nhưng đồng thời, muốn ngăn bất kỳ người dùng nào truy cập trực tiếp vào tệp đó thông qua url.

Một giải pháp tiềm năng là sử dụng AWS S3 và chặn tất cả quyền truy cập công khai vào file đó. Sau đó, chúng ta sẽ sử dụng CloudFront distribution để phân phát file này và đảm bảo rằng file chỉ được phân phối nếu khách hàng gửi các **cookie** đã ký kèm theo request. Do đó, cấp quyền truy cập vào file cho các ứng dụng được ủy quyền.

![](https://images.viblo.asia/c754e5b6-d3d7-46d8-84e0-0d9446829dc6.png)

Chúng ta sẽ bắt đầu đi qua từng bước để setup CloudFront distribution và sử dụng. 

### 1. Chúng ta sẽ tạo một S3 bucket và thử tải một file lên đó

![](https://images.viblo.asia/5f050ee3-c49b-4e29-bafe-74712d351b02.png)

Trong ví dụ này mình sẽ sử dụng một bucket có tên là **demo-cf-signed-cookie** và một file tải lên là *cofort_z.jpg*

### 2. Tạo 1 CloudFront distribution và phân phối nội dung từ bucket trên

Để tạo một distribution hãy truy cập vào [link](https://console.aws.amazon.com/cloudfront/v3/home?region=ap-northeast-1#/distributions)

![](https://images.viblo.asia/61b7e6c9-e76f-4655-b6b0-089a110d2f0c.png)

> Chọn Create Distribution

Sau đó sẽ tạo thông tin như các hình bên dưới
Lựa chọn **Origin** 

![](https://images.viblo.asia/3cbe1f56-ddac-4de8-939e-3359ad6b6718.png)

Ở đây mình sẽ cần phải lựa chọn:

- *Origin domain*: chính là S3 bucket mà mình đã tạo trước đó **demo-cf-signed-cookie.s3.ap-northeast-1.amazonaws.com**. Bạn chỉ cần lựa chọn đúng S3 bucket bạn muốn tạo là được
- *S3 bucket access*: Ở đây mình cần phải lựa chọn một OAI - Origin access identities (nếu chưa có thì có thể bấm nút tạo mới OAI) để cấp quyền cho phép CloudFront Distribution truy cập vào S3 bucket. (Do ở đây S3 bucket của mình đa chặn tất cả truy cập từ bên ngoài)
- *Yes, update the bucket policy*: bạn có thể lựa chọn ở đây để tự động update S3 policy như hình bên dưới

![](https://images.viblo.asia/0c4dd8b4-8a65-4aae-93f1-bf8829d2e8a0.png)

```json
"Principal": {
    "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E2WBU6DZ3ZPV3P"
}
```

Bạn sẽ thấy rằng có "Origin Access Identity **E2WBU6DZ3ZPV3P**" chính là ID của OAI chúng ta đã lựa chọn. Như vậy là Distribution đã có thể acceses được tới S3 bucket để đọc các file nội dung trong đó.

Các mục còn lại chúng ta sẽ để mặc định

Setting **Default cache behavior**

![](https://images.viblo.asia/2060379a-e9b9-4825-9627-1f2f5f0b692c.png)

Ở đây mình sẽ cần phải lựa chọn:

- *Restrict viewer access*: Yes. Nghĩa là hạn chế quyền truy cập. Ai muốn truy cập phải sử dụng  CloudFront **signed URLs** or **signed cookies** các file nội dung (Ở bài viết này ta sẽ dùng signed cookies)
- *Trusted authorization type*: AWS cung cấp cho chúng 2 lựa chọn đó là 
    - Trusted key groups: được coi là best practice để sử dụng. Lí do là vì chúng ta có thể tạo ra trusted key group từ một IAM account, không cần phải sử dụng tới root account. như vậy sẽ phát sinh rất nhiều rủi ro. Để tạo ra trusted key group khá đơn giản các bạn chỉ cần follow theo link hướng dẫn ở [đây](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html). Rồi sau đó chọn Trust key group tương ứng
    - Trusted signer: để nhanh các bạn có thể tạo ra CloudFront key pair theo như hướng dẫn ở [đây](https://support.s3mediamaestro.com/article/204-how-to-obtain-your-cloudfront-key-pair-id-and-private-key) tuy nhiên sẽ phải sử dụng root account để tạo. Và cũng có giới hạn là chỉ được phép có tối đa 2 active key một thời điểm. Nên mình không khuyến khích cách này. 

Những mục khác chúng ta sẽ để mặc định

Setting **Cache key and origin requests**

![](https://images.viblo.asia/4329380e-4d7c-40f9-bfb7-074718ddbce1.png)

Ở đây tạm thời chúng ta sẽ để mặc định

Sau khi tạo xong chúng ta sẽ cần chờ một chút để distribution sẵn sàng hoạt động khi Status là active như hình

![](https://images.viblo.asia/b64580ca-c57f-483e-a976-1b23c02c8443.png)

Sau khi tạo chúng ta có được một Distribution domain name như sau 

![](https://images.viblo.asia/374b2ab7-fcc4-4ea0-a628-788f730a04ae.png)

Bây giờ nếu bạn cố gắng truy cập tệp trực tiếp từ S3, bạn sẽ gặp lỗi AccessDenied sau

![](https://images.viblo.asia/e57a5dd6-ef90-44fd-b005-8dd7338873a4.png)

Sử dụng CloudFront domain để thử request tới file chúng ta đã upload trong bucket. Chúng ta sẽ gặp lỗi như sau: 

![](https://images.viblo.asia/5ca35fcc-119f-47a4-9b66-f18b822d25ad.png)

Nếu như bạn gặp lỗi như thế này, điều đó có nghĩa là những config đã chính xác rồi. 

### 3. Sử dụng cookies để truy cập vào nội dung

Bây giờ chúng ta sẽ sinh ra cookies để có thể truy cập vào nội dung đã phân phối trên distribution. 

MÌnh sẽ sử dụng AWS sdk với ruby để viết một đoạn code nhỏ. 

Đầu tiên bạn cần sử dụng gem 
```ruby
gem 'aws-sdk'
```

và chạy đoạn code dưới đây
```ruby
class CloudFront::SignedCookies
  def initialize
    @key_pair_id = "K19RVJW1EM6ANX"
    @private_key_path = "./private.pem"
    @cf_domain = "https://d1kcof81dpqlbr.cloudfront.net"
  end

  def generate_cookie
    url = "https://#{cf_domain}/"
    signer = Aws::CloudFront::CookieSigner.new key_pair_id: key_pair_id, private_key_path: private_key_path
    signer.signed_cookie(url, policy: policy.to_json)
  end

  private

  attr_reader :key_pair_id, :private_key_path, :cf_domain

  def policy
    {
      Statement: [
        {
          Resource: "http*://#{cf_domain}/*",
          Condition: {
            DateLessThan: {:"AWS:EpochTime" => 60.minutes.from_now.to_i}
          }
        }
      ]
    }
  end
end
```

Ở đây chúng ta sẽ cần lưu ý một số thông tin:
- *key_pair_id*: Như nội dung ở trên đã viết, mình sử dụng trusted key group để làm *Trusted authorization type*. Nên id truyền vào ở đây chính là ID của public key mà chúng ta đã tạo ra ở trên dùng cho trusted key group. Như hình sau 

![](https://images.viblo.asia/c4f92d60-d0bb-43be-96ff-16b0f8e8a0d0.png)

- *private_key_path*: Đường dẫn tới file private key chúng ta đã sinh ra trước đó ứng với public key đã tạo. 
- *cf_domain*: domain của file distribution đã tạo
- *private_key*: Ngoài ra nếu bạn không muốn dùng private_key_path thì có thể khai báo luôn private key file như sau: 

```ruby
signer = Aws::CloudFront::CookieSigner.new key_pair_id: key_pair_id, private_key: "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA4oVdtSLhP0j3kdZQcIve1KLuQUaSedI+Judw+4C9FXog8aw8\n.....\n-----END RSA PRIVATE KEY-----\n"
```
- *policy*: Ở đây chúng ta sẽ khai báo các policy khi truy cập vào tài nguyên. Các bạn có thể tham khảo ở [đây](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-setting-signed-cookie-canned-policy.html) để sử dụng các policy tương ứng trong bài viết mình sử dụng policy duy nhất là có hiệu lực trong 1 giờ kể từ khi được sinh ra

Sau khi các bước setup thành công, các bạn có thể chạy code và sẽ sinh cookies dưới dạng như sau:

```json
{
  "CloudFront-Key-Pair-Id": "K19RVJW1EM6ANX"
  "CloudFront-Policy": "eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kMnRtaWtmem16cTdlOC5jbG91ZGZyb250Lm5ldC8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjI2NzcwODU5fX19XX0_"
  "CloudFront-Signature": "a1bJHVLGK90jV8T9YS05uc6AuByZlmnMBtJgjlpaT-YieddX1BIG9UpJlZoBhIPuk5Je1LL6DVSBtBqE3uUZQdcA8edaogWzLq1OsAhXH0%7E9oqT33bFDsw2r1dCm2mw5tt5wgQj-DNEWOvxISIbePdvpWcrF4xOiGD0RcXFeNXxyVRVW2PzpMid5iqd0xYfYEIXJu8mgfmSKwWIFOfW1adgdsYUmwlsHvX6n-nMOXmEogGT0MDgjSs83%7Emv9Spsu%7EvTcI6t7pC2UsWTYPgQt%7Ej0nrrapfpePcFUfgJ5IVgBcYJfbIgTz2YyqSjYYsMiG9BzG3FmZbEi%7E60LtB9UAdw__"
}
```

Bây giờ chúng ta có thể sử dụng Postman để test thử kết quả của mình. 

![](https://images.viblo.asia/bcd137ab-f8e6-4d78-8ab9-05243e8f67f5.png)

Khi thực hiện request tới https://d1kcof81dpqlbr.cloudfront.net/cofort_z.jpg bằng postman chúng ta vẫn nhận được kết quả báo lỗi. 
Bây giờ chúng ta sẽ tiến hành set cookies cho domain tương ứng. Các bạn có thể chọn vào nút Cookie màu xanh để add domain và cookie value tương ứng như các hình 

![](https://images.viblo.asia/4f45f325-1138-42b3-ad2a-9f813b5aa2db.png)

Đầu tiên add domain. 

![](https://images.viblo.asia/50861bdd-ba32-4432-85d2-fa1b899deb31.png)

Set 3 cookies

![](https://images.viblo.asia/3eb831fb-48da-497a-b327-d53f34ced9bd.png)

Cuối cùng chúng ta sẽ được kết quả như thế này. 

### 4. Các lỗi có thể bạn sẽ gặp phải. 

Trong quá trình tìm hiểu và sử dụng, mình gặp phải một vấn đề chắc như sau - mình sẽ giải thích kèm theo để mọi người nắm được: 

- Gặp vấn đề với việc set cookies cho application: Nếu như bạn dùng web bạn sẽ thấy chúng ta có sử dụng một domain cho web của bạn là https://myawesomeapp.com, nhưng domain của CF distribution lại là https://d1kcof81dpqlbr.cloudfront.net khi set cookies 

```js
document.cookie = "CloudFront-Key-Pair-Id=K19RVJW1EM6ANX; expires=Thu, 18 Aug 2021 12:00:00 UTC; path=/";
```

Chúng ta sẽ chỉ set được trong cùng một domain mà thôi. Không thể set cookie cho một domain khác được. 

- Gặp vấn đề với cross-origin-resource-sharing: Vấn đề này thì chắc các bạn cung nắm được lí do vì sao. Chúng ta sẽ thường xuyên thấy lỗi "Font from origin 'https://d1kcof81dpqlbr.cloudfront.net' has been blocked from loading by Cross-Origin Resource Sharing policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https://www.myawesomeapp.com' is therefore not allowed access'

Mặc dù chúng ta gặp 2 lỗi khác nhau nhưng về cơ bản chúng ta có một các xử lý khá là đơn giản: 

Đó là sử dụng domain phụ DNS của mình để giải quyết vấn đề này. Nếu CDN đứng sau **cdn.myawesomeapp.com** thay vì **d1kcof81dpqlbr.cloudfront.net** thì các trình duyệt sẽ không phải lo lắng và chặn chúng do các vấn đề bảo mật cross domain.

Để trỏ domain phụ tới AWS Cloudfront, hãy vào màn hình quản lý Cloudfront distribution như hình, ở tab General bấm nút Setting

![](https://images.viblo.asia/fa018013-8b96-49b7-bc38-d7f77fb4b6b5.png)

Ở đây chúng ta sẽ thấy "*Alternate domain name (CNAME) - optional*". Có thể thêm một sub domain như là cdn.myawesomeapp.com 

![](https://images.viblo.asia/931665bc-55aa-4cef-9cbe-f9cc23cd13b5.png)

Bây giờ bạn có thể truy cập nhà cung cấp DNS của mình (như AWS Route 53) và tạo CNAME cho cdn.myawesomeapp.com trỏ đến d1kcof81dpqlbr.cloudfront.net

Bên cạnh đó bạn cũng cần thực hiện sửa lại một đôi chút trong behavior của distrubution như sau 

![](https://images.viblo.asia/cf12a6ed-3770-4101-94b9-5315b3e6da0e.png)

Chúng ta sẽ cần lựa chọn forwards the appropriate headers để gửi kèm trên các request mà chúng ta gửi đi.
- Access-Control-Request-Headers
- Access-Control-Request-Method
- Origin

Tất nhiên các bạn cũng nhớ cần phải setup Cross-origin resource sharing (CORS) trên S3 bucket của mình như sau nữa nhé 

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

Sau khi setup mọi thứ xong xuôi, bạn sẽ thấy chúng ta có thể sử dụng https://cdn.myawesomeapp.com để truy cập vào các tài nguyên của mình một cách dễ dàng.

Hi vọng bài viết có thể giúp ích cho bạn khi sử dụng CloudFront Signed Cookies.

Bài viết mình có tham khảo từ:
https://medium.com/@himanshuarora/protect-private-content-using-cloudfront-signed-cookies-fd9674faec3
https://blog.cloud66.com/cross-origin-resource-sharing-cors-blocked-for-cloudfront-in-rails/
https://aws.amazon.com/premiumsupport/knowledge-center/no-access-control-allow-origin-error/