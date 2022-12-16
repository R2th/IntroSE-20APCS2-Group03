![](https://images.viblo.asia/7ba77a92-1c8e-445d-940b-99cf6ff077f0.jpg)

Bảo mật là vấn đề quan trọng với các ứng dụng web, đặc biệt là các web được sử dụng rộng rãi trên toàn cầu. Khi một số tài nguyên được công khai, chúng sẽ bị tấn công bằng các cách khác nhau. Thật không may là một số nhà phát triển lại không chú ý đến vấn đề bảo mật này.

## Các cách tấn công web cơ bản

Có rất nhiều cách tấn công web, nhưng cơ bản thì có DDos, SQL injection và XSS. Chúng ta sẽ đưa ra giải pháp cho các cách tấn công này trong bài viết.

## AWS Web Application Firewall có thể làm gì?

AWS WAF giúp bảo vệ web của bạn khỏi các tấn công cơ bản, cái mà có thể gây ảnh hưởng đến tính khả dụng của web, vi phạm bảo mật và ảnh hưởng đến hiệu suất của web.

- Nếu lo lắng về việc xây dựng bảo mật cho các cách tấn công cơ bản? -> AWS WAF sẽ là một giải pháp cho việc này.
- Làm thế nào để chặn một địa chỉ IP nhất định không cho truy cập vào web của bạn? -> AWS WAF rất dễ dàng để làm việc đó.

## Bắt đầu với AWS WAF

AWS WAF bao gồm web ACLs và các quy tắc khác trong đó. Nếu bạn chưa từng làm việc với web ACLs trước đây, những điều này sẽ cung cấp cho bạn quyền kiểm soát chi tiết với các request  được trả bởi Amazon API Gateway API, Amazon CloudFront distribution hoặc Application Load Balancer (AWS ALB).

![](https://images.viblo.asia/9a538ddb-fd1d-498f-96cd-44e12fd838eb.png)

Trên màn hình này, bạn có thể tạo web ACLs và thêm hoặc tạo các quy tắc cho nó. Trong AWS Marketplace, bạn có thể tìm các quy tắc có sẵn và đã được kiểm duyệt để sử dụng (có mất phí). 
AWS WAF đi kèm với các quy tắc được cài đặt sẵn sẽ giúp bạn bảo vệ ứng dụng của mình khỏi các loại tấn công khác nhau. AWS WAF chỉ có thể sử dụng ở trước AWS Application Load Balancer (AWS ALB), Amazon CloudFront distribution, hoặc Amazon API Gateway.

Các tài liệu cấu hình có sẵn:
https://aws.amazon.com/answers/security/aws-waf-security-automations/?refid=gs_card

Những mẫu này tạo một tập hợp các tài nguyên như sau:

![](https://images.viblo.asia/dab9c0cd-87df-4e74-b7d2-948ce6d1bfef.png)

Giải pháp này rất dễ triển khai thông qua AWS CloudFormation và bạn có thể bật tắt việc phòng tránh các tấn công được mô tả trong sơ đồi trên.

## Các quy tắc được tạo bởi AWS WAF

Các template này tạo theo các quy tắc sau:

![](https://images.viblo.asia/3916e172-5fb5-43b6-8add-ac7c6b0bf232.png)

### 1. Bad bot & scraper protection

Khi bạn chạy script AWS CloudFormation, nó sẽ cung cấp cho bạn một honeypot URL mà bạn có thể nhúng vào web của mình dưới dạng link HTML ẩn. Vì vậy nếu nột Bot truy cập url đó, IP đó ẽ bị chặn và người dùng đó sẽ không thể truy cập web của bạn nữa.

### 2. SQL injection protection

Quy tắc này sẽ bảo vệ web của bạn khỏi các tấn công SQL injection. Nó sẽ quét các URL, query string, headers, HTML body và nhiều thứ khác nữa. Cụ thể trong ảnh sau:

![](https://images.viblo.asia/a621f135-f776-4e79-9783-2b83a6df67b3.png)

### 3. Cross-site scripting protection

Tạo ra một quy tắc bảo vệ web của bạn khỏi các tấn công XSS. Nó sẽ quét các URL, query string, headers và HTML body.
Cùng giống các quy tắc được xác định để chống tấn công SQL injection như trên.

### 4. Scanner & probe protection

Chức năng tùy chỉnh AWS Lambda sẽ tự động phân tích access logs, tự động kiểm tra các hành vi đáng nghi ngờ và thêm các IP đó vào danh sách bị block.

### 5. Whitelisting & blacklisting IPs

Quy tắc này cho phép bạn tạo các whitelist và blacklist IP address.

### 6. Known attacker protection

Chức năng tùy chỉnh AWS Lambda sẽ tự động kiểm tra danh sách IP của bên thứ 3 hàng giờ để biết các địa chỉ IP độc hại vào thêm vào danh sách bị block.

### 7. HTTP flood protection

Cấu hình quy tắc rate-based, tự động chặn các request từ phía client mà vượt quá ngưỡng nhất định mà bạn đã chỉ định trước.

## Áp dụng web ACLs cho resources

Như mô tả ở trên, WAF chỉ áp dụng cho AWS ALB, Amazon CloudFront distribution, hoặc Amazon API Gateway. Bạn có thể thêm liên kết trong tab web ACL Rules như dưới đây:

![](https://images.viblo.asia/b5773da5-e885-479d-b251-b82514523d02.png)

Ví dụ trong bản demo này, tôi áp dụng các quy tắc trên cho AWS ALB. 

Đây là web server Apache của tôi chạy phía sau AWS ALB:

![](https://images.viblo.asia/4dce5b5f-f541-413f-ad87-f87af3277b3f.png)

Bây giờ hãy thử kiểm tra quy tắc SQL injection. Tôi sẽ truyền lệnh SQL vào query string.

- Trước khi dùng web ACL: 
  Như hình bên dưới, trước khi áp dụng web ACL, request này vẫn pass. Web của bạn rất dễ bị tấn công, hacker có thể dễ dàng truy cập vào database của bạn.
  
  ![](https://images.viblo.asia/04452881-de0a-4019-a333-2fe2fdf12358.png)
  
- Sau khi dùng ACL:
  Sẽ trả về 403 Forbidden error. Bạn có thể customize trang này cho phù hợp với web của bạn.
  
Với một web ACL đã thiết kế, bạn có thể sử dụng cho các ứng dụng khác.

## Nguồn

https://www.nclouds.com/blog/security-apps-aws-web-application-firewall/