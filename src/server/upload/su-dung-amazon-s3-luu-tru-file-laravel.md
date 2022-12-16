## Giới thiệu
Laravel filesystem giúp bạn dễ dàng thao tác với file. Mặc định laravel dùng `Local Driver` để lưu trữ file. Bài này sẽ hướng dẫn các bạn sử dụng amazon S3 để lưu trữ file
## Bắt đầu
### 1. Tạo Bucket trên S3
Đầu tiền là bạn phải có tài khoản amazon web service trước. Amazon đang có trương trình miễn phí cho tài khoản đăng ký mới [tại đây](https://aws.amazon.com/free/). 
Đầu tiên bạn đăng nhập vào [aws console](http://console.aws.amazon.com) -> Chọn `S3` -> Create bucket

![](https://images.viblo.asia/fcba364e-2fab-42ae-b823-da963e564f84.png)

Tiếp theo thì cứ next.
### 2. Lấy Access key S3
Sau khi đã tạo bucket thì tiếp theo sẽ lấy access key. Từ giao diện trang chủ bạn truy cập `IAM`
![](https://images.viblo.asia/434437fe-37b0-422e-9318-d888738299c3.png)

Nhấn vào `Users` trên thanh menu bên trái -> Chọn user. Để đảm bảo về bảo mật bạn có thể tạo thêm 1 user mới chỉ dùng để truy cập S3. Ở đây thì mình dùng đã tạo rồi. 

![](https://images.viblo.asia/49a35317-6599-4abb-b533-d35a7fff8b59.png)

Sau đó click vào `Create access key`. Bạn sẽ nhận được `Acess key ID` và `Secret access key`. Nhớ lưu lại để còn dùng sau này
![](https://images.viblo.asia/f919d6a2-a772-430a-bcfa-bac4f640364a.png)

### 3. Config laravel
Kế tiếp là config trên laravel. Mở file `.env` và thêm dòng sau vào
```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
AWS_URL=
FILESYSTEM_DRIVER=s3
```
`AWS_ACCESS_KEY_ID` là key đã lấy ở bước trước, `AWS_SECRET_ACCESS_KEY` là secret key đã lấy từ bước trước. `AWS_DEFAULT_REGION` là Region khi bạn chọn tạo S3. Như bước trước thì mình tạo ở `Asia Pacific` thì sẽ ghi là `ap-southeast-1`. Bạn có thể xem thêm ở đây https://docs.aws.amazon.com/general/latest/gr/rande.html . `AWS_BUCKET` là tên bucket của bạn như mình là `s3-laravel-testtttt`. `AWS_URL` thì sẽ có dạng https://`AWS_BUCKET`.s3-`AWS_DEFAULT_REGION`.amazonaws.com.
### 4. Cài thư viện 
Như trên docs của laravel có ghi là để sử dụng S3 driver bạn sẽ phải cài thư viện  `league/flysystem-aws-s3-v3`
Mở terminal lên và chạy 
```
composer require league/flysystem-aws-s3-v3
```

### 5. Sử dụng
Sau khi hoàn thành các bước trên, Bạn có thể thêm,  xóa file như bình thường và file sẽ được lưu trên S3 thay vì lưu ở thư mục local.

## Tài liệu tham khảo
https://wogan.blog/2017/01/04/use-amazon-s3-with-laravel-5/