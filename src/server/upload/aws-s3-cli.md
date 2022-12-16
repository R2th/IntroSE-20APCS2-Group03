Trong bài viết này mình sẽ giới thiệu mọi người cách quản lý AWS S3 buckets bằng cách sử dụng AWS CLI. Các lệnh aws s3 bậc cao sẽ giúp đơn giản hóa việc quản lý các objects S3. Các lệnh này sẽ cho phép bạn quản lý nội dung của S3 trong chính nó và các thư mục cục bộ.

## 1, Install AWS CLI
Chúng ta sử dụng lệnh dưới đây để cài đặt aws cli trên ubuntu
```
sudo apt-get update
sudo apt-get install awscli
```
Kiểm tra xem đã cài đặt thành công chưa: 
  `aws --version`
![](https://images.viblo.asia/5bf45220-5ea5-4b28-8ec5-da83bffb10f1.png)

## 2, Configuring AWS CLI

Trước khi config chúng ta cần 1 IAM user, bạn có thể tham khảo để tạo IAM user [tại đây](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html). Để user sử dụng được aws s3 thì cần phải cấp quyển s3 cho user. Ở đây mình cấp full quyển S3 cho user luôn
![](https://images.viblo.asia/9cd38dcb-3e90-4d3c-aeaa-a050c533e5c1.png)

Sau khi đã cài đặt xong aws cli, chúng ta sử dụng lệnh sau để config 

```
aws configure
```
Sẽ có 4 thông số chúng ta cần set up
![](https://images.viblo.asia/e4848672-1e51-45ca-8c95-10c62c64397d.png)

`AWS Access Key ID` và `AWS Secret Access Key` có thể tạo sau khi tạo user như ở trên tại tab Security credentials

![](https://images.viblo.asia/03899067-318c-4c0e-8894-5a6aeb353e74.png)

`Default region name `có thể lựa chọn 1 trong các option [tại đây](https://docs.aws.amazon.com/general/latest/gr/rande.html)

`Default output format` mình chọn `json`. Ngoài ra có thể thao khảo 1 số tùy chọn khác [tại đây](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-format)
## 3, Các câu lệnh cơ bản

### 1, Tạo bucket

```
aws s3 mb <target> [--option]
```
Ví dụ: `aws s3 mb s3://new-bucket-232`

Lệnh trên sẽ tạo 1 bucket mới có tên new-bucket-232

### 2, List bucket và objects
```
aws s3 ls <target> [--options]
```
Ví dụ `aws s3 ls`

Ví dụ trên sẽ list ra toàn bộ bucket mà user có quyền xem

![](https://images.viblo.asia/e7f1b071-84d8-4766-af4b-7f4d86e7c707.png)


Các bạn có thể đi sâu hơn vào 1 bucket

Ví dụ: `aws s3 ls s3://s3-bucket-sample-222`

![](https://images.viblo.asia/f232f946-d469-4b98-b204-f79e735a10c7.png)

### 3, Delete buckets
```
aws s3 rb <target> [--options]
```

Ví dụ: `aws s3 rb s3://new-bucket-232`

Mặc định thì lệnh trên chỉ có thể xóa được các bucket rỗng. Nếu muốn xóa các bucket đã có thêm option --force. Nhưng nếu sử dụng bucket version lệnh này cũng không cho phép bạn xóa bucket, bạn vẫn phải xóa hết content trước.

Lệnh sau sẽ xóa tất cả object, prefixes trong bucket, rồi xóa bucket

`aws s3 rb s3://s3-bucket-sample-222 --force`

![](https://images.viblo.asia/fced3c83-dae1-4dd9-a4f3-692b3cf22922.png)

### 4, Delete objects
```
aws s3 rm  <target> [--options]
```

Nếu bạn muốn xóa file `image1.jpeg` trong bucket `new-bucket-232`, sử dụng lệnh sau

`aws s3 rm s3://new-bucket-232/image1.jpeg `

Nếu muốn xóa 1 folder thì cần thêm option --recursive

`aws s3 rm s3://new-bucket-232/new-bucket --recursive`

![](https://images.viblo.asia/655a58ad-b0f9-400c-ab9e-077c21b08d1f.png)


### 5, Move Objects

```
aws s3 mv <source> <target> [--options]
```
Lệnh này sẽ giúp chúng ta di chuyển objects từ bucket này sang bucket khác, từ s3 xuống local và từ local lên server.

Ví dụ: 

Chuyển toàn bộ object từ s3://new-bucket-232/example sang bucket new-bucket-233:

`aws s3 mv s3://new-bucket-232/example s3://new-bucket-233/`

Chuyển 1 file images.jpeg từ local lên bucket new-bucket-232:

`aws s3 mv images.jpeg s3://new-bucket-233/`

Kéo 1 file từ bucket new-bucket-232 về local:

`aws s3 mv s3://new-bucket-233/images.jpeg ./`

### 6, Copy Objects

```
aws s3 cp <source> <target> [--options]
```

Lệnh này cũng tương tự như lệnh move nhưng thay vì chuyển file gốc thì lệnh cp sẽ tạo file mới. Ngoài ra có thể sử  dụng tham số '-' để truyền cho source và target

Ví dụ:

Ghi đè text "hello world" vào file text.txt trên bucket new-bucket-232

`echo "hello world" | aws s3 cp - s3://new-bucket-232/text.txt`

In ra text của file text.txt trên bucket new-bucket-232

`aws s3 cp s3://new-bucket-232/text.txt -`

![](https://images.viblo.asia/c2958f5f-e17f-4575-a60e-15a2c05ce566.png)


### 7, Sync Objects

```
aws s3 sync <source> <target> [--options]
```

Lệnh trên sẽ đồng bộ các object ở 2 bucket hoặc giữa bucket với local. Những file nào bị thiếu ở source sẽ được copy từ target và ngược lại. Tuy nhiên có option --delete để remove những file, objects ở target mà không xuất hiện ở source.

Ví dụ: Đồng bộ giữa bucket new-bucket-232 và new-bucket-233

`aws s3 sync s3://new-bucket-232 s3://new-bucket-233`


## Tham khảo
https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html