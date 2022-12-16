### Cơ bản về Amazon S3

Amazon S3 là viết tắt của cụm từ Amazon Simple Storage Service: Là dịch vụ đám mây lưu trữ do đó bạn có thể tải lên các tệp, các tài liệu, các dữ liệu tải về của người dùng hoặc các bản sao lưu.

Để hiểu về Amazon S3, bạn cần nắm 1 số khái niệm cơ bản:

Amazon S3 lưu trữ dữ liệu như các object trong các bucket. Một object gồm 1 file và metadata mô tả cho file (tùy chọn).

Để lưu 1 object trong Amazon S3, bạn tải file lên 1 bucket. Khi đã tải file, bạn có thể gán quyền cho đối tượng cũng như bổ sung metadata.

Bucket là các thùng chứa cho các object. Bạn có thể tạo 1 hay nhiều bucket. Với mỗi bucket, bạn có thể điều khiển việc truy xuất đến nó (ai có thể tạo, xóa và xem các object trong bucket), xem nhật ký truy xuất đến bucket và đến các object bên trong, cũng như chọn region mà Amazon S3 sẽ lưu bucket và nội dung trong nó.

Chú ý là mỗi một tài khoản chỉ tạo được tối đa là 100 buckets, và Bucket có tên là duy nhất do đó nếu bạn tạo một Bucket có tên giống nhau thì bạn sẽ gặp lỗi như sau:

![](https://images.viblo.asia/0a1dc2ba-e6dc-4195-81e4-e0d0cf1e5541.PNG)

Tên Bucket được đặt theo luật sau:

* có thể chứa các ký tự như chữ cái, hoặc số, dấu gạch dưới, dấu gạch trên, dấu chấm, dấu phẩy

* cần phải bắt đầu số hoặc ký tự

* không quá ngắn (trên 3 ký tự) và không quá dài ký tự (dưới 255 ký tự)
 
* không thể chứa dạng địa chỉ IP, ví dụ 192.168.1.1 sẽ không hợp lệ

## Sử dụng

Truy cập vào AWS Management Console, chọn service Amazon S3

Tạo Bucket bằng cách bấm vào nút **Create bucket**

![](https://images.viblo.asia/ba420f33-4622-4346-b8b8-4de0c6161764.PNG)

Đặt tên cho bucket: tên bucket là duy nhất, không trùng với các bucket khác và theo các quy tắc được đề cập ở phần đầu bài viết.

Chọn region (tốt nhất chọn Tokyo hoặc Singapore) sau đó bấm Next

![](https://images.viblo.asia/107915a6-f099-4392-ab46-9d6b493b9741.PNG)

 Các lựa chọn tiếp theo như versioning, logging, tags.. để disable (mình sẽ giới thiệu chi tiết hơn ở các bài viết sau) và bấm Next
 
 Màn hình tiếp theo cho phép bạn setup quyền truy cập cho các tài khoản khác để truy cập vào S3 bucket, mình để tạm default và bấm Next

Review lại cấu hình rồi bấm Create bucket

![](https://images.viblo.asia/2f8deb6a-287a-41ff-b838-be65a807ced7.PNG)

Bucket sau khi được khởi tạo

![](https://images.viblo.asia/8f45f379-8886-41ab-9b2d-f4c51a2ebb53.PNG)

 Click vào bucket name để vào bucket home page 
 
 ![](https://images.viblo.asia/c6805981-b81e-4972-9c08-fbad8ef16ad4.PNG)
 
 Chọn Upload để tải file lên
 
  Bạn có thể chỉnh permission cho file(s) trong bucket ở cửa sổ bên dưới
  
  ![](https://images.viblo.asia/b820f34c-a7b2-4077-9373-e39d0944682c.PNG)
  
  File sau khi tải lên xuất hiện trong cửa sổ Bucket Console
  
  ![](https://images.viblo.asia/3fc649d2-87fb-4a90-8aaa-6c45940c39a5.PNG)
  
  
  

-----

## Mr.Nara