## Introduction
`Amazon S3` là một trong những web services nổi tiếng của Amazon, nơi để lưu trữ data như hình ảnh, video, thư mục.. cần thiết cho một website. Sử dụng `S3` khiến mọi thứ trở nên dễ dàng hơn nhiều, ta không cần bận tâm đến dung lượng lưu trữ vì tính chất `auto scaling`, hơn nữa bản chất của nó là `serverless service` nên chúng ta chỉ cẩn quan tâm đến việc đẩy data lên, và lấy xuống bất cứ lúc nào cần mà thôi.

Mặc dù `Amazon S3` đem lại khá nhiều lợi ích với vai trò `data storage`, nhưng để tối ưu hóa performance và bảo mật với chi phí phù hợp thì chúng ta vẫn nên sử dụng `S3` song song với `Amazon CloudFront`. Vậy `Amazon CloudFront` cụ thể là gì?
## Amazon CloudFront
`Amazon CloudFront` là cũng là một `web service` do Amazon cung cấp với mục đích tăng tốc độ phân phối dữ liệu tĩnh (static content) và động (dynamic content) của một website như video, image, các files js, css, html.. cho người sử dụng. `CloudFront` lưu trữ và phân phối data thông qua các trung tâm mạng lưới dữ liệu trên toàn thế giới, được gọi là `Edge locations`:

![](https://images.viblo.asia/24eaf854-33a6-4829-b83a-dfc736598829.png)

Cụ thể như với một file "logo.png" được cung cấp thẳng từ `web server` mà không qua `Cloudfront` với URL: "http://example.com/logo.png". Người dùng có thể truy cập theo URL và có được file mình muốn, tuy nhiên, request của người dùng có thể bị điều phối từ network này sang network khác, thông qua một tập hợp phức tạp các mạng lưới kết hợp với nhau (`the complex collection of interconnected networks`) cho đến khi file được tìm thấy.

Với `CloudFront` mỗi request sẽ được định tuyến thông qua `AWS backbone network` tới các `Edge locations` để có thể đưa các data cần thiết đến người dùng một cách tốt nhất, thường được gọi là `CloudFront edge server`. Sử dụng `Cloudfront` giúp giảm đáng kể số lượng networks mà request của người dùng phải đi qua và các data source gốc đều được cached lại, điều này giúp tăng tốc độ truyền tải, cũng như tăng độ tin cậy và tính khả dụng.

![](https://images.viblo.asia/b039a4e3-ce07-4dda-8896-2220fdfcf2f0.png)

Khi người dùng request một nội dung được phân phối qua `cloudfront`, request ngay lập tức được điều hướng đến `Edge locations` gần nhất nhằm đảm bảo độ trễ thấp nhất (lowest latency) và nội dung được gửi đi với tốc độ nhanh nhất có thể. Nguyên lý của nó như sau:
* Nếu content đã có sẵn ở `edge location`(cached), `CloudFront` sẽ gửi nó đi ngay lập tức
* Ngược lại nếu content chưa có ở `edge location`, `CloudFront` sẽ lấy nó ở địa chỉ lưu trữ gốc, chẳng hạn như `S3 bucket`, hay một `HTTP server`, nơi chứa source location của content đó

### Storing and Delivering your Content with Speed and Scale
![](https://images.viblo.asia/2fa5cde8-90c7-4a93-8b2c-b82ebaf7749a.jpg)

Để hình dung cụ thể hơn lí do tại sao nên dùng `s3` kết hợp với `CloudFront`, cùng xét một ví dụ chúng ta store data ở S3 bucket tại khu vực Europe, và người dùng thì ở khắp thế giới. Như hình trên, bất cứ khi nào người dùng request đến data được lưu trữ ở S3, request đó sẽ đi qua các public network khác nhau để đến được `S3 bucket` ở Europe. Tùy thuộc vào các vị trí địa lý khác nhau của người dùng mà thời gian phản hồi có thể nhanh hoặc chậm, điều này thậm chí có thể dẫn đến timeout error trong một số trường hợp.

![](https://images.viblo.asia/44a8b5c8-267b-4c64-8377-5bdfc7b6032b.jpg)

Nếu trong trường hợp chúng ta sử dụng song song với `CloudFront`, như hình trên ta có thể thấy các request cho dù từ khắp mọi nơi trên thế giới, thay vì mất một quãng đường dài để đến `S3 bucket` thì giờ chỉ cần đến các `Edge location` gần nhất tuơng ứng với từng khu vực. `CloudFront server` ngay lập tức "cached" S3 data và trực tiếp gửi về cho người dùng, tuơng ứng với các mũi tên màu xanh trên hình. Trường hợp data chưa được `Edge location` "cached", `CloudFront` sẽ lấy data từ S3 Bucket origin. Cũng bởi vì data đi qua `Aws private network` thay vì public network thông thường, và `CloudFront` cũng tối ưu hóa `TPC handshake` nên request và data trả về sẽ nhanh hơn rất nhiều so với khi thông qua public internet.

### Securing Your Content
Khi cung cấp các data lên internet, chủ sở hữu thường muốn hạn chế quyền truy cập vào các business data, documents, files trừ một số người dùng đặc biệt được cấp quyền (chẳng hạn như khách hàng). Bằng cách sử dụng `CloudFront`, chúng ta có thể thiết lập các thêm các hạn chế bổ sung như `geo-restrictions` (hạn chế địa lý), `signed URLs`, và `signed cookies` tùy theo các tiêu chí khác nhau.

![](https://images.viblo.asia/1702cb2d-a334-4cb6-85a9-071099244aaf.png)

Một tính năng bảo mật khác khá hay nữa của `CloudFront` là `Origin Access Identity (OAI)` - hạn chế quyền truy cập thẳng vào S3 Bucket mà chỉ được qua `CloudFront` và các action mà nó thực hiện.

`CloudFront` bao gồm thêm tính năng bảo mật bổ sung chống lại các khai thác độc hại (malicious exploits). Để cung cấp các biện pháp bảo mật này, `CloudFront` tích hợp với cả `AWS WAF` - một web firewall giúp bảo vệ các ứng dụng web khỏi các common malicious exploits và `AWS Shield` - một DDoS protection service cho các ứng dụng web sử dụng AWS. `AWS WAF` cho phép chúng ta kiểm soát quyền truy cập vào content, dựa trên các điều kiện ta thiết lập, chẳng hạn như địa chỉ IP hoặc query string value của content. Tất cả `CloudFront customers` đều được bảo vệ tự động theo tiêu chuẩn `AWS Shield Standard` miễn phí. Đối với người muốn tìm hiểu sâu hơn, có thể sử dụng `AWS Shield Advanced` với một khoản chi phí tương ứng.

### Implement
Để thiết lập `Amazon CloudFront Distribution` cho S3 Bucket, các bạn có thể tham khảo thêm tài liệu hướng dẫn khá cụ thể của Amazon tại [đây](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html). 

## Summary
Bài viết nhằm giới thiệu về `Amazon CloudFront` và các lợi ích của nó khi sử dụng cùng với `Amazon S3`. Bài viết còn nhiều hạn chế, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn:
* https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html
* https://aws.amazon.com/jp/blogs/networking-and-content-delivery/amazon-s3-amazon-cloudfront-a-match-made-in-the-cloud/