# S3 security and encription
Mặc định thì tất cả các buckets được tạo ra là PRIVATE, bạn có thể sửa cài đặt để có thể access vào bucket bằng cách sử dụng:
 Bucket Policies
Access Control Lists
		
Trong s3 buckets bạn có thể config để tạo ra access log, nghĩa là tất cả các request tới s3 bucket sẽ được log lại  

## Có 2 kiểu encription 

### Encription In Transit được thực thi bởi SSL/TLS

### Encription At Rest(Server side):

Encript tại nơi dữ liệu được lưu trữ

Có 2 cách để ta có thể encript s3 object là phía server side hoặc là client side 

Encript phía server side là cách mà Amazone sẽ giúp chúng ta encript object, trong khi đó Encript phía client side là việc mà ta tự encript object và upload lên S3

Có 3 kiểu encript phía server side:

* S3 managed Keys-SSE-S3: đây là nơi mà Amazone sẽ tự động quản lý key, ta có thể sử dụng key đó để encript object 
* AWS Key management Service, Managed Keys - SSE - KMS: đây là nơi mà bạn và Amazon cùng quản lý keys
* Server side encription with customer provided Keys - SSE -C: Đây là nơi mà bạn chia sẻ key với amazon và bạn có thể encript s3 objects

Ví dụ 
Tôi vào một s3 bucket và encript cho bức ảnh của mình

![](https://images.viblo.asia/73805b14-0ec0-4bd8-8555-f3ce48c06400.png)

![](https://images.viblo.asia/0370dc6a-4db0-425a-a5d0-4e56e477fb48.png)

![](https://images.viblo.asia/40519efd-79cc-47c9-b5f4-a0370152bb57.png)

# Cloudfront 
Amazon CloudFront là dịch vụ mạng phân phối nội dung (CDN) nhanh giúp phân phối dữ liệu, video, ứng dụng và API đến khách hàng trên toàn cầu một cách bảo mật, với độ trễ thấp, tốc độ truyền cao, tất cả trong một môi trường thân thiện với nhà phát triển.
CloudFront được tích hợp với AWS – cả hai vị trí vật lý được kết nối trực tiếp với cơ sở hạ tầng toàn cầu của AWS cũng như các dịch vụ AWS khác. 

CloudFront hoạt động liền mạch với các dịch vụ bao gồm AWS Shield để giảm thiểu DDoS, Amazon S3, Elastic Load Balancing hoặc Amazon EC2 làm nguồn cho các ứng dụng của bạn và Lambda@Edge để chạy mã tùy chỉnh gần hơn với người dùng end user

Amazon cloudfront có thể được dùng để được dùng để deliver toàn bộ website(dynamic, static, streaming ..) bằng cách sử dụng Network của Edge location. Tất cả các request sẽ được tự động định tuyến tới nơi Edge location gần nhất. response content sẽ được gửi trả lại một cách tối ưu nhất. 

![](https://images.viblo.asia/58dbc06e-c6eb-4199-aa1e-30f3f6783e83.png)

Ví dụ khi bạn muốn xem một bức ảnh của server được đặt ở Mỹ, thì việc load dữ liệu sẽ rất mất thời gian ( qua các đường cáp quang biển …. ), nhưng thay vì lấy trực tiếp từ Mỹ thì server sử dụng dịch vụ Cloudfront CDN, các bức ảnh này được đặt ở các Edge location trên khắp thế giới, giả Edge location được đặt ở Singapore chẳng hạn thì việc load bức ảnh này sẽ nhanh hơn nhiều lần do load dữ liệu từ Singapore về chứ không lấy trực tiếp từ Mỹ

## Edge locattion 
Là nơi mà dữ liệu sẽ được cached lại, nó không liên quan gì đến AWS Region/AZ

![](https://images.viblo.asia/2af18157-0342-434f-a0f8-f5c2e547d5f7.png)

## Origin 
Origin là nơi chưa các dữ liệu nguồn, nơi mà CDN sẽ distribute 
Origin có thể là S3 bucket, EC2 instance, ELB (Elastic Load Balancer) hay Route53

## Distribution 
Là một tập hợp các CND của các Edge location

# Nguồn tham khảo
https://www.udemy.com/aws-certified-solutions-architect-associate/

https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html