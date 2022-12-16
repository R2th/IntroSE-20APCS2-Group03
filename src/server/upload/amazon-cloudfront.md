## Amazon CloudFront là gì?
Amazon CloudFront là 1 dạng CDN giúp tăng tốc độ tải 1 trang web tĩnh hoặc động đến với user của bạn.
Vì sao CloudFront có thể tăng tốc độ tải data cho bạn?
Đó là vì CloudFront phân phối content của bạn trên khắp mạng internet trên thế thế giới thông qua các data center được gọi là egde location (tiếng việt là vùng biên?).
Nếu thông tin mà user cần có sẵn ở edge location, CloudFront sẽ lấy từ egde location và ngay lập tức trả về cho user. Nếu  ở egde location không có thông tin mà user cần, CloudFront sẽ truy vấn đến nguồn content (origin serice) mà bạn đã khai báo (có thể là Amazon S3 Bucket, hoặc 1 web service,...) để get data và trả về cho user.

## Làm thế nào để setup CloudFront?
1. Đầu tiên bạn phải chỉ định origin service. Đây là nơi sẽ chứa content của bạn.
Origin service này có thể là Amazon S3 Bucket, 1 HTTP server. Bạn sẽ upload content (image, video, file,...) lên đây.
Nếu có điều kiện thì nên dùng Amazon S3 Bucket, Bởi vì việc truyền dữ liệu giữa các service của amazon sẽ được miễn phí.
Nếu bạn dùng 1 HTTP server bạn phải trả thêm 1 khoảng phí để transfer data. Hoặc là nếu HTTP server của bạn chạy trên Amazon EC2 thì cũng được miễn phí.

2. Upload content của bạn lên origin service. 
Nếu bạn sử dụng Amazon S3 Bucket, bạn có thể setting cho các bucket là *public readable* , như vậy tất cả mọi người có thể access đến file của bạn thông qua CloudFront.
Ví dụ, bạn upload 1 file tên là thisisimage.png và cloudfront có domain là this.is.cloudfront.domain
Bạn có thể access đến file này thông qua URL là https://this.is.cloudfront.domain/thisisimage.png . Nếu bạn không muốn giữ nguyên tên image sau khi upload thì có thể mã hóa tên file.
Hoặc bạn cũng có thể set bucket của bạn thành *private* và chỉ định những ai có thể access content của bạn.

3. Tạo CloudFront Distribution
Đây là cái sẽ khai báo cho CloudFront biết sẽ get content từ origin service nào khi có request của user.

4. CloudFront sẽ trả về 1 tên domain, đây chính là cloudfront domain bạn sẽ sử dụng để get content khi có request của user (là ví dụ this.is.cloudfront.domain ở trên). 
Bạn có thể tùy chỉnh thành tên domain mà bạn muốn

5. CloudFront sẽ send distribution configuration đến các egde location trên toàn thế giới.
Bạn cần lưu ý là CloudFront chỉ gửi distribution configuration chứ không gửi content của bạn.
CloudFront sẽ cache copies content của bạn

## Vì sao phải sử dụng CloudFront chứ không phải là access trực tiếp vào Origin Service?
### 1. Hiệu suất cao, truyền dữ liệu nhanh
Đương nhiên rồi, vì Amazon CloudFront sử dụng mạng lưới phân phối toàn cầu của Amazon, cho phép tăng tốc độ đối với cả nội dung tĩnh hoặc động.
Điều đó có nghĩa là bạn ko chỉ hiển thị 1 file nhanh, mà bạn còn có thể điền form, bình luận, mua hàng,...
Thêm nữa CDN cho phép tăng tối đa thời gian lưu trữ, giảm thiểu bộ nhớ đệm.
Nếu như bạn đặt ra câu hỏi chẳng cần thông qua CloudFront, access trực tiếp đến Amazon S3 bucket cũng nhanh vậy.
Thì câu trả lời nằm ở lý do thứ 2.

### 2. Tính bảo mật
Amazon CloudFront, AWS Shield, AWS Web Application Firewall (WAF) và Amazon Route 53 là sự kết hợp hoàn hảo bảo vệ bạn khỏi những tấn công mạng và ứng dụng, bao gồm tấn công DDoS.
Việc cho access thông qua CloudFront sẽ giúp bạn bỏ được hướng tấn công chính đối với content của bạn.
Thông thường đối với các ứng dụng phát triển trên sử dụng CloudFront, để test performance của ứng dụng, bạn cần phải thông báo trước với Amazon, nếu không hành vi truy cập nhiều lần với khối lượng lớn sẽ bị nhận định là tấn công DDoS và không thể thực hiện request.

Ngoài ra, CloudFront còn cung cấp cho bạn dịch vụ mã hóa SSL/TLS và HTTPS với khả năng tối ưu hóa và tính năng cao cấp như HTTPS toàn cầu/nửa cầu, Session Tickets,...
Tuyệt vời hơn ACM còn tự động gia hạn chứng chỉ, giúp bạn loại bỏ hoàn toàn các chi phí khi gia hạn thủ công.

Ngoài ra, với CloudFront bạn có thể kiểm soát được truy cập thông qua một số tính năng:
* Sử dụng URL có chữ ký và Cookie có chữ ký, chỉ những người dùng có Mã xác thực mới có thể truy cập
* Sử dụng tính năng giới hạn địa lý, bạn có thể giới hạn người dùng ở những vị trí địa lý nào đó không thể truy cập thông qua CloudFront
* Sử dụng Origin Access Identity (OAI), bạn có thể giới hạn chỉ cho truy cập đến Amazon S3 thông qua CloudFront

### 3. Có thể lập trình và thân thiện với Devops

Amazon cung cấp cho các developer API đầy đủ các tính năng để tạo, cấu hình và duy trì phân phối CloudFront.
Đặc biệt với service Lambda@Egde sẽ giúp các developer chạy code của mình chạy gần hơn với user.
Sử dụng Lambda@Egde giúp bạn phản hồi một cách nhanh nhất giữa các vị trí AWS trên toàn cầu.
Đối với request web hoặc app có thể phân phối đến gần hơn với khách hàng, năng cao trải nghiệm của người dùng.
Đặc biệt, bạn chỉ trả phí cho thời gian xử lý thông tin mà bạn sử dụng thôi, khi bạn không chạy mã thì sẽ không tính phí.


Tóm lại là, cứ dùng đi. Bạn sẽ thấy nó rất là hay. :))