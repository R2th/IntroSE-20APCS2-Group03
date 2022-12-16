![](https://images.viblo.asia/f07e3a9c-314f-4189-93f9-5f9ba6a719aa.png)
# 1. Multipart upload
## 1.1 Overview
- Multipart upload cho phép upload một object thành từng part. Có thể upload các part một cách độc lập hoặc theo bất kỳ thứ tự nào.
- Nếu bất kỳ part nào khi upload bị thất bại, có thể upload lại part đó mà không ảnh hưởng đến các part khác.
- Sau khi tất cả các part của object được upload, AWS sẽ ghép chúng thành object hoàn chỉnh.
- Khi kích thước object của đạt đến 100MB, nên cân nhắc sử dụng multipart upload thay vì upload cả object trong một thao tác.
## 1.2 Benefit
- Cải thiện thông lượng - Có thể tải các part lên song song để cải thiện thông lượng.
- Khôi phục nhanh chóng từ bất kỳ sự cố mạng nào - Dung lượng nhỏ giảm thiểu tác động của việc upload thất bại do lỗi mạng. (Chỉ cần upload lại part bị lỗi)
- Tạm dừng hoặc tiếp tục upload - Có thể upload các part của object bất cứ lúc nào. Nhưng phải đảm bảo hoàn thành hoặc dừng multipart upload vì các part đã upload vẫn còn lưu trữ trên S3.
- Upload trước khi biết dung lượng object cuối cùng - Có thể upload một object khi đang tạo nó.

# 2. Multipart upload process
- Multipart upload gồm 3 bước:
    - Multipart upload initiation.
    - Parts upload
    - Multipart upload completion.
## 2.1 Multipart upload initiation
- Khi khởi tạo multipart upload, Amazon S3 sẽ trả về ID upload, là ID duy nhất cho 1 multipart upload.
- Cần phải gửi ID upload này bất cứ khi nào sử dụng `upload parts`, `list the parts`, `complete an upload`, hoặc `stop an upload`.
- Nếu muốn cung cấp meta data mô tả object đang được upload, phải cung cấp meta data đó trong request multipart upload.
## 2.2 Parts upload
- Khi upload một part, ngoài ID upload, phải chỉ định STT của part. Có thể chọn bất kỳ số nào từ 1 đến 10,000.
- STT part xác định duy nhất part và vị trí của nó trong object đang upload. STT part không cần phải nằm trong một chuỗi liên tiếp. (ví dụ, nó có thể là 1, 5 và 14).
- Bất cứ khi nào upload part, Amazon S3 sẽ trả về ETag trong response của nó, cần lưu STT part và giá trị ETag. Cần đưa các giá trị này để hoàn tất quá trình multipart upload.
## 2.3 Multipart upload completion
- Khi hoàn tất quá trình multipart upload, Amazon S3 sẽ tạo một object bằng cách nối các part theo thứ tự tăng dần dựa trên STT part.
- Request multipart upload hoàn chỉnh phải bao gồm ID upload và danh sách STT part và ETag tương ứng. 
- Có thể tùy ý dừng multipart upload. Sau khi dừng multipart upload, không thể upload lại bất kỳ part nào bằng ID upload đó. 
- Sau đó, tất cả bộ nhớ từ bất kỳ part nào của quá trình multipart upload bị hủy sẽ được giải phóng.
# 3. Hand-on with AWS CLI
## 3.1 Requirement
- Install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- Setup profile:
```shell
aws configure
AWS Access Key ID [****************NLSB]: xxx
AWS Secret Access Key [****************Pz/K]: xxx
Default region name [ap-southeast-1]:
Default output format [None]:
```
- Policy IAM user upload (Full quyền thao tác với S3)
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": "*"
        }
    ]
}
```
## 3.2 Upload the file using high-level (aws s3) commands
- Để sử dụng high-level aws s3 chạy command sau:
```bash
aws s3 cp large_test_file s3://multipartupload2022/
```
- Command này tự động thực hiện multiprt upload khi object lớn.
- Mặc định, AWS CLI sử dụng 10 request đồng thời, Để thay đổi số lượng request:
```bash
aws configure set default.s3.max_concurrent_requests 20
```
## 3.3 Upload the file in multiple parts using low-level (aws s3api) commands
- Step 1: Chia tệp bạn muốn tải lên. (VD: 50MB cho mỗi tệp)
```shell
split -b 50MB database.sql
```
- Step 2: Khởi tạo multipart upload sẽ trả về response có chứa UploadID. Giữ UploadID để dùng khi upload part.
```shell
aws s3api create-multipart-upload --bucket multipartupload2022 --key database.sql
```
```json
{
    "Bucket": "multipartupload2022",
    "Key": "database.sql",
    "UploadId": "a6d__Qr3WeBYuDrOwHoBEN9zCYtrjeMH8ugtGJCtKEBC57ij8TYLaAD9vTZ1Ogr453PnqF34rUBfmyOAVgtQeZim9fyEUKP2XblIQD5R5KPRJ6mhoA122nWlflc_5gtnY3W2y65WejC1E7pZmdXv_g--"
}
```
- Step 3: Upload từng part của file sẽ trả về response có chứa giá trị ETag. Giữ ETag để gộp các part.
```shell
aws s3api upload-part --bucket multipartupload2022 --key large_test_file --part-number 1 --body large_test_file.001 --upload-id exampleTUVGeKAk3Ob7qMynRKqe3ROcavPRwg92eA6JPD4ybIGRxJx9R0VbgkrnOVphZFK59KCYJAO1PXlrBSW7vcH7ANHZwTTf0ovqe6XPYHwsSp7eTRnXB1qjx40Tk --content-md5 exampleaAmjr+4sRXUwf0w==
```
```json
{
    "ETag": "\"26f2e0ca250321ac3f7c5785978cd248\""
}
```
- Step 4: Lặp lại các bước 2 và 3 cho đến khi hết các part.
```shell
aws s3api upload-part --bucket multipartupload2022 --key database.sql --part-number 2 --body xab --upload-id a6d__Qr3WeBYuDrOwHoBEN9zCYtrjeMH8ugtGJCtKEBC57ij8TYLaAD9vTZ1Ogr453PnqF34rUBfmyOAVgtQeZim9fyEUKP2XblIQD5R5KPRJ6mhoA122nWlflc_5gtnY3W2y65WejC1E7pZmdXv_g--
{
    "ETag": "\"56c1291d9d0c15feb5638bd06acf7287\""
}

