## AWS Cloudfront

![](https://images.viblo.asia/ba569692-97e2-4e54-a05b-cdc82eed6d06.png)

CloudFront là một CDN (Mạng phân phối nội dung). Nó lấy dữ liệu từ bucket Amazon S3 và phân phối nó đến nhiều trung tâm dữ liệu. Nó cung cấp dữ liệu thông qua mạng lưới các trung tâm dữ liệu  gọi là các vị trí biên. Vị trí gần nhất được định tuyến khi người dùng yêu cầu dữ liệu, dẫn đến độ trễ thấp nhất, lưu lượng mạng thấp, truy cập nhanh vào dữ liệu, v.v.\\

## AWS CloudFront cung cấp nội dung như thế nào?

AWS CloudFront cung cấp content theo các bước sau:

1. Người dùng truy cập trang web hoặc ứng dụng của bạn và yêu cầu một hoặc nhiều tệp, chẳng hạn như tệp hình ảnh và tệp HTML.

2. DNS định tuyến yêu cầu đến CloudFront POP (vị trí gần nhất) có thể phục vụ yêu cầu tốt nhất — thường là CloudFront POP gần nhất về độ trễ — và định tuyến yêu cầu đến vị trí này.

3. Trong POP, CloudFront kiểm tra bộ nhớ cache của nó để tìm các tệp được yêu cầu. Nếu các tệp nằm trong bộ nhớ cache, CloudFront sẽ trả lại chúng cho người dùng. Nếu các tệp không có trong bộ nhớ cache, nó sẽ thực hiện như sau:

* CloudFront so sánh yêu cầu với các thông số kỹ thuật trong bản phân phối của bạn và chuyển tiếp yêu cầu tệp tới máy chủ gốc của bạn đối với loại tệp tương ứng — ví dụ: tới bộ chứa Amazon S3 của bạn đối với tệp hình ảnh và tới máy chủ HTTP của bạn đối với tệp HTML.
* Máy chủ gửi các tệp trở lại vị trí gần nhất với vị trí yêu cầu resource.
* Ngay sau khi byte đầu tiên đến, CloudFront bắt đầu chuyển tiếp các tệp đến người dùng. CloudFront cũng thêm các tệp vào bộ nhớ cache ở vị trí location này cho lần sau khi ai đó yêu cầu các tệp đó.

## Điều kiện tiên quyết

*  Tạo một tài khoản AWS.
* Cài đặt AWS CLI.
* Thiết lập cấu hình AWS CLI với người dùng IAM.

## Yêu cầu

* Webserver cấu hình trên EC2.
* Document Root (/var/www/html) được duy trì bằng cách gắn trên EBS Block.
* Các đối tượng tĩnh được sử dụng trong code, chẳng hạn như ảnh được lưu trữ trong S3.
* Setting CDN sử dụng CloudFront và sử dụng origin domain tương tự như S3 Bucket.
* Cuối cùng, đặt URL Cloud Front trên code của ứng dụng web để bảo mật và độ trễ thấp.

### [Khởi chạy EC2 instance](https://medium.com/analytics-vidhya/launching-ec2-instance-using-cli-and-attaching-ebs-volume-6ce00456e55d?source=friends_link&sk=2f35d4841272ded769b75bb5164e2b49)

![](https://images.viblo.asia/e84a5086-c0a0-47e5-bf7e-9bfef89103ce.png)

### [Tạo EBS Volume và gắn nó cho EC2 vừa chạy](https://medium.com/analytics-vidhya/launching-ec2-instance-using-cli-and-attaching-ebs-volume-6ce00456e55d?source=friends_link&sk=2f35d4841272ded769b75bb5164e2b49)

![](https://images.viblo.asia/8410d334-c557-4a1f-8f8f-7bfaaa71ebcd.png)

### Đăng nhập vào EC2 Instance

* Đăng nhập vào account root

```
sudo su - root
```

* Install httpd web server

![](https://images.viblo.asia/a55dcbf5-6735-4d04-8add-39d340d3dbe6.png)

* Gõ fdisk -l để kiểm tra dung lượng 2GB vừa được thêm vào:

```fdisk -l```

![](https://images.viblo.asia/4735e5a6-ee50-44e2-9056-700f95e9f933.png)

* Tạo phân vùng

![](https://images.viblo.asia/5a7d800b-67bd-4732-9562-4a0a89a89a9b.png)

* Định dạng phân vùng và gắn vào thư mục /var/www/html

![](https://images.viblo.asia/417cd251-f678-418e-95c8-f1024ca24f81.png)

* Chúng ta có thể thấy thêm 1 phân vùng 2 GB được gắn trên /var/www/html

![](https://images.viblo.asia/efebbf54-159a-4449-9313-59105437bc93.png)

* Tạo S3 bucket với tên duy nhất

![](https://images.viblo.asia/45e6deed-d2b0-4dfe-876a-0c21e80875f6.png)

![](https://images.viblo.asia/e849a860-6569-4616-8731-590b15f49125.png)

* Copy content vào S3 với quyền truy cập đọc

![](https://images.viblo.asia/ec1378da-2fd5-4f33-aa31-ffb971ee464d.png)

![](https://images.viblo.asia/944a78be-d596-447a-b972-1d5b8a985cf3.png)

![](https://images.viblo.asia/106b1646-9dfb-460c-88f3-d8a90f902a57.png)

* Mình đã viết 1 trang html đơn giản có tên là index.html, chứa nội dung tiêu đề đơn giản và thẻ image. Chúng nằm trong thư mục /var/www/html.

![](https://images.viblo.asia/742086c7-3930-4a45-af13-1c22afe34015.png)

* Bây giờ chúng ta copy URL public của EC2 instance và truy cập bằng web page

![](https://images.viblo.asia/373741ab-b69a-4fc5-a413-62e6f1a0ff70.png)

### Bây giờ chúng ta sẽ thiết lập CDN sử dụng CloudFront và sử dụng origin domain tương tự S3 Bucket

* Tạo CDN

```
aws cloudfront create-distribution --origin-domain-name <bucket name>.s3.amazonaws.com
aws cloudfront create-distribution --origin-domain-name bucket-webserver-03091999.s3.amazonaws.com
```

![](https://images.viblo.asia/58c6ef18-be9e-4122-8477-3eb6d7c669be.png)

* Vào phần CloudFront của Bảng điều khiển quản lý AWS, các bạn sẽ thấy tên của domain.

![](https://images.viblo.asia/9f064975-659d-4c1a-9b47-35ce9ee63f81.png)

* Sao chép Tên miền và thay thế url S3 bucket trước đó.

![](https://images.viblo.asia/93a4d1ee-e58e-40f1-813c-e6ffda1c5539.png)

* Bây giờ chúng ta sẽ truy cập hình ảnh một lần nữa

![](https://images.viblo.asia/48a00346-2f8d-4b17-af16-3fafb4271f18.png)

## Tổng kết

Trên đây, mình đã giới thiệu với mọi người về cách setting CDN với S3 và CloudFront với tính khả dụng cao. Mong rằng bài viết sẽ giúp các bạn sẽ setting CDN cho trang web của mình một cách dễ dàng.

### Tài liệu tham khảo

https://medium.com/analytics-vidhya/designing-high-availability-architecture-with-s3-and-cloudfront-67684d6aa879
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html