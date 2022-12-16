Xin chào các bạn. 
Hiện nay có rất nhiều services cung cấp để lưu data như ảnh, tài liệu, ... trong dự án. Điển hình và hay dùng nhất đó là Amazon Simple Storage Service (Amazon S3).

Chi tiết hơn về Amazone S3 thì các bạn có thể đọc tại đây [Amazone S3](https://aws.amazon.com/vi/s3/)

Hôm nay mình cũng làm chút demo nho nhỏ coi như là giới thiệu với các bạn chưa dùng bao giờ hoặc muốn bắt đầu động chạm đến Amazone S3 nhé.

Nào mình cùng bắt đầu nào.

## 1. Tạo Amazone S3, bucket
Các bước tạo tài khoản thì mình không nói nữa, các bạn truy cập vào link này để đăng ký nhé [Register AWS account](https://portal.aws.amazon.com/billing/signup#/start)
Sau khi login bảng quản lý các services sẽ được hiển thị, bạn tìm đến S3 và chọn như hình dưới.
![Choose S3](https://images.viblo.asia/9f68e88a-6be6-4811-9f14-db535fddf1d1.png)

Khi mở S3 service ra, bạn sẽ thấy màn hình quản lý các bucket như sau:
![Create Bucket](https://images.viblo.asia/0dd3c271-87ef-494f-b4b1-e6c1732c2be0.png)

Click vào Create bucket 
![Crate bucket popup](https://images.viblo.asia/3baaf06a-75ba-4e07-9983-21ac427efe07.png)

Bạn có thể click next để setting permission cho bucket hoặc click nút create để tạo luôn bucket với các setting default.
![Finish create bucket](https://images.viblo.asia/9f98ef86-e128-4963-b42c-89f9f824bcbe.png)

OK như vậy đã xong bước create bucket. Click vào tên bucket sẽ vào trang quản lý các file trên bucket đó.

## 2. Lấy key và secret
Để access được vào bucket S3 thì bạn cần lấy key và secret để verify read/write file trên bucket.
![Get key and secret](https://images.viblo.asia/b5912107-bd71-4798-9ba2-cc88c15cb8f7.png)

Click vào Create New Access Key để generate ra bộ key: 
![Key](https://images.viblo.asia/44772ac2-0cf7-4f56-aaef-78ca5f447bfc.png)

** Note: Nhớ lưu lại key và secret để dùng nhé bạn.**

Okey, như vậy đã xong phần cài đặt trên AWS. Tiếp theo mình sẽ dùng command line để read/write file lên bucket.
## 3. Cài đặt aws trên command line
### 3.1 Cài đặt package
Để chạy được command line aws cli bạn sẽ cần cài đặt 2 package `pip3` và  `awscli`:

* Install pip3
```
sudo apt-get install python3-pip
```

* Install awscli
```
pip3 install awscli --upgrade --user
```
Tài liệu chi tiết: [Install awscli](https://docs.aws.amazon.com/en_us/cli/latest/userguide/cli-chap-install.html)

Để chắc chắn đã cài đặt thành công awscli các bạn chạy lệnh:
```
aws --version
```

Hiển thị như dưới là oke :D

![AWS version](https://images.viblo.asia/c536f24a-37ce-423c-bcee-e33bb98d4560.png)

### 3.2 Config awscli
Tiếp đến mình sẽ config key và secret trên command line:
Các bạn mở terminal lên và gõ lệnh:

```
aws configure
```

Và sau đó điền key và secret vào:
![Key secret](https://images.viblo.asia/8d8896ee-a07c-40a3-8336-2dc4fbda3ad2.png)

Okey, đã config xong. Tiếp đến mình sẽ read/write file trên bucket.
## 4. Read/write file lên S3 bucket
### 1.  Upload file
![](https://images.viblo.asia/17148909-9af1-4125-9cb5-52215b44dc83.png)

Kiểm tra file trên bucket
![Check file upload](https://images.viblo.asia/0db37216-8cf9-49ce-ae83-af70f30ca0f8.png)

### 2. Download file
![File download](https://images.viblo.asia/531e1797-40eb-4a6f-9947-a9b05794048b.png)

## 5. Tổng kết
Như vậy mình đã hướng dẫn xong các bước cơ bản để tạo bucket và read/write file trên S3. Hy vọng các bạn làm sẽ thành công, nếu có vấn đề gì thì comment ở dưới để cùng trao đổi nhé.

Cảm ơn mọi người đã theo dõi bài viết của mình. Hẹn mọi người tại bài viết tiếp theo :D