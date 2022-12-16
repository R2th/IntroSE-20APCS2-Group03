## MỞ ĐẦU
Amazon S3 (Simple Storage Service) là một dịch vụ tuyệt vời để lưu trữ tệp tin phổ biến nhất trong công nghệ điện toán đám may hiện nay, nó lưu trữ tệp tin như một object trong các bucket.

Bucket là các thùng chứa cho các object. Bạn có thể tạo 1 hay nhiều bucket. Với mỗi bucket, bạn có thể điều khiển việc truy xuất đến nó (ai có thể tạo, xóa và xem các object trong bucket), xem nhật ký truy xuất đến bucket và đến các object bên trong, cũng như chọn region mà Amazon S3 sẽ lưu bucket và nội dung trong nó.

Khi dùng AWS Management Console, có thể tạo folder để nhóm các object, và có thể tạo folder lồng bên trong nhiều cấp.

Đây là các bước đơn giản mà bạn có thể lấy một Access Key ID và Secret Access Key cho tài khoản AWS cho phép bạn truy cập vào các dịch vụ AWS của mình.

Đầu tiên bạn cần 1 tài khoản AWS, nếu bạn chưa có hãy tạo 1 tài khoản  https://aws.amazon.com .

## Tạo Amazon S3 Bucket

Khi tài khoản của bạn được thiết lập hãy đăng nhập vào bảng điều khiển AWS của bạn.

https://console.aws.amazon.com và chọn s3 từ menu dịch vụ

![](https://images.viblo.asia/0c224ade-c0d7-47aa-ba6f-3a0f8a405d6f.png)

Bạn cũng có thể chọn S3 từ phần lưu trữ.

![](https://images.viblo.asia/c1877846-6cd8-4a0f-8bb5-31109644e11d.png)

và sau đó tạo một S3 Bucket của bạn. Bạn có thể đưa ra bất kỳ tên nào có sẵn. Tên S3 là global và bạn không thể sử dụng tên đã được sử dụng bởi bất kỳ ai khác.Ví dụ, bạn có thể tạo một cái có tên dự án của bạn tương tự. <b>projectnameS3bucket</b>.

Chọn một khu vực gần bạn và nhấp vào tạo.

![](https://images.viblo.asia/d195f45c-8960-48a5-859f-8fc91393b0d9.png)

Trong trang tiếp theo là lựa chọn cấu hình, một số tùy chọn liên quan đến version và đặt logging.

![](https://images.viblo.asia/ced6124f-33de-4078-86e6-b3269a170649.png)

Tiếp theo đặt Permissions cho bucket. Nếu bạn không muốn thay đổi gì có thể bấm Next.

![](https://images.viblo.asia/1ddce547-ad4a-480c-9f55-6421e6f0f082.png)

Sau đó bạn có thể xem lại tất cả các cài đặt trong bucket. Tạo bucket.

![](https://images.viblo.asia/993047c1-a791-45cb-a198-1e98be0869cd.png)

Bucket đã được tạo và bạn có thể kiểm tra nó.

![](https://images.viblo.asia/0c224ade-c0d7-47aa-ba6f-3a0f8a405d6f.png)

## Tạo IAM User
1. Đi đến bảng điều khiển IAM.
2. Từ bảng điều khiển chọn User và lựa chọn Add User.

![](https://images.viblo.asia/cfde6f4d-2c3f-411a-8252-9c8af2754372.png)

3. Tiếp theo nhập tên người dùng và chọn Programmatic Access

![](https://images.viblo.asia/9e36c175-23b2-4844-ac30-90bdfcb9f79d.png)

4. Trong trang tiếp theo chọn <b>Attach Existing Policy</b> và gắn thêm tag.

![](https://images.viblo.asia/cd4bd540-ff1a-4924-89d7-fabe48fed1e3.png)

5. Trong trang review, kiểm tra lại thông tin và nhấn create user.

![](https://images.viblo.asia/0ee63662-e037-4c93-a048-06e2df69d079.png)

6. Bạn sẽ nhận được Access Key ID và Secret key sau khi tạo user.

![](https://images.viblo.asia/047e94d0-cdfd-49d2-b6bb-b02fc305b8a5.png)

## Tổng Kết
Như vậy mình đã hướng dẫn xong các bước cơ bản để tạo bucket. Hy vọng các bạn làm sẽ thành công, nếu có vấn đề gì thì comment ở dưới để cùng trao đổi nhé.