aws s3api upload-part --bucket multipartupload2022 --key database.sql --part-number 3 --body xac --upload-id a6d__Qr3WeBYuDrOwHoBEN9zCYtrjeMH8ugtGJCtKEBC57ij8TYLaAD9vTZ1Ogr453PnqF34rUBfmyOAVgtQeZim9fyEUKP2XblIQD5R5KPRJ6mhoA122nWlflc_5gtnY3W2y65WejC1E7pZmdXv_g--
{
    "ETag": "\"433fb4de67ba17f802841ec62ff9916b\""
}

 aws s3api upload-part --bucket multipartupload2022 --key database.sql --part-number 4 --body xad --upload-id a6d__Qr3WeBYuDrOwHoBEN9zCYtrjeMH8ugtGJCtKEBC57ij8TYLaAD9vTZ1Ogr453PnqF34rUBfmyOAVgtQeZim9fyEUKP2XblIQD5R5KPRJ6mhoA122nWlflc_5gtnY3W2y65WejC1E7pZmdXv_g--
{
    "ETag": "\"f79b306f38900d9262e7e749fba06023\""
}
```
- Step 5: Liệt kê các part đã tải lên
```shell
aws s3api list-parts --bucket multipartupload2022 --key database.sql --upload-id a6d__Qr3WeBYuDrOwHoBEN9zCYtrjeMH8ugtGJCtKEBC57ij8TYLaAD9vTZ1Ogr453PnqF34rUBfmyOAVgtQeZim9fyEUKP2XblIQD5R5KPRJ6mhoA122nWlflc_5gtnY3W2y65WejC1E7pZmdXv_g--
```
```json
{
    "Parts": [
        {
            "PartNumber": 1,
            "LastModified": "2022-02-02T03:43:34+00:00",
            "ETag": "\"26f2e0ca250321ac3f7c5785978cd248\"",
            "Size": 50000000
        },
        {
            "PartNumber": 2,
            "LastModified": "2022-02-02T03:44:41+00:00",
            "ETag": "\"56c1291d9d0c15feb5638bd06acf7287\"",
            "Size": 50000000
        },
        {
            "PartNumber": 3,
            "LastModified": "2022-02-02T03:45:46+00:00",
            "ETag": "\"433fb4de67ba17f802841ec62ff9916b\"",
            "Size": 50000000
        },
        {
            "PartNumber": 4,
            "LastModified": "2022-02-02T03:46:49+00:00",
            "ETag": "\"f79b306f38900d9262e7e749fba06023\"",
            "Size": 2476799
        }
    ],
    "Initiator": {
        "ID": "arn:aws:iam::xxx:user/MultipartUpload",
        "DisplayName": "MultipartUpload"
    },
    "Owner": {
        "DisplayName": "xxx",
        "ID": "xxx"
    },
    "StorageClass": "STANDARD"
}
```
- Step 6: Tạo file JSON có định dạng như sau với tên là fileparts.json.

```json
{
    "Parts": [
        {
            "ETag": "26f2e0ca250321ac3f7c5785978cd248",
            "PartNumber": 1
        },
        {
            "ETag": "56c1291d9d0c15feb5638bd06acf7287",
            "PartNumber": 2
        },
        {
            "ETag": "433fb4de67ba17f802841ec62ff9916b",
            "PartNumber": 3
        },
        {
            "ETag": "f79b306f38900d9262e7e749fba06023",
            "PartNumber": 4
        }
    ]
}
```
- Step 7: Hoàn tất quá trình multipart upload.
```shell
aws s3api complete-multipart-upload --multipart-upload file://fileparts.json --bucket multipartupload2022 --key database.sql --upload-id a6d__Qr3WeBYuDrOwHoBEN9zCYtrjeMH8ugtGJCtKEBC57ij8TYLaAD9vTZ1Ogr453PnqF34rUBfmyOAVgtQeZim9fyEUKP2XblIQD5R5KPRJ6mhoA122nWlflc_5gtnY3W2y65WejC1E7pZmdXv_g--
```
- Step 8: Nếu thành công, thì sẽ nhận được respnse tương tự như sau:
```json
{
    "Location": "https://multipartupload2022.s3.ap-southeast-1.amazonaws.com/database.sql",
    "Bucket": "multipartupload2022",
    "Key": "database.sql",
    "ETag": "\"623a7ae9915622b1c8f2636a4f302de8-4\""
}
```
# 4. Multipart upload limits
Item | Specification |
--- | --- |
Maximum object size | 5 TB 
Maximum number of parts per upload | 10,000
Part numbers | 1 - 10,000
Part size | 5 MiB - 5 GiB
Maximum number of parts returned for a list parts request | 1000
Maximum number of multipart uploads returned in a list multipart uploads request | 1000
# 5. Reference

[Uploading and copying objects using multipart upload](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)

[How do I use the AWS CLI to perform a multipart upload of a file to Amazon S3?](https://aws.amazon.com/premiumsupport/knowledge-center/s3-multipart-upload-cli/)