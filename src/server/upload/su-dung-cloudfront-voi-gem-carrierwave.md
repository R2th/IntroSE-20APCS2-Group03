*Hẳn mọi người đều biết đến aws s3 và gem carrierwave trong rails, gần đây mình có gặp một vấn đề khi vọc làm một trang web chia sẻ ảnh và video, đó là tốc độ load ảnh và video từ s3 về rất chậm. Sau một hồi tìm hiểu thì có thấy rất nhiều gợi ý về việc sử dụng cloud front. Sau khi dùng thử thì thấy tốc độ load trang ảnh video tăng lên rất rõ rệt, tuy nhiên mình lại vấp phải 1 vấn đề đó là với gem carrierwave, chính xác hơn là fog-aws chưa hỗ trợ cloudfront cho private file. Trong bài viết này mình sẽ trình bày khái quát về cloudfont và dùng cloud front cho public và private file*

### 1.Sơ lược về Cloudfront

- Amazon CloudFront là mạng CDN cung cấp dữ liệu, video, .. cho người người dùng truy cập một cách nhanh chóng và an toàn. CloudFront được tích hợp với AWS – cả các vị trí vật lý được kết nối trực tiếp với cơ sở hạ tầng toàn cầu của AWS, cũng như phần mềm hoạt động liên tục với các dịch vụ bao gồm AWS Shield ngăn chặn DDoS, Amazon S3, Elastic Load Balancing hoặc Amazon EC2 làm source cho các ứng dụng của bạn, và AWS Lambda để chạy mã tùy chỉnh gần với người xem của bạn.

- Amazon CloudFront có 107 điểm hiện tại (96 vị trí Edge và 11 Caching Edge Edge) ở 55 thành phố trên 24 quốc gia. 

- Khi sử dụng cloudfront các request get video, hình ảnh bây h sẽ ko routing đến s3 mà sẽ tự động được routing đến edge location gần nhất, vì vậy mà ta sẽ load hình ảnh, video nhanh hơn rất nhiều so với khi dùng link s3 như bình thường

![](https://images.viblo.asia/156dd7cb-33fb-4cd0-9215-4487835fc2c6.png)
- Với trường hợp khi  file của bạn trên s3 đều là public file thì bạn chỉ cần thêm vào file config carrierwave.rb
```
  config.asset_host  = 'http://yourcdn.yourdomain.com'
  config.fog_public = true
```
### 2. Couldfront cho private file

Với trường hợp file của bạn trên s3 là private file mà bạn vẫn settup như trên thì sẽ ko thể get được nội dung về và fog-aws thì chưa thấy support cho việc get private file, trên trang doc của ruby-aws (ver2) thì chỉ viết vọn vẹn
```
signer = Aws::CloudFront::UrlSigner.new(
  key_pair_id: "cf-keypair-id",
  private_key_path: "./cf_private_key.pem"
)
url = signer.signed_url(url,
  policy: policy.to_json
)
Parameters:
   url (String)
   params (Hash) (defaults to: {}) — a customizable set of options
Options Hash (params):
   :expires (Time, DateTime, Date, String, Integer<timestamp>)
   :policy (String<JSON>)
```
Ở đây mình thấy có 2 vấn đề: key pairs và policy
- Với key pairs bạn có thể xem hướng dẫn ở [đây](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-trusted-signers.html#private-content-creating-cloudfront-key-pairs) và set key_pair_id là key_pair_id bạn nhận được còn private_key_path chính là đường dẫn file pem khi download về
- Tiếp đến là policy, với một người mới mày mò như mình thì mình không thiểu hiểu policy ở đây là gì thậm chí lúc đầu mình còn nhầm tưởng với IAM policy, sau một hồi thì cg tìm thấy policy là một chuỗi json sẽ giúp xác định một url hợp lệ. Policy của cloudfont có 2 loại: Canned Policy và Custom Policy
- Trước hết đây là format 1 url đơn giản để lấy content private từ cloudfront:
http://xxxx.cloudfront.net/image.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kbmluMTZnO&Signature=nitfHRCrtziwO2HwPfW&Key-Pair-Id=APKA9ONS7QCOWEXAMPLE
Trong url này có http://xxxx.cloudfront.net/image.jpg là đường dẫn đến file của bạn lưu trên s3, Policy và Signature sẽ được sinh ra dựa theo chuỗi json policy, Key-Pair-Id đợn fianr chỉ là key_pair_id ở trên. Vậy chuỗi json policy có dạng như thế nào
- Canned Policy sẽ có dạng:
```
{
   "Statement":[
      {
         "Resource":"http://xxx.cloudfront.net/image.jpg",
         "Condition":{
            "DateLessThan":{
               "AWS:EpochTime":1357034400
            }
         }
      }
   ]
}
```
Với Resource chính là url public của file

DateLessThan:  có "AWS:EpochTime" được gán giá trị là 1 timestamp, đây là thời điểm hết hạn của url, sau thời điểm này nếu bạn tiếp tục sử dụng url này thì sẽ ko thể get được content
- Custome Policy có dạng
```
{ 
   "Statement": [
      { 
        "Resource":"http://xxx.cloudfront.net/image.jpg",
         "Condition":{ 
            "IpAddress":{"AWS:SourceIp":"192.0.2.10/32"},
            "DateGreaterThan":{"AWS:EpochTime":1357034400},
            "DateLessThan":{"AWS:EpochTime":1357120800}
         } 
      }
   ] 
}
```
Với Resource và DateLessThan như Canned Policy

IpAddress: ở đây ta có thể setup những user ở ip nào có thể get đựợc content

DateGreaterThan: cũng là thời gian dạng timestamp, trước khời điểm DateGreaterThan thì bạn cũng ko thể get được content

Với các condition ở trên thì DateLessThan là bắt buộc

Cuối cùng là tạo url từ policy
- Có 2 cách để gen url: sử dụng signed URLs hoặc signed cookies
- signed URLs  và signed cookies về cơ bản là giống nhau chỉ là signed URLs hỗ trợ RTMP còn signed cookies thì không và có một vài custon HTTP client không hỗ trợ cookies nên không thể sử dụng signed cookies

Việc còn lại bây h chỉ là viết 1 đọạn code để thay url s3 bằng một url cloudfront, dưới đây là một ví dụ mình đã viết một file trong thư mục lib/
```
require "fog"

module CarrierWave
  module Storage
    class Fog < Abstract
      class File
        include CarrierWave::Utilities::Uri
        def url
          signer = Aws::CloudFront::UrlSigner.new key_pair_id: ENV["KEY_PAIR_ID"],
                                                  private_key_path: ENV["PRIVATE_KEY_PATH"]
          policy = {
            Statement: [
              {
                Condition: {
                  DateLessThan: {:"AWS:EpochTime" => 2.minutes.from_now.to_i}
                }
              }
            ]
          }
          signer.signed_url(public_url, policy: policy.to_json)
        end
      end
    end
  end
end
```